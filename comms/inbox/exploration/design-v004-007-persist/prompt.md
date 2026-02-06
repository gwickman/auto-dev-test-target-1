
# Task 007: Persist v004 Design Documents to Inbox

Read AGENTS.md first and follow all instructions there.

## Objective

Call the MCP design tools (design_version and design_theme) to persist all v004 design documents from the drafts into the inbox folder structure at comms/inbox/versions/execution/v004/.

## Context

This is the persist step for auto-dev-test-target-1 version v004 (Array Utilities).

The document drafts are in: comms/outbox/exploration/design-v004-005-drafts/phase-2-document-drafts.md

This file contains all 18 documents needed:
- VERSION_DESIGN.md
- THEME_INDEX.md
- 2 THEME_DESIGN.md (one per theme)
- 14 feature documents (requirements.md + implementation-plan.md for each of 7 features)

## Tasks

### Step 1: Read the complete document drafts

Read comms/outbox/exploration/design-v004-005-drafts/phase-2-document-drafts.md using read_document. It is ~26000 tokens so you may need multiple reads with offset. Extract all document content.

### Step 2: Call design_version

Call design_version with these parameters:
- project: "auto-dev-test-target-1"
- version: "v004"
- description: "Array Utilities - Implement fundamental and advanced array manipulation utilities with generic types, building on v003 validation infrastructure"
- themes: Array of 2 theme objects with name, goal, features
- backlog_ids: ["BL-018", "BL-019", "BL-020", "BL-021", "BL-022", "BL-023", "BL-024"]
- context: Object with rationale, constraints, assumptions, deferred_items
- overwrite: true (previous partial run may have created VERSION_DESIGN.md)

The themes array structure (extract goals from the drafts):
```json
[
  {
    "name": "01-array-basics",
    "goal": "Implement foundational array utility functions (first, last, unique, chunk)",
    "features": [
      {"name": "001-first", "goal": "Get first element of array safely with undefined handling"},
      {"name": "002-last", "goal": "Get last element of array safely with undefined handling"},
      {"name": "003-unique", "goal": "Remove duplicate values from array using Set"},
      {"name": "004-chunk", "goal": "Split array into fixed-size chunks handling remainder"}
    ]
  },
  {
    "name": "02-array-advanced",
    "goal": "Implement advanced array transformation utilities (compact, flatten, intersection)",
    "features": [
      {"name": "005-compact", "goal": "Remove all falsy values from array preserving truthy elements"},
      {"name": "006-flatten", "goal": "Flatten nested arrays to specified depth including Infinity"},
      {"name": "007-intersection", "goal": "Find common elements present in all provided arrays"}
    ]
  }
]
```

The context object:
```json
{
  "rationale": "Natural progression from primitive utilities to collection utilities. Arrays are fundamental data structures requiring generic type handling.",
  "constraints": ["TypeScript 5.x compatibility", "ESM modules with .js extensions", "Generic types required for all utilities", "Must integrate with v003 error types"],
  "assumptions": ["v003 validation infrastructure is stable and complete", "TypeScript generics are sufficient for type-safe array operations", "No breaking changes to existing exports"],
  "deferred_items": ["Object utilities (v005)", "Async utilities (v006)"]
}
```

### Step 3: Call design_theme for Theme 01 (array-basics)

Read the THEME_DESIGN content for Theme 01 from the drafts document and all 4 feature documents (requirements.md and implementation-plan.md for 001-first, 002-last, 003-unique, 004-chunk).

Call design_theme with:
- project: "auto-dev-test-target-1"
- version: "v004"
- theme_number: 1
- theme_name: "01-array-basics"
- theme_design: [Full THEME_DESIGN.md content from drafts for Theme 01]
- features: Array of 4 feature objects, each with number (int), name (str), requirements (str), implementation_plan (str)
- mode: "full"

CRITICAL: Each feature object MUST have these exact fields:
- number: integer (1, 2, 3, 4)
- name: string ("001-first", "002-last", "003-unique", "004-chunk")
- requirements: string (full requirements.md content)
- implementation_plan: string (full implementation-plan.md content) - NOTE: underscore, not hyphen

### Step 4: Call design_theme for Theme 02 (array-advanced)

Same pattern for Theme 02 with features 005-compact, 006-flatten, 007-intersection.

Call design_theme with:
- project: "auto-dev-test-target-1"
- version: "v004"
- theme_number: 2
- theme_name: "02-array-advanced"
- theme_design: [Full THEME_DESIGN.md content from drafts for Theme 02]
- features: Array of 3 feature objects (numbers 1, 2, 3 - sequential within theme)
- mode: "full"

Features for Theme 02 (numbers are 1-indexed within the theme):
- number: 1, name: "005-compact"
- number: 2, name: "006-flatten"
- number: 3, name: "007-intersection"

### Step 5: Validate

Call validate_version_design(project="auto-dev-test-target-1", version="v004") to confirm all documents exist.

### Step 6: Verify with read_document

Use read_document to spot-check that key files exist:
- comms/inbox/versions/execution/v004/VERSION_DESIGN.md
- comms/inbox/versions/execution/v004/THEME_INDEX.md
- comms/inbox/versions/execution/v004/01-01-array-basics/THEME_DESIGN.md
- comms/inbox/versions/execution/v004/02-02-array-advanced/THEME_DESIGN.md

## Output Requirements

Save all outputs to comms/outbox/exploration/design-v004-007-persist/:

### README.md (required)

First paragraph: Summary of persistence operation - how many documents persisted, whether validation passed.

Then:
- Design Version Call: Result
- Design Theme Calls: Result for each theme
- Validation Result: Output from validate_version_design
- Verification: Spot-check results

### persistence-log.md

Detailed log of all MCP calls with parameters and results.

### verification-checklist.md

Checklist of all expected files with existence verification.

## Allowed MCP Tools

- read_document
- design_version
- design_theme
- validate_version_design

## Guidelines

- If design_version fails because VERSION_DESIGN.md already exists, use overwrite=true
- ALL backlog items must appear in persisted documents
- If any MCP call fails, document the error and STOP
- Do NOT modify the design artifact store (comms/outbox/versions/design/v004/)

## When Complete
git add comms/outbox/exploration/design-v004-007-persist/
git commit -m "exploration: design-v004-007-persist complete"
