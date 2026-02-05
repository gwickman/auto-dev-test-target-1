# Task 005: Document Drafts

Read AGENTS.md first and follow all instructions there.

## Objective

Draft the complete content for all design documents: VERSION_DESIGN.md, THEME_INDEX.md, THEME_DESIGN.md for each theme, and requirements.md + implementation-plan.md for each feature.

## Context

This is Phase 2 (Document Drafts) for `${PROJECT}` version `${VERSION}`.

The logical design from Phase 1 (Task 004) is approved. Now create the actual document content.

## Tasks

### 1. Review Phase 1 Outputs

Read all outputs from Tasks 001-004 to gather context:
- Environment and version scope (Task 001)
- Backlog details and retrospective insights (Task 002)
- Research findings and evidence (Task 003)
- Logical design proposal (Task 004)

### 2. Draft VERSION_DESIGN.md

Create version-level design document:
- Version number and description
- Goals and objectives
- Constraints and assumptions (from PLAN.md context)
- Rationale for design decisions
- Integration points
- Dependencies

### 3. Draft THEME_INDEX.md

Create theme index with ALL themes:

For each theme:
```markdown
## Theme NN: [name]

**Goal**: [one paragraph]

**Features**:

- NNN-feature-name: Brief description
- NNN-another-feature: Brief description

**Dependencies**: [prerequisite themes or "None"]

**Risks**: [known risks or "None identified"]
```

### 4. Draft THEME_DESIGN.md (per theme)

For EACH theme, create a THEME_DESIGN.md:

```markdown
# Theme: [name]

## Goal
[Theme objective - one paragraph]

## Features
| # | Feature | Backlog | Goal |
|---|---------|---------|------|
| NNN | [slug] | BL-XXX | [one sentence] |

## Dependencies
[What must exist before this theme - themes, tools, infrastructure]

## Technical Approach
[High-level approach based on research findings]

## Integration Points
[How this theme integrates with existing systems]

## Risks
| Risk | Mitigation |
|------|------------|
| [Risk] | [How to handle] |
```

### 5. Draft requirements.md (per feature)

For EACH feature, create requirements.md following the template in `docs/auto-dev/PROCESS/skills/auto-dev-design/references/document-templates.md`:

- Goal (one sentence)
- Background (context, backlog items)
- Functional Requirements (FR-001, FR-002, etc. with acceptance criteria)
- Non-Functional Requirements (NFR-001, etc. with metrics)
- Out of Scope (explicit boundaries)
- Test Requirements (from Task 004 test strategy)

### 6. Draft implementation-plan.md (per feature)

For EACH feature, create implementation-plan.md following the template:

- Overview (2-3 sentences)
- Files to Create/Modify (table with actions)
- Implementation Stages (Stage 1, Stage 2, etc. with verification commands)
- Test Infrastructure Updates (checklist from test strategy)
- Quality Gates (standard commands)
- Risks (with mitigation)
- Commit Message (template)

Use evidence from Task 003 research for specific approaches and values.

## Output Requirements

Create findings in `comms/outbox/exploration/design-${VERSION}-005-drafts/`:

### README.md (required)

First paragraph: Summary of document drafts created (X themes, Y features).

Then:
- **Document Inventory**: List of all drafted documents
- **Key Design Decisions**: Major choices documented
- **Evidence Integration**: How research findings were incorporated
- **Completeness Check**: All backlog items covered

### phase-2-document-drafts.md

Complete document drafts organized by type:

```markdown
# Phase 2 Document Drafts - v${VERSION}

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
- [ ] THEME_INDEX.md drafted
- [ ] Theme 01 THEME_DESIGN.md drafted
- [ ] Theme 01 Feature 001 requirements.md drafted
- [ ] Theme 01 Feature 001 implementation-plan.md drafted
- [ ] [... all documents listed]
- [ ] All backlog items referenced
- [ ] All acceptance criteria included
- [ ] All research findings incorporated
- [ ] Test strategies documented per feature

## Allowed MCP Tools

This exploration needs:
- `read_document`

(All content should come from Phase 1 task outputs)

## Guidelines

- Follow templates from `docs/auto-dev/PROCESS/skills/auto-dev-design/references/document-templates.md`
- Incorporate research evidence from Task 003
- Include all acceptance criteria from backlog items
- Test requirements should match Task 004 test strategy
- Implementation plans should reference specific files based on research
- Documents should be detailed enough for autonomous implementation
- The consolidated phase-2-document-drafts.md may be LONG (1000+ lines) - that's expected

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-005-drafts/
git commit -m "exploration: design-${VERSION}-005-drafts - document drafts complete"
git push
```
