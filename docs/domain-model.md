# Domain Model: Employee MVP

## Mandatory coding-rule compliance

Apply both [Java coding rules](../docs_requirement/java-coding-rules.md) and [JavaScript coding rules](../docs_requirement/javascript-coding-rules.md) to the relevant language files, following [project applicability, adaptations and acceptance gates](coding-rules.md#mandatory-java-and-javascript-conventions).

Document Java entity/DTO responsibilities, invariants and mapping contracts; document complex JavaScript transformations. Apply conventions to related tests too. These requirements do not change the six-field business contract.

## 1. Domain scope

The MVP Employee domain contains exactly six business fields used by the UI and public API:

- `employeeCode`
- `fullName`
- `gender`
- `dateOfBirth`
- `phone`
- `email`

A database resource identifier may exist internally for URL routing, but it is not an Employee business field and is not returned in the public Employee payload.

## 2. Employee fields

| Property | Type | Required | Rule |
|---|---|---:|---|
| `employeeCode` | String | Yes | Unique; 3-20 characters; regex `^[A-Z0-9_-]+$` |
| `fullName` | String | Yes | 2-150 characters; trim leading/trailing spaces |
| `gender` | String/Enum | No | `MALE`, `FEMALE`, `OTHER` |
| `dateOfBirth` | LocalDate | No | Format `yyyy-MM-dd`; cannot be future |
| `phone` | String | No | If present, match `^(\\+84|0)[0-9]{9,10}$` |
| `email` | String | No | Valid email format; maximum 150 characters; not unique |

## 3. Domain invariants

- `employeeCode` must be unique across all employees.
- `employeeCode` and `fullName` cannot be null or blank.
- `employeeCode` is normalized by trimming and must remain uppercase-format input.
- `fullName` is trimmed before persistence.
- Optional empty strings are normalized to null.
- `dateOfBirth` cannot be later than the current date.
- `gender`, when present, must be one of the three allowed values.
- `phone`, when present, must match the Vietnamese phone pattern.
- `email`, when present, must pass email validation.
- Search criteria are optional and combine using AND.
- Text search is case-insensitive contains.
- `gender` and `dateOfBirth` search use exact match.
- Delete is hard delete in the MVP.

## 4. Domain operations

### Create

Creates an Employee after validating all six fields and checking employee code uniqueness.

### Update

Updates all six public fields. The employee code may change only when the new code is unique.

### Search

Supports independent filters for all six fields, pagination and sorting. Text filter input uses a 300ms frontend debounce.

### Detail

Returns the six public Employee fields for a resource identified by its URL ID.

### Delete

Permanently removes the employee in the MVP.

### Export

Exports the six public Employee fields to UTF-8 BOM CSV.

## 5. API DTO contract

### EmployeeCreateRequest

```json
{
  "id": 1,
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234567",
  "email": "a.nguyen@example.com"
}
```

### EmployeeUpdateRequest

Uses the same six-field structure as `EmployeeCreateRequest`.

### EmployeeResponse

```json
{
  "id": 1,
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234567",
  "email": "a.nguyen@example.com"
}
```

### EmployeeListResponse

Contains:

- `content`: array of `EmployeeResponse`.
- `page`: zero-based page number.
- `size`: page size.
- `totalElements`: total matching employees.
- `totalPages`: total pages.
- `sort`: active sort expression.

### ErrorResponse

Contains:

- `errorCode`.
- `message`.
- `details`.
- `path`.
- `timestamp`.
- `correlationId`.

## 6. Removal rule

Any future field must not be added to the Employee public contract without updating:

1. This domain model.
2. The API specification.
3. The database design.
4. Frontend/backend design.
5. Unit, integration and Playwright E2E testcases.
