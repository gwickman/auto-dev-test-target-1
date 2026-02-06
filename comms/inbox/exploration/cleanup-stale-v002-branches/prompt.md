Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

Delete the following 4 stale remote branches that were merged in v002 and are no longer needed:

- origin/v002/01-string-utils/002-truncate
- origin/v002/01-string-utils/003-slugify
- origin/v002/02-number-utils/001-clamp
- origin/v002/02-number-utils/002-round-to

Use `git push origin --delete` for each branch.

After deletion, run `git fetch --prune` to clean up local remote-tracking refs.

## Output Requirements

Create findings in comms/outbox/exploration/cleanup-stale-v002-branches/:

### README.md (required)
First paragraph: Summary of branches deleted and final state.
Then: List each branch and its deletion status.

## Guidelines
- Under 200 lines per document
- Confirm each deletion succeeded

## When Complete
git add comms/outbox/exploration/cleanup-stale-v002-branches/
git commit -m "chore: delete stale v002 remote branches"
