Explore the auto-dev-test-target-1 codebase to answer:

1. What versions have been completed? (check docs/versions/)
2. What are the existing features and functionality in the codebase?
3. What is the project's current structure and capabilities?
4. Are there any existing planning documents (roadmap, plan, etc.)?
5. What would be logical next steps for this project?

## Output Requirements

Create findings in comms/outbox/exploration/existing-versions-review/:

### README.md (required)
First paragraph: Summary of completed work and project state.
Then: Overview and links to detailed documents.

### completed-versions.md
- List all completed versions with dates
- What each version delivered
- Links to retrospectives or summaries

### current-capabilities.md
- Project structure overview
- Implemented features
- Technology stack
- Key patterns and approaches

### planning-analysis.md
- Existing planning documents found
- Gaps in documentation
- Recommended logical next features (3-5 themes worth)

## Guidelines
- Under 200 lines per document
- Include specific file paths and version numbers
- Suggest coherent next features for testing the design process

## When Complete
Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

git add comms/outbox/exploration/existing-versions-review/
git commit -m "exploration: existing-versions-review complete"
