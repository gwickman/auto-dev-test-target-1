# Test Area 3: Template Framework & Bootstrap

## Tools Under Test
- `bootstrap_project` (HIGH_RISK)
- `list_library_modules` (SAFE)
- `get_template_version` (SAFE)
- `sync_templates` (HIGH_RISK)

## Test Targets
- **auto-dev-test-blank-1** — Ideal for bootstrap dry_run (no mutation).
- **auto-dev-test-target-1** — Already bootstrapped; test re-bootstrap and sync.

## Scenarios

### 3.1 list_library_modules

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| List all | `()` | Returns 3 modules: ci-github-actions, python-testing, typescript-testing |
| Verify fields | `()` | Each module has name and description |

### 3.2 get_template_version

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Get version | `()` | Returns version "0.1.0" with recent_changes |

### 3.3 bootstrap_project (dry_run only)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Dry run on blank | `project="auto-dev-test-blank-1", dry_run=true` | Preview of files to create, no mutation |
| Dry run with modules | `project="auto-dev-test-blank-1", dry_run=true, library_modules=["typescript-testing"]` | Preview includes library module files |
| Dry run on existing | `project="auto-dev-test-target-1", dry_run=true` | Shows structure already exists |
| Force dry run | `project="auto-dev-test-target-1", dry_run=true, force=true, force_confirmed=true` | Preview of overwrite |
| No spawn_customization | `project="auto-dev-test-blank-1", dry_run=true, spawn_customization=false` | No customization session spawned |

**IMPORTANT:** Only use `dry_run=true` on auto-dev-test-blank-1 to keep it blank for future runs.

### 3.4 sync_templates

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Dry run single | `projects="auto-dev-test-target-1", dry_run=true` | Preview of template changes |
| Dry run all | `projects="*", dry_run=true` | Preview for all projects |
| Invalid project | `projects="nonexistent"` | Error or empty result |

**Cleanup:** Only use dry_run=true to avoid unintended template overwrites.

## Dependencies
- Phase 1 (Server Diagnostics) should pass first to confirm MCP is healthy.

## Idempotency
- `list_library_modules` and `get_template_version` are read-only.
- `bootstrap_project` and `sync_templates` are safe when using `dry_run=true`.
- If actual bootstrap is tested on auto-dev-test-blank-1, it would need manual cleanup (git reset) to restore blank state.
