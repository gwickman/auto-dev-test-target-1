# Codebase Patterns

Findings from investigation of the auto-dev-test-target-1 codebase structure, validation infrastructure, and testing patterns.

## Module Organization Pattern

The codebase follows a consistent module organization pattern:

### Directory Structure

```
src/
  string/
    capitalize.ts
    reverse.ts
    slugify.ts
    truncate.ts
    index.ts          # Re-exports all string utilities
  number/
    clamp.ts
    roundTo.ts
    index.ts          # Re-exports all number utilities
  errors/
    index.ts          # ValidationError hierarchy
  validation/
    index.ts          # Type guards and assertion functions
  index.ts            # Main entry point, re-exports all modules
```

### Re-export Pattern

**Category index files** (e.g., `src/string/index.ts`):
```typescript
export { reverse } from './reverse.js';
export { truncate } from './truncate.js';
export { slugify } from './slugify.js';
export { capitalize } from './capitalize.js';
```

**Main index file** (`src/index.ts`):
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
export * from './validation/index.js';
```

### ESM Import Requirements

All imports MUST use `.js` extensions (Node.js ESM requirement):
- ✅ `import { ValidationError } from '../errors/index.js';`
- ❌ `import { ValidationError } from '../errors/index';` (will fail)

Source: `src/validation/index.ts:1`, `src/number/clamp.ts:1`, `src/string/truncate.ts:1`

## Validation Infrastructure (v003)

### Error Class Hierarchy

Location: `src/errors/index.ts`

```typescript
export class ValidationError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class EmptyStringError extends ValidationError {
  constructor(field?: string) {
    super('String cannot be empty', field);
    this.name = 'EmptyStringError';
  }
}

export class InvalidNumberError extends ValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'InvalidNumberError';
  }
}

export class OutOfRangeError extends ValidationError {
  constructor(value: number, min: number, max: number, field?: string) {
    super(`Value ${value} is out of range [${min}, ${max}]`, field);
    this.name = 'OutOfRangeError';
  }
}
```

**Key Features:**
- All validation errors extend `ValidationError`
- Optional `field` parameter for contextual error information
- Custom `name` property for error type identification
- Standardized error messages

### Existing Validators

Location: `src/validation/index.ts`

#### Type Guards

```typescript
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
```

**Important**: `isPositiveNumber()` checks:
- Type is number
- **Number.isFinite()** - excludes Infinity, -Infinity, and NaN
- Value > 0 (positive)

#### Assertion Functions

```typescript
export function assertNonEmptyString(value: unknown, field?: string): asserts value is string {
  if (!isNonEmptyString(value)) {
    throw new EmptyStringError(field);
  }
}
```

**Key Feature**: TypeScript's `asserts value is Type` narrows type after function call without explicit type guard check.

### Validation Usage Pattern

Example from `src/string/truncate.ts:1-18`:

```typescript
import { EmptyStringError, InvalidNumberError } from '../errors/index.js';

export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (suffix === '') {
    throw new EmptyStringError('suffix');
  }
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new InvalidNumberError('maxLength must be a positive integer', 'maxLength');
  }
  if (maxLength < suffix.length) {
    throw new InvalidNumberError(`maxLength must be at least ${suffix.length}`, 'maxLength');
  }
  // ... implementation
}
```

**Pattern:**
1. Import specific error types
2. Validate parameters early (guard clauses)
3. Include `field` parameter in errors for context
4. Use appropriate error type (EmptyStringError, InvalidNumberError, OutOfRangeError)
5. Custom validation logic when existing validators don't fit

Example from `src/number/clamp.ts:1-9`:

```typescript
import { OutOfRangeError } from '../errors/index.js';

export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new OutOfRangeError(min, max, max, 'min');
  }
  return Math.min(Math.max(value, min), max);
}
```

## Function Implementation Patterns

### Simple Utilities (No Validation)

Example from `src/string/capitalize.ts:1-7`:

```typescript
export function capitalize(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```

**Pattern:**
- Handle edge cases directly (empty string)
- No validation errors for simple type-safe functions
- TypeScript types provide compile-time safety

## Test Patterns

### Test File Organization

Tests mirror source structure:
```
tests/
  string/
    capitalize.test.ts
    truncate.test.ts
  number/
    clamp.test.ts
  errors/
    index.test.ts
  validation/
    index.test.ts
  index.test.ts
```

### Test Import Pattern

Example from `tests/string/capitalize.test.ts:1`:
```typescript
import { capitalize } from '../../src/index.js';
```

**Pattern**: Import from main `index.js` to test public API, not internal files.

### Test Structure Pattern

Example from `tests/validation/index.test.ts:10-37`:

```typescript
describe('isNonEmptyString', () => {
  it('returns true for non-empty strings', () => {
    expect(isNonEmptyString('hello')).toBe(true);
    expect(isNonEmptyString('a')).toBe(true);
    expect(isNonEmptyString(' ')).toBe(true);
  });

  it('returns false for empty strings', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('returns false for non-string values', () => {
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString(123)).toBe(false);
    expect(isNonEmptyString(true)).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
    expect(isNonEmptyString([])).toBe(false);
  });

  it('narrows type correctly', () => {
    const value: unknown = 'test';
    if (isNonEmptyString(value)) {
      const length: number = value.length;
      expect(length).toBe(4);
    }
  });
});
```

**v003 Edge Case Testing Patterns:**
- Empty inputs (empty strings, empty arrays if applicable)
- Special values (null, undefined, 0, negative numbers, Infinity, NaN)
- Boundary conditions (min/max values, single elements)
- Type narrowing verification (compile-time type tests)
- Non-finite numbers (tests/validation/index.test.ts:55-59)

Example from `tests/string/truncate.test.ts:4-30`:

```typescript
describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('returns short strings unchanged', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('uses custom suffix', () => {
    expect(truncate('hello world', 7, '…')).toBe('hello …');
  });

  it('throws InvalidNumberError if maxLength too small', () => {
    expect(() => truncate('test', 2)).toThrow(InvalidNumberError);
  });

  it('throws EmptyStringError if suffix is empty', () => {
    expect(() => truncate('test', 10, '')).toThrow(EmptyStringError);
  });

  it('throws InvalidNumberError if maxLength is not a positive integer', () => {
    expect(() => truncate('test', 0)).toThrow(InvalidNumberError);
    expect(() => truncate('test', -5)).toThrow(InvalidNumberError);
    expect(() => truncate('test', 3.5)).toThrow(InvalidNumberError);
  });
});
```

**Pattern:**
- Happy path tests first (normal usage)
- Edge case tests (boundary conditions)
- Error condition tests (validation failures)
- Multiple assertions per test when testing related cases
- Specific error type checking with `.toThrow(ErrorType)`

### Test Configuration

Location: `jest.config.js`

```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        diagnostics: {
          ignoreCodes: [151002],
        },
      },
    ],
  },
  testMatch: ['**/tests/**/*.test.ts'],
};
```

**Key Settings:**
- ESM module support with ts-jest
- Module name mapper to handle `.js` imports in tests
- Test files in `tests/**/*.test.ts`

## TypeScript Configuration

Location: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "declaration": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key Settings:**
- **strict: true** - All strict type checking enabled
- **module: "NodeNext"** - Node.js ESM support
- **target: "ES2022"** - Modern JavaScript features available
- **declaration: true** - Generate .d.ts files

## Gaps Identified for Array Utilities

### Missing Validators

Array utilities will need validators not present in v003:

1. **Array Type Check**:
   ```typescript
   export function isArray(value: unknown): value is unknown[] {
     return Array.isArray(value);
   }
   ```

2. **Non-Negative Integer Check** (for flatten depth):
   ```typescript
   export function isNonNegativeInteger(value: unknown): value is number {
     return typeof value === 'number' &&
            Number.isInteger(value) &&
            Number.isFinite(value) &&
            value >= 0;
   }
   ```

3. **Positive Integer Check** (chunk size):
   - Can use existing `isPositiveNumber()` combined with `Number.isInteger()` check
   - Example: `!isPositiveNumber(size) || !Number.isInteger(size)` → throw error

### No Array-Specific Errors Needed

Existing error types cover array utility needs:
- `InvalidNumberError` - For invalid size/depth parameters
- `OutOfRangeError` - For out-of-bounds parameters
- `ValidationError` - For general validation failures

## Summary

**Patterns to Follow for Array Utilities:**

1. Create `src/array/` directory with individual function files + index.ts
2. Update `src/index.ts` to add `export * from './array/index.js';`
3. Use ESM imports with `.js` extensions
4. Add new validators to `src/validation/index.ts` with tests
5. Import and use v003 error types for validation failures
6. Test files in `tests/array/` importing from `../../src/index.js`
7. Follow v003's comprehensive edge case testing pattern
8. Include type narrowing tests for type guard functions
9. Test all error conditions with specific error type assertions
