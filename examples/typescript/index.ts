/**
 * Nexus TypeScript Example — AI Research Agent
 *
 * Demonstrates how to instrument a multi-step AI agent with Nexus:
 *  - LLM call span (simulated)
 *  - Tool use span (web search simulation)
 *  - Error handling (graceful degradation)
 *
 * Usage:
 *   NEXUS_API_KEY=nxs_your_key_here npm start
 */

import { NexusClient } from '@keylightdigital/nexus'

const apiKey = process.env.NEXUS_API_KEY
if (!apiKey) {
  console.error('Set NEXUS_API_KEY environment variable')
  process.exit(1)
}

const nexus = new NexusClient({
  apiKey,
  agentId: 'research-agent',
  baseUrl: 'https://nexus.keylightdigital.dev',
})

// --- Simulated agent functions ---

async function callLLM(prompt: string): Promise<string> {
  // In a real agent, this would call OpenAI / Anthropic / etc.
  await new Promise(r => setTimeout(r, 80)) // simulate latency
  return `Research summary for: "${prompt}"\n\nCloudflare Workers is a serverless platform...`
}

async function webSearch(query: string): Promise<Array<{ title: string; url: string }>> {
  // In a real agent, this would call a search API (Brave, Serper, etc.)
  await new Promise(r => setTimeout(r, 120))
  return [
    { title: 'Cloudflare Workers Docs', url: 'https://developers.cloudflare.com/workers/' },
    { title: 'Getting Started with D1', url: 'https://developers.cloudflare.com/d1/' },
  ]
}

async function formatReport(content: string, sources: Array<{ title: string; url: string }>): Promise<string> {
  await new Promise(r => setTimeout(r, 40))
  const sourceList = sources.map(s => `- [${s.title}](${s.url})`).join('\n')
  return `# Report\n\n${content}\n\n## Sources\n${sourceList}`
}

// --- Main agent run ---

async function runResearchAgent(topic: string): Promise<void> {
  console.log(`Starting research agent for topic: "${topic}"`)

  const trace = await nexus.startTrace({ name: `research: ${topic}` })

  try {
    // Step 1: Web search
    let searchResults: Array<{ title: string; url: string }> = []
    try {
      searchResults = await webSearch(topic)
      await trace.addSpan({
        name: 'web-search',
        input: { query: topic },
        output: { results: searchResults, count: searchResults.length },
      })
      console.log(`  [search] Found ${searchResults.length} results`)
    } catch (err) {
      await trace.addSpan({
        name: 'web-search',
        input: { query: topic },
        error: err instanceof Error ? err.message : String(err),
      })
      console.warn('  [search] Failed, continuing with empty results')
    }

    // Step 2: LLM synthesis
    const prompt = `Summarize research on: ${topic}\n\nSources: ${searchResults.map(r => r.url).join(', ')}`
    const llmResponse = await callLLM(prompt)
    await trace.addSpan({
      name: 'llm-synthesis',
      input: { prompt, model: 'claude-3-5-sonnet' },
      output: { content: llmResponse, tokens: 142 },
    })
    console.log('  [llm] Synthesis complete')

    // Step 3: Format report
    const report = await formatReport(llmResponse, searchResults)
    await trace.addSpan({
      name: 'format-report',
      input: { content_length: llmResponse.length, source_count: searchResults.length },
      output: { report_length: report.length },
    })
    console.log('  [format] Report formatted')

    await trace.end({ status: 'success' })
    console.log('Agent run complete. Check your dashboard at https://nexus.keylightdigital.dev')

  } catch (err) {
    await trace.addSpan({
      name: 'unhandled-error',
      error: err instanceof Error ? err.message : String(err),
    })
    await trace.end({ status: 'error' })
    console.error('Agent run failed:', err)
  }
}

// Run the agent
await runResearchAgent('Cloudflare Workers for AI agents')
