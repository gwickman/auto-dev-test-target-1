Read AGENTS.md first and follow all instructions there.

## Objective

Cross-reference backlog items referenced in feature requirements with their actual status for auto-dev-test-target-1 version v004, and complete any still-open items that were implemented.

## Tasks

### 1. Scan Feature Requirements for BL-XXX References
Read comms/inbox/versions/execution/v004/THEME_INDEX.md to get the version structure.

For each feature, read:
- comms/inbox/versions/execution/v004/<theme>/<feature>/requirements.md

Extract all BL-XXX references from each requirements file.

### 2. Check Backlog Item Status
For each unique BL-XXX reference found, call:
get_backlog_item(project="auto-dev-test-target-1", item_id="BL-XXX")

Record: item ID, title, current status, referencing feature.

### 3. Complete Open Backlog Items
For each backlog item that is still "open" but was referenced by a completed feature:
Execute immediately (auto-approved):
complete_backlog_item(project="auto-dev-test-target-1", item_id="BL-XXX", version="v004", theme="<theme-name>")

Record: item ID, action taken, result.

### 4. Check for Orphaned Items
Call list_backlog_items(project="auto-dev-test-target-1", status="open") and check if any open items reference v004 in their description or notes but were not found in requirements files.

## Output Requirements
- Save all outputs to: comms/outbox/exploration/v004-retro-003-backlog/
- README.md is a REQUIRED output summarizing the backlog verification results

### README.md (required)
First paragraph: Backlog verification summary (X items checked, Y completed, Z already complete).

Then:
- **Items Verified**: Count of BL-XXX references found
- **Items Completed**: List of items closed by this task
- **Already Complete**: List of items that were already closed
- **Orphaned Items**: Any open items referencing this version not in requirements
- **Issues**: Any items that could not be completed (with reason)

### backlog-report.md
Detailed table with columns: Backlog Item, Title, Feature, Status Before, Action, Status After.

Also copy both README.md and backlog-report.md to comms/outbox/versions/retrospective/v004/003-backlog/ (overwrite if exists).

## Commit Instructions
After generating all outputs, commit changes with message: "docs(v004): retrospective task 003 - backlog verification [v004-retro-003-backlog]"