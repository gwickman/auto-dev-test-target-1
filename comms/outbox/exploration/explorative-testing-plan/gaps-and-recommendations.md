# Gaps and Recommendations

## 1. Missing dry_run Support

Several mutation tools lack a `dry_run` flag, making non-destructive testing harder:

| Tool | Impact | Recommendation |
|------|--------|---------------|
| `design_theme` | Creates files that must be cleaned up | Add `dry_run=true` parameter |
| `complete_theme` | Modifies state permanently | Add `dry_run=true` to preview summary |
| `complete_version` | Marks version as completed | Add `dry_run=true` to preview state change |
| `halt_theme` | Irreversible state change | Add `dry_run=true` to preview halt |
| `commit_changes` | Creates git commits | Add `dry_run=true` to preview staged files |
| `configure_webhooks` | Modifies project config | Add `dry_run=true` to preview config change |

**Priority: P1** — dry_run support across all mutation tools would dramatically improve testability.

## 2. Missing Rollback / Cleanup Tool

There is no tool to undo or roll back state changes (version state, theme state, backlog mutations). Currently the only options are:
- Manual file edits to state JSON files
- Git reset operations

**Recommendation:** Add a `rollback_state` or `cleanup_test_state` tool that can:
- Remove a version entry from version-state.json
- Delete design documents for a specific version
- Reset theme status to a previous state

**Priority: P1** — Critical for repeatable testing.

## 3. Missing Test Repositories

| Gap | Reason | Recommendation |
|-----|--------|---------------|
| Rust project | `run_quality_gates` supports cargo-test, cargo-clippy but no Rust test target | Add `auto-dev-test-target-3-rust` |
| Monorepo | No test coverage for multi-package projects | Add `auto-dev-test-target-4-monorepo` |
| Project without CI | All targets have GitHub Actions; untested: projects with no CI | Add a target without .github/workflows |

**Priority: P2** — Rust and monorepo targets would broaden coverage.

## 4. Quality Gate Language Mismatch

`run_quality_gates` on auto-dev-test-target-1 (TypeScript) defaults to npm-test/tsc but the MCP server also exposes ruff/mypy/pytest checks. When run on a TypeScript project, Python checks fail with "no Python source files" rather than being skipped.

**Recommendation:** Auto-detect language should skip inapplicable checks entirely rather than running and failing. The `checks=null` auto-detect should only run checks relevant to the detected language.

**Priority: P1** — Misleading failures reduce trust in quality gate results.

## 5. Missing Assertion Mechanism

Explorations produce documents but there is no built-in way to assert expected outcomes. Tests rely on human inspection of return values.

**Recommendation:** Add a `verify_expectation` or `assert_state` tool that can check:
- File existence at a path
- JSON field value in state files
- Git status matches expected state
- Tool return value matches expected schema

**Priority: P2** — Would enable automated validation within explorations.

## 6. Exploration Prompt Validation

`start_exploration` requires specific prompt format (output path, README requirement, commit instructions) but validation failures are only discovered at runtime.

**Recommendation:** Add a `validate_exploration_prompt` tool or a `dry_run=true` option on `start_exploration` that checks prompt format without launching Claude Code.

**Priority: P2** — Would catch prompt format issues earlier.

## 7. Missing `explore_project` Deprecation Path

`explore_project` is marked deprecated in favor of `start_exploration` but both are still available. The deprecated tool should:
- Log a deprecation warning in server logs
- Include deprecation notice in tool_help output
- Have a planned removal version

**Priority: P3** — Housekeeping.

## 8. No Webhook Test Endpoint

Testing `configure_webhooks` requires a real URL. There is no built-in test endpoint or echo service.

**Recommendation:** Add a `test_webhook` tool that sends a test event to the configured URL and reports the response, or provide a built-in echo endpoint.

**Priority: P3** — Nice to have for webhook testing.

## 9. Version Execution Timeout Observability

When `start_version_execution` runs, there is no way to see real-time output or progress within a feature. `get_version_execution_status` shows which feature is being worked on but not the Claude Code output.

**Recommendation:** Expose a `get_execution_logs` tool or integrate with `get_server_logs` using execution_id correlation.

**Priority: P2** — Important for debugging stuck executions.

## 10. Cross-Project State Isolation

Tests on one project could theoretically affect MCP server state shared across projects (e.g., server logs, active processes). There is no isolation boundary.

**Recommendation:** Document known shared state and ensure test cleanup procedures account for cross-project effects.

**Priority: P3** — Documentation improvement.
