# C4 Code Level: Array Function Tests

## Overview

- **Name**: Array Utilities Test Suite
- **Description**: Comprehensive test coverage for all array manipulation functions with edge cases and type safety verification
- **Location**: `tests/array`
- **Language**: TypeScript 5.x (Jest/ts-jest)
- **Purpose**: Validates correct behavior of array utility functions across various input scenarios and error conditions
- **Parent Component**: [Test Suite](./c4-component-test-suite.md)

## Test Files & Coverage

### Summary
- **Total Test Cases**: 53
- **Verified by execution**: Yes (npm test)
- **Status**: All tests passing

### Test File Inventory

| Test File | Location | Test Count | Focus |
|-----------|----------|-----------|-------|
| chunk.test.ts | `tests/array/chunk.test.ts` | 10 | Chunking with size validation |
| compact.test.ts | `tests/array/compact.test.ts` | 10 | Falsy value removal |
| first.test.ts | `tests/array/first.test.ts` | 5 | First element access |
| last.test.ts | `tests/array/last.test.ts` | 5 | Last element access |
| unique.test.ts | `tests/array/unique.test.ts` | 8 | Deduplication |
| flatten.test.ts | `tests/array/flatten.test.ts` | 13 | Recursive flattening with depth |
| intersection.test.ts | `tests/array/intersection.test.ts` | 10 | Set intersection operations |

## Test Coverage by Function

### chunk (10 test cases)
Validates chunking behavior with various size parameters:
- Basic chunking: splits array into chunks of specified size
- Empty input: returns empty array
- Edge cases: size equals/exceeds array length
- Remainder handling: last chunk with remaining elements
- Single-element chunks
- Error validation: non-positive size, non-integer size, NaN/Infinity
- Generic type preservation

### compact (10 test cases)
Validates falsy value removal:
- Mixed falsy values (0, false, null, undefined, "", NaN)
- Preservation of truthy values including empty containers ({}, [])
- String "0" treated as truthy
- Empty input handling
- Copy semantics: returns new array instance
- All falsy input: returns empty array
- Generic type preservation
- Special numeric values: negative numbers, Infinity

### first (5 test cases)
Validates first element access:
- Non-empty array: returns first element
- Empty array: returns undefined
- Single-element array
- Generic type preservation
- Type narrowing support for conditional logic

### last (5 test cases)
Validates last element access:
- Non-empty array: returns last element
- Empty array: returns undefined
- Single-element array
- Generic type preservation
- Type narrowing support for conditional logic

### unique (8 test cases)
Validates deduplication:
- Removes duplicate primitives
- Empty input: returns empty array
- Copy semantics: returns new array when no duplicates
- All duplicates: returns single element
- NaN equality handling (Set behavior treats NaN as equal)
- Order preservation: first occurrence order maintained
- Generic type preservation
- Special numeric values: 0/-0, Infinity/-Infinity

### flatten (13 test cases)
Validates recursive flattening with depth control:
- Default depth (1): flattens one level
- Depth 0: shallow copy
- Depth 1, 2, 3+: progressive flattening
- Infinity: complete flattening
- Empty input
- Copy semantics
- Mixed nested/flat elements
- Error validation: negative depth, non-integer depth, NaN depth
- Null/undefined preservation through flattening

### intersection (10 test cases)
Validates set intersection of multiple arrays:
- Two arrays: common elements
- Multiple arrays (3+): elements common to all
- No common elements: returns empty array
- No arrays provided: returns empty array
- Any empty input array: returns empty array
- Single array: returns unique elements
- Deduplication: automatically handles duplicates in first array
- Strict equality: uses === for comparison
- Order preservation: preserves order from first array
- Generic type preservation

## Test Implementation Details

### Testing Framework
- **Framework**: Jest with ts-jest
- **Imports**: Functions imported from `src/index.js` (built/compiled imports)
- **Assertion Style**: Jest matchers (toEqual, toBe, toThrow, etc.)
- **Test Structure**: Describe blocks per function, it() blocks per test case

### Test Characteristics
- **Type Safety**: Tests verify generic type preservation through TypeScript type annotations
- **Error Testing**: Uses toThrow() to verify error conditions
- **Semantics Testing**: Verifies copy semantics and immutability
- **Edge Cases**: Comprehensive coverage of boundary conditions and special values
- **Guard Testing**: Tests verify type guard behavior and narrowing

### Source Function Coverage
- 100% function coverage: All 7 exported functions have test files
- All validation paths tested
- All edge cases documented in tests

## Test Dependencies

### Internal Dependencies
- `src/array/*` - All array utility functions being tested
- `src/errors/index.ts` - Error classes for validation testing
- `src/index.ts` - Package barrel import

### External Dependencies
- Jest 29+ - Test framework
- ts-jest - TypeScript support for Jest
- TypeScript 5.x - Type system for test type annotations

## Test Execution

To run the array tests specifically:
```bash
npm test -- tests/array
```

To run all tests with verbose output:
```bash
npm test -- --verbose
```

All 53 test cases pass successfully.

## Notes

- Tests are organized by function (barrel test organization)
- Each test file imports the corresponding function from the compiled/built output
- Tests exercise both happy paths and error conditions
- Generic type preservation is verified through TypeScript type assertions
- Performance is not explicitly tested, but the test execution completes quickly
