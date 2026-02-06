# Task 004: Quality Gates

Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

## Objective

Run all quality gate checks and verify the codebase passes. Attempt fixes for straightforward failures.

## Context

Post-version retrospective for `${PROJECT}` version `${VERSION}`. Quality gates must pass before closure can proceed.

## Tasks

### 1. Run Quality Gates

Call:
```python
run_quality_gates(project="${PROJECT}")
```

Record the result for each check: pytest, ruff, mypy.

### 2. Evaluate Results

For each check, record:
- Check name
- Pass/fail status
- Return code
- Key output (first 50 lines of failure output if failed)

### 3. Attempt Fixes (If Failures)

If any check fails:

1. **Analyze the failure**: Read the error output to determine root cause
2. **Classify the fix**:
   - **Straightforward**: Linting errors, formatting issues, missing type annotations on new code, simple test fixes
   - **Non-trivial**: Architectural issues, complex test failures, dependency problems
3. **For straightforward fixes**: Apply the fix directly, then re-run `run_quality_gates`
4. **For non-trivial fixes**: Document the failure details for the proposals task — do NOT attempt complex fixes

### 4. Final Gate Check

After any fix attempts, run `run_quality_gates` one final time and record the definitive result.

If gates still fail after fix attempts, document:
- Which checks fail
- What was attempted
- Why the fix is non-trivial

## Output Requirements

Save outputs to `comms/outbox/versions/retrospective/${VERSION}/004-quality/`:

### README.md (required)

First paragraph: Quality gate summary (all pass / X failures remain).

Then:
- **Initial Results**: Table of check → pass/fail
- **Fixes Applied**: List of fixes made (if any)
- **Final Results**: Table of check → pass/fail after fixes
- **Outstanding Failures**: Detailed description of any remaining failures

### quality-report.md

Full quality gate output including:
- Complete output from each check run
- Diff of any fixes applied
- Before/after comparison if fixes were made

## Allowed MCP Tools

- `run_quality_gates`
- `read_document`

## Guidelines

- Run gates at least once, even if you expect them to pass
- Do NOT weaken gate thresholds to make checks pass
- Do NOT skip any gate check
- Limit fix attempts to 2 rounds maximum — if gates fail after 2 rounds, document and move on
- Do NOT commit fix changes — the master prompt handles commits
