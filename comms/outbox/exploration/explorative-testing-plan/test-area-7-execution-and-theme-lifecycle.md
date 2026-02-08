# Test Area 7: Execution, Theme Lifecycle & Recovery

## Tools Under Test
- `get_theme_status` (SAFE)
- `complete_theme` (HIGH_RISK)
- `halt_theme` (HIGH_RISK)
- `generate_retrospective` (HIGH_RISK)
- `get_recovery_status` (SAFE)
- `recover_theme` (HIGH_RISK)
- `start_version_execution` (HIGH_RISK)
- `get_version_execution_status` (SAFE)
- `pause_version_execution` (HIGH_RISK)
- `resume_version_execution` (HIGH_RISK)
- `get_iteration_metrics` (SAFE)

## Test Targets
- **auto-dev-test-target-1** — Has completed themes in v001-v004 for read-only queries; use v998 for mutation testing.
- **auto-dev-test-target-2-python** — Cross-language theme lifecycle testing.

## Scenarios

### 7.1 get_theme_status (read-only)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Completed theme | `theme_name="01-array-basics", version="v004", theme_number=1` on target-1 | status=complete, features listed |
| Theme with version | `theme_name="01-project-scaffolding", version="v001", theme_number=1` on target-2 | status=complete |
| Invalid theme | `theme_name="nonexistent"` | Error or empty |

### 7.2 get_iteration_metrics (read-only)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Completed theme | `version="v004", theme="01-array-basics"` on target-1 | Metrics with success rates |
| Non-existent theme | `version="v999", theme="nonexistent"` | Error or empty metrics |

### 7.3 get_recovery_status (read-only)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Clean state | `project="auto-dev-test-target-1"` | No themes need recovery |
| Python project | `project="auto-dev-test-target-2-python"` | No themes need recovery |

### 7.4 Theme Lifecycle on v998 (mutation)

Prerequisite: v998 must be designed (Test Area 6).

| Step | Tool | Expected Outcome |
|------|------|------------------|
| Check theme status | get_theme_status for v998/01-test-theme | status=pending or similar |
| Halt theme | halt_theme with reason="Testing halt flow" | Partial summary generated |
| Verify halt | get_theme_status | status=halted |
| Recovery check | get_recovery_status | May show v998 theme |
| Recover theme | recover_theme for v998/01-test-theme | Returns next steps |

### 7.5 generate_retrospective (on existing completed themes)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Audience=both | `theme_name="01-array-basics", version="v004", theme_number=1, audience="both"` | Retro generated for both audiences |
| Audience=developer | Same, `audience="developer"` | Developer-focused retro |
| Audience=chatbot | Same, `audience="chatbot"` | Chatbot-focused retro |
| Non-completed theme | Theme that isn't complete | Error or partial retro |

### 7.6 Version Execution (start/pause/resume/status)

**CAUTION:** start_version_execution actually spawns Claude Code to implement features. Only test on v998 with minimal features, or verify the start/immediate-pause flow.

| Step | Tool | Expected Outcome |
|------|------|------------------|
| Start execution | start_version_execution on v998 | Returns execution_id, status=started |
| Check status | get_version_execution_status with execution_id | Shows running or in_progress |
| Pause | pause_version_execution with execution_id | Pause flag set |
| Status after pause | get_version_execution_status | Shows paused |
| Resume | resume_version_execution with execution_id | Resumes from pause point |
| Pause again | pause_version_execution | Pause to stop test execution |
| List executions | get_version_execution_status without execution_id | Lists recent executions |

**Risk mitigation:** Pause immediately after start to minimize actual execution. The v998 test theme should have a trivially small feature.

## Dependencies
- Test Area 6 (Design Tools) must run first to create v998 design documents.
- Phase 1 (Server Diagnostics) must pass.

## Cleanup Strategy
- v998 execution state will remain in state files.
- Theme halt/recovery leaves state that persists but doesn't affect other versions.
- Retrospective generation may create files in the outbox — non-destructive.

## Idempotency
- Read-only tools are idempotent.
- halt_theme on an already-halted theme should be tested for graceful handling.
- generate_retrospective may overwrite existing retro files.
