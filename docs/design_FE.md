# Design FE - HR Management (HTML/CSS/JS goi REST API)

## 1. Muc tieu FE
- Xay dung giao dien web don gian, de thao tac cho quan tri vien.
- Hien thi va quan ly danh sach nhan su theo cac nghiep vu bat buoc: search, them, sua, xoa, export.
- FE la ung dung tinh (static HTML/CSS/JS), khong render server-side; toan bo du lieu lay/gui qua REST API (JSON) cua Spring Boot BE bang fetch/AJAX.

## 2. Cong nghe su dung
- HTML5 (static pages, phuc vu qua static server/CDN hoac thu muc static cua BE neu muon)
- Khi dong goi cung Spring Boot, dat static assets tai `src/main/resources/static`.
- CSS3 (co the dung Bootstrap 5 de tang toc UI)
- JavaScript thuan (vanilla JS, ES6+), khong bat buoc framework SPA (React/Vue/Angular)
- Fetch API (hoac Axios neu can) de goi REST API: GET/POST/PUT/DELETE voi JSON body
- Khong dung Thymeleaf/Spring MVC view; server chi tra JSON

## 3. Nguyen tac thiet ke giao dien
- Don gian, ro rang, uu tien tinh de dung.
- Form va bang du lieu co cau truc nhat quan.
- Hien thi thong bao thanh cong/that bai ro rang, xu ly hoan toan bang JavaScript (khong reload trang).
- Kien truc client-rendered: JS nhan JSON tu API roi render/update DOM.

## 4. Cau truc man hinh

### 4.1. Man hinh danh sach nhan su
Chuc nang:
- Goi API GET /api/employees (voi query params) khi trang tai va khi filter/sort/page thay doi.
- Hien thi bang danh sach nhan su duoc render bang JS tu du lieu JSON.
- Giao dien MVP chi hien thi 6 field: employeeCode, fullName, gender, dateOfBirth, phone, email.
- employeeCode va fullName la hai truong bat buoc tren form them/sua.
- Danh sach co 6 dieu kien search tuong ung voi 6 field; khi gia tri thay doi, FE tu dong goi lai API, khong can nut Search.
- Sap xep tang/giam theo cot duoc ho tro (gui lai query params sort).
- Thanh search gom 6 dieu kien doc lap, tuong ung 6 field hien thi:
  - employeeCode: contains, khong phan biet hoa thuong
  - fullName: contains, khong phan biet hoa thuong
  - gender: chon MALE/FEMALE/OTHER
  - dateOfBirth: match exact theo yyyy-MM-dd
  - phone: contains
  - email: contains, khong phan biet hoa thuong
- Moi lan input/change tren mot dieu kien se tu dong goi lai GET /api/employees; khong co nut Search.
- Nut hanh dong:
  - Them moi nhan su
  - Export CSV
  - Export XLSX (neu bat)
  - Reset filter
- Action tren tung dong:
  - Xem chi tiet
  - Sua
  - Xoa

UI behavior:
- Khi mot dieu kien thay doi: cap nhat query params tren URL (history.pushState/URLSearchParams) va goi lai API, khong reload trang.
- Khi chuyen trang: giu nguyen dieu kien filter va sort trong query params, goi lai API voi page moi.
- Khi xoa thanh cong: goi lai API danh sach va cap nhat DOM, hien thi message.

### 4.2. Man hinh/khu vuc them moi nhan su
Chuc nang:
- Form modal nhap 6 field cua nhan su.
- Danh dau truong bat buoc.
- Validate client-side co ban truoc khi gui request:
  - Khong de trong truong bat buoc
  - Dinh dang email
  - Dinh dang so dien thoai
- Sau khi validate client-side hop le:
  - Goi API POST /api/employees voi JSON body.
  - Neu response thanh cong (201): hien thong bao thanh cong, dong form/redirect ve danh sach, refresh du lieu.
  - Neu response loi (400/409): doc JSON error body, hien thong bao loi theo tung field tuong ung.

### 4.3. Man hinh/khu vuc sua nhan su
Chuc nang:
- Goi API GET /api/employees/{id} de nap du lieu cu vao form sua.
- Cho phep cap nhat cac truong cho phep.
- Validate tuong tu man hinh them moi.
- Goi API PUT /api/employees/{id} khi submit.
- Hien thi thong bao ket qua cap nhat tu JSON response (thanh cong/loi).

### 4.4. Man hinh/khu vuc chi tiet nhan su
Chuc nang:
- Goi API GET /api/employees/{id} va hien thi day du thong tin 1 nhan su.
- Cac nut dieu huong:
  - Quay lai danh sach
  - Chuyen toi sua

## 5. Thanh phan UI dung chung
- Layout chinh (HTML tinh, dung chung cho cac trang hoac 1 SPA don gian):
  - Header (ten he thong)
  - Breadcrumb (neu can)
  - Noi dung chinh (khu vuc render dong bang JS)
  - Footer ngan
- Thanh phan JS tai su dung (module/function):
  - renderTable(data)
  - renderPagination(pageInfo)
  - showAlert(type, message)
  - renderFieldErrors(errors)
- Message component:
  - Success message (toast/alert)
  - Error message (toast/alert)
  - Validation message theo tung field, gan truc tiep vao DOM cua input tuong ung

## 6. Giao tiep du lieu voi Backend (REST API)
- Moi thao tac deu goi API qua fetch, vi du:
  - fetch('/api/employees?employeeCode=E001&gender=MALE&page=0&size=10')
  - fetch('/api/employees', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  - fetch('/api/employees/{id}', { method: 'PUT', ... })
  - fetch('/api/employees/{id}', { method: 'DELETE' })
- Response JSON duoc parse va dung de render lai DOM (khong co server-side templating).
- Dung query params (URLSearchParams) de giu state tim kiem/sort/pagination tren URL FE.
- CORS: BE phai cho phep origin cua FE (xem design_BE.md muc CORS).

## 7. Validation FE
- HTML native attributes:
  - required
  - maxlength
  - type=email
  - pattern cho so dien thoai
- JavaScript check bo sung:
  - Trim khoang trang du
  - Chan submit (preventDefault) neu co loi co ban truoc khi goi API
- Luon coi validation server (JSON error response tu API) la nguon su that cuoi cung; JS phai hien thi day du loi field-level tra ve tu BE.

## 8. Xu ly export tren FE
- Nut export goi API export (GET /api/employees/export/csv) kem query params filter hien tai.
- Cach kich hoat tai file:
  - Option A: mo endpoint truc tiep bang window.location/window.open (don gian, phu hop khong can header auth dac biet).
  - Option B: fetch endpoint, doc response.blob(), tao URL.createObjectURL va trigger the <a download> (linh hoat hon, kiem soat duoc loading state/error).
- Ten file do server tra ve qua header Content-Disposition, co timestamp.
- Neu khong co du lieu sau khi loc:
  - Hien thong bao
  - Khong tao file rong (tuy chinh theo chinh sach)

## 9. Yeu cau responsive va kha dung
- Ho tro desktop truoc, mobile muc co ban.
- Bang du lieu:
  - Cho phep scroll ngang tren man hinh hep.
- Cac nut hanh dong du kich thuoc de bam.
- Mau sac trang thai de phan biet ro (Dang lam/Tam nghi/Da nghi).

## 10. Luong nghiep vu FE-BE (qua REST API)
1. User truy cap trang danh sach -> JS goi GET /api/employees -> render bang tu JSON.
2. User nhap search/filter -> JS goi GET /api/employees voi query params moi -> render lai bang.
3. User them/sua -> JS goi POST/PUT voi JSON body; doc JSON response de hien thi ket qua/loi.
4. User xoa -> confirm -> JS goi DELETE -> tren thanh cong, goi lai GET danh sach de refresh.
5. User export -> JS goi API export va tai file (blob hoac direct link).

## 11. Bao mat phia client (XSS)
- Khong dung innerHTML voi du lieu tho tu API; uu tien textContent hoac ham escape HTML truoc khi chen vao DOM.
- Validate/escape du lieu nguoi dung nhap truoc khi hien thi lai (vi du sau khi tao/sua thanh cong).
- Khong eval() hoac thuc thi chuoi du lieu tu API duoi dang code.

## 12. Tieu chi hoan thanh FE
- Day du 4 khu vuc: danh sach, them moi, sua, chi tiet, hoat dong hoan toan qua REST API.
- Search + filter + sort + pagination hoat dong dung qua query params va fetch.
- CRUD thao tac duoc end-to-end voi BE (JSON request/response).
- Export CSV hoat dong theo bo loc hien tai.
- Thong bao va validation hien thi day du, de hieu, khong can reload trang.

## 13. Sequence flow chi tiet (success + error)

### 13.1. Search/list flow
Success flow:
1. User nhap/chon mot trong 6 dieu kien search.
2. FE tu dong build query params va goi fetch GET /api/employees.
3. BE tra ve JSON du lieu da loc.
4. FE render table + pagination + sort state tu JSON, cap nhat URL query params.

Error flow:
1. FE gui mot gia tri search khong hop le hoac backend gap loi.
2. BE tra ve ErrorResponse.
3. FE hien banner loi tu response.message va giu cac dieu kien search hien tai.

### 13.2. Create flow
Success flow:
1. User mo form create (modal/trang rieng, render bang JS).
2. Nhap du lieu hop le, JS validate client-side, submit goi POST /api/employees.
3. BE tra ve 201 + EmployeeDto.
4. FE dong form, hien flash success, goi lai GET danh sach de refresh.

Error flow:
1. User nhap du lieu sai dinh dang hoac trung employeeCode.
2. BE tra ve 400/409 + ErrorResponse (field errors).
3. FE render loi tai dung field trong form, giu nguyen input nguoi dung da nhap.

### 13.3. Update flow
Success flow:
1. User mo form edit, FE goi GET /api/employees/{id} de prefill.
2. Cap nhat du lieu hop le, submit goi PUT /api/employees/{id}.
3. BE tra ve 200 + EmployeeDto.
4. FE hien success message va refresh du lieu lien quan.

Error flow:
1. Record khong ton tai (404) hoac duplicate employeeCode (409).
2. FE hien thong bao not found/duplicate tu response.message.
3. User co the quay ve list hoac sua lai input.

### 13.4. Delete flow
Success flow:
1. User click delete.
2. JS confirm (window.confirm hoac modal).
3. User confirm -> FE goi DELETE /api/employees/{id}.
4. BE tra ve 204, FE goi lai GET danh sach de refresh.

Error flow:
1. Record da bi xoa boi request khac.
2. BE tra ve 404 + ErrorResponse.
3. FE hien thong bao va refresh danh sach hien tai.

### 13.5. Export flow
Success flow:
1. User ap bo loc tren list.
2. Click Export CSV.
3. FE goi API export voi cung query params (qua link/fetch blob).
4. Browser tai file dung ten (tu Content-Disposition) + dung encoding.

Error flow:
1. BE gap loi tao file export (500, EMP-500-002).
2. FE hien thong bao that bai va cho phep thu lai.

