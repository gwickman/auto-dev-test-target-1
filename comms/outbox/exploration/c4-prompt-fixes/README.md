# C4 Prompt Fixes — Implementation Summary

Applied 7 fixes to the C4 documentation prompt set based on the v003 review findings. All changes improve prompt clarity, fix naming constraint violations, and add missing requirements discovered during the first full generation run.

## Fix 1: results_folder Naming

- **Files modified:** `000-master-prompt.md`, `task_prompts/002-code-level-analysis.md`
- **What changed:** Replaced `c4-{VERSION}-002-code-batch-{batch_num}` (6 hyphenated parts) with `c4-{VERSION}-002-batch{batch_num}` (4 hyphenated parts) in all 3 occurrences. Added a NOTE about the 5-part max constraint after the variable substitution example.
- **Verification:** Grep confirms zero remaining `002-code-batch` references across the prompt set.

## Fix 2: Require Diagrams in All Code-Level Docs

- **File modified:** `task_prompts/002-code-level-analysis.md`
- **What changed:** Replaced the "Omit diagram entirely if the directory has <3 elements" discretion line with a mandatory requirement: every `c4-code-*.md` file MUST include a Mermaid diagram, with guidance to use classDiagram for simple modules.
- **Verification:** The old permissive language is removed; the new mandatory language is in place.

## Fix 3: Clarify apis/ Directory for Library Projects

- **Files modified:** `task_prompts/004-container-synthesis.md`, `000-master-prompt.md`
- **What changed:** Added library project guidance to Task 004 telling it not to create an `apis/` directory when the system has no network APIs. Updated the Output Structure in the master prompt to annotate `apis/` with "(only created if network APIs exist)".
- **Verification:** Both files have consistent guidance about the conditional nature of the apis/ directory.

## Fix 4: Add PUSH Config Variable

- **File modified:** `000-master-prompt.md`
- **What changed:** Added `PUSH=true` to the PROJECT CONFIGURATION block with a comment. Converted all 3 commit point code blocks from raw `git push` bash commands to `git_write(push=PUSH)` calls. Added PUSH examples to the Usage section including a `PUSH=false` example.
- **Verification:** All 3 commit blocks use `push=PUSH`. Usage section shows both `PUSH=true` and `PUSH=false` examples.

## Fix 5: Qualify User Journeys for Unpublished Packages

- **File modified:** `task_prompts/005-context-synthesis.md`
- **What changed:** Added a new guideline in the Guidelines section requiring user journeys to cross-reference the container doc for deployment status and qualify installation/access steps for unpublished or undeployed packages.
- **Verification:** The guideline is present in the Guidelines section, positioned logically before the "External systems must be real" guideline.

## Fix 6: Require Test Counts in Task 002

- **File modified:** `task_prompts/002-code-level-analysis.md`
- **What changed:** Added a guideline after the "Skip test files" rule requiring test directories to include: total test count, test file inventory with per-file counts, and coverage summary showing which source functions have test coverage.
- **Verification:** The guideline is present immediately after the existing test file handling rule.

## Fix 7: Document Commit Message Format Dependency

- **File modified:** `000-master-prompt.md`
- **What changed:** Replaced the soft "Note:" about delta mode depending on commit messages with a "CRITICAL:" warning that explicitly states the required format, the regex pattern delta mode uses, and prohibits modifying/squashing/amending these commits.
- **Verification:** The stronger language is in place near Step 4, clearly explaining the dependency and consequences of breaking it.
