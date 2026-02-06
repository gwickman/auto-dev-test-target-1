# Requirements: flatten

## Goal

Create a `flatten()` function that flattens nested arrays to a specified depth with support for Infinity to flatten all levels.

## Background

This is part of v004 Theme 02 (array-advanced) implementing advanced array transformation utilities. The function provides recursive array flattening with depth control, demonstrating complex algorithms and validation integration.

**Backlog Item:** BL-022 - Add flatten() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `flatten(arr: any[], depth?: number): any[]`
- Default depth is 1
- Supports Infinity for full flatten
- Validates depth is non-negative
- Has comprehensive tests with nested arrays

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `flatten(arr: any[], depth?: number): any[]`

**Details:**
- Parameter `arr: any[]` accepts nested arrays of arbitrary depth
- Parameter `depth?: number` is optional with default value 1
- Return type `any[]` due to TypeScript limitation with nested arrays
- Returns new array (does not mutate input)

**Acceptance Criteria:**
- Function accepts array parameter `arr: any[]`
- Function accepts optional depth parameter `depth?: number`
- Default depth is 1
- Returns flattened array `any[]`

### FR-002: Depth-controlled flattening
**Requirement:** Flatten nested arrays to specified depth

**Details:**
- Depth 0: Return shallow copy unchanged
- Depth 1: Flatten one level of nesting (default)
- Depth 2+: Flatten multiple levels recursively
- Depth Infinity: Flatten all levels completely
- Recursive algorithm with depth decrement

**Acceptance Criteria:**
- `flatten([[1, 2], [3, 4]])` returns `[1, 2, 3, 4]` (default depth 1)
- `flatten([[1, [2]], [3, [4]]], 2)` returns `[1, 2, 3, 4]`
- `flatten([[1, [2, [3]]]], Infinity)` returns `[1, 2, 3]`
- `flatten([[1, 2], [3, 4]], 0)` returns `[[1, 2], [3, 4]]`

### FR-003: Default depth parameter
**Requirement:** Default depth to 1 when not specified

**Details:**
- Follow JavaScript `Array.prototype.flat()` behavior
- Depth parameter optional: `depth?: number`
- Default value: `depth: number = 1`

**Acceptance Criteria:**
- `flatten([[1, 2]])` same as `flatten([[1, 2]], 1)`
- Default value evident in function signature
- Matches standard library behavior

### FR-004: Infinity depth handling
**Requirement:** Support Infinity for complete flattening

**Details:**
- `depth === Infinity` flattens all levels
- Special case in recursive logic
- Must not decrement Infinity (remains Infinity)
- Continues until no nested arrays remain

**Acceptance Criteria:**
- `flatten([[[[[1]]]]], Infinity)` returns `[1]`
- Works with arbitrarily deep nesting
- No infinite loop or stack overflow for reasonable depths

### FR-005: Depth validation
**Requirement:** Validate depth is non-negative integer or Infinity

**Details:**
- Must be >= 0 (negative depths invalid)
- Must be integer (no decimals) or Infinity
- Must be finite (except Infinity which is explicitly allowed)
- Throw InvalidNumberError for invalid values
- Use new `isNonNegativeInteger()` validator

**Acceptance Criteria:**
- Throws `InvalidNumberError` if depth < 0
- Throws `InvalidNumberError` if depth is decimal
- Throws `InvalidNumberError` if depth is NaN
- Does NOT throw for depth = 0 (valid)
- Does NOT throw for depth = Infinity (valid)
- Error includes field name 'depth' for context

### FR-006: Empty and non-nested array handling
**Requirement:** Handle edge cases correctly

**Details:**
- Empty array returns empty array
- No nested arrays: return shallow copy
- Mixed nested and non-nested elements handled correctly
- null and undefined in nested arrays preserved

**Acceptance Criteria:**
- `flatten([])` returns `[]`
- `flatten([1, 2, 3])` returns `[1, 2, 3]` (shallow copy)
- `flatten([1, [2], 3])` returns `[1, 2, 3]`
- `flatten([null, [undefined]])` returns `[null, undefined]`

### FR-007: Module location and exports
**Requirement:** Add function to array module and export from main index

**Details:**
- File location: `src/array/flatten.ts`
- Export from `src/array/index.ts`
- Import validation from `src/validation/index.js`
- Import errors from `src/errors/index.js`

**Acceptance Criteria:**
- Function importable from `'../../src/index.js'` in tests
- ESM imports use `.js` extensions
- Part of public API

## Non-Functional Requirements

### NFR-001: Performance
**Requirement:** O(n x d) time complexity

**Metrics:**
- n = total number of elements
- d = depth parameter
- Recursive algorithm acceptable for reasonable depths
- Each element processed once per depth level

### NFR-002: Immutability
**Requirement:** Do not mutate input array

**Metrics:**
- Input array unchanged after function call
- Nested arrays unchanged
- Returns new array instances

### NFR-003: New validator
**Requirement:** Create isNonNegativeInteger validator

**Details:**
- Add to `src/validation/index.ts`
- Similar structure to existing validators
- Allows 0 (unlike isPositiveNumber)
- Excludes Infinity from integer check (handled separately)

**Acceptance Criteria:**
- `isNonNegativeInteger(0)` returns true
- `isNonNegativeInteger(1)` returns true
- `isNonNegativeInteger(-1)` returns false
- `isNonNegativeInteger(1.5)` returns false
- `isNonNegativeInteger(Infinity)` returns false
- Exported from `src/validation/index.ts` and `src/index.ts`

## Out of Scope

- Deep cloning of objects within arrays (shallow copy)
- Validation that input is actually an array (trust TypeScript types)
- Performance optimization for very deep nesting (>100 levels)
- Custom flatten logic or predicate functions

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/flatten.test.ts)

**Test categories:**
1. **Happy path:** Flatten nested array to depth 1 (default)
2. **Depth 0:** Returns shallow copy unchanged
3. **Depth 1:** Flattens one level
4. **Depth 2+:** Flattens multiple levels
5. **Infinity depth:** Fully flattens all levels
6. **Empty array:** Returns empty array
7. **No nesting:** Returns copy of array
8. **Mixed nesting:** Some nested, some flat elements
9. **Validation errors:** Invalid depth values throw errors
10. **Special values:** null, undefined preserved

**Edge cases:**
- Empty array: `[]`
- No nested arrays: `[1, 2, 3]`
- Mixed: `[1, [2], 3]`
- Deep nesting: `[[[1]]]`
- Invalid depth: negative, decimal, NaN

**Test count estimate:** 10-12 tests

### Validation Tests (tests/validation/index.test.ts)

**Add tests for isNonNegativeInteger:**
- Returns true: 0, 1, 100, MAX_SAFE_INTEGER
- Returns false: -1, -100, 0.5, NaN, Infinity
- Type narrowing verification

**Test count estimate:** 5-7 additional validation tests

## Dependencies

- TypeScript 5.x
- Jest testing framework
- ESM module system
- v003 validation infrastructure (InvalidNumberError)
- New validator: isNonNegativeInteger
- Theme 01 and Feature 005 establish array module structure

## Acceptance Criteria Summary

- [ ] Function signature: `flatten(arr: any[], depth?: number): any[]`
- [ ] Default depth is 1
- [ ] Flattens to specified depth recursively
- [ ] Supports Infinity for full flatten
- [ ] Validates depth is non-negative integer (or Infinity)
- [ ] Throws InvalidNumberError with field name for invalid depth
- [ ] Handles empty arrays and non-nested arrays
- [ ] Preserves null and undefined values
- [ ] New validator isNonNegativeInteger created and tested
- [ ] Has comprehensive tests including various depths and validation errors
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`