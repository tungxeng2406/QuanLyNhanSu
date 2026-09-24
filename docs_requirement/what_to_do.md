# Quy Trình Phát Triển Phần Mềm Với AI

## Coding rules bắt buộc cho mọi phase

- Bắt buộc đọc và áp dụng [Java coding rules](java-coding-rules.md) và [JavaScript coding rules](javascript-coding-rules.md), theo [phạm vi, điều chỉnh riêng và tiêu chí nghiệm thu](../docs/coding-rules.md#mandatory-java-and-javascript-conventions).
- Áp dụng cho source, test, helper và script do dự án quản lý. Phải review Javadoc/JSDoc, comment giải thích logic không hiển nhiên và các quy tắc còn lại về naming, formatting, control flow, error handling.
- Phase 1–2: đưa REQ-CODE-001–004 vào yêu cầu chất lượng và thiết kế; ghi nhận xung đột cụ thể. Phase 3: review cách áp dụng trước khi code. Phase 4: tuân thủ khi sinh/sửa code. Phase 5: báo cáo compliance riêng với test chức năng. Phase 6: đưa các kiểm tra tự động hóa được vào CI và checklist PR.
- Không ghi PASS cho rule chưa kiểm tra; ghi rõ công cụ chưa cấu hình, vi phạm và ngoại lệ đã được review. Build/test xanh không thay thế review coding rules.

## 1. AI cần làm những gì?

Quy trình đầy đủ thường gồm:

1. Phân tích ý tưởng và đối tượng sử dụng.
2. Làm rõ yêu cầu nghiệp vụ.
3. Tách functional/non-functional requirements.
4. Thiết kế domain model và database.
5. Thiết kế API contract.
6. Chọn architecture, framework, package structure.
7. Viết tài liệu đặc tả và testcase.
8. Scaffold project.
9. Implement backend.
10. Implement frontend.
11. Seed dữ liệu mẫu.
12. Viết unit/integration/E2E test.
13. Chạy build/test/lint.
14. Sửa lỗi phát hiện được.
15. Cập nhật documentation.
16. Đóng gói và hướng dẫn deploy.
17. Commit/push GitHub nếu được yêu cầu.

AI nên làm theo từng phase, không nên generate toàn bộ code trong một lần.

## 2. Prompt tổng quát nên viết

Bạn có thể dùng prompt mẫu sau:

```text
Bạn là một Senior Software Architect, Business Analyst, Backend Engineer,
Frontend Engineer, QA Engineer và DevOps Engineer.

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
0. Bắt buộc áp dụng docs_requirement/java-coding-rules.md và docs_requirement/javascript-coding-rules.md cho code/test/script tương ứng, theo docs/coding-rules.md. Bao gồm Javadoc/JSDoc, comment cần thiết và toàn bộ quy tắc phù hợp; báo cáo kết quả kiểm tra riêng với test chức năng.
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

## 3. Cách làm hiệu quả nhất

Chia thành các prompt nhỏ:

### Phase 1: Phân tích

```text
Hãy phân tích ý tưởng ứng dụng quản lý nhân sự.
Xác định actor, use case, business rule, scope MVP,
rủi ro và các câu hỏi cần làm rõ.
Chưa viết code.
```

### Phase 2: Đặc tả

```text
Dựa trên yêu cầu đã chốt, hãy viết:
- requirement.md
- domain-model.md
- database design
- API specification
- frontend/backend design
- testcase matrix
```

### Phase 3: Review thiết kế

```text
Hãy review toàn bộ đặc tả.
Tìm các điểm mâu thuẫn, thiếu, không implement được
hoặc khó test.
Đề xuất chỉnh sửa trước khi code.
```

### Phase 4: Generate code

```text
Dựa trên các tài liệu đã chốt, hãy generate project hoàn chỉnh.
Bắt buộc đọc và áp dụng docs_requirement/java-coding-rules.md và docs_requirement/javascript-coding-rules.md theo docs/coding-rules.md, kể cả code test/helper/script. Bổ sung Javadoc/JSDoc và comment giải thích logic không hiển nhiên ngay khi viết code.
Implement theo từng phase:
1. Maven/configuration
2. Database/entity/repository
3. Service/business logic
4. REST controller/error handling
5. Frontend
6. Seed data
7. Tests

Sau mỗi phase phải build/test và sửa lỗi trước khi sang phase tiếp theo.
```

### Phase 5: Test và hoàn thiện

```text
Hãy chạy toàn bộ unit, integration và Playwright E2E test.
Kiểm tra riêng việc tuân thủ hai coding rules tại docs_requirement/java-coding-rules.md và docs_requirement/javascript-coding-rules.md theo docs/coding-rules.md; review Javadoc/JSDoc, ghi rõ bằng chứng, vi phạm và kiểm tra chưa chạy/chưa cấu hình.
Đối chiếu kết quả với testcase matrix.
Case nào pass, fail, chưa chạy phải ghi rõ.
Với case fail, phân tích root cause, sửa code, chạy lại.
Sau cùng tạo test report và cập nhật tài liệu.
```

### Phase 6: Deploy/GitHub

```text
Hãy chuẩn bị project để chạy local và deploy.
Tạo README gồm setup, run, test, build và cấu hình database.
Sau khi tôi xác nhận, commit và push toàn bộ source lên GitHub.
```

## 4. Prompt tốt cần có gì?

Một prompt chất lượng nên mô tả rõ:

```text
Mục tiêu
Người dùng
Phạm vi
Chức năng
Dữ liệu
Business rules
Tech stack
Kiến trúc
Tiêu chuẩn code
Test requirement
Cách validate
Cách báo cáo kết quả
Giới hạn quyền tự động của AI
```

Điểm quan trọng nhất là yêu cầu AI **làm theo phase, có checkpoint, có test và không tự đoán các quyết định quan trọng**. Như vậy AI sẽ hoạt động giống một team phát triển phần mềm, thay vì chỉ sinh ra một lượng code lớn nhưng khó kiểm soát.
