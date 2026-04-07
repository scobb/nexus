export function notFoundPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — Nexus AI Agent Observability</title>
  <meta name="description" content="The page you're looking for doesn't exist. Return to Nexus — simple AI agent observability.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body class="bg-gray-950 text-gray-100 antialiased">
  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-white">Nexus</a>
      <div class="hidden sm:flex items-center gap-3">
        <a href="/blog" class="text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('nf-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="nf-mnav" class="hidden sm:hidden max-w-5xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/blog" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Blog</a>
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
    </div>
  </nav>

  <!-- 404 Content -->
  <main class="px-4 py-24 text-center">
    <div class="max-w-lg mx-auto">
      <p class="text-8xl font-extrabold text-indigo-600 mb-4">404</p>
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-3">Page not found</h1>
      <p class="text-gray-400 mb-10">
        The page you're looking for doesn't exist or has been moved.
        Here are some helpful links to get you back on track.
      </p>

      <!-- Helpful links grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <a href="/" class="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-4 transition-colors text-left">
          <span class="text-2xl">🏠</span>
          <div>
            <div class="font-medium text-white text-sm">Home</div>
            <div class="text-xs text-gray-500">Back to the landing page</div>
          </div>
        </a>
        <a href="/demo" class="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-4 transition-colors text-left">
          <span class="text-2xl">🎯</span>
          <div>
            <div class="font-medium text-white text-sm">Live Demo</div>
            <div class="text-xs text-gray-500">See Nexus without signing up</div>
          </div>
        </a>
        <a href="/docs" class="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-4 transition-colors text-left">
          <span class="text-2xl">📖</span>
          <div>
            <div class="font-medium text-white text-sm">Documentation</div>
            <div class="text-xs text-gray-500">API reference and SDK guides</div>
          </div>
        </a>
        <a href="/pricing" class="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-4 transition-colors text-left">
          <span class="text-2xl">💰</span>
          <div>
            <div class="font-medium text-white text-sm">Pricing</div>
            <div class="text-xs text-gray-500">Free tier + Pro at $9/mo</div>
          </div>
        </a>
        <a href="/blog" class="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-4 transition-colors text-left sm:col-span-2">
          <span class="text-2xl">✍️</span>
          <div>
            <div class="font-medium text-white text-sm">Blog</div>
            <div class="text-xs text-gray-500">Guides, tutorials, and product updates</div>
          </div>
        </a>
      </div>

      <a href="/" class="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Go back home
      </a>
    </div>
  </main>
</body>
</html>`
}
