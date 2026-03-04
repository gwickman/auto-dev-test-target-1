"""Persist v005 design documents via auto-dev MCP tools."""
import json
import urllib.request
import urllib.error

API_URL = "http://localhost:8000/mcp?api_key=7AsQ251zN4Z9bFK1z0qgV6HPOXI-cBW5oVvnZGOuY_I"
AUTO_DEV_TOOL_KEY = "e71fde73-0712-4dff-85e8-dec85d79885e"

DRAFTS = "C:/Users/grant/Documents/projects/auto-dev-projects/auto-dev-test-target-1/comms/outbox/exploration/design-v005-007-drafts/drafts"

def call_mcp(tool_name, arguments, timeout=120):
    arguments["autoDevToolKey"] = AUTO_DEV_TOOL_KEY
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
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
    except urllib.error.HTTPError as e:
        return {"error": f"HTTP {e.code}", "detail": e.read().decode()}
    except Exception as e:
        return {"error": str(e)}

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def main():
    manifest = json.loads(read_file(f"{DRAFTS}/manifest.json"))
    results = {}

    # Step 1: Build themes array (slugs only, no number prefixes)
    themes = []
    for theme in manifest["themes"]:
        features = [{"name": f["slug"], "goal": f["goal"]} for f in theme["features"]]
        themes.append({"name": theme["slug"], "goal": theme["goal"], "features": features})

    # Step 2: Call design_version
    print("=== Calling design_version ===")
    dv_result = call_mcp("design_version", {
        "project": "auto-dev-test-target-1",
        "version": manifest["version"],
        "description": manifest["description"],
        "themes": themes,
        "backlog_ids": manifest["backlog_ids"],
        "context": manifest["context"],
        "overwrite": False
    })
    results["design_version"] = dv_result
    print(json.dumps(dv_result, indent=2))

    if "error" in dv_result and "UNAUTHORIZED" not in str(dv_result.get("error", "")):
        # Check if it's a real error vs just an info response
        if isinstance(dv_result.get("error"), str) and "already exists" not in str(dv_result):
            print("ERROR in design_version, stopping.")
            results["stopped_at"] = "design_version"
            with open("tmp_persist_results.json", "w") as f:
                json.dump(results, f, indent=2)
            return

    # Step 3: Call design_theme for each theme
    for theme in manifest["themes"]:
        theme_slug = theme["slug"]
        print(f"\n=== Calling design_theme for {theme_slug} ===")

        theme_design = read_file(f"{DRAFTS}/{theme_slug}/THEME_DESIGN.md")
        features = []
        for f in theme["features"]:
            req = read_file(f"{DRAFTS}/{theme_slug}/{f['slug']}/requirements.md")
            plan = read_file(f"{DRAFTS}/{theme_slug}/{f['slug']}/implementation-plan.md")
            features.append({
                "number": f["number"],
                "name": f["slug"],
                "goal": f.get("goal"),
                "requirements": req,
                "implementation_plan": plan
            })

        dt_result = call_mcp("design_theme", {
            "project": "auto-dev-test-target-1",
            "version": manifest["version"],
            "theme_number": theme["number"],
            "theme_name": theme["slug"],
            "theme_design": theme_design,
            "features": features,
            "mode": "full"
        })
        results[f"design_theme_{theme_slug}"] = dt_result
        print(json.dumps(dt_result, indent=2))

        if "error" in dt_result:
            err_str = str(dt_result.get("error", ""))
            if "UNAUTHORIZED" in err_str:
                print(f"UNAUTHORIZED for design_theme {theme_slug}, stopping.")
                results["stopped_at"] = f"design_theme_{theme_slug}"
                break

    # Step 4: Call validate_version_design
    print("\n=== Calling validate_version_design ===")
    vv_result = call_mcp("validate_version_design", {
        "project": "auto-dev-test-target-1",
        "version": "v005"
    })
    results["validate_version_design"] = vv_result
    print(json.dumps(vv_result, indent=2))

    # Save all results
    with open("tmp_persist_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\n=== All results saved to tmp_persist_results.json ===")

if __name__ == "__main__":
    main()
