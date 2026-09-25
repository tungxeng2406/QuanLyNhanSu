# Hướng dẫn .copilotignore và .gitignore

Đối chiếu cấu hình local ngày 25/09/2026. Hai file nằm ở thư mục gốc repository. Tài liệu này mô tả cấu hình hiện có, không xác nhận đã bật chính sách Copilot trên GitHub.

## 1. Phạm vi của từng file

| File | Nội dung hiện có | Tác dụng / giới hạn |
|---|---|---|
| [.copilotignore](../.copilotignore) | `.env*`, `secrets/`, `*.pem`, `vendor/proprietary/` | Danh sách đường dẫn dự án muốn loại khỏi context AI. Chưa xác minh công cụ đang dùng có đọc file này. |
| [.gitignore](../.gitignore) | `.env`, `.env.*`, `secrets/`, `*.pem`, `vendor/proprietary/`, `bin/`, `node_modules/` và các nhóm build, database, IDE, Playwright | Git bỏ qua file chưa được theo dõi khi khớp quy tắc; không cấu hình quyền đọc của AI. |

Không coi `.copilotignore` là cơ chế Content exclusion chính thức đã hoạt động. Hướng dẫn GitHub cấu hình tính năng này qua Settings; cần xác minh đúng công cụ, chế độ và chính sách thực tế. Xem [cấu hình Content exclusion](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot).

## 2. Nội dung .copilotignore hiện tại

```gitignore
.env*
secrets/
*.pem
vendor/proprietary/
```

Ý định của danh sách: tránh đưa cấu hình môi trường, thư mục bí mật, file PEM và mã vendor độc quyền vào context. Không tự suy ra cú pháp Git ignore được mọi công cụ AI hiểu giống nhau.

## 3. Nội dung .gitignore hiện tại

```gitignore
# Maven build output
target/

# Local H2 database files
data/*.mv.db
data/*.lock.db
data/*.trace.db

# IDE and OS files
.idea/
*.iml
.vscode/settings.json
.DS_Store
Thumbs.db

# Playwright output
node_modules/
playwright-report/
test-results/

# Local environment and secret files
.env
.env.*
secrets/
*.pem
vendor/proprietary/

# Local binary output
bin/
```

**Khác biệt cần nhớ:** `.env` không bao phủ `.env.local` hoặc `.env.production`; `.env.*` bổ sung phần này để đồng bộ với `.copilotignore`. Các file `secrets/`, `*.pem`, `vendor/proprietary/` hiện được bỏ qua ở cả `.copilotignore` và `.gitignore`, nhằm giảm rủi ro commit nhầm secret hoặc tài nguyên độc quyền.

Khi dùng `.env*`, cân nhắc ngoại lệ cho file mẫu không chứa secret như `.env.example`. Không dùng `git add -f` để vượt qua quy tắc đối với dữ liệu nhạy cảm.

Git ignore không tác động tới file đã tracked và không xóa dữ liệu khỏi lịch sử Git. Nếu secret đã lộ, cần thu hồi/thay secret và xử lý lịch sử theo quy trình nhóm; thêm ignore không giải quyết sự cố đó. [Tài liệu gitignore](https://git-scm.com/docs/gitignore)

## 4. Kiểm tra từng bước trước khi commit

### Bước 1 — Đọc cấu hình

Chạy từ thư mục gốc bằng PowerShell:

```powershell
Get-Content -Encoding UTF8 .copilotignore
Get-Content -Encoding UTF8 .gitignore
```

### Bước 2 — Kiểm tra mẫu Git bằng đường dẫn giả

```powershell
git check-ignore -v --no-index .env bin/example node_modules/example
git check-ignore -v --no-index .env.local secrets/example.txt example.pem vendor/proprietary/example.txt
```

Không cần tạo các file ví dụ. Lệnh đầu nên hiển thị quy tắc khớp. Với cấu hình repository hiện tại, lệnh thứ hai không có mẫu tương ứng trong `.gitignore`; cấu hình ignore toàn máy hoặc file khác có thể ảnh hưởng kết quả, nên đọc tên file và dòng quy tắc được in ra. Không có đường dẫn khớp thì exit code là 1. `--no-index` kiểm tra mẫu ngay cả khi đường dẫn được tracked, không chứng minh file đã được bỏ theo dõi. [git check-ignore](https://git-scm.com/docs/git-check-ignore)

### Bước 3 — Kiểm tra index và thay đổi sắp commit

```powershell
git ls-files -- .env '.env*' 'secrets/*' '*.pem' 'vendor/proprietary/*'
git status --short
git diff --cached --name-only
```

Nếu lệnh `git ls-files` có kết quả, đường dẫn đó đã được Git theo dõi; kiểm tra riêng trước khi chia sẻ. Sau khi xác định file an toàn để review, xem diff staged tương ứng. Không đưa nội dung secret vào log, Issue hoặc PR để chứng minh đã kiểm tra.

## 5. Xác minh Content exclusion cho GitHub Copilot

1. Kiểm tra gói và quyền: tính năng được tài liệu hóa cho tổ chức dùng Copilot Business/Enterprise.
2. Quản trị viên mở repository **Settings → Copilot → Content exclusion**, nếu tính năng khả dụng.
3. Nhập các mẫu theo cú pháp của Settings, không mặc định dán nguyên định dạng `.copilotignore`.
4. Lưu cấu hình và kiểm tra hiệu lực trên client hỗ trợ bằng dữ liệu giả.
5. Ghi lại client/chế độ, thời điểm và bằng chứng; nếu không có quyền/tính năng, ghi chưa cấu hình hoặc chưa xác minh.

Ví dụ chuyển danh sách dự án sang các mẫu Settings để quản trị viên xem xét:

```yaml
- ".env*"
- "**/secrets/**"
- "*.pem"
- "/vendor/proprietary/**"
```

Đây là hướng dẫn thiết lập, chưa phải chính sách đã lưu. [Các bước và cú pháp chính thức](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)

Content exclusion không được hỗ trợ trong Edit/Agent modes của Copilot Chat theo tài liệu được đối chiếu. Luôn kiểm tra bảng hỗ trợ của client đang dùng; không dùng file ignore làm ranh giới bảo mật cho mọi agent. Không chủ động dán hoặc đính kèm secret vào prompt. [Phạm vi hỗ trợ và giới hạn](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion)

## 6. Khi tạo Issue, PR hoặc chia sẻ artifact

- Dùng dữ liệu giả trong ảnh, CSV, log và ví dụ cấu hình.
- Kiểm tra nội dung chuẩn bị đăng: Git ignore không lọc phần mô tả Issue/PR hoặc tệp tải lên thủ công.
- Trong PR, ghi rõ thay đổi từng file ignore và kết quả kiểm tra; không ghi “Copilot đã chặn” khi mới tạo file local.
- Các file trong `target/`, `playwright-report/`, `test-results/` có thể bị ignore nhưng vẫn cần chia sẻ bằng chứng phù hợp đã loại dữ liệu nhạy cảm.
- Sau khi đổi mẫu ignore, cập nhật tài liệu này và các hướng dẫn liên quan; giữ nguyên snapshot audit lịch sử.
