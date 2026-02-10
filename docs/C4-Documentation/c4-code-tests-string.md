# C4 Code Level: String Utilities Test Suite

## Overview
- **Name**: String Utilities Test Suite
- **Description**: Jest test suite covering all string utility functions with edge cases including empty strings, Unicode, and error validation.
- **Location**: tests/string
- **Language**: TypeScript
- **Purpose**: Validates correctness of string utility functions including capitalize, reverse, slugify, and truncate.

## Code Elements

### Test Suites

- `capitalize` test suite
  - Description: Tests first-char uppercasing with rest lowercased, empty string handling, single character, strings with spaces, and Unicode support.
  - Location: tests/string/capitalize.test.ts:3
  - Test count: 5
  - Imports: `capitalize` from `src/index.ts`

- `reverse` test suite
  - Description: Tests basic string reversal, empty string, single character, and Unicode handling.
  - Location: tests/string/reverse.test.ts:3
  - Test count: 4
  - Imports: `reverse` from `src/index.ts`

- `slugify` test suite
  - Description: Tests lowercase-hyphen conversion, special character removal, multiple space/hyphen collapsing, leading/trailing hyphen trimming, and empty string.
  - Location: tests/string/slugify.test.ts:3
  - Test count: 5
  - Imports: `slugify` from `src/index.ts`

- `truncate` test suite
  - Description: Tests truncation with default suffix, short string passthrough, custom suffix, InvalidNumberError for maxLength too small, EmptyStringError for empty suffix, and InvalidNumberError for non-positive/non-integer maxLength.
  - Location: tests/string/truncate.test.ts:4
  - Test count: 6
  - Imports: `truncate` from `src/index.ts`, `EmptyStringError`, `InvalidNumberError` from `src/errors/index.ts`

## Dependencies

### Internal Dependencies
- `src/index.ts` — all string functions imported for testing
- `src/errors/index.ts` — `EmptyStringError`, `InvalidNumberError` imported for error type assertions

### External Dependencies
- `jest` — test framework
