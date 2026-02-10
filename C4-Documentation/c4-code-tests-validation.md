# C4 Code Level: tests/validation

## Overview

| Field | Value |
|-------|-------|
| **Name** | Validation Utilities Tests |
| **Description** | Test suite for all validation type guards and assertion functions |
| **Location** | [tests/validation/](../tests/validation/) |
| **Language** | TypeScript |
| **Purpose** | Verify type guard return values, assertion throwing behavior, type narrowing correctness, and edge-case handling for all validation utility functions |

## Code Elements

### Test Suites

#### `index.test.ts`
- **File**: [tests/validation/index.test.ts](../tests/validation/index.test.ts)
- **Tests**: 22 test cases across 5 describe blocks

**`isNonEmptyString` tests (4 cases)**:
- True for non-empty strings (including single space)
- False for empty strings
- False for non-string values (null, undefined, number, boolean, object, array)
- Type narrowing verification (unknown -> string with .length access)

**`isPositiveNumber` tests (6 cases)**:
- True for positive numbers (integer and decimal)
- False for zero
- False for negative numbers
- False for non-finite numbers (Infinity, -Infinity, NaN)
- False for non-number types (string "1", null, undefined, boolean, object, array)
- Type narrowing verification (unknown -> number with multiplication)

**`isInRange` tests (4 cases)**:
- True within range (including boundaries)
- False outside range
- Negative ranges
- Decimal values

**`isNonNegativeInteger` tests (6 cases)**:
- True for 0, positive integers, MAX_SAFE_INTEGER
- False for negative integers
- False for decimals
- False for non-finite numbers (Infinity, -Infinity, NaN)
- False for non-number types
- Type narrowing verification

**`assertNonEmptyString` tests (5 cases)**:
- No throw for non-empty strings
- Throws EmptyStringError for empty strings
- Throws EmptyStringError for non-string values (null, undefined, number)
- Includes field name in error when provided
- Type narrowing verification (unknown -> string after assertion)

## Dependencies

### Internal Dependencies
- `../../src/index.js` - Imports all validation functions and `EmptyStringError` under test

### External Dependencies
- `jest` (v30.2.0) - Test framework (describe, it, expect)
- `@jest/globals` - Explicit imports of describe, expect, it
