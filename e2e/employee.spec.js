const { test, expect } = require('@playwright/test');
const { uniqueEmployee, createEmployee, deleteEmployee, clearSearch } = require('./employee.helpers');

test.describe('Employee management UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Employee Management' })).toBeVisible();
    await expect(page.locator('#employeeRows tr').first()).toBeVisible({ timeout: 15000 });
  });

  test('renders the seeded employee list', async ({ page }) => {
    await expect(page.locator('#employeeRows tr')).toHaveCount(10);
    await expect(page.getByRole('button', { name: /employeeCode/i })).toBeVisible();
    await expect(page.getByText(/Page 1 \/ \d+/)).toBeVisible();
  });

  test('auto-searches by employee code and clears safely', async ({ page }) => {
    await searchAndWait(page, '#searchEmployeeCode', 'E001');
    await expect(page.locator('#employeeRows tr')).toHaveCount(1, { timeout: 10000 });
    await expect(page.locator('#employeeRows tr').first()).toContainText('E001');
    await clearSearch(page);
    await expect(page.locator('#employeeRows tr')).toHaveCount(10);
  });

  test('auto-searches by all six fields', async ({ page }) => {
    const filters = [
      ['#searchEmployeeCode', 'E001'],
      ['#searchFullName', 'Nhan vien mau 2'],
      ['#searchGender', 'MALE'],
      ['#searchDateOfBirth', '1986-01-01'],
      ['#searchPhone', '0900000002'],
      ['#searchEmail', 'employee3@company.com'],
    ];

    for (const [selector, value] of filters) {
      await clearSearch(page);
      await searchAndWait(page, selector, value);
      await expect(page.locator('#employeeRows tr')).not.toHaveCount(0);
    }
  });

  test('opens and closes the add employee modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Employee' }).click();
    await expect(page.locator('#formPanel')).toBeVisible();
    await page.locator('#closeFormButton').evaluate((element) => element.click());
    await expect(page.locator('#formPanel')).toBeHidden();
  });

  test('rejects empty required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Employee' }).click();
    await page.locator('#employeeForm').evaluate((form) => form.requestSubmit());
    await expect(page.locator('#employeeCode')).toBeFocused();
    await expect(page.locator('#employeeCode')).toHaveJSProperty('validity.valid', false);
    await expect(page.locator('#fullName')).toHaveJSProperty('validity.valid', false);
  });

  test('creates and deletes an isolated employee record', async ({ page, request }) => {
    const employee = uniqueEmployee();
    let created;
    try {
      await page.getByRole('button', { name: 'Add Employee' }).click();
      await page.locator('#employeeCode').fill(employee.employeeCode);
      await page.locator('#fullName').fill(employee.fullName);
      await page.locator('#gender').selectOption(employee.gender);
      await page.locator('#dateOfBirth').fill(employee.dateOfBirth);
      await page.locator('#phone').fill(employee.phone);
      await page.locator('#email').fill(employee.email);
      await page.locator('#employeeForm').evaluate((form) => form.requestSubmit());
      await expect(page.getByText('Employee saved successfully')).toBeVisible();

      const response = await request.get(`/api/employees?employeeCode=${employee.employeeCode}&page=0&size=10`);
      expect(response.ok()).toBeTruthy();
      const result = await response.json();
      expect(result.totalElements).toBe(1);
      created = result.content[0];
      expect(created.fullName).toBe(employee.fullName);
    } finally {
      await deleteEmployee(request, created?.id);
    }
  });
});

function searchParam(selector) {
  return {
    '#searchEmployeeCode': 'employeeCode',
    '#searchFullName': 'fullName',
    '#searchGender': 'gender',
    '#searchDateOfBirth': 'dateOfBirth',
    '#searchPhone': 'phone',
    '#searchEmail': 'email',
  }[selector];
}

async function searchAndWait(page, selector, value) {
  const responsePromise = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return url.pathname === '/api/employees' && url.searchParams.get(searchParam(selector)) === value;
  });
  const field = page.locator(selector);
  if (await field.evaluate((element) => element.tagName === 'SELECT')) {
    await field.selectOption(value);
  } else {
    await field.fill(value);
  }
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.content.length).toBeGreaterThan(0);
  for (const employee of data.content) {
    expect(employee[searchParam(selector)].toLowerCase()).toContain(value.toLowerCase());
  }
  await expect(page.locator('#employeeRows tr').first()).toContainText(data.content[0].employeeCode);
}
