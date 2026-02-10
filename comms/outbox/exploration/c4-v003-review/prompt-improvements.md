# Prompt Improvements — C4 v003

Specific, actionable improvements to the prompt set based on observed output.

---

## 1. Fix results_folder naming example in master prompt

**What went wrong:** The master prompt (line 45–46) uses the example `c4-{VERSION}-002-code-batch-{N}` which produces `c4-v003-002-code-batch-1` — a 6-word hyphenated name. The `start_exploration` API enforces a 5-word limit. The orchestrator had to retry with a shorter name, wasting an API call.

**What the prompt should say:**
```
results_folder=f"c4-{VERSION}-002-batch{batch_num}"
```
or document the naming constraint:
```
NOTE: results_folder must have at most 5 hyphen-separated parts.
Use "c4-v003-002-batch1" not "c4-v003-002-code-batch-1".
```

**Expected impact:** Eliminates a guaranteed retry on every code-batch launch. Saves one API call per batch.

**Severity:** Low — self-recoverable, but wasteful.

---

## 2. Add explicit diagram consistency requirement to Task 002

**What went wrong:** Code-level docs have inconsistent Mermaid diagram coverage. `c4-code-array.md`, `c4-code-errors.md`, and `c4-code-src.md` include diagrams; `c4-code-string.md`, `c4-code-number.md`, and `c4-code-validation.md` do not.

**What the prompt should say (in Task 002):**
```
Every c4-code-*.md file MUST include a Mermaid diagram. Use:
- `classDiagram` for modules with internal dependencies or class hierarchies
- `classDiagram` showing the module's exported interface for simple modules
Do NOT skip diagrams for "simple" modules.
```

**Expected impact:** All code-level docs get diagrams, making the set uniform and more useful for visual learners.

**Severity:** Low — polish issue, but consistency matters for professional documentation.

---

## 3. Clarify apis/ directory handling for library projects

**What went wrong:** The container synthesis task created an `apis/` directory (per its README), but the finalization task's validation report says it's "Not present." Either: (a) the directory was created empty and then not committed/preserved, or (b) the container task said it created it but didn't. The master prompt's output structure (line 310) shows `apis/*.yaml` as expected, but for a library project with no network APIs, this is never applicable.

**What the prompt should say (in Task 004):**
```
If the system has no network APIs (e.g., it is a library consumed via imports):
- Do NOT create an apis/ directory
- Note in the container doc: "No API specifications — this system is a library"
```

And in the master prompt output structure:
```
└── apis/                      # OpenAPI specs (only if network APIs exist)
    └── *.yaml
```

**Expected impact:** Eliminates the contradiction between "created empty directory" and "directory not present." Simplifies output for library projects.

**Severity:** Medium — the contradiction between two task outputs is confusing and makes the finalization validation report untrustworthy.

---

## 4. Add git push configuration to master prompt

**What went wrong:** The master prompt specifies `git push` at each commit point (lines 198, 231, 250), but the orchestrator used `push=false` throughout. This was likely intentional, but the master prompt doesn't offer a configuration option for it.

**What the prompt should say:**
```
PROJECT CONFIGURATION:
```
PROJECT=[SET_PROJECT_NAME_HERE]
VERSION=[SET_VERSION_HERE]
MODE=auto
PUSH=false  # Set to true to push after each commit point
```
```

Then in commit blocks:
```
git_write(project=PROJECT, message="...", push=PUSH)
```

**Expected impact:** Makes the push behavior explicit and configurable rather than requiring silent deviation from the prompt.

**Severity:** Low — the current behavior is safe (local commits), but the prompt should match reality.

---

## 5. Add "library vs service" detection to Context task

**What went wrong:** The context doc's user journey for "String Manipulation" starts with `npm install auto-dev-test-target-1`, implying the package is published. It isn't. The container doc correctly notes this ("potential future distribution target"), but the context doc doesn't qualify it.

**What the prompt should say (in Task 005):**
```
When writing user journeys:
- Check the container doc for deployment status
- If the package is not yet published/deployed, note this: "once published" or "after local installation"
- Do not write installation steps that imply the package is publicly available unless the container doc confirms it
```

**Expected impact:** User journeys don't mislead readers about distribution status.

**Severity:** Low — minor inaccuracy, but confusing for someone reading the docs to understand the actual system state.

---

## 6. Require test code-level docs to count tests

**What went wrong:** Nothing went wrong — the test docs do count tests (e.g., "60 tests" for array). But this requirement isn't explicit in the Task 002 prompt. The test docs happen to include counts because the exploration agent chose to, not because the prompt required it.

**What the prompt should say (in Task 002):**
```
For test directories, include:
- Total test count (number of `it()` or `test()` calls)
- Test file inventory with per-file test counts
- Coverage summary: which source functions are tested
```

**Expected impact:** Ensures consistent test documentation across runs. Prevents future regressions if a different model version skips test counts.

**Severity:** Low — defensive improvement.

---

## 7. Consider parallel launch of Tasks 004 and 005

**What went wrong:** Nothing failed, but Tasks 004 (containers) and 005 (context) ran sequentially at ~132s and ~142s respectively. The master prompt (line 212) labels them "SEQUENTIAL" and the context task does read the container doc. However, if the context task only needs component-level data (which is already committed), it could run in parallel with the container task.

**What the prompt should say:** Keep sequential. The context task explicitly reads `c4-container.md` (confirmed in the 005 README), so parallelizing would cause it to read stale/missing data. The current sequential design is correct.

**Expected impact:** None — this is a "considered and rejected" improvement. Documenting the reasoning here for future reference.

**Severity:** N/A — not an improvement, just a clarification.

---

## 8. Add commit message format documentation

**What went wrong:** Nothing — commit messages are consistent. But the master prompt's delta mode detection (line 111) depends on `--grep="docs(c4):.*finalized"` matching the commit message from Task 006. If someone manually edits the commit message, delta mode breaks silently.

**What the prompt should say:**
```
CRITICAL: Commit messages MUST use the exact format specified.
Delta mode depends on matching the pattern "docs(c4):.*finalized" in git log.
Do not modify, reword, or amend these commit messages.
```

**Expected impact:** Prevents a hard-to-debug failure mode in delta runs.

**Severity:** Medium — silent breakage of delta mode is a real risk.

---

## Summary

| # | Improvement | Severity | Effort |
|---|-------------|----------|--------|
| 1 | Fix results_folder naming example | Low | 2 min |
| 2 | Require diagrams in all code-level docs | Low | 5 min |
| 3 | Clarify apis/ directory for libraries | Medium | 10 min |
| 4 | Add PUSH config to master prompt | Low | 5 min |
| 5 | Qualify user journeys for unpublished packages | Low | 5 min |
| 6 | Require test counts in test docs | Low | 5 min |
| 7 | Keep 004/005 sequential (no change) | N/A | 0 min |
| 8 | Document commit message format dependency | Medium | 5 min |
