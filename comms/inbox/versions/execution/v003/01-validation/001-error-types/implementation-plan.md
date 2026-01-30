# Implementation Plan: error-types

## Overview
Create custom error hierarchy for validation failures.

## Steps

### Step 1: Create directory
```bash
mkdir -p src/errors
mkdir -p tests/errors
```

### Step 2: Create src/errors/index.ts
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

### Step 3: Update src/index.ts
```typescript
export * from './string/index.js';
export * from './number/index.js';
export * from './errors/index.js';
```

### Step 4: Create tests/errors/index.test.ts
Test instantiation, inheritance, and field property.

### Step 5: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All tests pass