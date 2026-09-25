# Coding rules — Issue report

- Ngày: 2026-09-25T08:55:23 (UTC+07:00).
- Nhánh: `main_thanhtung`; HEAD: `00ca6b15113b0761dd86667010ee120105d53653`.
- Kiểm tra working tree, gồm source đã commit và tooling chưa commit; HEAD không mô tả đầy đủ snapshot local.
- Rules: [Java](../../docs_requirement/java-coding-rules.md), [JavaScript](../../docs_requirement/javascript-coding-rules.md), [project adaptations](../coding-rules.md).
- Lượt audit ban đầu không sửa source, không tạo GitHub Issue, không commit/push. Cập nhật 2026-09-25: đã đồng bộ 16 Issue lên GitHub theo yêu cầu; không commit/push trong lượt đồng bộ.

## Tổng hợp

**Chưa tuân thủ coding rules.** Đề xuất **16 Issue**: 15 nhóm vi phạm source/test/script và 1 nhóm cải tiến tooling. Mã CR-* là mã nội bộ; mỗi mã trong bảng tổng hợp liên kết tới Issue GitHub tương ứng.

| Ngôn ngữ | File quét | Cảnh báo tự động | Trạng thái |
|---|---:|---:|---|
| java | 18 | 60 | violations |
| javascript | 11 | 113 | violations |

Tổng **173 cảnh báo**, không phải 173 bug độc lập. Findings thủ công không cộng vào số này. JavaScript có 112 cảnh báo trong 8 file đã theo dõi và 1 cảnh báo trong script audit chưa commit; 3 file tooling mới đều được quét.

## Thực thi và bằng chứng

```powershell
node scripts/check-coding-rules.cjs
node node_modules/eslint/bin/eslint.js . --format json --output-file target/coding-rules/eslint-review.json
```

- Script tổng hợp exit code 1 vì có vi phạm; hai công cụ đều hoàn tất, không có lỗi hạ tầng trong kết quả cuối.
- Maven chạy checkstyle:check với -Dcheckstyle.failOnViolation=false để thu báo cáo. BUILD SUCCESS không nghĩa đạt coding rules: log ghi 60 violations.
- Node v24.19.0; Checkstyle Maven plugin 3.6.0; ESLint 9.39.5; eslint-plugin-jsdoc 50.8.0.
- Không chạy test chức năng trong lượt audit; không tuyên bố Unit/Integration/E2E đạt.
- [report.json](coding-rule-evidence_20260925_085503/report.json)
- [eslint.json](coding-rule-evidence_20260925_085503/eslint.json)
- [checkstyle.xml](coding-rule-evidence_20260925_085503/checkstyle.xml)
- [checkstyle.log](coding-rule-evidence_20260925_085503/checkstyle.log)
- [inventory-sha256.json](coding-rule-evidence_20260925_085503/inventory-sha256.json)
- [working-tree-status.txt](coding-rule-evidence_20260925_085503/working-tree-status.txt)
- [issues.json](coding-rule-evidence_20260925_085503/issues.json)
- Snapshot cấu hình và các coding rules được lưu trong audit-inputs/ của thư mục bằng chứng.

## Danh sách Issue

P1: ưu tiên xử lý ảnh hưởng lỗi runtime; P2: documentation/tooling; P3: style/bảo trì. Đây là ưu tiên đề xuất, không phải mức lỗ hổng bảo mật.

| ID | Tiêu đề | Ưu tiên | Cảnh báo tự động |
|---|---|---|---:|
| [CR-JAVA-001](https://github.com/tungxeng2406/QuanLyNhanSu/issues/2) | [Java] Bổ sung Javadoc cho type và public contract | P2 | 39 |
| [CR-JAVA-002](https://github.com/tungxeng2406/QuanLyNhanSu/issues/3) | [Java] Bổ sung braces cho control statements | P3 | 5 |
| [CR-JAVA-003](https://github.com/tungxeng2406/QuanLyNhanSu/issues/4) | [Java] Tách nhiều statement trên cùng dòng | P3 | 7 |
| [CR-JAVA-004](https://github.com/tungxeng2406/QuanLyNhanSu/issues/5) | [Java] Đổi tên test method sang camelCase | P3 | 9 |
| [CR-JAVA-005](https://github.com/tungxeng2406/QuanLyNhanSu/issues/6) | [Java] Chuẩn hóa bố cục method | P3 | 0 |
| [CR-JAVA-006](https://github.com/tungxeng2406/QuanLyNhanSu/issues/7) | [Java] Đặt hậu tố List cho biến Collection | P3 | 0 |
| [CR-JS-001](https://github.com/tungxeng2406/QuanLyNhanSu/issues/8) | [JavaScript] Bổ sung JSDoc cho helper export và hàm phức tạp | P2 | 4 |
| [CR-JS-002](https://github.com/tungxeng2406/QuanLyNhanSu/issues/9) | [JavaScript] Chuẩn hóa braces và block | P3 | 66 |
| [CR-JS-003](https://github.com/tungxeng2406/QuanLyNhanSu/issues/10) | [JavaScript] Chia dòng dài quá 100 ký tự | P3 | 42 |
| [CR-JS-004](https://github.com/tungxeng2406/QuanLyNhanSu/issues/11) | [JavaScript] Tách khai báo nhiều biến | P3 | 1 |
| [CR-JS-005](https://github.com/tungxeng2406/QuanLyNhanSu/issues/12) | [JavaScript] Chuẩn hóa tên boolean và hằng cấu hình | P3 | 0 |
| [CR-JS-006](https://github.com/tungxeng2406/QuanLyNhanSu/issues/13) | [JavaScript] Loại bỏ nested ternary | P3 | 0 |
| [CR-JS-007](https://github.com/tungxeng2406/QuanLyNhanSu/issues/14) | [JavaScript] Bắt Promise rejection ở Edit/Delete/View | P1 | 0 |
| [CR-JS-008](https://github.com/tungxeng2406/QuanLyNhanSu/issues/15) | [JavaScript] Thêm trailing comma cho literal nhiều dòng | P3 | 0 |
| [CR-JS-009](https://github.com/tungxeng2406/QuanLyNhanSu/issues/16) | [JavaScript] Dùng template literal thay nối chuỗi | P3 | 0 |
| [CR-TOOL-001](https://github.com/tungxeng2406/QuanLyNhanSu/issues/17) | [Quality gate] Hoàn thiện automation coding rules | P2 | 0 |

## CR-JAVA-001 — [Java] Bổ sung Javadoc cho type và public contract

- **Ưu tiên:** P2. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/java-coding-rules.md](../../docs_requirement/java-coding-rules.md) — Documentation Comments.
- **Hiện trạng:** 19 cảnh báo type và 20 cảnh báo method/constructor thiếu Javadoc. Interface EmployeeService cũng chưa mô tả hợp đồng để override kế thừa.
- **Đề xuất sửa:** Mô tả trách nhiệm, tham số, kết quả và exception; bổ sung contract interface trước, tránh comment lặp lại code.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/java/vn/tungxeng/hr/config/CorsConfig.java:8](../../src/main/java/vn/tungxeng/hr/config/CorsConfig.java#L8) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:24](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L24) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:31](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L31) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:35](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L35) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:53](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L53) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:58](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L58) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:63](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L63) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:68](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L68) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:74](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L74) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/dto/EmployeeListResponse.java:5](../../src/main/java/vn/tungxeng/hr/dto/EmployeeListResponse.java#L5) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/dto/EmployeeRequest.java:6](../../src/main/java/vn/tungxeng/hr/dto/EmployeeRequest.java#L6) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/dto/EmployeeResponse.java:6](../../src/main/java/vn/tungxeng/hr/dto/EmployeeResponse.java#L6) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java:6](../../src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java#L6) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java:14](../../src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java#L14) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/entity/Employee.java:6](../../src/main/java/vn/tungxeng/hr/entity/Employee.java#L6) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/entity/Employee.java:34](../../src/main/java/vn/tungxeng/hr/entity/Employee.java#L34) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/exception/BusinessException.java:3](../../src/main/java/vn/tungxeng/hr/exception/BusinessException.java#L3) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/exception/BusinessException.java:4](../../src/main/java/vn/tungxeng/hr/exception/BusinessException.java#L4) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java:18](../../src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java#L18) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/exception/NotFoundException.java:3](../../src/main/java/vn/tungxeng/hr/exception/NotFoundException.java#L3) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/exception/NotFoundException.java:4](../../src/main/java/vn/tungxeng/hr/exception/NotFoundException.java#L4) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/HrApplication.java:6](../../src/main/java/vn/tungxeng/hr/HrApplication.java#L6) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/HrApplication.java:8](../../src/main/java/vn/tungxeng/hr/HrApplication.java#L8) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java:9](../../src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java#L9) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java:10](../../src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java#L10) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java:11](../../src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java#L11) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:10](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L10) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:11](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L11) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:13](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L13) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:14](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L14) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:15](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L15) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:16](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L16) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:17](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L17) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:23](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L23) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:29](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L29) | MissingJavadocMethod: Missing a Javadoc comment. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:14](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L14) | MissingJavadocType: Missing a Javadoc comment. |
| [src/test/java/vn/tungxeng/hr/EmployeeApiIntegrationTest.java:15](../../src/test/java/vn/tungxeng/hr/EmployeeApiIntegrationTest.java#L15) | MissingJavadocType: Missing a Javadoc comment. |
| [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java:21](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java#L21) | MissingJavadocType: Missing a Javadoc comment. |
| [src/test/java/vn/tungxeng/hr/HrApplicationSmokeTest.java:11](../../src/test/java/vn/tungxeng/hr/HrApplicationSmokeTest.java#L11) | MissingJavadocType: Missing a Javadoc comment. |
| [src/main/java/vn/tungxeng/hr/service/EmployeeService.java:10](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java#L10) | Review thủ công: public interface EmployeeService { |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JAVA-002 — [Java] Bổ sung braces cho control statements

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/java-coding-rules.md](../../docs_requirement/java-coding-rules.md) — Compound Statements.
- **Hiện trạng:** Có if một dòng không dùng braces trong controller/service.
- **Đề xuất sửa:** Bổ sung braces, giữ logic và chạy test backend.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:46](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L46) | NeedBraces: 'if' construct must use '{}'s. |
| [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java:93](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java#L93) | NeedBraces: 'if' construct must use '{}'s. |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:99](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L99) | NeedBraces: 'if' construct must use '{}'s. |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:100](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L100) | NeedBraces: 'if' construct must use '{}'s. |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:127](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L127) | NeedBraces: 'if' construct must use '{}'s. |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JAVA-003 — [Java] Tách nhiều statement trên cùng dòng

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/java-coding-rules.md](../../docs_requirement/java-coding-rules.md) — Simple Statements.
- **Hiện trạng:** DatabaseIntegrationTest gộp thao tác DB và assertion trên cùng dòng.
- **Đề xuất sửa:** Tách từng statement, giữ thứ tự transaction và assertion.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:26](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L26) | OneStatementPerLine: Only one statement per line allowed. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:32](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L32) | OneStatementPerLine: Only one statement per line allowed. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:33](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L33) | OneStatementPerLine: Only one statement per line allowed. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:37](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L37) | OneStatementPerLine: Only one statement per line allowed. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:52](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L52) | OneStatementPerLine: Only one statement per line allowed. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:56](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L56) | OneStatementPerLine: Only one statement per line allowed. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:58](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L58) | OneStatementPerLine: Only one statement per line allowed. |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JAVA-004 — [Java] Đổi tên test method sang camelCase

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/java-coding-rules.md](../../docs_requirement/java-coding-rules.md) — Methods / General Rules.
- **Hiện trạng:** 9 method dùng chữ hoa đầu tên và underscore BE_SVC_/DB_, trái quy tắc đặt tên method.
- **Đề xuất sửa:** Đổi sang camelCase, giữ mã testcase trong @DisplayName hoặc Javadoc.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:31](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L31) | MethodName: Name 'DB_SEED_001_002_fiftyRowsAndIdempotency' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:35](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L35) | MethodName: Name 'DB_SEED_003_businessRowPreventsDemoSeed' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:39](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L39) | MethodName: Name 'DB_SCH_004_005_uniqueAndRequiredFields' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java:49](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java#L49) | MethodName: Name 'DB_TXN_001_002_003_004_commitRollbackDeleteAndConflict' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java:30](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java#L30) | MethodName: Name 'BE_SVC_004_createTrimsAndSavesOnce' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java:39](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java#L39) | MethodName: Name 'BE_SVC_005_duplicateDoesNotSave' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java:46](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java#L46) | MethodName: Name 'BE_SVC_008_missingGetAndDelete' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java:52](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java#L52) | MethodName: Name 'BE_SVC_009_csvEscapesUnicodeQuotesAndNulls' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java:59](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java#L59) | MethodName: Name 'BE_SVC_010_emptyCsv' must match pattern '^[a-z][a-zA-Z0-9]*$'. |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JAVA-005 — [Java] Chuẩn hóa bố cục method

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/java-coding-rules.md](../../docs_requirement/java-coding-rules.md) — Class and Interface Declarations.
- **Hiện trạng:** Getter/setter và helper đặt dấu đóng braces cùng dòng; nhiều method liền nhau không có dòng trắng.
- **Đề xuất sửa:** Đưa dấu đóng braces xuống dòng và tách method bằng dòng trắng.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/java/vn/tungxeng/hr/entity/Employee.java:44](../../src/main/java/vn/tungxeng/hr/entity/Employee.java#L44) | Review thủ công: public Long getId() { return id; } |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:132](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L132) | Review thủ công: private String date(LocalDate value) { return value == null ? null : value.format(DATE_FORMAT); } |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JAVA-006 — [Java] Đặt hậu tố List cho biến Collection

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/java-coding-rules.md](../../docs_requirement/java-coding-rules.md) — Variables.
- **Hiện trạng:** Các biến nội bộ employees, predicates, details chưa có hậu tố List như convention yêu cầu.
- **Đề xuất sửa:** Đổi biến nội bộ thành employeeList/predicateList/fieldErrorList; không đổi trường JSON công khai chỉ để sửa naming.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:83](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L83) | Review thủ công: List&lt;Employee&gt; employees = repository.findAll(buildSpecification(employeeCode, fullName, gender, dateOfBirth, phone, email), pageable).getContent(); |
| [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java:94](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java#L94) | Review thủ công: List&lt;Predicate&gt; predicates = new ArrayList&lt;&gt;(); |
| [src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java:27](../../src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java#L27) | Review thủ công: List&lt;ErrorResponse.FieldErrorDetail&gt; details = ex.getBindingResult().getFieldErrors().stream() |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-001 — [JavaScript] Bổ sung JSDoc cho helper export và hàm phức tạp

- **Ưu tiên:** P2. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — JSDoc Comments.
- **Hiện trạng:** 4 helper export thiếu JSDoc. Review thủ công xác nhận parseCsv có state machine/throw Error nhưng chỉ có comment ngắn; load/save có luồng async phức tạp chưa có JSDoc. publicOnly chưa phát hiện nhóm hàm không export.
- **Đề xuất sửa:** Bổ sung @param, @returns/Promise, @throws khi áp dụng; review cả hàm trong closure.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [e2e/employee.helpers.js:3](../../e2e/employee.helpers.js#L3) | jsdoc/require-jsdoc: Missing JSDoc comment. |
| [e2e/employee.helpers.js:16](../../e2e/employee.helpers.js#L16) | jsdoc/require-jsdoc: Missing JSDoc comment. |
| [e2e/employee.helpers.js:22](../../e2e/employee.helpers.js#L22) | jsdoc/require-jsdoc: Missing JSDoc comment. |
| [e2e/employee.helpers.js:28](../../e2e/employee.helpers.js#L28) | jsdoc/require-jsdoc: Missing JSDoc comment. |
| [src/main/resources/static/items-csv.js:9](../../src/main/resources/static/items-csv.js#L9) | Review thủ công: function parseCsv(text) { |
| [src/main/resources/static/app.js:56](../../src/main/resources/static/app.js#L56) | Review thủ công: async function load() { |
| [src/main/resources/static/app.js:162](../../src/main/resources/static/app.js#L162) | Review thủ công: async function save(event) { |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-002 — [JavaScript] Chuẩn hóa braces và block

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Braces / Compound Statements.
- **Hiện trạng:** Có if thiếu braces và block gộp cùng dòng. Một dòng có thể sinh nhiều cảnh báo.
- **Đề xuất sửa:** Thêm braces, bố cục 1TBS và chạy test liên quan.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [e2e/employee.helpers.js:23](../../e2e/employee.helpers.js#L23) | curly: Expected { after 'if' condition. |
| [scripts/phase5-report.cjs:14](../../scripts/phase5-report.cjs#L14) | curly: Expected { after 'for-of'. |
| [src/main/resources/static/app.js:33](../../src/main/resources/static/app.js#L33) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:49](../../src/main/resources/static/app.js#L49) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:62](../../src/main/resources/static/app.js#L62) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:63](../../src/main/resources/static/app.js#L63) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:68](../../src/main/resources/static/app.js#L68) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:115](../../src/main/resources/static/app.js#L115) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:115](../../src/main/resources/static/app.js#L115) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:123](../../src/main/resources/static/app.js#L123) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:123](../../src/main/resources/static/app.js#L123) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:136](../../src/main/resources/static/app.js#L136) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:136](../../src/main/resources/static/app.js#L136) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:139](../../src/main/resources/static/app.js#L139) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:139](../../src/main/resources/static/app.js#L139) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:156](../../src/main/resources/static/app.js#L156) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:164](../../src/main/resources/static/app.js#L164) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:172](../../src/main/resources/static/app.js#L172) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:186](../../src/main/resources/static/app.js#L186) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:188](../../src/main/resources/static/app.js#L188) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:188](../../src/main/resources/static/app.js#L188) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:196](../../src/main/resources/static/app.js#L196) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:196](../../src/main/resources/static/app.js#L196) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:200](../../src/main/resources/static/app.js#L200) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:200](../../src/main/resources/static/app.js#L200) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:204](../../src/main/resources/static/app.js#L204) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:204](../../src/main/resources/static/app.js#L204) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:206](../../src/main/resources/static/app.js#L206) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:206](../../src/main/resources/static/app.js#L206) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:207](../../src/main/resources/static/app.js#L207) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:207](../../src/main/resources/static/app.js#L207) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:211](../../src/main/resources/static/app.js#L211) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:211](../../src/main/resources/static/app.js#L211) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:211](../../src/main/resources/static/app.js#L211) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:212](../../src/main/resources/static/app.js#L212) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:212](../../src/main/resources/static/app.js#L212) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/app.js:212](../../src/main/resources/static/app.js#L212) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:214](../../src/main/resources/static/app.js#L214) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:214](../../src/main/resources/static/app.js#L214) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/app.js:215](../../src/main/resources/static/app.js#L215) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/app.js:215](../../src/main/resources/static/app.js#L215) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/items-csv.js:16](../../src/main/resources/static/items-csv.js#L16) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/items-csv.js:16](../../src/main/resources/static/items-csv.js#L16) | brace-style: Closing curly brace does not appear on the same line as the subsequent block. |
| [src/main/resources/static/items-csv.js:16](../../src/main/resources/static/items-csv.js#L16) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/items-csv.js:17](../../src/main/resources/static/items-csv.js#L17) | brace-style: Statement inside of curly braces should be on next line. |
| [src/main/resources/static/items-csv.js:17](../../src/main/resources/static/items-csv.js#L17) | brace-style: Closing curly brace does not appear on the same line as the subsequent block. |
| [src/main/resources/static/items-csv.js:17](../../src/main/resources/static/items-csv.js#L17) | brace-style: Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| [src/main/resources/static/items-csv.js:18](../../src/main/resources/static/items-csv.js#L18) | curly: Expected { after 'else'. |
| [src/main/resources/static/items-csv.js:22](../../src/main/resources/static/items-csv.js#L22) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:24](../../src/main/resources/static/items-csv.js#L24) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:26](../../src/main/resources/static/items-csv.js#L26) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:28](../../src/main/resources/static/items-csv.js#L28) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:32](../../src/main/resources/static/items-csv.js#L32) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:34](../../src/main/resources/static/items-csv.js#L34) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:40](../../src/main/resources/static/items-csv.js#L40) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:52](../../src/main/resources/static/items-csv.js#L52) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:54](../../src/main/resources/static/items-csv.js#L54) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:55](../../src/main/resources/static/items-csv.js#L55) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:61](../../src/main/resources/static/items-csv.js#L61) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:65](../../src/main/resources/static/items-csv.js#L65) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:66](../../src/main/resources/static/items-csv.js#L66) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:69](../../src/main/resources/static/items-csv.js#L69) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:71](../../src/main/resources/static/items-csv.js#L71) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:77](../../src/main/resources/static/items-csv.js#L77) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:82](../../src/main/resources/static/items-csv.js#L82) | curly: Expected { after 'if' condition. |
| [src/main/resources/static/items-csv.js:113](../../src/main/resources/static/items-csv.js#L113) | curly: Expected { after 'if' condition. |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-003 — [JavaScript] Chia dòng dài quá 100 ký tự

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Line Length / Wrapping Lines.
- **Hiện trạng:** 42 cảnh báo dài dòng, bao gồm 1 cảnh báo trong script audit chưa commit. Giới hạn tài liệu là 80–100; config chọn 100 và bỏ qua URL.
- **Đề xuất sửa:** Tách chuỗi/object/callback, giữ nguyên nội dung và hành vi.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [scripts/check-coding-rules.cjs:76](../../scripts/check-coding-rules.cjs#L76) | max-len: This line has a length of 136. Maximum allowed is 100. |
| [e2e/all-cases.spec.js:2](../../e2e/all-cases.spec.js#L2) | max-len: This line has a length of 102. Maximum allowed is 100. |
| [e2e/all-cases.spec.js:75](../../e2e/all-cases.spec.js#L75) | max-len: This line has a length of 123. Maximum allowed is 100. |
| [e2e/all-cases.spec.js:100](../../e2e/all-cases.spec.js#L100) | max-len: This line has a length of 102. Maximum allowed is 100. |
| [e2e/employee.spec.js:2](../../e2e/employee.spec.js#L2) | max-len: This line has a length of 102. Maximum allowed is 100. |
| [e2e/employee.spec.js:71](../../e2e/employee.spec.js#L71) | max-len: This line has a length of 112. Maximum allowed is 100. |
| [e2e/employee.spec.js:97](../../e2e/employee.spec.js#L97) | max-len: This line has a length of 102. Maximum allowed is 100. |
| [e2e/employee.spec.js:112](../../e2e/employee.spec.js#L112) | max-len: This line has a length of 101. Maximum allowed is 100. |
| [e2e/items-csv.spec.js:4](../../e2e/items-csv.spec.js#L4) | max-len: This line has a length of 147. Maximum allowed is 100. |
| [e2e/items-csv.spec.js:9](../../e2e/items-csv.spec.js#L9) | max-len: This line has a length of 103. Maximum allowed is 100. |
| [e2e/items-csv.spec.js:13](../../e2e/items-csv.spec.js#L13) | max-len: This line has a length of 161. Maximum allowed is 100. |
| [playwright.config.js:11](../../playwright.config.js#L11) | max-len: This line has a length of 107. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:1](../../scripts/phase5-report.cjs#L1) | max-len: This line has a length of 102. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:16](../../scripts/phase5-report.cjs#L16) | max-len: This line has a length of 101. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:17](../../scripts/phase5-report.cjs#L17) | max-len: This line has a length of 109. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:19](../../scripts/phase5-report.cjs#L19) | max-len: This line has a length of 156. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:20](../../scripts/phase5-report.cjs#L20) | max-len: This line has a length of 276. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:21](../../scripts/phase5-report.cjs#L21) | max-len: This line has a length of 383. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:25](../../scripts/phase5-report.cjs#L25) | max-len: This line has a length of 102. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:33](../../scripts/phase5-report.cjs#L33) | max-len: This line has a length of 112. Maximum allowed is 100. |
| [scripts/phase5-report.cjs:38](../../scripts/phase5-report.cjs#L38) | max-len: This line has a length of 2542. Maximum allowed is 100. |
| [src/main/resources/static/app.js:31](../../src/main/resources/static/app.js#L31) | max-len: This line has a length of 123. Maximum allowed is 100. |
| [src/main/resources/static/app.js:46](../../src/main/resources/static/app.js#L46) | max-len: This line has a length of 194. Maximum allowed is 100. |
| [src/main/resources/static/app.js:86](../../src/main/resources/static/app.js#L86) | max-len: This line has a length of 253. Maximum allowed is 100. |
| [src/main/resources/static/app.js:130](../../src/main/resources/static/app.js#L130) | max-len: This line has a length of 135. Maximum allowed is 100. |
| [src/main/resources/static/app.js:159](../../src/main/resources/static/app.js#L159) | max-len: This line has a length of 253. Maximum allowed is 100. |
| [src/main/resources/static/app.js:170](../../src/main/resources/static/app.js#L170) | max-len: This line has a length of 218. Maximum allowed is 100. |
| [src/main/resources/static/app.js:197](../../src/main/resources/static/app.js#L197) | max-len: This line has a length of 137. Maximum allowed is 100. |
| [src/main/resources/static/app.js:206](../../src/main/resources/static/app.js#L206) | max-len: This line has a length of 123. Maximum allowed is 100. |
| [src/main/resources/static/app.js:207](../../src/main/resources/static/app.js#L207) | max-len: This line has a length of 324. Maximum allowed is 100. |
| [src/main/resources/static/app.js:212](../../src/main/resources/static/app.js#L212) | max-len: This line has a length of 120. Maximum allowed is 100. |
| [src/main/resources/static/app.js:214](../../src/main/resources/static/app.js#L214) | max-len: This line has a length of 112. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:40](../../src/main/resources/static/items-csv.js#L40) | max-len: This line has a length of 140. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:43](../../src/main/resources/static/items-csv.js#L43) | max-len: This line has a length of 105. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:59](../../src/main/resources/static/items-csv.js#L59) | max-len: This line has a length of 118. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:61](../../src/main/resources/static/items-csv.js#L61) | max-len: This line has a length of 134. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:62](../../src/main/resources/static/items-csv.js#L62) | max-len: This line has a length of 104. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:69](../../src/main/resources/static/items-csv.js#L69) | max-len: This line has a length of 109. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:77](../../src/main/resources/static/items-csv.js#L77) | max-len: This line has a length of 157. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:82](../../src/main/resources/static/items-csv.js#L82) | max-len: This line has a length of 108. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:100](../../src/main/resources/static/items-csv.js#L100) | max-len: This line has a length of 229. Maximum allowed is 100. |
| [src/main/resources/static/items-csv.js:116](../../src/main/resources/static/items-csv.js#L116) | max-len: This line has a length of 132. Maximum allowed is 100. |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-004 — [JavaScript] Tách khai báo nhiều biến

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Number Per Line.
- **Hiện trạng:** parseCsv khai báo row, field, quoted, closed trong cùng statement.
- **Đề xuất sửa:** Mỗi biến một declaration, giữ let khi cần gán lại.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/resources/static/items-csv.js:12](../../src/main/resources/static/items-csv.js#L12) | one-var: Split 'let' declarations into multiple statements. |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-005 — [JavaScript] Chuẩn hóa tên boolean và hằng cấu hình

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Variables and Functions / Constants.
- **Hiện trạng:** quoted, closed, percent, ok thiếu tiền tố boolean. api là endpoint cố định toàn script chưa dùng UPPER_SNAKE_CASE.
- **Đề xuất sửa:** Đổi thành isQuoted/isClosed/isPercent/isSuccess và API_BASE_URL; không đổi mọi const sang uppercase.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/resources/static/items-csv.js:12](../../src/main/resources/static/items-csv.js#L12) | Review thủ công: let row = [], field = '', quoted = false, closed = false; |
| [src/main/resources/static/items-csv.js:38](../../src/main/resources/static/items-csv.js#L38) | Review thủ công: function number(value, label, line, percent = false) { |
| [src/main/resources/static/app.js:11](../../src/main/resources/static/app.js#L11) | Review thủ công: function showAlert(message, ok = false) { |
| [src/main/resources/static/app.js:2](../../src/main/resources/static/app.js#L2) | Review thủ công: const api = '/api/employees'; |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-006 — [JavaScript] Loại bỏ nested ternary

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — if, if-else, ternary Statements.
- **Hiện trạng:** updateSortLabels và phần chọn exit code của script audit dùng ternary lồng nhau.
- **Đề xuất sửa:** Tách if/else hoặc helper có tên rõ nghĩa.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/resources/static/app.js:130](../../src/main/resources/static/app.js#L130) | Review thủ công: button.textContent = `${button.dataset.sortField === field ? (direction === 'asc' ? '▲ ' : '▼ ') : ''}${button.dataset.sortField}`; |
| [scripts/check-coding-rules.cjs:101](../../scripts/check-coding-rules.cjs#L101) | Review thủ công: process.exitCode = [java, javascript].some(result =&gt; result.status === 'error') ? 2 : |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-007 — [JavaScript] Bắt Promise rejection ở Edit/Delete/View

- **Ưu tiên:** P1. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Async Programming (Promises and Async/Await).
- **Hiện trạng:** openForm/removeEmployee/showDetails await fetch/response.json không có try/catch; onclick cũng không bắt rejection. response.ok không xử lý lỗi mạng/parse JSON. Đây là static finding, chưa giả lập runtime trong lượt này.
- **Đề xuất sửa:** Bắt lỗi ở hàm hoặc caller, thông báo thân thiện và khôi phục UI. Thêm regression cho lỗi mạng/JSON. Test async đã có runner nhận rejection nên không áp catch máy móc cho test.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/resources/static/app.js:151](../../src/main/resources/static/app.js#L151) | Review thủ công: async function openForm(id = null) { |
| [src/main/resources/static/app.js:185](../../src/main/resources/static/app.js#L185) | Review thủ công: async function removeEmployee(id) { |
| [src/main/resources/static/app.js:193](../../src/main/resources/static/app.js#L193) | Review thủ công: async function showDetails(id) { |
| [src/main/resources/static/app.js:95](../../src/main/resources/static/app.js#L95) | Review thủ công: view.onclick = () =&gt; showDetails(employee.id); |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-008 — [JavaScript] Thêm trailing comma cho literal nhiều dòng

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Objects and Arrays.
- **Hiện trạng:** filters/formPayload thiếu dấu phẩy cuối property của object literal nhiều dòng; config ESLint mới cũng thiếu ở nhiều literal. Rule này chưa bật trong config.
- **Đề xuất sửa:** Bổ sung trailing comma cho object/array nhiều dòng; không áp dụng cho JSON.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/resources/static/app.js:26](../../src/main/resources/static/app.js#L26) | Review thủ công: email: $('searchEmail').value.trim() |
| [src/main/resources/static/app.js:147](../../src/main/resources/static/app.js#L147) | Review thủ công: email: value('email') |
| [eslint.config.cjs:28](../../eslint.config.cjs#L28) | Review thủ công: 'max-len': ['error', { code: 100, ignoreUrls: true }], |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-JS-009 — [JavaScript] Dùng template literal thay nối chuỗi

- **Ưu tiên:** P3. **Trạng thái:** Vi phạm đã xác nhận; chưa sửa.
- **Rule:** [docs_requirement/javascript-coding-rules.md](../../docs_requirement/javascript-coding-rules.md) — Miscellaneous Practices.
- **Hiện trạng:** Escape CSV dùng toán tử + để ghép dấu nháy.
- **Đề xuất sửa:** Dùng template literal, giữ quote escaping và phòng CSV formula injection.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [src/main/resources/static/items-csv.js:113](../../src/main/resources/static/items-csv.js#L113) | Review thủ công: if (/^[\s]*[=+@-]/.test(text)) text = "'" + text; |
| [src/main/resources/static/items-csv.js:114](../../src/main/resources/static/items-csv.js#L114) | Review thủ công: return '"' + text.replace(/"/g, '""') + '"'; |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## CR-TOOL-001 — [Quality gate] Hoàn thiện automation coding rules

- **Ưu tiên:** P2. **Trạng thái:** Cải tiến tooling; chưa sửa.
- **Rule:** [docs/coding-rules.md](../../docs/coding-rules.md) — REQ-CODE-003 / REQ-CODE-004.
- **Hiện trạng:** Tooling là thay đổi local từ tác vụ trước bị ngắt. Chưa có workflow tự chạy sau push; config/report dẫn tới docs/coding-rules-automation.md chưa tồn tại. ESLint 9.39.5 báo deprecated khi cài; Node báo DEP0190 khi gọi Maven qua shell. Tham số hiện cố định, chưa có bằng chứng injection. Đây là cải tiến tooling, không cộng vào vi phạm source.
- **Đề xuất sửa:** Viết mapping rule-to-check, đánh giá phiên bản hỗ trợ, kiểm thử báo cáo/lỗi công cụ/chống Issue trùng trước khi bật CI. Không tuyên bố full compliance từ tập rule hiện có.

**Bằng chứng:**

| Vị trí | Rule / nội dung |
|---|---|
| [config/checkstyle/checkstyle.xml:5](../../config/checkstyle/checkstyle.xml#L5) | Review thủ công: &lt;!-- Rule-to-document mapping and manual-review gaps: docs/coding-rules-automation.md. --&gt; |
| [scripts/coding-report.cjs:90](../../scripts/coding-report.cjs#L90) | Review thủ công: 'Mapping: docs/coding-rules-automation.md. Functional tests run separately.', '' |
| [scripts/check-coding-rules.cjs:29](../../scripts/check-coding-rules.cjs#L29) | Review thủ công: ], { encoding: 'utf8', shell: process.platform === 'win32', timeout: 600000 }); |
| [package.json:11](../../package.json#L11) | Review thủ công: "eslint": "9.39.5", |

**Tiêu chí hoàn thành:**

- [ ] Sửa toàn bộ vị trí trong phạm vi Issue.
- [ ] Đối chiếu quy tắc gốc và ngoại lệ dự án, review nội dung documentation.
- [ ] Chạy lại kiểm tra phù hợp; không tắt rule để che lỗi.
- [ ] Chạy test liên quan khi sửa code và liên kết PR/bằng chứng.
- [ ] Cập nhật trạng thái báo cáo/Issue.

## Giới hạn và điểm cần làm rõ

- Không khẳng định đã tự động kiểm tra mọi quy tắc ngữ nghĩa trong hai tài liệu. Không có cảnh báo không đồng nghĩa PASS toàn convention.
- Checkstyle tập trung type/public method: fields, private/protected contract, record components, ý nghĩa tags và inherited documentation cần review thêm. Không yêu cầu comment diễn giải mọi dòng code.
- ESLint publicOnly chưa đủ cho hàm phức tạp không export; CR-JS-001 bổ sung ví dụ đã xác nhận thủ công, không phải kiểm kê đầy đủ nhóm này.
- Line length Java nêu 80 hoặc 120: cần chốt mức áp dụng, chưa tự báo lỗi chỉ vì vượt 80. JS dùng 100 theo giới hạn trên tài liệu.
- Package vn.tungxeng.hr và CommonJS cho Node/Playwright là điều chỉnh hợp lệ. Không đổi API contract để sửa naming. Không coi console.log trong CLI là production browser logging.
- Đã kiểm tra toàn bộ Issue mở và đóng trên GitHub trước khi đồng bộ ngày 2026-09-25: không có Issue có sẵn ở lần kiểm tra đầu. Giữ 16 nhóm và mức ưu tiên trong báo cáo; chưa gán assignee. Link GitHub nằm ở cột ID trong bảng tổng hợp.
- Automation sau push từ tác vụ trước chưa hoàn tất; báo cáo này chỉ phản ánh audit local.

## Inventory

| Ngôn ngữ | File |
|---|---|
| java | [src/main/java/vn/tungxeng/hr/config/CorsConfig.java](../../src/main/java/vn/tungxeng/hr/config/CorsConfig.java) |
| java | [src/main/java/vn/tungxeng/hr/controller/EmployeeController.java](../../src/main/java/vn/tungxeng/hr/controller/EmployeeController.java) |
| java | [src/main/java/vn/tungxeng/hr/dto/EmployeeListResponse.java](../../src/main/java/vn/tungxeng/hr/dto/EmployeeListResponse.java) |
| java | [src/main/java/vn/tungxeng/hr/dto/EmployeeRequest.java](../../src/main/java/vn/tungxeng/hr/dto/EmployeeRequest.java) |
| java | [src/main/java/vn/tungxeng/hr/dto/EmployeeResponse.java](../../src/main/java/vn/tungxeng/hr/dto/EmployeeResponse.java) |
| java | [src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java](../../src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java) |
| java | [src/main/java/vn/tungxeng/hr/entity/Employee.java](../../src/main/java/vn/tungxeng/hr/entity/Employee.java) |
| java | [src/main/java/vn/tungxeng/hr/exception/BusinessException.java](../../src/main/java/vn/tungxeng/hr/exception/BusinessException.java) |
| java | [src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java](../../src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java) |
| java | [src/main/java/vn/tungxeng/hr/exception/NotFoundException.java](../../src/main/java/vn/tungxeng/hr/exception/NotFoundException.java) |
| java | [src/main/java/vn/tungxeng/hr/HrApplication.java](../../src/main/java/vn/tungxeng/hr/HrApplication.java) |
| java | [src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java](../../src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java) |
| java | [src/main/java/vn/tungxeng/hr/service/EmployeeService.java](../../src/main/java/vn/tungxeng/hr/service/EmployeeService.java) |
| java | [src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java](../../src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java) |
| java | [src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java](../../src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java) |
| java | [src/test/java/vn/tungxeng/hr/EmployeeApiIntegrationTest.java](../../src/test/java/vn/tungxeng/hr/EmployeeApiIntegrationTest.java) |
| java | [src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java](../../src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java) |
| java | [src/test/java/vn/tungxeng/hr/HrApplicationSmokeTest.java](../../src/test/java/vn/tungxeng/hr/HrApplicationSmokeTest.java) |
| javascript | [eslint.config.cjs](../../eslint.config.cjs) |
| javascript | [scripts/check-coding-rules.cjs](../../scripts/check-coding-rules.cjs) |
| javascript | [scripts/coding-report.cjs](../../scripts/coding-report.cjs) |
| javascript | [e2e/all-cases.spec.js](../../e2e/all-cases.spec.js) |
| javascript | [e2e/employee.helpers.js](../../e2e/employee.helpers.js) |
| javascript | [e2e/employee.spec.js](../../e2e/employee.spec.js) |
| javascript | [e2e/items-csv.spec.js](../../e2e/items-csv.spec.js) |
| javascript | [playwright.config.js](../../playwright.config.js) |
| javascript | [scripts/phase5-report.cjs](../../scripts/phase5-report.cjs) |
| javascript | [src/main/resources/static/app.js](../../src/main/resources/static/app.js) |
| javascript | [src/main/resources/static/items-csv.js](../../src/main/resources/static/items-csv.js) |
