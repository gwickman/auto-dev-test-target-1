# Task 006: Document Drafts

Read AGENTS.md first and follow all instructions there.

## Objective

Draft the complete content for all design documents: VERSION_DESIGN.md, THEME_INDEX.md, THEME_DESIGN.md per theme, and requirements.md + implementation-plan.md per feature. Documents must be lean and reference the design artifact store.

## Context

This is Phase 3 (Document Drafts & Persistence) for `${PROJECT}` version `${VERSION}`.

The refined logical design from Phase 2 (Task 005) is complete. Now create the actual document content that will be persisted to the inbox.

**WARNING:** Do NOT modify any files in `comms/outbox/versions/design/${VERSION}/`. These are the reference artifacts. If you find errors, document them and STOP.

## Tasks

### 1. Read the Design Artifact Store

Read all outputs from the centralized store:
- `comms/outbox/versions/design/${VERSION}/001-environment/` — environment context
- `comms/outbox/versions/design/${VERSION}/002-backlog/` — backlog details
- `comms/outbox/versions/design/${VERSION}/003-research/` — research findings
- `comms/outbox/versions/design/${VERSION}/004-logical-design/` — original logical design
- `comms/outbox/versions/design/${VERSION}/005-critical-thinking/` — refined design and risk assessment

Use Task 005's `refined-logical-design.md` as the primary design source.

### 2. Draft VERSION_DESIGN.md

Create version-level design document. Keep it lean — reference the artifact store for details:

```markdown
# Version Design: ${VERSION}

## Description
[Version description and goals]

## Design Artifacts
Full design analysis available at: `comms/outbox/versions/design/${VERSION}/`

## Constraints and Assumptions
[Brief list — see 001-environment/version-context.md for full context]

## Key Design Decisions
[Brief list — see 005-critical-thinking/risk-assessment.md for rationale]

## Theme Overview
[Brief table of themes — see THEME_INDEX.md for details]
```

### 3. Draft THEME_INDEX.md

**CRITICAL: Machine-Parseable Format**

Parser regex: `- (\d+)-([\w-]+):`

**REQUIRED format for feature lists:**
```
**Features:**

- 001-feature-name: Brief description text here
- 002-another-feature: Another description text
```

**FORBIDDEN formats:**
- Numbered lists: `1.` `2.` `3.`
- Bold feature identifiers: `**001-feature-name**`
- Metadata before colon: `001-feature (BL-123, P0, XL)`
- Multi-line feature entries
- Missing colon after feature name

### 4. Draft THEME_DESIGN.md (per theme)

For EACH theme, create a lean THEME_DESIGN.md:

```markdown
# Theme: [name]

## Goal
[Theme objective — one paragraph]

## Design Artifacts
See `comms/outbox/versions/design/${VERSION}/005-critical-thinking/` for full risk analysis.

## Features
| # | Feature | Backlog | Goal |
|---|---------|---------|------|
| NNN | [slug] | BL-XXX | [one sentence] |

## Dependencies
[What must exist before this theme]

## Technical Approach
[High-level approach — reference 003-research/ for evidence]

## Risks
| Risk | Mitigation |
|------|------------|
| [Risk] | [See 005-critical-thinking/risk-assessment.md] |
```

### 5. Draft requirements.md (per feature)

For EACH feature, create requirements.md:
- Goal (one sentence)
- Background (context, backlog items)
- Functional Requirements (FR-001, FR-002, etc. with acceptance criteria)
- Non-Functional Requirements (NFR-001, etc. with metrics)
- Out of Scope (explicit boundaries)
- Test Requirements (from Task 004/005 test strategy)
- Reference: `See comms/outbox/versions/design/${VERSION}/003-research/ for supporting evidence`

**CRITICAL — Backlog ID Cross-Reference:**
When writing the "Backlog Item: BL-XXX" line in each feature's requirements.md, you MUST cross-reference the BL number against the backlog analysis (Task 002) or the feature-to-backlog mapping in the logical design (Task 004). Do NOT write BL numbers from memory. Verify that the BL number matches the correct function name. For example, if the backlog analysis says BL-020 is first() and BL-018 is unique(), do not accidentally write BL-018 in the first() requirements.

### 6. Draft implementation-plan.md (per feature)

For EACH feature, create implementation-plan.md:
- Overview (2-3 sentences)
- Files to Create/Modify (table with actions)
- Implementation Stages (Stage 1, Stage 2, etc. with verification commands)
- Test Infrastructure Updates (from test strategy)
- Quality Gates (standard commands)
- Risks (reference 005-critical-thinking/risk-assessment.md)
- Commit Message (template)

Use evidence from Task 003 research for specific approaches and values.

## Output Requirements

Create in `comms/outbox/exploration/design-${VERSION}-006-drafts/`:

### README.md (required)

First paragraph: Summary of document drafts created (X themes, Y features).

Then:
- **Document Inventory**: List of all drafted documents
- **Reference Pattern**: How documents reference the artifact store
- **Completeness Check**: All backlog items covered
- **Format Verification**: Machine-parseable formats validated

### document-drafts.md

Complete document drafts organized by type:

```markdown
# Document Drafts - ${VERSION}

## VERSION_DESIGN.md
[Full draft content]

---

## THEME_INDEX.md
[Full draft content]

---

## Theme 01: [name]

### THEME_DESIGN.md
[Full draft content]

### Feature 001-[name]

#### requirements.md
[Full draft content]

#### implementation-plan.md
[Full draft content]

[Repeat for all features in theme]

---

[Repeat for all themes]
```

### draft-checklist.md

Verification checklist:
- [ ] VERSION_DESIGN.md drafted
- [ ] THEME_INDEX.md drafted (format verified)
- [ ] Theme NN THEME_DESIGN.md drafted (for each theme)
- [ ] Feature NNN requirements.md drafted (for each feature)
- [ ] Feature NNN implementation-plan.md drafted (for each feature)
- [ ] All backlog items referenced
- [ ] All acceptance criteria included
- [ ] All research findings incorporated
- [ ] Test strategies documented per feature
- [ ] Design artifact store references are correct paths
- [ ] Backlog IDs in each requirements.md cross-referenced against Task 002 backlog analysis (no mismatches)

## Allowed MCP Tools

- `read_document`

(All content should come from the design artifact store)

## Guidelines

- ALL backlog items from PLAN.md are MANDATORY — every item must appear in a feature's requirements.md
- Documents must be LEAN — reference the artifact store, don't duplicate it
- Follow machine-parseable format for THEME_INDEX.md (see Section 3)
- Include all acceptance criteria from backlog items
- Test requirements should match Task 004/005 test strategy
- Implementation plans should reference specific files based on research
- The consolidated document-drafts.md may be LONG (1000+ lines) — that's expected
- Do NOT modify the design artifact store

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-006-drafts/
git commit -m "exploration: design-${VERSION}-006-drafts - document drafts complete"
git push
```
