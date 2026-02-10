# C4 Code Level: Error Classes Test Suite

## Overview
- **Name**: Error Classes Test Suite
- **Description**: Jest test suite verifying the custom error class hierarchy including instance checks, inheritance, message formatting, and field property handling.
- **Location**: tests/errors
- **Language**: TypeScript
- **Purpose**: Validates that all custom error classes (ValidationError, EmptyStringError, InvalidNumberError, OutOfRangeError) construct correctly, inherit properly, and store field information.

## Code Elements

### Test Suites

- `ValidationError` test suite
  - Description: Tests instance creation, Error inheritance, message and name properties, field storage, and undefined field when omitted.
  - Location: tests/errors/index.test.ts:8
  - Test count: 3
  - Imports: `ValidationError` from `src/errors/index.ts`

- `EmptyStringError` test suite
  - Description: Tests instance creation, ValidationError and Error inheritance chain, fixed message "String cannot be empty", field storage, and undefined field when omitted.
  - Location: tests/errors/index.test.ts:28
  - Test count: 3
  - Imports: `EmptyStringError` from `src/errors/index.ts`

- `InvalidNumberError` test suite
  - Description: Tests instance creation, inheritance chain, custom message, field storage, and undefined field when omitted.
  - Location: tests/errors/index.test.ts:49
  - Test count: 3
  - Imports: `InvalidNumberError` from `src/errors/index.ts`

- `OutOfRangeError` test suite
  - Description: Tests instance creation, inheritance chain, formatted message with value/min/max, field storage, and message formatting with different values.
  - Location: tests/errors/index.test.ts:70
  - Test count: 4
  - Imports: `OutOfRangeError` from `src/errors/index.ts`

## Dependencies

### Internal Dependencies
- `src/errors/index.ts` — all error classes imported for testing

### External Dependencies
- `jest` — test framework
