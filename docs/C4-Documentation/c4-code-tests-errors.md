# C4 Code Level: Error Classes Tests

## Overview

- **Name**: Error Classes Test Suite
- **Description**: Test coverage for custom error class hierarchy and their properties
- **Location**: `tests/errors`
- **Language**: TypeScript 5.x (Jest/ts-jest)
- **Purpose**: Validates correct instantiation, inheritance chain, and property handling of custom error classes
- **Parent Component**: TBD

## Test Files & Coverage

### Summary
- **Total Test Cases**: 28
- **Verified by execution**: Yes (npm test)
- **Status**: All tests passing
- **Test File**: Single test file covering all 4 error classes

### Test File Inventory

| Test File | Location | Test Count | Focus |
|-----------|----------|-----------|-------|
| index.test.ts | `tests/errors/index.test.ts` | 28 | Error class validation |

## Test Coverage by Error Class

### ValidationError (3 test cases)
Base error class validation:
1. Creates a ValidationError instance inheriting from Error
2. Verifies name property is set to "ValidationError"
3. Verifies message property is preserved
4. Verifies field property is stored when provided
5. Verifies field property is undefined when not provided

### EmptyStringError (3 test cases)
Empty string validation error:
1. Creates an EmptyStringError instance
2. Verifies instanceof chain: EmptyStringError → ValidationError → Error
3. Verifies default message: "String cannot be empty"
4. Verifies name property is set to "EmptyStringError"
5. Verifies field property storage when provided
6. Verifies field property is undefined when not provided

### InvalidNumberError (3 test cases)
Invalid number validation error:
1. Creates an InvalidNumberError instance
2. Verifies instanceof chain: InvalidNumberError → ValidationError → Error
3. Verifies custom message is preserved
4. Verifies name property is set to "InvalidNumberError"
5. Verifies field property storage when provided
6. Verifies field property is undefined when not provided

### OutOfRangeError (4 test cases)
Out of range validation error:
1. Creates an OutOfRangeError instance
2. Verifies instanceof chain: OutOfRangeError → ValidationError → Error
3. Verifies message format: "Value X is out of range [min, max]"
4. Verifies name property is set to "OutOfRangeError"
5. Verifies field property storage when provided
6. Verifies field property is undefined when not provided
7. Verifies message formatting with different value/range combinations

## Test Implementation Details

### Testing Framework
- **Framework**: Jest with ts-jest
- **Imports**: Error classes imported from `src/errors/index.js` (built/compiled)
- **Assertion Style**: Jest matchers (toBeInstanceOf, toBe, toEqual, etc.)
- **Test Structure**: Describe blocks per error class, it() blocks per test case

### Test Characteristics
- **Inheritance Verification**: Uses toBeInstanceOf() to verify prototype chain
- **Property Testing**: Verifies all public properties (message, field, name)
- **Constructor Testing**: Tests with and without optional parameters
- **Message Formatting**: Verifies correct message template expansion

### Source Coverage
- 100% class coverage: All 4 error classes have test cases
- All constructor signatures tested
- All property combinations tested
- Inheritance chain verified for all classes

## Test Patterns

### Error Instantiation
```typescript
const error = new ValidationError('Test error');
expect(error).toBeInstanceOf(ValidationError);
expect(error).toBeInstanceOf(Error);
expect(error.message).toBe('Test error');
expect(error.name).toBe('ValidationError');
```

### Optional Field Parameter
```typescript
// With field
const errorWithField = new ValidationError('msg', 'username');
expect(errorWithField.field).toBe('username');

// Without field
const errorNoField = new ValidationError('msg');
expect(errorNoField.field).toBeUndefined();
```

### Inheritance Chain
```typescript
const error = new EmptyStringError();
expect(error).toBeInstanceOf(EmptyStringError);
expect(error).toBeInstanceOf(ValidationError);
expect(error).toBeInstanceOf(Error);
```

## Test Dependencies

### Internal Dependencies
- `src/errors/index.ts` - All error classes being tested
- `src/index.ts` - Package barrel import (for some import paths)

### External Dependencies
- Jest 29+ - Test framework
- ts-jest - TypeScript support for Jest
- TypeScript 5.x - Type system for test annotations

## Test Execution

To run the error tests specifically:
```bash
npm test -- tests/errors
```

To verify error tests with verbose output:
```bash
npm test -- tests/errors --verbose
```

All 28 test cases pass successfully.

## Notes

- Tests verify the complete error class hierarchy
- Field property handling is thoroughly tested
- Message formatting is validated for OutOfRangeError
- Tests ensure errors are properly inheritable and can be caught with instanceof checks
- These error classes are used throughout the library for validation failures
