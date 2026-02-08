# Test Area 5: Learning Management

## Tools Under Test
- `save_learning` (MEDIUM_RISK)
- `search_learnings` (SAFE)
- `list_learnings` (SAFE)
- `get_learning` (SAFE)
- `update_learning` (MEDIUM_RISK)
- `delete_learning` (MEDIUM_RISK)
- `extract_learnings` (MEDIUM_RISK)

## Test Targets
- **auto-dev-test-target-1** — Has 5 existing learnings (LRN-001 through LRN-005).
- **auto-dev-test-target-2-python** — Cross-language validation.

## Scenarios

### 5.1 list_learnings

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Default list | `project="auto-dev-test-target-1"` | Returns 5 active learnings |
| Tag filter | `tags=["test"]` | Only test-tagged learnings |
| Sort by title | `sort_by="title"` | Alphabetical ordering |
| Sort by created | `sort_by="created"` | Chronological ordering |

### 5.2 get_learning

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Valid learning | `learning_id="LRN-001"` | Full metadata including content_path |
| Another learning | `learning_id="LRN-002"` | Related backlog = BL-001, source present |
| Invalid ID | `learning_id="LRN-999"` | Error: not found |

### 5.3 search_learnings

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Query text | `query="MCP"` | Finds LRN-001, LRN-002 (MCP in title/summary) |
| Tag search | `tags=["hard-delete"]` | Finds LRN-005 |
| Combined | `query="testing", tags=["test"]` | Intersection of matches |
| No results | `query="xyznonexistent"` | Empty results |
| Limit | `query="test", limit=2` | At most 2 results |

### 5.4 CRUD Cycle (save, update, delete)

| Step | Tool | Parameters | Expected |
|------|------|-----------|----------|
| Save | save_learning | `title="Explorative Test Learning", content="# Test\nCreated during explorative testing.", tags=["test","explorative"], summary="Test learning"` | Returns new LRN-ID |
| Verify | get_learning | `learning_id=<new_id>` | All fields match |
| Update title | update_learning | `learning_id=<new_id>, title="Updated Test Learning"` | Title changed |
| Update tags | update_learning | `learning_id=<new_id>, tags=["updated","test"]` | Tags replaced |
| Update content | update_learning | `learning_id=<new_id>, content="# Updated\nNew content."` | Content file updated |
| Soft delete | delete_learning | `learning_id=<new_id>` | Status=deleted |
| Hard delete | delete_learning | `learning_id=<new_id>, cleanup_files=true` | Content file removed |
| Verify gone | get_learning | `learning_id=<new_id>` | Error or status=deleted |

### 5.5 extract_learnings

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Valid feature | `version="v004", theme="01-array-basics", feature="001-unique"` on target-1 | Extracts learnings from completion report |
| Missing report | `version="v999", theme="test", feature="nonexistent"` | Error: no completion report |

### 5.6 Edge Cases

| Scenario | Expected Outcome |
|----------|------------------|
| Save with source and related_backlog | Both fields stored and retrievable |
| Save with empty tags array | Error or success (verify behavior) |
| Update with no fields | No changes made |
| Delete already-deleted learning | Graceful handling |

## Dependencies
- Phase 1 (Server Diagnostics) must pass.
- extract_learnings requires completed features (v004 on target-1).

## Idempotency
- CRUD cycle cleans up with hard delete (cleanup_files=true).
- Read-only operations are naturally idempotent.
