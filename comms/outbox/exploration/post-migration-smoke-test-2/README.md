# Post-Migration Smoke Test 2

auto-dev-test-target-1 is a TypeScript utility library organized into four domain modules (array, number, string, validation) plus an error framework. Source code lives under `src/` with corresponding tests under `tests/`, following a one-test-file-per-source-file convention.

## Counts

- **Source files under src/**: 19
  - `src/array/` — 8 files (first, last, unique, chunk, compact, flatten, intersection, index)
  - `src/string/` — 6 files (reverse, slugify, truncate, capitalize, index, plus barrel)
  - `src/number/` — 3 files (clamp, roundTo, index)
  - `src/validation/` — 1 file (index)
  - `src/errors/` — 1 file (index)
  - `src/index.ts` — root barrel export

- **Test files**: 16 (all under `tests/`)
  - array: 7, string: 4, number: 2, errors: 1, validation: 1, root: 1

## Version

- **package.json version**: `0.1.0`
