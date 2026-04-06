/**
 * @keylightdigital/nexus
 * TypeScript SDK for Nexus agent observability
 */

export type TraceStatus = 'running' | 'success' | 'error' | 'timeout'

export interface NexusClientOptions {
  /** API key generated in the Nexus dashboard */
  apiKey: string
  /** Base URL of the Nexus API (default: https://nexus.keylightdigital.dev) */
  baseUrl?: string
  /** Agent identifier — groups traces under a single agent in the dashboard */
  agentId: string
}

export interface TraceOptions {
  /** Human-readable name for this trace (e.g. "process-invoice") */
  name: string
  /** Arbitrary metadata attached to the trace */
  metadata?: Record<string, unknown>
}

export interface SpanOptions {
  /** Human-readable name for this span (e.g. "call-gpt-4o") */
  name: string
  /** Input data for this span (any JSON-serializable value) */
  input?: unknown
  /** Output data from this span (any JSON-serializable value) */
  output?: unknown
  /** Error message if this span failed */
  error?: string
}

export class Span {
  readonly span_id: string
  readonly name: string
  readonly startedAt: Date

  constructor(spanId: string, name: string, startedAt: Date) {
    this.span_id = spanId
    this.name = name
    this.startedAt = startedAt
  }
}

export class Trace {
  readonly trace_id: string
  private readonly baseUrl: string
  private readonly apiKey: string

  constructor(traceId: string, baseUrl: string, apiKey: string) {
    this.trace_id = traceId
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  /**
   * Add a span to this trace. Timing is auto-captured at the moment of the call.
   */
  async addSpan(options: SpanOptions): Promise<Span> {
    const startedAt = new Date()
    const endedAt = new Date()

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/traces/${this.trace_id}/spans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          name: options.name,
          status: options.error ? 'error' : 'ok',
          started_at: startedAt.toISOString(),
          ended_at: endedAt.toISOString(),
          input: options.input,
          output: options.output,
          error: options.error,
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error(`[Nexus] Failed to add span "${options.name}": ${res.status} ${text}`)
        return new Span('unknown', options.name, startedAt)
      }

      const data = (await res.json()) as { span_id: string }
      return new Span(data.span_id, options.name, startedAt)
    } catch (err) {
      console.error(`[Nexus] Network error adding span "${options.name}":`, err)
      return new Span('unknown', options.name, startedAt)
    }
  }

  /**
   * Finalize the trace with a terminal status.
   */
  async end(options: { status: TraceStatus }): Promise<void> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/traces/${this.trace_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          status: options.status,
          ended_at: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error(`[Nexus] Failed to end trace: ${res.status} ${text}`)
      }
    } catch (err) {
      console.error('[Nexus] Network error ending trace:', err)
    }
  }
}

export class NexusClient {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly agentId: string

  constructor(options: NexusClientOptions) {
    this.apiKey = options.apiKey
    this.baseUrl = (options.baseUrl ?? 'https://nexus.keylightdigital.dev').replace(/\/$/, '')
    this.agentId = options.agentId
  }

  /**
   * Start a new trace. The trace is created immediately with status 'running'.
   * Call trace.end({status}) when your agent finishes.
   */
  async startTrace(options: TraceOptions): Promise<Trace> {
    const startedAt = new Date().toISOString()

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/traces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          agent_id: this.agentId,
          name: options.name,
          status: 'running',
          started_at: startedAt,
          metadata: options.metadata,
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error(`[Nexus] Failed to start trace "${options.name}": ${res.status} ${text}`)
        return new Trace('unknown', this.baseUrl, this.apiKey)
      }

      const data = (await res.json()) as { trace_id: string }
      return new Trace(data.trace_id, this.baseUrl, this.apiKey)
    } catch (err) {
      console.error(`[Nexus] Network error starting trace "${options.name}":`, err)
      return new Trace('unknown', this.baseUrl, this.apiKey)
    }
  }
}
