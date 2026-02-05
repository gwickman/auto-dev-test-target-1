# v004 Logical Design - Risk Investigation Results

## Investigation Summary

This document contains findings from investigating the risks and unknowns identified in v004-phase-1-logical-design-risks.md.

## 1. TypeScript Generic Array Patterns

### Investigation Method
- Reviewed existing codebase utilities (v002-v003)
- Examined TypeScript documentation patterns
- Analyzed v003 validation utilities for type guard patterns

### Findings

**Generic Type Preservation**:
```typescript
// Pattern established in v002-v003:
function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function chunk<T>(arr: T[], size: number): T[][] {
  // Implementation preserves T through transformation
  const result: T[][] = [];
  // ...
  return result;
}
```

**Key Insights**:
- Single generic parameter `<T>` sufficient for all utilities except flatten()
- TypeScript infers T from arr parameter, no explicit type annotation needed by callers
- Return types automatically inferred from generic parameter
- Set operations preserve generic type: `new Set<T>(arr)` → `T[]`

**Union Types for Optional Returns**:
```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0]; // TypeScript infers T | undefined automatically
}
```

**flatten() Special Case**:
```typescript
// Cannot use generics due to arbitrary nesting depth
function flatten(arr: any[], depth?: number): any[] {
  // Trade type safety for flexibility
}
```

**Recommendation**: Use single generic `<T>` for all utilities except flatten(). TypeScript's type inference handles most cases automatically.

---

## 2. TypeScript Type Guards with Arrays

### Investigation Method
- Examined existing v003 validators (src/validation/index.ts)
- Reviewed test patterns (tests/validation/index.test.ts)
- Analyzed isPositiveNumber and isNonEmptyString implementations

### Findings

**Type Guard Pattern from v003**:
```typescript
// src/validation/index.ts
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}
```

**Application to Array Utilities**:

For first() and last(), type guards aren't for the array itself (TypeScript enforces that at compile time), but for the return value:

```typescript
// Option 1: Inline type narrowing in tests
const result = first(arr);
if (result !== undefined) {
  // TypeScript knows result is T here
}

// Option 2: Dedicated type guard (probably overkill)
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
```

**Acceptance Criteria Interpretation**:
- BL-020/BL-021 say "Uses type guards"
- Likely means: leverage TypeScript's type system, not create new type guard functions
- The `T | undefined` return type IS the type guard mechanism
- Tests should demonstrate type narrowing works correctly

**Recommendation**:
- Return type `T | undefined` satisfies type guard requirement
- Add tests showing TypeScript type narrowing works
- No need for dedicated type guard functions
- Acceptance criteria interpretation: "uses TypeScript's type system effectively"

---

## 3. Validation Utilities Integration

### Investigation Method
- Read src/validation/index.ts (lines 1-20)
- Read src/errors/index.ts (lines 1-28)
- Read src/string/truncate.ts (lines 1-18) for error usage pattern
- Checked src/index.ts for export pattern

### Findings

**Current Structure**:
```
src/validation/index.ts - Exports validators
tests/validation/index.test.ts - Tests for validators
```

**Existing Validators**:
- isNonEmptyString(value): value is string
- isPositiveNumber(value): value is number
- isInRange(value, min, max): boolean
- assertNonEmptyString(value, field?): asserts value is string

**Error Usage Pattern** (from truncate.ts):
```typescript
import { InvalidNumberError } from '../errors/index.js';

if (!Number.isInteger(maxLength) || maxLength < 1) {
  throw new InvalidNumberError('maxLength must be a positive integer', 'maxLength');
}
```

**New Validator Needed**:
```typescript
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

**Used By**:
- chunk(arr, size) - validates size is positive integer
- flatten(arr, depth) - validates depth is non-negative integer (also allows Infinity)

**Note**: flatten needs special handling for Infinity:
```typescript
if (depth !== Infinity && !isNonNegativeInteger(depth)) {
  throw new InvalidNumberError('depth must be a non-negative integer or Infinity', 'depth');
}
```

**Recommendation**:
- Add isNonNegativeInteger to src/validation/index.ts
- Export from src/index.ts (already has `export * from './validation/index.js'`)
- Add tests to tests/validation/index.test.ts
- Use InvalidNumberError for validation failures
- Special case Infinity in flatten() before calling validator

---

## 4. Error Type Usage Patterns

### Investigation Method
- Read src/errors/index.ts (complete file)
- Examined truncate.ts for usage example
- Reviewed validation error hierarchy

### Findings

**Available Error Types**:
1. ValidationError (base class, with optional field property)
2. EmptyStringError (for empty/whitespace strings)
3. InvalidNumberError (for number validation failures)
4. OutOfRangeError (for range violations with auto-generated message)

**Error Selection Guidelines** (derived from v003):
- EmptyStringError: Empty strings (not applicable for arrays)
- InvalidNumberError: When a number parameter is invalid (not in range, not integer, negative when positive required)
- OutOfRangeError: When a value is outside a specific numeric range (min/max)

**For v004 Array Utilities**:

**chunk(arr, size)**:
```typescript
if (!Number.isInteger(size) || size < 1) {
  throw new InvalidNumberError('size must be a positive integer', 'size');
}
```
Use InvalidNumberError - size must be positive integer

**flatten(arr, depth)**:
```typescript
if (depth !== Infinity && (!Number.isInteger(depth) || depth < 0)) {
  throw new InvalidNumberError('depth must be a non-negative integer or Infinity', 'depth');
}
```
Use InvalidNumberError - depth must be non-negative or Infinity

**first(), last(), unique(), compact(), intersection()**:
- No validation errors needed
- Trust TypeScript compile-time type checking
- Return appropriate values for edge cases (undefined, empty array)

**field Parameter Usage** (from v003 pattern):
```typescript
throw new InvalidNumberError('size must be a positive integer', 'size');
```
Always provide the parameter name as the field value for clear error messages.

**Recommendation**:
- Use InvalidNumberError for all numeric parameter validation
- Always provide field parameter with parameter name
- Don't create new error types - existing hierarchy sufficient
- Trust TypeScript types for array parameters (no runtime validation)

---

## 5. ESM Import Path Conventions

### Investigation Method
- Checked src/validation/index.ts imports
- Checked src/string/truncate.ts imports
- Verified src/index.ts export pattern

### Findings

**Confirmed Pattern**:
```typescript
// In TypeScript source files, MUST use .js extension:
import { EmptyStringError } from '../errors/index.js';
import { truncate } from './truncate.js';

// Even though files are .ts, imports must use .js for ESM compatibility
```

**Rationale** (from existing code):
- TypeScript compiles .ts files to .js files
- ESM requires file extensions in imports
- TypeScript compiler doesn't rewrite import paths
- Must use .js extension even in .ts source

**Export Pattern** (from src/index.ts):
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
// Will add:
export * from './array/index.js';
```

**Recommendation**:
- Always use `.js` extensions in import statements within .ts files
- Use relative paths: `../errors/index.js`, `../validation/index.js`
- Follow established pattern for new array module exports

---

## 6. Test Coverage Patterns

### Investigation Method
- Examined tests/ directory structure
- Read tests/validation/index.test.ts (lines 1-50)
- Reviewed v003 retrospective metrics

### Findings

**Test File Organization**:
```
tests/
  validation/
    index.test.ts  # Tests all validators in one file
  string/
    truncate.test.ts  # One test file per function
  number/
    clamp.test.ts
    roundTo.test.ts
```

**Pattern**: One test file per utility function, not grouped

**Test Structure** (from validation tests):
```typescript
import { describe, expect, it } from '@jest/globals';
import { functionName, ErrorType } from '../../src/index.js';

describe('functionName', () => {
  it('handles normal case', () => {
    expect(functionName(input)).toBe(expected);
  });

  it('handles edge case', () => {
    // ...
  });

  it('throws error for invalid input', () => {
    expect(() => functionName(invalid)).toThrow(ErrorType);
  });

  it('narrows type correctly', () => {
    // Type narrowing demonstration
  });
});
```

**Coverage Metrics** (from v003 retrospective):
- v003 added 45 tests total across 3 features
- Error types: 12 tests
- Validators: 25 tests
- Integration: 8 tests
- Average: ~15 tests per feature

**For v004** (7 features):
- Estimated 15-20 tests per feature
- Total: ~105-140 tests
- Focus on edge cases, type preservation, error handling

**Recommendation**:
- Create one test file per array function: tests/array/first.test.ts, etc.
- Include tests/array/index.test.ts for barrel exports
- Target 15-20 tests per function covering:
  - Normal cases with various types
  - Empty arrays
  - Edge cases (single element, NaN, undefined, objects)
  - Error throwing (where applicable)
  - Type narrowing demonstrations
  - Generic type preservation

---

## 7. Array.prototype.flat() Research

### Investigation Method
- Research ES2019 Array.prototype.flat() specification
- Check Node.js 20.x compatibility (project target)
- Consider implementation approaches

### Findings

**Native Array.flat() Availability**:
- Added in ES2019 (ES10)
- Node.js 20.x: ✅ Fully supported
- TypeScript 5.x with ES2022 target: ✅ Available

**Native flat() Signature**:
```typescript
Array.prototype.flat(depth?: number): any[]
// Default depth: 1
// depth = Infinity: flatten all levels
```

**Behavior**:
```javascript
[1, [2, [3]]].flat()      // [1, 2, [3]] - depth 1 (default)
[1, [2, [3]]].flat(2)     // [1, 2, 3] - depth 2
[1, [2, [3]]].flat(Infinity) // [1, 2, 3] - full flatten
```

**Implementation Options**:

**Option A: Use Native flat()**
```typescript
export function flatten(arr: any[], depth: number = 1): any[] {
  // Validate depth parameter first
  return arr.flat(depth);
}
```
Pros: Simple, performant, battle-tested
Cons: Relies on native implementation, less control

**Option B: Custom Recursive Implementation**
```typescript
export function flatten(arr: any[], depth: number = 1): any[] {
  if (depth === 0) return arr;
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(flatten(item, depth - 1));
    }
    return acc.concat(item);
  }, []);
}
```
Pros: Full control, educational value, explicit behavior
Cons: More code, potentially slower, reinventing wheel

**Recommendation**:
- **Use native Array.prototype.flat()** - it's available in Node 20.x
- Add parameter validation before calling native method
- Simpler, faster, and more maintainable
- Focus testing on validation and edge cases, not the flattening algorithm itself

```typescript
export function flatten(arr: any[], depth: number = 1): any[] {
  if (depth !== Infinity && !isNonNegativeInteger(depth)) {
    throw new InvalidNumberError('depth must be a non-negative integer or Infinity', 'depth');
  }
  return arr.flat(depth);
}
```

---

## 8. Set Behavior with Objects and NaN

### Investigation Method
- Review JavaScript Set equality semantics
- Test implications for unique() and intersection()
- Document expected behavior

### Findings

**Set Equality Rules**:
1. Primitives: Uses strict equality (===)
2. Objects: Uses reference equality (same memory reference)
3. NaN: Treated as equal to itself (unlike ===)

**Implications for unique()**:
```javascript
// Primitives work as expected:
unique([1, 2, 2, 3]) // [1, 2, 3] ✅

// Objects use reference equality:
unique([{a:1}, {a:1}]) // [{a:1}, {a:1}] - not deduplicated ⚠️

const obj = {a:1};
unique([obj, obj]) // [{a:1}] - deduplicated ✅

// NaN handling:
unique([NaN, NaN]) // [NaN] - deduplicated ✅
unique([1, NaN, 2, NaN]) // [1, NaN, 2] ✅
```

**Implications for intersection()**:
```javascript
// Primitives work as expected:
intersection([1,2,3], [2,3,4]) // [2, 3] ✅

// Objects use reference equality:
intersection([{a:1}], [{a:1}]) // [] - no match ⚠️

const obj = {a:1};
intersection([obj], [obj]) // [{a:1}] - matches ✅

// NaN handling:
intersection([NaN], [NaN]) // [NaN] - matches ✅
```

**Is This Acceptable?**:
- ✅ **Yes** - this is standard JavaScript Set behavior
- Acceptance criteria: BL-024 says "Uses strict equality"
- For objects, reference equality IS strict equality
- Deep equality would require custom comparison function (not in requirements)

**Documentation Needs**:
- Document object/reference behavior in implementation comments
- Include tests demonstrating object behavior
- Test NaN handling explicitly

**Recommendation**:
- Accept reference equality for objects (as per "strict equality" requirement)
- Document this behavior in code comments
- Add comprehensive tests for:
  - Primitive deduplication
  - Object reference behavior
  - NaN handling
- Consider adding JSDoc comments explaining Set behavior

---

## 9. Main Module Integration

### Investigation Method
- Read src/index.ts (complete file)
- Verified export pattern consistency

### Findings

**Current Exports** (src/index.ts):
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
```

**Required Addition**:
```typescript
export * from './array/index.js';
```

**Array Module Structure** (to be created):
```
src/array/
  index.ts          # Barrel export: export * from './first.js'; etc.
  first.ts          # export function first<T>...
  last.ts           # export function last<T>...
  unique.ts         # export function unique<T>...
  chunk.ts          # export function chunk<T>...
  compact.ts        # export function compact<T>...
  flatten.ts        # export function flatten...
  intersection.ts   # export function intersection<T>...
```

**No Naming Conflicts**:
- Checked existing exports: no functions named first, last, unique, chunk, compact, flatten, or intersection
- All new names are safe to add

**Recommendation**:
- Add `export * from './array/index.js';` to src/index.ts
- Create src/array/index.ts with exports for all 7 functions
- Follow established pattern from string/number modules

---

## Summary of Key Decisions

### Design Decisions

1. **Generic Types**: Use `<T>` for all functions except flatten() (uses any[])
2. **Type Guards**: Return type `T | undefined` satisfies "uses type guards" requirement
3. **Validation**: Add isNonNegativeInteger() to validation module
4. **Errors**: Use InvalidNumberError for all numeric parameter validation
5. **flatten() Implementation**: Use native Array.prototype.flat() (available in Node 20.x)
6. **Set Behavior**: Accept reference equality for objects (per "strict equality" requirement)
7. **Test Coverage**: Target 15-20 tests per function, one test file per function

### Integration Points Confirmed

1. **Imports**: Use `.js` extensions in all import statements
2. **Error Types**: Import from `../errors/index.js`
3. **Validation**: Import from `../validation/index.js`
4. **Main Export**: Add `export * from './array/index.js';` to src/index.ts
5. **File Structure**: Follow existing module pattern (string, number, validation)

### Remaining Risks (Low Priority)

1. **Performance**: No specific targets, standard implementations acceptable
2. **CI Capacity**: ~120 new tests, monitor but unlikely to be problematic
3. **Default Values**: Confirmed deferred (not in acceptance criteria)

### Ready for Implementation

All high-priority risks investigated and resolved. Design is ready for final document creation and implementation planning.
