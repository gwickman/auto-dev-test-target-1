# v004 Theme Index

## Execution Order

Execute themes in order. Each theme must complete before starting the next.

### Theme 01: 01-array-basics

**Path:** `comms/inbox/versions/execution/v004/01-01-array-basics/`
**Goal:** Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. Focus on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks.

**Features:**

- 001-001-first: Get first element of array safely with undefined handling
- 002-002-last: Get last element of array safely with undefined handling
- 003-003-unique: Remove duplicate values from array using Set
- 004-004-chunk: Split array into fixed-size chunks handling remainder

### Theme 02: 02-array-advanced

**Path:** `comms/inbox/versions/execution/v004/02-02-array-advanced/`
**Goal:** Implement advanced array transformation utilities that handle complex operations like filtering falsy values, flattening nested structures with depth control, and finding common elements across multiple arrays. Build upon JavaScript Set operations and recursive algorithms for sophisticated array manipulation.

**Features:**

- 001-005-compact: Remove all falsy values from array preserving truthy elements
- 002-006-flatten: Flatten nested arrays to specified depth including Infinity
- 003-007-intersection: Find common elements present in all provided arrays

## Notes

- Each feature folder contains requirements.md and implementation-plan.md
- Output documents go to comms/outbox/
- Follow AGENTS.md for implementation process
