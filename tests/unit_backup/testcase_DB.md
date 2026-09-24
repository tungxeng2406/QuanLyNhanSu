# Testcase DB - HR Management Database (H2)

## 1. Muc tieu test
- Dat 100% bao phu logic DB trong pham vi: schema, constraints, index usage expectation, query filter/sort/pagination, transaction behavior, special data va exception.
- Dam bao du lieu DB dap ung dung cho CRUD, search, export.

## 2. Quy uoc icon ket qua
- ✅ Pass
- ❌ Fail
- ⏳ Chua chay

## 3. Pham vi DB test
| Area | Noi dung test | Muc tieu |
|---|---|---|
| SCHEMA | Bang, cot, data type, default | 100% object verification |
| CONSTRAINT | PK, unique, not null, check logic | 100% rule verification |
| QUERY | Search/filter/sort/pagination | 100% query branch |
| DATA QUALITY | Date, salary, unicode, max length | 100% boundary + special |
| TRANSACTION | Commit/rollback behavior | 100% flow |
| EXPORT READINESS | Du lieu trich xuat dung format | 100% field mapping |

## 4. Testcase schema va object
| TC ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|---|
| DB-SCH-001 | SCHEMA | Tao bang employees thanh cong | Chay schema.sql | 1) Khoi tao DB 2) Query metadata | Bang employees ton tai | High | ⏳ |
| DB-SCH-002 | SCHEMA | Kiem tra cot bat buoc co ton tai | DB da tao bang | 1) Query INFORMATION_SCHEMA.COLUMNS | Co day du cot theo design | High | ⏳ |
| DB-SCH-003 | SCHEMA | Kiem tra type tung cot | DB da tao bang | 1) Doc metadata data type | Type trung khop design (DATE, VARCHAR, DECIMAL...) | High | ⏳ |
| DB-SCH-004 | SCHEMA | Kiem tra PK id | DB da tao bang | 1) Query constraint metadata | PK tren cot id dung | High | ⏳ |
| DB-SCH-005 | SCHEMA | Kiem tra unique employee_code | DB da tao bang | 1) Query unique constraint | Unique constraint ton tai | High | ⏳ |
| DB-SCH-006 | SCHEMA | Kiem tra cac index da tao | DB da tao bang | 1) Query index metadata | Index full_name/department/hire_date/email/phone ton tai | Medium | ⏳ |

## 5. Testcase constraints va toan ven
| TC ID | Module | Scenario | Preconditions | Steps | Test Data | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|---|---|
| DB-CON-001 | CONSTRAINT | Insert hop le thanh cong | DB san sang | 1) Insert employee hop le | du lieu day du | Insert thanh cong 1 dong | High | ⏳ |
| DB-CON-002 | CONSTRAINT | Vi pham unique employee_code | Da co E001 | 1) Insert employee_code E001 | duplicate code | Loi unique constraint | High | ⏳ |
| DB-CON-003 | CONSTRAINT | Vi pham not null full_name | none | 1) Insert full_name null | null full_name | Loi not null | High | ⏳ |
| DB-CON-005 | CONSTRAINT | Salary am (neu check bat) | check da cau hinh | 1) Insert base_salary=-1 | negative salary | Reject du lieu am | Medium | ⏳ |

## 5.1. Testcase data.sql seed data
| TC ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|---|
| DB-SEED-001 | DATA.SQL SEED | `data.sql` tao 50 ban ghi khi DB rong | H2 local/dev, bang employees rong | 1) Start ung dung 2) Dem so ban ghi employees | Tao dung 50 ban ghi mau | High | ⏳ |
| DB-SEED-002 | DATA.SQL SEED | `data.sql` khong seed trung khi restart | H2 file mode da co 50 ban ghi mau | 1) Restart ung dung 2) Dem so ban ghi employees | Van dung 50 ban ghi, khong phat sinh ban ghi trung | High | ⏳ |
| DB-SEED-003 | DATA.SQL SEED | `data.sql` bo qua DB da co du lieu | H2 local/dev da co du lieu nghiep vu | 1) Start ung dung 2) Dem va doi chieu du lieu | Khong tu dong chen them 50 ban ghi | High | ⏳ |

## 6. Testcase query search/filter/sort/pagination
| TC ID | Module | Scenario | Seed data | Steps | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|---|
| DB-QUE-001 | QUERY | Search theo employee_code | Seed nhieu code | employeeCode contains E001 | Tra dung ban ghi code match | High | ⏳ |
| DB-QUE-002 | QUERY | Search theo full_name | Seed nhieu ten | fullName contains Nguyen | Tra dung ten match | High | ⏳ |
| DB-QUE-003 | QUERY | Search theo gender | Seed nhieu gender | gender=MALE | Chi tra MALE | High | ⏳ |
| DB-QUE-004 | QUERY | Search theo date_of_birth | Seed nhieu ngay sinh | dateOfBirth=1990-01-10 | Chi tra ngay sinh match exact | High | ⏳ |
| DB-QUE-005 | QUERY | Search theo phone | Seed nhieu phone | phone contains 090 | Tra dung phone match | Medium | ⏳ |
| DB-QUE-006 | QUERY | Search theo email | Seed nhieu email | email contains company.com | Tra dung email match | Medium | ⏳ |
| DB-QUE-007 | QUERY | Bo qua dieu kien rong | Seed data | 6 params rong | Tra full danh sach theo pagination | High | ⏳ |
| DB-QUE-008 | QUERY | Ket hop 6 dieu kien | Seed da dang | employeeCode + fullName + gender + date + phone + email | Tra ket qua dung giao nhau AND | High | ⏳ |
| DB-QUE-009 | QUERY | Sort full_name asc | Seed ten ngau nhien | order by asc | Thu tu tang dung | Medium | ⏳ |
| DB-QUE-010 | QUERY | Sort hire_date desc | Seed ngay ngau nhien | order by desc | Thu tu giam dung | Medium | ⏳ |
| DB-QUE-011 | QUERY | Pagination trang dau | Seed > 25 dong | limit/offset page0,size10 | Tra dung 10 dong dau | High | ⏳ |
| DB-QUE-012 | QUERY | Pagination trang cuoi | Seed > 25 dong | page cuoi | Tra dung so dong con lai | High | ⏳ |
| DB-QUE-013 | QUERY | Pagination out-of-range | Seed > 0 dong | page rat lon | Tra rong, khong loi | Medium | ⏳ |

## 7. Testcase data quality va boundary
| TC ID | Module | Scenario | Test Data | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|
| DB-DAT-001 | DATA QUALITY | Unicode tieng Viet | full_name co dau | Luu/tra dung encoding | Medium | ⏳ |
| DB-DAT-002 | DATA QUALITY | Chuoi max length hop le | full_name = 150 ky tu | Insert thanh cong | Medium | ⏳ |
| DB-DAT-003 | DATA QUALITY | Vuot max length | full_name > 150 ky tu | Reject hoac truncation theo quy dinh ro rang | Medium | ⏳ |
| DB-DAT-004 | DATA QUALITY | Ngay leap year hop le | date_of_birth=2024-02-29 | Insert thanh cong | Medium | ⏳ |
| DB-DAT-005 | DATA QUALITY | Ngay khong hop le | date_of_birth=2023-02-29 | Reject input | Medium | ⏳ |
| DB-DAT-006 | DATA QUALITY | Salary decimal 2 so | base_salary=12345.67 | Luu dung precision scale | Medium | ⏳ |
| DB-DAT-007 | DATA QUALITY | Salary qua lon | base_salary vuot gioi han | Reject theo precision | Medium | ⏳ |

## 8. Testcase transaction va exception
| TC ID | Module | Scenario | Preconditions | Steps | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|---|
| DB-TXN-001 | TRANSACTION | Commit thanh cong | none | 1) Begin txn 2) Insert hop le 3) Commit | Du lieu duoc persist | High | ⏳ |
| DB-TXN-002 | TRANSACTION | Rollback khi co loi constraint | none | 1) Begin txn 2) Insert hop le 3) Insert duplicate 4) Rollback | Khong co ban ghi nao bi luu nua chung transaction | High | ⏳ |
| DB-TXN-003 | TRANSACTION | Concurrent update mo phong | Co 1 employee | 2 session update cung ban ghi | Ket qua theo isolation/chinh sach app, khong corrupt data | Medium | ⏳ |
| DB-EXC-001 | EXCEPTION | Loi ket noi DB tam thoi | Gia lap datasource loi | Thuc hien query | He thong bat loi va thong bao dung | High | ⏳ |
| DB-EXC-002 | EXCEPTION | Loi script khoi tao schema | schema.sql sai cu phap | Khoi tao app | Bat duoc loi startup ro rang | Medium | ⏳ |

## 9. Testcase export readiness tu DB
| TC ID | Module | Scenario | Steps | Expected Result | Priority | Status |
|---|---|---|---|---|---|---|
| DB-EXP-001 | EXPORT READINESS | Truy van data cho export khong filter | Query tap full data | Field order dung voi template export | High | ⏳ |
| DB-EXP-002 | EXPORT READINESS | Truy van data theo filter | Query voi criteria | Chi lay du lieu da loc | High | ⏳ |
| DB-EXP-003 | EXPORT READINESS | Date format ready | Lay cot date | Date map dung yyyy-MM-dd o tang app/export | Medium | ⏳ |
| DB-EXP-004 | EXPORT READINESS | Numeric format ready | Lay cot salary | So lieu map dung precision 2 so thap phan | Medium | ⏳ |

## 10. Checklist dat muc tieu 100% coverage DB scope
| Checklist ID | Noi dung | Dat/Khong |
|---|---|---|
| DB-COV-01 | Tat ca object schema duoc verify bang metadata query | ⏳ |
| DB-COV-02 | Tat ca constraints duoc test pass va fail path | ⏳ |
| DB-COV-03 | Tat ca query branch (filter/sort/page) duoc test day du | ⏳ |
| DB-COV-04 | Tat ca special data + boundary duoc test | ⏳ |
| DB-COV-05 | Tat ca transaction + exception path duoc test | ⏳ |
| DB-COV-06 | Bao cao test xac nhan 100% trong pham vi DB test scope | ⏳ |

## 11. Automation mapping (Testcase ID -> Test class/method)
Quy uoc ten method:
- tc_<TESTCASE_ID_lowercase_with_underscore>

| Testcase ID range | Test type | Test class du kien | Method pattern |
|---|---|---|---|
| DB-SCH-001..006 | Integration SQL metadata | EmployeeSchemaIntegrationTest | tc_db_sch_XXX |
| DB-CON-001..006 | Integration constraint | EmployeeConstraintIntegrationTest | tc_db_con_XXX |
| DB-QUE-001..013 | Integration query | EmployeeQueryIntegrationTest | tc_db_que_XXX |
| DB-DAT-001..007 | Integration data boundary | EmployeeDataQualityIntegrationTest | tc_db_dat_XXX |
| DB-TXN-001..003 | Integration transaction | EmployeeTransactionIntegrationTest | tc_db_txn_XXX |
| DB-EXC-001..002 | Integration exception | EmployeeDbExceptionIntegrationTest | tc_db_exc_XXX |
| DB-EXP-001..004 | Integration export readiness | EmployeeExportReadinessIntegrationTest | tc_db_exp_XXX |

Mapping mau cu the:
| Testcase ID | Test class | Method |
|---|---|---|
| DB-SCH-001 | EmployeeSchemaIntegrationTest | tc_db_sch_001 |
| DB-CON-002 | EmployeeConstraintIntegrationTest | tc_db_con_002 |
| DB-QUE-008 | EmployeeQueryIntegrationTest | tc_db_que_008 |
| DB-DAT-005 | EmployeeDataQualityIntegrationTest | tc_db_dat_005 |
| DB-TXN-002 | EmployeeTransactionIntegrationTest | tc_db_txn_002 |
| DB-EXC-001 | EmployeeDbExceptionIntegrationTest | tc_db_exc_001 |
| DB-EXP-003 | EmployeeExportReadinessIntegrationTest | tc_db_exp_003 |
