# C4 Prompt V2 Fixes

Applied 7 improvements to the C4 documentation prompt scripts based on the detailed comparison between plugin-generated output (`C4-Documentation/`) and exploration-generated output (`docs/C4-Documentation/`). The changes incorporate the root set's strengths in component modeling, persona depth, and user journeys into our prompt scripts while preserving our existing advantages in C4 compliance and infrastructure.

---

## 1. Component Boundary Guidance (Task 003)

**File:** `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/003-component-synthesis.md`

**What changed:** Added three new rules to the component boundary identification section:
- Explicit prohibition against merging separate directories with distinct concerns just to meet size targets (e.g., `src/errors/` and `src/validation/`)
- Guidance that barrel export files do not warrant their own component unless they contain genuine orchestration logic
- Reinforcement that a small component with clear purpose beats a larger component with mixed concerns

**Addresses:** The comparison found our prompts led to merging errors and validation into one component (wrong) and promoting `src/index.ts` barrel export to a full component (unnecessary inflation). The root set's separation was better justified.

---

## 2. Container Identification Rules (Task 004)

**File:** `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/004-container-synthesis.md`

**What changed:** Added explicit rule that development tools and test runners (Jest, pytest, cargo test) are NOT containers, with explanation that they run inside development environments and CI pipelines, not as independently deployable units.

**Addresses:** The root set incorrectly identified Jest as a container. Our output got this right, but the rule was implicit. Making it explicit prevents regression in future generations.

---

## 3. Upward Navigation Links (Task 002 + Task 003)

**Files:**
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/002-code-level-analysis.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/003-component-synthesis.md`

**What changed:**
- Task 002: Added `Parent Component: [To be assigned in Task 003]` field to the code-level document template, plus a guideline about including it
- Task 003: Added new step 4 ("Update Code-Level Parent Component Links") that instructs updating each code-level doc's Parent Component field with a link to its component doc after boundaries are identified

**Addresses:** Neither documentation set linked code-level docs back to their parent component, making navigation harder. This creates bidirectional links between C4 levels.

---

## 4. Persona and User Journey Depth (Task 005)

**File:** `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/005-context-synthesis.md`

**What changed:**
- Added minimum persona guidance: at LEAST 3 personas covering end users, programmatic users, and maintainers, with specific note to give automation tools their own persona
- Added minimum user journey guidance: at LEAST one journey per persona, with specific instructions to include "Library Integration" journeys for library projects and "Automated Development" journeys for projects with automation

**Addresses:** The root set had 4 personas and 5 user journeys vs our 3 and 4. Our prompts needed to push for more depth, especially for library-specific and automation-specific scenarios.

---

## 5. Full Dependency Graph (Task 003)

**File:** `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/003-component-synthesis.md`

**What changed:** Added a "Full Dependency Graph" section to the master component index template requiring a single comprehensive Mermaid diagram showing ALL import relationships between components.

**Addresses:** Neither documentation set produced a full cross-module dependency graph. The component-level diagrams showed primary relationships but missed secondary ones.

---

## 6. Verified Test Counts (Task 002)

**File:** `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/002-code-level-analysis.md`

**What changed:** Added guideline to attempt running the project's test command for verified counts, falling back to source estimation with an explicit "estimated from source" qualifier.

**Addresses:** Both documentation sets estimated test counts by reading files, leading to discrepancies (e.g., unique: 7 vs 8, intersection: 9 vs 10) and internal inconsistencies (root set's validation count: "22" in summary but 25 in breakdown).

---

## 7. Build Output Documentation (Task 004)

**File:** `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/004-container-synthesis.md`

**What changed:** Added "Build Output" section to the container documentation template with fields for build command, output directory, key artifacts, module format, and declaration files.

**Addresses:** Neither documentation set documented what the build produces (e.g., `dist/` contents, module format, declaration files). This is critical information for library consumers debugging import issues.
