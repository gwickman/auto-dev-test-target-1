# Project Backlog

*Last updated: 2026-02-15 01:19*

**Total completed:** 7 | **Cancelled:** 0

## Priority Summary

| Priority | Name | Count |
|----------|------|-------|
| P0 | Critical | 4 |
| P1 | High | 7 |
| P2 | Medium | 21 |
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
| <a id="bl-039-ref"></a>[BL-039](#bl-039) | P1 | m | Add Windows bash /dev/null guidance to AGENTS.md and nul to .gitignore | Add Windows bash null redirect guidance to AGENTS.md and ... |
| <a id="bl-040-ref"></a>[BL-040](#bl-040) | P1 | l | Add PR vs BL routing guidance to AGENTS.md (auto-dev-test-target-1) | AGENTS.md in the auto-dev-test-target-1 project lists bot... |
| <a id="bl-041-ref"></a>[BL-041](#bl-041) | P1 | l | Add WebFetch safety rules to AGENTS.md | Mirror of auto-dev-mcp BL-517. Add WebFetch safety block ... |
| <a id="bl-011-ref"></a>[BL-011](#bl-011) | P2 | l | Add regex search mode to get_server_logs | Search parameter only supports literal string matching, l... |
| <a id="bl-012-ref"></a>[BL-012](#bl-012) | P2 | l | Support multiple values per filter parameter in get_server_logs | Current filters only accept single values, requiring mult... |
| <a id="bl-013-ref"></a>[BL-013](#bl-013) | P2 | xl | Add request correlation IDs for tracking multi-step operations | No mechanism to group related requests together. Multi-st... |
| <a id="bl-014-ref"></a>[BL-014](#bl-014) | P2 | xl | Implement pagination for large log result sets in get_server_logs | Large result sets hit token limits at lines=500. No pagin... |
| <a id="bl-015-ref"></a>[BL-015](#bl-015) | P2 | xs | Updated Test Item | New description |
| <a id="bl-016-ref"></a>[BL-016](#bl-016) | P2 | xs | Item for Soft Delete | This is a test backlog item that will be soft-deleted to ... |
| <a id="bl-017-ref"></a>[BL-017](#bl-017) | P2 | xs | Item for Hard Delete | This is a test backlog item that will be hard-deleted to ... |
| <a id="bl-025-ref"></a>[BL-025](#bl-025) | P2 | m | Add pick() object utility | Create a pick() function that creates a new object with o... |
| <a id="bl-026-ref"></a>[BL-026](#bl-026) | P2 | m | Add omit() object utility | Create an omit() function that creates a new object exclu... |
| <a id="bl-027-ref"></a>[BL-027](#bl-027) | P2 | m | Add isEmpty() utility | Create an isEmpty() function that checks if a value is em... |
| <a id="bl-028-ref"></a>[BL-028](#bl-028) | P2 | m | Add keys() object utility | Create a keys() function that returns an array of object ... |
| <a id="bl-029-ref"></a>[BL-029](#bl-029) | P2 | m | Add merge() object utility | Create a merge() function that performs a deep merge of m... |
| <a id="bl-030-ref"></a>[BL-030](#bl-030) | P2 | m | Add clone() object utility | Create a clone() function that creates a deep copy of an ... |
| <a id="bl-031-ref"></a>[BL-031](#bl-031) | P2 | m | Add get() nested property utility | Create a get() function that safely retrieves nested prop... |
| <a id="bl-032-ref"></a>[BL-032](#bl-032) | P2 | m | Add sleep() utility | Create a sleep() function that returns a promise that res... |
| <a id="bl-033-ref"></a>[BL-033](#bl-033) | P2 | m | Add retry() utility | Create a retry() function that retries an async function ... |
| <a id="bl-034-ref"></a>[BL-034](#bl-034) | P2 | m | Add timeout() utility | Create a timeout() function that wraps a promise and reje... |
| <a id="bl-035-ref"></a>[BL-035](#bl-035) | P2 | m | Add debounce() utility | Create a debounce() function that delays invoking a funct... |
| <a id="bl-036-ref"></a>[BL-036](#bl-036) | P2 | m | Add throttle() utility | Create a throttle() function that ensures a function is o... |
| <a id="bl-037-ref"></a>[BL-037](#bl-037) | P2 | m | Add once() utility | Create a once() function that wraps a function to ensure ... |
| <a id="bl-038-ref"></a>[BL-038](#bl-038) | P2 | l | Create initial architecture documentation | No architecture documentation exists for the project. As ... |
| <a id="bl-001-ref"></a>[BL-001](#bl-001) | P3 | s | Test backlog item for MCP testing | This is a test backlog item created during MCP tool testing. |
| <a id="bl-002-ref"></a>[BL-002](#bl-002) | P3 | s | Test backlog item for MCP testing | This is a test backlog item created during MCP tool testing. |

## Tags Summary

| Tag | Count | Items |
|-----|-------|-------|
| utility | 13 | BL-025, BL-026, BL-027, BL-028, ... |
| logger | 12 | BL-003, BL-004, BL-005, BL-006, ... |
| v005 | 7 | BL-025, BL-026, BL-027, BL-028, ... |
| v006 | 6 | BL-032, BL-033, BL-034, BL-035, ... |
| object-basics | 4 | BL-025, BL-026, BL-027, BL-028 |
| object-deep | 3 | BL-029, BL-030, BL-031 |
| promise-utils | 3 | BL-032, BL-033, BL-034 |
| function-utils | 3 | BL-035, BL-036, BL-037 |
| agents-md | 3 | BL-039, BL-040, BL-041 |
| test | 2 | BL-001, BL-002 |
| mcp-testing | 2 | BL-001, BL-002 |
| documentation | 2 | BL-038, BL-040 |
| architecture | 1 | BL-038 |
| windows | 1 | BL-039 |
| gitignore | 1 | BL-039 |
| product-requests | 1 | BL-040 |
| decision-framework | 1 | BL-040 |
| webfetch | 1 | BL-041 |
| safety | 1 | BL-041 |
| hang-prevention | 1 | BL-041 |

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

#### 📋 BL-039: Add Windows bash /dev/null guidance to AGENTS.md and nul to .gitignore

**Status:** open
**Tags:** windows, agents-md, gitignore

Add Windows bash null redirect guidance to AGENTS.md and add `nul` to .gitignore. In bash contexts on Windows: Always use `/dev/null` for output redirection (Git Bash correctly translates this to the Windows null device). Never use bare `nul` which gets interpreted as a literal filename in MSYS/Git Bash environments. Correct: `command > /dev/null 2>&1`. Wrong: `command > nul 2>&1`.

**Use Case:** This feature addresses: Add Windows bash /dev/null guidance to AGENTS.md and nul to .gitignore. It improves the system by resolving the described requirement.

[↑ Back to list](#bl-039-ref)

#### 📋 BL-040: Add PR vs BL routing guidance to AGENTS.md (auto-dev-test-target-1)

**Status:** open
**Tags:** agents-md, product-requests, documentation, decision-framework

AGENTS.md in the auto-dev-test-target-1 project lists both add_product_request and add_backlog_item in the tool inventory but provides no guidance on when to use which. Claude Code sessions following AGENTS.md have no routing guidance for capturing ideas vs filing structured bugs.

The exploration pr-vs-bl-guidance on auto-dev-mcp (Gap 4) identified that AGENTS.md across all managed projects has zero PR vs BL routing guidance. Since AGENTS.md is the first document Claude Code reads in every session, it is the highest-leverage location for this guidance.

Without this, Claude Code defaults to add_backlog_item for all discoveries, bypassing the lightweight product request pathway entirely.

**Use Case:** During any Claude Code session on auto-dev-test-target-1, the agent reads AGENTS.md first. When it discovers an improvement opportunity mid-implementation, it currently has no guidance on whether to file a PR or BL. With this change, AGENTS.md tells it to default to product requests for ideas and reserve backlog items for structured problems.

**Acceptance Criteria:**
- [ ] AGENTS.md contains a section documenting when to create a Product Request vs a Backlog Item
- [ ] Section includes the maturity gradient: PR for ideas/observations, BL for structured problems with acceptance criteria
- [ ] Section includes the default rule: when in doubt, start with a Product Request
- [ ] Section cross-references add_product_request and add_backlog_item tool_help for detailed guidance

**Notes:** Mirror of BL-510 (auto-dev-mcp). Keep the AGENTS.md addition concise — 3-5 lines max. Content should be identical across all managed projects for consistency.

[↑ Back to list](#bl-040-ref)

#### 📋 BL-041: Add WebFetch safety rules to AGENTS.md

**Status:** open
**Tags:** agents-md, webfetch, safety, hang-prevention

Mirror of auto-dev-mcp BL-517. Add WebFetch safety block to AGENTS.md. Exact text:

## WebFetch Safety (mandatory)
- NEVER WebFetch a URL you generated from memory — only WebFetch URLs returned by WebSearch
- Prefer WebSearch over WebFetch for research
- MANDATORY: Before every WebFetch call you MUST run: curl -sL --max-time 10 -o /dev/null -w "%{http_code}" &lt;url&gt; and ONLY proceed with WebFetch if curl returns 2xx/3xx

**Use Case:** Same as BL-517: prevent WebFetch hangs from freezing sessions by requiring URL verification before every WebFetch call.

**Acceptance Criteria:**
- [ ] AGENTS.md contains a '## WebFetch Safety (mandatory)' section with all 3 rules verbatim
- [ ] The section is placed near top-level instructions, not buried at the end
- [ ] No other changes to AGENTS.md beyond the insertion

[↑ Back to list](#bl-041-ref)

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

#### 📋 BL-015: Updated Test Item

**Status:** open

New description

**Use Case:** This feature addresses: Updated Test Item. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] First criterion
- [ ] Second criterion

[↑ Back to list](#bl-015-ref)

#### 📋 BL-016: Item for Soft Delete

**Status:** open

This is a test backlog item that will be soft-deleted to verify soft delete functionality.

**Use Case:** This feature addresses: Item for Soft Delete. It improves the system by resolving the described requirement.

[↑ Back to list](#bl-016-ref)

#### 📋 BL-017: Item for Hard Delete

**Status:** open

This is a test backlog item that will be hard-deleted to verify hard delete functionality.

**Use Case:** This feature addresses: Item for Hard Delete. It improves the system by resolving the described requirement.

[↑ Back to list](#bl-017-ref)

#### 📋 BL-025: Add pick() object utility

**Status:** open
**Tags:** v005, object-basics, utility

Create a pick() function that creates a new object with only the specified keys from the source object. Should preserve types using TypeScript generics.

**Use Case:** This feature addresses: Add pick() object utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
- [ ] Returns new object with selected properties
- [ ] Handles empty keys array
- [ ] Has comprehensive tests
- [ ] Preserves types correctly

[↑ Back to list](#bl-025-ref)

#### 📋 BL-026: Add omit() object utility

**Status:** open
**Tags:** v005, object-basics, utility

Create an omit() function that creates a new object excluding the specified keys from the source object. Complement to pick().

**Use Case:** This feature addresses: Add omit() object utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
- [ ] Returns new object without excluded properties
- [ ] Handles empty keys array
- [ ] Has comprehensive tests
- [ ] Preserves types correctly

[↑ Back to list](#bl-026-ref)

#### 📋 BL-027: Add isEmpty() utility

**Status:** open
**Tags:** v005, object-basics, utility

Create an isEmpty() function that checks if a value is empty (empty object, array, string, null, or undefined). Handles multiple types.

**Use Case:** This feature addresses: Add isEmpty() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: isEmpty(value: unknown): boolean
- [ ] Returns true for {}, [], '', null, undefined
- [ ] Returns false for non-empty values
- [ ] Has comprehensive tests
- [ ] Handles edge cases

[↑ Back to list](#bl-027-ref)

#### 📋 BL-028: Add keys() object utility

**Status:** open
**Tags:** v005, object-basics, utility

Create a keys() function that returns an array of object keys with proper typing. Wrapper around Object.keys() with better TypeScript support.

**Use Case:** This feature addresses: Add keys() object utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: keys<T extends object>(obj: T): (keyof T)[]
- [ ] Returns typed array of keys
- [ ] Has comprehensive tests
- [ ] Better types than Object.keys()

[↑ Back to list](#bl-028-ref)

#### 📋 BL-029: Add merge() object utility

**Status:** open
**Tags:** v005, object-deep, utility

Create a merge() function that performs a deep merge of multiple objects. Later sources override earlier ones. Handles nested objects recursively.

**Use Case:** This feature addresses: Add merge() object utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: merge<T>(target: T, ...sources: Partial<T>[]): T
- [ ] Deep merges nested objects
- [ ] Later sources override earlier
- [ ] Handles arrays appropriately
- [ ] Has comprehensive tests with nested objects

[↑ Back to list](#bl-029-ref)

#### 📋 BL-030: Add clone() object utility

**Status:** open
**Tags:** v005, object-deep, utility

Create a clone() function that creates a deep copy of an object. Handles nested objects and arrays but not functions or special objects.

**Use Case:** This feature addresses: Add clone() object utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: clone<T>(obj: T): T
- [ ] Creates deep copy of object
- [ ] Handles nested objects and arrays
- [ ] Has comprehensive tests
- [ ] Validates input is cloneable

[↑ Back to list](#bl-030-ref)

#### 📋 BL-031: Add get() nested property utility

**Status:** open
**Tags:** v005, object-deep, utility

Create a get() function that safely retrieves nested property values using a path string (e.g., 'user.address.city'). Returns undefined if path doesn't exist.

**Use Case:** This feature addresses: Add get() nested property utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: get<T>(obj: any, path: string): T | undefined
- [ ] Supports dot notation paths
- [ ] Returns undefined for missing paths
- [ ] Handles arrays in path
- [ ] Has comprehensive tests

[↑ Back to list](#bl-031-ref)

#### 📋 BL-032: Add sleep() utility

**Status:** open
**Tags:** v006, promise-utils, utility

Create a sleep() function that returns a promise that resolves after a specified delay in milliseconds. Useful for testing and rate limiting.

**Use Case:** This feature addresses: Add sleep() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: sleep(ms: number): Promise<void>
- [ ] Validates ms is non-negative
- [ ] Returns promise that resolves after delay
- [ ] Has comprehensive tests
- [ ] Handles edge cases

[↑ Back to list](#bl-032-ref)

#### 📋 BL-033: Add retry() utility

**Status:** open
**Tags:** v006, promise-utils, utility

Create a retry() function that retries an async function a specified number of times if it fails. Returns the result on success or throws the last error.

**Use Case:** This feature addresses: Add retry() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: retry<T>(fn: () => Promise<T>, attempts: number): Promise<T>
- [ ] Retries specified number of times
- [ ] Returns result on success
- [ ] Throws last error after all attempts fail
- [ ] Has comprehensive tests with async functions

[↑ Back to list](#bl-033-ref)

#### 📋 BL-034: Add timeout() utility

**Status:** open
**Tags:** v006, promise-utils, utility

Create a timeout() function that wraps a promise and rejects if it doesn't resolve within a specified time limit. Useful for preventing hanging operations.

**Use Case:** This feature addresses: Add timeout() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: timeout<T>(promise: Promise<T>, ms: number): Promise<T>
- [ ] Rejects with timeout error if time exceeded
- [ ] Resolves with promise result if within time
- [ ] Validates ms is positive
- [ ] Has comprehensive tests

[↑ Back to list](#bl-034-ref)

#### 📋 BL-035: Add debounce() utility

**Status:** open
**Tags:** v006, function-utils, utility

Create a debounce() function that delays invoking a function until after a specified time has elapsed since the last call. Useful for rate limiting event handlers.

**Use Case:** This feature addresses: Add debounce() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T
- [ ] Delays execution until ms after last call
- [ ] Handles multiple rapid calls correctly
- [ ] Validates ms is non-negative
- [ ] Has comprehensive tests

[↑ Back to list](#bl-035-ref)

#### 📋 BL-036: Add throttle() utility

**Status:** open
**Tags:** v006, function-utils, utility

Create a throttle() function that ensures a function is only called at most once per specified time period. Useful for rate limiting high-frequency events.

**Use Case:** This feature addresses: Add throttle() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: throttle<T extends (...args: any[]) => any>(fn: T, ms: number): T
- [ ] Limits invocations to once per ms
- [ ] Executes immediately on first call
- [ ] Validates ms is positive
- [ ] Has comprehensive tests

[↑ Back to list](#bl-036-ref)

#### 📋 BL-037: Add once() utility

**Status:** open
**Tags:** v006, function-utils, utility

Create a once() function that wraps a function to ensure it can only be called once. Subsequent calls return the cached result from the first call.

**Use Case:** This feature addresses: Add once() utility. It improves the system by resolving the described requirement.

**Acceptance Criteria:**
- [ ] Function signature: once<T extends (...args: any[]) => any>(fn: T): T
- [ ] Only executes fn once
- [ ] Returns cached result on subsequent calls
- [ ] Preserves function signature
- [ ] Has comprehensive tests

[↑ Back to list](#bl-037-ref)

#### 📋 BL-038: Create initial architecture documentation

**Status:** open
**Tags:** architecture, documentation

No architecture documentation exists for the project. As of v004, the project has 4 modules (string, number, validation/errors, array) with established patterns (module-per-domain, barrel exports, validation-at-boundary). Initial C4 and/or ARCHITECTURE.md documentation should be created to guide future version design and verify alignment.

**Use Case:** This feature addresses: Create initial architecture documentation. It improves the system by providing a reference for future version design.

**Acceptance Criteria:**
- [ ] ARCHITECTURE.md or C4 documentation exists
- [ ] Documents all 4 existing modules and their relationships
- [ ] Documents established patterns (module-per-domain, barrel exports, validation-at-boundary)

**Notes:** Created during v004 retrospective. Architecture task 005 identified this gap.

[↑ Back to list](#bl-038-ref)

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
