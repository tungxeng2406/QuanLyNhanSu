# Coding Rules And Validation Standards

## 1. General coding rules
- Su dung Java 17, Maven va Spring Boot 3.x.
- Package goc mac dinh la `vn.tungxeng.hr`.
- FE static dat tai `src/main/resources/static`; khong them Thymeleaf/ViewResolver.
- UI MVP chi hien thi 6 field: employeeCode, fullName, gender, dateOfBirth, phone, email; employeeCode va fullName bat buoc.
- Search UI dung 6 query params tuong ung va tu dong goi API khi input/change thay doi; khong dung nut Search.
- Dat ten ro nghia, tranh viet tat mo ho.
- Controller dung @RestController, chi xu ly request/response (JSON), khong render view, khong chua nghiep vu phuc tap.
- Nghiep vu dat trong Service.
- Truy cap du lieu dat trong Repository.
- DTO dung cho input/output, han che expose Entity truc tiep.
- Moi exception nghiep vu phai co ma loi va message ro rang, tra ve qua JSON ErrorResponse (@RestControllerAdvice).
- FE (HTML/CSS/JS) va BE hoan toan tach biet, chi giao tiep qua REST API JSON.

## 2. Field-level validation matrix

| Field | Required | Min | Max | Format/Regex | Notes |
|---|---|---|---|---|---|
| employeeCode | Yes | 3 | 20 | ^[A-Z0-9_\-]+$ | Unique, uppercase de nghi |
| fullName | Yes | 2 | 150 | Unicode letter + space | Trim 2 dau |
| gender | No | - | 20 | MALE/FEMALE/OTHER | Enum string |
| dateOfBirth | No | - | - | yyyy-MM-dd | Khong lon hon ngay hien tai |
| phone | No | 10 | 12 | ^(\+84|0)[0-9]{9,10}$ | Bo ky tu trang truoc khi validate |
| email | No | 5 | 150 | email format | lowercase de nghi |
| address | No | 0 | 255 | free text | Trim |
| department | No | 0 | 100 | free text | Trim |
| position | No | 0 | 100 | free text | Trim |
| hireDate | No | - | - | yyyy-MM-dd | Khuyen nghi >= dateOfBirth + 18y |
| status | Yes | - | 20 | ACTIVE/INACTIVE/RESIGNED | Enum string |
| baseSalary | No | 0 | 18,2 | decimal >= 0 | Scale = 2 |
| note | No | 0 | 500 | free text | Trim |

## 3. Validation implementation rules
- FE validation:
	- Dung HTML attributes va check JS co ban truoc khi goi API.
	- Khong thay the cho server validation.
- BE validation:
	- Dung Jakarta Validation tren request DTO (@Valid trong @RestController).
	- Validation nghiep vu (unique code, search value) dat trong Service.
	- Loi validation tra ve JSON ErrorResponse voi danh sach field errors.
- DB validation:
	- Dung NOT NULL, UNIQUE, type constraints.

## 4. Date/time standards
- Date format input/output: yyyy-MM-dd.
- Timezone he thong: Asia/Ho_Chi_Minh.
- Timestamp luu DB: UTC hoac local da thong nhat, khong tron lan trong cung project.

## 5. Error handling standards
- Error payload/log phai co:
	- errorCode
	- message
	- correlationId (neu co)
- Khong tra stacktrace thang cho nguoi dung.

## 6. Export standards
- CSV encoding: UTF-8 BOM.
- Delimiter: comma (,).
- Quote char: double quote.
- Date format khi xuat: yyyy-MM-dd.
- So thuc khi xuat: 2 chu so thap phan.

## 7. Security input standards
- BE tra ve JSON thuan, khong render HTML; FE chiu trach nhiem escape du lieu truoc khi chen vao DOM (tranh dung innerHTML voi du lieu tho, uu tien textContent hoac ham escape).
- Khong ghep chuoi SQL thu cong.
- Khong log du lieu nhay cam khong can thiet.
- BE cau hinh CORS chat che: chi allow origin cua FE, gioi han method (GET/POST/PUT/DELETE/OPTIONS) va header can thiet.

