Review docs/auto-dev/PROCESS/generic/00-PROJECT-PLAN.md to understand the proper template format and structure.

## Task

Align docs/auto-dev/PLAN.md to match the format and structure specified in the 00-PROJECT-PLAN.md template:

1. **Read the template**: Review docs/auto-dev/PROCESS/generic/00-PROJECT-PLAN.md
2. **Identify format differences**: Compare current PLAN.md against template structure
3. **Update PLAN.md**: Reformat to match template exactly while preserving all existing content:
   - Follow template section ordering
   - Use template section headers
   - Include all template sections (Investigation Dependencies, Scoping Decisions, etc.)
   - Maintain existing version details and backlog references
   - Add any missing sections from template
   - Format tables to match template style
   - Update Change Log section

## Output Requirements

Create in comms/outbox/exploration/align-plan-format/:

### README.md (required)
Summary of changes made to align format.

### format-analysis.md
- Current format vs template format
- Sections added/modified
- Structural changes applied

### docs/auto-dev/PLAN.md
THE UPDATED PLAN FILE - update this file in place in the project root.

## Guidelines
- Preserve all existing content (versions, backlog items, descriptions)
- Match template structure exactly
- Follow template's markdown formatting conventions
- Ensure professional documentation quality

## When Complete
Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

git add docs/auto-dev/PLAN.md comms/outbox/exploration/align-plan-format/
git commit -m "exploration: align-plan-format - align PLAN.md to template structure"
