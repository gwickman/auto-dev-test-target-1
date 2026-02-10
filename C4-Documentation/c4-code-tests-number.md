# C4 Code Level: tests/number

## Overview

| Field | Value |
|-------|-------|
| **Name** | Number Utilities Tests |
| **Description** | Test suite for all number utility functions |
| **Location** | [tests/number/](../tests/number/) |
| **Language** | TypeScript |
| **Purpose** | Verify correctness, boundary conditions, and error throwing for all number utility functions |

## Code Elements

### Test Suites

#### `clamp.test.ts`
- **File**: [tests/number/clamp.test.ts](../tests/number/clamp.test.ts)
- **Tests**: 6 test cases
- **Covers**: Value within range (pass-through), value below min (clamped up), value above max (clamped down), edge at min boundary, edge at max boundary, OutOfRangeError when min > max

#### `roundTo.test.ts`
- **File**: [tests/number/roundTo.test.ts](../tests/number/roundTo.test.ts)
- **Tests**: 6 test cases
- **Covers**: Rounding to 2 decimal places, rounding to integer (0 decimals), rounding up at midpoint (2.5 -> 3), already-rounded values, InvalidNumberError for negative decimals, InvalidNumberError for non-integer decimals

## Dependencies

### Internal Dependencies
- `../../src/index.js` - Imports number functions under test
- `../../src/errors/index.js` - Direct import of `OutOfRangeError` and `InvalidNumberError`

### External Dependencies
- `jest` (v30.2.0) - Test framework (describe, it, expect)
