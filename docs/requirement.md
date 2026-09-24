# HR Management MVP Requirements

## 1. Scope

Web application for internal Admin/HR users to manage employees through a Spring Boot REST API and static HTML/CSS/JavaScript UI.

## 2. Technology baseline

- Java 17, Spring Boot 3.x, Maven.
- Root package: `vn.tungxeng.hr`.
- Backend: REST JSON with Controller/Service/Repository/DTO layers.
- Frontend: vanilla HTML/CSS/JavaScript in `src/main/resources/static`.
- No Thymeleaf or server-side view rendering.
- H2 file mode for local/dev: `jdbc:h2:file:./data/hrdb;AUTO_SERVER=TRUE`.
- H2 in-memory for tests.

## 3. UI fields

The MVP UI exposes exactly six employee fields:

| Field | Required | Rules |
|---|---:|---|
| employeeCode | Yes | Unique, 3-20 chars, `^[A-Z0-9_-]+$` |
| fullName | Yes | 2-150 chars |
| gender | No | `MALE`, `FEMALE`, `OTHER` |
| dateOfBirth | No | `yyyy-MM-dd`, not future |
| phone | No | If provided: `^(\\+84|0)[0-9]{9,10}$` |
| email | No | Valid email, max 150 chars |

Backend-only fields may remain for persistence/extension but are not rendered or edited by the MVP UI.

## 4. Functional requirements

- List employees with pagination and sorting.
- Provide six independent search conditions matching the six UI fields.
- Text search uses case-insensitive contains; gender/date of birth use exact match.
- Combine active search conditions with AND.
- Text auto-search uses 300ms debounce; select/date search on change.
- Preserve search state in URL query parameters.
- Show `No employees found` for empty results.
- Add and edit through a modal.
- `employeeCode` and `fullName` are required client-side and server-side.
- Allow employee code update when the new code is unique.
- Close modal and refresh list after successful save.
- Delete with confirmation; MVP uses hard delete.
- View employee details.
- Export filtered results as UTF-8 BOM CSV.
- CSV with no matching data returns HTTP 200 with header only.
- Seed exactly 50 deterministic records through `data.sql` only when `employees` is empty.
- Do not seed demo data in production.

## 5. Security and quality

- Validate all user input server-side.
- Render API values with safe DOM APIs such as `textContent`; do not inject raw HTML.
- Restrict CORS to configured local frontend origins.
- Do not log full phone/email values.
- Disable Save while a create/update request is pending.
- Use Playwright E2E with random test codes and cleanup in `finally`.

## 6. Non-goals

Authentication, authorization, audit log, XLSX export, rate limiting, Docker deployment and cloud-specific deployment are outside MVP scope.
