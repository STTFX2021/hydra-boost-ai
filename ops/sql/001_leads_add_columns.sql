-- HYDRAI-01: Add missing columns to public.leads for HYDRAI-02 n8n intake
-- Run this ONCE against your Supabase project via SQL Editor
-- Idempotent: uses IF NOT EXISTS / safe ADD COLUMN pattern

-- Add missing columns (Postgres 9.6+ ADD COLUMN IF NOT EXISTS not available;
-- use DO block for safety)
DO $$
BEGIN
  -- industry (text) - business industry category
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'industry'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN industry text;
  END IF;

  -- message (text) - lead's message / inquiry
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'message'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN message text;
  END IF;

  -- raw (jsonb) - original webhook payload for audit
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'raw'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN raw jsonb;
  END IF;

  -- website (text)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'website'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN website text;
  END IF;

  -- tier (text) - pricing tier / plan interest
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'tier'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN tier text;
  END IF;

  -- dedupe_key (text) - for duplicate detection
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'dedupe_key'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN dedupe_key text;
  END IF;

  -- meta (jsonb) - extensible metadata
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'meta'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN meta jsonb;
  END IF;

  -- event_id (text) - idempotency / tracing key
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'event_id'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN event_id text;
  END IF;
END
$$;

-- Unique constraint on dedupe_key for 409 duplicate detection
-- Only non-null values are constrained (NULLs are always unique in Postgres)
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_dedupe_key
  ON public.leads (dedupe_key)
  WHERE dedupe_key IS NOT NULL;

-- Verify: list all columns
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'leads' ORDER BY ordinal_position;
