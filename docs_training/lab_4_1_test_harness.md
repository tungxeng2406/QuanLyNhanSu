# LAB 4.1 — Thiết lập Test Harness & Chất lượng CI/CD Pipeline

**Thuộc Section 7 — Ngày 4: Test harness and CI/CD**

---

## 1. Mục tiêu bài Lab
* Xây dựng bộ khung kiểm thử tự động (Test Harness) gồm Unit Test và Integration Test.
* Cấu hình GitHub Actions (`.github/workflows/ci.yml`) để tự động hóa quy trình build và test trên mỗi Pull Request.
* Thiết lập bảo vệ nhánh (Branch Protection Rules) yêu cầu CI phải báo xanh (Green build) mới được phép merge.

## 2. Các bước thực hiện chi tiết

### Bước 1: Viết Test tự động cho tính năng Work Order
* Xây dựng các ca kiểm thử đơn vị (JUnit / PyTest) kiểm tra các trường hợp:
  * Tạo thành công (2xx)
  * Lỗi thiếu dữ liệu đầu vào (400)
  * Sai định dạng trạng thái

### Bước 2: Cấu hình GitHub Actions Workflow
* Tạo file `.github/workflows/ci.yml` cấu hình tự động kích hoạt khi có `pull_request` vào nhánh chính.
* Các bước thực thi:
  1. Checkout code
  2. Thiết lập môi trường (Java/Python tương ứng track)
  3. Build ứng dụng
  4. Chạy toàn bộ Unit & Integration Tests

### Bước 3: Thiết lập Branch Protection trên GitHub
* Truy cập mục **Settings** -> **Branches** -> **Branch protection rules** cho nhánh `main`.
* Bật yêu cầu: **Require status checks to pass before merging** (chọn job CI vừa tạo).

## 3. Tiêu chí hoàn thành (Done Criteria)
* File `.github/workflows/ci.yml` chạy thành công trên GitHub Actions.
* Chụp ảnh màn hình minh chứng trạng thái chặn PR khi test thất bại và cho phép merge khi test đạt yêu cầu (Green CI).