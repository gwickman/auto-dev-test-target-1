Review all sub-exploration outputs from the v004 version design orchestration and produce a comprehensive summary.

Read the README.md and all other documents from each of these completed sub-explorations:

1. comms/outbox/exploration/design-v004-001-environment/
2. comms/outbox/exploration/design-v004-002-backlog/
3. comms/outbox/exploration/design-v004-003-research/
4. comms/outbox/exploration/design-v004-004-logical-design/
5. comms/outbox/exploration/design-v004-005-drafts/
6. comms/outbox/exploration/design-v004-006-persist/
7. comms/outbox/exploration/design-v004-007-critical-check/

For each sub-exploration, read ALL documents (not just README.md) to get full details.

Also check if design-v004-008-validation has completed and include it if so:
8. comms/outbox/exploration/design-v004-008-validation/

## Output Requirements

Create findings in comms/outbox/exploration/version-design-orchestrator-summary/:

### README.md (required)
First paragraph: Overall summary of the v004 design orchestration - what was designed, how many tasks completed successfully, final status.

Then include:
- **Task-by-task status table**: task number, name, status (pass/fail), duration, document count, key findings
- **Issues identified**: Any failures, warnings, or concerns raised across all tasks
- **Critical thinking findings**: Summary of what task 007 found and recommended
- **Validation status**: Summary of task 008 results if available
- **Overall assessment**: Is v004 ready for execution? What needs attention?

### detailed-findings.md
For each task (001-008), summarise:
- What was checked/produced
- Key outputs and decisions
- Any issues or warnings raised
- Recommendations made

### issues-and-risks.md
Consolidated list of all issues, risks, warnings, and recommendations found across all tasks. Categorise as blocking vs non-blocking.

## Guidelines
- Under 200 lines per document
- Focus on actionable information
- Be direct about problems found
- Commit when complete

## When Complete
git add comms/outbox/exploration/version-design-orchestrator-summary/
git commit -m "exploration: version-design-orchestrator-summary complete"