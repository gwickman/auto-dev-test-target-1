# Execution Strategy

## Phasing

Testing is organized into 4 phases based on dependency ordering. Each phase must pass before the next begins.

### Phase 1: Foundation (Test Areas 1-2)
**Goal:** Confirm MCP server is healthy and basic project access works.

| Test Area | Target(s) | Est. Duration | Parallelizable |
|-----------|-----------|---------------|----------------|
| 1. Server Diagnostics | target-1 | 5 min | Yes |
| 2. Project Management | target-1, target-2, blank-1 | 5 min | Yes |

**Gate:** health_check returns healthy, all projects accessible, read_document works.

### Phase 2: Data Management (Test Areas 3-5)
**Goal:** Validate CRUD operations on non-code data and template tools.

| Test Area | Target(s) | Est. Duration | Parallelizable |
|-----------|-----------|---------------|----------------|
| 3. Template Framework | blank-1, target-1 | 5 min | Yes |
| 4. Backlog Management | target-1, target-2 | 10 min | Yes |
| 5. Learning Management | target-1, target-2 | 10 min | Yes |

**Gate:** All CRUD cycles complete, cleanup verified, cross-language parity confirmed.

### Phase 3: Design & Lifecycle (Test Area 6)
**Goal:** Validate design document creation and version lifecycle.

| Test Area | Target(s) | Est. Duration | Parallelizable |
|-----------|-----------|---------------|----------------|
| 6. Design Tools | target-1 | 10 min | No (sequential dependencies) |

**Gate:** v998 design documents created and validated, version can be completed.

### Phase 4: Execution & Integration (Test Areas 7-8)
**Goal:** Test execution engine, git operations, explorations, and quality gates.

| Test Area | Target(s) | Est. Duration | Parallelizable |
|-----------|-----------|---------------|----------------|
| 7. Execution & Theme Lifecycle | target-1 | 15 min | Partially |
| 8. Git, Explorations, Quality | target-1, target-2 | 15 min | Partially |

**Gate:** Execution start/pause/resume works, quality gates pass, explorations complete.

## Parallelization Strategy

### Within a Phase
Test areas within the same phase can run concurrently on different test targets:

```
Phase 2 Parallelization:
  Exploration A (target-1): Test Areas 4 + 5 (backlog + learnings)
  Exploration B (target-2): Test Areas 4 + 5 (cross-language)
  Exploration C (blank-1):  Test Area 3 (bootstrap dry_run)
```

### Across Test Targets
Each test target can be tested independently for read-only operations:

```
Concurrent Explorations:
  target-1:  Phase 1 read-only + Phase 2 CRUD + Phase 3 design
  target-2:  Phase 1 read-only + Phase 2 CRUD (parallel)
  blank-1:   Phase 2 bootstrap dry_run only
```

### Serialization Requirements
These must run sequentially:
1. design_version before design_theme (Test Area 6)
2. design_theme before validate_version_design (Test Area 6)
3. Phase 3 before Phase 4 (execution requires design artifacts)
4. start_version_execution before pause/resume (Test Area 7)
5. start_completion_report before get_completion_report_status (Test Area 8)

## Cleanup Procedures

### After Each Test Area
| Test Area | Cleanup Required |
|-----------|-----------------|
| 1. Server Diagnostics | Restore log level to INFO |
| 2. Project Management | None (read-only) |
| 3. Template Framework | None (dry_run only) |
| 4. Backlog Management | Hard-delete test items |
| 5. Learning Management | Hard-delete test learnings (cleanup_files=true) |
| 6. Design Tools | v998 state/docs remain (acceptable residue) |
| 7. Execution & Lifecycle | Pause any running executions, v998 state remains |
| 8. Git/Exploration/Quality | Disable webhooks, revert test commits, exploration output remains |

### Global Cleanup
After all phases complete:
1. Verify no active themes: `get_project_info` on all targets
2. Verify no running executions: `get_version_execution_status` on all targets
3. Verify no running explorations: `list_explorations(status_filter="running")` on all targets
4. Verify webhooks disabled on all targets

## Failure Handling

### Test Failure
- Log the failure with `get_server_logs` to capture context
- Continue with remaining tests in the same area (don't abort entire phase)
- Record failure in test results document
- Skip dependent tests if a prerequisite fails

### MCP Server Failure
- Run `health_check` to assess server state
- Check `get_recovery_status` for interrupted themes
- Restart MCP server if unhealthy
- Resume from the last successful phase

### Stuck Execution
- Use `pause_version_execution` if execution appears stuck
- Check `health_check(include_processes=true)` for stuck processes
- Use `get_server_logs(source="cli")` to inspect execution output

## Execution via Explorations

Each phase can be implemented as one or more `start_exploration` calls:

```
# Phase 1
start_exploration(project="auto-dev-test-target-1", results_folder="test-phase-1-foundation", prompt="...")

# Phase 2 (parallel)
start_exploration(project="auto-dev-test-target-1", results_folder="test-phase-2-target1", prompt="...")
start_exploration(project="auto-dev-test-target-2-python", results_folder="test-phase-2-target2", prompt="...")
start_exploration(project="auto-dev-test-blank-1", results_folder="test-phase-2-blank", prompt="...")

# Phase 3
start_exploration(project="auto-dev-test-target-1", results_folder="test-phase-3-design", prompt="...", allowed_mcp_tools=["ALL_ALLOWED"])

# Phase 4
start_exploration(project="auto-dev-test-target-1", results_folder="test-phase-4-execution", prompt="...", allowed_mcp_tools=["ALL_ALLOWED"])
```

**Note:** Phases 3-4 require `allowed_mcp_tools=["ALL_ALLOWED"]` because they use HIGH_RISK tools. All test targets have `destructive_test_target=true`.
