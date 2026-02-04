Test delete_learning tool with soft delete and content file cleanup.

**Test Scenario:**
1. Create two test learnings: "Learning for Soft Delete" and "Learning for Hard Delete"
2. Note the content file paths for both learnings (from get_learning response)
3. Test soft delete on first learning
4. Verify learning is marked deleted but still retrievable with get_learning
5. Verify learning does NOT appear in list_learnings (default filters out deleted)
6. Verify content file still exists on disk
7. Test hard delete on second learning (if hard delete option exists)
8. Verify learning is completely gone (get_learning returns not found)
9. Verify content file is also deleted from disk
10. Attempt to delete non-existent learning, verify error handling

**Output Requirements:**
Create README.md at comms/outbox/exploration/test-delete-learning/ containing:
- Each test step executed
- Tool calls made (with parameters)
- File system checks performed
- Responses received
- Verification results (pass/fail)
- Summary: Did delete_learning work correctly? Does it clean up content files?

**Commit Instructions:**
After testing, commit with message: "test: verify delete_learning and content cleanup [test-delete-learning]"

Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.