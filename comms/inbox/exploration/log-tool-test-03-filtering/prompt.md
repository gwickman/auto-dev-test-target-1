**Objective**: Test advanced filtering capabilities of get_server_logs tool.

**Task**: Systematically test different parameter combinations:
1. Test 'level' parameter (INFO, DEBUG, WARNING, ERROR)
2. Test 'logger' parameter (try different logger names you find in the logs)
3. Test 'search' parameter with various keywords
4. Test 'lines' parameter with different values (10, 50, 100, 500)
5. Test 'since_minutes' parameter
6. Try combining multiple parameters
7. Document what works, what doesn't, and what's confusing

**Output Requirements**:
- Output path: comms/outbox/exploration/log-tool-test-03-filtering/
- Create README.md with:
  - Test results for each parameter
  - Examples of successful and unsuccessful queries
  - Issues with parameter behavior
  - Recommendations for improvements

**Commit Instructions**:
Commit all outputs with message: "Exploration: Log tool test 03 - Advanced filtering tests"