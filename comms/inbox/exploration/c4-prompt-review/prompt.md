Read AGENTS.md first and follow all instructions there.

## Objective

Critically review a new C4 architecture documentation prompt set and provide an honest assessment of its quality, gaps, and risks.

## Materials to Review

### The new prompt set (the subject of review)
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/000-master-prompt.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/README.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/001-discovery-and-planning.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/002-code-level-analysis.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/003-component-synthesis.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/004-container-synthesis.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/005-context-synthesis.md`
- `docs/auto-dev/PROMPTS/c4_documentation_prompt/task_prompts/006-finalization.md`

### The original C4 plugin it's intended to replace
- `docs/ideation/agents-main/agents-main/plugins/c4-architecture/commands/c4-architecture.md`
- `docs/ideation/agents-main/agents-main/plugins/c4-architecture/agents/c4-code.md`
- `docs/ideation/agents-main/agents-main/plugins/c4-architecture/agents/c4-component.md`
- `docs/ideation/agents-main/agents-main/plugins/c4-architecture/agents/c4-container.md`
- `docs/ideation/agents-main/agents-main/plugins/c4-architecture/agents/c4-context.md`

### Established prompt patterns to compare against
- `docs/auto-dev/PROMPTS/design_version_prompt/000-master-prompt.md`
- `docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/001-environment-verification.md`
- `docs/auto-dev/PROMPTS/retrospective_prompt/000-master-prompt.md`
- `docs/auto-dev/PROMPTS/retrospective_prompt/task_prompts/005-architecture-alignment.md`

### The old single-file approach it deprecates
- `docs/auto-dev/PROMPTS/c4-regeneration.md`

## What to Evaluate

Read all materials above. Then assess the new prompt set on its own merits:

- Does it actually solve the scalability problems it claims to?
- Is anything missing, underspecified, or likely to fail at runtime?
- How does it compare to the original plugin's depth and rigour?
- Does it follow the patterns established by the design and retrospective prompts?
- Are there consistency issues, contradictions, or gaps between the task prompts?
- Would this actually work end-to-end if someone ran it today?
- What would you change?

Research the C4 model (https://c4model.com) if needed to verify the prompt set's adherence to C4 principles.

## Output Requirements

Save outputs to comms/outbox/exploration/c4-prompt-review/:

### README.md (required)
First paragraph: Overall verdict — is this prompt set ready, needs work, or fundamentally flawed?

Then organize your findings however makes sense. Be specific and cite line numbers or sections when pointing out issues.

### strengths.md
What the prompt set does well compared to the original and the established patterns.

### issues.md
Problems found, organized by severity (blocking, significant, minor). Include concrete suggestions for fixes.

### comparison.md
Side-by-side comparison with the original plugin approach and the existing prompt patterns. What was gained, what was lost.

## Guidelines
- Be direct. Don't soften criticism.
- Back up claims with evidence from the files.
- If something would fail at runtime, explain why specifically.
- Keep each document under 200 lines.

## When Complete
git add comms/outbox/exploration/c4-prompt-review/
git commit -m "exploration: c4-prompt-review complete"
