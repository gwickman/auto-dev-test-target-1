# Discrepancies: v004 Pre-Execution Validation

## Discrepancy 1: first/requirements.md Backlog Reference Error

**Severity:** Low (non-blocking)
**Location:** `comms/inbox/versions/execution/v004/01-01-array-basics/001-001-first/requirements.md`, line 11
**Issue:** References `BL-018 - Add first() array utility` but BL-018 is actually `unique()`. The correct reference should be `BL-020 - Add first() array utility`.
**Origin:** Error present in original drafts (phase-2-document-drafts.md, line 332). Propagated through persistence.
**Impact:** The implementing agent may see conflicting BL references between requirements.md (BL-018, wrong) and THEME_DESIGN.md (BL-020, correct). The function name, description, acceptance criteria, and all implementation details are correct for first() regardless of the BL number.
**Remediation:** Fix line 11 in `comms/inbox/versions/execution/v004/01-01-array-basics/001-001-first/requirements.md` to read: `**Backlog Item:** BL-020 - Add first() array utility`

## Discrepancy 2: STARTER_PROMPT.md Quality Gate Commands

**Severity:** Low (non-blocking)
**Location:** `comms/inbox/versions/execution/v004/STARTER_PROMPT.md`, lines 41-44
**Issue:** Quality gate commands use Python toolchain (`uv run ruff`, `uv run mypy`, `uv run pytest`) instead of the project's actual toolchain (`npm run build`, `npm test`).
**Origin:** Default template from `design_version` MCP tool, not customized for TypeScript project.
**Impact:** If the implementing agent follows only STARTER_PROMPT.md for quality gates, it would try to run non-existent Python tools. However, AGENTS.md (which STARTER_PROMPT.md instructs to read first) has the correct commands.
**Remediation:** Replace quality gate section in STARTER_PROMPT.md with:
```bash
npm run build   # TypeScript compilation
npm test        # Jest test suite
```

## Discrepancy 3: THEME_INDEX.md Placeholder Text

**Severity:** Very Low (non-blocking)
**Location:** `comms/inbox/versions/execution/v004/THEME_INDEX.md`
**Issue:** Theme goals and feature descriptions use placeholder text (`_Theme goal_`, `_Feature description_`) instead of actual content.
**Origin:** Template defaults from `design_version` MCP tool.
**Impact:** Minimal. THEME_DESIGN.md files have full content for each theme. The THEME_INDEX.md still correctly lists all themes, features, and paths.
**Remediation:** Optional - populate goal and description fields. Not required for execution since THEME_DESIGN.md is authoritative.
