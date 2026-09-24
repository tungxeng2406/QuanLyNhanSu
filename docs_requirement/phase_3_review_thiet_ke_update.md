# Phase 3 Review Update: Phuong An Duoc Chot

## Mandatory coding-rule compliance

Apply both [Java coding rules](java-coding-rules.md) and [JavaScript coding rules](javascript-coding-rules.md) to the relevant language files, following [project applicability, adaptations and acceptance gates](../docs/coding-rules.md#mandatory-java-and-javascript-conventions).

Baseline addition: applying both conventions is required for implementation and acceptance. Review Java documentation contracts, JavaScript JSDoc, meaningful comments and the remaining formatting/naming/error-handling rules. Missing documentation or unverified checks must remain explicit outstanding work.

## 1. Muc tieu

Chon phuong an phu hop nhat de dua MVP ve mot baseline nhat quan, de implement, de test va it rui ro nhat.

## 2. Phuong an duoc chot

### 2.1. API va DTO

**Chon:** Tach DTO UI thanh 6 field va de backend tu gan gia tri mac dinh cho field mo rong.

- `EmployeeCreateRequest` va `EmployeeUpdateRequest` chi nhan:
  - `employeeCode`
  - `fullName`
  - `gender`
  - `dateOfBirth`
  - `phone`
  - `email`
- `employeeCode` va `fullName` bat buoc.
- Cac field mo rong van co the ton tai trong Entity/DB de mo rong sau, nhung `status` khong nam trong MVP contract.
- API spec phai mo ta dung DTO thuc te, khong bat client gui field an.

**Ly do:** UI va API cung mot contract 6 field, khong con field an `status` gay nham lan.

### 2.2. Search

**Chon:** Search 6 field, ket hop AND.

- `employeeCode`, `fullName`, `phone`, `email`: contains, khong phan biet hoa thuong.
- `gender`, `dateOfBirth`: exact match.
- Text input debounce 300ms.
- Select/date goi search khi `change`.
- Khi search khong co ket qua: hien `No employees found`.

**Ly do:** Giam request, tranh race condition va phu hop nhu cau search theo tung field.

### 2.3. URL state

**Chon:** Luu 6 filter, page, size va sort tren URL.

- Khi filter thay doi: dung `history.replaceState`.
- Khi user chuyen page/sort: cap nhat URL va reload data.
- Khi reload trang: doc URL de khoi phuc filter.
- Ho tro `popstate` cho Back/Forward.

**Ly do:** Workflow co the bookmark, reload khong mat context va test duoc deterministically.

### 2.4. Sort

**Chon:** Them sort control tren header bang cho 3 cot chinh:

- Employee Code
- Full Name
- Date of Birth

Moi lan click doi `asc`/`desc`, cap nhat URL va goi API.

**Ly do:** Requirement da yeu cau sort va testcase da co sort; them control la cach nhat quan nhat.

### 2.5. Create/Update

**Chon:** Dung mot modal cho Add/Edit.

- Add: mo form rong.
- Edit: GET detail, nap 6 field.
- Save disable trong luc request.
- Hien `Saving...` khi dang gui.
- Thanh cong: dong modal, hien message, refresh list.
- That bai: giu modal va hien loi.
- Duplicate employee code: HTTP 409 `EMP-409-001` cho ca POST va PUT.

**Ly do:** Giu UX hien tai va ngan double-submit.

### 2.6. Delete

**Chon:** Hard delete trong MVP.

- Bat buoc confirm.
- Thanh cong: HTTP 204 va refresh list.
- Huy confirm: khong gui request.
- ID khong ton tai: HTTP 404 `EMP-404-001`.

Audit log va soft delete de phase sau.

### 2.7. CSV

**Chon:** CSV chi xuat 6 field UI trong MVP.

Header:

```text
employeeCode,fullName,gender,dateOfBirth,phone,email
```

- UTF-8 BOM.
- Dung cung 6 filter hien tai.
- Empty result: HTTP 200, chi co header.
- XLSX khong lam trong MVP.

**Ly do:** Pham vi output dong nhat voi UI va giam dependency Apache POI.

### 2.8. Seed va database

**Chon:** Giữ `schema.sql` + `data.sql`, khong dung startup initializer Java.

- Local/dev: H2 file mode.
- Test: H2 in-memory.
- `data.sql` dung `WHERE NOT EXISTS`.
- DB rong: tao dung 50 record deterministic.
- DB da co du lieu: bo qua seed.
- Production: profile khong seed demo, H2 Console disabled.

### 2.9. E2E

**Chon:** Playwright suite doc lap, server lifecycle ro rang.

- Playwright `webServer` tu khoi dong app neu can.
- Hoac script CI start app truoc khi test va stop sau khi test.
- `workers=1` voi H2 file mode.
- CRUD test tao code random.
- Cleanup trong `finally`.
- Khong assert tong so trang co dinh neu testcase khong can.
- Assert HTTP status/errorCode thay vi phu thuoc message tieng Viet/Anh.

## 3. Thay doi bat buoc truoc khi tiep tuc

1. Tach `EmployeeCreateRequest` va `EmployeeUpdateRequest` 6 field.
2. Loai bo `status` khoi EmployeeRequest, entity contract va schema neu khong con nhu cau backend-only.
3. Them debounce 300ms cho text search.
4. Them URL state va `popstate`.
5. Them sort control cho 3 cot chinh.
6. Disable Save trong luc POST/PUT.
7. Sua duplicate mapping POST/PUT thanh 409 `EMP-409-001`.
8. Sua CSV contract va implementation chi con 6 field.
9. Sua testcase route cu sang SPA/modal flow.
10. Them Playwright webServer hoac script quan ly server.
11. Them integration test cho DTO 6 field, duplicate 409, CSV header va seed idempotency.
12. Cap nhat requirement, API, FE/BE/DB design va testcase sau moi thay doi.

## 4. Thu tu implement de giam rui ro

### Step 1: Contract va DTO

- Chot API spec.
- Tach request DTO.
- Viet test validation/duplicate.

### Step 2: Backend behavior

- Request/response khong chua field `status`.
- Duplicate 409.
- Search AND.
- CSV 6 field.

### Step 3: Frontend behavior

- Debounce.
- URL state.
- Sort controls.
- Save lock.

### Step 4: E2E infrastructure

- Web server lifecycle.
- Isolated random test data.
- Cleanup.
- Retry/trace khi fail.

### Step 5: Full validation

```powershell
mvn test '-Dspring.profiles.active=test'
npm run e2e
mvn package '-DskipTests'
```

## 5. Acceptance gate

Chi chuyen sang deploy/commit release khi:

- API spec khop DTO va implementation.
- UI chi thao tac 6 field.
- Debounce va URL state co test pass.
- Sort UI co control va test pass.
- POST/PUT duplicate tra 409.
- Save khong double-submit.
- CSV dung 6 field, BOM va filter.
- Seed local/test dung 50 record va idempotent.
- Playwright suite chay lap lai khong can server thu cong.
- H2 file local khong bi record test lam ban.
- Maven test, Playwright E2E va package deu pass.

## 6. Trang thai review

- Phuong an nay la baseline de implement.
- Cac thay doi code chua duoc thuc hien trong file review nay.
- Sau khi duoc user xac nhan, thuc hien theo thu tu Step 1 den Step 5.
