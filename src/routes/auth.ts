import { Hono } from 'hono'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import type { Env, HonoVariables } from '../types'
import { createMagicToken, verifyMagicToken, createSession, deleteSession } from '../lib/auth'
import { loginPage } from '../pages/login'

const auth = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

auth.get('/login', (c) => {
  return c.html(loginPage())
})

auth.post('/register', async (c) => {
  const body = await c.req.formData()
  const email = body.get('email')?.toString().trim().toLowerCase()

  if (!email || !email.includes('@')) {
    return c.html(loginPage('Invalid email address.'))
  }

  const token = await createMagicToken(c.env.NEXUS_KV, email)

  if (!token) {
    return c.html(loginPage('Too many requests. Please wait an hour before requesting another link.'))
  }

  const baseUrl = new URL(c.req.url).origin
  const magicLink = `${baseUrl}/auth/verify?token=${token}`

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Nexus <ralph@keylightdigital.dev>',
      to: email,
      subject: 'Your Nexus login link',
      text: `Click this link to log in to Nexus:\n\n${magicLink}\n\nThis link expires in 15 minutes. If you didn't request this, you can ignore this email.`,
    }),
  })

  if (!response.ok) {
    console.error('Resend error:', await response.text())
    return c.html(loginPage('Failed to send email. Please try again.'))
  }

  return c.html(loginPage(null, `Check your inbox! We sent a sign-in link to ${email}`))
})

auth.get('/verify', async (c) => {
  const token = c.req.query('token')
  if (!token) {
    return c.redirect('/auth/login')
  }

  const email = await verifyMagicToken(c.env.NEXUS_KV, token)
  if (!email) {
    return c.html(loginPage('Invalid or expired link. Please request a new one.'))
  }

  let user = await c.env.NEXUS_DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email).first<{ id: string }>()

  if (!user) {
    const userId = crypto.randomUUID()
    await c.env.NEXUS_DB.prepare(
      "INSERT INTO users (id, email, created_at, plan) VALUES (?, ?, datetime('now'), 'free')"
    ).bind(userId, email).run()
    user = { id: userId }
  }

  const sessionId = await createSession(c.env.NEXUS_KV, user.id)

  setCookie(c, 'session', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return c.redirect('/dashboard')
})

auth.post('/logout', async (c) => {
  const sessionId = getCookie(c, 'session')
  if (sessionId) {
    await deleteSession(c.env.NEXUS_KV, sessionId)
  }
  deleteCookie(c, 'session', { path: '/' })
  return c.redirect('/')
})

export default auth
