# Testcase BE - HR Management Backend (Spring Boot REST API)

## 1. Muc tieu test
- Dat 100% do bao phu code BE trong pham vi module HR management (REST Controller, Service, Repository query logic, Export, Exception Handler).
- Cover day du: happy path, negative path, special case, exception, boundary, security input.

## 2. Quy uoc icon ket qua
- ✅ Pass
- ❌ Fail
- ⏳ Chua chay

## 3. Pham vi va cach do coverage
| Thanh phan | Cong cu goi y | Muc tieu |
|---|---|---|
| Unit test Service/Utils | JUnit 5 + Mockito | 100% line + branch |
| REST API test Controller | Spring MockMvc (JSON) hoac WebTestClient | 100% endpoint branch |
| Integration Repository | @DataJpaTest + H2 | 100% query branch |
| Coverage report | JaCoCo | 100% line + branch trong package muc tieu |

## 4. Testcase Controller (MockMvc/WebTestClient - JSON)
| TC ID | Endpoint | Scenario | Preconditions | Request | Expected | Priority | Status |
|---|---|---|---|---|---|---|---|
| BE-CTL-001 | GET /api/employees | Lay danh sach mac dinh | Co data | query rong | HTTP 200, body JSON co page data (content, totalElements...) | High | ⏳ |
| BE-CTL-002 | GET /api/employees | Search theo employeeCode | Co data match | employeeCode=E001 | HTTP 200, ket qua dung filter | High | ⏳ |
| BE-CTL-003 | GET /api/employees | Ket hop 6 dieu kien search | Co data da dang | employeeCode,fullName,gender,dateOfBirth,phone,email | HTTP 200, ket qua dung giao nhau AND | High | ⏳ |
| BE-CTL-004 | GET /api/employees | Query params khong hop le | none | page=-1,size=0 | HTTP 200/400 theo quy dinh, khong 500 | Medium | ⏳ |
| BE-CTL-005 | OPTIONS /api/employees | CORS preflight tu FE origin | CORS da cau hinh | preflight request | HTTP 200/204, header Access-Control-Allow-Origin dung origin FE | Medium | ⏳ |
| BE-CTL-006 | POST /api/employees | Tao moi thanh cong | payload hop le | JSON body valid | HTTP 201, body EmployeeDto dung du lieu | High | ⏳ |
| BE-CTL-007 | POST /api/employees | Validation fail | payload thieu fullName | JSON body invalid | HTTP 400, body ErrorResponse co field errors | High | ⏳ |
| BE-CTL-008 | POST /api/employees | Duplicate employeeCode | Co code trung | JSON body duplicate | HTTP 409, body ErrorResponse EMP-409-001 | High | ⏳ |
| BE-CTL-009 | GET /api/employees/{id} | Xem chi tiet thanh cong | id ton tai | id valid | HTTP 200, body EmployeeDto | High | ⏳ |
| BE-CTL-010 | GET /api/employees/{id} | Xem chi tiet khong ton tai | id invalid | id not found | HTTP 404, body ErrorResponse EMP-404-001 | High | ⏳ |
| BE-CTL-011 | GET /api/employees/{id} | Lay du lieu prefill cho form sua (FE) | id ton tai | id valid | HTTP 200, body EmployeeDto day du field de FE bind vao form | High | ⏳ |
| BE-CTL-012 | PUT /api/employees/{id} | Sua thanh cong | id ton tai | JSON body valid | HTTP 200, body EmployeeDto da cap nhat | High | ⏳ |
| BE-CTL-013 | PUT /api/employees/{id} | Sua fail validation | id ton tai | JSON body invalid | HTTP 400, body ErrorResponse co field errors | High | ⏳ |
| BE-CTL-014 | PUT /api/employees/{id} | Sua fail do duplicate code | id ton tai va code trung | JSON body duplicate | HTTP 409, body ErrorResponse EMP-409-001 | High | ⏳ |
| BE-CTL-015 | DELETE /api/employees/{id} | Xoa thanh cong | id ton tai | id valid | HTTP 204 No Content | High | ⏳ |
| BE-CTL-016 | DELETE /api/employees/{id} | Xoa id khong ton tai | id invalid | id not found | HTTP 404, body ErrorResponse EMP-404-001 | High | ⏳ |
| BE-CTL-017 | GET /api/employees/export/csv | Export csv thanh cong | Co data | filter hop le | HTTP 200, content-type csv, header file name dung | High | ⏳ |
| BE-CTL-018 | GET /api/employees/export/csv | Export voi ket qua rong | Khong co data match | email=no-match | HTTP 200, file rong hop le hoac message theo quy dinh | Medium | ⏳ |
| BE-CTL-019 | GET /api/employees/export/xlsx | Export xlsx (optional) | Feature bat | filter hop le | HTTP 200, content-type xlsx | Medium | ⏳ |
| BE-CTL-020 | Multi endpoint | Special chars + Unicode input | none | payload ten co dau | Khong loi encoding, JSON luu/tra dung | Medium | ⏳ |

## 5. Testcase Service (Unit test)
| TC ID | Method | Scenario | Input | Expected | Priority | Status |
|---|---|---|---|---|---|---|
| BE-SVC-001 | search(criteria,pageable) | Search khong filter | criteria rong | Tra Page dung kich thuoc | High | ⏳ |
| BE-SVC-002 | search(criteria,pageable) | Search day du filter | criteria full | Query dung branch ket hop | High | ⏳ |
| BE-SVC-003 | getById(id) | Tim thay employee | id ton tai | Tra dto dung mapping | High | ⏳ |
| BE-SVC-004 | getById(id) | Khong tim thay | id invalid | Nem NotFoundException | High | ⏳ |
| BE-SVC-005 | create(req) | Tao moi thanh cong | req hop le | Luu DB va tra dto | High | ⏳ |
| BE-SVC-006 | create(req) | Duplicate code | req code trung | Nem BusinessException | High | ⏳ |
| BE-SVC-007 | create(req) | Trim/chuan hoa input | req co khoang trang | Du lieu duoc xu ly dung quy dinh | Medium | ⏳ |
| BE-SVC-008 | update(id,req) | Cap nhat thanh cong | id ton tai + req hop le | Save thanh cong | High | ⏳ |
| BE-SVC-009 | update(id,req) | id khong ton tai | id invalid | Nem NotFoundException | High | ⏳ |
| BE-SVC-010 | update(id,req) | Duplicate code khi sua | req trung ma voi employee khac | Nem BusinessException | High | ⏳ |
| BE-SVC-011 | delete(id) | Xoa thanh cong | id ton tai | Ban ghi bi xoa | High | ⏳ |
| BE-SVC-012 | delete(id) | Xoa id khong ton tai | id invalid | Nem NotFoundException | High | ⏳ |
| BE-SVC-013 | exportCsv(criteria) | Export co du lieu | criteria match | byte[] csv khong rong + header dung | High | ⏳ |
| BE-SVC-014 | exportCsv(criteria) | Export du lieu rong | criteria no-match | byte[] csv hop le (chi header/empty) | Medium | ⏳ |
| BE-SVC-015 | exportCsv(criteria) | Exception IO trong luong export | gia lap writer error | Nem/handle exception theo quy dinh | High | ⏳ |
| BE-SVC-016 | exportXlsx(criteria) | Export xlsx (optional) | criteria match | byte[] xlsx hop le | Medium | ⏳ |

## 6. Testcase Repository (Integration @DataJpaTest)
| TC ID | Repository | Scenario | Data setup | Expected | Priority | Status |
|---|---|---|---|---|---|---|
| BE-REP-001 | existsByEmployeeCode | Code ton tai | Seed E001 | Tra true | High | ⏳ |
| BE-REP-002 | existsByEmployeeCode | Code khong ton tai | Seed E001 | Tra false | High | ⏳ |
| BE-REP-003 | findByEmployeeCode | Tim thay | Seed E001 | Optional present | High | ⏳ |
| BE-REP-004 | findByEmployeeCode | Khong tim thay | Seed E001 | Optional empty | Medium | ⏳ |
| BE-REP-005 | Specification search | Match employeeCode | Seed nhieu ban ghi | Tra dung tap ket qua | High | ⏳ |
| BE-REP-006 | Specification search | Match fullName/gender | Seed nhieu ban ghi | Chi tra ban ghi dung dieu kien | High | ⏳ |
| BE-REP-007 | Specification search | Match dateOfBirth | Seed nhieu ban ghi | Chi tra ngay sinh match exact | High | ⏳ |
| BE-REP-008 | Specification search | Match phone/email | Seed nhieu ban ghi | Chi tra phone/email contains match | High | ⏳ |
| BE-REP-009 | Specification search | Ket hop 6 dieu kien | Seed da dang | Ket qua dung giao nhau AND | High | ⏳ |
| BE-REP-010 | Pagination + sort | Sort hireDate desc + page | Seed > 15 | Thu tu va page dung | High | ⏳ |

## 7. Testcase Exception Handler (@RestControllerAdvice)
| TC ID | Scenario | Trigger | Expected HTTP/Body | Expected message | Priority | Status |
|---|---|---|---|---|---|---|
| BE-EXC-001 | NotFoundException | getById invalid | 404 + ErrorResponse JSON | Thong bao not found than thien | High | ⏳ |
| BE-EXC-002 | BusinessException | duplicate code | 409 + ErrorResponse JSON | Message trung ma nhan vien | High | ⏳ |
| BE-EXC-003 | DataIntegrityViolationException | vi pham unique/not null | 400/500 + ErrorResponse JSON | Message loi du lieu ro rang | High | ⏳ |
| BE-EXC-004 | Exception tong quat | runtime error bat ky | 500 + ErrorResponse JSON | Message loi he thong than thien | High | ⏳ |

## 8. Testcase security va special input
| TC ID | Scenario | Input | Expected | Priority | Status |
|---|---|---|---|---|---|
| BE-SEC-001 | XSS payload luu ten | <script>alert(1)</script> | BE luu/tra dung nguyen chuoi qua JSON (khong tu escape); FE chiu trach nhiem escape khi render, khong thuc thi script | High | ⏳ |
| BE-SEC-002 | SQL-like payload search | ' OR 1=1 -- | Khong loi SQL injection, ket qua an toan | High | ⏳ |
| BE-SEC-003 | Boundary max length | Chuoi > max field | Validation reject dung field | Medium | ⏳ |
| BE-SEC-004 | Boundary date leap year | 2024-02-29 | Chap nhan ngay hop le | Medium | ⏳ |
| BE-SEC-005 | Boundary date invalid | 2023-02-29 | Reject input | Medium | ⏳ |
| BE-SEC-006 | Unicode tieng Viet | Nguyen Thi Binh | Luu/tra du lieu dung encoding qua JSON | Medium | ⏳ |
| BE-SEC-007 | CORS tu origin khong duoc phep | Request tu origin la | HTTP bi chan boi CORS policy (khong co Access-Control-Allow-Origin) | Medium | ⏳ |

## 9. Checklist dat muc tieu 100% coverage BE
| Checklist ID | Noi dung | Dat/Khong |
|---|---|---|
| BE-COV-01 | Tat ca method controller co test branch thanh cong/that bai | ⏳ |
| BE-COV-02 | Tat ca method service co test happy + exception + boundary | ⏳ |
| BE-COV-03 | Tat ca query path repository co integration test | ⏳ |
| BE-COV-04 | Tat ca global exception handler branch duoc trigger | ⏳ |
| BE-COV-05 | Bao cao JaCoCo dat 100% line + branch package muc tieu | ⏳ |

## 10. Automation mapping (Testcase ID -> Test class/method)
Quy uoc ten method:
- tc_<TESTCASE_ID_lowercase_with_underscore>

| Testcase ID range | Test type | Test class du kien | Method pattern |
|---|---|---|---|
| BE-CTL-001..020 | REST API test | EmployeeRestControllerTest | tc_be_ctl_XXX |
| BE-SVC-001..016 | Unit test | EmployeeServiceTest | tc_be_svc_XXX |
| BE-REP-001..010 | Integration test | EmployeeRepositoryDataJpaTest | tc_be_rep_XXX |
| BE-EXC-001..004 | REST API test | GlobalExceptionHandlerRestTest | tc_be_exc_XXX |
| BE-SEC-001..007 | Unit+REST API mix | EmployeeSecurityValidationTest | tc_be_sec_XXX |

Mapping mau cu the:
| Testcase ID | Test class | Method |
|---|---|---|
| BE-CTL-006 | EmployeeRestControllerTest | tc_be_ctl_006 |
| BE-CTL-017 | EmployeeRestControllerTest | tc_be_ctl_017 |
| BE-SVC-005 | EmployeeServiceTest | tc_be_svc_005 |
| BE-SVC-015 | EmployeeServiceTest | tc_be_svc_015 |
| BE-REP-009 | EmployeeRepositoryDataJpaTest | tc_be_rep_009 |
| BE-EXC-003 | GlobalExceptionHandlerRestTest | tc_be_exc_003 |
| BE-SEC-002 | EmployeeSecurityValidationTest | tc_be_sec_002 |
