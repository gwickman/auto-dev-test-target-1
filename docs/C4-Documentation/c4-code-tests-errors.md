# C4 Code Level: Error Class Tests

## Overview
- **Name**: Error Class Tests
- **Description**: Test suite for custom error class hierarchy
- **Location**: tests/errors/
- **Language**: TypeScript (Jest)
- **Purpose**: Validates error instantiation, inheritance chains, message formatting, and field property behavior
- **Parent Component**: TBD

## Test Inventory

| File | Tests | Description |
|------|-------|-------------|
| index.test.ts | 13 | Tests for ValidationError, EmptyStringError, InvalidNumberError, OutOfRangeError |
| **Total** | **13** | |

**Test count: 13 (verified by `npm test`)**

## Code Elements

### Test Suites

- `describe('ValidationError', ...)`
  - Location: tests/errors/index.test.ts:8
  - Tests: 3 (instance creation, field property, undefined field)
  - Validates: `ValidationError` extends `Error`, stores `field` property

- `describe('EmptyStringError', ...)`
  - Location: tests/errors/index.test.ts:28
  - Tests: 3 (instance creation, field property, undefined field)
  - Validates: `EmptyStringError` extends `ValidationError`, default message "String cannot be empty"

- `describe('InvalidNumberError', ...)`
  - Location: tests/errors/index.test.ts:49
  - Tests: 3 (instance creation, field property, undefined field)
  - Validates: `InvalidNumberError` extends `ValidationError`, custom message

- `describe('OutOfRangeError', ...)`
  - Location: tests/errors/index.test.ts:70
  - Tests: 4 (instance creation, field property, undefined field, message formatting)
  - Validates: `OutOfRangeError` extends `ValidationError`, formatted message `"Value {val} is out of range [{min}, {max}]"`

## Dependencies

### Internal Dependencies
- `../../src/errors/index.js` — `ValidationError`, `EmptyStringError`, `InvalidNumberError`, `OutOfRangeError`

### External Dependencies
- `jest` — test framework (implicit globals)

## Coverage Summary

Tests verify the complete error class hierarchy: `Error` → `ValidationError` → `EmptyStringError` | `InvalidNumberError` | `OutOfRangeError`. Each class is tested for correct `instanceof` chains, `name` property, `message` content, and optional `field` parameter.

## Relationships

```mermaid
classDiagram
    Error <|-- ValidationError
    ValidationError <|-- EmptyStringError
    ValidationError <|-- InvalidNumberError
    ValidationError <|-- OutOfRangeError

    class ValidationError {
        +message: string
        +field?: string
        +name: "ValidationError"
    }
    class EmptyStringError {
        +name: "EmptyStringError"
        +message: "String cannot be empty"
    }
    class InvalidNumberError {
        +name: "InvalidNumberError"
        +message: string
    }
    class OutOfRangeError {
        +name: "OutOfRangeError"
        +message: "Value {val} is out of range [{min}, {max}]"
    }
```
