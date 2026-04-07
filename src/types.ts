export interface Env {
  NEXUS_DB: D1Database
  NEXUS_KV: KVNamespace
  RESEND_API_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  STRIPE_PRICE_ID: string
  SESSION_SECRET: string
  ENVIRONMENT: string
  SENTRY_DSN?: string
}

export type HonoVariables = {
  userId: string
}
