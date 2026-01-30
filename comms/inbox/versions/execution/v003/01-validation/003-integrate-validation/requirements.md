# Requirements: integrate-validation

## Objective
Refactor existing utilities to use validators and throw custom errors.

## Functional Requirements

### FR-1: Update truncate
- Throw EmptyStringError if suffix is empty string
- Throw InvalidNumberError if maxLength is not a positive integer

### FR-2: Update clamp
- Throw OutOfRangeError with descriptive message when min > max

### FR-3: Update roundTo
- Throw InvalidNumberError if decimals is negative or not an integer

### FR-4: Maintain backward compatibility
- Functions should still work the same for valid inputs
- Only error types/messages change for invalid inputs

## Acceptance Criteria
- [ ] truncate throws EmptyStringError for empty suffix
- [ ] truncate throws InvalidNumberError for invalid maxLength
- [ ] clamp throws OutOfRangeError when min > max
- [ ] roundTo throws InvalidNumberError for invalid decimals
- [ ] All existing tests still pass
- [ ] New tests verify error types