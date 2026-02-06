# Implementation Plan: chunk

## Overview

Implement `chunk()` function that splits an array into fixed-size chunks with validation of the size parameter using v003 validation infrastructure.

**Complexity:** Moderate - Array slicing with validation integration
**Estimated effort:** ~30-35 minutes

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/array/chunk.ts` | Create | Main function implementation with validation |
| `src/array/index.ts` | Modify | Add chunk export |
| `tests/array/chunk.test.ts` | Create | Comprehensive unit tests with error cases |

## Implementation Stages

### Stage 1: Create Implementation

**Create `src/array/chunk.ts`:**
```typescript
import { InvalidNumberError } from '../errors/index.js';
import { isPositiveNumber } from '../validation/index.js';

export function chunk<T>(arr: T[], size: number): T[][] {
  // Validate size is positive integer
  if (!isPositiveNumber(size) || !Number.isInteger(size)) {
    throw new InvalidNumberError('size must be a positive integer', 'size');
  }

  // Handle empty array
  if (arr.length === 0) {
    return [];
  }

  // Chunk the array
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
```

**Modify `src/array/index.ts`:**
```typescript
export { first } from './first.js';
export { last } from './last.js';
export { unique } from './unique.js';
export { chunk } from './chunk.js';  // ADD THIS LINE
```

**Verification commands:**
```bash
npm run build  # Should compile without errors
```

**Expected outcome:**
- TypeScript compiles successfully
- `dist/array/chunk.js` and `dist/array/chunk.d.ts` created
- Imports from errors and validation modules work
- No compilation errors

### Stage 2: Create Tests

**Create `tests/array/chunk.test.ts`:**
```typescript
import { chunk, InvalidNumberError } from '../../src/index.js';

describe('chunk', () => {
  it('splits array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('returns empty array for empty input', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('returns single chunk when size equals array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('returns single chunk when size greater than array length', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it('handles last chunk with remaining elements', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('creates single-element chunks when size is 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('throws InvalidNumberError if size is not positive', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], -5)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if size is not an integer', () => {
    expect(() => chunk([1, 2, 3], 2.5)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], 1.1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if size is NaN or Infinity', () => {
    expect(() => chunk([1, 2, 3], NaN)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], Infinity)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], -Infinity)).toThrow(InvalidNumberError);
  });

  it('preserves generic type in nested arrays', () => {
    const numbers = [1, 2, 3, 4];
    const numResult: number[][] = chunk(numbers, 2);
    expect(numResult).toEqual([[1, 2], [3, 4]]);

    const strings = ['a', 'b', 'c'];
    const strResult: string[][] = chunk(strings, 2);
    expect(strResult).toEqual([['a', 'b'], ['c']]);
  });
});
```

**Verification commands:**
```bash
npm test tests/array/chunk.test.ts  # Run specific test file
npm test  # Run all tests
```

**Expected outcome:**
- All 10 tests pass
- Validation errors thrown correctly
- Type preservation verified
- Edge cases handled properly

### Stage 3: Final Verification

**Run complete quality gates:**
```bash
npm run build  # TypeScript compilation
npm test       # All tests including new ones
```

**Verify exports:**
```bash
node -e "import('./dist/index.js').then(m => console.log(typeof m.chunk))"
# Should output: function
```

**Expected outcome:**
- Build succeeds with no errors
- All tests pass (including all features 001-004)
- `chunk` function available from main module export
- Validation integration working correctly

## Test Infrastructure Updates

**No test infrastructure changes needed:**
- ✓ Jest configuration already supports test pattern
- ✓ ESM module mapper already configured
- ✓ Array module structure established
- ✓ Error type imports work from main index

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
| Validation integration issues | Low | Medium | Follow existing truncate() pattern, import statements tested |
| Slice edge cases with last chunk | Low | Low | Explicit tests for various array lengths and chunk sizes |
| Integer validation clarity | Low | Low | Combine isPositiveNumber with Number.isInteger check |
| Empty array with invalid size | Low | Low | Validate size before empty array check |

## Commit Message

After implementation and verification:

```bash
git add src/array/chunk.ts src/array/index.ts tests/array/chunk.test.ts
git commit -m "feat(array): add chunk() utility for splitting arrays

Implement chunk<T>(arr: T[], size: number): T[][] to split arrays into fixed-size chunks.

- Validates size is positive integer using v003 validation
- Last chunk contains remaining elements
- Handles empty arrays
- Throws InvalidNumberError for invalid size values
- Comprehensive tests including validation errors

Part of v004 Theme 01 (array-basics) - Feature 004
Backlog: BL-019

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## Implementation Checklist

- [ ] Create `src/array/chunk.ts` with validation and chunking logic
- [ ] Modify `src/array/index.ts` to export chunk
- [ ] Create `tests/array/chunk.test.ts` with comprehensive tests
- [ ] Verify imports from errors and validation modules work
- [ ] Run `npm run build` - verify compilation success
- [ ] Run `npm test` - verify all tests pass including validation errors
- [ ] Verify function exported from main module
- [ ] Commit changes with conventional commit message
- [ ] Push to remote repository