You are the Version Design Orchestrator for the project `auto-dev-test-target-1`.

**PROJECT = auto-dev-test-target-1**
**VERSION = v004**

## Context

Tasks 001-005 have already completed successfully. Task 006 previously failed due to a bug in the design_theme call (missing `number` field). The prompt has been fixed. Task 007 and 008 also ran but need to be re-run after 006 succeeds.

**Your job: Execute tasks 006, 007, and 008 sequentially.**

## Master Prompt Reference

Read the master prompt for reference on the overall flow:
`docs/auto-dev/PROMPTS/design_version_prompt/000-master-prompt.md`

But you are ONLY executing tasks 006, 007, and 008.

## Execution

For each task:
1. Read the task prompt from `docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/00X-*.md` using `read_document`
2. Launch it as a sub-exploration via `start_exploration`
3. Poll with `get_exploration_status` until complete (poll every 30-60 seconds)
4. Check result with `get_exploration_result` 
5. Verify success before continuing to next task

### Task 006: Persist Documents
- Read: `docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/006-persist-documents.md`
- Results folder: `design-v004-006-persist-retry`
- Allowed MCP tools for sub-exploration: `read_document`, `design_version`, `design_theme`, `validate_version_design`
- **IMPORTANT**: The task prompt has been updated with correct design_theme parameter guidance. The previous failure was due to missing `number` field and using hyphens instead of underscores in `implementation_plan`. The updated prompt now documents the correct format.
- **IMPORTANT**: design_version was already called successfully in the first run. The sub-exploration should check if VERSION_DESIGN.md already exists in `comms/inbox/versions/execution/v004/` and skip the design_version call if so. It only needs to call design_theme for each theme.

### Task 007: Critical Thinking Check
- Read: `docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/007-critical-thinking-check.md`
- Results folder: `design-v004-007-critical-check-retry`
- Allowed MCP tools: as specified in the task prompt

### Task 008: Pre-Execution Validation
- Read: `docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/008-pre-execution-validation.md`
- Results folder: `design-v004-008-validation-retry`
- Allowed MCP tools: as specified in the task prompt

## Error Handling

Between each task:
1. Check exploration status
2. If status is "failed" or "timeout", document the failure and STOP
3. If status is "complete", read the exploration result to verify output documents exist
4. Only proceed to next task if current task succeeded

## Output Requirements

Create findings in comms/outbox/exploration/version-design-orchestrator-retry/:

### README.md (required)
First paragraph: Summary of the retry orchestration - which tasks were re-run, success/failure status.
Then: Progress checklist, sub-exploration IDs, timing, any issues.

### orchestration-log.md
Detailed log of each task execution.

## Guidelines
- Under 200 lines per document
- Track all sub-exploration IDs
- If a task fails, document clearly and STOP
- Commit when complete

## When Complete
git add comms/outbox/exploration/version-design-orchestrator-retry/
git commit -m "exploration: version-design-orchestrator-retry complete (tasks 006-008)"