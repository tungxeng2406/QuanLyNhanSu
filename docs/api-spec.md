# Employee Management API Specification

## 1. Contract scope

- Base path: `/api/employees`.
- JSON content type: `application/json; charset=UTF-8`.
- Date format: `yyyy-MM-dd`.
- Timestamp format: ISO-8601 local date-time.
- MVP request/response contains exactly six employee fields.
- Resource IDs are used only in URL paths and are not returned as Employee fields.

## 2. Public employee fields

| Field | JSON type | Required | Validation |
|---|---|---:|---|
| `employeeCode` | String | Yes | 3-20 chars, unique, `^[A-Z0-9_-]+$` |
| `fullName` | String | Yes | 2-150 chars, trimmed |
| `gender` | String/null | No | `MALE`, `FEMALE`, `OTHER` |
| `dateOfBirth` | String/null | No | `yyyy-MM-dd`, not future |
| `phone` | String/null | No | If present: `^(\\+84|0)[0-9]{9,10}$` |
| `email` | String/null | No | Valid email, max 150 chars |

Empty optional values are normalized to null.

## 3. EmployeeResponse

```json
{
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234567",
  "email": "a.nguyen@example.com"
}
```

Date fields use ISO dates. The response contains only the six public Employee fields.

## 4. GET /api/employees

Returns a paginated list. All non-empty filters combine with AND.

| Query parameter | Type | Default | Rule |
|---|---|---|---|
| `employeeCode` | String | empty | Case-insensitive contains |
| `fullName` | String | empty | Case-insensitive contains |
| `gender` | String | empty | Exact: MALE/FEMALE/OTHER |
| `dateOfBirth` | Date | empty | Exact `yyyy-MM-dd` |
| `phone` | String | empty | Contains |
| `email` | String | empty | Case-insensitive contains |
| `page` | int | 0 | >= 0 |
| `size` | int | 10 | 1-100 |
| `sort` | String | `employeeCode,asc` | allowed field plus `asc`/`desc` |

Allowed sort fields: `employeeCode`, `fullName`, `gender`, `dateOfBirth`, `phone`, `email`.

Example:

```http
GET /api/employees?employeeCode=E00&gender=MALE&page=0&size=10&sort=fullName,asc
```

Success HTTP 200:

```json
{
  "content": [
    {
      "employeeCode": "E001",
      "fullName": "Nguyen Van A",
      "gender": "MALE",
      "dateOfBirth": "1995-05-10",
      "phone": "0901234567",
      "email": "a.nguyen@example.com"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 1,
  "totalPages": 1,
  "sort": "fullName,asc"
}
```

Empty result is still HTTP 200:

```json
{"content":[],"page":0,"size":10,"totalElements":0,"totalPages":0,"sort":"employeeCode,asc"}
```

## 5. POST /api/employees

Creates an employee.

Request body:

```json
{
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234567",
  "email": "a.nguyen@example.com"
}
```

Success: HTTP 201 with `EmployeeResponse`. A `Location: /api/employees/{id}` header may be returned.

Errors:

- HTTP 400 `EMP-400-001`: missing or invalid field.
- HTTP 409 `EMP-409-001`: duplicate employee code.

## 6. GET /api/employees/{id}

Returns HTTP 200 with `EmployeeResponse`.

Errors:

- HTTP 400 `EMP-400-001`: invalid numeric ID.
- HTTP 404 `EMP-404-001`: ID does not exist.

## 7. PUT /api/employees/{id}

Uses the same six-field request schema as POST. `employeeCode` may be changed only when unique.

```json
{
  "employeeCode": "E001-UPDATED",
  "fullName": "Nguyen Van B",
  "gender": "OTHER",
  "dateOfBirth": "1995-05-10",
  "phone": "0912345678",
  "email": "b.nguyen@example.com"
}
```

Success: HTTP 200 with updated `EmployeeResponse`.

Errors:

- HTTP 400 `EMP-400-001`: missing or invalid field.
- HTTP 404 `EMP-404-001`: employee ID does not exist.
- HTTP 409 `EMP-409-001`: new employee code belongs to another employee.

## 8. DELETE /api/employees/{id}

Hard deletes the employee.

- Success: HTTP 204 with no body.
- Invalid ID: HTTP 400 `EMP-400-001`.
- Missing ID: HTTP 404 `EMP-404-001`.

## 9. GET /api/employees/export/csv

Accepts the six list filters plus `sort` and exports the filtered result.

Success headers:

```http
Content-Type: text/csv; charset=UTF-8
Content-Disposition: attachment; filename="employees_yyyyMMdd_HHmmss.csv"
```

The body is UTF-8 with BOM, comma-delimited, double-quote escaped and uses `\n` line endings.

CSV header order:

```text
employeeCode,fullName,gender,dateOfBirth,phone,email
```

Empty result returns HTTP 200 with the header row only. Invalid filter/sort returns 400 `EMP-400-001`; generation failure returns 500 `EMP-500-002`.

## 10. ErrorResponse

```json
{
  "errorCode": "EMP-400-001",
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "rejectedValue": "invalid",
      "reason": "must be a valid email address"
    }
  ],
  "path": "/api/employees",
  "timestamp": "2026-09-23T10:00:00",
  "correlationId": "d9e8b4a8-7b4d-4f0d-b2e1-2746c2b8901a"
}
```

| Error code | HTTP | Meaning |
|---|---:|---|
| `EMP-400-001` | 400 | Invalid request, query, path or field |
| `EMP-404-001` | 404 | Employee not found |
| `EMP-409-001` | 409 | Duplicate employee code |
| `EMP-500-001` | 500 | Unexpected server error |
| `EMP-500-002` | 500 | CSV export failure |

## 11. Contract rules

- No request or response contains unused backend-only Employee fields.
- Employee payloads contain only `employeeCode`, `fullName`, `gender`, `dateOfBirth`, `phone`, and `email`.
- Clients should assert HTTP status and `errorCode`, not localized message text.
- Any endpoint or field change requires updating this document and related tests before merge.
