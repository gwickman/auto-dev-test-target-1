# Test Area 8: Git Operations, Explorations, Quality Gates & Webhooks

## Tools Under Test

### Git
- `git_read` (MEDIUM_RISK)
- `commit_changes` / `git_write` (HIGH_RISK)

### Explorations
- `start_exploration` (HIGH_RISK)
- `get_exploration_status` (SAFE)
- `get_exploration_result` (SAFE)
- `available_explorations` (SAFE)
- `list_explorations` (SAFE)
- `explore_project` (HIGH_RISK, deprecated)

### Quality Gates & Completion Reports
- `run_quality_gates` (HIGH_RISK)
- `generate_completion_report` (HIGH_RISK)
- `start_completion_report` (HIGH_RISK)
- `get_completion_report_status` (SAFE)
- `get_completion_report_result` (SAFE)

### Webhooks
- `configure_webhooks` (MEDIUM_RISK)

## Test Targets
- **auto-dev-test-target-1** — TypeScript project, 27 existing explorations, Jest tests.
- **auto-dev-test-target-2-python** — Python project, pytest/ruff/mypy quality gates.

## Scenarios

### 8.1 git_read

| Scenario | Operation | Target | Expected Outcome |
|----------|-----------|--------|------------------|
| Status | `operation="status"` | target-1 | Working tree state |
| Branches | `operation="branches"` | target-1 | Branch list with tracking |
| Stale branches | `operation="stale_branches"` | target-1 | Unmerged branches |
| PRs | `operation="prs", state="all"` | target-1 | PR list (may be empty) |
| PR details | `operation="pr_details", pr_number=<N>` | target-1 | Detailed PR info (if PR exists) |
| Workflow runs | `operation="workflow_runs"` | target-1 | Recent CI runs |
| Fetch | `operation="fetch"` | target-1 | Fetches from remote |
| Pull | `operation="pull"` | target-1 | Fast-forward pull |
| Limit | `operation="prs", limit=2` | target-1 | At most 2 PRs |
| Cross-lang | `operation="status"` | target-2 | Works for Python project |

### 8.2 commit_changes (git_write)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| No changes | `message="test"` when clean | "no changes" message |
| With push=false | Create a test file, `message="test", push=false` | Commit created, not pushed |
| Cleanup | Git reset to undo test commit | State restored |

**Risk mitigation:** Only commit trivially reversible changes. Use `push=false` to avoid remote mutations. Immediately revert.

### 8.3 Exploration Tools

| Scenario | Tool | Expected Outcome |
|----------|------|------------------|
| List existing | available_explorations on target-1 | 27 explorations |
| List with filter | list_explorations, status_filter="complete" | Only completed |
| List limited | list_explorations, limit=5 | At most 5 |
| Start exploration | start_exploration on target-1 with minimal prompt | Returns exploration_id |
| Check status | get_exploration_status with ID | Returns running/complete/failed |
| Get result | get_exploration_result (when complete) | Documents list |

**Exploration prompt for testing:** A trivially small analysis task like "List the top-level files in the project and write a one-paragraph summary."

### 8.4 Quality Gates

| Scenario | Target | Parameters | Expected Outcome |
|----------|--------|-----------|------------------|
| Auto-detect TS | target-1 | `checks=null` | Runs npm-test, tsc |
| Auto-detect Python | target-2 | `checks=null` | Runs ruff, mypy, pytest |
| Specific checks | target-2 | `checks=["ruff"]` | Only ruff |
| All checks | target-2 | `checks=["all"]` | All available checks |
| Custom timeout | target-1 | `timeout_minutes=2` | Respects timeout |
| Pytest args | target-2 | `pytest_args=["-x","--tb=short"]` | Args passed through |

### 8.5 Completion Reports (async pattern)

| Step | Tool | Expected Outcome |
|------|------|------------------|
| Start report | start_completion_report on target-1, v004, 01-array-basics, 001-unique | Returns report_id |
| Check status | get_completion_report_status with report_id | pending/running/complete |
| Get result | get_completion_report_result when complete | Report data and path |
| Sync wrapper | generate_completion_report on same feature | Blocking call returns report |
| Invalid feature | start_completion_report with nonexistent feature | Error handling |

### 8.6 configure_webhooks

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Read current | `project="auto-dev-test-target-1"` (no url/events) | Returns current config |
| Set URL | `url="https://example.com/test", events=["theme_complete"], enabled=true` | Config updated |
| Disable | `enabled=false` | Webhooks disabled |
| With secret | `secret="test-secret"` | Secret stored |
| Cleanup | `enabled=false, url=null` | Reset to no webhooks |

**Cleanup:** Always disable webhooks after testing. Use a non-routable URL.

## Dependencies
- Phase 1 (Server Diagnostics) must pass.
- Completion reports require existing feature artifacts (v004 on target-1).
- Explorations require healthy Claude Code SDK.

## Idempotency
- git_read is read-only.
- commit_changes must be manually reverted.
- Explorations create output folders (non-destructive, additive).
- Quality gates are read-only (run checks without modifying code).
- Webhooks must be disabled/reset after testing.
