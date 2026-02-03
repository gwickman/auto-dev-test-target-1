Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

# Health Check Success Test

## Task

Run health_check tool with full parameters:
- include_processes=true
- test_sdk=true
- check_source_sync=true

Write the full health_check response to README.md.

## Output Requirements

All outputs to: comms/outbox/exploration/health-check-destructive-test/

Required files:
- README.md with complete health_check JSON response

## Commit Instructions

```bash
git add comms/outbox/exploration/health-check-destructive-test/
git commit -m "exploration: successful health_check on destructive test target"
git push origin main
```