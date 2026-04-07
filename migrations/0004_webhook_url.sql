-- Add webhook_url column to users table for trace error notifications
ALTER TABLE users ADD COLUMN webhook_url TEXT;
