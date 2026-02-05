# Version Design Orchestrator - Master Prompt

**PROJECT CONFIGURATION:**
```
PROJECT=[SET_PROJECT_NAME_HERE]
```

**CRITICAL:** Before proceeding, you must set the PROJECT variable above to the actual project name.

---

## Pre-Execution Validation

**STEP 1:** Verify PROJECT variable is set.

```python
# Check PROJECT is set
if PROJECT == "[SET_PROJECT_NAME_HERE]" or not PROJECT or PROJECT.strip() == "":
    print("ERROR: PROJECT variable not set. Edit this prompt and set PROJECT=[your-project-name]")
    STOP IMMEDIATELY
```

**STEP 2:** Read `docs/auto-dev/PLAN.md` and derive the next version number.

```python
# Find "Planned Versions" section
# Extract the FIRST planned version entry (format: ### vXXX - Title)
# If no planned versions exist, ERROR and STOP
# Set: VERSION = "vXXX" (the derived version number)
```

**STEP 3:** Verify version folder does NOT exist.

```python
# Check: comms/inbox/versions/execution/{VERSION}/ must NOT exist
# If it exists, ERROR: "Version {VERSION} already has design documents. Cannot overwrite."
# STOP IMMEDIATELY
```

**If ANY validation fails, output a clear error message and STOP. Do not proceed to task execution.**

---

## Task Execution Flow

Once validation passes, execute the following task prompts sequentially:

### Phase 1: Environment & Investigation

**Task 001:** Environment verification and context gathering
- Read task prompt: `prompts/task_prompts/001-environment-verification.md`
- Start exploration with `start_exploration`
- Poll with `get_exploration_status` until complete
- Verify success before continuing

**Task 002:** Backlog analysis and retrospective review
- Read task prompt: `prompts/task_prompts/002-backlog-analysis.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success before continuing

**Task 003:** Research and investigation
- Read task prompt: `prompts/task_prompts/003-research-investigation.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success before continuing

**Task 004:** Logical design proposal
- Read task prompt: `prompts/task_prompts/004-logical-design.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success before continuing

### Phase 2: Document Drafts

**Task 005:** Draft all design documents
- Read task prompt: `prompts/task_prompts/005-document-drafts.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success before continuing

### Phase 3: Persist Documents

**Task 006:** Persist design documents to inbox
- Read task prompt: `prompts/task_prompts/006-persist-documents.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success before continuing

### Critical Thinking Check

**Task 007:** Design validation and enhancement
- Read task prompt: `prompts/task_prompts/007-critical-thinking-check.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success before continuing

### Phase 4: Pre-Execution Validation

**Task 008:** Complete pre-execution checklist
- Read task prompt: `prompts/task_prompts/008-pre-execution-validation.md`
- Start exploration with `start_exploration`
- Poll until complete
- Verify success

---

## Error Handling

Between each task:
1. Check exploration status
2. If status is "failed", document the failure and STOP
3. If status is "complete", read the exploration result to verify output documents exist
4. Only proceed to next task if current task succeeded

---

## Progress Tracking

Track completed tasks in a markdown checklist:

- [ ] Validation: PROJECT set
- [ ] Validation: VERSION derived from PLAN.md
- [ ] Validation: Version folder does not exist
- [ ] Task 001: Environment verification
- [ ] Task 002: Backlog analysis
- [ ] Task 003: Research investigation
- [ ] Task 004: Logical design
- [ ] Task 005: Document drafts
- [ ] Task 006: Persist documents
- [ ] Task 007: Critical thinking check
- [ ] Task 008: Pre-execution validation

---

## Completion

When all tasks complete successfully:
1. Verify all design documents exist in `comms/inbox/versions/execution/{VERSION}/`
2. Run `validate_version_design(project=PROJECT, version=VERSION)`
3. If validation passes, output success message
4. If validation fails, document missing items and require manual intervention

---

## Usage Instructions

1. **Set PROJECT variable** at the top of this prompt
2. **Run this prompt** via an exploration or directly in Claude Code
3. **Monitor progress** - the orchestrator will execute all 8 tasks sequentially
4. **Handle failures** - if any task fails, investigate and fix before retrying

**Note:** This orchestrator requires approximately 2-4 hours to complete all phases, depending on project complexity and research requirements.
