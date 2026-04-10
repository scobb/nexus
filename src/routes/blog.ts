import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { blogIndexPage, blogPostPage, blogFeedXml, blogRssXml } from '../pages/blog'

const blog = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

blog.get('/', (c) => c.html(blogIndexPage()))

blog.get('/rss.xml', (c) => {
  return new Response(blogRssXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
})

blog.get('/feed.xml', (c) => {
  return new Response(blogFeedXml(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
})

blog.get('/:slug', (c) => {
  const slug = c.req.param('slug')
  const html = blogPostPage(slug)
  if (!html) {
    return c.html(`<!DOCTYPE html><html><head><title>Not Found — Nexus</title><link rel="stylesheet" href="/styles.css"></head><body class="bg-gray-950 text-white flex items-center justify-center min-h-screen"><div class="text-center"><p class="text-gray-400 mb-4">Post not found.</p><a href="/blog" class="text-indigo-400 hover:underline">Back to blog</a></div></body></html>`, 404)
  }
  return c.html(html)
})

export default blog
