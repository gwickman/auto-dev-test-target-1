# Research and Investigation for v004

This research investigation examined array utility implementation patterns, TypeScript generic types, JavaScript Set operations, and validation integration requirements for the 7 array utilities planned in v004. Key findings include: (1) all utilities should follow existing codebase patterns with generic types `<T>` except `flatten()` which uses `any[]`, (2) Set-based operations provide optimal performance for `unique()` and `intersection()`, (3) recursive depth-controlled algorithms are standard for `flatten()`, (4) type guards and proper type narrowing are critical for `compact()`, (5) validation integration requires new array-specific validators beyond v003's existing validators, and (6) all utilities must follow ESM module structure with `.js` extensions in imports.

## Research Questions

The following research questions were investigated:

1. **TypeScript Generic Patterns**: How should generic types `<T>` be used in array utilities to preserve type safety?
2. **Set Operations**: What is the optimal approach for removing duplicates (`unique()`) and finding intersections (`intersection()`)?
3. **Array Flattening**: How should `flatten()` handle depth parameter, including `Infinity`?
4. **Array Chunking**: What is the most efficient algorithm for splitting arrays into fixed-size chunks?
5. **Type Narrowing for Compact**: How should `compact()` handle type narrowing when removing falsy values?
6. **Validation Integration**: What validation is needed for array utilities using v003's validation infrastructure?
7. **Module Structure**: How should `src/array/` be organized following existing patterns?
8. **Test Patterns**: What test coverage is expected based on v003 standards?

## Findings Summary

### Codebase Patterns (Well-Defined)

The existing codebase provides clear patterns for implementation:

- **Module Organization**: Each utility category (`string/`, `number/`) has an `index.ts` that re-exports individual function files. Main `src/index.ts` exports all category indices.
- **ESM Requirements**: All imports must use `.js` extensions (e.g., `import { ValidationError } from '../errors/index.js'`)
- **Error Handling**: v003 established ValidationError hierarchy (ValidationError → EmptyStringError, InvalidNumberError, OutOfRangeError)
- **Type Guards**: Existing validators use TypeScript type guards (`value is Type`) and assertion functions (`asserts value is Type`)
- **Test Organization**: Tests mirror source structure in `tests/` directory, importing from `../../src/index.js`

### External Research (Well-Defined)

Web research confirmed industry-standard approaches:

- **Set for Deduplication**: `[...new Set(array)]` is the standard pattern for `unique()` (ES6+)
- **Array Chunking**: For-loop with slice is most readable; `Array.from()` with mapper is most concise
- **Flatten with Depth**: Recursive algorithm with depth parameter decremented on each call; `Infinity` requires special handling
- **Intersection Algorithm**: Use Set for first array, filter subsequent arrays checking `Set.has()` for O(n) lookups
- **Compact Type Narrowing**: TypeScript's type system struggles with falsy filtering; explicit type guards may be needed

### Validation Requirements (Newly Identified)

Array utilities require validation not currently in v003:

- **Array Type Validation**: Need `isArray()` type guard for non-array inputs
- **Positive Integer Validation**: `chunk()` needs size validation (existing `isPositiveNumber` excludes decimals via `Number.isInteger` check)
- **Non-Negative Number Validation**: `flatten()` depth parameter allows 0 (unlike positive-only validators)
- **Variadic Array Validation**: `intersection()` rest parameter needs validation

## Unresolved Questions

**Status**: All research questions resolved with evidence. No items deferred.

## Recommendations

Based on research findings, the following design directions are recommended:

### 1. Module Structure

Follow existing patterns exactly:
```
src/array/
  unique.ts      - unique<T>(arr: T[]): T[]
  chunk.ts       - chunk<T>(arr: T[], size: number): T[][]
  first.ts       - first<T>(arr: T[]): T | undefined
  last.ts        - last<T>(arr: T[]): T | undefined
  flatten.ts     - flatten(arr: any[], depth?: number): any[]
  compact.ts     - compact<T>(arr: T[]): T[]
  intersection.ts - intersection<T>(...arrays: T[][]): T[]
  index.ts       - Re-export all functions
```

Update `src/index.ts` to add: `export * from './array/index.js';`

### 2. Validation Strategy

Create new validators in `src/validation/index.ts`:
```typescript
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

Reuse existing validators where applicable:
- `isPositiveNumber()` for chunk size (already checks `Number.isFinite()` and excludes decimals)
- `OutOfRangeError` for invalid parameters

### 3. Implementation Patterns

**unique()**: Use Set conversion
```typescript
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
```

**chunk()**: For-loop with slice (most readable)
```typescript
export function chunk<T>(arr: T[], size: number): T[][] {
  // Validate size using existing isPositiveNumber + Number.isInteger check
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

**flatten()**: Recursive with depth parameter
```typescript
export function flatten(arr: any[], depth: number = 1): any[] {
  // Validate depth >= 0 using new isNonNegativeInteger validator
  // Handle Infinity case explicitly
  return arr.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) && depth > 0
        ? flatten(val, depth - 1)
        : val
    );
  }, []);
}
```

**intersection()**: Set-based filter
```typescript
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  const [first, ...rest] = arrays;
  const set = new Set(first);
  return [...set].filter(item =>
    rest.every(arr => arr.includes(item))
  );
}
```

**compact()**: Filter with Boolean (type narrowing limitation accepted)
```typescript
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean) as T[];
}
```
Note: TypeScript cannot perfectly narrow types for falsy removal. The `as T[]` cast is necessary.

**first/last()**: Direct array access with type guards
```typescript
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
```

### 4. Test Coverage

Follow v003's comprehensive edge case testing patterns:
- Empty arrays for all functions
- Single-element arrays
- Large arrays (performance validation)
- Special values (null, undefined, NaN in arrays)
- Boundary conditions (e.g., `chunk()` with size equal to array length)
- Invalid parameters (validation error testing)
- Type narrowing verification (compile-time type tests)

### 5. Theme Organization

**Theme 01 (array-basics)**: Simple utilities with minimal dependencies
- Order: first() → last() → unique() → chunk()
- Rationale: Start with simplest (first/last), then add Set operations (unique), then more complex chunking

**Theme 02 (array-advanced)**: More complex utilities
- Order: compact() → flatten() → intersection()
- Rationale: compact is straightforward filtering, flatten has recursive complexity, intersection combines Set and filter operations

## Sources

**TypeScript Generics and Type Guards:**
- [TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Generics and Type Guards - Medium](https://medium.com/swlh/typescript-generics-and-type-guards-explained-by-example-177b4a654ef6)

**Set Operations:**
- [JavaScript - Unique Values in an Array - GeeksforGeeks](https://www.geeksforgeeks.org/javascript/how-to-get-all-unique-values-remove-duplicates-in-a-javascript-array/)
- [30 seconds of code - Unique values in array](https://www.30secondsofcode.org/js/s/unique-values-in-array-remove-duplicates/)
- [Array intersection in ES6 - Medium](https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848)
- [Set.prototype.intersection() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection)

**Array Flattening:**
- [Array.prototype.flat() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [Flatten Array using Array.flat() - SamanthaMing.com](https://www.samanthaming.com/tidbits/71-how-to-flatten-array-using-array-flat/)
- [How to Flatten an Array Using Recursion - freeCodeCamp](https://www.freecodecamp.org/news/flatten-array-recursion/)

**Array Chunking:**
- [Split Array into Chunks - Dev Extent](https://www.devextent.com/split-typescript-array-into-chunks/)
- [How to Chunk an Array - ReactHustle](https://reacthustle.com/blog/how-to-chunk-an-array-in-javascript-or-typescript)

**Compact and Type Narrowing:**
- [Removing Falsy Values Type-Safe Way - Medium](https://medium.com/@taitasciore/removing-falsy-values-from-an-array-with-real-type-checking-with-typescript-31d283174431)
- [TypeScript filter(Boolean) type narrowing - GitHub Issue #30621](https://github.com/microsoft/TypeScript/issues/30621)
