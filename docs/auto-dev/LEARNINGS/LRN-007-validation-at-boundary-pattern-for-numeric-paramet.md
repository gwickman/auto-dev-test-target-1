## Context

When building utility functions that accept both typed structural inputs (arrays, objects) and numeric configuration parameters, a decision must be made about where to apply runtime validation.

## Learning

Validate external numeric inputs at function boundaries (e.g., chunk size, flatten depth) using dedicated validators that throw descriptive errors. Trust TypeScript's compile-time type checking for structural inputs (arrays, generics). This creates a clear, consistent validation boundary: numeric parameters get runtime validation, typed structural parameters rely on the type system.

## Evidence

In v004, this pattern was applied consistently:
- `chunk(arr, size)` — validates `size` is a positive integer using `isPositiveNumber`, throws `InvalidNumberError`
- `flatten(arr, depth)` — validates `depth` is a non-negative integer using new `isNonNegativeInteger`, throws `InvalidNumberError`
- `first(arr)`, `last(arr)`, `unique(arr)`, `compact(arr)` — no runtime validation on the array parameter, trusts TypeScript generics

All 7 features passed quality gates with zero runtime errors in tests.

## Application

For utility functions: apply runtime validation to numeric parameters (sizes, depths, counts, indices) that have constraints beyond their type. Use descriptive error types with field names. Do not add runtime type-checking for parameters whose constraints are fully expressed by TypeScript's type system.