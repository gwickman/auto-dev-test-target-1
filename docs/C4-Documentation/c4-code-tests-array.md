# C4 Code Level: Array Test Suite

## Overview
- **Name**: Array Test Suite
- **Description**: Jest test suite covering all array utility functions with comprehensive edge case and type safety validation.
- **Location**: tests/array
- **Language**: TypeScript
- **Purpose**: Validates correctness of all array utility functions including first, last, unique, chunk, compact, flatten, and intersection.

## Code Elements

### Test Suites

- `first` test suite
  - Description: Tests the `first` function for non-empty arrays, empty arrays, single-element arrays, generic type preservation, and type narrowing.
  - Location: tests/array/first.test.ts
  - Test count: 5
  - Imports: `first` from `src/index.ts`

- `last` test suite
  - Description: Tests the `last` function for non-empty arrays, empty arrays, single-element arrays, generic type preservation, and type narrowing.
  - Location: tests/array/last.test.ts
  - Test count: 5
  - Imports: `last` from `src/index.ts`

- `unique` test suite
  - Description: Tests the `unique` function for duplicate removal, empty input, no-duplicates copy, all-duplicates, NaN handling, order preservation, generic types, and special numeric values (0/-0, Infinity).
  - Location: tests/array/unique.test.ts
  - Test count: 8
  - Imports: `unique` from `src/index.ts`

- `chunk` test suite
  - Description: Tests the `chunk` function for correct splitting, empty input, exact-size chunks, oversized chunks, remainder handling, size-1 chunks, and error cases (non-positive, non-integer, NaN/Infinity). Also validates generic type preservation.
  - Location: tests/array/chunk.test.ts
  - Test count: 10
  - Imports: `chunk`, `InvalidNumberError` from `src/index.ts`

- `compact` test suite
  - Description: Tests the `compact` function for mixed falsy removal, all six falsy types, truthy preservation (objects, arrays, string "0"), empty input, all-truthy copy, all-falsy, generic types, and special numeric values.
  - Location: tests/array/compact.test.ts
  - Test count: 9
  - Imports: `compact` from `src/index.ts`

- `flatten` test suite
  - Description: Tests the `flatten` function for default depth-1 flattening, depth-0 copy, depth 1-3 explicit levels, Infinity depth, empty input, no-nested copy, mixed elements, error cases (negative, non-integer, NaN), and null/undefined preservation.
  - Location: tests/array/flatten.test.ts
  - Test count: 13
  - Imports: `flatten`, `InvalidNumberError` from `src/index.ts`

- `intersection` test suite
  - Description: Tests the `intersection` function for two-array and multi-array intersection, no common elements, no input, empty array input, single array dedup, duplicate handling, strict equality, order preservation, and generic types.
  - Location: tests/array/intersection.test.ts
  - Test count: 10
  - Imports: `intersection` from `src/index.ts`

## Dependencies

### Internal Dependencies
- `src/index.ts` — all array functions and error classes imported for testing

### External Dependencies
- `jest` / `@jest/globals` — test framework
