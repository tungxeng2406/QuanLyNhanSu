# LAB 2.2 — Tối ưu hóa Context & Phân tích Yêu cầu Kinh doanh (BR Analysis)

**Thuộc Section 4 — Ngày 2: Optimize what the AI can understand**

## 1. Mục tiêu bài Lab

* Cấu hình Custom Instructions cho Copilot ở mức độ Global và Workspace.

* Sử dụng Copilot như một trợ lý phân tích nghiệp vụ (Business Analysis Assistant) thay vì chỉ để viết code thuần túy.

* Thực hiện kỹ thuật AI Code Review để phát hiện các lỗi tiềm ẩn (như lộ thông tin, thiếu xác thực, SQL Injection tiềm ẩn).

## 2. Các bước thực hiện chi tiết

### Bước 1: Cấu hình Custom Instructions

Cài đặt cấu hình instructions cho IDE hoặc tạo tệp cấu hình workspace phù hợp để Copilot luôn nhận diện được vai trò và quy tắc cốt lõi ("never commit secrets", "follow docs/*").

### Bước 2: Phân tích yêu cầu thô (BR Analysis)

Đưa một đoạn mô tả yêu cầu nghiệp vụ thô (ví dụ: "Tạo tính năng quản lý thiết bị công trường POSCO MCI cho phép thợ kỹ thuật đăng ký phiếu công việc gồm mã thiết bị, mô tả và mức độ ưu tiên").

Dùng Copilot để trích xuất danh sách thực thể, câu hỏi còn bỏ ngỏ, và bảng phân rã UI/Data/API vào file `docs/br-analysis-wo.md`.

### Bước 3: Thực hiện AI-Assisted Code Review

Xem xét một đoạn mã "bị cài bẫy lỗi" (ví dụ mã do AI sinh ra có chèn SQL string concatenation hoặc thiếu kiểm tra quyền).

Viết tối thiểu 8 nhận xét (review comments) theo thứ tự ưu tiên: Spec delta (độ lệch đặc tả) --> Bảo mật --> Kiểm thử --> Độ phức tạp --> Phong cách.

## 3. Tiêu chí hoàn thành (Done Criteria)

* Hoàn thành file phân tích nghiệp vụ `docs/br-analysis-wo.md`.

* Hoàn thành danh sách ít nhất 8 góp ý đánh giá mã nguồn (Review comments) đối với đoạn code mẫu có lỗi bảo mật.

## Phụ lục

`docs/br-analysis-wo.md`:

Mô tả yêu cầu thô từ Product Owner:

> "Dự án POSCO MCI: Cần làm gấp tính năng Quản lý Phiếu công việc (Work Order) trên ứng dụng di động cho thợ kỹ thuật ở công trường. Thợ vào app nhập mã thiết bị (equipment_id), chọn mức độ ưu tiên (low, medium, high, urgent) và viết mô tả công việc (description). Hệ thống lưu lại và hiển thị danh sách cho quản đốc xem. Yêu cầu làm nhanh trong tuần này, không cần phân quyền phức tạp vì ai đăng nhập app công trường cũng là thợ, miễn là nhập đúng mã thiết bị đang hoạt động."

Dữ liệu mẫu (Java/Spring Boot) cho Bước 3: AI-Assisted Code Review

```java
package com.posco.mci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@RestController
@RequestMapping("/api/work-orders")
public class WorkOrderController {

    @Autowired
    private DataSource dataSource;

    // Khóa bí mật cấu hình cứng trong code
    private static final String JWT_SECRET = "posco_mci_secret_key_2026_xyz"; 

    // API tạo phiếu công việc cho thợ kỹ thuật tại công trường
    @PostMapping("/create-wo")
    public ResponseEntity<?> createWorkOrder(@RequestBody WorkOrderRequest request) {
        
        // Bỏ qua bước kiểm tra xác thực (Authentication/Authorization)
        
        // Ghép nối chuỗi trực tiếp vào câu lệnh SQL (Lỗi bảo mật nghiêm trọng)
        String query = "INSERT INTO work_orders (equipment_id, description, priority, status) VALUES ('" 
                + request.getEquipmentId() + "', '" 
                + request.getDescription() + "', '" 
                + request.getPriority() + "', 'NEW')";
        
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            
            stmt.executeUpdate(query);
            System.out.println("Đã tạo phiếu thành công cho thiết bị: " + request.getEquipmentId());
            
            // Trả về kết quả thành công
            return ResponseEntity.ok().body(new ApiResponse(true, "Tạo phiếu thành công!", null));
            
        } catch (Exception e) {
            // Lộ thông tin nhạy cảm của hệ thống và câu truy vấn lỗi ra ngoài
            return ResponseEntity.status(500).body(new ErrorResponse(e.getMessage(), query));
        }
    }
}
```

### Prompt

#### Cấu hình Custom Instructions

- Role: Bạn là một Senior Solution Architect và Technical Lead chuyên nghiệp trong dự án POSCO MCI.
- Core Rules: 
  1. Tuyệt đối không hardcode thông tin nhạy cảm (JWT secret, password, API key) trong mã nguồn.
  2. Luôn tuân thủ các tài liệu đặc tả trong thư mục `docs/*`.
  3. Khi viết code Java/Spring Boot, luôn ưu tiên bảo mật chống SQL Injection (dùng PreparedStatement/JPA) và tuân thủ phân quyền chặt chẽ.

#### Phân tích yêu cầu thô (BR Analysis)

Dựa vào Custom Instructions đã thiết lập, hãy đóng vai trò là một Business Analyst (BA) chuyên nghiệp. 
Hãy đọc đoạn yêu cầu thô sau về tính năng Quản lý Phiếu công việc (Work Order) của dự án POSCO MCI:
"[Dán đoạn mô tả thô của Product Owner vào đây]"
Hãy giúp tôi phân tích và xuất nội dung thành file markdown lưu vào `docs/br-analysis-wo.md` bao gồm các phần sau:
1. Danh sách các thực thể (Entities) và thuộc tính cơ bản.
2. Các câu hỏi còn bỏ ngỏ / Rủi ro nghiệp vụ cần Product Owner làm rõ (Open Questions).
3. Bảng phân rã chi tiết theo mô hình 3 tầng (UI / Data / API).

#### Thực hiện AI-Assisted Code Review

Hãy đóng vai trò là một Senior Security Code Reviewer. Hãy thực hiện review đoạn mã Java (Spring Boot) sau đây trong Controller của dự án POSCO MCI:
[Dán đoạn mã WorkOrderController.java vào đây]
Hãy đưa ra tối thiểu 8 nhận xét (review comments) cụ thể, chi tiết, được sắp xếp theo đúng thứ tự ưu tiên sau:
1. Spec delta (Độ lệch đặc tả so với yêu cầu nghiệp vụ thực tế)
2. Bảo mật (Security vulnerabilities)
3. Kiểm thử & Ràng buộc dữ liệu (Validation & Testing)
4. Độ phức tạp (Complexity)
5. Phong cách lập trình (Coding style / Best practices)
Đồng thời, hãy gợi ý cấu trúc mã nguồn đã sửa lỗi an toàn tương ứng.