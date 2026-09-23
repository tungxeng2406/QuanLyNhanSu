HANDS-ON LAB GUIDE — UNIT 1.1
Lab 1.1 — Scaffold the Sample Repository

| 📌 Lab Overview & Goal | In this hands-on lab, you will set up a professional, AI-ready GitHub repository structure. A structured repository acts as essential context for GitHub Copilot and AI agents. By enforcing templates, explicit governance rules, and standardized scaffolding, you ensure that both humans and AI collaborators operate safely and effectively within the team. |
| --- | --- |
| **Target Audience:** | Software Developers, Tech Leads, DevOps Engineers |
| **Prerequisites:** | Empty GitHub Repository + GitHub Copilot enabled; Git installed locally |
| **Definition of Done:** | A teammate can open an Issue or PR without asking 'Where do I write this?' |

## Task 1: Create the Folder Structure
Initialize your local environment and set up a standardized directory tree that separates documentation, source code, test suites, and GitHub configuration templates.

### 1.1 Recommended Tree Layout
```text
repo/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature_request.md
│   │   ├── bug_report.md
│   │   └── spike_investigation.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
├── docs/
│   ├── domain-model.md
│   ├── api-spec.md
│   └── coding-rules.md
├── src/
├── tests/
│   ├── unit/
│   └── integration/
├── scripts/
├── README.md
└── CONTRIBUTING.md
```

### 1.2 Execution Commands
```bash
# Terminal Commands (Bash / Zsh)
mkdir -p .github/ISSUE_TEMPLATE .github/workflows docs src tests/unit tests/integration scripts
touch README.md CONTRIBUTING.md .github/PULL_REQUEST_TEMPLATE.md
touch docs/domain-model.md docs/api-spec.md docs/coding-rules.md
```

---

## Task 2: Write README.md
Create a comprehensive entry-point document (`README.md`) that outlines project goals, tech stack specifications, build steps, and developer instructions.

### 2.1 Template Content for README.md
```markdown
# AI-Native Core Service

## 1. Project Purpose
This repository serves as the baseline foundation for the Core Service API. It is architected under the AI-Native SDLC paradigm, utilizing GitHub Copilot for spec-driven generation and gated quality verification.

## 2. Technology Stack & Prerequisites
- **Language / Runtime:** Python 3.11+ / Node.js 20+ / .NET 8 / Java 21 / C++20 (Select your project primary stack)
- **Framework:** REST API (FastAPI / Express / ASP.NET Core / Spring Boot)
- **Database:** PostgreSQL 16
- **Tooling:** Docker, GitHub Copilot Extension, PyTest / Jest

## 3. Getting Started & How to Run
```bash
# Step 1: Clone the repository
git clone https://github.com/your-org/ai-native-core.git
cd ai-native-core

# Step 2: Install dependencies
pip install -r requirements.txt  # or npm install / dotnet restore

# Step 3: Run local developer server
python src/main.py               # or npm start / dotnet run
```

## 4. Repository Governance
- All feature additions must originate from an approved GitHub Issue.
- AI-generated code must strictly pass unit tests and human peer review before merging.
```

---

## Task 3: Write CONTRIBUTING.md
Define team collaboration standards, branching strategies, commit conventions, and mandatory human-in-the-loop AI safety rules in `CONTRIBUTING.md`.

### 3.1 Template Content for CONTRIBUTING.md
```markdown
# Developer Contribution Guidelines

Welcome! To maintain code quality and safety when working alongside AI collaborators, please strictly follow these rules:

## 1. Branch Naming Conventions
- Features: `feature/WO-<issue_id>-<short-description>`
- Bug Fixes: `fix/WO-<issue_id>-<short-description>`
- Spikes / Research: `spike/WO-<issue_id>-<short-description>`

## 2. Pull Request Rules
1. Never push code directly to `main` or `develop`.
2. Every PR must map to an active GitHub Issue.
3. Automated CI checks (tests, linter, secret scanner) must pass completely.
4. Requires at least one approval from a human Tech Lead / Peer Reviewer.

## 3. Mandatory AI Output Policy ("AI Output Must Be Reviewed")
- **Untrusted Code Policy:** All code produced or suggested by GitHub Copilot/AI tools is classified as **UNTRUSTED** until verified by a human developer.
- **Zero Hallucinations:** Verify that imported packages, internal API calls, and logic exist and conform to domain models.
- **No Secrets in Prompts:** Do NOT include production keys, database credentials, or proprietary client data in Copilot prompts or repo files.
```

---

## Task 4: Add Issue Templates
Configure standard markdown templates inside `.github/ISSUE_TEMPLATE/` to ensure issues are clear and structured before AI generation begins.

### 4.1 Feature Request Template (`.github/ISSUE_TEMPLATE/feature_request.md`)
```markdown
---
name: Feature Request
about: Propose a new feature or architectural enhancement
title: '[FEATURE] '
labels: 'enhancement'
assignees: ''
---

### 1. Problem Statement & User Value
Describe the user need or problem this feature solves.

### 2. Scope & Technical Requirements
- [ ] Requirement 1
- [ ] Requirement 2

### 3. Non-Goals
Specify what is explicitly out of scope for this task.

### 4. Acceptance Criteria
- [ ] Given X, when Y, then Z.
- [ ] Unit test coverage >= 80%.
```

### 4.2 Bug Report Template (`.github/ISSUE_TEMPLATE/bug_report.md`)
```markdown
---
name: Bug Report
about: Report a bug or unintended system behavior
title: '[BUG] '
labels: 'bug'
assignees: ''
---

### 1. Problem Description
Clear, concise explanation of the defect.

### 2. Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. See error

### 3. Expected vs Actual Behavior
- **Expected:** System should respond with HTTP 200.
- **Actual:** System crashes with HTTP 500 NullPointerException.

### 4. Root Cause Analysis (RCA) Link / Notes
Provide links to logs or initial RCA notes.
```

### 4.3 Spike Template (`.github/ISSUE_TEMPLATE/spike_investigation.md`)
```markdown
---
name: Spike Investigation
about: Time-boxed research or technical feasibility study
title: '[SPIKE] '
labels: 'spike'
assignees: ''
---

### 1. Objective
What technical uncertainty or architectural question are we answering?

### 2. Timebox Limit
- [ ] Max Hours Allowed: 4 Hours / 8 Hours

### 3. Deliverables
- [ ] Architecture Decision Record (ADR) or summary in `/docs`.
```

---

## Task 5: Add PULL_REQUEST_TEMPLATE.md
Create `.github/PULL_REQUEST_TEMPLATE.md` to force explicit disclosure of AI usage, verification procedures, and security checks during pull request submission.

### 5.1 Template Content for PR Template
```markdown
## 1. Specification Link
Closes #<Issue_Number> | Spec Document: [link to doc/spec]

## 2. Summary of Changes
- Implemented feature X using framework Y.
- Refactored component Z.

## 3. Test Plan & Proof
- [ ] Unit tests added and passing locally.
- [ ] Integration test log attached below:
```text
[Paste test output here]
```

## 4. AI Usage Disclosure
- [ ] **No AI used**
- [ ] **AI-Assisted:** GitHub Copilot used for boilerplate, unit tests, or function autocomplete.
- [ ] **Human Verification:** All AI-generated logic has been read, verified, and tested line-by-line.

## 5. Security Checklist
- [ ] No hardcoded secrets, API keys, or credentials.
- [ ] Input validation applied to all public endpoints.

## 6. Pre-Merge Checklist
- [ ] Branch is up to date with `develop`/`main`.
- [ ] Documentation updated (`README.md` or `/docs`).
```

---

## Task 6: Create Branch & Open Pull Request
Package all scaffolding changes into a dedicated Git branch and issue a pull request following your newly instituted rules.

### 6.1 Step-by-Step Git Commands
```bash
# Step 1: Create and switch to scaffolding feature branch
git checkout -b feature/WO-101-scaffold

# Step 2: Stage all new directories and template files
git add .

# Step 3: Commit with standard descriptive message
git commit -m "feat(scaffold): initialize AI-native repo structure and github templates"

# Step 4: Push branch to origin
git push -u origin feature/WO-101-scaffold

# Step 5: Open PR on GitHub website using PULL_REQUEST_TEMPLATE.md
```

---

## Verification & Definition of Done

| ✅ Definition of Done Criteria |
| --- |
| 1. Repository contains clean `/docs`, `/src`, `/tests`, `/scripts`, and `.github` folders. |
| 2. Issue templates (Feature, Bug, Spike) appear automatically when clicking 'New Issue'. |
| 3. PR Template auto-populates when opening a PR from `feature/WO-101-scaffold`. |
| 4. A teammate can join the repo and immediately create an Issue or PR without asking where or how to write it. |