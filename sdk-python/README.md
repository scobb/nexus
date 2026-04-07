# keylightdigital-nexus

Python SDK for [Nexus](https://nexus.keylightdigital.dev) — simple, affordable AI agent observability.  
*The Plausible of AI agents. $9/month. No self-hosting.*

## Install

```bash
pip install keylightdigital-nexus
```

No dependencies beyond the Python standard library.

## Quickstart

```python
from nexus_agent import NexusClient

client = NexusClient(api_key="nxs_...", agent_id="my-agent")

trace = client.start_trace("process-invoice")
span = trace.add_span("call-llm", input={"prompt": "..."}, output={"text": "..."})
trace.end("success")
```

Get your API key at **[nexus.keylightdigital.dev](https://nexus.keylightdigital.dev)**.

## API

### `NexusClient(api_key, agent_id, base_url?)`

| Parameter  | Type  | Description |
|------------|-------|-------------|
| `api_key`  | `str` | API key from the Nexus dashboard (`nxs_…`) |
| `agent_id` | `str` | Human-readable agent name (groups traces in the dashboard) |
| `base_url` | `str` | Override API endpoint (default: `https://nexus.keylightdigital.dev`) |

### `client.start_trace(name, metadata?) → Trace`

Creates a new trace with status `running`. Call `trace.end()` when your agent finishes.

### `trace.add_span(name, input?, output?, error?) → Span`

Records a unit of work. Timing is captured automatically at call time.

### `trace.end(status)`

Finalizes the trace. `status` must be one of: `"success"`, `"error"`, `"timeout"`.

## Error handling

All network errors are caught internally and logged via Python's `logging` module.  
Methods never raise — your agent keeps running even if Nexus is unreachable.

## Python version support

Python 3.8 and above. No third-party dependencies.

## License

MIT — see [LICENSE](LICENSE).
