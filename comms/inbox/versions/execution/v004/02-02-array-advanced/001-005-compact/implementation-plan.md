# Implementation Plan: compact

## Overview

Implement `compact()` function that removes all falsy values from an array using `filter(Boolean)` pattern with type assertion for TypeScript compatibility.

**Complexity:** Moderate - Simple filtering with TypeScript type narrowing consideration
**Estimated effort:** ~25-30 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/compact.ts` | Create | Main function implementation |
| `src/array/index.ts` | Modify | Add compact export |
| `tests/array/compact.test.ts` | Create | Comprehensive unit tests |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/compact.ts`:**
```typescript
export function compact<T>(arr: T[]): T[] {
  // Filter removes all falsy values: false, null, 0, "", undefined, NaN
  // Type assertion needed because TypeScript cannot narrow falsy types automatically
  return arr.filter(Boolean) as T[];
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';
export { compact } from './compact.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/compact.js` and `dist/array/compact.d.ts` created
- Type assertion accepted by compiler
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/compact.test.ts`:**
```typescript
import { compact } from '../../src/index.js';

describe('compact', () => {
  it('removes all falsy values from mixed array', () => {
    expect(compact([1, 0, 2, false, 3, null])).toEqual([1, 2, 3]);
    expect(compact(['a', '', 'b', undefined, 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('removes all six falsy value types', () => {
    const input = [false, null, 0, '', undefined, NaN, 1, 'a'];
    const result = compact(input);
    expect(result).toEqual([1, 'a']);
  });

  it('preserves truthy values including empty objects and arrays', () => {
    expect(compact([{}, 0, []])).toEqual([{}, []]);
    expect(compact([{key: 'value'}, null, [1, 2]])).toEqual([{key: 'value'}, [1, 2]]);
  });

  it('preserves string "0" and other truthy strings', () => {
    expect(compact(['0', '1', ''])).toEqual(['0', '1']);
    expect(compact(['false', 'true'])).toEqual(['false', 'true']);
  });

  it('returns empty array for empty input', () => {
    expect(compact([])).toEqual([]);
  });

  it('returns copy when no falsy values', () => {
    const input = [1, 'a', true, {}];
    const result = compact(input);
    expect(result).toEqual([1, 'a', true, {}]);
    expect(result).not.toBe(input); // Different instance
  });

  it('returns empty array when all values are falsy', () => {
    expect(compact([null, undefined, false, 0, '', NaN])).toEqual([]);
  });

  it('preserves generic type', () => {
    const numbers = [1, 0, 2, null as number | null, 3];
    const numResult: (number | null)[] = compact(numbers);
    // Note: Type system preserves T but runtime removes falsy
    expect(numResult).toEqual([1, 2, 3]);

    const strings = ['a', '', 'b', undefined as string | undefined];
    const strResult: (string | undefined)[] = compact(strings);
    expect(strResult).toEqual(['a', 'b']);
  });

  it('handles negative numbers and special truthy values', () => {
    expect(compact([-1, 0, 1])).toEqual([-1, 1]);
    expect(compact([Infinity, 0, -Infinity])).toEqual([Infinity, -Infinity]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/compact.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 9 tests pass
- All falsy types correctly removed
- Truthy edge cases preserved
- Type preservation verified

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.compact))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including all Theme 01 features)
- `compact` function available from main module export

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
| Type assertion confusion | Low | Low | Comment explains TypeScript limitation, tests verify behavior |
| NaN handling | Low | Low | Explicit test for NaN removal |
| Empty object/array confusion | Low | Low | Explicit tests document truthy behavior |
| filter(Boolean) not removing all falsy | Very Low | High | Well-established JavaScript pattern, comprehensive tests verify |

## Commit Message

After implementation and verification:

```bash
git add src/array/compact.ts src/array/index.ts tests/array/compact.test.ts
git commit -m "feat(array): add compact() utility for removing falsy values

Implement compact<T>(arr: T[]): T[] to filter out all falsy values.

- Removes false, null, 0, \"\", undefined, NaN
- Preserves truthy values including {} and []
- Uses filter(Boolean) with type assertion
- Comprehensive tests covering all falsy types

Part of v004 Theme 02 (array-advanced) - Feature 005
Backlog: BL-023

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/compact.ts` with filter(Boolean) implementation
- [ ] Modify `src/array/index.ts` to export compact
- [ ] Create `tests/array/compact.test.ts` with comprehensive tests
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass
- [ ] Verify all six falsy types handled correctly
- [ ] Verify truthy edge cases ({}, [], "0") preserved
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository