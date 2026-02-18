## Context

When building a utility library with multiple functional domains (strings, numbers, arrays, validation), the module organization pattern affects scalability and maintainability.

## Learning

A module-per-domain pattern — where each domain has its own directory with individual function files and a barrel export (`index.ts`) — scales cleanly as functions are added. New functions require only creating the function file and adding an export to the barrel. No existing files need modification beyond the barrel export.

## Evidence

In v004, the `src/array/` module grew from 0 to 7 functions across two themes. Each feature added:
1. A new function file (e.g., `src/array/first.ts`)
2. An export line in `src/array/index.ts`
3. A test file in `tests/array/`

This mirrored the existing `src/string/` and `src/number/` modules from earlier versions. No merge conflicts or structural issues occurred despite 7 sequential additions to the same module.

## Application

For utility libraries, use one directory per domain with individual files per function and a barrel `index.ts`. The top-level `src/index.ts` re-exports each domain module. This pattern minimizes merge conflicts, makes each function independently navigable, and keeps imports clean for consumers.