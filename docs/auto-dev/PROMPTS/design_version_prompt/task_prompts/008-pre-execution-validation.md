# Task 008: Pre-Execution Validation

Read AGENTS.md first and follow all instructions there.

## Objective

Complete the pre-execution validation checklist to ensure all design documents are ready for autonomous execution.

## Context

This is Phase 4 (Pre-Execution Validation) for `${PROJECT}` version `${VERSION}`.

All design documents have been created and enhanced. Now validate completeness before execution begins.

## Reference Document

Review the checklist requirements from:
`docs/auto-dev/PROCESS/skills/auto-dev-design/references/pre-execution-validation.md`

## Tasks

### 1. Content Completeness Check

Compare Phase 2 drafts against generated inbox documents:
- Read Task 005 drafts
- Read generated documents in `comms/inbox/versions/execution/${VERSION}/`
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

Run `validate_version_design(project="${PROJECT}", version="${VERSION}")`:
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

Ensure no uncommitted changes in `comms/inbox/versions/execution/${VERSION}/`.

### 10. Handover Document

Verify STARTER_PROMPT.md exists and is complete:
- Read `comms/inbox/versions/execution/${VERSION}/STARTER_PROMPT.md`
- Check it includes project context
- Verify it references all necessary documents

### 11. Impact Analysis Completeness

Review VERSION_DESIGN.md and THEME_DESIGN.md files:
- Dependencies identified
- Dependents identified
- Breaking changes documented
- Test impact assessed

## Output Requirements

Create findings in `comms/outbox/exploration/design-${VERSION}-008-validation/`:

### README.md (required)

First paragraph: Summary of validation result (PASS/FAIL) with confidence level.

Then:
- **Checklist Status**: X/11 items passed
- **Blocking Issues**: Any failures requiring fix
- **Warnings**: Non-blocking concerns
- **Ready for Execution**: Yes/No with rationale

### pre-execution-checklist.md

Complete checklist from validation reference:

```markdown
# Pre-Execution Validation Checklist - v${VERSION}

## Checklist

- [ ] **Content completeness** — Compare Phase 2 drafts against generated inbox documents. Check for truncation.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Reference resolution** — Referenced documents exist OR content inlined.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Notes propagation** — Migration notes, caveats made it into feature requirements.md.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **validate_version_design passes** — Run tool, confirm 0 missing documents.
  - Status: [PASS/FAIL]
  - Result: [tool output]

- [ ] **Backlog alignment** — Each feature references BL-XXX. Acceptance criteria match.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **File paths exist** — Implementation plans reference real files.
  - Status: [PASS/FAIL]
  - Notes: [invalid paths or "All valid"]

- [ ] **Dependency accuracy** — Stated dependencies are correct.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Mitigation strategy** — For versions fixing bugs that affect execution, document workarounds.
  - Status: [PASS/FAIL/N/A]
  - Notes: [findings]

- [ ] **Design docs committed** — All inbox documents committed before execution.
  - Status: [PASS/FAIL]
  - Notes: [git status output]

- [ ] **Handover document created** — Starter prompt ready.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Impact analysis** — Dependencies identified, dependents identified, breaking changes documented, test impact assessed.
  - Status: [PASS/FAIL]
  - Notes: [findings]

## Summary

**Overall Status**: [PASS/FAIL]

**Blocking Issues**: [list or "None"]

**Warnings**: [list or "None"]

**Ready for Execution**: [Yes/No]
```

### validation-details.md

Detailed findings for each checklist item:
- What was checked
- How it was verified
- Results found
- Issues identified (if any)

### discrepancies.md

Document any issues found:
- Truncated content
- Missing documents
- Broken references
- Invalid file paths
- Dependency errors

If no discrepancies found, document "No discrepancies identified."

## Allowed MCP Tools

This exploration needs:
- `read_document`
- `validate_version_design`
- `git_read` (operation="status")

## Guidelines

- Be thorough - this is the final check before execution
- Document all findings, even minor issues
- If validation fails, provide clear remediation steps
- If validation passes, give strong confidence signal
- Keep documents under 200 lines each

## Success Criteria

Validation PASSES only if:
- ALL 11 checklist items pass (or N/A with justification)
- `validate_version_design` returns 0 missing documents
- No blocking issues identified
- Design documents are committed

Validation FAILS if:
- Any checklist item fails
- Missing or invalid documents found
- Unresolved dependencies or broken references

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-008-validation/
git commit -m "exploration: design-${VERSION}-008-validation complete - [PASS/FAIL]"
git push
```

If validation PASSES, the version is ready for `start_version_execution`.

If validation FAILS, remediate issues and re-run this validation.
