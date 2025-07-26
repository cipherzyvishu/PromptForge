-- Migration: Remove old columns after data migration
-- This migration removes the deprecated columns after confirming data migration was successful
-- Run this ONLY after verifying that the prompt field is properly populated

-- Drop old columns that are no longer needed
ALTER TABLE prompts DROP COLUMN IF EXISTS content;
ALTER TABLE prompts DROP COLUMN IF EXISTS template;
ALTER TABLE prompts DROP COLUMN IF EXISTS variables;
