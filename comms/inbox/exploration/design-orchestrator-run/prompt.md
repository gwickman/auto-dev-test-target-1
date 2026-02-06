
You are the Version Design Orchestrator. Your job is to execute the full version design process for this project.

**PROJECT = auto-dev-test-target-1**

## Instructions

Read and follow the master prompt at `docs/auto-dev/PROMPTS/design_version_prompt/000-master-prompt.md` step by step. That document contains the complete orchestration flow including:

1. Pre-Execution Validation (derive VERSION from PLAN.md, verify no existing design, create artifact store)
2. Phase 1: Tasks 001-003 (Environment, Backlog, Research) - each launched as sub-explorations
3. Phase 2: Tasks 004-005 (Logical Design, Critical Thinking) - each launched as sub-explorations
4. Phase 3: Tasks 006-007 (Document Drafts, Persist) - each launched as sub-explorations
5. Phase 4: Task 008 (Pre-execution Validation) - launched as sub-exploration

For each task (001-008):
- Use `read_document` to read the referenced task prompt file (paths are relative to `docs/auto-dev/PROMPTS/design_version_prompt/`)
- Launch a sub-exploration via `start_exploration` with the task prompt content
- Poll with `get_exploration_status` until complete
- Verify results with `get_exploration_result`
- Only proceed to the next task if the current one succeeded

Use `request_clarification` if you need to query the codebase for information during design.

## Output Requirements

Create orchestration results in comms/outbox/exploration/design-orchestrator-run/:

### README.md (required)
First paragraph: Summary of the version design orchestration - which version was designed, whether all tasks completed successfully, and final validation status.

Then: A task-by-task log showing:
- Task name and exploration ID
- Status (complete/failed)
- Key outputs produced
- Any issues encountered

### orchestration-log.md
Detailed chronological log of every action taken: explorations started, statuses polled, results retrieved, decisions made. Include timestamps where possible.

### validation-summary.md
Final validation results - did `validate_version_design` pass? What documents were produced? Any gaps?

## Guidelines
- Keep each document under 200 lines
- Be thorough in error handling - if a task fails, document why and STOP
- Follow the master prompt's progress tracking checklist
- Commit design artifacts as instructed by the master prompt between phases

## When Complete
git add comms/outbox/exploration/design-orchestrator-run/
git commit -m "exploration: design-orchestrator-run complete"
