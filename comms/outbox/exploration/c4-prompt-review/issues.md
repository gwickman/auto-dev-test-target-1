# Issues Found

## Blocking: Would Prevent Successful Execution

### B1. Contradictory Commit Instructions

Every task prompt ends with `git add` + `git commit` instructions in a "When Complete" section:
- Task 001 line 143: `git commit -m "exploration: c4-${VERSION}-001-discovery complete"`
- Task 002 line 135: `git commit -m "exploration: c4-${VERSION}-002-code-batch-${BATCH_NUMBER} complete"`
- Task 003 line 168: `git commit -m "exploration: c4-${VERSION}-003-components complete"`
- Task 004 line 166: `git commit -m "exploration: c4-${VERSION}-004-containers complete"`
- Task 005 line 203: `git commit -m "exploration: c4-${VERSION}-005-context complete"`
- Task 006 line 152: `git commit -m "docs(c4): ${VERSION} C4 documentation finalized"`

But most task prompts also say "Do NOT commit — the master prompt handles commits":
- Task 001 line 140
- Task 002 line 130
- Task 003 line 163
- Task 004 line 160
- Task 005 line 198

And the master prompt defines its own commit points (lines 133-138, 166-171). The exploration framework's explorations run as separate Claude Code sessions — if the "When Complete" section is followed, the exploration commits. If the "Guidelines" section is followed, it doesn't. This is a direct contradiction that will cause unpredictable behavior.

**Fix:** Remove the "When Complete" git sections from all task prompts, OR remove the "Do NOT commit" guideline and let each task commit its own work. Pick one strategy. The master prompt's explicit commit points suggest the intent is centralized commits — remove the "When Complete" sections from tasks.

### B2. Variable Substitution Has No Mechanism

The master prompt instructs (line 93): "Substitute: `${PROJECT}`, `${VERSION}`, `${MODE}`, `${PREVIOUS_VERSION}`" but never explains how. The exploration framework's `start_exploration()` takes a `prompt` string parameter — there's no built-in template engine.

The design_version prompt has the same issue but is simpler (only `${PROJECT}` and `${VERSION}`). The C4 prompt requires more variables including `${BATCH_DIRECTORIES}` (a multi-line list) and `${BATCH_NUMBER}` which must be different for each parallel batch.

**Fix:** Either:
1. Document that the orchestrator must perform string replacement before passing to `start_exploration()`
2. Instruct the orchestrator to prepend a "Variables" block to the prompt: `"## Variables\n- PROJECT: X\n- VERSION: Y\n..."` followed by the task prompt content
3. Use the `context` parameter in exploration if it exists

### B3. Delta Mode Git Logic Is Fragile

Task 001 (lines 39-45) uses this approach to find changed files:
```bash
git log --oneline --all -- docs/C4-Documentation/README.md | head -5
git diff --name-only <previous-c4-commit> HEAD -- src/ tests/ lib/
```

Problems:
1. This assumes the C4 README.md was committed separately and findable via git log, but commit messages vary
2. The `<previous-c4-commit>` placeholder is never resolved — who extracts this SHA?
3. The `--all` flag searches all branches, which could find commits from unrelated feature branches
4. The master prompt extracts `previous_version` from the README.md content (line 64-65) but never converts version string to git commit SHA

**Fix:** Use git tags or extract the version string from README.md and search for the corresponding commit: `git log --oneline --grep="docs(c4): ${PREVIOUS_VERSION}" --format="%H" | head -1`. Or store the commit SHA in the README.md metadata.

---

## Significant: Would Cause Incorrect Results or Confusion

### S1. Task 006 Has Contradictory "Do NOT commit" and "git push"

Task 006 line 148 says it's a "verification task" that should "do not create or modify C4 level documents (only README.md)" but its "When Complete" section (line 150-153) includes both `git commit` and `git push`. Meanwhile, the master prompt has NO explicit commit point after Task 006 — the last commit is after Phase 4 (line 166-171).

This means either: the finalization task self-commits (contradicting the guideline), or the final README.md and validation report never get committed (breaking the output).

**Fix:** Add a final commit point in the master prompt after Task 006, or let Task 006 handle its own commit as the final step.

### S2. No MCP Tool Authorization Pattern

The retrospective master prompt (lines 13-17) includes an "MCP Tool Authorization" section that extracts `autoDevToolKey` from the initial prompt. The C4 master prompt has no equivalent section. If explorations need authenticated MCP tool access, they'll fail.

**Fix:** Add the autoDevToolKey extraction pattern from the retrospective prompt.

### S3. Allowed MCP Tools Don't Include write_document

Tasks 002-006 write directly to `docs/C4-Documentation/` but their Allowed MCP Tools sections only list `read_document`. The exploration framework needs write access to create files. If the Allowed MCP Tools list is actually enforced, no C4 documentation files would be created.

**Fix:** Either add file-writing tools to allowed lists, or clarify that Allowed MCP Tools is advisory (not enforced) and rename the section to something like "Primary MCP Tools."

### S4. Component Boundary Rule "2-8 code elements" Is Too Rigid

Task 003 line 44: "A component should contain 2-8 code-level elements (not 1, not 20)." For small projects with 3-4 source directories, this forces artificial grouping. For large projects with deep module hierarchies, a single domain component might legitimately have 15+ code-level elements.

**Fix:** Change to a guideline with exceptions: "Target 2-8 code-level elements per component. Single-element components are acceptable for standalone modules. Components exceeding 8 elements should be reviewed for possible splitting."

### S5. Master Prompt Output Structure Misplaces Code Docs

The Output Structure section (line 233-243) places everything under `docs/C4-Documentation/` but Task 002 writes code docs directly there too (line 88-89: `docs/C4-Documentation/c4-code-[name].md`). The master prompt's Phase 2 commit (lines 135-136) tries to `git add docs/C4-Documentation/c4-code-*` — but these files were created by explorations running in parallel. If two explorations try to write to the same directory simultaneously, there could be file conflicts.

**Fix:** Document that explorations write to the `docs/C4-Documentation/` directory and the master prompt commits after all parallel batches complete. The sequential nature of the post-batch commit should prevent issues, but this assumption should be explicit.

---

## Minor: Polish and Improvement Opportunities

### M1. No Recovery Mechanism for Partial Failure

If Task 003 fails after Tasks 001-002 succeed, the master prompt says "document the failure and STOP" (line 189). There's no way to resume from Task 003 — you'd need to re-run the entire prompt. The design_version prompt has the same limitation, but the C4 prompt is more expensive to re-run due to parallel code batches.

**Fix:** Add a "Resume from task N" mode, or at minimum document that re-running in delta mode after a partial failure will skip already-processed directories.

### M2. README.md Mentions "Regeneration" Section But Not Delta Pre-requisites

Task 006's README template (lines 93-96) tells users to set MODE=delta but doesn't mention that delta requires existing C4 docs from a previous run. A user reading only the README might try delta on a fresh project.

**Fix:** Add a note: "Delta mode requires existing C4 documentation from a previous full run."

### M3. Task 005 Says "Keep under 300 lines" but Context Should Be Shorter

The C4 model emphasizes that context-level documentation should be the simplest, most accessible level. 300 lines for a context document seems too generous — the original c4-context agent template is ~180 lines. The stakeholder-friendliness goal conflicts with length.

### M4. Inconsistent Commit Message Conventions

Master prompt uses `docs(c4):` prefix (lines 137, 170). Task prompts use `exploration:` prefix. Task 006 uses `docs(c4):` with `git push`. The project's AGENTS.md documents conventional commits (`feat:`, `fix:`, `docs:`) — `docs(c4):` adds a scope not listed there.

**Fix:** Standardize on one convention. Since these are exploration outputs, use the established `exploration:` prefix consistently, or add `docs(c4):` to AGENTS.md.

### M5. Task 002 Line Limit May Be Insufficient

Task 002 says "Keep each code doc under 300 lines" (line 125) and "summarize if a directory has 50+ functions" (line 125). For directories with complex class hierarchies (e.g., an ORM models directory), 300 lines may force premature summarization. The original c4-code agent had no explicit line limit.

### M6. No Explicit Mermaid Syntax Validation

Task 006 spot-checks Mermaid diagrams (lines 39-43) but only checks for non-empty content with a title and correct C4 notation keywords. It doesn't validate that the Mermaid syntax actually renders. A malformed diagram would pass the spot-check but fail when viewed.
