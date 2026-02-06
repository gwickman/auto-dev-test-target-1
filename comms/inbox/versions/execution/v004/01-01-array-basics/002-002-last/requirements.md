# Requirements: last

## Goal

Create a `last()` function that returns the last element of an array safely, handling empty arrays by returning undefined.

## Background

This is part of v004 Theme 01 (array-basics) implementing foundational array utilities. The function provides type-safe access to the last array element without throwing errors on empty arrays. Very similar to `first()` but accesses the end of the array.

**Backlog Item:** BL-021 - Add last() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `last<T>(arr: T[]): T | undefined`
- Returns undefined for empty arrays
- Has comprehensive tests
- Uses type guards

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `last<T>(arr: T[]): T | undefined`

**Details:**
- Generic type parameter `<T>` preserves input array element type
- Return type `T | undefined` forces caller to handle empty array case
- No default value parameter (keep signature simple per acceptance criteria)

**Acceptance Criteria:**
- Function accepts single parameter of type `T[]`
- Returns `T` when array is non-empty
- Returns `undefined` when array is empty
- Type parameter `T` is inferred from array input

### FR-002: Empty array handling
**Requirement:** Return `undefined` for empty arrays

**Details:**
- Empty array (`[]`) should return `undefined`
- No error thrown for empty array
- Consistent behavior regardless of element type

**Acceptance Criteria:**
- `last([])` returns `undefined`
- No exceptions thrown for empty input
- TypeScript type system reflects `T | undefined` return

### FR-003: Non-empty array handling
**Requirement:** Return last element for non-empty arrays

**Details:**
- Access array at last index: `arr[arr.length - 1]`
- Works with single-element arrays
- Works with multi-element arrays
- Preserves element type

**Acceptance Criteria:**
- `last([1, 2, 3])` returns `3`
- `last(['a'])` returns `'a'`
- Type of returned element matches array element type

### FR-004: Module location and exports
**Requirement:** Add function to array module and export from main index

**Details:**
- File location: `src/array/last.ts`
- Export from `src/array/index.ts`
- Export from `src/index.ts` (already done in Feature 001)

**Acceptance Criteria:**
- Function importable from `'../../src/index.js'` in tests
- ESM import with `.js` extension works
- Part of public API

## Non-Functional Requirements

### NFR-001: Type safety
**Requirement:** Generic type preservation and type narrowing support

**Metrics:**
- TypeScript compiler enforces types at compile time
- Return type `T | undefined` requires explicit undefined check
- No type assertions (`as`) needed in implementation

### NFR-002: Performance
**Requirement:** O(1) constant time complexity

**Metrics:**
- Direct array index access via `arr.length - 1`
- No iteration required
- Instant return regardless of array size

### NFR-003: Zero runtime overhead
**Requirement:** No validation or error handling overhead

**Metrics:**
- No runtime type checking
- No parameter validation (trust TypeScript types)
- Single array length check and access operation

## Out of Scope

- Default value parameter (description mentions but acceptance criteria excludes)
- Validation that input is actually an array (trust TypeScript types)
- Handling of array-like objects (only proper arrays)
- Deep copying or mutation concerns (read-only operation)

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/last.test.ts)

**Test categories:**
1. **Happy path:** Non-empty array returns last element
2. **Empty array:** Returns undefined
3. **Single element:** Returns that element
4. **Type preservation:** Generic type T maintained
5. **Type narrowing:** Demonstrate `T | undefined` handling

**Edge cases:**
- Empty array: `[]`
- Single element: `[1]`
- Multiple elements: `[1, 2, 3]`
- Different types: numbers, strings, objects

**Test count estimate:** 4-5 tests

## Dependencies

- TypeScript 5.x with generic type support
- Jest testing framework
- ESM module system
- Feature 001 (first) - establishes array module structure

## Acceptance Criteria Summary

- [ ] Function signature: `last<T>(arr: T[]): T | undefined`
- [ ] Returns undefined for empty arrays
- [ ] Returns last element for non-empty arrays
- [ ] Has comprehensive tests covering edge cases
- [ ] Type narrowing works with `T | undefined` return type
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`