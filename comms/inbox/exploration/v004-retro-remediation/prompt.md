Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

## Objective
Execute all remediation actions from the Stage 1 proposals document.

## Input
Read: comms/outbox/versions/retrospective/v004/007-proposals/proposals.md

## Tasks
For each proposed action:
1. Read the action description
2. Execute the action exactly as specified
3. Document the result

PROJECT=auto-dev-test-target-1
VERSION=v004
autoDevToolKey=402605d2-0c4d-44e9-8521-4893a9820d9b

## Output Requirements
Save outputs to comms/outbox/exploration/v004-retro-remediation/:

### README.md (required)
First paragraph: Summary of remediation actions executed.
Then: Table of each action, its status, and any notes.

Do NOT commit — the calling prompt handles commits.