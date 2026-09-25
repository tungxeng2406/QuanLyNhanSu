# Hướng dẫn đưa issue từ báo cáo lên GitHub

Tài liệu dành cho dự án **QuanLyNhanSu**, sử dụng Windows và PowerShell. Bạn có thể thao tác trên website GitHub hoặc dùng GitHub CLI khi cần xử lý nhiều issue.

## 1. Trạng thái hiện tại của dự án

- Repository: [tungxeng2406/QuanLyNhanSu](https://github.com/tungxeng2406/QuanLyNhanSu).
- Báo cáo nguồn: [coding-rule-issue-report_20260925_085503.md](../docs/code-review/coding-rule-issue-report_20260925_085503.md).
- Ngày đồng bộ: **25/09/2026**.
- Đã tạo **16 issue, từ #2 đến #17**, sau khi kiểm tra các issue mở và đóng.
- Link từng issue đã được cập nhật ở cột ID trong bảng tổng hợp của báo cáo.
- Mức ưu tiên nằm trong nội dung issue; lần đồng bộ này chưa gán assignee hoặc label ưu tiên.

**16 issue này đã tồn tại. Khi thực hành với báo cáo trên, hãy mở và kiểm tra issue tương ứng, không tạo lại.** Chỉ thực hiện bước tạo mới cho vấn đề chưa có issue.

| Mã trong báo cáo | GitHub Issue |
|---|---|
| CR-JAVA-001 | [#2](https://github.com/tungxeng2406/QuanLyNhanSu/issues/2) |
| CR-JAVA-002 | [#3](https://github.com/tungxeng2406/QuanLyNhanSu/issues/3) |
| CR-JAVA-003 | [#4](https://github.com/tungxeng2406/QuanLyNhanSu/issues/4) |
| CR-JAVA-004 | [#5](https://github.com/tungxeng2406/QuanLyNhanSu/issues/5) |
| CR-JAVA-005 | [#6](https://github.com/tungxeng2406/QuanLyNhanSu/issues/6) |
| CR-JAVA-006 | [#7](https://github.com/tungxeng2406/QuanLyNhanSu/issues/7) |
| CR-JS-001 | [#8](https://github.com/tungxeng2406/QuanLyNhanSu/issues/8) |
| CR-JS-002 | [#9](https://github.com/tungxeng2406/QuanLyNhanSu/issues/9) |
| CR-JS-003 | [#10](https://github.com/tungxeng2406/QuanLyNhanSu/issues/10) |
| CR-JS-004 | [#11](https://github.com/tungxeng2406/QuanLyNhanSu/issues/11) |
| CR-JS-005 | [#12](https://github.com/tungxeng2406/QuanLyNhanSu/issues/12) |
| CR-JS-006 | [#13](https://github.com/tungxeng2406/QuanLyNhanSu/issues/13) |
| CR-JS-007 | [#14](https://github.com/tungxeng2406/QuanLyNhanSu/issues/14) |
| CR-JS-008 | [#15](https://github.com/tungxeng2406/QuanLyNhanSu/issues/15) |
| CR-JS-009 | [#16](https://github.com/tungxeng2406/QuanLyNhanSu/issues/16) |
| CR-TOOL-001 | [#17](https://github.com/tungxeng2406/QuanLyNhanSu/issues/17) |

`CR-JS-007` là mã nội bộ; `#14` là số GitHub cấp. Không suy ra số GitHub từ mã nội bộ. Báo cáo có 173 cảnh báo được gom thành 16 nhóm công việc; không cần tạo một issue cho từng cảnh báo.

## 2. Chuẩn bị nội dung trước khi đăng

### Bước 1 — Xác định đúng repository và báo cáo

Mở PowerShell trong thư mục dự án:

```powershell
Set-Location 'D:\CongNghe\AI_Tech_Leader_POSCO\Project_QuanLyNhanSu'
git remote -v
```

Kiểm tra `origin` trỏ đến `https://github.com/tungxeng2406/QuanLyNhanSu.git`. Mở báo cáo nguồn bằng trình soạn thảo và tìm bảng tổng hợp các mã `CR-*`.

### Bước 2 — Chọn phạm vi một issue

Mỗi nhóm trong báo cáo thành một issue. Tiêu đề nên có mã để dễ tìm:

```text
[CR-JS-007] [JavaScript] Bắt Promise rejection ở Edit/Delete/View
```

Nội dung cần có: mã nội bộ, nguồn báo cáo, ưu tiên, hiện trạng, quy tắc liên quan, vị trí bằng chứng, đề xuất sửa và checklist hoàn thành. Giữ các mức P1/P2/P3 của báo cáo nếu chưa có quyết định điều chỉnh.

### Bước 3 — Kiểm tra các link bằng chứng

Link tương đối trong báo cáo, ví dụ `../../src/...`, cần chuyển thành URL GitHub đầy đủ trước khi dán vào issue. Nên dùng commit cố định để người đọc xem đúng phiên bản:

```text
https://github.com/OWNER/REPO/blob/COMMIT_SHA/path/to/file#L10
```

Thay các phần viết hoa và đường dẫn bằng giá trị thực tế. Commit gốc của báo cáo này là `00ca6b15113b0761dd86667010ee120105d53653`.

Nếu file chưa commit hoặc nội dung local khác commit gốc, ghi rõ bằng chứng thuộc working tree local và chép đoạn liên quan vào issue. Không tạo URL giả tới file chưa có trên GitHub. Một link tới commit gốc không chứng minh đầy đủ trạng thái local đã được audit.

## 3. Cách A — Thực hiện trên website GitHub

Phù hợp khi mới bắt đầu hoặc chỉ cần xử lý vài issue. Các bước tạo issue dựa trên [hướng dẫn chính thức của GitHub](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue).

### Bước 1 — Đăng nhập và mở danh sách issue

Đăng nhập tài khoản GitHub có quyền thao tác trong repository, rồi mở [danh sách Issues của dự án](https://github.com/tungxeng2406/QuanLyNhanSu/issues).

### Bước 2 — Kiểm tra trùng trước khi tạo

Trong ô tìm kiếm của tab Issues, thay bộ lọc hiện tại bằng:

```text
is:issue "CR-JS-007"
```

Bỏ điều kiện `is:open` nếu có để xem cả issue đã đóng. Sau đó tìm thêm theo nội dung, chẳng hạn `Promise rejection`, vì issue cũ có thể chưa dùng mã `CR-*`.

- Có issue cùng vấn đề: mở issue đó, đối chiếu phạm vi và dùng lại link.
- Issue đã đóng: đọc kết quả xử lý; nếu lỗi tái xuất hiện, đánh giá việc mở lại hoặc tạo issue mới có liên kết đến issue cũ.
- Không có issue tương ứng: tiếp tục bước tạo mới.

Với `CR-JS-007`, kết quả đã có là [#14](https://github.com/tungxeng2406/QuanLyNhanSu/issues/14); không tạo thêm.

### Bước 3 — Tạo issue cho vấn đề chưa có

1. Nhấn **New issue**.
2. Chọn template phù hợp nếu repository hiển thị danh sách template.
3. Điền tiêu đề có mã nội bộ.
4. Dán nội dung của riêng nhóm tương ứng trong báo cáo.
5. Xem bản xem trước nếu giao diện hỗ trợ, kiểm tra bảng, checkbox và link.
6. Chọn assignee, label hoặc milestone nếu cần và có quyền chỉnh sửa.
7. Nhấn nút tạo issue để đăng.

Nếu chưa có label `P1`, vẫn có thể ghi `**Ưu tiên:** P1` trong nội dung. Không cần tạo label để hoàn tất việc đăng issue.

### Bước 4 — Kiểm tra và lưu link

Mở issue vừa tạo, kiểm tra nội dung tiếng Việt và các link. Sao chép URL trên thanh địa chỉ, rồi cập nhật báo cáo theo mục 5 bên dưới. Lặp lại bước kiểm tra trùng cho từng nhóm còn lại.

## 4. Cách B — Thực hiện bằng GitHub CLI trong PowerShell

Thực hiện các bước trong cùng cửa sổ PowerShell để giữ các biến đã khai báo. Các lệnh tạo hoặc sửa issue sẽ tác động trực tiếp lên GitHub.

### Bước 1 — Cài GitHub CLI

Kiểm tra trước:

```powershell
gh --version
```

Nếu báo `gh is not recognized`, cài bằng WinGet:

```powershell
winget install --id GitHub.cli --exact
```

Đóng và mở lại PowerShell, rồi chạy lại `gh --version`. Nếu không có WinGet, dùng bộ cài Windows từ [trang phát hành GitHub CLI](https://github.com/cli/cli/releases). Tham khảo [các phương thức cài đặt chính thức](https://github.com/cli/cli#installation).

### Bước 2 — Đăng nhập

```powershell
gh auth login --hostname github.com --git-protocol https --web
gh auth status
```

Làm theo hướng dẫn trên terminal và trình duyệt. Kiểm tra tài khoản hiển thị đúng trước khi tiếp tục. Không chép token vào tài liệu hoặc commit token vào Git. Chi tiết: [gh auth login](https://cli.github.com/manual/gh_auth_login).

### Bước 3 — Chọn repository

```powershell
Set-Location 'D:\CongNghe\AI_Tech_Leader_POSCO\Project_QuanLyNhanSu'
$issueRepo = 'tungxeng2406/QuanLyNhanSu'
gh repo view $issueRepo
```

Kết quả phải là repository QuanLyNhanSu. Các lệnh sau truyền `--repo` để xác định rõ nơi tạo issue.

### Bước 4 — Kiểm tra issue trùng

```powershell
gh issue list --repo $issueRepo --state all --search '"CR-JS-007"' --limit 100
gh issue list --repo $issueRepo --state all --search '"Promise rejection"' --limit 100
```

Đọc cả tiêu đề và nội dung của các kết quả liên quan. `--state all` bao gồm issue đóng. `--limit 100` giới hạn số kết quả, không phải cam kết đã tải toàn bộ repository. Chi tiết: [gh issue list](https://cli.github.com/manual/gh_issue_list).

Nếu cần kiểm kê toàn bộ issue qua API, dùng phân trang:

```powershell
gh api --paginate "repos/$issueRepo/issues?state=all&per_page=100" --jq '.[] | select(.pull_request == null) | {number,title,state,html_url}'
```

API này cũng trả về pull request; bộ lọc trên loại chúng ra. Hướng dẫn phân trang: [gh api](https://cli.github.com/manual/gh_api).

### Bước 5 — Chuẩn bị một file nội dung Markdown

Tạo thư mục nháp local nếu chưa có:

```powershell
New-Item -ItemType Directory -Force -Path 'target/issue-drafts' | Out-Null
notepad 'target/issue-drafts/issue-body.md'
```

Đồng ý tạo file nếu Notepad hỏi. Dán mẫu bên dưới, thay toàn bộ phần trong dấu `<...>` bằng nội dung thực tế, rồi lưu UTF-8:

```markdown
**Mã báo cáo:** <mã nội bộ>
**Ưu tiên:** <P1/P2/P3>
**Nguồn:** <tên báo cáo, ngày audit, nhánh và commit>

## Hiện trạng

<Mô tả vấn đề và phạm vi ảnh hưởng.>

## Quy tắc liên quan

<Tên quy tắc và link tài liệu nếu đã có trên GitHub.>

## Bằng chứng

<Đường dẫn file, số dòng, đoạn code hoặc kết quả kiểm tra.>
<Ghi rõ nếu bằng chứng thuộc thay đổi local chưa commit.>

## Đề xuất sửa

<Các thay đổi cần thực hiện.>

## Tiêu chí hoàn thành

- [ ] Sửa các vị trí thuộc phạm vi issue.
- [ ] Chạy kiểm tra coding rules phù hợp.
- [ ] Chạy test liên quan nếu sửa code.
- [ ] Liên kết PR và bằng chứng kiểm tra.
- [ ] Cập nhật trạng thái báo cáo.
```

Với báo cáo hiện có, có thể chép nguyên nội dung từ heading `## CR-...` đến trước heading cấp hai tiếp theo, rồi xử lý các link bằng chứng theo mục 2. Không dán toàn bộ 16 nhóm vào cùng một issue.

### Bước 6 — Tạo issue mới sau khi xác nhận không trùng

Đoạn lệnh này hỏi mã và tiêu đề của vấn đề mới, rồi đọc nội dung từ file vừa chuẩn bị:

```powershell
$newIssueId = Read-Host 'Nhap ma issue moi da kiem tra khong trung'
$newIssueTitle = Read-Host 'Nhap tieu de mo ta van de'
Get-Content -Encoding UTF8 'target/issue-drafts/issue-body.md'
```

Kiểm tra mã trong file trùng với mã vừa nhập. Khi nội dung đã đầy đủ, chạy:

```powershell
gh issue create --repo $issueRepo --title "[$newIssueId] $newIssueTitle" --body-file 'target/issue-drafts/issue-body.md'
```

Lệnh thành công trả về URL issue. Sao chép URL đó để cập nhật báo cáo. `--body-file` giúp giữ nội dung nhiều dòng từ Markdown. Chi tiết: [gh issue create](https://cli.github.com/manual/gh_issue_create).

Nếu mất mạng hoặc timeout, kiểm tra lại danh sách issue trước khi chạy lại: lần tạo trước có thể đã thành công trên GitHub.

### Bước 7 — Xác minh issue

Để xem issue có sẵn trong dự án:

```powershell
gh issue view 14 --repo $issueRepo
gh issue view 14 --repo $issueRepo --web
```

Với issue mới, thay `14` bằng số thực tế trong URL. Kiểm tra tiêu đề, mã, mức ưu tiên, bảng bằng chứng, checkbox và link source.

### Bước 8 — Cập nhật issue đã có khi cần

Ưu tiên mở issue trên website và sửa phần cần thiết. Nếu dùng CLI để thay nội dung, chuẩn bị file chứa **toàn bộ nội dung muốn giữ lại**, rồi chạy:

```powershell
$existingIssueNumber = Read-Host 'Nhap so issue can cap nhat'
gh issue edit $existingIssueNumber --repo $issueRepo --body-file 'target/issue-drafts/issue-body.md'
```

`--body-file` trong lệnh edit thay thế phần mô tả hiện có; không tự nối thêm nội dung. Hướng dẫn: [gh issue edit](https://cli.github.com/manual/gh_issue_edit).

## 5. Cập nhật link vào báo cáo

### Bước 1 — Mở báo cáo nguồn

Mở `docs/code-review/coding-rule-issue-report_20260925_085503.md` và tìm bảng tổng hợp.

### Bước 2 — Gắn URL vào mã nội bộ

Ví dụ thay ô chứa `CR-JS-007` bằng:

```markdown
[CR-JS-007](https://github.com/tungxeng2406/QuanLyNhanSu/issues/14)
```

Giữ nguyên các cột tiêu đề, mức ưu tiên và số cảnh báo. Thêm ngày đồng bộ và kết quả kiểm tra trùng nếu đây là lượt đăng mới. Báo cáo hiện tại đã có đủ 16 link nên không cần sửa lại phần này khi chỉ thực hành đọc.

### Bước 3 — Đối chiếu kết quả

- Mỗi mã có đúng link issue tương ứng.
- Issue có mã và nội dung khớp với nhóm trong báo cáo.
- Không dùng số issue dự đoán; lấy URL từ GitHub.
- Không đánh dấu đã sửa code chỉ vì đã tạo issue.

### Bước 4 — Lưu và chia sẻ báo cáo khi cần

Lưu file local chỉ cập nhật máy của bạn. Nếu muốn người khác đọc bản mới trong repository, cần commit và push tài liệu theo quy trình của nhóm.

Trước khi commit, xem trạng thái:

```powershell
git status --short
git diff -- docs/code-review/coding-rule-issue-report_20260925_085503.md
```

Nếu báo cáo là file chưa được Git theo dõi (`??`), `git diff` chưa hiển thị nội dung; mở file để đọc hoặc stage đúng file rồi kiểm tra `git diff --cached`. Chỉ stage những tài liệu và bằng chứng bạn định chia sẻ, đồng thời kiểm tra các link tương đối trỏ đến file đã có trong repository. Việc tạo issue không yêu cầu phải commit hoặc push code.

## 6. Khi cần xử lý cả một báo cáo nhiều issue

1. Đếm số nhóm và lập danh sách mã nội bộ.
2. Tải danh sách issue mở và đóng, có phân trang nếu dùng API.
3. Đối chiếu cả mã và nội dung để tìm vấn đề đã có dưới tiêu đề khác.
4. Chuẩn bị riêng nội dung Markdown cho từng nhóm.
5. Tạo lần lượt những nhóm còn thiếu; lưu URL ngay sau mỗi lần thành công.
6. Nếu một lần đăng lỗi, dừng để kiểm tra kết quả trên GitHub trước khi thử lại.
7. Đọc lại từng issue và cập nhật ánh xạ mã → URL trong báo cáo.

Trong lượt đồng bộ ngày 25/09/2026, tác vụ đã dùng GitHub API với thông tin đăng nhập Git hiện có vì máy chưa có `gh`. Các file tạm được lưu ở `target/github-issue-sync/`, gồm nội dung Markdown, `mapping.json` và script `publish.py`.

Thư mục `target` có thể bị xóa khi dọn build và không phải nơi lưu tài liệu lâu dài. Script đó dành riêng cho báo cáo này, có repository, ngày và commit cố định; không dùng nguyên trạng để đăng báo cáo khác. Bảng link trong báo cáo và mục 1 của tài liệu này là nơi tra cứu kết quả.

## 7. Xử lý lỗi thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| `gh is not recognized` | Cài GitHub CLI, mở terminal mới, chạy `gh --version`. |
| CLI chưa đăng nhập | Chạy `gh auth login`, sau đó `gh auth status`. |
| Không truy cập được repository | Kiểm tra tên owner/repo, tài khoản đang đăng nhập và quyền truy cập. |
| Lệnh tạo issue lỗi quyền | Kiểm tra tài khoản có quyền tạo issue và repository có bật Issues. |
| Label không tồn tại | Bỏ tùy chọn label hoặc chọn label đã có; giữ mức ưu tiên trong nội dung. |
| Tiếng Việt lỗi dấu | Lưu file Markdown ở UTF-8; kiểm tra nội dung thực tế trên GitHub. |
| Link source báo 404 | Kiểm tra commit, đường dẫn và file đã được push chưa; ghi bằng chứng local nếu chưa có trên GitHub. |
| Timeout sau khi gửi lệnh | Tìm lại mã issue trước khi đăng lại để tránh tạo trùng. |
| Chỉ thấy issue mở | Dùng `--state all` hoặc bỏ `is:open` trên website. |
| Báo cáo đã có link nhưng GitHub chưa thấy file báo cáo | Link issue và file báo cáo là hai thứ riêng; tài liệu local cần commit/push để xuất hiện trong repository. |

## 8. Checklist hoàn thành

- [ ] Đã xác định đúng repository và tài khoản.
- [ ] Đã kiểm tra trùng trong issue mở và đóng, cả mã lẫn nội dung.
- [ ] Mỗi issue có bằng chứng, ưu tiên và tiêu chí hoàn thành.
- [ ] Đã phân biệt bằng chứng local với source tại commit trên GitHub.
- [ ] Đã mở lại và kiểm tra issue sau khi tạo hoặc sửa.
- [ ] Đã cập nhật URL thật vào báo cáo.
- [ ] Đã ghi rõ tài liệu mới chỉ lưu local hay đã commit/push.
