import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import type { Env, HonoVariables } from '../types'
import { getSessionUserId } from '../lib/auth'

export const requireAuth = createMiddleware<{ Bindings: Env; Variables: HonoVariables }>(
  async (c, next) => {
    const sessionId = getCookie(c, 'session')
    if (!sessionId) {
      return c.redirect('/auth/login')
    }

    const userId = await getSessionUserId(c.env.NEXUS_KV, sessionId)
    if (!userId) {
      return c.redirect('/auth/login')
    }

    c.set('userId', userId)
    await next()
  }
)
