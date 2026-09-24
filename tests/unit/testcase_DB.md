# Database Test Cases: Employee MVP

## Mandatory coding-rule compliance

Apply both [Java coding rules](../../docs_requirement/java-coding-rules.md) and [JavaScript coding rules](../../docs_requirement/javascript-coding-rules.md) to the relevant language files, following [project applicability, adaptations and acceptance gates](../../docs/coding-rules.md#mandatory-java-and-javascript-conventions).

Apply the Java standard to database integration tests, entities and repositories and the JavaScript standard to related JS tooling. Review documentation for transactions, fixtures and cleanup. Report REQ-CODE-001–004 separately from database assertions; SQL files are not Java/JavaScript code.

Execution status (2026-09-24): see [Phase 5 test report](../../docs/phase_5_test_report.md).
The report distinguishes full PASS from partial and not-run coverage.

## 1. Test setup

- Database: H2 in-memory for automated tests.
- Schema source: `schema.sql`.
- Seed source: `data.sql`.
- Each test uses a clean transaction or isolated database.
- Public Employee fields: employeeCode, fullName, gender, dateOfBirth, phone, email.
- Removed fields must not be required by the MVP schema contract.

## 2. Schema cases

| ID | Preconditions | SQL/action | Validation | Expected result | Cleanup |
|---|---|---|---|---|---|
| DB-SCH-001 | empty H2 | inspect `employees` metadata | table exists | table created successfully | rollback |
| DB-SCH-002 | schema loaded | inspect columns | six public fields present with correct types | employee_code/full_name/gender/date_of_birth/phone/email exist | rollback |
| DB-SCH-003 | schema loaded | inspect primary key | id uniqueness | primary key exists for internal row identity | rollback |
| DB-SCH-004 | schema loaded | inspect unique constraint | employee_code unique | duplicate code rejected | rollback |
| DB-SCH-005 | schema loaded | inspect nullability | employee_code/full_name required | null insert rejected | rollback |
| DB-SCH-006 | schema loaded | inspect indexes | search fields supported | indexes exist for code/name/phone/email where configured | rollback |

## 3. Data integrity cases

| ID | Input data | Steps | Expected |
|---|---|---|---|
| DB-CON-001 | valid six fields | INSERT one row | insert succeeds |
| DB-CON-002 | employeeCode duplicate | insert existing code | unique constraint rejects |
| DB-CON-003 | employeeCode null/blank | insert | rejected by constraint/app validation |
| DB-CON-004 | fullName null/blank | insert | rejected by constraint/app validation |
| DB-CON-005 | invalid gender | insert UNKNOWN | rejected by app validation |
| DB-CON-006 | future DOB | insert 2099-01-01 | rejected by app validation |
| DB-CON-007 | invalid phone | insert abc123 | rejected by app validation |
| DB-CON-008 | invalid email | insert abc@ | rejected by app validation |
| DB-CON-009 | Unicode name | insert Vietnamese name | stored and read without encoding loss |
| DB-CON-010 | max valid lengths | code 20/fullName 150/email 150 | insert succeeds |
| DB-CON-011 | over max lengths | fullName 151/email 151 | rejected before persistence |

## 4. Query/search cases

| ID | Seed data | Query | Expected |
|---|---|---|---|
| DB-QUE-001 | E001, E010 | employeeCode contains E00 | matching codes only |
| DB-QUE-002 | varied names | fullName contains nguyen | case-insensitive matches |
| DB-QUE-003 | varied gender | gender=MALE | exact MALE rows only |
| DB-QUE-004 | varied DOB | dateOfBirth=1990-01-01 | exact date rows only |
| DB-QUE-005 | varied phone | phone contains 090 | matching phone rows only |
| DB-QUE-006 | varied email | email contains company.com | matching email rows only |
| DB-QUE-007 | varied data | all six filters | AND intersection only |
| DB-QUE-008 | varied data | no filters | all records subject to pagination |
| DB-QUE-009 | >20 rows | sort employeeCode asc | ascending order |
| DB-QUE-010 | >20 rows | sort fullName desc | descending order |
| DB-QUE-011 | >20 rows | page 0 size 10 | first ten records |
| DB-QUE-012 | >20 rows | page 2 size 10 | correct offset/remaining rows |
| DB-QUE-013 | any data | page 9999 | empty page, no 500 |

## 5. Seed/data.sql cases

| ID | Preconditions | Steps | Expected | Cleanup |
|---|---|---|---|---|
| DB-SEED-001 | fresh database | run schema then data.sql | exactly 50 deterministic rows | drop DB |
| DB-SEED-002 | database already has 50 rows | run data.sql again | still 50 rows, no duplicate | drop DB |
| DB-SEED-003 | database has business row | run data.sql | no demo rows inserted by seed guard | rollback |
| DB-SEED-004 | repeated application restart | restart local H2 | row count unchanged | remove local DB only in test env |

## 6. Transaction cases

| ID | Scenario | Steps | Expected |
|---|---|---|---|
| DB-TXN-001 | commit | insert valid row, commit | row persists |
| DB-TXN-002 | rollback | insert then force failure, rollback | row does not persist |
| DB-TXN-003 | delete transaction | delete existing row, commit | row absent |
| DB-TXN-004 | duplicate conflict | duplicate insert | transaction remains consistent |

## 7. Export-readiness cases

| ID | Query | Expected |
|---|---|---|
| DB-EXP-001 | no filters | six public fields available in stable order |
| DB-EXP-002 | combined filters | only AND-matching rows |
| DB-EXP-003 | null optional fields | export layer receives empty CSV values |
| DB-EXP-004 | Unicode values | export preserves UTF-8 content |

## 8. Definition of done

- Schema, constraints, query branches, seed idempotency and transaction behavior are covered.
- No removed Employee field is required by MVP schema/test fixtures.
- Database tests pass with H2 in-memory.
