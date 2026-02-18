# v004 Version Design

## Overview

**Version:** v004
**Title:** Array Utilities - Implement fundamental and advanced array manipulation utilities with generic types, building on v003 validation infrastructure
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

Natural progression from primitive utilities to collection utilities. Arrays are fundamental data structures requiring generic type handling.

### Constraints

- TypeScript 5.x compatibility
- ESM modules with .js extensions
- Generic types required for all utilities
- Must integrate with v003 error types

### Assumptions

- v003 validation infrastructure is stable and complete
- TypeScript generics are sufficient for type-safe array operations
- No breaking changes to existing exports

### Deferred Items

- Object utilities (v005)
- Async utilities (v006)

## Themes

| # | Theme | Goal | Features |
|---|-------|------|----------|
| 1 | 01-01-array-basics | Implement foundational array utility functions (first, last, unique, chunk) | 4 |
| 2 | 02-02-array-advanced | Implement advanced array transformation utilities (compact, flatten, intersection) | 3 |

## Success Criteria

Version is complete when:

- [ ] Theme 01 (01-array-basics): Implement foundational array utility functions (first, last, unique, chunk)
- [ ] Theme 02 (02-array-advanced): Implement advanced array transformation utilities (compact, flatten, intersection)
