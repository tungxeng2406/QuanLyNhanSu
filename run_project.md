# Run Project Guide

## 1. Prerequisites

Required:

- Java 17.
- Maven 3.9+.
- Node.js 20+ and npm.
- Git, optional for source control.

Verify:

```powershell
java -version
mvn -version
node --version
npm --version
```

If `mvn` is not available in PATH, use the absolute Maven path, for example:

```powershell
& 'F:\PhanMem\apache-maven-3.9.16\bin\mvn.cmd' -version
```

## 2. Install frontend test dependencies

Run once from the project root:

```powershell
npm install
npx playwright install chromium
```

## 3. Run with Maven

Start the local profile:

```powershell
mvn spring-boot:run '-Dspring-boot.run.profiles=local'
```

If Maven is not in PATH:

```powershell
& 'F:\PhanMem\apache-maven-3.9.16\bin\mvn.cmd' spring-boot:run '-Dspring-boot.run.profiles=local'
```

The local profile uses H2 file mode:

```text
jdbc:h2:file:./data/hrdb;AUTO_SERVER=TRUE
```

## 4. Run the packaged JAR

Build the application:

```powershell
mvn package '-DskipTests'
```

Run the JAR:

```powershell
java -jar target\hr-management-0.0.1-SNAPSHOT.jar --spring.profiles.active=local
```

On Windows, if `java` is not in PATH:

```powershell
& 'C:\Program Files\Java\jdk-17\bin\java.exe' -jar target\hr-management-0.0.1-SNAPSHOT.jar --spring.profiles.active=local
```

## 5. Application URLs

- Web UI: http://localhost:8080/
- Employee API: http://localhost:8080/api/employees
- H2 Console: http://localhost:8080/h2-console

H2 Console connection for local profile:

```text
JDBC URL: jdbc:h2:file:./data/hrdb
User Name: sa
Password: leave empty
```

When the database is empty, `data.sql` creates 50 deterministic seed records. Existing data is not seeded again.

## 6. Run backend tests

Use the test profile with H2 in-memory:

```powershell
mvn test '-Dspring.profiles.active=test'
```

The test profile runs `schema.sql` and `data.sql` against an isolated in-memory database.

## 7. Run Playwright E2E tests

Start the application first at `http://localhost:8080/`, then run:

```powershell
npm run e2e
```

Run with the browser UI:

```powershell
npm run e2e:ui
```

Run headed mode:

```powershell
npm run e2e:headed
```

Run against another server:

```powershell
$env:BASE_URL = 'http://localhost:8081'
npm run e2e
```

The E2E suite uses random employee codes and removes test records after execution.

## 8. Recommended validation sequence

```powershell
mvn test '-Dspring.profiles.active=test'
mvn package '-DskipTests'
npm run e2e
```

Expected results:

- Maven tests pass.
- Package succeeds.
- Playwright E2E tests pass.

## 9. Stop the local server

Find and stop the process listening on port 8080:

```powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force
}
```

Or stop Java processes when no other Java applications are running:

```powershell
Get-Process java | Stop-Process -Force
```

## 10. Troubleshooting

### Port 8080 is already in use

```powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen
```

Stop the owning process or run with another port:

```powershell
java -jar target\hr-management-0.0.1-SNAPSHOT.jar --server.port=8081 --spring.profiles.active=local
```

### Maven cannot be found

Use the absolute path to `mvn.cmd` or add Maven `bin` to PATH.

### Browser shows old frontend code

Restart the Spring Boot process after frontend changes. The packaged JAR/static resources may still contain the previous version.

### H2 file is locked

Stop all application Java processes before rebuilding or opening the database with another tool.

### E2E reports connection refused

Confirm that the application is running and that this URL responds:

```powershell
Invoke-WebRequest http://localhost:8080/ -UseBasicParsing
```
