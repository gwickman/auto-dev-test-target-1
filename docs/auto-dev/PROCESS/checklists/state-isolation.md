# State Isolation Checklist

Use when implementing features that manage persistent state (JSON files, state directories).

## Key Format Verification

- [ ] **Unique keys** — State keys include project identifier to prevent cross-project collisions
- [ ] **Path construction** — State paths use configurable base dirs (e.g., `comms_dir`, `auto_dev_docs_dir`)
- [ ] **Key consistency** — Same key format used for read/write/delete operations

## Multi-Project Safety

- [ ] **Concurrent access** — State operations safe when multiple projects active
- [ ] **No shared globals** — State not stored in module-level variables
- [ ] **Project isolation** — Operations on project A cannot affect project B's state

## Atomic Write Pattern

- [ ] **atomic_write_json usage** — All JSON state writes use `atomic_write_json()` from `utils/atomic.py`
- [ ] **Temp file cleanup** — No orphaned `.tmp` files on error paths
- [ ] **Parent directory creation** — `atomic_write_json` creates parent dirs; don't duplicate

## State Loading

- [ ] **Missing file handling** — Graceful handling when state file doesn't exist
- [ ] **Corrupt file handling** — Clear error messages for malformed JSON
- [ ] **Migration support** — Can upgrade from older state formats if applicable

## Testing

- [ ] **Isolated test fixtures** — Tests use `tmp_path` for state directories
- [ ] **Concurrent write tests** — Test state correctness under parallel writes
- [ ] **Error path tests** — Test behavior when disk full, permissions denied

## Example: atomic_write_json Usage

```python
from auto_dev_mcp.utils.atomic import atomic_write_json

def save_state(theme_path: Path, state: ProgressState) -> None:
    json_file = theme_path / PROGRESS_JSON_FILE
    atomic_write_json(json_file, state.model_dump(mode="json"))
```
