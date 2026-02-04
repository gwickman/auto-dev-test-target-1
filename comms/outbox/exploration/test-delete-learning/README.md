# Test Results: delete_learning Tool

**Date**: 2026-02-04
**Test Target**: delete_learning MCP tool
**Status**: ❌ TOOL NOT FOUND

## Executive Summary

The `delete_learning` tool does not exist in the current auto-dev-mcp implementation. This exploration attempted to test soft delete and hard delete functionality for learnings, but discovered the tool is not available.

## Test Scenario (as specified)

The prompt requested testing:
1. Create two test learnings for soft/hard delete testing
2. Test soft delete (mark as deleted, keep content file)
3. Test hard delete (remove completely, delete content file)
4. Verify error handling for non-existent learnings

## Test Execution

### Step 1: Create Test Learnings ✅

**Tool Call**: `save_learning`

Created two test learnings:

1. **LRN-004**: "Learning for Soft Delete"
   - Content path: `docs/auto-dev/LEARNINGS/LRN-004-learning-for-soft-delete.md`
   - Tags: `["test", "soft-delete", "cleanup"]`
   - Status: `active`
   - Created: 2026-02-04T19:04:05.393698+00:00

2. **LRN-005**: "Learning for Hard Delete"
   - Content path: `docs/auto-dev/LEARNINGS/LRN-005-learning-for-hard-delete.md`
   - Tags: `["test", "hard-delete", "cleanup"]`
   - Status: `active`
   - Created: 2026-02-04T19:04:06.987309+00:00

**Result**: Both learnings created successfully with content files verified on disk.

### Step 2: Verify Content Files Exist ✅

**File System Check**:
- ✅ `docs/auto-dev/LEARNINGS/LRN-004-learning-for-soft-delete.md` exists (11 lines)
- ✅ `docs/auto-dev/LEARNINGS/LRN-005-learning-for-hard-delete.md` exists (11 lines)

Both content files confirmed present before deletion attempts.

### Step 3: Test Tool Availability ❌

**Tool Call**: `tool_help('delete_learning')`

**Response**:
```json
{
  "success": true,
  "data": {
    "tool_name": "delete_learning",
    "detail": "README",
    "error": "No help resources for 'delete_learning'",
    "available_details": [],
    "hint": "Check available_details for valid topics. Start with 'README' for an overview."
  }
}
```

**Finding**: No documentation exists for `delete_learning`.

### Step 4: Check Available MCP Tools ❌

**Investigation**: Reviewed all available MCP auto-dev tools in the function definitions.

**Available Learning Tools**:
- ✅ `save_learning` - Create/update learnings
- ✅ `get_learning` - Retrieve single learning by ID
- ✅ `search_learnings` - Search learnings by query/tags
- ✅ `list_learnings` - List all learnings with filtering
- ❌ `delete_learning` - **NOT FOUND**
- ❌ `update_learning` - **NOT FOUND**

**Finding**: The `delete_learning` tool is not implemented in the current MCP server.

### Step 5: Codebase Search ❌

**Search Pattern**: `delete_learning`

**Files Found**:
1. `docs/auto-dev/LEARNINGS/LRN-005-learning-for-hard-delete.md` - Our test file
2. `docs/auto-dev/LEARNINGS/LRN-004-learning-for-soft-delete.md` - Our test file
3. `comms/inbox/exploration/test-delete-learning/prompt.md` - Test prompt

**Finding**: No implementation files reference `delete_learning`. The tool only appears in the test prompt and our test learnings.

## Verification Results

| Test Step | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Create test learnings | 2 learnings created | LRN-004, LRN-005 created | ✅ PASS |
| Verify content files | Files exist on disk | Both files verified | ✅ PASS |
| Tool availability check | Tool exists | Tool not found | ❌ FAIL |
| Soft delete test | Learning marked deleted | Cannot test - tool missing | ⚠️ SKIP |
| Hard delete test | Learning removed | Cannot test - tool missing | ⚠️ SKIP |
| Error handling test | Proper error response | Cannot test - tool missing | ⚠️ SKIP |

## Summary

### Did delete_learning work correctly?

**No** - The `delete_learning` tool does not exist in the current auto-dev-mcp implementation. Testing could not proceed beyond the setup phase.

### Does it clean up content files?

**Unknown** - Without the tool, we cannot verify content file cleanup behavior.

## Current State After Testing

The following test artifacts remain in the system:

1. **Test Learnings Created**:
   - LRN-004 (active) - "Learning for Soft Delete"
   - LRN-005 (active) - "Learning for Hard Delete"

2. **Content Files Created**:
   - `docs/auto-dev/LEARNINGS/LRN-004-learning-for-soft-delete.md`
   - `docs/auto-dev/LEARNINGS/LRN-005-learning-for-hard-delete.md`

These test learnings remain in the system because there is no tool to delete them.

## Recommendations

1. **Implement delete_learning tool** with the following parameters:
   ```
   delete_learning(
     project: str,
     learning_id: str,
     hard_delete: bool = False,  # Default to soft delete
     autoDevToolKey: str = None
   )
   ```

2. **Soft delete behavior** should:
   - Set `status` field to `"deleted"` in metadata
   - Keep learning in `backlog.json` but filter from `list_learnings` by default
   - Preserve content file on disk
   - Allow retrieval via `get_learning(learning_id)`

3. **Hard delete behavior** should:
   - Remove learning entry from `backlog.json`
   - Delete content file from `docs/auto-dev/LEARNINGS/`
   - Return error if accessed via `get_learning(learning_id)`

4. **Error handling** should cover:
   - Learning ID not found
   - Learning already deleted (for soft delete)
   - Content file missing (warn but continue)
   - Permission errors during file deletion

## Related Explorations

- `test-update-learning` - Also incomplete (no README)
- `test-delete-backlog` - Also incomplete (no README)
- `test-update-backlog` - Completed with README

## Test Artifacts for Cleanup

If a `delete_learning` tool is implemented, use these IDs to test:
- LRN-004 (soft delete test)
- LRN-005 (hard delete test)
