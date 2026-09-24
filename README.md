## 1) HR Management

## Mandatory coding-rule compliance

Apply both [Java coding rules](docs_requirement/java-coding-rules.md) and [JavaScript coding rules](docs_requirement/javascript-coding-rules.md) to the relevant language files, following [project applicability, adaptations and acceptance gates](docs/coding-rules.md#mandatory-java-and-javascript-conventions).

Before implementation or review, read both standards. Coding-rule compliance is mandatory for production code, tests and scripts. Include Javadoc/JSDoc and meaningful comments, not only functional tests.

### Tổng quan dự án

HR Management là ứng dụng web quản lý thông tin nhân viên, hỗ trợ tra cứu và cập
nhật hồ sơ trên trình duyệt. Backend sử dụng **Java 17, Spring Boot 3, Maven,
Spring Data JPA và H2**; giao diện sử dụng **HTML, CSS và JavaScript** và được
phục vụ trực tiếp bởi Spring Boot, không cần chạy frontend riêng.

### Chức năng chính

- Xem danh sách nhân viên có phân trang.
- Thêm, sửa và xóa hồ sơ nhân viên, kiểm tra dữ liệu khi lưu.
- Quản lý mã nhân viên, họ tên, giới tính, ngày sinh, điện thoại và email;
  mã nhân viên và họ tên là thông tin bắt buộc.
- Lọc danh sách theo các trường thông tin, xóa bộ lọc bằng **Clear filters**.
- Nhấn tiêu đề cột để sắp xếp tăng/giảm; lưu trạng thái tìm kiếm trên URL.
- Tải lại danh sách bằng **Refresh**, xuất danh sách nhân viên bằng **Export CSV**.
- Nhập CSV mặt hàng và tính VAT qua **Import file**, được hướng dẫn ở phần 2.

### Cách chạy dự án

Chuẩn bị **JDK 17** và **Maven 3.9+**, sau đó mở terminal tại thư mục
`Project_QuanLyNhanSu`. Node.js 20+ và npm chỉ cần cho kiểm thử giao diện.

```powershell
mvn spring-boot:run
```

Mở [http://localhost:8080/](http://localhost:8080/) để sử dụng ứng dụng.
Cấu hình mặc định `local` lưu dữ liệu H2 tại `./data/hrdb`. Khi cơ sở dữ liệu
chưa có dữ liệu, ứng dụng tạo 50 nhân viên mẫu; khởi động lại không tạo trùng.
Nhấn `Ctrl+C` tại terminal đang chạy để dừng ứng dụng.

H2 Console nằm tại [http://localhost:8080/h2-console](http://localhost:8080/h2-console).
JDBC URL: `jdbc:h2:file:./data/hrdb`, user: `sa`, mật khẩu để trống.
Nếu Maven chưa có trong PATH hoặc cần chạy bằng file JAR, xem [hướng dẫn chạy dự án](run_project.md).

### Cách kiểm thử dự án

#### Kiểm thử backend và cơ sở dữ liệu

```powershell
mvn test '-Dspring.profiles.active=test'
```

Cấu hình `test` sử dụng H2 trong bộ nhớ và nạp `schema.sql`, `data.sql` với
50 nhân viên mẫu, tách biệt dữ liệu H2 lưu trên máy. Lệnh trên chạy kiểm thử
unit bằng Mockito, kiểm thử API bằng MockMvc, kiểm thử schema/dữ liệu/giao dịch
và kiểm tra khởi động ứng dụng. Kết quả nằm tại `target/surefire-reports`.

#### Kiểm thử giao diện bằng Playwright

Cài thư viện và trình duyệt kiểm thử lần đầu:

```powershell
npm.cmd install
npx.cmd playwright install chromium
```

Khi ứng dụng đang chạy ở cổng 8080, mở terminal khác trong thư mục dự án:

```powershell
npm.cmd run e2e
```

Bộ kiểm thử chạy với một worker, tạo mã nhân viên riêng cho các bài CRUD và
xóa dữ liệu do bài kiểm thử tạo trong bước dọn dẹp. Xem báo cáo tại
`playwright-report/index.html`, kết quả JSON tại `test-results/results.json`.
Trên Windows, dùng `npm.cmd` nếu PowerShell chặn `npm.ps1`.

Để chỉ kiểm thử chức năng Import file:

```powershell
node node_modules/@playwright/test/cli.js test e2e/items-csv.spec.js --reporter=list
```

#### Chạy kiểm thử với dữ liệu tạm riêng

Chạy kiểm thử backend rồi khởi động máy chủ kiểm thử ở cổng 18080:

```powershell
mvn test '-Dspring.profiles.active=test'
mvn spring-boot:run '-Dspring-boot.run.profiles=test' '-Dspring-boot.run.arguments=--server.port=18080'
```

Trong terminal thứ hai:

```powershell
$env:BASE_URL = 'http://localhost:18080'
npm.cmd run e2e
node scripts/phase5-report.cjs
```

Script `scripts/phase5-report.cjs` tổng hợp báo cáo tại
`docs/phase_5_test_report.md` từ kết quả kiểm thử. Khi thay đổi bài kiểm thử,
cần rà soát ánh xạ testcase trong script để báo cáo phản ánh đúng phạm vi kiểm tra.
Kết quả đạt của bộ kiểm thử không đồng nghĩa mọi testcase trong tài liệu đều đã được chạy.

## 2) Chức năng mở rộng (Import file)

Chức năng **Import file** giúp nhập danh sách mặt hàng, tự tính tiền trước thuế,
tiền VAT, tiền sau thuế và tổng thanh toán. Kết quả được hiển thị trong cửa sổ
**Danh sách mặt hàng** (modal) để xem và tải về.

**1. Chuẩn bị file dữ liệu**

Sử dụng [file mẫu mặt hàng](docs/mat-hang-mau.csv) hoặc chuẩn bị file `.csv`
với 5 cột sau ở dòng tiêu đề:

| Cột | Nội dung cần nhập | Ví dụ |
| --- | --- | --- |
| No | Số thứ tự hoặc mã dòng, không để trống | 1 |
| Tên mặt hàng | Tên hàng hóa, không để trống | Bút bi |
| Số lượng | Số không âm, có thể là số thập phân | 10 |
| Đơn giá | Giá một đơn vị chưa bao gồm VAT, là số không âm | 5000 |
| Thuế VAT (%) | Tỷ lệ thuế từ 0 đến 100 | 10 hoặc 10% |

Các lưu ý khi chuẩn bị file:

- Lưu file dạng CSV mã hóa **UTF-8**, các cột phân cách bằng **dấu phẩy**.
  Nếu dùng Excel, chọn định dạng **CSV UTF-8 (Comma delimited)** khi lưu.
- File tối đa **5 MB**, chứa từ **1 đến 10.000 mặt hàng**, không tính dòng tiêu đề.
- Nhập số thập phân bằng dấu chấm, ví dụ `12500.50`; không thêm dấu phân cách
  hàng nghìn hoặc ký hiệu tiền tệ. Không để trống các ô số.
- `8` và `8%` đều được hiểu là thuế suất 8%. Đơn giá của các mặt hàng nên dùng
  cùng một đơn vị tiền tệ vì ứng dụng không chuyển đổi tiền tệ.
- Có thể đổi thứ tự cột; tên cột không phân biệt hoa/thường và bỏ khoảng trắng
  ở hai đầu. Không dùng tiêu đề trùng nhau. Cột tỷ lệ thuế cũng chấp nhận tên
  **Thuế VAT** hoặc tên cũ **VAT (Mặt hàng)**.
- Nếu tự sửa CSV bằng trình soạn thảo, tên hàng có dấu phẩy hoặc xuống dòng phải
  nằm trong dấu ngoặc kép; dấu ngoặc kép bên trong ghi thành hai dấu liên tiếp.
  Ví dụ: `"Giấy A4, loại 1"`. Mỗi dòng phải có đủ số cột như dòng tiêu đề.

**2. Nhập file và xem kết quả**

1. Mở ứng dụng tại [http://localhost:8080/](http://localhost:8080/).
2. Trong khu vực **Employee List**, nhấn **Import file**.
3. Chọn file `.csv` đã chuẩn bị. Nếu hủy chọn file, ứng dụng không nhập dữ liệu.
4. Khi file hợp lệ, cửa sổ **Danh sách mặt hàng** tự mở, hiển thị tên file,
   số mặt hàng và bảng kết quả gồm 8 cột.
5. Kiểm tra tiền từng mặt hàng và dòng **Total** cuối bảng. Có thể cuộn bảng
   ngang khi màn hình nhỏ.

Ngoài 5 cột đầu vào, ứng dụng tự tính thêm 3 cột:

| Cột kết quả | Công thức |
| --- | --- |
| Trước VAT | Số lượng × Đơn giá |
| Thuế VAT | Số lượng × Đơn giá × Thuế VAT (%) / 100 |
| Sau VAT | Trước VAT + tiền Thuế VAT |
| **Total** (dòng cuối bảng) | **Tổng tất cả giá trị Sau VAT** |

**Thuế VAT (%)** là tỷ lệ thuế, còn **Thuế VAT** là số tiền thuế của mặt hàng.
Tiền trước thuế và tiền thuế được tính từ dữ liệu gốc rồi làm tròn đến 2 chữ số
thập phân; tiền sau thuế cộng hai khoản đã làm tròn. Total cộng các giá trị sau
thuế của tất cả mặt hàng. Mỗi mặt hàng có thể có tỷ lệ thuế khác nhau.
Số trên giao diện dùng định dạng tiếng Việt, ví dụ `150.000` là một trăm năm mươi nghìn.

Ví dụ kết quả khi nhập hai mặt hàng:

| Mặt hàng | Số lượng | Đơn giá | Thuế VAT (%) | Trước VAT | Thuế VAT | Sau VAT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Bút bi | 10 | 5.000 | 10% | 50.000 | 5.000 | 55.000 |
| Giấy A4 | 2 | 75.000 | 8% | 150.000 | 12.000 | 162.000 |

**Total = 55.000 + 162.000 = 217.000.**

**3. Xuất kết quả và đóng cửa sổ**

- Nhấn **Export CSV trong cửa sổ Danh sách mặt hàng** để tải file
  **mat-hang.csv**, gồm toàn bộ mặt hàng và đủ 8 cột đang hiển thị.
- File xuất hỗ trợ tiếng Việt trong Excel, dùng UTF-8 có BOM. Số trong CSV dùng
  dấu chấm thập phân, không có dấu phân cách hàng nghìn; tỷ lệ thuế xuất dạng số.
- Dòng **Total chỉ hiển thị trên giao diện**, chưa được ghi vào file xuất.
  Nút Export CSV ở ngoài cửa sổ này dùng để xuất danh sách nhân viên.
- Có thể nhập lại file đã xuất. Ứng dụng đọc các cột dữ liệu đầu vào và tính lại
  số tiền, không sử dụng các kết quả tính sẵn trong file.
- Nhấn **Đóng** hoặc phím **Esc** để đóng cửa sổ. Để xem file khác, nhấn
  **Import file** và chọn lại; dữ liệu hợp lệ mới sẽ thay thế danh sách trước đó.
- Dữ liệu mặt hàng chỉ được xử lý trong trình duyệt, không lưu vào cơ sở dữ liệu
  nhân viên. Tải lại trang sẽ mất dữ liệu đã nhập; hãy xuất file nếu cần lưu lại.

**4. Xử lý lỗi thường gặp**

| Thông báo/tình huống | Cách khắc phục |
| --- | --- |
| File không hợp lệ hoặc quá dung lượng | Chọn file `.csv` không quá 5 MB |
| Quá nhiều mặt hàng | Chia file thành các file tối đa 10.000 mặt hàng |
| Thiếu cột, trùng tiêu đề hoặc sai số cột | Kiểm tra 5 tiêu đề bắt buộc, dấu phẩy phân cách và dữ liệu từng dòng |
| File chưa có dữ liệu | Thêm ít nhất một mặt hàng dưới dòng tiêu đề |
| No hoặc tên mặt hàng bị trống | Điền đầy đủ thông tin ở dòng được báo lỗi |
| Số lượng/đơn giá không hợp lệ | Nhập số không âm, dùng dấu chấm thập phân, bỏ ký hiệu tiền tệ |
| Thuế VAT ngoài phạm vi | Nhập tỷ lệ từ 0 đến 100, có thể kèm `%` |
| Sai hoặc thiếu dấu ngoặc kép | Kiểm tra các ô chứa dấu phẩy, xuống dòng hoặc dấu ngoặc kép |
| Giá trị tính toán quá lớn | Kiểm tra và giảm các giá trị vượt giới hạn xử lý số của ứng dụng |

Nếu file có lỗi, ứng dụng hiển thị thông báo và không mở bảng kết quả mới;
không nhập riêng một phần các dòng hợp lệ. Sau khi sửa, có thể chọn lại chính
file đó bằng nút **Import file**.
