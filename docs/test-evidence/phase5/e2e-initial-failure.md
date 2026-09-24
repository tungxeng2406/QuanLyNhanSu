# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: all-cases.spec.js >> FE-LIST-002 empty state
- Location: e2e\all-cases.spec.js:28:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Employee Management' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Employee Management' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Employee Management' })

```

```yaml
- banner:
  - paragraph
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { uniqueEmployee, createEmployee, deleteEmployee, clearSearch } = require('./employee.helpers');
  3   | 
  4   | async function openAdd(page) {
  5   |   await page.locator('#addButton').evaluate((element) => element.click());
  6   | }
  7   | 
  8   | async function fillForm(page, employee) {
  9   |   await page.locator('#employeeCode').fill(employee.employeeCode);
  10  |   await page.locator('#fullName').fill(employee.fullName);
  11  |   await page.locator('#gender').selectOption(employee.gender);
  12  |   await page.locator('#dateOfBirth').fill(employee.dateOfBirth);
  13  |   await page.locator('#phone').fill(employee.phone);
  14  |   await page.locator('#email').fill(employee.email);
  15  | }
  16  | 
  17  | async function submitForm(page) {
  18  |   await page.locator('#employeeForm').evaluate((form) => form.requestSubmit());
  19  |   await page.waitForTimeout(700);
  20  | }
  21  | 
  22  | test.beforeEach(async ({ page }) => {
  23  |   await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
> 24  |   await expect(page.getByRole('heading', { name: 'Employee Management' })).toBeVisible();
      |                                                                            ^ Error: expect(locator).toBeVisible() failed
  25  |   await expect(page.locator('#employeeRows tr').first()).toBeVisible({ timeout: 15000 });
  26  | });
  27  | 
  28  | test('FE-LIST-002 empty state', async ({ page }) => {
  29  |   await page.locator('#searchEmployeeCode').fill('ZZZ_NO_MATCH');
  30  |   await expect(page.locator('#employeeRows')).toContainText('No employees found');
  31  | });
  32  | 
  33  | test('FE-LIST-005/006/007 pagination', async ({ page }) => {
  34  |   await expect(page.getByText(/Page 1 \/ \d+/)).toBeVisible();
  35  |   await page.getByRole('button', { name: 'Next' }).click();
  36  |   await expect(page.getByText(/Page 2 \/ \d+/)).toBeVisible();
  37  |   const response = await page.request.get('/api/employees?page=9999&size=10');
  38  |   expect(response.ok()).toBeTruthy();
  39  | });
  40  | 
  41  | test('FE-SEARCH-007/008/009/010 search edge cases', async ({ page }) => {
  42  |   await page.locator('#searchEmployeeCode').fill('ZZZ_NO_MATCH');
  43  |   await expect(page.locator('#employeeRows')).toContainText('No employees found');
  44  |   await page.locator('#searchEmployeeCode').fill('E001');
  45  |   await page.locator('#searchGender').selectOption('MALE');
  46  |   await expect(page.locator('#employeeRows tr').first()).toContainText('E001');
  47  |   await page.locator('#resetButton').evaluate((element) => element.click());
  48  |   await expect(page.locator('#searchEmployeeCode')).toHaveValue('');
  49  |   await expect(page.locator('#employeeRows tr')).toHaveCount(10);
  50  | });
  51  | 
  52  | test('FE-CREATE-005 invalid phone', async ({ page }) => {
  53  |   await openAdd(page);
  54  |   await page.locator('#employeeCode').fill('PW-INVALID-PHONE');
  55  |   await page.locator('#fullName').fill('Invalid Phone');
  56  |   await page.locator('#phone').fill('abc123');
  57  |   expect(await page.locator('#phone').evaluate((element) => !element.checkValidity())).toBeTruthy();
  58  | });
  59  | 
  60  | test('FE-CREATE-006 duplicate employee code', async ({ page }) => {
  61  |   await openAdd(page);
  62  |   await page.locator('#employeeCode').fill('E001');
  63  |   await page.locator('#fullName').fill('Duplicate Employee');
  64  |   await submitForm(page);
  65  |   await expect(page.locator('#alert')).toContainText('Ma nhan vien da ton tai');
  66  | });
  67  | 
  68  | test('FE-CREATE-007/008/009 input quality', async ({ page, request }) => {
  69  |   const employee = uniqueEmployee({ fullName: '  Nguyen Test  ' });
  70  |   let created;
  71  |   try {
  72  |     await openAdd(page);
  73  |     await fillForm(page, employee);
  74  |     await submitForm(page);
  75  |     const result = await (await request.get(`/api/employees?employeeCode=${employee.employeeCode}&page=0&size=10`)).json();
  76  |     created = result.content[0];
  77  |     expect(created.fullName).toBe('Nguyen Test');
  78  |   } finally {
  79  |     await deleteEmployee(request, created?.id);
  80  |   }
  81  |   await openAdd(page);
  82  |   await page.locator('#employeeCode').fill('PW-LONG');
  83  |   await page.locator('#fullName').fill('x'.repeat(151));
  84  |   expect(await page.locator('#fullName').inputValue()).toHaveLength(150);
  85  | });
  86  | 
  87  | test('FE-UPDATE-001/002/003 edit flow', async ({ page, request }) => {
  88  |   const employee = await createEmployee(request, uniqueEmployee());
  89  |   try {
  90  |     await page.reload({ waitUntil: 'domcontentloaded' });
  91  |     await page.locator('#searchEmployeeCode').fill(employee.employeeCode);
  92  |     await expect(page.locator('#employeeRows tr')).toHaveCount(1);
  93  |     await page.locator('#employeeRows tr').getByRole('button', { name: 'Edit' }).click();
  94  |     await expect(page.locator('#employeeCode')).toHaveValue(employee.employeeCode);
  95  |     await expect(page.locator('#fullName')).toHaveValue(employee.fullName);
  96  |     const updated = { ...employee, phone: '0911111111', email: 'updated@example.com' };
  97  |     const updateResponse = await request.put(`/api/employees/${employee.id}`, { data: updated });
  98  |     expect(updateResponse.status()).toBe(200);
  99  |     await page.locator('#email').fill('invalid-email');
  100 |     expect(await page.locator('#email').evaluate((element) => !element.checkValidity())).toBeTruthy();
  101 |   } finally {
  102 |     await deleteEmployee(request, employee.id);
  103 |   }
  104 | });
  105 | 
  106 | test('FE-UPDATE-004/005 duplicate and missing record', async ({ page, request }) => {
  107 |   const first = await createEmployee(request, uniqueEmployee());
  108 |   const second = await createEmployee(request, uniqueEmployee());
  109 |   try {
  110 |     const updatePayload = {
  111 |       employeeCode: first.employeeCode,
  112 |       fullName: second.fullName,
  113 |       gender: second.gender,
  114 |       dateOfBirth: second.dateOfBirth,
  115 |       phone: second.phone,
  116 |       email: second.email,
  117 |     };
  118 |     const duplicate = await request.put(`/api/employees/${second.id}`, { data: updatePayload });
  119 |     expect(duplicate.status()).toBe(409);
  120 |     const missing = await request.put('/api/employees/999999', { data: first });
  121 |     expect(missing.status()).toBe(404);
  122 |   } finally {
  123 |     await deleteEmployee(request, first.id);
  124 |     await deleteEmployee(request, second.id);
```