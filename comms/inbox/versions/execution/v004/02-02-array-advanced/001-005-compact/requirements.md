# Requirements: compact

## Goal

Create a `compact()` function that removes all falsy values from an array while preserving truthy values including empty objects and arrays.

## Background

This is part of v004 Theme 02 (array-advanced) implementing advanced array transformation utilities. The function provides efficient filtering of falsy values: `false`, `null`, `0`, `""`, `undefined`, and `NaN`.

**Backlog Item:** BL-023 - Add compact() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `compact<T>(arr: T[]): T[]`
- Removes all falsy values
- Preserves truthy values including empty objects/arrays
- Has comprehensive tests
- Returns correct types

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `compact<T>(arr: T[]): T[]`

**Details:**
- Generic type parameter `<T>` for input array element type
- Return type `T[]` maintains array type
- Returns new array (does not mutate input)
- Type assertion needed due to TypeScript limitation with falsy filtering

**Acceptance Criteria:**
- Function accepts single parameter of type `T[]`
- Returns array of type `T[]`
- Type parameter `T` is inferred from array input
- Input array unchanged (immutable operation)

### FR-002: Falsy value removal
**Requirement:** Remove all six JavaScript falsy values

**Details:**
- Falsy values to remove:
  - `false` (boolean)
  - `null`
  - `0` (number zero)
  - `""` (empty string)
  - `undefined`
  - `NaN` (not a number)
- Use `filter(Boolean)` pattern
- O(n) time complexity

**Acceptance Criteria:**
- `compact([1, 0, 2, false, 3])` returns `[1, 2, 3]`
- `compact(['a', '', 'b', null])` returns `['a', 'b']`
- All six falsy value types removed from mixed array
- Truthy values preserved in correct order

### FR-003: Truthy value preservation
**Requirement:** Preserve all truthy values including edge cases

**Details:**
- Truthy values to preserve:
  - Non-zero numbers (positive, negative)
  - Non-empty strings (including `"0"`, `"false"`)
  - `true` boolean
  - Objects (including `{}`)
  - Arrays (including `[]`)
- Empty objects and empty arrays are truthy in JavaScript

**Acceptance Criteria:**
- `compact([{}, 0, []])` returns `[{}, []]`
- `compact(['0', '1'])` returns `['0', '1']` (strings are truthy)
- `compact([1, -1, true])` returns `[1, -1, true]`

### FR-004: Empty array handling
**Requirement:** Return empty array for empty input or all-falsy input

**Details:**
- Empty array (`[]`) should return empty array `[]`
- Array of all falsy values returns empty array
- No error thrown

**Acceptance Criteria:**
- `compact([])` returns `[]`
- `compact([null, undefined, false, 0])` returns `[]`

### FR-005: Module location and exports
**Requirement:** Add function to array module and export from main index

**Details:**
- File location: `src/array/compact.ts`
- Export from `src/array/index.ts`
- Export from `src/index.ts` (already done in Theme 01)

**Acceptance Criteria:**
- Function importable from `'../../src/index.js'` in tests
- ESM import with `.js` extension works
- Part of public API

## Non-Functional Requirements

### NFR-001: Performance
**Requirement:** O(n) time complexity for filtering

**Metrics:**
- Single pass through array with filter
- No nested loops or repeated checks
- Memory usage O(n) for result array

### NFR-002: Immutability
**Requirement:** Do not mutate input array

**Metrics:**
- Input array unchanged after function call
- Returns new array instance
- Suitable for functional programming patterns

### NFR-003: Type handling limitation
**Requirement:** Accept TypeScript's type narrowing limitation

**Metrics:**
- Use type assertion `as T[]` after filter
- Document limitation in implementation comments
- Test verifies behavior despite type system limitation

## Out of Scope

- Custom falsy value definitions (only JavaScript's six falsy values)
- Deep filtering of nested arrays (only top-level elements)
- Validation that input is actually an array (trust TypeScript types)
- Performance optimization beyond filter(Boolean)

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/compact.test.ts)

**Test categories:**
1. **Happy path:** Remove falsy values from mixed array
2. **All falsy removed:** Test all six falsy value types
3. **Truthy preserved:** Empty objects/arrays, "0" string, etc.
4. **Empty array:** Returns empty array
5. **No falsy values:** Returns copy with all elements
6. **All falsy:** Returns empty array
7. **Type preservation:** Generic type T maintained

**Edge cases:**
- Empty array: `[]`
- All falsy: `[null, undefined, false, 0, "", NaN]`
- All truthy: `[1, "a", true, {}, []]`
- Mixed: `[1, 0, "a", null, true, false]`
- Edge truthy: `[{}, [], "0", "false"]`

**Test count estimate:** 7-9 tests

## Dependencies

- TypeScript 5.x with generic type support
- Jest testing framework
- ESM module system
- Theme 01 establishes array module structure

## Acceptance Criteria Summary

- [ ] Function signature: `compact<T>(arr: T[]): T[]`
- [ ] Removes all six falsy values (false, null, 0, "", undefined, NaN)
- [ ] Preserves all truthy values including {} and []
- [ ] Handles empty arrays (returns empty array)
- [ ] Handles all-falsy arrays (returns empty array)
- [ ] Has comprehensive tests covering all falsy types and edge cases
- [ ] Generic type T preserved in return type
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`