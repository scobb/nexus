function guideHead(title: string, description: string, canonical: string): string {
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
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Cloudflare Web Analytics -->
  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "REPLACE_WITH_CF_ANALYTICS_TOKEN"}'></script>
</head>`
}

const navBar = `
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="flex items-center gap-4">
        <a href="/docs" class="text-sm text-white font-medium">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
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
  return `${guideHead(
    'Monitor Claude Agents with Nexus — Anthropic SDK Integration',
    'How to monitor AI agents built with Anthropic\'s Claude API using Nexus. TypeScript and Python code examples, tool use tracing, and the meta-narrative: Nexus was built by Claude.',
    'https://nexus.keylightdigital.dev/docs/anthropic-sdk',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div class="max-w-4xl mx-auto px-4 py-12">

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
  return `${guideHead(
    'CrewAI Observability with Nexus — Monitor Multi-Agent Crews',
    'How to monitor your CrewAI multi-agent crews with Nexus. Python code examples showing how to track individual agent performance and inter-agent coordination.',
    'https://nexus.keylightdigital.dev/docs/crewai',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div class="max-w-4xl mx-auto px-4 py-12">

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
  return `${guideHead(
    'LangChain Observability with Nexus — Monitor LangChain Agents',
    'How to monitor and observe your LangChain agents with Nexus. TypeScript and Python code examples, step-by-step integration guide, and trace viewer walkthrough.',
    'https://nexus.keylightdigital.dev/docs/langchain',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div class="max-w-4xl mx-auto px-4 py-12">

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
