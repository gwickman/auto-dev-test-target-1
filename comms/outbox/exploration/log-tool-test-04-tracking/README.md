# Log Tool Test 04 - Session and Request Tracking

## Executive Summary

This exploration tested the `session_id` and `request_id` filtering capabilities in the `get_server_logs` tool. The findings show that:

- **request_id filtering works perfectly** - enables complete request flow tracking
- **session_id filtering has critical limitations** - the field exists but is rarely populated
- **Tracking flows is possible but limited** - only via request_id, not session_id

## How session_id and request_id Filtering Works

### request_id Filtering

The `get_server_logs` tool supports filtering by `request_id` parameter:

```python
get_server_logs(request_id="850ddc09")
```

**How it works:**
- Returns all log entries that have the specified `request_id` field value
- Works across both MCP and CLI log sources
- Provides chronological ordering of all events for that request

**Example output:**
```
14 log entries returned for request_id="850ddc09"
- Shows complete request lifecycle
- From initial POST request to final response
- Includes timing information (17.0ms total)
```

### session_id Filtering

The `get_server_logs` tool also accepts a `session_id` parameter:

```python
get_server_logs(session_id="test-session-123")
```

**How it works (in theory):**
- Should return all log entries with the specified `session_id` field value
- Should enable tracking of entire sessions across multiple requests

**Actual behavior:**
- Filtering by `session_id` returns **0 results** in all tested cases
- The `session_id` field is rarely populated as a structured field
- MCP logs show `"Terminating session: None"` for all requests
- CLI logs have `request_id: "-"` (placeholder)

## Examples of Tracking Flows

### Example 1: Tracking a Complete Request with request_id

**Request ID:** `850ddc09`
**Type:** ListToolsRequest
**Duration:** 17.0ms

```
Flow:
1. [10:52:15.438] --> POST http://127.0.0.1:8000/mcp
2. [10:52:15.438] Client IP: 127.0.0.1
3. [10:52:15.438] Path: /mcp
4. [10:52:15.438] Headers logged
5. [10:52:15.439] Query params logged
6. [10:52:15.439] API key authenticated
7. [10:52:15.441] requireToolKeys=True from URL parameter
8. [10:52:15.441] Stateless mode: Creating new transport
9. [10:52:15.449] Received message
10. [10:52:15.450] Processing request of type ListToolsRequest
11. [10:52:15.450] Dispatching request
12. [10:52:15.451] Response sent
13. [10:52:15.455] Terminating session: None
14. [10:52:15.455] <-- 200 (17.0ms)
```

**Observations:**
- Complete visibility into request processing
- Clear timing at each stage
- Shows authentication, transport creation, request processing, and response
- "Terminating session: None" indicates no session tracking

### Example 2: Tracking a CallToolRequest

**Request ID:** `85b69c89`
**Type:** CallToolRequest
**Duration:** 20.4ms

```
Flow shows similar pattern:
- Request received
- Authentication
- Transport creation (stateless mode)
- Message processing
- Tool dispatch
- Response sent
- Session termination (None)
```

### Example 3: Long-Running Git Operations

**Request ID:** `5a22acd2`
**Type:** Multiple git operations
**Duration:** ~2 seconds (includes network operations)

```
Flow includes:
- Git status checks
- File staging (git add -A)
- Commit creation
- Fetch from remote
- Push to origin (1.08s)
- State updates
```

This demonstrates that `request_id` effectively tracks even complex, multi-step operations.

### Example 4: Attempting to Track a Session

**Session ID:** `test-session-123` (found in CLI logs)
**Filter result:** 0 entries

The session_id appeared in a message:
```
"[CLI] execution_id=abc12345 session_id=test-session-123 model=claude-3-opus"
```

However, filtering by `session_id="test-session-123"` returned no results because:
- The session_id was in the message text, not a structured field
- The log entry's actual `request_id` field was "-" (placeholder)

## Issues with Tracking

### Critical Issues

1. **session_id field is not populated**
   - All MCP logs show `"Terminating session: None"`
   - The server appears to operate in "stateless mode"
   - No actual session IDs are assigned to requests
   - The `session_id` filter parameter is essentially non-functional

2. **session_id only appears in message text**
   - Found one instance in CLI logs where session_id appeared in the message
   - Not available as a structured field for filtering
   - Cannot be used for actual session tracking

3. **No concept of "sessions" in current implementation**
   - System uses "Stateless mode: Creating new transport for this request"
   - Each request is independent
   - No session continuity across requests

### Minor Issues

1. **CLI logs use placeholder request_id**
   - CLI logs have `request_id: "-"` instead of actual IDs
   - Makes tracking CLI executions harder
   - CLI execution tracking relies on `execution_id` in message text

2. **Inconsistent ID presence**
   - MCP logs: request_id always present (8-char hex)
   - CLI logs: request_id always "-"
   - This creates a split in tracking capabilities

3. **session_id in messages vs. fields**
   - When session_id appears, it's embedded in message strings
   - Not parseable by the filter mechanism
   - Requires text search instead of structured filtering

## How Useful These Filters Are in Practice

### request_id Filter: **Highly Useful** ✓

**Strengths:**
- Perfectly tracks individual request flows
- Shows complete lifecycle from start to finish
- Includes all intermediate steps and timing
- Works reliably for MCP server requests
- Essential for debugging specific API calls

**Use cases:**
- Debugging failed requests
- Performance analysis of specific operations
- Understanding request processing steps
- Tracking tool execution flows

**Limitations:**
- Only works for MCP logs, not CLI logs
- Cannot track across multiple related requests
- No way to group related requests into a session

### session_id Filter: **Not Useful** ✗

**Current state:**
- Does not work as intended
- Returns 0 results in all tested cases
- The field exists but is never populated
- System operates in stateless mode

**What would be needed:**
- Server must assign session IDs to requests
- Session IDs must be propagated through request chain
- Stateless mode must be changed to stateful mode
- Session lifecycle must be implemented

## Suggestions for Improvements

### High Priority

1. **Implement actual session tracking**
   ```
   Current: "Stateless mode: Creating new transport for this request"
   Proposed: "Session xyz123: Using existing transport"

   - Assign session IDs to connections
   - Maintain session context across requests
   - Populate the session_id field in logs
   ```

2. **Add execution_id filtering for CLI logs**
   ```
   - CLI logs use execution_id instead of request_id
   - Add an execution_id filter parameter
   - Enable filtering CLI logs by execution ID
   ```

3. **Add correlation IDs for related requests**
   ```
   - Allow grouping of related requests
   - Useful for tracking multi-step operations
   - E.g., "exploration_id" for all requests in an exploration
   ```

### Medium Priority

4. **Improve CLI log request_id handling**
   ```
   Current: request_id: "-"
   Proposed: request_id: unique ID per CLI invocation

   - Makes CLI logs filterable by request_id
   - Provides consistency with MCP logs
   ```

5. **Add combined session + request view**
   ```
   - Filter by session_id to see all requests in a session
   - Then drill down to specific request_id
   - Hierarchical navigation: session → request → log entry
   ```

6. **Add message text search within filtered results**
   ```
   get_server_logs(
       request_id="850ddc09",
       search="error"  # Search within this request's logs
   )
   ```

### Low Priority

7. **Add request relationship tracking**
   ```
   - Track parent/child request relationships
   - E.g., exploration spawns CLI execution
   - Show request trees instead of flat lists
   ```

8. **Session summary endpoints**
   ```
   - Get session metadata: start time, end time, request count
   - List all requests in a session
   - Session-level statistics
   ```

## Conclusion

The `request_id` filter is a powerful tool for tracking individual requests through the MCP server, providing complete visibility into request processing. However, the `session_id` filter is currently non-functional due to the server operating in stateless mode.

To enable true session tracking, the system would need to:
1. Implement stateful session management
2. Assign and propagate session IDs
3. Maintain session context across requests
4. Populate the session_id field in all log entries

Until these changes are made, request-level tracking via `request_id` remains the only viable approach for understanding request flows in the logs.
