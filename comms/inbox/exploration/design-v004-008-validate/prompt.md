
# Task 008: Pre-Execution Validation for v004

Read AGENTS.md first and follow all instructions there.

## Objective

Perform READ-ONLY validation of all persisted v004 design documents to ensure they are complete, consistent, and ready for autonomous execution.

## Context

Project: auto-dev-test-target-1, Version: v004 (Array Utilities)

All design documents have been persisted to comms/inbox/versions/execution/v004/. This task validates completeness without modifying anything.

CRITICAL: This task is READ-ONLY. Do NOT modify any persisted documents.

## Tasks

### 1. Content Completeness Check

Compare drafts against persisted inbox documents:
- Read comms/outbox/exploration/design-v004-005-drafts/phase-2-document-drafts.md (the drafts)
- Read all documents in comms/inbox/versions/execution/v004/
- Check for truncation or missing content
- Document any discrepancies

### 2. Reference Resolution

For each document, verify:
- All references to comms/outbox/versions/design/v004/ resolve to existing files
- No broken links to missing artifacts

### 3. Notes Propagation

Verify migration notes and caveats made it into documents:
- Check requirements.md for notes from backlog items
- Check implementation-plan.md for risk mitigation notes

### 4. validate_version_design Tool

Run validate_version_design(project="auto-dev-test-target-1", version="v004"):
- Confirm 0 missing documents
- Document the validation result

### 5. Backlog Alignment (MANDATORY)

ALL backlog items from PLAN.md for v004 are mandatory (BL-018 through BL-024). Verify:
- Each feature references correct BL-XXX items
- EVERY backlog item is mapped to at least one feature
- If any item is missing, this is a BLOCKING FAILURE

### 6. File Paths Exist

Review implementation plans:
- Verify referenced existing files actually exist (src/index.ts, src/validation/index.ts, etc.)
- For new files, verify parent directories exist

### 7. Dependency Accuracy

Review stated dependencies:
- Verify theme and feature dependencies are correct
- Check for circular dependencies

### 8. Mitigation Strategy

Check if any workarounds needed during implementation. If not applicable, document N/A.

### 9. Design Docs Committed

Run git_read(project="auto-dev-test-target-1", operation="status") and verify no uncommitted changes in comms/inbox/versions/execution/v004/.

### 10. Handover Document

Read comms/inbox/versions/execution/v004/STARTER_PROMPT.md and verify it is complete.

### 11. Impact Analysis

Review VERSION_DESIGN.md and THEME_DESIGN.md files for dependencies, breaking changes, and test impact.

## Output Requirements

Save all outputs to comms/outbox/exploration/design-v004-008-validate/:

### README.md (required)

First paragraph: Summary of validation result (PASS/FAIL) with confidence level.

Then:
- Checklist Status: X/11 items passed
- Blocking Issues: Any failures
- Warnings: Non-blocking concerns
- Ready for Execution: Yes/No

### pre-execution-checklist.md

Markdown checklist with PASS/FAIL for each of the 11 items with notes.

### validation-details.md

Detailed findings for each checklist item.

### discrepancies.md

Document any issues found. If none: "No discrepancies identified."

## Allowed MCP Tools

- read_document
- validate_version_design
- git_read (operation="status")

## Guidelines

- ALL backlog items from PLAN.md are MANDATORY
- This task is READ-ONLY
- Be thorough
- If validation fails, document remediation steps
- If validation passes, give strong confidence signal

## When Complete
git add comms/outbox/exploration/design-v004-008-validate/
git commit -m "exploration: design-v004-008-validate complete"
