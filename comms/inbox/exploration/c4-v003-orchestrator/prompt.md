You are the C4 Architecture Documentation Orchestrator. Execute the full C4 documentation generation workflow for this project.

**PROJECT CONFIGURATION:**
```
PROJECT=auto-dev-test-target-1
VERSION=v003
MODE=full
```

## Your Job

You are an orchestrator. You will:
1. Run pre-execution validation
2. Launch Task 001 (discovery) as an exploration, wait for it to complete
3. Read the manifest from Task 001's output
4. Launch Task 002 code-level batches as parallel explorations, wait for all to complete
5. Commit code-level docs
6. Launch Task 003 (component synthesis), wait for completion
7. Launch Task 004 (container synthesis), wait for completion
8. Launch Task 005 (context synthesis), wait for completion
9. Commit synthesis docs
10. Launch Task 006 (finalization), wait for completion
11. Final commit

## How to Launch Each Task

For each task:
1. Read the task prompt from `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/NNN-*.md` using `read_document`
2. Replace all `${PROJECT}` with `auto-dev-test-target-1`
3. Replace all `${VERSION}` with `v003`
4. Replace all `${MODE}` with `full`
5. Replace other variables as needed (batch info for Task 002)
6. Launch via `start_exploration(project="auto-dev-test-target-1", prompt=resolved_prompt, results_folder="c4-v003-NNN-name")`
7. Poll with `get_exploration_status` every 30 seconds until complete
8. Read results with `get_exploration_result` to verify README.md exists

## Variable Reference

| Variable | Value |
|----------|-------|
| `${PROJECT}` | auto-dev-test-target-1 |
| `${VERSION}` | v003 |
| `${MODE}` | full |
| `${PREVIOUS_VERSION}` | N/A (full mode) |
| `${PREVIOUS_C4_COMMIT}` | N/A (full mode) |

Task 002 batch variables (`${BATCH_NUMBER}`, `${BATCH_COUNT}`, `${BATCH_DIRECTORIES}`) come from the Task 001 manifest.

## Pre-Execution Validation

1. Verify project exists via `get_project_info(project="auto-dev-test-target-1")`
2. Check git status via `git_read(project="auto-dev-test-target-1", operation="status")`
3. MODE is full — no delta checks needed
4. Log: "Mode: full, Version: v003"

## Commit Points

After all Phase 2 batches complete:
```
git_write(project="auto-dev-test-target-1", message="docs(c4): v003 code-level analysis complete")
```

After Tasks 003-005 complete:
```
git_write(project="auto-dev-test-target-1", message="docs(c4): v003 component/container/context synthesis complete")
```

After Task 006 completes:
```
git_write(project="auto-dev-test-target-1", message="docs(c4): v003 C4 documentation finalized (full mode)")
```

## Error Handling

- If any task exploration fails, document which task failed and STOP
- For parallel batch failures: document the failed batch, continue with others
- Between tasks, always verify the previous task produced a README.md in its output

## Output Requirements

Create orchestration log in comms/outbox/exploration/c4-v003-orchestrator/:

### README.md (required)
First paragraph: Summary of orchestration — how many tasks launched, overall success/failure.

Then:
- **Pre-Execution Validation:** results
- **Task 001 Discovery:** exploration ID, status, directories found
- **Task 002 Code Batches:** number of batches, exploration IDs, statuses
- **Task 003 Components:** exploration ID, status, components identified
- **Task 004 Containers:** exploration ID, status
- **Task 005 Context:** exploration ID, status
- **Task 006 Finalization:** exploration ID, status
- **Commits:** SHA for each commit point
- **Timing:** start time, end time, total duration
- **Issues:** any failures, gaps, or unexpected behavior

### orchestration-log.md
Detailed chronological log of every action taken, every exploration launched, every status check, every result read.

## When Complete
git add comms/outbox/exploration/c4-v003-orchestrator/
git commit -m "exploration: c4-v003-orchestrator complete"
