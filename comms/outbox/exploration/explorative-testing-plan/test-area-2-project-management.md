# Test Area 2: Project Management & Document Exchange

## Tools Under Test
- `list_projects` (SAFE)
- `get_project_info` (SAFE)
- `read_document` (SAFE)
- `request_clarification` (MEDIUM_RISK)

## Test Targets
- **auto-dev-test-target-1** — Rich state, many documents to read.
- **auto-dev-test-target-2-python** — Cross-language validation.
- **auto-dev-test-blank-1** — Minimal state for empty-project behavior.

## Scenarios

### 2.1 list_projects

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| List all | `()` | Returns 6 projects, all 3 test targets present |
| Verify fields | `()` | Each project has name, path, description, destructive_test_target |
| Test target flags | `()` | All 3 test targets have destructive_test_target=true |

### 2.2 get_project_info

| Scenario | Target | Expected Outcome |
|----------|--------|------------------|
| Active project | auto-dev-test-target-1 | Shows completed versions (v001-v004), no active theme |
| Python project | auto-dev-test-target-2-python | Shows v001 completed, config present |
| Blank project | auto-dev-test-blank-1 | No versions, no themes, destructive_test_target=true |
| Invalid project | `project="nonexistent"` | Error: project not found |

### 2.3 read_document

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Relative path | `path="CLAUDE.md", project="auto-dev-test-target-1"` | Returns file content |
| Absolute path | Full path to VERSION_DESIGN.md | Returns file content |
| Pagination | `offset=10, limit=5` on a large doc | Returns 5 lines from line 10 |
| Non-existent file | `path="nonexistent.md"` | Error: file not found |
| Version design doc | `path="comms/inbox/versions/execution/v004/VERSION_DESIGN.md"` | Returns version design content |

### 2.4 request_clarification

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Grep query | `questions=[{"type":"grep","query":"export"}]` on target-1 | Returns matching lines |
| File query | `questions=[{"type":"file","query":"src/index.ts"}]` on target-1 | Returns file content |
| Structure query | `questions=[{"type":"structure","query":"src"}]` on target-1 | Returns directory structure |
| Multiple questions | Array with grep + file + structure | All answered |
| Invalid file | `questions=[{"type":"file","query":"nonexistent.ts"}]` | Error or empty result |
| Python project | Same queries on target-2-python | Works cross-language |

## Dependencies
- None. This is Phase 1.

## Idempotency
- All tools in this area are read-only. Fully idempotent.
