# Coding-rule audit

Commit: 00ca6b15113b0761dd86667010ee120105d53653
Branch: main_thanhtung
Time: 2026-09-25T01:41:25.650Z

Scope: configured automated checks only. This is not full convention approval.
Manual review: complex JS functions, private Java contracts/fields, documentation
accuracy, meaningful comments, naming intent and documented exceptions.
Mapping: docs/coding-rules-automation.md. Functional tests run separately.

## java: violations

Scanned files: 18; findings: 60.

| File | Line | Rule | Finding |
|---|---:|---|---|
| src/main/java/vn/tungxeng/hr/config/CorsConfig.java | 8 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 24 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 31 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 35 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 46 | NeedBraces | 'if' construct must use '{}'s. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 53 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 58 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 63 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 68 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 74 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/controller/EmployeeController.java | 93 | NeedBraces | 'if' construct must use '{}'s. |
| src/main/java/vn/tungxeng/hr/dto/EmployeeListResponse.java | 5 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/dto/EmployeeRequest.java | 6 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/dto/EmployeeResponse.java | 6 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java | 6 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java | 14 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/entity/Employee.java | 6 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/entity/Employee.java | 34 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/exception/BusinessException.java | 3 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/exception/BusinessException.java | 4 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java | 18 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/exception/NotFoundException.java | 3 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/exception/NotFoundException.java | 4 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/HrApplication.java | 6 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/HrApplication.java | 8 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java | 9 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java | 10 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java | 11 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 10 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 11 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 13 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 14 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 15 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 16 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/EmployeeService.java | 17 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java | 23 | MissingJavadocType | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java | 29 | MissingJavadocMethod | Missing a Javadoc comment. |
| src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java | 99 | NeedBraces | 'if' construct must use '{}'s. |
| src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java | 100 | NeedBraces | 'if' construct must use '{}'s. |
| src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java | 127 | NeedBraces | 'if' construct must use '{}'s. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 14 | MissingJavadocType | Missing a Javadoc comment. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 26 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 31 | MethodName | Name 'DB_SEED_001_002_fiftyRowsAndIdempotency' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 32 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 33 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 35 | MethodName | Name 'DB_SEED_003_businessRowPreventsDemoSeed' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 37 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 39 | MethodName | Name 'DB_SCH_004_005_uniqueAndRequiredFields' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 49 | MethodName | Name 'DB_TXN_001_002_003_004_commitRollbackDeleteAndConflict' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 52 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 56 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java | 58 | OneStatementPerLine | Only one statement per line allowed. |
| src/test/java/vn/tungxeng/hr/EmployeeApiIntegrationTest.java | 15 | MissingJavadocType | Missing a Javadoc comment. |
| src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java | 21 | MissingJavadocType | Missing a Javadoc comment. |
| src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java | 30 | MethodName | Name 'BE_SVC_004_createTrimsAndSavesOnce' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java | 39 | MethodName | Name 'BE_SVC_005_duplicateDoesNotSave' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java | 46 | MethodName | Name 'BE_SVC_008_missingGetAndDelete' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java | 52 | MethodName | Name 'BE_SVC_009_csvEscapesUnicodeQuotesAndNulls' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java | 59 | MethodName | Name 'BE_SVC_010_emptyCsv' must match pattern '^[a-z][a-zA-Z0-9]*$'. |
| src/test/java/vn/tungxeng/hr/HrApplicationSmokeTest.java | 11 | MissingJavadocType | Missing a Javadoc comment. |

Scanned files:

- src/main/java/vn/tungxeng/hr/config/CorsConfig.java
- src/main/java/vn/tungxeng/hr/controller/EmployeeController.java
- src/main/java/vn/tungxeng/hr/dto/EmployeeListResponse.java
- src/main/java/vn/tungxeng/hr/dto/EmployeeRequest.java
- src/main/java/vn/tungxeng/hr/dto/EmployeeResponse.java
- src/main/java/vn/tungxeng/hr/dto/ErrorResponse.java
- src/main/java/vn/tungxeng/hr/entity/Employee.java
- src/main/java/vn/tungxeng/hr/exception/BusinessException.java
- src/main/java/vn/tungxeng/hr/exception/GlobalExceptionHandler.java
- src/main/java/vn/tungxeng/hr/exception/NotFoundException.java
- src/main/java/vn/tungxeng/hr/HrApplication.java
- src/main/java/vn/tungxeng/hr/repository/EmployeeRepository.java
- src/main/java/vn/tungxeng/hr/service/EmployeeService.java
- src/main/java/vn/tungxeng/hr/service/impl/EmployeeServiceImpl.java
- src/test/java/vn/tungxeng/hr/DatabaseIntegrationTest.java
- src/test/java/vn/tungxeng/hr/EmployeeApiIntegrationTest.java
- src/test/java/vn/tungxeng/hr/EmployeeServiceUnitTest.java
- src/test/java/vn/tungxeng/hr/HrApplicationSmokeTest.java

## javascript: violations

Scanned files: 11; findings: 113.

| File | Line | Rule | Finding |
|---|---:|---|---|
| scripts/check-coding-rules.cjs | 76 | max-len | This line has a length of 136. Maximum allowed is 100. |
| e2e/all-cases.spec.js | 2 | max-len | This line has a length of 102. Maximum allowed is 100. |
| e2e/all-cases.spec.js | 75 | max-len | This line has a length of 123. Maximum allowed is 100. |
| e2e/all-cases.spec.js | 100 | max-len | This line has a length of 102. Maximum allowed is 100. |
| e2e/employee.helpers.js | 3 | jsdoc/require-jsdoc | Missing JSDoc comment. |
| e2e/employee.helpers.js | 16 | jsdoc/require-jsdoc | Missing JSDoc comment. |
| e2e/employee.helpers.js | 22 | jsdoc/require-jsdoc | Missing JSDoc comment. |
| e2e/employee.helpers.js | 23 | curly | Expected { after 'if' condition. |
| e2e/employee.helpers.js | 28 | jsdoc/require-jsdoc | Missing JSDoc comment. |
| e2e/employee.spec.js | 2 | max-len | This line has a length of 102. Maximum allowed is 100. |
| e2e/employee.spec.js | 71 | max-len | This line has a length of 112. Maximum allowed is 100. |
| e2e/employee.spec.js | 97 | max-len | This line has a length of 102. Maximum allowed is 100. |
| e2e/employee.spec.js | 112 | max-len | This line has a length of 101. Maximum allowed is 100. |
| e2e/items-csv.spec.js | 4 | max-len | This line has a length of 147. Maximum allowed is 100. |
| e2e/items-csv.spec.js | 9 | max-len | This line has a length of 103. Maximum allowed is 100. |
| e2e/items-csv.spec.js | 13 | max-len | This line has a length of 161. Maximum allowed is 100. |
| playwright.config.js | 11 | max-len | This line has a length of 107. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 1 | max-len | This line has a length of 102. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 14 | curly | Expected { after 'for-of'. |
| scripts/phase5-report.cjs | 16 | max-len | This line has a length of 101. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 17 | max-len | This line has a length of 109. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 19 | max-len | This line has a length of 156. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 20 | max-len | This line has a length of 276. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 21 | max-len | This line has a length of 383. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 25 | max-len | This line has a length of 102. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 33 | max-len | This line has a length of 112. Maximum allowed is 100. |
| scripts/phase5-report.cjs | 38 | max-len | This line has a length of 2542. Maximum allowed is 100. |
| src/main/resources/static/app.js | 31 | max-len | This line has a length of 123. Maximum allowed is 100. |
| src/main/resources/static/app.js | 33 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 46 | max-len | This line has a length of 194. Maximum allowed is 100. |
| src/main/resources/static/app.js | 49 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 62 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 63 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 68 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 86 | max-len | This line has a length of 253. Maximum allowed is 100. |
| src/main/resources/static/app.js | 115 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 115 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 123 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 123 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 130 | max-len | This line has a length of 135. Maximum allowed is 100. |
| src/main/resources/static/app.js | 136 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 136 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 139 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 139 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 156 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 159 | max-len | This line has a length of 253. Maximum allowed is 100. |
| src/main/resources/static/app.js | 164 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 170 | max-len | This line has a length of 218. Maximum allowed is 100. |
| src/main/resources/static/app.js | 172 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 186 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 188 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 188 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 196 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 196 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 197 | max-len | This line has a length of 137. Maximum allowed is 100. |
| src/main/resources/static/app.js | 200 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 200 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 204 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 204 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 206 | max-len | This line has a length of 123. Maximum allowed is 100. |
| src/main/resources/static/app.js | 206 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 206 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 207 | max-len | This line has a length of 324. Maximum allowed is 100. |
| src/main/resources/static/app.js | 207 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 207 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 211 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 211 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 211 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 212 | max-len | This line has a length of 120. Maximum allowed is 100. |
| src/main/resources/static/app.js | 212 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 212 | curly | Expected { after 'if' condition. |
| src/main/resources/static/app.js | 212 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 214 | max-len | This line has a length of 112. Maximum allowed is 100. |
| src/main/resources/static/app.js | 214 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 214 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/app.js | 215 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/app.js | 215 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/items-csv.js | 12 | one-var | Split 'let' declarations into multiple statements. |
| src/main/resources/static/items-csv.js | 16 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/items-csv.js | 16 | brace-style | Closing curly brace does not appear on the same line as the subsequent block. |
| src/main/resources/static/items-csv.js | 16 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/items-csv.js | 17 | brace-style | Statement inside of curly braces should be on next line. |
| src/main/resources/static/items-csv.js | 17 | brace-style | Closing curly brace does not appear on the same line as the subsequent block. |
| src/main/resources/static/items-csv.js | 17 | brace-style | Closing curly brace should be on the same line as opening curly brace or on the line after the previous block. |
| src/main/resources/static/items-csv.js | 18 | curly | Expected { after 'else'. |
| src/main/resources/static/items-csv.js | 22 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 24 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 26 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 28 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 32 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 34 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 40 | max-len | This line has a length of 140. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 40 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 43 | max-len | This line has a length of 105. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 52 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 54 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 55 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 59 | max-len | This line has a length of 118. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 61 | max-len | This line has a length of 134. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 61 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 62 | max-len | This line has a length of 104. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 65 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 66 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 69 | max-len | This line has a length of 109. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 69 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 71 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 77 | max-len | This line has a length of 157. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 77 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 82 | max-len | This line has a length of 108. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 82 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 100 | max-len | This line has a length of 229. Maximum allowed is 100. |
| src/main/resources/static/items-csv.js | 113 | curly | Expected { after 'if' condition. |
| src/main/resources/static/items-csv.js | 116 | max-len | This line has a length of 132. Maximum allowed is 100. |

Scanned files:

- eslint.config.cjs
- scripts/check-coding-rules.cjs
- scripts/coding-report.cjs
- e2e/all-cases.spec.js
- e2e/employee.helpers.js
- e2e/employee.spec.js
- e2e/items-csv.spec.js
- playwright.config.js
- scripts/phase5-report.cjs
- src/main/resources/static/app.js
- src/main/resources/static/items-csv.js
