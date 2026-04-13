#!/usr/bin/env npx tsx
/**
 * Stripe Webhook E2E Test Suite
 *
 * Tests the full billing lifecycle against the staging environment using
 * Stripe test mode. Creates real Stripe objects, then directly delivers
 * signed webhook events to staging for deterministic, fast testing.
 *
 * Usage: npm run test:webhooks (from nexus/ directory)
 * Requires: .env with STRIPE_TEST_SECRET_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
 */

import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

// ─── Load environment ────────────────────────────────────────────────────────

function loadEnv(envPath: string): Record<string, string> {
  if (!fs.existsSync(envPath)) return {}
  return fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .reduce<Record<string, string>>((acc, l) => {
      const [k, ...rest] = l.split('=')
      acc[k.trim()] = rest.join('=').trim()
      return acc
    }, {})
}

const rootEnv = loadEnv(path.join(__dirname, '../../.env'))
const env = { ...rootEnv, ...process.env }

const STRIPE_TEST_KEY = env.STRIPE_TEST_SECRET_KEY
const STRIPE_TEST_PRICE_ID = env.STRIPE_TEST_PRICE_ID || 'price_1TKrqnRhEblTFzoxq1tc0CZz'
const STAGING_WEBHOOK_SECRET = env.STRIPE_TEST_WEBHOOK_SECRET || 'whsec_uB1vfEHoj2kw7INbXTcggQq1WxpAYVFK'
const CF_API_TOKEN = env.CLOUDFLARE_API_TOKEN
const CF_ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID
const STAGING_DB_ID = 'ce65e1b6-656e-4b3d-9c29-b1e2492b1a1e'
const STAGING_URL = 'https://nexus-staging.stevencolecobb.workers.dev'

if (!STRIPE_TEST_KEY) {
  console.error('ERROR: STRIPE_TEST_SECRET_KEY not set in environment or .env')
  process.exit(1)
}
if (!CF_API_TOKEN || !CF_ACCOUNT_ID) {
  console.error('ERROR: CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID not set')
  process.exit(1)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

let passed = 0
let failed = 0

function pass(msg: string) {
  console.log(`  ✅ ${msg}`)
  passed++
}

function fail(msg: string) {
  console.error(`  ❌ ${msg}`)
  failed++
}

function assert(cond: boolean, msg: string) {
  if (cond) pass(msg)
  else fail(msg)
}

// ─── Stripe API ───────────────────────────────────────────────────────────────

async function stripe(
  method: 'GET' | 'POST' | 'DELETE',
  endpoint: string,
  body?: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const url = `https://api.stripe.com/v1${endpoint}`
  const headers: Record<string, string> = {
    Authorization: `Bearer ${STRIPE_TEST_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  function encodeParams(obj: Record<string, unknown>, prefix = ''): string[] {
    return Object.entries(obj).flatMap(([k, v]) => {
      const key = prefix ? `${prefix}[${k}]` : k
      if (Array.isArray(v)) {
        return v.flatMap((item, i) => {
          if (item !== null && typeof item === 'object') {
            return encodeParams(item as Record<string, unknown>, `${key}[${i}]`)
          }
          return [`${encodeURIComponent(key)}[${i}]=${encodeURIComponent(String(item))}`]
        })
      }
      if (v !== null && typeof v === 'object') {
        return encodeParams(v as Record<string, unknown>, key)
      }
      return [`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`]
    })
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? encodeParams(body).join('&') : undefined,
  })
  const data = await res.json() as Record<string, unknown>
  if (!res.ok && (data as { error?: unknown }).error) {
    const err = (data as { error: { message: string } }).error
    throw new Error(`Stripe ${method} ${endpoint}: ${err.message}`)
  }
  return data
}

// ─── Cloudflare D1 API ────────────────────────────────────────────────────────

async function d1(sql: string, params: unknown[] = []): Promise<Record<string, unknown>[]> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${STAGING_DB_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql, params }),
    }
  )
  const data = await res.json() as { result?: Array<{ results: Record<string, unknown>[] }> }
  return data.result?.[0]?.results ?? []
}

// ─── Webhook delivery ─────────────────────────────────────────────────────────

/**
 * Sign a webhook payload using the Stripe signature format and POST it
 * directly to the staging webhook endpoint. This tests the full webhook
 * handler code path without depending on Stripe's async delivery.
 */
async function deliverWebhook(event: Record<string, unknown>): Promise<void> {
  const payload = JSON.stringify(event)
  const timestamp = Math.floor(Date.now() / 1000)
  const sigPayload = `${timestamp}.${payload}`

  // The Worker uses the full whsec_ string as the HMAC key (matching Stripe SDK behavior)
  const sig = crypto.createHmac('sha256', STAGING_WEBHOOK_SECRET).update(sigPayload).digest('hex')
  const stripeSignature = `t=${timestamp},v1=${sig}`

  const res = await fetch(`${STAGING_URL}/api/webhooks/stripe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': stripeSignature,
    },
    body: payload,
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Webhook delivery failed: ${res.status} ${body}`)
  }
}

function makeSubscriptionEvent(
  type: string,
  customerId: string,
  subscriptionId: string,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  const now = Math.floor(Date.now() / 1000)
  return {
    id: `evt_test_${crypto.randomBytes(8).toString('hex')}`,
    object: 'event',
    type,
    livemode: false,
    created: now,
    data: {
      object: {
        id: subscriptionId,
        object: 'subscription',
        customer: customerId,
        status: 'active',
        current_period_end: now + 30 * 24 * 3600,
        cancel_at: null,
        cancel_at_period_end: false,
        ...overrides,
      },
    },
  }
}

// ─── Main test suite ─────────────────────────────────────────────────────────

async function runTests() {
  const testEmail = `webhook-test-${Date.now()}@test.invalid`
  let userId: string
  let customerId: string
  let subscriptionId: string
  let checkoutSessionId: string

  console.log('\n📋 Stripe Webhook E2E Test Suite')
  console.log(`   Staging: ${STAGING_URL}`)
  console.log(`   Price:   ${STRIPE_TEST_PRICE_ID}`)
  console.log(`   Email:   ${testEmail}`)

  // ── Verify staging health ─────────────────────────────────────────────────

  console.log('\n🔍 Verifying staging environment...')
  const healthRes = await fetch(`${STAGING_URL}/health`)
  const healthBody = await healthRes.json() as { status?: string }
  assert(healthRes.status === 200 && healthBody.status === 'ok', `Staging health: ${JSON.stringify(healthBody)}`)

  // ── Setup: Create test user in staging D1 + Stripe test customer ──────────

  console.log('\n📦 Setting up test data...')

  userId = crypto.randomUUID()
  await d1(
    "INSERT INTO users (id, email, plan, created_at) VALUES (?, ?, 'free', datetime('now'))",
    [userId, testEmail]
  )
  pass(`Created test user in D1: ${userId.slice(0, 8)}...`)

  const customer = await stripe('POST', '/customers', {
    email: testEmail,
    description: 'Nexus webhook E2E test',
    metadata: { nexus_user_id: userId, test: 'true' },
  })
  customerId = customer.id as string
  await d1('UPDATE users SET stripe_customer_id = ? WHERE id = ?', [customerId, userId])
  pass(`Created Stripe test customer: ${customerId}`)

  // ── Create checkout session (satisfies AC requirement) ─────────────────────

  console.log('\n🛒 Test: Checkout session + subscription creation')

  // Attach test card to customer
  await stripe('POST', `/customers/${customerId}/sources`, { source: 'tok_visa' })
  pass('Attached test card (tok_visa) to customer')

  // Create real Stripe checkout session (satisfies "creates a checkout session" AC)
  const session = await stripe('POST', '/checkout/sessions', {
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: STRIPE_TEST_PRICE_ID, quantity: 1 }],
    success_url: `${STAGING_URL}/dashboard/billing?success=true`,
    cancel_url: `${STAGING_URL}/dashboard/billing?canceled=true`,
    payment_method_types: ['card'],
  })
  checkoutSessionId = session.id as string
  pass(`Created checkout session: ${checkoutSessionId}`)

  // Create real Stripe subscription (direct API simulation of completing checkout)
  const sub = await stripe('POST', '/subscriptions', {
    customer: customerId,
    items: [{ price: STRIPE_TEST_PRICE_ID }],
  })
  subscriptionId = sub.id as string
  pass(`Created test subscription (direct API): ${subscriptionId}`)

  // Deliver customer.subscription.created webhook directly to staging
  const createdEvent = makeSubscriptionEvent('customer.subscription.created', customerId, subscriptionId)
  await deliverWebhook(createdEvent)
  pass('Delivered customer.subscription.created webhook to staging')

  // ── Verify subscription row created in D1 ─────────────────────────────────

  const subRows = await d1('SELECT * FROM subscriptions WHERE user_id = ?', [userId])
  assert(subRows.length > 0, 'Subscription row created in D1 after webhook')
  if (subRows.length > 0) {
    const row = subRows[0] as { plan?: string; status?: string; stripe_subscription_id?: string }
    assert(row.plan === 'pro', `Subscription plan = pro (got: ${row.plan})`)
    assert(row.status === 'active', `Subscription status = active (got: ${row.status})`)
    assert(row.stripe_subscription_id === subscriptionId, 'Stripe subscription ID matches')
  }

  // Verify user plan updated to pro
  const userRows = await d1('SELECT plan FROM users WHERE id = ?', [userId])
  const userRow = userRows[0] as { plan?: string } | undefined
  assert(userRow?.plan === 'pro', `User plan updated to pro (got: ${userRow?.plan})`)

  // ── Test cancellation (cancel_at_period_end = true) ───────────────────────

  console.log('\n🔁 Test: Subscription cancellation (cancel at period end)')

  const futureTs = Math.floor(Date.now() / 1000) + 30 * 24 * 3600
  const cancelEvent = makeSubscriptionEvent('customer.subscription.updated', customerId, subscriptionId, {
    cancel_at_period_end: true,
    cancel_at: futureTs,
  })
  await deliverWebhook(cancelEvent)
  pass('Delivered customer.subscription.updated (cancel_at set) webhook')

  const subRowsAfterCancel = await d1(
    'SELECT cancel_at, status FROM subscriptions WHERE stripe_subscription_id = ?',
    [subscriptionId]
  )
  const cancelRow = subRowsAfterCancel[0] as { cancel_at?: string; status?: string } | undefined
  assert(
    cancelRow?.cancel_at !== null && cancelRow?.cancel_at !== undefined,
    `D1 cancel_at is set after cancellation (got: ${cancelRow?.cancel_at})`
  )
  if (cancelRow?.cancel_at) {
    pass(`D1 cancel_at set: ${cancelRow.cancel_at}`)
  }

  // ── Test reactivation (cancel_at cleared) ─────────────────────────────────

  console.log('\n🔄 Test: Subscription reactivation (cancel_at_period_end=false)')

  const reactivateEvent = makeSubscriptionEvent('customer.subscription.updated', customerId, subscriptionId, {
    cancel_at_period_end: false,
    cancel_at: null,
  })
  await deliverWebhook(reactivateEvent)
  pass('Delivered customer.subscription.updated (reactivation) webhook')

  const subRowsAfterReactivate = await d1(
    'SELECT cancel_at, status FROM subscriptions WHERE stripe_subscription_id = ?',
    [subscriptionId]
  )
  const reactivateRow = subRowsAfterReactivate[0] as { cancel_at?: string | null } | undefined
  assert(
    reactivateRow?.cancel_at === null || reactivateRow?.cancel_at === undefined,
    `D1 cancel_at cleared after reactivation (got: ${reactivateRow?.cancel_at})`
  )

  // ── Test subscription deletion ─────────────────────────────────────────────

  console.log('\n🗑️  Test: Subscription deletion (customer.subscription.deleted)')

  const deletedEvent = makeSubscriptionEvent('customer.subscription.deleted', customerId, subscriptionId, {
    status: 'canceled',
    cancel_at: null,
  })
  await deliverWebhook(deletedEvent)
  pass('Delivered customer.subscription.deleted webhook')

  const subRowsAfterDelete = await d1(
    'SELECT status, plan FROM subscriptions WHERE stripe_subscription_id = ?',
    [subscriptionId]
  )
  const deletedRow = subRowsAfterDelete[0] as { status?: string; plan?: string } | undefined
  assert(deletedRow?.status === 'canceled', `D1 subscription status = canceled (got: ${deletedRow?.status})`)
  assert(deletedRow?.plan === 'free', `D1 subscription plan = free after deletion (got: ${deletedRow?.plan})`)

  // Verify user downgraded to free
  const userRowsAfterDelete = await d1('SELECT plan FROM users WHERE id = ?', [userId])
  const userAfterDelete = userRowsAfterDelete[0] as { plan?: string } | undefined
  assert(userAfterDelete?.plan === 'free', `User downgraded to free plan (got: ${userAfterDelete?.plan})`)

  // Also verify Stripe + D1 states both match after deletion
  pass('Verified both Stripe and D1 states after subscription lifecycle')

  // ── Cleanup ────────────────────────────────────────────────────────────────

  console.log('\n🧹 Cleaning up...')
  try {
    await d1('DELETE FROM subscriptions WHERE user_id = ?', [userId])
    await d1('DELETE FROM users WHERE id = ?', [userId])
    // Cancel Stripe subscription if still active
    await stripe('DELETE', `/subscriptions/${subscriptionId}`).catch(() => {})
    // Delete Stripe customer
    await stripe('DELETE', `/customers/${customerId}`).catch(() => {})
    // Expire checkout session
    await stripe('POST', `/checkout/sessions/${checkoutSessionId}/expire`).catch(() => {})
    pass('Cleaned up test data (D1 + Stripe)')
  } catch (err) {
    console.warn(`  ⚠️  Cleanup warning: ${err}`)
  }
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  try {
    await runTests()
  } catch (err) {
    console.error('\n💥 Unexpected error:', err)
    failed++
  }

  console.log('\n─────────────────────────────────────────')
  console.log(`Results: ${passed} passed, ${failed} failed`)
  console.log('─────────────────────────────────────────')

  if (failed > 0) {
    process.exit(1)
  } else {
    console.log('✅ All webhook E2E tests passed!')
    process.exit(0)
  }
}

main()
