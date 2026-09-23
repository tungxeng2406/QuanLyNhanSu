const { test, expect } = require('@playwright/test');
const { uniqueEmployee, createEmployee, deleteEmployee, clearSearch } = require('./employee.helpers');

async function openAdd(page) {
  await page.locator('#addButton').evaluate((element) => element.click());
}

async function fillForm(page, employee) {
  await page.locator('#employeeCode').fill(employee.employeeCode);
  await page.locator('#fullName').fill(employee.fullName);
  await page.locator('#gender').selectOption(employee.gender);
  await page.locator('#dateOfBirth').fill(employee.dateOfBirth);
  await page.locator('#phone').fill(employee.phone);
  await page.locator('#email').fill(employee.email);
}

async function submitForm(page) {
  await page.locator('#employeeForm').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(700);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Employee Management' })).toBeVisible();
  await expect(page.locator('#employeeRows tr').first()).toBeVisible({ timeout: 15000 });
});

test('FE-LIST-002 empty state', async ({ page }) => {
  await page.locator('#searchEmployeeCode').fill('ZZZ_NO_MATCH');
  await expect(page.locator('#employeeRows')).toContainText('No employees found');
});

test('FE-LIST-005/006/007 pagination', async ({ page }) => {
  await expect(page.getByText(/Page 1 \/ \d+/)).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText(/Page 2 \/ \d+/)).toBeVisible();
  const response = await page.request.get('/api/employees?page=9999&size=10');
  expect(response.ok()).toBeTruthy();
});

test('FE-SEARCH-007/008/009/010 search edge cases', async ({ page }) => {
  await page.locator('#searchEmployeeCode').fill('ZZZ_NO_MATCH');
  await expect(page.locator('#employeeRows')).toContainText('No employees found');
  await page.locator('#searchEmployeeCode').fill('E001');
  await page.locator('#searchGender').selectOption('MALE');
  await expect(page.locator('#employeeRows tr').first()).toContainText('E001');
  await page.locator('#resetButton').evaluate((element) => element.click());
  await expect(page.locator('#searchEmployeeCode')).toHaveValue('');
  await expect(page.locator('#employeeRows tr')).toHaveCount(10);
});

test('FE-CREATE-005 invalid phone', async ({ page }) => {
  await openAdd(page);
  await page.locator('#employeeCode').fill('PW-INVALID-PHONE');
  await page.locator('#fullName').fill('Invalid Phone');
  await page.locator('#phone').fill('abc123');
  expect(await page.locator('#phone').evaluate((element) => !element.checkValidity())).toBeTruthy();
});

test('FE-CREATE-006 duplicate employee code', async ({ page }) => {
  await openAdd(page);
  await page.locator('#employeeCode').fill('E001');
  await page.locator('#fullName').fill('Duplicate Employee');
  await submitForm(page);
  await expect(page.locator('#alert')).toContainText('Ma nhan vien da ton tai');
});

test('FE-CREATE-007/008/009 input quality', async ({ page, request }) => {
  const employee = uniqueEmployee({ fullName: '  Nguyen Test  ' });
  let created;
  try {
    await openAdd(page);
    await fillForm(page, employee);
    await submitForm(page);
    const result = await (await request.get(`/api/employees?employeeCode=${employee.employeeCode}&page=0&size=10`)).json();
    created = result.content[0];
    expect(created.fullName).toBe('Nguyen Test');
  } finally {
    await deleteEmployee(request, created?.id);
  }
  await openAdd(page);
  await page.locator('#employeeCode').fill('PW-LONG');
  await page.locator('#fullName').fill('x'.repeat(151));
  expect(await page.locator('#fullName').inputValue()).toHaveLength(150);
});

test('FE-UPDATE-001/002/003 edit flow', async ({ page, request }) => {
  const employee = await createEmployee(request, uniqueEmployee());
  try {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('#searchEmployeeCode').fill(employee.employeeCode);
    await expect(page.locator('#employeeRows tr')).toHaveCount(1);
    await page.locator('#employeeRows tr').getByRole('button', { name: 'Edit' }).click();
    await page.locator('#phone').fill('0911111111');
    await page.locator('#email').fill('updated@example.com');
    await submitForm(page);
    await expect(page.getByText('Employee saved successfully')).toBeVisible();
    await page.locator('#email').fill('invalid-email');
    expect(await page.locator('#email').evaluate((element) => !element.checkValidity())).toBeTruthy();
  } finally {
    await deleteEmployee(request, employee.id);
  }
});

test('FE-UPDATE-004/005 duplicate and missing record', async ({ page, request }) => {
  const first = await createEmployee(request, uniqueEmployee());
  const second = await createEmployee(request, uniqueEmployee());
  try {
    const updatePayload = {
      employeeCode: first.employeeCode,
      fullName: second.fullName,
      gender: second.gender,
      dateOfBirth: second.dateOfBirth,
      phone: second.phone,
      email: second.email,
      status: 'ACTIVE',
    };
    const duplicate = await request.put(`/api/employees/${second.id}`, { data: updatePayload });
    expect(duplicate.status()).toBe(409);
    const missing = await request.put('/api/employees/999999', { data: first });
    expect(missing.status()).toBe(404);
  } finally {
    await deleteEmployee(request, first.id);
    await deleteEmployee(request, second.id);
  }
});

test('FE-DELETE-001/002/003 delete flows', async ({ page, request }) => {
  const employee = await createEmployee(request, uniqueEmployee());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('#searchEmployeeCode').fill(employee.employeeCode);
  await expect(page.locator('#employeeRows tr')).toHaveCount(1);
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.locator('#employeeRows tr').getByRole('button', { name: 'Delete' }).click();
  expect((await request.get(`/api/employees/${employee.id}`)).status()).toBe(200);
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('#employeeRows tr').getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('#employeeRows')).toContainText('No employees found');
  expect((await request.delete('/api/employees/999999')).status()).toBe(404);
});

test('FE-DETAIL-001/002 detail behavior', async ({ page, request }) => {
  const employee = await createEmployee(request, uniqueEmployee());
  try {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('#searchEmployeeCode').fill(employee.employeeCode);
    await expect(page.locator('#employeeRows tr')).toHaveCount(1);
    page.once('dialog', (dialog) => dialog.accept());
    await page.locator('#employeeRows tr').getByRole('button', { name: 'View' }).click();
    expect((await request.get('/api/employees/999999')).status()).toBe(404);
  } finally {
    await deleteEmployee(request, employee.id);
  }
});

test('FE-EXPORT-001/002/003 CSV export', async ({ page }) => {
  const response = await page.request.get('/api/employees/export/csv');
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('employeeCode,fullName');
  const filtered = await page.request.get('/api/employees/export/csv?employeeCode=ZZZ_NO_MATCH');
  expect(filtered.status()).toBe(200);
  expect(await filtered.text()).toContain('employeeCode,fullName');
});

test('FE-ROBUST-002 SQL-like search and responsive UI', async ({ page }) => {
  await page.locator('#searchFullName').fill("' OR 1=1 --");
  await expect(page.locator('#employeeRows')).toContainText('No employees found');
  await page.setViewportSize({ width: 500, height: 800 });
  await expect(page.getByRole('button', { name: 'Add Employee' })).toBeVisible();
});
