# Implementation Plan: intersection

## Overview

Implement `intersection()` function that finds common elements across multiple arrays using variadic parameters, Set for deduplication, and `every()` for validation.

**Complexity:** Moderate - Variadic parameters with Set-based filtering
**Estimated effort:** ~30-35 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/intersection.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add intersection export |
| `tests/array/intersection.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/intersection.ts`:**
```typescript
export function intersection<T>(...arrays: T[][]): T[] {
  // Handle no arrays case
  if (arrays.length === 0) {
    return [];
  }

  // Handle single array case (return unique elements)
  if (arrays.length === 1) {
    return [...new Set(arrays[0])];
  }

  // Use Set for first array to get unique elements and O(1) lookups
  const [first, ...rest] = arrays;
  const uniqueFirst = new Set(first);

  // Filter first array's unique elements checking presence in all other arrays
  return [...uniqueFirst].filter(item =>
    rest.every(arr => arr.includes(item))
  );
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';
export { compact } from './compact.js';
export { flatten } from './flatten.js';
export { intersection } from './intersection.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/intersection.js` and `dist/array/intersection.d.ts` created
- Variadic parameter syntax accepted
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/intersection.test.ts`:**
```typescript
import { intersection } from '../../src/index.js';

describe('intersection', () => {
  it('returns common elements from two arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c']);
  });

  it('returns common elements from three or more arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
    expect(intersection([1, 2], [1, 2], [1, 2], [1, 2])).toEqual([1, 2]);
  });

  it('returns empty array when no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
    expect(intersection([1, 2], [2, 3], [3, 4])).toEqual([]);
  });

  it('returns empty array when no arrays provided', () => {
    expect(intersection()).toEqual([]);
  });

  it('returns empty array when any input array is empty', () => {
    expect(intersection([1, 2], [])).toEqual([]);
    expect(intersection([], [1, 2])).toEqual([]);
  });

  it('returns unique elements when single array provided', () => {
    expect(intersection([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it('deduplicates result when first array has duplicates', () => {
    expect(intersection([1, 1, 2, 2], [1, 2])).toEqual([1, 2]);
  });

  it('uses strict equality for comparison', () => {
    expect(intersection([1, 2], ['1', '2'])).toEqual([]);
    expect(intersection([NaN], [NaN])).toEqual([NaN]); // includes uses SameValueZero
  });

  it('preserves order from first array', () => {
    expect(intersection([3, 1, 2], [1, 2, 3])).toEqual([3, 1, 2]);
    expect(intersection([2, 3, 1], [1, 2, 3])).toEqual([2, 3, 1]);
  });

  it('preserves generic type', () => {
    const nums1 = [1, 2, 3];
    const nums2 = [2, 3, 4];
    const numResult: number[] = intersection(nums1, nums2);
    expect(numResult).toEqual([2, 3]);

    const strs1 = ['a', 'b'];
    const strs2 = ['b', 'c'];
    const strResult: string[] = intersection(strs1, strs2);
    expect(strResult).toEqual(['b']);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/intersection.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 10 tests pass
- Variadic parameters work correctly
- Edge cases handled properly
- Set deduplication working

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.intersection))"
# Should output: function
```

**Test all Theme 02 features complete:**
```bash
npm test tests/array/  # All array utility tests
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (all 7 features complete)
- `intersection` function available from main module export
- All array utilities working together

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure complete

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite (all 7 features + validators)
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Variadic parameter type inference | Low | Low | TypeScript handles rest parameters well, explicit type tests verify |
| includes() performance with large arrays | Low | Medium | Document O(n*m) complexity, acceptable for typical use |
| Reference vs deep equality confusion | Medium | Low | Document in tests that objects compared by reference |
| Empty array in middle of inputs | Low | Low | Explicit test case verifies behavior |

## Commit Message

After implementation and verification:

```bash
git add src/array/intersection.ts src/array/index.ts tests/array/intersection.test.ts
git commit -m "feat(array): add intersection() utility for common elements

Implement intersection<T>(...arrays: T[][]): T[] to find common elements across arrays.

- Uses Set for deduplication and efficient lookup
- Filters with every() to check presence in all arrays
- Preserves order from first array
- Handles variadic parameters (arbitrary number of arrays)
- Comprehensive tests including edge cases

Part of v004 Theme 02 (array-advanced) - Feature 007
Backlog: BL-024

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/intersection.ts` with Set-based implementation
- [ ] Modify `src/array/index.ts` to export intersection
- [ ] Create `tests/array/intersection.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify variadic parameters work with 0, 1, 2, 3+ arrays
- [ ] Verify empty array and no-overlap cases
- [ ] Verify function exported from main module
- [ ] Run all array tests to confirm complete Theme 02
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository