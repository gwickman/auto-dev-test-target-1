# Task 007: Critical Thinking Design Check

Read AGENTS.md first and follow all instructions there.

## Objective

Review and enhance the Phase 3 design documents to ensure completeness, address gaps, and incorporate critical thinking before pre-execution validation.

## Context

This is the Critical Thinking Check between Phase 3 and Phase 4 for `auto-dev-test-target-1` version `v004`.

Documents have been persisted to `comms/inbox/versions/execution/v004/`. Now review and enhance them.

## CRITICAL: Machine-Parseable Format Requirements

The following files are machine-parsed and require EXACT format preservation:

### THEME_INDEX.md - Feature List Format

**Parser regex:** `- (\d+)-([\\w-]+):`

**REQUIRED format for feature lists:**
```
**Features:**

- 001-feature-name: Brief description text here
- 002-another-feature: Another description text
```

**FORBIDDEN formats that break parser:**
- ❌ Numbered lists: `1.` `2.` `3.`
- ❌ Bold feature identifiers: `**001-feature-name**`
- ❌ Metadata before colon: `001-feature (BL-123, P0, XL)`
- ❌ Multi-line feature entries (main entry must be single line)
- ❌ Missing colon after feature name

**How to enhance features WITHOUT breaking format:**

✅ **CORRECT** - Add detail to description after colon:
```
- 001-system-test-fix: Fix health_check() timeouts (BL-350, P0, XL). Problem: stdio buffering. Solution: Add explicit flush.
```

✅ **CORRECT** - Add new sections BELOW the Features list:
```
**Features:**

- 001-feature-one: Description
- 002-feature-two: Description

#### Feature Details

**001-feature-one:**
- Problem: Detailed problem description
- Solution: Detailed solution
```

### Verification Before Commit

After updating THEME_INDEX.md, verify format:
```bash
grep "^- [0-9][0-9][0-9]-.*:" comms/inbox/versions/execution/v004/THEME_INDEX.md
```

This must show exactly N lines (one per feature).

## Tasks

### Step 1: Confirm Version Folder Exists

Verify `comms/inbox/versions/execution/v004/` exists.
- If not, ERROR and document in README.md

### Step 2: Gather Context

Read these documents to understand history:
- `docs/CHANGELOG.md` - what's been built
- `docs/auto-dev/PLAN.md` - planned scope and backlog items
- Find most recent `comms/outbox/versions/execution/v*.txt` - previous version retrospective
- `docs/auto-dev/PROCESS/skills/auto-dev-design/SKILL.md` - design methodology

### Step 3: Review Backlog Items

Read `docs/auto-dev/backlog.json` and find all items referenced in PLAN.md for this version.

Document any missing backlog items in a blockers file.

**CRITICAL:** You must include ALL backlog items from PLAN.md - no deferrals allowed.

### Step 4: Create Draft Design

Create `v004-phase-1-logical-design-draft.md`:
- Version overview and objectives
- Theme breakdown with backlog item mapping
- Feature groupings within each theme
- High-level technical approach
- Integration points and dependencies

### Step 5: Validate Against Requirements

Review the draft and verify:
- All backlog items included
- All acceptance criteria addressed
- No conflicting or unclear logic
- No gaps or ambiguities

Iterate until complete and coherent.

### Step 6: Identify Risks and Unknowns

Create `v004-phase-1-logical-design-risks.md` listing:
- Technologies/libraries requiring research
- Unclear areas of existing codebase
- Potential impacts to testing fixtures/harnesses
- Integration risks with existing systems
- Other blockers or concerns

DO NOT investigate yet - just list them.

### Step 7: Investigate Risks

For each item in Step 6:
- Research the codebase
- Check documentation
- Review similar patterns in existing code
- Perform web searches for technical unknowns
- Use explore tool for parallel investigations (allowed with `allowed_mcp_tools=["ALL_ALLOWED"]`)

Document findings in `v004-phase-1-logical-design-risks-investigation.md`.

### Step 8: Create Final Design

Merge draft and investigation results into `v004-phase-1-logical-design.md`:
- Incorporate investigation findings
- Resolve identified risks where possible
- Flag remaining blockers clearly
- Ensure design is coherent and complete

### Step 9: Update Design Documents in Version Folder (MANDATORY)

**ALL documents must be enhanced** with findings from Steps 4-8.

Required updates to ALL documents:

**VERSION-LEVEL (2 documents):**
- `VERSION_DESIGN.md`: Add risk summary, design decisions, integration points, execution strategy
- `THEME_INDEX.md`: Expand all feature descriptions, add dependencies and risks per theme
  - ⚠️ MAINTAIN DASH-LIST FORMAT (see format requirements above)

**THEME-LEVEL (N documents, one per theme):**
- Each `THEME_DESIGN.md`: Replace minimal content with detailed risks, decisions, technical approach
- Must include specific file paths, classes, mitigation strategies

**FEATURE-LEVEL (M documents, for every feature):**
- Each `requirements.md`: Ensure all acceptance criteria present, add investigation findings
- Each `implementation-plan.md`: Replace 1-2 sentences with detailed steps, files, verification criteria

**Enhancement means**: Integrate findings into existing structure. Word counts should increase 3-5x minimum.

**VERIFICATION GATE** (create `v004-step9-verification.md`):
- Count total documents: 2 + [themes] + (2 × [features]) = [Z]
- List each document with before/after word counts
- Confirm: [Z]/[Z] documents updated with substantive enhancements
- Only proceed to commit when 100% complete

### Step 10: Commit and Deliver

Follow AGENTS.md PR workflow to commit all documents:
```bash
git add comms/inbox/versions/execution/v004/
git add comms/outbox/exploration/design-v004-007-critical-check/
git commit -m "design: enhance v004 documents with critical thinking analysis"
git push
```

## Output Requirements

Create in `comms/outbox/exploration/design-v004-007-critical-check/`:

### README.md (required)

First paragraph: Summary of critical thinking check for v004.

Then:
- **Methodology Applied**: Steps taken to enhance design
- **Key Findings**: Major gaps addressed or risks mitigated
- **Documents Enhanced**: Count and summary of changes
- **Next Steps**: Ready for pre-execution validation

### v004-phase-1-logical-design.md

Final comprehensive logical design.

### v004-phase-1-logical-design-risks-investigation.md

Investigation findings for all identified risks.

### v004-step9-verification.md

Verification checklist showing all documents enhanced.

## Allowed MCP Tools

This exploration needs:
- `read_document`
- `start_exploration` (with `allowed_mcp_tools=["ALL_ALLOWED"]` for investigations)
- `get_exploration_status`
- `get_exploration_result`

## Guidelines

- Follow document structures from auto-dev-design skill
- Keep documents focused and readable
- Maintain machine-parseable formats (see CRITICAL section above)
- Enhancements must be substantive (3-5x word count increase)
- Verify format compliance before committing

## When Complete

```bash
git add comms/outbox/exploration/design-v004-007-critical-check/
git commit -m "exploration: design-v004-007-critical-check complete"
git push
```