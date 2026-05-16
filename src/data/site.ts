export const person = {
  name: "Rajender Joshi",
  role: "AI-native founder-engineer",
  email: "mail@rajender.pro",
  location: "Gurgaon, India",
  github: "https://github.com/crup",
  linkedin: "https://linkedin.com/in/rajenderjoshi",
  x: "https://x.com/_rajenderjoshi",
};

export const ogImageSet = (folder: "static" | "blog" | "opensource", slug: string) => ({
  image: `/og/${folder}/${slug}.png`,
  twitterImage: `/og/${folder}/${slug}-twitter.png`,
  squareImage: `/og/${folder}/${slug}-square.png`,
});

export const navItems = [
  { label: "Opensource", href: "/opensource/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export const projects = [
  {
    slug: "engineering-platform-governance",
    name: "Engineering Platform Governance",
    year: "2023-2026",
    category: ["Leadership", "Platform", "Quality"],
    summary:
      "Operating model, platform standards, and delivery governance for multi-pod consumer engineering teams.",
    overview:
      "This work sat at the intersection of management and technical systems: team ownership, release quality, shared libraries, architecture review, and the routines that let product teams move without losing standards.",
    problem:
      "As team count and product surface area grew, delivery could not depend on informal coordination. The organization needed clearer ownership, fewer platform bottlenecks, and quality checks that showed up before release.",
    role:
      "Led planning, hiring, execution rituals, review standards, and architecture direction with product, design, backend, and data leadership.",
    process: [
      "Defined pod-level ownership and technical review expectations.",
      "Kept platform decisions tied to delivery constraints instead of abstract architecture goals.",
      "Turned performance, accessibility, and testing expectations into repeatable release checks.",
    ],
    outcome:
      "Teams gained clearer decision paths and stronger delivery confidence while shared platform standards stayed visible in day-to-day execution.",
    takeaways: [
      "Engineering management works best when it stays close to architecture.",
      "Quality improves when the system makes regressions visible early.",
      "Autonomy needs contracts, not just permission.",
    ],
  },
  {
    slug: "microfrontend-delivery",
    name: "Independent Team Delivery",
    year: "2022-2025",
    category: ["React", "NX", "Module Federation"],
    summary:
      "Microfrontend and monorepo workflows that let product teams ship independently while preserving shared standards.",
    overview:
      "The useful part of the architecture was not the diagram. It was the operating contract around shared packages, dependency hygiene, ownership boundaries, and release paths.",
    problem:
      "Centralized frontend ownership was becoming a coordination tax. A naive split would have increased duplication, bundle risk, and inconsistent user experience.",
    role:
      "Drove the platform direction and helped teams adopt NX, Module Federation, shared libraries, and review rules that protected long-term maintainability.",
    process: [
      "Mapped product boundaries to ownership boundaries.",
      "Separated shared primitives from team-owned application surfaces.",
      "Used release and review workflows to keep independence from becoming drift.",
    ],
    outcome:
      "Teams could release with less centralized blocking while platform standards remained explicit and enforceable.",
    takeaways: [
      "Microfrontends are an org-design decision as much as a bundling decision.",
      "The shared layer should be small, boring, and well owned.",
      "Release independence is only useful when runtime behavior stays predictable.",
    ],
  },
  {
    slug: "consumer-product-systems",
    name: "Consumer Product Systems",
    year: "2019-2026",
    category: ["TypeScript", "Go", "Cloud"],
    summary:
      "High-traffic product work across web, services, SEO, observability, and cloud-backed delivery.",
    overview:
      "A large consumer product is never only a UI problem. Performance, indexing, service behavior, observability, and release confidence all affect whether the product keeps compounding.",
    problem:
      "Multiple markets and product lines needed reliable delivery across frontend, backend, and infrastructure concerns without creating fragile handoffs.",
    role:
      "Partnered across engineering functions and led teams working with React, Next.js, Node.js, Go, MySQL, AWS, GCP, and CI/CD systems.",
    process: [
      "Connected product milestones with service and infrastructure readiness.",
      "Used measurement from Lighthouse, RUM, Sentry, Datadog, and CloudWatch to guide quality work.",
      "Kept SEO, performance, and platform maintainability in the delivery conversation.",
    ],
    outcome:
      "Product surfaces stayed faster, easier to evolve, and better connected to business outcomes across markets.",
    takeaways: [
      "Full-stack delivery is mostly about eliminating blind spots between layers.",
      "Cloud and observability work should serve product feedback loops.",
      "A fast site is an operating habit, not a late cleanup task.",
    ],
  },
  {
    slug: "cross-platform-libraries",
    name: "Cross-Platform Libraries",
    year: "2021-2024",
    category: ["TypeScript", "React Native", "Node.js"],
    summary:
      "Reusable headless libraries for auth, chatbot, and API integration flows across web and mobile surfaces.",
    overview:
      "The goal was to move sensitive, repeatable behavior into well-owned packages while leaving product teams enough room to compose the experience they needed.",
    problem:
      "Different teams were reimplementing the same application logic, which increased drift in behavior, security posture, and integration quality.",
    role:
      "Helped define package boundaries, APIs, ownership, release expectations, and adoption paths across React and React Native surfaces.",
    process: [
      "Separated headless behavior from presentation concerns.",
      "Documented contracts and failure states so product teams could adopt safely.",
      "Used package ownership and reviews to keep shared logic from becoming a dumping ground.",
    ],
    outcome:
      "Common flows became more consistent across products while the UI layer remained flexible.",
    takeaways: [
      "The best shared library is narrow enough to own well.",
      "Headless APIs age better than shared UI for cross-platform behavior.",
      "Documentation is part of the runtime contract.",
    ],
  },
];

export const opensourceProjects = [
  {
    slug: "port",
    name: "port",
    href: "https://github.com/crup/port",
    npmHref: "https://www.npmjs.com/package/@crup/port",
    year: "2026",
    summary:
      "A protocol-first iframe runtime for secure host/child embeds with explicit lifecycle, origin pinning, resize, events, and request/response messaging.",
    blogHref: "/blog/iframe-integration-needs-a-runtime-contract/",
    problem:
      "Iframe products usually start with one postMessage call and end with a private protocol scattered across the host app and the embedded app. That makes the integration hard to reason about, especially when resize, readiness, origin checks, teardown, and request/response behavior arrive later.",
    approach: [
      "Treat the iframe boundary as a protocol boundary, not a loose event pipe.",
      "Make lifecycle states explicit so both host and child know when the connection is ready, active, or disposed.",
      "Keep origins pinned and message shapes typed so security and product behavior stay in the same conversation.",
      "Support resize, events, and request/response messaging as first-class pieces instead of product-specific patches.",
    ],
    outcome:
      "Port gives embedded products a small, understandable runtime that can be reused without rebuilding the same handshake and cleanup logic in every host.",
    sections: [
      {
        title: "Why this exists",
        body: [
          "Embedded products often begin as a tactical integration. A team adds an iframe, passes a configuration object into the URL or an initialization message, and waits for one success callback. That shape is fine for a demo, but it does not survive the moment an embed becomes product infrastructure. The host needs readiness, the child needs to resize, support needs enough state to debug failures, and security needs exact origin discipline instead of a casual wildcard.",
          "Port is an attempt to make that boundary explicit. It treats the iframe not as a DOM convenience but as a distributed runtime with two peers that need a contract. The package is deliberately small because the contract itself is the value: mount, handshake, allowed origin, readiness, resize, events, request/response, error, and teardown. Everything else should remain product-owned.",
        ],
      },
      {
        title: "The real failure mode",
        body: [
          "Raw postMessage is not the villain. The browser API does exactly what it promises: move a message from one window context to another. The problem is that product teams accidentally build a protocol without naming it. One message is an event, another is a command, another is a reply, and another is a state transition. Six months later, the only specification is spread across handlers, timeout branches, and comments that describe a version of reality that no longer exists.",
          "The failure usually appears as drift. One host assumes the child is ready after iframe load. Another waits for a ready event. One child sends a resize event before the host has subscribed. One integration checks origin against the parent site while another checks a CDN domain. The code keeps working in the common path, but every new edge case becomes a local patch instead of a shared rule.",
        ],
      },
      {
        title: "Protocol shape",
        body: [
          "A useful iframe protocol needs a few boring primitives. It needs a handshake that both sides can observe. It needs message envelopes so a receiver can tell whether a message belongs to this protocol at all. It needs correlation IDs for request/response behavior. It needs lifecycle states that make cleanup visible. It needs exact allowed origins because iframe messaging is often placed directly on sensitive product surfaces.",
          "Port keeps those concepts close together. The host runtime owns the iframe shell. The child runtime owns the embedded app's participation in the contract. Both sides agree on origin and message shape. Resize is not a random custom event; it is a protocol behavior. Calls and replies are not informal callback maps; they are correlated exchanges with failure paths.",
        ],
      },
      {
        title: "What it avoids",
        body: [
          "I did not want Port to become a framework wrapper. A React component may be convenient, but the iframe boundary exists outside React. A host may be a server-rendered app, a Vue app, a vanilla admin console, or a product page where the embed is inserted by a tag manager. The useful abstraction needs to live below those choices.",
          "I also avoided pretending an iframe should behave like local function calls. The boundary has latency, lifecycle uncertainty, origin rules, and failure states. Hiding that behind a remote-method abstraction makes the first integration feel cleaner while making debugging harder. Port's job is to make the boundary legible, not to erase it.",
        ],
      },
      {
        title: "Where it helps",
        body: [
          "The package is useful when an embedded surface becomes more than decorative UI: commerce widgets, onboarding flows, scheduling modules, support consoles, analytics panels, partner apps, and any product where the host and child need to coordinate. These flows need a shared language for readiness, resize, close, data requests, and one-off events.",
          "The deeper value is operational. A team can read the host code and child code and see the same protocol names. Security review can inspect origin handling. Product engineers can add a new event without inventing a new reply pattern. Cleanup becomes part of the runtime rather than an afterthought in a component effect.",
        ],
      },
    ],
    usageSamples: [
      {
        title: "Install",
        language: "bash",
        body: "Add the runtime to both the host app and the embedded child app so the protocol types stay aligned.",
        code: `npm install @crup/port`,
      },
      {
        title: "Host: mount an embedded app",
        language: "ts",
        body: "The host owns the iframe shell, the allowed origin, and the target container. It waits for the child runtime before sending calls.",
        code: `import { createPortHost } from "@crup/port/host";

const embed = createPortHost({
  url: "https://tools.example.com/checkout-assistant",
  allowedOrigin: "https://tools.example.com",
  target: document.querySelector("#assistant-root"),
  mode: "inline",
});

await embed.mount();
await embed.ready();

const recommendation = await embed.call("cart:recommend", {
  cartId: "cart_123",
  productIds: ["sku_1", "sku_2"],
});

embed.on("assistant:close", () => {
  embed.dispose();
});`,
      },
      {
        title: "Child: expose protocol behavior",
        language: "ts",
        body: "The child app declares the trusted host, announces readiness only when it can handle messages, and keeps product events separate from request handlers.",
        code: `import { createPortChild } from "@crup/port/child";

const host = createPortChild({
  allowedOrigin: "https://shop.example.com",
});

host.handle("cart:recommend", async ({ productIds }) => {
  return {
    message: "Compare fit, warranty, and delivery before checkout.",
    productIds,
  };
});

host.resize({ height: document.body.scrollHeight });
host.ready();

document.querySelector("#close")?.addEventListener("click", () => {
  host.emit("assistant:close", { reason: "user" });
});`,
      },
      {
        title: "Cleanup on route changes",
        language: "ts",
        body: "Treat teardown as part of the runtime contract so late replies and event listeners do not survive a closed embed.",
        code: `const removeRouteListener = router.onChange(() => {
  embed.dispose();
  removeRouteListener();
});`,
      },
    ],
  },
  {
    slug: "react-timer-hook",
    name: "react-timer-hook",
    href: "https://github.com/crup/react-timer-hook",
    npmHref: "https://www.npmjs.com/package/@crup/react-timer-hook",
    year: "2026",
    summary:
      "A small React hooks library for timers, stopwatches, countdowns, schedules, duration helpers, and many independent timer lifecycles.",
    blogHref: "/blog/react-timers-are-product-infrastructure/",
    problem:
      "Most timer code is deceptively small. It works in a demo, then breaks under React rerenders, Strict Mode, changing props, server-owned deadlines, background tabs, and screens with many independent rows.",
    approach: [
      "Keep the core timer hook small and predictable instead of turning every use case into one large abstraction.",
      "Model countdowns, stopwatches, schedules, async callbacks, and polling as related but separate APIs.",
      "Make pause, resume, reset, expiry, and cleanup behavior explicit so product screens do not hide timing state in effects.",
      "Let heavier behavior be imported only when needed, keeping common screens light.",
    ],
    outcome:
      "The package gives product code a stable timer surface without forcing every screen to rediscover the same lifecycle bugs.",
    sections: [
      {
        title: "Why this exists",
        body: [
          "Timers sit in the part of product engineering where small code can create large user-visible mistakes. A resend cooldown fires twice. A cart hold expires early after a tab wakes up. A countdown drifts because state was decremented instead of derived from time. A polling loop overlaps with itself and quietly doubles API load. These are not dramatic architecture failures, but they erode trust.",
          "react-timer-hook is built around the idea that product time should be modeled as a lifecycle, not as an interval callback. The interval is only a render cadence. The source of truth is the clock, the configured deadline, the pause state, and the explicit controls the product exposes.",
        ],
      },
      {
        title: "The common trap",
        body: [
          "The most common timer implementation is a setInterval inside an effect. It looks cheap because the first screen only needs a number to move once per second. That implementation becomes expensive when the screen needs pause, resume, restart, cleanup, async completion, or many independent timers in a list.",
          "React adds another layer of reality. Effects rerun. Strict Mode can expose assumptions by mounting twice in development. Parent props change while an interval is alive. Closures capture stale values. Cleanup may happen after a callback has already scheduled more work. None of this means React is hostile to timers. It means timers need to be treated as state machines with clear ownership.",
        ],
      },
      {
        title: "The API boundary",
        body: [
          "The library keeps the basic hook narrow: start, pause, resume, reset, snapshot, elapsed, remaining, and completion. More specialized behavior lives in separate entry points. A product that only needs a stopwatch should not import scheduling, diagnostics, duration helpers, and group coordination. A dashboard that needs many timers should not reinvent keyed lifecycle management.",
          "This modularity is a product decision as much as a bundle decision. Different screens have different timing risk. A checkout deadline, an OTP resend timer, an auction table, and a background polling screen all share time as a domain, but they should not be forced through one large abstraction that hides their different failure modes.",
        ],
      },
      {
        title: "Server time and drift",
        body: [
          "Many product timers are not actually client-owned. The server decides when a hold expires, when a bid window closes, when a session should refresh, or when an action can be retried. A client timer should present that state, not become a second authority. That means deriving remaining time from an absolute deadline whenever possible and treating wake-up drift as normal browser behavior.",
          "The library's design nudges screens toward derived snapshots. If a browser tab sleeps for thirty seconds, the next tick should not pretend that only one second passed. The product should recompute from now, compare against the configured end condition, and fire completion behavior once.",
        ],
      },
      {
        title: "Where it helps",
        body: [
          "The package is useful for visible countdowns, stopwatches, cooldowns, polling loops, scheduled callbacks, optimistic UI windows, and row-level timers. The goal is not to make timer code clever. The goal is to make lifecycle choices visible enough that product engineers can reason about what starts, what pauses, what ends, and what gets cleaned up.",
          "The best outcome is boring reliability. When a timer is wrong, users rarely blame a hook. They blame the product. react-timer-hook exists to keep that small piece of infrastructure predictable before it becomes one more local workaround in every screen.",
        ],
      },
    ],
    usageSamples: [
      {
        title: "Install",
        language: "bash",
        body: "Install the core package first, then import heavier timer shapes only where a screen needs them.",
        code: `npm install @crup/react-timer-hook`,
      },
      {
        title: "Server-owned checkout deadline",
        language: "tsx",
        body: "Derive remaining time from an absolute deadline instead of decrementing local state. The interval is only the render cadence.",
        code: `import { useTimer } from "@crup/react-timer-hook";

export function CheckoutHold({ expiresAt }: { expiresAt: string }) {
  const timer = useTimer({
    autoStart: true,
    updateIntervalMs: 1000,
    endWhen: ({ now }) => now >= new Date(expiresAt).getTime(),
    onEnd: () => {
      console.info("checkout hold expired");
    },
  });

  return (
    <section>
      <p>Hold expires in {timer.remaining.formatted}</p>
      <button onClick={timer.reset}>Refresh status</button>
    </section>
  );
}`,
      },
      {
        title: "Cooldown with explicit controls",
        language: "tsx",
        body: "Use named controls for product states such as pause, resume, reset, and one-shot completion instead of hiding them in effects.",
        code: `import { useCountdown } from "@crup/react-timer-hook/countdown";

export function ResendCodeCooldown() {
  const cooldown = useCountdown({
    durationMs: 30_000,
    autoStart: true,
  });

  return (
    <button disabled={!cooldown.ended} onClick={cooldown.reset}>
      {cooldown.ended ? "Resend code" : "Retry in " + cooldown.remaining.seconds + "s"}
    </button>
  );
}`,
      },
      {
        title: "Polling without accidental overlap",
        language: "tsx",
        body: "A polling screen should declare what happens when the previous request is still running.",
        code: `import { useScheduledTimer } from "@crup/react-timer-hook/schedule";

export function JobStatus({ jobId }: { jobId: string }) {
  useScheduledTimer({
    intervalMs: 5000,
    autoStart: true,
    overlap: "skip",
    task: async () => {
      const response = await fetch("/api/jobs/" + jobId);
      return response.json();
    },
  });

  return <p>Watching job status...</p>;
}`,
      },
    ],
  },
  {
    slug: "runrate",
    name: "runrate",
    href: "https://github.com/crup/runrate",
    npmHref: "https://www.npmjs.com/package/@crup/runrate",
    year: "2026",
    summary:
      "A local-first dashboard for AI coding-agent token, cache, session, model, and cost telemetry from local usage artifacts.",
    blogHref: "/blog/local-first-telemetry-for-ai-coding-agents/",
    problem:
      "AI coding sessions can become expensive or noisy without a visible operating surface. Terminal summaries are useful after the fact, but they do not show rolling burn, cache behavior, model mix, or which workspace is driving usage while the work is still happening.",
    approach: [
      "Read local usage artifacts instead of requiring a hosted collector.",
      "Show sessions, workspaces, model mix, cache behavior, token volume, and estimated cost in one place.",
      "Make the dashboard useful beside the editor so long-running agent work can be watched as it happens.",
      "Keep privacy simple: local data in, local view out.",
    ],
    outcome:
      "Runrate turns coding-agent usage into an operational signal, making it easier to notice runaway sessions and understand where agent work is actually going.",
    sections: [
      {
        title: "Why this exists",
        body: [
          "AI coding agents changed my development loop, but they also introduced a new blind spot. A session can be technically productive and still be operationally noisy. It can drag a huge context forward, repeatedly miss cache, bounce between models, or burn through a rolling window while the terminal only shows a narrow slice of what happened.",
          "Runrate is a local-first instrument panel for that work. It reads usage artifacts from the machine, normalizes sessions, estimates cost, and makes the pattern visible while the work is still fresh. The point is not billing precision. The point is operational judgment.",
        ],
      },
      {
        title: "Local-first by design",
        body: [
          "Coding-agent telemetry is sensitive because it sits close to private work. Even when prompts are not stored directly, workspace names, file paths, session timing, and model behavior can reveal what someone is building. A hosted analytics product would create a new trust problem for a tool whose purpose is introspection.",
          "Runrate keeps the default loop local. Local artifacts come in, local rollups are computed, and the dashboard runs beside the editor. That design makes it easier to inspect cost and behavior without turning engineering workflow metadata into another remote dataset.",
        ],
      },
      {
        title: "What it watches",
        body: [
          "The dashboard focuses on signals that change behavior: model mix, token volume, cache reads, cache writes, session totals, workspace totals, estimated cost, and expensive checkpoints. These are the signals that help decide whether a prompt is too broad, a session should be restarted, a cheaper model is enough, or cache is actually helping.",
          "The useful view is not one big number. It is the relationship between numbers. A high token count with strong cache behavior means something different from a high token count with repeated fresh input. A short session with a costly model mix means something different from a long session that stayed cheap and predictable.",
        ],
      },
      {
        title: "Estimates and honesty",
        body: [
          "Cost dashboards can become misleading when they pretend estimates are invoices. Provider pricing changes, logs differ, cache accounting varies, and local artifacts may be incomplete. Runrate handles this by treating numbers as operating signals, not authoritative billing records.",
          "That honesty matters. If a dashboard says a session is expensive, the useful next action is to inspect the session, the model, the cache pattern, and the prompt shape. The exact total can be refined, but the behavior is already visible enough to improve the workflow.",
        ],
      },
      {
        title: "Where it helps",
        body: [
          "Runrate is useful for people who run long agent sessions, compare models, manage rolling windows, or want a better sense of how prompts and repository context affect usage. It is also useful for teams trying to normalize agent usage without turning the conversation into anecdotes.",
          "The broader idea is simple: AI-assisted engineering needs observability too. Not the heavy kind with traces and dashboards for production traffic, but a local operating surface that helps builders see what their tools are doing and decide when to adjust.",
        ],
      },
    ],
    usageSamples: [
      {
        title: "Install",
        language: "bash",
        body: "Runrate is intended to stay local. Install it into the workspace where you want to inspect agent usage.",
        code: `npm install -D @crup/runrate`,
      },
      {
        title: "Start the local dashboard",
        language: "bash",
        body: "Point the dashboard at local usage artifacts and keep it open beside the editor during long agent sessions.",
        code: `npx runrate dev \\
  --source ~/.codex/usage \\
  --workspace ~/Projects/rajender.pro`,
      },
      {
        title: "Generate a local usage report",
        language: "bash",
        body: "Use a time window when you want a shareable local summary without uploading private prompts or workspace metadata.",
        code: `npx runrate report \\
  --since 24h \\
  --group-by workspace,model \\
  --format markdown \\
  --output ./runrate-report.md`,
      },
      {
        title: "Read normalized events in another tool",
        language: "ts",
        body: "The adapter boundary lets another local script consume normalized usage records without depending on provider-specific files.",
        code: `import { readUsageEvents, rollupBySession } from "@crup/runrate";

const events = await readUsageEvents({
  source: "~/.codex/usage",
  since: "7d",
});

const sessions = rollupBySession(events);

for (const session of sessions) {
  console.log(session.workspace, session.model, session.estimatedCostUsd);
}`,
      },
    ],
  },
];

export const skills = [
  {
    name: "Engineering leadership",
    description:
      "Org design, hiring, mentorship, planning, and operating rhythms for teams that need to ship with judgment.",
  },
  {
    name: "Product systems",
    description:
      "Turning ambiguous product goals into architecture, delivery plans, release paths, and measurable outcomes.",
  },
  {
    name: "TypeScript and React",
    description:
      "Platform-level React, Next.js, shared libraries, state, testing, and build workflows without treating UI as the whole job.",
  },
  {
    name: "Backend and data flow",
    description:
      "Node.js, Go, SQL, APIs, queues, and service integration work that keeps product surfaces reliable.",
  },
  {
    name: "Cloud and delivery",
    description:
      "AWS, GCP, Docker, Kubernetes, GitHub Actions, release gates, and pragmatic automation.",
  },
  {
    name: "Quality systems",
    description:
      "Performance budgets, Core Web Vitals, observability, testing, accessibility, and incident feedback loops.",
  },
];

export const experience = [
  {
    company: "Cars24",
    role: "Associate Director",
    dates: "Apr 2024 - Feb 2026",
    description:
      "Progressed from hands-on engineering into leadership across multi-pod product and platform teams. Led 25-30 engineers, owned hiring and delivery systems, and stayed close to architecture across React, Next.js, Node.js, Go, MySQL, AWS, GCP, and observability workflows.",
  },
  {
    company: "Cars24",
    role: "Engineering Manager",
    dates: "Apr 2022 - Mar 2024",
    description:
      "Led product and platform engineering teams across planning, delivery, architecture review, quality systems, and cross-functional execution.",
  },
  {
    company: "Cars24",
    role: "Team Lead",
    dates: "Apr 2021 - Apr 2022",
    description:
      "Led a team through frontend platform work, product delivery, and the transition from individual contribution into team-level ownership.",
  },
  {
    company: "Cars24",
    role: "Frontend Developer",
    dates: "Feb 2019 - Apr 2021",
    description:
      "Built high-traffic web product surfaces and platform foundations with React, TypeScript, performance work, and SEO-sensitive delivery.",
  },
  {
    company: "Avalon Information Systems",
    role: "Senior Software Engineer",
    dates: "Nov 2016 - Feb 2019",
    description:
      "Led a five-person team delivering backend, web, and mobile applications, with direct responsibility for execution planning, releases, Node.js services, React and React Native apps, SQL and NoSQL systems, and AWS delivery pipelines.",
  },
  {
    company: "Opensource and teaching",
    role: "Builder, maintainer, instructor",
    dates: "2018 - Present",
    description:
      "Built public packages, wrote technical learning material, participated in Google Summer of Code with Submitty, and created applied data science course material for DataCamp.",
  },
];

export const repoPosts = [
  {
    title: "Iframe integration needs a runtime contract",
    href: "/blog/iframe-integration-needs-a-runtime-contract/",
    date: "2026-05-16",
    category: "Opensource",
    excerpt:
      "A deep dive into why iframe products need explicit lifecycle, origin, resize, and request/response contracts.",
  },
  {
    title: "React timers are product infrastructure",
    href: "/blog/react-timers-are-product-infrastructure/",
    date: "2026-05-16",
    category: "Opensource",
    excerpt:
      "Timers look like UI detail until deadlines, pause/resume, Strict Mode, polling, and server-owned time make them infrastructure.",
  },
  {
    title: "Local-first telemetry for AI coding agents",
    href: "/blog/local-first-telemetry-for-ai-coding-agents/",
    date: "2026-05-16",
    category: "Opensource",
    excerpt:
      "Agentic coding needs a local instrument panel for token burn, cache behavior, model mix, sessions, and cost shape.",
  },
];

export const workTimeline = [
  {
    title: "Associate Director, Engineering",
    company: "CARS24",
    dates: "2024 - 2026",
  },
  {
    title: "Engineering Manager",
    company: "CARS24",
    dates: "2022 - 2024",
  },
  {
    title: "Team Lead",
    company: "CARS24",
    dates: "2021 - 2022",
  },
  {
    title: "Frontend Developer",
    company: "CARS24",
    dates: "2019 - 2021",
  },
  {
    title: "Senior Software Engineer",
    company: "Avalon Information Systems",
    dates: "2016 - 2019",
  },
];

export const openSource = [
  {
    name: "react-timer-hook",
    href: "https://github.com/crup/react-timer-hook",
  },
  {
    name: "port",
    href: "https://github.com/crup/port",
  },
  {
    name: "runrate",
    href: "https://github.com/crup/runrate",
  },
];
