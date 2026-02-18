Read AGENTS.md first and follow all instructions there, including the mandatory PR workflow.

Test fetching two URLs. For each, attempt to retrieve the content and record the results.

## URLs to Test

1. https://httpbin.org/get — A healthy, fast-responding URL. Fetch its content.
2. https://httpstat.us/504?sleep=30000 — A URL that sleeps for 30 seconds before responding. Fetch its content.

For each URL, record:
- What tool/method was used (WebFetch, curl, etc.)
- Whether the request succeeded or was blocked/errored
- Any error messages
- The outcome (content returned, blocked, timeout, etc.)

## Output Requirements

Create findings in comms/outbox/exploration/webfetch-ban-test/:

### README.md (required)
First paragraph: Summary of what happened for both URLs.
Then: Results table with URL, method used, outcome, and any error messages.

## Guidelines
- Just fetch the two URLs and report honestly what happened
- Under 100 lines for README.md

## When Complete
git add comms/outbox/exploration/webfetch-ban-test/
git commit -m "exploration: webfetch-ban-test complete"