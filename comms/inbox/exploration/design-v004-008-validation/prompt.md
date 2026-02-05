Read AGENTS.md first and follow all instructions there.

# Task 008: Pre-Execution Validation

**PROJECT = auto-dev-test-target-1**
**VERSION = v004**

## Objective

Complete the pre-execution validation checklist to ensure all design documents are ready for autonomous execution. This is Phase 4 (Pre-Execution Validation) for `auto-dev-test-target-1` version `v004`.

All design documents have been created and enhanced. Now validate completeness before execution begins.

## Reference Document

Review the checklist requirements from:
`docs/auto-dev/PROCESS/skills/auto-dev-design/references/pre-execution-validation.md`

## Tasks

### 1. Content Completeness Check
Compare Phase 2 drafts against generated inbox documents:
- Read Task 005 drafts from `comms/outbox/exploration/design-v004-005-drafts/`
- Read generated documents in `comms/inbox/versions/execution/v004/`
- Check for truncation or missing content
- Document any discrepancies

### 2. Reference Resolution
For each document, verify:
- All referenced documents exist OR content is inlined
- No broken links to missing files
- All external resources are accessible

### 3. Notes Propagation
Verify migration notes and caveats made it into documents:
- Check requirements.md for notes from backlog items
- Check implementation-plan.md for risk mitigation notes
- Verify nothing important was lost in transfer

### 4. validate_version_design Tool
Run `validate_version_design(project="auto-dev-test-target-1", version="v004")`:
- Confirm 0 missing documents
- Document the validation result
- If validation fails, list missing documents

### 5. Backlog Alignment
For each feature:
- Verify it references correct BL-XXX items
- Check acceptance criteria match backlog
- Document any mismatches

### 6. File Paths Exist
Review implementation plans:
- Verify referenced files actually exist (for modifications)
- For new files, verify parent directories exist
- Document any invalid file references

### 7. Dependency Accuracy
Review stated dependencies:
- Verify theme dependencies are correct
- Verify feature dependencies are correct
- Check for circular dependencies
- Document any issues

### 8. Mitigation Strategy
If this version fixes bugs affecting execution:
- Document workarounds needed during implementation
- Note any special handling required

### 9. Design Docs Committed
Verify all design documents are committed:
```bash
git status
```
Ensure no uncommitted changes in `comms/inbox/versions/execution/v004/`.

### 10. Handover Document
Verify STARTER_PROMPT.md exists and is complete:
- Read `comms/inbox/versions/execution/v004/STARTER_PROMPT.md`
- Check it includes project context
- Verify it references all necessary documents

### 11. Impact Analysis Completeness
Review VERSION_DESIGN.md and THEME_DESIGN.md files:
- Dependencies identified
- Dependents identified
- Breaking changes documented
- Test impact assessed

## Output Requirements

Create findings in comms/outbox/exploration/design-v004-008-validation/:

### README.md (required)
First paragraph: Summary of validation result (PASS/FAIL) with confidence level.
Then: Checklist Status (X/11 items passed), Blocking Issues, Warnings, Ready for Execution Yes/No.

### pre-execution-checklist.md
Complete checklist with PASS/FAIL for each of the 11 items.

### validation-details.md
Detailed findings for each checklist item.

### discrepancies.md
Any issues found, or "No discrepancies identified."

## Guidelines
- Be thorough - this is the final check before execution
- Document all findings, even minor issues
- Keep documents under 200 lines each

## When Complete
git add comms/outbox/exploration/design-v004-008-validation/
git commit -m "exploration: design-v004-008-validation complete - [PASS/FAIL]"
git push