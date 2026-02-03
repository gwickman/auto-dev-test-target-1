Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

# Health Check Success Test

## Task
Run health_check tool with full parameters:
- include_processes=true
- test_sdk=true
- check_source_sync=true

Write the complete health_check response to README.md with nice formatting showing all returned data including version info, tool counts, and any other metrics.

## Output Requirements

All outputs to: comms/outbox/exploration/health-check-destructive-nested-test/

Required files:
- README.md with full health_check JSON response formatted nicely with all details

## Commit Instructions

```bash
git add comms/outbox/exploration/health-check-destructive-nested-test/
git commit -m "exploration: successful health_check on destructive test target (nested)"
git push origin main
```