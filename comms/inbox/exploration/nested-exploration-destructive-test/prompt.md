Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

# Nested Exploration Test: Destructive Test Target with health_check

## Context

Testing nested exploration on a DESTRUCTIVE test target. According to BL-330, destructive_test_target=true projects CAN authorize non-exploration tools like health_check via allowed_mcp_tools.

## Task

1. **Spawn a sub-exploration** that uses health_check
2. **Monitor the result** - we expect it to SUCCEED on destructive test target
3. **Document the behavior** - does health_check work when properly authorized?

## Sub-Exploration Specification

The sub-exploration should successfully use health_check with this prompt:

```
Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

# Health Check Success Test

Run health_check tool with full parameters:
- include_processes=true
- test_sdk=true
- check_source_sync=true

Write the complete health_check response to README.md.

Output to: comms/outbox/exploration/health-check-destructive-test/

Required files:
- README.md with full health_check JSON response formatted nicely

Commit with message: "exploration: successful health_check on destructive test target"
```

**Sub-exploration call:**
```python
start_exploration(
    project="auto-dev-test-target-1",
    results_folder="health-check-destructive-test",
    allowed_mcp_tools=["health_check"],  # Should succeed on destructive test target
    prompt="<the prompt above>"
)
```

## Investigation Steps

1. Call `start_exploration` with allowed_mcp_tools=["health_check"]
2. This should succeed (no validation error) because destructive_test_target=true
3. Poll `get_exploration_status` until sub-exploration completes
4. Call `get_exploration_result` to retrieve health_check data
5. Verify health_check actually ran and returned valid data

## Output Requirements

All outputs to: `comms/outbox/exploration/nested-exploration-destructive-test/`

### Required Files

1. **README.md** - Summary with:
   - Did start_exploration accept allowed_mcp_tools=["health_check"]? (Expected: YES)
   - Did the sub-exploration start successfully? (Expected: YES)
   - Did health_check execute successfully? (Expected: YES)
   - Key metrics from health_check response (version, tool count, etc.)

2. **validation-test.md** - Detailed results:
   - start_exploration call response (should show success)
   - Sub-exploration execution status timeline
   - Full health_check response from sub-exploration
   - Any authorization-related messages

3. **findings.md** - Analysis:
   - Does BL-330 two-tier access model work correctly for destructive targets?
   - Are non-exploration tools properly ALLOWED on destructive_test_target=true?
   - Comparison with non-destructive project behavior

## Expected Behavior (Based on BL-330)

According to BL-330:
- Destructive test targets CAN authorize any MCP tools via allowed_mcp_tools
- allowed_mcp_tools=["health_check"] should be accepted
- Sub-exploration should run health_check successfully
- No authorization errors expected

## Commit Instructions

```bash
git add comms/outbox/exploration/nested-exploration-destructive-test/
git commit -m "exploration: test nested exploration on destructive test target

- Spawn sub-exploration with health_check in allowed_mcp_tools
- Verify destructive test targets allow non-exploration tools
- Confirm health_check executes successfully with proper authorization"
git push origin main
```

## Success Criteria

- [ ] start_exploration accepted allowed_mcp_tools=["health_check"]
- [ ] Sub-exploration started without validation errors
- [ ] health_check executed and returned valid data
- [ ] Findings confirm BL-330 implementation works for destructive targets
- [ ] All files committed and pushed