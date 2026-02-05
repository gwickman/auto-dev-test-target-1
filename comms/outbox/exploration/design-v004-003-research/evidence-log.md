# Evidence Log

Concrete values and parameters for v004 array utilities with evidence sources.

## Array Module Location

- **Value**: `src/array/`
- **Source**: Existing codebase pattern analysis
- **Data**: Examined `src/string/` and `src/number/` directory structures
- **Rationale**: Maintain consistency with existing module organization pattern where each utility category has its own directory with individual function files and an index.ts

## Module Export Pattern

- **Value**: Individual function files + `index.ts` re-export
- **Source**: `src/string/index.ts`, `src/number/index.ts`
- **Data**:
  ```typescript
  // src/string/index.ts
  export { reverse } from './reverse.js';
  export { truncate } from './truncate.js';
  export { slugify } from './slugify.js';
  export { capitalize } from './capitalize.js';
  ```
- **Rationale**: Follow established pattern for module organization and re-exports

## ESM Import Extension

- **Value**: `.js` extensions required in all imports
- **Source**: All existing source files (`src/validation/index.ts:1`, `src/number/clamp.ts:1`, `src/string/truncate.ts:1`)
- **Data**: Every import statement uses `.js` extension:
  - `import { ValidationError } from '../errors/index.js';`
  - `import { EmptyStringError } from '../errors/index.js';`
- **Rationale**: Node.js ESM requirement enforced by TypeScript config (`"module": "NodeNext"`)

## TypeScript Target and Module Settings

- **Value**:
  - Target: `ES2022`
  - Module: `NodeNext`
  - Strict: `true`
- **Source**: `tsconfig.json:2-13`
- **Data**:
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "strict": true
    }
  }
  ```
- **Rationale**: ES2022 provides modern JavaScript features including:
  - Array.prototype.at() (not used but available)
  - Top-level await (not needed for utilities)
  - Class fields (not needed for functions)
  - All features needed for array utilities are available

## Test File Location Pattern

- **Value**: `tests/array/*.test.ts` mirroring `src/array/*.ts`
- **Source**: Existing test structure analysis
- **Data**:
  - Source: `src/string/capitalize.ts`
  - Test: `tests/string/capitalize.test.ts`
  - Source: `src/number/clamp.ts`
  - Test: `tests/number/clamp.test.ts`
- **Rationale**: Maintain 1:1 mapping between source files and test files

## Test Import Path

- **Value**: Import from `../../src/index.js` (main entry point)
- **Source**: All test files (`tests/string/capitalize.test.ts:1`, `tests/validation/index.test.ts:2`)
- **Data**:
  ```typescript
  import { capitalize } from '../../src/index.js';
  import { isNonEmptyString, assertNonEmptyString } from '../../src/index.js';
  ```
- **Rationale**: Test public API surface, not internal implementation files

## Chunk Size Validation

- **Value**: Positive integer (> 0 and Integer.isInteger)
- **Source**: Existing pattern from `src/string/truncate.ts:7-9` + `isPositiveNumber` validator
- **Data**:
  ```typescript
  // truncate.ts validates positive integer
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new InvalidNumberError('maxLength must be a positive integer', 'maxLength');
  }

  // validation/index.ts - isPositiveNumber checks finite and > 0
  export function isPositiveNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value) && value > 0;
  }
  ```
- **Rationale**: Chunk size must be positive integer. Combine `isPositiveNumber()` (checks finite and > 0) with `Number.isInteger()` check

## Flatten Depth Validation

- **Value**: Non-negative number (>= 0), allow Infinity
- **Source**: MDN Array.prototype.flat() specification + backlog acceptance criteria
- **Data**:
  - MDN: "The depth level specifying how deep a nested array structure should be flattened. Defaults to 1."
  - Backlog BL-022: "Default depth is 1", "Supports Infinity for full flatten", "Validates depth is non-negative"
- **Rationale**: Depth of 0 is valid (returns shallow copy), negative depth is invalid, Infinity is special case for full flatten

## Flatten Default Depth

- **Value**: `1`
- **Source**: Backlog BL-022 acceptance criteria + MDN Array.prototype.flat()
- **Data**: "Default depth is 1" (BL-022), MDN confirms depth defaults to 1
- **Rationale**: Match JavaScript standard library behavior

## Validation Error Types Available

- **Value**:
  - `ValidationError` (base class)
  - `EmptyStringError`
  - `InvalidNumberError`
  - `OutOfRangeError`
- **Source**: `src/errors/index.ts:1-28`
- **Data**: Full class hierarchy examined, all extend ValidationError with optional `field` parameter
- **Rationale**: Use appropriate error type for each validation failure

## Error Field Parameter Usage

- **Value**: Include field name in validation errors for context
- **Source**: Existing usage pattern in `src/string/truncate.ts` and `src/number/clamp.ts`
- **Data**:
  ```typescript
  // truncate.ts
  throw new EmptyStringError('suffix');
  throw new InvalidNumberError('maxLength must be a positive integer', 'maxLength');

  // clamp.ts
  throw new OutOfRangeError(min, max, max, 'min');
  ```
- **Rationale**: Provides context about which parameter failed validation, improving error messages

## Test Coverage Pattern

- **Value**: Comprehensive edge case testing including:
  - Empty arrays
  - Single-element arrays
  - Large arrays
  - Special values (null, undefined, NaN in arrays)
  - Boundary conditions
  - Validation error cases
  - Type narrowing verification
- **Source**: v003 retrospective + test file analysis (`tests/validation/index.test.ts`, `tests/string/truncate.test.ts`)
- **Data**: v003 added 45 new tests achieving 100% quality gate pass rate. Tests systematically cover:
  - Happy path (normal usage)
  - Edge cases (empty, single element, boundary values)
  - Error conditions (all validation failures)
  - Type narrowing (compile-time type tests)
  - Special values (Infinity, NaN, null, undefined tested in validation/index.test.ts:55-59)
- **Rationale**: v003 established comprehensive testing as quality standard for the project

## Expected Test Count for v004

- **Value**: ~50-60 new tests (approximately 50-60% increase)
- **Source**: v003 retrospective metrics + v004 scope analysis
- **Data**:
  - v003: 45 new tests for 3 features (15 tests/feature average)
  - v003: 16 acceptance criteria total
  - v004: 7 features with 4-5 acceptance criteria each (28-35 criteria)
  - v003 achieved 54% test growth (39→60 total)
- **Rationale**: v004 has 2.3x more features than v003, expect similar test density per feature. Current test count is 60, expect growth to ~110-120 tests (50-60 new tests)

## Set Usage for Deduplication

- **Value**: `[...new Set(array)]` pattern
- **Source**: Web research + ES6 standard
- **Data**: Multiple sources confirm this is standard ES6+ pattern:
  - GeeksforGeeks, 30 seconds of code, SamanthaMing.com all recommend this approach
  - O(n) time complexity vs O(n²) for filter/indexOf
  - Set automatically removes duplicates using strict equality
- **Rationale**: Industry standard, optimal performance, built-in JavaScript feature

## Array Chunking Algorithm

- **Value**: For-loop with slice
- **Source**: Web research comparison of implementations
- **Data**:
  ```typescript
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  ```
  - Most readable according to ReactHustle and Dev Extent articles
  - slice() automatically handles last chunk (out-of-bounds returns remaining elements)
  - Performance similar to Array.from() approach
- **Rationale**: Readability and maintainability prioritized; performance is equivalent to other approaches

## Flatten Algorithm

- **Value**: Recursive reduce with depth decrement
- **Source**: Web research + MDN Array.prototype.flat() behavior
- **Data**:
  ```typescript
  arr.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) && depth > 0
        ? flatten(val, depth - 1)
        : val
    );
  }, []);
  ```
  - Recursively processes nested arrays
  - Decrements depth on each level
  - Stops when depth reaches 0 or element is not an array
- **Rationale**: Standard recursive approach, matches native Array.flat() behavior, handles arbitrary nesting depth

## Intersection Algorithm

- **Value**: Set-based filter with every()
- **Source**: Web research on multiple array intersection
- **Data**:
  ```typescript
  const [first, ...rest] = arrays;
  const set = new Set(first);
  return [...set].filter(item =>
    rest.every(arr => arr.includes(item))
  );
  ```
  - Set deduplicates first array automatically
  - every() checks element exists in all remaining arrays
  - O(n × m) with Set.has() vs O(n × m × k) with array.includes()
- **Rationale**: Handles arbitrary number of arrays, automatic deduplication, good performance

## Compact Type Narrowing Approach

- **Value**: Type assertion `as T[]` with filter(Boolean)
- **Source**: Web research on TypeScript type narrowing limitations
- **Data**:
  - GitHub Issue #30621: TypeScript cannot automatically narrow types with filter(Boolean)
  - Medium article confirms type guard solution is more verbose
  - Backlog signature is `compact<T>(arr: T[]): T[]` (not `NonNullable<T>[]`)
- **Rationale**: TypeScript limitation, not implementation flaw. Type assertion is safe here and matches acceptance criteria signature

## New Validators Needed

### isArray Type Guard

- **Value**:
  ```typescript
  export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }
  ```
- **Source**: Gap analysis of existing validators vs array utility needs
- **Data**: No array type validator exists in `src/validation/index.ts`
- **Rationale**: Array utilities may need to validate input is actually an array (though TypeScript types handle this at compile time)

### isNonNegativeInteger Validator

- **Value**:
  ```typescript
  export function isNonNegativeInteger(value: unknown): value is number {
    return typeof value === 'number' &&
           Number.isInteger(value) &&
           Number.isFinite(value) &&
           value >= 0;
  }
  ```
- **Source**: Gap analysis - flatten() needs depth >= 0 validation
- **Data**:
  - Existing `isPositiveNumber` requires value > 0
  - flatten() accepts depth of 0 (valid use case)
  - Must exclude Infinity for integer check, but allow Infinity as special case
- **Rationale**: flatten() depth parameter allows 0 but existing positive validators exclude it. Need separate validator for non-negative integers.

## Infinity Handling for Flatten

- **Value**: Special case check `depth === Infinity`
- **Source**: Backlog BL-022 + web research on flatten implementations
- **Data**:
  - Backlog: "Supports Infinity for full flatten"
  - MDN: "A depth of Infinity flattens all levels"
  - Implementation requires explicit check because Infinity > 0 is true but shouldn't decrement
- **Rationale**: Infinity is valid depth value requiring special handling to avoid infinite recursion attempts

## TypeScript Version

- **Value**: `^5.3.0`
- **Source**: `package.json:18`
- **Data**: `"typescript": "^5.3.0"` in devDependencies
- **Rationale**: TypeScript 5.3 supports all features needed (generics, type guards, strict mode)

## Node.js Version

- **Value**: `20.x` (inferred from @types/node version)
- **Source**: `package.json:15` and AGENTS.md:10
- **Data**:
  - `"@types/node": "^20.10.0"` in devDependencies
  - AGENTS.md states "Runtime: Node.js 20.x (ESM modules)"
- **Rationale**: Node.js 20 LTS with ESM module support

## Jest and ts-jest Versions

- **Value**:
  - Jest: `^30.2.0`
  - ts-jest: `^29.4.6`
- **Source**: `package.json:16-17`
- **Data**: Both listed in devDependencies with ESM preset in `jest.config.js`
- **Rationale**: These versions provide ESM module support required for the project

## No New Error Types Required

- **Value**: N/A - Use existing error types
- **Source**: Analysis of array utility validation needs vs existing errors
- **Data**:
  - `InvalidNumberError` - covers invalid size, depth parameters
  - `OutOfRangeError` - covers parameters outside valid ranges
  - `ValidationError` - covers general validation failures
  - No array-specific errors needed (unlike string-specific EmptyStringError)
- **Rationale**: Existing error types adequately cover all array utility validation scenarios

## Type Guard Usage for first() and last()

- **Value**: Return type `T | undefined` serves as implicit type guard
- **Source**: Backlog BL-020 and BL-021 acceptance criteria + TypeScript type system
- **Data**:
  - Acceptance criteria: "Uses type guards"
  - Signature: `first<T>(arr: T[]): T | undefined`
  - Callers must check for undefined: `if (result !== undefined) { /* use result as T */ }`
- **Rationale**: The union type `T | undefined` forces callers to handle undefined case, providing type safety. This satisfies "uses type guards" requirement through TypeScript's type system rather than explicit type guard functions.

## No Array Validation in Utilities

- **Value**: No runtime array validation needed
- **Source**: TypeScript type system + existing codebase pattern analysis
- **Data**:
  - Existing utilities (`capitalize`, `clamp`) trust TypeScript parameter types
  - No runtime checks like `if (!Array.isArray(arr))` in existing code
  - TypeScript compiler enforces parameter types at compile time
- **Rationale**: TypeScript's type system provides compile-time safety. Runtime array validation only needed if accepting `unknown` type, which none of the array utilities do.

## Summary

All concrete values have been determined from:
- **Codebase analysis** (module structure, imports, error types, test patterns)
- **Web research** (algorithms, TypeScript patterns, best practices)
- **Backlog requirements** (function signatures, acceptance criteria)

No values are marked "TBD - requires runtime testing". All design decisions have sufficient evidence for implementation planning.
