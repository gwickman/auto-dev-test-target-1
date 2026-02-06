# Theme: array-basics

## Goal

Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. This theme focuses on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks. These functions establish patterns for array module organization and demonstrate generic type preservation.

## Features

| # | Feature | Backlog | Goal |
|---|---------|---------|------|
| 001 | first | BL-020 | Get first element of array safely with undefined handling |
| 002 | last | BL-021 | Get last element of array safely with undefined handling |
| 003 | unique | BL-018 | Remove duplicate values from array using Set |
| 004 | chunk | BL-019 | Split array into fixed-size chunks handling remainder |

## Dependencies

### External Dependencies
- v003 validation infrastructure (ValidationError, InvalidNumberError)
- TypeScript 5.x with generic type support
- Jest testing framework

### Feature Dependencies
- All features are independent within this theme
- Feature 004 (chunk) demonstrates validation integration pattern
- Recommended execution order: 001 → 002 → 003 → 004 (simple to complex)

### Module Structure
- Creates `src/array/` directory with individual function files
- Creates `src/array/index.ts` to re-export all functions
- Updates `src/index.ts` to export array module
- Creates `tests/array/` directory for test files

## Technical Approach

### Module Organization
Follow existing patterns from v001-v003:
```
src/array/
  first.ts       - first<T>(arr: T[]): T | undefined
  last.ts        - last<T>(arr: T[]): T | undefined
  unique.ts      - unique<T>(arr: T[]): T[]
  chunk.ts       - chunk<T>(arr: T[], size: number): T[][]
  index.ts       - Re-export all functions
```

Update `src/index.ts`:
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
export * from './array/index.js';  // NEW
```

### Implementation Patterns

**first() and last()**: Direct array index access
- Return `T | undefined` for empty array safety
- No validation needed (trust TypeScript types)
- O(1) time complexity

**unique()**: Set-based deduplication
- Use `[...new Set(arr)]` pattern (ES6+)
- O(n) time, O(n) space complexity
- Preserves order of first occurrence

**chunk()**: For-loop with slice
- Validate size is positive integer using existing validators
- Handle last chunk automatically (slice handles out-of-bounds)
- O(n) time, O(n) space complexity

### Validation Integration

**chunk() size parameter validation:**
```typescript
if (!isPositiveNumber(size) || !Number.isInteger(size)) {
  throw new InvalidNumberError('size must be a positive integer', 'size');
}
```

Pattern follows v003 truncate() validation approach.

## Integration Points

### With v003 Validation
- Import error types: `import { InvalidNumberError } from '../errors/index.js';`
- Use existing validators: `isPositiveNumber()` from `src/validation/index.ts`
- Include field parameter in errors for context

### With Existing Modules
- All array utilities exported from main `src/index.ts`
- Tests import from `../../src/index.js` (public API)
- ESM imports require `.js` extensions

### Testing Integration
- Follow v003 comprehensive edge case testing pattern
- Test files in `tests/array/` mirror source structure
- Empty arrays, special values, boundary conditions
- Type narrowing verification for first() and last()

## Risks

| Risk | Mitigation |
|------|------------|
| TypeScript generic type complexity | Follow proven patterns from research, test type preservation |
| chunk() validation integration | Reuse existing isPositiveNumber() validator, follow truncate() pattern |
| Set behavior with NaN and objects | Document behavior in tests (NaN equality, reference equality) |
| Empty array handling | Explicit tests for all functions with empty array input |