1)
Role: Bạn lá master về lập trình

Tôi muốn tạo project quản lý nhân sự đơn giản, gồm các thành phần:
backend: spring boot + thymeleaf
db: h2

UI có chức năng search, thêm xóa sửa, export.

Dựa vào những mô tả ở trên, hãy tạo file "requirement.md" và liệt kê đầy đủ tất cả những chức năng cần có của project vào file này


---------------------------------------------------------------------------------------
2) Dựa trên file "requirement.md" được tạo, hãy tạo 3 files:
- design_FE.md
- design_BE.md
- design_DB.md

Với mỗi file, hãy mô tả thật chi tiết:
- Công nghệ sử dụng là gì
- Những chắc năng hoạt động của chúng



---------------------------------------------------------------------------------------
3) Dựa trên 3 file design đã được tạo, hãy tạo tiếp 3 file testcases giúp tôi:
- testcase_FE.md
- testcase_BE.md
- testcase_DB.md

Yêu cầu:
- Test case phải cover được 100% độ bao phủ code
- Test tất cả các trường hợp, kể cả các special case, exception
- Test case phải có dạng table, pass/fail có icon


---------------------------------------------------------------------------------------
4) Tôi muốn dùng Spring Boot để tạo ra API, chứ không muốn dùng Spring MVC.
Dùng HTML/CSS/JS để request và nhận data từ Spring Boot (qua fetch/AJAX, JSON).

Hãy update tất cả mọi document (requirement.md, design_FE.md, design_BE.md, docs/api-spec.md,
docs/api_payload.md, docs/coding-rules.md, testcase_FE.md, testcase_BE.md, CONTRIBUTING.md)
để phản ánh đúng kiến trúc: Backend là Spring Boot REST API thuần (không Thymeleaf, không
Spring MVC render view), Frontend là HTML/CSS/JS tĩnh gọi API qua fetch/AJAX.