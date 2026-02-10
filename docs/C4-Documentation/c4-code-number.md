# C4 Code Level: Number Utilities

## Overview
- **Name**: Number Utilities
- **Description**: Numeric utility functions for clamping values to a range and rounding to a specified number of decimal places.
- **Location**: src/number
- **Language**: TypeScript
- **Purpose**: Provides validated numeric operations that throw typed errors on invalid input.

## Code Elements

### Functions/Methods

- `clamp(value: number, min: number, max: number): number`
  - Description: Constrains a number to be within the inclusive range [min, max]. Throws `OutOfRangeError` if min > max.
  - Location: src/number/clamp.ts:3
  - Dependencies: `OutOfRangeError` from `src/errors/index.ts`

- `roundTo(value: number, decimals: number): number`
  - Description: Rounds a number to the specified number of decimal places using the multiply-round-divide technique. Throws `InvalidNumberError` if decimals is negative or not an integer.
  - Location: src/number/roundTo.ts:3
  - Dependencies: `InvalidNumberError` from `src/errors/index.ts`

### Modules

- `src/number/index.ts` (barrel export)
  - Description: Re-exports all number utility functions as the public API for the number module.
  - Location: src/number/index.ts
  - Exports: `clamp`, `roundTo`

## Dependencies

### Internal Dependencies
- `src/errors/index.ts` — `OutOfRangeError` (used by `clamp`), `InvalidNumberError` (used by `roundTo`)

### External Dependencies
- None
