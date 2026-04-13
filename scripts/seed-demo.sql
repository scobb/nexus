-- Nexus demo seed script
-- Populates D1 with realistic demo data for the /demo dashboard.
-- Idempotent: uses INSERT OR IGNORE so re-running is safe.
--
-- Usage (local):   npx wrangler d1 execute nexus-db --local --file=scripts/seed-demo.sql
-- Usage (staging): npx wrangler d1 execute nexus-db-staging --env staging --remote --file=scripts/seed-demo.sql
-- Usage (prod):    npx wrangler d1 execute nexus-db --remote --file=scripts/seed-demo.sql

-- ── Demo User ─────────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO users (id, email, created_at, plan)
VALUES (
  'demo-user-seed-001',
  'demo@nexus.keylightdigital.dev',
  datetime('now', '-30 days'),
  'pro'
);

-- ── Demo Agents ───────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO agents (id, user_id, name, description, created_at) VALUES
  ('demo-agent-001', 'demo-user-seed-001', 'Customer Support Bot',
   'Handles inbound support tickets, drafts empathetic replies, and escalates complex issues to humans.',
   datetime('now', '-28 days')),
  ('demo-agent-002', 'demo-user-seed-001', 'Research Assistant',
   'Deep-dives into topics using web search, paper retrieval, and multi-hop reasoning to produce cited summaries.',
   datetime('now', '-27 days')),
  ('demo-agent-003', 'demo-user-seed-001', 'Code Review Agent',
   'Fetches PR diffs, runs static analysis, flags security issues, and posts GitHub review comments.',
   datetime('now', '-26 days')),
  ('demo-agent-004', 'demo-user-seed-001', 'Data Pipeline Monitor',
   'Watches nightly ETL runs, validates row counts and schemas, and pages on-call when anomalies are detected.',
   datetime('now', '-25 days')),
  ('demo-agent-005', 'demo-user-seed-001', 'Content Generator',
   'Produces blog posts, social copy, and email campaigns from a creative brief using structured multi-step generation.',
   datetime('now', '-24 days'));

-- ── Customer Support Bot — 12 traces (11 success, 1 error) ───────────────────
INSERT OR IGNORE INTO traces (id, agent_id, user_id, name, status, started_at, ended_at) VALUES
  ('demo-tr-cs-001','demo-agent-001','demo-user-seed-001','Handle ticket #5301 (billing discrepancy)','success',datetime('now','-6 days','+2 hours'),datetime('now','-6 days','+2 hours','+2340 milliseconds')),
  ('demo-tr-cs-002','demo-agent-001','demo-user-seed-001','Handle ticket #5298 (password reset)','success',datetime('now','-6 days','+4 hours'),datetime('now','-6 days','+4 hours','+1680 milliseconds')),
  ('demo-tr-cs-003','demo-agent-001','demo-user-seed-001','Handle ticket #5290 (integration setup)','success',datetime('now','-5 days','+1 hour'),datetime('now','-5 days','+1 hour','+3120 milliseconds')),
  ('demo-tr-cs-004','demo-agent-001','demo-user-seed-001','Handle ticket #5283 (refund request)','error',datetime('now','-5 days','+3 hours'),datetime('now','-5 days','+3 hours','+990 milliseconds')),
  ('demo-tr-cs-005','demo-agent-001','demo-user-seed-001','Handle ticket #5271 (upgrade question)','success',datetime('now','-5 days','+6 hours'),datetime('now','-5 days','+6 hours','+1990 milliseconds')),
  ('demo-tr-cs-006','demo-agent-001','demo-user-seed-001','Handle ticket #5265 (account locked)','success',datetime('now','-4 days','+2 hours'),datetime('now','-4 days','+2 hours','+1440 milliseconds')),
  ('demo-tr-cs-007','demo-agent-001','demo-user-seed-001','Handle ticket #5260 (export data)','success',datetime('now','-4 days','+5 hours'),datetime('now','-4 days','+5 hours','+2100 milliseconds')),
  ('demo-tr-cs-008','demo-agent-001','demo-user-seed-001','Handle ticket #5255 (webhook not firing)','success',datetime('now','-3 days','+1 hour'),datetime('now','-3 days','+1 hour','+2780 milliseconds')),
  ('demo-tr-cs-009','demo-agent-001','demo-user-seed-001','Handle ticket #5249 (SSO configuration)','success',datetime('now','-3 days','+4 hours'),datetime('now','-3 days','+4 hours','+3400 milliseconds')),
  ('demo-tr-cs-010','demo-agent-001','demo-user-seed-001','Handle ticket #5238 (data retention policy)','success',datetime('now','-2 days','+2 hours'),datetime('now','-2 days','+2 hours','+1870 milliseconds')),
  ('demo-tr-cs-011','demo-agent-001','demo-user-seed-001','Handle ticket #5230 (API key rotation)','success',datetime('now','-1 day','+3 hours'),datetime('now','-1 day','+3 hours','+2230 milliseconds')),
  ('demo-tr-cs-012','demo-agent-001','demo-user-seed-001','Handle ticket #5221 (custom domain setup)','success',datetime('now','-5 hours'),datetime('now','-5 hours','+2560 milliseconds'));

-- ── Research Assistant — 10 traces (9 success, 1 error) ──────────────────────
INSERT OR IGNORE INTO traces (id, agent_id, user_id, name, status, started_at, ended_at) VALUES
  ('demo-tr-ra-001','demo-agent-002','demo-user-seed-001','Research: "LLM prompt caching cost-benefit analysis"','success',datetime('now','-6 days','+3 hours'),datetime('now','-6 days','+3 hours','+12340 milliseconds')),
  ('demo-tr-ra-002','demo-agent-002','demo-user-seed-001','Research: "OpenTelemetry adoption in AI applications"','success',datetime('now','-6 days','+7 hours'),datetime('now','-6 days','+7 hours','+18900 milliseconds')),
  ('demo-tr-ra-003','demo-agent-002','demo-user-seed-001','Research: "RAG vs fine-tuning for domain knowledge"','success',datetime('now','-5 days','+2 hours'),datetime('now','-5 days','+2 hours','+21400 milliseconds')),
  ('demo-tr-ra-004','demo-agent-002','demo-user-seed-001','Research: "Multi-agent orchestration frameworks comparison"','error',datetime('now','-4 days','+1 hour'),datetime('now','-4 days','+1 hour','+4200 milliseconds')),
  ('demo-tr-ra-005','demo-agent-002','demo-user-seed-001','Research: "Vector database performance benchmarks 2025"','success',datetime('now','-4 days','+5 hours'),datetime('now','-4 days','+5 hours','+16700 milliseconds')),
  ('demo-tr-ra-006','demo-agent-002','demo-user-seed-001','Research: "Agent memory architectures survey"','success',datetime('now','-3 days','+2 hours'),datetime('now','-3 days','+2 hours','+19200 milliseconds')),
  ('demo-tr-ra-007','demo-agent-002','demo-user-seed-001','Research: "Evals for LLM-powered products"','success',datetime('now','-3 days','+6 hours'),datetime('now','-3 days','+6 hours','+14500 milliseconds')),
  ('demo-tr-ra-008','demo-agent-002','demo-user-seed-001','Research: "AI agent safety and guardrails"','success',datetime('now','-2 days','+3 hours'),datetime('now','-2 days','+3 hours','+22100 milliseconds')),
  ('demo-tr-ra-009','demo-agent-002','demo-user-seed-001','Research: "Token streaming latency optimization"','success',datetime('now','-1 day','+2 hours'),datetime('now','-1 day','+2 hours','+17800 milliseconds')),
  ('demo-tr-ra-010','demo-agent-002','demo-user-seed-001','Research: "Reasoning models vs instruction-tuned models"','success',datetime('now','-3 hours'),datetime('now','-3 hours','+20300 milliseconds'));

-- ── Code Review Agent — 11 traces (9 success, 1 error, 1 timeout) ─────────────
INSERT OR IGNORE INTO traces (id, agent_id, user_id, name, status, started_at, ended_at) VALUES
  ('demo-tr-cr-001','demo-agent-003','demo-user-seed-001','Review PR #201 (auth middleware refactor)','success',datetime('now','-6 days','+1 hour'),datetime('now','-6 days','+1 hour','+3900 milliseconds')),
  ('demo-tr-cr-002','demo-agent-003','demo-user-seed-001','Review PR #199 (D1 migration scripts)','timeout',datetime('now','-6 days','+5 hours'),datetime('now','-6 days','+5 hours','+30000 milliseconds')),
  ('demo-tr-cr-003','demo-agent-003','demo-user-seed-001','Review PR #198 (rate limiting logic)','success',datetime('now','-5 days','+3 hours'),datetime('now','-5 days','+3 hours','+7210 milliseconds')),
  ('demo-tr-cr-004','demo-agent-003','demo-user-seed-001','Review PR #196 (Stripe webhook handling)','success',datetime('now','-5 days','+7 hours'),datetime('now','-5 days','+7 hours','+5640 milliseconds')),
  ('demo-tr-cr-005','demo-agent-003','demo-user-seed-001','Review PR #193 (dashboard metrics)','success',datetime('now','-4 days','+3 hours'),datetime('now','-4 days','+3 hours','+4870 milliseconds')),
  ('demo-tr-cr-006','demo-agent-003','demo-user-seed-001','Review PR #191 (OTEL trace ingestion)','success',datetime('now','-4 days','+6 hours'),datetime('now','-4 days','+6 hours','+6120 milliseconds')),
  ('demo-tr-cr-007','demo-agent-003','demo-user-seed-001','Review PR #188 (span waterfall UI)','error',datetime('now','-3 days','+2 hours'),datetime('now','-3 days','+2 hours','+2340 milliseconds')),
  ('demo-tr-cr-008','demo-agent-003','demo-user-seed-001','Review PR #185 (retention job)','success',datetime('now','-3 days','+5 hours'),datetime('now','-3 days','+5 hours','+5890 milliseconds')),
  ('demo-tr-cr-009','demo-agent-003','demo-user-seed-001','Review PR #183 (settings page)','success',datetime('now','-2 days','+1 hour'),datetime('now','-2 days','+1 hour','+4430 milliseconds')),
  ('demo-tr-cr-010','demo-agent-003','demo-user-seed-001','Review PR #180 (demo dashboard)','success',datetime('now','-1 day','+4 hours'),datetime('now','-1 day','+4 hours','+6780 milliseconds')),
  ('demo-tr-cr-011','demo-agent-003','demo-user-seed-001','Review PR #177 (public API docs)','success',datetime('now','-2 hours'),datetime('now','-2 hours','+5210 milliseconds'));

-- ── Data Pipeline Monitor — 10 traces (9 success, 1 error) ───────────────────
INSERT OR IGNORE INTO traces (id, agent_id, user_id, name, status, started_at, ended_at) VALUES
  ('demo-tr-dp-001','demo-agent-004','demo-user-seed-001','ETL run: users_daily_snapshot','success',datetime('now','-6 days','+0 hours'),datetime('now','-6 days','+0 hours','+8200 milliseconds')),
  ('demo-tr-dp-002','demo-agent-004','demo-user-seed-001','ETL run: events_hourly_rollup','success',datetime('now','-5 days','+0 hours'),datetime('now','-5 days','+0 hours','+11400 milliseconds')),
  ('demo-tr-dp-003','demo-agent-004','demo-user-seed-001','ETL run: revenue_attribution','error',datetime('now','-5 days','+12 hours'),datetime('now','-5 days','+12 hours','+3100 milliseconds')),
  ('demo-tr-dp-004','demo-agent-004','demo-user-seed-001','ETL run: churn_prediction_features','success',datetime('now','-4 days','+0 hours'),datetime('now','-4 days','+0 hours','+14700 milliseconds')),
  ('demo-tr-dp-005','demo-agent-004','demo-user-seed-001','ETL run: users_daily_snapshot','success',datetime('now','-4 days','+12 hours'),datetime('now','-4 days','+12 hours','+7900 milliseconds')),
  ('demo-tr-dp-006','demo-agent-004','demo-user-seed-001','ETL run: events_hourly_rollup','success',datetime('now','-3 days','+0 hours'),datetime('now','-3 days','+0 hours','+10200 milliseconds')),
  ('demo-tr-dp-007','demo-agent-004','demo-user-seed-001','ETL run: ml_feature_store_sync','success',datetime('now','-3 days','+12 hours'),datetime('now','-3 days','+12 hours','+18900 milliseconds')),
  ('demo-tr-dp-008','demo-agent-004','demo-user-seed-001','ETL run: users_daily_snapshot','success',datetime('now','-2 days','+0 hours'),datetime('now','-2 days','+0 hours','+7600 milliseconds')),
  ('demo-tr-dp-009','demo-agent-004','demo-user-seed-001','ETL run: events_hourly_rollup','success',datetime('now','-1 day','+0 hours'),datetime('now','-1 day','+0 hours','+9800 milliseconds')),
  ('demo-tr-dp-010','demo-agent-004','demo-user-seed-001','ETL run: users_daily_snapshot','success',datetime('now','-6 hours'),datetime('now','-6 hours','+8100 milliseconds'));

-- ── Content Generator — 10 traces (9 success, 1 error) ───────────────────────
INSERT OR IGNORE INTO traces (id, agent_id, user_id, name, status, started_at, ended_at) VALUES
  ('demo-tr-cg-001','demo-agent-005','demo-user-seed-001','Write blog post: "AI agent observability in 2025"','success',datetime('now','-6 days','+6 hours'),datetime('now','-6 days','+6 hours','+34500 milliseconds')),
  ('demo-tr-cg-002','demo-agent-005','demo-user-seed-001','Draft email campaign: Pro plan launch','success',datetime('now','-6 days','+9 hours'),datetime('now','-6 days','+9 hours','+22100 milliseconds')),
  ('demo-tr-cg-003','demo-agent-005','demo-user-seed-001','Write comparison page: Nexus vs Langfuse','success',datetime('now','-5 days','+4 hours'),datetime('now','-5 days','+4 hours','+41200 milliseconds')),
  ('demo-tr-cg-004','demo-agent-005','demo-user-seed-001','Generate social posts: SDK launch thread','error',datetime('now','-4 days','+3 hours'),datetime('now','-4 days','+3 hours','+3400 milliseconds')),
  ('demo-tr-cg-005','demo-agent-005','demo-user-seed-001','Write docs page: Python SDK quickstart','success',datetime('now','-4 days','+7 hours'),datetime('now','-4 days','+7 hours','+28700 milliseconds')),
  ('demo-tr-cg-006','demo-agent-005','demo-user-seed-001','Draft landing page copy: A/B variant B','success',datetime('now','-3 days','+3 hours'),datetime('now','-3 days','+3 hours','+19400 milliseconds')),
  ('demo-tr-cg-007','demo-agent-005','demo-user-seed-001','Write changelog entry: v0.9 release','success',datetime('now','-3 days','+7 hours'),datetime('now','-3 days','+7 hours','+15600 milliseconds')),
  ('demo-tr-cg-008','demo-agent-005','demo-user-seed-001','Generate case study: YC startup using Nexus','success',datetime('now','-2 days','+5 hours'),datetime('now','-2 days','+5 hours','+38900 milliseconds')),
  ('demo-tr-cg-009','demo-agent-005','demo-user-seed-001','Write guide: multi-agent tracing patterns','success',datetime('now','-1 day','+5 hours'),datetime('now','-1 day','+5 hours','+31200 milliseconds')),
  ('demo-tr-cg-010','demo-agent-005','demo-user-seed-001','Draft product update: April 2026 newsletter','success',datetime('now','-4 hours'),datetime('now','-4 hours','+26700 milliseconds'));

-- ── Spans: Customer Support Bot ──────────────────────────────────────────────
INSERT OR IGNORE INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error) VALUES
  -- cs-001: billing discrepancy (5 spans)
  ('demo-sp-cs-001-1','demo-tr-cs-001',NULL,'fetch-ticket','ok',datetime('now','-6 days','+2 hours'),datetime('now','-6 days','+2 hours','+120 milliseconds'),'{"ticket_id":5301,"system":"zendesk"}','{"subject":"Incorrect charge on invoice #2024-11","priority":"high","customer_tier":"pro"}',NULL),
  ('demo-sp-cs-001-2','demo-tr-cs-001',NULL,'lookup-billing-history','ok',datetime('now','-6 days','+2 hours','+125 milliseconds'),datetime('now','-6 days','+2 hours','+510 milliseconds'),'{"customer_id":"cus_abc001","months":3}','{"invoices":[{"id":"2024-11","amount":18.00,"status":"paid"}],"discrepancy":"Charged $18 instead of $9 — duplicate subscription event"}',NULL),
  ('demo-sp-cs-001-3','demo-tr-cs-001',NULL,'check-policy','ok',datetime('now','-6 days','+2 hours','+515 milliseconds'),datetime('now','-6 days','+2 hours','+620 milliseconds'),'{"issue_type":"billing_error","customer_tier":"pro"}','{"action":"refund","amount":9.00,"approval_required":false}',NULL),
  ('demo-sp-cs-001-4','demo-tr-cs-001',NULL,'generate-response','ok',datetime('now','-6 days','+2 hours','+625 milliseconds'),datetime('now','-6 days','+2 hours','+1840 milliseconds'),'{"tone":"empathetic","action":"refund","amount":9.00}','{"response":"Hi! I can see there was a billing error on your account. I''ve issued a $9 refund — you should see it in 3-5 business days."}',NULL),
  ('demo-sp-cs-001-5','demo-tr-cs-001',NULL,'issue-refund','ok',datetime('now','-6 days','+2 hours','+1845 milliseconds'),datetime('now','-6 days','+2 hours','+2340 milliseconds'),'{"customer_id":"cus_abc001","amount":9.00,"reason":"duplicate_charge"}','{"refund_id":"re_demo001","status":"succeeded"}',NULL),
  -- cs-004: refund error (2 spans — fails early)
  ('demo-sp-cs-004-1','demo-tr-cs-004',NULL,'fetch-ticket','ok',datetime('now','-5 days','+3 hours'),datetime('now','-5 days','+3 hours','+110 milliseconds'),'{"ticket_id":5283}','{"subject":"Refund for annual plan — changed my mind","customer_id":"cus_def002"}',NULL),
  ('demo-sp-cs-004-2','demo-tr-cs-004',NULL,'check-refund-eligibility','error',datetime('now','-5 days','+3 hours','+115 milliseconds'),datetime('now','-5 days','+3 hours','+990 milliseconds'),'{"customer_id":"cus_def002","plan":"annual","days_since_purchase":47}',NULL,'Anthropic API error: 529 Overloaded — model capacity exceeded, retry after 30s');

-- ── Spans: Research Assistant ─────────────────────────────────────────────────
INSERT OR IGNORE INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error) VALUES
  -- ra-001: LLM prompt caching (4 spans)
  ('demo-sp-ra-001-1','demo-tr-ra-001',NULL,'plan-research','ok',datetime('now','-6 days','+3 hours'),datetime('now','-6 days','+3 hours','+890 milliseconds'),'{"query":"LLM prompt caching cost-benefit analysis","depth":"comprehensive"}','{"subtopics":["cache hit rates","latency reduction","token savings","provider support"],"sources_needed":8}',NULL),
  ('demo-sp-ra-001-2','demo-tr-ra-001',NULL,'web-search','ok',datetime('now','-6 days','+3 hours','+900 milliseconds'),datetime('now','-6 days','+3 hours','+4200 milliseconds'),'{"queries":["Anthropic prompt caching benchmark","OpenAI cached tokens pricing"],"max_results":12}','{"results":[{"title":"Prompt Caching Guide — Anthropic","snippet":"Cache writes incur 25% premium; cache hits are 90% cheaper..."},{"title":"OpenAI Cached Tokens","snippet":"50% discount on cached input tokens..."}]}',NULL),
  ('demo-sp-ra-001-3','demo-tr-ra-001',NULL,'synthesize','ok',datetime('now','-6 days','+3 hours','+4210 milliseconds'),datetime('now','-6 days','+3 hours','+11100 milliseconds'),'{"sources":8,"focus":"cost-benefit for production workloads"}','{"summary":"Prompt caching reduces costs 40-85% for repetitive workloads. Break-even at ~3 cache hits per write. Most beneficial for: system prompts >1024 tokens, few-shot examples, RAG contexts.","confidence":0.91}',NULL),
  ('demo-sp-ra-001-4','demo-tr-ra-001',NULL,'format-report','ok',datetime('now','-6 days','+3 hours','+11110 milliseconds'),datetime('now','-6 days','+3 hours','+12340 milliseconds'),'{"format":"executive_summary","word_limit":500}','{"output":"## Prompt Caching: Cost-Benefit Analysis\n\nFor production AI workloads with repetitive context (system prompts, RAG, few-shot)...","word_count":487}',NULL),
  -- ra-004: multi-agent error (2 spans)
  ('demo-sp-ra-004-1','demo-tr-ra-004',NULL,'plan-research','ok',datetime('now','-4 days','+1 hour'),datetime('now','-4 days','+1 hour','+780 milliseconds'),'{"query":"Multi-agent orchestration frameworks comparison"}','{"subtopics":["LangGraph","CrewAI","AutoGen","Swarm"],"sources_needed":10}',NULL),
  ('demo-sp-ra-004-2','demo-tr-ra-004',NULL,'web-search','error',datetime('now','-4 days','+1 hour','+785 milliseconds'),datetime('now','-4 days','+1 hour','+4200 milliseconds'),'{"queries":["LangGraph vs CrewAI 2025","AutoGen multi-agent benchmark"]}',NULL,'Tavily API error: 402 Payment Required — monthly search quota exceeded');

-- ── Spans: Code Review Agent ──────────────────────────────────────────────────
INSERT OR IGNORE INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error) VALUES
  -- cr-001: auth middleware (4 spans)
  ('demo-sp-cr-001-1','demo-tr-cr-001',NULL,'fetch-pr-diff','ok',datetime('now','-6 days','+1 hour'),datetime('now','-6 days','+1 hour','+450 milliseconds'),'{"repo":"acme/api","pr":201}','{"files_changed":6,"additions":142,"deletions":38,"languages":["TypeScript"]}',NULL),
  ('demo-sp-cr-001-2','demo-tr-cr-001','demo-sp-cr-001-1','analyze-security','ok',datetime('now','-6 days','+1 hour','+460 milliseconds'),datetime('now','-6 days','+1 hour','+1820 milliseconds'),'{"focus":"auth middleware","checklist":["injection","auth bypass","session fixation","timing attacks"]}','{"issues":[],"notes":"Token validation correct. bcrypt cost factor 12. No timing vulnerabilities found."}',NULL),
  ('demo-sp-cr-001-3','demo-tr-cr-001','demo-sp-cr-001-1','analyze-code-quality','ok',datetime('now','-6 days','+1 hour','+1830 milliseconds'),datetime('now','-6 days','+1 hour','+3210 milliseconds'),'{"style":"strict","complexity_threshold":10}','{"suggestions":["Extract token refresh logic into separate function (complexity: 13)","Add JSDoc to validateSession()","Consider caching JWKS endpoint response"]}',NULL),
  ('demo-sp-cr-001-4','demo-tr-cr-001',NULL,'post-review-comment','ok',datetime('now','-6 days','+1 hour','+3220 milliseconds'),datetime('now','-6 days','+1 hour','+3900 milliseconds'),'{"summary":"LGTM with 3 minor suggestions","approved":false}','{"comment_id":112233,"url":"https://github.com/acme/api/pull/201#issuecomment-112233"}',NULL),
  -- cr-002: timeout (2 spans)
  ('demo-sp-cr-002-1','demo-tr-cr-002',NULL,'fetch-pr-diff','ok',datetime('now','-6 days','+5 hours'),datetime('now','-6 days','+5 hours','+380 milliseconds'),'{"repo":"acme/api","pr":199}','{"files_changed":14,"additions":412,"deletions":91}',NULL),
  ('demo-sp-cr-002-2','demo-tr-cr-002',NULL,'analyze-migration','error',datetime('now','-6 days','+5 hours','+390 milliseconds'),datetime('now','-6 days','+5 hours','+30000 milliseconds'),'{"migration_files":["0014_add_indexes.sql","0015_cascade_deletes.sql","0016_partition_traces.sql"]}',NULL,'LLM request timed out after 30s — model context limit likely exceeded for large diff (412 additions)'),
  -- cr-007: error (2 spans)
  ('demo-sp-cr-007-1','demo-tr-cr-007',NULL,'fetch-pr-diff','ok',datetime('now','-3 days','+2 hours'),datetime('now','-3 days','+2 hours','+390 milliseconds'),'{"repo":"acme/frontend","pr":188}','{"files_changed":3,"additions":67,"deletions":12}',NULL),
  ('demo-sp-cr-007-2','demo-tr-cr-007',NULL,'post-review-comment','error',datetime('now','-3 days','+2 hours','+395 milliseconds'),datetime('now','-3 days','+2 hours','+2340 milliseconds'),'{"summary":"Minor style suggestions only"}',NULL,'GitHub API error: 422 Unprocessable Entity — PR #188 is already merged, cannot post review');

-- ── Spans: Data Pipeline Monitor ──────────────────────────────────────────────
INSERT OR IGNORE INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error) VALUES
  -- dp-001: users_daily_snapshot (3 spans)
  ('demo-sp-dp-001-1','demo-tr-dp-001',NULL,'fetch-pipeline-status','ok',datetime('now','-6 days'),datetime('now','-6 days','+1200 milliseconds'),'{"pipeline":"users_daily_snapshot","date":"yesterday"}','{"status":"completed","rows_processed":142830,"duration_ms":7200}',NULL),
  ('demo-sp-dp-001-2','demo-tr-dp-001',NULL,'validate-schema','ok',datetime('now','-6 days','+1205 milliseconds'),datetime('now','-6 days','+1600 milliseconds'),'{"expected_columns":["user_id","email","plan","created_at","last_active"],"row_sample":100}','{"valid":true,"null_rates":{"last_active":0.03},"anomalies":[]}',NULL),
  ('demo-sp-dp-001-3','demo-tr-dp-001',NULL,'check-row-count-delta','ok',datetime('now','-6 days','+1605 milliseconds'),datetime('now','-6 days','+8200 milliseconds'),'{"yesterday":141200,"today":142830,"threshold_pct":10}','{"delta_pct":1.15,"status":"normal","alert":false}',NULL),
  -- dp-003: revenue_attribution error (2 spans)
  ('demo-sp-dp-003-1','demo-tr-dp-003',NULL,'fetch-pipeline-status','ok',datetime('now','-5 days','+12 hours'),datetime('now','-5 days','+12 hours','+1100 milliseconds'),'{"pipeline":"revenue_attribution","date":"yesterday"}','{"status":"failed","error_stage":"join_stripe_events","rows_processed":0}',NULL),
  ('demo-sp-dp-003-2','demo-tr-dp-003',NULL,'analyze-failure','error',datetime('now','-5 days','+12 hours','+1105 milliseconds'),datetime('now','-5 days','+12 hours','+3100 milliseconds'),'{"pipeline":"revenue_attribution","stage":"join_stripe_events"}',NULL,'Snowflake query error: column "stripe_charge_id" does not exist in table "events_raw" — schema drift detected in upstream table');

-- ── Spans: Content Generator ─────────────────────────────────────────────────
INSERT OR IGNORE INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error) VALUES
  -- cg-001: blog post (5 spans)
  ('demo-sp-cg-001-1','demo-tr-cg-001',NULL,'parse-brief','ok',datetime('now','-6 days','+6 hours'),datetime('now','-6 days','+6 hours','+650 milliseconds'),'{"topic":"AI agent observability in 2025","audience":"developers","tone":"authoritative","word_count":1500}','{"outline":["Why observability matters for agents","Key metrics: latency, error rate, token cost","Tools landscape","Getting started with Nexus"],"keywords":["AI agent monitoring","LLM observability","OpenTelemetry"]}',NULL),
  ('demo-sp-cg-001-2','demo-tr-cg-001',NULL,'research-topic','ok',datetime('now','-6 days','+6 hours','+655 milliseconds'),datetime('now','-6 days','+6 hours','+9200 milliseconds'),'{"outline_sections":4,"sources_per_section":3}','{"facts":["80% of AI projects cite lack of observability as top prod challenge (survey 2024)","Average LLM call costs $0.002-0.04 per request at scale","OpenTelemetry AI semantic conventions ratified Q1 2025"]}',NULL),
  ('demo-sp-cg-001-3','demo-tr-cg-001',NULL,'draft-post','ok',datetime('now','-6 days','+6 hours','+9210 milliseconds'),datetime('now','-6 days','+6 hours','+28400 milliseconds'),'{"outline":true,"facts":true,"tone":"authoritative","word_count_target":1500}','{"draft_word_count":1523,"sections_completed":4,"draft":"## Why AI Agent Observability Matters in 2025\n\nAs AI agents move from demos to production..."}',NULL),
  ('demo-sp-cg-001-4','demo-tr-cg-001',NULL,'review-and-edit','ok',datetime('now','-6 days','+6 hours','+28410 milliseconds'),datetime('now','-6 days','+6 hours','+33100 milliseconds'),'{"draft_word_count":1523,"checks":["factual_accuracy","readability","seo_keywords"]}','{"final_word_count":1498,"readability_score":72,"seo_score":88,"edits_made":7}',NULL),
  ('demo-sp-cg-001-5','demo-tr-cg-001',NULL,'publish','ok',datetime('now','-6 days','+6 hours','+33110 milliseconds'),datetime('now','-6 days','+6 hours','+34500 milliseconds'),'{"slug":"ai-agent-observability-2025","publish_at":"immediate"}','{"url":"https://nexus.keylightdigital.dev/blog/ai-agent-observability-2025","status":"published"}',NULL),
  -- cg-004: social posts error (1 span)
  ('demo-sp-cg-004-1','demo-tr-cg-004',NULL,'generate-thread','error',datetime('now','-4 days','+3 hours'),datetime('now','-4 days','+3 hours','+3400 milliseconds'),'{"platform":"twitter","topic":"SDK launch","thread_length":8}',NULL,'OpenAI API error: 400 Bad Request — content_filter triggered on draft tweet #4 (flagged: competitive comparison claim)');
