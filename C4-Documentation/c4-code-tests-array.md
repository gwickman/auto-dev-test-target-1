# C4 Code Level: tests/array

## Overview

| Field | Value |
|-------|-------|
| **Name** | Array Utilities Tests |
| **Description** | Comprehensive test suite for all array utility functions |
| **Location** | [tests/array/](../tests/array/) |
| **Language** | TypeScript |
| **Purpose** | Verify correctness, edge-case handling, error throwing, type preservation, and generic type support for all array utility functions |

## Code Elements

### Test Suites

#### `chunk.test.ts`
- **File**: [tests/array/chunk.test.ts](../tests/array/chunk.test.ts)
- **Tests**: 10 test cases
- **Covers**: Normal chunking, empty arrays, size equal/greater than length, last chunk remainder, single-element chunks, InvalidNumberError for non-positive/non-integer/NaN/Infinity sizes, generic type preservation

#### `compact.test.ts`
- **File**: [tests/array/compact.test.ts](../tests/array/compact.test.ts)
- **Tests**: 9 test cases
- **Covers**: Removing mixed falsy values, all six falsy types (false, null, 0, "", undefined, NaN), truthy edge cases (empty objects/arrays, string "0"), empty input, all-falsy input, negative numbers, Infinity, generic type preservation

#### `first.test.ts`
- **File**: [tests/array/first.test.ts](../tests/array/first.test.ts)
- **Tests**: 5 test cases
- **Covers**: Non-empty arrays with various types, empty array returning undefined, single-element arrays, generic type preservation, type narrowing support

#### `flatten.test.ts`
- **File**: [tests/array/flatten.test.ts](../tests/array/flatten.test.ts)
- **Tests**: 13 test cases
- **Covers**: Default depth-1 flattening, depth-0 shallow copy, depths 1-3+, Infinity full flatten, empty arrays, no-nested-array pass-through, mixed nesting, InvalidNumberError for negative/non-integer/NaN depths, null/undefined preservation in nested arrays

#### `intersection.test.ts`
- **File**: [tests/array/intersection.test.ts](../tests/array/intersection.test.ts)
- **Tests**: 9 test cases
- **Covers**: Two-array intersection, three+ arrays, no common elements, no arrays provided, empty array input, single array deduplication, duplicate handling in first array, strict equality (including NaN), order preservation, generic type preservation

#### `last.test.ts`
- **File**: [tests/array/last.test.ts](../tests/array/last.test.ts)
- **Tests**: 5 test cases
- **Covers**: Non-empty arrays with various types, empty array returning undefined, single-element arrays, generic type preservation, type narrowing support

#### `unique.test.ts`
- **File**: [tests/array/unique.test.ts](../tests/array/unique.test.ts)
- **Tests**: 7 test cases
- **Covers**: Duplicate removal for primitives (numbers, strings, booleans), empty arrays, no-duplicate pass-through, all-duplicate arrays, NaN equality handling, order preservation of first occurrence, generic type preservation, special numeric values (0/-0, Infinity)

## Dependencies

### Internal Dependencies
- `../../src/index.js` - Imports all array functions and error classes under test
- `../../src/errors/index.js` - Direct import of `InvalidNumberError` in some test files

### External Dependencies
- `jest` (v30.2.0) - Test framework (describe, it, expect)
- `@jest/globals` - Explicit imports in `flatten.test.ts`
