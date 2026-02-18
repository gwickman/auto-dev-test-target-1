## Context

When a function parameter accepts both finite integers and `Infinity` as valid values (e.g., a depth parameter), the validation logic must handle both cases.

## Learning

Check for `Infinity` as a special case before applying integer validation. Combining both checks into a single validator creates unnecessary complexity. A two-step approach — (1) if Infinity, accept; (2) otherwise, validate as integer — is clearer and easier to maintain.

## Evidence

In v004, `flatten(arr, depth)` accepts depth as a non-negative integer or `Infinity`. The `isNonNegativeInteger()` validator was designed to check Infinity first, then fall through to integer validation. This approach was noted in the Theme 02 retrospective as cleaner than trying to make a single validator handle both cases. The flatten function passed all 19 tests including Infinity-specific test cases.

## Application

For any parameter that accepts both finite values and Infinity: structure validation as an early return for Infinity followed by standard numeric validation. This pattern applies to recursive depth limits, timeout values, maximum iteration counts, and similar parameters.