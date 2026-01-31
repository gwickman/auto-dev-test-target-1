# Utility Functions Exploration

The codebase contains a well-organized collection of utility functions structured across four main modules: string manipulation, number operations, validation, and error handling. These utilities are exported through a centralized index file and follow TypeScript best practices with proper type safety and error handling.

The utilities are grouped into String Operations (reverse, truncate, slugify), Number Operations (clamp, roundTo), Validation Functions (isNonEmptyString, isPositiveNumber, isInRange, assertNonEmptyString), and Error Classes (ValidationError, EmptyStringError, InvalidNumberError, OutOfRangeError). Each category serves a specific purpose: string utilities handle text transformation, number utilities provide mathematical operations with bounds checking, validation utilities offer type guards and assertions for runtime safety, and error classes provide structured exception handling with contextual information.

## Detailed Findings

### String Operations (src/string/)

**reverse** (src/string/reverse.ts:1)
- Reverses a string using spread operator and array methods
- Handles Unicode characters correctly by spreading the string

**truncate** (src/string/truncate.ts:3)
- Truncates strings to a maximum length with customizable suffix
- Default suffix: '...'
- Validates that maxLength is a positive integer
- Ensures maxLength is at least as long as the suffix
- Throws EmptyStringError if suffix is empty
- Throws InvalidNumberError for invalid maxLength values

**slugify** (src/string/slugify.ts:1)
- Converts strings to URL-friendly slugs
- Lowercases the string
- Replaces whitespace with hyphens
- Removes non-alphanumeric characters (except hyphens)
- Collapses multiple hyphens into single hyphens
- Trims leading and trailing hyphens

### Number Operations (src/number/)

**clamp** (src/number/clamp.ts:3)
- Restricts a number to a specified range [min, max]
- Validates that min <= max
- Throws OutOfRangeError if min > max
- Returns the clamped value using Math.min and Math.max

**roundTo** (src/number/roundTo.ts:3)
- Rounds a number to a specified number of decimal places
- Validates that decimals is a non-negative integer
- Throws InvalidNumberError for invalid decimals parameter
- Uses multiplication/division approach to avoid floating-point precision issues

### Validation Functions (src/validation/)

**isNonEmptyString** (src/validation/index.ts:3)
- Type guard that checks if a value is a non-empty string
- Returns boolean and narrows type to string

**isPositiveNumber** (src/validation/index.ts:7)
- Type guard that checks if a value is a positive finite number
- Returns boolean and narrows type to number
- Uses Number.isFinite to exclude NaN and Infinity

**isInRange** (src/validation/index.ts:11)
- Checks if a number falls within a specified range [min, max] inclusive
- Returns boolean

**assertNonEmptyString** (src/validation/index.ts:15)
- Assertion function that throws EmptyStringError if value is not a non-empty string
- Uses TypeScript's asserts keyword for type narrowing
- Accepts optional field parameter for better error context

### Error Classes (src/errors/)

**ValidationError** (src/errors/index.ts:1)
- Base error class for validation-related errors
- Includes optional field property to identify which field failed validation

**EmptyStringError** (src/errors/index.ts:8)
- Extends ValidationError
- Specialized error for empty string validation failures
- Sets message to 'String cannot be empty'

**InvalidNumberError** (src/errors/index.ts:15)
- Extends ValidationError
- Used for number validation failures
- Accepts custom error messages

**OutOfRangeError** (src/errors/index.ts:22)
- Extends ValidationError
- Specialized error for range validation failures
- Automatically formats message with value and range information
- Constructor accepts value, min, max, and optional field

## Architecture Notes

- All modules use ES modules with .js extensions in imports (TypeScript project)
- Centralized exports through src/index.ts
- Consistent error handling with custom error classes
- Type-safe with TypeScript type guards and assertion functions
- Input validation in all public functions
- Good separation of concerns with dedicated modules for each category
