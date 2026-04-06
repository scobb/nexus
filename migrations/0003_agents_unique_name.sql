-- Add unique constraint on (user_id, name) to prevent duplicate agent records
-- Needed for safe upsert on first trace ingestion
CREATE UNIQUE INDEX IF NOT EXISTS idx_agents_user_name ON agents(user_id, name);
