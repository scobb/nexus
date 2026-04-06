"""
NexusClient, Trace, and Span — core SDK classes.
Uses only Python stdlib (urllib.request) for minimal install footprint.
"""

import json
import logging
import urllib.error
import urllib.request
from datetime import datetime, timezone
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

DEFAULT_BASE_URL = "https://nexus.keylightdigital.dev"

# Literal type alias (kept as str for Python 3.8 compat)
TraceStatus = str  # 'running' | 'success' | 'error' | 'timeout'


def _request(
    method: str,
    url: str,
    payload: Dict[str, Any],
    api_key: str,
    timeout: int = 5,
) -> Optional[Dict[str, Any]]:
    """Make a JSON HTTP request using only stdlib. Raises RuntimeError on failure."""
    body = json.dumps(payload, default=str).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + api_key,
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body_text = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError("HTTP {}: {}".format(exc.code, body_text)) from exc
    except Exception as exc:
        raise RuntimeError(str(exc)) from exc


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Span:
    """Represents a single unit of work within a trace."""

    def __init__(self, span_id: str, name: str, started_at: datetime) -> None:
        self.span_id = span_id
        self.name = name
        self.started_at = started_at

    def __repr__(self) -> str:
        return "Span(span_id={!r}, name={!r})".format(self.span_id, self.name)


class Trace:
    """A running trace. Call add_span() to record work, end() to finalize."""

    def __init__(self, trace_id: str, base_url: str, api_key: str) -> None:
        self.trace_id = trace_id
        self._base_url = base_url
        self._api_key = api_key

    def add_span(
        self,
        name: str,
        input: Optional[Any] = None,  # noqa: A002
        output: Optional[Any] = None,
        error: Optional[str] = None,
    ) -> Span:
        """
        Record a span in this trace. Timing is captured at the moment of the call.
        Network errors are logged as warnings and never raised.
        """
        started_at = _utcnow()
        ended_at = _utcnow()

        payload: Dict[str, Any] = {
            "name": name,
            "status": "error" if error else "ok",
            "started_at": started_at.isoformat(),
            "ended_at": ended_at.isoformat(),
        }
        if input is not None:
            payload["input"] = input
        if output is not None:
            payload["output"] = output
        if error is not None:
            payload["error"] = error

        url = "{}/api/v1/traces/{}/spans".format(self._base_url, self.trace_id)
        try:
            data = _request("POST", url, payload, self._api_key)
            span_id = (data or {}).get("span_id", "unknown")
            return Span(span_id, name, started_at)
        except Exception as exc:
            logger.warning("[Nexus] Failed to add span %r: %s", name, exc)
            return Span("unknown", name, started_at)

    def end(self, status: TraceStatus = "success") -> None:
        """
        Finalize the trace with a terminal status.
        Network errors are logged as warnings and never raised.
        """
        url = "{}/api/v1/traces/{}".format(self._base_url, self.trace_id)
        payload: Dict[str, Any] = {
            "status": status,
            "ended_at": _utcnow().isoformat(),
        }
        try:
            _request("PATCH", url, payload, self._api_key)
        except Exception as exc:
            logger.warning("[Nexus] Failed to end trace %r: %s", self.trace_id, exc)

    def __repr__(self) -> str:
        return "Trace(trace_id={!r})".format(self.trace_id)


class NexusClient:
    """
    Main entry point for the Nexus Python SDK.

    Usage::

        from nexus_agent import NexusClient

        client = NexusClient(
            api_key="nxs_...",
            agent_id="my-agent",
        )
        trace = client.start_trace("process-invoice")
        span = trace.add_span("call-llm", input=prompt, output=response)
        trace.end("success")
    """

    def __init__(
        self,
        api_key: str,
        agent_id: str,
        base_url: str = DEFAULT_BASE_URL,
    ) -> None:
        """
        :param api_key:  API key from the Nexus dashboard (starts with ``nxs_``).
        :param agent_id: Human-readable agent identifier (e.g. ``"invoice-bot"``).
        :param base_url: Override the Nexus API base URL (default: production).
        """
        self._api_key = api_key
        self._agent_id = agent_id
        self._base_url = base_url.rstrip("/")

    def start_trace(
        self,
        name: str,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Trace:
        """
        Start a new trace with status ``running``.
        Call ``trace.end(status)`` when your agent finishes.
        Network errors are logged as warnings; a fallback Trace is returned.
        """
        url = "{}/api/v1/traces".format(self._base_url)
        payload: Dict[str, Any] = {
            "agent_id": self._agent_id,
            "name": name,
            "status": "running",
            "started_at": _utcnow().isoformat(),
        }
        if metadata is not None:
            payload["metadata"] = metadata

        try:
            data = _request("POST", url, payload, self._api_key)
            trace_id = (data or {}).get("trace_id", "unknown")
            return Trace(trace_id, self._base_url, self._api_key)
        except Exception as exc:
            logger.warning("[Nexus] Failed to start trace %r: %s", name, exc)
            return Trace("unknown", self._base_url, self._api_key)

    def __repr__(self) -> str:
        return "NexusClient(agent_id={!r}, base_url={!r})".format(
            self._agent_id, self._base_url
        )
