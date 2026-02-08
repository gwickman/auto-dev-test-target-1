Create a high-level plan for explorative testing of ALL auto-dev-mcp tools.

## Context

You have access to a TOOL_REFERENCE.md document at comms/inbox/exploration/input-1/TOOL_REFERENCE.md — read this first. It describes every auto-dev-mcp tool available.

You also have access to ALL MCP tools (allowed_mcp_tools = *). Use list_projects, health_check, tool_help, etc. to gather information, but DO NOT execute any tests or make any changes. Your job is ONLY to produce the plan.

## Available Destructive Test Targets

These are the ONLY projects that may be used for testing. No other projects may be touched under any circumstances.

1. **auto-dev-test-target-1** — TypeScript utility library with Jest tests and GitHub Actions CI. Already has auto-dev structure, version history, backlog items, learnings, etc. Good for testing tools that operate on existing project state.
2. **auto-dev-test-target-2-python** — Python utility library with pytest and GitHub Actions CI. Also has auto-dev structure. Good for testing cross-language support.
3. **auto-dev-test-blank-1** — Completely blank repository. Ideal for testing bootstrap_project and then running design/execution workflows from scratch.

## Plan Requirements

The plan should:

1. **Cover every tool** listed in TOOL_REFERENCE.md. Group tools into logical test areas (e.g., "Project Lifecycle", "Design Tools", "Execution Tools", "Backlog Management", "Learnings", "Git Operations", "Observability", etc.).

2. **For each test area**, describe:
   - What tools are being tested
   - What scenarios should be exercised (happy path, edge cases, error conditions)
   - Which destructive test target(s) to use and why
   - What the expected outcomes are
   - Any dependencies on other test areas (ordering)

3. **Assign test targets strategically**:
   - auto-dev-test-blank-1 for bootstrap and greenfield workflows — but note that tests should NOT commit to this repo so it remains blank for future runs. Use dry_run where available, or validate output without persisting.
   - auto-dev-test-target-1 for TypeScript-specific and general tool testing
   - auto-dev-test-target-2-python for Python-specific testing and cross-language validation

4. **Account for cleanup/idempotency**: The plan should be repeatable. Tests should mostly clean up after themselves. Where they can't (e.g., committed versions), note this and suggest strategies (e.g., using branches, dry_run flags, or verifying state without mutating).

5. **Identify gaps**: If the plan would work better with:
   - New MCP tools (e.g., a dedicated test harness tool, a rollback tool)
   - Additional test repositories (e.g., a Rust project, a monorepo)
   - Missing tool capabilities (e.g., dry_run support on tools that lack it)
   - Better observability or assertion mechanisms
   Then call these out explicitly in a dedicated section.

6. **Consider scale-out**: The plan should describe how explorations on different test targets can run concurrently to parallelize testing. Reference the test targets by name so future execution can spawn explorations on each.

7. **Suggest execution phases**: Order the test areas so that foundational tools (health_check, list_projects, read_document) are validated first, building confidence before testing complex workflows (design → execution → retrospective).

## Output Requirements

Create findings in comms/outbox/exploration/explorative-testing-plan/:

### README.md (required)
First paragraph: Concise summary of the testing plan scope, approach, and key decisions.
Then: Overview of test areas with links to detailed documents.

### test-area-{N}-{name}.md
One document per test area with full detail on scenarios, targets, expected outcomes, and ordering.

### gaps-and-recommendations.md
Dedicated document for identified gaps: missing tools, missing repos, missing capabilities, and recommendations for improving testability.

### execution-strategy.md
How to execute the plan: phasing, parallelization across test targets, cleanup procedures, and how to handle failures.

## Guidelines
- Under 200 lines per document
- Use clear headings
- Be specific about which tool parameters to test
- Reference test targets by exact project name
- This is a PLAN ONLY — do not execute any tests

## When Complete
git add comms/outbox/exploration/explorative-testing-plan/
git commit -m "exploration: explorative-testing-plan complete"