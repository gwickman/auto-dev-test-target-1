# Test Learning for Soft Delete

This learning is created to test the soft delete functionality of the delete_learning tool.

## Key Points
- This should be marked as deleted but still retrievable
- Content file should remain on disk
- Should not appear in list_learnings by default

## Expected Behavior
When soft deleted, the learning metadata should be updated with a deleted flag, but the content file should remain intact for potential recovery.