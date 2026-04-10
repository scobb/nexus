function guideHead(title: string, description: string, canonical: string, jsonLd?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  ${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam-privacy.com/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>`
}

const navBar = `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="hidden sm:flex items-center gap-4">
        <a href="/docs" class="text-sm text-white font-medium">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('guide-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="guide-mnav" class="hidden sm:hidden max-w-4xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/docs" class="block px-2 py-2.5 text-sm text-white font-medium bg-gray-800 rounded-lg">Docs</a>
      <a href="/demo" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Demo</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
    </div>
  </nav>`

function codeBlock(code: string, lang = ''): string {
  return `<pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed"><code class="language-${lang}">${code}</code></pre>`
}

function footer(): string {
  return `
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
  </footer>`
}

export function docsAnthropicSDKPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Monitor Claude Agents with Nexus — Anthropic SDK Integration',
    description: 'How to monitor AI agents built with Anthropic\'s Claude API using Nexus.',
    step: [
      { '@type': 'HowToStep', name: 'Install both SDKs', text: 'Run: npm install @keylightdigital/nexus @anthropic-ai/sdk (TypeScript) or pip install keylightdigital-nexus anthropic (Python)' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Add it as NEXUS_API_KEY alongside your ANTHROPIC_API_KEY.' },
      { '@type': 'HowToStep', name: 'Instrument your Claude agent', text: 'Import NexusClient, create a trace with nexus.startTrace(), add spans for each LLM call and tool use, and end the trace with trace.end().' },
      { '@type': 'HowToStep', name: 'View agent traces', text: 'Open the Nexus dashboard to see the span waterfall, timing, inputs, outputs, and status for every agent run.' },
    ],
  })
  return `${guideHead(
    'Monitor Claude Agents with Nexus — Anthropic SDK Integration',
    'How to monitor AI agents built with Anthropic\'s Claude API using Nexus. TypeScript and Python code examples, tool use tracing, and the meta-narrative: Nexus was built by Claude.',
    'https://nexus.keylightdigital.dev/docs/anthropic-sdk',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">Anthropic SDK</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Monitor Claude Agents with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Instrument AI agents built with Anthropic's Claude API. Track every LLM call, tool use,
        and agent decision — in TypeScript or Python.
      </p>
    </div>

    <!-- Meta-narrative callout -->
    <section class="bg-indigo-950 border border-indigo-700 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-indigo-300 mb-2">The meta-narrative</h2>
      <p class="text-sm text-gray-300 leading-relaxed">
        Nexus was built by an AI agent named Ralph, using Claude. Ralph instrumented itself using this SDK
        to track its own build sessions. This guide shows you how to replicate that: Claude-powered agents
        monitoring themselves through Nexus. It's agents all the way down.
      </p>
    </section>

    <!-- Why Nexus for Anthropic -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with Claude?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✓ <strong class="text-white">Tool use tracing</strong> — every tool call appears as a span</li>
        <li>✓ <strong class="text-white">Token-level visibility</strong> — log input/output tokens in span metadata</li>
        <li>✓ <strong class="text-white">Multi-turn agents</strong> — trace the full agentic loop, not just one call</li>
        <li>✓ <strong class="text-white">TypeScript + Python</strong> — works with @anthropic-ai/sdk and anthropic Python</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install both SDKs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-400 mb-2">TypeScript</p>
          ${codeBlock('npm install @keylightdigital/nexus @anthropic-ai/sdk', 'bash')}
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-400 mb-2">Python</p>
          ${codeBlock('pip install keylightdigital-nexus anthropic', 'bash')}
        </div>
      </div>
    </section>

    <!-- Step 2: Create API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Add it as <code class="text-indigo-300">NEXUS_API_KEY</code>
        alongside your <code class="text-indigo-300">ANTHROPIC_API_KEY</code>.
      </p>
    </section>

    <!-- Step 3: TypeScript example -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Instrument your Claude agent</h2>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">TypeScript — tool-use agent loop</p>
        ${codeBlock(`import Anthropic from '@anthropic-ai/sdk';
import { NexusClient } from '@keylightdigital/nexus';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const nexus = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY!,
  agentId: 'claude-research-agent',
});

const tools: Anthropic.Tool[] = [
  {
    name: 'web_search',
    description: 'Search the web for information',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Search query' } },
      required: ['query'],
    },
  },
];

async function runAgent(userMessage: string) {
  const trace = await nexus.startTrace({
    name: \`Claude agent: \${userMessage.slice(0, 60)}\`,
    metadata: { model: 'claude-opus-4-6', maxTurns: 5 },
  });

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage }
  ];

  try {
    let turn = 0;
    while (turn < 5) {
      turn++;

      // Track each LLM call as a span
      const llmSpan = await trace.addSpan({
        name: \`llm-call-turn-\${turn}\`,
        input: { messages: messages.length, turn },
      });

      const response = await anthropic.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        tools,
        messages,
      });

      await trace.addSpan({
        name: \`llm-response-turn-\${turn}\`,
        output: {
          stop_reason: response.stop_reason,
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        },
      });

      if (response.stop_reason === 'end_turn') {
        const text = response.content
          .filter(b => b.type === 'text')
          .map(b => (b as Anthropic.TextBlock).text)
          .join('');
        await trace.end({ status: 'success' });
        return text;
      }

      // Handle tool calls
      if (response.stop_reason === 'tool_use') {
        const toolUses = response.content.filter(b => b.type === 'tool_use') as Anthropic.ToolUseBlock[];
        const toolResults: Anthropic.ToolResultBlockParam[] = [];

        for (const toolUse of toolUses) {
          // Track each tool call as a span
          await trace.addSpan({
            name: \`tool-\${toolUse.name}\`,
            input: toolUse.input as Record<string, unknown>,
            output: { result: 'tool result here' },
          });

          // Execute the tool (your implementation here)
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: \`Result for \${toolUse.name}\`,
          });
        }

        messages.push(
          { role: 'assistant', content: response.content },
          { role: 'user', content: toolResults }
        );
      }
    }

    await trace.end({ status: 'error' });
    return 'Max turns reached';
  } catch (error) {
    await trace.end({ status: 'error' });
    throw error;
  }
}`, 'typescript')}
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-400 mb-2">Python — tool-use agent loop</p>
        ${codeBlock(`import anthropic
from nexus_client import NexusClient
import os

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="claude-research-agent",
)

tools = [
    {
        "name": "web_search",
        "description": "Search the web for information",
        "input_schema": {
            "type": "object",
            "properties": {"query": {"type": "string", "description": "Search query"}},
            "required": ["query"],
        },
    }
]

def run_agent(user_message: str) -> str:
    trace = nexus.start_trace(
        name=f"Claude agent: {user_message[:60]}",
        metadata={"model": "claude-opus-4-6", "max_turns": 5},
    )

    messages = [{"role": "user", "content": user_message}]

    try:
        for turn in range(1, 6):
            trace.add_span(
                name=f"llm-call-turn-{turn}",
                input={"message_count": len(messages), "turn": turn},
            )

            response = client.messages.create(
                model="claude-opus-4-6",
                max_tokens=1024,
                tools=tools,
                messages=messages,
            )

            trace.add_span(
                name=f"llm-response-turn-{turn}",
                output={
                    "stop_reason": response.stop_reason,
                    "input_tokens": response.usage.input_tokens,
                    "output_tokens": response.usage.output_tokens,
                },
            )

            if response.stop_reason == "end_turn":
                text = "".join(
                    block.text for block in response.content
                    if block.type == "text"
                )
                trace.end(status="success")
                return text

            if response.stop_reason == "tool_use":
                tool_uses = [b for b in response.content if b.type == "tool_use"]
                tool_results = []

                for tool_use in tool_uses:
                    # Your tool implementation here
                    result = f"Result for {tool_use.name}"
                    trace.add_span(
                        name=f"tool-{tool_use.name}",
                        input=tool_use.input,
                        output={"result": result},
                    )
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": tool_use.id,
                        "content": result,
                    })

                messages.append({"role": "assistant", "content": response.content})
                messages.append({"role": "user", "content": tool_results})

        trace.end(status="error")
        return "Max turns reached"

    except Exception as e:
        trace.end(status="error")
        raise`, 'python')}
      </div>
    </section>

    <!-- Step 4: View traces -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 4 — View agent traces</h2>
      <p class="text-gray-400 mb-4">
        Run your agent and navigate to
        <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>.
        Each agent invocation appears as a trace. The span waterfall shows every LLM call and
        tool use in sequence — with token counts in the span metadata.
      </p>
      <a href="/demo" class="inline-block text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800 rounded-lg px-4 py-2 hover:bg-indigo-950 transition-colors">
        View demo with sample agent traces →
      </a>
    </section>

    <!-- Links -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">More resources</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a></li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a></li>
        <li><a href="/docs/crewai" class="text-indigo-400 hover:text-indigo-300">CrewAI integration guide</a></li>
        <li><a href="/blog/introducing-nexus" class="text-indigo-400 hover:text-indigo-300">Blog: Introducing Nexus — built by an AI agent</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
        <li><a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">GitHub — open-source SDK</a></li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your Claude agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed. Built for Claude agents, by a Claude agent.
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

  ${footer()}
</body>
</html>`
}

export function docsCrewAIPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Monitor CrewAI Multi-Agent Crews with Nexus',
    description: 'How to monitor your CrewAI multi-agent crews with Nexus.',
    step: [
      { '@type': 'HowToStep', name: 'Install the SDK', text: 'Run: pip install keylightdigital-nexus crewai' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Store it as NEXUS_API_KEY.' },
      { '@type': 'HowToStep', name: 'Instrument your crew', text: 'Create a NexusClient, start a trace before kickoff(), add spans for individual agent tasks, and end the trace after crew completes.' },
      { '@type': 'HowToStep', name: 'View crew traces', text: 'Open the Nexus dashboard to see per-agent span timing, task inputs/outputs, and crew-level status.' },
    ],
  })
  return `${guideHead(
    'CrewAI Observability with Nexus — Monitor Multi-Agent Crews',
    'How to monitor your CrewAI multi-agent crews with Nexus. Python code examples showing how to track individual agent performance and inter-agent coordination.',
    'https://nexus.keylightdigital.dev/docs/crewai',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">CrewAI</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">CrewAI Observability with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Monitor your CrewAI multi-agent crews with Nexus. Track each agent's performance, task execution,
        and inter-agent handoffs — all in one dashboard.
      </p>
    </div>

    <!-- Why Nexus for CrewAI -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with CrewAI?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✓ <strong class="text-white">Per-agent visibility</strong> — see each agent's task traces independently</li>
        <li>✓ <strong class="text-white">Crew-level traces</strong> — one trace per crew run, spans per agent</li>
        <li>✓ <strong class="text-white">Error isolation</strong> — email alert if any crew member fails</li>
        <li>✓ <strong class="text-white">Python-native</strong> — pip install keylightdigital-nexus, 3 lines of code</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install the SDK</h2>
      ${codeBlock('pip install keylightdigital-nexus crewai', 'bash')}
    </section>

    <!-- Step 2: Create API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Add it as an environment variable: <code class="text-indigo-300">NEXUS_API_KEY</code>.
      </p>
    </section>

    <!-- Step 3: Instrument -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Instrument your crew</h2>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">Pattern: one trace per crew run, one span per agent task</p>
        ${codeBlock(`from nexus_client import NexusClient
from crewai import Agent, Task, Crew, Process
import os

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="research-crew",
)

# Define your CrewAI agents
researcher = Agent(
    role="Senior Research Analyst",
    goal="Find accurate and relevant information",
    backstory="Expert researcher with access to web tools",
    verbose=True,
)

writer = Agent(
    role="Content Writer",
    goal="Write compelling, well-structured content",
    backstory="Professional writer specializing in technical content",
    verbose=True,
)

def run_crew(topic: str) -> str:
    # Start a single trace for the entire crew run
    trace = nexus.start_trace(
        name=f"Crew run: {topic[:50]}",
        metadata={"topic": topic, "crew_size": 2},
    )

    try:
        # Track research phase
        research_span = trace.add_span(
            name="researcher-task",
            input={"topic": topic},
        )

        research_task = Task(
            description=f"Research the topic: {topic}",
            expected_output="A detailed research summary with key findings",
            agent=researcher,
        )

        write_task = Task(
            description="Write a blog post based on the research",
            expected_output="A 500-word blog post",
            agent=writer,
            context=[research_task],
        )

        crew = Crew(
            agents=[researcher, writer],
            tasks=[research_task, write_task],
            process=Process.sequential,
            verbose=True,
        )

        result = crew.kickoff()

        # Update the research span with the result
        trace.add_span(
            name="writer-task",
            input={"research": "research summary"},
            output={"post": str(result)[:500]},
        )

        trace.end(status="success")
        return str(result)

    except Exception as e:
        trace.add_span(
            name="crew-error",
            error=str(e),
        )
        trace.end(status="error")
        raise

if __name__ == "__main__":
    result = run_crew("The future of AI agent observability")
    print(result)`, 'python')}
      </div>

      <div class="bg-indigo-950 border border-indigo-800 rounded-xl p-4">
        <p class="text-sm font-semibold text-indigo-300 mb-2">Pro tip: Track individual agent metrics</p>
        <p class="text-sm text-gray-300">
          Use a separate Nexus agent_id per CrewAI role (e.g., <code class="text-indigo-300">researcher-agent</code>,
          <code class="text-indigo-300">writer-agent</code>). This lets you compare performance per role
          in the Agents dashboard and set per-agent error alerts on Pro plan.
        </p>
      </div>
    </section>

    <!-- Advanced: multi-agent traces -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Advanced: track per-agent performance</h2>
      ${codeBlock(`from nexus_client import NexusClient
import os

# One NexusClient per agent role for per-role metrics
researcher_nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="crew-researcher")
writer_nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="crew-writer")

def run_researcher(topic: str) -> str:
    trace = researcher_nexus.start_trace(name=f"Research: {topic[:40]}")
    try:
        # ... research logic ...
        result = "Research findings here"
        trace.end(status="success")
        return result
    except Exception as e:
        trace.end(status="error")
        raise

def run_writer(research: str) -> str:
    trace = writer_nexus.start_trace(name="Write blog post")
    try:
        # ... writing logic ...
        result = "Blog post content here"
        trace.end(status="success")
        return result
    except Exception as e:
        trace.end(status="error")
        raise`, 'python')}
      <p class="text-sm text-gray-400 mt-3">
        With this pattern, the Agents dashboard shows a health card per role.
        Error alerts (Pro) fire per-agent — so if your writer agent fails, you know immediately.
      </p>
    </section>

    <!-- Step 4: View traces -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 4 — View crew traces</h2>
      <p class="text-gray-400 mb-4">
        Run your crew and navigate to
        <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>
        to see each crew run as a trace. The span waterfall shows each agent's task in sequence.
      </p>
      <a href="/demo" class="inline-block text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800 rounded-lg px-4 py-2 hover:bg-indigo-950 transition-colors">
        View demo →
      </a>
    </section>

    <!-- Links -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">More resources</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a></li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a></li>
        <li><a href="/vs/agentops" class="text-indigo-400 hover:text-indigo-300">Nexus vs AgentOps</a> — if you're evaluating alternatives</li>
        <li><a href="/blog/monitor-ai-agents-production" class="text-indigo-400 hover:text-indigo-300">Blog: How to Monitor AI Agents in Production</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
        <li><a href="https://github.com/scobb/nexus/tree/main/sdk-python" class="text-indigo-400 hover:text-indigo-300">Python SDK source</a></li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your CrewAI agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed.
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

  ${footer()}
</body>
</html>`
}

export function docsLangchainPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Monitor LangChain Agents with Nexus',
    description: 'How to monitor and observe your LangChain agents with Nexus.',
    step: [
      { '@type': 'HowToStep', name: 'Install the SDK', text: 'Run: npm install @keylightdigital/nexus langchain (TypeScript) or pip install keylightdigital-nexus langchain (Python)' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Store it as NEXUS_API_KEY.' },
      { '@type': 'HowToStep', name: 'Instrument your LangChain agent', text: 'Wrap your chain or agent executor with Nexus tracing: create a trace, add spans for each chain step, and end the trace on completion.' },
      { '@type': 'HowToStep', name: 'View traces in the dashboard', text: 'Open the Nexus dashboard to inspect your LangChain chain spans, token usage, and latency per step.' },
    ],
  })
  return `${guideHead(
    'LangChain Observability with Nexus — Monitor LangChain Agents',
    'How to monitor and observe your LangChain agents with Nexus. TypeScript and Python code examples, step-by-step integration guide, and trace viewer walkthrough.',
    'https://nexus.keylightdigital.dev/docs/langchain',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">LangChain</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">LangChain Observability with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Monitor your LangChain agents with Nexus. Add 3 lines of code to track every chain invocation,
        LLM call, and tool use — then view traces in the dashboard.
      </p>
    </div>

    <!-- Why Nexus for LangChain -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with LangChain?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✓ <strong class="text-white">Framework-agnostic</strong> — works with any LangChain agent, chain, or tool</li>
        <li>✓ <strong class="text-white">Minimal overhead</strong> — 3 lines of code, no decorators or monkey-patching</li>
        <li>✓ <strong class="text-white">Nested spans</strong> — trace the full chain: LLM call → tool use → LLM call</li>
        <li>✓ <strong class="text-white">$9/mo flat rate</strong> — no per-event pricing surprises</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install the SDK</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-400 mb-2">TypeScript</p>
          ${codeBlock('npm install @keylightdigital/nexus', 'bash')}
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-400 mb-2">Python</p>
          ${codeBlock('pip install keylightdigital-nexus', 'bash')}
        </div>
      </div>
    </section>

    <!-- Step 2: Create API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400 mb-4">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Copy the key — it's only shown once.
      </p>
    </section>

    <!-- Step 3: TypeScript example -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Instrument your LangChain agent</h2>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">TypeScript (with LangChain.js)</p>
        ${codeBlock(`import { NexusClient } from '@keylightdigital/nexus';
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { DynamicTool } from '@langchain/core/tools';

const nexus = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY!,
  agentId: 'langchain-research-agent',
});

async function runAgent(userQuery: string) {
  // Start a Nexus trace for this agent invocation
  const trace = await nexus.startTrace({
    name: \`Research: \${userQuery.slice(0, 50)}\`,
    metadata: { query: userQuery },
  });

  try {
    // Instrument LLM call
    const llmSpan = await trace.addSpan({
      name: 'llm-call',
      input: { query: userQuery },
    });

    const model = new ChatOpenAI({ modelName: 'gpt-4o-mini' });
    const tools = [
      new DynamicTool({
        name: 'search',
        description: 'Search the web',
        func: async (input: string) => {
          // Instrument tool use as a child span
          await trace.addSpan({
            name: 'tool-search',
            input: { query: input },
            output: { result: 'search results...' },
          });
          return 'web search results for: ' + input;
        },
      }),
    ];

    const agent = await createOpenAIFunctionsAgent({ llm: model, tools, prompt: /* ... */ });
    const executor = new AgentExecutor({ agent, tools });
    const result = await executor.invoke({ input: userQuery });

    await trace.end({ status: 'success' });
    return result;
  } catch (error) {
    await trace.end({ status: 'error' });
    throw error;
  }
}`, 'typescript')}
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-400 mb-2">Python (with LangChain)</p>
        ${codeBlock(`from nexus_client import NexusClient
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.tools import tool
import os

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="langchain-research-agent",
)

@tool
def search(query: str) -> str:
    """Search the web for information."""
    return f"Search results for: {query}"

def run_agent(user_query: str):
    # Start a Nexus trace for this invocation
    trace = nexus.start_trace(
        name=f"Research: {user_query[:50]}",
        metadata={"query": user_query},
    )

    try:
        # Track the LLM initialization
        trace.add_span(
            name="agent-init",
            input={"query": user_query},
        )

        llm = ChatOpenAI(model="gpt-4o-mini")
        tools = [search]
        agent = create_openai_functions_agent(llm, tools, prompt=...)
        executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

        result = executor.invoke({"input": user_query})

        # Track each tool call inline
        for step in result.get("intermediate_steps", []):
            action, observation = step
            trace.add_span(
                name=f"tool-{action.tool}",
                input={"query": action.tool_input},
                output={"result": str(observation)[:500]},
            )

        trace.end(status="success")
        return result["output"]

    except Exception as e:
        trace.end(status="error")
        raise`, 'python')}
      </div>
    </section>

    <!-- Step 4: View traces -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 4 — View traces in the dashboard</h2>
      <p class="text-gray-400 mb-4">
        Run your agent and navigate to
        <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>
        to see traces appear in real time. Click any trace to view the span waterfall — each LLM call
        and tool use is a separate span with timing, input, and output.
      </p>
      <a href="/demo" class="inline-block text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800 rounded-lg px-4 py-2 hover:bg-indigo-950 transition-colors">
        View demo with sample LangChain traces →
      </a>
    </section>

    <!-- Patterns -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Common patterns</h2>
      <div class="space-y-4 text-sm text-gray-300">
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p class="font-semibold text-white mb-1">Tracking multi-step chains</p>
          <p>Call <code class="text-indigo-300">trace.addSpan()</code> before and after each chain step.
          The <code class="text-indigo-300">name</code> field maps to what you see in the waterfall.</p>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p class="font-semibold text-white mb-1">Capturing errors</p>
          <p>Wrap your chain in try/catch. Call <code class="text-indigo-300">trace.end({'{'}status: 'error'{'}'}</code>)
          and pass <code class="text-indigo-300">error: err.message</code> to the failing span.</p>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p class="font-semibold text-white mb-1">Parallel tool calls</p>
          <p>LangChain sometimes calls tools in parallel (with <code class="text-indigo-300">createOpenAIToolsAgent</code>).
          Add each tool span individually — they'll appear in the waterfall ordered by start time.</p>
        </div>
      </div>
    </section>

    <!-- Links -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">More resources</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a> — full REST API documentation</li>
        <li><a href="/demo" class="text-indigo-400 hover:text-indigo-300">Interactive demo</a> — see sample traces without signing up</li>
        <li><a href="/vs/langsmith" class="text-indigo-400 hover:text-indigo-300">Nexus vs LangSmith</a> — if you're evaluating alternatives</li>
        <li><a href="/blog/monitor-ai-agents-production" class="text-indigo-400 hover:text-indigo-300">Blog: How to Monitor AI Agents in Production</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
        <li><a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">GitHub</a> — open-source SDK</li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your LangChain agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed.
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

  ${footer()}
</body>
</html>`
}

export function docsOpenAIAgentsPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Monitor OpenAI Agents SDK with Nexus',
    description: 'How to instrument OpenAI Agents SDK with Nexus tracing.',
    step: [
      { '@type': 'HowToStep', name: 'Install both SDKs', text: 'Run: npm install @keylightdigital/nexus openai (TypeScript) or pip install keylightdigital-nexus openai (Python)' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Store it as NEXUS_API_KEY.' },
      { '@type': 'HowToStep', name: 'Instrument your agent', text: 'Wrap your OpenAI Agents SDK runner with Nexus tracing: create a trace, add spans for each agent turn and tool call, and end the trace when the agent finishes.' },
    ],
  })
  return `${guideHead(
    'Monitor OpenAI Agents SDK with Nexus — Integration Guide',
    'How to instrument OpenAI Agents SDK with Nexus tracing. TypeScript and Python code examples for tracing agents, tool calls, and handoffs.',
    'https://nexus.keylightdigital.dev/docs/openai-agents',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">OpenAI Agents SDK</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Monitor OpenAI Agents SDK with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Instrument agents built with OpenAI\'s Agents SDK. Track every LLM call, tool execution,
        and agent handoff — in TypeScript or Python.
      </p>
    </div>

    <!-- Why Nexus for OpenAI Agents -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with OpenAI Agents SDK?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✓ <strong class="text-white">Agent + tool spans</strong> — every tool call and handoff appears as a span</li>
        <li>✓ <strong class="text-white">Trace the full loop</strong> — from user input to final response across all turns</li>
        <li>✓ <strong class="text-white">Error alerts</strong> — get emailed when any agent run fails (Pro)</li>
        <li>✓ <strong class="text-white">TypeScript + Python</strong> — works with both SDK flavors</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install both SDKs</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-gray-400 mb-2">TypeScript</p>
          ${codeBlock('npm install @keylightdigital/nexus openai', 'bash')}
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-400 mb-2">Python</p>
          ${codeBlock('pip install keylightdigital-nexus openai', 'bash')}
        </div>
      </div>
    </section>

    <!-- Step 2: Create API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Add it as <code class="text-indigo-300">NEXUS_API_KEY</code>
        alongside your <code class="text-indigo-300">OPENAI_API_KEY</code>.
      </p>
    </section>

    <!-- Step 3: TypeScript example -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Instrument your agent</h2>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">TypeScript — agent with tool calls</p>
        ${codeBlock(`import OpenAI from 'openai';
import { NexusClient } from '@keylightdigital/nexus';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const nexus = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY!,
  agentId: 'openai-research-agent',
});

async function runAgent(userMessage: string) {
  const trace = await nexus.startTrace({
    name: \\\`OpenAI agent: \\\${userMessage.slice(0, 60)}\\\`,
    metadata: { model: 'gpt-4o' },
  });

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'user', content: userMessage }
  ];

  try {
    for (let turn = 1; turn <= 5; turn++) {
      await trace.addSpan({ name: \\\`llm-call-turn-\\\${turn}\\\`, input: { turn } });

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
      });

      const choice = response.choices[0];
      await trace.addSpan({
        name: \\\`llm-response-turn-\\\${turn}\\\`,
        output: { finish_reason: choice.finish_reason },
      });

      if (choice.finish_reason === 'stop') {
        await trace.end({ status: 'success' });
        return choice.message.content;
      }
    }
    await trace.end({ status: 'error' });
  } catch (error) {
    await trace.end({ status: 'error' });
    throw error;
  }
}`, 'typescript')}
      </div>

      <div>
        <p class="text-sm font-semibold text-gray-400 mb-2">Python — agent with tool calls</p>
        ${codeBlock(`from openai import OpenAI
from nexus_client import NexusClient
import os

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="openai-research-agent",
)

def run_agent(user_message: str) -> str:
    trace = nexus.start_trace(
        name=f"OpenAI agent: {user_message[:60]}",
        metadata={"model": "gpt-4o"},
    )
    messages = [{"role": "user", "content": user_message}]

    try:
        for turn in range(1, 6):
            trace.add_span(name=f"llm-call-turn-{turn}", input={"turn": turn})

            response = client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
            )
            choice = response.choices[0]
            trace.add_span(
                name=f"llm-response-turn-{turn}",
                output={"finish_reason": choice.finish_reason},
            )

            if choice.finish_reason == "stop":
                trace.end(status="success")
                return choice.message.content or ""

        trace.end(status="error")
        return "Max turns reached"
    except Exception:
        trace.end(status="error")
        raise`, 'python')}
      </div>
    </section>

    <!-- What you see in Nexus -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">What you\'ll see in Nexus</h2>
      <ul class="text-sm text-gray-300 space-y-3">
        <li><strong class="text-white">Trace list</strong> — every agent run as a row with status, duration, and agent name</li>
        <li><strong class="text-white">Span waterfall</strong> — each LLM call and tool use as a timed bar</li>
        <li><strong class="text-white">Input/output inspector</strong> — click any span to expand the full prompt and response</li>
        <li><strong class="text-white">Error alerts</strong> — Pro users get an email when any agent run fails</li>
      </ul>
    </section>

    <!-- Next steps -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Next steps</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a> — full REST API documentation</li>
        <li><a href="/demo" class="text-indigo-400 hover:text-indigo-300">Interactive demo</a> — see sample traces without signing up</li>
        <li><a href="/docs/anthropic-sdk" class="text-indigo-400 hover:text-indigo-300">Anthropic SDK guide</a> — if you use Claude instead</li>
        <li><a href="/blog/monitor-ai-agents-production" class="text-indigo-400 hover:text-indigo-300">Blog: How to Monitor AI Agents in Production</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
        <li><a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">GitHub</a> — open-source SDK</li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your OpenAI agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed.
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

  ${footer()}
</body>
</html>`
}

export function docsAutoGenPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Monitor AutoGen Multi-Agent Workflows with Nexus',
    description: 'How to add Nexus tracing to Microsoft AutoGen multi-agent workflows.',
    step: [
      { '@type': 'HowToStep', name: 'Install the SDK', text: 'Run: pip install keylightdigital-nexus pyautogen' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Store it as NEXUS_API_KEY.' },
      { '@type': 'HowToStep', name: 'Wrap your AutoGen workflow', text: 'Create a NexusClient, start a trace before initiating the AutoGen conversation, add spans per agent message, and end the trace when the workflow completes.' },
    ],
  })
  return `${guideHead(
    'Monitor AutoGen Multi-Agent Workflows with Nexus — Integration Guide',
    'How to add Nexus tracing to Microsoft AutoGen multi-agent workflows. Python code examples for tracing agents, conversations, and tool calls.',
    'https://nexus.keylightdigital.dev/docs/autogen',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">AutoGen</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Monitor AutoGen Workflows with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Add observability to Microsoft AutoGen multi-agent workflows. Track every agent conversation,
        tool call, and handoff — all in one dashboard.
      </p>
    </div>

    <!-- Why Nexus for AutoGen -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with AutoGen?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✓ <strong class="text-white">Per-agent spans</strong> — see each agent\'s contribution in the waterfall</li>
        <li>✓ <strong class="text-white">Conversation tracing</strong> — one trace per multi-agent conversation</li>
        <li>✓ <strong class="text-white">Tool call visibility</strong> — function calling and code execution logged as spans</li>
        <li>✓ <strong class="text-white">Error alerts</strong> — get emailed when any workflow fails (Pro)</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install the SDK</h2>
      ${codeBlock('pip install keylightdigital-nexus autogen-agentchat', 'bash')}
    </section>

    <!-- Step 2: Create API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Store it as <code class="text-indigo-300">NEXUS_API_KEY</code>.
      </p>
    </section>

    <!-- Step 3: Instrument -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Wrap your AutoGen workflow</h2>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">Pattern: one trace per conversation, one span per agent turn</p>
        ${codeBlock(`from autogen import AssistantAgent, UserProxyAgent
from nexus_client import NexusClient
import os

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="autogen-research-workflow",
)

config_list = [
    {
        "model": "gpt-4o",
        "api_key": os.environ["OPENAI_API_KEY"],
    }
]

# Create AutoGen agents
assistant = AssistantAgent(
    name="assistant",
    llm_config={"config_list": config_list},
)

user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config={"work_dir": "coding", "use_docker": False},
)

def run_workflow(task: str) -> None:
    # Start Nexus trace for the full conversation
    trace = nexus.start_trace(
        name=f"AutoGen: {task[:60]}",
        metadata={"task": task, "agents": ["assistant", "user_proxy"]},
    )

    try:
        # Track the initiation
        trace.add_span(
            name="workflow-start",
            input={"task": task, "agent_count": 2},
        )

        # Run the AutoGen conversation
        user_proxy.initiate_chat(
            assistant,
            message=task,
        )

        # Log conversation summary
        history = user_proxy.chat_messages.get(assistant, [])
        trace.add_span(
            name="workflow-complete",
            output={
                "message_count": len(history),
                "last_role": history[-1]["role"] if history else None,
            },
        )

        trace.end(status="success")

    except Exception as e:
        trace.add_span(
            name="workflow-error",
            error=str(e),
        )
        trace.end(status="error")
        raise


if __name__ == "__main__":
    run_workflow("Write and test a Python function that checks if a number is prime")`, 'python')}
      </div>
    </section>

    <!-- Advanced: per-turn spans -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Advanced — per-turn spans with a reply hook</h2>
      <p class="text-gray-400 mb-4">
        For finer-grained visibility, hook into AutoGen\'s message passing to record each agent turn:
      </p>
      ${codeBlock(`from autogen import AssistantAgent, UserProxyAgent, Agent
from nexus_client import NexusClient, Trace
import os

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="autogen-workflow",
)

class TracedUserProxy(UserProxyAgent):
    """UserProxyAgent that records each turn to Nexus."""

    def __init__(self, *args, nexus_trace: Trace, **kwargs):
        super().__init__(*args, **kwargs)
        self._nexus_trace = nexus_trace
        self._turn = 0

    def receive(self, message, sender: Agent, request_reply=None, silent=False):
        self._turn += 1
        self._nexus_trace.add_span(
            name=f"turn-{self._turn}-{sender.name}",
            input={"role": sender.name, "turn": self._turn},
            output={"content": str(message)[:500]},
        )
        return super().receive(message, sender, request_reply, silent)


def run_traced_workflow(task: str) -> None:
    trace = nexus.start_trace(name=f"AutoGen: {task[:60]}")

    assistant = AssistantAgent(
        name="assistant",
        llm_config={"config_list": [{"model": "gpt-4o", "api_key": os.environ["OPENAI_API_KEY"]}]},
    )
    user_proxy = TracedUserProxy(
        name="user_proxy",
        nexus_trace=trace,
        human_input_mode="NEVER",
        max_consecutive_auto_reply=5,
    )

    try:
        user_proxy.initiate_chat(assistant, message=task)
        trace.end(status="success")
    except Exception:
        trace.end(status="error")
        raise`, 'python')}
    </section>

    <!-- What you see in Nexus -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">What you\'ll see in Nexus</h2>
      <ul class="text-sm text-gray-300 space-y-3">
        <li><strong class="text-white">Trace list</strong> — every workflow run with status, duration, and agent name</li>
        <li><strong class="text-white">Turn waterfall</strong> — each agent turn as a timed span in order</li>
        <li><strong class="text-white">Message inspector</strong> — click any span to see the full message content</li>
        <li><strong class="text-white">Error alerts</strong> — Pro users get an email when any workflow fails</li>
      </ul>
    </section>

    <!-- Next steps -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Next steps</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a> — full REST API documentation</li>
        <li><a href="/demo" class="text-indigo-400 hover:text-indigo-300">Interactive demo</a> — see sample traces without signing up</li>
        <li><a href="/docs/crewai" class="text-indigo-400 hover:text-indigo-300">CrewAI guide</a> — another multi-agent framework</li>
        <li><a href="/blog/autonomous-agent-observability" class="text-indigo-400 hover:text-indigo-300">Blog: Building Autonomous Agents with Observability</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
        <li><a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">GitHub</a> — open-source SDK</li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your AutoGen workflows</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed.
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

  ${footer()}
</body>
</html>`
}

export function docsPydanticAIPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Monitor Pydantic AI Agents with Nexus',
    description: 'How to add Nexus tracing to Pydantic AI agent applications.',
    step: [
      { '@type': 'HowToStep', name: 'Install the SDK', text: 'Run: pip install keylightdigital-nexus pydantic-ai' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Store it as NEXUS_API_KEY.' },
      { '@type': 'HowToStep', name: 'Instrument your Pydantic AI agent', text: 'Create a NexusClient and wrap your pydantic_ai.Agent run calls with trace/span instrumentation to capture inputs, outputs, and tool calls.' },
    ],
  })
  return `${guideHead(
    'Monitor Pydantic AI Agents with Nexus — Integration Guide',
    'How to add Nexus tracing to Pydantic AI agent applications. Python code examples with decorators for tracing agent runs, tool calls, and structured outputs.',
    'https://nexus.keylightdigital.dev/docs/pydantic-ai',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">Pydantic AI</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Monitor Pydantic AI Agents with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Add tracing to AI agents built with Pydantic AI. Track every agent run, tool call,
        and structured output — with minimal boilerplate.
      </p>
    </div>

    <!-- Why Nexus for Pydantic AI -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with Pydantic AI?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✓ <strong class="text-white">Structured output tracing</strong> — log validated Pydantic model outputs as span data</li>
        <li>✓ <strong class="text-white">Tool call spans</strong> — every <code class="text-indigo-300">@agent.tool</code> appears as a named span</li>
        <li>✓ <strong class="text-white">Decorator-friendly</strong> — wrap agents and tools with minimal code changes</li>
        <li>✓ <strong class="text-white">Error alerts</strong> — get emailed when any agent run fails (Pro)</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install the SDK</h2>
      ${codeBlock('pip install keylightdigital-nexus pydantic-ai', 'bash')}
    </section>

    <!-- Step 2: Create API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Store it as <code class="text-indigo-300">NEXUS_API_KEY</code>.
      </p>
    </section>

    <!-- Step 3: Instrument -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Instrument your Pydantic AI agent</h2>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">Basic pattern — wrap agent.run() with a Nexus trace</p>
        ${codeBlock(`from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from nexus_client import NexusClient
from pydantic import BaseModel
import os

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="pydantic-research-agent",
)

# Define a structured output model
class ResearchResult(BaseModel):
    summary: str
    key_points: list[str]
    confidence: float

# Create the Pydantic AI agent
model = OpenAIModel("gpt-4o", api_key=os.environ["OPENAI_API_KEY"])
agent = Agent(model, result_type=ResearchResult)

async def run_agent(query: str) -> ResearchResult:
    trace = nexus.start_trace(
        name=f"Research: {query[:60]}",
        metadata={"query": query, "output_type": "ResearchResult"},
    )

    try:
        trace.add_span(
            name="agent-run-start",
            input={"query": query},
        )

        result = await agent.run(query)

        trace.add_span(
            name="agent-run-complete",
            output={
                "summary": result.data.summary,
                "key_point_count": len(result.data.key_points),
                "confidence": result.data.confidence,
                "cost": result.cost().total_tokens if result.cost() else None,
            },
        )

        trace.end(status="success")
        return result.data

    except Exception as e:
        trace.add_span(name="agent-run-error", error=str(e))
        trace.end(status="error")
        raise`, 'python')}
      </div>

      <div class="mb-6">
        <p class="text-sm font-semibold text-gray-400 mb-2">Tool tracing with @agent.tool decorator</p>
        ${codeBlock(`from pydantic_ai import Agent, RunContext
from nexus_client import NexusClient
import os

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="pydantic-tool-agent",
)

agent = Agent("openai:gpt-4o")

# Shared trace object (set per-run)
_current_trace = None

@agent.tool
async def web_search(ctx: RunContext[None], query: str) -> str:
    """Search the web for current information."""
    if _current_trace:
        _current_trace.add_span(
            name="tool-web_search",
            input={"query": query},
            output={"result": f"Search results for: {query}"},
        )
    # Your real search implementation here
    return f"Results for '{query}': [search results]"

@agent.tool
async def read_file(ctx: RunContext[None], path: str) -> str:
    """Read a file from the filesystem."""
    if _current_trace:
        _current_trace.add_span(
            name="tool-read_file",
            input={"path": path},
        )
    with open(path) as f:
        return f.read()

async def run_with_tools(task: str) -> str:
    global _current_trace
    _current_trace = nexus.start_trace(
        name=f"Agent with tools: {task[:60]}",
    )

    try:
        result = await agent.run(task)
        _current_trace.end(status="success")
        return str(result.data)
    except Exception as e:
        _current_trace.add_span(name="error", error=str(e))
        _current_trace.end(status="error")
        raise
    finally:
        _current_trace = None`, 'python')}
      </div>
    </section>

    <!-- What you see in Nexus -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">What you\'ll see in Nexus</h2>
      <ul class="text-sm text-gray-300 space-y-3">
        <li><strong class="text-white">Trace list</strong> — every agent run with status, duration, and agent name</li>
        <li><strong class="text-white">Tool span waterfall</strong> — each <code class="text-indigo-300">@agent.tool</code> call as a timed bar</li>
        <li><strong class="text-white">Structured output</strong> — Pydantic model fields logged in span output</li>
        <li><strong class="text-white">Error alerts</strong> — Pro users get an email when validation or runtime errors occur</li>
      </ul>
    </section>

    <!-- Next steps -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Next steps</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a> — full REST API documentation</li>
        <li><a href="/demo" class="text-indigo-400 hover:text-indigo-300">Interactive demo</a> — see sample traces without signing up</li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain guide</a> — another popular Python framework</li>
        <li><a href="/blog/monitor-ai-agents-production" class="text-indigo-400 hover:text-indigo-300">Blog: How to Monitor AI Agents in Production</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
        <li><a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">GitHub</a> — open-source SDK</li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your Pydantic AI agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed.
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

  ${footer()}
</body>
</html>`
}

export function docsDSPyPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'DSPy Observability with Nexus — Tracing & Monitoring',
    description: 'How to add observability to DSPy programs using Nexus. Module tracing, optimizer observability, and evaluation monitoring.',
    step: [
      { '@type': 'HowToStep', name: 'Install Nexus', text: 'Run: pip install keylightdigital-nexus dspy-ai' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Set it as NEXUS_API_KEY in your environment.' },
      { '@type': 'HowToStep', name: 'Instrument DSPy modules', text: 'Wrap your dspy.Module forward() calls with Nexus trace and span creation to capture every LLM call and retriever step.' },
      { '@type': 'HowToStep', name: 'Trace optimizer runs', text: 'Wrap BootstrapFewShot and MIPRO optimizer calls in traces to observe compilation time, iterations, and metric scores.' },
      { '@type': 'HowToStep', name: 'Monitor evaluations', text: 'Trace dspy.Evaluate runs to see per-example pass/fail rates and latency in the Nexus dashboard.' },
    ],
  })
  const installCode = codeBlock('pip install keylightdigital-nexus dspy-ai', 'bash')
  const apikeyCode = codeBlock('export NEXUS_API_KEY="nxs_your_api_key_here"', 'bash')
  const setupCode = codeBlock(
    `import dspy
import os
from nexus_client import NexusClient

# Configure your LM as usual
lm = dspy.LM("openai/gpt-4o-mini", api_key=os.environ["OPENAI_API_KEY"])
dspy.configure(lm=lm)

# Initialize Nexus client
nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="dspy-app",
)`,
    'python',
  )
  const moduleCode = codeBlock(
    `import dspy
from nexus_client import NexusClient
import os

nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="dspy-rag")

# Define your DSPy signatures
class GenerateAnswer(dspy.Signature):
    """Answer a question given supporting context."""
    context: str = dspy.InputField(desc="Relevant passages from the knowledge base")
    question: str = dspy.InputField()
    answer: str = dspy.OutputField(desc="Concise answer based on the context")

class RAGModule(dspy.Module):
    def __init__(self):
        self.retrieve = dspy.Retrieve(k=3)
        self.generate = dspy.ChainOfThought(GenerateAnswer)

    def forward(self, question: str) -> dspy.Prediction:
        # Create a trace for the full module run
        trace = nexus.start_trace(
            name="rag: " + question[:60],
            metadata={"module": "RAGModule", "retrieve_k": 3},
        )
        try:
            # Span for retrieval step
            retrieve_span = nexus.add_span(
                trace_id=trace["id"],
                name="retrieve",
                input={"question": question, "k": 3},
            )
            passages = self.retrieve(question)
            nexus.end_span(
                trace_id=trace["id"],
                span_id=retrieve_span["span_id"],
                output={"num_passages": len(passages.passages)},
                status="ok",
            )

            # Span for generation step
            gen_span = nexus.add_span(
                trace_id=trace["id"],
                name="chain-of-thought",
                input={"context_length": sum(len(p) for p in passages.passages)},
            )
            prediction = self.generate(
                context=passages.passages,
                question=question,
            )
            nexus.end_span(
                trace_id=trace["id"],
                span_id=gen_span["span_id"],
                output={"answer_length": len(prediction.answer)},
                status="ok",
            )

            nexus.end_trace(trace_id=trace["id"], status="success")
            return prediction
        except Exception as e:
            nexus.end_trace(trace_id=trace["id"], status="error")
            raise

rag = RAGModule()
result = rag("What is DSPy and how does it differ from LangChain?")
print(result.answer)

# Nexus dashboard shows:
#   trace: rag: What is DSPy...
#   +-- retrieve (3 passages fetched)
#   +-- chain-of-thought (answer generated)`,
    'python',
  )
  const optimizerCode = codeBlock(
    `import dspy
from dspy.teleprompt import BootstrapFewShot
from nexus_client import NexusClient
import os

nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="dspy-optimizer")

# Define metric
def answer_exact_match(example, pred, trace=None):
    return example.answer.lower() == pred.answer.lower()

# Training data
trainset = [
    dspy.Example(question="What is the capital of France?", answer="Paris").with_inputs("question"),
    dspy.Example(question="Who wrote Hamlet?", answer="Shakespeare").with_inputs("question"),
    # ... more examples
]

# Trace the entire optimization run
opt_trace = nexus.start_trace(
    name="bootstrap-few-shot optimization",
    metadata={"metric": "exact_match", "trainset_size": len(trainset), "max_bootstrapped_demos": 3},
)
try:
    teleprompter = BootstrapFewShot(metric=answer_exact_match, max_bootstrapped_demos=3)
    optimized_program = teleprompter.compile(RAGModule(), trainset=trainset)

    # Log a compilation-complete span
    nexus.add_span(
        trace_id=opt_trace["id"],
        name="compilation-complete",
        output={"status": "compiled", "demos_generated": 3},
        status="ok",
    )
    nexus.end_trace(trace_id=opt_trace["id"], status="success")
except Exception as e:
    nexus.end_trace(trace_id=opt_trace["id"], status="error")
    raise

# Save and reuse the optimized program
optimized_program.save("optimized_rag.json")

# Nexus dashboard shows:
#   trace: bootstrap-few-shot optimization
#   +-- compilation-complete`,
    'python',
  )
  const evaluationCode = codeBlock(
    `import dspy
from nexus_client import NexusClient
import os

nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="dspy-evaluator")

# Evaluation dataset
devset = [
    dspy.Example(question="What is RAG?", answer="Retrieval-Augmented Generation").with_inputs("question"),
    dspy.Example(question="Define gradient descent", answer="An optimization algorithm").with_inputs("question"),
    # ... more examples
]

def answer_f1(example, pred, trace=None):
    pred_tokens = set(pred.answer.lower().split())
    gold_tokens = set(example.answer.lower().split())
    if not pred_tokens or not gold_tokens:
        return 0.0
    precision = len(pred_tokens & gold_tokens) / len(pred_tokens)
    recall = len(pred_tokens & gold_tokens) / len(gold_tokens)
    return (2 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0

# Trace the evaluation run
eval_trace = nexus.start_trace(
    name="evaluation run",
    metadata={"metric": "f1", "devset_size": len(devset), "program": "RAGModule"},
)

evaluate = dspy.Evaluate(devset=devset, metric=answer_f1, num_threads=4)
score = evaluate(optimized_program)

nexus.add_span(
    trace_id=eval_trace["id"],
    name="evaluation-result",
    output={"f1_score": score, "devset_size": len(devset)},
    status="ok",
)
nexus.end_trace(trace_id=eval_trace["id"], status="success")
print(f"Evaluation score: {score:.2f}")

# Nexus dashboard shows:
#   trace: evaluation run
#   +-- evaluation-result (f1_score: 0.78)`,
    'python',
  )
  return `${guideHead(
    'DSPy Observability & Tracing — Nexus Integration Guide',
    'Monitor DSPy programs with Nexus. Module tracing, optimizer observability, and evaluation monitoring. Add Nexus in minutes — no framework changes needed.',
    'https://nexus.keylightdigital.dev/docs/dspy',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">&#x203A;</span>
      <span class="text-gray-400">DSPy</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">DSPy Observability with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Add production observability to DSPy programs. Trace every module forward pass, monitor
        optimizer compilations, and track evaluation runs — all in a single dashboard.
      </p>
    </div>

    <!-- Why Nexus for DSPy -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with DSPy?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>&#x2713; <strong class="text-white">Module tracing</strong> &#x2014; capture every <code class="text-indigo-300 bg-gray-800 px-1 rounded">forward()</code> call with input, output, and latency</li>
        <li>&#x2713; <strong class="text-white">Optimizer observability</strong> &#x2014; monitor BootstrapFewShot and MIPRO compilation time and outcomes</li>
        <li>&#x2713; <strong class="text-white">Evaluation monitoring</strong> &#x2014; track metric scores, per-example pass/fail, and regression across runs</li>
        <li>&#x2713; <strong class="text-white">Zero DSPy internals</strong> &#x2014; wraps the public API, no monkey-patching or private hooks needed</li>
        <li>&#x2713; <strong class="text-white">$9/mo</strong> &#x2014; no enterprise contracts, free plan for prototyping</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 &#x2014; Install dependencies</h2>
      <p class="text-gray-400 mb-4">DSPy is a Python framework. Install the Nexus Python SDK alongside DSPy:</p>
      ${installCode}
      <p class="text-sm text-gray-500 mt-3">Requires Python 3.9+ and dspy-ai &ge; 2.4.0</p>
    </section>

    <!-- Step 2: API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 &#x2014; Create an API key</h2>
      <p class="text-gray-400 mb-4">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Add it to your environment:
      </p>
      ${apikeyCode}
    </section>

    <!-- Step 3: Setup -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 &#x2014; Configure DSPy and Nexus</h2>
      <p class="text-gray-400 mb-4">
        Configure your language model and Nexus client at startup. The Nexus client is lightweight
        and safe to initialize globally &#x2014; all methods fail silently if the API is unreachable.
      </p>
      ${setupCode}
    </section>

    <!-- Step 4: Module tracing -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 4 &#x2014; Trace DSPy modules</h2>
      <p class="text-gray-400 mb-4">
        Wrap your <code class="text-indigo-300 bg-gray-900 px-1.5 py-0.5 rounded text-sm">dspy.Module.forward()</code>
        method with a Nexus trace. Add child spans for each distinct step (retrieval, prediction, tool call).
        This gives you a full waterfall view per module run.
      </p>
      ${moduleCode}
    </section>

    <!-- Step 5: Optimizer tracing -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 5 &#x2014; Trace optimizer runs</h2>
      <p class="text-gray-400 mb-4">
        DSPy optimizers (teleprompts) like <code class="text-indigo-300 bg-gray-900 px-1.5 py-0.5 rounded text-sm">BootstrapFewShot</code>
        and <code class="text-indigo-300 bg-gray-900 px-1.5 py-0.5 rounded text-sm">MIPRO</code> can run
        for minutes or hours. Wrapping them in a trace lets you compare compilation cost across
        different configurations and track regressions.
      </p>
      ${optimizerCode}
    </section>

    <!-- Step 6: Evaluation tracing -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 6 &#x2014; Monitor evaluations</h2>
      <p class="text-gray-400 mb-4">
        Trace <code class="text-indigo-300 bg-gray-900 px-1.5 py-0.5 rounded text-sm">dspy.Evaluate</code> calls
        to track metric scores over time. Compare pre-optimization vs post-optimization performance
        in the Nexus dashboard without digging through terminal output.
      </p>
      ${evaluationCode}
    </section>

    <!-- Step 7: View traces -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 7 &#x2014; View traces in Nexus</h2>
      <p class="text-gray-400 mb-4">
        Navigate to
        <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>
        to see every module run, optimizer compilation, and evaluation as a trace with span waterfall,
        latency breakdown, and status indicators.
      </p>
      <a href="/demo" class="inline-block text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800 rounded-lg px-4 py-2 hover:bg-indigo-950 transition-colors">
        View demo with sample traces &#x2192;
      </a>
    </section>

    <!-- Links -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">More resources</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a></li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a></li>
        <li><a href="/docs/llamaindex" class="text-indigo-400 hover:text-indigo-300">LlamaIndex integration guide</a></li>
        <li><a href="/docs/anthropic-sdk" class="text-indigo-400 hover:text-indigo-300">Anthropic SDK integration guide</a></li>
        <li><a href="/blog/monitoring-rag-pipelines" class="text-indigo-400 hover:text-indigo-300">Blog: Monitoring RAG pipelines in production</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> &#x2014; free plan or $9/mo Pro</li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your DSPy programs</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed. Add tracing in under 10 minutes.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start free &#x2192;
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View demo
        </a>
      </div>
    </section>
  </div>

  ${footer()}
</body>
</html>`
}

export function docsLlamaIndexPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'LlamaIndex Observability with Nexus — Tracing & Monitoring',
    description: 'How to add observability to LlamaIndex RAG pipelines and agents using Nexus.',
    step: [
      { '@type': 'HowToStep', name: 'Install Nexus', text: 'Run: pip install keylightdigital-nexus llama-index' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Set it as NEXUS_API_KEY in your environment.' },
      { '@type': 'HowToStep', name: 'Configure the callback handler', text: 'Import NexusCallbackHandler and pass it to Settings.callback_manager so LlamaIndex emits events to Nexus automatically.' },
      { '@type': 'HowToStep', name: 'Trace a query engine', text: 'Build your VectorStoreIndex and query engine normally — all retrieval, LLM, and synthesizer spans appear in the Nexus dashboard.' },
      { '@type': 'HowToStep', name: 'Trace an agent', text: 'Wrap a ReActAgent or OpenAIAgent with a manual trace for multi-step tool-use visibility.' },
    ],
  })
  const installCode = codeBlock('pip install keylightdigital-nexus llama-index', 'bash')
  const apikeyCode = codeBlock('export NEXUS_API_KEY="nxs_your_api_key_here"', 'bash')
  const callbackCode = codeBlock(
    `from nexus_client import NexusClient, NexusCallbackHandler
from llama_index.core import Settings
from llama_index.core.callbacks import CallbackManager
import os

# Initialize Nexus client
nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="llamaindex-rag-app",
)

# Create the callback handler
nexus_handler = NexusCallbackHandler(nexus_client=nexus)

# Register globally — all LlamaIndex pipelines will use this
Settings.callback_manager = CallbackManager([nexus_handler])`,
    'python',
  )
  const queryEngineCode = codeBlock(
    `from nexus_client import NexusClient, NexusCallbackHandler
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.core.callbacks import CallbackManager
import os

# --- Setup (run once at startup) ---
nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="rag-pipeline")
Settings.callback_manager = CallbackManager([NexusCallbackHandler(nexus_client=nexus)])

# --- Index your documents ---
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# --- Query: each call creates a trace automatically ---
query_engine = index.as_query_engine(similarity_top_k=3)

response = query_engine.query("What is the capital of France?")
print(response)

# Nexus dashboard will show:
#   trace: query
#   +-- retrieve (3 nodes fetched, latency, similarity scores)
#   +-- llm-call (prompt tokens, completion tokens, model)
#   +-- synthesize (output text)`,
    'python',
  )
  const agentCode = codeBlock(
    `from nexus_client import NexusClient, NexusCallbackHandler
from llama_index.core import Settings
from llama_index.core.callbacks import CallbackManager
from llama_index.core.tools import FunctionTool
from llama_index.agent.openai import OpenAIAgent
import os

nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="llamaindex-agent")
Settings.callback_manager = CallbackManager([NexusCallbackHandler(nexus_client=nexus)])

# --- Define tools ---
def search_docs(query: str) -> str:
    """Search internal documentation for relevant content."""
    return "Found relevant content for: " + query

def calculate(expression: str) -> str:
    """Evaluate a mathematical expression safely."""
    return "42"

search_tool = FunctionTool.from_defaults(fn=search_docs)
calc_tool = FunctionTool.from_defaults(fn=calculate)
agent = OpenAIAgent.from_tools([search_tool, calc_tool], verbose=True)

# --- Run with a manual trace for the outer agent loop ---
def run_agent(user_query: str) -> str:
    trace = nexus.start_trace(
        name="agent: " + user_query[:60],
        metadata={"agent_type": "openai", "tools": ["search_docs", "calculate"]},
    )
    try:
        result = agent.chat(user_query)
        nexus.end_trace(trace_id=trace["id"], status="success")
        return str(result)
    except Exception as e:
        nexus.end_trace(trace_id=trace["id"], status="error")
        raise

answer = run_agent("How many tokens did our last 10 queries use in total?")
print(answer)

# Nexus dashboard will show:
#   agent: How many tokens... (outer trace)
#   +-- llm-call (initial planning)
#   +-- tool-search_docs
#   +-- llm-call (reasoning)
#   +-- tool-calculate
#   +-- llm-call (final answer)`,
    'python',
  )
  return `${guideHead(
    'LlamaIndex Observability & Tracing — Nexus Integration Guide',
    'Monitor LlamaIndex RAG pipelines and agents with Nexus. Callback handler setup, query engine tracing, and agent tracing with full span waterfalls. Python examples.',
    'https://nexus.keylightdigital.dev/docs/llamaindex',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">&#x203A;</span>
      <span class="text-gray-400">LlamaIndex</span>
    </p>

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Integration Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">LlamaIndex Observability with Nexus</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Add full observability to your LlamaIndex RAG pipelines and agents. Track every retrieval,
        LLM call, re-ranker, and synthesizer step in a span waterfall — no code changes needed for
        standard pipelines.
      </p>
    </div>

    <!-- Why Nexus for LlamaIndex -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Why use Nexus with LlamaIndex?</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>&#x2713; <strong class="text-white">Callback-based auto-tracing</strong> — plug in one handler to trace the entire pipeline</li>
        <li>&#x2713; <strong class="text-white">RAG span visibility</strong> — see retrieval, embedding, re-ranking, and synthesis as separate spans</li>
        <li>&#x2713; <strong class="text-white">Agent step tracing</strong> — track every tool call and LLM turn in ReAct and OpenAI agents</li>
        <li>&#x2713; <strong class="text-white">LlamaIndex monitoring</strong> — latency, errors, and token usage in one dashboard</li>
        <li>&#x2713; <strong class="text-white">No vendor lock-in</strong> — works alongside any LLM provider LlamaIndex supports</li>
      </ul>
    </section>

    <!-- Step 1: Install -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 — Install dependencies</h2>
      <p class="text-gray-400 mb-4">LlamaIndex is primarily a Python framework. Install both packages:</p>
      ${installCode}
      <p class="text-sm text-gray-500 mt-3">Requires Python 3.9+ and llama-index &ge; 0.10.0</p>
    </section>

    <!-- Step 2: API Key -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 — Create an API key</h2>
      <p class="text-gray-400 mb-4">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>
        and create a new API key. Add it to your environment:
      </p>
      ${apikeyCode}
    </section>

    <!-- Step 3: Callback handler -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 — Configure the callback handler</h2>
      <p class="text-gray-400 mb-4">
        Nexus integrates with LlamaIndex via the built-in
        <code class="text-indigo-300 bg-gray-900 px-1.5 py-0.5 rounded text-sm">CallbackManager</code>.
        Configure it once via <code class="text-indigo-300 bg-gray-900 px-1.5 py-0.5 rounded text-sm">Settings</code>
        and all subsequent query engines and agents will emit traces automatically.
      </p>
      ${callbackCode}
      <p class="text-sm text-gray-500 mt-3">
        The handler automatically captures <code class="text-indigo-300">LLMStartEvent</code>,
        <code class="text-indigo-300">LLMEndEvent</code>, <code class="text-indigo-300">RetrieveStartEvent</code>,
        and <code class="text-indigo-300">RetrieveEndEvent</code> from LlamaIndex's event system.
      </p>
    </section>

    <!-- Step 4: Query Engine tracing -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 4 — Trace a query engine</h2>
      <p class="text-gray-400 mb-4">
        With the callback handler configured, build your index and query engine as normal.
        Every query automatically produces a trace with retrieval and LLM spans.
      </p>
      ${queryEngineCode}
    </section>

    <!-- Step 5: Agent tracing -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 5 — Trace a LlamaIndex agent</h2>
      <p class="text-gray-400 mb-4">
        For agents (ReAct, OpenAI function-calling), wrap the agent run in a manual trace to
        capture the full multi-step loop alongside the automatic callback spans.
      </p>
      ${agentCode}
    </section>

    <!-- Step 6: View traces -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 6 — View traces in Nexus</h2>
      <p class="text-gray-400 mb-4">
        Run your pipeline and navigate to
        <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>.
        Each query or agent run appears as a trace. The span waterfall shows retrieval, LLM, and
        tool calls in sequence — with latency and token counts at a glance.
      </p>
      <a href="/demo" class="inline-block text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-800 rounded-lg px-4 py-2 hover:bg-indigo-950 transition-colors">
        View demo with sample RAG traces &#x2192;
      </a>
    </section>

    <!-- Links -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">More resources</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a></li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a></li>
        <li><a href="/docs/anthropic-sdk" class="text-indigo-400 hover:text-indigo-300">Anthropic SDK integration guide</a></li>
        <li><a href="/docs/crewai" class="text-indigo-400 hover:text-indigo-300">CrewAI integration guide</a></li>
        <li><a href="/blog/autonomous-agent-observability" class="text-indigo-400 hover:text-indigo-300">Blog: Autonomous agent observability</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your LlamaIndex pipelines</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed. Callback handler setup in under 5 minutes.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start free &#x2192;
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View demo
        </a>
      </div>
    </section>
  </div>

  ${footer()}
</body>
</html>`
}

export function docsGoogleADKPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to add observability to a Google ADK agent with Nexus',
    description: 'Instrument your Google Agent Development Kit agents with Nexus to capture traces, spans, tool calls, and LLM interactions.',
    step: [
      { '@type': 'HowToStep', name: 'Install Nexus', text: 'Run: pip install keylightdigital-nexus google-adk' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key.' },
      { '@type': 'HowToStep', name: 'Wrap agent runs with traces', text: 'Create a Nexus trace before running your ADK agent.' },
      { '@type': 'HowToStep', name: 'Trace tool calls', text: 'Add spans for individual tool calls within the agent run.' },
      { '@type': 'HowToStep', name: 'View traces in dashboard', text: 'Open your Nexus dashboard to see waterfall views of every agent run.' },
    ],
  })

  const installCode = codeBlock('pip install keylightdigital-nexus google-adk', 'bash')
  const apikeyCode = codeBlock('export NEXUS_API_KEY="nxs_your_api_key_here"', 'bash')
  const setupCode = codeBlock(
    `import os
from nexus_client import NexusClient

nexus = NexusClient(
    api_key=os.environ["NEXUS_API_KEY"],
    agent_id="google-adk-agent",
)`,
    'python',
  )
  const basicCode = codeBlock(
    `import asyncio
import os
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from nexus_client import NexusClient

nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="research-agent")

agent = Agent(
    name="research_agent",
    model="gemini-2.0-flash-exp",
    instruction="You are a helpful research assistant.",
)

async def run_agent(user_query: str) -> str:
    trace = nexus.start_trace(
        name="adk: " + user_query[:60],
        metadata={"model": "gemini-2.0-flash-exp"},
    )
    try:
        session_service = InMemorySessionService()
        runner = Runner(agent=agent, app_name="app", session_service=session_service)
        session = session_service.create_session(app_name="app", user_id="u1")
        from google.genai import types
        content = types.Content(role="user", parts=[types.Part(text=user_query)])
        final_response = ""
        async for event in runner.run_async(
            user_id="u1", session_id=session.id, new_message=content
        ):
            if event.is_final_response() and event.content:
                for part in event.content.parts:
                    if part.text:
                        final_response += part.text
        trace.end(status="success")
        return final_response
    except Exception as e:
        trace.end(status="error")
        raise`,
    'python',
  )
  const toolCode = codeBlock(
    `async def run_with_tool_tracing(query: str) -> str:
    trace = nexus.start_trace(name="adk-tools: " + query[:60])
    try:
        session_service = InMemorySessionService()
        runner = Runner(agent=agent, app_name="app", session_service=session_service)
        session = session_service.create_session(app_name="app", user_id="u1")
        from google.genai import types
        content = types.Content(role="user", parts=[types.Part(text=query)])
        final_response = ""
        async for event in runner.run_async(
            user_id="u1", session_id=session.id, new_message=content
        ):
            # Capture tool call events from the ADK event stream
            if hasattr(event, "tool_call") and event.tool_call:
                span = trace.add_span(
                    name="tool:" + event.tool_call.name,
                    input=dict(event.tool_call.args),
                )
                span.end(status="ok")
            if event.is_final_response() and event.content:
                for part in event.content.parts:
                    if part.text:
                        final_response += part.text
        trace.end(status="success")
        return final_response
    except Exception as e:
        trace.end(status="error")
        raise`,
    'python',
  )
  const multiAgentCode = codeBlock(
    `async def run_multi_agent_pipeline(task: str) -> str:
    trace = nexus.start_trace(
        name="pipeline: " + task[:60],
        metadata={"pipeline": "research-and-summarize"},
    )
    try:
        r_span = trace.add_span(name="sub-agent:research", input={"task": task})
        research_result = await run_research_agent(task)
        r_span.end(status="ok", output={"length": len(research_result)})

        s_span = trace.add_span(
            name="sub-agent:summarize",
            input={"content_length": len(research_result)},
        )
        summary = await run_summary_agent(research_result)
        s_span.end(status="ok", output={"length": len(summary)})

        trace.end(status="success")
        return summary
    except Exception as e:
        trace.end(status="error")
        raise`,
    'python',
  )

  return `${guideHead(
    'Google ADK Integration — Nexus AI Agent Observability',
    'Add observability to your Google Agent Development Kit (ADK) agents with Nexus. Trace agent runs, tool calls, and LLM interactions. Setup in 5 minutes.',
    'https://nexus.keylightdigital.dev/docs/google-adk',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar}
  <div class="max-w-3xl mx-auto px-4 py-12">

    <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
      <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
      <span>/</span>
      <span class="text-gray-300">Google ADK</span>
    </nav>

    <header class="mb-10">
      <h1 class="text-3xl font-bold text-white mb-4">Google ADK Integration</h1>
      <p class="text-gray-400 leading-relaxed text-lg">
        Add Nexus observability to your Google Agent Development Kit agents.
        Capture full trace waterfalls, tool call spans, and LLM interactions — setup in under 5 minutes.
      </p>
    </header>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 text-sm font-bold mr-2">1</span>
        Install
      </h2>
      ${installCode}
      <p class="text-gray-400 text-sm mt-3">Requires Python 3.9+.</p>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 text-sm font-bold mr-2">2</span>
        Create an API Key
      </h2>
      <p class="text-gray-400 mb-4">
        Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a> and create a new API key.
      </p>
      ${apikeyCode}
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 text-sm font-bold mr-2">3</span>
        Initialize the Client
      </h2>
      ${setupCode}
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 text-sm font-bold mr-2">4</span>
        Trace Agent Runs
      </h2>
      <p class="text-gray-400 mb-4">
        Wrap your ADK <code class="bg-gray-800 px-1 rounded text-indigo-300">Runner.run_async()</code> call with a Nexus trace. One trace = one complete agent invocation.
      </p>
      ${basicCode}
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 text-sm font-bold mr-2">5</span>
        Trace Tool Calls
      </h2>
      <p class="text-gray-400 mb-4">
        Intercept ADK events in the run loop to capture individual tool call spans:
      </p>
      ${toolCode}
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-indigo-300 text-sm font-bold mr-2">6</span>
        Multi-Agent Pipelines
      </h2>
      <p class="text-gray-400 mb-4">
        For pipelines orchestrating multiple ADK agents, use a parent trace with child spans per sub-agent:
      </p>
      ${multiAgentCode}
    </section>

    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-2">View your traces</h2>
      <p class="text-gray-400 text-sm mb-4">
        Open <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a> to see waterfall views of every run.
      </p>
      <a href="/demo" class="text-sm text-indigo-400 hover:text-indigo-300">See a demo trace &#x2192;</a>
    </section>

    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">More resources</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API Reference</a></li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a></li>
        <li><a href="/docs/crewai" class="text-indigo-400 hover:text-indigo-300">CrewAI integration guide</a></li>
        <li><a href="/docs/autogen" class="text-indigo-400 hover:text-indigo-300">AutoGen integration guide</a></li>
        <li><a href="/blog/ai-agent-cost-guide" class="text-indigo-400 hover:text-indigo-300">Blog: AI agent cost guide</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a></li>
      </ul>
    </section>

    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your Google ADK agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed. Setup in under 5 minutes.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start free &#x2192;
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View demo
        </a>
      </div>
    </section>
  </div>

  ${footer()}
</body>
</html>`
}

export function docsPythonQuickstartPage(): string {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Python AI Agent Tracing with Nexus — Quickstart Guide',
    description: 'How to monitor Python AI agents using the Nexus SDK. Install, instrument, and view traces in under 5 minutes.',
    step: [
      { '@type': 'HowToStep', name: 'Install the SDK', text: 'Run: pip install keylightdigital-nexus' },
      { '@type': 'HowToStep', name: 'Create an API key', text: 'Go to /dashboard/keys and create a new API key. Set it as NEXUS_API_KEY.' },
      { '@type': 'HowToStep', name: 'Create a trace', text: 'Initialize NexusClient and call start_trace() before your agent runs.' },
      { '@type': 'HowToStep', name: 'Add spans', text: 'Call add_span() for each sub-step: LLM calls, tool uses, data fetches.' },
      { '@type': 'HowToStep', name: 'Finish the trace', text: 'Call end() with status="success" or "error" when the agent completes.' },
    ],
  })

  const installCode = 'pip install keylightdigital-nexus'

  const basicCode = [
    'import os',
    'from nexus_client import NexusClient',
    '',
    'nexus = NexusClient(',
    '    api_key=os.environ["NEXUS_API_KEY"],',
    '    base_url="https://nexus.keylightdigital.dev",',
    '    agent_id="my-python-agent",',
    ')',
    '',
    '# Start a trace for this agent run',
    'trace = nexus.start_trace(name="Summarize document")',
    '',
    '# Add a span for each step',
    'span = trace.add_span(',
    '    name="fetch_document",',
    '    input={"url": "https://example.com/doc.pdf"},',
    ')',
    '# ... do work ...',
    'span.end(output={"chars": 4200}, status="ok")',
    '',
    'llm_span = trace.add_span(',
    '    name="llm_summarize",',
    '    input={"model": "gpt-4o", "prompt_tokens": 2100},',
    ')',
    '# ... call LLM ...',
    'llm_span.end(output={"summary": "...", "completion_tokens": 420}, status="ok")',
    '',
    '# Finish the trace',
    'trace.end(status="success")',
  ].join('\n')

  const errorCode = [
    'trace = nexus.start_trace(name="Process order")',
    'span = trace.add_span(name="validate_payment")',
    '',
    'try:',
    '    result = process_payment(order)',
    '    span.end(output={"result": result}, status="ok")',
    '    trace.end(status="success")',
    'except Exception as e:',
    '    span.end(error=str(e), status="error")',
    '    trace.end(status="error", metadata={"error": str(e)})',
  ].join('\n')

  const asyncCode = [
    'import asyncio',
    'import os',
    'from nexus_client import NexusClient',
    '',
    'nexus = NexusClient(',
    '    api_key=os.environ["NEXUS_API_KEY"],',
    '    base_url="https://nexus.keylightdigital.dev",',
    '    agent_id="async-agent",',
    ')',
    '',
    'async def run_agent(query: str) -> str:',
    '    trace = nexus.start_trace(name="async_query", metadata={"query": query})',
    '    span = trace.add_span(name="llm_call", input={"query": query})',
    '    try:',
    '        response = await call_llm_async(query)',
    '        span.end(output={"response": response}, status="ok")',
    '        trace.end(status="success")',
    '        return response',
    '    except Exception as e:',
    '        span.end(error=str(e), status="error")',
    '        trace.end(status="error")',
    '        raise',
    '',
    'asyncio.run(run_agent("What is 2 + 2?"))',
  ].join('\n')

  const metadataCode = [
    'trace = nexus.start_trace(',
    '    name="research_task",',
    '    metadata={',
    '        "model": "claude-3-5-sonnet",',
    '        "user_id": "usr_123",',
    '        "session_id": "ses_abc",',
    '        "environment": "production",',
    '    },',
    ')',
    '',
    'span = trace.add_span(',
    '    name="web_search",',
    '    input={"query": "latest AI news", "max_results": 5},',
    ')',
    'results = search_web("latest AI news")',
    'span.end(',
    '    output={"count": len(results), "sources": [r["url"] for r in results]},',
    '    status="ok",',
    ')',
  ].join('\n')

  return `${guideHead(
    'Python AI Agent Tracing with Nexus \u2014 Quickstart Guide',
    'Monitor Python AI agents with Nexus. Install the SDK, add traces and spans, and view waterfall dashboards in under 5 minutes. Works with any Python agent.',
    'https://nexus.keylightdigital.dev/docs/python-quickstart',
    jsonLd,
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <p class="text-sm text-gray-500 mb-6">
      <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Docs</a>
      <span class="mx-2">\u203a</span>
      <span class="text-gray-400">Python Quickstart</span>
    </p>

    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Quickstart Guide</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Python Quickstart</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Instrument any Python AI agent with Nexus in under 5 minutes. Works with LangChain, CrewAI,
        Pydantic AI, AutoGen, raw API calls \u2014 any pattern.
      </p>
    </div>

    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">Before you start</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>\u2713 Python 3.8 or higher</li>
        <li>\u2713 A free Nexus account \u2014 <a href="/register" class="text-indigo-400 hover:text-indigo-300">sign up here</a></li>
        <li>\u2713 An API key from <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a></li>
      </ul>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 1 \u2014 Install the SDK</h2>
      ${codeBlock(installCode, 'bash')}
      <p class="text-sm text-gray-500 mt-2">Requires only Python stdlib. No heavy dependencies. Python 3.8+ compatible.</p>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 2 \u2014 Set your API key</h2>
      <p class="text-gray-400 mb-4">
        Create an API key at <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a>,
        then set it as an environment variable:
      </p>
      ${codeBlock('export NEXUS_API_KEY="nxs_your_api_key_here"', 'bash')}
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 3 \u2014 Create your first trace</h2>
      <p class="text-gray-400 mb-4">
        Wrap your agent run with a trace, and add a span for each step \u2014 LLM calls, tool uses, API fetches:
      </p>
      ${codeBlock(basicCode, 'python')}
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 4 \u2014 Handle errors</h2>
      <p class="text-gray-400 mb-4">
        Wrap your logic in try/except and set <code class="text-indigo-300">status="error"</code> on failure.
        Error traces trigger email alerts for Pro users.
      </p>
      ${codeBlock(errorCode, 'python')}
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 5 \u2014 Async support</h2>
      <p class="text-gray-400 mb-4">
        The SDK is fully compatible with async/await. SDK calls are synchronous by default \u2014
        for non-blocking async use, wrap with <code class="text-indigo-300">asyncio.to_thread()</code>:
      </p>
      ${codeBlock(asyncCode, 'python')}
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-4">Step 6 \u2014 Add metadata for filtering</h2>
      <p class="text-gray-400 mb-4">
        Attach arbitrary metadata to traces and spans to filter and debug in the dashboard:
      </p>
      ${codeBlock(metadataCode, 'python')}
    </section>

    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-2">View your traces</h2>
      <p class="text-gray-400 text-sm mb-4">
        Open <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>
        to see a waterfall view of every run \u2014 spans, durations, inputs, and outputs.
      </p>
      <a href="/demo" class="text-sm text-indigo-400 hover:text-indigo-300">See a demo trace &#x2192;</a>
    </section>

    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">Framework-specific guides</h2>
      <p class="text-gray-400 text-sm mb-4">Using a specific Python framework? These guides show integration patterns tailored to each:</p>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a></li>
        <li><a href="/docs/crewai" class="text-indigo-400 hover:text-indigo-300">CrewAI integration guide</a></li>
        <li><a href="/docs/autogen" class="text-indigo-400 hover:text-indigo-300">AutoGen (AG2) integration guide</a></li>
        <li><a href="/docs/pydantic-ai" class="text-indigo-400 hover:text-indigo-300">Pydantic AI integration guide</a></li>
        <li><a href="/docs/dspy" class="text-indigo-400 hover:text-indigo-300">DSPy integration guide</a></li>
        <li><a href="/docs/llamaindex" class="text-indigo-400 hover:text-indigo-300">LlamaIndex integration guide</a></li>
        <li><a href="/docs/google-adk" class="text-indigo-400 hover:text-indigo-300">Google ADK integration guide</a></li>
      </ul>
    </section>

    <section class="bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Start monitoring your Python agents</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        Free plan: 1,000 traces/month. No credit card needed. Setup in under 5 minutes.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start free &#x2192;
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View demo
        </a>
      </div>
    </section>
  </div>

  ${footer()}
</body>
</html>`
}
