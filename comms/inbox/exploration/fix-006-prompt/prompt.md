Fix the task 006 prompt file to correct the design_theme call guidance.

**File to edit:** `docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/006-persist-documents.md`

**What to fix in Step 5 ("Call design_theme for Each Theme"):**

The current features array example is WRONG:
```python
features = [
    {
        "name": "001-feature-name",
        "requirements": "[Full requirements.md content]",
        "implementation-plan": "[Full implementation-plan.md content]"
    },
]
```

It must be replaced with the CORRECT format:
```python
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
]
```

**Two bugs fixed:**
1. Added required `number` field (integer, 1-indexed) to each feature dict
2. Changed `implementation-plan` (hyphen) to `implementation_plan` (underscore) to match the FeatureDesignInput model

Also add a CRITICAL callout box after the features array example:

```markdown
**CRITICAL - Feature Object Required Fields:**
Each feature dict MUST contain ALL of these fields:
- `number` (int): Feature number within the theme, 1-indexed sequential
- `name` (str): Feature slug (e.g., "001-feature-name")
- `requirements` (str): Full requirements.md markdown content
- `implementation_plan` (str): Full implementation-plan.md markdown content (NOTE: underscore, not hyphen)

Missing the `number` field or using `implementation-plan` instead of `implementation_plan` will cause a KeyError.
```

Also update the CRITICAL checklist in Step 3 to add:
- [ ] Each feature in design_theme call has `number`, `name`, `requirements`, `implementation_plan` keys

## Output Requirements

Create findings in comms/outbox/exploration/fix-006-prompt/:

### README.md (required)
First paragraph: Summary of what was fixed and why.
Show the before and after of the changed section.

## When Complete
git add docs/auto-dev/PROMPTS/design_version_prompt/task_prompts/006-persist-documents.md
git add comms/outbox/exploration/fix-006-prompt/
git commit -m "fix: correct design_theme parameter docs in task 006 prompt (number field, underscore)"
git push