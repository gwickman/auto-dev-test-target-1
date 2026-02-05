# Test Strategy - v004 Array Utilities

This document defines comprehensive test requirements for all 7 array utility features in v004, following v003's proven testing patterns.

---

## Feature 001-first

**Function:** `first<T>(arr: T[]): T | undefined`
**Backlog:** BL-020

### Unit Tests

- [ ] `tests/array/first.test.ts` - Test first element access
  - Happy path: Returns first element of non-empty array
  - Empty array: Returns undefined
  - Single element: Returns that element
  - Type preservation: Generic type T preserved in return
  - Type narrowing: Demonstrate `T | undefined` handling in code

**Test Count Estimate:** 4-5 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Simple utility function, unit tests sufficient

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Feature 002-last

**Function:** `last<T>(arr: T[]): T | undefined`
**Backlog:** BL-021

### Unit Tests

- [ ] `tests/array/last.test.ts` - Test last element access
  - Happy path: Returns last element of non-empty array
  - Empty array: Returns undefined
  - Single element: Returns that element
  - Type preservation: Generic type T preserved in return
  - Type narrowing: Demonstrate `T | undefined` handling in code

**Test Count Estimate:** 4-5 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Simple utility function, unit tests sufficient

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Feature 003-unique

**Function:** `unique<T>(arr: T[]): T[]`
**Backlog:** BL-018

### Unit Tests

- [ ] `tests/array/unique.test.ts` - Test deduplication
  - Happy path: Removes duplicates from array with primitives
  - Empty array: Returns empty array
  - No duplicates: Returns copy of array unchanged
  - All duplicates: Returns single unique element
  - NaN handling: Set treats NaN as equal (single NaN in result)
  - Type preservation: Generic type T preserved in return
  - Order preservation: First occurrence order maintained

**Test Count Estimate:** 6-8 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Pure utility function

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Feature 004-chunk

**Function:** `chunk<T>(arr: T[], size: number): T[][]`
**Backlog:** BL-019

### Unit Tests

- [ ] `tests/array/chunk.test.ts` - Test array chunking
  - Happy path: Splits array into chunks of specified size
  - Empty array: Returns empty array
  - Size equals length: Returns single chunk with entire array
  - Size greater than length: Returns single chunk with entire array
  - Last chunk smaller: Last chunk contains remaining elements
  - Single element chunks: Size 1 creates array of single-element arrays
  - Validation errors:
    - InvalidNumberError: size is not positive integer (0, negative, decimal, NaN, Infinity)
    - Include field name in error for context
  - Type preservation: Generic type T preserved in nested array return

**Test Count Estimate:** 8-10 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Validation integration tested in unit tests

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Feature 005-compact

**Function:** `compact<T>(arr: T[]): T[]`
**Backlog:** BL-023

### Unit Tests

- [ ] `tests/array/compact.test.ts` - Test falsy value removal
  - Happy path: Removes all falsy values from mixed array
  - All falsy values removed:
    - false, null, 0, "", undefined, NaN all removed
  - Truthy values preserved:
    - Empty objects {} and arrays [] preserved
    - String "0", number 1, boolean true preserved
  - Empty array: Returns empty array
  - No falsy values: Returns copy with all elements
  - All falsy: Returns empty array
  - Type preservation: Generic type T preserved (with note about type narrowing limitation)

**Test Count Estimate:** 7-9 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Pure transformation function

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Feature 006-flatten

**Function:** `flatten(arr: any[], depth?: number): any[]`
**Backlog:** BL-022

### Unit Tests

- [ ] `tests/array/flatten.test.ts` - Test array flattening
  - Happy path: Flattens nested array to depth 1 (default)
  - Depth 0: Returns shallow copy unchanged
  - Depth 1: Flattens one level
  - Depth 2: Flattens two levels
  - Depth 3+: Flattens multiple levels
  - Infinity depth: Fully flattens all levels
  - Empty array: Returns empty array
  - No nested arrays: Returns copy of array
  - Mixed nesting: Some nested, some flat elements
  - Validation errors:
    - InvalidNumberError: depth is negative
    - InvalidNumberError: depth is not integer (decimal, NaN)
    - Note: Infinity is valid (not rejected)
    - Include field name in error
  - Special values: null, undefined in nested arrays preserved

**Test Count Estimate:** 10-12 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Validation integration tested in unit tests

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Feature 007-intersection

**Function:** `intersection<T>(...arrays: T[][]): T[]`
**Backlog:** BL-024

### Unit Tests

- [ ] `tests/array/intersection.test.ts` - Test array intersection
  - Happy path: Returns common elements from two arrays
  - Three or more arrays: Returns elements common to all
  - No common elements: Returns empty array
  - Empty array input: Returns empty array (no elements common)
  - No arrays provided: Returns empty array
  - Single array: Returns unique elements from that array
  - Duplicate handling: Result contains no duplicates (Set deduplication)
  - Strict equality: Uses === for comparison (reference equality for objects)
  - Order preservation: Order from first array maintained
  - Type preservation: Generic type T preserved

**Test Count Estimate:** 8-10 tests

### Golden Scenarios

- [ ] Scenario affected: None
- [ ] New scenario needed: No - Pure computation function

### Parity Tests

- [ ] Parity scenario: N/A - No API/MCP interface

### Contract Tests

- [ ] DTO: N/A - No DTOs involved

### Replay Fixtures

- [ ] Fixture: Uses existing - No execution patterns changed

---

## Validation Function Tests

### isNonNegativeInteger (New)

**Function:** `isNonNegativeInteger(value: unknown): value is number`
**Location:** `src/validation/index.ts`

### Unit Tests

- [ ] `tests/validation/index.test.ts` - Add tests for new validator
  - Returns true for non-negative integers: 0, 1, 100, Number.MAX_SAFE_INTEGER
  - Returns false for negative integers: -1, -100
  - Returns false for decimals: 0.5, 1.1
  - Returns false for non-finite numbers: Infinity, -Infinity, NaN
  - Returns false for non-number types: null, undefined, string, object, array
  - Type narrowing verification: Compile-time type test

**Test Count Estimate:** 5-7 tests

---

## Test Patterns from v003

All v004 tests follow v003's comprehensive edge case testing patterns:

### Standard Test Structure
1. **Happy path tests** - Normal usage scenarios first
2. **Edge case tests** - Boundary conditions, special values
3. **Error condition tests** - Validation failures with specific error type checks
4. **Type narrowing tests** - Compile-time type safety verification

### Edge Cases to Cover
- **Empty inputs:** Empty arrays for all functions
- **Special values:** null, undefined, NaN in arrays
- **Boundary conditions:** Single elements, very large arrays
- **Type-specific:** Mixed types where applicable

### Error Testing Pattern
```typescript
it('throws InvalidNumberError if parameter is invalid', () => {
  expect(() => funcName(invalidParam)).toThrow(InvalidNumberError);
  expect(() => funcName(invalidParam)).toThrow('specific message if needed');
});
```

### Type Narrowing Pattern
```typescript
it('narrows type correctly', () => {
  const value: T | undefined = first(arr);
  if (value !== undefined) {
    // TypeScript knows value is T here
    const typed: T = value; // Should compile
  }
});
```

### Import Pattern
All test files import from main index:
```typescript
import { first, last, unique, chunk, flatten, compact, intersection } from '../../src/index.js';
```

---

## Summary Statistics

### Test File Count
- **Array utility tests:** 7 files (`tests/array/*.test.ts`)
- **Validation tests:** 1 file updated (`tests/validation/index.test.ts`)
- **Total new test files:** 7

### Test Count Estimates

| Feature | Test Count | Category |
|---------|-----------|----------|
| 001-first | 4-5 | Simple access |
| 002-last | 4-5 | Simple access |
| 003-unique | 6-8 | Set operations |
| 004-chunk | 8-10 | Validation + logic |
| 005-compact | 7-9 | Filtering |
| 006-flatten | 10-12 | Recursive + validation |
| 007-intersection | 8-10 | Complex operations |
| **Subtotal** | **47-59** | Array utilities |
| isNonNegativeInteger | 5-7 | New validator |
| **Total** | **52-66** | All v004 tests |

### Expected Test Growth
- **Current (v003):** 60 tests
- **After v004:** ~112-126 tests
- **Growth:** ~87-110% increase

### Quality Standards
- **Pass Rate Target:** 100% (all tests passing)
- **Coverage Areas:** Happy path, edge cases, errors, type narrowing
- **CI Pass Rate:** 100% on first submission (target per v003)
- **Zero Flaky Tests:** All tests deterministic and repeatable

---

## Test Execution Strategy

### During Development
1. Implement function
2. Write comprehensive tests (all categories)
3. Run tests locally: `npm test`
4. Verify TypeScript compilation: `npm run build`
5. Fix issues before PR

### PR Workflow
1. Create feature branch
2. Implement + test
3. Run local verification (build + test)
4. Commit and push
5. Create PR
6. Monitor GitHub Actions CI
7. Fix failures (max 3 attempts per AGENTS.md)
8. Merge when green

### Theme Completion
- All features in theme pass tests
- All acceptance criteria met
- No outstanding issues
- Ready for next theme

### Version Completion
- All 7 features implemented and tested
- 52-66 new tests passing
- 2 new validators tested
- Quality gates: 100% pass rate
- Zero technical debt

---

## Notes

- **No integration tests needed:** All features are standalone utilities
- **No performance tests needed:** Standard algorithms with known complexity
- **No E2E tests needed:** Library functions, not application
- **Module structure test:** Verify all functions exported from `src/index.ts`
- **Documentation:** Function signatures and TypeScript types serve as primary docs
