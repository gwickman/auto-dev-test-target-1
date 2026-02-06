# Task 008: Pre-Execution Validation

Read AGENTS.md first and follow all instructions there.

## Objective

Perform READ-ONLY validation of all persisted design documents to ensure they are complete, consistent, and ready for autonomous execution.

## Context

This is Phase 4 (Validation) for `${PROJECT}` version `${VERSION}`.

All design documents have been persisted. This task validates completeness without modifying anything.

**CRITICAL:** This task is READ-ONLY. Do NOT modify any persisted documents. If validation fails, document the failure and STOP. Do not attempt to fix documents.

**WARNING:** Do NOT modify any files in `comms/outbox/versions/design/${VERSION}/`. These are the reference artifacts. If you find errors, document them and STOP.

## Tasks

### 1. Content Completeness Check

Compare Task 006 drafts against persisted inbox documents:
- Read `comms/outbox/exploration/design-${VERSION}-006-drafts/document-drafts.md`
- Read all documents in `comms/inbox/versions/execution/${VERSION}/`
- Check for truncation or missing content
- Document any discrepancies

### 2. Reference Resolution

For each document, verify:
- All references to `comms/outbox/versions/design/${VERSION}/` resolve to existing files
- No broken links to missing artifacts
- Design artifact store is intact and complete

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

### 5. Backlog Alignment (MANDATORY SCOPE)

ALL backlog items from PLAN.md for this version are mandatory. No items may have been deferred or descoped.

For each feature:
- Verify it references correct BL-XXX items
- Check acceptance criteria match backlog (from 002-backlog/backlog-details.md)
- Document any mismatches

Across all features:
- Verify EVERY backlog item from PLAN.md is mapped to at least one feature
- If any backlog item is missing, this is a BLOCKING FAILURE

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
- Check git status for uncommitted changes in `comms/inbox/versions/execution/${VERSION}/`
- Verify design artifact store is committed

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

Create in `comms/outbox/exploration/design-${VERSION}-008-validation/`:

### README.md (required)

First paragraph: Summary of validation result (PASS/FAIL) with confidence level.

Then:
- **Checklist Status**: X/11 items passed
- **Blocking Issues**: Any failures requiring fix
- **Warnings**: Non-blocking concerns
- **Ready for Execution**: Yes/No with rationale

### pre-execution-checklist.md

```markdown
# Pre-Execution Validation Checklist - ${VERSION}

## Checklist

- [ ] **Content completeness** — Drafts match persisted documents.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Reference resolution** — Design artifact store references resolve.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Notes propagation** — Backlog notes in feature requirements.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **validate_version_design passes** — 0 missing documents.
  - Status: [PASS/FAIL]
  - Result: [tool output]

- [ ] **Backlog alignment** — Features reference correct BL-XXX items.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **File paths exist** — Implementation plans reference real files.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Dependency accuracy** — No circular or incorrect dependencies.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Mitigation strategy** — Workarounds documented if needed.
  - Status: [PASS/FAIL/N/A]
  - Notes: [findings]

- [ ] **Design docs committed** — All inbox documents committed.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Handover document** — STARTER_PROMPT.md complete.
  - Status: [PASS/FAIL]
  - Notes: [findings]

- [ ] **Impact analysis** — Dependencies, breaking changes, test impact.
  - Status: [PASS/FAIL]
  - Notes: [findings]

## Summary

**Overall Status**: [PASS/FAIL]
**Blocking Issues**: [list or "None"]
**Warnings**: [list or "None"]
**Ready for Execution**: [Yes/No]
```

### validation-details.md

Detailed findings for each checklist item.

### discrepancies.md

Document any issues found. If none: "No discrepancies identified."

## Allowed MCP Tools

- `read_document`
- `validate_version_design`
- `git_read` (operation="status")

## Guidelines

- ALL backlog items from PLAN.md are MANDATORY — any missing item is a blocking failure
- This task is READ-ONLY — do not modify any documents
- Be thorough — this is the final check before execution
- Document all findings, even minor issues
- If validation fails, provide clear remediation steps (which earlier task to re-run)
- If validation passes, give strong confidence signal

## Success Criteria

Validation PASSES only if:
- ALL 11 checklist items pass (or N/A with justification)
- `validate_version_design` returns 0 missing documents
- No blocking issues identified
- Design documents and artifact store are committed

Validation FAILS if:
- Any checklist item fails
- Missing or invalid documents found
- Unresolved dependencies or broken references

**If validation fails:** Document the failure and STOP. Remediation is to re-run from the appropriate earlier step, not to patch documents in place.

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-008-validation/
git commit -m "exploration: design-${VERSION}-008-validation complete - [PASS/FAIL]"
git push
```

If validation PASSES, the version is ready for `start_version_execution`.
If validation FAILS, remediate issues and re-run from the appropriate step.
