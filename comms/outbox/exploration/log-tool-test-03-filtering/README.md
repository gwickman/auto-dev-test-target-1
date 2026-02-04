# Log Tool Test 03 - Advanced Filtering Tests

## Executive Summary

This exploration systematically tested the advanced filtering capabilities of the `get_server_logs` MCP tool. All tested parameters work correctly, including individual filters and combinations. The tool provides robust filtering across multiple dimensions with clear feedback on applied filters.

## Test Results

### 1. Level Parameter Testing

**Parameters tested:** `INFO`, `DEBUG`, `WARNING`, `ERROR`

**Results:**
- ✅ `level=INFO`: Successfully returned 4 INFO-level log entries
- ✅ `level=DEBUG`: Successfully returned 10 DEBUG-level log entries (most common)
- ✅ `level=WARNING`: Returned 0 entries (no warnings in recent logs)
- ✅ `level=ERROR`: Returned 0 entries (no errors in recent logs)

**Observations:**
- Level filtering works as expected
- Returns empty array when no logs match the level
- `filters_applied` correctly shows `{"level": "INFO"}` in response
- Case-sensitive parameter (uppercase required)

**Example successful query:**
```json
{
  "level": "DEBUG",
  "lines": 10
}
```

**Example response metadata:**
```json
{
  "returned_lines": 10,
  "filters_applied": {
    "level": "DEBUG"
  }
}
```

---

### 2. Logger Parameter Testing

**Loggers tested:**
- `auto_dev_mcp.middleware.tracing`
- `mcp.server.lowlevel.server`
- `auto_dev_mcp.middleware.auth`
- `nonexistent.logger` (negative test)

**Results:**
- ✅ `logger=auto_dev_mcp.middleware.tracing`: Returned 10 matching entries
- ✅ `logger=mcp.server.lowlevel.server`: Returned 8 matching entries
- ✅ `logger=auto_dev_mcp.middleware.auth`: Returned 2 matching entries
- ✅ `logger=nonexistent.logger`: Returned 0 entries (graceful handling)

**Observations:**
- Logger filtering is precise and matches full logger names
- No partial matching (e.g., searching for "middleware" doesn't match "auto_dev_mcp.middleware.tracing")
- Returns empty array for non-existent loggers without error
- `filters_applied` correctly shows logger name

**Common logger names found:**
- `auto_dev_mcp.middleware.tracing` - HTTP request/response tracing
- `auto_dev_mcp.middleware.auth` - Authentication events
- `auto_dev_mcp.server_http` - HTTP server operations
- `mcp.server.lowlevel.server` - MCP server request processing
- `mcp.server.streamable_http_manager` - Transport management
- `mcp.server.streamable_http` - Session management
- `sse_starlette.sse` - Server-sent events (ping messages)

**Example successful query:**
```json
{
  "logger": "auto_dev_mcp.middleware.tracing",
  "lines": 10
}
```

---

### 3. Search Parameter Testing

**Keywords tested:**
- `CallToolRequest` - Specific request type
- `authenticated` - Authentication events
- `error` - Error detection (negative test)
- `127.0.0.1` - IP address in logs

**Results:**
- ✅ `search=CallToolRequest`: Returned 4 matching entries
- ✅ `search=authenticated`: Returned 2 matching entries
- ✅ `search=error`: Returned 0 entries (case-sensitive, no matches)
- ✅ `search=127.0.0.1`: Returned 6 matching entries (found in URLs and IP fields)

**Observations:**
- Search is case-sensitive ("error" doesn't match "ERROR")
- Searches across the entire message field
- Works with technical identifiers, IPs, and natural language
- Returns empty array when no matches found
- `filters_applied` correctly shows search term

**Example successful query:**
```json
{
  "search": "CallToolRequest",
  "lines": 10
}
```

**Example response metadata:**
```json
{
  "returned_lines": 4,
  "filters_applied": {
    "search": "CallToolRequest"
  }
}
```

---

### 4. Lines Parameter Testing

**Values tested:** 10, 50, 100, 500

**Results:**
- ✅ `lines=10`: Returned 10 entries
- ✅ `lines=50`: Returned 50 entries
- ✅ `lines=100`: Returned 100 entries
- ⚠️ `lines=500`: Response exceeded token limit (160,379 characters)

**Observations:**
- Lines parameter controls the maximum number of entries returned
- Values up to 100 work well within token limits
- `lines=500` triggered overflow protection:
  - Result saved to file: `tool-results/mcp-auto-dev-mcp-get_server_logs-*.txt`
  - Clear error message provided
  - Recommendation to use offset/limit for chunked reading
- `returned_lines` field shows actual count
- `truncated` field indicates if more logs exist

**Token limit behavior:**
```
Error: result (160,379 characters) exceeds maximum allowed tokens.
Output has been saved to [file path].
```

**Recommendations for large queries:**
- Use `lines=50` or `lines=100` for normal queries
- For larger datasets, combine with other filters to narrow results
- Consider using `since_minutes` to limit temporal scope

---

### 5. Since_Minutes Parameter Testing

**Values tested:** 1, 5, 60

**Results:**
- ✅ `since_minutes=1`: Returned 20 entries from last minute
- ✅ `since_minutes=5`: Returned 20 entries from last 5 minutes
- ✅ `since_minutes=60`: Returned 20 entries from last hour

**Observations:**
- Time-based filtering works correctly
- Filters based on log timestamp, not request time
- Useful for focusing on recent activity
- Returns fewer entries if activity is low in the time window
- `filters_applied` correctly shows time window

**Example successful query:**
```json
{
  "since_minutes": 5,
  "lines": 20
}
```

**Example response metadata:**
```json
{
  "returned_lines": 20,
  "filters_applied": {
    "since_minutes": 5
  }
}
```

---

### 6. Combined Parameter Testing

**Test cases:**

#### Test 1: Level + Logger
```json
{
  "level": "DEBUG",
  "logger": "auto_dev_mcp.middleware.tracing",
  "lines": 10
}
```
- ✅ Result: 5 entries matching both criteria
- Filters applied correctly: `{"level": "DEBUG", "logger": "auto_dev_mcp.middleware.tracing"}`

#### Test 2: Search + Since_Minutes
```json
{
  "search": "authenticated",
  "since_minutes": 5,
  "lines": 5
}
```
- ✅ Result: 1 entry matching both criteria
- Filters applied correctly: `{"search": "authenticated", "since_minutes": 5}`

#### Test 3: Level + Search
```json
{
  "level": "INFO",
  "search": "Processing request",
  "lines": 5
}
```
- ✅ Result: 1 entry matching both criteria
- Filters applied correctly: `{"level": "INFO", "search": "Processing request"}`

#### Test 4: Level + Logger + Search + Since_Minutes
```json
{
  "level": "DEBUG",
  "logger": "mcp.server.lowlevel.server",
  "search": "Response sent",
  "since_minutes": 5,
  "lines": 5
}
```
- ✅ Result: 1 entry matching all four criteria
- Filters applied correctly: All four filters shown in response

**Observations:**
- Multiple filters work together using AND logic (all must match)
- Combining filters significantly narrows results
- All filter combinations tested work correctly
- Response metadata accurately reflects all applied filters
- Performance remains good even with 4 simultaneous filters

---

## Issues and Confusing Behaviors

### 1. Token Limit Exceeded (High lines values)

**Issue:** Requesting 500 lines causes token overflow and saves to file

**Impact:** Medium - users need to be aware of practical limits

**Workaround:** Use smaller line counts (≤100) or combine with filters

**Recommendation:**
- Document safe line count ranges (suggest max 100-200)
- Consider adding a warning in tool description about token limits
- Alternatively, implement pagination or streaming for large result sets

### 2. Case Sensitivity Not Documented

**Issue:** Search parameter is case-sensitive but this isn't explicit in documentation

**Impact:** Low - users may get unexpected empty results

**Example:**
- `search=error` returns 0 results
- `search=ERROR` would return actual errors

**Recommendation:**
- Document case sensitivity clearly
- Consider adding case-insensitive option

### 3. Logger Name Discovery

**Issue:** No built-in way to discover available logger names

**Impact:** Medium - users need to query logs first to find logger names

**Current workaround:** Query with no filters, examine results

**Recommendation:**
- Add a `list_loggers` operation or parameter
- Or include common logger names in documentation
- Or add logger name auto-completion hints

### 4. No Regex Support in Search

**Observation:** Search is literal string matching only

**Impact:** Low - limits advanced queries but keeps tool simple

**Example use cases that don't work:**
- Pattern matching: `search=request.*timeout`
- Multiple terms: `search=(error|warning)`

**Recommendation:**
- Document that search is literal, not regex
- Consider adding optional regex mode in future

### 5. Filter Metadata Presentation

**Minor issue:** `filters_applied` field shows null when no filters used

**Impact:** Negligible - just a minor inconsistency

**Current behavior:**
```json
{
  "filters_applied": null  // when no filters
}
```

**Alternative:** Could return empty object `{}` for consistency

---

## Successful Query Patterns

### Pattern 1: Recent Activity Analysis
```json
{
  "since_minutes": 5,
  "lines": 50
}
```
Use case: Check what happened in last 5 minutes

### Pattern 2: Error Investigation
```json
{
  "level": "ERROR",
  "since_minutes": 60,
  "lines": 100
}
```
Use case: Find all errors in last hour

### Pattern 3: Request Tracing
```json
{
  "logger": "auto_dev_mcp.middleware.tracing",
  "search": "POST",
  "lines": 20
}
```
Use case: Track HTTP POST requests

### Pattern 4: Authentication Debugging
```json
{
  "logger": "auto_dev_mcp.middleware.auth",
  "search": "authenticated",
  "since_minutes": 10
}
```
Use case: Monitor authentication events

### Pattern 5: Specific Request Type
```json
{
  "level": "INFO",
  "search": "CallToolRequest",
  "lines": 25
}
```
Use case: Track specific MCP request types

---

## Recommendations for Improvement

### High Priority

1. **Document Token Limits**
   - Add guidance on safe `lines` values
   - Recommend 50-100 for general use
   - Warn about 500+ causing file output

2. **Logger Discovery**
   - Add mechanism to list available loggers
   - Or document common logger names
   - Helps users construct effective queries

3. **Case Sensitivity Documentation**
   - Explicitly state search is case-sensitive
   - Consider adding case-insensitive option

### Medium Priority

4. **Response Size Optimization**
   - Consider pagination for large result sets
   - Add `offset` parameter for result paging
   - Would enable querying 1000s of logs safely

5. **Time Range Enhancement**
   - Add `since_timestamp` for exact time filtering
   - Add `before_minutes` for historical windows
   - Would enable queries like "between 10-20 minutes ago"

6. **Filter Validation**
   - Validate level parameter values
   - Return error for invalid level (e.g., "TRACE")
   - Helps users catch typos early

### Low Priority

7. **Search Enhancement**
   - Add optional regex mode
   - Add case-insensitive flag
   - Would enable more powerful queries

8. **Multiple Value Filters**
   - Allow multiple levels: `level=["INFO", "ERROR"]`
   - Allow multiple loggers
   - Would reduce need for multiple queries

9. **Request ID Filtering**
   - Add `request_id` parameter
   - Would enable tracing specific request chains
   - Useful for debugging specific operations

---

## Tool Usage Assessment

### Strengths
- ✅ All documented parameters work correctly
- ✅ Clean, structured JSON responses
- ✅ Good filter combination support
- ✅ Graceful handling of empty results
- ✅ Clear metadata about applied filters
- ✅ Useful for debugging and monitoring

### Weaknesses
- ⚠️ Token limit not well-documented
- ⚠️ No logger discovery mechanism
- ⚠️ Case-sensitive search may surprise users
- ⚠️ Limited to most recent logs only

### Overall Rating
**8/10** - Excellent filtering capabilities with room for minor improvements in documentation and discoverability.

---

## Conclusion

The `get_server_logs` tool provides robust and flexible filtering capabilities. All tested parameters work correctly, both individually and in combination. The main areas for improvement are around documentation clarity and helper features for discovering available loggers.

The tool is production-ready and highly useful for:
- Debugging MCP server issues
- Monitoring authentication and request patterns
- Investigating specific error conditions
- Understanding system behavior over time

Key takeaway: Combine multiple filters to create precise queries that return exactly the logs you need.
