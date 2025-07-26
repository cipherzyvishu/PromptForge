-- Migration: Simplify prompts schema to remove variables and focus on high-quality text prompts
-- This migration transforms the existing prompts table to use a simplified structure

-- Step 1: Add new columns
ALTER TABLE prompts 
ADD COLUMN IF NOT EXISTS prompt TEXT,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general',
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Step 2: Migrate existing data
-- Use content if available, fallback to template, and ensure prompt field is populated
UPDATE prompts 
SET prompt = COALESCE(content, template, '')
WHERE prompt IS NULL OR prompt = '';

-- Set category based on first tag or default to 'general'
UPDATE prompts 
SET category = CASE 
  WHEN tags IS NOT NULL AND array_length(tags, 1) > 0 THEN tags[1]
  ELSE 'general'
END
WHERE category = 'general';

-- Mark some high-usage prompts as featured
UPDATE prompts 
SET is_featured = TRUE 
WHERE likes > 50 OR usage_count > 100;

-- Step 3: Make prompt column NOT NULL (after data migration)
ALTER TABLE prompts 
ALTER COLUMN prompt SET NOT NULL;

-- Step 4: Make category column NOT NULL
ALTER TABLE prompts 
ALTER COLUMN category SET NOT NULL;

-- Step 5: Drop old columns (comment out for safety - uncomment after verifying migration)
-- ALTER TABLE prompts DROP COLUMN IF EXISTS content;
-- ALTER TABLE prompts DROP COLUMN IF EXISTS template;
-- ALTER TABLE prompts DROP COLUMN IF EXISTS variables;
