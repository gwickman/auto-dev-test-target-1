# Task 007: Persist Documents

Read AGENTS.md first and follow all instructions there.

## Objective

Call the MCP design tools to persist all drafted documents to the inbox folder structure.

## Context

This is Phase 3 (Document Drafts & Persistence) for `${PROJECT}` version `${VERSION}`.

Task 006 created all document drafts. Now persist them using MCP tools.

**WARNING:** Do NOT modify any files in `comms/outbox/versions/design/${VERSION}/`. These are the reference artifacts. If you find errors, document them and STOP.

## CRITICAL: Machine-Parseable Format Requirements

The following files are machine-parsed and require EXACT format preservation:

### THEME_INDEX.md - Feature List Format

**Parser regex:** `- (\d+)-([\w-]+):`

**REQUIRED format for feature lists:**
```
**Features:**

- 001-feature-name: Brief description text here
- 002-another-feature: Another description text
```

**FORBIDDEN formats that break parser:**
- Numbered lists: `1.` `2.` `3.`
- Bold feature identifiers: `**001-feature-name**`
- Metadata before colon: `001-feature (BL-123, P0, XL)`
- Multi-line feature entries
- Missing colon after feature name

## Tasks

### 1. Read Phase 3 Drafts

Read the complete document drafts from Task 006:
- `comms/outbox/exploration/design-${VERSION}-006-drafts/document-drafts.md`

Extract the content for each document type.

### 2. Prepare Context Object

From the design artifact store and drafts, prepare the context object:

```python
context = {
    "rationale": "[Design rationale from VERSION_DESIGN.md]",
    "constraints": ["[constraint 1]", "[constraint 2]", ...],
    "assumptions": ["[assumption 1]", "[assumption 2]", ...],
    "deferred_items": ["[item 1]", "[item 2]", ...]
}
```

### 3. Prepare Themes Array

From the drafts, prepare the themes structure:

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
    backlog_ids=["BL-XXX", "BL-YYY", ...],
    context=context,
    overwrite=false
)
```

Document the result (success or error).

### 5. Call design_theme for Each Theme

For EACH theme:

```python
features = [
    {
        "number": 1,
        "name": "001-feature-name",
        "requirements": "[Lean requirements.md content with artifact store references]",
        "implementation_plan": "[Lean implementation-plan.md content with artifact store references]"
    },
    # ... repeat for all features
]

design_theme(
    project="${PROJECT}",
    version="${VERSION}",
    theme_number=1,
    theme_name="01-theme-name",
    theme_design="[Lean THEME_DESIGN.md content with artifact store references]",
    features=features,
    mode="full"
)
```

**CRITICAL - Feature Object Required Fields:**
Each feature dict MUST contain ALL of these fields:
- `number` (int): Feature number within the theme, 1-indexed sequential
- `name` (str): Feature slug (e.g., "001-feature-name")
- `requirements` (str): Full requirements.md markdown content
- `implementation_plan` (str): Full implementation-plan.md markdown content (NOTE: underscore, not hyphen)

Missing the `number` field or using `implementation-plan` instead of `implementation_plan` will cause a KeyError.

### 6. Validate Design Completeness

Call `validate_version_design`:

```python
validate_version_design(
    project="${PROJECT}",
    version="${VERSION}"
)
```

Expected: All documents exist, no missing files.

## Output Requirements

Create in `comms/outbox/exploration/design-${VERSION}-007-persist/`:

### README.md (required)

First paragraph: Summary of persistence operation (success/failure, documents created).

Then:
- **Design Version Call**: Result and any errors
- **Design Theme Calls**: Result for each theme
- **Validation Result**: Output from validate_version_design
- **Missing Documents**: Any documents not created (should be none)

### persistence-log.md

Detailed log of all MCP calls:

```markdown
## design_version Call
**Parameters**: project, version, themes count, backlog_ids count
**Result**: [success/error]
**Output**: [tool output]

---

## design_theme Call - Theme 01
**Parameters**: theme_number, theme_name, features count
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
- [ ] [... all documents listed]

Use `read_document` to verify each file exists.

## Allowed MCP Tools

- `read_document`
- `design_version`
- `design_theme`
- `validate_version_design`

## Guidelines

- ALL backlog items from PLAN.md are MANDATORY — verify all items appear in persisted documents before completing
- Verify array structure before calling design_version (see Step 3)
- Content passed to MCP tools should be the lean referenced versions from Task 006
- If any MCP call fails, document the error clearly and STOP
- Validate that ALL documents were created successfully
- Do NOT modify the design artifact store

## Error Handling

If any MCP call fails:
1. Document the exact error message
2. Document parameters used in the failing call
3. Do NOT continue to subsequent calls
4. Mark exploration as requiring manual intervention

## When Complete

```bash
git add comms/outbox/exploration/design-${VERSION}-007-persist/
git commit -m "exploration: design-${VERSION}-007-persist - documents persisted to inbox"
git push
```
