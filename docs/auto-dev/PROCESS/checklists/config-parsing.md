# Config Parsing Checklist

Use when adding fields to ProjectConfig or modifying ConfigService YAML parsing.

## ProjectConfig Field Addition

- [ ] **Field definition** — Add field to `models/project.py` with type, default, and description
- [ ] **Default value** — Provide sensible default so existing configs remain valid
- [ ] **Optional vs required** — New fields should be optional to avoid breaking changes
- [ ] **Validation** — Add Pydantic validators if field has constraints

## ConfigService Parsing

- [ ] **Known keys list** — Add new field to `known_keys` set in `config.py`
- [ ] **Parse logic** — Extract value from YAML with fallback to default
- [ ] **Type conversion** — Handle type coercion (str to Path, int to float, etc.)
- [ ] **Nested objects** — Parse nested configs into sub-models (e.g., `GitConfig`, `WebhookConfig`)

## YAML Structure

- [ ] **Consistent naming** — Use snake_case for YAML keys matching Python field names
- [ ] **Documentation** — Update example configs in docs if user-facing
- [ ] **Schema alignment** — Field name in YAML matches Pydantic model field name

## Default Value Handling

- [ ] **Model defaults** — Define defaults in Pydantic `Field()` for self-documenting models
- [ ] **Parsing defaults** — Use `.get(key, default)` pattern when extracting from YAML
- [ ] **Backward compatibility** — Missing keys in old configs use appropriate defaults

## Testing

- [ ] **Unit test parsing** — Test field extracted correctly from sample YAML
- [ ] **Default test** — Test default value used when field omitted
- [ ] **Invalid value test** — Test appropriate error for invalid field values
- [ ] **Unknown field warning** — Verify warning emitted for unrecognized config keys

## Example: Adding a New Field

```python
# models/project.py
class ProjectConfig(BaseModel):
    new_field: str = Field(
        default="default_value",
        description="Description of what this field does"
    )

# services/config.py - in _load_from_yaml_string
known_keys = {
    "path",
    "description",
    # ... existing keys ...
    "new_field",  # Add to known_keys
}

# Extract from config dict
new_field = config.get("new_field", "default_value")
```
