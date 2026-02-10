# C4 Code Level: Validation Utilities

## Overview
- **Name**: Validation Utilities
- **Description**: Type guard and assertion functions for validating and narrowing types of unknown values at runtime.
- **Location**: src/validation
- **Language**: TypeScript
- **Purpose**: Provides reusable type guard functions and assertion functions used across the library for input validation, enabling TypeScript type narrowing.

## Code Elements

### Functions/Methods

- `isNonEmptyString(value: unknown): value is string`
  - Description: Type guard that returns true if the value is a string with length > 0. Narrows the type to `string`.
  - Location: src/validation/index.ts:3
  - Dependencies: None

- `isPositiveNumber(value: unknown): value is number`
  - Description: Type guard that returns true if the value is a finite number greater than 0. Narrows the type to `number`.
  - Location: src/validation/index.ts:7
  - Dependencies: None

- `isInRange(value: number, min: number, max: number): boolean`
  - Description: Returns true if the value is within the inclusive range [min, max].
  - Location: src/validation/index.ts:11
  - Dependencies: None

- `isNonNegativeInteger(value: unknown): value is number`
  - Description: Type guard that returns true if the value is a finite integer >= 0. Narrows the type to `number`.
  - Location: src/validation/index.ts:15
  - Dependencies: None

- `assertNonEmptyString(value: unknown, field?: string): asserts value is string`
  - Description: Assertion function that throws `EmptyStringError` if the value is not a non-empty string. Narrows the type to `string` on success.
  - Location: src/validation/index.ts:22
  - Dependencies: `EmptyStringError` from `src/errors/index.ts`, `isNonEmptyString` (internal)

### Modules

- `src/validation/index.ts` (single-file module)
  - Description: Contains all validation utilities. Exports all functions directly.
  - Location: src/validation/index.ts
  - Exports: `isNonEmptyString`, `isPositiveNumber`, `isInRange`, `isNonNegativeInteger`, `assertNonEmptyString`

## Dependencies

### Internal Dependencies
- `src/errors/index.ts` — `EmptyStringError` (used by `assertNonEmptyString`)

### External Dependencies
- None
