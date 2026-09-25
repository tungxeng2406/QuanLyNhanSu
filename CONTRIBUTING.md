# Contributing Guide

## Ignore files và dữ liệu chia sẻ

- Đọc [quy định ignore và hướng dẫn kiểm tra](repository-ignore-policy.md) trước khi stage file, tạo Issue/PR hoặc gửi context AI.
- `.gitignore` hiện bỏ qua `.env`, `bin/`, `node_modules/` và các output đã liệt kê; file đã tracked không tự được bỏ theo dõi.
- `.copilotignore` ở repository root chứa `.env*`, `secrets/`, `*.pem`, `vendor/proprietary/`. Những mẫu mở rộng này chưa có trong `.gitignore` và chưa chứng minh chính sách Copilot đã được bật.
- Kiểm tra tên file staged và bằng chứng trước khi chia sẻ; dùng dữ liệu giả, không đưa secret vào prompt, log, ảnh hoặc nội dung Issue/PR.
- Khi sửa ignore, mô tả mẫu thêm/bớt và kết quả `git check-ignore -v --no-index` trong PR. Xác minh Content exclusion riêng theo client và quyền GitHub thực tế.

## 1. Branch and PR flow
- Tao branch theo mau: feature/<scope>, fix/<scope>, chore/<scope>.
- Moi PR phai link requirement IDs va testcase IDs.
- PR phai mo ta pham vi thay doi va tac dong.

## 2. Required checks before merge
- Mandatory: apply [Java coding rules](docs_requirement/java-coding-rules.md) and [JavaScript coding rules](docs_requirement/javascript-coding-rules.md) according to [project applicability and acceptance gates](docs/coding-rules.md#mandatory-java-and-javascript-conventions).
- Review production code, tests and scripts for naming, formatting, error handling, Javadoc/JSDoc and meaningful comments. Update documentation with behavior changes.
- Include REQ-CODE-001 through REQ-CODE-004 in applicable PR traceability. Provide static-check results, reviewed files, outstanding violations and documented exceptions. Do not treat passing tests as coding-rule approval.
- Static-analysis gate must include enforceable language/documentation rules; semantic accuracy requires reviewer verification. If tooling is missing, record the gap and manual review evidence rather than claiming automated compliance.
- Build pass.
- Unit/integration tests pass.
- REST API tests pass (neu co thay doi BE endpoint) va FE tests pass (neu co thay doi FE flow).
- Coverage dat nguong toi thieu:
	- BE core package: line >= 90%, branch >= 85%.
	- Service + Controller: line >= 95%.
- Khong con bug Critical/High trong scope release.

## 3. CI quality gate
- Gate 1: Compile gate.
- Gate 2: Test gate.
- Gate 3: Coverage gate.
- Gate 4: Static analysis gate.
- Gate 5: Artifact gate (neu co release bundle).

## 4. Spec-first workflow
1. Write spec.
2. Human review spec.
3. Implement code against spec.
4. Tests assert spec.
5. Reconcile disagreements.

## 5. Ownership and decision matrix
| Tinh huong | Owner quyet dinh cuoi |
|---|---|
| Mau thuan nghiep vu | PM/BA |
| Mau thuan ky thuat | Tech Lead |
| Mau thuan test expectation | QA Lead |
| Muc do uu tien bug trong sprint | PM + Tech Lead |

## 6. Reconcile disagreements policy
- Neu code/test lech nhau:
	- Kiem tra spec truoc.
	- Neu spec dung: sua code/test.
	- Neu spec sai/thieu: cap nhat spec truoc, sau do sua code/test.
- Moi thay doi phai ghi log trong PR description.

## 7. Traceability required in PR
- Moi PR phai khai bao:
	- Requirement IDs (REQ-xxx)
	- Testcase IDs (FE-xxx/BE-xxx/DB-xxx)
	- Test classes/methods da cover

