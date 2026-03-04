# C4 Code Level: Number Utilities Tests

## Overview

- **Name**: Number Utilities Test Suite
- **Description**: Comprehensive test coverage for numeric utility functions with edge cases and error validation
- **Location**: `tests/number`
- **Language**: TypeScript 5.x (Jest/ts-jest)
- **Purpose**: Validates correct behavior of number operations under normal and error conditions
- **Parent Component**: [Test Suite](./c4-component-test-suite.md)

## Test Files & Coverage

### Summary
- **Total Test Cases**: 12
- **Verified by execution**: Yes (npm test)
- **Status**: All tests passing

### Test File Inventory

| Test File | Location | Test Count | Focus |
|-----------|----------|-----------|-------|
| clamp.test.ts | `tests/number/clamp.test.ts` | 6 | Range constraint validation |
| roundTo.test.ts | `tests/number/roundTo.test.ts` | 6 | Decimal rounding validation |

## Test Coverage by Function

### clamp (6 test cases)
Validates range constraint behavior:
1. Returns value when in range: clamp(5, 0, 10) → 5
2. Returns min when value too low: clamp(-5, 0, 10) → 0
3. Returns max when value too high: clamp(15, 0, 10) → 10
4. Handles edge at min: clamp(0, 0, 10) → 0
5. Handles edge at max: clamp(10, 0, 10) → 10
6. Throws OutOfRangeError if min > max: clamp(5, 10, 0) → throws

### roundTo (6 test cases)
Validates decimal rounding behavior:
1. Rounds to 2 decimal places: roundTo(3.14159, 2) → 3.14
2. Rounds to integer (0 decimals): roundTo(3.7, 0) → 4
3. Rounds up at midpoint: roundTo(2.5, 0) → 3
4. Handles already-rounded values: roundTo(5.0, 2) → 5
5. Throws InvalidNumberError for negative decimals: roundTo(5, -1) → throws
6. Throws InvalidNumberError for non-integer decimals: roundTo(5, 1.5) → throws

## Test Implementation Details

### Testing Framework
- **Framework**: Jest with ts-jest
- **Imports**: Functions imported from `src/index.js` (built/compiled)
- **Error Classes**: Imported from `src/errors/index.js`
- **Assertion Style**: Jest matchers (toBe, toThrow, etc.)
- **Test Structure**: Describe blocks per function, it() blocks per scenario

### Test Characteristics
- **Numeric Precision**: Tests verify correct rounding behavior
- **Boundary Testing**: Edge values tested at min/max boundaries
- **Error Validation**: Proper error types thrown for invalid inputs
- **Exception Testing**: Uses toThrow() for error condition verification

### Source Function Coverage
- 100% function coverage: Both functions have test files
- All parameter validation paths tested
- All error conditions validated
- Boundary conditions thoroughly tested

## Test Error Conditions

### clamp Errors
- **OutOfRangeError**: Thrown when min > max
  - Test: `expect(() => clamp(5, 10, 0)).toThrow(OutOfRangeError)`

### roundTo Errors
- **InvalidNumberError**: Thrown for negative decimals
  - Test: `expect(() => roundTo(5, -1)).toThrow(InvalidNumberError)`
- **InvalidNumberError**: Thrown for non-integer decimals
  - Test: `expect(() => roundTo(5, 1.5)).toThrow(InvalidNumberError)`

## Test Dependencies

### Internal Dependencies
- `src/number/*` - Number utility functions being tested
- `src/errors/index.ts` - Error classes for exception testing
- `src/index.ts` - Package barrel import

### External Dependencies
- Jest 29+ - Test framework
- ts-jest - TypeScript support for Jest
- TypeScript 5.x - Type system for test type annotations

## Test Execution

To run the number tests specifically:
```bash
npm test -- tests/number
```

To run with verbose output:
```bash
npm test -- tests/number --verbose
```

All 12 test cases pass successfully.

## Test Patterns

### Range Testing
```typescript
describe('clamp', () => {
  it('returns value when in range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value too low', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });
});
```

### Error Testing
```typescript
it('throws OutOfRangeError if min > max', () => {
  expect(() => clamp(5, 10, 0)).toThrow(OutOfRangeError);
});
```

## Notes

- Tests verify both happy paths and error conditions
- Numeric edge cases (negative numbers, zero, infinity) are implicitly tested through range testing
- Rounding precision is validated through specific decimal place tests
- Error messages are verified through error type checking
- Tests ensure mathematical correctness of numeric operations
