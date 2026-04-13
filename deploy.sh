#!/bin/bash
# Nexus deployment script
# Usage: bash deploy.sh staging|prod
set -euo pipefail

ENV="${1:-}"
if [[ "$ENV" != "staging" && "$ENV" != "prod" ]]; then
  echo "Usage: bash deploy.sh staging|prod"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Load .env from parent (ralph-bootstrap) directory
if [ -f "../.env" ]; then
  set -a
  source <(grep -v '^#' ../.env | grep -v '^\s*$')
  set +a
fi

echo "=== Nexus $ENV Deployment ==="

if [ "$ENV" = "staging" ]; then
  WRANGLER_ENV="staging"
  DB_NAME="nexus-db-staging"
  DEPLOY_URL="https://nexus-staging.${CLOUDFLARE_WORKERS_SUBDOMAIN:-keylightdigital.dev}"
else
  WRANGLER_ENV=""
  DB_NAME="nexus-db"
  DEPLOY_URL="https://nexus.keylightdigital.dev"
fi

WRANGLER_ENV_FLAG="${WRANGLER_ENV:+--env $WRANGLER_ENV}"

# Step 1: TypeScript check
echo "[1/4] TypeScript typecheck..."
npx tsc --noEmit
echo "  TypeScript clean"

# Step 2: Apply D1 migrations
echo "[2/4] Applying D1 migrations to $DB_NAME..."
npx wrangler d1 migrations apply "$DB_NAME" --remote $WRANGLER_ENV_FLAG
echo "  Migrations applied"

# Step 3: Deploy worker
echo "[3/4] Deploying worker..."
npx wrangler deploy $WRANGLER_ENV_FLAG
echo "  Worker deployed"

# Step 4: Health check
echo "[4/4] Verifying deployment..."
sleep 3
HEALTH=$(curl -sf "$DEPLOY_URL/health" 2>/dev/null || echo "FAILED")
if echo "$HEALTH" | grep -q '"ok"'; then
  echo "  Health check passed: $HEALTH"
else
  echo "  WARNING: Health check failed or timed out: $HEALTH"
  echo "  (New staging workers may need a few seconds to propagate)"
fi

echo ""
echo "=== $ENV deploy complete ==="
echo "DEPLOY_URL=$DEPLOY_URL"
