# Comparison: New Prompt Set vs Predecessors

## Overview

Three predecessors exist:
1. **Original Plugin** — `docs/ideation/agents-main/` c4-architecture command + 4 agent definitions
2. **Old Single-File** — `docs/auto-dev/PROMPTS/c4-regeneration.md`
3. **Established Patterns** — design_version and retrospective prompt sets

---

## vs Original Plugin (c4-architecture command + agents)

### What Was Gained

| Aspect | Original Plugin | New Prompt Set |
|--------|----------------|----------------|
| Execution model | Sequential subagent calls (Task tool) | Parallel explorations (exploration framework) |
| Context isolation | Shared context window, risk of exhaustion | Each task/batch gets clean context |
| Incremental updates | None — full regen every time | Delta mode with git-based change detection |
| Scalability | Fails on large codebases (context limits) | Batched processing with configurable limits |
| Validation | None — no verification step | Task 006 validates cross-refs, Mermaid syntax |
| Scope control | Agents can call any tool | Allowed MCP Tools restricts each task |
| Integration | Standalone command | Ties into version design and retrospective lifecycle |

### What Was Lost

| Aspect | Original Plugin | New Prompt Set |
|--------|----------------|----------------|
| Agent specialization | 4 dedicated agents with detailed system prompts (c4-code: 320 lines, c4-component: 228 lines, c4-container: 249 lines, c4-context: 236 lines) | Task prompts are shorter, less detailed (002: 136 lines, 003: 169 lines, 004: 167 lines, 005: 204 lines) |
| Diagram templates | Extensive per-paradigm examples (OOP classDiagram, FP flowchart, data pipeline, function dependency graph — c4-code lines 147-277) | Minimal guidance: "Choose diagram type based on code paradigm" (Task 002 lines 76-82) |
| C4 model references | Each agent cites c4model.com with specific diagram principles | Only Task prompts include basic guidance; no external links |
| Configuration | Explicit config options (target_directory, exclude_patterns, include_tests) in command file lines 306-312 | Hardcoded exclusion list in Task 001; no configuration options |
| Model selection | c4-code uses haiku (fast/cheap), component+container+context use sonnet | All tasks run as explorations — model determined by exploration framework, not task complexity |

### Net Assessment

The gains outweigh the losses. The plugin's rich agent definitions are educational but operationally brittle — they relied on the Task tool's subagent system which shares context and can't parallelize. The new prompt set trades agent depth for execution reliability.

The lost diagram template depth is the most concerning gap. The original c4-code agent provided 130+ lines of paradigm-specific diagram examples. Task 002 provides 7 lines of guidance. An LLM running Task 002 would produce less consistent Mermaid output than one running the original agent prompt.

---

## vs Old Single-File (c4-regeneration.md)

The old file is 60 lines. It's a thin wrapper that says "use the plugin" (`/c4-architecture:c4-architecture`). The new prompt set is the actual implementation that the old file was pointing to but couldn't deliver without the plugin being installed.

| Aspect | c4-regeneration.md | New Prompt Set |
|--------|-------------------|----------------|
| Lines | 60 | ~1,050 across 8 files |
| Self-contained | No — depends on external plugin | Yes — everything needed is in the prompt set |
| Delta support | No | Yes |
| Pre-checks | Check if C4-Documentation/ exists | Full project/version/mode validation |
| README template | 15-line basic template | 50-line template with generation history |

The new prompt set is an unambiguous improvement. The old file was a stopgap.

---

## vs Established Patterns (design_version + retrospective prompts)

### Pattern Compliance

| Pattern Element | design_version | retrospective | C4 prompt | Match? |
|----------------|---------------|---------------|-----------|--------|
| PROJECT config block at top | Yes | Yes (+ VERSION) | Yes (+ VERSION + MODE) | Yes |
| Pre-execution validation with STOP | Yes (4 steps) | Yes (5 steps) | Yes (5 steps) | Yes |
| Task execution flow with phases | Yes (4 phases) | Yes (5 phases) | Yes (5 phases) | Yes |
| Error handling section | Yes | Yes | Yes | Yes |
| Progress tracking checklist | Yes | Yes | Yes | Yes |
| Completion section | Yes | Yes | Yes | Yes |
| Usage section | Yes | No | Yes | Partial |
| MCP Tool Authorization | No | Yes | **No** | Gap |
| COMMIT points between phases | Yes (after P2) | Yes (after P2) | Yes (after P2, P4) | Yes |
| Task prompts: AGENTS.md reference | Yes | Yes | Yes | Yes |
| Task prompts: README.md required | Yes | Yes | Yes | Yes |
| Task prompts: "First paragraph" convention | Yes | Yes | Yes | Yes |
| Task prompts: Allowed MCP Tools | Yes | Yes | Yes | Yes |
| Task prompts: Guidelines section | Yes | Yes | Yes | Yes |
| Task prompts: "Do NOT commit" | Yes | Yes | Yes* | Yes* |
| Task prompts: "When Complete" git section | No | No | **Yes** | **Deviation** |

*The "Do NOT commit" guideline conflicts with the "When Complete" section — see issues.md B1.

### Where the C4 Prompt Innovates Beyond Patterns

1. **Parallel task execution** — design_version and retrospective are strictly sequential. The C4 prompt introduces parallel batch launching (Phase 2), a pattern not used elsewhere.

2. **Three-mode execution** — auto/full/delta is unique to the C4 prompt. Other prompts have a single execution mode.

3. **Output to persistent location** — Other prompts write to `comms/outbox/`. The C4 prompt writes working documents to `docs/C4-Documentation/` directly, with exploration folders used only for README summaries.

### Where the C4 Prompt Falls Behind Patterns

1. **No MCP Tool Authorization** — The retrospective prompt extracts `autoDevToolKey` for authenticated MCP access. The C4 prompt omits this entirely.

2. **No remediation pattern** — The retrospective prompt (Phase 3, Task 007) can launch a separate remediation exploration if proposals identify needed actions. The C4 prompt has no equivalent recovery mechanism — if a task fails, it stops.

3. **"When Complete" git sections** are a deviation not present in design_version or retrospective task prompts. This creates the commit contradiction noted in issues.md.

---

## Side-by-Side: Key Dimensions

| Dimension | Original Plugin | Old Single-File | Established Patterns | New Prompt Set |
|-----------|----------------|----------------|---------------------|---------------|
| Scalability | Poor (context limits) | N/A (delegates) | N/A (different domain) | Good (parallel batches) |
| Incremental | No | No | N/A | Yes (delta mode) |
| Self-contained | No (needs agents) | No (needs plugin) | Yes | Yes |
| Validation | None | None | Task-level checks | Full finalization step |
| Pattern compliance | N/A | N/A | Defines the patterns | Mostly compliant |
| C4 fidelity | High (detailed agent prompts) | Low (60 lines) | N/A | Good (less detailed) |
| Runtime risk | High (context exhaustion) | High (plugin dependency) | Low (proven) | Medium (commit contradictions) |
