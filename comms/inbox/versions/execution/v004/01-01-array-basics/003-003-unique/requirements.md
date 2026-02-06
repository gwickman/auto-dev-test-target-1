# Requirements: unique

## Goal

Create a `unique()` function that removes duplicate values from an array using JavaScript Set for O(n) performance.

## Background

This is part of v004 Theme 01 (array-basics) implementing foundational array utilities. The function provides efficient deduplication of array elements using strict equality comparison.

**Backlog Item:** BL-018 - Add unique() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `unique<T>(arr: T[]): T[]`
- Removes duplicate values using Set
- Handles empty arrays
- Has comprehensive tests
- Uses validation for non-array input

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `unique<T>(arr: T[]): T[]`

**Details:**
- Generic type parameter `<T>` preserves input array element type
- Return type `T[]` maintains same type as input
- Returns new array (does not mutate input)

**Acceptance Criteria:**
- Function accepts single parameter of type `T[]`
- Returns array of type `T[]`
- Type parameter `T` is inferred from array input
- Input array unchanged (immutable operation)

### FR-002: Deduplication using Set
**Requirement:** Remove duplicate values using JavaScript Set

**Details:**
- Use `new Set(arr)` for deduplication
- Convert back to array with spread: `[...new Set(arr)]`
- Set uses strict equality (===) for comparison
- O(n) time complexity

**Acceptance Criteria:**
- `unique([1, 2, 2, 3])` returns `[1, 2, 3]`
- Duplicate values removed completely
- First occurrence order preserved
- Algorithm uses Set internally

### FR-003: Empty array handling
**Requirement:** Return empty array for empty input

**Details:**
- Empty array (`[]`) should return empty array `[]`
- No error thrown for empty array
- Type preservation maintained

**Acceptance Criteria:**
- `unique([])` returns `[]`
- No exceptions thrown for empty input
- Return type still `T[]`

### FR-004: Special value handling
**Requirement:** Handle NaN and primitive types correctly

**Details:**
- Set treats all NaN values as equal (ES6 behavior)
- Primitive types (numbers, strings, booleans) use strict equality
- Object references compared by reference (not deep equality)

**Acceptance Criteria:**
- `unique([NaN, NaN])` returns single `[NaN]`
- Primitive duplicates removed correctly
- Object references: only identical references deduplicated

### FR-005: Module location and exports
**Requirement:** Add function to array module and export from main index

**Details:**
- File location: `src/array/unique.ts`
- Export from `src/array/index.ts`
- Export from `src/index.ts` (already done in Feature 001)

**Acceptance Criteria:**
- Function importable from `'../../src/index.js'` in tests
- ESM import with `.js` extension works
- Part of public API

## Non-Functional Requirements

### NFR-001: Performance
**Requirement:** O(n) time complexity for deduplication

**Metrics:**
- Single pass through array to create Set
- No nested loops or repeated comparisons
- Memory usage O(n) for Set storage

### NFR-002: Immutability
**Requirement:** Do not mutate input array

**Metrics:**
- Input array unchanged after function call
- Returns new array instance
- Suitable for functional programming patterns

### NFR-003: Type safety
**Requirement:** Generic type preservation

**Metrics:**
- TypeScript compiler maintains element type
- No type assertions needed
- Type inference works automatically

## Out of Scope

- Validation that input is actually an array (trust TypeScript types per decision in Task 004)
- Deep equality for objects (only reference equality)
- Custom comparison functions
- Preserving all occurrences (only first occurrence preserved)

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/unique.test.ts)

**Test categories:**
1. **Happy path:** Remove duplicates from array with primitives
2. **Empty array:** Returns empty array
3. **No duplicates:** Returns copy unchanged
4. **All duplicates:** Returns single unique element
5. **NaN handling:** Set treats NaN as equal
6. **Type preservation:** Generic type T maintained
7. **Order preservation:** First occurrence order kept

**Edge cases:**
- Empty array: `[]`
- No duplicates: `[1, 2, 3]`
- All duplicates: `[1, 1, 1]`
- Mixed types: numbers, strings
- Special values: `NaN`, `0`, `-0`
- Large arrays: performance validation

**Test count estimate:** 6-8 tests

## Dependencies

- TypeScript 5.x with generic type support
- Jest testing framework
- ESM module system
- Features 001-002 establish array module structure

## Acceptance Criteria Summary

- [ ] Function signature: `unique<T>(arr: T[]): T[]`
- [ ] Uses Set for deduplication (O(n) performance)
- [ ] Removes duplicate values with strict equality
- [ ] Handles empty arrays (returns empty array)
- [ ] NaN values deduplicated (Set behavior)
- [ ] Preserves order of first occurrence
- [ ] Has comprehensive tests covering edge cases
- [ ] Generic type T preserved in return type
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`

**Note:** Backlog mentions "uses validation for non-array input" but per Task 004 decision (Trust TypeScript types), we do not add runtime array validation. TypeScript provides compile-time safety.