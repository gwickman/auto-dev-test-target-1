# Test Area 1: Server Diagnostics & Observability

## Tools Under Test
- `health_check` (SAFE)
- `get_server_logs` (SAFE)
- `set_log_level` (MEDIUM_RISK)
- `tool_help` (SAFE)
- `check_usage` (HIGH_RISK)

## Test Target
**auto-dev-test-target-1** — Has existing state and activity logs to query.

## Scenarios

### 1.1 health_check

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Basic health | `()` | status=healthy, services all ok |
| With source sync | `check_source_sync=true` | Returns source_sync object with status |
| With processes | `include_processes=true` | Returns claude_processes array |
| With SDK test | `test_sdk=true` | sdk_test.success=true, output contains "SDK test successful" |
| All flags combined | All three flags true | All sections present, no errors |

### 1.2 get_server_logs

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Default retrieval | `()` | Returns entries array, success=true |
| Level filter | `level="ERROR"` | Only ERROR entries returned |
| Multi-level filter | `level=["ERROR","WARNING"]` | Both levels included |
| Search text | `search="tool"` | Entries matching "tool" in message |
| Regex search | `search="timeout.*retry", regex_mode=true` | Regex-matched entries |
| Invalid regex | `search="[invalid", regex_mode=true` | Error response about invalid regex |
| Since minutes | `since_minutes=5` | Only recent entries |
| Pagination | `lines=10, offset=0` then `offset=10` | Consistent paginated results, has_more flag |
| List loggers | `operation="list_loggers"` | Returns logger names with counts |
| Source filter | `source="cli"` | Only CLI logs |
| Case sensitive | `search="Error", case_sensitive=true` | Case-exact matching |
| Non-existent request_id | `request_id="nonexistent"` | Empty entries, success=true |
| Lines limit boundary | `lines=1` then `lines=500` | Respects min/max bounds |

### 1.3 set_log_level

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Set DEBUG | `level="DEBUG"` | Success, subsequent logs include debug entries |
| Set ERROR | `level="ERROR"` | Success, filters out INFO/DEBUG |
| Invalid level | `level="INVALID"` | Error response |
| Restore INFO | `level="INFO"` | Cleanup: restore default level |

**Cleanup:** Always restore to INFO after testing.

### 1.4 tool_help

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Valid tool | `tool_name="health_check"` | Returns README documentation |
| With detail | `tool_name="add_backlog_item", detail="quality-contract"` | Returns specific detail doc |
| Invalid tool | `tool_name="nonexistent_tool"` | Error: tool not found |
| Example prompt | `tool_name="explore_project", detail="example-prompt"` | Returns copy-paste template |

### 1.5 check_usage

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Default thresholds | `project="auto-dev-test-target-1"` | Returns usage data with action CONTINUE or PAUSE |
| Custom thresholds | `session_pause_threshold=50, session_warn_threshold=25` | Respects custom thresholds |
| With feature_id | `feature_id="test-feature"` | Includes feature tracking |
| No project | `()` | Degrades gracefully |

## Dependencies
- None. This is Phase 1 — foundational validation.

## Idempotency
- All read-only tools are naturally idempotent.
- `set_log_level` must be restored to INFO after each test run.
