# MCP Tool Testing Learning

This learning documents key insights from systematic testing of auto-dev-mcp MCP tools.

## Key Findings

1. **Git Operations**: The git_read tool supports 10 different operations including status, branches, PRs, and CI workflows. However, the pr_checks operation has a bug where it tries to access a 'conclusion' field that doesn't exist in the GitHub API response.

2. **Exploration Tools**: The async exploration workflow (start → poll → retrieve) works smoothly with proper status tracking and automatic git commits.

3. **Document Exchange**: The read_document tool handles pagination well with clear offset/limit parameters and has_more flags.

## Recommendations

- Fix git_read pr_checks to use 'state' field instead of 'conclusion'
- Document the async pattern for long-running operations (explorations, executions, completion reports)
