# Design BE - HR Management (Spring Boot REST API)

## 1. Muc tieu BE
- Cung cap nghiep vu quan ly nhan su day du: list, search, create, update, delete, detail, export.
- Xay dung thuan tuy REST API (JSON), khong dung Spring MVC render view/Thymeleaf.
- FE (HTML/CSS/JS tach rieng) goi API qua fetch/AJAX de lay/gui du lieu.
- Dam bao validation, xu ly loi, logging co ban va de mo rong.

## 2. Cong nghe su dung
- Java 17
- Spring Boot 3.x
- Maven
- Spring Web (chi dung @RestController/@RestControllerAdvice, khong dung ViewResolver/Thymeleaf)
- Spring Data JPA
- Hibernate ORM
- Bean Validation (Jakarta Validation)
- H2 database integration
- Lombok (tuy chon)
- Apache Commons CSV hoac OpenCSV cho export CSV
- Apache POI (tuy chon) cho export XLSX
- Spring CORS configuration (WebMvcConfigurer#addCorsMappings hoac @CrossOrigin) de cho phep FE tinh (static HTML/CSS/JS) goi API tu origin/port khac

## 2.1. Nguon su that tai lieu BE
- Endpoint contract, behavior va payload chi tiet: docs/api-spec.md
- Validation field-level + coding rules: docs/coding-rules.md
- Test mapping va coverage target: testcase_BE.md
- Governance/CI gate: CONTRIBUTING.md

## 3. Kien truc tong the
- Pattern theo layer:
  - Controller layer (@RestController, tra ve ResponseEntity<DTO>/JSON)
  - Service layer
  - Repository layer
  - Domain/Entity layer
  - DTO/Request-Response layer
- Muc tieu:
  - Tach ro nghiep vu va truy cap du lieu
  - Giam phu thuoc truc tiep giua FE va entity (chi giao tiep qua DTO/JSON)
  - BE khong quan tam FE render nhu the nao; hop dong duy nhat la JSON qua docs/api-spec.md

## 4. De xuat cau truc package
- Package goc: `vn.tungxeng.hr`
- `src/main/java/vn/tungxeng/hr/controller` (REST controller, vi du EmployeeRestController)
- `src/main/java/vn/tungxeng/hr/service`
- `src/main/java/vn/tungxeng/hr/service/impl`
- `src/main/java/vn/tungxeng/hr/repository`
- `src/main/java/vn/tungxeng/hr/entity`
- `src/main/java/vn/tungxeng/hr/dto`
- `src/main/java/vn/tungxeng/hr/mapper`
- `src/main/java/vn/tungxeng/hr/exception`
- `src/main/java/vn/tungxeng/hr/config` (bao gom CorsConfig)

## 5. Domain model chinh (BE view)
Entity Employee:
- id (Long, PK, auto increment)
- employeeCode (String, unique, not null)
- fullName (String, not null)
- gender (Enum/String)
- dateOfBirth (LocalDate)
- phone (String)
- email (String)
- address (String)
- department (String)
- position (String)
- hireDate (LocalDate)
- status (Enum: ACTIVE, INACTIVE, RESIGNED)
- baseSalary (BigDecimal, tuy chon)
- note (String)
- createdAt, updatedAt (timestamp)

## 6. Chuc nang backend chi tiet

### 6.1. Danh sach + tim kiem + loc + phan trang
- Nhan request GET voi query params:
  - employeeCode
  - fullName
  - gender
  - dateOfBirth
  - phone
  - email
  - page
  - size
  - sort
- Service xay dung tieu chi tim kiem (Specification hoac custom query), ket hop cac dieu kien dang co bang AND.
- Repository tra du lieu Page<Employee>.
- Controller map sang DTO va tra ve JSON (ResponseEntity<Page<EmployeeDto>>).

### 6.2. Them moi nhan su
- Request POST /api/employees voi body JSON (EmployeeCreateRequest).
- Validation:
  - employeeCode bat buoc, unique
  - fullName bat buoc
  - email dung dinh dang
  - phone theo pattern
- Neu loi validation: tra ve 400 + body loi field-level (ErrorResponse).
- Neu thanh cong: luu DB va tra ve 201 Created + body EmployeeDto (kem header Location neu can).

### 6.3. Cap nhat nhan su
- Request GET /api/employees/{id} de FE lay du lieu prefill form sua.
- Request PUT /api/employees/{id} voi body JSON (EmployeeUpdateRequest) de cap nhat.
- Kiem tra ton tai ban ghi truoc khi update.
- Kiem tra employeeCode unique neu cho phep sua ma.
- Tra ve 200 + EmployeeDto khi thanh cong, hoac loi JSON tuong ung.

### 6.4. Xoa nhan su
- Request DELETE /api/employees/{id}.
- Kiem tra ton tai ban ghi.
- Xoa va tra ve 204 No Content khi thanh cong.
- Neu khong tim thay: tra ve 404 + ErrorResponse.
- Co the mo rong soft delete trong phien ban sau.

### 6.5. Xem chi tiet
- Request GET /api/employees/{id}.
- Tra ve 200 + JSON du lieu nhan su.
- Neu khong tim thay id: tra ve 404 + ErrorResponse (EMP-404-001).

### 6.6. Export du lieu
- Endpoint export CSV: GET /api/employees/export/csv
- Nhan cung bo query params filter nhu danh sach.
- Sinh file CSV tu tap du lieu da loc.
- Set response headers:
  - Content-Type
  - Content-Disposition (file name co timestamp)
- Tra ve byte[]/Resource qua ResponseEntity de FE tai file bang fetch + blob hoac mo tab moi.
- Endpoint XLSX la tuy chon.

### 6.7. Khoi tao du lieu bang data.sql
- Spring Boot chay `schema.sql` truoc, sau do chay `data.sql` khi khoi dong local/dev va test.
- `data.sql` tao dung 50 ban ghi mau bang mot cau lenh SQL sinh tap du lieu tu `SYSTEM_RANGE(1, 50)`.
- Cau lenh seed co dieu kien `WHERE NOT EXISTS` de idempotent: bang `employees` da co du lieu thi bo qua.
- Khong can startup initializer hoac class Java rieng de nap du lieu ban dau.
- Production khong bat tu dong seed demo data; chi kich hoat script seed trong profile local/dev va test.

## 7. Thiet ke Controller
De xuat EmployeeRestController (@RestController, base path /api/employees):
- GET /api/employees (list + search + filter + sort + pagination)
- POST /api/employees (create)
- GET /api/employees/{id} (detail)
- PUT /api/employees/{id} (update)
- DELETE /api/employees/{id} (delete)
- GET /api/employees/export/csv
- GET /api/employees/export/xlsx (optional)

Ghi chu: khong con endpoint render form (GET .../create, GET .../{id}/edit) vi form duoc FE tu render tren client; BE chi cung cap du lieu qua GET /api/employees/{id} khi FE can prefill.

## 8. Thiet ke Service
Interface EmployeeService:
- Page<EmployeeDto> search(EmployeeSearchCriteria criteria, Pageable pageable)
- EmployeeDto getById(Long id)
- EmployeeDto create(EmployeeCreateRequest request)
- EmployeeDto update(Long id, EmployeeUpdateRequest request)
- void delete(Long id)
- byte[] exportCsv(EmployeeSearchCriteria criteria)
- byte[] exportXlsx(EmployeeSearchCriteria criteria) (optional)

Trach nhiem service:
- Validate nghiep vu (business validation)
- Kiem tra trung ma nhan vien
- Kiem tra ton tai ban ghi
- Goi repository va map DTO

## 9. Thiet ke Repository
- EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee>
- Method ho tro:
  - boolean existsByEmployeeCode(String employeeCode)
  - Optional<Employee> findByEmployeeCode(String employeeCode)
- Query phuc tap dung Specification de ket hop filter dong.

## 10. Validation va xu ly loi
- Validation annotation tren DTO:
  - @NotBlank, @Email, @Pattern, @Size, @NotNull
- Global exception handling:
  - @RestControllerAdvice
  - Xu ly NotFoundException, DataIntegrityViolationException, MethodArgumentNotValidException, Exception tong quat
- Tra ve JSON ErrorResponse chuan hoa (errorCode, message, details, path, timestamp, correlationId) cho moi loi, khong tra HTML/flash message.

## 11. Logging va quan tri loi
- Log tai cac diem:
  - Bat dau/ket thuc thao tac quan trong
  - Loi validation nghiep vu
  - Loi he thong khi truy cap DB/export
- Khong log du lieu nhay cam khong can thiet.

## 12. Bao mat co ban
- Validate tat ca input tu user.
- Khong trust du lieu client.
- Tra JSON thuan (khong render HTML tu server) nen BE khong chiu trach nhiem escape HTML; FE phai tu escape khi hien thi (xem design_FE.md).
- Cau hinh CORS ro rang: chi cho phep origin cua FE (vi du http://localhost:5500 hoac domain static hosting), gioi han method/header can thiet.
- Co the bo sung Spring Security cho login/role o phase tiep theo.

## 13. Cau hinh de xuat
- Maven project su dung `pom.xml` voi Java 17 va Spring Boot 3.x.
- `application.yml`/properties:
  - `server.port`
  - `spring.datasource.url` H2 file mode cho local/dev (vi du `jdbc:h2:file:./data/hrdb`)
  - spring.h2.console.enabled=true
  - spring.jpa.hibernate.ddl-auto=update (dev)
- `application-test.yml`/properties:
  - H2 in-memory (vi du `jdbc:h2:mem:hrdb-test`)
  - Kich hoat `schema.sql` va `data.sql` cho integration test
- Khong dung Thymeleaf hoac ViewResolver; backend chi phuc vu REST JSON.
- CorsConfig:
  - allowedOrigins: origin cua FE (dev: http://localhost:5500 hoac tuong duong)
  - allowedMethods: GET, POST, PUT, DELETE, OPTIONS
  - allowedHeaders: Content-Type, Authorization (neu co)

## 14. Tieu chi hoan thanh BE
- Cac endpoint REST API hoat dong dung cho CRUD + search + export, tra ve JSON dung contract.
- Validation va xu ly loi ro rang (JSON error response).
- Ho tro filter + sort + pagination.
- Export CSV dung voi tap du lieu dang loc.
- CORS cau hinh dung de FE static goi API thanh cong.
- Logging co ban day du de debug van hanh.

## 15. Endpoint error mapping
| Endpoint | Success | Validation error | Not found | Conflict | System error |
|---|---|---|---|---|---|
| GET /api/employees | 200 | 400 (filter invalid) | - | - | 500 |
| POST /api/employees | 201 | 400 + field errors | - | 409 duplicate code | 500 |
| GET /api/employees/{id} | 200 | - | 404 | - | 500 |
| PUT /api/employees/{id} | 200 | 400 + field errors | 404 | 409 duplicate code | 500 |
| DELETE /api/employees/{id} | 204 | - | 404 | - | 500 |
| GET /api/employees/export/csv | 200 | 400 | - | - | 500 export error |

## 16. Export rules (contract-ready)
- CSV encoding: UTF-8 BOM.
- Delimiter: comma (,).
- Quote char: ".
- Header order co dinh:
  employeeCode,fullName,gender,dateOfBirth,phone,email,address,department,position,hireDate,status,baseSalary,note
- Date format: yyyy-MM-dd.
- Number format: decimal 2 digits.
- Filename pattern:
  employees_yyyyMMdd_HHmmss.csv
- Timezone de dat timestamp file:
  Asia/Ho_Chi_Minh.

## 17. Sequence flow backend (success + error)

### 17.1. Create employee
Success:
1. Controller nhan JSON request va validate DTO (@Valid).
2. Service kiem tra unique employeeCode.
3. Repository save entity.
4. Service map DTO tra ve.
5. Controller tra ve 201 Created + body EmployeeDto.

Error:
1. DTO invalid -> MethodArgumentNotValidException -> 400 + ErrorResponse field errors.
2. employeeCode trung -> BusinessException -> 409 + ErrorResponse.
3. Loi DB he thong -> GlobalExceptionHandler -> 500 + ErrorResponse.

### 17.2. Update employee
Success:
1. Controller nhan id + JSON body.
2. Service tim employee theo id.
3. Validate unique code neu code thay doi.
4. Save cap nhat.
5. Tra ve 200 + EmployeeDto.

Error:
1. id khong ton tai -> NotFoundException -> 404.
2. Duplicate code -> BusinessException -> 409.
3. Constraint fail -> DataIntegrityViolationException -> 400/500.

### 17.3. Delete employee
Success:
1. Controller goi service delete(id).
2. Service check ton tai -> repository delete.
3. Tra ve 204 No Content.

Error:
1. id khong ton tai -> NotFoundException -> 404 + ErrorResponse.

### 17.4. Export CSV
Success:
1. Controller nhan filter params qua query string.
2. Service truy van danh sach da loc/sort.
3. Build CSV theo rules.
4. Tra ve 200 + byte[] + headers (Content-Type, Content-Disposition).

Error:
1. Filter invalid -> 400 + ErrorResponse.
2. Loi tao stream/file -> ExportException -> 500 (EMP-500-002).

## 18. Dong bo contract khi implement
- Khi tao moi/sua endpoint:
  1. Cap nhat docs/api-spec.md (behavior + payload schema/vi du + error branch).
  2. Cap nhat testcase_BE.md mapping testcase ID neu co thay doi luong.
- Khong merge PR neu endpoint da doi ma tai lieu contract chua cap nhat.
