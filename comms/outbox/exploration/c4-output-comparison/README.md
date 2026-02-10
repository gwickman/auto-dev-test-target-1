# C4 Documentation Comparison: Root Set vs Docs Set

**Verdict: The Docs set (`docs/C4-Documentation/`) is the better documentation set overall.** It wins on C4 model compliance — using correct Mermaid C4 diagram syntax throughout, correctly identifying 2 containers instead of 3, and including generation metadata with regeneration instructions. However, the Root set (`C4-Documentation/`) has better component groupings and more comprehensive user journeys. Neither set is significantly more accurate than the other; both get all function signatures, line numbers, and dependency mappings right. The ideal documentation would combine the Docs set's C4 compliance infrastructure with the Root set's architectural modeling choices.

## Winner by Category

| Dimension | Winner | Margin | Key Reason |
|-----------|--------|--------|------------|
| **Accuracy** | Tie | Negligible | Both get all 22 function signatures, line numbers, and dependencies correct. Both have minor count errors. |
| **C4 Model Compliance** | **Docs set** | Large | Correct `C4Container`/`C4Component` Mermaid syntax; proper container identification (2 not 3) |
| **Component Modeling** | **Root set** | Medium | Correctly separates Error Framework and Validation Framework; doesn't over-promote barrel export |
| **Completeness** | **Root set** | Small | More user journeys (5 vs 4), more granular personas (4 vs 3), apis/ directory explanation |
| **Usability** | **Docs set** | Small | Generation metadata, regeneration instructions, proper C4 diagrams for tooling |
| **Context Level** | **Docs set** | Small | More honest about project state; cleaner persona model |
| **Container Level** | **Docs set** | Large | Correct container count; proper C4Container diagram syntax |
| **Component Level** | **Root set** | Medium | Better component boundaries; no inflated "Library Shell" component |
| **Code Level** | Tie | Negligible | Both have identical accuracy for all signatures, dependencies, and line references |
| **README Quality** | **Docs set** | Small | Metadata, versioning, regeneration instructions outweigh Root's better audience routing |
| **Diagrams** | **Docs set** | Large | Consistent, correct C4 Mermaid syntax vs generic `graph TD` |
| **Writing Quality** | Tie | Negligible | Both are concise, clear, and appropriately technical |

**Overall: Docs set 6, Root set 3, Tie 3**

## Key Differences

1. **Container count**: Root identifies 3 containers (NPM Package, CI Pipeline, Test Runner); Docs identifies 2 (Utility Library Package, GitHub Actions CI). Docs is correct — Jest is not a separately deployable container.

2. **Component groupings**: Root separates errors and validation into distinct components; Docs merges them into a single "Error Framework" and adds a "Library Shell" component for the barrel export. Root's separation is better justified — they're separate directories with separate concerns.

3. **Diagram syntax**: Root uses generic `graph TD` Mermaid for most diagrams; Docs uses idiomatic C4 Mermaid syntax (`C4Context`, `C4Container`, `C4Component`). Docs diagrams will render correctly with C4 Mermaid plugins.

4. **Persona modeling**: Root has 4 personas including separate "Library Consumer" and "auto-dev-mcp Agent"; Docs has 3 personas with a combined "Library Maintainer" that subsumes the auto-dev role.

5. **Operational metadata**: Docs includes generation date, version tracking, and regeneration instructions. Root has none of this.

6. **Code-level file naming**: Root uses `c4-code-src-array.md` (longer, explicit); Docs uses `c4-code-array.md` (shorter, cleaner).

## Accuracy Scorecard

| Check | Root Set | Docs Set |
|-------|----------|----------|
| Function signatures (22 total) | 22/22 correct | 22/22 correct |
| Line number references | 22/22 correct | 22/22 correct |
| Dependency mapping (9 relationships) | 9/9 correct | 9/9 correct |
| No phantom functions/classes | Pass | Pass |
| No missing exports | Pass | Pass |
| Component/export counts | 1 error: "20 functions" should be 18 | 4 errors: wrong file counts per component |
| Test case counts | 2 errors: validation summary inconsistency, unique/intersection counts | 0 internal inconsistencies |
| Container identification | 1 error: Test Runner as container | Correct |
| Total factual errors | ~4 | ~5 |

Both sets are highly accurate where it matters most — function signatures, dependencies, and code references are all correct. The errors are in secondary metadata (counts, container classification).

## Detailed Analysis

- [accuracy-comparison.md](./accuracy-comparison.md) — Line-by-line cross-reference of claims against source code
- [structure-comparison.md](./structure-comparison.md) — Side-by-side comparison of architectural modeling choices
- [recommendations.md](./recommendations.md) — What to keep from each set and what improvements neither achieved
