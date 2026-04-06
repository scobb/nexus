-- Add key_prefix column for display purposes
-- Stores first 8 characters of the plaintext key (e.g., "nxs_abcd")
ALTER TABLE api_keys ADD COLUMN key_prefix TEXT NOT NULL DEFAULT '';
