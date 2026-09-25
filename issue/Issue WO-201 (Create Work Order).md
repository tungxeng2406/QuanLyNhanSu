Title: [FEAT]: WO-201 Create Work Order Domain Capabilities

### 1. Business Intent & Scope
- **Problem:** Operational managers need to create work orders for field service technicians.
- **In Scope:** Basic CRUD creation flow, client validation, status initialization (`DRAFT`).
- **Out of Scope:** Dispatching algorithms, third-party vendor sync.

### 2. Architectural Decomposition
- **UI Layer:**
  - Form Fields: `title` (text, required), `description` (text), `priority` (enum: LOW, MED, HIGH), `customer_id` (UUID).
  - Validation: Title minimum 5 chars; priority defaults to `MED`.
- **Data Layer:**
  - Table: `work_orders` (`id` UUID PRIMARY KEY, `title` VARCHAR(255), `priority` VARCHAR(20), `status` VARCHAR(20), `customer_id` UUID, `created_at` TIMESTAMPTZ).
  - PII Classification: Customer ID mapped as internal PII; requires sanitized audit logging.
- **API Layer:**
  - Endpoint: `POST /api/v1/work-orders`
  - Auth: OAuth2 Bearer Token (`scope: workorders:write`)
  - Status Codes: `201 Created`, `400 Bad Request`, `422 Unprocessable Entity`

### 3. Acceptance Criteria
- [ ] Given valid work order inputs, when posted to API, then persist record with status `DRAFT` and return HTTP 201.
- [ ] Given missing title field, return HTTP 422 with detail "title field required".
