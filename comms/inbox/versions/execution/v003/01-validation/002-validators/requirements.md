# Requirements: validators

## Objective
Add validation utility functions.

## Functional Requirements

### FR-1: isNonEmptyString
```typescript
export function isNonEmptyString(value: unknown): value is string
```
Returns true if value is a string with length > 0.

### FR-2: isPositiveNumber
```typescript
export function isPositiveNumber(value: unknown): value is number
```
Returns true if value is a finite number > 0.

### FR-3: isInRange
```typescript
export function isInRange(value: number, min: number, max: number): boolean
```
Returns true if min <= value <= max.

### FR-4: assertNonEmptyString
```typescript
export function assertNonEmptyString(value: unknown, field?: string): asserts value is string
```
Throws EmptyStringError if validation fails.

### FR-5: Location
- Create `src/validation/index.ts`
- Export from `src/index.ts`

## Acceptance Criteria
- [ ] All four functions exist
- [ ] Type guards narrow types correctly
- [ ] Assertion throws correct error type
- [ ] Tests cover valid/invalid inputs
- [ ] `npm run build` succeeds