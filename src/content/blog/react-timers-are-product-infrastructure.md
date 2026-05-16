---
title: "React timers are product infrastructure"
slug: "react-timers-are-product-infrastructure"
date: "2026-05-16"
updated: "2026-05-16"
category: "Opensource"
readingTime: "15 min read"
keywords: "React timers, countdown hooks, stopwatch hooks, polling, Strict Mode, product infrastructure, TypeScript, opensource"
excerpt: "Timers look like UI detail until deadlines, pause/resume, Strict Mode, polling, and server-owned time make them infrastructure."
---

Timer code usually enters a product quietly. A designer needs a countdown. A product manager wants a resend cooldown. A checkout flow needs to show how long a hold remains. A dashboard needs polling. The first implementation is almost always local: a `setInterval`, a state setter, and a cleanup function.

That is fine until time becomes part of the product contract.

When a timer is wrong, the user does not think about hooks, effects, stale closures, background tabs, or server clocks. They think the product lied. A checkout hold ended too early. A bid closed late. A resend button stayed disabled. A polling screen hammered the API. A scheduled callback fired twice. These are small failures, but they damage trust because time is one of the few pieces of UI people instinctively believe.

That is why `@crup/react-timer-hook` treats timers as product infrastructure. The library is not about making a stopwatch demo pretty. It is about making time-based UI explicit enough that real product flows can survive React lifecycles, browser behavior, and changing requirements.

## The simple interval trap

The classic implementation looks harmless:

```tsx
useEffect(() => {
  const id = setInterval(() => {
    setRemaining((value) => value - 1000);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

This works in a small demo, but it hides several decisions.

The interval is being treated as the source of truth. Every tick subtracts time from local state. If the tab sleeps, the timer does not know what actually happened. If the component remounts, the timer restarts from whatever local state says. If the server owns the deadline, this local countdown has become a second authority.

The effect also owns lifecycle in a way that is easy to outgrow. What happens when the countdown needs pause and resume? What happens when `onEnd` is async? What happens when props change? What happens when the user restarts the timer before the old callback finishes? What happens when there are 200 rows, each with its own timer?

None of these problems is exotic. They show up in everyday product screens.

## Time should be derived when possible

For many product flows, the correct model is not "subtract one second every second." The correct model is "compare now with an absolute point in time."

If a server says a checkout hold expires at `2026-05-16T10:20:00Z`, the client should derive remaining time from that deadline. The interval should only decide how often the UI refreshes. If the tab sleeps for thirty seconds and wakes up, the next render should show the truth immediately. It should not pretend one second passed because one interval callback fired.

This distinction matters in auctions, bookings, cart holds, OTP cooldowns, limited offers, and collaboration sessions. If the server owns the deadline, the browser should present the deadline. It should not invent its own clock.

A timer hook should therefore expose snapshots: now, elapsed, remaining, running state, ended state, and controls. The screen can render from the snapshot. The lifecycle can decide when completion has happened. The interval remains a cadence, not the domain model.

## React adds lifecycle pressure

React is not the enemy of timers, but it makes sloppy timer ownership visible.

Components rerender. Effects rerun. Strict Mode can mount, unmount, and mount again in development to expose unsafe assumptions. Parent props can change while an interval is alive. Closures can capture old values. Cleanup can run after a callback has scheduled more work. A completion handler can be called twice if the timer is restarted at the wrong moment.

The fix is not to fight React. The fix is to model timer lifecycle directly.

Start, pause, resume, reset, stop, and dispose are different actions. They should not be implied by random prop changes unless the API says so. Completion should have once-only behavior when the product expects it. Async completion should not overlap accidentally. Cleanup should clear scheduled work and mark the timer as disposed so late callbacks do not mutate dead state.

When those rules live inside each product component, every screen slowly grows its own timer runtime. The code may be short, but the behavior is not consistent.

## Different timer shapes deserve different APIs

One mistake in utility design is trying to make one hook cover every timing use case through a large options object. That produces an API that is flexible in theory and unclear in practice.

The timing domain has related but distinct shapes:

- a stopwatch measures elapsed time
- a countdown measures remaining time
- a cooldown gates an action
- a schedule runs callbacks at intervals
- polling runs async work with overlap policy
- a timer group coordinates many keyed timers
- duration helpers convert raw milliseconds into display units

These should share internal principles, but they do not need to share one overloaded public API.

That is why `react-timer-hook` is modular. A simple screen can import the core hook. A table with many independent timers can use a group primitive. A polling screen can use scheduling behavior. A display-only path can use duration helpers. The library stays small at the call site because the product chooses the timer shape it actually needs.

## Pause and resume are not just booleans

Pause looks simple until deadlines enter the system. If a countdown is client-owned, pausing may freeze remaining time. If a countdown is server-owned, pausing the local UI may not make sense because the real deadline continues. If a timer is a stopwatch, pause changes elapsed calculation. If a timer runs polling, pause may cancel in-flight work or simply stop scheduling the next run.

The API should force that thinking into the open. A hook cannot decide product semantics by magic. It can provide controls and state transitions that make the decision visible.

For example, a pausable countdown should track accumulated paused duration or preserve remaining time at the moment of pause. A server deadline countdown should probably not expose pause unless the product has a server action that extends or freezes the deadline. A polling timer should make overlap behavior explicit: skip, queue, cancel, or allow.

Timer bugs often come from using the same word for different product meanings. A better timer library keeps the primitives small enough that the screen still owns the domain decision.

## Polling needs policy

Polling is just a timer with consequences. A naive polling loop can start a new request before the previous one finishes. It can continue after the component unmounts. It can retry too aggressively. It can hide failures because the next interval keeps firing. It can create load spikes when many components mount together.

A polling API needs at least three policy decisions: when to run, what to do if work overlaps, and when to stop. The answer differs by product. A dashboard may skip an interval if the previous request is still running. A background sync may queue the next attempt. A search screen may cancel old work when new input arrives.

The important thing is that overlap should not be accidental. It should be an option with a name. When a production incident shows doubled request volume, the team should be able to inspect polling policy instead of reverse-engineering interval callbacks across components.

## Many timers need shared coordination

One timer is easy. A table of timers is a different problem. Auctions, orders, bookings, sessions, jobs, reminders, and dashboards often show many independent time states at once.

Creating one interval per row is not always terrible, but it can become noisy. More importantly, row-level timers need stable identity. Rows are added, removed, reordered, filtered, and paginated. If the timer lifecycle is tied only to component position, the UI can reset or leak behavior as the list changes.

A group timer API can model keyed lifecycles. Each row has an identity. The scheduler can tick once and update many snapshots. Removed rows can be disposed. New rows can be initialized from their own deadlines. The product code stays focused on rendering the row state instead of managing a small scheduler inside a map.

This is the kind of problem that makes timers infrastructure rather than decoration.

## Display math deserves boring helpers

Formatting duration is another source of drift. One screen shows `01:05`. Another shows `1m 5s`. Another rounds up. Another rounds down. Another forgets days. Another displays negative time after expiry.

Duration helpers are not glamorous, but they matter because timer UI is often scanned under pressure. A helper should make unit conversion consistent and leave presentation choices explicit. A product can still choose compact, verbose, or segmented display, but the math should not be rewritten every time.

Good display helpers also handle boundary states: zero, expired, less than one second, long durations, and missing values.

## What the library tries to make visible

The goal of `react-timer-hook` is not to hide time. It is to make the meaningful parts visible:

- what starts the timer
- what pauses it
- what resumes it
- what resets it
- what counts as ended
- whether completion can fire more than once
- whether async work can overlap
- whether time is client-owned or server-derived
- how cleanup happens
- how many timers share scheduling

These are product decisions. A hook should give them a clear surface.

## The deeper lesson

Small utilities become architecture when enough product behavior depends on them. Timer code is a perfect example because the first version is so easy to write. That ease hides the cost of every future edge case.

The better habit is to treat time as a domain boundary early. If the server owns the deadline, derive from it. If the UI owns elapsed time, model pause and resume honestly. If async work repeats, define overlap policy. If many rows need timers, coordinate by identity. If cleanup matters, make disposal part of the lifecycle.

That is why I built `react-timer-hook`. I wanted a small, modular timing layer that keeps product code readable while making the real lifecycle explicit. Timers fail quietly, so the API should make their failure modes hard to ignore.
