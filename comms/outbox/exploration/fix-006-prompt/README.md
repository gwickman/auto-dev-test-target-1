# Fix Task 006 Prompt - design_theme Parameter Documentation

Fixed critical bugs in the `design_theme` call guidance in task 006 prompt. The features array example was missing the required `number` field and used incorrect key name `implementation-plan` instead of `implementation_plan`.

## What Was Fixed

### Before
```python
features = [
    {
        "name": "001-feature-name",
        "requirements": "[Full requirements.md content]",
        "implementation-plan": "[Full implementation-plan.md content]"
    },
]
```

### After
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

## Two Bugs Fixed

1. **Missing `number` field**: Each feature dict requires a `number` field (integer, 1-indexed) to match the FeatureDesignInput model
2. **Wrong key name**: Changed `implementation-plan` (hyphen) to `implementation_plan` (underscore) to match the FeatureDesignInput model schema

## Additional Changes

### Added CRITICAL Callout Box
Added a prominent callout box after the features array example that explicitly lists all required fields and warns about the consequences of missing fields or using wrong key names.

### Updated Checklist in Step 3
Added a new checklist item to verify feature object structure:
- [ ] Each feature in design_theme call has `number`, `name`, `requirements`, `implementation_plan` keys

## Impact

Without these fixes, design_theme calls would fail with KeyError exceptions when the MCP tool attempts to validate the feature objects against the FeatureDesignInput Pydantic model. These fixes ensure the example code matches the actual API contract.
