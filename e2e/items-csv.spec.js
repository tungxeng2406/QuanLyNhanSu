const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const header = 'No,Tên mặt hàng,Số lượng,Đơn giá,Thuế VAT (%)';
const upload = (page, text) => page.locator('#itemsCsvFile').setInputFiles({ name: 'items.csv', mimeType: 'text/csv', buffer: Buffer.from(text) });

test('import items, calculate VAT, export and reimport CSV', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#importItemsButton')).toBeVisible();
  await upload(page, '\uFEFF' + header + '\r\n1,"Giấy, ""A4""\nLoại 1",2,75000,8%\r\n2,Bút,3,5000,10');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#itemsRows tr')).toHaveCount(2);
  await expect(page.locator('#itemsTotal')).toHaveText('178.500');
  await expect(page.locator('#itemsRows tr').first().locator('td')).toHaveText(['1', 'Giấy, "A4"\nLoại 1', '2', '75.000', '8%', '150.000', '12.000', '162.000']);
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportItemsButton').click();
  const download = await downloadPromise;
  const csv = await fs.readFile(await download.path(), 'utf8');
  expect(csv).toContain('"Thuế VAT (%)","Trước VAT","Thuế VAT","Sau VAT"');
  expect(csv).toContain('"150000","12000","162000"');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await upload(page, csv);
  await expect(page.locator('#itemsRows tr')).toHaveCount(2);
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('invalid CSV reports errors and can retry the same file', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  for (const [csv, message] of [
    ['No,Name\n1,Item', 'CSV cần các cột'],
    [header, 'chưa có dữ liệu'],
    [header + '\n1,Item,-1,10,8', 'Số lượng phải là số không âm'],
    [header + '\n1,Item,1,10,101', '0–100%'],
    [header + '\n1,"Item,1,10,8', 'thiếu dấu ngoặc kép'],
    [header + '\n1,Item,1,10', 'số cột không khớp']
  ]) {
    await upload(page, csv);
    await expect(page.locator('#alert')).toContainText(message);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  }
  await upload(page, header + '\n1,<img src=x onerror=alert(1)>,0,10,0');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#itemsRows img')).toHaveCount(0);
  await expect(page.locator('#itemsRows td').nth(5)).toHaveText('0');
  await expect(page.locator('#itemsTotal')).toHaveText('0');
  await page.getByRole('button', { name: 'Đóng', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

