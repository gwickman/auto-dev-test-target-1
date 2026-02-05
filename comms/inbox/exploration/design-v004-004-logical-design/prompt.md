# Task 004: Logical Design Proposal

Read AGENTS.md first and follow all instructions there.

## Objective

Synthesize findings from Tasks 001-003 into a coherent logical design proposal with theme groupings, feature breakdowns, and test strategy.

## Context

This is the final task of Phase 1 (Logical Design) for `auto-dev-test-target-1` version `v004`.

All context is gathered. Now propose the structure.

## Tasks

### 1. Theme Groupings

Based on backlog items and research findings, propose logical themes:
- Group related features together
- Each theme should have 2-5 features
- Provide rationale for grouping decisions
- Consider dependencies and execution order

For each theme:
- Theme name (slug format: `NN-descriptive-name`)
- Theme goal (one paragraph)
- Features included (with backlog mappings)

### 2. Feature Breakdown

For each feature within themes:
- Feature name (slug format: `NNN-descriptive-name`)
- Feature goal (one sentence)
- Backlog item(s) addressed (BL-XXX references)
- Dependencies (features or themes that must complete first)

### 3. Execution Order

Propose the order for theme and feature execution:
- Document dependencies between themes
- Document dependencies between features within themes
- Provide rationale for ordering decisions

### 4. Test Strategy

For each feature, identify test requirements:
- **Unit tests**: New service/handler logic requiring unit tests
- **System/Golden scenarios**: Features that affect execution flows
- **Parity tests**: API/MCP tool changes requiring parity validation
- **Contract tests**: New DTO models requiring round-trip tests
- **Replay fixtures**: New execution patterns requiring replay scenarios

Document which test types apply to each feature.

### 5. Research Sources Adopted

Document which research findings inform the design:
- Libraries or patterns selected
- Architectural decisions made
- Configuration values chosen
- Link to evidence in Task 003 outputs

### 6. Open Questions

List any remaining questions that require user input:
- Decisions with multiple valid approaches
- User preferences needed
- Scope clarifications required

## Output Requirements

Create findings in `comms/outbox/exploration/design-v004-004-logical-design/`:

### README.md (required)

First paragraph: Summary of proposed structure (X themes, Y features total).

Then:
- **Theme Overview**: List of themes with goals
- **Key Decisions**: Major architectural or grouping decisions
- **Dependencies**: High-level execution order rationale
- **Open Questions**: Items needing user input

### phase-1-logical-design.md

Complete logical design proposal:

#### Version Overview
- Version number and description
- Goals and objectives

#### Theme Breakdown

For each theme:
```markdown
## Theme N: [name]

**Goal**: [one paragraph]

**Backlog Items**: BL-XXX, BL-YYY

**Features**:

| # | Feature | Goal | Backlog | Dependencies |
|---|---------|------|---------|--------------| | 1 | NNN-feature-name | [goal] | BL-XXX | None |
```

#### Execution Order
- Theme dependencies
- Feature dependencies
- Rationale for ordering

#### Research Sources
- Key findings adopted (link to Task 003 evidence)
- Patterns selected
- Values chosen with sources

#### Impact Analysis
- Dependencies and affected systems
- Breaking changes identified
- Test infrastructure needs
- Documentation updates required

### test-strategy.md

Test requirements per feature:

For each feature:
```markdown
## Feature NNN-feature-name

**Unit Tests**:
- [ ] `tests/test_module.py` - [what it validates]

**Golden Scenarios**:
- [ ] Scenario affected: [A/B/C/D or None]
- [ ] New scenario needed: [Yes/No - reason]

**Parity Tests** (if API/MCP changes):
- [ ] Parity scenario: [name or N/A]

**Contract Tests** (if new DTOs):
- [ ] DTO: [model name] added to `test_dto_roundtrip.py`

**Replay Fixtures** (if execution patterns change):
- [ ] Fixture: [name or "Uses existing"]
```

### open-questions.md

Questions requiring user input:
- Each question with context
- Options available (if applicable)
- Recommendation (if any)

## Allowed MCP Tools

This exploration needs:
- `read_document`

(All data should come from previous tasks 001-003 outputs)

## Guidelines

- Theme names should be descriptive and URL-friendly
- Feature names should be action-oriented
- All backlog items from Task 002 must be included in some feature
- Dependencies must be clear and explicit
- Test strategy should be comprehensive but realistic
- Keep the main logical design document under 300 lines
- Evidence must come from Task 003, not new assumptions

## When Complete

```bash
git add comms/outbox/exploration/design-v004-004-logical-design/
git commit -m "exploration: design-v004-004-logical-design - logical design proposal complete"
git push
```