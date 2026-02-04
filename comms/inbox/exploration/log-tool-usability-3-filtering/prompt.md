## Exploration: Filter Combination Testing

### Objective
Test various filter parameters of `get_server_logs` to identify which work well and which cause confusion.

### Tasks
1. Test `level` filters individually:
   - `level='DEBUG'`
   - `level='INFO'`
   - `level='WARNING'`
   - `level='ERROR'`
2. Test `logger` filter with different component names (inspect logs first to identify real logger names)
3. Test `search` parameter with various queries:
   - Function/tool names
   - Error keywords
   - Project names
4. Test filter combinations:
   - `level + search`
   - `logger + search`
   - `level + logger + search`
5. For each filter scenario, document:
   - Whether results match expectations
   - If filter semantics are clear
   - If combination behavior is intuitive
   - Any surprising or confusing results

### Output Requirements
Create in comms/outbox/exploration/log-tool-usability-3-filtering/:
- **README.md** (required) - Summary of filter effectiveness and usability
- **level-filters.md** - Analysis of log level filtering
- **logger-filters.md** - Analysis of logger name filtering
- **search-filters.md** - Analysis of search parameter behavior
- **combination-filters.md** - Analysis of combined filter behavior
- **issues-identified.md** - Specific problems with filtering

README.md must include:
- Which filters are most useful
- Which filters are confusing or broken
- Whether filter combinations work as expected
- Recommendations for improvement

### Verification
- All filter types tested
- Combinations evaluated
- Unexpected behaviors documented
- Clear usability findings

### Commit
After completing all documents, commit with message:
"exploration: log filter parameter usability testing"