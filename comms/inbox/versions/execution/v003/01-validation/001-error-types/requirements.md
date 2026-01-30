# Requirements: error-types

## Objective
Create custom error classes for validation failures.

## Functional Requirements

### FR-1: ValidationError base class
```typescript
export class ValidationError extends Error {
  constructor(message: string, public readonly field?: string)
}
```

### FR-2: Specific error types
- `EmptyStringError extends ValidationError`
- `InvalidNumberError extends ValidationError`
- `OutOfRangeError extends ValidationError`

### FR-3: Location
- Create `src/errors/index.ts`
- Export from `src/index.ts`

## Acceptance Criteria
- [ ] ValidationError class exists with field property
- [ ] Three specific error subclasses exist
- [ ] All exported from src/index.ts
- [ ] Tests verify error instantiation and inheritance
- [ ] `npm run build` succeeds