# C4 Code Level: tests/errors

## Overview

| Field | Value |
|-------|-------|
| **Name** | Error Classes Tests |
| **Description** | Test suite for all custom error classes |
| **Location** | [tests/errors/](../tests/errors/) |
| **Language** | TypeScript |
| **Purpose** | Verify error class instantiation, inheritance hierarchy, message formatting, field property storage, and correct `name` property for all error classes |

## Code Elements

### Test Suites

#### `index.test.ts`
- **File**: [tests/errors/index.test.ts](../tests/errors/index.test.ts)
- **Tests**: 13 test cases across 4 describe blocks

**`ValidationError` tests (3 cases)**:
- Instance creation and inheritance from Error
- Field property storage when provided
- Undefined field when not provided

**`EmptyStringError` tests (3 cases)**:
- Instance creation and inheritance chain (EmptyStringError -> ValidationError -> Error)
- Fixed message "String cannot be empty"
- Field property storage

**`InvalidNumberError` tests (3 cases)**:
- Instance creation with custom message and inheritance chain
- Field property storage
- Undefined field when not provided

**`OutOfRangeError` tests (4 cases)**:
- Instance creation with auto-formatted message and inheritance chain
- Field property storage
- Undefined field when not provided
- Message formatting verification (e.g., "Value 5 is out of range [10, 20]")

## Dependencies

### Internal Dependencies
- `../../src/errors/index.js` - Imports all four error classes under test

### External Dependencies
- `jest` (v30.2.0) - Test framework (describe, it, expect)
