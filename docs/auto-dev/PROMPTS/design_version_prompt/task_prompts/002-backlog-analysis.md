# Task 002: Backlog Analysis and Retrospective Review

Read AGENTS.md first and follow all instructions there.

## Objective

Gather complete details for all backlog items in the version scope and learn from the previous version's retrospective.

## Context

This is part of Phase 1 (Logical Design) for `${PROJECT}` version `${VERSION}`.

Task 001 identified the backlog item IDs. This task gathers full details.

## Tasks

### 1. Fetch Complete Backlog Items

For each backlog ID identified in Task 001:
- Call `get_backlog_item(project="${PROJECT}", item_id="BL-XXX")`
- Extract full details: title, description, acceptance criteria, priority, tags, notes
- Document any missing or incomplete backlog items

**CRITICAL:** Read ALL backlog items BEFORE making any scope recommendations. Never defer items based on title alone.

### 2. Identify Previous Version

Call `list_versions(project="${PROJECT}")` to find the most recent completed version before `${VERSION}`.

### 3. Review Previous Retrospective

Locate and read the previous version's retrospective:
- Check `docs/versions/vXXX/README.md`
- Check `comms/outbox/vXXX/retrospective.md`

Extract insights relevant to current design:
- Learnings that apply to `${VERSION}` scope
- Patterns that worked well
- Tech debt to address
- Recommendations for future work

### 4. Search Project Learnings

Run `search_learnings(project="${PROJECT}", tags=["design", "architecture"])` to find relevant documented learnings.

Review any learnings that might inform the design approach for `${VERSION}`.

## Output Requirements

Create findings in `comms/outbox/exploration/design-${VERSION}-002-backlog/`:

### README.md (required)

First paragraph: Summary of backlog scope and key insights from retrospective.

Then:
- **Backlog Overview**: Count of items, priority distribution
- **Previous Version**: Version number, retrospective location
- **Key Learnings**: Top insights applicable to current version
- **Tech Debt**: Any debt items to address
- **Missing Items**: Any referenced backlog items not found

### backlog-details.md

For each backlog item, include:
- ID, Title, Priority
- Full description (quoted)
- Acceptance criteria (listed)
- Tags and notes
- Complexity assessment (based on description, not title)

### retrospective-insights.md

Synthesized insights from previous version:
- What worked well (to continue)
- What didn't work (to avoid)
- Tech debt addressed vs deferred
- Architectural decisions to inform current version

### learnings-summary.md

Relevant learnings from project learning repository:
- Learning ID and title
- Summary of insight
- Applicability to current version

## Allowed MCP Tools

This exploration needs:
- `get_backlog_item`
- `list_versions`
- `read_document`
- `search_learnings`
- `list_learnings`
- `get_learning`

## Guidelines

- Quote actual backlog text when documenting items
- Distinguish title complexity from implementation complexity
- Connect retrospective insights to current backlog items where possible
- Keep documents under 200 lines each

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-002-backlog/
git commit -m "exploration: design-${VERSION}-002-backlog - backlog analysis complete"
git push
```
