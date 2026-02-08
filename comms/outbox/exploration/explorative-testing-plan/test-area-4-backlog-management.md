# Test Area 4: Backlog Management

## Tools Under Test
- `list_backlog_items` (SAFE)
- `get_backlog_item` (SAFE)
- `add_backlog_item` (MEDIUM_RISK)
- `update_backlog_item` (MEDIUM_RISK)
- `complete_backlog_item` (MEDIUM_RISK)
- `delete_backlog_item` (MEDIUM_RISK)

## Test Targets
- **auto-dev-test-target-1** — 39 existing backlog items across priorities and statuses.
- **auto-dev-test-target-2-python** — 14 items, cross-language validation.

## Scenarios

### 4.1 list_backlog_items

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Default list | `project="auto-dev-test-target-1"` | Returns 20 items (default limit), total=39 |
| Priority filter | `priority="P0"` | Only P0 items (BL-003 through BL-006) |
| Status filter | `status="completed"` | Only completed items |
| Tag filter | `tags=["logger"]` | Only logger-tagged items |
| Search | `search="password"` | Items matching "password" |
| Pagination | `limit=5, offset=0` then `offset=5` | Consistent pagination |
| Full fields | `fields="full"` | Includes description, acceptance_criteria |
| Combined filters | `priority="P2", status="open", limit=5` | Intersection of filters |
| Empty result | `tags=["nonexistent-tag"]` | Empty items array, total=0 |

### 4.2 get_backlog_item

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Valid item | `item_id="BL-001"` | Full item details |
| Completed item | `item_id="BL-018"` | Shows completed status |
| Invalid ID | `item_id="BL-999"` | Error: not found |

### 4.3 add_backlog_item (CRUD cycle)

Create a test item, verify, update, complete, then delete it.

| Step | Tool | Parameters | Expected |
|------|------|-----------|----------|
| Create | add_backlog_item | `title="Explorative Test Item", priority="P3", description="Created by explorative testing", tags=["test","explorative"], quality_assertion='{...}'` | Returns new BL-ID |
| Verify | get_backlog_item | `item_id=<new_id>` | All fields match |
| Update title | update_backlog_item | `item_id=<new_id>, title="Updated Test Item"` | Title changed |
| Update status | update_backlog_item | `item_id=<new_id>, status="in-progress", quality_assertion='{...}'` | Status changed |
| Complete | complete_backlog_item | `item_id=<new_id>, version="v999", theme="test"` | Status=completed |
| Soft delete | delete_backlog_item | `item_id=<new_id>` | Status=deleted, data preserved |
| Hard delete | delete_backlog_item | `item_id=<new_id>, hard_delete=true` | Permanently removed |
| Verify gone | get_backlog_item | `item_id=<new_id>` | Error: not found |

### 4.4 Edge Cases

| Scenario | Tool | Expected Outcome |
|----------|------|------------------|
| Missing quality_assertion on status change | update_backlog_item | Error: quality_assertion required |
| Cancel without notes | update_backlog_item status="cancelled" | Error: notes required |
| Cancel with notes | update_backlog_item status="cancelled", notes="..." | Success |
| Duplicate title | add_backlog_item (same title) | Should succeed (duplicates allowed) |
| Empty tags array | add_backlog_item tags=[] | Success |
| acceptance_criteria | add_backlog_item with criteria array | Criteria stored correctly |

### 4.5 Cross-language (auto-dev-test-target-2-python)

Repeat scenarios 4.1-4.3 on the Python project to verify consistent behavior.

## Dependencies
- Phase 1 must pass (server healthy).

## Idempotency
- The CRUD cycle creates and then deletes its test item (hard delete), leaving no residue.
- Read-only operations are naturally idempotent.

## Cleanup Strategy
Always hard-delete any items created during testing.
