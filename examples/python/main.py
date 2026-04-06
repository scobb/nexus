"""
Nexus Python Example — AI Research Agent

Demonstrates how to instrument a multi-step AI agent with Nexus:
  - LLM call span (simulated)
  - Tool use span (web search simulation)
  - Error handling (graceful degradation)

Usage:
  NEXUS_API_KEY=nxs_your_key_here python main.py
"""

import os
import time
import logging
from nexus_agent import NexusClient

logging.basicConfig(level=logging.WARNING)

api_key = os.environ.get("NEXUS_API_KEY")
if not api_key:
    raise SystemExit("Set NEXUS_API_KEY environment variable")

nexus = NexusClient(
    api_key=api_key,
    agent_id="research-agent",
    base_url="https://nexus.keylightdigital.dev",
)

# --- Simulated agent functions ---


def call_llm(prompt: str) -> str:
    """In a real agent, this calls OpenAI / Anthropic / etc."""
    time.sleep(0.08)  # simulate latency
    return (
        f'Research summary for: "{prompt[:40]}..."\n\n'
        "Cloudflare Workers is a serverless platform that runs JavaScript, Python, "
        "and other languages at the edge, close to your users..."
    )


def web_search(query: str) -> list:
    """In a real agent, this calls Brave Search, Serper, Tavily, etc."""
    time.sleep(0.12)
    return [
        {"title": "Cloudflare Workers Docs", "url": "https://developers.cloudflare.com/workers/"},
        {"title": "Getting Started with D1", "url": "https://developers.cloudflare.com/d1/"},
    ]


def format_report(content: str, sources: list) -> str:
    """Format the research output as a markdown report."""
    time.sleep(0.04)
    source_list = "\n".join(f"- [{s['title']}]({s['url']})" for s in sources)
    return f"# Report\n\n{content}\n\n## Sources\n{source_list}"


# --- Main agent run ---


def run_research_agent(topic: str) -> None:
    print(f'Starting research agent for topic: "{topic}"')

    trace = nexus.start_trace(name=f"research: {topic}")

    # Step 1: Web search
    search_results = []
    try:
        search_results = web_search(topic)
        trace.add_span(
            name="web-search",
            input={"query": topic},
            output={"results": search_results, "count": len(search_results)},
        )
        print(f"  [search] Found {len(search_results)} results")
    except Exception as exc:
        trace.add_span(name="web-search", input={"query": topic}, error=str(exc))
        print(f"  [search] Failed ({exc}), continuing with empty results")

    # Step 2: LLM synthesis
    prompt = f"Summarize research on: {topic}\nSources: {', '.join(r['url'] for r in search_results)}"
    try:
        llm_response = call_llm(prompt)
        trace.add_span(
            name="llm-synthesis",
            input={"prompt": prompt, "model": "claude-3-5-sonnet"},
            output={"content": llm_response, "tokens": 142},
        )
        print("  [llm] Synthesis complete")
    except Exception as exc:
        trace.add_span(name="llm-synthesis", input={"prompt": prompt}, error=str(exc))
        trace.end(status="error")
        print(f"  [llm] Failed: {exc}")
        return

    # Step 3: Format report
    report = format_report(llm_response, search_results)
    trace.add_span(
        name="format-report",
        input={"content_length": len(llm_response), "source_count": len(search_results)},
        output={"report_length": len(report)},
    )
    print("  [format] Report formatted")

    trace.end(status="success")
    print("Agent run complete. Check your dashboard at https://nexus.keylightdigital.dev")


if __name__ == "__main__":
    run_research_agent("Cloudflare Workers for AI agents")
