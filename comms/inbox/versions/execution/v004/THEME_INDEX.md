# v004 Theme Index

## Execution Order

Execute themes in order. Each theme must complete before starting the next.

### Theme 01: 01-array-basics

**Path:** `comms/inbox/versions/execution/v004/01-01-array-basics/`
**Goal:** Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks.

**Features:**

- 001-001-first: Get first element of array safely with undefined handling. Returns T | undefined enabling type narrowing. Direct array access pattern (arr[0]). BL-020. ~15 tests covering empty arrays, single elements, multiple elements, type preservation across primitives and objects, type narrowing demonstrations.
- 002-002-last: Get last element of array safely with undefined handling. Returns T | undefined enabling type narrowing. Uses arr.length-1 indexing. BL-021. ~15 tests covering empty arrays, single elements, multiple elements, type preservation, consistent API with first().
- 003-003-unique: Remove duplicate values from array using Set. Preserves generic type T through transformation. Set-based deduplication with spread operator [...new Set(arr)]. BL-018. ~18 tests covering primitives, objects (reference equality), NaN handling (Set treats NaN as equal), empty arrays, type preservation. Note: objects use reference equality per strict equality requirement.
- 004-004-chunk: Split array into fixed-size chunks handling remainder. Validates size is positive integer using isNonNegativeInteger. Returns T[][] preserving element type. For-loop with slice operations. BL-019. ~20 tests covering exact division, remainder handling, empty arrays, validation errors (negative size, zero size, non-integer), type preservation.

**Dependencies:**
- v003 validation infrastructure (error types, validators)
- **New validator required**: isNonNegativeInteger must be added to src/validation/index.ts BEFORE implementing chunk()

**Technical Notes:**
- All functions use generic type <T> to preserve element types
- Set behavior: reference equality for objects, NaN treated as equal to itself
- Error handling: InvalidNumberError for size validation in chunk()
- ESM imports: use .js extensions in all import statements

**Risks:**
- Generic type complexity: RESOLVED - use single <T> parameter, TypeScript infers automatically
- Type guards interpretation: RESOLVED - T | undefined return type provides type narrowing capability
- Validation integration: RESOLVED - add isNonNegativeInteger following v003 validator pattern

---

### Theme 02: 02-array-advanced

**Path:** `comms/inbox/versions/execution/v004/02-02-array-advanced/`
**Goal:** Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. Build upon JavaScript Set operations and recursive algorithms for sophisticated array manipulation.

**Features:**

- 001-005-compact: Remove all falsy values from array preserving truthy elements. Filters false, null, 0, "", undefined, NaN. Uses filter(Boolean) implementation. BL-023. ~18 tests covering all falsy types, truthy preservation (including empty objects/arrays - these are truthy!), type preservation. Note: return type T[] is best-effort (TypeScript cannot infer non-falsy subset type).
- 002-006-flatten: Flatten nested arrays to specified depth including Infinity. Uses native Array.prototype.flat() (available in Node 20.x ES2019). Validates depth is non-negative integer OR Infinity using isNonNegativeInteger with special Infinity handling. Default depth is 1. BL-022. ~20 tests covering depth 0/1/2/Infinity, deeply nested arrays, non-array elements, validation errors, empty arrays. Type safety trade-off accepted: uses any[] due to arbitrary nesting depth complexity.
- 003-007-intersection: Find common elements present in all provided arrays. Variadic parameters (...arrays: T[][]). Set-based filtering with every() check. Returns elements from first array that exist in all subsequent arrays. Uses strict/reference equality. BL-024. ~20 tests covering 2+ arrays, no common elements, empty arrays, NaN handling, object behavior (reference equality), single array input, type preservation.

**Dependencies:**
- Theme 01 (establishes src/array/ module structure, generic type patterns)
- v003 validation infrastructure
- isNonNegativeInteger validator (created in Theme 01)

**Technical Notes:**
- compact(): filter(Boolean) is idiomatic JavaScript, type limitation accepted
- flatten(): Native Array.flat() chosen over custom recursive implementation for performance and maintainability
- intersection(): Variadic parameters enable flexible multi-array comparison
- Set behavior applies: reference equality for objects, NaN handled correctly

**Risks:**
- flatten() implementation approach: RESOLVED - use native Array.flat(), available in Node 20.x
- Type safety in flatten(): RESOLVED - accepted trade-off using any[] for flexibility
- Set behavior documentation: RESOLVED - comprehensive tests demonstrate object/NaN behavior, JSDoc comments added
- Variadic parameter complexity: RESOLVED - standard TypeScript pattern, straightforward implementation

---

## Implementation Guidelines

### Order of Operations

**Phase 1: Validator Setup**
1. Add isNonNegativeInteger to src/validation/index.ts
2. Add tests for isNonNegativeInteger to tests/validation/index.test.ts
3. Verify validator works before proceeding

**Phase 2: Array Module Setup**
4. Create src/array/ directory
5. Create src/array/index.ts (barrel export placeholder)
6. Update src/index.ts to export array module

**Phase 3: Theme 01 Implementation**
7. Implement first(), last(), unique(), chunk() in feature number order
8. Each feature: implement source → implement tests → run quality gates → create PR → merge
9. Complete Theme 01 before starting Theme 02

**Phase 4: Theme 02 Implementation**
10. Implement compact(), flatten(), intersection() in feature number order
11. Each feature: implement source → implement tests → run quality gates → create PR → merge

### Feature Implementation Pattern

For each feature:
1. Read requirements.md completely
2. Read implementation-plan.md completely
3. Create source file in src/array/
4. Create test file in tests/array/
5. Implement function with JSDoc comments
6. Implement comprehensive tests (15-20 tests per function)
7. Run `npm run build` (must pass)
8. Run `npm test` (all tests must pass)
9. Update src/array/index.ts to export new function
10. Follow AGENTS.md PR workflow (create PR, wait for CI, fix if needed, merge)

### Quality Gates (MANDATORY)

Every feature must pass before merging:
- ✅ `npm run build` - TypeScript compilation succeeds
- ✅ `npm test` - All tests pass (existing + new)
- ✅ Test coverage maintained (no decrease from v003 levels)
- ✅ No console.log in production code
- ✅ CI passing (GitHub Actions)
- ✅ Conventional commit message (feat: description)

### Error Handling Standard

**chunk()**:
```typescript
if (!isNonNegativeInteger(size) || size === 0) {
  throw new InvalidNumberError('size must be a positive integer', 'size');
}
```

**flatten()**:
```typescript
if (depth !== Infinity && !isNonNegativeInteger(depth)) {
  throw new InvalidNumberError('depth must be a non-negative integer or Infinity', 'depth');
}
```

Always provide field parameter with parameter name for clear error context.

### ESM Import Pattern (CRITICAL)

All imports MUST use .js extensions even in .ts files:
```typescript
import { InvalidNumberError } from '../errors/index.js';
import { isNonNegativeInteger } from '../validation/index.js';
import { first } from './first.js';
```

TypeScript compiles to .js but doesn't rewrite import paths. This is required for ESM compatibility.

### Test Coverage Targets

- **Per function**: 15-20 tests minimum
- **Array module**: ~126 tests total (7 functions × 18 average)
- **Validation**: +10 tests for isNonNegativeInteger
- **Index exports**: +5 tests for barrel exports
- **Total new tests**: ~141 tests
- **Project total after v004**: 201 tests (60 existing + 141 new)

### Documentation Requirements

**JSDoc Comments Required For:**
- Functions with Set behavior (unique, intersection) explaining reference equality
- Parameter validation details (chunk size requirements, flatten depth handling)
- Return type clarifications (T | undefined for first/last)
- Type safety trade-offs (flatten uses any[], compact type limitation)

**Test Documentation:**
- Organize tests by category: normal cases, edge cases, error cases, type preservation
- Use descriptive test names explaining what is being verified
- Include comments for non-obvious behaviors (NaN handling, object reference equality)

## Notes

- Each feature folder contains requirements.md and implementation-plan.md
- Output documents (completion reports) go to comms/outbox/
- Follow AGENTS.md for full implementation process and PR workflow
- Theme 01 creates the array module foundation
- Theme 02 extends with advanced features
- All 7 features demonstrate TypeScript generic types effectively
- Integration with v003 validation infrastructure is seamless
- No breaking changes to existing APIs
- Zero technical debt introduced when following these guidelines
