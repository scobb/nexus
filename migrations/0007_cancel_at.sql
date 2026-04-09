-- Add cancel_at column to subscriptions table
-- Stores the Stripe cancel_at timestamp when a subscription is set to cancel at period end
ALTER TABLE subscriptions ADD COLUMN cancel_at TEXT;
