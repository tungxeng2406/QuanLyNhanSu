# FE Test Case Result v1

## 1. Test Information

- Application: Employee Management
- URL: `http://localhost:8080/`
- Test date: 2026-09-23
- Environment: Spring Boot local profile, H2 file mode, 50 seeded employees
- Test method: Browser UI smoke/E2E checks with Playwright
- Source testcase: `tests/unit/testcase_FE.md`

## 2. Summary

| Result | Count |
|---|---:|
| PASS | 13 |
| FAIL | 0 |
| NOT RUN | 31 |
|
| Total documented FE cases | 44 |

## 3. Executed Results

| Test ID | Scenario | Result | Evidence / Notes |
|---|---|---|---|
| FE-LIST-001 | Open default employee list | PASS | Page loaded with 10 rows and 7 table columns including actions. |
| FE-LIST-002 | Empty-state rendering | PASS | Search with no matching value renders `No employees found` without layout failure. |
| FE-LIST-005 | First-page pagination | PASS | Default page shows 10 rows and page 1 of 5. |
| FE-SEARCH-001 | Auto-search by employee code | PASS | `employeeCode=E001` returned one matching row. |
| FE-SEARCH-002 | Auto-search by full name | PASS | `fullName=Nhan vien mau 2` returned one matching row. |
| FE-SEARCH-003 | Auto-search by gender | PASS | `gender=MALE` returned matching rows. |
| FE-SEARCH-004 | Auto-search by date of birth | PASS | `dateOfBirth=1986-01-01` returned five matching rows. |
| FE-SEARCH-005 | Auto-search by phone | PASS | `phone=0900000002` returned employee E002. |
| FE-SEARCH-006 | Auto-search by email | PASS | `email=employee3@company.com` returned employee E003. |
| FE-SEARCH-009 | Clear filters | PASS | Direct button activation cleared field values and restored the default list. |
| FE-CREATE-001 | Open add-employee modal | PASS | Modal opened and was visible. |
| FE-CREATE-003/004 | Required employee code and full name | PASS | Native browser validation rejected empty `employeeCode` and `fullName`. |
| FE-ROBUST-004 | Refresh after page load | PASS | Reload returned to the list without a POST request. |
| FE-ROBUST-005 | Responsive layout | NOT RUN | No viewport matrix was captured in this run. |
| FE-CREATE-002 | Create employee through UI | PASS | Payload was accepted with HTTP 201; record id `97` was created and then deleted during cleanup. The success alert `Employee saved successfully` appeared after the asynchronous refresh completed. |

## 4. Observed Issue

### FE-CREATE-002: Create employee through UI

Test data for the next reproducible run:

```json
{
	"employeeCode": "FE-TC-002-001",
	"fullName": "FE Create Test",
	"gender": "OTHER",
	"dateOfBirth": "1990-01-10",
	"phone": "0912345678",
	"email": "fe.create.002@example.com",
	"status": "ACTIVE"
}
```

The rerun passed. The payload produced HTTP 201, the UI showed `Employee saved successfully`, and the created record was verified through `GET /api/employees?employeeCode=FE-TC-002-001`. Record id `97` was deleted after verification. A leftover record `TFE001` from an earlier exploratory run was also removed; H2 now contains exactly the 50 seed records.

During an earlier browser state, an invalid date value (`275760-02-03`) produced HTTP 400 from the API. A valid ISO date (`1986-01-01`) passed, so the invalid value was treated as stale browser input rather than a reproducible normal-input failure.

## 5. Not Run

The following documented scenarios were not executed in this smoke run:

- LIST: sort ascending/descending, last-page pagination, out-of-range pagination.
- SEARCH: combined six-condition search, filter persistence across pagination.
- CREATE: invalid phone, duplicate employee code, trimming, max-length, Unicode input.
- UPDATE: successful update, invalid email, duplicate code, missing record.
- DELETE: confirm, cancel, missing record.
- DETAIL: success and missing record.
- EXPORT: CSV success, filtered CSV, empty export, optional XLSX.
- Robustness: XSS, SQL-like input, double-submit, mobile viewport, leap-date edge case.
- Exception: backend outage and export timeout.

## 6. Conclusion

The core list, six-field auto-search UI, modal, validation and create flow passed the executed smoke checks. The FE test suite is not fully automated in the repository yet; the remaining documented cases are listed as NOT RUN.
