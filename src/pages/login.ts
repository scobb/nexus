export function loginPage(error?: string | null, success?: string | null): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="description" content="Sign in to Nexus to monitor your AI agents.">
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen flex items-center justify-center px-4">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="main-content" class="w-full max-w-md">
    <div class="text-center mb-8">
      <a href="/" class="text-2xl font-bold text-indigo-400">Nexus</a>
      <p class="text-gray-400 mt-2">Agent observability for indie developers</p>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800 p-8">
      <h1 class="text-xl font-semibold mb-6">Sign in</h1>

      ${error ? `<div class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">${error}</div>` : ''}
      ${success ? `<div class="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">${success}</div>` : ''}

      <!-- Password login -->
      <form method="POST" action="/auth/login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email address</label>
          <input type="email" id="email" name="email" required placeholder="you@example.com"
            autocomplete="username"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input type="password" id="password" name="password" required placeholder="••••••••" minlength="8"
            autocomplete="current-password"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          Sign in
        </button>
      </form>

      <p class="mt-3 text-center text-sm text-gray-500">
        Don't have an account? <a href="/auth/signup" class="text-indigo-400 hover:text-indigo-300">Create one free</a>
      </p>
      <p class="mt-4 text-center text-xs text-gray-600">
        <a href="/privacy" class="text-gray-500 hover:text-gray-400 underline">Privacy Policy</a>
        · <a href="/terms" class="text-gray-500 hover:text-gray-400 underline">Terms of Service</a>
      </p>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-800"></div></div>
        <div class="relative flex justify-center text-sm"><span class="bg-gray-900 px-3 text-gray-500">or</span></div>
      </div>

      <!-- Magic link -->
      <form method="POST" action="/auth/magic-link">
        <label for="magic-email-login" class="block text-sm font-medium text-gray-300 mb-2">Email for magic link</label>
        <input type="email" id="magic-email-login" name="email" required placeholder="you@example.com"
          autocomplete="username"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mb-3">
        <button type="submit"
          class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 rounded-lg border border-gray-700 transition-colors">
          Send magic link instead
        </button>
      </form>
    </div>

    <p class="text-center mt-6 text-sm text-gray-600">
      <a href="/" class="hover:text-gray-400 transition-colors">&larr; Back to home</a>
    </p>
  </div>
</body>
</html>`
}

export function signupPage(error?: string | null, success?: string | null): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create account — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="description" content="Create a free Nexus account to monitor your AI agents.">
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen flex items-center justify-center px-4">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="main-content" class="w-full max-w-md">
    <div class="text-center mb-8">
      <a href="/" class="text-2xl font-bold text-indigo-400">Nexus</a>
      <p class="text-gray-400 mt-2">Agent observability for indie developers</p>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800 p-8">
      <h1 class="text-xl font-semibold mb-6">Create account</h1>

      ${error ? `<div class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">${error}</div>` : ''}
      ${success ? `<div class="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">${success}</div>` : ''}

      <!-- Password signup -->
      <form method="POST" action="/auth/signup" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email address</label>
          <input type="email" id="email" name="email" required placeholder="you@example.com"
            autocomplete="username"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input type="password" id="password" name="password" required placeholder="••••••••" minlength="8"
            autocomplete="new-password"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          Create account
        </button>
      </form>

      <p class="mt-3 text-center text-sm text-gray-500">
        Already have an account? <a href="/auth/login" class="text-indigo-400 hover:text-indigo-300">Sign in</a>
      </p>
      <p class="mt-4 text-center text-xs text-gray-600">
        By creating an account, you agree to our
        <a href="/terms" class="text-gray-500 hover:text-gray-400 underline">Terms of Service</a>
        and <a href="/privacy" class="text-gray-500 hover:text-gray-400 underline">Privacy Policy</a>.
      </p>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-800"></div></div>
        <div class="relative flex justify-center text-sm"><span class="bg-gray-900 px-3 text-gray-500">or</span></div>
      </div>

      <!-- Magic link -->
      <form method="POST" action="/auth/magic-link">
        <label for="magic-email-signup" class="block text-sm font-medium text-gray-300 mb-2">Email for magic link</label>
        <input type="email" id="magic-email-signup" name="email" required placeholder="you@example.com"
          autocomplete="username"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 mb-3">
        <button type="submit"
          class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-4 rounded-lg border border-gray-700 transition-colors">
          Send magic link instead
        </button>
      </form>
    </div>

    <p class="text-center mt-6 text-sm text-gray-600">
      <a href="/" class="hover:text-gray-400 transition-colors">&larr; Back to home</a>
    </p>
  </div>
</body>
</html>`
}
