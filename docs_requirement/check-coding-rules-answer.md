# Nội dung trả lời đề xuất — Kiểm tra coding rules

Trả lời mục **7 — Thông tin cần chốt trước khi ghi lên GitHub** trong [check-coding-rules.md](check-coding-rules.md).

## Nội dung trả lời

1. **Repository:** `tungxeng2406/QuanLyNhanSu`.
2. **Nhánh nhận báo cáo:** `main_thanhtung`. Không push trực tiếp vào `main`.
3. **Phạm vi commit:** Chỉ commit báo cáo kiểm tra coding rules trong `docs/code-review/`. Không đưa các thay đổi khác đang có trong workspace vào commit này.
4. **Phạm vi công việc:** Chỉ kiểm tra Java/JavaScript theo hai bộ coding rules và các điều chỉnh trong `docs/coding-rules.md`; chưa sửa source, chưa thêm cấu hình công cụ hoặc CI.
5. **GitHub Issues:** Tạo Issue cho các vi phạm đã xác nhận, có dẫn chiếu rule, file/dòng và bằng chứng. Nhóm lỗi cùng nguyên nhân và kiểm tra Issue trùng trước khi tạo. Các điểm chưa rõ ghi riêng trong báo cáo.
6. **Thực hiện:** Cho phép tạo Issues, commit và push báo cáo lên `main_thanhtung`. Chưa merge vào `main`. Việc sửa lỗi sẽ thực hiện ở đợt riêng.

## Lý do chọn phạm vi này

Phạm vi này giúp có **báo cáo và danh sách lỗi rõ ràng trước khi sửa**, đồng thời tránh đưa các thay đổi không liên quan vào commit.

## Trạng thái tài liệu

Đây là nội dung trả lời đề xuất được lưu theo yêu cầu. Việc tạo file này không thực hiện audit, tạo Issue, commit, push hoặc merge; các thao tác đó cần được người dùng yêu cầu thực hiện riêng.
