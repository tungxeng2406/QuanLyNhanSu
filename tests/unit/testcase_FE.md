# Testcase FE - HR Management UI (HTML/CSS/JS goi REST API)

## 1. Muc tieu test
- Bao phu 100% code FE theo thiet ke client-rendered HTML/CSS/JS goi REST API, gom: page/module JS, validation, script JS, luong export.
- Cover day du: happy path, negative path, special case, exception case, compatibility case.

## 2. Quy uoc icon ket qua
- ✅ Pass
- ❌ Fail
- ⏳ Chua chay

## 3. Ma tran bao phu FE
| Area | Chuc nang | Muc tieu bao phu |
|---|---|---|
| LIST | Hien thi danh sach, sort, pagination | 100% line + branch |
| SEARCH | 6 dieu kien search tu dong + reset | 100% line + branch |
| CREATE | Form tao moi + validation | 100% line + branch |
| UPDATE | Form cap nhat + validation | 100% line + branch |
| DELETE | Confirm + xu ly ket qua | 100% line + branch |
| DETAIL | Hien thi chi tiet | 100% line |
| EXPORT | CSV/XLSX trigger + state filter | 100% line + branch |
| UI-ROBUST | XSS, input dai, locale/date, responsive | 100% risk scenario |

## 4. Testcase chi tiet
| TC ID | Module | Scenario | Preconditions | Steps | Test Data | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|---|---|
| FE-LIST-001 | LIST | Mo trang danh sach mac dinh | He thong co >= 1 employee | 1) Mo /employees | none | Hien thi bang danh sach, cot dung, khong loi render | High | ⏳ |
| FE-LIST-002 | LIST | Danh sach rong | DB khong co employee | 1) Mo /employees | none | Hien thi empty state, khong vo layout | High | ⏳ |
| FE-LIST-003 | LIST | Sort tang theo employeeCode | Co du lieu > 3 ban ghi | 1) Click sort employeeCode | mixed codes | Thu tu tang dung theo code | High | ⏳ |
| FE-LIST-004 | LIST | Sort giam theo employeeCode | Co du lieu > 3 ban ghi | 1) Click sort employeeCode lan 2 | mixed codes | Thu tu giam dung theo code | High | ⏳ |
| FE-LIST-005 | LIST | Pagination trang dau | Co > 1 page | 1) Mo page=0,size=10 | none | Hien thi 10 dong dau, controls dung | High | ⏳ |
| FE-LIST-006 | LIST | Pagination trang cuoi | Co > 2 page | 1) Chuyen page cuoi | none | Hien thi dung du lieu trang cuoi | High | ⏳ |
| FE-LIST-007 | LIST | Pagination out-of-range | Co > 0 data | 1) Mo page=9999 | none | He thong fallback trang hop le, khong error 500 | Medium | ⏳ |
| FE-SEARCH-001 | SEARCH | Tu dong search theo employeeCode | Co employee code E001 | 1) Nhap E001 vao Employee Code | employeeCode=E001 | API duoc goi tu dong, tra dung ban ghi | High | ⏳ |
| FE-SEARCH-002 | SEARCH | Tu dong search theo fullName | Co employee Nguyen Van A | 1) Nhap Nguyen vao Full Name | fullName=Nguyen | API duoc goi tu dong, ket qua chua Nguyen | High | ⏳ |
| FE-SEARCH-003 | SEARCH | Tu dong search theo gender | Co du lieu nhieu gender | 1) Chon MALE | gender=MALE | API duoc goi tu dong, chi tra MALE | High | ⏳ |
| FE-SEARCH-004 | SEARCH | Tu dong search theo dateOfBirth | Co ngay sinh match | 1) Chon ngay sinh | dateOfBirth=1990-01-10 | API duoc goi tu dong, tra dung ban ghi | High | ⏳ |
| FE-SEARCH-005 | SEARCH | Tu dong search theo phone | Co so dien thoai | 1) Nhap 090 vao Phone | phone=090 | API duoc goi tu dong, tra ban ghi phone match | Medium | ⏳ |
| FE-SEARCH-006 | SEARCH | Tu dong search theo email | Co email hop le | 1) Nhap company.com vao Email | email=company.com | API duoc goi tu dong, tra dung nhom ban ghi | Medium | ⏳ |
| FE-SEARCH-007 | SEARCH | Khong tim thay ket qua | Co data nhung khong match | 1) Nhap ZZZ_NO_MATCH vao mot field | no match | Hien thi empty state va giu dieu kien search | High | ⏳ |
| FE-SEARCH-008 | SEARCH | Ket hop 6 dieu kien | Co data da dang | 1) Dien nhieu field 2) Cho auto search | mixed six params | Ket qua thoa man tat ca dieu kien AND | High | ⏳ |
| FE-SEARCH-009 | SEARCH | Clear filters | Dang co nhieu dieu kien | 1) Click Clear filters | none | Xoa 6 dieu kien, tai lai danh sach mac dinh | High | ⏳ |
| FE-SEARCH-010 | SEARCH | Giu dieu kien khi chuyen trang | Dang co ket qua > 1 page | 1) Dien filter 2) Chuyen page 2 | mixed six params | Query params va ket qua van giu filter | High | ⏳ |
| FE-CREATE-001 | CREATE | Mo form them moi | none | 1) Mo /employees/create | none | Render form day du field | High | ⏳ |
| FE-CREATE-002 | CREATE | Tao moi thanh cong voi du lieu hop le | Ma nhan vien chua ton tai | 1) Dien form 2) Submit | valid payload | Goi POST /api/employees thanh cong (201), hien success message, khong reload trang, danh sach duoc refresh | High | ⏳ |
| FE-CREATE-003 | CREATE | Loi bat buoc employeeCode | none | 1) De trong employeeCode 2) Submit | employeeCode blank | Hien loi tai field employeeCode | High | ⏳ |
| FE-CREATE-004 | CREATE | Loi bat buoc fullName | none | 1) De trong fullName 2) Submit | fullName blank | Hien loi tai field fullName | High | ⏳ |
| FE-CREATE-005 | CREATE | Loi phone sai dinh dang | none | 1) phone=abc123 2) Submit | invalid phone | Hien loi dinh dang phone | High | ⏳ |
| FE-CREATE-006 | CREATE | Duplicate employeeCode | Co code E001 | 1) Tao moi code E001 | employeeCode duplicate | Hien loi trung ma, khong tao ban ghi | High | ⏳ |
| FE-CREATE-007 | CREATE | Input trim khoang trang | none | 1) Nhap fullName co dau cach dau/cuoi 2) Submit | '  Nguyen A  ' | Du lieu duoc trim theo quy dinh | Medium | ⏳ |
| FE-CREATE-008 | CREATE | Input qua dai | none | 1) Nhap fullName > max length 2) Submit | fullName very long | Hien loi max length, khong vo trang | Medium | ⏳ |
| FE-CREATE-009 | CREATE | Special chars tieng Viet | none | 1) Nhap ten co dau 2) Submit | 'Nguyen Thi A' | Luu va hien thi dung ky tu | Medium | ⏳ |
| FE-UPDATE-001 | UPDATE | Mo form sua thanh cong | Co employee ton tai | 1) Mo /employees/{id}/edit | valid id | Render data cu day du | High | ⏳ |
| FE-UPDATE-002 | UPDATE | Sua thanh cong | Co employee ton tai | 1) Sua phone/email 2) Submit | valid update | Cap nhat thanh cong + thong bao | High | ⏳ |
| FE-UPDATE-003 | UPDATE | Sua voi email sai dinh dang | Co employee ton tai | 1) email sai 2) Submit | invalid email | Hien loi validation field | High | ⏳ |
| FE-UPDATE-004 | UPDATE | Sua thanh duplicate employeeCode | Co employee khac trung code | 1) Sua code trung 2) Submit | duplicate code | Bao loi trung ma, khong luu | High | ⏳ |
| FE-UPDATE-005 | UPDATE | Sua record khong ton tai | ID da bi xoa | 1) Submit update id khong ton tai | invalid id | Hien thong bao not found than thien | High | ⏳ |
| FE-DELETE-001 | DELETE | Xoa thanh cong sau confirm | Co employee ton tai | 1) Click Xoa 2) Confirm | valid id | Goi DELETE /api/employees/{id} thanh cong (204), FE goi lai GET danh sach de refresh | High | ⏳ |
| FE-DELETE-002 | DELETE | Huy confirm xoa | Co employee ton tai | 1) Click Xoa 2) Cancel | valid id | Khong gui request xoa, du lieu giu nguyen | Medium | ⏳ |
| FE-DELETE-003 | DELETE | Xoa id khong ton tai | id invalid | 1) Gui request xoa | invalid id | Hien thong bao loi than thien | High | ⏳ |
| FE-DETAIL-001 | DETAIL | Xem chi tiet thanh cong | Co employee ton tai | 1) Mo /employees/{id} | valid id | Hien thi day du thong tin employee | High | ⏳ |
| FE-DETAIL-002 | DETAIL | Xem chi tiet id khong ton tai | id invalid | 1) Mo /employees/{id} | invalid id | Hien trang loi than thien/not found | High | ⏳ |
| FE-EXPORT-001 | EXPORT | Export CSV khong filter | Co du lieu | 1) Click Export CSV | none | File csv tai ve thanh cong, header dung | High | ⏳ |
| FE-EXPORT-002 | EXPORT | Export CSV co filter | Co du lieu da loc | 1) Dien 6 dieu kien 2) Export CSV | mixed six params | File chi chua du lieu da loc | High | ⏳ |
| FE-EXPORT-003 | EXPORT | Export khi khong co du lieu | Ket qua search rong | 1) Search no result 2) Export | no records | Xu ly theo quy dinh: thong bao hoac file rong hop le | Medium | ⏳ |
| FE-EXPORT-004 | EXPORT | Export XLSX (neu bat) | Feature XLSX bat | 1) Click Export XLSX | none | File xlsx hop le, mo duoc | Medium | ⏳ |
| FE-ROBUST-001 | UI-ROBUST | XSS trong fullName | none | 1) Nhap <script>alert(1)</script> 2) Save/View | xss payload | Script khong thuc thi, output duoc escape | Critical | ⏳ |
| FE-ROBUST-002 | UI-ROBUST | SQL-like payload trong search field | none | 1) Nhap ' OR 1=1 -- vao mot field | injection string | Khong vo he thong, ket qua an toan | High | ⏳ |
| FE-ROBUST-003 | UI-ROBUST | Double-submit nut Save | none | 1) Click Save lien tiep nhanh | valid payload | Khong tao duplicate ngoai quy dinh | Medium | ⏳ |
| FE-ROBUST-004 | UI-ROBUST | Refresh sau tao moi thanh cong | Da tao moi thanh cong qua fetch | 1) F5 sau khi tao thanh cong | none | Vi khong co server redirect/postback, F5 chi tai lai trang danh sach qua GET, khong gui lai POST create | Medium | ⏳ |
| FE-ROBUST-005 | UI-ROBUST | Responsive man hinh hep | Browser width < 576px | 1) Mo list/create/edit | mobile viewport | Layout khong vo, bang cuon ngang duoc | Medium | ⏳ |
| FE-ROBUST-006 | UI-ROBUST | Locale date parse edge | none | 1) Nhap date boundary | leap date 2024-02-29 | Hien/luu dung ngay hop le | Medium | ⏳ |
| FE-EXC-001 | EXCEPTION | Mat ket noi BE tam thoi | Gia lap loi 5xx | 1) Trigger submit | valid payload | Hien thong bao loi he thong than thien | High | ⏳ |
| FE-EXC-002 | EXCEPTION | Timeout khi export | Gia lap timeout | 1) Export file lon | large dataset | Hien thong bao phu hop, khong treo UI | Medium | ⏳ |

## 5. Checklist dat muc tieu 100% coverage FE
| Checklist ID | Noi dung | Dat/Khong |
|---|---|---|
| FE-COV-01 | Cover tat ca template pages va fragment include | ⏳ |
| FE-COV-02 | Cover tat ca branch thong bao thanh cong/that bai | ⏳ |
| FE-COV-03 | Cover tat ca validation message theo tung field | ⏳ |
| FE-COV-04 | Cover tat ca branch script confirm/delete/export | ⏳ |
| FE-COV-05 | Cover special case + exception case | ⏳ |
| FE-COV-06 | Bao cao coverage xac nhan 100% line + branch cho FE test scope | ⏳ |

## 6. Automation mapping (Testcase ID -> Test class/method)
Quy uoc dat ten method:
- tc_<TESTCASE_ID_lowercase_with_underscore>
- Vi du: FE-LIST-001 -> tc_fe_list_001

| Testcase ID range | Test class du kien | Method pattern |
|---|---|---|
| FE-LIST-001..007 | EmployeeListPageE2ETest | tc_fe_list_XXX |
| FE-SEARCH-001..010 | EmployeeSearchPageE2ETest | tc_fe_search_XXX |
| FE-CREATE-001..009 | EmployeeCreatePageE2ETest | tc_fe_create_XXX |
| FE-UPDATE-001..005 | EmployeeUpdatePageE2ETest | tc_fe_update_XXX |
| FE-DELETE-001..003 | EmployeeDeleteFlowE2ETest | tc_fe_delete_XXX |
| FE-DETAIL-001..002 | EmployeeDetailPageE2ETest | tc_fe_detail_XXX |
| FE-EXPORT-001..004 | EmployeeExportFlowE2ETest | tc_fe_export_XXX |
| FE-ROBUST-001..006 | EmployeeUiRobustnessE2ETest | tc_fe_robust_XXX |
| FE-EXC-001..002 | EmployeeUiExceptionFlowE2ETest | tc_fe_exc_XXX |

Mapping mau cu the:
| Testcase ID | Test class | Method |
|---|---|---|
| FE-LIST-001 | EmployeeListPageE2ETest | tc_fe_list_001 |
| FE-SEARCH-009 | EmployeeSearchPageE2ETest | tc_fe_search_009 |
| FE-CREATE-006 | EmployeeCreatePageE2ETest | tc_fe_create_006 |
| FE-UPDATE-005 | EmployeeUpdatePageE2ETest | tc_fe_update_005 |
| FE-EXPORT-002 | EmployeeExportFlowE2ETest | tc_fe_export_002 |
| FE-EXC-002 | EmployeeUiExceptionFlowE2ETest | tc_fe_exc_002 |
