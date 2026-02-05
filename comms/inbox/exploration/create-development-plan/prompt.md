You have access to the PROJECT-PLAN template from auto-dev-mcp at docs/auto-dev/PROCESS/generic/00-PROJECT-PLAN.md. Use it as your guide.

## Task

Create a complete development plan for auto-dev-test-target-1:

1. **Analyze existing state**: Review docs/versions/ to identify completed versions
2. **Create docs/auto-dev/PLAN.md**: Following the template structure, document:
   - Completed versions with dates and what they delivered
   - 3 planned future versions (v003, v004, v005 or whatever numbers make sense)
   - Each planned version should have a clear focus area
3. **Create backlog items**: Use add_backlog_item to create trivial/simple features (this is a destructive test target):
   - Create enough features to populate the 3 planned versions
   - Ensure at least 3 themes total across those versions (aim for 2-4 themes per version)
   - Each theme needs 2-5 features
   - Make them simple/trivial (e.g., "Add logging to module X", "Create utility function Y", "Add validation for Z")
   - Tag appropriately, link to the version they'll be in
4. **Update PLAN.md with backlog references**: After creating backlog items, reference them in the version mapping

## Output Requirements

Create in comms/outbox/exploration/create-development-plan/:

### README.md (required)
Summary of what was created and backlog item IDs.

### analysis.md
What versions exist, what was done.

### docs/auto-dev/PLAN.md
THE ACTUAL PLAN FILE - create this in the project root, not in the exploration output.

## Guidelines
- Make features trivial/simple since this is a test target
- Ensure coherent themes (group related features)
- Reference backlog items by ID (BL-XXX)
- Follow the template structure exactly

## When Complete
Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

git add docs/auto-dev/PLAN.md comms/outbox/exploration/create-development-plan/
git commit -m "exploration: create-development-plan complete with PLAN.md and backlog items"
