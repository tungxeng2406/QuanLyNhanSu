# Phase 1: Phan Tich Yeu Cau

## 1. Pham vi MVP

Ung dung quan ly nhan su cho Admin/HR noi bo, gom:

- Xem danh sach nhan su.
- Pagination.
- Search tu dong theo 6 field.
- Them/sua bang modal.
- Xoa co xac nhan.
- Xem chi tiet.
- Export CSV.
- Seed 50 record bang `data.sql`.
- REST API JSON.
- Frontend HTML/CSS/JavaScript thuan.
- Unit, integration va E2E test.

## 2. Diem can lam ro

### Du lieu

1. `employeeCode` co format co dinh khong? Vi du `E001`.
2. `gender` dung gia tri nao: `MALE`, `FEMALE`, `OTHER`?
3. `dateOfBirth` co duoc lon hon ngay hien tai khong?
4. Phone co bat buoc format Viet Nam khong?
5. Email co bat buoc unique khong?
6. Co can luu cac field backend mo rong nhu `department`, `status`, `salary` khong, hay chi ton tai dung 6 field?

### Search

7. Search text dung `contains` hay exact match?
8. Search co phan biet hoa thuong khong?
9. Sau khi nhap nhieu dieu kien, ket hop bang `AND` hay `OR`?
10. Auto-search co debounce khong? Vi du cho 300ms sau khi nguoi dung ngung go.
11. Co can luu dieu kien search tren URL khong?
12. Khi search khong co ket qua, hien thi empty state nhu the nao?

### CRUD

13. Khi tao nhan su thanh cong, modal co dong tu dong khong?
14. Khi sua, co cho phep sua `employeeCode` khong?
15. Khi xoa, dung hard delete hay soft delete?
16. Co can audit log lich su thay doi khong?
17. Co can chong double-submit khi nguoi dung click Save nhieu lan khong?

### Database va seed

18. `data.sql` tao 50 record khi bang rong co dung khong?
19. Khi database da co 10 record nghiep vu, co bo qua seed khong?
20. Production co chay `data.sql` khong?
21. H2 local dung file path nao?
22. Co can H2 Console khong?

### Export

23. CSV export co ap dung toan bo 6 dieu kien search hien tai khong?
24. CSV dung UTF-8 BOM khong?
25. Co can XLSX khong, hay chi CSV?
26. Khi khong co du lieu, export file rong hay tra thong bao loi?

### Security

27. Phien ban MVP co dang nhap/phan quyen khong?
28. CORS cho phep nhung origin nao?
29. Co gioi han request hoac chong spam API khong?
30. Co can masking phone/email trong log khong?

### Testing

31. Test coverage toi thieu bao nhieu phan tram?
32. FE E2E dung Playwright dung khong?
33. Test co chay voi database rieng khong?
34. Test CRUD co tao data random va cleanup sau test khong?
35. Co can CI GitHub Actions khong?

### Deployment

36. Chay production bang JAR hay Docker?
37. Co can Dockerfile va docker-compose khong?
38. Production se dung H2 hay chuyen sang PostgreSQL/MySQL?
39. Co can huong dan deploy len server/cloud cu the khong?

## 3. Kien truc de xuat

```text
Frontend
HTML/CSS/JavaScript static
        |
        | fetch JSON
        v
Spring Boot REST API
        |
Controller
        |
Service
        |
Repository
        |
H2 Database
```

Backend package:

```text
vn.tungxeng.hr
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
└── service
    └── impl
```

Frontend:

```text
src/main/resources/static
├── index.html
├── app.js
└── styles.css
```

Test:

```text
src/test/java
e2e
tests/unit
```

## 4. Cac quyet dinh mac dinh de xuat

Neu chua co yeu cau khac, de xuat:

- Search text: `contains`, khong phan biet hoa thuong.
- Search nhieu field: ket hop `AND`.
- Auto-search debounce: 300ms.
- `employeeCode`: unique, format `^[A-Z0-9_-]+$`.
- `fullName`: bat buoc, 2-150 ky tu.
- Phone: format Viet Nam.
- Email: format hop le, khong bat buoc unique.
- Delete: hard delete trong MVP.
- Export: CSV truoc, XLSX la optional.
- Seed: local/test chay `data.sql`; production khong seed demo.
- E2E: Playwright, worker = 1, tao ma test random va cleanup sau test.
- Khong dung Thymeleaf.
- Khong co authentication trong MVP.

## 5. Cac diem can xac nhan truoc Phase 2

1. Chi giu 6 field tren ca UI va API, hay backend van giu field mo rong?
2. Search nhieu dieu kien dung `AND` dung khong?
3. Co debounce auto-search 300ms khong?
4. Chi can export CSV hay can ca XLSX?
5. Co can login/phan quyen khong?
6. Co dung hard delete khong?
7. Production dung H2 hay database khac?
8. Co can Docker/GitHub Actions khong?

## 6. Ket luan

Sau khi cac diem tren duoc xac nhan, chuyen sang Phase 2:

- Viet requirement specification.
- Viet domain model.
- Viet database design.
- Viet API specification.
- Viet frontend/backend design.
- Viet testcase matrix.

Chua generate code trong Phase 1.
