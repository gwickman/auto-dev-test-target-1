Read AGENTS.md first and follow all instructions there.

## Objective

Verify all required documentation artifacts exist for every theme and feature in v004 of auto-dev-test-target-1.

## Tasks

### 1. Identify Version Structure
Read comms/inbox/versions/execution/v004/THEME_INDEX.md to determine:
- All themes in this version
- All features within each theme

### 2. Check Feature Completion Reports
For each feature in each theme, verify this file exists:
- comms/outbox/versions/execution/v004/<theme>/<feature>/completion-report.md

Record: feature path, exists (yes/no), status from report if exists.

### 3. Check Theme Retrospectives
For each theme, verify this file exists:
- comms/outbox/versions/execution/v004/<theme>/retrospective.md

Record: theme name, exists (yes/no).

### 4. Check Version Retrospective
Verify this file exists:
- comms/outbox/versions/execution/v004/retrospective.md

### 5. Check CHANGELOG.md
Read docs/CHANGELOG.md and verify:
- A section for v004 exists
- Section contains at least one entry

### 6. Check version-state.json
Verify comms/outbox/versions/execution/v004/version-state.json exists and contains:
- Correct version identifier
- Status field

## Output Requirements
- Save all outputs to: comms/outbox/exploration/v004-retro-002-documentation/
- README.md is a REQUIRED output summarizing the documentation completeness results

### README.md (required)
First paragraph: Documentation completeness summary (X/Y artifacts present).

Then:
- **Completion Reports**: Table of feature -> status
- **Theme Retrospectives**: Table of theme -> status
- **Version Retrospective**: Present/missing
- **CHANGELOG**: Present/missing, has version section
- **Version State**: Present/missing, status value
- **Missing Artifacts**: List of all missing documents with full paths

### completeness-report.md
Detailed table of all artifacts checked.

Also copy both README.md and completeness-report.md to comms/outbox/versions/retrospective/v004/002-documentation/ (overwrite if exists).

## Commit Instructions
After generating all outputs, commit changes with message: "docs(v004): retrospective task 002 - documentation completeness [v004-retro-002-documentation]"