# Theme: array-advanced

## Goal

Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. These utilities demonstrate recursive algorithms, Set-based operations, and variadic parameters for sophisticated array manipulation patterns. This theme builds upon the foundational patterns established in Theme 01.

## Features

| # | Feature | Backlog | Goal |
|---|---------|---------|------|
| 005 | compact | BL-023 | Remove all falsy values from array preserving truthy elements |
| 006 | flatten | BL-022 | Flatten nested arrays to specified depth including Infinity |
| 007 | intersection | BL-024 | Find common elements present in all provided arrays |

## Dependencies

### External Dependencies
- v003 validation infrastructure (ValidationError, InvalidNumberError)
- TypeScript 5.x with generic type support
- Jest testing framework
- ES2022 features (Array methods, Set operations)

### Feature Dependencies
- Theme 01 (array-basics) establishes `src/array/` module structure
- Feature 006 (flatten) requires new `isNonNegativeInteger()` validator
- All features are independent within this theme
- Recommended execution order: 005 → 006 → 007 (simple to complex)

### New Validator Required
**isNonNegativeInteger** (for flatten depth):
```typescript
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

Add to `src/validation/index.ts` with corresponding tests.

## Technical Approach

### Implementation Patterns

**compact()**: Filter with Boolean
- Use `arr.filter(Boolean)` to remove all falsy values
- Type assertion `as T[]` needed due to TypeScript limitation
- O(n) time complexity
- Falsy values: `false`, `null`, `0`, `""`, `undefined`, `NaN`

**flatten()**: Recursive reduce with depth
- Default depth parameter: `depth: number = 1`
- Recursive algorithm with depth decrement
- Special handling for `Infinity` (full flatten)
- Validate depth is non-negative integer
- O(n × d) time complexity (n=elements, d=depth)

**intersection()**: Set-based filter with variadic parameters
- Signature: `intersection<T>(...arrays: T[][]): T[]`
- Use Set for first array deduplication
- Filter with `every()` to check presence in all arrays
- O(n × m) time complexity (n=elements, m=array count)

### Validation Strategy

**For flatten() depth parameter:**
- Create new `isNonNegativeInteger()` validator
- Allows depth of 0 (unlike `isPositiveNumber()`)
- Exclude Infinity from integer check (handle separately)
- Throw `InvalidNumberError` for negative or non-integer values

**For compact() and intersection():**
- No parameter validation needed (trust TypeScript types)
- Type narrowing handled at compile time

### Type Strategy

**compact()**: Generic with type assertion
- Signature: `compact<T>(arr: T[]): T[]`
- TypeScript cannot narrow falsy types automatically
- Use `as T[]` cast after `filter(Boolean)`
- Document limitation in tests

**flatten()**: Uses `any[]` for nested arrays
- Signature: `flatten(arr: any[], depth?: number): any[]`
- TypeScript cannot type arbitrary depth nesting
- Accepted tradeoff per acceptance criteria

**intersection()**: Generic with variadic parameters
- Signature: `intersection<T>(...arrays: T[][]): T[]`
- Rest parameter allows arbitrary number of arrays
- Type `T` inferred from first array

## Integration Points

### With v003 Validation
- Import `InvalidNumberError` for flatten validation
- Add `isNonNegativeInteger()` to validation module
- Follow established error handling patterns

### With Theme 01
- Extends `src/array/index.ts` with new exports
- Maintains consistent module structure
- Tests follow established patterns

### Testing Integration
- Follow v003 comprehensive edge case testing
- Test falsy value types explicitly (compact)
- Test depth parameter variations (flatten)
- Test variadic parameter cases (intersection)

## Risks

| Risk | Mitigation |
|------|------------|
| compact() type narrowing limitation | Document TypeScript limitation, use type assertion with clear comments |
| flatten() recursive depth handling | Explicit tests for various depths including Infinity, handle as special case |
| flatten() Infinity validation | Check `depth === Infinity` separately before integer validation |
| intersection() with zero arrays | Explicit test case, return empty array |
| intersection() reference equality confusion | Document in tests that objects compared by reference, not deep equality |
| NaN in compact() and intersection() | Explicit tests for NaN handling per JavaScript semantics |