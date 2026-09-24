# Phase 3: Review Thiet Ke

## 1. Pham vi review

Review duoc thuc hien tren:

- `docs/requirement.md`
- `docs/domain-model.md`
- `docs/design_DB.md`
- `docs/api-spec.md`
- `docs/design_FE.md`
- `docs/design_BE.md`
- `docs/coding-rules.md`
- `tests/unit/testcase_FE.md`
- `tests/unit/testcase_BE.md`
- `tests/unit/testcase_DB.md`
- Source Java backend va static frontend hien tai.
- Playwright E2E suite hien tai.

## 2. Ket luan tong quan

Thiet ke da du de chay MVP co ban, nhung chua nen xem la production-ready. Cac diem can sua uu tien cao nhat la:

1. API/documentation dang mo ta request 6 field, nhung `EmployeeRequest` van con field backend-only va chua phan tach ro DTO UI voi entity contract.
2. Requirement yeu cau debounce 300ms va luu search state tren URL, nhung `app.js` hien tai goi API ngay moi lan `input` va chua cap nhat URL.
3. Requirement yeu cau disable Save khi submit, nhung frontend chua disable nut Save va chua co co che chong double-submit.
4. Sort duoc mo ta trong tai lieu va testcase, nhung UI hien tai chua co control click sort.
5. Testcase matrix co nhieu case khong co route/UI tuong ung hoac chua co automation.
6. Backend van export cac field mo rong trong CSV, trong khi UI MVP chi hien thi 6 field; can chot ro CSV la domain export day du hay export 6 field UI.
7. CORS va H2 Console phu hop local nhung can profile/security guard ro hon neu dong goi production.

## 3. Findings theo muc do

### HIGH-001: DTO API khong khop 6 field UI

**Hien trang:**

- `docs/api-spec.md` ghi request chi theo 6 field UI.
- UI gui 6 field, nhung `EmployeeRequest` van co nhieu field backend-only.
- Tai lieu noi backend-only field khong hien thi tren UI, nhung DTO chua tach contract ro rang.

**Rui ro:** Client ben ngoai doc API spec va gui dung 6 field co the nhan HTTP 400 vi DTO con field an.

**De xuat:** Chon mot trong hai phuong an va cap nhat dong bo:

- Tach `EmployeeCreateRequest`/`EmployeeUpdateRequest` UI chi gom 6 field va loai bo field an khoi MVP contract.

**Khuyen nghi:** Chon phuong an A de contract UI dung voi yeu cau.

### HIGH-002: Debounce 300ms chua duoc implement

**Hien trang:** `app.js` dang gan truc tiep event `input` va goi `load()` ngay lap tuc.

**Rui ro:** Moi ky tu tao mot request; co the gay race condition va request cu tra ve sau ghi de ket qua moi.

**De xuat:** Them `debounce(fn, 300)` cho 4 text fields: employeeCode, fullName, phone, email. Select gender va dateOfBirth van goi ngay khi `change`.

**Test can them:** Xac minh nhap 5 ky tu chi tao toi da mot request sau 300ms im lang.

### HIGH-003: URL search state chua duoc implement

**Hien trang:** Tai lieu yeu cau giu query params tren URL, nhung `app.js` chi tao `URLSearchParams` de goi API va khong dung `history.pushState`, khong doc filter tu URL khi load.

**Rui ro:** Reload mat filter; testcase FE-SEARCH-010 khong the pass dung nghia.

**De xuat:**

1. `readFiltersFromUrl()` khi init.
2. `writeFiltersToUrl()` moi khi filter thay doi.
3. Khi pagination thay doi, giu nguyen 6 filter.
4. Xu ly browser back/forward bang `popstate`.

### HIGH-004: Chua chong double-submit

**Hien trang:** `save()` khong disable nut submit va khong co request lock.

**Rui ro:** Double click co the tao duplicate request; backend uniqueness chi ngan duplicate code, khong ngan duplicate request voi code khac.

**De xuat:** Them `isSaving` flag, disable nut Save trong try/finally, doi text thanh `Saving...`, restore sau request.

### HIGH-005: Duplicate update mapping can dong bo voi contract

**Hien trang:** BusinessException duplicate employee code phai tra 409 `EMP-409-001`. Can bao dam GlobalExceptionHandler map ca create va update cung mot status.

**Rui ro:** Test update duplicate co the nhan 400 thay vi 409.

**De xuat:** Them integration test bat buoc assert status 409 va errorCode `EMP-409-001` cho ca POST va PUT.

### MEDIUM-001: Sort duoc yeu cau nhung UI khong co control sort

**Hien trang:** Backend nhan `sort`, testcase co FE-LIST-003/004, nhung bang HTML khong co button/control sort.

**Rui ro:** Testcase khong the thuc hien tu UI; acceptance criteria khong ro.

**De xuat:**

- Hoac them button sort tren header cac cot duoc phep.
- Hoac loai bo sort khoi UI requirement/testcase va chi giu sort API.

**Khuyen nghi:** Them sort toggle vao table headers cho employeeCode, fullName, dateOfBirth.

### MEDIUM-002: Route trong testcase khong ton tai

**Hien trang:** Testcase cu mo `/employees`, `/employees/create`, `/employees/{id}/edit`, trong khi ung dung la static single page tai `/` va dung modal.

**Rui ro:** FE testcase bi danh dau NOT RUN vi test theo route khong co.

**De xuat:** Sua testcase:

- `/employees` -> `/`.
- `/employees/create` -> click `Add Employee`.
- `/employees/{id}/edit` -> click `Edit` tren row.
- `/employees/{id}` -> click `View` tren row.

### MEDIUM-003: CSV export field scope chua ro

**Hien trang:** UI chi co 6 field, nhung CSV service can duoc gioi han ve cung 6 field.

**Rui ro:** Vi pham cach hieu “UI MVP chi 6 field” neu CSV duoc xem la UI output; ngược lai neu export domain full thi API spec phai noi ro.

**De xuat:** Chot mot contract:

- CSV UI MVP chi gom 6 field.

### MEDIUM-004: Sort field backend cho field backend-only

**Hien trang:** `SORT_FIELDS` cho phep cac field backend-only, nhung cac field nay khong hien thi tren UI MVP.

**Rui ro:** API cho phep sort field ma client UI khong the thao tac, lam contract khong nhat quan.

**De xuat:** Neu UI chi 6 field, gioi han sort API vao employeeCode, fullName, gender, dateOfBirth, phone, email; hoac danh dau sort backend-only.

### MEDIUM-005: Empty database va page total trong seed/test chua tach ro

**Hien trang:** Local H2 seed 50 record; test `data.sql` cung seed 50 record. Nhieu testcase cu gia dinh 2 fixture record hoac data tu test class.

**Rui ro:** Test phu thuoc thu tu va so record seed; page assertion cung co the thay doi neu data fixture thay doi.

**De xuat:**

- Test profile dung fixture deterministic ro rang.
- E2E local chi assert behavior, khong hard-code tong so trang neu khong can.
- Moi test tao/cleanup data rieng.

### MEDIUM-006: H2 file mode va process lifecycle khong on dinh cho E2E

**Hien trang:** Server local co the bi dung khi terminal bi cleanup; package JAR bi khoa neu process cu dang chay.

**Rui ro:** E2E nhan `ERR_CONNECTION_REFUSED`, flaky test khong phai do application.

**De xuat:** Them Playwright `webServer` config hoac script start/stop server rieng cho E2E. Neu dung H2 file mode, dam bao moi run chi co mot process server.

### LOW-001: CORS va H2 Console can profile guard

**Hien trang:** Local CORS va H2 Console duoc bat trong cau hinh chung.

**Rui ro:** Neu quen override production, H2 Console/CORS co the mo qua rong.

**De xuat:** Dat H2 Console va local CORS trong profile `local`; production mac dinh disabled.

### LOW-002: Error message con phu thuoc ngon ngu Viet

**Hien trang:** API error message va UI da phan tich mot phan sang English nhung backend BusinessException van co message tieng Viet.

**Rui ro:** UI test theo message text khong on dinh; API client kho xu ly.

**De xuat:** Dung errorCode lam contract chinh; message co the English/locale rieng, testcase assert errorCode/status thay vi assert chuoi message.

### LOW-003: Coverage target chua co cong cu do coverage FE

**Hien trang:** Tai lieu dat muc tieu coverage cao nhung Playwright suite hien chi la E2E smoke, chua co coverage instrumentation.

**Rui ro:** Khong the chung minh 100% line/branch FE.

**De xuat:** Ghi ro coverage target BE do JaCoCo; FE dung testcase/E2E coverage theo behavior, khong goi la line coverage neu chua instrument.

## 4. Testability review

### Co the test tot

- Seed 50 record deterministic.
- H2 in-memory cho integration test.
- API search 6 criteria.
- CSV header/BOM.
- Modal open/close.
- Required validation.
- CRUD voi random employee code va cleanup.

### Chua de test hoac chua co implementation

- Debounce 300ms.
- URL filter state/back-forward.
- Sort bang UI.
- Double-submit prevention.
- Backend outage/timeout.
- XLSX optional.
- XSS test end-to-end voi create/detail.
- Mobile viewport matrix day du.
- Production profile khong seed/H2 Console disabled.

## 5. De xuat thay doi truoc khi code tiep

### Bat buoc

1. Tach DTO UI 6 field va loai bo field an khoi contract.
2. Implement debounce 300ms.
3. Implement URL state va `popstate`.
4. Chot sort UI/API va cap nhat testcase.
5. Implement disable Save/double-submit lock.
6. Them test 409 cho duplicate create/update.
7. Them Playwright webServer/process lifecycle.
8. Sua testcase route/modal cho dung SPA hien tai.

### Nen lam

9. Profile guard cho H2 Console/CORS local.
10. Chot CSV scope.
11. Dung errorCode thay vi assert message text.
12. Tach test fixture va E2E seed policy.
13. Them CI GitHub Actions sau khi local E2E on dinh.

## 6. Gate truoc Phase 4

Chi nen generate tiep/refactor tiep khi:

- Khong con conflict giua API spec va EmployeeRequest.
- Debounce va URL state co test.
- Sort requirement da co UI hoac da loai khoi FE testcase.
- E2E chay lap lai khong phu thuoc server process dang mo.
- Duplicate update tra dung 409.
- Testcase da phan biet PASS/FAIL/NOT APPLICABLE co ly do.
- Cac thay doi tren duoc cap nhat lai trong requirement/API/FE/BE/testcase.
