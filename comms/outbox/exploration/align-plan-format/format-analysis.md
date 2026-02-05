# PLAN.md Format Analysis

## Template Structure (00-PROJECT-PLAN.md)

The template defines this structure:

1. **Header Section**
   - Title: `# {Project Name} - Development Plan`
   - Metadata block with strategic roadmap reference and last updated

2. **Roadmap → Version Mapping** (table)
   - Columns: Version, Roadmap Reference, Focus, Prerequisites, Status

3. **Investigation Dependencies** (table)
   - Columns: ID, Question, Informs, Status, Results
   - Tracks explorations that inform version design

4. **Scoping Decisions** (per-version sections)
   - What's included and why
   - What's deferred and why
   - Rationale for boundaries

5. **Completed Versions** (per-version sections)
   - Completed date
   - Retrospective link
   - Key learnings references (LRN-XXX)
   - Backlog items created
   - Notes

6. **Backlog Integration** (table)
   - Tag descriptions and purposes
   - Query examples

7. **Change Log** (table)
   - Columns: Date, Change, Rationale

## Current PLAN.md Structure

1. **Title**: `# auto-dev-test-target-1 Development Plan`
2. **Project Overview** (prose section)
3. **Technology Stack** (bullet list)
4. **Completed Versions** (detailed sections per version)
5. **Planned Versions** (detailed sections per version)
6. **Version Mapping** (table)
7. **Development Principles** (numbered list)
8. **Quality Standards** (bullet list)
9. **Next Steps** (numbered list)

## Key Differences

### Missing from Current PLAN.md

1. **Strategic roadmap reference** - No metadata block linking to roadmap
2. **Investigation Dependencies section** - No tracking of explorations
3. **Scoping Decisions section** - No rationale for version boundaries
4. **Backlog Integration section** - No backlog tag guidance
5. **Change Log section** - No history of plan updates

### Different in Current PLAN.md

1. **Section order** - Different from template
2. **Version Mapping table** - Current has different columns than template
3. **Completed Versions format** - More detailed than template, but missing key elements:
   - No retrospective links
   - No learning references (LRN-XXX format)
   - No backlog items created references
4. **Additional sections** - Has Project Overview, Technology Stack, Development Principles, Quality Standards, Next Steps (not in template)

### Sections to Preserve

The following sections contain valuable project-specific content:
- Project Overview (adapt as intro content)
- Technology Stack (move to metadata area or integrate)
- Detailed version descriptions (preserve but reformat)
- Development Principles (preserve in appropriate location)

## Structural Changes Required

### 1. Header Section
- ✅ Title already matches pattern
- ➕ Add metadata block with strategic roadmap reference (none exists yet, so reference ROADMAP.md)
- ➕ Add "Last Updated" date

### 2. Section Reordering
```
Current Order                    → Template Order
--------------------------------------------------
1. Project Overview              → (integrate into header/intro)
2. Technology Stack              → (integrate into header/intro)
3. Completed Versions            → 5. Completed Versions (reformatted)
4. Planned Versions              → (integrate into Roadmap Mapping & Scoping)
5. Version Mapping               → 2. Roadmap → Version Mapping (reformatted)
6. Development Principles        → (preserve as appendix or note)
7. Quality Standards             → (preserve as appendix or note)
8. Next Steps                    → (remove or integrate)

New Additions:
→ 3. Investigation Dependencies (new section)
→ 4. Scoping Decisions (new section)
→ 6. Backlog Integration (new section)
→ 7. Change Log (new section)
```

### 3. Table Reformatting

**Roadmap → Version Mapping:**
- Change columns from: `Version | Focus Area | Themes | Est. Features | Priority`
- To: `Version | Roadmap Reference | Focus | Prerequisites | Status`

### 4. Completed Versions Reformatting

Each completed version needs:
- Keep existing detail but reformat structure
- Add retrospective link placeholder (if none exists)
- Add learning references (LRN-XXX format)
- Add backlog items created
- Consolidate notes section

### 5. New Sections

Add these template sections:
- **Investigation Dependencies**: Empty initially or reference existing explorations
- **Scoping Decisions**: Document v001-v003 rationale from existing content
- **Backlog Integration**: Add template tag table
- **Change Log**: Create with initial entries

## Content Preservation Strategy

1. **Keep all version details** - Comprehensive v001-v003 information
2. **Keep backlog references** - BL-018 through BL-037 mentioned in planned versions
3. **Keep development principles** - Move to appropriate location
4. **Adapt project overview** - Integrate into header metadata
5. **Document completed explorations** - Add to Investigation Dependencies if any exist

## Next Actions

1. Create new PLAN.md with template structure
2. Port all existing content into appropriate sections
3. Add missing template sections
4. Reformat tables to match template
5. Add Change Log entry for this update
