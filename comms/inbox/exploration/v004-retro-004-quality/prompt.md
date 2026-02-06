Read AGENTS.md first and follow all instructions there.

## Objective

Run all quality gate checks for auto-dev-test-target-1 and verify the codebase passes. Attempt fixes for straightforward failures.

## Context

Post-version retrospective for auto-dev-test-target-1 version v004. Quality gates must pass before closure can proceed. This is a TypeScript project using Jest for testing.

## Tasks

### 1. Run Quality Gates
Call run_quality_gates(project="auto-dev-test-target-1") and record the result for each check.

Additionally, run these project-specific checks via bash:
- npm run build (TypeScript compilation)
- npm test (Jest tests)

### 2. Evaluate Results
For each check, record:
- Check name
- Pass/fail status
- Key output (first 50 lines of failure output if failed)

### 3. Attempt Fixes (If Failures)
If any check fails:
1. Analyze the failure
2. For straightforward fixes: Apply the fix directly, then re-run
3. For non-trivial fixes: Document for proposals task

### 4. Final Gate Check
After any fix attempts, run quality gates one final time and record the definitive result.

## Output Requirements
- Save all outputs to: comms/outbox/exploration/v004-retro-004-quality/
- README.md is a REQUIRED output summarizing the quality gate results

### README.md (required)
First paragraph: Quality gate summary (all pass / X failures remain).

Then:
- **Initial Results**: Table of check -> pass/fail
- **Fixes Applied**: List of fixes made (if any)
- **Final Results**: Table of check -> pass/fail after fixes
- **Outstanding Failures**: Detailed description of any remaining failures

### quality-report.md
Full quality gate output including complete output from each check run.

Also copy both README.md and quality-report.md to comms/outbox/versions/retrospective/v004/004-quality/ (overwrite if exists).

## Commit Instructions
After generating all outputs, commit changes with message: "docs(v004): retrospective task 004 - quality gates [v004-retro-004-quality]"