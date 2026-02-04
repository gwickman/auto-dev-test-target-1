# Project Backlog

*Last updated: 2026-02-04 11:35*

**Total completed:** 0 | **Cancelled:** 0

## Priority Summary

| Priority | Name | Count |
|----------|------|-------|
| P0 | Critical | 4 |
| P1 | High | 4 |
| P2 | Medium | 4 |
| P3 | Low | 2 |

## Quick Reference

| ID | Pri | Size | Title | Description |
|----|-----|------|-------|-------------|
| <a id="bl-003-ref"></a>[BL-003](#bl-003) | P0 | l | Document token limits for get_server_logs lines parameter | The get_server_logs tool hits token limits at lines=500 (... |
| <a id="bl-004-ref"></a>[BL-004](#bl-004) | P0 | l | Fix or remove broken session_id filtering in get_server_logs | The session_id filter parameter exists but is completely ... |
| <a id="bl-005-ref"></a>[BL-005](#bl-005) | P0 | l | Add tool_help documentation for get_server_logs | Calling tool_help('get_server_logs') returns "No help res... |
| <a id="bl-006-ref"></a>[BL-006](#bl-006) | P0 | l | Document case-sensitive search behavior in get_server_logs | The search parameter in get_server_logs is case-sensitive... |
| <a id="bl-007-ref"></a>[BL-007](#bl-007) | P1 | l | Add logger discovery mechanism for get_server_logs | Users must query logs first to discover available logger ... |
| <a id="bl-008-ref"></a>[BL-008](#bl-008) | P1 | l | Implement case-insensitive search option for get_server_logs | Search parameter is case-sensitive only, which limits usa... |
| <a id="bl-009-ref"></a>[BL-009](#bl-009) | P1 | l | Add execution_id filtering for CLI logs in get_server_logs | CLI logs use execution_id for tracking but there's no exe... |
| <a id="bl-010-ref"></a>[BL-010](#bl-010) | P1 | xl | Improve log level classification - validation failures should be ERROR not WARNING | Critical validation failures are logged at WARNING level ... |
| <a id="bl-011-ref"></a>[BL-011](#bl-011) | P2 | l | Add regex search mode to get_server_logs | Search parameter only supports literal string matching, l... |
| <a id="bl-012-ref"></a>[BL-012](#bl-012) | P2 | l | Support multiple values per filter parameter in get_server_logs | Current filters only accept single values, requiring mult... |
| <a id="bl-013-ref"></a>[BL-013](#bl-013) | P2 | xl | Add request correlation IDs for tracking multi-step operations | No mechanism to group related requests together. Multi-st... |
| <a id="bl-014-ref"></a>[BL-014](#bl-014) | P2 | xl | Implement pagination for large log result sets in get_server_logs | Large result sets hit token limits at lines=500. No pagin... |
| <a id="bl-001-ref"></a>[BL-001](#bl-001) | P3 | s | Test backlog item for MCP testing | This is a test backlog item created during MCP tool testing. |
| <a id="bl-002-ref"></a>[BL-002](#bl-002) | P3 | s | Test backlog item for MCP testing | This is a test backlog item created during MCP tool testing. |

## Tags Summary

| Tag | Count | Items |
|-----|-------|-------|
| logger | 12 | BL-003, BL-004, BL-005, BL-006, ... |
| test | 2 | BL-001, BL-002 |
| mcp-testing | 2 | BL-001, BL-002 |

## Item Details

### P0: Critical

#### 📋 BL-003: Document token limits for get_server_logs lines parameter

**Status:** open
**Tags:** logger

The get_server_logs tool hits token limits at lines=500 (160K characters), causing results to be saved to file instead of returned. Users need clear guidance on safe line count ranges.

Current behavior:
- lines=100 works well
- lines=500 causes overflow

Needed:
- Document safe range (50-200 lines recommended)
- Add warning in tool description about token limits
- Explain file output behavior when limits exceeded

**Use Case:** This feature addresses: Document token limits for get_server_logs lines parameter. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Tool help documentation includes safe line count guidance
- [ ] Warning about token limits at 500+ lines documented
- [ ] File output fallback behavior explained

[↑ Back to list](#bl-003-ref)

#### 📋 BL-004: Fix or remove broken session_id filtering in get_server_logs

**Status:** open
**Tags:** logger

The session_id filter parameter exists but is completely non-functional. Testing shows it returns 0 results in all cases because:

- Server operates in 'stateless mode'
- All logs show 'Terminating session: None'
- No actual session IDs are assigned
- session_id only appears in message text, not as structured field

Options:
1. Implement actual session tracking (assign IDs, maintain state)
2. Remove the parameter entirely to avoid confusion

Current state creates false expectations that session tracking exists.

**Use Case:** This feature addresses: Fix or remove broken session_id filtering in get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] session_id parameter either works correctly or is removed
- [ ] If implemented: sessions are actually tracked with IDs
- [ ] If removed: parameter removed from tool signature and docs updated

[↑ Back to list](#bl-004-ref)

#### 📋 BL-005: Add tool_help documentation for get_server_logs

**Status:** open
**Tags:** logger

Calling tool_help('get_server_logs') returns "No help resources for 'get_server_logs'". This leaves users without guidance on:

- Parameter descriptions and valid values
- Filter behavior (AND vs OR logic)
- Default values and rationale
- Output format specification
- Search case sensitivity
- Valid log levels
- Logger name matching behavior
- Error handling
- Performance characteristics

Need comprehensive tool_help documentation covering all aspects of the tool.

**Use Case:** This feature addresses: Add tool_help documentation for get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] tool_help('get_server_logs') returns comprehensive documentation
- [ ] Includes parameter reference with types and valid values
- [ ] Documents filter behavior (AND logic, case sensitivity)
- [ ] Includes usage examples for common scenarios
- [ ] Documents output format and error codes

[↑ Back to list](#bl-005-ref)

#### 📋 BL-006: Document case-sensitive search behavior in get_server_logs

**Status:** open
**Tags:** logger

The search parameter in get_server_logs is case-sensitive but this is not documented. Users get unexpected empty results.

Example:
- search='error' returns 0 results
- search='ERROR' would find actual errors

This undocumented behavior wastes debugging time as users don't understand why their searches fail.

Need to:
1. Document case sensitivity clearly in tool_help
2. Add examples showing case-sensitive matching
3. Consider adding optional case_insensitive flag

**Use Case:** This feature addresses: Document case-sensitive search behavior in get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Documentation explicitly states search is case-sensitive
- [ ] Examples show case-sensitive behavior
- [ ] Consider adding case_insensitive parameter option

[↑ Back to list](#bl-006-ref)

### P1: High

#### 📋 BL-007: Add logger discovery mechanism for get_server_logs

**Status:** open
**Tags:** logger

Users must query logs first to discover available logger names before they can filter effectively. There's no built-in mechanism to see what loggers exist.

Common loggers found in testing:
- auto_dev_mcp.middleware.tracing
- auto_dev_mcp.middleware.auth
- mcp.server.lowlevel.server
- sse_starlette.sse

Options to solve:
1. Add list_loggers operation/parameter to get_server_logs
2. Document common logger names in tool_help
3. Create separate tool for logger discovery
4. Add auto-completion hints

Logger discovery would greatly improve usability by helping users construct effective queries without trial and error.

**Use Case:** This feature addresses: Add logger discovery mechanism for get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Users can discover available logger names without querying all logs
- [ ] Could be a separate tool, parameter, or documentation
- [ ] Includes descriptions of what each logger tracks

[↑ Back to list](#bl-007-ref)

#### 📋 BL-008: Implement case-insensitive search option for get_server_logs

**Status:** open
**Tags:** logger

Search parameter is case-sensitive only, which limits usability. Users searching for 'error' miss 'ERROR' logs, 'warning' misses 'WARNING', etc.

Current behavior:
- search='error' → 0 results
- search='ERROR' → finds actual errors
- No way to search case-insensitively

Proposed:
Add case_insensitive parameter (default: False for backward compatibility)

Example usage:
get_server_logs(search='error', case_insensitive=True)
→ matches 'error', 'Error', 'ERROR', etc.

This would make the tool more user-friendly for typical debugging scenarios.

**Use Case:** This feature addresses: Implement case-insensitive search option for get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Add case_insensitive boolean parameter to get_server_logs
- [ ] When true, search matches case-insensitively
- [ ] Document the new parameter in tool_help
- [ ] Update examples to show both modes

[↑ Back to list](#bl-008-ref)

#### 📋 BL-009: Add execution_id filtering for CLI logs in get_server_logs

**Status:** open
**Tags:** logger

CLI logs use execution_id for tracking but there's no execution_id filter parameter. CLI logs have request_id: '-' (placeholder) making them hard to filter.

Current state:
- MCP logs: request_id works (8-char hex IDs)
- CLI logs: request_id is '-', execution_id in message text only

This creates tracking asymmetry between MCP and CLI operations.

Needed:
1. Add execution_id parameter to get_server_logs
2. Enable filtering CLI logs by execution ID
3. Consider populating request_id in CLI logs with unique IDs
4. Document the difference between request_id and execution_id

This would enable consistent tracking across both MCP API calls and CLI executions.

**Use Case:** This feature addresses: Add execution_id filtering for CLI logs in get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Add execution_id parameter to get_server_logs
- [ ] Filter CLI logs by execution ID
- [ ] Document in tool_help with examples
- [ ] Consider unified ID strategy for MCP and CLI logs

[↑ Back to list](#bl-009-ref)

#### 📋 BL-010: Improve log level classification - validation failures should be ERROR not WARNING

**Status:** open
**Tags:** logger

Critical validation failures are logged at WARNING level instead of ERROR level, making them harder to discover during debugging.

Example from testing:
- 'VALIDATION completion count mismatch for v048' logged as WARNING
- This is a critical failure that prevented version execution
- Searching for ERROR level logs missed this entirely

Impact:
- Users filter for ERROR level expecting to find failures
- Critical issues logged as WARNING are invisible
- Wastes debugging time

Recommendation:
1. Log validation failures at ERROR level
2. Review all WARNING logs for misclassified issues
3. Establish clear guidelines for ERROR vs WARNING distinction

ERROR should indicate: system failures, data corruption, execution blocks
WARNING should indicate: recoverable issues, deprecations, suspicious but non-blocking conditions

**Use Case:** This feature addresses: Improve log level classification - validation failures should be ERROR not WARNING. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Validation failures logged at ERROR level instead of WARNING
- [ ] Review all WARNING logs for critical issues that should be ERROR
- [ ] Update logging guidelines to clarify ERROR vs WARNING usage

[↑ Back to list](#bl-010-ref)

### P2: Medium

#### 📋 BL-011: Add regex search mode to get_server_logs

**Status:** open
**Tags:** logger

Search parameter only supports literal string matching, limiting advanced queries.

Use cases that don't work:
- Pattern matching: search='request.*timeout'
- Multiple terms: search='(error|warning|failure)'
- Word boundaries: search='\berror\b'
- Complex patterns: search='v\d{3}.*failed'

Current workaround: Multiple separate queries

Proposed:
Add regex_mode parameter (default: False)

Example:
get_server_logs(search='request.*timeout', regex_mode=True)
get_server_logs(search='(ERROR|WARN)', regex_mode=True)

Benefits:
- Reduce number of queries needed
- Enable complex pattern matching
- Better for exploratory debugging

Keep literal mode as default for simplicity and performance.

**Use Case:** This feature addresses: Add regex search mode to get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Add regex_mode boolean parameter
- [ ] When true, search treats pattern as regex
- [ ] Document regex syntax and examples
- [ ] Provide clear error messages for invalid regex

[↑ Back to list](#bl-011-ref)

#### 📋 BL-012: Support multiple values per filter parameter in get_server_logs

**Status:** open
**Tags:** logger

Current filters only accept single values, requiring multiple queries to see different levels or loggers together.

Current limitation:
- To see both INFO and ERROR: need 2 queries
- To see logs from 3 different loggers: need 3 queries
- Can't combine related severity levels

Proposed enhancement:
Support array values for level and logger parameters

Examples:
get_server_logs(level=['INFO', 'ERROR'])
→ Returns both INFO and ERROR logs (OR logic)

get_server_logs(logger=['auto_dev_mcp.middleware.auth', 'auto_dev_mcp.middleware.tracing'])
→ Returns logs from both loggers

Benefits:
- Reduce query count
- More flexible filtering
- Better for overview debugging

Implementation note: Within a parameter use OR logic, between parameters use AND logic.

**Use Case:** This feature addresses: Support multiple values per filter parameter in get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Parameters accept array values for multi-value filtering
- [ ] level parameter accepts list: ['INFO', 'ERROR']
- [ ] logger parameter accepts list of logger names
- [ ] Document OR logic for multi-value parameters
- [ ] Update examples showing multi-value usage

[↑ Back to list](#bl-012-ref)

#### 📋 BL-013: Add request correlation IDs for tracking multi-step operations

**Status:** open
**Tags:** logger

No mechanism to group related requests together. Multi-step operations (like explorations) can't be tracked as a unit.

Current limitation:
- Exploration creates multiple MCP requests
- Each has different request_id
- No way to see 'all logs for exploration X'
- Manual correlation required

Use cases that need correlation:
- Track all requests in an exploration
- Group requests in a version execution
- Follow multi-step operations across services
- Debug complex workflows

Proposed:
Add correlation_id concept:
- Assign to related operations (exploration_id, version_execution_id)
- Propagate through request chains
- Add correlation_id filter parameter

Example:
get_server_logs(correlation_id='log-tool-test-01-context-1770202289468')
→ Returns all logs for that exploration

Benefits:
- Better visibility into complex operations
- Easier debugging of multi-request workflows
- Clear request relationships

**Use Case:** This feature addresses: Add request correlation IDs for tracking multi-step operations. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Add correlation_id parameter to get_server_logs
- [ ] System assigns correlation IDs to related requests
- [ ] Document correlation ID strategy
- [ ] Examples show tracking multi-step operations

[↑ Back to list](#bl-013-ref)

#### 📋 BL-014: Implement pagination for large log result sets in get_server_logs

**Status:** open
**Tags:** logger

Large result sets hit token limits at lines=500. No pagination support means users can't access more than ~100-200 logs per query.

Current limitation:
- lines=500 causes token overflow (160K chars)
- Results saved to file instead of returned
- No way to page through large result sets
- Can't safely query thousands of logs

Testing showed:
- lines=100 works well
- lines=500 overflows
- No offset parameter to get next page

Proposed:
Add pagination support:

get_server_logs(limit=100, offset=0)  # First 100
get_server_logs(limit=100, offset=100)  # Next 100
get_server_logs(limit=100, offset=200)  # Next 100

Response includes:
- total_count: Total matching logs
- returned_count: Logs in this response
- has_more: Boolean if more results exist

Benefits:
- Access unlimited logs in chunks
- No token limit issues
- Standard pagination UX
- Better for large datasets

**Use Case:** This feature addresses: Implement pagination for large log result sets in get_server_logs. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Add offset parameter for pagination
- [ ] Add limit parameter (alias for lines)
- [ ] Response includes total_count and has_more fields
- [ ] Document pagination patterns with examples
- [ ] Support querying thousands of logs safely

[↑ Back to list](#bl-014-ref)

### P3: Low

#### 🔄 BL-001: Test backlog item for MCP testing

**Status:** in-progress
**Tags:** test, mcp-testing

This is a test backlog item created during MCP tool testing.

**Use Case:** This feature addresses: Test backlog item for MCP testing. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Item can be created
- [ ] Item can be retrieved
- [ ] Item can be updated

**Notes:** Updated during MCP testing

[↑ Back to list](#bl-001-ref)

#### 🔄 BL-002: Test backlog item for MCP testing

**Status:** in-progress
**Tags:** test, mcp-testing

This is a test backlog item created during MCP tool testing.

**Use Case:** This feature addresses: Test backlog item for MCP testing. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Item can be created
- [ ] Item can be retrieved
- [ ] Item can be updated

**Notes:** Updated during MCP testing

[↑ Back to list](#bl-002-ref)
