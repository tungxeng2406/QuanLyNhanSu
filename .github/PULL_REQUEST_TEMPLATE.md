## 1. Thông tin PR

- **Title:**
- **Issue / requirement liên quan:** Closes #<issue-number>
- **Branch:**
- **Target branch:** main / develop / release-
- **Loại thay đổi:**
  - [ ] Feature
  - [ ] Bug fix
  - [ ] Refactor
  - [ ] Documentation
  - [ ] Test
  - [ ] Security / config
  - [ ] Other: _______

## 2. Tóm tắt thay đổi

Mô tả ngắn gọn bằng 2-4 câu:

- Thay đổi chính là gì?
- Vì sao cần làm?
- Hiệu ứng đối với người dùng / hệ thống là gì?

## 3. Scope và danh sách file bị ảnh hưởng

- Các file chính đã sửa:
  - `...`
  - `...`
- Các file phụ thêm / generated:
  - `...`
- Các file không thay đổi nhưng cần lưu ý:
  - `...`

## 4. AI Usage Disclosure & Provenance

- [ ] **AI tools used:** GitHub Copilot Chat / Claude / Cursor / other: _______
- [ ] **Prompt context / spec used:** `docs/...`, `README.md`, `prompt.md`, `...`
- [ ] **Chế độ AI dùng:**
  - [ ] Chat
  - [ ] Inline completion
  - [ ] Agent mode
  - [ ] Other: _______
- [ ] **Summary of generated content:**
  - Generated: `...`
  - Hand-written / reviewed: `...`
- [ ] **Đã review lại output AI trước khi commit:**
  - [ ] Có
  - [ ] Không
- [ ] **Không đưa secret / personal data / production data vào prompt log hoặc artifact:**
  - [ ] Có
  - [ ] Không

## 5. Yêu cầu kiểm thử và chứng cứ

### 5.1. Unit / integration / E2E

- [ ] Unit tests added/updated: `...`
- [ ] Integration tests added/updated: `...`
- [ ] E2E tests added/updated: `...`
- [ ] Command đã chạy:

```powershell
# ví dụ
mvn test '-Dspring.profiles.active=test'
npm run e2e
```

- [ ] Kết quả kiểm chứng:
  - Với backend: PASS / FAIL / PARTIAL
  - Với FE/E2E: PASS / FAIL / PARTIAL
  - Evidence / log: `...`

### 5.2. Lint / static analysis / build

- [ ] Compile/build succeeded: yes / no
- [ ] Lint / checkstyle / ESLint passed: yes / no
- [ ] Nếu có lỗi, ghi rõ root cause và cách xử lý:

```text
Lỗi: ...
Nguyên nhân: ...
Khắc phục: ...
```

## 6. Bảo mật và quản lý dữ liệu nhạy cảm

- [ ] Không commit secrets, API key, token, password, certificate hoặc dữ liệu thật.
- [ ] Đã kiểm tra các file staged và diff trước khi PR.
- [ ] `.gitignore` và `.copilotignore` đã được cập nhật phù hợp với quy tắc repo.
- [ ] Nếu file ignore hoặc policy thay đổi, ghi rõ:
  - `.env`, `.env.*`, `secrets/`, `*.pem`, `vendor/proprietary/` được bảo vệ theo đúng mục đích.
  - Nguồn tham khảo: `../repository-ignore-policy.md`
- [ ] Không sử dụng `git add -f` để bypass ignore đối với dữ liệu nhạy cảm.
- [ ] Nếu là thay đổi security / auth / PII, mô tả hướng xử lý và recovery plan.

## 7. Rủi ro, impact và rollback plan

### Rủi ro

- Rủi ro kỹ thuật:
- Rủi ro người dùng / business:
- Rủi ro dữ liệu / security:

### Impact

- Ảnh hưởng đến: backend / frontend / database / docs / CI
- Graceful degradation / fallback:

### Rollback plan

- Nếu cần revert, thực hiện:
  1. `git revert <commit>` hoặc `git reset --hard <commit>` theo quy mô thay đổi
  2. Xóa tập tin/generated artifacts không cần thiết
  3. Kiểm tra lại biến môi trường / ignore policy
  4. Chạy lại validation cần thiết

## 8. Checklist hoàn thành trước khi mở PR

- [ ] Mã nguồn đã được review bởi chính tác giả
- [ ] Tất cả test liên quan đã chạy và có kết quả rõ ràng
- [ ] Không còn TODO / debug code / temporary log không cần thiết
- [ ] Mô tả Issue / requirement được liên kết chính xác
- [ ] Commit message / branch name phù hợp
- [ ] Đã cập nhật tài liệu liên quan khi cần
- [ ] Đã xác minh không có phần dữ liệu nhạy cảm trong diff

## 9. Ghi chú bổ sung

- Chú ý đặc biệt:
- Cần phản hồi / confirm từ reviewer:
- Link tài liệu liên quan:
  - `README.md`
  - `../repository-ignore-policy.md`
  - `docs/...`

---

### Template note for reviewers

Hãy kiểm tra các câu hỏi sau khi review:

1. Thay đổi có giải quyết đúng issue / requirement không?
2. Có logic hoặc dữ liệu nào bị sai / thiếu / mâu thuẫn không?
3. Có test nào bị thiếu hoặc không đủ để bảo vệ thay đổi không?
4. Có leaks về secret, PII, dữ liệu nhạy cảm không?
5. Có tác động đến migration / running app / backward compatibility không?
6. Có lưu ý, docs, runbook cần bổ sung không?
