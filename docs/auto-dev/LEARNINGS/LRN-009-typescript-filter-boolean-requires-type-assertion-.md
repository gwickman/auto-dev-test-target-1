## Context

When using `Array.filter(Boolean)` in TypeScript to remove falsy values, TypeScript's type narrowing cannot infer the resulting type correctly.

## Learning

TypeScript cannot narrow types through `filter(Boolean)` — the return type remains the input type (including falsy variants) rather than narrowing to exclude them. A type assertion (`as T[]`) is needed. This is a known TypeScript limitation, not a code defect, and is safe given that `filter(Boolean)` semantically removes all falsy values.

## Evidence

In v004, `compact<T>(arr: T[]): T[]` used `arr.filter(Boolean) as T[]`. Without the type assertion, TypeScript would not accept the return type as `T[]`. The function passed all 9 tests including tests for all six falsy value types (false, null, 0, "", undefined, NaN).

## Application

When writing filter-based utilities that remove falsy values, use `filter(Boolean) as T[]` with a comment noting the TypeScript limitation. This pattern applies to any filter callback that narrows types in a way TypeScript cannot statically verify. Consider this when reviewing code — the assertion is intentional, not sloppy.