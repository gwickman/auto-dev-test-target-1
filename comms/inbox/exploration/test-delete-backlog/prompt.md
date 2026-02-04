Test delete_backlog_item tool with soft and hard delete options.

**Test Scenario:**
1. Create two test backlog items: "Item for Soft Delete" and "Item for Hard Delete"
2. Test soft delete on first item (delete_backlog_item with soft_delete=true or default)
3. Verify item is marked deleted but still retrievable with get_backlog_item
4. Verify item does NOT appear in list_backlog_items (default filters out deleted)
5. Test hard delete on second item (delete_backlog_item with hard_delete=true)
6. Verify item is completely gone (get_backlog_item returns not found)
7. Attempt to delete non-existent item, verify error handling

**Output Requirements:**
Create README.md at comms/outbox/exploration/test-delete-backlog/ containing:
- Each test step executed
- Tool calls made (with parameters)
- Responses received
- Verification results (pass/fail)
- Summary: Did delete_backlog_item work correctly for both soft and hard delete?

**Commit Instructions:**
After testing, commit with message: "test: verify delete_backlog_item soft and hard delete [test-delete-backlog]"

Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.