import { Hono } from 'hono'
import type { Env } from '../types'
import { demoOverviewPage, demoTraceDetailPage } from '../pages/demo'

const demoRoutes = new Hono<{ Bindings: Env }>()

demoRoutes.get('/', (c) => {
  return c.html(demoOverviewPage())
})

demoRoutes.get('/traces/:id', (c) => {
  const id = c.req.param('id')
  return c.html(demoTraceDetailPage(id))
})

export default demoRoutes
