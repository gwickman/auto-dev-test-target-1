"""Verify all persisted v005 design documents exist via read_document."""
import json
import urllib.request
import urllib.error

API_URL = "http://localhost:8000/mcp?api_key=7AsQ251zN4Z9bFK1z0qgV6HPOXI-cBW5oVvnZGOuY_I"
AUTO_DEV_TOOL_KEY = "e71fde73-0712-4dff-85e8-dec85d79885e"

def call_mcp(tool_name, arguments, timeout=60):
    arguments["autoDevToolKey"] = AUTO_DEV_TOOL_KEY
    payload = {
        "jsonrpc": "2.0", "id": 1, "method": "tools/call",
        "params": {"name": tool_name, "arguments": arguments}
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=data,
        headers={"Content-Type": "application/json", "Accept": "application/json, text/event-stream"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            result = json.loads(response.read().decode("utf-8"))
            if "error" in result:
                return result
            content = result.get("result", {}).get("content", [{}])[0].get("text", "")
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                return {"raw": content}
    except Exception as e:
        return {"error": str(e)}

# Documents to verify
docs = [
    ("VERSION_DESIGN.md", "v005/VERSION_DESIGN.md"),
    ("THEME_INDEX.md", "v005/THEME_INDEX.md"),
    ("STARTER_PROMPT.md", "v005/STARTER_PROMPT.md"),
    ("Theme 1 THEME_DESIGN.md", "v005/01-object-basics/THEME_DESIGN.md"),
    ("001-keys requirements.md", "v005/01-object-basics/001-keys/requirements.md"),
    ("001-keys implementation-plan.md", "v005/01-object-basics/001-keys/implementation-plan.md"),
    ("002-pick requirements.md", "v005/01-object-basics/002-pick/requirements.md"),
    ("002-pick implementation-plan.md", "v005/01-object-basics/002-pick/implementation-plan.md"),
    ("003-omit requirements.md", "v005/01-object-basics/003-omit/requirements.md"),
    ("003-omit implementation-plan.md", "v005/01-object-basics/003-omit/implementation-plan.md"),
    ("004-is-empty requirements.md", "v005/01-object-basics/004-is-empty/requirements.md"),
    ("004-is-empty implementation-plan.md", "v005/01-object-basics/004-is-empty/implementation-plan.md"),
    ("Theme 2 THEME_DESIGN.md", "v005/02-object-deep/THEME_DESIGN.md"),
    ("001-get requirements.md", "v005/02-object-deep/001-get/requirements.md"),
    ("001-get implementation-plan.md", "v005/02-object-deep/001-get/implementation-plan.md"),
    ("002-clone requirements.md", "v005/02-object-deep/002-clone/requirements.md"),
    ("002-clone implementation-plan.md", "v005/02-object-deep/002-clone/implementation-plan.md"),
    ("003-merge requirements.md", "v005/02-object-deep/003-merge/requirements.md"),
    ("003-merge implementation-plan.md", "v005/02-object-deep/003-merge/implementation-plan.md"),
]

results = []
for label, path in docs:
    r = call_mcp("read_document", {"project": "auto-dev-test-target-1", "path": path})
    exists = not ("error" in r)
    if exists and isinstance(r, dict):
        exists = r.get("success", True) and "error" not in str(r.get("data", {}).get("error", ""))
    results.append({"label": label, "path": path, "exists": exists})
    status = "EXISTS" if exists else "MISSING"
    print(f"[{status}] {label}: {path}")

print(f"\n=== {sum(1 for r in results if r['exists'])}/{len(results)} documents verified ===")
missing = [r for r in results if not r["exists"]]
if missing:
    print("MISSING DOCUMENTS:")
    for r in missing:
        print(f"  - {r['label']}: {r['path']}")

with open("tmp_verify_results.json", "w") as f:
    json.dump(results, f, indent=2)
