# LAB 2.1 — Context Engineering: Thiết lập Bộ Quy tắc Nền tảng (Rules Pack)

**Thuộc Section 3 — Ngày 2: Context (Design AI context)**

## 1. Mục tiêu bài Lab

* Hiểu rõ cách hạn chế ảo giác của AI thông qua việc xây dựng các bộ quy tắc (Rules Pack) gọn gàng, có cấu trúc rõ ràng.

* Thiết lập 3 tệp cốt lõi trong thư mục `docs/`: `coding-rules.md`, `api-rules.md`, và `security-rules.md`.

* Thử nghiệm sinh mã kiểm chứng (draft code) thông qua Copilot Chat và thực hiện chấm điểm tuân thủ quy tắc (Scorecard).

## 2. Các bước thực hiện chi tiết

### Bước 1: Tạo cấu trúc thư mục tài liệu

Mở terminal hoặc IDE, tạo các file quy tắc nằm trong thư mục `docs/`:

* `docs/coding-rules.md`

* `docs/api-rules.md`

* `docs/security-rules.md`

### Bước 2: Soạn thảo nội dung quy tắc (Ví dụ cho Track Java/Spring)

* Mở `docs/coding-rules.md` và viết ít nhất 8-12 quy tắc về định dạng, xử lý ngoại lệ, logging (không lộ PII), kèm theo ví dụ Đúng/Sai.

* Mở `docs/api-rules.md` định nghĩa chuẩn REST resource, chuẩn trả lỗi Problem Details (phong cách RFC 7807), không tự ý sinh thêm trường dữ liệu ngoài đặc tả.

* Mở `docs/security-rules.md` quy định không hardcode secret, luôn xác thực dữ liệu đầu vào.

### Bước 3: Sử dụng Copilot để tạo bản nháp (Draft Generation)

* Tạo một file scratch tên là `ScratchHandler.java` (hoặc `.py` tương ứng).

* Sử dụng Copilot Chat với câu lệnh (prompt) có ngữ cảnh ràng buộc:

**Vd 1:**

> "Role: Senior Engineer. Task: Write a POST /api/workorders handler in Java. Context files: docs/coding-rules.md, docs/api-rules.md. Constraints: Do not invent extra JSON fields not specified in requirements, use standard validation, return 400 on error. Match repo style."

**Vd 2:**

> Role: Senior Engineer. Task: Complete method sum(String, String). Context files: docs/coding-rules.md. Constraints: use Java standard coding rules of Oracle and Google.

### Bước 4: Chấm điểm (Scorecard Check)

Kẻ bảng đánh giá (ít nhất 10 tiêu chí) để kiểm tra xem đoạn mã Copilot sinh ra có vi phạm rule nào không (Ví dụ: Có thêm trường thừa không? Có bắt ngoại lệ chuẩn không?).

## 3. Tiêu chí hoàn thành (Done Criteria)

* Hoàn thành 3 file quy tắc (`coding-rules.md`, `api-rules.md`, `security-rules.md`).

* Có bảng Scorecard đánh giá mã nguồn nháp của Copilot với điểm số hoặc trạng thái Pass/Fail rõ ràng cho từng tiêu chí.

## Phụ lục

`docs/coding-rules.md`:

````
# Java Coding & Logging Rules (WorkOrder Module)
1. **Language & Framework:** Use Java 17+ and Spring Boot 3.3+.
2. **Naming Conventions:** Use `PascalCase` for classes, `camelCase` for methods and variables, `UPPER_SNAKE_CASE` for constants.
3. **Exception Handling:** Never throw generic `RuntimeException` or `Exception`. Use specific custom exceptions or standard ones like `IllegalArgumentException`.
4. **Logging Standards:** 
   - DO NOT log sensitive data or PII (Personally Identifiable Information like raw passwords, emails, phone numbers).
   - Use SLF4J logger instantiated as `private static final Logger log = LoggerFactory.getLogger(ClassName.class);`.
5. **Dependency Injection:** Always use constructor injection. Avoid field injection (`@Autowired` on fields).
6. **Code Simplicity:** Avoid over-engineering, design patterns factories unless requested. Write clean, flat vertical slices.
7. **Variable Declaration Scope:** 
   - **DO NOT** declare variables inside loops (`for`, `while`, `do-while`). All loop-related or temporary variables must be declared outside the loop block to avoid unnecessary memory reallocation overhead, improve readability, and maintain clean scope management.
#### Example:
- **[GOOD]:**
  ```java
  // Variable declared outside the loop
  String item = "";
  for (int i = 0; i < list.size(); i++) {
      item = list.get(i);
      process(item);
  }

````

#### Example:

* **\[GOOD (Dependency Injection)\]:**

  ```
  public class WorkOrderService {
      private final WorkOrderRepository repository;
      public WorkOrderService(WorkOrderRepository repository) {
          this.repository = repository;
      }
  }
  
  ```

````

Mẫu : `docs/api-rules.md`
```markdown
# API Design Rules
1. **REST Resource Naming:** Use plural nouns for resources (e.g., `/api/workorders`, not `/api/workOrder`).
2. **HTTP Verbs:** Use standard verbs: `POST` for creation, `GET` for retrieval, `PUT`/`PATCH` for updates, `DELETE` for removal.
3. **Strict Schema Conformance:** DO NOT invent extra JSON fields or properties that are not explicitly defined in the requirements or API spec.
4. **Error Responses (RFC 7807):** All error responses must return Problem Details with fields: `type`, `title`, `status`, and `detail`.
5. **Validation:** All incoming request bodies must be annotated with `@Valid` and appropriate constraints (`@NotNull`, `@NotBlank`).
#### Example:
- **[GOOD]:** Returning `ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problemDetails)`
- **[BAD]:** Returning raw strings or generic stack traces on validation failure.

````

Mẫu: `docs/security-rules.md`

```
# Security Rules
1. **No Hardcoded Secrets:** Never hardcode API keys, passwords, connection strings, or tokens in source code or comments. Use environment variables.
2. **Input Sanitization & Validation:** Always validate and sanitize inputs at the controller boundary. Never trust client payloads.
3. **SQL / Injection Protection:** Use Spring Data JPA / Hibernate parameterized queries or ORM methods. Never concatenate strings to build native SQL or JPQL queries.
4. **Authorization Checks:** Ensure proper role-based access control (RBAC) is declared on endpoints (e.g., `@PreAuthorize("hasRole('TECHNICIAN')")`).

```

### Install GitHub Copilot into Eclipse

### Prompts

**1**

> Up version by don't use reverse(), use array of char (char\[\]) to keep the result.
>
> At the end, convert result from char\[\] to String to return.

**2**

> Up version by perform validate in loop while to avoid a seperate loop to check valid number only which the performance is not good.