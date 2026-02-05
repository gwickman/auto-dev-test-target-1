# Task 006: Persist Documents

Read AGENTS.md first and follow all instructions there.

## Objective

Call the MCP design tools to persist all drafted documents to the inbox folder structure.

## Context

This is Phase 3 (Persist Documents) for `auto-dev-test-target-1` version `v004`.

Phase 2 (Task 005) created all document drafts. Now persist them using MCP tools.

**IMPORTANT**: design_version was already called successfully in the first run. Check if VERSION_DESIGN.md already exists in `comms/inbox/versions/execution/v004/` and skip the design_version call if so. You only need to call design_theme for each theme.

## Tasks

### 1. Read Phase 2 Drafts

Read the complete document drafts from Task 005:
- `comms/outbox/exploration/design-v004-005-drafts/phase-2-document-drafts.md`

Extract the content for each document type.

### 2. Check if design_version Already Called

Check if `comms/inbox/versions/execution/v004/VERSION_DESIGN.md` exists.

If YES: Skip to Step 5 (design_theme calls only)
If NO: Proceed to Steps 3-4

### 3. Prepare Context Object (if needed)

From PLAN.md and Phase 1 outputs, prepare the context object:

```python
context = {
    "rationale": "[Design rationale from VERSION_DESIGN.md]",
    "constraints": ["[constraint 1]", "[constraint 2]", ...],
    "assumptions": ["[assumption 1]", "[assumption 2]", ...],
    "deferred_items": ["[item 1]", "[item 2]", ...]
}
```

### 4. Prepare Themes Array (if needed)

From the logical design, prepare the themes structure:

```python
themes = [
    {
        "name": "01-theme-name",
        "goal": "[Theme goal from THEME_INDEX.md]",
        "features": [
            {"name": "001-feature-name", "goal": "[Feature goal]"},
            {"name": "002-another-feature", "goal": "[Feature goal]"}
        ]
    },
    # ... repeat for all themes
]
```

**CRITICAL:** Verify structure:
- [ ] `themes` is a list (not a string)
- [ ] Each theme has `name`, `goal`, `features` keys
- [ ] Each feature has `name`, `goal` keys

### 5. Call design_theme for Each Theme

For EACH theme:

```python
# Prepare features array
features = [
    {
        "number": 1,
        "name": "001-feature-name",
        "requirements": "[Full requirements.md content]",
        "implementation_plan": "[Full implementation-plan.md content]"
    },
    {
        "number": 2,
        "name": "002-another-feature",
        "requirements": "[Full requirements.md content]",
        "implementation_plan": "[Full implementation-plan.md content]"
    },
    # ... repeat for all features in theme
]
```

**CRITICAL - Feature Object Required Fields:**
Each feature dict MUST contain ALL of these fields:
- `number` (int): Feature number within the theme, 1-indexed sequential
- `name` (str): Feature slug (e.g., "001-feature-name")
- `requirements` (str): Full requirements.md markdown content
- `implementation_plan` (str): Full implementation-plan.md markdown content (NOTE: underscore, not hyphen)

Missing the `number` field or using `implementation-plan` instead of `implementation_plan` will cause a KeyError.

```python
# Call design_theme
design_theme(
    project="auto-dev-test-target-1",
    version="v004",
    theme_number=1,  # Theme sequence number
    theme_name="01-theme-name",
    theme_design="[Full THEME_DESIGN.md content]",
    features=features,
    mode="full"
)
```

Document the result for each theme.

### 6. Validate Design Completeness

Call `validate_version_design`:

```python
validate_version_design(
    project="auto-dev-test-target-1",
    version="v004"
)
```

Expected result: All documents exist, no missing files.

Document validation result and any missing documents.

## Output Requirements

Create findings in `comms/outbox/exploration/design-v004-006-persist-retry/`:

### README.md (required)

First paragraph: Summary of persistence operation (success/failure, documents created).

Then:
- **Design Version Call**: Result (skipped or executed)
- **Design Theme Calls**: Result for each theme
- **Validation Result**: Output from validate_version_design
- **Missing Documents**: Any documents not created (should be none)
- **Next Steps**: Ready for critical thinking check

### persistence-log.md

Detailed log of all MCP calls with parameters and results.

### verification-checklist.md

Document existence verification checklist.

## Allowed MCP Tools

This exploration needs:
- `read_document`
- `design_version` (only if VERSION_DESIGN.md doesn't exist)
- `design_theme`
- `validate_version_design`

## Guidelines

- Check if design_version was already called before attempting it again
- Verify array structure and required fields
- Include complete document content in design_theme calls
- If any MCP call fails, document the error clearly and STOP
- Validate that ALL documents were created successfully
- Keep documents under 200 lines each

## When Complete

```bash
git add comms/outbox/exploration/design-v004-006-persist-retry/
git commit -m "exploration: design-v004-006-persist-retry complete"
```