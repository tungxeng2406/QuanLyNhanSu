HANDS-ON LAB GUIDE — UNIT 1.2
Lab 1.2 — Hands-on Collaboration Infrastructure

| 📌 Lab Overview & Goal | Transition from repository scaffolding to an operational, repeatable intake process. In this lab, you will author strict Issue and PR templates embedded with AI governance checklists, enforce GitHub Copilot content exclusion policies, construct a fully decomposed ticket (WO-201) across UI/Data/API boundaries, leverage Copilot to draft domain documentation, and open a documentation-only Pull Request. | 
 | ----- | ----- | 
| **Target Audience:** | Software Developers, Technical Leads, DevEx Engineers | 
| **Prerequisites:** | Completed Lab 1.1 (or initialized sample repo) + GitHub Copilot enabled | 
| **Definition of Done:** | PR opened containing ONLY spec docs & templates; passes Definition of Ready (DoR) | 

## Section 1: Theory & Core Concepts

| Concept / Principle | Practical Rule for AI SDLC | 
 | ----- | ----- | 
| **From Structure to Process** | Templates act as executable policy: if an item is not on the checklist, AI and humans will skip it. | 
| **Requirement Decomposition** | For every feature, explicitly split UI / Data / API. Never let Copilot invent a 4th layer or extra DBs. | 
| **Issue & PR Template Design** | Force In/Out scope, Gherkin-lite testability, AI stack constraints, prompt disclosure, and OWASP risk checks. | 
| **Copilot Configuration** | Enforce content exclusions (`.copilotignore`), workspace trust, and comment-driven generation discipline. | 
| **Definition of Ready (DoR)** | A ticket is Ready ONLY when UI/Data/API split, testable criteria, non-goals, security, and target files are stated. | 

## Section 2: Practical Lab Exercises

### Step 1: Initialize / Verify Sample Repository
Ensure your local workspace is clean and on a dedicated branch before configuring collaboration infrastructure.

```bash
# Verify branch status and workspace readiness
git checkout main
git pull origin main
git checkout -b feature/WO-201-infrastructure-setup
```

### Step 2: Author Issue & PR Templates with AI Checklists
Update `.github/ISSUE_TEMPLATE/feature_request.md` to force requirement decomposition and AI constraints.

```markdown
---
name: AI-Native Feature Request
about: Standard template enforcing UI/Data/API split and AI constraints
title: '[FEAT]: '
labels: 'enhancement, pending-dor'
---

### 1. Business Intent & Scope
- **Problem Statement:**
- **In Scope:**
- **Out of Scope (Non-Goals):**

### 2. Architectural Decomposition
- **UI Layer:** (Screens, input fields, validation rules, error states)
- **Data Layer:** (Entities, schema changes, constraints, PII classification)
- **API Layer:** (REST endpoints, HTTP verbs, payload specs, status codes, authz)

### 3. AI Copilot Execution Constraints
- **Target Tech Stack:** Python 3.11 / FastAPI / Pydantic v2 / PostgreSQL
- **Allowed Directory Scope:** `src/modules/work_orders/`, `tests/unit/`
- **Dependency Guardrail:** Do NOT introduce external third-party dependencies without architectural review.

### 4. Acceptance Criteria (Gherkin-lite)
- [ ] **Given** an authenticated user, **When** submitting valid WO payload, **Then** return HTTP 201 Created.
- [ ] **Given** invalid PII inputs, **When** submitting, **Then** return HTTP 422 with field-level validation errors.

### 5. Definition of Ready (DoR) Checklist
- [ ] UI/Data/API split strictly defined.
- [ ] Non-goals explicitly declared.
- [ ] PII & Security classification stated.
```

Next, update `.github/PULL_REQUEST_TEMPLATE.md` to include prompt disclosure, verification steps, and security checklists.

```markdown
## 1. Traceability
- **Issue Linked:** Closes #WO-201
- **Spec Path:** `docs/work-order-decomposition.md`

## 2. AI Usage Disclosure & Provenance
- [ ] **AI Tools Used:** GitHub Copilot Chat / Inline Autocomplete
- [ ] **Prompts / Context Provided:** Listed spec file `docs/work-order-decomposition.md` as context.
- [ ] **Modified Files Summary:**
  - Generated files: `docs/work-order-decomposition.md`
  - Hand-written files: `.github/copilot-ignore`

## 3. Verification & Evidence
- [ ] Unit tests added / updated.
- [ ] Linter & static analysis pass without warnings.
- [ ] Spec review completed against domain guidelines.

## 4. Risk & Security Checklist
- [ ] Secrets Scan: No hardcoded credentials or API keys in code or prompt logs.
- [ ] OWASP Check: Input parameters sanitized; authorization checks verified.
- [ ] Rollback Plan: Pure documentation PR (Zero runtime impact).
```

### Step 3: Create Issue WO-201 (Create Work Order)
Simulate real-world backlog intake by creating Issue **WO-201** with full UI/Data/API decomposition based on the Definition of Ready (DoR).

```markdown
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
```

### Step 4: Configure Copilot Content Exclusion
Configure content exclusions to ensure sensitive environment credentials, key stores, and proprietary vendor dumps are excluded from Copilot prompt contexts.

```bash
# Create local .copilotignore in repository root
touch .copilotignore

# Add sensitive path exclusions to .copilotignore
echo ".env*" >> .copilotignore
echo "secrets/" >> .copilotignore
echo "*.pem" >> .copilotignore
echo "vendor/proprietary/" >> .copilotignore

# Also enforce in standard .gitignore
echo ".env" >> .gitignore
echo "bin/" >> .gitignore
echo "node_modules/" >> .gitignore
```

### Step 5: Use Copilot to Draft docs/work-order-decomposition.md & Human-Edit
Exercise comment-driven generation in Copilot Chat or inline prompts to generate the domain spec, then perform mandatory human verification.

````markdown
<!-- Instruction for Copilot Chat / Prompts:
"Generate a Markdown technical design document for docs/work-order-decomposition.md based on Issue WO-201. Include UI validation tables, PostgreSQL DDL schema, and REST API payload contracts."
-->

# Technical Specification: Work Order Domain (WO-201)

## 1. UI Validation Matrix

| Field Name | Type | Required | Rules / Constraints |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Min 5 chars, Max 255 chars |
| `description` | String | No | Max 2000 chars |
| `priority` | Enum | Yes | Default: `MED` (`LOW`, `MED`, `HIGH`, `CRITICAL`) |
| `customer_id` | UUID | Yes | Must reference valid Active Customer |

## 2. Data Schema (PostgreSQL)

```sql
CREATE TABLE work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL DEFAULT 'MED',
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    customer_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_priority CHECK (priority IN ('LOW', 'MED', 'HIGH', 'CRITICAL'))
);
```

## 3. REST API Contract

**Request Header:** `Authorization: Bearer <token>`  
**POST** `/api/v1/work-orders`

**Request Body:**
```json
{
  "title": "HVAC Repair Unit 4",
  "description": "System reporting error code E-42",
  "priority": "HIGH",
  "customer_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
}
```

**Response Body (HTTP 201 Created):**
```json
{
  "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
  "status": "DRAFT",
  "created_at": "2026-08-30T10:00:00Z"
}
```
````

### Step 6: Open Documentation-Only Pull Request
Commit your updated templates, exclusion configurations, and spec documentation. Submit a Pull Request verifying that zero runtime code was introduced.

```bash
# Stage documentation and configuration files only
git add .github/ .copilotignore .gitignore docs/work-order-decomposition.md

# Verify staged files (Ensure NO application code in src/ or bin/ is staged)
git status

# Commit with structured scope
git commit -m "docs(wo-201): define work order decomposition spec and governance templates"

# Push branch and open Pull Request
git push -u origin feature/WO-201-infrastructure-setup
```

## Verification & Definition of Done

| ✅ Definition of Done (DoD) Criteria | 
 | ----- | 
| 1. Issue WO-201 exists and strictly satisfies all 5 rules of the Definition of Ready (DoR). | 
| 2. `.copilotignore` exists in the repository root and excludes sensitive patterns (`.env*`, secrets, keys). | 
| 3. `docs/work-order-decomposition.md` exists and contains verified UI, SQL, and API REST contracts. | 
| 4. Pull Request is open with the new PR Template auto-populated, disclosure completed, and contains ZERO application code (`src/`). | 