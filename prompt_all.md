1)
Tôi muốn hỏi câu hỏi liên quan tới quy trình phát triển phần mềm (dựa trên AI):

Bạn là master về lập trình
Từ 1 ý tưởng ban đầu, tôi cần viết prompt gì, để AI có thể hiểu và làm full luồng giúp tôi.

Ví dụ: tôi muốn tạo ứng dụng quản lý nhân sự.
Dựa trên câu hỏi đó, AI sẽ làm những gì , từ lúc chưa có j, đến lúc tạo sản phẩm hoàn chỉnh


------------------------------------------------------------------------


```
Bạn là một Senior Software Engineering

Tôi muốn xây dựng ứng dụng: QUẢN LÝ NHÂN SỰ.

Mục tiêu:
- Quản lý danh sách nhân sự.
- Tìm kiếm và lọc nhân sự.
- Thêm, sửa, xóa nhân sự.
- Xem chi tiết.
- Export dữ liệu.
- Có dữ liệu mẫu để demo.
- Có test và tài liệu đầy đủ.

Người dùng:
- Admin/HR nội bộ.

Stack mong muốn:
- Backend: Java 17, Spring Boot 3.x, Maven.
- Architecture: REST API, Controller/Service/Repository/DTO.
- Database: H2.
- Local: H2 file mode.
- Test: H2 in-memory.
- Seed data: data.sql tạo 50 record khi database rỗng.
- Frontend: HTML/CSS/JavaScript thuần.
- Static frontend: src/main/resources/static.
- Không dùng Thymeleaf.
- Package gốc: vn.tungxeng.hr.

Các field hiển thị trên UI:
- employeeCode: bắt buộc, unique.
- fullName: bắt buộc.
- gender.
- dateOfBirth.
- phone.
- email.

Chức năng:
- Danh sách có pagination.
- Có 6 điều kiện search riêng theo 6 field.
- Khi input/change thay đổi thì tự động gọi API.
- Không cần nút Search.
- Có Clear filters.
- Có modal Add/Edit Employee.
- Có validation client-side và server-side.
- Có CSV export.
- Có API error response chuẩn hóa.
- FE phải chống XSS bằng textContent.
- Có responsive layout.

Yêu cầu làm việc:
1. Trước tiên hãy phân tích yêu cầu và nêu các điểm còn thiếu.
2. Đề xuất architecture và cấu trúc thư mục.
3. Viết requirement specification.
4. Viết domain model và database design.
5. Viết API specification.
6. Viết FE/BE design.
7. Viết testcase matrix.
8. Chỉ sau khi tôi xác nhận thiết kế thì mới generate code.
9. Khi generate code, tạo project chạy được.
10. Sau mỗi phần code, phải chạy validation phù hợp.
11. Không được bỏ qua test.
12. Nếu phát hiện lỗi, tự sửa và chạy lại test.
13. Không sửa hoặc xóa thay đổi hiện có nếu chưa được tôi cho phép.
14. Cuối cùng cung cấp:
   - danh sách file đã tạo/sửa;
   - lệnh chạy;
   - kết quả test;
   - các vấn đề còn tồn tại;
   - hướng dẫn deploy.

Hãy bắt đầu bằng Phase 1: phân tích yêu cầu và danh sách câu hỏi cần tôi xác nhận.
Không generate code trong phase này.
```


------------------------------------------------------------------------
2) 