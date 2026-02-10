# C4 Code Level: Number Utilities Test Suite

## Overview
- **Name**: Number Utilities Test Suite
- **Description**: Jest test suite covering the clamp and roundTo number utility functions with edge cases and error validation.
- **Location**: tests/number
- **Language**: TypeScript
- **Purpose**: Validates correctness of number utility functions including boundary behavior and proper error throwing on invalid input.

## Code Elements

### Test Suites

- `clamp` test suite
  - Description: Tests value-in-range passthrough, clamping below min, clamping above max, boundary edge cases at min and max, and OutOfRangeError when min > max.
  - Location: tests/number/clamp.test.ts:4
  - Test count: 6
  - Imports: `clamp` from `src/index.ts`, `OutOfRangeError` from `src/errors/index.ts`

- `roundTo` test suite
  - Description: Tests rounding to 2 decimal places, rounding to integer (0 places), midpoint rounding behavior, already-rounded values, and InvalidNumberError for negative or non-integer decimals.
  - Location: tests/number/roundTo.test.ts:4
  - Test count: 6
  - Imports: `roundTo` from `src/index.ts`, `InvalidNumberError` from `src/errors/index.ts`

## Dependencies

### Internal Dependencies
- `src/index.ts` — `clamp`, `roundTo` imported for testing
- `src/errors/index.ts` — `OutOfRangeError`, `InvalidNumberError` imported for error type assertions

### External Dependencies
- `jest` — test framework
