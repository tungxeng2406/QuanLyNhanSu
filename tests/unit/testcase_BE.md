# Backend Test Cases: Employee Management API

## Mandatory coding-rule compliance

Apply both [Java coding rules](../../docs_requirement/java-coding-rules.md) and [JavaScript coding rules](../../docs_requirement/javascript-coding-rules.md) to the relevant language files, following [project applicability, adaptations and acceptance gates](../../docs/coding-rules.md#mandatory-java-and-javascript-conventions).

Backend source and test code must comply with the Java standard; accompanying JS tooling follows the JavaScript standard. Alongside this functional matrix, report REQ-CODE-001–004 review evidence: files reviewed, Javadoc/JSDoc checks, static-check results, violations and exceptions. Functional PASS does not imply convention PASS.

Execution status (2026-09-24): see [Phase 5 test report](../../docs/phase_5_test_report.md).
The report distinguishes full PASS from partial and not-run coverage.

## 1. Test standard

- Scope: Spring Boot REST Controller, Service, Repository specification, CSV export and error handler.
- Test tools: JUnit 5, Mockito, MockMvc, `@DataJpaTest`, H2 in-memory.
- Default base URL: `/api/employees`.
- Dates: `yyyy-MM-dd`.
- Public request fields: `employeeCode`, `fullName`, `gender`, `dateOfBirth`, `phone`, `email`.
- No public request/response field named `status` or other removed Employee fields.
- Expected JSON assertions must prefer HTTP status and `errorCode` over localized message text.
- Test data created by a test must be cleaned up in `finally` or transaction rollback.

## 2. Field validation reference

| Field | Valid example | Invalid examples | Expected |
|---|---|---|---|
| employeeCode | `E001`, `HR_001` | `e001`, `E 01`, `E@01`, 2 chars, 21 chars | 400 `EMP-400-001`; duplicate is 409 |
| fullName | `Nguyen Van A` | blank, 1 char, >150 chars | 400 `EMP-400-001` |
| gender | `MALE`, `FEMALE`, `OTHER` | `UNKNOWN`, empty optional | 400 for invalid enum |
| dateOfBirth | `1995-05-10`, null | `2099-01-01`, `2023-02-29` | 400 for invalid/future date |
| phone | `0901234567`, `+84901234567` | `abc123`, `0123`, invalid prefix | 400 `EMP-400-001` |
| email | `a@example.com`, null | `abc@`, `a@`, >150 chars | 400 `EMP-400-001` |

## 3. Controller/API cases

| ID | Method | Preconditions | Input/request | Steps | Validation | Expected output | Priority | Automation |
|---|---|---|---|---|---|---|---|---|
| BE-CTL-001 | GET list | DB has seed data | No filters, `page=0&size=10&sort=employeeCode,asc` | Call endpoint | page >=0, size 1-100, valid sort | 200; content <=10; metadata page/size/totalElements/totalPages/sort present | High | MockMvc |
| BE-CTL-002 | GET list | E001 exists | `employeeCode=E001` | Call endpoint | case-insensitive contains | 200; every returned code contains E001 case-insensitively | High | MockMvc |
| BE-CTL-003 | GET list | varied names exist | `fullName=nguyen` | Call endpoint | case-insensitive contains | 200; every result name contains Nguyen | High | MockMvc |
| BE-CTL-004 | GET list | varied genders exist | `gender=MALE` | Call endpoint | exact enum | 200; every result gender is MALE | High | MockMvc |
| BE-CTL-005 | GET list | matching DOB exists | `dateOfBirth=1990-01-01` | Call endpoint | ISO date exact | 200; every result has exact DOB | High | MockMvc |
| BE-CTL-006 | GET list | phone/email data exists | `phone=090`, then `email=company.com` | Call each endpoint | contains matching | 200; only matching records returned | High | MockMvc |
| BE-CTL-007 | GET list | varied data exists | All six filters together | Call endpoint | filters combine AND | 200; each item satisfies all active filters | High | MockMvc |
| BE-CTL-008 | GET list | none | `page=-1`, `size=0`, `size=101`, invalid sort | Call each request | reject invalid query | 400 `EMP-400-001`, never 500 | High | MockMvc |
| BE-CTL-009 | GET detail | ID exists | `/api/employees/{id}` | Call endpoint | numeric ID | 200; response contains exactly six public fields plus no removed Employee fields | High | MockMvc |
| BE-CTL-010 | GET detail | ID missing | ID `999999` | Call endpoint | numeric ID | 404 `EMP-404-001`; standardized ErrorResponse | High | MockMvc |
| BE-CTL-011 | POST create | unique test code | Valid six-field JSON | POST JSON | all field rules pass | 201; EmployeeResponse returned; Location may point to resource | High | MockMvc |
| BE-CTL-012 | POST create | none | Missing employeeCode | POST JSON | required validation | 400 `EMP-400-001`; details.field=employeeCode | High | MockMvc |
| BE-CTL-013 | POST create | none | Missing fullName | POST JSON | required validation | 400; details.field=fullName | High | MockMvc |
| BE-CTL-014 | POST create | none | Invalid code/gender/date/phone/email | POST each invalid payload | field validation | 400; correct field details; no row inserted | High | MockMvc |
| BE-CTL-015 | POST create | E001 exists | employeeCode E001 | POST JSON | unique constraint | 409 `EMP-409-001`; no new row | High | MockMvc |
| BE-CTL-016 | PUT update | test employee exists | Valid changed six fields | PUT JSON | same validation as POST | 200; response reflects changes | High | MockMvc |
| BE-CTL-017 | PUT update | employee exists | New code already used by another row | PUT JSON | uniqueness business rule | 409 `EMP-409-001`; original row unchanged | High | MockMvc |
| BE-CTL-018 | PUT update | ID missing | Valid JSON, ID 999999 | PUT JSON | resource existence | 404 `EMP-404-001` | High | MockMvc |
| BE-CTL-019 | DELETE | ID exists | `/api/employees/{id}` | DELETE | resource existence | 204, empty body; subsequent GET returns 404 | High | MockMvc |
| BE-CTL-020 | DELETE | ID missing | ID 999999 | DELETE | resource existence | 404 `EMP-404-001` | High | MockMvc |
| BE-CTL-021 | CSV export | data exists | Six filters and sort | GET export | same filter validation as list | 200; `text/csv; charset=UTF-8`; Content-Disposition filename; BOM | High | MockMvc |
| BE-CTL-022 | CSV export | no match | `employeeCode=ZZZ_NO_MATCH` | GET export | valid filter | 200; header only; no data row | Medium | MockMvc |
| BE-CTL-023 | CORS | local allowed origin | OPTIONS preflight | Send origin/method headers | origin policy | 200/204 and allowed origin header | Medium | MockMvc |

## 4. Service cases

| ID | Method | Input | Steps | Expected |
|---|---|---|---|---|
| BE-SVC-001 | search | six filters empty | Call service | repository receives empty specification; page maps correctly |
| BE-SVC-002 | search | each individual filter | Call service per field | correct predicate: contains or exact |
| BE-SVC-003 | search | six filters populated | Call service | predicates combine with AND |
| BE-SVC-004 | create | valid request | Call service | trims strings, maps DTO, saves once |
| BE-SVC-005 | create | duplicate code | Mock existsByEmployeeCode=true | BusinessException mapped to 409 |
| BE-SVC-006 | update | valid request | Call service | existing row updated and saved |
| BE-SVC-007 | update | duplicate code on another ID | Mock repository match | BusinessException; row not saved |
| BE-SVC-008 | get/delete | missing ID | Mock empty Optional | NotFoundException |
| BE-SVC-009 | export | matching records | Call export | BOM, six-field header, escaped CSV values |
| BE-SVC-010 | export | no records | Call export | BOM plus header only |

## 5. Repository cases

| ID | Query concern | Data setup | Expected |
|---|---|---|---|
| BE-REP-001 | employeeCode contains | E001, E010 | only codes containing input |
| BE-REP-002 | fullName contains case-insensitive | mixed-case names | case-independent matches |
| BE-REP-003 | gender exact | MALE/FEMALE/OTHER | only requested gender |
| BE-REP-004 | DOB exact | multiple dates | only exact date |
| BE-REP-005 | phone/email contains | multiple values | matching values only |
| BE-REP-006 | AND combination | varied records | intersection only |
| BE-REP-007 | pagination/sort | >20 rows | stable page and order |

## 6. Error handler cases

| ID | Trigger | Expected HTTP | Expected body |
|---|---|---:|---|
| BE-ERR-001 | Bean validation exception | 400 | EMP-400-001 with field details |
| BE-ERR-002 | Duplicate code BusinessException | 409 | EMP-409-001 |
| BE-ERR-003 | NotFoundException | 404 | EMP-404-001 |
| BE-ERR-004 | Invalid query/path type | 400 | EMP-400-001 |
| BE-ERR-005 | Unexpected RuntimeException | 500 | EMP-500-001, no stack trace |

## 7. Definition of done

- All High cases pass.
- Every public endpoint has success and error coverage.
- Response contains no removed Employee fields.
- Maven test passes with H2 in-memory.
