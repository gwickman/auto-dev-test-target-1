# Implementation Plan: unique

## Overview

Implement `unique()` function that removes duplicate values from an array using JavaScript Set for O(n) performance with strict equality comparison.

**Complexity:** Moderate - Set operations with type preservation
**Estimated effort:** ~20-25 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/unique.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add unique export |
| `tests/array/unique.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/unique.ts`:**
```typescript
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/unique.js` and `dist/array/unique.d.ts` created
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/unique.test.ts`:**
```typescript
import { unique } from '../../src/index.js';

describe('unique', () => {
  it('removes duplicate primitive values', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    expect(unique([true, false, true])).toEqual([true, false]);
  });

  it('returns empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  it('returns copy when no duplicates', () => {
    const input = [1, 2, 3];
    const result = unique(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input); // Different array instance
  });

  it('handles all duplicates', () => {
    expect(unique([1, 1, 1, 1])).toEqual([1]);
    expect(unique(['x', 'x'])).toEqual(['x']);
  });

  it('treats NaN values as equal', () => {
    expect(unique([NaN, NaN, NaN])).toEqual([NaN]);
    expect(unique([1, NaN, 2, NaN])).toEqual([1, NaN, 2]);
  });

  it('preserves order of first occurrence', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    expect(unique(['c', 'a', 'b', 'a'])).toEqual(['c', 'a', 'b']);
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 2, 3];
    const numResult: number[] = unique(numbers);
    expect(numResult).toEqual([1, 2, 3]);

    const strings = ['a', 'a', 'b'];
    const strResult: string[] = unique(strings);
    expect(strResult).toEqual(['a', 'b']);
  });

  it('handles special numeric values', () => {
    expect(unique([0, -0, 0])).toEqual([0]); // Set treats 0 and -0 as equal
    expect(unique([Infinity, Infinity])).toEqual([Infinity]);
    expect(unique([-Infinity, -Infinity])).toEqual([-Infinity]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/unique.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 8 tests pass
- No test failures
- Set behavior correctly tested (NaN equality, order preservation)

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.unique))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including existing tests from features 001-002)
- `unique` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established

## Quality Gates

All standard quality gates apply:

```bash
npm run build  # Must pass - TypeScript compilation
npm test       # Must pass - 100% test pass rate
```

**CI will automatically run:**
- TypeScript compilation check
- Jest test suite
- Verify no console.log statements

## Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Set behavior misunderstanding | Low | Low | Comprehensive tests document NaN and 0/-0 behavior |
| Type inference issues with Set | Low | Low | Spread operator maintains type, explicit tests verify |
| Performance with large arrays | Very Low | Low | O(n) is optimal for deduplication, no concerns |
| Object reference vs deep equality confusion | Medium | Low | Document in tests that only reference equality used |

## Commit Message

After implementation and verification:

```bash
git add src/array/unique.ts src/array/index.ts tests/array/unique.test.ts
git commit -m "feat(array): add unique() utility for removing duplicates

Implement unique<T>(arr: T[]): T[] using Set for O(n) deduplication.

- Removes duplicate values using strict equality
- Set handles NaN values correctly (all NaN treated as equal)
- Preserves order of first occurrence
- Returns new array without mutating input
- Comprehensive tests including edge cases

Part of v004 Theme 01 (array-basics) - Feature 003
Backlog: BL-018

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/unique.ts` with Set-based implementation
- [ ] Modify `src/array/index.ts` to export unique
- [ ] Create `tests/array/unique.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository