# STANDARD

## JavaScript Coding Convention

> Project applicability: this standard is mandatory for project-owned JavaScript source, tests, helpers and scripts, including `.js`, `.cjs` and `.mjs`. Apply it together with the [Java standard](java-coding-rules.md) for Java files and the [project adaptations and acceptance gates](../docs/coding-rules.md#mandatory-java-and-javascript-conventions). Preserve each file's browser/Node runtime and documented module format; examples are not a migration instruction. Documentation updates alone do not certify source compliance.

| Code | STD-JS-01 | 
 | ----- | ----- | 
| **Version** | 1.0 | 
| **Effective date** | 15/08/2026 | 

## TABLE OF CONTENTS

* [INTRODUCTION](#introduction)
  * [Purpose](#purpose)
  * [Application Scope](#application-scope)
  * [Related Documents](#related-documents)
  * [Definition](#definition)
* [GENERAL RULES](#general-rules)
  * [Simple – Precise](#simple--precise)
  * [Violations of Standard Rules](#violations-of-standard-rules)
* [PROGRAM STRUCTURE](#program-structure)
  * [File Suffixes](#file-suffixes)
  * [Common File Names](#common-file-names)
* [FILE ORGANIZATION](#file-organization)
  * [JavaScript Source Files](#javascript-source-files)
* [INDENTATION AND BRACES](#indentation-and-braces)
  * [Tab and Indent](#tab-and-indent)
  * [Braces](#braces)
  * [Line Length](#line-length)
  * [Wrapping Lines](#wrapping-lines)
* [COMMENTS](#comments)
  * [Implementation Comment Formats](#implementation-comment-formats)
  * [JSDoc Comments](#jsdoc-comments)
* [DECLARATIONS](#declarations)
  * [Variable Declarations (const, let, var)](#variable-declarations-const-let-var)
  * [Number Per Line](#number-per-line)
  * [Initialization](#initialization)
  * [Placement](#placement)
  * [Class and Function Declarations](#class-and-function-declarations)
* [STATEMENTS](#statements)
  * [Simple Statements](#simple-statements)
  * [Compound Statements](#compound-statements)
  * [Return Statements](#return-statements)
  * [if, if-else, ternary Statements](#if-if-else-ternary-statements)
  * [for, for...of, for...in Statements](#for-forof-forin-statements)
  * [While and Do-While Statements](#while-and-do-while-statements)
  * [Switch Statements](#switch-statements)
  * [Try-Catch-Finally Statements](#try-catch-finally-statements)
* [WHITE SPACE](#white-space)
  * [Blank Lines](#blank-lines)
  * [Blank Spaces](#blank-spaces)
* [NAMING CONVENTIONS](#naming-conventions)
  * [General Rules](#general-rules-1)
  * [Variables and Functions](#variables-and-functions)
  * [Classes and Components](#classes-and-components)
  * [Constants](#constants)
  * [Modules and Packages](#modules-and-packages)
* [PROGRAMMING PRACTICES](#programming-practices)
  * [Equality and Coercion](#equality-and-coercion)
  * [Objects and Arrays](#objects-and-arrays)
  * [Destructuring and Spread Operator](#destructuring-and-spread-operator)
  * [Async Programming (Promises and Async/Await)](#async-programming-promises-and-asyncawait)
  * [Modules (ESM vs CommonJS)](#modules-esm-vs-commonjs)
  * [Error Handling](#error-handling)
  * [Loggings](#loggings)
  * [Performance Practices](#performance-practices)
  * [Miscellaneous Practices](#miscellaneous-practices)
* [CODE EXAMPLES](#code-examples)
  * [JavaScript Source File Example](#javascript-source-file-example)

## INTRODUCTION

### Purpose

Code conventions are critical to software engineering for the following reasons:

* **80% of the lifetime cost** of a piece of software goes toward maintenance.
* Hardly any software is maintained for its whole life by the original author.
* JavaScript's dynamic and weakly typed nature makes consistent formatting and clear conventions essential to avoid common runtime errors, type coercion issues, and logic pitfalls.
* Code conventions improve the readability of software, allowing team members to onboard faster, collaborate smoothly, and review code effectively.
* Source code shipped as an enterprise product must maintain a clean, standardized structure.

### Application Scope

This document applies to all JavaScript projects (Node.js, Browser-based Applications, and Web Frameworks such as React, Vue, or Angular) within the organization.

### Related Documents

| No. | Code | Name of documents | 
 | ----- | ----- | ----- | 
| 1 | ECMA-262 | ECMAScript Language Specification (https://tc39.es/ecma262/) | 
| 2 | Airbnb JS Guide | Airbnb JavaScript Style Guide (https://github.com/airbnb/javascript) | 
| 3 | MDN Web Docs | Mozilla Developer Network JavaScript Reference | 

### Definition

| Terminology | Explanation | 
 | ----- | ----- | 
| **ES6 / ES2015+** | ECMAScript 2015 and subsequent yearly specifications of modern JavaScript. | 
| **JSDoc** | A markup language used to annotate JavaScript source code files. | 
| **ESM** | ECMAScript Modules (`import` / `export` syntax). | 
| **CJS** | CommonJS Module system (`require` / `module.exports`). | 
| **ASI** | Automatic Semicolon Insertion performed by JavaScript engines. | 

## GENERAL RULES

### Simple – Precise

* **Keep your code simple and comprehensible.** Write code for humans first, compilers second.
* **Be precise and consistent:** Inconsistent formatting, improper use of scope keywords (`let`/`const`/`var`), or ambiguous naming erodes trust in program reliability.
* **Don’t optimize prematurely:** Unless performing massive loop operations, deep DOM manipulations, or processing huge datasets, prioritize clean readability. Benchmark under profilers before optimizing.

### Violations of Standard Rules

* No standard can cover every edge case. Violations are permissible if they substantially increase clarity and maintainability.
* **When breaking a standard, document it.** State the exact reason for the exception, potential side effects, and refactoring prerequisites.
* Projects may adapt or customize this convention document to satisfy client-specific requirements.

## PROGRAM STRUCTURE

### File Suffixes

JavaScript development utilizes the following standard file extensions:

| File Type | Extension | 
 | ----- | ----- | 
| JavaScript Source File | `.js` | 
| ECMAScript Module File | `.mjs` | 
| CommonJS File | `.cjs` | 
| JSX (React Component) | `.jsx` | 

### Common File Names

| File Name | Use | 
 | ----- | ----- | 
| `index.js` | Main entry point for a package, directory, or module. | 
| `README.md` | Summary document describing directory or package capabilities. | 
| `.eslintrc.json` | Linter configuration file enforcing these coding conventions. | 
| `.prettierrc` | Automated code formatting configuration file. | 

## FILE ORGANIZATION

A JavaScript source file should not exceed **400 lines of code**. Files exceeding this length should be refactored into smaller, modular components or utility functions.

### JavaScript Source Files

Each JavaScript file should serve a single responsibility (e.g., export one class, a set of closely related utility functions, or a single module).

JavaScript source files follow this top-to-bottom layout:

1. File/License Header Comments (if required)
2. Import Statements (`import` / `require`)
3. Type / JSDoc Type Definitions
4. Constants and Configuration
5. Main Export (Class, Function, or Object)
6. Helper/Internal Functions (Private to module)

#### Import Organization Order

Imports must be grouped and separated by a single blank line in the following order:

1. Third-party core/external dependencies (e.g., `react`, `express`, `lodash`)
2. Internal absolute imports / Alias paths (e.g., `@/components/Button`)
3. Relative path imports (e.g., `./utils`, `../models/User`)
4. Style imports or asset imports (e.g., `./styles.css`)

```javascript
// 1. External dependencies
import express from 'express';
import lodash from 'lodash';

// 2. Internal alias imports
import { DatabaseService } from '@/services/database';

// 3. Relative imports
import { validateUserInput } from './validators';
import { USER_ROLES } from '../constants';

// 4. Styles
import './styles.css';
```

## INDENTATION AND BRACES

### Tab and Indent

* **2 spaces** must be used as the unit of indentation. Do not use hard Tab characters (`\t`).
* Configure your IDE to convert Tabs to 2 Spaces automatically.

### Braces

* Open curly braces `{` MUST be placed on the **same line** (1TBS / One True Brace Style) as the statement/class/function declaration.
* Close curly braces `}` MUST be aligned with the start of the initiating statement.

```javascript
// CORRECT (1TBS)
function calculateTotal(items) {
  if (!items) {
    return 0;
  }
}

// INCORRECT (Allman style - AVOID in JavaScript)
function calculateTotal(items) 
{
  if (!items) 
  {
    return 0;
  }
}
```

### Line Length

* Limit lines to **80 to 100 characters**.
* Long strings, complex conditionals, or method chains should be broken into multiple lines.

### Wrapping Lines

* Break lines **after an operator** or **after a comma**.
* Align continuation lines with 2 levels of indent (4 spaces) or line up with the target bracket.

```javascript
// Wrapping function calls
const totalCost = calculateInvoiceTotal(
  customerAccountBalance,
  taxCalculationRate,
  shippingAndHandlingFee
);

// Wrapping ternary operations
const status = isUserAuthenticated && isAccountActive
  ? 'ACCESS_GRANTED'
  : 'ACCESS_DENIED';
```

## COMMENTS

### Implementation Comment Formats

JavaScript supports single-line (`//`) and block (`/* ... */`) implementation comments.

#### Block Comments

Use block comments for module explanations, algorithm descriptions, or multi-line notes.

```javascript
/*
 * The Authentication Manager handles JWT validation,
 * session storage synchronization, and auto-refresh mechanisms.
 */
class AuthManager {
  // ...
}
```

#### Single-Line Comments

Use single-line comments above the line being explained, indented at the same level.

```javascript
// Ensure user payload is sanitized before DB insertion
const cleanPayload = sanitizeInput(userPayload);
```

#### Inline / Trailing Comments

Avoid inline comments on the same line as code unless describing variable purpose briefly.

```javascript
const RETRY_LIMIT = 3; // Maximum retry attempts before throwing NetworkError
```

### JSDoc Comments

All exported functions, classes, and complex methods must have JSDoc annotations.

```javascript
/**
 * Calculates the total price including tax and discounts.
 *
 * @param {number} basePrice - The initial price before adjustments.
 * @param {number} [taxRate=0.1] - Optional tax rate multiplier.
 * @returns {number} The computed final price.
 * @throws {TypeError} If basePrice is not a valid number.
 */
export function calculateFinalPrice(basePrice, taxRate = 0.1) {
  if (typeof basePrice !== 'number') {
    throw new TypeError('basePrice must be a valid number');
  }
  return basePrice + (basePrice * taxRate);
}
```

## DECLARATIONS

### Variable Declarations (const, let, var)

* **NEVER use `var`**.
* Use **`const`** for all variable declarations by default.
* Use **`let`** only if the variable's reference will be reassigned later.

```javascript
// INCORRECT
var total = 100;

// CORRECT
const maxLimit = 50;
let currentCount = 0;
currentCount += 10;
```

### Number Per Line

Declare one variable per statement line. Do not use single-line multi-variable declarations.

```javascript
// INCORRECT
const score = 100, maxScore = 500, name = 'John';

// CORRECT
const score = 100;
const maxScore = 500;
const name = 'John';
```

### Initialization

Initialize variables at the point of declaration whenever possible.

### Placement

Declare variables close to where they are first used, within their immediate block scope.

### Class and Function Declarations

* Prefer **Function Declarations** or named **Arrow Functions** for top-level functions.
* Arrow functions MUST be used for anonymous callbacks.

```javascript
// Top-level function declaration
function processOrder(orderId) {
  // ...
}

// Callback arrow function
const activeUsers = users.filter((user) => user.isActive);
```

## STATEMENTS

### Simple Statements

Each statement must end with an explicit **semicolon `;`**. Do not rely on Automatic Semicolon Insertion (ASI).

```javascript
// INCORRECT
const name = 'Alice'
console.log(name)

// CORRECT
const name = 'Alice';
console.log(name);
```

### Compound Statements

Control structures must always use curly braces `{}` even if the body contains only one statement.

```javascript
// INCORRECT
if (isReady) executeTask();

// CORRECT
if (isReady) {
  executeTask();
}
```

### Return Statements

Avoid unnecessary `return undefined;` or wrapping returned values in superfluous parentheses.

```javascript
// CORRECT
return calculatedValue;

// INCORRECT
return (calculatedValue);
```

### if, if-else, ternary Statements

```javascript
if (condition) {
  // statements
} else if (otherCondition) {
  // statements
} else {
  // statements
}
```

Use ternary operators only for simple, single-line assignments. Never nest ternary statements.

```javascript
// CORRECT
const statusText = isActive ? 'Active' : 'Inactive';

// INCORRECT - NESTED TERNARY
const statusText = isActive ? (isAdmin ? 'Admin' : 'User') : 'Disabled';
```

### for, for...of, for...in Statements

* Prefer array higher-order methods (`map`, `filter`, `forEach`, `reduce`) or `for...of` loops over traditional `for` loops.
* Avoid `for...in` unless iterating over un-structured plain object keys (prefer `Object.keys()` / `Object.entries()`).

```javascript
// PREFERRED
for (const user of userList) {
  console.log(user.name);
}

// ALTERNATIVE
userList.forEach((user) => {
  console.log(user.name);
});
```

### While and Do-While Statements

```javascript
while (condition) {
  // statements
}

do {
  // statements
} while (condition);
```

### Switch Statements

Always include a `default:` clause. Falling through cases without a `break` or `return` must be documented with a `/* falls through */` comment.

```javascript
switch (actionType) {
  case 'CREATE':
    handleCreate();
    break;
  case 'UPDATE':
    /* falls through */
  case 'MODIFY':
    handleUpdate();
    break;
  default:
    handleUnknownAction();
    break;
}
```

### Try-Catch-Finally Statements

```javascript
try {
  await fetchData();
} catch (error) {
  logger.error('Failed to fetch data:', error);
} finally {
  hideLoadingSpinner();
}
```

## WHITE SPACE

### Blank Lines

* Leave **1 blank line** between functions, class methods, and logical groupings inside functions.
* Leave **1 blank line** between import sections.
* End files with a single trailing newline character (`\n`).

### Blank Spaces

* Use spaces after control flow keywords (`if`, `while`, `for`, `switch`, `catch`).
* DO NOT put spaces between a function name and its argument list parenthesis.
* Put 1 space around binary operators (`+`, `-`, `===`, `=`, `&&`, `||`).
* Put 1 space after commas and colons.

```javascript
// CORRECT
if (a === b) {
  foo(c, d);
}

// INCORRECT
if(a===b){
  foo (c,d);
}
```

## NAMING CONVENTIONS

### General Rules

* Identifiers must be descriptive and written in English.
* Avoid single-letter variable names, except in loop counters (`i`, `j`).
* Avoid arbitrary abbreviations (`calcAvg` -> `calculateAverage`).

### Variables and Functions

Use **camelCase** for variables, functions, and instance methods.

```javascript
const userAccountBalance = 250;

function fetchUserProfile(userId) {
  // ...
}
```

Boolean variables must be prefixed with auxiliary verbs (`is`, `has`, `should`, `can`).

```javascript
const isAuthenticated = true;
const hasAdminPrivilege = false;
```

### Classes and Components

Use **PascalCase** for class names, interfaces, and React components.

```javascript
class PaymentProcessor {
  // ...
}

function UserProfileCard(props) {
  // ...
}
```

### Constants

Use **UPPER_SNAKE_CASE** for true immutability constants (global config variables).

```javascript
const MAXIMUM_LOGIN_ATTEMPTS = 5;
const API_BASE_URL = 'https://api.example.com/v1';
```

Note: Local block-scoped `const` variables that hold references (e.g., `const user = getUser()`) should remain `camelCase`.

### Modules and Packages

Use **kebab-case** or **camelCase** for file and directory names (consistent per project).

```javascript
// File naming examples
user-service.js
accountValidator.js
```

## PROGRAMMING PRACTICES

### Equality and Coercion

Always use strict equality **`===`** and strict inequality **`!==`** operators. Never use non-strict `==` or `!=` due to unexpected type coercion rules.

```javascript
// INCORRECT
if (userId == 10) { ... }

// CORRECT
if (userId === 10) { ... }
```

### Objects and Arrays

* Use literal syntax for object and array creation.
* Use trailing commas in multi-line object and array literals for cleaner Git diffs.

```javascript
// Literals
const user = {
  name: 'John',
  age: 30,
  role: 'Admin', // Trailing comma
};

const items = [
  'Item 1',
  'Item 2',
];
```

### Destructuring and Spread Operator

Prefer object and array destructuring over direct index/property access.

```javascript
// CORRECT
const { id, name, email } = userProfile;
const [firstItem, secondItem] = itemsList;

// Object Copy / Merging
const updatedUser = {
  ...userProfile,
  status: 'ACTIVE',
};
```

### Async Programming (Promises and Async/Await)

* Prefer **`async / await`** over chained `.then()` callbacks for readability.
* Always wrap `await` calls in `try...catch` blocks or handle rejected promises explicitly.

```javascript
// PREFERRED
async function loadData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error('Failed to load data', error);
    throw error;
  }
}
```

### Modules (ESM vs CommonJS)

* Standardize on **ESM (`import` / `export`)** for modern applications.
* Do not mix CommonJS (`require`) and ESM (`import`) in the same file.

```javascript
// Named exports
export function formatDate(date) { ... }

// Default exports (use sparingly, prefer named exports)
export default class Application { ... }
```

### Error Handling

* Always pass `Error` objects (or subclasses) to `reject()` or `throw` statements. Never throw raw strings or numbers.

```javascript
// INCORRECT
throw 'Invalid input provided';

// CORRECT
throw new Error('Invalid input provided');
```

### Loggings

* Do not leave raw `console.log()` statements in production code.
* Use a centralized logging framework (e.g., `winston`, `pino`) with configured log levels (`debug`, `info`, `warn`, `error`).

### Performance Practices

* **Avoid Memory Leaks:** Unsubscribe from event listeners, RxJS Observables, or web sockets upon component unmount.
* **DOM Manipulations:** Minimize direct DOM updates; batch DOM changes using DocumentFragments or virtual DOM abstractions.
* **Debounce / Throttle:** Apply debouncing or throttling to high-frequency events (e.g., `scroll`, `resize`, `keyup`).

### Miscellaneous Practices

* Use template literals `` `${var}` `` instead of string concatenation `+`.

```javascript
// INCORRECT
const greeting = 'Hello ' + userName + '! You have ' + count + ' messages.';

// CORRECT
const greeting = `Hello ${userName}! You have ${count} messages.`;
```

## CODE EXAMPLES

### JavaScript Source File Example

The following complete example demonstrates proper formatting, imports, JSDoc annotations, class structures, error handling, and export practices in JavaScript.

```javascript
/**
 * @fileoverview User Management Service module handling database user operations.
 * @module services/userService
 * @author Standard Dev Team
 * @version 1.0.0
 */

import EventEmitter from 'events';
import lodash from 'lodash';
import { DatabaseClient } from '../db/client';
import { Logger } from '../utils/logger';

const DEFAULT_PAGE_SIZE = 20;
const MAX_SEARCH_LIMIT = 100;

/**
 * Service class for managing user entities and operations.
 * @extends EventEmitter
 */
export class UserService extends EventEmitter {
  /**
   * Constructs a new UserService instance.
   * @param {DatabaseClient} dbClient - Initialized DB client instance.
   */
  constructor(dbClient) {
    super();
    if (!dbClient) {
      throw new Error('DatabaseClient instance is required');
    }
    
    /** @private */
    this.db = dbClient;
    /** @private */
    this.logger = new Logger('UserService');
  }

  /**
   * Retrieves a paginated list of active users.
   *
   * @param {Object} options - Search options.
   * @param {number} [options.page=1] - Current page number.
   * @param {number} [options.limit=DEFAULT_PAGE_SIZE] - Items per page.
   * @returns {Promise<{users: Array<Object>, totalCount: number}>} Paginated user results.
   */
  async getActiveUsers(options = {}) {
    const page = options.page || 1;
    const limit = Math.min(options.limit || DEFAULT_PAGE_SIZE, MAX_SEARCH_LIMIT);
    const offset = (page - 1) * limit;

    try {
      this.logger.info(`Fetching active users - Page: ${page}, Limit: ${limit}`);

      const queryResult = await this.db.query(
        'SELECT id, username, email, created_at FROM users WHERE is_active = $1 LIMIT $2 OFFSET $3',
        [true, limit, offset]
      );

      const totalCount = await this.db.count('users', { isActive: true });

      const sanitizedUsers = queryResult.rows.map((user) => 
        lodash.omit(user, ['password_hash'])
      );

      this.emit('users:fetched', { count: sanitizedUsers.length });

      return {
        users: sanitizedUsers,
        totalCount,
      };
    } catch (error) {
      this.logger.error('Failed to retrieve active users:', error);
      throw new Error(`UserService Error: ${error.message}`);
    }
  }
}

/**
 * Helper utility function to check user authorization (Private to module).
 *
 * @param {Object} user - User object.
 * @param {string} requiredRole - Role to validate against.
 * @returns {boolean} True if authorized.
 */
function isUserAuthorized(user, requiredRole) {
  if (!user || !user.roles) {
    return false;
  }
  return user.roles.includes(requiredRole);
}

// Module Sign-off Approval
```

| Approver | Reviewer | Creator | 
 | ----- | ----- | ----- | 
|  |  |  | 
|  |  |  | 
