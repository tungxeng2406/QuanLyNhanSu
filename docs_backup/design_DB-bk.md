# Design DB - HR Management (H2)

## 1. Muc tieu thiet ke DB
- Luu tru thong tin nhan su cho cac nghiep vu CRUD, search, loc, export.
- Don gian de khoi dong nhanh voi H2 cho moi truong dev/lab.
- Du de mo rong sang DB production (PostgreSQL/MySQL) khi can.

## 2. Cong nghe su dung
- H2 Database: file mode cho local/dev, in-memory cho profile test
- Spring Data JPA + Hibernate cho mapping
- `schema.sql` de khoi tao schema
- `data.sql` de seed dung 50 record mau cho local/dev va profile test
- Maven + Java 17 + Spring Boot 3.x

## 3. Lua chon che do H2
- Local/dev:
  - File mode, vi du `jdbc:h2:file:./data/hrdb`, de du lieu giu lai sau khi restart.
- Test:
  - In-memory mode, vi du `jdbc:h2:mem:hrdb-test`, de moi test co DB sach va lap lai duoc.
- Ca local/dev va test deu chay `schema.sql` truoc `data.sql`.
- `data.sql` dung `WHERE NOT EXISTS` de khong chen trung khi restart H2 file mode.

## 4. Mo hinh du lieu de xuat

### 4.1. Bang employees
Muc dich:
- Luu thong tin nhan su cot loi.

Cac cot de xuat:
- id BIGINT PRIMARY KEY AUTO_INCREMENT
- employee_code VARCHAR(50) NOT NULL UNIQUE
- full_name VARCHAR(150) NOT NULL
- gender VARCHAR(20)
- date_of_birth DATE
- phone VARCHAR(20)
- email VARCHAR(150)
- address VARCHAR(255)
- department VARCHAR(100)
- position VARCHAR(100)
- hire_date DATE
- status VARCHAR(20) NOT NULL
- base_salary DECIMAL(18,2)
- note VARCHAR(500)
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL

## 5. Rang buoc du lieu va toan ven
- Unique constraint:
  - uq_employees_employee_code (employee_code)
- Not null:
  - employee_code
  - full_name
  - status
  - created_at
  - updated_at
- Check logic (co the validate o app level neu H2 han che):
  - status thuoc tap gia tri hop le (ACTIVE, INACTIVE, RESIGNED)
  - base_salary >= 0 neu co du lieu

## 6. Index de toi uu tim kiem
Index khuyen nghi:
- idx_employees_full_name (full_name)
- idx_employees_department (department)
- idx_employees_status (status)
- idx_employees_hire_date (hire_date)
- idx_employees_email (email)
- idx_employees_phone (phone)

Ly do:
- Ho tro loc nhanh theo phong ban, trang thai, ngay vao lam.
- Ho tro tim kiem doc lap tren 6 field UI va ket hop nhieu dieu kien bang AND.

## 7. Chien luoc tim kiem du lieu
- Search theo UI 6 field:
  - employee_code LIKE ?
  - full_name LIKE ?
  - gender = ?
  - date_of_birth = ?
  - phone LIKE ?
  - email LIKE ?
- Khi co nhieu dieu kien, ket hop bang AND.
- Sort:
  - full_name, hire_date, employee_code
- Pagination:
  - LIMIT/OFFSET do JPA phat sinh

## 8. Script khoi tao de xuat
- schema.sql:
  - Tao bang employees
  - Tao constraints va indexes
- data.sql:
  - Sinh dung 50 record mau khi bang employees dang rong
  - Khong phu thuoc startup initializer Java
- Muc tieu:
  - Co ngay du lieu de test CRUD/search/export

## 9. Mapping JPA-H2
- Entity Employee map toi bang employees.
- employeeCode map cot employee_code.
- Enum status map dang String de de doc du lieu.
- createdAt/updatedAt set tu dong bang @PrePersist va @PreUpdate.

## 10. Dam bao du lieu cho chuc nang export
- Export lay du lieu tu cung dieu kien filter nhu man hinh danh sach.
- Thu tu ban ghi export giong sort hien tai (neu co).
- Dinh dang du lieu khi export:
  - Date theo yyyy-MM-dd
  - Salary theo so thuc co 2 chu so thap phan

## 11. Van hanh va quan tri DB trong dev
- Bat H2 Console:
  - spring.h2.console.enabled=true
- URL ket noi mau:
  - jdbc:h2:mem:hrdb (in-memory)
  - jdbc:h2:file:./data/hrdb (file mode)
- User/Password theo cau hinh app.

## 12. Backup/restore cho ban don gian
- Neu dung file mode:
  - Backup bang copy file DB dinh ky
- Neu dung in-memory:
  - Co script seed de tai tao nhanh du lieu sau moi lan restart

## 13. Mo rong du lieu trong tuong lai
- Tach bang departments neu muon quan ly danh muc phong ban chuan.
- Tach bang positions neu muon quan ly chuc vu theo cap bac.
- Them bang employee_audit de luu lich su thay doi.
- Them truong deleted_flag cho soft delete.

## 14. Tieu chi hoan thanh DB
- Tao duoc schema employees voi dung constraints.
- Dap ung truy van CRUD + search + filter + pagination.
- Dap ung export du lieu nhanh va dung.
- Co data mau de demo day du nghiep vu.

## 15. Migration strategy chi tiet

### 15.1. Lua chon cong cu
- Uu tien Flyway de quan ly schema migration co version.
- Naming script:
  - V1__create_employees_table.sql
  - V2__add_indexes_for_search.sql
  - V3__seed_employees_dev_data.sql

### 15.2. Thu tu migration
1. Tao bang employees + constraints co ban.
2. Tao indexes toi uu tim kiem.
3. Seed data cho local/dev/test.

### 15.3. Roll-forward policy
- Khong sua script migration da release.
- Neu can chinh schema, tao script moi V{n+1}.
- Tranh rollback script phuc tap tren moi truong shared; uu tien roll-forward.

### 15.4. Seed data policy
- Local/dev:
  - Khi ung dung start, Spring Boot chay `data.sql` sau `schema.sql`.
  - `data.sql` tu dong seed dung 50 ban ghi neu bang employees dang rong.
  - Seed phai idempotent: restart ung dung khi da co du lieu khong duoc tao them ban ghi trung.
- Test:
  - Dung cung `data.sql` voi du lieu deterministic de test repeatable.
- Prod:
  - Khong chay seed demo data.

### 15.5. Migration acceptance checks
- App startup tren DB moi: pass.
- App startup tren DB da co du lieu: pass.
- App startup tren DB rong chay `data.sql` va tao dung 50 ban ghi mau.
- App restart tren DB da seed khong tao them ban ghi.
- Khong mat du lieu do migration sai khi nang cap phien ban.

