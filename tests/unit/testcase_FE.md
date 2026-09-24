# Frontend Test Cases: Employee MVP

Execution status (2026-09-24): see [Phase 5 test report](../../docs/phase_5_test_report.md).
Multiple case IDs in a test title do not imply that all expectations were asserted.

## 1. Test standard

- Test tool: Playwright Chromium.
- Base URL: `http://localhost:8080/` or `BASE_URL`.
- UI fields: employeeCode, fullName, gender, dateOfBirth, phone, email.
- Text search debounce: 300ms; select/date search on change.
- Test-created codes are random and are deleted in `finally`.
- Assert visible behavior, request status and error code; do not depend on localized message text.

## 2. Common valid data

```json
{
  "employeeCode": "PW${uniqueSuffix}",
  "fullName": "Playwright Employee",
  "gender": "OTHER",
  "dateOfBirth": "1990-01-10",
  "phone": "0912345678",
  "email": "playwright@example.com"
}
```

## 3. List and pagination cases

| ID | Preconditions | Steps | Validation | Expected output | Cleanup |
|---|---|---|---|---|---|
| FE-LIST-001 | app/server ready | open `/` | heading and table visible | list renders without console/UI error | none |
| FE-LIST-002 | seeded data | enter `ZZZ_NO_MATCH` | auto request completes | `No employees found`; filter remains | clear filter |
| FE-LIST-003 | >=3 rows | click Employee Code sort once | query sort asc | rows ascending | none |
| FE-LIST-004 | sorted asc | click same sort again | query sort desc | rows descending | none |
| FE-LIST-005 | >1 page | click Next | page query changes | next page shown | none |
| FE-LIST-006 | >2 pages | navigate last page | page bounds valid | last page rows shown | none |
| FE-LIST-007 | data exists | request page=9999 | API not 500 | empty page/valid 200 response | none |

## 4. Six-field auto-search cases

| ID | Input | Event | Expected API/filter result |
|---|---|---|---|
| FE-SEARCH-001 | employeeCode `E001` | type then wait 300ms | one matching code |
| FE-SEARCH-002 | fullName `Nhan vien mau 2` | type then wait 300ms | matching name |
| FE-SEARCH-003 | gender `MALE` | change | MALE rows only |
| FE-SEARCH-004 | date `1986-01-01` | change | exact date rows |
| FE-SEARCH-005 | phone `0900000002` | type then wait 300ms | phone row E002 |
| FE-SEARCH-006 | email `employee3@company.com` | type then wait 300ms | email row E003 |
| FE-SEARCH-007 | SQL-like `' OR 1=1 --` | type then wait | no crash/injection; safe empty/matching behavior |
| FE-SEARCH-008 | values in several fields | wait after each change | result satisfies all filters AND |
| FE-SEARCH-009 | active filters | click Clear filters | all six fields empty; default list restored |
| FE-SEARCH-010 | active filters | reload/back/forward | URL and controls restore filter state |

## 5. Create/modal/validation cases

| ID | Preconditions | Input/steps | Expected result | Cleanup |
|---|---|---|---|---|
| FE-CREATE-001 | list loaded | click Add Employee | modal visible, six inputs only | close |
| FE-CREATE-002 | unique random code | fill all six valid fields, Save | POST 201, success, modal closes, row refreshes | delete created ID |
| FE-CREATE-003 | modal open | leave employeeCode blank, submit | native/server validation error; no POST | close |
| FE-CREATE-004 | modal open | leave fullName blank, submit | native/server validation error; no POST | close |
| FE-CREATE-005 | modal open | phone=`abc123` | phone invalid; no successful POST | close |
| FE-CREATE-006 | E001 exists | submit employeeCode E001 | 409 `EMP-409-001`; record unchanged | close |
| FE-CREATE-007 | modal open | fullName with surrounding spaces | saved value trimmed | delete created ID |
| FE-CREATE-008 | modal open | fullName 151 chars | browser max length prevents >150 or server returns 400 | close |
| FE-CREATE-009 | modal open | Vietnamese Unicode name | 201; text renders safely | delete created ID |

## 6. Update cases

| ID | Preconditions | Steps | Expected | Cleanup |
|---|---|---|---|---|
| FE-UPDATE-001 | isolated employee exists | search code, click Edit | modal populated with six fields | delete test employee |
| FE-UPDATE-002 | isolated employee exists | change phone/email, Save | PUT 200; success; refreshed values | delete test employee |
| FE-UPDATE-003 | edit modal | enter invalid email | browser/server validation; no successful update | close/delete |
| FE-UPDATE-004 | two isolated employees | update second with first code | 409 `EMP-409-001`; original unchanged | delete both |
| FE-UPDATE-005 | missing ID | PUT 999999 | 404 `EMP-404-001` | none |

## 7. Delete/detail cases

| ID | Preconditions | Steps | Expected | Cleanup |
|---|---|---|---|---|
| FE-DELETE-001 | isolated employee exists | confirm Delete | 204; row disappears after refresh | none |
| FE-DELETE-002 | isolated employee exists | cancel confirmation | no DELETE request; row remains | delete via API |
| FE-DELETE-003 | missing ID | DELETE 999999 | 404 `EMP-404-001` | none |
| FE-DETAIL-001 | isolated employee exists | click View | six public fields shown in detail message/view | delete employee |
| FE-DETAIL-002 | missing ID | GET 999999 | 404 `EMP-404-001` | none |

## 8. Export cases

| ID | Preconditions | Steps | Expected |
|---|---|---|---|
| FE-EXPORT-001 | seeded data | click Export CSV | 200, UTF-8 BOM, six-field header, attachment filename |
| FE-EXPORT-002 | active filters | export CSV | file contains only AND-matching rows |
| FE-EXPORT-003 | no matching filter | export CSV | 200 with header only |
| FE-EXPORT-004 | MVP scope | request XLSX | mark Not Applicable because XLSX is not an MVP feature |

## 9. Robustness/security cases

| ID | Steps | Expected |
|---|---|---|
| FE-ROBUST-001 | submit `<script>alert(1)</script>` as fullName | no script execution; rendered value is text |
| FE-ROBUST-002 | enter SQL-like search text | no SQL error or data leak |
| FE-ROBUST-003 | click Save repeatedly | only one POST; button disabled while pending |
| FE-ROBUST-004 | reload after create | GET only; no repeated POST |
| FE-ROBUST-005 | viewport 500px | filter grid/modal/table remain usable |
| FE-ROBUST-006 | date `2024-02-29` | accepted as valid leap date |
| FE-EXC-001 | mock API 500 during save | friendly error; modal remains usable |
| FE-EXC-002 | mock export timeout | friendly error; UI does not hang |

## 10. Automation mapping

- `e2e/employee.spec.js`: core list/search/modal/validation/create/delete suite.
- `e2e/all-cases.spec.js`: expanded FE cases.
- API cleanup helper: `e2e/employee.helpers.js`.
- Run: `npm run e2e`.
- Use `BASE_URL` to target another server.

## 11. Definition of done

- Every applicable High case passes.
- Not Applicable cases have a documented reason.
- Test records are removed after each test.
- No test depends on a fixed test execution order.
