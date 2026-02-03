# Health Check Report - Full Parameters Test

## Overview
This report contains the complete health check response with all optional parameters enabled:
- `include_processes=true`
- `test_sdk=true`
- `check_source_sync=true`

## Health Status

**Status:** ✅ Healthy
**Version:** 6.0.0
**Uptime:** 1684 seconds (28 minutes)
**Timestamp:** 2026-02-03T08:18:48.354067+00:00
**Active Themes:** 0

## Services Status

All core services are operational:

| Service | Status |
|---------|--------|
| Config | ✅ ok |
| State | ✅ ok |
| Execution | ✅ ok |

## External Dependencies

### Git
- **Available:** ✅ Yes
- **Path:** `C:\Program Files\Git\cmd\git.EXE`

### GitHub CLI (gh)
- **Available:** ✅ Yes
- **Authenticated:** ✅ Yes
- **Path:** `C:\Program Files\GitHub CLI\gh.EXE`

## Execution Configuration

- **Backend Mode:** legacy
- **Require Tool Keys:** ✅ Enabled

## Tool Authorization Status

- **Authorization Enabled:** ✅ Yes
- **Active Keys Count:** 4
- **Static Test Keys:** 0
- **Orphaned Keys:** None

## Security Status

- **Tool Keys Required:** ✅ Yes
- **Authorization Enforcement:** ✅ Active
- **Warnings:** None
- **Recommendation:** None

## Capabilities

### Manifest
- **Version:** 1.1.0
- **Expected Tools Count:** 54
- **Critical Tools:** 8

### Available Tools

The following 54 tools are available:

1. health_check ⭐
2. list_projects ⭐
3. get_project_info ⭐
4. design_version ⭐
5. design_theme ⭐
6. validate_version_design
7. start_version_execution ⭐
8. get_version_execution_status
9. pause_version_execution
10. resume_version_execution
11. get_version_status
12. complete_version
13. list_versions
14. get_theme_status ⭐
15. complete_theme
16. halt_theme
17. generate_retrospective
18. get_recovery_status
19. recover_theme
20. explore_project
21. start_exploration
22. get_exploration_status
23. get_exploration_result
24. available_explorations
25. list_explorations
26. request_clarification
27. list_backlog_items ⭐
28. get_backlog_item
29. add_backlog_item
30. update_backlog_item
31. complete_backlog_item
32. commit_changes ⭐
33. git_read
34. generate_completion_report
35. extract_learnings
36. get_iteration_metrics
37. save_learning
38. get_learning
39. search_learnings
40. list_learnings
41. check_usage
42. run_quality_gates
43. start_completion_report
44. get_completion_report_status
45. get_completion_report_result
46. get_server_logs
47. set_log_level
48. read_document
49. tool_help
50. bootstrap_project
51. list_library_modules
52. get_template_version
53. sync_templates
54. configure_webhooks

⭐ = Critical tool

## SDK Test Results

### Overall
- **Success:** ✅ Yes
- **Return Code:** 0
- **Duration:** 7137 ms
- **Output Length:** 39 characters
- **Output Preview:** "SDK test successful\nSDK test successful"
- **Error:** None

### CLI Direct Test

#### CLI Path Resolution
- **Resolved Path:** `C:\Users\grant\.local\bin\claude.exe`
- **Exists:** ✅ Yes
- **Is Claude Code:** ✅ Yes
- **Version:** 2.1.29 (Claude Code)
- **Error:** None

#### Version Check
- **Success:** ✅ Yes
- **Return Code:** 0
- **Duration:** 563 ms
- **Output:** "2.1.29 (Claude Code)"

#### Simple Prompt Test
- **Success:** ✅ Yes
- **Return Code:** 0
- **Duration:** 6570 ms
- **Output Length:** 13 characters
- **Output Preview:** "Hello to you"

#### Environment Variables
- **ANTHROPIC_API_KEY:** (not set)
- **PATH:** (667 chars)
- **HOME:** (not set)
- **USERPROFILE:** `C:\Users\grant`

## Source Sync Status

- **Status:** ✅ Yes (synchronized)
- **Checked File:** `services\tool_key_manager.py`
- **Source Checksum:** `81fd9f954358920c133f2bb0068a704ecee3178bdb9eeabdcbfa4f49731b53a3`
- **Running Checksum:** `81fd9f954358920c133f2bb0068a704ecee3178bdb9eeabdcbfa4f49731b53a3`

## Claude Processes

Found **20 Claude-related processes** running:

### Active Processes (not stuck)

| PID | Name | CPU (s) | Memory (MB) | Runtime (min) | Command |
|-----|------|---------|-------------|---------------|---------|
| 9204 | claude.exe | 4.8 | 625.2 | 2.4 | CLI execution (auto-dev-test-target-1) |
| 16936 | claude.exe | 27.2 | 169.2 | 28.2 | Main application |
| 18632 | claude.exe | 99.0 | 447.7 | 28.2 | Renderer process |
| 23184 | claude.exe | 24.5 | 400.3 | 28.2 | GPU process |
| 23396 | claude.exe | 2.1 | 566.5 | 0.6 | CLI execution (current session) |
| 27076 | bash.exe | 0.1 | 12.0 | 0.1 | Shell command |
| 27416 | claude.exe | 5.3 | 579.2 | 3.0 | CLI execution (auto-dev-test-target-1) |
| 28636 | claude.exe | 3.8 | 602.1 | 1.2 | CLI execution (auto-dev-test-target-1) |
| 4120 | bash.exe | 0.0 | 6.8 | 0.1 | Shell command |

### Likely Stuck Processes

| PID | Name | CPU (s) | Memory (MB) | Runtime (min) | Status |
|-----|------|---------|-------------|---------------|--------|
| 3708 | cmd.exe | 0.0 | 4.5 | 3804.5 | ⚠️ Likely stuck |
| 3872 | claude.exe | 0.0 | 33.1 | 28.2 | ⚠️ Likely stuck |
| 8800 | claude.exe | 0.2 | 82.4 | 28.2 | ⚠️ Likely stuck |
| 9740 | claude.exe | 2.3 | 61.9 | 28.2 | ⚠️ Likely stuck |
| 10148 | chrome-native-host.exe | 0.0 | 5.0 | 3804.5 | ⚠️ Likely stuck |
| 13032 | claude.exe | 1.5 | 114.4 | 28.2 | ⚠️ Likely stuck |
| 15320 | python.exe | 0.0 | 3.9 | 28.2 | ⚠️ Likely stuck |
| 17168 | claude.exe | 0.1 | 101.7 | 27.5 | ⚠️ Likely stuck |
| 21908 | python.exe | 3.0 | 147.4 | 28.2 | ⚠️ Likely stuck |
| 22028 | uv.exe | 0.1 | 24.6 | 28.2 | ⚠️ Likely stuck |
| 22452 | claude.exe | 0.2 | 81.2 | 28.2 | ⚠️ Likely stuck |

### Process Summary
- **Total Processes:** 20
- **Active Processes:** 9
- **Likely Stuck:** 11
- **Total Memory Usage:** ~4.5 GB
- **Total CPU Time:** ~181 seconds

## Summary

The auto-dev-mcp server is **healthy and fully operational**. All services are running correctly, external dependencies (git and gh) are available and authenticated, tool authorization is properly configured, and the SDK tests pass successfully. Source code is synchronized with the running instance.

The system has 54 tools available, including 8 critical tools for core operations. Process monitoring shows active CLI execution sessions and some older processes that may be stuck but are not affecting current operations.

## Request Metadata

- **Request ID:** d17ee31c
- **Success:** ✅ true
