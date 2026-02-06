# Requirements: intersection

## Goal

Create an `intersection()` function that returns elements common to all provided arrays using variadic parameters and Set-based operations.

## Background

This is part of v004 Theme 02 (array-advanced) implementing advanced array transformation utilities. The function provides efficient multi-array intersection with automatic deduplication using strict equality comparison.

**Backlog Item:** BL-024 - Add intersection() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `intersection<T>(...arrays: T[][]): T[]`
- Returns common elements from all arrays
- Uses strict equality
- Returns empty array if no common elements
- Has comprehensive tests

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `intersection<T>(...arrays: T[][]): T[]`

**Details:**
- Generic type parameter `<T>` for array element type
- Variadic parameter `...arrays: T[][]` accepts arbitrary number of arrays
- Return type `T[]` contains common elements
- Returns new array (does not mutate inputs)

**Acceptance Criteria:**
- Function accepts zero or more arrays via rest parameter
- Returns array of type `T[]`
- Type parameter `T` is inferred from input arrays
- Input arrays unchanged (immutable operation)

### FR-002: Common element identification
**Requirement:** Return elements present in all provided arrays

**Details:**
- Element must appear in every array to be included
- Use Set for first array to get unique elements
- Filter with `every()` to check presence in all other arrays
- Order from first array preserved

**Acceptance Criteria:**
- `intersection([1, 2], [2, 3])` returns `[2]`
- `intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])` returns `[3]`
- Element in all arrays -> included in result
- Element missing from any array -> excluded from result

### FR-003: Strict equality comparison
**Requirement:** Use strict equality (===) for element comparison

**Details:**
- Primitive types compared by value
- Objects compared by reference (not deep equality)
- NaN handling follows JavaScript `===` semantics
- `includes()` uses SameValueZero algorithm (NaN equal to NaN)

**Acceptance Criteria:**
- `intersection([1, 2], ['1', '2'])` returns `[]` (different types)
- `intersection([NaN], [NaN])` returns `[NaN]` (includes uses SameValueZero)
- Object references must be identical to match

### FR-004: Empty result handling
**Requirement:** Return empty array when no common elements

**Details:**
- No arrays provided: return empty array
- No common elements: return empty array
- One array provided: return unique elements from that array

**Acceptance Criteria:**
- `intersection()` returns `[]` (no arrays)
- `intersection([1, 2], [3, 4])` returns `[]` (no overlap)
- `intersection([1, 2, 2])` returns `[1, 2]` (single array deduplicated)

### FR-005: Deduplication
**Requirement:** Result contains no duplicates

**Details:**
- Use Set for first array automatically deduplicates
- Only first occurrence from first array included
- Even if element appears multiple times in multiple arrays

**Acceptance Criteria:**
- `intersection([1, 1, 2], [1, 2, 2])` returns `[1, 2]`
- Duplicates in first array deduplicated
- Result has unique elements only

### FR-006: Order preservation
**Requirement:** Maintain order from first array

**Details:**
- Result order matches first array's element order
- Later arrays don't affect order
- Only affects which elements included, not their order

**Acceptance Criteria:**
- `intersection([3, 1, 2], [1, 2, 3])` returns `[3, 1, 2]`
- First array order preserved in result

### FR-007: Module location and exports
**Requirement:** Add function to array module and export from main index

**Details:**
- File location: `src/array/intersection.ts`
- Export from `src/array/index.ts`
- Export from `src/index.ts` (already done in Theme 01)

**Acceptance Criteria:**
- Function importable from `'../../src/index.js'` in tests
- ESM import with `.js` extension works
- Part of public API

## Non-Functional Requirements

### NFR-001: Performance
**Requirement:** O(n x m) time complexity

**Metrics:**
- n = total elements across all arrays
- m = number of arrays
- Set provides O(1) lookups
- Better than nested loop O(n^2) approach

### NFR-002: Immutability
**Requirement:** Do not mutate input arrays

**Metrics:**
- Input arrays unchanged after function call
- Returns new array instance
- Suitable for functional programming patterns

### NFR-003: Type safety
**Requirement:** Generic type preservation

**Metrics:**
- TypeScript compiler maintains element type
- Variadic parameter type checked
- Type inference works automatically

## Out of Scope

- Deep equality for objects (only reference equality)
- Custom comparison functions
- Validation that inputs are actually arrays (trust TypeScript types)
- Multi-set intersection (counting duplicates)

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/intersection.test.ts)

**Test categories:**
1. **Happy path:** Common elements from two arrays
2. **Three+ arrays:** Elements common to all
3. **No common elements:** Returns empty array
4. **Empty array input:** Returns empty array
5. **No arrays provided:** Returns empty array
6. **Single array:** Returns unique elements
7. **Deduplication:** Result contains no duplicates
8. **Strict equality:** Type checking and reference equality
9. **Order preservation:** First array order maintained
10. **Type preservation:** Generic type T maintained

**Edge cases:**
- No arrays: `intersection()`
- Single array: `intersection([1, 2, 2])`
- No overlap: `intersection([1, 2], [3, 4])`
- Empty array in input: `intersection([1, 2], [])`
- Duplicates: `intersection([1, 1, 2], [1, 2, 2])`
- Mixed types: `intersection([1, '1'], [1])`

**Test count estimate:** 8-10 tests

## Dependencies

- TypeScript 5.x with generic type support
- Jest testing framework
- ESM module system
- Theme 01 and Features 005-006 establish array module structure

## Acceptance Criteria Summary

- [ ] Function signature: `intersection<T>(...arrays: T[][]): T[]`
- [ ] Returns elements common to all provided arrays
- [ ] Uses strict equality (===) for comparison
- [ ] Returns empty array if no common elements
- [ ] Returns empty array if no arrays provided
- [ ] Deduplicates result (Set-based)
- [ ] Preserves order from first array
- [ ] Handles empty arrays in input
- [ ] Has comprehensive tests covering edge cases
- [ ] Generic type T preserved in return type
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`