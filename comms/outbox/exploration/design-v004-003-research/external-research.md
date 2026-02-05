# External Research

Findings from web research on array utility implementations, TypeScript patterns, and JavaScript best practices.

## TypeScript Generic Array Utilities

### Key Findings

**Generic Type Preservation:**
Generic functions maintain type safety by preserving the input array's element type. A function with signature `<T>(arr: T[]): T[]` ensures the return type matches the input type.

**Type Guards with Generics:**
Type guards can be generic, using the pattern `value is T` to narrow types at runtime. This enables compile-time type safety for functions that filter or validate array elements.

**Source:** [TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Application to v004

All array utilities except `flatten()` use generic type parameter `<T>`:
- `unique<T>(arr: T[]): T[]` - Preserves element type
- `chunk<T>(arr: T[], size: number): T[][]` - Preserves element type in nested arrays
- `first<T>(arr: T[]): T | undefined` - Return type reflects possibility of empty array
- `last<T>(arr: T[]): T | undefined` - Same as first()
- `compact<T>(arr: T[]): T[]` - Preserves element type (with type narrowing caveat)
- `intersection<T>(...arrays: T[][]): T[]` - Enforces same type across all arrays

Exception:
- `flatten(arr: any[], depth?: number): any[]` - Uses `any[]` due to type complexity with nested arrays of arbitrary depth

## Array Deduplication (unique)

### Set-Based Approach

**Standard Pattern (ES6+):**
```javascript
const uniqueArray = [...new Set(array)];
```

**How It Works:**
1. Set constructor automatically removes duplicates (Set cannot contain duplicate values)
2. Spread operator (`...`) converts Set back to array
3. Uses strict equality (===) for comparison

**Performance:**
Set-based approach is O(n) time complexity, more efficient than nested loops with indexOf/includes which are O(n²).

**Sources:**
- [JavaScript - Unique Values in an Array - GeeksforGeeks](https://www.geeksforgeeks.org/javascript/how-to-get-all-unique-values-remove-duplicates-in-a-javascript-array/)
- [30 seconds of code - Unique values](https://www.30secondsofcode.org/js/s/unique-values-in-array-remove-duplicates/)
- [How to Remove Array Duplicates in ES6 | SamanthaMing.com](https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/)

### TypeScript Implementation

```typescript
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
```

**Type Safety:**
Generic type `<T>` preserves element type. TypeScript infers `Set<T>` from `new Set(arr)` where `arr: T[]`.

**Edge Cases:**
- Empty array: Returns `[]`
- Primitives: Works with strings, numbers, booleans
- Objects: Uses reference equality (same limitation as JavaScript Set)
- NaN: Set treats NaN as equal (unlike === comparison)

## Array Chunking (chunk)

### Implementation Approaches

**1. For-Loop with Slice (Most Readable):**
```javascript
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

**2. Array.from() with Mapper:**
```javascript
function chunk(arr, size) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  );
}
```

**3. Reduce Method:**
```javascript
function chunk(arr, size) {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(arr.slice(i, i + size));
    }
    return acc;
  }, []);
}
```

**Performance:**
For-loop and Array.from() approaches perform similarly. Reduce method is slightly less readable.

**Sources:**
- [Split Array into Chunks - Dev Extent](https://www.devextent.com/split-typescript-array-into-chunks/)
- [How to Chunk an Array - ReactHustle](https://reacthustle.com/blog/how-to-chunk-an-array-in-javascript-or-typescript)
- [Chunking Array Compared - DEV Community](https://dev.to/readwanmd/chunking-an-array-in-javascript-four-ways-compared-48ok)

### TypeScript Implementation Recommendation

```typescript
export function chunk<T>(arr: T[], size: number): T[][] {
  // Validation: size must be positive integer
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

**Rationale:**
- Most readable and maintainable
- Explicit type annotations for result array
- Easy to understand logic
- Handles last chunk automatically (slice handles out-of-bounds)

## Array Flattening (flatten)

### Native Array.flat()

**ES2019 Standard:**
```javascript
const nested = [1, [2, [3, [4]]]];
nested.flat();        // [1, 2, [3, [4]]] (default depth: 1)
nested.flat(2);       // [1, 2, 3, [4]]
nested.flat(Infinity); // [1, 2, 3, 4] (fully flatten)
```

**Source:** [Array.prototype.flat() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

### Custom Recursive Implementation

**Recursive Algorithm with Depth:**
```javascript
function flatten(arr, depth = 1) {
  return arr.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) && depth > 0
        ? flatten(val, depth - 1)
        : val
    );
  }, []);
}
```

**How It Works:**
1. Use reduce to iterate through array
2. Check if element is array AND depth > 0
3. If true: recursively flatten with depth - 1
4. If false: concatenate element as-is
5. Base case: depth === 0 stops recursion

**Handling Infinity:**
```javascript
function flatten(arr, depth = 1) {
  if (depth === Infinity) {
    return arr.reduce((acc, val) =>
      acc.concat(Array.isArray(val) ? flatten(val, Infinity) : val),
    []);
  }
  return arr.reduce((acc, val) =>
    acc.concat(Array.isArray(val) && depth > 0 ? flatten(val, depth - 1) : val),
  []);
}
```

**Sources:**
- [Flatten Array using Array.flat() - SamanthaMing.com](https://www.samanthaming.com/tidbits/71-how-to-flatten-array-using-array-flat/)
- [How to Flatten Array Recursion - freeCodeCamp](https://www.freecodecamp.org/news/flatten-array-recursion/)
- [Flatten Deeply Nested Array - ExplainThis](https://www.explainthis.io/en/swe/flattening-deeply-nested-array)

### TypeScript Implementation Recommendation

```typescript
export function flatten(arr: any[], depth: number = 1): any[] {
  // Validate depth >= 0
  if (depth === 0) {
    return arr.slice(); // Return shallow copy
  }
  return arr.reduce((acc: any[], val: any) => {
    return acc.concat(
      Array.isArray(val) && depth > 0
        ? flatten(val, depth === Infinity ? Infinity : depth - 1)
        : val
    );
  }, []);
}
```

**Note:** Using `any[]` because TypeScript cannot type nested arrays of arbitrary depth.

## Array Compact (compact)

### JavaScript Falsy Values

Six falsy values in JavaScript:
1. `false`
2. `0`
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

### Standard Implementation

**Filter with Boolean:**
```javascript
const compacted = array.filter(Boolean);
```

**How It Works:**
Boolean constructor function returns false for falsy values, true for truthy values. Filter keeps only truthy elements.

**Source:** [Compact object or array - 30 seconds of code](https://www.30secondsofcode.org/js/s/compact-object-or-array/)

### TypeScript Type Narrowing Challenge

**Problem:**
TypeScript cannot automatically narrow types when filtering falsy values. After `arr.filter(Boolean)`, TypeScript doesn't know that falsy values have been removed.

**Solutions:**

**1. Type Assertion (Pragmatic):**
```typescript
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean) as T[];
}
```

**2. Explicit Type Guard (More Verbose):**
```typescript
function isTruthy<T>(value: T): value is NonNullable<T> {
  return Boolean(value);
}

export function compact<T>(arr: T[]): NonNullable<T>[] {
  return arr.filter(isTruthy);
}
```

**Sources:**
- [Removing Falsy Values Type-Safe - Medium](https://medium.com/@taitasciore/removing-falsy-values-from-an-array-with-real-type-checking-with-typescript-31d283174431)
- [TypeScript filter(Boolean) narrowing - GitHub Issue #30621](https://github.com/microsoft/TypeScript/issues/30621)
- [TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

### Recommendation

Use type assertion approach for simplicity, matching backlog requirement `compact<T>(arr: T[]): T[]`:

```typescript
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean) as T[];
}
```

**Rationale:**
- Matches acceptance criteria signature exactly
- TypeScript's type system limitation, not implementation flaw
- Runtime behavior is correct
- Type assertion is safe here (only removing falsy values)

## Array Intersection (intersection)

### Set-Based Algorithm

**For Two Arrays:**
```javascript
const intersection = arr1.filter(item => arr2.includes(item));
```

**Optimized with Set (O(n) lookup):**
```javascript
const set2 = new Set(arr2);
const intersection = arr1.filter(item => set2.has(item));
```

**For Multiple Arrays:**
```javascript
function intersection(...arrays) {
  if (arrays.length === 0) return [];
  const [first, ...rest] = arrays;
  const set = new Set(first);
  return [...set].filter(item =>
    rest.every(arr => arr.includes(item))
  );
}
```

**How It Works:**
1. Convert first array to Set (deduplicates automatically)
2. Filter Set elements, keeping only those present in ALL remaining arrays
3. Use `every()` to check each element appears in every array
4. Return filtered array

**Performance:**
- Set creation: O(n) where n is first array length
- Filter with every: O(n × m × k) where m is number of arrays, k is average array length
- Using Set.has() instead of includes() improves to O(n × m)

**Native Set.intersection():**
ES2025+ adds `Set.prototype.intersection()` method. As of July 2025, this is a recent addition. For broader compatibility, custom implementation is safer.

**Sources:**
- [Array intersection in ES6 - Medium](https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848)
- [Set.prototype.intersection() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection)
- [Perform Intersection Two Arrays - Vultr Docs](https://docs.vultr.com/javascript/examples/perform-intersection-between-two-arrays)

### TypeScript Implementation Recommendation

```typescript
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...arrays[0]];

  const [first, ...rest] = arrays;
  const set = new Set(first);

  return [...set].filter(item =>
    rest.every(arr => arr.includes(item))
  );
}
```

**Enhancements:**
- Handle empty input (no arrays provided)
- Handle single array (return unique elements)
- Use Set to deduplicate first array automatically
- Variadic parameters match acceptance criteria: `intersection<T>(...arrays: T[][]): T[]`

## First and Last Element Access

### Simple Array Access

**first():**
```typescript
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

**last():**
```typescript
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
```

**Type Safety:**
- Return type `T | undefined` correctly represents possibility of empty array
- JavaScript returns `undefined` for out-of-bounds array access
- No validation needed (TypeScript ensures arr is an array)

**Acceptance Criteria Note:**
Backlog mentions "Uses type guards" but the function signature doesn't narrow types. The type guard is in the return type annotation (`T | undefined`), allowing callers to check for undefined.

## Summary of Recommendations

| Function | Algorithm | Key Consideration |
|----------|-----------|-------------------|
| unique() | Set conversion with spread | O(n) performance, handles primitives |
| chunk() | For-loop with slice | Most readable, handles last chunk automatically |
| first() | Direct array[0] access | Return T \| undefined for empty arrays |
| last() | Direct array[length-1] access | Return T \| undefined for empty arrays |
| flatten() | Recursive reduce with depth | Handle Infinity explicitly, use any[] type |
| compact() | Filter(Boolean) with type assertion | TypeScript limitation, runtime correct |
| intersection() | Set-based filter with every() | Deduplicate first array, O(n×m) with Set |

All approaches are industry-standard patterns with strong web documentation and TypeScript support.
