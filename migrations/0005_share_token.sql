-- Add share_token column to traces for public shareable links
ALTER TABLE traces ADD COLUMN share_token TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_traces_share_token ON traces(share_token) WHERE share_token IS NOT NULL;
