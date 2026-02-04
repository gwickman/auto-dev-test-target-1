## Exploration: Basic Log Retrieval Testing

### Objective
Test fundamental `get_server_logs` usage patterns to assess default behavior and basic retrieval capabilities.

### Tasks
1. Call `get_server_logs()` with no parameters (test defaults)
2. Call `get_server_logs(lines=10)` - minimal retrieval
3. Call `get_server_logs(lines=50)` - moderate retrieval  
4. Call `get_server_logs(lines=100)` - standard retrieval
5. Call `get_server_logs(lines=200)` - maximum useful retrieval
6. For each call, document:
   - What information is visible
   - What appears to be hidden/truncated
   - Whether output is readable and useful
   - Any confusion about what's being shown

### Output Requirements
Create in comms/outbox/exploration/log-tool-usability-2-basic/:
- **README.md** (required) - Summary of basic retrieval findings and usability observations
- **default-behavior.md** - Analysis of default parameter behavior
- **line-count-comparison.md** - Comparison of different line counts and their usefulness
- **issues-identified.md** - List of specific usability problems or confusion points

README.md must include:
- Which line counts are most useful
- Whether defaults are appropriate
- What information is easy/hard to find
- Key usability issues discovered

### Sample Log Output
Include 2-3 actual log snippets in examples to illustrate findings (sanitize if needed).

### Verification
- All 5 parameter variations tested
- Output samples captured
- Usability issues documented
- Recommendations clear

### Commit
After completing all documents, commit with message:
"exploration: basic log retrieval usability testing"