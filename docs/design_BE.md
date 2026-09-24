# Backend Design

## Architecture

`Controller -> Service -> Repository -> H2`

- Controller handles HTTP, validation binding and response status.
- Service owns business rules, specifications, mapping and CSV generation.
- Repository uses Spring Data JPA and specifications.
- DTOs isolate API contracts from entities.
- `@RestControllerAdvice` returns standardized JSON errors.

## Package structure

```text
vn.tungxeng.hr
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
└── service
    └── impl
```

## Startup and profiles

- `local`: H2 file mode, schema/data SQL, H2 Console enabled.
- `test`: H2 in-memory, schema/data SQL, deterministic fixtures.
- `data.sql` is the only demo seed mechanism and is idempotent.
- Production must use a profile without demo seed.

## Search implementation

Service builds a JPA Specification from six optional criteria. Text fields use lower-case contains predicates; gender/date of birth use equality predicates. Predicates combine with AND. Pageable controls pagination and sort.

## Validation and errors

DTO validation handles required fields, length, email, phone, date and code format. Service handles uniqueness and not-found rules. Error handler maps validation to 400, duplicate code to 409, missing records to 404 and unexpected failures to 500.
