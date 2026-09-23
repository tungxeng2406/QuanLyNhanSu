# API Specification - HR Management (Spring Boot REST API)

## 1. Scope
- Spec nay dinh nghia contract cho toan bo endpoint REST quan ly nhan su trong pham vi MVP: behavior, HTTP status, request/response payload chi tiet va vi du JSON.
- Kieu endpoint: REST API JSON endpoint va file endpoint (CSV/XLSX). Khong co endpoint render HTML tu server (khong Thymeleaf/Spring MVC view).
- FE (HTML/CSS/JS tinh) la client duy nhat goi cac endpoint nay qua fetch/AJAX.
- UI MVP chi hien thi va nhap 6 field: employeeCode, fullName, gender, dateOfBirth, phone, email. Cac field mo rong trong response/entity la backend persistence va khong hien thi tren UI hien tai.
- File nay la nguon su that duy nhat cho ca endpoint behavior lan payload schema (thay the cho 2 file rieng truoc day: api-spec.md + api_payload.md, da duoc gop lai de tranh trung lap va lech contract).

## 1.1. Tai lieu lien quan
- Validation va coding standards: docs/coding-rules.md
- Backend flow va error mapping: design_BE.md
- FE flow goi API: design_FE.md
- Test mapping va coverage target: testcase_FE.md, testcase_BE.md, testcase_DB.md

## 2. Conventions
- Base path: /api/employees
- Content-Type request/response JSON: application/json; charset=UTF-8
- Date format: yyyy-MM-dd
- Timezone xuat file: Asia/Ho_Chi_Minh
- Character encoding:
	- JSON: UTF-8
	- CSV: UTF-8 with BOM
- Sort format: sort=<field>,<asc|desc>
- CORS: BE cho phep origin cua FE static (cau hinh trong design_BE.md)

## 3. Standard error model
Ap dung cho branch tra loi loi nghiep vu/he thong. Moi loi tra ve JSON theo schema ErrorResponse ben duoi.

| Error Code | HTTP | Y nghia | Goi y xu ly FE |
|---|---|---|---|
| EMP-400-001 | 400 | Du lieu dau vao khong hop le | Hien thi loi tai field tuong ung tren form |
| EMP-400-002 | 400 | Gia tri search/filter khong hop le | Hien thi banner loi bo loc |
| EMP-404-001 | 404 | Khong tim thay nhan su theo id | Hien thong bao khong tim thay du lieu |
| EMP-409-001 | 409 | employeeCode bi trung | Gan loi vao field employeeCode |
| EMP-500-001 | 500 | Loi he thong chung | Hien thong bao he thong va log correlationId |
| EMP-500-002 | 500 | Loi tao file export | Hien thong bao tai thu lai |

### 3.1. ErrorResponse schema
```json
{
  "errorCode": "EMP-400-001",
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "rejectedValue": "abc@",
      "reason": "Email format is invalid"
    }
  ],
  "path": "/api/employees",
  "timestamp": "2026-09-23T09:00:00",
  "correlationId": "d9e8b4a8-7b4d-4f0d-b2e1-2746c2b8901a"
}
```

## 4. Field validation reference (dung chung cho Create/Update)
| Field | Type | Required | Rule |
|---|---|---|---|
| employeeCode | String | Yes | 3-20, regex ^[A-Z0-9_\-]+$, unique |
| fullName | String | Yes | 2-150 |
| gender | String | No | MALE/FEMALE/OTHER |
| dateOfBirth | Date | No | yyyy-MM-dd, <= currentDate |
| phone | String | No | regex ^(\+84|0)[0-9]{9,10}$ |
| email | String | No | RFC-like email, max 150 |
| address | String | No | max 255 |
| department | String | No | max 100 |
| position | String | No | max 100 |
| hireDate | Date | No | yyyy-MM-dd |
| status | String | Yes | ACTIVE/INACTIVE/RESIGNED |
| baseSalary | Number | No | >= 0, scale 2 |
| note | String | No | max 500 |

UI rule:
- Tren form create/update, chi hien thi 6 field tren; employeeCode va fullName bat buoc.
- Backend van co the tra ve cac field mo rong de tuong thich domain, nhung FE MVP khong render/nhap cac field do.

Ghi chu: chi tiet ky thuat validation (min/max length, boundary, trim...) xem docs/coding-rules.md.

## 5. Endpoint contract chi tiet

### 5.1. GET /api/employees
Muc dich:
- Tra ve danh sach + tim kiem + loc + sort + pagination duoi dang JSON.

Query params:
| Param | Type | Required | Default | Rule |
|---|---|---|---|---|
| employeeCode | String | No | empty | Contains, khong phan biet hoa thuong |
| fullName | String | No | empty | Contains, khong phan biet hoa thuong |
| gender | String | No | empty | MALE/FEMALE/OTHER |
| dateOfBirth | Date | No | empty | yyyy-MM-dd, match exact |
| phone | String | No | empty | Contains |
| email | String | No | empty | Contains, khong phan biet hoa thuong |
| page | int | No | 0 | page >= 0 |
| size | int | No | 10 | 1 <= size <= 100 |
| sort | String | No | employeeCode,asc | Field hop le + huong sap xep |

Vi du query:
- /api/employees?employeeCode=E001&gender=MALE&email=company.com&page=0&size=10&sort=employeeCode,asc

Response thanh cong (HTTP 200, EmployeeListResponse):
```json
{
  "content": [
    {
      "id": 1,
      "employeeCode": "E001",
      "fullName": "Nguyen Van A",
      "department": "IT",
      "position": "Developer",
      "hireDate": "2024-01-15",
      "status": "ACTIVE"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 31,
  "totalPages": 4,
  "sort": "employeeCode,asc"
}
```

Error response:
- EMP-400-002 khi gia tri search/filter khong hop le.
- EMP-500-001 khi loi he thong.

### 5.2. POST /api/employees
Muc dich:
- Tao moi nhan su.

Request body (JSON, EmployeeCreateRequest) theo bang field o Muc 4. Vi du:
```json
{
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234567",
  "email": "a.nguyen@company.com",
  "address": "Ha Noi",
  "department": "IT",
  "position": "Developer",
  "hireDate": "2024-01-15",
  "status": "ACTIVE",
  "baseSalary": 18000000.00,
  "note": "Nhan vien chinh thuc"
}
```

Response branch:
- Success: HTTP 201 Created, body EmployeeDto (JSON):
```json
{
  "id": 1,
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234567",
  "email": "a.nguyen@company.com",
  "address": "Ha Noi",
  "department": "IT",
  "position": "Developer",
  "hireDate": "2024-01-15",
  "status": "ACTIVE",
  "baseSalary": 18000000.00,
  "note": "Nhan vien chinh thuc",
  "createdAt": "2026-09-23T09:00:00",
  "updatedAt": "2026-09-23T09:00:00"
}
```
- Validation error: HTTP 400 + ErrorResponse (field errors, EMP-400-001).
- Duplicate code: HTTP 409 + ErrorResponse (EMP-409-001).

### 5.3. GET /api/employees/{id}
Muc dich:
- Xem chi tiet nhan su (JSON), dong thoi FE dung endpoint nay de prefill form sua.

Path params:
| Param | Type | Required |
|---|---|---|
| id | Long | Yes |

Response:
- Success: HTTP 200 + body EmployeeDto (cung cau truc vi du o Muc 5.2).
- Not found: HTTP 404 + ErrorResponse (EMP-404-001).

### 5.4. PUT /api/employees/{id}
Muc dich:
- Cap nhat nhan su.

Request body (JSON, EmployeeUpdateRequest):
- Cung cau truc nhu EmployeeCreateRequest. Vi du:
```json
{
  "employeeCode": "E001",
  "fullName": "Nguyen Van A",
  "gender": "MALE",
  "dateOfBirth": "1995-05-10",
  "phone": "0901234999",
  "email": "a.nguyen@company.com",
  "address": "Ha Noi",
  "department": "Engineering",
  "position": "Senior Developer",
  "hireDate": "2024-01-15",
  "status": "ACTIVE",
  "baseSalary": 22000000.00,
  "note": "Da cap nhat phong ban"
}
```

Rules:
- Validation nhu endpoint tao moi.
- Neu thay doi employeeCode thi van phai unique.

Response:
- Success: HTTP 200 + body EmployeeDto (JSON).
- Validation error: HTTP 400 + ErrorResponse.
- Not found: HTTP 404 + ErrorResponse.
- Duplicate code: HTTP 409 + ErrorResponse.

### 5.5. DELETE /api/employees/{id}
Muc dich:
- Xoa nhan su.

Response:
- Success: HTTP 204 No Content (khong body).
- Not found: HTTP 404 + ErrorResponse (EMP-404-001).

### 5.6. GET /api/employees/export/csv
Muc dich:
- Export danh sach dang loc ra CSV.

Input:
- Cung bo query params nhu GET /api/employees.

Response:
- HTTP 200
- Content-Type: text/csv; charset=UTF-8
- Content-Disposition: attachment; filename="employees_yyyyMMdd_HHmmss.csv"

CSV format rules:
- Encoding: UTF-8 BOM
- Delimiter: comma (,)
- Quote char: double quote (")
- Header order:
	employeeCode,fullName,gender,dateOfBirth,phone,email,address,department,position,hireDate,status,baseSalary,note
- Date format: yyyy-MM-dd
- Decimal format: plain number, 2 decimal digits
- Newline: \n

Error response:
- EMP-400-002: bo loc ngay khong hop le.
- EMP-500-002: loi tao file export.

### 5.7. GET /api/employees/export/xlsx (optional)
Muc dich:
- Export XLSX neu tinh nang duoc bat.

Response:
- HTTP 200
- Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
- Content-Disposition: attachment; filename="employees_yyyyMMdd_HHmmss.xlsx"

Error response:
- EMP-500-002: loi tao file export.

## 6. Sequence-level acceptance
- Moi endpoint deu phai co branch test cho success + validation error + exception.
- Moi endpoint co doi ung testcase ID trong testcase_BE.md.

## 7. Mapping endpoint toi testcase
| Endpoint | Testcase ID chinh |
|---|---|
| GET /api/employees | FE-LIST-*, FE-SEARCH-*, BE-CTL-001..004 |
| POST /api/employees | FE-CREATE-*, BE-CTL-006..008, BE-SVC-005..007 |
| GET /api/employees/{id} | FE-DETAIL-*, BE-CTL-009..011 |
| PUT /api/employees/{id} | FE-UPDATE-*, BE-CTL-012..014 |
| DELETE /api/employees/{id} | FE-DELETE-*, BE-CTL-015..016 |
| GET /api/employees/export/csv | FE-EXPORT-001..003, BE-CTL-017..018, DB-EXP-* |
| GET /api/employees/export/xlsx | FE-EXPORT-004, BE-CTL-019 |

## 8. Contract ownership rule
- File nay (docs/api-spec.md) la nguon su that duy nhat cho: endpoint, HTTP status, behavior va payload schema/vi du.
- Khi tao moi/sua endpoint:
	1. Cap nhat file nay (behavior + payload + error branch) truoc.
	2. Cap nhat design_BE.md neu thay doi flow implementation.
	3. Cap nhat testcase_BE.md/testcase_FE.md mapping testcase ID neu co thay doi luong.
- Khong merge PR neu endpoint da doi ma tai lieu contract chua cap nhat.

