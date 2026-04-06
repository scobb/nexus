export function loginPage(error?: string | null, success?: string | null): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen flex items-center justify-center px-4">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <a href="/" class="text-2xl font-bold text-indigo-400">Nexus</a>
      <p class="text-gray-400 mt-2">Agent observability for indie developers</p>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800 p-8">
      <h1 class="text-xl font-semibold mb-6">Sign in / Create account</h1>

      ${error ? `<div class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">${error}</div>` : ''}
      ${success ? `<div class="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">${success}</div>` : ''}

      <form method="POST" action="/auth/register" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Send magic link
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        No password required. We'll email you a one-time sign-in link.
      </p>
    </div>

    <p class="text-center mt-6 text-sm text-gray-600">
      <a href="/" class="hover:text-gray-400 transition-colors">&larr; Back to home</a>
    </p>
  </div>
</body>
</html>`
}
