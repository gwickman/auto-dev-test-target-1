# C4 Code Level: String Utilities

## Overview
- **Name**: String Utilities
- **Description**: A collection of string transformation functions for common operations like capitalization, reversal, slugification, and truncation.
- **Location**: src/string
- **Language**: TypeScript
- **Purpose**: Provides reusable string manipulation utilities with input validation and error handling for edge cases.

## Code Elements

### Functions/Methods

- `capitalize(str: string): string`
  - Description: Uppercases the first character and lowercases the rest. Returns empty strings unchanged.
  - Location: src/string/capitalize.ts:1
  - Dependencies: None

- `reverse(str: string): string`
  - Description: Reverses a string using the spread-reverse-join technique. Handles Unicode characters correctly by spreading into an array of code points.
  - Location: src/string/reverse.ts:1
  - Dependencies: None

- `slugify(str: string): string`
  - Description: Converts a string to a URL-friendly slug by lowercasing, replacing spaces with hyphens, removing non-alphanumeric characters (except hyphens), collapsing consecutive hyphens, and trimming leading/trailing hyphens.
  - Location: src/string/slugify.ts:1
  - Dependencies: None

- `truncate(str: string, maxLength: number, suffix: string = '...'): string`
  - Description: Truncates a string to maxLength characters, appending a suffix if truncated. Validates that suffix is non-empty, maxLength is a positive integer, and maxLength is at least as long as the suffix.
  - Location: src/string/truncate.ts:3
  - Dependencies: `EmptyStringError`, `InvalidNumberError` from `src/errors/index.ts`

### Modules

- `src/string/index.ts` (barrel export)
  - Description: Re-exports all string utility functions as the public API for the string module.
  - Location: src/string/index.ts
  - Exports: `reverse`, `truncate`, `slugify`, `capitalize`

## Dependencies

### Internal Dependencies
- `src/errors/index.ts` — `EmptyStringError`, `InvalidNumberError` (used by `truncate`)

### External Dependencies
- None
