# C4 Code Level: tests/string

## Overview

| Field | Value |
|-------|-------|
| **Name** | String Utilities Tests |
| **Description** | Test suite for all string utility functions |
| **Location** | [tests/string/](../tests/string/) |
| **Language** | TypeScript |
| **Purpose** | Verify correctness, edge-case handling, error throwing, and Unicode support for all string utility functions |

## Code Elements

### Test Suites

#### `capitalize.test.ts`
- **File**: [tests/string/capitalize.test.ts](../tests/string/capitalize.test.ts)
- **Tests**: 5 test cases
- **Covers**: Standard capitalization (first upper, rest lower), empty string, single character, strings with spaces, Unicode handling (e.g., "cafe" with accent)

#### `reverse.test.ts`
- **File**: [tests/string/reverse.test.ts](../tests/string/reverse.test.ts)
- **Tests**: 4 test cases
- **Covers**: Standard string reversal, empty string, single character, Unicode handling

#### `slugify.test.ts`
- **File**: [tests/string/slugify.test.ts](../tests/string/slugify.test.ts)
- **Tests**: 5 test cases
- **Covers**: Lowercase conversion with hyphens, special character removal, multiple space/hyphen collapsing, leading/trailing whitespace trimming, empty string

#### `truncate.test.ts`
- **File**: [tests/string/truncate.test.ts](../tests/string/truncate.test.ts)
- **Tests**: 6 test cases
- **Covers**: Long string truncation with default suffix, short strings returned unchanged, custom suffix support, InvalidNumberError for maxLength too small, EmptyStringError for empty suffix, InvalidNumberError for non-positive-integer maxLength

## Dependencies

### Internal Dependencies
- `../../src/index.js` - Imports string functions under test
- `../../src/errors/index.js` - Direct import of `EmptyStringError` and `InvalidNumberError` in `truncate.test.ts`

### External Dependencies
- `jest` (v30.2.0) - Test framework (describe, it, expect)
