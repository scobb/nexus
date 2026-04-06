#!/bin/bash
# Nexus production deployment script
# Run this after setting a valid CLOUDFLARE_API_TOKEN in .env
#
# Prerequisites:
#   - Valid CLOUDFLARE_API_TOKEN with permissions:
#       Workers Scripts (Edit), D1 (Edit), KV Storage (Edit), DNS (Edit), Account Settings (Read)
#   - CLOUDFLARE_ACCOUNT_ID set in .env
#   - All secrets ready: RESEND_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID, SESSION_SECRET
#
# Usage: bash deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Load .env from parent (ralph-bootstrap) directory
if [ -f "../.env" ]; then
  export $(grep -v '^#' ../.env | xargs)
fi

echo "=== Nexus Production Deployment ==="
echo ""

# Step 1: Create D1 database
echo "[1/8] Creating D1 database..."
DB_OUTPUT=$(npx wrangler d1 create nexus-db 2>&1)
echo "$DB_OUTPUT"
DB_ID=$(echo "$DB_OUTPUT" | grep 'database_id' | awk -F'"' '{print $2}' || echo "")
if [ -z "$DB_ID" ]; then
  # Try alternate parsing
  DB_ID=$(echo "$DB_OUTPUT" | grep -oP '(?<=database_id = ")[^"]+' || echo "")
fi
if [ -z "$DB_ID" ]; then
  echo "ERROR: Could not extract database_id from wrangler output."
  echo "Please manually update wrangler.toml with the database_id from the output above."
  exit 1
fi
echo "D1 database_id: $DB_ID"

# Step 2: Create KV namespace
echo ""
echo "[2/8] Creating KV namespace..."
KV_OUTPUT=$(npx wrangler kv namespace create NEXUS_KV 2>&1)
echo "$KV_OUTPUT"
KV_ID=$(echo "$KV_OUTPUT" | grep -oP '(?<=id = ")[^"]+' || echo "")
if [ -z "$KV_ID" ]; then
  echo "ERROR: Could not extract KV namespace id from wrangler output."
  echo "Please manually update wrangler.toml with the namespace id from the output above."
  exit 1
fi
echo "KV namespace id: $KV_ID"

# Step 3: Update wrangler.toml with real IDs
echo ""
echo "[3/8] Updating wrangler.toml with real IDs..."
sed -i "s/placeholder-run-wrangler-d1-create-nexus-db/$DB_ID/" wrangler.toml
sed -i "s/placeholder-run-wrangler-kv-namespace-create-NEXUS_KV/$KV_ID/" wrangler.toml
echo "wrangler.toml updated."

# Step 4: Apply D1 migrations
echo ""
echo "[4/8] Applying D1 migrations..."
npx wrangler d1 migrations apply nexus-db
echo "Migrations applied."

# Step 5: Set secrets
echo ""
echo "[5/8] Setting Worker secrets..."
echo "$RESEND_API_KEY" | npx wrangler secret put RESEND_API_KEY
echo "$STRIPE_SECRET_KEY" | npx wrangler secret put STRIPE_SECRET_KEY
echo "$STRIPE_WEBHOOK_SECRET" | npx wrangler secret put STRIPE_WEBHOOK_SECRET
echo "$STRIPE_PRICE_ID" | npx wrangler secret put STRIPE_PRICE_ID
# Generate a random SESSION_SECRET if not in .env
SESSION_SECRET=${SESSION_SECRET:-$(openssl rand -hex 32)}
echo "$SESSION_SECRET" | npx wrangler secret put SESSION_SECRET
echo "Secrets set."

# Step 6: Deploy Worker
echo ""
echo "[6/8] Deploying Worker..."
npx wrangler deploy
echo "Worker deployed."

# Step 7: Verify health endpoint
echo ""
echo "[7/8] Verifying deployment..."
sleep 5
HEALTH=$(curl -s https://nexus.keylightdigital.dev/health || echo "FAILED")
echo "Health check: $HEALTH"
if echo "$HEALTH" | grep -q '"ok"'; then
  echo "Health check passed."
else
  echo "WARNING: Health check did not return expected response. Check deployment."
fi

# Step 8: DNS reminder
echo ""
echo "[8/8] DNS Setup Required"
echo "Configure a CNAME in Cloudflare DNS:"
echo "  Name: nexus"
echo "  Target: nexus.workers.dev"
echo "  Proxy: Orange cloud (Proxied)"
echo ""
echo "Or use wrangler routes to add a custom domain."
echo ""
echo "=== Deployment complete! ==="
echo "Visit https://nexus.keylightdigital.dev to verify."
