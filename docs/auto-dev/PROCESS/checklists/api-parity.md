# API Parity Checklist

Use when modifying MCP tools, adding API endpoints, or changing CLI adapters.

## MCP Tool Parity

- [ ] **Handler implementation** — Tool handler in `handlers/` calls shared service layer
- [ ] **Response model** — MCP returns same data structure as equivalent API endpoint
- [ ] **Error mapping** — Service exceptions mapped to appropriate MCP error responses
- [ ] **Parameter validation** — Same validation rules applied regardless of entry point

## CLI Adapter Coverage

- [ ] **Adapter exists** — CLI adapter wraps service for command-line invocation
- [ ] **Flags match params** — CLI flags correspond to service method parameters
- [ ] **Output format** — CLI output parseable and consistent with MCP/API responses
- [ ] **Exit codes** — Non-zero exit on failure, zero on success

## Contract Test Items

- [ ] **DTO stability** — Response DTOs versioned or backward-compatible
- [ ] **Field presence** — Required fields always present in responses
- [ ] **Type consistency** — Same field has same type across all interfaces
- [ ] **Nullable handling** — Null/None values handled consistently

## Parity Test Items

- [ ] **Golden scenarios** — Core scenarios have parity tests (see `tests/parity/scenarios.py`)
- [ ] **Response comparison** — Test uses `normalize_response()` to strip volatile fields
- [ ] **Environment gating** — Parity tests gated by `RUN_PARITY_TESTS=1`
- [ ] **Behavioral equivalence** — Focus on outcome, not implementation details

## Volatile Fields

Fields to exclude from parity comparison (set in `tests/parity/runner.py`):
- `execution_id` — Generated per-execution
- `started_at`, `updated_at` — Timestamps
- `duration_ms` — Timing varies
- `session_id` — Per-session identifiers

## Testing Approach

- [ ] **Unit test service** — Test service layer independently
- [ ] **Integration test handler** — Test handler wiring
- [ ] **Parity test equivalence** — Verify MCP and API produce equivalent results

## Example: Adding Parity Test

```python
# tests/parity/test_my_feature_parity.py
@pytest.mark.skipif(
    not PARITY_TESTS_ENABLED,
    reason="Parity tests disabled (set RUN_PARITY_TESTS=1 to enable)",
)
async def test_my_feature_parity(
    mcp_adapter: McpAdapter,
    api_adapter: ApiAdapter,
) -> None:
    mcp_result = await mcp_adapter.call("my_tool", {"param": "value"})
    api_result = await api_adapter.call("/my-endpoint", {"param": "value"})

    assert normalize_response(mcp_result) == normalize_response(api_result)
```
