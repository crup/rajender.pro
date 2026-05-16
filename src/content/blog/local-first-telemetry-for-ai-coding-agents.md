---
title: "Local-first telemetry for AI coding agents"
slug: "local-first-telemetry-for-ai-coding-agents"
date: "2026-05-16"
updated: "2026-05-16"
category: "Opensource"
readingTime: "15 min read"
keywords: "AI coding agents, local telemetry, token usage, cache behavior, model cost, developer tools, opensource"
excerpt: "Agentic coding needs a local instrument panel for token burn, cache behavior, model mix, sessions, and cost shape."
---

AI coding agents make software work feel less linear. A session can read files, run commands, patch code, inspect failures, and keep moving across a problem for a long time. That is powerful, but it also creates a new kind of operational blind spot.

The terminal tells you what just happened. The bill tells you what happened too late. Neither is a good instrument panel while the work is happening.

After using agents heavily, I wanted to answer a different set of questions. Is this session burning too many tokens? Is cache helping or am I paying fresh-input rates repeatedly? Which workspace is driving usage? Did one model dominate the window? Did a long-running session keep dragging old context forward? Did a broad prompt create a tool loop? Where did the expensive checkpoint happen?

Those are not billing questions. They are operating questions. That is the reason for `runrate`: a local-first dashboard for AI coding-agent usage.

## Agent work needs observability

Production systems get observability because running blind is expensive. You want traces, logs, metrics, alerts, dashboards, and enough context to understand behavior before users feel the failure.

Agent-assisted engineering does not need the same machinery, but it does need the same instinct. Long agent sessions have shape. They have model choices, token volume, cache reads, cache writes, tool calls, retries, context growth, and cost estimates. Without a visible surface, all of that becomes anecdotal.

You feel that a session was expensive. You guess that cache helped. You suspect one repository is noisy. You remember that a prompt worked better yesterday. Those impressions are useful, but they are not enough to tune a workflow.

Runrate turns local usage artifacts into a dashboard so the workflow can be inspected instead of guessed.

## Why local-first matters

Coding-agent telemetry is close to private work. Even when a tool does not store full prompts, usage artifacts can expose workspace names, file paths, timestamps, model choices, provider names, and patterns of work. In some cases, that metadata is enough to infer what a person or team is building.

A hosted collector would be convenient, but it would create a new trust problem. The tool meant to help inspect agent usage would become another service receiving sensitive engineering metadata.

The local-first design keeps the default loop simple: local usage files come in, local adapters normalize them, local rollups are computed, and a local dashboard presents the result. There is no account, proxy, or remote collector required for the core workflow.

That choice also changes the product feel. Runrate is not trying to be a company-wide procurement dashboard. It is closer to an instrument panel beside the editor. It helps one builder understand what their agents are doing on this machine, in these workspaces, during this window.

## What is worth measuring

The first useful signal is token volume over time. Token usage is not just a cost proxy. It is a context proxy. A rising input pattern may mean the session is carrying too much history. A large output spike may mean the agent generated broad content instead of making a narrow patch. Repeated fresh input may mean cache is not being used effectively.

The second signal is model mix. Different models have different cost profiles and different roles. A workflow that accidentally sends every small step to a large model has a different shape from one that reserves expensive calls for hard reasoning. Seeing model mix by session and workspace makes that visible.

The third signal is cache behavior. Cache reads can make large contexts more practical. Cache misses can make the same workflow expensive. A dashboard should show whether cache is actually helping, not just whether the provider supports it.

The fourth signal is workspace grouping. Agent usage is rarely evenly distributed. One repository may be huge. Another may have noisy generated files. Another may trigger repeated test loops. Grouping by workspace turns a vague monthly number into a set of concrete places to improve.

The fifth signal is session shape. A session that steadily works through files is different from one that loops around the same failure. Expensive checkpoints matter because they are where prompt design, tool behavior, repository size, and model choice meet.

## Estimates are not invoices

Cost dashboards can become harmful when they pretend estimated numbers are billing truth. Provider pricing changes. Cache accounting differs. Local logs may be incomplete. Some models have tiered pricing. Some tools summarize usage differently across versions.

Runrate treats cost as an operational estimate. The number is useful because it changes behavior. It tells you that a session is unusually expensive, that cache is weak, that a workspace dominates usage, or that a model mix is heavier than expected. It does not need to be an invoice to be useful.

This distinction keeps the tool honest. The dashboard should make uncertainty visible when it exists. It should show the source of data, the adapter used, the provider assumptions, and the rollup window. A polished number without context is less useful than a slightly rough number with clear assumptions.

## The adapter layer

Different coding agents write different local artifacts. File formats change. Some tools keep JSONL. Some keep structured session directories. Some expose summaries. Some include cache fields. Some do not.

That is why Runrate needs an adapter layer. The adapter reads provider-specific or tool-specific data and turns it into normalized events: timestamp, workspace, session, model, input tokens, output tokens, cache reads, cache writes, estimated cost, and whatever diagnostic fields are available.

The normalized layer is the useful boundary. Once events have a shared shape, the dashboard can roll them up by model, session, workspace, provider, and time range. New agent tools can be added without rewriting the entire UI.

The adapter also creates a place for fallbacks. If a source does not expose cache writes, the adapter can leave that field empty. If a source does not expose exact cost, the estimator can use configured pricing. Missing data should be explicit, not silently converted into zero.

## The dashboard as a feedback loop

The dashboard should help during work, not only after it. That changes what matters.

A useful live view shows rolling totals, recent sessions, model mix, cache ratio, and workspace breakdown. It should make a runaway session obvious. It should let you notice that a long prompt is causing repeated fresh input. It should show whether a cheaper model handled most of the routine steps. It should make it easy to stop, restart, narrow context, or split the task.

The value is not just saving money. The value is improving judgment. When you can see the cost shape of a workflow, you learn which prompts are too broad, which repositories need better ignore patterns, which sessions should be restarted, and when a heavy model is actually worth it.

## Privacy and product scope

Local-first does not mean careless. A local dashboard still needs to avoid leaking more than it needs. It should not upload by default. It should avoid embedding raw private content in generated exports. It should make file paths and workspace names visible because they are useful locally, but it should not assume those values are safe to share.

The product scope should stay narrow. Runrate is not a prompt manager, an agent orchestrator, or a hosted billing tool. It is a visibility layer. That restraint matters because developer tools are easiest to trust when they do one sensitive job clearly.

## What changes when usage is visible

Once agent usage becomes visible, behavior changes quickly.

You start restarting sessions before they become overloaded. You use narrower prompts because you can see context cost. You notice when cache helps and when it does not. You compare model choices with less guesswork. You catch loops earlier. You stop treating agent cost as a surprise at the end of the month and start treating it like a live engineering signal.

This is similar to performance work. A team that never looks at Core Web Vitals will talk about speed vaguely. A team with a dashboard can make tradeoffs. Agent usage is moving into the same category. It is not enough to say "the agent was expensive" or "the agent was useful." The workflow has measurable shape.

## The deeper lesson

AI-assisted engineering is becoming a normal part of software work. That means it deserves tools that support judgment, not just tools that generate code.

Runrate exists because I wanted to see the operating surface of agent work: token volume, cache behavior, model mix, session cost, workspace pressure, and expensive checkpoints. I wanted that view locally, close to the editor, without creating a new data-sharing problem.

The point is practical visibility. When the workflow is visible, it becomes easier to tune. When it is local, it is easier to trust. When the numbers are honest estimates instead of fake precision, they are easier to act on.

That is the kind of dashboard I want beside agentic coding: not a billing portal, not a remote analytics product, but a local instrument panel for work that can otherwise run too quietly for too long.
