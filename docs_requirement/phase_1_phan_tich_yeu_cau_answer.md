# Phase 1 - Cau Tra Loi (Draft Review)

## Mandatory coding-rule compliance

Apply both [Java coding rules](java-coding-rules.md) and [JavaScript coding rules](javascript-coding-rules.md) to the relevant language files, following [project applicability, adaptations and acceptance gates](../docs/coding-rules.md#mandatory-java-and-javascript-conventions).

Current coding-quality decision: both standards are mandatory, including production code, tests and scripts. This requirement supersedes any omission of coding conventions in the earlier draft answers; it does not claim implementation compliance.

File nay tra loi 39 cau hoi trong `phase_1_phan_tich_yeu_cau.md`. Cac gia tri duoi day la de xuat de review truoc khi chot Phase 2.

## Du lieu

1. **employeeCode format:** Unique, dai 3-20 ky tu, dung regex `^[A-Z0-9_-]+$`.
2. **gender:** `MALE`, `FEMALE`, `OTHER`.
3. **dateOfBirth:** Khong duoc lon hon ngay hien tai.
4. **Phone:** Khong bat buoc; neu nhap phai dung format Viet Nam `^(\+84|0)[0-9]{9,10}$`.
5. **Email unique:** Khong bat buoc unique; phai dung format email, toi da 150 ky tu.
6. **Field backend mo rong:** Co the giu trong backend/database de mo rong, nhung UI MVP chi hien thi 6 field: employeeCode, fullName, gender, dateOfBirth, phone, email.

## Search

7. **Match:** Text search dung `contains`; gender va dateOfBirth dung exact match.
8. **Case sensitivity:** Khong phan biet hoa thuong.
9. **Ket hop dieu kien:** Dung `AND`.
10. **Debounce:** Co debounce 300ms cho text input; select/date goi khi `change`.
11. **Luu tren URL:** Co, dung query params de giu trang thai khi reload/chuyen trang.
12. **Khong co ket qua:** Hien empty state `No employees found`, giu gia tri filter, khong hien loi he thong.

## CRUD

13. **Tao thanh cong:** Dong modal, hien success message va reload danh sach.
14. **Sua employeeCode:** Cho phep sua neu ma moi khong trung; trung ma tra 409.
15. **Delete:** Hard delete trong MVP.
16. **Audit log:** Chua can trong MVP; de mo rong phase sau.
17. **Double-submit:** Co; disable Save trong luc submit va khong cho gui request thu hai.

## Database va seed

18. **Seed 50 record:** Dung `data.sql`, neu bang rong thi tao dung 50 record deterministic.
19. **DB da co du lieu:** Bo qua seed neu `employees` da co bat ky record nao.
20. **Production seed:** Khong chay seed demo trong production.
21. **H2 local URL:** `jdbc:h2:file:./data/hrdb;AUTO_SERVER=TRUE`.
22. **H2 Console:** Co trong local/dev tai `/h2-console`; khong bat production.

## Export

23. **CSV filter:** Ap dung cung 6 query params va cung logic AND voi danh sach.
24. **CSV encoding:** UTF-8 BOM.
25. **XLSX:** Khong bat buoc MVP; chi CSV trong phase dau.
26. **Khong co du lieu:** Tra CSV HTTP 200 chi co header.

## Security

27. **Authentication:** Chua co trong MVP; chi phuc vu Admin/HR noi bo trong moi truong demo.
28. **CORS:** Chi cho phep origin hop le, mac dinh local `http://localhost:8080` va `http://localhost:5500`; khong dung wildcard production.
29. **Rate limit:** Chua co trong MVP; can reverse proxy/security layer neu deploy public.
30. **Log phone/email:** Khong log day du; mask hoac chi log employeeCode.

## Testing

31. **Coverage:** BE core line >= 90%, branch >= 85%; service/controller quan trong line >= 95%; FE E2E bao phu luong quan trong.
32. **FE E2E:** Dung Playwright Chromium.
33. **Database test:** Dung H2 in-memory rieng, khong phu thuoc H2 file local.
34. **CRUD E2E data:** Tao employeeCode random va cleanup qua API trong `finally`.
35. **CI:** De xuat GitHub Actions chay Maven test, Playwright E2E va build artifact.

## Deployment

36. **Production run:** Dung executable JAR trong MVP.
37. **Docker:** Chua can Dockerfile/docker-compose trong MVP; de phase sau.
38. **Production database:** MVP dung H2; production that nen chuyen PostgreSQL va dung Flyway.
39. **Cloud:** Chua chot nha cung cap; hien chi huong dan local/build JAR.

## Baseline de review

- 6 field UI, field mo rong chi backend-only.
- Search contains, khong phan biet hoa thuong, ket hop AND.
- Debounce text 300ms.
- Hard delete.
- CSV bat buoc, XLSX optional.
- Khong authentication MVP.
- H2 + executable JAR cho MVP.
- Playwright E2E voi random data va cleanup.

Vui long review va sua cac gia tri tren. Sau khi xac nhan, dung file nay lam baseline cho Phase 2.
