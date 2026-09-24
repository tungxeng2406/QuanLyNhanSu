1) Chỉ có ý tưởng, nhưng chưa biết bắt đầu từ đâu?
Prompt:
Tôi muốn hỏi câu hỏi liên quan tới quy trình phát triển phần mềm (dựa trên AI):
Bạn là master về lập trình
Từ 1 ý tưởng ban đầu, tôi cần viết prompt gì, để AI có thể hiểu và làm full luồng giúp tôi.
Ví dụ: tôi muốn tạo ứng dụng quản lý nhân sự.
Dựa trên câu hỏi đó, AI sẽ làm những gì , từ lúc chưa có j, đến lúc tạo sản phẩm hoàn chỉnh

Result:
-> what-to-do.md



---------------------------------------------------------------------------------
2) ### Phase 1: Phân tích
Prompt:
```text
Hãy phân tích ý tưởng ứng dụng quản lý nhân sự.
Xác định actor, use case, business rule, scope MVP,
rủi ro và các câu hỏi cần làm rõ.
Chưa viết code.
```

Result:
-> phase_1_phan_tich_yeu_cau.md



---------------------------------------------------------------------------------
3) ### Phase 1: Phân tích (continue)
Prompt:
hãy tạo file phase_1_phan_tich_yeu_cau_answer.md giúp tôi
sau đó trả lời giúp tôi 39 câu hỏi đó, tôi sẽ review lại

Result:
-> phase_1_phan_tich_yeu_cau_answer.md



---------------------------------------------------------------------------------
4) ### Phase 2: Đặc tả
Prompt:
```text
Dựa trên yêu cầu đã chốt, hãy viết:
- requirement.md
- domain-model.md
- database design
- API specification
- frontend/backend design
- testcase matrix
```

Result:
requirement.md
domain-model.md
design_DB.md
api-spec.md
design_FE.md
design_BE.md
testcase_BE_v2.md
testcase_DB_v2.md
testcase_FE_v2.md



---------------------------------------------------------------------------------
5) ### Phase 3: Review thiết kế

```text
Hãy review toàn bộ đặc tả.
Tìm các điểm mâu thuẫn, thiếu, không implement được
hoặc khó test.
Đề xuất chỉnh sửa trước khi code.
```

hãy tạo file phase_3_review_thiet_ke.md, và note tất cả review vào



---------------------------------------------------------------------------------
6) ### Phase 3: Review thiết kế (continue)

hãy chọn phương án tốt nhất , phù hợp nhất giúp tôi, và add vào file phase_3_review_thiet_ke_update.md



---------------------------------------------------------------------------------
7) api-spec.md
file này đã mô tả rõ ràng đặc tả api chưa, mô tả cụ thể các field request và response?
hãy update file đầy đủ và chi tiết nhất giúp tôi



---------------------------------------------------------------------------------
8) domain-model.md
file này có nhiều field của Employee ko còn được sử dụng, hãy update đầy đủ chi tiết nhất giúp tôi



---------------------------------------------------------------------------------
9) coding-rules.md
file này có còn cần thiết ko, nếu ko cần thì xóa đi, còn cần thì hãy update detail nội dung giúp tôi


---------------------------------------------------------------------------------
10) testcase_FE.md, testcase_BE.md, testcase_DB.md
3 file này quá sơ sài, ko thể dựa vào đây để test chi tiết.
File có cấu trúc là table, với mô tả chi tiết mỗi case:
- Làm chức năng gì?
- Validate data như thế nào?
- Input data là gì?
- Output data là gì?
...

Hãy update full nội  dung 3 file này,



---------------------------------------------------------------------------------
11) Folder docs, unit
Dựa vào tất cả thông tin được mô tả, có đủ thông tin generate code chưa.
Còn logic nào ko rõ, hoặc cần confirm ko?


---------------------------------------------------------------------------------
12) Folder docs, unit

Hãy update những logic này giúp tôi:
1. Xóa hoàn toàn các field cũ khỏi database/entity: Có.
2. EmployeeResponse gồm 6 field + id nội bộ: Có.
3. Thêm sort control, debounce 300ms, URL search state và disable Save: Có.


---------------------------------------------------------------------------------
13) Implementation decision

Đã triển khai các quyết định cuối cùng:

- Xóa các field Employee cũ khỏi Entity, DTO, schema, seed data và CSV: `address`, `department`, `position`, `hireDate`, `baseSalary`, `note`, `status`, timestamps.
- Public `EmployeeResponse` gồm `id` và 6 field: `employeeCode`, `fullName`, `gender`, `dateOfBirth`, `phone`, `email`.
- `employeeCode` và `fullName` là bắt buộc; các field còn lại là tùy chọn theo validation đã chốt.
- Thêm sort control trên header bảng.
- Text search debounce 300ms; gender/date search theo event `change`.
- Lưu 6 filter, page, size và sort trên URL; hỗ trợ reload và browser back/forward.
- Disable nút Save trong lúc POST/PUT để chống double-submit.
- CSV chỉ export 6 field public.
- Playwright E2E dùng dữ liệu random và cleanup sau mỗi test.

Các lệnh validation sau implementation:

```powershell
mvn test '-Dspring.profiles.active=test'
npm run e2e
```



---------------------------------------------------------------------------------
14) hãy tạo file run_project.md để giúp tôi cách run project



---------------------------------------------------------------------------------
15) ### Phase 5: Test và hoàn thiện

```text
Hãy chạy toàn bộ unit, integration và Playwright E2E test.
Đối chiếu kết quả với testcase matrix.
Case nào pass, fail, chưa chạy phải ghi rõ.
Với case fail, phân tích root cause, sửa code, chạy lại.
Sau cùng tạo test report và cập nhật tài liệu.
```

---------------------------------------------------------------------------------
16) Thêm button "Import file"
Button này có chức năng import CSV, gồm các thông tin:
+ No
+ Tên mặt hàng
+ Số lượng
+ Đơn giá
+ VAT (Mặt hàng)

Khi user chọn file xong, thì show modal với các cột đó, thêm 2 cột:
+ Tổng = số lượng * đơn giá
+ VAT = Tổng * %VAT(Mặt hàng)

Modal cũng có button Export CSV.



---------------------------------------------------------------------------------
16)
Thay đổi 4 cột:
VAT (Mặt hàng) -> Thuế VAT
Trước VAT -> Số lượng * Đơn giá
Thuế VAT = Trước VAT * Thuế VAT
Sau VAT = Trước VAT + Thuế VAT



---------------------------------------------------------------------------------
17)
giữ nguyên format file readme.md, ko đổi sang csv,
chỉ mô tả thêm chức năng "Import File" với thông tin đầy đủ cho người dùng dễ hiểu, và có thể thao tác



---------------------------------------------------------------------------------
18)
Hãy update file README.md, với nội dung sau:
1) HR Management:
Mô tả tổng quan về dự án, chức năng của dự án, cách run, cách test project.

2) Chức năng mở rộng (Import file):
Mô tả thêm về chức năng ở đây



---------------------------------------------------------------------------------
19)
Hãy giúp tôi run test case "tests/unit/testcase_FE.md",
Tạo kết quả vào file "tests/unit_result/testcasse_FE_YYYYMMDD_hhmmss.md"



---------------------------------------------------------------------------------
20) lab_4_1_test_harness.md
hãy giúp tôi phân tích file này,
file này yêu cầu gì, và tôi sẽ cần làm gì.
chỉ trả lời, ko edit gì



---------------------------------------------------------------------------------
21) lab_4_1_test_harness_analyze.md
hãy tạo file lab_4_1_test_harness_analyze.md, và add tất cả nội dung vào