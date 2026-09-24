## HR Management

Spring Boot 3 + Java 17 + Maven application for employee management.

### Run locally

```powershell
mvn spring-boot:run
```

The default `local` profile uses H2 file mode at `./data/hrdb`. On an empty database,
`data.sql` creates 50 sample employees. The script is guarded so restarting the app
does not create duplicates. The web UI is available at
`http://localhost:8080/` and the H2 console at `http://localhost:8080/h2-console`.

### Import item CSV

Click **Import file** and select a UTF-8, comma-separated CSV with headers
`No,Tên mặt hàng,Số lượng,Đơn giá,VAT (Mặt hàng)`.
See [sample CSV](docs/mat-hang-mau.csv). Numbers use a decimal point without
thousands separators; VAT accepts `8` or `8%` for 8 percent (0–100).
The modal calculates Tổng = Số lượng × Đơn giá and VAT = Tổng × rate / 100,
rounding calculated amounts to two decimal places. **Export CSV** downloads
all seven columns with a UTF-8 BOM for Excel. Imported items stay in the browser
and are not saved to the employee database. Limit: 5 MB / 10,000 rows.

### Backend tests

```powershell
mvn test '-Dspring.profiles.active=test'
```

The `test` profile uses an in-memory H2 database and runs `schema.sql` plus `data.sql`,
which creates the same deterministic 50 records.

### Playwright E2E

Install the browser once, start the local application, then run the isolated UI suite:

```powershell
npm install
npx playwright install chromium
npm run e2e
```

The suite runs with one worker, creates unique employee codes for CRUD tests, and
deletes test records in cleanup so it does not modify the 50 seeded records.

### Phase 5 verification

Run backend tests first, then start a separate server with disposable H2 data:

```powershell
mvn test '-Dspring.profiles.active=test'
mvn spring-boot:run '-Dspring-boot.run.profiles=test' '-Dspring-boot.run.arguments=--server.port=18080'
```

In a second terminal:

```powershell
$env:BASE_URL = 'http://localhost:18080'
npm.cmd run e2e
node scripts/phase5-report.cjs
```

Use `npm.cmd` if PowerShell blocks `npm.ps1`. If Maven is missing from PATH,
see [run_project.md](run_project.md) for the installed Maven path.
Backend tests include Mockito unit tests, MockMvc integration tests, isolated SQL
schema/seed/transaction tests and the application smoke test. Maven Surefire runs
all of them via `mvn test` (integration classes intentionally end with `Test`).

See [Phase 5 report](docs/phase_5_test_report.md) for per-case PASS, FAIL and
not-run/partial coverage. A green runner does not imply complete matrix coverage.
The report script uses reviewed mappings for this run; review assertions and update
the mappings when tests change. Raw results are in `target/surefire-reports`,
`test-results/results.json` and `playwright-report/index.html`.
