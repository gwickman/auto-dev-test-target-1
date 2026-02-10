# Changes Detail

Full details of every edit made, organized by file, with before/after context.

---

## File: `task_prompts/002-code-level-analysis.md`

### Change 1: Added Parent Component field to template

**Location:** Overview section of the code-level document template (after "Purpose" field)

**Before:**
```markdown
- **Language**: [Primary language(s)]
- **Purpose**: [What this code accomplishes]
```

**After:**
```markdown
- **Language**: [Primary language(s)]
- **Purpose**: [What this code accomplishes]
- **Parent Component**: [To be assigned in Task 003]
```

### Change 2: Added Parent Component guideline

**Location:** Guidelines section (added as first guideline)

**Before:**
```markdown
## Guidelines

- **Accuracy over completeness** — if you can't determine a return type, say "unknown" rather than guess
```

**After:**
```markdown
## Guidelines

- **Include a Parent Component field** set to "TBD" in each code-level doc — Task 003 will update these references during component synthesis
- **Accuracy over completeness** — if you can't determine a return type, say "unknown" rather than guess
```

### Change 3: Added verified test counts guideline

**Location:** Guidelines section (after the test directory guideline)

**Before:**
```markdown
- **For test directories, include:** total test count (number of `it()` or `test()` calls), test file inventory with per-file counts, and coverage summary showing which source functions have test coverage
- **Skip generated files** (auto-generated code, compiled output, etc.)
```

**After:**
```markdown
- **For test directories, include:** total test count (number of `it()` or `test()` calls), test file inventory with per-file counts, and coverage summary showing which source functions have test coverage
- **Verified test counts:** When documenting test directories, attempt to get verified test counts by running the project's test command (e.g., `npm test`, `pytest --co -q`, `cargo test -- --list`). If the test command succeeds, use the actual count. If it fails or is unavailable, estimate from the source and note "estimated from source — not verified by execution"
- **Skip generated files** (auto-generated code, compiled output, etc.)
```

---

## File: `task_prompts/003-component-synthesis.md`

### Change 1: Added component boundary rules

**Location:** Rules section under "Identify Component Boundaries"

**Before:**
```markdown
**Rules:**
- Every `c4-code-*.md` file must belong to exactly one component
- Target 2-8 code-level elements per component. Single-element components are acceptable for standalone modules. Components exceeding 8 elements should be reviewed for possible splitting, but are acceptable when the domain justifies it
- If a directory doesn't fit anywhere, it becomes its own component
```

**After:**
```markdown
**Rules:**
- Every `c4-code-*.md` file must belong to exactly one component
- Target 2-8 code-level elements per component. Single-element components are acceptable for standalone modules. Components exceeding 8 elements should be reviewed for possible splitting, but are acceptable when the domain justifies it
- Never merge unrelated directories just to reach the minimum. A 2-element component with clear purpose is better than a 5-element component with mixed concerns
- Do NOT merge directories that have separate concerns just to meet a size target. If `src/errors/` and `src/validation/` are separate directories with distinct purposes, they should be separate components even if each has only 2-3 code elements
- Barrel export files (e.g., `src/index.ts` that just re-exports from other modules) should be documented at the code level but do NOT warrant their own component. Assign barrel exports to whichever component they most closely serve, or to a "Shell" component only if there is genuine orchestration logic beyond re-exports
- If a directory doesn't fit anywhere, it becomes its own component
```

### Change 2: Added step 4 for updating Parent Component links

**Location:** Between step 3 (Document Each Component) and the master index step

**Before:**
```markdown
### 4. Create Master Component Index
```

**After:**
```markdown
### 4. Update Code-Level Parent Component Links

After identifying component boundaries, update each `c4-code-*.md` file's "Parent Component" field with a link to the component doc it belongs to (e.g., `[Error Framework](./c4-component-error-framework.md)`). This creates upward navigation from code-level docs to their parent component.

### 5. Create Master Component Index
```

### Change 3: Renumbered Delta Mode Consideration

**Location:** Section header

**Before:** `### 5. Delta Mode Consideration`
**After:** `### 6. Delta Mode Consideration`

### Change 4: Added Full Dependency Graph to master index template

**Location:** Master component index template, between "Component Relationships" and "Component-to-Code Mapping"

**Before:**
```markdown
## Component-to-Code Mapping

[Table showing which c4-code-*.md files belong to which component]
```

**After:**
```markdown
## Full Dependency Graph

[Single comprehensive Mermaid diagram showing ALL import relationships between components — not just primary dependencies. Every component-to-component relationship should be represented.]

## Component-to-Code Mapping

[Table showing which c4-code-*.md files belong to which component]
```

---

## File: `task_prompts/004-container-synthesis.md`

### Change 1: Added test runner exclusion rule

**Location:** Container identification section, after the container type list

**Before:**
```markdown
- Reverse proxies / API gateways

**If no explicit infrastructure definitions exist:**
```

**After:**
```markdown
- Reverse proxies / API gateways

Development tools and test runners (Jest, pytest, cargo test, etc.) are **NOT** containers. They run inside development environments and CI pipelines, not as independently deployable units. Only include them if they are separately deployed services (e.g., a dedicated test environment with its own infrastructure).

**If no explicit infrastructure definitions exist:**
```

### Change 2: Added Build Output section to container template

**Location:** Container documentation template, between "Dependencies" and "Infrastructure" sections

**Before:**
```markdown
#### Dependencies
- [Other Container]: [Protocol, description]
- [External System]: [Integration type]

#### Infrastructure
```

**After:**
```markdown
#### Dependencies
- [Other Container]: [Protocol, description]
- [External System]: [Integration type]

#### Build Output
- **Build Command**: [e.g., `npm run build`, `cargo build --release`]
- **Output Directory**: [e.g., `dist/`, `target/release/`]
- **Key Artifacts**: [List of output files — compiled JS, declaration files, binaries, etc.]
- **Module Format**: [e.g., ESM, CJS, UMD]
- **Declaration Files**: [e.g., `.d.ts` files for TypeScript libraries]

#### Infrastructure
```

---

## File: `task_prompts/005-context-synthesis.md`

### Change 1: Added minimum persona requirement

**Location:** After the "Programmatic users" list, before the "If unclear from docs" note

**Before:**
```markdown
- What monitoring or automation tools connect to it?

**If unclear from docs:** Infer from API design, authentication mechanisms, and test fixtures.
```

**After:**
```markdown
- What monitoring or automation tools connect to it?

Identify at LEAST 3 personas. Consider these categories: end users (human consumers of the system), programmatic users (other systems, CLI tools, agents that interact with the system), maintainers (developers, CI systems, automation tools that modify the system). If an automation tool like auto-dev-mcp or CI is a significant actor, give it its own persona.

**If unclear from docs:** Infer from API design, authentication mechanisms, and test fixtures.
```

### Change 2: Added minimum user journey requirement

**Location:** After the programmatic user journey template, before "Catalog External Dependencies"

**Before:**
```markdown
4. **Respond**: Returns result with status code
\`\`\`

### 6. Catalog External Dependencies
```

**After:**
```markdown
4. **Respond**: Returns result with status code
\`\`\`

Create at LEAST one user journey per persona. For library projects, include a "Library Integration" journey showing how a consumer adds and uses the dependency. For projects with automation, include an "Automated Development" journey showing the CI/auto-dev workflow.

### 6. Catalog External Dependencies
```
