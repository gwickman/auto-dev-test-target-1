# Phase 2 Document Drafts - v004

This document contains complete drafts for all v004 design documents organized by type.

---

## VERSION_DESIGN.md

# v004 Version Design

## Overview

**Version:** v004
**Title:** Array Utilities - Implement fundamental and advanced array manipulation utilities
**Themes:** 2
**Features:** 7

## Version Description

Natural progression from primitive utilities (strings/numbers) to collection utilities. Arrays are fundamental data structures that require generic type handling, making this an excellent test of auto-dev's TypeScript capabilities. This version expands the utility library with commonly-needed array operations while demonstrating TypeScript generic types `<T>` for type-safe array manipulation.

## Goals and Objectives

### Primary Goals
1. **Expand Utility Library Coverage**: Add array utilities to complement existing string (v001-v002) and number (v002) utilities
2. **Demonstrate Generic Type Handling**: Showcase TypeScript generic types `<T>` for type-safe array operations
3. **Build on v003 Foundation**: Integrate with validation patterns and error handling established in v003
4. **Test Auto-Dev with Collection Types**: Validate auto-dev-mcp can handle generic collection types and complex type signatures

### Technical Objectives
- Leverage TypeScript generics for type-safe array operations
- Integrate with custom error types from v003 (ValidationError, InvalidNumberError, OutOfRangeError)
- Maintain 100% test coverage with Jest
- Handle edge cases (empty arrays, invalid inputs, nested structures)

## Constraints and Assumptions

### Technical Constraints
1. **TypeScript 5.x compatibility**: Must use TypeScript 5.x features
2. **ESM modules**: All code must use ES module syntax with `.js` extensions in imports
3. **Generic types required**: All utilities must support any type `<T>` (except flatten which uses `any[]`)
4. **No runtime type checking**: Use TypeScript's compile-time type system

### Error Handling Constraints
- Must integrate with v003 error types:
  - `ValidationError` (base class)
  - `EmptyStringError`
  - `InvalidNumberError`
  - `OutOfRangeError`
- New validator needed: `isNonNegativeInteger()` for flatten depth parameter

### Quality Gate Constraints
- ✅ TypeScript compilation without errors
- ✅ 100% test pass rate
- ✅ Jest test coverage for all features
- ✅ GitHub Actions CI passing
- ✅ Conventional commit messages
- ✅ No console.log in production code

## Integration Points

### Dependencies on Previous Versions

**v001 - Foundation** (Completed):
- TypeScript 5.x configuration
- ESM module support
- Jest testing framework with ts-jest
- GitHub Actions CI pipeline
- Project structure (src/, tests/, dist/)

**v002 - Utility Functions** (Completed):
- Example utility patterns (string/, number/ directories)
- Testing patterns for utilities
- Code organization examples
- API design patterns

**v003 - Validation** (Completed):
- Custom error class hierarchy (src/errors/)
  - `ValidationError` base class
  - Specific error types (EmptyString, InvalidNumber, OutOfRange)
- Type guard validators (src/validation/)
  - `isNonEmptyString()`
  - `isPositiveNumber()`
  - `isInRange()`
- Error handling patterns
- Integration examples (truncate, clamp, roundTo)

### Module Integration

**Files to Modify:**
1. `src/index.ts` - Add `export * from './array/index.js';`
2. `src/validation/index.ts` - Add `isNonNegativeInteger()` validator

**Files to Create:**
- Source: 8 files (`src/array/*.ts` - 7 functions + index)
- Tests: 7 files (`tests/array/*.test.ts`)

**No Breaking Changes**: All changes are additive. Existing exports unchanged.

## Themes

| # | Theme | Goal | Features |
|---|-------|------|----------|
| 1 | 01-array-basics | Implement foundational array utilities (first, last, unique, chunk) | 4 |
| 2 | 02-array-advanced | Implement advanced transformations (compact, flatten, intersection) | 3 |

## Rationale for Design Decisions

### Theme Grouping
**Theme 01 (array-basics)** contains simple utilities with minimal complexity:
- `first()` and `last()` are trivial array access functions returning `T | undefined`
- `unique()` leverages Set for simple O(n) deduplication
- `chunk()` uses straightforward slicing logic with validation

**Theme 02 (array-advanced)** contains more complex operations:
- `compact()` requires type narrowing considerations (TypeScript limitation with falsy filtering)
- `flatten()` involves recursive algorithm with depth handling including Infinity support
- `intersection()` combines Set operations with variadic parameters (`...arrays: T[][]`)

This grouping allows executing simpler features first to establish patterns, then progressing to more complex implementations.

### Implementation Patterns Selected
Based on research (Task 003), selected industry-standard approaches:
- **unique()**: Set conversion with spread operator (`[...new Set(arr)]`) - O(n) performance
- **chunk()**: For-loop with slice (most readable approach)
- **first/last()**: Direct array access with `T | undefined` return type for safety
- **flatten()**: Recursive reduce with depth parameter, explicit Infinity handling
- **compact()**: `filter(Boolean)` with type assertion (TypeScript limitation accepted)
- **intersection()**: Set-based filter with `every()` check for multiple arrays

### Validation Strategy
**New validators in src/validation/index.ts:**
- `isNonNegativeInteger(value: unknown): value is number` - For flatten() depth (allows 0)

**Reuse existing validators:**
- `isPositiveNumber()` combined with `Number.isInteger()` check for chunk() size
- `OutOfRangeError` for invalid parameters
- `InvalidNumberError` for type violations

**No array type validation**: Trust TypeScript types following existing pattern (capitalize, clamp, etc.)

## Success Criteria

Version is complete when:

- [ ] Theme 01 (array-basics): Implement foundational array utilities
- [ ] Theme 02 (array-advanced): Implement advanced transformations
- [ ] All 7 features implemented with comprehensive tests
- [ ] 100% acceptance criteria met (35 total criteria: 5 per feature × 7 features)
- [ ] All quality gates pass (TypeScript compilation, Jest tests, CI)
- [ ] Zero technical debt introduced
- [ ] Integration with v003 validation infrastructure successful
- [ ] ~52-66 new tests passing (~87-110% growth from current 60 tests)

---

## THEME_INDEX.md

# v004 Theme Index

## Execution Order

Execute themes in order. Each theme must complete before starting the next.

### Theme 01: array-basics

**Path:** `comms/inbox/versions/execution/v004/01-array-basics/`
**Goal:** Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks.

**Features:**

- 001-first: Get first element of array safely with undefined handling (BL-020)
- 002-last: Get last element of array safely with undefined handling (BL-021)
- 003-unique: Remove duplicate values from array using Set (BL-018)
- 004-chunk: Split array into fixed-size chunks handling remainder (BL-019)

**Dependencies:** v003 validation infrastructure

### Theme 02: array-advanced

**Path:** `comms/inbox/versions/execution/v004/02-array-advanced/`
**Goal:** Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. Build upon JavaScript Set operations and recursive algorithms for sophisticated array manipulation.

**Features:**

- 005-compact: Remove all falsy values from array preserving truthy elements (BL-023)
- 006-flatten: Flatten nested arrays to specified depth including Infinity (BL-022)
- 007-intersection: Find common elements present in all provided arrays (BL-024)

**Dependencies:** Theme 01 establishes module structure, v003 validation infrastructure

## Notes

- Each feature folder contains requirements.md and implementation-plan.md
- Output documents go to comms/outbox/
- Follow AGENTS.md for implementation process
- Theme 01 creates `src/array/` directory structure
- Theme 02 extends the array module with advanced utilities

---

## Theme 01: array-basics

### THEME_DESIGN.md

# Theme: array-basics

## Goal

Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. This theme focuses on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks. These functions establish patterns for array module organization and demonstrate generic type preservation.

## Features

| # | Feature | Backlog | Goal |
|---|---------|---------|------|
| 001 | first | BL-020 | Get first element of array safely with undefined handling |
| 002 | last | BL-021 | Get last element of array safely with undefined handling |
| 003 | unique | BL-018 | Remove duplicate values from array using Set |
| 004 | chunk | BL-019 | Split array into fixed-size chunks handling remainder |

## Dependencies

### External Dependencies
- v003 validation infrastructure (ValidationError, InvalidNumberError)
- TypeScript 5.x with generic type support
- Jest testing framework

### Feature Dependencies
- All features are independent within this theme
- Feature 004 (chunk) demonstrates validation integration pattern
- Recommended execution order: 001 → 002 → 003 → 004 (simple to complex)

### Module Structure
- Creates `src/array/` directory with individual function files
- Creates `src/array/index.ts` to re-export all functions
- Updates `src/index.ts` to export array module
- Creates `tests/array/` directory for test files

## Technical Approach

### Module Organization
Follow existing patterns from v001-v003:
```
src/array/
  first.ts       - first<T>(arr: T[]): T | undefined
  last.ts        - last<T>(arr: T[]): T | undefined
  unique.ts      - unique<T>(arr: T[]): T[]
  chunk.ts       - chunk<T>(arr: T[], size: number): T[][]
  index.ts       - Re-export all functions
```

Update `src/index.ts`:
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
export * from './array/index.js';  // NEW
```

### Implementation Patterns

**first() and last()**: Direct array index access
- Return `T | undefined` for empty array safety
- No validation needed (trust TypeScript types)
- O(1) time complexity

**unique()**: Set-based deduplication
- Use `[...new Set(arr)]` pattern (ES6+)
- O(n) time, O(n) space complexity
- Preserves order of first occurrence

**chunk()**: For-loop with slice
- Validate size is positive integer using existing validators
- Handle last chunk automatically (slice handles out-of-bounds)
- O(n) time, O(n) space complexity

### Validation Integration

**chunk() size parameter validation:**
```typescript
if (!isPositiveNumber(size) || !Number.isInteger(size)) {
  throw new InvalidNumberError('size must be a positive integer', 'size');
}
```

Pattern follows v003 truncate() validation approach.

## Integration Points

### With v003 Validation
- Import error types: `import { InvalidNumberError } from '../errors/index.js';`
- Use existing validators: `isPositiveNumber()` from `src/validation/index.ts`
- Include field parameter in errors for context

### With Existing Modules
- All array utilities exported from main `src/index.ts`
- Tests import from `../../src/index.js` (public API)
- ESM imports require `.js` extensions

### Testing Integration
- Follow v003 comprehensive edge case testing pattern
- Test files in `tests/array/` mirror source structure
- Empty arrays, special values, boundary conditions
- Type narrowing verification for first() and last()

## Risks

| Risk | Mitigation |
|------|------------|
| TypeScript generic type complexity | Follow proven patterns from research, test type preservation |
| chunk() validation integration | Reuse existing isPositiveNumber() validator, follow truncate() pattern |
| Set behavior with NaN and objects | Document behavior in tests (NaN equality, reference equality) |
| Empty array handling | Explicit tests for all functions with empty array input |

---

### Feature 001-first

#### requirements.md

# Requirements: first

## Goal

Create a `first()` function that returns the first element of an array safely, handling empty arrays by returning undefined.

## Background

This is part of v004 Theme 01 (array-basics) implementing foundational array utilities. The function provides type-safe access to the first array element without throwing errors on empty arrays.

**Backlog Item:** BL-018 - Add first() array utility

**Acceptance Criteria from Backlog:**
- Function signature: `first<T>(arr: T[]): T | undefined`
- Returns undefined for empty arrays
- Has comprehensive tests
- Uses type guards

## Functional Requirements

### FR-001: Function signature and return type
**Requirement:** Implement `first<T>(arr: T[]): T | undefined`

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
- `first([])` returns `undefined`
- No exceptions thrown for empty input
- TypeScript type system reflects `T | undefined` return

### FR-003: Non-empty array handling
**Requirement:** Return first element for non-empty arrays

**Details:**
- Access array at index 0: `arr[0]`
- Works with single-element arrays
- Works with multi-element arrays
- Preserves element type

**Acceptance Criteria:**
- `first([1, 2, 3])` returns `1`
- `first(['a'])` returns `'a'`
- Type of returned element matches array element type

### FR-004: Module location and exports
**Requirement:** Create function in array module and export from main index

**Details:**
- File location: `src/array/first.ts`
- Export from `src/array/index.ts`
- Export from `src/index.ts`

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
- Direct array index access
- No iteration required
- Instant return regardless of array size

### NFR-003: Zero runtime overhead
**Requirement:** No validation or error handling overhead

**Metrics:**
- No runtime type checking
- No parameter validation (trust TypeScript types)
- Single array access operation

## Out of Scope

- Default value parameter (description mentions but acceptance criteria excludes)
- Validation that input is actually an array (trust TypeScript types)
- Handling of array-like objects (only proper arrays)
- Deep copying or mutation concerns (read-only operation)

## Test Requirements

Based on test strategy from Task 004:

### Unit Tests (tests/array/first.test.ts)

**Test categories:**
1. **Happy path:** Non-empty array returns first element
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

## Acceptance Criteria Summary

- [ ] Function signature: `first<T>(arr: T[]): T | undefined`
- [ ] Returns undefined for empty arrays
- [ ] Returns first element for non-empty arrays
- [ ] Has comprehensive tests covering edge cases
- [ ] Type narrowing works with `T | undefined` return type
- [ ] Exported from `src/array/index.ts` and `src/index.ts`
- [ ] Tests pass with `npm test`
- [ ] Build succeeds with `npm run build`

---

#### implementation-plan.md

# Implementation Plan: first

## Overview

Implement `first()` function that safely returns the first element of an array with type-safe undefined handling for empty arrays.

**Complexity:** Low - Simple array index access
**Estimated effort:** ~15-20 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/first.ts` | Create | Main function implementation |
| `src/array/index.ts` | Create | Module exports (if first feature) or Modify (if exists) |
| `src/index.ts` | Modify | Add array module export (if first feature) |
| `tests/array/first.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Directory Structure and Implementation

**Create `src/array/first.ts`:**
```typescript
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

**Create or modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
```

**Modify `src/index.ts`** (add if first feature in theme):
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
export * from './array/index.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/first.js` and `dist/array/first.d.ts` created
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/first.test.ts`:**
```typescript
import { first } from '../../src/index.js';

describe('first', () => {
  it('returns first element of non-empty array', () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first(['a', 'b', 'c'])).toBe('a');
    expect(first([true, false])).toBe(true);
  });

  it('returns undefined for empty array', () => {
    expect(first([])).toBeUndefined();
  });

  it('returns element for single-element array', () => {
    expect(first([42])).toBe(42);
    expect(first(['only'])).toBe('only');
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 3];
    const result: number | undefined = first(numbers);
    expect(typeof result).toBe('number');

    const strings = ['a', 'b'];
    const strResult: string | undefined = first(strings);
    expect(typeof strResult).toBe('string');
  });

  it('supports type narrowing', () => {
    const arr = [10, 20, 30];
    const value = first(arr);

    if (value !== undefined) {
      // TypeScript knows value is number here
      const doubled: number = value * 2;
      expect(doubled).toBe(20);
    }
  });
});
```

**Verification commands:**
```bash
npm test tests/array/first.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 5 tests pass
- No test failures
- Type narrowing test demonstrates TypeScript type safety

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.first))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including existing tests from v001-v003)
- `first` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports `tests/**/*.test.ts` pattern
- ✓ ESM module mapper already configured
- ✓ No new test utilities required

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| TypeScript type inference issues | Low | Low | Explicit type tests verify generic behavior |
| Array index access edge cases | Low | Low | Comprehensive test coverage for empty/single/multi-element arrays |
| Module export issues | Low | Medium | Explicit verification command checks export availability |

## Commit Message

After implementation and verification:

```bash
git add src/array/first.ts src/array/index.ts src/index.ts tests/array/first.test.ts
git commit -m "feat(array): add first() utility for safe first element access

Implement first<T>(arr: T[]): T | undefined for type-safe access to first array element.

- Returns first element for non-empty arrays
- Returns undefined for empty arrays
- Generic type T preserved in return type
- Comprehensive tests with type narrowing verification

Part of v004 Theme 01 (array-basics) - Feature 001
Backlog: BL-020

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/first.ts` with function implementation
- [ ] Create or modify `src/array/index.ts` to export first
- [ ] Modify `src/index.ts` to export array module (if first feature)
- [ ] Create `tests/array/first.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository

---

### Feature 002-last

#### requirements.md

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

---

#### implementation-plan.md

# Implementation Plan: last

## Overview

Implement `last()` function that safely returns the last element of an array with type-safe undefined handling for empty arrays.

**Complexity:** Low - Simple array index access (very similar to first())
**Estimated effort:** ~15-20 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/last.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add last export |
| `tests/array/last.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/last.ts`:**
```typescript
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/last.js` and `dist/array/last.d.ts` created
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/last.test.ts`:**
```typescript
import { last } from '../../src/index.js';

describe('last', () => {
  it('returns last element of non-empty array', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b', 'c'])).toBe('c');
    expect(last([true, false])).toBe(false);
  });

  it('returns undefined for empty array', () => {
    expect(last([])).toBeUndefined();
  });

  it('returns element for single-element array', () => {
    expect(last([42])).toBe(42);
    expect(last(['only'])).toBe('only');
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 3];
    const result: number | undefined = last(numbers);
    expect(typeof result).toBe('number');

    const strings = ['a', 'b'];
    const strResult: string | undefined = last(strings);
    expect(typeof strResult).toBe('string');
  });

  it('supports type narrowing', () => {
    const arr = [10, 20, 30];
    const value = last(arr);

    if (value !== undefined) {
      // TypeScript knows value is number here
      const doubled: number = value * 2;
      expect(doubled).toBe(60);
    }
  });
});
```

**Verification commands:**
```bash
npm test tests/array/last.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 5 tests pass
- No test failures
- Type narrowing test demonstrates TypeScript type safety

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.last))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including existing tests and first())
- `last` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established by Feature 001

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Off-by-one error in index calculation | Low | Medium | Test with single-element arrays explicitly |
| TypeScript type inference issues | Low | Low | Same pattern as first(), already proven |
| Negative array length edge case | Very Low | Low | JavaScript arrays have non-negative length by definition |

## Commit Message

After implementation and verification:

```bash
git add src/array/last.ts src/array/index.ts tests/array/last.test.ts
git commit -m "feat(array): add last() utility for safe last element access

Implement last<T>(arr: T[]): T | undefined for type-safe access to last array element.

- Returns last element for non-empty arrays
- Returns undefined for empty arrays
- Generic type T preserved in return type
- Comprehensive tests with type narrowing verification

Part of v004 Theme 01 (array-basics) - Feature 002
Backlog: BL-021

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/last.ts` with function implementation
- [ ] Modify `src/array/index.ts` to export last
- [ ] Create `tests/array/last.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository

---

### Feature 003-unique

#### requirements.md

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

---

#### implementation-plan.md

# Implementation Plan: unique

## Overview

Implement `unique()` function that removes duplicate values from an array using JavaScript Set for O(n) performance with strict equality comparison.

**Complexity:** Moderate - Set operations with type preservation
**Estimated effort:** ~20-25 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/unique.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add unique export |
| `tests/array/unique.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/unique.ts`:**
```typescript
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/unique.js` and `dist/array/unique.d.ts` created
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/unique.test.ts`:**
```typescript
import { unique } from '../../src/index.js';

describe('unique', () => {
  it('removes duplicate primitive values', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    expect(unique([true, false, true])).toEqual([true, false]);
  });

  it('returns empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  it('returns copy when no duplicates', () => {
    const input = [1, 2, 3];
    const result = unique(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input); // Different array instance
  });

  it('handles all duplicates', () => {
    expect(unique([1, 1, 1, 1])).toEqual([1]);
    expect(unique(['x', 'x'])).toEqual(['x']);
  });

  it('treats NaN values as equal', () => {
    expect(unique([NaN, NaN, NaN])).toEqual([NaN]);
    expect(unique([1, NaN, 2, NaN])).toEqual([1, NaN, 2]);
  });

  it('preserves order of first occurrence', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    expect(unique(['c', 'a', 'b', 'a'])).toEqual(['c', 'a', 'b']);
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 2, 3];
    const numResult: number[] = unique(numbers);
    expect(numResult).toEqual([1, 2, 3]);

    const strings = ['a', 'a', 'b'];
    const strResult: string[] = unique(strings);
    expect(strResult).toEqual(['a', 'b']);
  });

  it('handles special numeric values', () => {
    expect(unique([0, -0, 0])).toEqual([0]); // Set treats 0 and -0 as equal
    expect(unique([Infinity, Infinity])).toEqual([Infinity]);
    expect(unique([-Infinity, -Infinity])).toEqual([-Infinity]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/unique.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 8 tests pass
- No test failures
- Set behavior correctly tested (NaN equality, order preservation)

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.unique))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including existing tests from features 001-002)
- `unique` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Set behavior misunderstanding | Low | Low | Comprehensive tests document NaN and 0/-0 behavior |
| Type inference issues with Set | Low | Low | Spread operator maintains type, explicit tests verify |
| Performance with large arrays | Very Low | Low | O(n) is optimal for deduplication, no concerns |
| Object reference vs deep equality confusion | Medium | Low | Document in tests that only reference equality used |

## Commit Message

After implementation and verification:

```bash
git add src/array/unique.ts src/array/index.ts tests/array/unique.test.ts
git commit -m "feat(array): add unique() utility for removing duplicates

Implement unique<T>(arr: T[]): T[] using Set for O(n) deduplication.

- Removes duplicate values using strict equality
- Set handles NaN values correctly (all NaN treated as equal)
- Preserves order of first occurrence
- Returns new array without mutating input
- Comprehensive tests including edge cases

Part of v004 Theme 01 (array-basics) - Feature 003
Backlog: BL-018

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/unique.ts` with Set-based implementation
- [ ] Modify `src/array/index.ts` to export unique
- [ ] Create `tests/array/unique.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository

---

### Feature 004-chunk

#### requirements.md

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

---

#### implementation-plan.md

# Implementation Plan: chunk

## Overview

Implement `chunk()` function that splits an array into fixed-size chunks with validation of the size parameter using v003 validation infrastructure.

**Complexity:** Moderate - Array slicing with validation integration
**Estimated effort:** ~30-35 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/chunk.ts` | Create | Main function implementation with validation |
| `src/array/index.ts` | Modify | Add chunk export |
| `tests/array/chunk.test.ts` | Create | Comprehensive unit tests with error cases |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/chunk.ts`:**
```typescript
import { InvalidNumberError } from '../errors/index.js';
import { isPositiveNumber } from '../validation/index.js';

export function chunk<T>(arr: T[], size: number): T[][] {
  // Validate size is positive integer
  if (!isPositiveNumber(size) || !Number.isInteger(size)) {
    throw new InvalidNumberError('size must be a positive integer', 'size');
  }

  // Handle empty array
  if (arr.length === 0) {
    return [];
  }

  // Chunk the array
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/chunk.js` and `dist/array/chunk.d.ts` created
- Imports from errors and validation modules work
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/chunk.test.ts`:**
```typescript
import { chunk, InvalidNumberError } from '../../src/index.js';

describe('chunk', () => {
  it('splits array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('returns empty array for empty input', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('returns single chunk when size equals array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('returns single chunk when size greater than array length', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it('handles last chunk with remaining elements', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('creates single-element chunks when size is 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('throws InvalidNumberError if size is not positive', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], -5)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if size is not an integer', () => {
    expect(() => chunk([1, 2, 3], 2.5)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], 1.1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if size is NaN or Infinity', () => {
    expect(() => chunk([1, 2, 3], NaN)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], Infinity)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], -Infinity)).toThrow(InvalidNumberError);
  });

  it('preserves generic type in nested arrays', () => {
    const numbers = [1, 2, 3, 4];
    const numResult: number[][] = chunk(numbers, 2);
    expect(numResult).toEqual([[1, 2], [3, 4]]);

    const strings = ['a', 'b', 'c'];
    const strResult: string[][] = chunk(strings, 2);
    expect(strResult).toEqual([['a', 'b'], ['c']]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/chunk.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 10 tests pass
- Validation errors thrown correctly
- Type preservation verified
- Edge cases handled properly

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.chunk))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including all features 001-004)
- `chunk` function available from main module export
- Validation integration working correctly

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established
- ✓ Error type imports work from main index

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Validation integration issues | Low | Medium | Follow existing truncate() pattern, import statements tested |
| Slice edge cases with last chunk | Low | Low | Explicit tests for various array lengths and chunk sizes |
| Integer validation clarity | Low | Low | Combine isPositiveNumber with Number.isInteger check |
| Empty array with invalid size | Low | Low | Validate size before empty array check |

## Commit Message

After implementation and verification:

```bash
git add src/array/chunk.ts src/array/index.ts tests/array/chunk.test.ts
git commit -m "feat(array): add chunk() utility for splitting arrays

Implement chunk<T>(arr: T[], size: number): T[][] to split arrays into fixed-size chunks.

- Validates size is positive integer using v003 validation
- Last chunk contains remaining elements
- Handles empty arrays
- Throws InvalidNumberError for invalid size values
- Comprehensive tests including validation errors

Part of v004 Theme 01 (array-basics) - Feature 004
Backlog: BL-019

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/chunk.ts` with validation and chunking logic
- [ ] Modify `src/array/index.ts` to export chunk
- [ ] Create `tests/array/chunk.test.ts` with comprehensive tests
- [ ] Verify imports from errors and validation modules work
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass including validation errors
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository

---

## Theme 02: array-advanced

### THEME_DESIGN.md

# Theme: array-advanced

## Goal

Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. These utilities demonstrate recursive algorithms, Set-based operations, and variadic parameters for sophisticated array manipulation patterns. This theme builds upon the foundational patterns established in Theme 01.

## Features

| # | Feature | Backlog | Goal |
|---|---------|---------|------|
| 005 | compact | BL-023 | Remove all falsy values from array preserving truthy elements |
| 006 | flatten | BL-022 | Flatten nested arrays to specified depth including Infinity |
| 007 | intersection | BL-024 | Find common elements present in all provided arrays |

## Dependencies

### External Dependencies
- v003 validation infrastructure (ValidationError, InvalidNumberError)
- TypeScript 5.x with generic type support
- Jest testing framework
- ES2022 features (Array methods, Set operations)

### Feature Dependencies
- Theme 01 (array-basics) establishes `src/array/` module structure
- Feature 006 (flatten) requires new `isNonNegativeInteger()` validator
- All features are independent within this theme
- Recommended execution order: 005 → 006 → 007 (simple to complex)

### New Validator Required
**isNonNegativeInteger** (for flatten depth):
```typescript
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

Add to `src/validation/index.ts` with corresponding tests.

## Technical Approach

### Implementation Patterns

**compact()**: Filter with Boolean
- Use `arr.filter(Boolean)` to remove all falsy values
- Type assertion `as T[]` needed due to TypeScript limitation
- O(n) time complexity
- Falsy values: `false`, `null`, `0`, `""`, `undefined`, `NaN`

**flatten()**: Recursive reduce with depth
- Default depth parameter: `depth: number = 1`
- Recursive algorithm with depth decrement
- Special handling for `Infinity` (full flatten)
- Validate depth is non-negative integer
- O(n × d) time complexity (n=elements, d=depth)

**intersection()**: Set-based filter with variadic parameters
- Signature: `intersection<T>(...arrays: T[][]): T[]`
- Use Set for first array deduplication
- Filter with `every()` to check presence in all arrays
- O(n × m) time complexity (n=elements, m=array count)

### Validation Strategy

**For flatten() depth parameter:**
- Create new `isNonNegativeInteger()` validator
- Allows depth of 0 (unlike `isPositiveNumber()`)
- Exclude Infinity from integer check (handle separately)
- Throw `InvalidNumberError` for negative or non-integer values

**For compact() and intersection():**
- No parameter validation needed (trust TypeScript types)
- Type narrowing handled at compile time

### Type Strategy

**compact()**: Generic with type assertion
- Signature: `compact<T>(arr: T[]): T[]`
- TypeScript cannot narrow falsy types automatically
- Use `as T[]` cast after `filter(Boolean)`
- Document limitation in tests

**flatten()**: Uses `any[]` for nested arrays
- Signature: `flatten(arr: any[], depth?: number): any[]`
- TypeScript cannot type arbitrary depth nesting
- Accepted tradeoff per acceptance criteria

**intersection()**: Generic with variadic parameters
- Signature: `intersection<T>(...arrays: T[][]): T[]`
- Rest parameter allows arbitrary number of arrays
- Type `T` inferred from first array

## Integration Points

### With v003 Validation
- Import `InvalidNumberError` for flatten validation
- Add `isNonNegativeInteger()` to validation module
- Follow established error handling patterns

### With Theme 01
- Extends `src/array/index.ts` with new exports
- Maintains consistent module structure
- Tests follow established patterns

### Testing Integration
- Follow v003 comprehensive edge case testing
- Test falsy value types explicitly (compact)
- Test depth parameter variations (flatten)
- Test variadic parameter cases (intersection)

## Risks

| Risk | Mitigation |
|------|------------|
| compact() type narrowing limitation | Document TypeScript limitation, use type assertion with clear comments |
| flatten() recursive depth handling | Explicit tests for various depths including Infinity, handle as special case |
| flatten() Infinity validation | Check `depth === Infinity` separately before integer validation |
| intersection() with zero arrays | Explicit test case, return empty array |
| intersection() reference equality confusion | Document in tests that objects compared by reference, not deep equality |
| NaN in compact() and intersection() | Explicit tests for NaN handling per JavaScript semantics |

---

### Feature 005-compact

#### requirements.md

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

---

#### implementation-plan.md

# Implementation Plan: compact

## Overview

Implement `compact()` function that removes all falsy values from an array using `filter(Boolean)` pattern with type assertion for TypeScript compatibility.

**Complexity:** Moderate - Simple filtering with TypeScript type narrowing consideration
**Estimated effort:** ~25-30 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/compact.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add compact export |
| `tests/array/compact.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/compact.ts`:**
```typescript
export function compact<T>(arr: T[]): T[] {
  // Filter removes all falsy values: false, null, 0, "", undefined, NaN
  // Type assertion needed because TypeScript cannot narrow falsy types automatically
  return arr.filter(Boolean) as T[];
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';
export { compact } from './compact.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/compact.js` and `dist/array/compact.d.ts` created
- Type assertion accepted by compiler
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/compact.test.ts`:**
```typescript
import { compact } from '../../src/index.js';

describe('compact', () => {
  it('removes all falsy values from mixed array', () => {
    expect(compact([1, 0, 2, false, 3, null])).toEqual([1, 2, 3]);
    expect(compact(['a', '', 'b', undefined, 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('removes all six falsy value types', () => {
    const input = [false, null, 0, '', undefined, NaN, 1, 'a'];
    const result = compact(input);
    expect(result).toEqual([1, 'a']);
  });

  it('preserves truthy values including empty objects and arrays', () => {
    expect(compact([{}, 0, []])).toEqual([{}, []]);
    expect(compact([{key: 'value'}, null, [1, 2]])).toEqual([{key: 'value'}, [1, 2]]);
  });

  it('preserves string "0" and other truthy strings', () => {
    expect(compact(['0', '1', ''])).toEqual(['0', '1']);
    expect(compact(['false', 'true'])).toEqual(['false', 'true']);
  });

  it('returns empty array for empty input', () => {
    expect(compact([])).toEqual([]);
  });

  it('returns copy when no falsy values', () => {
    const input = [1, 'a', true, {}];
    const result = compact(input);
    expect(result).toEqual([1, 'a', true, {}]);
    expect(result).not.toBe(input); // Different instance
  });

  it('returns empty array when all values are falsy', () => {
    expect(compact([null, undefined, false, 0, '', NaN])).toEqual([]);
  });

  it('preserves generic type', () => {
    const numbers = [1, 0, 2, null as number | null, 3];
    const numResult: (number | null)[] = compact(numbers);
    // Note: Type system preserves T but runtime removes falsy
    expect(numResult).toEqual([1, 2, 3]);

    const strings = ['a', '', 'b', undefined as string | undefined];
    const strResult: (string | undefined)[] = compact(strings);
    expect(strResult).toEqual(['a', 'b']);
  });

  it('handles negative numbers and special truthy values', () => {
    expect(compact([-1, 0, 1])).toEqual([-1, 1]);
    expect(compact([Infinity, 0, -Infinity])).toEqual([Infinity, -Infinity]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/compact.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 9 tests pass
- All falsy types correctly removed
- Truthy edge cases preserved
- Type preservation verified

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.compact))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including all Theme 01 features)
- `compact` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Type assertion confusion | Low | Low | Comment explains TypeScript limitation, tests verify behavior |
| NaN handling | Low | Low | Explicit test for NaN removal |
| Empty object/array confusion | Low | Low | Explicit tests document truthy behavior |
| filter(Boolean) not removing all falsy | Very Low | High | Well-established JavaScript pattern, comprehensive tests verify |

## Commit Message

After implementation and verification:

```bash
git add src/array/compact.ts src/array/index.ts tests/array/compact.test.ts
git commit -m "feat(array): add compact() utility for removing falsy values

Implement compact<T>(arr: T[]): T[] to filter out all falsy values.

- Removes false, null, 0, \"\", undefined, NaN
- Preserves truthy values including {} and []
- Uses filter(Boolean) with type assertion
- Comprehensive tests covering all falsy types

Part of v004 Theme 02 (array-advanced) - Feature 005
Backlog: BL-023

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/compact.ts` with filter(Boolean) implementation
- [ ] Modify `src/array/index.ts` to export compact
- [ ] Create `tests/array/compact.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify all six falsy types handled correctly
- [ ] Verify truthy edge cases ({}, [], "0") preserved
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository

---

### Feature 006-flatten

#### requirements.md

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
**Requirement:** O(n × d) time complexity

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

---

#### implementation-plan.md

# Implementation Plan: flatten

## Overview

Implement `flatten()` function that recursively flattens nested arrays to a specified depth with validation. Also implement new `isNonNegativeInteger()` validator.

**Complexity:** Higher - Recursive algorithm with depth control and new validator
**Estimated effort:** ~40-45 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/validation/index.ts` | Modify | Add isNonNegativeInteger validator |
| `tests/validation/index.test.ts` | Modify | Add tests for new validator |
| `src/array/flatten.ts` | Create | Main function implementation with validation |
| `src/array/index.ts` | Modify | Add flatten export |
| `tests/array/flatten.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Validator

**Modify `src/validation/index.ts` (add at end):**
```typescript
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

**Modify `tests/validation/index.test.ts` (add new describe block):**
```typescript
describe('isNonNegativeInteger', () => {
  it('returns true for non-negative integers', () => {
    expect(isNonNegativeInteger(0)).toBe(true);
    expect(isNonNegativeInteger(1)).toBe(true);
    expect(isNonNegativeInteger(100)).toBe(true);
    expect(isNonNegativeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it('returns false for negative integers', () => {
    expect(isNonNegativeInteger(-1)).toBe(false);
    expect(isNonNegativeInteger(-100)).toBe(false);
  });

  it('returns false for decimals', () => {
    expect(isNonNegativeInteger(0.5)).toBe(false);
    expect(isNonNegativeInteger(1.1)).toBe(false);
  });

  it('returns false for non-finite numbers', () => {
    expect(isNonNegativeInteger(Infinity)).toBe(false);
    expect(isNonNegativeInteger(-Infinity)).toBe(false);
    expect(isNonNegativeInteger(NaN)).toBe(false);
  });

  it('returns false for non-number types', () => {
    expect(isNonNegativeInteger(null)).toBe(false);
    expect(isNonNegativeInteger(undefined)).toBe(false);
    expect(isNonNegativeInteger('1')).toBe(false);
    expect(isNonNegativeInteger({})).toBe(false);
  });

  it('narrows type correctly', () => {
    const value: unknown = 5;
    if (isNonNegativeInteger(value)) {
      const doubled: number = value * 2;
      expect(doubled).toBe(10);
    }
  });
});
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
npm test tests/validation/index.test.ts  # Run validation tests
```

**Expected outcome:**
- TypeScript compiles with new validator
- All validation tests pass (existing + 6 new tests)

### Stage 2: Create flatten Implementation

**Create `src/array/flatten.ts`:**
```typescript
import { InvalidNumberError } from '../errors/index.js';
import { isNonNegativeInteger } from '../validation/index.js';

export function flatten(arr: any[], depth: number = 1): any[] {
  // Handle Infinity explicitly (not an integer)
  if (depth === Infinity) {
    return arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flatten(val, Infinity) : val);
    }, []);
  }

  // Validate depth is non-negative integer
  if (!isNonNegativeInteger(depth)) {
    throw new InvalidNumberError('depth must be a non-negative integer', 'depth');
  }

  // Depth 0 returns shallow copy
  if (depth === 0) {
    return arr.slice();
  }

  // Recursive flatten with depth decrement
  return arr.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) ? flatten(val, depth - 1) : val
    );
  }, []);
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';
export { compact } from './compact.js';
export { flatten } from './flatten.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/flatten.js` and `dist/array/flatten.d.ts` created
- Imports work correctly

### Stage 3: Create Tests

**Create `tests/array/flatten.test.ts`:**
```typescript
import { flatten, InvalidNumberError } from '../../src/index.js';

describe('flatten', () => {
  it('flattens nested array to depth 1 by default', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten([[1, [2]], [3, [4]]])).toEqual([1, [2], 3, [4]]);
  });

  it('returns shallow copy when depth is 0', () => {
    const input = [[1, 2], [3, 4]];
    const result = flatten(input, 0);
    expect(result).toEqual([[1, 2], [3, 4]]);
    expect(result).not.toBe(input); // Different instance
  });

  it('flattens one level when depth is 1', () => {
    expect(flatten([1, [2, [3, [4]]]], 1)).toEqual([1, 2, [3, [4]]]);
  });

  it('flattens two levels when depth is 2', () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('flattens multiple levels when depth is 3+', () => {
    expect(flatten([1, [2, [3, [4, [5]]]]], 3)).toEqual([1, 2, 3, 4, [5]]);
  });

  it('fully flattens all levels when depth is Infinity', () => {
    expect(flatten([[[[[1]]]]], Infinity)).toEqual([1]);
    expect(flatten([1, [2, [3, [4, [5]]]]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns empty array for empty input', () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([], 5)).toEqual([]);
  });

  it('returns copy when no nested arrays', () => {
    const input = [1, 2, 3];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input);
  });

  it('handles mixed nested and flat elements', () => {
    expect(flatten([1, [2], 3, [4, [5]]], 1)).toEqual([1, 2, 3, 4, [5]]);
    expect(flatten([1, [2], 3, [4, [5]]], 2)).toEqual([1, 2, 3, 4, 5]);
  });

  it('throws InvalidNumberError if depth is negative', () => {
    expect(() => flatten([[1, 2]], -1)).toThrow(InvalidNumberError);
    expect(() => flatten([[1, 2]], -5)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if depth is not an integer', () => {
    expect(() => flatten([[1, 2]], 1.5)).toThrow(InvalidNumberError);
    expect(() => flatten([[1, 2]], 0.1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if depth is NaN', () => {
    expect(() => flatten([[1, 2]], NaN)).toThrow(InvalidNumberError);
  });

  it('preserves null and undefined in nested arrays', () => {
    expect(flatten([null, [undefined, [null]]], 2)).toEqual([null, undefined, null]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/flatten.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 13 tests pass
- Validation errors thrown correctly
- Depth variations handled properly
- Infinity case works

### Stage 4: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.flatten))"
# Should output: function
node -e "import('./dist/index.js').then(m => console.log(typeof m.isNonNegativeInteger))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including all previous features + new validator)
- Both `flatten` and `isNonNegativeInteger` available from main module

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array and validation module structures established

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite (now includes validator tests)
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Recursive depth stack overflow | Low | Medium | Document reasonable depth limits, Infinity handled explicitly |
| Infinity validation confusion | Low | Medium | Check `depth === Infinity` before integer validation |
| Depth decrement with Infinity | Low | High | Infinity case handled in separate branch |
| Validator integration | Low | Low | Follow existing validator patterns, comprehensive tests |

## Commit Messages

**First commit (validator):**
```bash
git add src/validation/index.ts tests/validation/index.test.ts
git commit -m "feat(validation): add isNonNegativeInteger validator

Add isNonNegativeInteger(value): value is number validator for flatten depth parameter.

- Returns true for 0, 1, positive integers
- Returns false for negative, decimals, NaN, Infinity
- Comprehensive tests with type narrowing verification

Part of v004 Theme 02 (array-advanced) - Feature 006 (flatten)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Second commit (flatten):**
```bash
git add src/array/flatten.ts src/array/index.ts tests/array/flatten.test.ts
git commit -m "feat(array): add flatten() utility for nested array flattening

Implement flatten(arr: any[], depth?: number): any[] with recursive depth control.

- Default depth 1 matches Array.prototype.flat()
- Supports Infinity for full flatten
- Validates depth is non-negative integer
- Recursive algorithm with depth decrement
- Comprehensive tests including Infinity and validation errors

Part of v004 Theme 02 (array-advanced) - Feature 006
Backlog: BL-022

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create isNonNegativeInteger validator in `src/validation/index.ts`
- [ ] Add validator tests to `tests/validation/index.test.ts`
- [ ] Run validation tests to verify new validator
- [ ] Create `src/array/flatten.ts` with recursive implementation
- [ ] Modify `src/array/index.ts` to export flatten
- [ ] Create `tests/array/flatten.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify both exports available from main module
- [ ] Commit validator changes
- [ ] Commit flatten implementation
- [ ] Push to remote repository

---

### Feature 007-intersection

#### requirements.md

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
- Element in all arrays → included in result
- Element missing from any array → excluded from result

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
**Requirement:** O(n × m) time complexity

**Metrics:**
- n = total elements across all arrays
- m = number of arrays
- Set provides O(1) lookups
- Better than nested loop O(n²) approach

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

---

#### implementation-plan.md

# Implementation Plan: intersection

## Overview

Implement `intersection()` function that finds common elements across multiple arrays using variadic parameters, Set for deduplication, and `every()` for validation.

**Complexity:** Moderate - Variadic parameters with Set-based filtering
**Estimated effort:** ~30-35 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/intersection.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add intersection export |
| `tests/array/intersection.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/intersection.ts`:**
```typescript
export function intersection<T>(...arrays: T[][]): T[] {
  // Handle no arrays case
  if (arrays.length === 0) {
    return [];
  }

  // Handle single array case (return unique elements)
  if (arrays.length === 1) {
    return [...new Set(arrays[0])];
  }

  // Use Set for first array to get unique elements and O(1) lookups
  const [first, ...rest] = arrays;
  const uniqueFirst = new Set(first);

  // Filter first array's unique elements checking presence in all other arrays
  return [...uniqueFirst].filter(item =>
    rest.every(arr => arr.includes(item))
  );
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';
export { compact } from './compact.js';
export { flatten } from './flatten.js';
export { intersection } from './intersection.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/intersection.js` and `dist/array/intersection.d.ts` created
- Variadic parameter syntax accepted
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/intersection.test.ts`:**
```typescript
import { intersection } from '../../src/index.js';

describe('intersection', () => {
  it('returns common elements from two arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c']);
  });

  it('returns common elements from three or more arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
    expect(intersection([1, 2], [1, 2], [1, 2], [1, 2])).toEqual([1, 2]);
  });

  it('returns empty array when no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
    expect(intersection([1, 2], [2, 3], [3, 4])).toEqual([]);
  });

  it('returns empty array when no arrays provided', () => {
    expect(intersection()).toEqual([]);
  });

  it('returns empty array when any input array is empty', () => {
    expect(intersection([1, 2], [])).toEqual([]);
    expect(intersection([], [1, 2])).toEqual([]);
  });

  it('returns unique elements when single array provided', () => {
    expect(intersection([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it('deduplicates result when first array has duplicates', () => {
    expect(intersection([1, 1, 2, 2], [1, 2])).toEqual([1, 2]);
  });

  it('uses strict equality for comparison', () => {
    expect(intersection([1, 2], ['1', '2'])).toEqual([]);
    expect(intersection([NaN], [NaN])).toEqual([NaN]); // includes uses SameValueZero
  });

  it('preserves order from first array', () => {
    expect(intersection([3, 1, 2], [1, 2, 3])).toEqual([3, 1, 2]);
    expect(intersection([2, 3, 1], [1, 2, 3])).toEqual([2, 3, 1]);
  });

  it('preserves generic type', () => {
    const nums1 = [1, 2, 3];
    const nums2 = [2, 3, 4];
    const numResult: number[] = intersection(nums1, nums2);
    expect(numResult).toEqual([2, 3]);

    const strs1 = ['a', 'b'];
    const strs2 = ['b', 'c'];
    const strResult: string[] = intersection(strs1, strs2);
    expect(strResult).toEqual(['b']);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/intersection.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 10 tests pass
- Variadic parameters work correctly
- Edge cases handled properly
- Set deduplication working

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.intersection))"
# Should output: function
```

**Test all Theme 02 features complete:**
```bash
npm test tests/array/  # All array utility tests
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (all 7 features complete)
- `intersection` function available from main module export
- All array utilities working together

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure complete

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite (all 7 features + validators)
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Variadic parameter type inference | Low | Low | TypeScript handles rest parameters well, explicit type tests verify |
| includes() performance with large arrays | Low | Medium | Document O(n×m) complexity, acceptable for typical use |
| Reference vs deep equality confusion | Medium | Low | Document in tests that objects compared by reference |
| Empty array in middle of inputs | Low | Low | Explicit test case verifies behavior |

## Commit Message

After implementation and verification:

```bash
git add src/array/intersection.ts src/array/index.ts tests/array/intersection.test.ts
git commit -m "feat(array): add intersection() utility for common elements

Implement intersection<T>(...arrays: T[][]): T[] to find common elements across arrays.

- Uses Set for deduplication and efficient lookup
- Filters with every() to check presence in all arrays
- Preserves order from first array
- Handles variadic parameters (arbitrary number of arrays)
- Comprehensive tests including edge cases

Part of v004 Theme 02 (array-advanced) - Feature 007
Backlog: BL-024

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/intersection.ts` with Set-based implementation
- [ ] Modify `src/array/index.ts` to export intersection
- [ ] Create `tests/array/intersection.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify variadic parameters work with 0, 1, 2, 3+ arrays
- [ ] Verify empty array and no-overlap cases
- [ ] Verify function exported from main module
- [ ] Run all array tests to confirm complete Theme 02
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository

---
