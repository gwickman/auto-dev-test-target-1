# Learnings Detail — v004

## LRN-006: Simple-to-Complex Feature Ordering Reduces Theme Execution Risk

**Tags:** pattern, process, theme-design, risk-reduction
**Source:** v004 version retrospective + v004/01-01-array-basics retrospective + v004/02-02-array-advanced retrospective

### Content

#### Context

When executing a theme with multiple features of varying complexity, the order of feature execution affects risk and friction.

#### Learning

Ordering features from simplest to most complex within a theme allows early features to establish module structure, patterns, and conventions that later features build upon. This creates a natural scaffolding effect where each feature has precedent to follow.

#### Evidence

In v004, both themes used simple-to-complex ordering:
- Theme 01 (array-basics): first → last → unique → chunk, where first/last established the module structure and chunk (most complex, with validation integration) came last.
- Theme 02 (array-advanced): compact → flatten → intersection, where compact was a simple filter and flatten (recursive, new validator) came in the middle.

Both themes completed with 100% acceptance criteria and zero quality gate failures.

#### Application

When designing themes, sequence features so that simpler features come first. Simpler features should establish the module structure and export patterns that more complex features will extend. This is especially valuable when a theme introduces a new domain module.

---

## LRN-007: Validation-at-Boundary Pattern for Numeric Parameters

**Tags:** pattern, validation, typescript, api-design
**Source:** v004 version retrospective + v004/01-01-array-basics retrospective + v004/02-02-array-advanced retrospective

### Content

#### Context

When building utility functions that accept both typed structural inputs (arrays, objects) and numeric configuration parameters, a decision must be made about where to apply runtime validation.

#### Learning

Validate external numeric inputs at function boundaries (e.g., chunk size, flatten depth) using dedicated validators that throw descriptive errors. Trust TypeScript's compile-time type checking for structural inputs (arrays, generics). This creates a clear, consistent validation boundary: numeric parameters get runtime validation, typed structural parameters rely on the type system.

#### Evidence

In v004, this pattern was applied consistently:
- `chunk(arr, size)` — validates `size` is a positive integer using `isPositiveNumber`, throws `InvalidNumberError`
- `flatten(arr, depth)` — validates `depth` is a non-negative integer using new `isNonNegativeInteger`, throws `InvalidNumberError`
- `first(arr)`, `last(arr)`, `unique(arr)`, `compact(arr)` — no runtime validation on the array parameter, trusts TypeScript generics

All 7 features passed quality gates with zero runtime errors in tests.

#### Application

For utility functions: apply runtime validation to numeric parameters (sizes, depths, counts, indices) that have constraints beyond their type. Use descriptive error types with field names. Do not add runtime type-checking for parameters whose constraints are fully expressed by TypeScript's type system.

---

## LRN-008: Validation Module Extensibility Through Focused Validators

**Tags:** pattern, validation, extensibility, module-design
**Source:** v004/01-01-array-basics/004-004-chunk completion-report + v004/02-02-array-advanced/002-006-flatten completion-report + v004 version retrospective

### Content

#### Context

When a utility library needs validation for numeric parameters across multiple features and versions, the validation infrastructure must be designed for reuse and extension.

#### Learning

Building focused, single-purpose validators (e.g., `isPositiveNumber`, `isNonNegativeInteger`) that compose with shared error types (e.g., `InvalidNumberError`) creates a validation module that new features can reuse without modification and extend with minimal effort when new constraints arise.

#### Evidence

In v004, the validation module created in v003 proved both reusable and extensible:
- `chunk()` reused the existing `isPositiveNumber` validator from v003 without any changes
- `flatten()` required a new constraint (non-negative integer or Infinity), which was added as a new `isNonNegativeInteger()` validator in the same module with 6 new tests

The extension required modifying only `src/validation/index.ts` and its test file — no changes to existing validators or error types.

#### Application

Design validation as a library of focused, composable validators sharing common error types. When a new feature needs a constraint not yet covered, add a new validator function to the existing module rather than inlining validation logic. Each validator should be independently testable.

---

## LRN-009: TypeScript filter(Boolean) Requires Type Assertion Workaround

**Tags:** pattern, typescript, type-system, workaround
**Source:** v004/02-02-array-advanced/001-005-compact completion-report + v004/02-02-array-advanced retrospective

### Content

#### Context

When using `Array.filter(Boolean)` in TypeScript to remove falsy values, TypeScript's type narrowing cannot infer the resulting type correctly.

#### Learning

TypeScript cannot narrow types through `filter(Boolean)` — the return type remains the input type (including falsy variants) rather than narrowing to exclude them. A type assertion (`as T[]`) is needed. This is a known TypeScript limitation, not a code defect, and is safe given that `filter(Boolean)` semantically removes all falsy values.

#### Evidence

In v004, `compact<T>(arr: T[]): T[]` used `arr.filter(Boolean) as T[]`. Without the type assertion, TypeScript would not accept the return type as `T[]`. The function passed all 9 tests including tests for all six falsy value types (false, null, 0, "", undefined, NaN).

#### Application

When writing filter-based utilities that remove falsy values, use `filter(Boolean) as T[]` with a comment noting the TypeScript limitation. This pattern applies to any filter callback that narrows types in a way TypeScript cannot statically verify. Consider this when reviewing code — the assertion is intentional, not sloppy.

---

## LRN-010: Handle Infinity Before Integer Validation for Numeric Parameters

**Tags:** pattern, validation, edge-case, api-design
**Source:** v004/02-02-array-advanced/002-006-flatten completion-report + v004/02-02-array-advanced retrospective

### Content

#### Context

When a function parameter accepts both finite integers and `Infinity` as valid values (e.g., a depth parameter), the validation logic must handle both cases.

#### Learning

Check for `Infinity` as a special case before applying integer validation. Combining both checks into a single validator creates unnecessary complexity. A two-step approach — (1) if Infinity, accept; (2) otherwise, validate as integer — is clearer and easier to maintain.

#### Evidence

In v004, `flatten(arr, depth)` accepts depth as a non-negative integer or `Infinity`. The `isNonNegativeInteger()` validator was designed to check Infinity first, then fall through to integer validation. This approach was noted in the Theme 02 retrospective as cleaner than trying to make a single validator handle both cases. The flatten function passed all 19 tests including Infinity-specific test cases.

#### Application

For any parameter that accepts both finite values and Infinity: structure validation as an early return for Infinity followed by standard numeric validation. This pattern applies to recursive depth limits, timeout values, maximum iteration counts, and similar parameters.

---

## LRN-011: Comprehensive Edge Case Testing for JavaScript-Specific Quirks

**Tags:** pattern, testing, javascript, edge-cases
**Source:** v004/01-01-array-basics retrospective + v004/02-02-array-advanced retrospective

### Content

#### Context

JavaScript has well-known quirks around equality, falsy values, and special numeric values that can cause subtle bugs in utility functions if not tested thoroughly.

#### Learning

When testing utility functions that process arbitrary values, systematically test JavaScript-specific edge cases: NaN equality (Set deduplicates NaN), all six falsy values (false, null, 0, "", undefined, NaN), special numeric values (0/-0, Infinity, -Infinity), and type narrowing with undefined checks. These edge cases frequently expose bugs that standard happy-path tests miss.

#### Evidence

In v004, comprehensive edge case testing was applied across all 7 features:
- `unique()`: NaN deduplication via Set, 0/-0 distinction, Infinity/-Infinity handling
- `compact()`: All six falsy types tested individually, truthy preservation for {} and []
- `flatten()`: Depth 0, Infinity, null/undefined preservation in nested structures
- `intersection()`: Zero arrays, empty arrays, single-element edge cases

All 60 new tests passed, including edge case tests that verified correct handling of these JavaScript quirks.

#### Application

For every utility function, include tests for: (1) empty/zero-length inputs, (2) single-element inputs, (3) NaN if equality is involved, (4) all falsy values if truthiness is involved, (5) Infinity/-Infinity if numeric, (6) null/undefined if the function processes arbitrary types.

---

## LRN-012: Module-per-Domain with Barrel Exports Scales for Utility Libraries

**Tags:** pattern, module-design, architecture, scalability
**Source:** v004 version retrospective + v004/01-01-array-basics retrospective

### Content

#### Context

When building a utility library with multiple functional domains (strings, numbers, arrays, validation), the module organization pattern affects scalability and maintainability.

#### Learning

A module-per-domain pattern — where each domain has its own directory with individual function files and a barrel export (`index.ts`) — scales cleanly as functions are added. New functions require only creating the function file and adding an export to the barrel. No existing files need modification beyond the barrel export.

#### Evidence

In v004, the `src/array/` module grew from 0 to 7 functions across two themes. Each feature added:
1. A new function file (e.g., `src/array/first.ts`)
2. An export line in `src/array/index.ts`
3. A test file in `tests/array/`

This mirrored the existing `src/string/` and `src/number/` modules from earlier versions. No merge conflicts or structural issues occurred despite 7 sequential additions to the same module.

#### Application

For utility libraries, use one directory per domain with individual files per function and a barrel `index.ts`. The top-level `src/index.ts` re-exports each domain module. This pattern minimizes merge conflicts, makes each function independently navigable, and keeps imports clean for consumers.
