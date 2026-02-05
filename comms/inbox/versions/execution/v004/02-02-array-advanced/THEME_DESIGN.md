# Theme: array-advanced

## Goal

Implement advanced array transformation utilities that handle complex operations: filtering falsy values (compact), flattening nested structures with depth control (flatten), and finding common elements across multiple arrays (intersection). Build upon JavaScript Set operations, native Array methods, and variadic parameters for sophisticated array manipulation. This theme extends the array module established in Theme 01 with more complex algorithms.

## Features

| # | Feature | Backlog | Goal | Complexity |
|---|---------|---------|------|------------|
| 005 | compact | BL-023 | Remove all falsy values preserving truthy elements | Medium |
| 006 | flatten | BL-022 | Flatten nested arrays to specified depth (including Infinity) | Medium-High |
| 007 | intersection | BL-024 | Find common elements across multiple arrays with variadic params | Medium-High |

## Technical Approach

### Type Strategy

**compact()**: Uses generic `<T>` but with type limitation
- Return type: `T[]` (best effort)
- TypeScript cannot infer non-falsy subset type automatically
- Trade-off accepted: Simplicity over perfect type safety
- Example: `(string | null)[]` → `(string | null)[]` not `string[]`

**flatten()**: Uses `any[]` NOT generics
- **Investigation Finding**: Arbitrary nesting depth makes generic type preservation impractical
- Explicit trade-off: Flexibility over type safety
- Documented in JSDoc and tests

**intersection()**: Uses generic `<T>` with variadic parameters
- Signature: `function intersection<T>(...arrays: T[][]): T[]`
- T preserved across all input arrays
- Standard TypeScript variadic pattern

### Implementation Approaches

**compact()**:
- Implementation: `return arr.filter(Boolean)`
- Idiomatic JavaScript, leverages Boolean constructor as filter predicate
- Removes: false, null, 0, "", undefined, NaN
- Preserves: all truthy values including `[]` and `{}` (these are truthy!)
- No validation needed (trust TypeScript types)

**flatten()** - CRITICAL DESIGN DECISION:
- **Uses Native Array.prototype.flat()** ✅
- **Investigation Finding**: Native method available in Node 20.x (ES2019)
- **Rationale**: Simpler, faster, battle-tested vs custom recursive implementation
- Implementation: `return arr.flat(depth)` after validation
- Validation: depth must be non-negative integer OR Infinity
- Special handling: `if (depth !== Infinity && !isNonNegativeInteger(depth))`

**intersection()**:
- Variadic parameters: `...arrays: T[][]`
- Algorithm: Filter first array against Sets of all other arrays
- Set-based for O(n*m) performance (n=elements, m=arrays)
- Uses `every()` to check presence in all Sets
- **Set Behavior** applies: reference equality for objects, NaN handled correctly

### Validation Integration

**flatten() depth parameter**:
```typescript
if (depth !== Infinity && !isNonNegativeInteger(depth)) {
  throw new InvalidNumberError('depth must be a non-negative integer or Infinity', 'depth');
}
```

**Rationale**: Must handle Infinity as special case before validator check. Non-negative allows depth=0 (returns original array structure).

## Dependencies

**External Dependencies**:
- Theme 01 (establishes src/array/ module structure)
- v003 validation infrastructure
- isNonNegativeInteger validator (created in Theme 01)
- TypeScript 5.x with variadic parameter support
- ES2019 Array.prototype.flat() (available in Node 20.x)

**Internal Dependencies**:
- All 3 features are independent within this theme
- Builds on src/array/ structure from Theme 01
- Recommended order: compact → flatten → intersection (simple to complex)

## Integration Points

**With Theme 01**:
- Extends existing src/array/ module
- Adds new files: compact.ts, flatten.ts, intersection.ts
- Updates src/array/index.ts to export new functions
- No changes to src/index.ts (already exports array module)

**With v003 Validation**:
- Import: `import { InvalidNumberError } from '../errors/index.js';`
- Import: `import { isNonNegativeInteger } from '../validation/index.js';`
- Same pattern as chunk() in Theme 01

**Testing Integration**:
- Continue tests/array/ directory structure
- Same comprehensive testing approach as Theme 01
- Special focus: Set behavior tests, depth handling tests, variadic parameter tests

## Risks and Mitigations

| Risk | Status | Mitigation |
|------|--------|------------|
| flatten() implementation approach | ✅ RESOLVED | Use native Array.flat(), available in Node 20.x |
| Type safety in flatten() | ✅ RESOLVED | Accepted trade-off using any[], document limitation |
| Type safety in compact() | ✅ RESOLVED | Accepted TypeScript limitation, return T[] best-effort |
| Set behavior documentation | ✅ RESOLVED | Comprehensive tests, JSDoc comments added |
| Variadic parameter complexity | ✅ RESOLVED | Standard TypeScript pattern, well-tested |
| Infinity handling in flatten() | ✅ RESOLVED | Explicit check before validator, tests cover |

## Test Strategy

**Per Function Targets**:
- compact(): ~18 tests (all falsy types, truthy preservation, empty, types)
- flatten(): ~20 tests (depth 0/1/2/Infinity, nested arrays, validation, types)
- intersection(): ~20 tests (2+ arrays, no common, empty, NaN, objects, types)

**Total Theme Tests**: ~58 tests

**Special Coverage**:
- compact(): Test all 6 falsy values explicitly, verify empty arrays/objects preserved
- flatten(): Test each depth level, Infinity, negative depth error, non-integer error
- intersection(): Test NaN equality, object reference behavior, single array, empty arrays

## Implementation Order

1. Implement compact() + tests → PR → merge
2. Implement flatten() + tests → PR → merge
3. Implement intersection() + tests → PR → merge
4. Update src/array/index.ts to export all new functions

**Rationale**: Sequential implementation allows each feature to build confidence. compact() is simplest, flatten() demonstrates native method usage, intersection() shows variadic parameter mastery.

## Success Criteria

Theme complete when:
- ✅ All 3 features implemented with comprehensive tests
- ✅ src/array/index.ts exports all functions
- ✅ All tests pass (~58 new tests)
- ✅ TypeScript compilation succeeds
- ✅ CI passes on all PRs
- ✅ flatten() uses native Array.flat() with proper validation
- ✅ Set behavior documented and tested
- ✅ Type limitations documented in code and JSDoc
- ✅ No technical debt introduced
- ✅ Variadic parameters work correctly with type inference
