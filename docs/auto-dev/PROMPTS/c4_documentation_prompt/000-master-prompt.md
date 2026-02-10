# C4 Architecture Documentation Orchestrator - Master Prompt

**PROJECT CONFIGURATION:**
```
PROJECT=[SET_PROJECT_NAME_HERE]
VERSION=[SET_VERSION_HERE]
MODE=auto
```

**MODE options:**
- `auto` — Checks for existing C4 docs; runs delta if found and current version has changes, full otherwise
- `full` — Full regeneration regardless of existing state
- `delta` — Delta only; fails if no existing C4 docs found

**CRITICAL:** Set PROJECT and VERSION variables above before proceeding.

---

## Overview

This prompt orchestrates C4 architecture documentation generation using the exploration framework. It follows the C4 model (Code → Component → Container → Context) with bottom-up analysis.

**Key differences from the plugin approach:**
- Code-level analysis runs as **parallel exploration batches** for scalability
- **Delta mode** only reprocesses directories with changes since last generation
- Each phase gets its own clean context window (no context limit issues)
- All work flows through `comms/outbox/exploration/c4-*` before persisting to `docs/C4-Documentation/`

---

## Pre-Execution Validation

**STEP 1:** Verify variables are set.

```python
if PROJECT == "[SET_PROJECT_NAME_HERE]" or not PROJECT.strip():
    STOP: "ERROR: PROJECT variable not set."
if VERSION == "[SET_VERSION_HERE]" or not VERSION.strip():
    STOP: "ERROR: VERSION variable not set."
```

**STEP 2:** Verify project exists.

```python
result = get_project_info(project=PROJECT)
if not result.success:
    STOP: "ERROR: Project {PROJECT} not found."
```

**STEP 3:** Check git status.

```python
result = git_read(project=PROJECT, operation="status")
# Note current branch and any uncommitted changes
```

**STEP 4:** Determine execution mode.

```python
# Check for existing C4 documentation
c4_readme = read_document(project=PROJECT, path="docs/C4-Documentation/README.md")

if MODE == "auto":
    if c4_readme exists and has "Generated for Version" field:
        previous_version = extract version from c4_readme
        # Check if there are code changes since previous version
        MODE = "delta"  # will be validated in Task 001
    else:
        MODE = "full"
elif MODE == "delta":
    if c4_readme does not exist:
        STOP: "ERROR: Delta mode requires existing C4 documentation."
```

**STEP 5:** Log mode decision.

```
Mode: {MODE}
Previous C4 Version: {previous_version or "N/A"}
Current Version: {VERSION}
```

**If ANY validation fails, output a clear error message and STOP.**

---

## Task Execution Flow

### Phase 1: Discovery & Planning (Task 001)

**Task 001:** Discovery and directory manifest
- Read: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/001-discovery-and-planning.md`
- Substitute: `${PROJECT}`, `${VERSION}`, `${MODE}`, `${PREVIOUS_VERSION}`
- Output: `comms/outbox/exploration/c4-${VERSION}-001-discovery/`
- Start exploration → poll → verify

**After Task 001 completes:**
- Read `comms/outbox/exploration/c4-${VERSION}-001-discovery/directory-manifest.md`
- Extract the list of directories to process
- Extract the recommended batch groupings
- If MODE is delta, extract the list of changed directories
- Set `BATCH_COUNT` = number of batches from manifest
- Set `DIRECTORIES_PER_BATCH` from manifest

**If manifest reports 0 directories to process (delta mode, no changes):**
- Skip to Phase 5 (Finalization) with "no changes" status
- Update README.md timestamp only

---

### Phase 2: Code-Level Analysis (Task 002 — PARALLEL BATCHES)

**For each batch N (1 to BATCH_COUNT), launch in PARALLEL:**

- Read: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/002-code-level-analysis.md`
- Substitute: `${PROJECT}`, `${VERSION}`, `${BATCH_NUMBER}`, `${BATCH_DIRECTORIES}` (from manifest)
- Results folder: `c4-${VERSION}-002-code-batch-${N}`
- Start exploration (do NOT wait — launch all batches)

**After launching all batches:**
```python
exploration_ids = [id_1, id_2, ..., id_N]
# Poll all explorations until all complete
for eid in exploration_ids:
    while get_exploration_status(project=PROJECT, exploration_id=eid).status != "complete":
        wait(30 seconds)
        check status
    verify result has README.md
```

**If any batch fails:** Document the failure, note which directories were in that batch, and continue with remaining batches. Failed directories will be missing from component synthesis.

**COMMIT after all batches complete:**
```bash
git add docs/C4-Documentation/c4-code-*
git commit -m "docs(c4): ${VERSION} code-level analysis complete"
git push
```

---

### Phase 3: Component Synthesis (Task 003)

**Task 003:** Synthesize code docs into components
- Read: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/003-component-synthesis.md`
- Substitute: `${PROJECT}`, `${VERSION}`, `${MODE}`
- Output: `comms/outbox/exploration/c4-${VERSION}-003-components/`
- Start exploration → poll → verify

---

### Phase 4: Container & Context Synthesis (Tasks 004-005 — SEQUENTIAL)

**Task 004:** Container-level synthesis
- Read: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/004-container-synthesis.md`
- Substitute: `${PROJECT}`, `${VERSION}`
- Output: `comms/outbox/exploration/c4-${VERSION}-004-containers/`
- Start exploration → poll → verify

**Task 005:** Context-level synthesis
- Read: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/005-context-synthesis.md`
- Substitute: `${PROJECT}`, `${VERSION}`
- Output: `comms/outbox/exploration/c4-${VERSION}-005-context/`
- Start exploration → poll → verify

**COMMIT after Phase 4:**
```bash
git add docs/C4-Documentation/
git commit -m "docs(c4): ${VERSION} component/container/context synthesis complete"
git push
```

---

### Phase 5: Finalization (Task 006)

**Task 006:** README generation and validation
- Read: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/006-finalization.md`
- Substitute: `${PROJECT}`, `${VERSION}`, `${MODE}`
- Output: `comms/outbox/exploration/c4-${VERSION}-006-finalize/`
- Start exploration → poll → verify

---

## Error Handling

Between each task (except parallel batches which are handled above):
1. Check exploration status via `get_exploration_status`
2. If "failed", document the failure and STOP
3. If "complete", read result to verify output README.md exists
4. Only proceed to next task if current task succeeded

For parallel batch failures:
- Document which batch failed and which directories it contained
- Continue with remaining batches
- Note gaps in component synthesis task prompt

---

## Progress Tracking

- [ ] Validation: PROJECT and VERSION set
- [ ] Validation: Project exists
- [ ] Validation: Mode determined (full/delta)
- [ ] Task 001: Discovery and planning
- [ ] Task 002: Code-level batches launched (count: ___)
- [ ] Task 002: All code-level batches complete
- [ ] COMMIT: Code-level analysis
- [ ] Task 003: Component synthesis
- [ ] Task 004: Container synthesis
- [ ] Task 005: Context synthesis
- [ ] COMMIT: Component/container/context
- [ ] Task 006: Finalization

---

## Completion

When all tasks complete:
1. Verify `docs/C4-Documentation/README.md` exists with current timestamp
2. Verify all expected C4 level files exist
3. Output summary:
   - Mode used (full/delta)
   - Directories processed
   - Components identified
   - Containers mapped
   - Any gaps or failures

---

## Output Structure

```
docs/C4-Documentation/
├── README.md                  # Index with timestamp and version
├── c4-context.md              # Level 1: System context
├── c4-container.md            # Level 2: Container architecture
├── c4-component.md            # Level 3: Master component index
├── c4-component-*.md          # Level 3: Individual components
├── c4-code-*.md               # Level 4: Code-level docs (one per directory)
└── apis/                      # OpenAPI specs
    └── *.yaml
```

---

## Usage

```
# Full regeneration
PROJECT=auto-dev-test-target-1 VERSION=v005 MODE=full

# Delta update after a version
PROJECT=auto-dev-test-target-1 VERSION=v006 MODE=auto

# Force delta only
PROJECT=auto-dev-test-target-1 VERSION=v006 MODE=delta
```
