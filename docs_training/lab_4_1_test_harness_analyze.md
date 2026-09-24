# Phân tích LAB 4.1 — Thiết lập Test Harness & Chất lượng CI/CD Pipeline

File này yêu cầu bạn **thiết lập kiểm thử tự động và kiểm soát việc merge code bằng CI trên GitHub**. Không chỉ chạy test rồi viết báo cáo: bạn phải chứng minh rằng **test lỗi thì PR bị chặn, test đạt thì điều kiện CI cho phép merge được đáp ứng**.

## 1. Bạn cần làm những gì?

| Công việc | Yêu cầu cụ thể | Kết quả cần có |
|---|---|---|
| Viết test tự động | Kiểm tra tạo thành công, thiếu dữ liệu đầu vào, trạng thái sai định dạng | Bộ Unit Test và Integration Test |
| Tạo workflow CI | Tạo `.github/workflows/ci.yml`, kích hoạt khi có Pull Request vào nhánh chính | GitHub tự checkout code, thiết lập môi trường, build và chạy test |
| Bảo vệ nhánh `main` | Yêu cầu job CI phải thành công trước khi merge | PR có CI thất bại không được merge |
| Thu thập minh chứng | Thực hiện cả tình huống test thất bại và thành công | Ảnh chụp PR bị chặn và PR có CI xanh |

## 2. Áp dụng vào dự án của bạn như thế nào?

Có một điểm cần làm rõ: **lab yêu cầu tính năng “Work Order”, còn dự án của bạn là quản lý nhân viên — Employee**.

- Nếu giảng viên yêu cầu đúng Work Order, bạn cần làm trên tính năng/dự án Work Order.
- Nếu được phép áp dụng vào dự án hiện tại, bạn có thể dùng Employee, nhưng cần thống nhất cách thay thế trường hợp “trạng thái sai định dạng”. Ví dụ, kiểm tra giá trị `gender` không hợp lệ là một phương án tương đương về validation, **không phải yêu cầu nguyên văn của lab**.

Dự án hiện tại dùng Java/Spring Boot, nên hướng phù hợp là **JUnit và Maven**. Bạn đã có các kiểm thử backend và Playwright; có thể tận dụng, rà soát và bổ sung thay vì làm lại từ đầu.

Lưu ý: bộ Playwright FE vừa chạy là **kiểm thử UI/E2E**, không thay thế toàn bộ yêu cầu **Unit Test và Integration Test** của bài lab. Báo cáo Markdown vừa tạo cũng chưa phải bằng chứng CI trên GitHub.

## 3. Thứ tự thực hiện đề xuất

1. **Chốt tính năng thực hiện:** Work Order hay Employee được chấp nhận thay thế.
2. **Rà soát test hiện có:** bảo đảm có đủ ba tình huống trong lab. Kiểm tra HTTP `2xx`/`400` phù hợp ở tầng API/integration; unit test kiểm tra logic và validation.
3. **Chạy test trên máy:** dùng cơ sở dữ liệu test riêng để không ảnh hưởng dữ liệu đang sử dụng.
4. **Tạo workflow CI:** cấu hình môi trường Java, build và chạy toàn bộ Unit/Integration Test khi mở hoặc cập nhật PR vào `main`.
5. **Đẩy code lên GitHub và mở PR:** kiểm tra workflow thực sự chạy thành công.
6. **Thiết lập bảo vệ nhánh:** chọn job CI làm điều kiện bắt buộc trước khi merge. Bước này cần quyền quản trị/cấu hình repository.
7. **Tạo minh chứng:** trên nhánh thử nghiệm, tạo một thay đổi khiến test thất bại, chụp trạng thái PR bị chặn; sau đó sửa lại, chạy CI xanh và chụp trạng thái đáp ứng điều kiện merge.

## 4. Khi nào bài được xem là hoàn thành?

Bạn cần có **code test, file workflow chạy thành công trên GitHub, cấu hình bảo vệ nhánh và hai ảnh minh chứng đỏ/xanh**.

Dù tiêu đề có “CI/CD”, nội dung file **chưa yêu cầu triển khai ứng dụng tự động (deploy)**, cũng không quy định tỷ lệ coverage, số lượng test tối thiểu hay bắt buộc chạy Playwright trong CI.

*Ghi chú về lượt phân tích trước: chỉ đọc và phân tích tài liệu, không chỉnh sửa file nào trong lượt đó.*
