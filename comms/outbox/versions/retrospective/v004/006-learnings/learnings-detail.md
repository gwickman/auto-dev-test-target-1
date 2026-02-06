# Learnings Detail — v004 Retrospective

## Learning 1: Simple-to-complex feature ordering reduces risk

**Tags:** pattern, process
**Source:** v004 version retrospective, both theme retrospectives

### Context
When a theme contains multiple features of varying complexity that share patterns or infrastructure.

### Learning
Ordering feature implementation from simplest to most complex within a theme allows early features to establish module structure, export patterns, and testing patterns. Later features build on proven foundations rather than pioneering patterns while also handling complex logic.

### Evidence
Both v004 themes confirmed this: Theme 01 executed first→last→unique→chunk (O(1) accessors first, then O(n) transformations). Theme 02 executed compact→flatten→intersection (single-array operations first, then multi-input). Each subsequent feature built on patterns established by predecessors.

### Application
When designing theme feature order, sort by complexity. Let the simplest feature establish the module structure and patterns. Save features with validation integration, recursive algorithms, or multiple inputs for later positions.

---

## Learning 2: Module-per-domain structure scales cleanly

**Tags:** pattern, architecture
**Source:** v004/01-array-basics retrospective

### Context
When organizing utility functions in a TypeScript library with multiple domains (strings, numbers, arrays, etc.).

### Learning
A consistent module-per-domain structure (`src/{domain}/`, `tests/{domain}/`) with barrel exports (`src/{domain}/index.ts`) scales well as both the number of domains and functions-per-domain grow. The pattern requires no adaptation as new domains or functions are added.

### Evidence
v004 added `src/array/` with 7 functions following the exact pattern of `src/string/` (4 functions) and `src/number/` (2 functions). No conflicts, no restructuring needed. The barrel export pattern handled 7 functions as cleanly as 2.

### Application
For new utility domains, create `src/{domain}/`, `src/{domain}/index.ts` (barrel), `tests/{domain}/`. Add individual files per function. Re-export from `src/index.ts`. This pattern is proven through 4 domains and 13+ functions.

---

## Learning 3: Validate external inputs, trust typed structural inputs

**Tags:** pattern, validation
**Source:** v004/01-array-basics retrospective, v004/02-array-advanced retrospective

### Context
When deciding which function parameters need runtime validation in a TypeScript library.

### Learning
External numeric parameters (sizes, depths, counts) that users provide as literal values should have runtime validation with descriptive error messages. Structural parameters (arrays, objects) that TypeScript enforces at compile-time don't need runtime validation — the type system provides the safety.

### Evidence
In v004: `chunk(arr, size)` validates `size` (user provides a number); `flatten(arr, depth)` validates `depth`. But `first(arr)`, `last(arr)`, `unique(arr)`, `compact(arr)` trust the array parameter — TypeScript prevents passing non-arrays at compile time.

### Application
For each function parameter, ask: "Is this a value the user types as a literal?" If yes, validate it. "Is this a structural type TypeScript enforces?" If yes, trust the type system.

---

## Learning 4: TypeScript filter(Boolean) requires type assertion

**Tags:** debugging, typescript
**Source:** v004/02-array-advanced/compact completion-report

### Context
When using `Array.filter(Boolean)` to remove falsy values from a typed array in TypeScript.

### Learning
TypeScript cannot narrow types through `filter(Boolean)`. The result type remains `(T | null | undefined | false | 0 | "")[]` rather than narrowing to `T[]`. A type assertion (`as T[]`) is required. This is safe because `Boolean` as a filter predicate guarantees all falsy values are removed.

### Evidence
`compact<T>(arr: T[]): T[]` implementation required `arr.filter(Boolean) as T[]`. Without the assertion, TypeScript reports a type mismatch.

### Application
When implementing any filter-based utility that removes falsy/nullish values, plan for the `as T[]` type assertion. Document it as a known TypeScript limitation, not a code smell.

---

## Learning 5: Recursive depth pattern for nested structures

**Tags:** pattern, algorithm
**Source:** v004/02-array-advanced/flatten completion-report

### Context
When implementing operations on arbitrarily nested data structures with configurable depth limits.

### Learning
A recursive reduce pattern with depth decrement (`depth - 1` on each recursion level) provides clean, bounded recursion for nested structure operations. Handle `Infinity` as a special case before integer validation, and use `depth > 0` as the recursion guard.

### Evidence
`flatten(arr, depth)` uses `arr.reduce()` that checks `Array.isArray(item) && depth > 0`, then recurses with `depth - 1`. `Infinity` naturally works because `Infinity - 1 === Infinity` and `Infinity > 0 === true`.

### Application
Reuse this pattern for depth-limited tree traversal, deep clone, flatMap, or any operation on nested structures. The `Infinity` handling is free — no special case needed in the recursion, only in the initial validation.

---

## Learning 6: Variadic rest parameters with generics for multi-input APIs

**Tags:** pattern, typescript
**Source:** v004/02-array-advanced/intersection completion-report

### Context
When designing API functions that accept a variable number of same-typed inputs (e.g., set operations on multiple arrays).

### Learning
TypeScript's `...rest: T[][]` pattern with generics provides clean, type-safe APIs for multi-input operations. Combine with Set-based deduplication on the first input and `every()` + `includes()` for cross-input verification.

### Evidence
`intersection<T>(...arrays: T[][]): T[]` accepts 0 to N arrays. The implementation deduplicates the first array with Set, then filters to elements present in all remaining arrays via `every(arr => arr.includes(item))`.

### Application
Use `...rest: T[][]` for set operations (union, difference, symmetric difference). The Set + every pattern is O(n*m) but correct and readable. Consider optimized approaches only if performance profiling indicates need.
