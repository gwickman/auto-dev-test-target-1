**Objective**: Test session_id and request_id filtering in get_server_logs tool.

**Task**: Test tracking capabilities:
1. Look at recent logs and identify some session_ids and request_ids
2. Test filtering by session_id - does it work as expected?
3. Test filtering by request_id - does it work as expected?
4. Try to track a complete request flow using request_id
5. Try to track a complete session using session_id
6. Document challenges in understanding what sessions/requests are
7. Test if these IDs are consistently present in logs

**Output Requirements**:
- Output path: comms/outbox/exploration/log-tool-test-04-tracking/
- Create README.md with:
  - How session_id and request_id filtering works
  - Examples of tracking flows
  - Issues with tracking (missing IDs, inconsistencies, etc.)
  - How useful these filters are in practice
  - Suggestions for improvements

**Commit Instructions**:
Commit all outputs with message: "Exploration: Log tool test 04 - Session and request tracking"