# Task 003: Research and Investigation

Read AGENTS.md first and follow all instructions there.

## Objective

Research unknowns, investigate prior art, and gather evidence for design decisions that affect version STRUCTURE (not implementation details Claude Code can figure out).

## Context

This is Phase 1 (Environment & Investigation) for `${PROJECT}` version `${VERSION}`.

Tasks 001-002 gathered context. This task resolves unknowns before proposing solutions.

## Tasks

### 1. Identify Research Questions

Based on backlog items from Task 002 (read from `comms/outbox/versions/design/${VERSION}/002-backlog/`), identify:
- Technologies or libraries requiring investigation
- Unclear areas of existing codebase
- Patterns needed but not yet understood
- Configuration values requiring evidence (timeouts, limits, etc.)
- Integration points with existing systems

Create a list of specific research questions.

### 2. Codebase Investigation

For questions about existing code:
- Use `request_clarification` to search for patterns, classes, or files
- Read relevant source files to understand current implementation
- Document findings with file paths and line references

### 3. External Research

For questions about external libraries, patterns, or best practices:

**DeepWiki Research:**
- Use `ask_question` from mcp__deepwiki to query relevant repositories
- Document sources and specific implementation details found

**Web Search:**
- Use web search for official documentation, guides, GitHub issues
- Priority: Official docs > Library tests > GitHub issues
- Document URLs and relevant excerpts

### 4. Sub-Explorations for Complex Investigation

If investigation is complex or can be parallelized:
- You MAY spawn sub-explorations using `start_exploration`
- Each sub-exploration should have a focused question
- Monitor with `get_exploration_status` and retrieve results
- Integrate findings into this task's output

### 5. Evidence Gathering for Concrete Values

For any concrete values needed (timeouts, limits, thresholds):
- Query existing codebase for current values
- Check configuration files
- If not determinable pre-implementation, mark as "TBD - requires runtime testing"
- NEVER guess or use "typical" values without evidence

### 6. Impact Analysis

Document:
- **Dependencies**: What existing code/tools/configs will change?
- **Breaking changes**: Will existing workflows or APIs break?
- **Test impact**: What tests need creation or update?
- **Documentation**: What docs require update after implementation?

## Output Requirements

Save outputs to `comms/outbox/versions/design/${VERSION}/003-research/`:

### README.md (required)

First paragraph: Summary of research scope and key findings.

Then:
- **Research Questions**: List of questions investigated
- **Findings Summary**: High-level results
- **Unresolved Questions**: Items that cannot be resolved pre-implementation
- **Recommendations**: Design direction based on research

### codebase-patterns.md

Findings from codebase investigation:
- Existing patterns found
- File paths and key classes/functions
- Code snippets showing relevant implementations

### external-research.md

Findings from DeepWiki and web research:
- Libraries/tools evaluated
- Patterns and best practices found
- Sources cited (with URLs or repo names)
- Recommended approaches with rationale

### evidence-log.md

For all concrete values needed:
```
## [Parameter Name]
- **Value**: [concrete value]
- **Source**: [where evidence came from]
- **Data**: [actual measurements or findings]
- **Rationale**: [why this value]
```

### impact-analysis.md

Analysis of implementation impact:
- Dependencies (code/tools/configs affected)
- Breaking changes identified
- Test infrastructure needs
- Documentation updates required

## Allowed MCP Tools

- `request_clarification`
- `read_document`
- `start_exploration` (for sub-investigations)
- `get_exploration_status`
- `get_exploration_result`
- `list_explorations`

Plus DeepWiki tools:
- `mcp__deepwiki__ask_question`
- `mcp__deepwiki__read_wiki_structure`
- `mcp__deepwiki__read_wiki_contents`

## Guidelines

- ALL backlog items from PLAN.md are MANDATORY — research must cover all of them, no deferrals
- Research is the designer's responsibility — resolve all queryable unknowns NOW
- Document sources for all findings (file paths, URLs, repo names)
- Mark items as "TBD - requires [X]" only if truly not determinable pre-implementation
- Never defer research to Claude Code with phrases like "Check if..." or "Investigate..."
- Sub-explorations are encouraged for parallel investigation work
- Keep each document under 200 lines
- Do NOT commit — the master prompt handles commits after Phase 2
