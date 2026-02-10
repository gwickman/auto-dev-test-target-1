# C4 Discovery Results — v003

Full-mode discovery of `auto-dev-test-target-1` found 12 source directories containing TypeScript code, organized into 1 batch for code-level analysis.

- **Mode:** full
- **Total Source Directories Found:** 12
- **Directories to Process:** 12
- **Directories Unchanged (delta only):** N/A
- **Batch Count:** 1
- **Existing C4 Code-Level Docs:** None (no `docs/C4-Documentation/` directory found)
- **Exclusions Applied:**
  - `node_modules` — matched (excluded dependency tree)
  - `.git` — matched (excluded VCS directory)
  - `dist` — matched (excluded compiled output)
  - `comms/` — matched (excluded auto-dev communication files)
  - `docs/auto-dev/` — matched (excluded auto-dev documentation)
  - `.pytest_cache` — matched (excluded test cache)
  - `.github` — excluded (contains only YAML config, no source code)
  - Root directory — excluded (contains only `jest.config.js`, a config file)
  - `docs/` — excluded (contains no source code files)

## Directory Summary

All 12 directories are under `src/` (6 dirs) and `tests/` (6 dirs), containing TypeScript source and test files respectively. The project is a TypeScript utility library with modules for array, string, number, validation, and error utilities.

### Source Directories (deepest first)
| Directory | File Count | Description |
|-----------|-----------|-------------|
| `src/array` | 8 .ts files | Array utility functions |
| `src/errors` | 1 .ts file | Error handling utilities |
| `src/number` | 3 .ts files | Number utility functions |
| `src/string` | 5 .ts files | String utility functions |
| `src/validation` | 1 .ts file | Validation utilities |
| `src` | 1 .ts file | Root barrel export |
| `tests/array` | 6 .ts files | Array utility tests |
| `tests/errors` | 1 .ts file | Error handling tests |
| `tests/number` | 2 .ts files | Number utility tests |
| `tests/string` | 4 .ts files | String utility tests |
| `tests/validation` | 1 .ts file | Validation tests |
| `tests` | 1 .ts file | Root export tests |
