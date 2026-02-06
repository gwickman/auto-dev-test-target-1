# Version Design Orchestrator v2 - Master Prompt

**PROJECT CONFIGURATION:**
```
PROJECT=[SET_PROJECT_NAME_HERE]
```

**CRITICAL:** Set the PROJECT variable above before proceeding.

---

## Pre-Execution Validation

**STEP 1:** Verify PROJECT variable is set.

```python
if PROJECT == "[SET_PROJECT_NAME_HERE]" or not PROJECT or PROJECT.strip() == "":
    print("ERROR: PROJECT variable not set.")
    STOP IMMEDIATELY
```

**STEP 2:** Read `docs/auto-dev/PLAN.md` and derive the next version number.

```python
# Find "Planned Versions" section
# Extract the FIRST planned version entry (format: ### vXXX - Title)
# If no planned versions exist, ERROR and STOP
# Set: VERSION = "vXXX"
```

**STEP 3:** Verify version folder does NOT exist.

```python
# Check: comms/inbox/versions/execution/{VERSION}/ must NOT exist
# If it exists, ERROR: "Version {VERSION} already has design documents."
# STOP IMMEDIATELY
```

**STEP 4:** Create the design artifact store.

```python
# Create: comms/outbox/versions/design/{VERSION}/
# Subfolders created by individual tasks:
#   001-environment/
#   002-backlog/
#   003-research/
#   004-logical-design/
#   005-critical-thinking/
```

**If ANY validation fails, output a clear error message and STOP.**

---

## Task Execution Flow

### Phase 1: Environment & Investigation (Tasks 001-003)

**Task 001:** Environment verification
- Read: `prompts/task_prompts/001-environment-verification.md`
- Output: `comms/outbox/versions/design/{VERSION}/001-environment/`
- Start exploration → poll → verify

**Task 002:** Backlog analysis
- Read: `prompts/task_prompts/002-backlog-analysis.md`
- Output: `comms/outbox/versions/design/{VERSION}/002-backlog/`
- Start exploration → poll → verify

**Task 003:** Research investigation
- Read: `prompts/task_prompts/003-research-investigation.md`
- Output: `comms/outbox/versions/design/{VERSION}/003-research/`
- Start exploration → poll → verify

### Phase 2: Logical Design & Critical Thinking (Tasks 004-005)

**Task 004:** Logical design proposal
- Read: `prompts/task_prompts/004-logical-design.md`
- Output: `comms/outbox/versions/design/{VERSION}/004-logical-design/`
- Start exploration → poll → verify

**Task 005:** Critical thinking and risk investigation
- Read: `prompts/task_prompts/005-critical-thinking.md`
- Output: `comms/outbox/versions/design/{VERSION}/005-critical-thinking/`
- Start exploration → poll → verify

**COMMIT:** After Task 005, commit the design artifact store:
```bash
git add comms/outbox/versions/design/{VERSION}/
git commit -m "design: {VERSION} design artifacts (phases 1-2)"
git push
```

### Phase 3: Document Drafts & Persistence (Tasks 006-007)

**Task 006:** Document drafts
- Read: `prompts/task_prompts/006-document-drafts.md`
- Output: `comms/outbox/exploration/design-{VERSION}-006-drafts/`
- Start exploration → poll → verify

**Task 007:** Persist documents to inbox
- Read: `prompts/task_prompts/007-persist-documents.md`
- Output: `comms/outbox/exploration/design-{VERSION}-007-persist/`
- Start exploration → poll → verify

### Phase 4: Validation (Task 008)

**Task 008:** Pre-execution validation (READ-ONLY)
- Read: `prompts/task_prompts/008-pre-execution-validation.md`
- Output: `comms/outbox/exploration/design-{VERSION}-008-validation/`
- Start exploration → poll → verify

---

## Error Handling

Between each task:
1. Check exploration status
2. If "failed", document the failure and STOP
3. If "complete", read result to verify output documents exist
4. Only proceed if current task succeeded

---

## Progress Tracking

- [ ] Validation: PROJECT set
- [ ] Validation: VERSION derived from PLAN.md
- [ ] Validation: Version folder does not exist
- [ ] Validation: Design artifact store created
- [ ] Task 001: Environment verification
- [ ] Task 002: Backlog analysis
- [ ] Task 003: Research investigation
- [ ] Task 004: Logical design
- [ ] Task 005: Critical thinking
- [ ] COMMIT: Design artifacts (phases 1-2)
- [ ] Task 006: Document drafts
- [ ] Task 007: Persist documents
- [ ] Task 008: Pre-execution validation

---

## Completion

When all tasks complete:
1. Verify design documents exist in `comms/inbox/versions/execution/{VERSION}/`
2. Run `validate_version_design(project=PROJECT, version=VERSION)`
3. If validation passes, output success message
4. If validation fails, document missing items and require manual intervention

---

## Usage

1. Set PROJECT variable at the top
2. Run this prompt via exploration or directly in Claude Code
3. Monitor progress — orchestrator executes all 8 tasks sequentially
4. Handle failures — investigate and fix before retrying
