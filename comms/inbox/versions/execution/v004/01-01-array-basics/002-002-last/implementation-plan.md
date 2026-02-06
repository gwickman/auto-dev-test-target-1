# Implementation Plan: last

## Overview

Implement `last()` function that safely returns the last element of an array with type-safe undefined handling for empty arrays.

**Complexity:** Low - Simple array index access (very similar to first())
**Estimated effort:** ~15-20 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/last.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add last export |
| `tests/array/last.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/last.ts`:**
```typescript
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/last.js` and `dist/array/last.d.ts` created
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/last.test.ts`:**
```typescript
import { last } from '../../src/index.js';

describe('last', () => {
  it('returns last element of non-empty array', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b', 'c'])).toBe('c');
    expect(last([true, false])).toBe(false);
  });

  it('returns undefined for empty array', () => {
    expect(last([])).toBeUndefined();
  });

  it('returns element for single-element array', () => {
    expect(last([42])).toBe(42);
    expect(last(['only'])).toBe('only');
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 3];
    const result: number | undefined = last(numbers);
    expect(typeof result).toBe('number');

    const strings = ['a', 'b'];
    const strResult: string | undefined = last(strings);
    expect(typeof strResult).toBe('string');
  });

  it('supports type narrowing', () => {
    const arr = [10, 20, 30];
    const value = last(arr);

    if (value !== undefined) {
      // TypeScript knows value is number here
      const doubled: number = value * 2;
      expect(doubled).toBe(60);
    }
  });
});
```

**Verification commands:**
```bash
npm test tests/array/last.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 5 tests pass
- No test failures
- Type narrowing test demonstrates TypeScript type safety

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.last))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including existing tests and first())
- `last` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established by Feature 001

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
| Off-by-one error in index calculation | Low | Medium | Test with single-element arrays explicitly |
| TypeScript type inference issues | Low | Low | Same pattern as first(), already proven |
| Negative array length edge case | Very Low | Low | JavaScript arrays have non-negative length by definition |

## Commit Message

After implementation and verification:

```bash
git add src/array/last.ts src/array/index.ts tests/array/last.test.ts
git commit -m "feat(array): add last() utility for safe last element access

Implement last<T>(arr: T[]): T | undefined for type-safe access to last array element.

- Returns last element for non-empty arrays
- Returns undefined for empty arrays
- Generic type T preserved in return type
- Comprehensive tests with type narrowing verification

Part of v004 Theme 01 (array-basics) - Feature 002
Backlog: BL-021

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/last.ts` with function implementation
- [ ] Modify `src/array/index.ts` to export last
- [ ] Create `tests/array/last.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository