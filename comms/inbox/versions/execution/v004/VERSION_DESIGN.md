# v004 Version Design

## Overview

**Version:** v004
**Title:** Natural progression from primitive utilities (strings/numbers) to collection utilities. Arrays are fundamental data structures that require generic type handling, making this an excellent test of auto-dev's TypeScript capabilities. This version expands the utility library with commonly-needed array operations while demonstrating TypeScript generic types `<T>` for type-safe array manipulation.
**Themes:** 2

## Backlog Items

- [BL-018](docs/auto-dev/BACKLOG.md#bl-018)
- [BL-019](docs/auto-dev/BACKLOG.md#bl-019)
- [BL-020](docs/auto-dev/BACKLOG.md#bl-020)
- [BL-021](docs/auto-dev/BACKLOG.md#bl-021)
- [BL-022](docs/auto-dev/BACKLOG.md#bl-022)
- [BL-023](docs/auto-dev/BACKLOG.md#bl-023)
- [BL-024](docs/auto-dev/BACKLOG.md#bl-024)

## Design Context

### Rationale

Version v004 implements array utilities as a natural progression from primitive types (strings/numbers in v001-v002) to collection types. This progression tests auto-dev's ability to handle TypeScript generic types `<T>` and complex type signatures. The theme grouping separates simple foundational utilities (Theme 01: array-basics) from complex transformations (Theme 02: array-advanced), allowing pattern establishment before tackling recursive algorithms and variadic parameters. Implementation patterns were selected based on external research (Task 003) favoring industry-standard approaches: Set-based deduplication for unique(), for-loop slicing for chunk(), recursive reduce for flatten(), and Set-based filtering for intersection(). The design integrates with v003 validation infrastructure, reusing existing error types and adding new validators as needed.

### Constraints

- TypeScript 5.x compatibility required
- ESM modules with .js extensions in imports
- Generic types required for all utilities except flatten (uses any[])
- No runtime type checking - use compile-time type system
- Must integrate with v003 error types (ValidationError, InvalidNumberError, OutOfRangeError)
- New validator needed: isNonNegativeInteger() for flatten depth parameter
- Quality gates: TypeScript compilation, 100% test pass rate, Jest coverage, CI passing, conventional commits, no console.log

### Assumptions

- v001-v003 foundation exists (TypeScript config, ESM, Jest, CI, project structure)
- v003 validation infrastructure available (error types, validators, patterns)
- No breaking changes - all changes are additive
- Trust TypeScript types following existing pattern (no array type validation)
- Set behavior with NaN and objects uses JavaScript standard (reference equality)
- Target ES2022 enables Set, Array methods without polyfills

### Deferred Items

- Default value parameter for first() and last() (mentioned in description but excluded from acceptance criteria)
- Deep equality for intersection() (uses strict/reference equality only)
- Optimization beyond standard algorithms (performance targets already reasonable)
- Type-safe compact() return type (TypeScript limitation - type assertion accepted)
- Runtime type checking for array inputs (trust TypeScript compile-time types)

## Themes

| # | Theme | Goal | Features |
|---|-------|------|----------|
| 1 | 01-01-array-basics | Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks. | 4 |
| 2 | 02-02-array-advanced | Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. Build upon JavaScript Set operations and recursive algorithms for sophisticated array manipulation. | 3 |

## Success Criteria

Version is complete when:

- [ ] Theme 01 (01-array-basics): Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks.
- [ ] Theme 02 (02-array-advanced): Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. Build upon JavaScript Set operations and recursive algorithms for sophisticated array manipulation.
