Test update_backlog_item tool with partial updates.

**Test Scenario:**
1. Create a test backlog item with title "Test Item for Update", description "Original description", priority "P2"
2. Test partial update: Change only the title to "Updated Test Item" (leave other fields unchanged)
3. Verify the update succeeded and only title changed
4. Test another partial update: Change only description to "New description" (leave title and priority)
5. Verify the update succeeded
6. Test acceptance_criteria update: Add criteria ["First criterion", "Second criterion"]
7. Verify all fields are correct

**Output Requirements:**
Create README.md at comms/outbox/exploration/test-update-backlog/ containing:
- Each test step executed
- Tool call made (with parameters)
- Response received
- Verification result (pass/fail)
- Summary: Did update_backlog_item support partial updates correctly?

**Commit Instructions:**
After testing, commit with message: "test: verify update_backlog_item partial updates [test-update-backlog]"

Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.