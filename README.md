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

### Test

```powershell
mvn test -Dspring.profiles.active=test
```

The `test` profile uses an in-memory H2 database and runs `schema.sql` plus `data.sql`,
which creates the same deterministic 50 records.
