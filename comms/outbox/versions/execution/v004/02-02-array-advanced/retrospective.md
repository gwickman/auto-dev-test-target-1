# Theme Retrospective: 02-02-array-advanced

## Theme Summary

Theme **array-advanced** delivered three advanced array transformation utilities building upon the foundational `src/array/` module established in Theme 01: `compact()`, `flatten()`, and `intersection()`. All three features were implemented successfully with full acceptance criteria met, comprehensive test coverage, and passing quality gates (build + tests). The theme demonstrated recursive algorithms, Set-based operations, variadic parameters, and extended the validation module with a new `isNonNegativeInteger()` validator.

**Key metrics:**
- 3/3 features completed successfully
- 35/35 acceptance criteria passed (10 + 13 + 12)
- 32 new tests added (9 + 19 + 10) — including 6 for the new validator
- 131 total tests passing at theme completion (up from 93 at Theme 01 end)
- All quality gates passed (build, tests) across every feature

## Feature Results

| # | Feature | Status | Acceptance | Tests Added | Quality Gates | Backlog |
|---|---------|--------|------------|-------------|---------------|---------|
| 005 | compact | Complete | 10/10 | 9 | build: pass, tests: pass | BL-023 |
| 006 | flatten | Complete | 13/13 | 19 (13 + 6 validator) | build: pass, tests: pass | BL-022 |
| 007 | intersection | Complete | 12/12 | 10 | build: pass, tests: pass | BL-024 |

### Feature Details

**001-005-compact:** Implemented `compact<T>(arr: T[]): T[]` using the `filter(Boolean)` pattern with a type assertion (`as T[]`) for TypeScript compatibility. Removes all six falsy values (false, null, 0, "", undefined, NaN) while preserving truthy values. O(n) time complexity, returns a new array (immutable operation). 9 tests covering all falsy types, truthy preservation, and edge cases.

**002-006-flatten:** Implemented `flatten(arr: any[], depth?: number): any[]` with recursive depth control and a default depth of 1. Supports `Infinity` for full flatten. Created a new `isNonNegativeInteger()` validator in `src/validation/index.ts` for depth parameter validation, throwing `InvalidNumberError` for invalid values. 13 tests for flatten (depth variations, edge cases, validation errors) plus 6 tests for the new validator (negatives, decimals, non-finite, non-number types).

**003-007-intersection:** Implemented `intersection<T>(...arrays: T[][]): T[]` using Set-based deduplication for the first array and `every()` with `includes()` to verify presence across all remaining arrays. Uses strict equality (===), preserves order from the first array, and handles zero-array and empty-array edge cases. 10 comprehensive tests covering multi-array intersections and edge cases.

## Key Learnings

### What Went Well

- **Simple-to-complex ordering continued to work well.** Executing compact → flatten → intersection in increasing complexity allowed patterns to build incrementally, consistent with the recommendation from Theme 01.
- **Validation module proved extensible.** Adding `isNonNegativeInteger()` to the existing validation infrastructure was seamless, confirming the module's design for reusability. This extends the pattern established by chunk()'s use of `isPositiveNumber`.
- **Theme 01 module structure scaled cleanly.** All three features added to the existing `src/array/index.ts` barrel export without conflicts, validating the module-per-domain pattern.
- **All features were independent.** No inter-feature dependencies within the theme allowed clean execution without blocking, matching the Theme 01 experience.
- **Comprehensive edge case testing was thorough.** All features covered boundary conditions: all six falsy types (compact), depth variations including 0 and Infinity (flatten), zero/one/many arrays (intersection), and null/undefined preservation.

### Patterns Discovered

- **Type assertion pattern for filter narrowing.** TypeScript cannot narrow types through `filter(Boolean)`, requiring `as T[]`. This is a known TypeScript limitation worth documenting for future filter-based utilities.
- **Recursive depth pattern.** The flatten implementation demonstrates a clean recursive reduce with depth decrement, a reusable pattern for any depth-limited tree/nested-structure operation.
- **Infinity as special case.** Handling `Infinity` separately from integer validation (check before integer check) is cleaner than trying to make a single validator handle both. This pattern applies to any parameter that accepts both finite and infinite values.
- **Variadic rest parameters with generics** (`...arrays: T[][]`) provide clean API design for multi-input operations. The pattern of deduplicating the first array with Set, then filtering with `every()`, is reusable for similar set-operation utilities (union, difference).

## Technical Debt

No quality-gaps files were generated for any feature in this theme. All features passed quality gates cleanly on completion.

**Minor observations for future consideration:**
- **flatten() uses `any[]` typing.** TypeScript cannot express arbitrary-depth nested array types, so `any[]` is used for both input and output. If TypeScript adds recursive conditional types for arrays in the future, this could be revisited for stronger typing.
- **intersection() uses reference equality for objects.** Like unique() from Theme 01, objects are compared by reference (===), not deep equality. A future `intersectionBy()` with a comparator function would address value-based comparison needs.
- **compact() type assertion (`as T[]`)** bypasses TypeScript's type narrowing. This is safe given the filter(Boolean) semantics but represents a point where runtime behavior diverges from static type analysis.

## Recommendations

1. **Continue the module-per-domain and barrel export pattern.** The `src/array/` structure continues to scale well with six functions now exported. Future array utilities should follow this established pattern.
2. **Consider companion `By` variants** for functions using equality comparison — `intersectionBy()`, `uniqueBy()` — if key-based or comparator-based operations are needed.
3. **Reuse the recursive depth pattern** from flatten() for any future utilities operating on nested structures (e.g., `flatMap`, deep clone, tree traversal).
4. **Maintain the validation-at-boundary pattern.** The clear distinction between "validate external numeric inputs" (flatten depth, chunk size) and "trust TypeScript types" (compact array, intersection arrays) continues to serve well.
5. **Test count is healthy** (131 tests at theme end, up from 93). Continue the comprehensive edge-case testing approach, particularly for JavaScript-specific quirks (NaN, Infinity, falsy values).
