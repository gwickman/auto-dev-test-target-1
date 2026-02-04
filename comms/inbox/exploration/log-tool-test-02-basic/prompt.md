**Objective**: Use the get_server_logs tool to investigate what caused the v048 execution failure.

**Task**: Use the get_server_logs tool with basic parameters to understand the failure:
1. Use get_server_logs with source='mcp' to get recent MCP server logs
2. Use get_server_logs with source='cli' to get Claude Code execution logs
3. Use get_server_logs with source='all' for merged view
4. Look for ERROR level messages around the failure time (Feb 4, 2026 07:03-10:20)
5. Document what you find and any issues with using the tool

**Output Requirements**:
- Output path: comms/outbox/exploration/log-tool-test-02-basic/
- Create README.md with:
  - What logs you retrieved
  - How easy/hard it was to use the tool
  - What you discovered about the failure
  - Any limitations or confusion when using get_server_logs

**Commit Instructions**:
Commit all outputs with message: "Exploration: Log tool test 02 - Basic log inspection"