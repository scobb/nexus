# @keylightdigital/nexus

TypeScript SDK for [Nexus](https://nexus.keylightdigital.dev) — simple, affordable agent observability for indie developers.

## Installation

```bash
npm install @keylightdigital/nexus
```

## Quickstart

```typescript
import { NexusClient } from '@keylightdigital/nexus'

const nexus = new NexusClient({ apiKey: 'nxs_...', agentId: 'my-assistant' })

const trace = await nexus.startTrace({ name: 'process-invoice' })

await trace.addSpan({ name: 'extract-data', output: { invoice_id: '123' } })
await trace.addSpan({ name: 'call-gpt-4o', input: prompt, output: result })

await trace.end({ status: 'success' })
```

## Configuration

| Option | Type | Required | Default |
|--------|------|----------|---------|
| `apiKey` | `string` | Yes | — |
| `agentId` | `string` | Yes | — |
| `baseUrl` | `string` | No | `https://nexus.keylightdigital.dev` |

## API

### `NexusClient`

```typescript
const nexus = new NexusClient({ apiKey, agentId, baseUrl? })
await nexus.startTrace({ name, metadata? }) → Trace
```

### `Trace`

```typescript
trace.trace_id                              // UUID assigned by the server
await trace.addSpan({ name, input?, output?, error? }) → Span
await trace.end({ status })                 // status: 'success' | 'error' | 'timeout'
```

### `Span`

```typescript
span.span_id   // UUID assigned by the server
span.name      // span name
span.startedAt // Date captured at time of addSpan() call
```

## Error Handling

All SDK methods are non-throwing. Network errors and API errors are logged to `console.error` with a `[Nexus]` prefix. Your agent continues running even if Nexus is unavailable.

## Dashboard

Create API keys and view your traces at [nexus.keylightdigital.dev](https://nexus.keylightdigital.dev).
