Test update_learning tool with partial updates.

**Test Scenario:**
1. Create a test learning with title "Original Learning Title", tags ["tag1", "tag2"], summary "Original summary"
2. Test partial update: Change only title to "Updated Learning Title" (leave other fields)
3. Verify update succeeded and only title changed
4. Test another partial update: Add a new tag "tag3" to existing tags
5. Verify tags updated correctly
6. Test summary update: Change summary to "New summary text"
7. Test content update: Modify the learning content markdown
8. Verify all fields are correct after updates

**Output Requirements:**
Create README.md at comms/outbox/exploration/test-update-learning/ containing:
- Each test step executed
- Tool calls made (with parameters)
- Responses received
- Verification results (pass/fail)
- Summary: Did update_learning support partial updates correctly?

**Commit Instructions:**
After testing, commit with message: "test: verify update_learning partial updates [test-update-learning]"

Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.