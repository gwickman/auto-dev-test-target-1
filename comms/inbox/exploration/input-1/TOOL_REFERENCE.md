# Tool Reference

Quick reference for auto-dev-mcp MCP tools.

**Total: 57 tools**

## Risk Categorization

All MCP tools are categorized into three risk levels for granular access control.

**For comprehensive authorization documentation, see:** [Tool Authorization Guide](TOOL_AUTHORIZATION.md)

### Risk Tiers

### SAFE (25 tools)
Read-only operations that cannot modify state:
- `health_check`, `tool_help`, `list_projects`, `get_project_info`
- `get_theme_status`, `get_version_status`, `list_versions`
- `search_learnings`, `list_learnings`, `get_learning`
- `list_backlog_items`, `get_backlog_item`
- `get_version_execution_status`, `get_recovery_status`
- `read_document`, `list_library_modules`, `get_template_version`
- `available_explorations`, `list_explorations`
- `get_exploration_status`, `get_exploration_result`
- `get_completion_report_status`, `get_completion_report_result`
- `get_server_logs`, `get_iteration_metrics`

### MEDIUM_RISK (13 tools)
Write operations on non-code files:
- `add_backlog_item`, `update_backlog_item`, `complete_backlog_item`, `delete_backlog_item`
- `save_learning`, `update_learning`, `delete_learning`, `configure_webhooks`, `git_read`
- `request_clarification`, `set_log_level`, `extract_learnings`
- `validate_version_design`

### HIGH_RISK (19 tools)
Code/execution operations and destructive changes:
- `complete_theme`, `halt_theme`, `generate_retrospective`, `recover_theme`
- `complete_version`, `design_version`, `design_theme`
- `start_version_execution`, `pause_version_execution`, `resume_version_execution`
- `explore_project`, `start_exploration`
- `run_quality_gates`, `generate_completion_report`, `start_completion_report`
- `git_write`, `bootstrap_project`, `sync_templates`, `check_usage`

**Conservative Categorization:** When uncertain, tools are placed in the higher risk category.
This ensures security by default while allowing explicit opt-in for advanced features.

---

## Server Diagnostics

### get_server_logs

Retrieve recent entries from MCP server or CLI execution logs with filtering, regex search, multi-value filters, correlation tracking, and pagination.

**When to use:**
- When other tools fail and you need to diagnose why
- To check for errors or warnings after unexpected behavior
- To trace a specific request through the system
- To discover available loggers via `operation='list_loggers'`
- To correlate events across explorations via `correlation_id`

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| lines | int | No | 50 | Lines to retrieve (1-500) |
| level | string \| list[str] | No | null | Filter by log level (OR logic for multiple values) |
| logger | string \| list[str] | No | null | Filter by logger name, partial match (OR logic for multiple values) |
| search | string | No | null | Full-text search in message field |
| since_minutes | int | No | null | Entries from last N minutes |
| request_id | string | No | null | Filter by request_id for tracing |
| source | string | No | mcp | Log source: mcp, cli, trace, executor, all |
| case_sensitive | bool | No | false | Enable case-sensitive matching for search, level, and logger filters |
| operation | string | No | null | Set to 'list_loggers' to discover available logger names with counts |
| execution_id | string | No | null | Filter CLI logs by execution ID (structured field or regex fallback) |
| regex_mode | bool | No | false | Treat search parameter as a regular expression |
| correlation_id | string | No | null | Filter by correlation ID for cross-exploration tracing |
| offset | int | No | 0 | Skip first N matching entries for pagination |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example - Check recent errors:**
```
get_server_logs(level="ERROR", lines=20)
```

**Example - Trace a request:**
```
get_server_logs(request_id="abc123")
```

**Example - Search for specific issue:**
```
get_server_logs(search="connection refused", since_minutes=5)
```

**Example - Regex search:**
```
get_server_logs(search="timeout.*retry", regex_mode=True)
```

**Example - Multi-value filter:**
```
get_server_logs(level=["ERROR", "WARNING"], logger=["server", "execution"])
```

**Example - Discover loggers:**
```
get_server_logs(operation="list_loggers")
```

**Example - Paginate results:**
```
get_server_logs(level="ERROR", lines=50, offset=50)
```

**Return Schema:**
```json
{
  "success": true,
  "data": {
    "log_file": "/path/to/mcp.log",
    "log_file_size_bytes": 1048576,
    "total_lines_in_file": 2500,
    "total_count": 150,
    "returned_lines": 50,
    "has_more": true,
    "offset": 0,
    "filters_applied": {
      "level": "ERROR",
      "since_minutes": 10
    },
    "entries": [
      {
        "timestamp": "2026-01-01T16:09:43.457Z",
        "level": "ERROR",
        "logger": "auto_dev_mcp.server",
        "message": "Tool execution failed",
        "request_id": "abc123",
        "exc_info": "Traceback..."
      }
    ],
    "truncated": false
  }
}
```

**Troubleshooting:**
- "File logging not enabled" - Set `LOG_FILE` environment variable
- "No entries found" - Server may not have written logs yet; check LOG_LEVEL
- "Invalid regex pattern" - Check regex syntax when using `regex_mode=True`

---

### health_check

Get server health status including service states and active themes.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| check_source_sync | bool | No | false | Compare source vs running installation checksums |
| test_sdk | bool | No | false | Run SDK diagnostic test (takes ~5-10 seconds) |
| include_processes | bool | No | false | Include Claude Code process diagnostics (v026+) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example - Basic health check:**
```
health_check()
```

**Example - Verify source sync:**
```
health_check(check_source_sync=true)
```

**Example - Debug stuck processes:**
```
health_check(include_processes=true)
```

**Return includes (when include_processes=true):**
```json
{
  "claude_processes": [
    {
      "pid": 12345,
      "ppid": 6789,
      "name": "node.exe",
      "cmdline": "node ... claude-code ...",
      "cpu_seconds": 45.2,
      "memory_mb": 176.5,
      "runtime_minutes": 5.3,
      "likely_stuck": false
    }
  ]
}
```

**likely_stuck detection:** CPU < 1% for > 5 minutes indicates potential stuck process.

**Return includes (when check_source_sync=true):**
```json
{
  "source_sync": {
    "status": "yes",
    "checked_file": "services/usage/keychain.py",
    "source_checksum": "abc123...",
    "running_checksum": "abc123..."
  }
}
```

**source_sync.status values:**
- `yes` - Source and running installation match
- `no` - Source differs from running installation (restart needed)
- `na` - Source path not configured or not found

---

### set_log_level

Set logging level at runtime.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| level | string | Yes | Log level: DEBUG, INFO, WARNING, ERROR, CRITICAL |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

---

### tool_help

Get documentation and guidance for any MCP tool.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| tool_name | string | Yes | Name of the tool to get help for |
| detail | string | No | Specific documentation to retrieve (default: README) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

---

## Project Management

### list_projects

List all registered projects configured for this MCP server.

**When to use:**
- See all projects available to the MCP server
- Verify project configuration
- Choose a project to work with

**Parameters:** None

**Example:**
```
list_projects()
```

**Returns:**
```json
{
  "projects": [
    {
      "name": "my-project",
      "path": "/path/to/my-project",
      "has_active_theme": true
    }
  ]
}
```

### get_project_info

Get high-level project information including active theme and completed themes.

**When to use:**
- Check project status overview
- View active theme if any
- See completed themes count

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier (name from configuration) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_project_info(project="my-project")
```

**Returns:**
```json
{
  "name": "my-project",
  "path": "/path/to/my-project",
  "active_theme": "01-auth",
  "completed_themes": 5,
  "total_themes": 8
}
```

---

## Version Lifecycle

### get_version_status

Get status of a version including all themes.

**When to use:**
- Check progress of version implementation
- View all themes in a version and their completion status
- Monitor version execution state

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version_number | int | Yes | Version number (e.g., 21 for v021) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_version_status(project="my-project", version_number=21)
```

**Returns:**
```json
{
  "version": "v021",
  "status": "in_progress",
  "themes": [
    {
      "number": 1,
      "name": "auth",
      "status": "complete",
      "features_complete": 3,
      "features_total": 3
    },
    {
      "number": 2,
      "name": "users",
      "status": "in_progress",
      "features_complete": 1,
      "features_total": 4
    }
  ]
}
```

### complete_version

Mark a version as completed.

**When to use:**
- After all themes in a version are completed
- To formally close out a version milestone

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version_number | int | Yes | Version number to mark complete |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
complete_version(project="my-project", version_number=21)
```

### list_versions

List all versions for a project.

**When to use:**
- Get overview of all versions in a project
- Check version history and completion status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
list_versions(project="my-project")
```

**Returns:**
```json
{
  "versions": [
    {
      "number": 21,
      "name": "v021",
      "status": "in_progress",
      "themes_complete": 1,
      "themes_total": 3
    },
    {
      "number": 20,
      "name": "v020",
      "status": "complete",
      "themes_complete": 2,
      "themes_total": 2
    }
  ]
}
```

### design_version

Create version-level design documents (VERSION_DESIGN.md, THEME_INDEX.md, STARTER_PROMPT.md, STATUS.md template).

**When to use:**
- Before starting work on a new version
- To document version scope and theme breakdown
- To prepare design documents for autonomous execution

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| version | string | Yes | - | Version string (e.g., v021) |
| description | string | Yes | - | Version description and goals |
| themes | array | Yes | - | Array of theme objects with name and description |
| overwrite | bool | No | false | Overwrite existing design documents |
| backlog_ids | array | No | [] | Array of backlog item IDs linked to this version |
| context | object | No | null | Optional design context with rationale, constraints, assumptions, and deferred_items |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Context Schema:**

The `context` parameter accepts an object with the following optional fields:

| Field | Type | Description |
|-------|------|-------------|
| rationale | string | Design rationale explaining why decisions were made |
| constraints | array[string] | Constraints that limit design choices |
| assumptions | array[string] | Assumptions made during design |
| deferred_items | array[string] | Items deferred to future versions |

**Example:**
```
design_version(
  project="my-project",
  version="v021",
  description="Add authentication and user management",
  themes=[
    {"name": "01-auth", "description": "User authentication system"},
    {"name": "02-users", "description": "User profile management"}
  ],
  context={
    "rationale": "Focus on core authentication before advanced features",
    "constraints": ["Must maintain backward compatibility", "API quota limit of 1000 req/day"],
    "assumptions": ["Users have Python 3.10+", "Git is available"],
    "deferred_items": ["OAuth integration", "Multi-factor authentication"]
  }
)
```

### validate_version_design

Validate all design documents exist for a version before execution.

**When to use:**
- Before starting version execution
- To verify design completeness
- To catch missing design documents early

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version | string | Yes | Version string (e.g., v021) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
validate_version_design(project="my-project", version="v021")
```

### start_version_execution

Start autonomous version execution in background.

**When to use:**
- To execute an entire version autonomously
- When you want to implement multiple themes automatically
- For unattended version execution

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version | string | Yes | Version string (e.g., v021) |
| start_from | object | No | Object with theme/feature to resume from (keys: theme, feature) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
start_version_execution(project="my-project", version="v021")
```

**Example - Resume from specific theme:**
```
start_version_execution(
  project="my-project",
  version="v021",
  start_from={"theme": "02-users", "feature": "003-profile"}
)
```

**Returns:**
```json
{
  "execution_id": "exec-20260129-143022-abc123",
  "status": "started",
  "version": "v021",
  "message": "Version execution started in background"
}
```

### get_version_execution_status

Get status of a version execution or list recent executions.

**When to use:**
- Monitor progress of autonomous version execution
- Check current theme and feature being worked on
- View execution history

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| execution_id | string | No | Specific execution ID to check (omit to list recent) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_version_execution_status(project="my-project", execution_id="exec-abc123")
```

### pause_version_execution

Request pause of running version execution (pauses after current feature).

**When to use:**
- To gracefully stop autonomous execution
- When you need to review progress before continuing
- To make manual adjustments mid-version

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| execution_id | string | Yes | Execution ID from start_version_execution |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
pause_version_execution(project="my-project", execution_id="exec-abc123")
```

### resume_version_execution

Resume a paused or interrupted version execution.

**When to use:**
- After pausing a version execution
- To continue after server restart
- To resume after manual interventions

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| execution_id | string | Yes | Execution ID to resume |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
resume_version_execution(project="my-project", execution_id="exec-abc123")
```

---

## Theme Lifecycle

### get_theme_status

Get current status of a theme and all its features.

**When to use:**
- Check progress of theme implementation
- View all features in a theme and their status
- Monitor theme execution state

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| theme_name | string | Yes | Theme name (e.g., 01-auth) |
| version | string | No | Version string for versioned structure |
| theme_number | int | No | Theme number within version (required if version provided) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_theme_status(project="my-project", theme_name="01-auth")
```

**Example - Versioned structure:**
```
get_theme_status(project="my-project", theme_name="auth", version="v021", theme_number=1)
```

**Returns:**
```json
{
  "theme_name": "auth",
  "status": "in_progress",
  "features": [
    {
      "number": 1,
      "name": "login",
      "status": "complete",
      "iterations": 1
    },
    {
      "number": 2,
      "name": "logout",
      "status": "in_progress",
      "iterations": 2
    }
  ],
  "summary_exists": false
}
```

### complete_theme

Mark theme as complete and generate summary.md.

**When to use:**
- After all features in a theme are completed
- To generate theme summary documentation
- Optionally merge theme branch to main

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| theme_name | string | Yes | - | Theme name |
| merge | bool | No | false | Merge theme branch to base branch |
| version | string | No | null | Version string for versioned structure |
| theme_number | int | No | null | Theme number within version |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
complete_theme(project="my-project", theme_name="01-auth", merge=true)
```

### halt_theme

Halt theme execution with partial summary noting the halt reason.

**When to use:**
- When a theme cannot be completed
- To document why work stopped on a theme
- To generate partial summary before abandoning

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| theme_name | string | Yes | Theme name |
| reason | string | Yes | Reason for halting the theme |
| version | string | No | Version string for versioned structure |
| theme_number | int | No | Theme number within version |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
halt_theme(
  project="my-project",
  theme_name="01-auth",
  reason="Blocked by missing API specification"
)
```

### design_theme

Create theme and feature design documents (THEME_DESIGN.md, requirements.md, implementation-plan.md).

**When to use:**
- Before starting work on a new theme
- To document theme scope and feature breakdown
- To prepare design documents for feature implementation

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| version | string | Yes | - | Version string (e.g., v021) |
| theme_number | int | Yes | - | Theme number within version (min: 1) |
| theme_name | string | Yes | - | Theme name/slug |
| theme_design | string | Yes | - | Theme design content (markdown) |
| features | array | Yes | - | Array of feature objects with name, requirements, implementation-plan |
| mode | string | No | full | Design mode: full or incremental |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
design_theme(
  project="my-project",
  version="v021",
  theme_number=1,
  theme_name="auth",
  theme_design="# Authentication System\n\n...",
  features=[
    {
      "name": "001-login",
      "requirements": "User login with email/password",
      "implementation-plan": "1. Create login form\n2. Add API endpoint..."
    }
  ]
)
```

### generate_retrospective

Generate retrospective analysis for completed theme.

**When to use:**
- After completing a theme
- To analyze what went well and what could improve
- To generate learnings for future themes

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| theme_name | string | Yes | - | Theme name |
| audience | string | No | both | Target audience: chatbot, developer, or both |
| version | string | No | null | Version string for versioned structure |
| theme_number | int | No | null | Theme number within version |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
generate_retrospective(project="my-project", theme_name="01-auth", audience="both")
```

---

## Feature Lifecycle

### generate_completion_report

Generate post-implementation completion report with quality checks (synchronous wrapper with timeout).

**When to use:**
- After implementing a feature
- To verify quality gates pass
- When timeout/blocking is acceptable (use start_completion_report for long operations)

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| version | string | Yes | - | Version string (e.g., v021) |
| theme | string | Yes | - | Theme slug (e.g., 01-auth) |
| feature | string | Yes | - | Feature slug (e.g., 001-login) |
| run_checks | bool | No | true | Run quality checks (ruff, mypy, pytest) |
| iteration | int | No | 1 | Current execution iteration (min: 1) |
| timeout | int | No | 300 | Timeout in seconds (min: 10, default: 300) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
generate_completion_report(
  project="my-project",
  version="v021",
  theme="01-auth",
  feature="001-login"
)
```

---

## Document Exchange

### read_document

Read a document with pagination support (absolute or relative paths).

**When to use:**
- Read design documents, completion reports, or any project docs
- When you need to access large files with pagination
- To review implementation plans or requirements

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| path | string | Yes | - | Document path (absolute or relative to project root) |
| project | string | No | null | Project identifier (for relative paths) |
| offset | int | No | 0 | Line number to start reading from |
| limit | int | No | 2000 | Maximum number of lines to read |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
read_document(path="comms/inbox/version/v021/VERSION_DESIGN.md", project="my-project")
```

**Example - Pagination:**
```
read_document(path="docs/large-file.md", project="my-project", offset=1000, limit=500)
```

---

## Learning & Metrics

### extract_learnings

Extract structured learnings from a feature's completion report.

**When to use:**
- After completing a feature with quality issues or insights
- To automatically extract learnings from completion reports
- To populate the learning repository

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version | string | Yes | Version string (e.g., v021) |
| theme | string | Yes | Theme slug |
| feature | string | Yes | Feature slug |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
extract_learnings(
  project="my-project",
  version="v021",
  theme="01-auth",
  feature="001-login"
)
```

### get_iteration_metrics

Get iteration metrics for a theme including success rates and failure categories.

**When to use:**
- Analyze theme execution performance
- View feature success/failure statistics
- Identify common failure patterns

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version | string | Yes | Version string (e.g., v021) |
| theme | string | Yes | Theme slug |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_iteration_metrics(project="my-project", version="v021", theme="01-auth")
```

---

## Recovery

### get_recovery_status

Scan for themes needing recovery after MCP restart.

**When to use:**
- After server restart to find interrupted themes
- To identify themes that were in progress when server stopped
- Before resuming work after disruption

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_recovery_status(project="my-project")
```

### recover_theme

Recover an interrupted theme, returns next steps.

**When to use:**
- After identifying interrupted themes with get_recovery_status
- To resume work on a theme after server restart
- To get instructions for continuing interrupted work

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version | string | Yes | Version string (e.g., v021) |
| theme | string | Yes | Theme slug to recover |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
recover_theme(project="my-project", version="v021", theme="01-auth")
```

---

## Template Framework

### bootstrap_project

Initialize a project with auto-dev structure.

**When to use:**
- Setting up a new project for auto-dev
- Adding auto-dev structure to existing project
- Installing library modules with templates

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| library_modules | array | No | [] | Array of library module names to install |
| spawn_customization | bool | No | true | Spawn customization session after bootstrap |
| force | bool | No | false | Force bootstrap even if structure exists |
| force_confirmed | bool | No | false | Skip confirmation prompt for force |
| dry_run | bool | No | false | Preview changes without applying |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
bootstrap_project(project="my-project")
```

**Example - With library modules:**
```
bootstrap_project(
  project="my-project",
  library_modules=["python-uv", "fastapi"]
)
```

### list_library_modules

List available library modules for bootstrap.

**When to use:**
- Before bootstrapping to see available modules
- To discover reusable library components
- To check what templates are available

**Parameters:** None

**Example:**
```
list_library_modules()
```

### get_template_version

Get current template version.

**When to use:**
- Check which template version is being used
- Verify template updates are available
- For debugging template issues

**Parameters:** None

**Example:**
```
get_template_version()
```

### sync_templates

Sync template updates to managed projects.

**When to use:**
- After template library is updated
- To push template changes to projects
- To ensure projects use latest templates

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| projects | array or string | No | [] | Project identifiers or "*" for all |
| dry_run | bool | No | false | Preview changes without applying |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
sync_templates(projects=["my-project"])
```

**Example - All projects:**
```
sync_templates(projects="*")
```

---

## Exploration

### explore_project

[DEPRECATED] Execute ad-hoc exploration using Claude Code. Blocks until complete (use start_exploration for async).

**When to use:**
- For simple explorations that complete quickly
- When blocking is acceptable
- **Prefer start_exploration for most use cases**

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| results_folder | string | Yes | Folder name for results (relative to comms/outbox/exploration/) |
| prompt | string | Yes | Exploration task description for Claude Code |
| allowed_mcp_tools | list[string] | No | null | Optional list of MCP tools to authorize. Default: SAFE_TOOLS + MEDIUM_RISK_TOOLS. |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
explore_project(
  project="my-project",
  results_folder="auth-architecture",
  prompt="Analyze the authentication architecture and document all auth flows"
)
```

**Note:** By default, Claude Code has access to SAFE_TOOLS (read-only) and MEDIUM_RISK_TOOLS (write non-code). For power users, use `allowed_mcp_tools=["ALL_ALLOWED"]` to grant access to all 57 tools (requires destructive_test_target=true). See [Tool Authorization Guide](TOOL_AUTHORIZATION.md) for comprehensive documentation.

### start_exploration

Start exploration in background, returns exploration_id.

**When to use:**
- For codebase analysis and documentation
- When exploration may take significant time
- To run explorations asynchronously

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| results_folder | string | Yes | Folder name for results (relative to comms/outbox/exploration/) |
| prompt | string | Yes | Exploration task description for Claude Code |
| allowed_mcp_tools | list[string] | No | null | Optional list of MCP tools to authorize. Default: SAFE_TOOLS + MEDIUM_RISK_TOOLS (read-only and write non-code operations). HIGH_RISK tools require explicit allowlist. |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Default Tool Access:**

When `allowed_mcp_tools` is not specified (recommended), Claude Code has access to:
- **SAFE_TOOLS**: Read-only operations (list_projects, get_project_info, read_document, tool_help, etc.)
- **MEDIUM_RISK_TOOLS**: Write non-code operations (add_backlog_item, save_learning, git_read, etc.)
- **HIGH_RISK tools are NOT included** (git_write, start_exploration, run_quality_gates, etc.)

To use HIGH_RISK tools, explicitly provide allowed_mcp_tools parameter (requires destructive_test_target=true in project config).

**For details on risk tiers and authorization, see:** [Tool Authorization Guide](TOOL_AUTHORIZATION.md#risk-categorization)

**Example (with default safe tools):**
```
start_exploration(
  project="my-project",
  results_folder="api-documentation",
  prompt="Document all API endpoints with parameters and return types"
)
```

**Example (with explicit tool allowlist):**
```
start_exploration(
  project="my-project",
  results_folder="custom-exploration",
  prompt="Exploration requiring specific tools",
  allowed_mcp_tools=["list_projects", "read_document", "search_learnings"]
)
```

**Example (with ALL_ALLOWED for power users):**

> ⚠️ **SECURITY WARNING**: ALL_ALLOWED grants unrestricted access to all 54 MCP tools including HIGH_RISK operations (code modification, test execution, git operations). Only use on destructive test target projects with appropriate authorization.

```
start_exploration(
  project="test-sandbox-project",  # Must have destructive_test_target=true
  results_folder="full-access-exploration",
  prompt="Exploration requiring unrestricted tool access",
  allowed_mcp_tools=["ALL_ALLOWED"]
)
```

**ALL_ALLOWED parameter:**
- **Purpose**: Convenience parameter for power users who need unrestricted MCP tool access
- **Security**: Requires `destructive_test_target=true` in projects.yaml
- **Audit**: Logged at WARNING level for security audit trail
- **Usage**: Must be sole element in array - cannot combine with other tool names
- **Case-insensitive**: "ALL_ALLOWED", "all_allowed", "All_Allowed" all work
- **Tool count**: Grants access to all 54 categorized tools (SAFE + MEDIUM_RISK + HIGH_RISK)
- **Alternative**: Use "*" wildcard for same effect (also requires destructive_test_target)

**For comprehensive ALL_ALLOWED documentation, see:** [Tool Authorization Guide](TOOL_AUTHORIZATION.md#all_allowed-parameter)

**Returns:**
```json
{
  "exploration_id": "exp-20260129-143500-xyz789",
  "status": "running",
  "results_folder": "api-documentation",
  "message": "Exploration started in background"
}
```

### get_exploration_status

Check status of a running exploration.

**When to use:**
- Monitor progress of async exploration
- Check if exploration completed or failed
- Poll until exploration finishes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| exploration_id | string | Yes | Exploration ID from start_exploration |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_exploration_status(project="my-project", exploration_id="exp-abc123")
```

**Returns:**
```json
{
  "exploration_id": "exp-abc123",
  "status": "complete",
  "started_at": "2026-01-29T14:35:00Z",
  "completed_at": "2026-01-29T14:42:00Z",
  "duration_seconds": 420,
  "results_folder": "api-documentation"
}
```

### get_exploration_result

Get results of completed exploration.

**When to use:**
- Retrieve outputs after exploration completes
- Access generated documentation
- Get file paths to exploration results

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| exploration_id | string | Yes | Exploration ID from start_exploration |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_exploration_result(project="my-project", exploration_id="exp-abc123")
```

### available_explorations

List existing exploration folders from disk (direct folder access).

**When to use:**
- Browse all exploration results on disk
- Find past exploration outputs
- **Note:** Prefer list_explorations for state-tracked explorations

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
available_explorations(project="my-project")
```

### list_explorations

List recent explorations with status filtering (state-file driven).

**When to use:**
- View recent exploration history with status
- Filter explorations by completion state
- Track exploration execution over time

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| limit | int | No | 10 | Maximum results to return (1-50) |
| status_filter | string | No | all | Filter by status: all, running, complete, failed |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
list_explorations(project="my-project", limit=20, status_filter="complete")
```

**Returns:**
```json
{
  "explorations": [
    {
      "exploration_id": "exp-20260129-143500",
      "results_folder": "api-documentation",
      "status": "complete",
      "started_at": "2026-01-29T14:35:00Z",
      "completed_at": "2026-01-29T14:42:00Z"
    }
  ],
  "total": 1
}
```

---

## Backlog Management

### list_backlog_items

List backlog items with optional filters (priority, status, tags).

**When to use:**
- Browse project backlog
- Filter items by priority or status
- Search for specific backlog items

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| priority | string | No | null | Filter by priority: P0, P1, P2, P3 |
| status | string | No | null | Filter by status: open, in-progress, completed, cancelled |
| tags | array | No | [] | Filter by tags (AND logic) |
| search | string | No | null | Search in title/description (supports wildcards) |
| limit | int | No | 20 | Maximum results (max: 100) |
| offset | int | No | 0 | Pagination offset |
| fields | string | No | summary | Field detail level: summary or full |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
list_backlog_items(project="my-project", priority="P0", status="open")
```

**Returns:**
```json
{
  "items": [
    {
      "id": "BL-001",
      "title": "Add password reset functionality",
      "priority": "P0",
      "status": "open",
      "tags": ["auth", "security"],
      "created_at": "2026-01-15T10:00:00Z"
    }
  ],
  "total": 1,
  "offset": 0,
  "limit": 20
}
```

### get_backlog_item

Get a single backlog item by ID.

**When to use:**
- Retrieve full details of a specific backlog item
- Check acceptance criteria and notes
- View implementation links

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| item_id | string | Yes | Backlog item ID (e.g., BL-001) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
get_backlog_item(project="my-project", item_id="BL-001")
```

### add_backlog_item

Create a new backlog item.

**When to use:**
- Add new feature requests or bugs to backlog
- Document technical debt items
- Create prioritized work items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| title | string | Yes | Backlog item title |
| priority | string | Yes | Priority: P0, P1, P2, P3 |
| description | string | Yes | Detailed description |
| quality_assertion | string | Yes | JSON quality contract. Call `tool_help('add_backlog_item', 'quality-contract')` for schema |
| tags | array | No | Categorization tags |
| acceptance_criteria | array | No | Array of acceptance criteria strings |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
add_backlog_item(
  project="my-project",
  title="Add password reset functionality",
  priority="P1",
  description="Users need ability to reset forgotten passwords via email",
  tags=["auth", "security"],
  acceptance_criteria=["Email sent within 1 minute", "Reset link expires after 1 hour"],
  quality_assertion='{"problem_structured": true, "ac_testable": true, "no_formulaic": true, "duplicate_checked": true}'
)
```

### update_backlog_item

Update an existing backlog item. Supports partial updates - only provided fields are modified.

**When to use:**
- Change priority or status of backlog item
- Update title or description
- Modify acceptance criteria
- Add notes or update tags
- Track progress on backlog items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| item_id | string | Yes | Backlog item ID |
| title | string | No | New title |
| description | string | No | New description (markdown) |
| priority | string | No | New priority: P0, P1, P2, P3 |
| status | string | No | New status: open, in-progress, completed, cancelled |
| tags | array | No | Updated tags array (replaces existing) |
| acceptance_criteria | array | No | Updated acceptance criteria list (replaces existing) |
| notes | string | No | Additional notes |
| quality_assertion | string | No | JSON quality contract (conditionally required). Required when modifying `description`, `acceptance_criteria`, or `status`. Call `tool_help('update_backlog_item', 'quality-contract')` for schema |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Notes:**
- All parameters except `project` and `item_id` are optional
- Only provided fields are updated; omitted fields remain unchanged
- Updating `description` or `tags` will regenerate the auto-estimated `size` and `use_case` fields
- `quality_assertion` is required when modifying quality-sensitive fields (`description`, `acceptance_criteria`, `status`) but not for trivial fields (`priority`, `tags`, `notes`, `title`)
- When setting `status` to `"cancelled"`, the `notes` field is required and must explain the cancellation reason. See `tool_help('update_backlog_item', 'cancellation-rules')` for accepted patterns

**Examples:**
```
# Update priority and tags (no quality_assertion needed)
update_backlog_item(
  project="my-project",
  item_id="BL-001",
  priority="P0",
  tags=["auth", "urgent"]
)

# Update status (quality_assertion required)
update_backlog_item(
  project="my-project",
  item_id="BL-001",
  status="in-progress",
  notes="Started implementation in v021",
  quality_assertion='{"quality_maintained": true, "change_justified": true}'
)

# Update description (quality_assertion required)
update_backlog_item(
  project="my-project",
  item_id="BL-002",
  title="Enhanced user authentication",
  description="Implement OAuth2 with Google and GitHub providers",
  quality_assertion='{"quality_maintained": true, "change_justified": true}'
)

# Cancel an item (quality_assertion + notes required)
update_backlog_item(
  project="my-project",
  item_id="BL-003",
  status="cancelled",
  notes="Superseded by BL-050. Broader scope covers this item's requirements.",
  quality_assertion='{"quality_maintained": true, "change_justified": true}'
)
```

### complete_backlog_item

Mark a backlog item as completed with optional implementation link.

**When to use:**
- After implementing a backlog item
- To link backlog item to version/theme where it was completed
- To close out completed work

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| item_id | string | Yes | Backlog item ID |
| version | string | No | Version where implemented (e.g., v021) |
| theme | string | No | Theme where implemented |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
complete_backlog_item(
  project="my-project",
  item_id="BL-001",
  version="v021",
  theme="01-auth"
)
```


### delete_backlog_item

Delete a backlog item with soft delete (default) or hard delete option.

**When to use:**
- Remove obsolete or duplicate backlog items
- Soft delete (default) marks item as deleted but preserves data
- Hard delete permanently removes item from storage

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| item_id | string | Yes | - | Backlog item ID (e.g., BL-001) |
| hard_delete | bool | No | false | If true, permanently remove; if false, mark as deleted |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Examples:**
```
# Soft delete (default - preserves data)
delete_backlog_item(project="my-project", item_id="BL-042")

# Hard delete (permanent removal)
delete_backlog_item(project="my-project", item_id="BL-042", hard_delete=true)
```

**Returns (soft delete):**
```json
{
  "item": {"id": "BL-042", "title": "...", "status": "deleted", ...},
  "deletion_type": "soft",
  "message": "Marked backlog item BL-042 as deleted"
}
```

**Returns (hard delete):**
```json
{
  "item_id": "BL-042",
  "deletion_type": "hard",
  "message": "Permanently deleted backlog item BL-042"
}
```

**Error scenarios:**
- Item not found: Returns error with item ID
- Invalid project: Returns project not found error

---

## Webhooks

### configure_webhooks

Configure webhook notifications for a project.

**When to use:**
- Set up external notifications for project events
- Integrate with CI/CD or monitoring systems
- Configure event-driven workflows

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| url | string | No | Webhook endpoint URL |
| events | array | No | Array of event types to subscribe to |
| enabled | bool | No | Enable or disable webhooks |
| secret | string | No | Secret for webhook signature verification |
| timeout_seconds | number | No | Request timeout in seconds |
| max_retries | int | No | Maximum retry attempts for failed deliveries |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
configure_webhooks(
  project="my-project",
  url="https://example.com/webhook",
  events=["theme_complete", "feature_complete"],
  enabled=true
)
```

---

## Codebase Queries

### request_clarification

Query the codebase (grep/file/structure) during design. Provides Chatbot with codebase access without direct filesystem tools.

**When to use:**
- During design phase to understand existing code
- To search for patterns or specific files
- When Chatbot needs codebase information without filesystem access

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| questions | array | Yes | Array of question objects with type (grep/file/structure) and query |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
request_clarification(
  project="my-project",
  questions=[
    {"type": "grep", "query": "class UserAuth"},
    {"type": "file", "query": "src/auth/login.py"}
  ]
)
```

---

## Git Operations

### git_write

Stage, commit, and optionally push pending changes.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| message | string | Yes | - | Commit message |
| push | boolean | No | true | Push to remote after commit |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### git_read

Query git status, branches, PRs, CI checks, workflow runs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| operation | string | Yes | One of: status, branches, stale_branches, prs, pr_details, pr_checks, workflow_runs, fetch, pull |
| limit | integer | No | Max results (default: 10, max: 100) |
| include_remote | boolean | No | Include remote branches (default: true) |
| state | string | No | PR state filter: open, closed, merged, all (default: all) |
| author | string | No | Filter PRs by author |
| pr_number | integer | No | PR number (required for pr_details, pr_checks) |
| workflow | string | No | Workflow name filter for workflow_runs |
| remote | string | No | Remote name for fetch/pull operations (default: origin) |
| prune | boolean | No | Prune remote-tracking branches during fetch (default: true) |
| ff_only | boolean | No | Only allow fast-forward merge during pull (default: true) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Operations:**
- `status` - Working tree state (modified, staged, untracked)
- `branches` - List branches with tracking info
- `stale_branches` - Branches not merged to main
- `prs` - List pull requests
- `pr_details` - Detailed PR info (requires pr_number)
- `pr_checks` - CI check status for PR (requires pr_number)
- `workflow_runs` - Recent workflow runs with timing
- `fetch` - Fetch from remote repository
- `pull` - Pull from remote repository with fast-forward safety

---

## Async Completion Reports

### start_completion_report

Start completion report generation in the background.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| version | string | Yes | Version string (e.g., v021) |
| theme | string | Yes | Theme slug (e.g., 01-auth) |
| feature | string | Yes | Feature slug (e.g., 001-login) |
| run_checks | boolean | No | Run quality checks (default: true) |
| iteration | integer | No | Current execution iteration (default: 1) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### get_completion_report_status

Get status of completion report generation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| report_id | string | Yes | Report ID from start_completion_report |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### get_completion_report_result

Get result of a completed completion report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| report_id | string | Yes | Report ID from start_completion_report |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

---

## Quality Gates

### run_quality_gates

Run quality verification (ruff, mypy, pytest) with configurable checks and timeout.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| checks | array | No | ["ruff", "mypy", "pytest"] | Checks to run |
| timeout_minutes | number | No | 5.0 | Total timeout in minutes |
| pytest_args | array | No | [] | Additional pytest arguments |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Example:**
```
run_quality_gates(project="my-project", checks=["ruff", "mypy"])
```

**Return Schema:**
```json
{
  "success": true,
  "data": {
    "project": "my-project",
    "all_passed": true,
    "checks": [
      {
        "check": "ruff",
        "passed": true,
        "return_code": 0,
        "output": "All checks passed!",
        "duration_seconds": 0.5
      }
    ],
    "total_duration_seconds": 2.3
  }
}
```

---

## Learning Management

### save_learning

Store indexed learning with title, content, and tags.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| title | string | Yes | Learning title |
| content | string | Yes | Full markdown content |
| tags | array | Yes | Categorization tags |
| summary | string | No | Brief summary (auto-generated if not provided) |
| source | string | No | Origin reference (e.g., exploration ID) |
| related_backlog | string | No | Related backlog item ID |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### search_learnings

Search learnings by query text and/or tags.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| query | string | No | Full-text search in title/summary |
| tags | array | No | Filter by tags (AND logic) |
| limit | integer | No | Max results (default: 10) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### list_learnings

List all learnings with optional tag filtering.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| tags | array | No | Filter by tags |
| sort_by | string | No | Sort order: created (default), title |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### get_learning

Get a single learning by ID with full metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | Yes | Project identifier |
| learning_id | string | Yes | Learning ID (e.g., LRN-001) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

### update_learning

Update an existing learning item with partial update support. Only provided fields are modified.

**When to use:**
- Correct or refine a learning's title, summary, or content
- Update tags for better categorization
- Amend learning content as understanding evolves

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| learning_id | string | Yes | - | Learning ID to update (e.g., LRN-001) |
| title | string | No | null | New title |
| summary | string | No | null | New summary |
| tags | array | No | null | New tags list (replaces existing) |
| content | string | No | null | New markdown content |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Examples:**
```
# Update tags
update_learning(project="my-project", learning_id="LRN-005", tags=["pattern", "testing", "ci"])

# Update title and content
update_learning(
  project="my-project",
  learning_id="LRN-005",
  title="Updated learning title",
  content="# Updated Content\n\nNew details..."
)
```

**Returns:**
```json
{
  "id": "LRN-005",
  "title": "Updated learning title",
  "tags": ["pattern", "testing", "ci"],
  "summary": "...",
  "content_path": "docs/auto-dev/LEARNINGS/LRN-005-...",
  "status": "active"
}
```

**Error scenarios:**
- Learning not found: Returns not found error
- No fields provided: No changes made
- Invalid project: Returns project not found error

### delete_learning

Delete a learning item. Soft deletes by setting status='deleted'. Optionally removes the content file for complete cleanup.

**When to use:**
- Remove outdated or incorrect learnings
- Clean up duplicate entries
- Use cleanup_files=true for complete removal including markdown file

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | string | Yes | - | Project identifier |
| learning_id | string | Yes | - | Learning ID to delete (e.g., LRN-001) |
| cleanup_files | bool | No | false | If true, also removes the content .md file |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

**Examples:**
```
# Soft delete (preserves content file)
delete_learning(project="my-project", learning_id="LRN-010")

# Delete with file cleanup
delete_learning(project="my-project", learning_id="LRN-010", cleanup_files=true)
```

**Returns:**
```json
{
  "id": "LRN-010",
  "title": "Original learning title",
  "status": "deleted",
  "cleanup_files": false
}
```

**Error scenarios:**
- Learning not found: Returns not found error
- Invalid project: Returns project not found error

---

## Usage Monitoring

### check_usage

Check current Claude Code API usage against thresholds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| project | string | No | Project identifier (for logging) |
| feature_id | string | No | Current feature ID for tracking |
| session_pause_threshold | integer | No | Pause at this session % (default: 95) |
| session_warn_threshold | integer | No | Warn at this session % (default: 75) |
| weekly_pause_threshold | integer | No | Pause at this weekly % (default: 90) |
| autoDevToolKey | string | No | null | Optional authorization key for spawned Claude Code processes |

---

## Tool Timing Characteristics

The MCP protocol has a ~60 second client timeout that cannot be configured server-side. Tools that may exceed this timeout use an async pattern.

### Async Tools (Safe for any duration)

These tools start background operations and return immediately with an ID for polling:

| Start Tool | Status Tool | Result Tool | Use Case |
|------------|-------------|-------------|----------|
| `start_version_execution` | `get_version_execution_status` | N/A | Version execution |
| `start_exploration` | `get_exploration_status` | `get_exploration_result` | Codebase exploration |
| `start_completion_report` | `get_completion_report_status` | `get_completion_report_result` | Quality checks |

**Usage pattern:**
```python
# 1. Start operation
result = await call_tool("start_exploration", {...})
exploration_id = result["data"]["exploration_id"]

# 2. Poll for completion
while True:
    status = await call_tool("get_exploration_status", {"exploration_id": exploration_id})
    if status["data"]["status"] in ("complete", "failed"):
        break
    await asyncio.sleep(5)

# 3. Get result
result = await call_tool("get_exploration_result", {"exploration_id": exploration_id})
```

### Synchronous Tools

| Tool | Typical Time | Max Expected | Notes |
|------|--------------|--------------|-------|
| `design_version` | 2-5s | 10s | File writes only |
| `design_theme` | 2-5s | 10s | File writes only |
| `validate_version_design` | <1s | 5s | File existence checks |
| `git_write` | 5-10s | 30s | Git add/commit/push |
| `git_read` | 2-5s | 15s | Git/GitHub API calls |
| `complete_theme` | 5-15s | 30s | Summary generation |
| `generate_retrospective` | 5-15s | 30s | Analysis generation |
| `check_usage` | 1-2s | 10s | API call with caching |

### Wrapper Tools

These tools use the async pattern internally but present a synchronous interface:

| Tool | Internal Pattern | Default Timeout |
|------|------------------|------------------|
| `explore_project` | `start_exploration` + polling | 600s (10 min) |
| `generate_completion_report` | `start_completion_report` + polling | 300s (5 min) |

For very long operations, use the underlying async tools directly to:
- Show progress to users
- Handle timeouts gracefully
- Run operations in parallel

### When to Use Each Pattern

**Use synchronous tools when:**
- Operation is fast and predictable
- Blocking is acceptable
- Simple one-shot operation

**Use async tools when:**
- Operation may exceed 60 seconds
- You want to show progress
- Running multiple operations
- Need graceful timeout handling

---

## See Also

- [Tool Authorization Guide](TOOL_AUTHORIZATION.md) - Comprehensive authorization documentation
- [Configuration Reference](setup/advanced/CONFIGURATION_REFERENCE.md) - Full configuration schema including authorization fields
- [Setup Guide](setup/README.md) - Installation and configuration
- [TOOL_LISTING.md](TOOL_LISTING.md) - Complete tool inventory with version history
