## Context

When a utility library needs validation for numeric parameters across multiple features and versions, the validation infrastructure must be designed for reuse and extension.

## Learning

Building focused, single-purpose validators (e.g., `isPositiveNumber`, `isNonNegativeInteger`) that compose with shared error types (e.g., `InvalidNumberError`) creates a validation module that new features can reuse without modification and extend with minimal effort when new constraints arise.

## Evidence

In v004, the validation module created in v003 proved both reusable and extensible:
- `chunk()` reused the existing `isPositiveNumber` validator from v003 without any changes
- `flatten()` required a new constraint (non-negative integer or Infinity), which was added as a new `isNonNegativeInteger()` validator in the same module with 6 new tests

The extension required modifying only `src/validation/index.ts` and its test file — no changes to existing validators or error types.

## Application

Design validation as a library of focused, composable validators sharing common error types. When a new feature needs a constraint not yet covered, add a new validator function to the existing module rather than inlining validation logic. Each validator should be independently testable.