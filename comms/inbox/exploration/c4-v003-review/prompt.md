Review the C4 documentation generation that just ran for auto-dev-test-target-1 v003. Evaluate both the orchestration process and the quality of the C4 docs produced.

## What to Review

### Part 1: Orchestration Process

Read these orchestrator outputs:
- `comms/outbox/exploration/c4-v003-orchestrator/README.md`
- `comms/outbox/exploration/c4-v003-orchestrator/orchestration-log.md`

Then read each task exploration's README.md:
- `comms/outbox/exploration/c4-v003-001-discovery/README.md`
- `comms/outbox/exploration/c4-v003-002-batch1/README.md`
- `comms/outbox/exploration/c4-v003-003-components/README.md`
- `comms/outbox/exploration/c4-v003-004-containers/README.md`
- `comms/outbox/exploration/c4-v003-005-context/README.md`
- `comms/outbox/exploration/c4-v003-006-finalize/README.md`

Evaluate:
- Did the orchestrator follow the master prompt correctly?
- Did variable substitution work properly?
- Were commit points executed at the right times?
- Did the discovery task produce a usable manifest?
- Were there any wasted explorations or unnecessary work?
- How well did the task prompts guide Claude Code?
- Any signs of confusion, misinterpretation, or prompt gaps?

### Part 2: C4 Documentation Quality

Read every file in `docs/C4-Documentation/`:
- `README.md` — Is the index complete and useful?
- `c4-context.md` — Stakeholder-friendly? No tech jargon leaking in? Personas realistic?
- `c4-container.md` — Grounded in actual deployment config? Tech choices accurate?
- `c4-component.md` — Master index complete? All components linked?
- `c4-component-*.md` — Boundaries logical? Interfaces concrete? Mermaid diagrams correct?
- `c4-code-*.md` — Function signatures accurate? Dependencies mapped? Diagram type appropriate?

Cross-check against actual source code in `src/` and `tests/` — are the C4 docs accurate representations of the codebase?

Evaluate against C4 model principles:
- Context level: focuses on people and systems, no technology details
- Container level: shows deployment units with technology choices
- Component level: logical groupings within containers
- Code level: actual functions, classes, signatures

### Part 3: Prompt Improvement Opportunities

Based on what you observed, identify:
- Gaps in the prompt set that caused suboptimal output
- Instructions that were ignored or misinterpreted
- Areas where the output quality could be improved with better prompting
- Any structural issues with the orchestration approach

## Output Requirements

Create findings in comms/outbox/exploration/c4-v003-review/:

### README.md (required)
First paragraph: Overall verdict — did the C4 generation succeed and produce quality documentation?

Then:
- **Orchestration Assessment:** summary of process quality
- **Documentation Quality:** summary by C4 level
- **Top Issues:** ranked list of problems found
- **Top Improvements:** ranked list of prompt/process improvements

### orchestration-review.md
Detailed assessment of the orchestration process — what worked, what didn't, specific observations from the logs.

### documentation-quality.md
Detailed quality assessment of every C4 document produced. Include specific examples of good and bad output. Cross-reference against actual source code.

### prompt-improvements.md
Specific, actionable improvements to the prompt set. For each improvement, explain what went wrong, what the prompt should have said, and the expected impact.

## Guidelines
- Be direct and critical. Don't soften findings.
- Include specific file references and line numbers where possible.
- Cross-reference C4 docs against actual source to verify accuracy.
- Distinguish between "blocking" issues (docs are wrong) and "polish" issues (docs could be better).

## When Complete
git add comms/outbox/exploration/c4-v003-review/
git commit -m "exploration: c4-v003-review complete"
