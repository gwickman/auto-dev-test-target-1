# WebFetch Ban Test Results

Two URLs were tested. The WebFetch tool is blocked by a pre-tool hook that returns an error instructing the agent to use curl instead. Both URLs were then fetched using curl. The first URL (httpbin.org/get) succeeded with HTTP 200. The second URL (httpstat.us/504?sleep=30000) failed immediately — the server closed the TLS connection abruptly before sending a response, resulting in curl exit code 56.

## WebFetch Attempts

Both WebFetch calls were blocked before execution by a hook:

```
WebFetch is disabled due to a known hanging bug. Use curl instead.
```

The hook exits with code 2, preventing the tool from running.

## curl Results

| URL | Method | HTTP Status | curl Exit Code | Time (s) | Outcome |
|-----|--------|-------------|----------------|----------|---------|
| https://httpbin.org/get | curl | 200 | 0 | 0.95 | Success. Returned JSON with headers, origin IP, and request URL. |
| https://httpstat.us/504?sleep=30000 | curl | 000 (no response) | 56 | 0.68 | Failed. Server closed TLS connection abruptly (`schannel: server closed abruptly (missing close_notify)`) before sending any HTTP response. |

## Detailed Findings

### URL 1: httpbin.org/get

- **Tool used:** curl (WebFetch blocked by hook)
- **Succeeded:** Yes
- **Response:** HTTP 200 with JSON body containing request headers, origin IP (`77.103.3.140`), and URL
- **Error messages:** None

### URL 2: httpstat.us/504?sleep=30000

- **Tool used:** curl with `--max-time 35` (WebFetch blocked by hook)
- **Succeeded:** No
- **Response:** No HTTP response received (status 000)
- **Error message:** `curl: (56) schannel: server closed abruptly (missing close_notify)`
- **Notes:** The connection was established to `13.58.71.78:443` and the GET request was sent, but the server closed the connection before responding. The 30-second sleep never completed — the connection dropped in under 1 second. This appears to be a server-side issue with httpstat.us rather than a local timeout.
