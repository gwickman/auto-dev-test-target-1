# Requirements: chunk

## Goal

Create a `chunk()` function that splits an array into smaller arrays of a specified size, with proper validation of the size parameter.

## Background

This is part of v004 Theme 01 (array-basics) implementing foundational array utilities. The function provides array segmentation with validated chunk size, demonstrating integration with v003 validation infrastructure.

**Backlog Item:** BL-019 - Add chunk() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `chunk<T>(arr: T[], size: number): T[][]`
- Validates size is positive integer
- Handles empty arrays
- Last chunk contains remaining elements
- Has comprehensive tests

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `chunk<T>(arr: T[], size: number): T[][]`

**Details:**
- Generic type parameter `<T>` preserves input array element type
- Return type `T[][]` is array of arrays
- Size parameter determines chunk length
- Returns new array (does not mutate input)

**Acceptance Criteria:**
- Function accepts array parameter `arr: T[]`
- Function accepts size parameter `size: number`
- Returns nested array `T[][]`
- Type parameter `T` is inferred from array input

### FR-002: Array chunking logic
**Requirement:** Split array into fixed-size chunks

**Details:**
- Create subarrays of length `size`
- Use slice for each chunk
- Iterate with step of `size`
- Last chunk may be smaller if array length not evenly divisible

**Acceptance Criteria:**
- `chunk([1, 2, 3, 4, 5], 2)` returns `[[1, 2], [3, 4], [5]]`
- Each chunk (except possibly last) has length equal to size
- Last chunk contains all remaining elements
- No elements lost or duplicated

### FR-003: Empty array handling
**Requirement:** Return empty array for empty input

**Details:**
- Empty array (`[]`) should return empty array `[]`
- No error thrown for empty array
- Works regardless of size parameter

**Acceptance Criteria:**
- `chunk([], 5)` returns `[]`
- No exceptions thrown for empty input
- Return type still `T[][]`

### FR-004: Size validation
**Requirement:** Validate size is positive integer

**Details:**
- Must be positive (> 0)
- Must be integer (no decimals)
- Must be finite (no Infinity or NaN)
- Throw InvalidNumberError for invalid values

**Acceptance Criteria:**
- Throws `InvalidNumberError` if size <= 0
- Throws `InvalidNumberError` if size is decimal
- Throws `InvalidNumberError` if size is NaN
- Throws `InvalidNumberError` if size is Infinity
- Error includes field name 'size' for context
- Error message indicates "must be a positive integer"

### FR-005: Edge cases
**Requirement:** Handle boundary conditions correctly

**Details:**
- Size equals array length: single chunk with entire array
- Size greater than array length: single chunk with entire array
- Size 1: array of single-element arrays

**Acceptance Criteria:**
- `chunk([1, 2, 3], 3)` returns `[[1, 2, 3]]`
- `chunk([1, 2], 5)` returns `[[1, 2]]`
- `chunk([1, 2, 3], 1)` returns `[[1], [2], [3]]`

### FR-006: Module location and exports
**Requirement:** Add function to array module and export from main index

**Details:**
- File location: `src/array/chunk.ts`
- Export from `src/array/index.ts`
- Import validation from `src/validation/index.js`
- Import errors from `src/errors/index.js`

**Acceptance Criteria:**
- Function importable from `'../../src/index.js'` in tests
- ESM imports use `.js` extensions
- Part of public API

## Non-Functional Requirements

### NFR-001: Performance
**Requirement:** O(n) time complexity

**Metrics:**
- Single pass through array
- Each element copied once to result
- No nested loops over same data

### NFR-002: Immutability
**Requirement:** Do not mutate input array

**Metrics:**
- Input array unchanged after function call
- Returns new array instances
- Suitable for functional programming

### NFR-003: Validation integration
**Requirement:** Use v003 validation infrastructure

**Metrics:**
- Use existing `isPositiveNumber()` validator
- Combine with `Number.isInteger()` check
- Throw `InvalidNumberError` with field name
- Follow validation pattern from truncate()

## Out of Scope

- Validation that input is actually an array (trust TypeScript types)
- Padding last chunk to match size (return actual remaining elements)
- Custom overlap or step size between chunks
- Generator pattern for large arrays (return all chunks at once)

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/chunk.test.ts)

**Test categories:**
1. **Happy path:** Split array into chunks of specified size
2. **Empty array:** Returns empty array
3. **Size equals length:** Single chunk with entire array
4. **Size greater than length:** Single chunk with entire array
5. **Last chunk smaller:** Remaining elements in final chunk
6. **Size 1:** Each element in separate chunk
7. **Validation errors:** Invalid size values throw errors
8. **Type preservation:** Generic type T preserved in nested arrays

**Edge cases:**
- Empty array: `[]`
- Size equals length
- Size greater than length
- Single element arrays
- Invalid size: 0, negative, decimal, NaN, Infinity

**Test count estimate:** 8-10 tests

## Dependencies

- TypeScript 5.x with generic type support
- Jest testing framework
- ESM module system
- v003 validation infrastructure:
  - `isPositiveNumber()` from `src/validation/index.ts`
  - `InvalidNumberError` from `src/errors/index.ts`
- Features 001-003 establish array module structure

## Acceptance Criteria Summary

- [ ] Function signature: `chunk<T>(arr: T[], size: number): T[][]`
- [ ] Splits array into fixed-size chunks using slice
- [ ] Last chunk contains remaining elements (may be smaller)
- [ ] Validates size is positive integer
- [ ] Throws InvalidNumberError with field name for invalid size
- [ ] Handles empty arrays (returns empty array)
- [ ] Edge cases covered: size = length, size > length, size = 1
- [ ] Has comprehensive tests including validation errors
- [ ] Generic type T preserved in nested array return type
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`