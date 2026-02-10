# C4 Code Level: tests (Root)

## Overview

| Field | Value |
|-------|-------|
| **Name** | Test Suite Root |
| **Description** | Root test directory with placeholder test and all test subdirectories |
| **Location** | [tests/](../tests/) |
| **Language** | TypeScript |
| **Purpose** | Organize and contain all test files for the library, mirroring the src/ directory structure |

## Code Elements

### Test Suites

#### `index.test.ts`
- **File**: [tests/index.test.ts](../tests/index.test.ts)
- **Tests**: 1 placeholder test case
- **Description**: Minimal placeholder test that asserts `true === true`. Serves as a structural placeholder for root-level library import tests.

## Test Directory Structure

| Directory | Tests | Covers |
|-----------|-------|--------|
| [tests/array/](../tests/array/) | 58 test cases | chunk, compact, first, flatten, intersection, last, unique |
| [tests/string/](../tests/string/) | 20 test cases | capitalize, reverse, slugify, truncate |
| [tests/number/](../tests/number/) | 12 test cases | clamp, roundTo |
| [tests/errors/](../tests/errors/) | 13 test cases | ValidationError, EmptyStringError, InvalidNumberError, OutOfRangeError |
| [tests/validation/](../tests/validation/) | 22 test cases | isNonEmptyString, isPositiveNumber, isInRange, isNonNegativeInteger, assertNonEmptyString |
| **Total** | **~126 test cases** | **All 22 public exports** |

## Test Configuration

- **Framework**: Jest 30.2.0 with ts-jest ESM preset
- **Config**: [jest.config.js](../jest.config.js)
- **Pattern**: `**/tests/**/*.test.ts`
- **Module mapping**: `.js` extensions mapped to source `.ts` files

## Dependencies

### Internal Dependencies
- `../../src/index.js` - Main library entry point for imports
- `../../src/errors/index.js` - Direct error class imports in some tests

### External Dependencies
- `jest` (v30.2.0) - Test framework
- `ts-jest` (v29.4.6) - TypeScript support for Jest
- `@jest/globals` - Type-safe Jest globals
