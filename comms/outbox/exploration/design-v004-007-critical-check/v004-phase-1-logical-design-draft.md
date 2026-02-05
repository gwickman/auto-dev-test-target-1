# v004 Logical Design Draft

## Version Overview

**Version**: v004
**Title**: Array Utilities
**Focus**: Natural progression from primitive utilities to collection utilities
**Themes**: 2 (array-basics, array-advanced)
**Features**: 7 total (4 basic + 3 advanced)

## Objectives

1. Implement foundational array utilities (first, last, unique, chunk)
2. Implement advanced array transformations (compact, flatten, intersection)
3. Demonstrate TypeScript generic type handling with `<T>`
4. Integrate with v003 validation infrastructure
5. Establish patterns for collection utilities

## Theme Breakdown

### Theme 01: array-basics (4 features)

**Goal**: Foundational array utilities with safe access and basic transformations

**Backlog Items**:
- BL-020: first() - Get first element safely with undefined handling
- BL-021: last() - Get last element safely with undefined handling
- BL-018: unique() - Remove duplicate values using Set
- BL-019: chunk() - Split array into fixed-size chunks

**Rationale**: These utilities form the foundation for array operations. Safe element access (first/last) addresses common edge cases, while unique() and chunk() provide basic transformations. All use straightforward implementations without recursion.

**Feature Grouping**:
1. **001-first**: Safe array element access pattern
2. **002-last**: Complement to first(), establishes consistent API
3. **003-unique**: Introduction to Set-based deduplication
4. **004-chunk**: Array slicing and chunking pattern

### Theme 02: array-advanced (3 features)

**Goal**: Advanced array transformations using recursive algorithms and Set operations

**Backlog Items**:
- BL-023: compact() - Remove all falsy values from array
- BL-022: flatten() - Flatten nested arrays to specified depth
- BL-024: intersection() - Find common elements across arrays

**Rationale**: These utilities require more sophisticated implementations. compact() demonstrates filtering, flatten() introduces recursive depth handling, and intersection() combines Set operations across multiple arrays.

**Feature Grouping**:
1. **005-compact**: Boolean filtering and type narrowing
2. **006-flatten**: Recursive algorithm with depth control
3. **007-intersection**: Variadic parameters and Set intersections

## High-Level Technical Approach

### TypeScript Patterns

**Generics**: All functions use `<T>` generic type parameter to preserve input types:
```typescript
function unique<T>(arr: T[]): T[]
function chunk<T>(arr: T[], size: number): T[][]
```

**Exception**: flatten() uses `any[]` due to nested array type complexity:
```typescript
function flatten(arr: any[], depth?: number): any[]
```

**Type Guards**: Use existing v003 validators where applicable:
- `isPositiveNumber()` for chunk size validation
- New validator needed: `isNonNegativeInteger()` for flatten depth

### Implementation Strategies

1. **Deduplication** (unique): `return [...new Set(arr)]`
2. **Chunking** (chunk): for-loop with slice operations
3. **Safe Access** (first/last): Direct indexing with undefined handling
4. **Filtering** (compact): `arr.filter(Boolean)`
5. **Recursive Flattening** (flatten): reduce with depth counter
6. **Set Intersection** (intersection): Filter first array against Sets of remaining arrays

### Integration with v003

**Error Types**: Reuse existing ValidationError hierarchy:
- EmptyStringError - not applicable for arrays
- NegativeNumberError - applicable for chunk size
- OutOfRangeError - not needed (size validation sufficient)

**New Validator Required**:
```typescript
function isNonNegativeInteger(value: unknown): value is number
```

Used by:
- chunk() - validate size parameter
- flatten() - validate depth parameter (also supports Infinity)

### File Structure

```
src/array/
  index.ts         # Barrel export
  first.ts         # first() implementation
  last.ts          # last() implementation
  unique.ts        # unique() implementation
  chunk.ts         # chunk() implementation
  compact.ts       # compact() implementation
  flatten.ts       # flatten() implementation
  intersection.ts  # intersection() implementation

tests/array/
  index.test.ts    # Import/export tests
  first.test.ts    # ~15 tests (empty, single, multiple)
  last.test.ts     # ~15 tests (empty, single, multiple)
  unique.test.ts   # ~18 tests (primitives, objects, NaN, empty)
  chunk.test.ts    # ~20 tests (exact division, remainder, edge cases)
  compact.test.ts  # ~18 tests (all falsy values, truthy preservation)
  flatten.test.ts  # ~20 tests (depth levels, Infinity, non-arrays)
  intersection.test.ts # ~20 tests (multiple arrays, no common, empty)
```

## Acceptance Criteria Mapping

### Theme 01 (array-basics)

**BL-020 (first)**:
- ✅ Function signature: `first<T>(arr: T[]): T | undefined`
- ✅ Returns undefined for empty arrays
- ✅ Comprehensive tests
- ✅ Uses type guards

**BL-021 (last)**:
- ✅ Function signature: `last<T>(arr: T[]): T | undefined`
- ✅ Returns undefined for empty arrays
- ✅ Comprehensive tests
- ✅ Uses type guards

**BL-018 (unique)**:
- ✅ Function signature: `unique<T>(arr: T[]): T[]`
- ✅ Removes duplicate values using Set
- ✅ Handles empty arrays
- ✅ Comprehensive tests
- ✅ Validation for non-array input

**BL-019 (chunk)**:
- ✅ Function signature: `chunk<T>(arr: T[], size: number): T[][]`
- ✅ Validates size is positive integer
- ✅ Handles empty arrays
- ✅ Last chunk contains remaining elements
- ✅ Comprehensive tests

### Theme 02 (array-advanced)

**BL-023 (compact)**:
- ✅ Function signature: `compact<T>(arr: T[]): T[]`
- ✅ Removes all falsy values
- ✅ Preserves truthy values including empty objects/arrays
- ✅ Comprehensive tests
- ✅ Returns correct types

**BL-022 (flatten)**:
- ✅ Function signature: `flatten(arr: any[], depth?: number): any[]`
- ✅ Default depth is 1
- ✅ Supports Infinity for full flatten
- ✅ Validates depth is non-negative
- ✅ Comprehensive tests with nested arrays

**BL-024 (intersection)**:
- ✅ Function signature: `intersection<T>(...arrays: T[][]): T[]`
- ✅ Returns common elements from all arrays
- ✅ Uses strict equality
- ✅ Returns empty array if no common elements
- ✅ Comprehensive tests

## Dependencies and Integration Points

### Prerequisites
- v001: TypeScript foundation, ESM modules, Jest, CI
- v002: String/number utilities (patterns to follow)
- v003: ValidationError hierarchy, existing validators

### Internal Dependencies
- Validation utilities: Import from `../validation/index.js`
- Error types: Import from `../errors/index.js`
- New validator: Add to `src/validation/index.ts`

### External Dependencies
None - all utilities use standard JavaScript/TypeScript features

### Testing Dependencies
- Jest with ts-jest (already configured)
- TypeScript test files
- Coverage targets: maintain existing coverage levels

## Quality Gates

All features must pass:
- ✅ `npm run build` - TypeScript compilation
- ✅ `npm test` - All tests pass
- ✅ New code has test coverage
- ✅ No console.log in production code
- ✅ CI passing (GitHub Actions)
- ✅ Conventional commit messages

## Risk Areas

1. **TypeScript Generic Complexity**: Generic types for arrays with proper type preservation
2. **flatten() Type Safety**: Using `any[]` sacrifices type safety for practicality
3. **Set Behavior with Objects**: Reference equality may surprise users
4. **NaN Handling**: Set handles NaN correctly (unlike ===), needs testing
5. **Performance**: Large arrays with deep nesting (flatten) or many intersections
6. **Validation Gaps**: Need new isNonNegativeInteger validator

## Deferred Items

From VERSION_DESIGN.md:
- Default value parameter for first() and last() (not in acceptance criteria)
- Deep equality for intersection() (uses strict/reference equality only)
- Optimization beyond standard algorithms
- Type-safe compact() return type (TypeScript limitation)
- Runtime type checking for array inputs (trust compile-time types)

## Next Steps

1. Validate this draft against all acceptance criteria
2. Identify specific risks requiring investigation
3. Research TypeScript generic patterns for arrays
4. Research flatten implementation approaches
5. Create final logical design incorporating findings
