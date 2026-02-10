# Changes Summary — Diff-Style

## 000-master-prompt.md

### Fix 1: results_folder naming

```diff
- start_exploration(project=PROJECT, prompt=prompt, results_folder=f"c4-{VERSION}-002-code-batch-{batch_num}")
+ start_exploration(project=PROJECT, prompt=prompt, results_folder=f"c4-{VERSION}-002-batch{batch_num}")
```

Added after the code block:
```
+ NOTE: results_folder must have at most 5 hyphen-separated parts. Use compact names like "c4-v003-002-batch1".
```

```diff
- - Results folder: `c4-${VERSION}-002-code-batch-${N}`
+ - Results folder: `c4-${VERSION}-002-batch${N}`
```

### Fix 3: apis/ directory annotation

```diff
- └── apis/                      # OpenAPI specs
+ └── apis/                      # OpenAPI specs (only created if network APIs exist)
```

### Fix 4: PUSH config variable

Added to PROJECT CONFIGURATION block:
```diff
  MODE=auto
+ PUSH=true        # Set to false to commit locally without pushing
```

Replaced all 3 commit blocks (after Phase 2, after Phase 4, after Task 006):
```diff
- ```bash
- git add docs/C4-Documentation/c4-code-*
- git commit -m "docs(c4): ${VERSION} code-level analysis complete"
- git push
- ```
+ ```python
+ git_write(project=PROJECT, message="docs(c4): ${VERSION} code-level analysis complete", push=PUSH)
+ ```
```

```diff
- ```bash
- git add docs/C4-Documentation/
- git commit -m "docs(c4): ${VERSION} component/container/context synthesis complete"
- git push
- ```
+ ```python
+ git_write(project=PROJECT, message="docs(c4): ${VERSION} component/container/context synthesis complete", push=PUSH)
+ ```
```

```diff
- ```bash
- git add docs/C4-Documentation/README.md
- git add docs/C4-Documentation/validation-report.md
- git add comms/outbox/exploration/c4-${VERSION}-*/
- git commit -m "docs(c4): ${VERSION} C4 documentation finalized (${MODE} mode)"
- git push
- ```
+ ```python
+ git_write(project=PROJECT, message="docs(c4): ${VERSION} C4 documentation finalized (${MODE} mode)", push=PUSH)
+ ```
```

Added PUSH to Usage section:
```diff
- PROJECT=auto-dev-test-target-1 VERSION=v005 MODE=full
- PROJECT=auto-dev-test-target-1 VERSION=v006 MODE=auto
- PROJECT=auto-dev-test-target-1 VERSION=v006 MODE=delta
+ PROJECT=auto-dev-test-target-1 VERSION=v005 MODE=full PUSH=true
+ PROJECT=auto-dev-test-target-1 VERSION=v006 MODE=auto PUSH=true
+ PROJECT=auto-dev-test-target-1 VERSION=v006 MODE=delta PUSH=true
+ # Local-only (commit without pushing to remote)
+ PROJECT=auto-dev-test-target-1 VERSION=v005 MODE=full PUSH=false
```

### Fix 7: Commit message format dependency

```diff
- **Note:** Delta mode depends on the standardized commit message `docs(c4): ${VERSION} C4 documentation finalized` produced by Task 006. If the previous generation used a different commit message format, delta mode will fall back to full.
+ **CRITICAL:** The final commit message MUST use the exact format `docs(c4): ${VERSION} C4 documentation finalized (${MODE} mode)`. Delta mode detection depends on matching the pattern `docs(c4):.*finalized` in git log. Do not modify, reword, squash, or amend these commit messages — doing so will silently break delta mode for future runs.
```

---

## task_prompts/002-code-level-analysis.md

### Fix 1: results_folder naming

```diff
- Save outputs to `comms/outbox/exploration/c4-${VERSION}-002-code-batch-${BATCH_NUMBER}/`:
+ Save outputs to `comms/outbox/exploration/c4-${VERSION}-002-batch${BATCH_NUMBER}/`:
```

### Fix 2: Require diagrams

```diff
- Omit diagram entirely if the directory has <3 elements or relationships are trivial (e.g., utility functions with no interdependencies).
+ Every c4-code-*.md file MUST include a Mermaid diagram. For simple modules with few elements, use a classDiagram showing the module's exported interface. Do NOT skip diagrams — consistency across all code-level docs is required.
```

### Fix 6: Test counts

Added after "Skip test files" guideline:
```diff
  - **Skip test files** unless the directory contains ONLY test files (then document the test structure)
+ - **For test directories, include:** total test count (number of `it()` or `test()` calls), test file inventory with per-file counts, and coverage summary showing which source functions have test coverage
```

---

## task_prompts/004-container-synthesis.md

### Fix 3: Library project apis/ guidance

```diff
- - `docs/C4-Documentation/apis/*.yaml` — OpenAPI specs (create `apis/` directory)
+ - `docs/C4-Documentation/apis/*.yaml` — OpenAPI specs (create `apis/` directory only if network APIs exist)
+
+ **Library projects without network APIs:** If the system has no network APIs (e.g., it is a library consumed via imports, not a running service), do NOT create an `apis/` directory. Instead, note in the container doc: "No API specifications — this system is a library consumed via direct imports."
```

---

## task_prompts/005-context-synthesis.md

### Fix 5: Qualify user journeys

Added new guideline before "External systems must be real":
```diff
+ - **Qualify deployment status in user journeys** — when writing user journeys, cross-reference the container doc for deployment status. If a package is not published or a service is not deployed, qualify installation/access steps accordingly (e.g., "after publishing" or "via local installation"). Do not imply public availability unless the container doc confirms it.
  - **External systems must be real** — infer from imports, configs, and API calls, not speculation
```
