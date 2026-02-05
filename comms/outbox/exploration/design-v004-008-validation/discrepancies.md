# Discrepancies - v004 Pre-Execution Validation

## Critical Discrepancies

### 1. Missing Feature Documents (BLOCKS EXECUTION)

**Type:** Structural - Missing Required Documents
**Severity:** Critical ❌
**Impact:** Blocks all implementation work

**Description:**
All 14 feature-level design documents are missing from the inbox directory structure. These documents are required for feature implementation but were never persisted due to a partial failure in Task 006.

**Missing Documents:**

**Theme 01 (01-array-basics):**
- `comms/inbox/versions/execution/v004/01-01-array-basics/001-001-first/requirements.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/001-001-first/implementation-plan.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/002-002-last/requirements.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/002-002-last/implementation-plan.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/003-003-unique/requirements.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/003-003-unique/implementation-plan.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/004-004-chunk/requirements.md`
- `comms/inbox/versions/execution/v004/01-01-array-basics/004-004-chunk/implementation-plan.md`

**Theme 02 (02-array-advanced):**
- `comms/inbox/versions/execution/v004/02-02-array-advanced/001-005-compact/requirements.md`
- `comms/inbox/versions/execution/v004/02-02-array-advanced/001-005-compact/implementation-plan.md`
- `comms/inbox/versions/execution/v004/02-02-array-advanced/002-006-flatten/requirements.md`
- `comms/inbox/versions/execution/v004/02-02-array-advanced/002-006-flatten/implementation-plan.md`
- `comms/inbox/versions/execution/v004/02-02-array-advanced/003-007-intersection/requirements.md`
- `comms/inbox/versions/execution/v004/02-02-array-advanced/003-007-intersection/implementation-plan.md`

**Root Cause:**
Task 006 (design-v004-006-persist) encountered an MCP tool error during `design_theme` calls. The error message `'number'` suggests a JSON parsing issue. The `design_version` call succeeded (creating version-level documents), but subsequent `design_theme` calls for both themes failed.

**Evidence:**
- `validate_version_design` tool reports: `"valid": false, "missing": 14`
- Task 006 README states: "Status: FAILED - MCP parameter parsing error"
- Task 006 README: "The error message `'number'` suggests a JSON parsing issue on the MCP server side"

**Content Availability:**
All 14 missing documents were successfully drafted in Task 005 and exist in:
`comms/outbox/exploration/design-v004-005-drafts/phase-2-document-drafts.md` (3,328 lines)

**Resolution Options:**

**Option A - Manual Extraction (Recommended):**
1. Extract feature documents from phase-2-document-drafts.md
2. Create feature directories in inbox structure
3. Write requirements.md and implementation-plan.md for each feature
4. Run validate_version_design to confirm
5. Commit feature documents

**Option B - Tool Fix:**
1. Investigate MCP tool JSON parsing error
2. Fix parameter handling in design_theme tool
3. Retry design_theme calls for both themes
4. Validate results

**Recommendation:** Use Option A for immediate unblocking. Pursue Option B for future robustness.

---

## High-Severity Discrepancies

### 2. Incorrect Quality Gate Commands

**Type:** Configuration - Wrong Technology Stack
**Severity:** High ⚠️
**Impact:** Could cause execution failure or confusion

**Description:**
The STARTER_PROMPT.md contains quality gate commands for Python projects, but this is a TypeScript/Node.js project.

**Location:** `comms/inbox/versions/execution/v004/STARTER_PROMPT.md` lines 40-45

**Incorrect Commands:**
```bash
uv run ruff check src/ tests/       # Python linter
uv run ruff format --check src/ tests/  # Python formatter
uv run mypy src/                    # Python type checker
uv run pytest -v                    # Python test framework
```

**Correct Commands (from AGENTS.md):**
```bash
npm run build  # TypeScript compilation
npm test       # Jest tests
```

**Impact:**
- Execution agents following STARTER_PROMPT quality gates will encounter "command not found" errors
- Time wasted attempting to install Python toolchain
- Could proceed with untested code if quality gate failures are ignored
- Conflicts with AGENTS.md which has correct commands

**Mitigation:**
AGENTS.md is referenced first in STARTER_PROMPT: "Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow." This should cause agents to use the correct commands from AGENTS.md, but the conflicting information in STARTER_PROMPT is confusing.

**Resolution:**
Update STARTER_PROMPT.md quality gates section to match AGENTS.md:
```markdown
## Quality Gates

All must pass before marking feature complete:

```bash
npm run build  # Compile TypeScript
npm test       # Run Jest tests
```
```

**Evidence:**
- AGENTS.md Quality Gates section: "npm run build" and "npm test"
- Project package.json has TypeScript, Jest, and ts-jest dependencies
- No Python dependencies (ruff, mypy, pytest) in project

---

## Medium-Severity Discrepancies

### 3. Backlog Anchor Reference Case Inconsistency

**Type:** Documentation - Reference Formatting
**Severity:** Medium (Low impact)
**Impact:** Minimal - links work in most Markdown viewers

**Description:**
VERSION_DESIGN.md uses title-case backlog anchors (`#BL-018`) while BACKLOG.md uses lowercase anchors (`#bl-018`).

**Examples:**
```markdown
# VERSION_DESIGN.md:
- [BL-018](../../docs/auto-dev/BACKLOG.md#bl-018)

# BACKLOG.md actual anchor:
<a id="bl-018"></a>
```

**Impact:**
- Most Markdown renderers are case-insensitive for anchor links, so links work
- Could fail in strict Markdown parsers or certain tooling
- Inconsistency in reference format

**Resolution:**
Update VERSION_DESIGN.md to use lowercase anchors to match BACKLOG.md format:
```markdown
- [BL-018](../../docs/auto-dev/BACKLOG.md#bl-018)
```

**Note:** This is a low-priority cosmetic issue. The links are functional in GitHub and most Markdown viewers.

---

## Low-Severity Discrepancies

### 4. Missing STATUS.md Template

**Type:** Documentation - Missing Template
**Severity:** Low
**Impact:** Minimal - can be created during execution

**Description:**
STARTER_PROMPT.md references updating STATUS.md for tracking, but no STATUS.md template exists in the outbox directory.

**Expected Location:** `comms/outbox/versions/execution/v004/STATUS.md`
**Actual Status:** File does not exist

**Impact:**
- Execution agent will need to create STATUS.md from scratch
- Minor delay while determining appropriate format
- No example or template to follow

**Resolution:**
Create STATUS.md template with sections for:
- Current position (theme, feature)
- Completion status for each feature
- Notes and observations
- Next steps

**Alternative:**
Document STATUS.md format in STARTER_PROMPT.md or THEME_INDEX.md so execution agents know what to create.

**Priority:** Low - execution agents can create this file as needed

---

## Non-Issues (Confirmed Correct)

### 1. No Circular Dependencies ✅

**Verification Result:** No circular dependencies found

**Checked:**
- v004 → v003 → v002 → v001 (linear)
- Theme 02 → Theme 01 → v003 (linear)
- Feature dependencies: chunk → isNonNegativeInteger (one-way)
- Feature dependencies: flatten → isNonNegativeInteger (one-way)

### 2. Version-Level Documents Complete ✅

**Verification Result:** All version-level documents are complete and comprehensive

**Documents Checked:**
- VERSION_DESIGN.md: ✅ Complete (360 lines)
- THEME_INDEX.md: ✅ Complete (175 lines)
- STARTER_PROMPT.md: ✅ Complete (46 lines, quality gate issue separate)
- THEME_DESIGN.md (Theme 01): ✅ Complete (172 lines)
- THEME_DESIGN.md (Theme 02): ✅ Complete (63 lines)

### 3. No Content Truncation ✅

**Verification Result:** Generated documents match draft quality with no truncation

**Checked:**
- All sections from drafts present in generated documents
- Investigation findings incorporated
- Design decisions documented
- Risk resolutions included

### 4. Backlog Alignment ✅

**Verification Result:** All backlog items correctly referenced and exist

**Checked:**
- All 7 backlog items (BL-018 through BL-024) exist in BACKLOG.md
- Feature-to-backlog mappings correct
- Tags properly applied (v004, array-basics, array-advanced)

### 5. Dependencies Correctly Identified ✅

**Verification Result:** All dependencies accurate and available

**Checked:**
- v001, v002, v003 dependencies verified as available
- Theme 01 → v003 validation documented
- Theme 02 → Theme 01 structure documented
- isNonNegativeInteger validator requirement documented

### 6. Implementation Order Logical ✅

**Verification Result:** Implementation sequence prevents dependency issues

**Verified:**
- isNonNegativeInteger created before chunk() (step 1 before step 6)
- Module structure created before Theme 02
- Sequential PR workflow prevents conflicts

---

## Summary

**Critical Issues:** 1 (Missing 14 feature documents)
**High Issues:** 1 (Incorrect quality gate commands)
**Medium Issues:** 1 (Anchor case inconsistency)
**Low Issues:** 1 (Missing STATUS.md template)

**Total Discrepancies:** 4
**Non-Issues Confirmed:** 6

**Blocking Issues:** 1 (missing feature documents blocks execution)
**Recommended Fixes:** 2 (feature documents, quality gate commands)
**Optional Improvements:** 2 (anchor formatting, STATUS template)

The design work is fundamentally sound with comprehensive documentation. The primary issue is a technical document persistence failure (Task 006), not a design quality problem. Once feature documents are persisted and quality gate commands are corrected, v004 will be ready for execution.
