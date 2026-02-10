# Prompt Templates

Templates used by MCP server and chatbot orchestration to construct Claude Code prompts for version execution.

## Available Templates

| Template | Used For |
|----------|----------|
| [feature-implementation.md](./feature-implementation.md) | Implementing a single feature |
| [theme-retrospective.md](./theme-retrospective.md) | Creating theme retrospective |
| [version-retrospective.md](./version-retrospective.md) | Creating version retrospective |

## Orchestrated Prompt Sets

Multi-task prompt sets with a master orchestrator and sub-task prompts, executed via explorations.

| Prompt Set | Used For |
|------------|----------|
| [design_version_prompt/](./design_version_prompt/) | Version design (8 tasks) |
| [retrospective_prompt/](./retrospective_prompt/) | Post-version retrospective (10 tasks) |
| [c4_documentation_prompt/](./c4_documentation_prompt/) | C4 architecture documentation (6 tasks, parallel code batches) |

## Deprecated

| Template | Replaced By |
|----------|-------------|
| [c4-regeneration.md](./c4-regeneration.md) | [c4_documentation_prompt/](./c4_documentation_prompt/) |

## Placeholder Format

Templates use `${placeholder}` or `{{placeholder}}` syntax for values to be filled in:

- `${PROJECT}` / `{{version}}` — Project or version identifier
- `${VERSION}` — Version identifier (e.g., `v018`)
- `${MODE}` — Execution mode (e.g., `full`, `delta`)
- `{{theme}}` — Theme identifier
- `{{feature}}` — Feature identifier
- `{{theme_path}}` / `{{feature_path}}` — Full path to theme/feature directory

## Usage

- **Single templates** are read by the MCP server, placeholders filled, and passed to Claude Code.
- **Orchestrated prompt sets** are run by a human via the chatbot. The master prompt (`000-master-prompt.md`) launches explorations for each sub-task, polls for completion, and manages sequencing.
