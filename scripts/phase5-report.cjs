// Run after Maven and Playwright. Keep matrix status conservative: test names alone are not coverage.
const fs = require('node:fs');
const root = 'docs/test-evidence/phase5';
fs.mkdirSync(root, { recursive: true });
const reports = fs.readdirSync('target/surefire-reports').filter(x => x.endsWith('.txt'));
const summary = reports.map(file => {
  fs.copyFileSync(`target/surefire-reports/${file}`, `${root}/${file}`);
  return fs.readFileSync(`${root}/${file}`, 'utf8').trim();
}).join('\n\n');
const results = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'));
fs.copyFileSync('test-results/results.json', `${root}/playwright-results.json`);
const statuses = {};
function mark(ids, status, evidence) {
  for (const id of ids.split(' ')) statuses[id] = [status, evidence];
}
mark('BE-CTL-001 BE-CTL-008 BE-CTL-010 BE-CTL-020 BE-CTL-022', 'PASS', 'EmployeeApiIntegrationTest');
mark('BE-CTL-014', 'CHƯA CHẠY ĐỦ', 'Đã kiểm tra invalid JSON date; chưa đủ tất cả payload và field details');
mark('BE-SVC-004 BE-SVC-005 BE-SVC-008 BE-SVC-009 BE-SVC-010', 'PASS', 'EmployeeServiceUnitTest');
mark('DB-SCH-004 DB-SCH-005 DB-CON-002 DB-SEED-001 DB-SEED-002 DB-SEED-003 DB-TXN-001 DB-TXN-002 DB-TXN-003 DB-TXN-004', 'PASS', 'DatabaseIntegrationTest');
mark('FE-LIST-002 FE-LIST-005 FE-SEARCH-001 FE-SEARCH-002 FE-SEARCH-003 FE-SEARCH-004 FE-SEARCH-005 FE-SEARCH-006 FE-SEARCH-007 FE-SEARCH-009 FE-CREATE-005 FE-CREATE-007 FE-CREATE-008 FE-UPDATE-003 FE-ROBUST-002', 'PASS', 'Playwright assertions; xem playwright-results.json');
mark('FE-LIST-001 FE-LIST-007 FE-SEARCH-008 FE-CREATE-001 FE-CREATE-002 FE-CREATE-003 FE-CREATE-004 FE-CREATE-006 FE-UPDATE-001 FE-UPDATE-002 FE-UPDATE-004 FE-UPDATE-005 FE-DELETE-001 FE-DELETE-002 FE-DELETE-003 FE-DETAIL-001 FE-DETAIL-002 FE-EXPORT-001 FE-EXPORT-002 FE-EXPORT-003 FE-ROBUST-005', 'CHƯA CHẠY ĐỦ', 'Test hiện có chỉ kiểm tra một phần; không suy ra PASS từ tên test');
mark('FE-EXPORT-004', 'N/A', 'XLSX ngoài phạm vi MVP');
const backendFailed = /Failures: [1-9]|Errors: [1-9]/.test(summary);
if (backendFailed || results.stats.unexpected || results.stats.skipped || results.stats.flaky) {
  throw new Error('Review failed/skipped/flaky results before generating a passing coverage mapping');
}
const counts = {};
const rows = [];
for (const area of ['BE', 'DB', 'FE']) {
  const matrix = fs.readFileSync(`tests/unit/testcase_${area}.md`, 'utf8');
  for (const match of matrix.matchAll(/^\| ((?:BE|DB|FE)-[A-Z]+-\d+) \|/gm)) {
    const id = match[1];
    const [status, evidence] = statuses[id] || ['CHƯA CHẠY', 'Chưa có test tự động chứng minh đầy đủ case này'];
    counts[status] = (counts[status] || 0) + 1;
    rows.push(`| ${id} | ${status} | ${evidence} |`);
  }
}
fs.writeFileSync('docs/phase_5_test_report.md', `# Phase 5 — Test report\n\nNgày chạy: 2026-09-24. Java 17, Spring Boot 3.5.5, H2 in-memory, Playwright Chromium, một worker.\n\n## Kết quả thực thi\n\n\`\`\`text\n${summary}\n\`\`\`\n\nPlaywright: ${results.stats.expected} pass, ${results.stats.unexpected} fail, ${results.stats.skipped} skipped, ${results.stats.flaky} flaky.\n\n## Lỗi và xử lý\n\n- Backend ban đầu: smoke test 1/1 pass. Sau khi thêm regression: 10 test, 2 fail.\n- BE-CTL-008: dùng chung giới hạn 10000 của CSV cho list, khiến size=101 trả 200. Đã thêm giới hạn list 100; regression xác nhận HTTP 400 và EMP-400-001.\n- Invalid JSON date: thiếu handler HttpMessageNotReadableException, bị catch-all trả 500. Đã trả 400 EMP-400-001, không lộ lỗi parser. Đây mới là một phần BE-CTL-014; chưa khẳng định toàn case pass.\n- E2E ban đầu: 17 pass, 1 fail ở beforeEach của FE-LIST-002. Snapshot chỉ có phần đầu HTML; goto chờ commit quá sớm. Đã chờ domcontentloaded.\n- Search helper trước đây có thể kiểm tra hàng cũ; đã chờ response khớp filter và xác nhận dữ liệu trả về.\n- Unit test mới từng lỗi biên dịch do Mockito any() khớp hai overload delete; đã dùng any(Employee.class).\n\n## Đối chiếu matrix\n\n${Object.entries(counts).map(([s,n]) => `${s}: ${n}`).join('; ')}.\n\nPASS chỉ áp dụng khi assertion bao phủ kỳ vọng. CHƯA CHẠY ĐỦ là đã chạy một phần, vẫn chưa được tính pass. Nhiều tên E2E chứa nhiều ID nhưng không thực hiện đủ từng case. Các case chưa chạy là khoảng trống coverage, không phải test bị skip của runner. Chưa đạt Definition of Done toàn matrix.\n\n| Case | Trạng thái | Bằng chứng / lý do |\n|---|---|---|\n${rows.join('\n')}\n\n## Bằng chứng và chạy lại\n\n- [Kết quả Playwright JSON](test-evidence/phase5/playwright-results.json).\n- [Log regression trước sửa](test-evidence/phase5/backend-initial.log).\n- [Lỗi E2E ban đầu](test-evidence/phase5/e2e-initial-failure.md).\n- Surefire summaries được lưu tại test-evidence/phase5; XML gốc tại target/surefire-reports.\n- HTML report: playwright-report/index.html.\n- Hướng dẫn lệnh: [README](../README.md).\n\n## Giới hạn còn lại\n\nChưa có full coverage cho controller CRUD/validation/CORS, repository predicates, schema metadata/length/Unicode, restart H2 file, FE sort/history/XSS/double-submit/export timeout. FE-DETAIL-001 hiện chỉ hiển thị code/name/email/phone, còn thiếu gender/DOB so với matrix; cần regression đầy đủ trước khi nghiệm thu. Bộ E2E hiện có một số luồng update/export gọi API trực tiếp, không đủ bằng chứng thao tác UI.\n`, 'utf8');
console.log(counts);
