## Context

When executing a theme with multiple features of varying complexity, the order of feature execution affects risk and friction.

## Learning

Ordering features from simplest to most complex within a theme allows early features to establish module structure, patterns, and conventions that later features build upon. This creates a natural scaffolding effect where each feature has precedent to follow.

## Evidence

In v004, both themes used simple-to-complex ordering:
- Theme 01 (array-basics): first → last → unique → chunk, where first/last established the module structure and chunk (most complex, with validation integration) came last.
- Theme 02 (array-advanced): compact → flatten → intersection, where compact was a simple filter and flatten (recursive, new validator) came in the middle.

Both themes completed with 100% acceptance criteria and zero quality gate failures.

## Application

When designing themes, sequence features so that simpler features come first. Simpler features should establish the module structure and export patterns that more complex features will extend. This is especially valuable when a theme introduces a new domain module.