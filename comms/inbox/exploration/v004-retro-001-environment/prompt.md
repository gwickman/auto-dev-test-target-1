Read AGENTS.md first and follow all instructions there.

## Objective

Verify the environment is ready for retrospective execution for auto-dev-test-target-1 version v004.

## Tasks

### 1. Health Check
Run health_check() and verify:
- MCP server is running (success: true)
- No critical errors reported

### 2. Git Status
Run git_read(project="auto-dev-test-target-1", operation="status") and verify:
- Working tree state
- Current branch
- Remote sync status

If working tree is dirty, document all uncommitted files.

### 3. PR Status
Run git_read(project="auto-dev-test-target-1", operation="prs", state="open") and verify:
- No open PRs related to v004 remain
- If open PRs exist: document them as blockers

### 4. Version Execution Status
Run get_version_status(project="auto-dev-test-target-1", version_number=4) and verify:
- Version status is "completed" or all themes show completed status
- All features within each theme have completion reports

### 5. Branch Verification
Run git_read(project="auto-dev-test-target-1", operation="branches") and verify:
- No stale feature branches from v004 remain
- Document any branches that should have been deleted

## Output Requirements
- Save all outputs to: comms/outbox/exploration/v004-retro-001-environment/
- README.md is a REQUIRED output summarizing the environment verification results

### README.md (required)
First paragraph: Environment status summary (ready/blocked) with key findings.

Then:
- **Health Check**: Pass/fail with details
- **Git Status**: Branch, working tree state, remote sync
- **Open PRs**: List or "none"
- **Version Status**: Execution state summary
- **Stale Branches**: List or "none"
- **Blockers**: Any issues preventing retrospective continuation

### environment-report.md
Detailed results from all checks, including raw outputs.

Also copy both README.md and environment-report.md to comms/outbox/versions/retrospective/v004/001-environment/ (overwrite if exists).

## Commit Instructions
After generating all outputs, commit changes with message: "docs(v004): retrospective task 001 - environment verification [v004-retro-001-environment]"