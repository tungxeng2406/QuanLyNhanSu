# Contributing Guide

## 1. Branch and PR flow
- Tao branch theo mau: feature/<scope>, fix/<scope>, chore/<scope>.
- Moi PR phai link requirement IDs va testcase IDs.
- PR phai mo ta pham vi thay doi va tac dong.

## 2. Required checks before merge
- Build pass.
- Unit/integration tests pass.
- REST API tests pass (neu co thay doi BE endpoint) va FE tests pass (neu co thay doi FE flow).
- Coverage dat nguong toi thieu:
	- BE core package: line >= 90%, branch >= 85%.
	- Service + Controller: line >= 95%.
- Khong con bug Critical/High trong scope release.

## 3. CI quality gate
- Gate 1: Compile gate.
- Gate 2: Test gate.
- Gate 3: Coverage gate.
- Gate 4: Static analysis gate.
- Gate 5: Artifact gate (neu co release bundle).

## 4. Spec-first workflow
1. Write spec.
2. Human review spec.
3. Implement code against spec.
4. Tests assert spec.
5. Reconcile disagreements.

## 5. Ownership and decision matrix
| Tinh huong | Owner quyet dinh cuoi |
|---|---|
| Mau thuan nghiep vu | PM/BA |
| Mau thuan ky thuat | Tech Lead |
| Mau thuan test expectation | QA Lead |
| Muc do uu tien bug trong sprint | PM + Tech Lead |

## 6. Reconcile disagreements policy
- Neu code/test lech nhau:
	- Kiem tra spec truoc.
	- Neu spec dung: sua code/test.
	- Neu spec sai/thieu: cap nhat spec truoc, sau do sua code/test.
- Moi thay doi phai ghi log trong PR description.

## 7. Traceability required in PR
- Moi PR phai khai bao:
	- Requirement IDs (REQ-xxx)
	- Testcase IDs (FE-xxx/BE-xxx/DB-xxx)
	- Test classes/methods da cover

