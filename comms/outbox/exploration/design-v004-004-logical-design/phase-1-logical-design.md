# Phase 1: Logical Design - v004 Array Utilities

## Version Overview

**Version Number:** v004
**Version Name:** Array Utilities
**Description:** Implement fundamental and advanced array manipulation utilities for the TypeScript utility library

### Goals and Objectives

1. **Expand Utility Library Coverage**: Add array utilities to complement existing string (v001-v002) and number (v002) utilities
2. **Demonstrate Generic Type Handling**: Showcase TypeScript generic types `<T>` for type-safe array operations
3. **Build on v003 Foundation**: Integrate with validation patterns and error handling established in v003
4. **Test Auto-Dev with Collection Types**: Validate auto-dev-mcp can handle generic collection types and complex type signatures

### Success Criteria

- All 7 array utilities implemented with comprehensive tests
- 100% acceptance criteria met (5 criteria × 7 features = 35 total criteria)
- All quality gates pass (TypeScript compilation, Jest tests, CI)
- Zero technical debt introduced
- Integration with v003 validation infrastructure successful

---

## Theme Breakdown

### Theme 01: array-basics

**Theme ID:** 01-array-basics
**Goal:** Implement foundational array utility functions that provide safe, type-safe access and transformation operations. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks. These functions establish patterns for array module organization and demonstrate generic type preservation.

**Backlog Items:** BL-020, BL-021, BL-018, BL-019

**Features:**

| # | Feature | Goal | Backlog | Dependencies |
|---|---------|------|---------|--------------|
| 1 | 001-first | Get first element of array safely with undefined handling | BL-020 | None |
| 2 | 002-last | Get last element of array safely with undefined handling | BL-021 | None |
| 3 | 003-unique | Remove duplicate values from array using Set | BL-018 | None |
| 4 | 004-chunk | Split array into fixed-size chunks handling remainder | BL-019 | Validation infrastructure (v003) |

**Implementation Notes:**
- Create `src/array/` directory structure following v001-v003 patterns
- Update `src/index.ts` to export array module
- Add validation functions to `src/validation/index.ts` if needed
- Test files in `tests/array/` following established patterns

---

### Theme 02: array-advanced

**Theme ID:** 02-array-advanced
**Goal:** Implement advanced array transformation utilities handling complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. These utilities demonstrate recursive algorithms, Set-based operations, and variadic parameters for sophisticated array manipulation patterns.

**Backlog Items:** BL-023, BL-022, BL-024

**Features:**

| # | Feature | Goal | Backlog | Dependencies |
|---|---------|------|---------|--------------|
| 5 | 005-compact | Remove all falsy values from array preserving truthy elements | BL-023 | None |
| 6 | 006-flatten | Flatten nested arrays to specified depth including Infinity | BL-022 | Validation infrastructure (v003) |
| 7 | 007-intersection | Find common elements present in all provided arrays | BL-024 | None |

**Implementation Notes:**
- Builds upon array module structure from Theme 01
- `flatten()` requires recursive algorithm with depth handling
- `intersection()` uses variadic parameters (`...arrays: T[][]`)
- `compact()` involves TypeScript type narrowing considerations

---

## Execution Order

### Theme Dependencies

**Theme 01 → Theme 02:**
- Theme 02 depends on Theme 01 establishing module structure
- Theme 01 creates `src/array/index.ts` that Theme 02 extends
- No functional dependencies, but Theme 01 proves patterns for Theme 02

**v003 → Theme 01 and Theme 02:**
- Both themes integrate with v003 validation infrastructure
- Use ValidationError, InvalidNumberError, OutOfRangeError from v003
- May add validators to `src/validation/index.ts` created in v003

### Feature Dependencies

**Within Theme 01:**
- Feature 001 (first) and 002 (last): Independent, can run parallel
- Feature 003 (unique): Independent
- Feature 004 (chunk): Independent but uses validation (order last for pattern establishment)

**Recommended Theme 01 Order:** 001-first → 002-last → 003-unique → 004-chunk
- Start with simplest (array access)
- Progress through Set operations
- End with validation integration example

**Within Theme 02:**
- Feature 005 (compact): Independent
- Feature 006 (flatten): Independent but complex (recursive)
- Feature 007 (intersection): Independent

**Recommended Theme 02 Order:** 005-compact → 006-flatten → 007-intersection
- Start with filtering (simplest)
- Handle recursive complexity (flatten)
- Finish with Set + variadic operations (intersection)

### Ordering Rationale

1. **Complexity-Based Progression**: Each theme orders features from simple to complex
2. **Pattern Establishment**: Early features in Theme 01 establish array module patterns
3. **Risk Mitigation**: Simpler features first builds confidence before complex features
4. **Validation Integration**: Features using validation come after simpler features prove patterns
5. **Independent Execution**: No strict dependencies allows flexibility if issues arise

---

## Research Sources Adopted

### From Task 003: Codebase Patterns

**Module Organization (src/array/):**
- Pattern: Individual function files + index.ts re-export (evidence: `codebase-patterns.md:9-28`)
- Applied to: All 7 features get individual .ts files in `src/array/`
- Source: Existing `src/string/` and `src/number/` structure

**ESM Import Requirements:**
- Pattern: All imports use `.js` extensions (evidence: `codebase-patterns.md:50-53`)
- Applied to: All array utility imports include `.js` extension
- Example: `import { ValidationError } from '../errors/index.js';`

**Validation Infrastructure:**
- Pattern: ValidationError hierarchy with optional field parameter (evidence: `codebase-patterns.md:56-96`)
- Applied to: chunk() and flatten() use InvalidNumberError and OutOfRangeError
- Types adopted: ValidationError, InvalidNumberError, OutOfRangeError

**Test Patterns:**
- Pattern: Import from main index.js, comprehensive edge cases (evidence: `codebase-patterns.md:217-303`)
- Applied to: All test files import from `../../src/index.js`
- Coverage: Empty arrays, special values (null, NaN), boundary conditions, type narrowing

**New Validators Needed:**
- `isNonNegativeInteger()` for flatten() depth parameter (evidence: `codebase-patterns.md:379-387`)
- Pattern follows existing `isPositiveNumber()` structure
- Note: Decided NOT to add `isArray()` validator - trust TypeScript types per existing pattern

### From Task 003: External Research

**unique() Implementation:**
- Algorithm: Set conversion with spread operator (evidence: `external-research.md:35-58`)
- Selected: `[...new Set(arr)]` - O(n) performance
- Source: [GeeksforGeeks JavaScript Array Deduplication](https://www.geeksforgeeks.org/javascript/how-to-get-all-unique-values-remove-duplicates-in-a-javascript-array/)

**chunk() Implementation:**
- Algorithm: For-loop with slice (evidence: `external-research.md:73-82`)
- Selected: Most readable approach over Array.from() or reduce
- Source: [Dev Extent - Split Array into Chunks](https://www.devextent.com/split-typescript-array-into-chunks/)

**flatten() Implementation:**
- Algorithm: Recursive reduce with depth parameter (evidence: `external-research.md:150-180`)
- Handles Infinity explicitly for full flatten
- Source: [freeCodeCamp - Flatten Array Recursion](https://www.freecodecamp.org/news/flatten-array-recursion/)

**compact() Implementation:**
- Algorithm: `filter(Boolean)` with type assertion (evidence: `external-research.md:223-269`)
- Type assertion needed due to TypeScript limitation (GitHub issue #30621)
- Source: [Medium - Removing Falsy Values Type-Safe](https://medium.com/@taitasciore/removing-falsy-values-from-an-array-with-real-type-checking-with-typescript-31d283174431)

**intersection() Implementation:**
- Algorithm: Set-based filter with every() check (evidence: `external-research.md:286-337`)
- Deduplicates first array, checks presence in all others
- Source: [Medium - Set Theory for Arrays in ES6](https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848)

**first() and last() Implementation:**
- Algorithm: Direct array index access (evidence: `external-research.md:350-370`)
- Return type: `T | undefined` for empty array safety
- Pattern: Trust TypeScript types, no runtime validation

### Configuration Values

**TypeScript Target:** ES2022 (evidence: `codebase-patterns.md:344`)
- Enables Set, Array methods, modern features
- No polyfills needed

**Test Framework:** Jest with ts-jest ESM preset (evidence: `codebase-patterns.md:310-330`)
- Tests located: `tests/array/*.test.ts`
- Import pattern: `../../src/index.js`

**Validation Patterns:**
- Existing: `isPositiveNumber()` for positive values
- New: `isNonNegativeInteger()` for flatten depth (allows 0)
- Errors: InvalidNumberError for type issues, OutOfRangeError for bounds

---

## Impact Analysis

### Dependencies and Affected Systems

**Files to Modify:**
1. `src/index.ts` - Add `export * from './array/index.js';` (line 5)
2. `src/validation/index.ts` - Add `isNonNegativeInteger()` validator (~12 lines)

**Files to Create:**
- Source: 8 files (`src/array/*.ts` - 7 functions + index)
- Tests: 7 files (`tests/array/*.test.ts`)
- Estimated: ~150-200 lines source, ~400-500 lines tests

**Integration Points:**
- v003 errors: Import ValidationError, InvalidNumberError, OutOfRangeError
- v003 validation: Use existing validators where applicable
- Main index: Export array module alongside string, number, errors, validation

**Dependencies:**
- External: None (no new npm packages)
- Internal: v003 validation infrastructure
- Runtime: Node.js 20.x, ES2022 features

### Breaking Changes

**Status: NO BREAKING CHANGES**

All changes are additive:
- New exports added, existing exports unchanged
- No modifications to existing utilities
- No function signature changes
- Backward compatible: All v001-v003 code continues working

**Version Increment:** Patch or minor (0.1.x → 0.2.0 or 0.1.x → 0.1.y)

### Test Infrastructure Needs

**New Test Files:** 7 test files in `tests/array/`

**Test Count Estimate:**
- Current (after v003): 60 tests
- v004 additions: ~52-64 new tests (7 features × 7-9 tests each)
- Validation tests: ~5-7 tests (isNonNegativeInteger)
- Total after v004: ~117-131 tests (~100% growth)

**Test Patterns to Follow (from v003):**
- Happy path tests first
- Edge cases: empty arrays, single elements, large arrays
- Special values: null, undefined, NaN in arrays
- Boundary conditions: size limits, depth limits
- Error conditions: validation failures with specific error type checks
- Type narrowing: Compile-time type tests for type guards

**No Test Configuration Changes:**
- jest.config.js unchanged (already matches `tests/**/*.test.ts`)
- No new test utilities needed
- Existing ESM configuration applies

### Documentation Updates Required

**AGENTS.md:** No updates (generic guidance applies)

**README.md (if exists):**
- Add array utilities to feature list
- Update usage examples
- Estimated: ~20-30 lines

**Code Documentation:**
- Minimal JSDoc following existing pattern
- Function signatures serve as primary docs
- TypeScript types document parameters/returns

**No CHANGELOG.md:** Repository doesn't use changelog (git history serves as record)

**API Documentation:**
- Auto-generated TypeScript declarations (.d.ts)
- No manual API doc generation configured

---

## Quality Targets

### Test Coverage Goals
- 100% acceptance criteria met (35 total criteria)
- Comprehensive edge case coverage (empty, special values, boundaries)
- All validation error paths tested
- Type narrowing verified for generic functions

### Quality Gate Standards (from v003)
- **TypeScript Compilation:** Must pass `npm run build` with zero errors
- **Jest Tests:** Must pass `npm test` with 100% pass rate
- **GitHub Actions CI:** Must pass all CI checks on first PR submission (target)
- **No Console Logs:** Production code must not contain console.log statements
- **Zero Technical Debt:** No TODOs, FIXMEs, or incomplete implementations

### Performance Expectations
All array utilities use standard algorithms with reasonable complexity:
- unique(): O(n) time, O(n) space
- chunk(): O(n) time, O(n) space
- first/last(): O(1) time, O(1) space
- flatten(): O(n×d) time, O(n×d) space (d=depth)
- compact(): O(n) time, O(n) space
- intersection(): O(n×m) time, O(n) space (m=array count)

No performance optimization required beyond using standard approaches.

---

## Summary

**Scope:** 2 themes, 7 features, 35 acceptance criteria
**Complexity:** Low to moderate (no feature rated "high" complexity)
**Dependencies:** v003 validation infrastructure (no new external packages)
**Risk Level:** Low (additive changes, proven patterns, comprehensive research)
**Expected Duration:** Multi-day (larger scope than v003's 3 features)

**Key Success Factors:**
1. Follow established patterns from v001-v003
2. Comprehensive test coverage per v003 standards
3. Proper TypeScript generic type usage
4. Integration with v003 validation infrastructure
5. Sequential execution within themes (simple → complex)

**Readiness:** Design complete with all research findings incorporated and open questions documented for user input.
