"""Unit tests for NexusClient and Trace request formatting."""

import json
import unittest
from io import BytesIO
from unittest.mock import MagicMock, patch

from nexus_agent import NexusClient, Span, Trace
from nexus_agent.client import DEFAULT_BASE_URL


class FakeHTTPResponse:
    """Minimal mock for urllib.request.urlopen context manager."""

    def __init__(self, body: bytes) -> None:
        self._body = body

    def read(self) -> bytes:
        return self._body

    def __enter__(self):
        return self

    def __exit__(self, *args):
        pass


def _fake_response(data: dict) -> FakeHTTPResponse:
    return FakeHTTPResponse(json.dumps(data).encode("utf-8"))


class TestNexusClientInit(unittest.TestCase):
    def test_default_base_url(self):
        client = NexusClient(api_key="nxs_test", agent_id="my-agent")
        self.assertEqual(client._base_url, DEFAULT_BASE_URL)

    def test_custom_base_url_trailing_slash_stripped(self):
        client = NexusClient(
            api_key="nxs_test",
            agent_id="my-agent",
            base_url="https://custom.example.com/",
        )
        self.assertEqual(client._base_url, "https://custom.example.com")

    def test_stores_api_key_and_agent_id(self):
        client = NexusClient(api_key="nxs_abc", agent_id="bot-1")
        self.assertEqual(client._api_key, "nxs_abc")
        self.assertEqual(client._agent_id, "bot-1")

    def test_repr(self):
        client = NexusClient(api_key="nxs_test", agent_id="my-agent")
        self.assertIn("my-agent", repr(client))


class TestStartTrace(unittest.TestCase):
    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_sends_correct_fields(self, mock_urlopen):
        mock_urlopen.return_value = _fake_response({"trace_id": "tid-123"})

        client = NexusClient(
            api_key="nxs_key",
            agent_id="test-agent",
            base_url="https://api.test",
        )
        trace = client.start_trace("run-pipeline", metadata={"env": "prod"})

        self.assertIsInstance(trace, Trace)
        self.assertEqual(trace.trace_id, "tid-123")

        # Inspect the request that was built
        call_args = mock_urlopen.call_args
        req = call_args[0][0]
        self.assertEqual(req.full_url, "https://api.test/api/v1/traces")
        self.assertEqual(req.get_method(), "POST")
        self.assertEqual(req.get_header("Authorization"), "Bearer nxs_key")
        self.assertEqual(req.get_header("Content-type"), "application/json")

        body = json.loads(req.data.decode("utf-8"))
        self.assertEqual(body["agent_id"], "test-agent")
        self.assertEqual(body["name"], "run-pipeline")
        self.assertEqual(body["status"], "running")
        self.assertEqual(body["metadata"], {"env": "prod"})
        self.assertIn("started_at", body)

    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_network_error_returns_fallback_trace(self, mock_urlopen):
        mock_urlopen.side_effect = OSError("connection refused")

        client = NexusClient(api_key="nxs_key", agent_id="agent")
        trace = client.start_trace("will-fail")

        self.assertIsInstance(trace, Trace)
        self.assertEqual(trace.trace_id, "unknown")  # fallback, no raise

    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_metadata_omitted_when_none(self, mock_urlopen):
        mock_urlopen.return_value = _fake_response({"trace_id": "tid-456"})

        client = NexusClient(api_key="nxs_key", agent_id="agent")
        client.start_trace("no-meta")

        req = mock_urlopen.call_args[0][0]
        body = json.loads(req.data.decode("utf-8"))
        self.assertNotIn("metadata", body)


class TestAddSpan(unittest.TestCase):
    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_sends_correct_fields(self, mock_urlopen):
        mock_urlopen.return_value = _fake_response({"span_id": "sid-789"})

        trace = Trace("tid-001", "https://api.test", "nxs_key")
        span = trace.add_span(
            "call-llm",
            input={"prompt": "hello"},
            output={"text": "world"},
        )

        self.assertIsInstance(span, Span)
        self.assertEqual(span.span_id, "sid-789")
        self.assertEqual(span.name, "call-llm")

        req = mock_urlopen.call_args[0][0]
        self.assertEqual(req.full_url, "https://api.test/api/v1/traces/tid-001/spans")
        self.assertEqual(req.get_method(), "POST")

        body = json.loads(req.data.decode("utf-8"))
        self.assertEqual(body["name"], "call-llm")
        self.assertEqual(body["status"], "ok")
        self.assertEqual(body["input"], {"prompt": "hello"})
        self.assertEqual(body["output"], {"text": "world"})
        self.assertIn("started_at", body)
        self.assertIn("ended_at", body)

    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_error_sets_status_error(self, mock_urlopen):
        mock_urlopen.return_value = _fake_response({"span_id": "sid-err"})

        trace = Trace("tid-001", "https://api.test", "nxs_key")
        span = trace.add_span("fail-step", error="LLM timeout")

        req = mock_urlopen.call_args[0][0]
        body = json.loads(req.data.decode("utf-8"))
        self.assertEqual(body["status"], "error")
        self.assertEqual(body["error"], "LLM timeout")

    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_network_error_returns_fallback_span(self, mock_urlopen):
        mock_urlopen.side_effect = OSError("network down")

        trace = Trace("tid-001", "https://api.test", "nxs_key")
        span = trace.add_span("will-fail")

        self.assertIsInstance(span, Span)
        self.assertEqual(span.span_id, "unknown")  # fallback, no raise


class TestTraceEnd(unittest.TestCase):
    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_sends_patch_with_status(self, mock_urlopen):
        mock_urlopen.return_value = _fake_response({})

        trace = Trace("tid-001", "https://api.test", "nxs_key")
        trace.end("success")

        req = mock_urlopen.call_args[0][0]
        self.assertEqual(req.full_url, "https://api.test/api/v1/traces/tid-001")
        self.assertEqual(req.get_method(), "PATCH")

        body = json.loads(req.data.decode("utf-8"))
        self.assertEqual(body["status"], "success")
        self.assertIn("ended_at", body)

    @patch("nexus_agent.client.urllib.request.urlopen")
    def test_network_error_does_not_raise(self, mock_urlopen):
        mock_urlopen.side_effect = OSError("network down")

        trace = Trace("tid-001", "https://api.test", "nxs_key")
        # Must not raise
        trace.end("error")


if __name__ == "__main__":
    unittest.main()
