export function pricingPage(): string {
  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I switch plans?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Upgrade from Free to Pro at any time from the billing page. Downgrade from Pro to Free at any time — your subscription cancels at the end of the current billing period. No penalties.' },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial for Pro?',
        acceptedAnswer: { '@type': 'Answer', text: 'The Free plan is effectively a permanent free tier — no trial expiry. You can use Free as long as you need and upgrade when you hit the limits. Stripe handles billing so you can cancel Pro anytime.' },
      },
      {
        '@type': 'Question',
        name: 'What happens if I exceed the trace limit?',
        acceptedAnswer: { '@type': 'Answer', text: 'Free users: trace ingestion stops gracefully with a 429 response and a clear error message including an upgrade link. No data is silently dropped — you know exactly when you hit the limit. Pro users: the 50,000 limit is a soft guideline at MVP.' },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: { '@type': 'Answer', text: 'All major credit and debit cards via Stripe. We do not store card details — Stripe handles all payment processing.' },
      },
      {
        '@type': 'Question',
        name: 'Is my trace data private?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Trace data is scoped to your account — no other user can see your traces. Data is stored in Cloudflare D1 (SQLite at edge). We do not use your trace data for training or analytics beyond your own dashboard.' },
      },
    ],
  })

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Nexus AI Agent Observability',
    description: 'Simple, affordable AI agent monitoring for indie developers. Drop in the SDK, see your traces, get alerts when agents fail.',
    url: 'https://nexus.keylightdigital.dev',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
    brand: { '@type': 'Brand', name: 'Nexus by Keylight Digital' },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'USD',
        description: '1,000 traces/month, 1 agent, 30-day retention',
        url: 'https://nexus.keylightdigital.dev/register',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '9',
        priceCurrency: 'USD',
        description: '50,000 traces/month, unlimited agents, 90-day retention, email alerts, team access',
        url: 'https://nexus.keylightdigital.dev/dashboard/billing',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-01-01',
        billingPeriod: 'P1M',
      },
    ],
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing — AI Agent Monitoring | Nexus</title>
  <meta name="description" content="Nexus pricing: Free (1,000 traces/month) or Pro at $9/month (50,000 traces, unlimited agents, email alerts). No contracts, no hidden fees. AI agent monitoring priced for indie developers.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/pricing">
  <meta property="og:title" content="Pricing — AI Agent Monitoring | Nexus">
  <meta property="og:description" content="$0 free or $9/month Pro. Simple, affordable AI agent observability. No contracts.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/pricing">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Pricing — AI Agent Monitoring | Nexus">
  <meta name="twitter:description" content="$0 free or $9/month Pro. Simple, affordable AI agent observability.">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <script type="application/ld+json">${jsonLd}</script>
  <script type="application/ld+json">${faqJsonLd}</script>
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam-privacy.com/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">

  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="hidden sm:flex items-center gap-4">
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('pricing-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="pricing-mnav" class="hidden sm:hidden max-w-4xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/demo" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Demo</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
    </div>
  </nav>

  <div class="max-w-4xl mx-auto px-4 py-16">

    <!-- Header -->
    <div class="text-center mb-14">
      <h1 class="text-5xl font-extrabold text-white mb-4">Simple, honest pricing</h1>
      <p class="text-xl text-gray-400 max-w-xl mx-auto">
        Built for indie developers and small teams. No contracts, no hidden fees,
        no enterprise sales calls.
      </p>
    </div>

    <!-- Pricing cards -->
    <div class="grid sm:grid-cols-2 gap-6 mb-16">

      <!-- Free -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-8 py-8">
        <p class="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Free</p>
        <div class="flex items-end gap-2 mb-6">
          <span class="text-5xl font-extrabold text-white">$0</span>
          <span class="text-gray-500 mb-2">forever</span>
        </div>
        <a href="/register" class="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors mb-8">
          Get started free
        </a>
        <ul class="space-y-3 text-sm text-gray-300">
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> 1,000 traces/month</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> 1 agent</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> 30-day trace retention</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> Full trace viewer + span waterfall</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> TypeScript + Python SDKs</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> Community support</li>
          <li class="flex items-start gap-2 text-gray-600"><span class="flex-shrink-0">—</span> Email alerts</li>
          <li class="flex items-start gap-2 text-gray-600"><span class="flex-shrink-0">—</span> Team access</li>
        </ul>
      </div>

      <!-- Pro -->
      <div class="bg-indigo-950 border border-indigo-700 rounded-2xl px-8 py-8 relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2">
          <span class="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">Most popular</span>
        </div>
        <p class="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-4">Pro</p>
        <div class="flex items-end gap-2 mb-6">
          <span class="text-5xl font-extrabold text-white">$9</span>
          <span class="text-gray-400 mb-2">/month</span>
        </div>
        <a href="/register" class="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors mb-8">
          Start Pro free trial
        </a>
        <ul class="space-y-3 text-sm text-gray-200">
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> <strong>50,000 traces/month</strong></li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> <strong>Unlimited agents</strong></li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> 90-day trace retention</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> Full trace viewer + span waterfall</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> TypeScript + Python SDKs</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> <strong>Email alerts on agent failure</strong></li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> Team access (up to 5 members)</li>
          <li class="flex items-start gap-2"><span class="text-green-400 flex-shrink-0">✓</span> Priority support</li>
        </ul>
      </div>
    </div>

    <!-- Feature comparison table -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold text-white mb-6 text-center">Full comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-gray-300 font-semibold">Free</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Pro</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Monthly traces', '1,000', '50,000'],
              ['Agents', '1', 'Unlimited'],
              ['Trace retention', '30 days', '90 days'],
              ['Trace viewer', '✓', '✓'],
              ['Span waterfall', '✓', '✓'],
              ['TypeScript SDK', '✓', '✓'],
              ['Python SDK', '✓', '✓'],
              ['Email alerts on failure', '—', '✓'],
              ['Team access', '—', 'Up to 5'],
              ['Priority support', '—', '✓'],
              ['No contracts', '✓', '✓'],
              ['Cancel anytime', '✓', '✓'],
            ].map(([feat, free, pro]) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${free === '—' ? 'text-gray-600' : 'text-gray-300'}">${free}</td>
              <td class="px-5 py-3 text-center ${pro === '—' ? 'text-gray-600' : pro === '✓' ? 'text-green-400' : 'text-indigo-300 font-medium'}">${pro}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold text-white mb-8 text-center">Frequently asked questions</h2>
      <div class="space-y-5 max-w-2xl mx-auto">

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer text-white font-medium flex justify-between items-center">
            Can I switch plans?
            <span class="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
          </summary>
          <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
            Yes. Upgrade from Free to Pro at any time from the billing page. Downgrade from Pro to Free
            at any time — your subscription cancels at the end of the current billing period. No penalties.
          </p>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer text-white font-medium flex justify-between items-center">
            Is there a free trial for Pro?
            <span class="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
          </summary>
          <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
            The Free plan is effectively a permanent free tier — no trial expiry. You can use Free as long
            as you need and upgrade when you hit the limits. Stripe handles billing so you can cancel
            Pro anytime.
          </p>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer text-white font-medium flex justify-between items-center">
            What happens if I exceed the trace limit?
            <span class="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
          </summary>
          <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
            Free users: trace ingestion stops gracefully with a 429 response and a clear error message
            including an upgrade link. No data is silently dropped — you know exactly when you hit the
            limit. Pro users: the 50,000 limit is a soft guideline at MVP. Contact us if you're regularly
            exceeding it.
          </p>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer text-white font-medium flex justify-between items-center">
            What payment methods do you accept?
            <span class="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
          </summary>
          <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
            All major credit and debit cards via Stripe. We do not store card details — Stripe handles
            all payment processing.
          </p>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer text-white font-medium flex justify-between items-center">
            Is my trace data private?
            <span class="text-gray-500 group-open:rotate-180 transition-colors">↓</span>
          </summary>
          <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
            Yes. Trace data is scoped to your account — no other user can see your traces.
            Data is stored in Cloudflare D1 (SQLite at edge). We don't use your trace data
            for training or analytics beyond your own dashboard.
          </p>
        </details>

      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start free today</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        No credit card needed. 1,000 traces/month free forever.
        Add the SDK in 3 lines of code and see your first trace in under a minute.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start free →
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View demo
        </a>
      </div>
    </section>

  </div>

  <footer class="border-t border-gray-800 mt-16 px-4 py-8 text-center text-gray-500 text-sm">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <span>© 2026 <a href="/" class="text-indigo-400 hover:text-indigo-300">Nexus</a> by Keylight Digital LLC</span>
      <div class="flex gap-4">
        <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
        <a href="/demo" class="hover:text-gray-300 transition-colors">Demo</a>
        <a href="https://github.com/scobb/nexus" class="hover:text-gray-300 transition-colors">GitHub</a>
        <a href="/auth/login" class="hover:text-gray-300 transition-colors">Sign in</a>
      </div>
    </div>
  </footer>

</body>
</html>`
}
