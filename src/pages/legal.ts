const NAV = `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="hidden sm:flex items-center gap-4">
        <a href="/blog" class="text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
      </div>
    </div>
  </nav>`

const FOOTER = `
  <footer class="border-t border-gray-800 mt-16 px-4 py-8">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <span>© 2026 Keylight Digital LLC · Built by Ralph (AI agent)</span>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="/privacy" class="hover:text-gray-300 transition-colors">Privacy</a>
        <a href="/terms" class="hover:text-gray-300 transition-colors">Terms</a>
        <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
        <a href="https://github.com/scobb/nexus" class="hover:text-gray-300 transition-colors">GitHub</a>
        <a href="mailto:ralph@keylightdigital.dev" class="hover:text-gray-300 transition-colors">Contact</a>
      </div>
    </div>
  </footer>`

export function privacyPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="description" content="Privacy Policy for Nexus AI Agent Observability — how we collect, use, and protect your data.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/privacy">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white mb-3">Privacy Policy</h1>
      <p class="text-gray-400 text-sm">Last updated: April 9, 2026</p>
    </div>

    <div class="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Who We Are</h2>
        <p>Nexus is an AI agent observability platform operated by <strong class="text-white">Keylight Digital LLC</strong>. Our contact email is <a href="mailto:ralph@keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">ralph@keylightdigital.dev</a>.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Data We Collect</h2>
        <p class="mb-3">We collect the following categories of data:</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong class="text-white">Account data:</strong> Email address and hashed password when you create an account.</li>
          <li><strong class="text-white">Trace and span data:</strong> Agent execution traces, spans, token counts, latencies, and metadata you send via the Nexus SDK or API.</li>
          <li><strong class="text-white">API keys:</strong> Hashed API keys used to authenticate SDK requests.</li>
          <li><strong class="text-white">Usage data:</strong> Page views, feature usage, and access logs for service operation and security.</li>
          <li><strong class="text-white">Payment data:</strong> Billing information processed by Stripe — we do not store card numbers directly.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">How We Use Your Data</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>To provide and improve the Nexus service</li>
          <li>To authenticate your account and API requests</li>
          <li>To process payments and manage subscriptions</li>
          <li>To send transactional emails (account confirmations, alerts)</li>
          <li>To detect abuse and ensure service security</li>
        </ul>
        <p class="mt-3">We do not sell your data to third parties or use it for advertising.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Data Storage</h2>
        <p>Your data is stored on <strong class="text-white">Cloudflare's infrastructure</strong> (D1 database, KV, R2 object storage) in Cloudflare's global edge network. Trace data you send is stored in your account's database and retained for <strong class="text-white">90 days</strong> by default on the free plan, or as configured on paid plans.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
        <p class="mb-3">We use the following third-party services:</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong class="text-white">Cloudflare:</strong> Hosting, DNS, and edge infrastructure. <a href="https://www.cloudflare.com/privacypolicy/" class="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener">Privacy policy →</a></li>
          <li><strong class="text-white">Stripe:</strong> Payment processing. <a href="https://stripe.com/privacy" class="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener">Privacy policy →</a></li>
          <li><strong class="text-white">Resend:</strong> Transactional email delivery. <a href="https://resend.com/privacy" class="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener">Privacy policy →</a></li>
          <li><strong class="text-white">Beam Analytics:</strong> Privacy-first, cookieless analytics with no personal data collection. <a href="https://beam-privacy.com" class="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener">Learn more →</a></li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Cookies</h2>
        <p>We use a minimal session cookie to keep you signed in. We do not use advertising cookies or cross-site tracking cookies. Our analytics (Beam) are cookieless — no cookie consent banner is required.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Data Retention</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong class="text-white">Account data:</strong> Retained until you delete your account.</li>
          <li><strong class="text-white">Trace data:</strong> 90 days on free plan; configurable on paid plans.</li>
          <li><strong class="text-white">Billing records:</strong> Retained as required by law (typically 7 years).</li>
          <li><strong class="text-white">Access logs:</strong> Retained for up to 30 days for security purposes.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Your Rights</h2>
        <p class="mb-3">Depending on your location, you may have the following rights:</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong class="text-white">Access:</strong> Request a copy of data we hold about you.</li>
          <li><strong class="text-white">Correction:</strong> Request correction of inaccurate data.</li>
          <li><strong class="text-white">Deletion:</strong> Request deletion of your account and associated data.</li>
          <li><strong class="text-white">Portability:</strong> Request an export of your trace data.</li>
          <li><strong class="text-white">Objection:</strong> Object to processing of your data in certain circumstances.</li>
        </ul>
        <p class="mt-3">To exercise any of these rights, email us at <a href="mailto:ralph@keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">ralph@keylightdigital.dev</a>. We will respond within 30 days.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Security</h2>
        <p>Passwords are hashed using bcrypt. API keys are hashed before storage. All data is transmitted over HTTPS. We follow security best practices and conduct regular reviews.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Children's Privacy</h2>
        <p>Nexus is not directed at children under 13. We do not knowingly collect data from children under 13.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
        <p>We may update this policy from time to time. Material changes will be communicated via email to registered users. The "last updated" date at the top of this page reflects the most recent revision.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Contact</h2>
        <p>Questions about this privacy policy? Email <a href="mailto:ralph@keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">ralph@keylightdigital.dev</a>.</p>
        <p class="mt-2 text-sm text-gray-500">Keylight Digital LLC · ralph@keylightdigital.dev</p>
      </section>

    </div>
  </main>

  ${FOOTER}
</body>
</html>`
}

export function termsPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="description" content="Terms of Service for Nexus AI Agent Observability.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/terms">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white mb-3">Terms of Service</h1>
      <p class="text-gray-400 text-sm">Last updated: April 9, 2026</p>
    </div>

    <div class="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">1. Service Description</h2>
        <p>Nexus is an AI agent observability platform provided by <strong class="text-white">Keylight Digital LLC</strong> ("we", "us", "our"). Nexus allows developers to instrument, trace, and monitor AI agents in production. By using Nexus, you agree to these Terms of Service.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">2. Accounts</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>You must provide a valid email address to create an account.</li>
          <li>You are responsible for maintaining the security of your account credentials and API keys.</li>
          <li>You are responsible for all activity that occurs under your account.</li>
          <li>One person or legal entity may not maintain more than one free account.</li>
          <li>You must be at least 13 years old to use Nexus.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">3. Acceptable Use</h2>
        <p class="mb-3">You may not use Nexus to:</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>Violate any applicable laws or regulations</li>
          <li>Transmit malicious code, viruses, or harmful data</li>
          <li>Attempt to gain unauthorized access to Nexus systems or other users' data</li>
          <li>Use the service to build a competing observability product without our written consent</li>
          <li>Abuse the free tier (e.g., creating multiple free accounts, circumventing rate limits)</li>
          <li>Send offensive, illegal, or harmful content through trace data</li>
        </ul>
        <p class="mt-3">We reserve the right to suspend accounts that violate these terms.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">4. Billing and Payments</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>Paid plans are billed monthly in advance via Stripe.</li>
          <li>Upgrades take effect immediately; downgrades take effect at the next billing cycle.</li>
          <li>We do not offer refunds for partial months, except where required by law.</li>
          <li>If payment fails, we will attempt to retry for 7 days before suspending your account.</li>
          <li>Prices are subject to change with 30 days notice to current subscribers.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">5. Your Data</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>You retain ownership of all trace data and content you send to Nexus.</li>
          <li>By using Nexus, you grant us a limited license to store and process your data to provide the service.</li>
          <li>We do not sell your data or use it to train AI models.</li>
          <li>See our <a href="/privacy" class="text-indigo-400 hover:text-indigo-300">Privacy Policy</a> for full details on data handling.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">6. Service Availability</h2>
        <p>We aim for high availability but do not guarantee 100% uptime. Nexus is provided "as is" without warranty of any kind. Planned maintenance will be communicated in advance where possible.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Keylight Digital LLC is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of Nexus. Our total liability to you for any claims arising from these terms or use of the service shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">8. Termination</h2>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li>You may delete your account at any time from account settings.</li>
          <li>We may suspend or terminate accounts that violate these terms, with or without notice.</li>
          <li>Upon termination, your data will be deleted within 30 days, except where retention is required by law.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">9. Changes to These Terms</h2>
        <p>We may update these terms from time to time. We will notify registered users of material changes via email at least 30 days before they take effect. Continued use of the service after the effective date constitutes acceptance of the updated terms.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
        <p>These terms are governed by the laws of the State of California, without regard to conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of courts in California.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-white mb-3">Contact</h2>
        <p>Questions about these terms? Email <a href="mailto:ralph@keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">ralph@keylightdigital.dev</a>.</p>
        <p class="mt-2 text-sm text-gray-500">Keylight Digital LLC · ralph@keylightdigital.dev</p>
      </section>

    </div>
  </main>

  ${FOOTER}
</body>
</html>`
}
