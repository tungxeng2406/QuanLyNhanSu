# Coding Rules And Validation Standards

## Mandatory Java and JavaScript conventions

Both standards are mandatory project inputs, not optional references:

- [Java Coding Convention](../docs_requirement/java-coding-rules.md).
- [JavaScript Coding Convention](../docs_requirement/javascript-coding-rules.md).

Apply the relevant language standard to all project-owned production code, unit/integration/E2E tests, helpers and scripts, including `.java`, `.js`, `.cjs` and `.mjs`. Exclude third-party dependencies, generated code and generated reports. Existing code is in scope; functional test success does not establish coding-rule compliance.

### Documentation and implementation comments

- Java: document classes, interfaces, constructors, methods and fields as required by the Java standard. Public contracts must describe responsibilities, parameters, return values and relevant exceptions; use applicable Javadoc tags. An override may inherit an adequate documented contract; document additional behavior explicitly.
- JavaScript: exported functions, classes and complex methods must have JSDoc, including applicable parameter types, return types, asynchronous results and thrown errors. This includes complex functions inside classic scripts and closures, even without an `export` keyword.
- Explain non-obvious algorithms, validation decisions, race handling, CSV escaping and cleanup behavior where needed. Comments must explain intent and constraints, not merely repeat statements.
- Update documentation when behavior changes. Do not invent authors, dates, copyright ownership or change history to populate example headers.
- Apply the rest of both standards too: naming, formatting, declarations, control flow, modularity and error handling. Adding comments alone is insufficient.

### Project-specific adaptations and conflicts

- Keep the explicit project baseline: Java 17, Spring Boot 3, package `vn.tungxeng.hr`, vanilla browser JavaScript and the existing six-field API contract. The Java standard's sample organization/package prefix does not replace the project's specified package.
- Respect the runtime of each file: browser scripts and Node/CommonJS test tooling differ. Examples using another module system or framework are not a requirement to migrate this project.
- Record any further conflict or exception with the affected rule, reason, scope and review decision in the design/PR. Do not silently discard rules or infer a blanket exemption for tests or legacy code.

### Acceptance and evidence

- **REQ-CODE-001:** Java source and tests comply with the Java convention and documented project adaptations.
- **REQ-CODE-002:** JavaScript source, tests and scripts comply with the JavaScript convention and documented project adaptations.
- **REQ-CODE-003:** Review verifies Javadoc/JSDoc and meaningful implementation comments against actual behavior.
- **REQ-CODE-004:** Build/test and coding-rule checks are separate acceptance gates. Configure static checks for enforceable rules and review semantic documentation manually; CI must fail on configured mandatory violations before merge.
- Reports/PRs must list reviewed files, rules checked, commands actually executed, violations, exceptions and checks not yet configured/run. Never label unexecuted checks PASS.
- This document defines required behavior, not proof of implementation. Updating documentation does not add a linter, CI workflow or missing source comments. Until reviewed and verified, current source compliance remains unconfirmed.

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

## 2. Public Employee field validation matrix

| Field | Required | Min | Max | Format/Regex | Notes |
|---|---|---|---|---|---|
| employeeCode | Yes | 3 | 20 | ^[A-Z0-9_\-]+$ | Unique, uppercase de nghi |
| fullName | Yes | 2 | 150 | Unicode letter + space | Trim 2 dau |
| gender | No | - | 20 | MALE/FEMALE/OTHER | Enum string |
| dateOfBirth | No | - | - | yyyy-MM-dd | Khong lon hon ngay hien tai |
| phone | No | 10 | 12 | ^(\+84|0)[0-9]{9,10}$ | Bo ky tu trang truoc khi validate |
| email | No | 5 | 150 | email format | lowercase de nghi |

MVP khong validate hoac expose cac field Employee ngoai 6 field tren.

## 3. Validation implementation rules
- FE validation:
	- Dung HTML attributes va check JS co ban truoc khi goi API.
	- Khong thay the cho server validation.
- BE validation:
	- Dung Jakarta Validation tren request DTO (@Valid trong @RestController).
	- Validation nghiep vu (unique code, search value) dat trong Service.
	- Loi validation tra ve JSON ErrorResponse voi danh sach field errors.
- Request DTO public chi gom `employeeCode`, `fullName`, `gender`, `dateOfBirth`, `phone`, `email`.
- Khong them field an vao request de tranh contract FE/BE bi lech.
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
- Header MVP: `employeeCode,fullName,gender,dateOfBirth,phone,email`.
- Chi export 6 public Employee fields.
- Date format khi xuat: yyyy-MM-dd.

## 7. Security input standards
- BE tra ve JSON thuan, khong render HTML; FE chiu trach nhiem escape du lieu truoc khi chen vao DOM (tranh dung innerHTML voi du lieu tho, uu tien textContent hoac ham escape).
- Khong ghep chuoi SQL thu cong.
- Khong log du lieu nhay cam khong can thiet.
- BE cau hinh CORS chat che: chi allow origin cua FE, gioi han method (GET/POST/PUT/DELETE/OPTIONS) va header can thiet.

