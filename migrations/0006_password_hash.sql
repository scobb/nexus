-- Add password_hash column for password-based login (alternative to magic link)
ALTER TABLE users ADD COLUMN password_hash TEXT;
