---
title: "Iframe integration needs a runtime contract"
slug: "iframe-integration-needs-a-runtime-contract"
date: "2026-05-16"
updated: "2026-05-16"
category: "Opensource"
readingTime: "15 min read"
keywords: "iframe integration, postMessage protocol, embedded apps, frontend architecture, TypeScript runtime, opensource"
excerpt: "A deep dive into why iframe products need explicit lifecycle, origin, resize, and request/response contracts."
---

Iframe integration usually starts as a small convenience. A team has a product surface that needs to live inside another product. The browser already has iframe support. The child can load in isolation. `postMessage` can move data across the boundary. The first demo is often a few lines: render the frame, wait for load, send a message, receive a callback, close the modal.

That first version is not wrong. It is just incomplete.

The problem appears when the embed stops being a demo and becomes infrastructure. One host wants the embed inline. Another wants a modal. A third host needs the child to resize itself because content height changes after data loads. Support needs to know whether the child ever became ready. Security needs exact origin pinning. Product needs request/response behavior. Design wants a close event. Someone adds an error event. Someone else adds a refresh event. Eventually, what looked like one iframe has become a distributed runtime with two peers, two lifecycles, two failure modes, and one loose message pipe between them.

That is the problem `@crup/port` is built around. It is not trying to replace iframes. It is trying to make the contract around iframe integration explicit enough that teams do not keep rebuilding the same private protocol in every host.

## postMessage is a transport, not a product protocol

`postMessage` is low-level on purpose. It gives one browsing context a way to send data to another. It does not decide what the message means, when it is allowed, how it should be correlated, whether it is part of a handshake, or what state either side should enter after receiving it.

Most product integrations accidentally build those rules anyway. They just do it without naming them. A message called `ready` is a lifecycle transition. A message called `resize` is a layout command. A message called `checkout:success` is a domain event. A message with `requestId` is part of a request/response protocol. A message called `close` may be a user intent, a host instruction, or a child lifecycle event depending on which team wrote it.

When these meanings live only in handlers, drift becomes normal. One host checks `event.origin` against the production child domain. Another accepts staging and production. Another uses `*` because the early test needed to move quickly. One child sends `ready` as soon as its script boots. Another sends it after data is fetched. One host treats iframe `load` as readiness and never listens for a child event at all. None of those decisions is clearly visible from the API.

This is why iframe integration needs a runtime contract. The browser API is only the transport. Product reliability comes from the protocol layered on top.

## The actual boundary is wider than messaging

It is tempting to think the hard part is message parsing. That is only one piece. The runtime boundary includes mounting, readiness, security, layout, commands, events, errors, and teardown.

Mounting is the first contract. Does the host create the iframe? Does it reuse one? Does the frame live inline, in a drawer, in a modal, or in a hidden preloaded state? Who owns removal? What happens when the user navigates away before the child is ready?

Readiness is the second contract. The iframe `load` event means the document loaded. It does not mean the embedded app is hydrated, authenticated, configured, or ready to accept commands. A serious embed needs its own readiness signal. The host should be able to wait for it, time out, and fail visibly.

Origin is the security contract. Every message must be scoped to exact origins. In practice, origin handling becomes messy because teams need local development, preview deployments, staging, production, and sometimes tenant-specific domains. That is exactly why the rule belongs in the runtime. Security review should inspect a clear allowlist and message gate, not chase string comparisons across application code.

Layout is another contract. Embedded products often change height after the initial render. The child may load remote data, reveal validation errors, or expand a section. If the host guesses height, the embed either clips or leaves dead space. If the child can request resize, that behavior needs a typed message, throttling decisions, and host-owned application of layout.

Request/response behavior is the point where many integrations become hard to debug. Events are one-way. Commands may or may not expect a reply. Requests need correlation IDs, timeout behavior, and error shapes. If all three concepts share one loose event channel, the mental model collapses.

Teardown is the quiet one. A host closes the modal, removes the iframe, or navigates away. The child may still be trying to send a response. A pending request may never resolve. Event listeners may stay alive. The runtime should make disposal an explicit state, not a side effect of DOM removal.

## What Port makes explicit

Port treats the iframe boundary as a protocol boundary. It gives the host and child runtimes a shared vocabulary for the work they already need to do.

The host runtime owns frame creation and mounting. It can place the iframe in the target container, control mode, and hold the allowed origin. The child runtime participates from inside the embedded app. It announces readiness, handles calls, emits events, and can ask the host for layout changes.

The message envelope matters. A good envelope makes it possible to reject messages that do not belong to the protocol, distinguish event types from call replies, carry correlation IDs, and keep protocol metadata away from domain payloads. Without an envelope, every new feature invents another small convention.

The lifecycle matters too. A runtime should know whether it is idle, mounting, ready, active, failed, or disposed. That state should shape what calls are allowed. A host should not send commands to a child that never became ready. A child should not assume a host is listening after teardown.

The security model belongs near the lifecycle. If a host knows the allowed origin before mounting, then message filtering can be enforced consistently from the first event. The goal is not to make iframe security magical. The goal is to remove casual origin handling from product code where it is easy to weaken under deadline pressure.

Resize should be first-class. It is not a product-specific hack. Almost every serious embed eventually needs it. Treating resize as a protocol message keeps layout coordination predictable and testable.

Request/response should be separate from fire-and-forget events. A call should have a name, payload, correlation ID, reply, and error path. An event should not imply a reply unless it is modeled that way. This one distinction prevents a lot of future ambiguity.

## Why not just use a framework component

A React component is a tempting abstraction. It makes the first host integration look clean: `<Embed />`, a few props, maybe callbacks. The problem is that the iframe boundary is below the framework layer. The child may not be React. The host may not be React. The integration may be inserted into a page that has no component runtime at all.

Framework adapters can still be useful, but they should wrap the protocol rather than define it. The runtime contract needs to be usable from any host that can create an iframe and listen to window messages.

This is also why Port avoids becoming a general remote-method system. It would be easy to design an API that makes calls across the iframe boundary look like local functions. That is attractive until something fails. The boundary has latency, origin checks, load timing, user navigation, and disposal. Hiding those realities makes the happy path shorter and the failure path harder.

The better abstraction is modest: make the boundary legible. Let product code remain product code. Let the runtime own the handshake, message envelope, origin gate, resize, calls, events, and cleanup.

## The shape of a healthier embed

A healthier embed starts with a host that knows what it is loading and what origin it trusts. It mounts the iframe through one runtime path. It waits for a child readiness signal rather than assuming document load is enough. It sends calls through a correlated request path. It receives events through named subscriptions. It applies child resize requests through host-owned layout rules. It disposes listeners and pending calls when the embed is closed.

The child has matching responsibilities. It starts its runtime when the embedded app is ready to participate. It knows the expected host origin. It announces readiness only when it can actually handle calls. It emits domain events as events, not pseudo-replies. It handles host calls with explicit success and error paths. It asks for resize rather than poking at parent DOM it should not own.

This does not make iframe integration complex. It reveals the complexity that was already there.

## Operational benefits

The first benefit is reviewability. A protocol-first runtime gives engineers and security reviewers one place to inspect origin handling, message shape, readiness, and teardown behavior. That is much better than searching for `message` event listeners across host and child code.

The second benefit is consistency. When a second host integrates the same child, it does not need to learn private conventions from the first host. The same runtime names and states apply. The second integration may have a different layout, but it should not invent a different handshake.

The third benefit is debuggability. When a support issue says the embed did not load, the system can distinguish between frame mount, document load, child readiness, auth failure, host call timeout, or child error. Without lifecycle states, all of those collapse into "iframe broken."

The fourth benefit is product speed. Once the boundary is explicit, new features can be added as protocol behavior instead of local patches. A new event, command, or resize rule has a place to live.

## What belongs outside the runtime

Port should not own product state. It should not know what a checkout is, what a lead is, what a dashboard panel means, or how a design system renders a modal. Those choices belong to the host and child products.

It should also avoid owning authentication flows beyond whatever data the product chooses to pass. Auth is usually domain-specific. The runtime can help move messages safely after the app is ready, but it should not pretend to be an identity layer.

The same applies to analytics. The runtime can emit lifecycle events that product analytics may consume, but it should not become an analytics SDK. Keeping the boundary narrow is what makes the package understandable.

## The deeper lesson

Iframe work is a useful reminder that small browser APIs often become product infrastructure. The first call to `postMessage` is easy. The durable system around it is harder.

The mistake is not using iframes. Iframes remain one of the cleanest isolation tools on the web. The mistake is treating iframe integration as a UI detail after it has already become a runtime relationship.

Port exists because I wanted that relationship to have names, states, and failure paths. A good embed runtime should be boring in the best way: exact origins, explicit readiness, clear messages, predictable layout, correlated calls, and cleanup that does not depend on memory.

That is the contract I want when an embedded app moves from prototype to product.
