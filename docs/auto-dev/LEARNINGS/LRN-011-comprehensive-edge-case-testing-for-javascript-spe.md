## Context

JavaScript has well-known quirks around equality, falsy values, and special numeric values that can cause subtle bugs in utility functions if not tested thoroughly.

## Learning

When testing utility functions that process arbitrary values, systematically test JavaScript-specific edge cases: NaN equality (Set deduplicates NaN), all six falsy values (false, null, 0, "", undefined, NaN), special numeric values (0/-0, Infinity, -Infinity), and type narrowing with undefined checks. These edge cases frequently expose bugs that standard happy-path tests miss.

## Evidence

In v004, comprehensive edge case testing was applied across all 7 features:
- `unique()`: NaN deduplication via Set, 0/-0 distinction, Infinity/-Infinity handling
- `compact()`: All six falsy types tested individually, truthy preservation for {} and []
- `flatten()`: Depth 0, Infinity, null/undefined preservation in nested structures
- `intersection()`: Zero arrays, empty arrays, single-element edge cases

All 60 new tests passed, including edge case tests that verified correct handling of these JavaScript quirks.

## Application

For every utility function, include tests for: (1) empty/zero-length inputs, (2) single-element inputs, (3) NaN if equality is involved, (4) all falsy values if truthiness is involved, (5) Infinity/-Infinity if numeric, (6) null/undefined if the function processes arbitrary types.