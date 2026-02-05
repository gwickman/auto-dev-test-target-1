# Backlog Item Details - v004

Complete details for all backlog items in v004 scope.

## Theme 01: array-basics

### BL-018: Add unique() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-basics, utility

**Description:**
> Create a unique() function that removes duplicate values from an array. Should handle primitive types and use strict equality. Return type should preserve input array type using generics.

**Acceptance Criteria:**
- Function signature: unique<T>(arr: T[]): T[]
- Removes duplicate values using Set
- Handles empty arrays
- Has comprehensive tests
- Uses validation for non-array input

**Complexity Assessment:**
Moderate complexity. While the concept is straightforward (using Set for deduplication), the implementation must handle TypeScript generics properly and integrate with the existing validation infrastructure from v003. The requirement to validate non-array inputs adds integration complexity.

---

### BL-019: Add chunk() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-basics, utility

**Description:**
> Create a chunk() function that splits an array into chunks of specified size. The last chunk may contain fewer elements if array length is not evenly divisible by chunk size.

**Acceptance Criteria:**
- Function signature: chunk<T>(arr: T[], size: number): T[][]
- Validates size is positive integer
- Handles empty arrays
- Last chunk contains remaining elements
- Has comprehensive tests

**Complexity Assessment:**
Moderate complexity. Requires array slicing logic and careful handling of edge cases (empty arrays, last chunk with fewer elements). The validation of positive integer size parameter adds integration with v003 validation utilities. The return type T[][] introduces nested generic arrays.

---

### BL-020: Add first() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-basics, utility

**Description:**
> Create a first() function that returns the first element of an array. Should handle empty arrays safely and optionally return a default value.

**Acceptance Criteria:**
- Function signature: first<T>(arr: T[]): T | undefined
- Returns undefined for empty arrays
- Has comprehensive tests
- Uses type guards

**Complexity Assessment:**
Low to moderate complexity. Simple array access with safe handling of empty arrays. The type signature T | undefined requires proper TypeScript type narrowing. The mention of "optionally return a default value" in the description is not reflected in the acceptance criteria, suggesting the simpler undefined-returning approach is preferred.

---

### BL-021: Add last() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-basics, utility

**Description:**
> Create a last() function that returns the last element of an array. Should handle empty arrays safely and optionally return a default value.

**Acceptance Criteria:**
- Function signature: last<T>(arr: T[]): T | undefined
- Returns undefined for empty arrays
- Has comprehensive tests
- Uses type guards

**Complexity Assessment:**
Low to moderate complexity. Very similar to first(), with array access from the end. Same considerations apply regarding empty arrays and type narrowing. The description mentions optional default values but acceptance criteria show undefined-returning approach.

---

## Theme 02: array-advanced

### BL-022: Add flatten() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-advanced, utility

**Description:**
> Create a flatten() function that flattens nested arrays to a specified depth. Default depth should be 1. Depth of Infinity should flatten all levels.

**Acceptance Criteria:**
- Function signature: flatten(arr: any[], depth?: number): any[]
- Default depth is 1
- Supports Infinity for full flatten
- Validates depth is non-negative
- Has comprehensive tests with nested arrays

**Complexity Assessment:**
Higher complexity. Requires recursive or iterative logic to handle arbitrary nesting depth. The depth parameter adds complexity in controlling how many levels to flatten. Supporting Infinity for full flatten requires special handling. The any[] type signature is less type-safe than generic approaches, suggesting intentional loosening for nested array flexibility.

---

### BL-023: Add compact() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-advanced, utility

**Description:**
> Create a compact() function that removes falsy values (false, null, 0, "", undefined, NaN) from an array. Useful for cleaning up data.

**Acceptance Criteria:**
- Function signature: compact<T>(arr: T[]): T[]
- Removes all falsy values
- Preserves truthy values including empty objects/arrays
- Has comprehensive tests
- Returns correct types

**Complexity Assessment:**
Moderate complexity. The logic is straightforward (filter falsy values), but TypeScript type handling is nuanced. The return type T[] must properly reflect that falsy values are removed. Testing must verify all six falsy JavaScript values are removed while preserving truthy values like empty objects/arrays.

---

### BL-024: Add intersection() array utility

**Priority:** P2
**Status:** open
**Size:** m
**Tags:** v004, array-advanced, utility

**Description:**
> Create an intersection() function that returns an array of values that appear in all provided arrays. Uses strict equality for comparison.

**Acceptance Criteria:**
- Function signature: intersection<T>(...arrays: T[][]): T[]
- Returns common elements from all arrays
- Uses strict equality
- Returns empty array if no common elements
- Has comprehensive tests

**Complexity Assessment:**
Moderate to higher complexity. The variadic parameter ...arrays: T[][] adds complexity. The algorithm must efficiently find elements common to all arrays, likely using Set-based operations. Strict equality comparison for primitive types works well, but the function may not handle object references as users might expect (reference equality vs deep equality).

---

## Summary Statistics

- **Total Items:** 7
- **Priority Distribution:**
  - P2: 7 (100%)
- **Theme Distribution:**
  - array-basics: 4 items (57%)
  - array-advanced: 3 items (43%)
- **Complexity Distribution:**
  - Low-Moderate: 2 items (first, last)
  - Moderate: 4 items (unique, chunk, compact, intersection)
  - Higher: 1 item (flatten)

## Integration Points

All features must integrate with v003 validation infrastructure:
- Use ValidationError types for error conditions
- Use type guards and assertion functions where appropriate
- Follow established error handling patterns

All features require:
- Generic TypeScript types (except flatten with any[])
- ESM module structure with .js extensions
- Comprehensive Jest test coverage
- CI/CD quality gate compliance
