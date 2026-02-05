# Task 006: Persist Documents

Read AGENTS.md first and follow all instructions there.

## Objective

Call the MCP design tools to persist all drafted documents to the inbox folder structure.

## Context

This is Phase 3 (Persist Documents) for `${PROJECT}` version `${VERSION}`.

Phase 2 (Task 005) created all document drafts. Now persist them using MCP tools.

## Tasks

### 1. Read Phase 2 Drafts

Read the complete document drafts from Task 005:
- `comms/outbox/exploration/design-${VERSION}-005-drafts/phase-2-document-drafts.md`

Extract the content for each document type.

### 2. Prepare Context Object

From PLAN.md and Phase 1 outputs, prepare the context object:

```python
context = {
    "rationale": "[Design rationale from VERSION_DESIGN.md]",
    "constraints": ["[constraint 1]", "[constraint 2]", ...],
    "assumptions": ["[assumption 1]", "[assumption 2]", ...],
    "deferred_items": ["[item 1]", "[item 2]", ...]
}
```

### 3. Prepare Themes Array

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
- [ ] Each feature in design_theme call has `number`, `name`, `requirements`, `implementation_plan` keys

### 4. Call design_version

```python
design_version(
    project="${PROJECT}",
    version="${VERSION}",
    description="[Version description from VERSION_DESIGN.md]",
    themes=themes,
    backlog_ids=["BL-XXX", "BL-YYY", ...],  # All backlog IDs from scope
    context=context,
    overwrite=false
)
```

Document the result (success or error).

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

**CRITICAL - Feature Object Required Fields:**
Each feature dict MUST contain ALL of these fields:
- `number` (int): Feature number within the theme, 1-indexed sequential
- `name` (str): Feature slug (e.g., "001-feature-name")
- `requirements` (str): Full requirements.md markdown content
- `implementation_plan` (str): Full implementation-plan.md markdown content (NOTE: underscore, not hyphen)

Missing the `number` field or using `implementation-plan` instead of `implementation_plan` will cause a KeyError.

# Call design_theme
design_theme(
    project="${PROJECT}",
    version="${VERSION}",
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
    project="${PROJECT}",
    version="${VERSION}"
)
```

Expected result: All documents exist, no missing files.

Document validation result and any missing documents.

## Output Requirements

Create findings in `comms/outbox/exploration/design-${VERSION}-006-persist/`:

### README.md (required)

First paragraph: Summary of persistence operation (success/failure, documents created).

Then:
- **Design Version Call**: Result and any errors
- **Design Theme Calls**: Result for each theme
- **Validation Result**: Output from validate_version_design
- **Missing Documents**: Any documents not created (should be none)
- **Next Steps**: Ready for critical thinking check

### persistence-log.md

Detailed log of all MCP calls:

```markdown
## design_version Call

**Parameters**:
- project: ${PROJECT}
- version: ${VERSION}
- themes count: X
- backlog_ids count: Y

**Result**: [success/error]
**Output**: [tool output]

---

## design_theme Call - Theme 01

**Parameters**:
- theme_number: 1
- theme_name: 01-theme-name
- features count: Z

**Result**: [success/error]
**Output**: [tool output]

[Repeat for all themes]

---

## validate_version_design Call

**Result**: [success/error]
**Output**: [tool output]
**Missing Documents**: [list or "None"]
```

### verification-checklist.md

Document existence verification:
- [ ] `comms/inbox/versions/execution/${VERSION}/VERSION_DESIGN.md` exists
- [ ] `comms/inbox/versions/execution/${VERSION}/THEME_INDEX.md` exists
- [ ] `comms/inbox/versions/execution/${VERSION}/01-theme-name/THEME_DESIGN.md` exists
- [ ] `comms/inbox/versions/execution/${VERSION}/01-theme-name/001-feature/requirements.md` exists
- [ ] `comms/inbox/versions/execution/${VERSION}/01-theme-name/001-feature/implementation-plan.md` exists
- [ ] [... all documents listed]

Use `read_document` to verify each file exists.

## Allowed MCP Tools

This exploration needs:
- `read_document`
- `design_version`
- `design_theme`
- `validate_version_design`

## Guidelines

- Verify array structure before calling design_version (see Step 3)
- Include complete document content in design_theme calls (not summaries)
- If any MCP call fails, document the error clearly and STOP
- Validate that ALL documents were created successfully
- Keep documents under 200 lines each

## Error Handling

If any MCP call fails:
1. Document the exact error message
2. Document parameters used in the failing call
3. Do NOT continue to subsequent calls
4. Mark exploration as requiring manual intervention

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-006-persist/
git commit -m "exploration: design-${VERSION}-006-persist - documents persisted to inbox"
git push
```
