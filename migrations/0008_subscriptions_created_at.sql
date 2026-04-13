-- Add created_at column to subscriptions table
-- Required by ORDER BY created_at DESC queries in dashboard, agents, and settings routes
ALTER TABLE subscriptions ADD COLUMN created_at TEXT;
