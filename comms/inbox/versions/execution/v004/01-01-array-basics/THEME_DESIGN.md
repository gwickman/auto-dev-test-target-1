# Theme: array-basics

## Goal

Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely (first, last), removing duplicates (unique), and splitting arrays into chunks (chunk). These functions establish patterns for the array module organization, demonstrate TypeScript generic type preservation with `<T>`, and integrate with v003 validation infrastructure.

## Features

| # | Feature | Backlog | Goal | Complexity |
|---|---------|---------|------|------------|
| 001 | first | BL-020 | Get first element safely returning T \| undefined | Low |
| 002 | last | BL-021 | Get last element safely returning T \| undefined | Low |
| 003 | unique | BL-018 | Remove duplicates using Set with type preservation | Low-Medium |
| 004 | chunk | BL-019 | Split array into fixed-size chunks with validation | Medium |

## Technical Approach

### Generic Type Strategy (FINALIZED)

**Investigation Finding**: Use single generic parameter `<T>` for all functions. TypeScript infers T automatically from arr parameter - no explicit type annotations needed by callers.

**Pattern**:
```typescript
function first<T>(arr: T[]): T | undefined { return arr[0]; }
function last<T>(arr: T[]): T | undefined { return arr[arr.length - 1]; }
function unique<T>(arr: T[]): T[] { return [...new Set(arr)]; }
function chunk<T>(arr: T[], size: number): T[][] { /* ... */ }
```

**Key Insight**: Return type `T | undefined` for first/last() IS the type guard mechanism - enables TypeScript type narrowing in calling code. Satisfies "uses type guards" acceptance criteria without dedicated type guard functions.

### Implementation Approaches

**first() / last()**:
- Direct array index access (O(1))
- No validation needed - trust TypeScript compile-time types
- Return undefined for empty arrays naturally
- Type narrowing: `if (result !== undefined) { /* result is T here */ }`

**unique()**:
- Set-based: `[...new Set(arr)]` (ES6 standard, O(n))
- **Set Behavior** (investigation finding):
  - NaN treated as equal to itself (unlike ===) - CORRECT for deduplication
  - Objects use reference equality - per "strict equality" requirement
- Preserves order of first occurrence
- JSDoc comments document Set behavior

**chunk()**:
- for-loop with slice operations (most readable)
- Validation: size must be positive integer
- Last chunk automatically handles remainder (slice handles out-of-bounds)
- Integration point: demonstrates validation pattern for theme

### Validation Integration (NEW VALIDATOR REQUIRED)

**Investigation Finding**: Add isNonNegativeInteger() to src/validation/index.ts BEFORE implementing chunk().

```typescript
// New validator in src/validation/index.ts:
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}

// Usage in chunk():
if (!isNonNegativeInteger(size) || size === 0) {
  throw new InvalidNumberError('size must be a positive integer', 'size');
}
```

**Rationale**: Non-negative validator allows 0 (useful elsewhere), chunk adds explicit size !== 0 check.

## Dependencies

**External Dependencies**:
- v003 validation infrastructure (ValidationError, InvalidNumberError)
- TypeScript 5.x with generic type support and type inference
- Jest testing framework with ts-jest
- ESM module system (Node 20.x)

**Internal Dependencies**:
- **CRITICAL**: isNonNegativeInteger validator must be added FIRST (needed by chunk)
- All 4 features are independent otherwise
- Recommended order: validator → first → last → unique → chunk

**Module Structure Created**:
- Creates `src/array/` directory
- Creates individual function files (first.ts, last.ts, unique.ts, chunk.ts)
- Creates `src/array/index.ts` barrel export
- Updates `src/index.ts` to export array module
- Creates `tests/array/` directory for test files
- Adds tests for isNonNegativeInteger to `tests/validation/index.test.ts`

## Integration Points

**With v003 Validation**:
- Import: `import { InvalidNumberError } from '../errors/index.js';`
- Import: `import { isNonNegativeInteger } from '../validation/index.js';`
- Pattern: Always provide field parameter in errors
- Example: `throw new InvalidNumberError('size must be a positive integer', 'size');`

**With Existing Modules**:
- All array utilities exported from main `src/index.ts`
- Add: `export * from './array/index.js';` (with .js extension!)
- Tests import from `../../src/index.js` (public API testing)
- **ESM CRITICAL**: All imports use `.js` extensions even in .ts files

**Testing Integration**:
- Follow v003 comprehensive edge case testing pattern
- Test files in `tests/array/` mirror source structure
- Target: 15-20 tests per function
- Coverage: empty arrays, type preservation, edge cases, error throwing
- Special tests: Type narrowing verification for first/last, NaN/object behavior for unique

## Risks and Mitigations

| Risk | Status | Mitigation |
|------|--------|------------|
| TypeScript generic complexity | ✅ RESOLVED | Use single `<T>` parameter, TypeScript infers automatically |
| Type guards interpretation | ✅ RESOLVED | `T \| undefined` return type provides type narrowing |
| Set behavior with NaN/objects | ✅ RESOLVED | Document in tests and JSDoc, behavior is correct per requirements |
| Validation integration | ✅ RESOLVED | Add isNonNegativeInteger following v003 pattern |
| Empty array handling | ✅ RESOLVED | Explicit tests, first/last return undefined naturally |
| ESM import conventions | ✅ RESOLVED | Confirmed: always use .js extensions in imports |

## Test Strategy

**Per Function Targets**:
- first(): ~15 tests (empty, single, multiple, types, narrowing)
- last(): ~15 tests (empty, single, multiple, types, narrowing)
- unique(): ~18 tests (primitives, objects, NaN, empty, types)
- chunk(): ~20 tests (exact division, remainder, empty, validation, types)

**isNonNegativeInteger Validator**: ~10 tests in tests/validation/index.test.ts
**Total Theme Tests**: ~78 tests (68 array + 10 validation)

**Coverage Requirements**:
- Normal cases with various types
- Empty arrays
- Edge cases (NaN, objects, single elements)
- Error throwing (chunk validation)
- Type preservation across all functions
- Type narrowing demonstrations (first/last)

## Implementation Order

1. **First**: Add isNonNegativeInteger to src/validation/index.ts + tests
2. Create src/array/ directory and index.ts
3. Implement first() + tests → PR → merge
4. Implement last() + tests → PR → merge
5. Implement unique() + tests → PR → merge
6. Implement chunk() + tests → PR → merge
7. Update src/index.ts to export array module

**Rationale**: Validator first prevents dependency issues. Simple utilities (first/last) establish patterns before more complex ones (unique/chunk).

## Success Criteria

Theme complete when:
- ✅ isNonNegativeInteger validator added and tested
- ✅ All 4 features implemented with comprehensive tests
- ✅ src/array/ module structure created
- ✅ src/index.ts exports array module
- ✅ All tests pass (~78 new tests)
- ✅ TypeScript compilation succeeds
- ✅ CI passes on all PRs
- ✅ Generic types preserve element types correctly
- ✅ Set behavior documented in code and tests
- ✅ No technical debt introduced
