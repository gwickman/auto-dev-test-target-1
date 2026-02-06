# Implementation Plan: flatten

## Overview

Implement `flatten()` function that recursively flattens nested arrays to a specified depth with validation. Also implement new `isNonNegativeInteger()` validator.

**Complexity:** Higher - Recursive algorithm with depth control and new validator
**Estimated effort:** ~40-45 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/validation/index.ts` | Modify | Add isNonNegativeInteger validator |
| `tests/validation/index.test.ts` | Modify | Add tests for new validator |
| `src/array/flatten.ts` | Create | Main function implementation with validation |
| `src/array/index.ts` | Modify | Add flatten export |
| `tests/array/flatten.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Validator

**Modify `src/validation/index.ts` (add at end):**
```typescript
export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}
```

**Modify `tests/validation/index.test.ts` (add new describe block):**
```typescript
describe('isNonNegativeInteger', () => {
  it('returns true for non-negative integers', () => {
    expect(isNonNegativeInteger(0)).toBe(true);
    expect(isNonNegativeInteger(1)).toBe(true);
    expect(isNonNegativeInteger(100)).toBe(true);
    expect(isNonNegativeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it('returns false for negative integers', () => {
    expect(isNonNegativeInteger(-1)).toBe(false);
    expect(isNonNegativeInteger(-100)).toBe(false);
  });

  it('returns false for decimals', () => {
    expect(isNonNegativeInteger(0.5)).toBe(false);
    expect(isNonNegativeInteger(1.1)).toBe(false);
  });

  it('returns false for non-finite numbers', () => {
    expect(isNonNegativeInteger(Infinity)).toBe(false);
    expect(isNonNegativeInteger(-Infinity)).toBe(false);
    expect(isNonNegativeInteger(NaN)).toBe(false);
  });

  it('returns false for non-number types', () => {
    expect(isNonNegativeInteger(null)).toBe(false);
    expect(isNonNegativeInteger(undefined)).toBe(false);
    expect(isNonNegativeInteger('1')).toBe(false);
    expect(isNonNegativeInteger({})).toBe(false);
  });

  it('narrows type correctly', () => {
    const value: unknown = 5;
    if (isNonNegativeInteger(value)) {
      const doubled: number = value * 2;
      expect(doubled).toBe(10);
    }
  });
});
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
npm test tests/validation/index.test.ts  # Run validation tests
```

**Expected outcome:**
- TypeScript compiles with new validator
- All validation tests pass (existing + 6 new tests)

### Stage 2: Create flatten Implementation

**Create `src/array/flatten.ts`:**
```typescript
import { InvalidNumberError } from '../errors/index.js';
import { isNonNegativeInteger } from '../validation/index.js';

export function flatten(arr: any[], depth: number = 1): any[] {
  // Handle Infinity explicitly (not an integer)
  if (depth === Infinity) {
    return arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flatten(val, Infinity) : val);
    }, []);
  }

  // Validate depth is non-negative integer
  if (!isNonNegativeInteger(depth)) {
    throw new InvalidNumberError('depth must be a non-negative integer', 'depth');
  }

  // Depth 0 returns shallow copy
  if (depth === 0) {
    return arr.slice();
  }

  // Recursive flatten with depth decrement
  return arr.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) ? flatten(val, depth - 1) : val
    );
  }, []);
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';
export { compact } from './compact.js';
export { flatten } from './flatten.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/flatten.js` and `dist/array/flatten.d.ts` created
- Imports work correctly

### Stage 3: Create Tests

**Create `tests/array/flatten.test.ts`:**
```typescript
import { flatten, InvalidNumberError } from '../../src/index.js';

describe('flatten', () => {
  it('flattens nested array to depth 1 by default', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten([[1, [2]], [3, [4]]])).toEqual([1, [2], 3, [4]]);
  });

  it('returns shallow copy when depth is 0', () => {
    const input = [[1, 2], [3, 4]];
    const result = flatten(input, 0);
    expect(result).toEqual([[1, 2], [3, 4]]);
    expect(result).not.toBe(input); // Different instance
  });

  it('flattens one level when depth is 1', () => {
    expect(flatten([1, [2, [3, [4]]]], 1)).toEqual([1, 2, [3, [4]]]);
  });

  it('flattens two levels when depth is 2', () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('flattens multiple levels when depth is 3+', () => {
    expect(flatten([1, [2, [3, [4, [5]]]]], 3)).toEqual([1, 2, 3, 4, [5]]);
  });

  it('fully flattens all levels when depth is Infinity', () => {
    expect(flatten([[[[[1]]]]], Infinity)).toEqual([1]);
    expect(flatten([1, [2, [3, [4, [5]]]]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns empty array for empty input', () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([], 5)).toEqual([]);
  });

  it('returns copy when no nested arrays', () => {
    const input = [1, 2, 3];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input);
  });

  it('handles mixed nested and flat elements', () => {
    expect(flatten([1, [2], 3, [4, [5]]], 1)).toEqual([1, 2, 3, 4, [5]]);
    expect(flatten([1, [2], 3, [4, [5]]], 2)).toEqual([1, 2, 3, 4, 5]);
  });

  it('throws InvalidNumberError if depth is negative', () => {
    expect(() => flatten([[1, 2]], -1)).toThrow(InvalidNumberError);
    expect(() => flatten([[1, 2]], -5)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if depth is not an integer', () => {
    expect(() => flatten([[1, 2]], 1.5)).toThrow(InvalidNumberError);
    expect(() => flatten([[1, 2]], 0.1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if depth is NaN', () => {
    expect(() => flatten([[1, 2]], NaN)).toThrow(InvalidNumberError);
  });

  it('preserves null and undefined in nested arrays', () => {
    expect(flatten([null, [undefined, [null]]], 2)).toEqual([null, undefined, null]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/flatten.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 13 tests pass
- Validation errors thrown correctly
- Depth variations handled properly
- Infinity case works

### Stage 4: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.flatten))"
# Should output: function
node -e "import('./dist/index.js').then(m => console.log(typeof m.isNonNegativeInteger))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including all previous features + new validator)
- Both `flatten` and `isNonNegativeInteger` available from main module

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array and validation module structures established

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite (now includes validator tests)
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Recursive depth stack overflow | Low | Medium | Document reasonable depth limits, Infinity handled explicitly |
| Infinity validation confusion | Low | Medium | Check `depth === Infinity` before integer validation |
| Depth decrement with Infinity | Low | High | Infinity case handled in separate branch |
| Validator integration | Low | Low | Follow existing validator patterns, comprehensive tests |

## Commit Messages

**First commit (validator):**
```bash
git add src/validation/index.ts tests/validation/index.test.ts
git commit -m "feat(validation): add isNonNegativeInteger validator

Add isNonNegativeInteger(value): value is number validator for flatten depth parameter.

- Returns true for 0, 1, positive integers
- Returns false for negative, decimals, NaN, Infinity
- Comprehensive tests with type narrowing verification

Part of v004 Theme 02 (array-advanced) - Feature 006 (flatten)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Second commit (flatten):**
```bash
git add src/array/flatten.ts src/array/index.ts tests/array/flatten.test.ts
git commit -m "feat(array): add flatten() utility for nested array flattening

Implement flatten(arr: any[], depth?: number): any[] with recursive depth control.

- Default depth 1 matches Array.prototype.flat()
- Supports Infinity for full flatten
- Validates depth is non-negative integer
- Recursive algorithm with depth decrement
- Comprehensive tests including Infinity and validation errors

Part of v004 Theme 02 (array-advanced) - Feature 006
Backlog: BL-022

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create isNonNegativeInteger validator in `src/validation/index.ts`
- [ ] Add validator tests to `tests/validation/index.test.ts`
- [ ] Run validation tests to verify new validator
- [ ] Create `src/array/flatten.ts` with recursive implementation
- [ ] Modify `src/array/index.ts` to export flatten
- [ ] Create `tests/array/flatten.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify both exports available from main module
- [ ] Commit validator changes
- [ ] Commit flatten implementation
- [ ] Push to remote repository