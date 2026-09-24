# Requirement - Project Quan Ly Nhan Su (Spring Boot REST API + HTML/CSS/JS + H2)

## 1. Muc tieu du an
- Xay dung ung dung quan ly nhan su don gian chay tren web.
- Cho phep quan tri vien thuc hien cac thao tac: xem danh sach, tim kiem, them, sua, xoa va export du lieu nhan su.
- Su dung stack:
	- Backend: Spring Boot, cung cap REST API thuan tuy (khong dung Spring MVC render view/Thymeleaf).
	- Frontend: HTML/CSS/JavaScript (vanilla JS, static assets), goi API qua fetch/AJAX (JSON over HTTP).
	- Database: H2
	- Build tool: Maven
	- Java: Java 17
	- Framework version: Spring Boot 3.x
	- Package goc mac dinh: `vn.tungxeng.hr`

## 2. Doi tuong su dung
- Nguoi dung chinh: quan tri vien/nhan su noi bo.
- Khong yeu cau phan quyen phuc tap trong phien ban don gian.

## 3. Pham vi du lieu nhan su
Moi nhan su can co cac truong co ban sau:
- Ma nhan vien (employeeCode, duy nhat)
- Ho va ten
- Gioi tinh
- Ngay sinh
- So dien thoai
- Email
- Dia chi
- Phong ban
- Chuc vu
- Ngay vao lam
- Trang thai lam viec (Dang lam, Tam nghi, Da nghi)
- Luong co ban (tuy chon cho phien ban don gian)
- Ghi chu (tuy chon)

## 4. Yeu cau chuc nang bat buoc

### 4.1. Xem danh sach nhan su
- FE goi API GET /api/employees de lay danh sach nhan su dang co trong he thong (JSON).
- Sap xep cot co ban (ma nhan vien, ho ten, phong ban, ngay vao lam) theo tang/giam.
- Ho tro phan trang (pagination) de tranh tai trang khi du lieu lon.

### 4.2. Tim kiem nhan su (Search)
- Co 6 dieu kien search rieng: employeeCode, fullName, gender, dateOfBirth, phone, email.
- employeeCode/fullName/phone/email search theo contains; gender chon gia tri; dateOfBirth match exact.
- Khi gia tri mot dieu kien thay doi, FE tu dong goi GET /api/employees, khong can nut Search.
- Co nut Clear filters de xoa tat ca dieu kien va quay ve danh sach mac dinh.
- Tat ca dieu kien duoc gui qua query params cua API GET /api/employees va ket hop bang AND.

### 4.3. Them moi nhan su (Create)
- FE hien thi form nhap thong tin nhan su (HTML thuan, khong postback server-side).
- FE validate co ban bang JavaScript truoc khi goi API.
- FE goi API POST /api/employees voi body JSON.
- Kiem tra du lieu dau vao (server-side la nguon su that):
	- Truong bat buoc khong de trong.
	- Dinh dang email hop le.
	- So dien thoai dung dinh dang so.
	- Ma nhan vien khong trung.
- Luu thanh cong vao H2, API tra ve JSON ket qua, FE hien thi thong bao va cap nhat danh sach khong reload trang.

### 4.4. Cap nhat thong tin nhan su (Update)
- FE goi API GET /api/employees/{id} de lay du lieu cu, do form vao man hinh sua.
- Cho phep nguoi dung chinh sua du lieu tren form.
- Ap dung validation giong chuc nang them moi (client-side + server-side).
- FE goi API PUT /api/employees/{id} de luu thay doi.
- API tra ve JSON ket qua/loi, FE hien thi thong bao thanh cong/that bai ro rang.

### 4.5. Xoa nhan su (Delete)
- Co nut xoa tren tung dong nhan su.
- Bat buoc xac nhan (JS confirm/modal) truoc khi goi API DELETE /api/employees/{id}.
- Sau khi xoa thanh cong, FE cap nhat lai danh sach bang JavaScript (khong reload full page).
- Xu ly truong hop khong tim thay ban ghi can xoa (API tra loi 404, FE hien thong bao).

### 4.6. Xem chi tiet nhan su
- FE goi API GET /api/employees/{id} de lay day du thong tin 1 nhan su va hien thi.
- Tu man hinh chi tiet co the quay lai danh sach hoac chuyen sang sua.

### 4.7. Export du lieu nhan su
- Ho tro export danh sach nhan su ra file qua API GET /api/employees/export/csv (va tuy chon /api/employees/export/xlsx).
- Dinh dang toi thieu: CSV.
- Neu co the, bo sung XLSX cho de su dung.
- Export theo du lieu dang loc tren man hinh (neu co bo loc), FE truyen cung query params nhu danh sach.
- Ten file co timestamp de de quan ly phien ban xuat.
- FE kich hoat tai file bang cach mo API endpoint hoac xu ly blob response tu fetch.

## 5. Yeu cau giao dien (HTML/CSS/JS - Single Page hoac Multi Page tinh)
- Giao dien don gian, de dung, thuong mai noi bo, xay dung bang HTML/CSS/JS thuan (khong Thymeleaf, khong bat buoc SPA framework).
- FE static dat trong `src/main/resources/static` va duoc Spring Boot phuc vu truc tiep.
- Giao dien MVP chi hien thi 6 field nhan su: employeeCode, fullName, gender, dateOfBirth, phone, email.
- `employeeCode` va `fullName` la hai field bat buoc tren giao dien.
- Moi field co mot dieu kien search rieng; khi gia tri dieu kien thay doi, FE tu dong search va cap nhat danh sach, khong can nut Search.
- Cac man hinh toi thieu:
	- Trang danh sach + tim kiem + bo loc
	- Trang/khu vuc them moi
	- Trang/khu vuc cap nhat
	- Trang/khu vuc chi tiet
- Thong bao ket qua thao tac ro rang (thanh cong/that bai) hien thi bang JavaScript, khong can server render lai trang.
- Co thong bao loi validation ngay tai form (client-side), dong bo voi loi tra ve tu API.

## 6. Yeu cau backend (Spring Boot REST API)
- Kien truc de xuat:
	- Controller (@RestController): nhan request va tra ve du lieu JSON (khong render view).
	- Service: xu ly nghiep vu.
	- Repository: thao tac du lieu voi H2 qua Spring Data JPA.
	- Entity: anh xa bang nhan su.
	- DTO: dinh nghia request/response JSON, khong expose Entity truc tiep.
- CRUD day du cho nhan su qua REST endpoint.
- Ho tro tim kiem + loc + phan trang qua query params, tra ve JSON.
- Ho tro export CSV (va tuy chon XLSX) qua REST endpoint tra ve file binary.
- Xu ly exception co ban va tra ve JSON error response chuan hoa (errorCode, message, details).
- Cau hinh CORS de FE (chay tren port/origin khac hoac static server) co the goi API.

## 7. Yeu cau database (H2)
- Su dung H2 database cho moi truong phat trien.
- Local/dev dung H2 file mode de du lieu van con sau khi restart; profile test dung H2 in-memory.
- Khoi tao schema bang `schema.sql`; khoi tao 50 record mau bang `data.sql` cho local/dev va test.
- Co script khoi tao schema va du lieu mau (tuy chon, khuyen nghi).
- Khi ung dung khoi dong trong moi truong local/dev, `data.sql` neu bang `employees` dang rong thi tu dong tao dung 50 ban ghi mau va luu vao H2.
- `data.sql` phai idempotent: qua moi lan khoi dong lai khong duoc tao trung du lieu mau; neu bang `employees` da co du lieu thi bo qua seed.
- Khong tu dong seed du lieu mau trong moi truong production.
- Rang buoc du lieu:
	- employeeCode unique
	- Cac truong bat buoc dat NOT NULL
- Co cau hinh H2 Console de kiem tra du lieu khi phat trien.

## 8. Yeu cau phi chuc nang (muc co ban)
- Hieu nang:
	- Danh sach va tim kiem phan hoi tot voi tap du lieu nho-vua.
- Bao tri:
	- Code tach lop ro rang, de mo rong; FE va BE tach biet hoan toan qua REST API.
- Bao mat co ban:
	- Validate input de tranh du lieu xau (ca client-side va server-side).
	- FE tu escape/encode du lieu khi render vao DOM de tranh XSS (khong dung innerHTML voi du lieu tho tu API).
	- Cau hinh CORS chat che, chi cho phep origin FE hop le.
- Logging:
	- Ghi log cac thao tac quan trong va loi he thong o phia BE.

## 9. Tieu chi hoan thanh (Definition of Done)
- Day du cac chuc nang: search, them, sua, xoa, export.
- Chay on dinh voi H2 va truy cap duoc H2 Console.
- FE (HTML/CSS/JS) thao tac duoc end-to-end voi BE REST API (JSON qua fetch/AJAX).
- Validation hoat dong dung, thong bao loi ro rang tren FE va BE.
- Co du lieu mau de demo luong nghiep vu co ban.

## 10. Mo rong de xuat (khong bat buoc)
- Dang nhap/phan quyen (Admin, HR).
- Luu lich su thay doi thong tin nhan su (audit log).
- Upload avatar nhan su.
- Dashboard thong ke so luong nhan su theo phong ban/trang thai.
- Import nhan su tu file CSV/XLSX.

## 11. Definition of Ready (truoc khi code)
- Spec da duoc review va chot boi PM/BA + Tech Lead + QA.
- Da co API contract chi tiet trong docs/api-spec.md.
- Da co field validation matrix trong docs/coding-rules.md.
- Da co sequence flow success/error cho FE/BE trong design_FE.md va design_BE.md.
- Da co migration plan + seed data strategy trong design_DB.md.
- Da co testcase va mapping tu testcase ID sang test class/method.

## 12. Definition of Done (do duoc, dung cho CI gate)
- Functional:
	- CRUD + search/filter/sort/pagination + export CSV hoat dong dung theo docs/api-spec.md.
- Quality:
	- Unit test + integration test + API test (REST) + FE test deu pass.
	- Coverage toi thieu:
		- BE core package: line >= 90%, branch >= 85%.
		- Quan trong nghiep vu (service + controller): line >= 95%.
	- Khong con bug muc Critical/High o scope release.
- Data:
	- Migration chay thanh cong tren moi truong local moi.
	- Seed data tao du bo du lieu demo va test.
- CI:
	- Build pass.
	- Test pass.
	- Quality gate pass.
	- Lint/static checks pass.

## 13. Traceability matrix (Requirement -> Code -> Test)
| Requirement ID | Mo ta | Code area du kien | Test ID nhom |
|---|---|---|---|
| REQ-001 | Xem danh sach + pagination + sort | EmployeeRestController.list, EmployeeService.search | FE-LIST-*, BE-CTL-001..004, BE-SVC-001..002, DB-QUE-* |
| REQ-002 | 6 dieu kien search tu dong | EmployeeService.search, EmployeeRepository spec | FE-SEARCH-*, BE-CTL-002..004, BE-REP-005..009 |
| REQ-003 | Them moi nhan su | EmployeeRestController.create, EmployeeService.create | FE-CREATE-*, BE-CTL-006..008, BE-SVC-005..007 |
| REQ-004 | Cap nhat nhan su | EmployeeRestController.update, EmployeeService.update | FE-UPDATE-*, BE-CTL-012..014, BE-SVC-008..010 |
| REQ-005 | Xoa nhan su | EmployeeRestController.delete, EmployeeService.delete | FE-DELETE-*, BE-CTL-015..016, BE-SVC-011..012 |
| REQ-006 | Xem chi tiet | EmployeeRestController.detail, EmployeeService.getById | FE-DETAIL-*, BE-CTL-009..011, BE-SVC-003..004 |
| REQ-007 | Export CSV/XLSX | EmployeeRestController.export, EmployeeService.export* | FE-EXPORT-*, BE-CTL-017..019, BE-SVC-013..016, DB-EXP-* |
| REQ-008 | Validation va xu ly loi | DTO validation + GlobalExceptionHandler (@RestControllerAdvice) | FE-EXC-*, BE-EXC-*, BE-SEC-* |
| REQ-009 | Tu dong seed 50 nhan su khi start local/dev neu DB rong | Startup seed component/initializer + EmployeeRepository | DB-SEED-001..003, BE-STARTUP-* |
