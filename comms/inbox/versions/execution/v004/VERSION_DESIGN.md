# v004 Version Design

## Overview

**Version:** v004
**Title:** Array Utilities - Generic collection manipulation with TypeScript advanced type features
**Themes:** 2 (array-basics, array-advanced)
**Features:** 7 (4 basic + 3 advanced)

## Backlog Items

This version implements 7 backlog items from the PLAN.md Collections Phase:

- [BL-018](../../docs/auto-dev/BACKLOG.md#bl-018) - unique() array utility
- [BL-019](../../docs/auto-dev/BACKLOG.md#bl-019) - chunk() array utility
- [BL-020](../../docs/auto-dev/BACKLOG.md#bl-020) - first() array utility
- [BL-021](../../docs/auto-dev/BACKLOG.md#bl-021) - last() array utility
- [BL-022](../../docs/auto-dev/BACKLOG.md#bl-022) - flatten() array utility
- [BL-023](../../docs/auto-dev/BACKLOG.md#bl-023) - compact() array utility
- [BL-024](../../docs/auto-dev/BACKLOG.md#bl-024) - intersection() array utility

## Design Context

### Rationale

Version v004 represents a natural progression from primitive type utilities (strings in v001-v002, numbers in v002) to collection type utilities. Arrays are the first collection type being addressed, chosen because:

1. **Fundamental Data Structure**: Arrays are ubiquitous in JavaScript/TypeScript applications
2. **Generic Type Showcase**: Array utilities require TypeScript generic types `<T>`, testing auto-dev's capability to handle type parameters and complex type signatures
3. **Complexity Progression**: Arrays are simpler than objects (v005) but more complex than primitives, providing appropriate difficulty curve
4. **Pattern Establishment**: Array utilities establish patterns for future collection utilities (objects, maps, sets)

The theme grouping separates simple foundational utilities (Theme 01: array-basics) from complex transformations requiring recursion and variadic parameters (Theme 02: array-advanced). This allows pattern establishment before tackling sophisticated algorithms.

**Implementation Strategy Selection** (based on investigation findings):
- **unique()**: Set-based deduplication (`[...new Set(arr)]`) - Industry standard, O(n) performance
- **chunk()**: for-loop with slice operations - Most readable, straightforward validation
- **first()/last()**: Direct array access with `T | undefined` return type - Safe element access pattern
- **compact()**: `filter(Boolean)` - Standard approach with accepted TypeScript type limitation
- **flatten()**: **Native Array.prototype.flat()** - Available in Node 20.x (ES2019), performant and battle-tested
- **intersection()**: Set-based filtering with `every()` - Handles variadic parameters efficiently

**Key Design Decision**: flatten() uses native Array.prototype.flat() instead of custom recursive implementation. Investigation confirmed Node 20.x has full ES2019 support, making native method the optimal choice for performance and maintainability.

### Constraints

**Technical Constraints**:
- TypeScript 5.x compatibility required for generic types and type inference
- ESM modules with `.js` extensions in import statements (TypeScript doesn't rewrite paths)
- Generic types required for all utilities to preserve element types through transformations
- **Exception**: flatten() uses `any[]` due to arbitrary nesting depth complexity
- No runtime type checking - trust TypeScript compile-time type system following v002/v003 pattern
- ES2022 target enables Set, Array methods without polyfills

**Error Handling Constraints**:
- Must integrate with v003 ValidationError hierarchy:
  - ValidationError (base class with optional field property)
  - EmptyStringError (not applicable for arrays)
  - InvalidNumberError (for numeric parameter validation)
  - OutOfRangeError (not needed for v004)
- **New validator required**: isNonNegativeInteger() for flatten depth and chunk size validation
- Use InvalidNumberError for all numeric parameter validation failures
- Always provide field parameter with parameter name for clear error messages

**Quality Gate Constraints** (from AGENTS.md):
- ✅ TypeScript compilation without errors (`npm run build`)
- ✅ 100% test pass rate (`npm test`)
- ✅ Jest test coverage for all features (maintain v003 levels)
- ✅ GitHub Actions CI passing on all PRs
- ✅ Conventional commit messages (feat: description)
- ✅ No console.log in production code

### Assumptions

**Foundation Assumptions** (verified from codebase):
- v001-v003 foundation exists: TypeScript config, ESM setup, Jest with ts-jest, CI pipeline, project structure (src/, tests/, dist/)
- v003 validation infrastructure available: error types (src/errors/index.ts), validators (src/validation/index.ts), integration patterns established
- Export pattern from src/index.ts: `export * from './module/index.js';` with .js extension
- Test organization: one test file per function in corresponding tests/ subdirectory
- No breaking changes policy: all changes are additive

**Type System Assumptions**:
- Trust TypeScript compile-time type checking for array parameters (no runtime validation)
- Generic type inference works automatically - callers don't need explicit type annotations
- Return type `T | undefined` provides type narrowing capability (satisfies "uses type guards" requirement)
- Set behavior with NaN and objects uses JavaScript standard:
  - NaN treated as equal to itself (unlike ===) - correct for deduplication
  - Objects use reference equality - acceptable per "strict equality" requirement
- Target ES2022 platform has Set, Array.prototype.flat() available

**Testing Assumptions**:
- ~15-20 tests per feature following v003 pattern (v003 averaged ~15 tests per feature)
- Estimated total: ~120-140 new tests
- Test coverage includes: normal cases, empty arrays, edge cases (NaN, undefined, objects), error throwing, type narrowing demonstrations
- Type preservation testing included to verify generics work correctly

### Deferred Items

The following items were explicitly excluded from this version scope:

1. **Default value parameter for first() and last()**: BL-020/BL-021 descriptions mention "optionally return a default value" but acceptance criteria don't include it. Investigation confirmed acceptance criteria are authoritative. Deferred to potential future enhancement.

2. **Deep equality for intersection()**: BL-024 requires "strict equality" which means reference equality for objects. Deep equality would require custom comparison function and is explicitly out of scope.

3. **Optimization beyond standard algorithms**: No performance targets in acceptance criteria. Standard implementations sufficient. Future performance work deferred until measurement shows need.

4. **Type-safe compact() return type**: TypeScript cannot infer non-falsy subset type (e.g., can't automatically narrow `(string | null)[]` to `string[]` after compact). This is a TypeScript limitation. Return type remains `T[]` with accepted type safety trade-off.

5. **Runtime type checking for array inputs**: Following v002/v003 pattern of trusting TypeScript compile-time types. No runtime array validation. Adding such checks would be inconsistent with existing codebase patterns.

## Risk Summary

### Technical Risks - RESOLVED

All risks identified during critical thinking phase have been investigated and resolved:

**TypeScript Generic Complexity** ✅ RESOLVED:
- Investigation: Examined existing v002/v003 utilities, TypeScript documentation
- Resolution: Use single generic parameter `<T>` for all utilities except flatten(). TypeScript type inference handles automatically. Pattern: `function unique<T>(arr: T[]): T[]`
- Exception documented: flatten() uses `any[]` due to arbitrary nesting depth

**Set Behavior with Objects and NaN** ✅ RESOLVED:
- Investigation: JavaScript Set equality semantics researched
- Resolution: Behavior is correct per requirements. Set uses reference equality for objects (per "strict equality" requirement) and treats NaN as equal to itself (desirable for deduplication)
- Mitigation: Add comprehensive tests demonstrating behavior, include JSDoc comments explaining Set semantics

**Type Guards for first()/last()** ✅ RESOLVED:
- Investigation: Examined v003 type guard patterns
- Resolution: Return type `T | undefined` IS the type guard mechanism. Enables TypeScript type narrowing in calling code. No dedicated type guard functions needed.
- Interpretation: "Uses type guards" means "leverages TypeScript's type system effectively"

**flatten() Implementation Approach** ✅ RESOLVED:
- Investigation: Native Array.prototype.flat() availability in Node 20.x confirmed
- Resolution: Use native flat() method. Available since ES2019, Node 20.x has full support
- Benefits: Simpler code, better performance, battle-tested implementation, reduced maintenance

**Validation Integration** ✅ RESOLVED:
- Investigation: Read src/validation/index.ts structure, examined integration patterns
- Resolution: Add isNonNegativeInteger() to existing validation module. Pattern matches existing validators. Clear integration path.
- Implementation: Export from src/validation/index.ts, add tests to tests/validation/index.test.ts

### Integration Risks - RESOLVED

**Module Integration** ✅ RESOLVED:
- Investigation: Verified src/index.ts export pattern, checked for naming conflicts
- Resolution: Add `export * from './array/index.js';` to src/index.ts. No naming conflicts found. Follows established string/number module pattern.

**ESM Import Conventions** ✅ RESOLVED:
- Investigation: Confirmed .js extension requirement across v001-v003 codebase
- Resolution: Always use `.js` extensions in import statements within .ts files. TypeScript compiles to .js but doesn't rewrite import paths. Required for ESM compatibility.
- Pattern: `import { InvalidNumberError } from '../errors/index.js';`

**Error Type Usage** ✅ RESOLVED:
- Investigation: Examined error hierarchy and usage in truncate.ts
- Resolution: Use InvalidNumberError for all numeric parameter validation. Always provide field parameter. Pattern: `throw new InvalidNumberError('size must be a positive integer', 'size');`

**Test Coverage Patterns** ✅ RESOLVED:
- Investigation: Examined tests/ structure and v003 test files
- Resolution: Create one test file per function (tests/array/first.test.ts, etc.). Include tests/array/index.test.ts for barrel exports. Target 15-20 tests per function.

### No Remaining Blockers

All high-priority and medium-priority risks investigated. All design decisions finalized with rationale documented. Implementation paths confirmed. Ready for execution.

## Design Decisions

### Generic Type Strategy

**Decision**: Use single generic parameter `<T>` for all utilities except flatten()

**Rationale**:
- TypeScript infers T from arr parameter automatically - no explicit type annotations needed by callers
- Return types automatically inferred from generic parameter
- Set operations preserve generic type: `new Set<T>(arr)` → `T[]`
- Union types work naturally: `T | undefined` for optional returns

**Exception**: flatten() uses `any[]` instead of generics
- Reason: Arbitrary nesting depth makes generic type preservation impractical
- Trade-off: Accept type safety loss for flexibility
- Mitigation: Document limitation, comprehensive tests, consider future improvement

### Validation Strategy

**Decision**: Add isNonNegativeInteger() validator to validation module

**Implementation**:
```typescript
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

**Used by**:
- chunk(arr, size): Validates size is positive integer (check size !== 0 additionally)
- flatten(arr, depth): Validates depth is non-negative integer (special case for Infinity)

**Rationale**:
- Matches existing validator pattern from v003
- Type guard return type enables type narrowing
- Non-negative allows depth=0 (useful for conditional flattening)
- Explicit Infinity handling in flatten() before calling validator

### Error Handling Strategy

**Decision**: Use InvalidNumberError for all numeric parameter validation

**Pattern**:
```typescript
if (!isNonNegativeInteger(size) || size === 0) {
  throw new InvalidNumberError('size must be a positive integer', 'size');
}
```

**Rationale**:
- Consistent with v003 truncate.ts error handling pattern
- InvalidNumberError appropriate for "wrong number type/value" failures
- Field parameter provides clear context in error messages
- No new error types needed - existing hierarchy sufficient

### Implementation Approach: Native vs Custom

**Decision**: Use native Array.prototype.flat() for flatten()

**Rationale**:
- Native method available in Node 20.x (ES2019)
- Simpler implementation: `return arr.flat(depth);` after validation
- Better performance (native implementation)
- Battle-tested by JavaScript community
- Reduced maintenance burden vs custom recursive implementation

**Implementation**:
```typescript
export function flatten(arr: any[], depth: number = 1): any[] {
  if (depth !== Infinity && !isNonNegativeInteger(depth)) {
    throw new InvalidNumberError('depth must be a non-negative integer or Infinity', 'depth');
  }
  return arr.flat(depth);
}
```

## Integration Points

### Dependencies on Previous Versions

**v001 - Foundation** ✅ Available:
- TypeScript 5.x configuration with ESM support
- Jest testing framework with ts-jest preset
- GitHub Actions CI pipeline
- Project structure established (src/, tests/, dist/)
- npm scripts (build, test, lint)

**v002 - Utility Functions** ✅ Available:
- Module organization pattern (string/, number/ directories)
- Utility function testing patterns
- API design patterns for simple functions
- Barrel export pattern (index.ts per module)

**v003 - Validation** ✅ Available:
- Custom error class hierarchy (src/errors/index.ts):
  - ValidationError base class with field property
  - EmptyStringError, InvalidNumberError, OutOfRangeError
- Type guard validators (src/validation/index.ts):
  - isNonEmptyString, isPositiveNumber, isInRange, assertNonEmptyString
- Error handling integration patterns (truncate, clamp, roundTo)
- Test patterns for validators and error types

### New Integration Required

**Files to Modify** (2 files):
1. **src/index.ts**: Add `export * from './array/index.js';` (1 line addition)
2. **src/validation/index.ts**: Add isNonNegativeInteger function + export (~10 lines)

**Files to Create** (16 files):
- **src/array/**: 8 files
  - index.ts (barrel export)
  - first.ts, last.ts, unique.ts, chunk.ts (theme 01)
  - compact.ts, flatten.ts, intersection.ts (theme 02)
- **tests/array/**: 8 files
  - index.test.ts (export tests)
  - first.test.ts, last.test.ts, unique.test.ts, chunk.test.ts
  - compact.test.ts, flatten.test.ts, intersection.test.ts

**tests/validation/index.test.ts**: Add tests for isNonNegativeInteger (~10 tests)

**Total Changes**:
- Files modified: 2
- Files created: 16
- Tests added: ~141 tests (126 array tests + 10 validation tests + 5 index tests)

### Execution Strategy

**Theme 01 Execution**:
1. Add isNonNegativeInteger to src/validation/index.ts first (needed by chunk)
2. Create src/array/ directory and index.ts
3. Implement first(), last(), unique(), chunk() in parallel or sequence
4. Update src/index.ts to export array module after Theme 01 complete

**Theme 02 Execution**:
5. Implement compact(), flatten(), intersection() building on Theme 01 structure
6. Final integration testing across all 7 functions

**Rationale for isNonNegativeInteger First**:
- chunk() in Theme 01 requires this validator
- Adding validator first prevents dependency issues
- Validator has own acceptance criteria, should be implemented before dependent features

## Themes

| # | Theme | Goal | Features | Complexity |
|---|-------|------|----------|------------|
| 1 | 01-array-basics | Implement foundational array utilities (first, last, unique, chunk) with straightforward algorithms and safe element access patterns | 4 | Low-Medium |
| 2 | 02-array-advanced | Implement advanced transformations (compact, flatten, intersection) using filtering, native methods, and variadic parameters | 3 | Medium-High |

**Theme 01 establishes**: Module structure, generic type patterns, safe access patterns, Set-based operations
**Theme 02 builds upon**: Established structure with filtering, native method integration, variadic parameters

## Success Criteria

Version is complete when:

- ✅ Theme 01 (array-basics): All 4 features implemented and tested
  - first(), last(): Safe element access with T | undefined return
  - unique(): Set-based deduplication preserving type
  - chunk(): Array slicing with size validation
- ✅ Theme 02 (array-advanced): All 3 features implemented and tested
  - compact(): Falsy value filtering
  - flatten(): Native flat() with depth validation
  - intersection(): Variadic Set-based filtering
- ✅ All 7 backlog items (BL-018 through BL-024) implemented
- ✅ All 32 acceptance criteria met (verified per feature)
- ✅ isNonNegativeInteger validator added to validation module
- ✅ All quality gates pass:
  - TypeScript compilation succeeds
  - All tests pass (existing 60 + new ~141 = 201 total)
  - CI pipeline passes on all PRs
- ✅ No breaking changes to existing APIs
- ✅ Documentation complete (JSDoc comments for Set behavior, parameter validation)
- ✅ Zero technical debt introduced

**Test Target**: 200+ total tests after v004 completion (60 existing + 141 new)
**Coverage Target**: Maintain v003 coverage levels across all new code

## Next Steps After Design Approval

1. **Pre-Execution Validation**: Run validate_version_design to confirm all design documents complete
2. **Theme 01 Implementation**:
   - Add isNonNegativeInteger validator first
   - Implement 4 array-basics features following implementation-plan.md
   - Create PRs, pass CI, merge
3. **Theme 02 Implementation**:
   - Implement 3 array-advanced features
   - Create PRs, pass CI, merge
4. **Version Completion**:
   - Generate completion reports
   - Create theme retrospectives
   - Update CHANGELOG.md
   - Version summary and learnings extraction
