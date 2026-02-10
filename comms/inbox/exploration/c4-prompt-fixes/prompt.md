Implement all fixes to the C4 documentation prompt set based on the review findings. Read `comms/outbox/exploration/c4-v003-review/prompt-improvements.md` for full context, but here are the specific changes to make:

## Fix 1: results_folder naming (Low, 2 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/000-master-prompt.md`

The Variable Substitution example uses `c4-{VERSION}-002-code-batch-{batch_num}` which produces 6 hyphenated words. The `start_exploration` API enforces a max of 5 hyphenated parts.

**Changes:**
- In the Variable Substitution example code block, change `results_folder=f"c4-{VERSION}-002-code-batch-{batch_num}"` to `results_folder=f"c4-{VERSION}-002-batch{batch_num}"`
- In the Phase 2 section, change `c4-${VERSION}-002-code-batch-${N}` to `c4-${VERSION}-002-batch${N}`
- Add a note after the Variable Substitution example: `NOTE: results_folder must have at most 5 hyphen-separated parts. Use compact names like "c4-v003-002-batch1".`
- Search the entire master prompt for any other occurrences of the old pattern and fix them

## Fix 2: Require diagrams in all code-level docs (Low, 5 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/002-code-level-analysis.md`

Currently 3 of 6 source code docs got Mermaid diagrams, 3 didn't. The prompt says "Omit diagram entirely if the directory has <3 elements or relationships are trivial" which gives too much discretion.

**Change:** Replace the "Omit diagram entirely" line at the end of the diagram section with:
```
Every c4-code-*.md file MUST include a Mermaid diagram. For simple modules with few elements, use a classDiagram showing the module's exported interface. Do NOT skip diagrams — consistency across all code-level docs is required.
```

## Fix 3: Clarify apis/ directory for library projects (Medium, 10 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/004-container-synthesis.md`

The container task created an empty `apis/` directory for a library project with no network APIs, which then contradicted the finalization validation.

**Changes in Task 004:**
- Find the section about OpenAPI specs / API generation
- Add this guideline: "If the system has no network APIs (e.g., it is a library consumed via imports, not a running service), do NOT create an apis/ directory. Instead, note in the container doc: 'No API specifications — this system is a library consumed via direct imports.'"

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/000-master-prompt.md`

**Changes in master prompt:**
- In the Output Structure section, change `apis/` line to: `└── apis/                      # OpenAPI specs (only created if network APIs exist)`

## Fix 4: Add PUSH config variable (Low, 5 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/000-master-prompt.md`

**Changes:**
- In the PROJECT CONFIGURATION block, add `PUSH=true` as a new line after `MODE=auto`
- Add a comment: `# Set to false to commit locally without pushing`
- In all three commit point code blocks (after Phase 2, after Phase 4, after Task 006), change `git push` to use the PUSH variable. For the git_write examples, show `push=PUSH`
- In the Usage section at the bottom, add PUSH examples

## Fix 5: Qualify user journeys for unpublished packages (Low, 5 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/005-context-synthesis.md`

**Changes:**
- In the Guidelines section, add a new guideline: "When writing user journeys, cross-reference the container doc for deployment status. If a package is not published or a service is not deployed, qualify installation/access steps accordingly (e.g., 'after publishing' or 'via local installation'). Do not imply public availability unless the container doc confirms it."

## Fix 6: Require test counts in Task 002 (Low, 5 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/002-code-level-analysis.md`

**Changes:**
- In the Guidelines section, add: "For test directories, include: total test count (number of `it()` or `test()` calls), test file inventory with per-file counts, and coverage summary showing which source functions have test coverage."

## Fix 7: Document commit message format dependency (Medium, 5 min)

File: `docs/auto-dev/PROMPTS/c4_documentation_prompt/000-master-prompt.md`

**Changes:**
- Find the existing note about delta mode depending on commit messages (near the end of Step 4)
- Strengthen it to: "CRITICAL: The final commit message MUST use the exact format `docs(c4): ${VERSION} C4 documentation finalized (${MODE} mode)`. Delta mode detection depends on matching the pattern `docs(c4):.*finalized` in git log. Do not modify, reword, squash, or amend these commit messages — doing so will silently break delta mode for future runs."

## Verification

After making all changes, read through each modified file to verify:
1. No broken markdown formatting
2. No orphaned references to old naming patterns
3. All changes are internally consistent

## Output Requirements

Create results in comms/outbox/exploration/c4-prompt-fixes/:

### README.md (required)
First paragraph: Summary of all fixes applied.

Then for each fix:
- File modified
- What was changed
- Verification status

### changes-summary.md
Diff-style summary of every change made, organized by file.

## When Complete
git add docs/auto-dev/PROMPTS/c4_documentation_prompt/
git add comms/outbox/exploration/c4-prompt-fixes/
git commit -m "docs(c4): implement prompt fixes from v003 review"
