# C4 Code Level: Validation Utilities Test Suite

## Overview
- **Name**: Validation Utilities Test Suite
- **Description**: Jest test suite covering all validation type guard and assertion functions with extensive edge case testing.
- **Location**: tests/validation
- **Language**: TypeScript
- **Purpose**: Validates correctness of type guard functions (isNonEmptyString, isPositiveNumber, isInRange, isNonNegativeInteger) and assertion function (assertNonEmptyString) including type narrowing behavior.

## Code Elements

### Test Suites

- `isNonEmptyString` test suite
  - Description: Tests true for non-empty strings (including whitespace-only), false for empty strings, false for non-string types (null, undefined, number, boolean, object, array), and type narrowing.
  - Location: tests/validation/index.test.ts:11
  - Test count: 4
  - Imports: `isNonEmptyString` from `src/index.ts`

- `isPositiveNumber` test suite
  - Description: Tests true for positive numbers (including decimals), false for zero, false for negatives, false for non-finite (Infinity, -Infinity, NaN), false for non-number types, and type narrowing.
  - Location: tests/validation/index.test.ts:40
  - Test count: 6
  - Imports: `isPositiveNumber` from `src/index.ts`

- `isInRange` test suite
  - Description: Tests within-range (including boundaries), out-of-range, negative ranges, and decimal values.
  - Location: tests/validation/index.test.ts:80
  - Test count: 4
  - Imports: `isInRange` from `src/index.ts`

- `isNonNegativeInteger` test suite
  - Description: Tests true for non-negative integers (0 through MAX_SAFE_INTEGER), false for negative integers, false for decimals, false for non-finite numbers, false for non-number types, and type narrowing.
  - Location: tests/validation/index.test.ts:104
  - Test count: 6
  - Imports: `isNonNegativeInteger` from `src/index.ts`

- `assertNonEmptyString` test suite
  - Description: Tests no-throw for non-empty strings, EmptyStringError for empty strings, EmptyStringError for non-string values, field name inclusion in error, and type narrowing after assertion.
  - Location: tests/validation/index.test.ts:144
  - Test count: 5
  - Imports: `assertNonEmptyString`, `EmptyStringError` from `src/index.ts`

## Dependencies

### Internal Dependencies
- `src/index.ts` — all validation functions and `EmptyStringError` imported for testing

### External Dependencies
- `@jest/globals` — test framework (`describe`, `expect`, `it`)
