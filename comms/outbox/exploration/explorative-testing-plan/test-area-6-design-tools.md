# Test Area 6: Design & Version Lifecycle

## Tools Under Test
- `list_versions` (SAFE)
- `get_version_status` (SAFE)
- `design_version` (HIGH_RISK)
- `design_theme` (HIGH_RISK)
- `validate_version_design` (MEDIUM_RISK)
- `complete_version` (HIGH_RISK)

## Test Targets
- **auto-dev-test-target-1** — Has v001-v004 completed, v999 paused. Rich version history.
- **auto-dev-test-target-2-python** — Has v001 completed. Simpler structure.

## Scenarios

### 6.1 list_versions

| Scenario | Target | Expected Outcome |
|----------|--------|------------------|
| Target-1 | auto-dev-test-target-1 | 5 versions (v001-v004 completed, v999 paused) |
| Target-2 | auto-dev-test-target-2-python | 1 version (v001 completed) |
| Blank | auto-dev-test-blank-1 | 0 versions |

### 6.2 get_version_status

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Completed version | `version_number=4` on target-1 | status=completed, 2 themes |
| Paused version | `version_number=999` on target-1 | status=paused |
| Invalid version | `version_number=888` | Error or empty |
| Python project | `version_number=1` on target-2 | status=completed, 2 themes |

### 6.3 design_version (on target-1 using v998 test version)

Use a dedicated test version number (v998) to avoid collisions.

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Basic design | `version="v998", description="Test version for explorative testing", themes=[{"name":"01-test-theme","description":"Test theme"}]` | Creates VERSION_DESIGN.md, THEME_INDEX.md, STARTER_PROMPT.md |
| With context | Same + `context={"rationale":"Testing","constraints":["None"],"assumptions":["MCP works"]}` | Context fields in design doc |
| With backlog_ids | Same + `backlog_ids=["BL-015"]` | Backlog link in design |
| Overwrite | Same + `overwrite=true` | Replaces existing docs |

### 6.4 design_theme (on target-1 using v998)

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Basic theme | `version="v998", theme_number=1, theme_name="01-test-theme", theme_design="# Test Theme\nDesign content.", features=[{"name":"001-test-feature","requirements":"Test req","implementation_plan":"Test plan"}]` | Creates THEME_DESIGN.md, feature docs |
| Multiple features | Same but 2-3 features | All feature docs created |
| Incremental mode | Same + `mode="incremental"` | Only adds missing docs |

### 6.5 validate_version_design

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Valid design | `version="v998"` after design_version + design_theme | All documents exist, 0 errors |
| Incomplete design | `version="v998"` after only design_version | Reports missing theme docs |
| Non-existent version | `version="v997"` | Reports all documents missing |
| Existing version | `version="v004"` | All documents exist |

### 6.6 complete_version

| Scenario | Parameters | Expected Outcome |
|----------|-----------|------------------|
| Complete test version | `version_number=998` (after themes complete) | Status changed to completed |
| Already completed | `version_number=4` | Error or idempotent success |

## Dependencies
- Phase 1 (Server Diagnostics) must pass.
- design_theme depends on design_version having been called first.
- validate_version_design depends on design documents existing.

## Cleanup Strategy
After testing, the v998 design documents will remain in the comms/inbox folder. These are non-code files and can be left in place or cleaned up via git operations. The version-state.json entry for v998 should be noted as test residue.

## Idempotency
- Read-only tools are idempotent.
- design_version with `overwrite=true` is repeatable.
- complete_version on an already-completed version should be tested for idempotent behavior.
