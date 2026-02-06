---
status: complete
acceptance_passed: 10
acceptance_total: 10
quality_gates:
  ruff: n/a
  mypy: n/a
  pytest: pass
  build: pass
---
# Completion Report: 001-005-compact

## Summary

Implemented the `compact<T>(arr: T[]): T[]` function that removes all falsy values from an array using the `filter(Boolean)` pattern with a type assertion for TypeScript compatibility.

## Acceptance Criteria

- [x] Function signature: `compact<T>(arr: T[]): T[]`
- [x] Removes all six falsy values (false, null, 0, "", undefined, NaN)
- [x] Preserves all truthy values including {} and []
- [x] Handles empty arrays (returns empty array)
- [x] Handles all-falsy arrays (returns empty array)
- [x] Has comprehensive tests covering all falsy types and edge cases
- [x] Generic type T preserved in return type
- [x] Exported from `src/array/index.ts` and `src/index.ts`
- [x] Tests pass with `npm test`
- [x] Build succeeds with `npm run build`

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `src/array/compact.ts` | Created | Main function implementation |
| `src/array/index.ts` | Modified | Added compact export |
| `tests/array/compact.test.ts` | Created | 9 unit tests covering all requirements |

## Quality Gates

- **Build:** Pass - TypeScript compiles without errors
- **Tests:** Pass - 102 tests total (14 suites), all passing
- **New tests:** 9 tests for compact function covering happy path, all falsy types, truthy preservation, edge cases

## Implementation Notes

- Uses `filter(Boolean)` pattern for O(n) filtering
- Type assertion `as T[]` needed due to TypeScript's inability to narrow falsy types automatically
- Returns new array instance (immutable operation)
