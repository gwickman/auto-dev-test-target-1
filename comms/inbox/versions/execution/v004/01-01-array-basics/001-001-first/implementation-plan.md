# Implementation Plan: first

## Overview

Implement `first()` function that safely returns the first element of an array with type-safe undefined handling for empty arrays.

**Complexity:** Low - Simple array index access
**Estimated effort:** ~15-20 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/first.ts` | Create | Main function implementation |
| `src/array/index.ts` | Create | Module exports (if first feature) or Modify (if exists) |
| `src/index.ts` | Modify | Add array module export (if first feature) |
| `tests/array/first.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Directory Structure and Implementation

**Create `src/array/first.ts`:**
```typescript
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

**Create or modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
```

**Modify `src/index.ts`** (add if first feature in theme):
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
export * from './array/index.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/first.js` and `dist/array/first.d.ts` created
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/first.test.ts`:**
```typescript
import { first } from '../../src/index.js';

describe('first', () => {
  it('returns first element of non-empty array', () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first(['a', 'b', 'c'])).toBe('a');
    expect(first([true, false])).toBe(true);
  });

  it('returns undefined for empty array', () => {
    expect(first([])).toBeUndefined();
  });

  it('returns element for single-element array', () => {
    expect(first([42])).toBe(42);
    expect(first(['only'])).toBe('only');
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 3];
    const result: number | undefined = first(numbers);
    expect(typeof result).toBe('number');

    const strings = ['a', 'b'];
    const strResult: string | undefined = first(strings);
    expect(typeof strResult).toBe('string');
  });

  it('supports type narrowing', () => {
    const arr = [10, 20, 30];
    const value = first(arr);

    if (value !== undefined) {
      // TypeScript knows value is number here
      const doubled: number = value * 2;
      expect(doubled).toBe(20);
    }
  });
});
```

**Verification commands:**
```bash
npm test tests/array/first.test.ts  # Run specific test file
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
node -e "import('./dist/index.js').then(m => console.log(typeof m.first))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including existing tests from v001-v003)
- `first` function available from main module export

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports `tests/**/*.test.ts` pattern
- ✓ ESM module mapper already configured
- ✓ No new test utilities required

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
| TypeScript type inference issues | Low | Low | Explicit type tests verify generic behavior |
| Array index access edge cases | Low | Low | Comprehensive test coverage for empty/single/multi-element arrays |
| Module export issues | Low | Medium | Explicit verification command checks export availability |

## Commit Message

After implementation and verification:

```bash
git add src/array/first.ts src/array/index.ts src/index.ts tests/array/first.test.ts
git commit -m "feat(array): add first() utility for safe first element access

Implement first<T>(arr: T[]): T | undefined for type-safe access to first array element.

- Returns first element for non-empty arrays
- Returns undefined for empty arrays
- Generic type T preserved in return type
- Comprehensive tests with type narrowing verification

Part of v004 Theme 01 (array-basics) - Feature 001
Backlog: BL-020

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/first.ts` with function implementation
- [ ] Create or modify `src/array/index.ts` to export first
- [ ] Modify `src/index.ts` to export array module (if first feature)
- [ ] Create `tests/array/first.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository