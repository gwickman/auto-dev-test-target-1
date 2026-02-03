Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

# Nested Exploration Test: Destructive Test Target Health Check

## Context

Testing whether health_check can be authorized via allowed_mcp_tools on a DESTRUCTIVE test target project. According to BL-330, destructive_test_target=true projects should allow ANY MCP tools via allowed_mcp_tools, including health_check.

## Task

1. **Spawn a sub-exploration** that uses health_check
2. **Monitor the result** - we expect it to SUCCEED on destructive test target
3. **Document the behavior** - does health_check work as expected?

## Sub-Exploration Specification

The sub-exploration should run health_check with this prompt:

```
Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

# Health Check Success Test

Run health_check tool with full parameters:
- include_processes=true
- test_sdk=true
- check_source_sync=true

Write the full health_check response to README.md.

Output to: comms/outbox/exploration/health-check-destructive-test/

Required files:
- README.md with complete health_check JSON response

Commit with message: "exploration: successful health_check on destructive test target"
```

**Sub-exploration call:**
```python
start_exploration(
    project="auto-dev-test-target-1",
    results_folder="health-check-destructive-test",
    allowed_mcp_tools=["health_check"],  # This should succeed on destructive test target
    prompt="<the prompt above>"
)
```

## Investigation Steps

1. Call `start_exploration` with allowed_mcp_tools=["health_check"]
2. Capture the response - should succeed
3. Poll `get_exploration_status` until complete
4. Call `get_exploration_result` to retrieve health check data
5. Extract key metrics from the health check response

## Output Requirements

All outputs to: `comms/outbox/exploration/nested-destructive-auth-test/`

### Required Files

1. **README.md** - Summary with:
   - Did start_exploration accept allowed_mcp_tools=["health_check"]? (expected: YES)
   - Did the sub-exploration start successfully? (expected: YES)
   - Did health_check execute successfully? (expected: YES)
   - Key metrics from health_check (server status, tool count, etc.)

2. **health-check-results.json** - Full health_check response from sub-exploration

3. **findings.md** - Analysis:
   - Confirm BL-330 destructive_test_target behavior works correctly
   - Verify health_check returned valid data
   - Compare to expected health_check schema
   - Note any differences from running health_check directly vs. via nested exploration

## Expected Behavior (Based on BL-330)

According to BL-330 notes:
- Destructive test targets can authorize ANY MCP tools via allowed_mcp_tools
- allowed_mcp_tools=["health_check"] should be accepted
- Sub-exploration should execute health_check successfully
- Should get full health_check response with server status

## Commit Instructions

```bash
git add comms/outbox/exploration/nested-destructive-auth-test/
git commit -m "exploration: verify health_check works on destructive test target

- Spawn sub-exploration with health_check in allowed_mcp_tools
- Verify destructive test targets allow non-exploration tools
- Document successful health_check execution via nested exploration"
git push origin main
```

## Success Criteria

- [ ] start_exploration accepted allowed_mcp_tools=["health_check"]
- [ ] Sub-exploration started and completed successfully
- [ ] health_check returned valid server status
- [ ] All files committed and pushed