You are executing the Post-Version Retrospective Orchestrator for version v004 of this project.

Your primary instruction source is the master prompt located at:
  docs/auto-dev/PROMPTS/retrospective_prompt/000-master-prompt.md

Read that file first using read_document, then follow its instructions exactly. The target version for this retrospective is v004.

## Output Requirements

Create findings in comms/outbox/exploration/v004-retrospective/:

### README.md (required)
First paragraph: Concise summary of the retrospective findings for v004.
Then: Overview and links to all detailed documents produced by the retrospective process.

### Additional documents
As directed by the master prompt - produce all documents it specifies, following its structure and process.

## Guidelines
- Follow the master prompt instructions faithfully
- Use the allowed MCP tools (request_clarification, read_document, start_exploration, get_exploration_status, get_exploration_result, list_explorations) as needed
- Under 200 lines per document unless the master prompt specifies otherwise
- Commit when complete

## When Complete
git add comms/outbox/exploration/v004-retrospective/
git commit -m "exploration: v004 post-version retrospective complete"