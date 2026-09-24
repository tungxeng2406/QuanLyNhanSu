const { expect } = require('@playwright/test');

function uniqueEmployee(overrides = {}) {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-8);
  return {
    employeeCode: `PW${suffix}`,
    fullName: `Playwright Employee ${suffix}`,
    gender: 'OTHER',
    dateOfBirth: '1990-01-10',
    phone: `091${suffix.slice(-7)}`,
    email: `playwright.${suffix}@example.com`,
    ...overrides,
  };
}

async function createEmployee(request, employee) {
  const response = await request.post('/api/employees', { data: employee });
  expect(response.status()).toBe(201);
  return response.json();
}

async function deleteEmployee(request, id) {
  if (!id) return;
  const response = await request.delete(`/api/employees/${id}`);
  expect([204, 404]).toContain(response.status());
}

async function clearSearch(page) {
  await page.locator('#resetButton').evaluate((element) => element.click());
  await expect(page.locator('#searchEmployeeCode')).toHaveValue('');
  await expect(page.locator('#searchFullName')).toHaveValue('');
  await expect(page.locator('#searchGender')).toHaveValue('');
  await expect(page.locator('#searchDateOfBirth')).toHaveValue('');
  await expect(page.locator('#searchPhone')).toHaveValue('');
  await expect(page.locator('#searchEmail')).toHaveValue('');
}

module.exports = { uniqueEmployee, createEmployee, deleteEmployee, clearSearch };
