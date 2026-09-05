---
title: "How to document SignalR hubs in ASP.NET Core"
description: "SignalR hubs are a public API with no Swagger. Here's what XML comments, SignalRSwaggerGen and HubDocs each actually give you — and how to pick between them."
date: "2026-09-06"
tags: ["SignalR", "ASP.NET Core", ".NET", "API documentation"]
published: true
---

Every REST endpoint you write in ASP.NET Core gets documented for free. Add Swashbuckle
or NSwag, hit `/swagger`, and there is a browsable, invokable description of your API that
stays in sync because it is generated from the code.

Now add a SignalR hub. It has methods. Those methods take parameters, return values, and
throw. Other teams call them. It is a public contract in every sense that matters — and
it gets nothing. No generated page, no parameter list, no way to try a call without
writing a client.

The usual answer is a wiki page that is wrong within a month.

This post covers what you can actually do about it: what the framework gives you, what the
two available tools do, and how to choose. I wrote one of those tools, which I will be
explicit about when we get there.

## Why there is no Swagger for SignalR

OpenAPI describes request/response over HTTP. A hub is neither of those things.

A hub is a long-lived, bidirectional connection. The server can call the client. The client
can call the server. A method might stream. A connection belongs to groups that change at
runtime. None of that fits a spec built to describe `POST /orders` returning `201`.

This is not an oversight. It has been [asked for since 2018](https://github.com/aspnet/SignalR/issues/2913)
and [raised against NSwag](https://github.com/RicoSuter/NSwag/issues/691), and the answer
has consistently been that the shapes do not map. So the options are all third-party or
homegrown.

## Option 1: XML comments and discipline

The zero-dependency option. Document the hub like any other class:

```csharp
/// <summary>
/// Real-time order updates for the trading desk.
/// </summary>
public class OrderHub : Hub<IOrderClient>
{
    /// <summary>
    /// Subscribes the caller to updates for a single instrument.
    /// </summary>
    /// <param name="symbol">Instrument symbol, e.g. "EURUSD".</param>
    public async Task Subscribe(string symbol)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, symbol);
    }
}
```

**What you get:** IntelliSense for anyone with the source or a referenced assembly. That is
genuinely useful and costs nothing.

**What you don't:** anything for a consumer who is not writing C# against your assembly.
The front-end team calling this hub from TypeScript sees none of it. Neither does anyone
during an incident at 2am who wants to know what `Subscribe` does without cloning the repo.

Worth doing regardless. It is not documentation for consumers.

## Option 2: SignalRSwaggerGen

[SignalRSwaggerGen](https://www.nuget.org/packages/SignalRSwaggerGen) makes your hubs show
up in the Swagger UI you already have. You decorate hubs and methods, and it emits OpenAPI
operations for them.

```csharp
[SignalRHub]
public class OrderHub : Hub<IOrderClient>
{
    [SignalRMethod("Subscribe", Summary = "Subscribe to instrument updates")]
    public async Task Subscribe(string symbol) { /* ... */ }
}
```

**Strengths.** One documentation surface for the whole API. If your organisation already
publishes a Swagger page and expects everything to be on it, this is the answer — hubs stop
being the exception. It consumes XML comments, so Option 1 is not wasted. And it is a spec
generator, which means the output feeds anything that eats OpenAPI: client codegen,
API portals, contract tests.

**Trade-offs.** You annotate hubs to get output, so documentation coverage is a function of
developer discipline; an undecorated hub is invisible. And because it maps hub methods onto
OpenAPI operations, what you get is a description of methods you *could* call, rendered in a
UI built for request/response. The bidirectional half — what the server pushes back at you —
is not something OpenAPI can express, so it isn't there.

**Pick this if** your priority is one unified spec, or you need the OpenAPI document itself
for tooling downstream.

## Option 3: HubDocs

[HubDocs](https://github.com/mberrishdev/HubDocs) is mine, so read the trade-offs section
with that in mind.

It takes the opposite approach to Option 2: instead of bending hubs into OpenAPI, it
renders a separate Swagger-*like* UI built specifically for hubs. One call wires it up, and
hubs opt in with an attribute.

```csharp
var app = builder.Build();

app.MapHub<ChatHub>("/hubs/chat");

app.AddHubDocs(); // browsable UI, discovers hubs marked [HubDocs]

app.Run();
```

```csharp
[HubDocs]
public class ChatHub : Hub<IChatClient>
{
    // ... your hub methods
}
```

**Strengths.** The UI is shaped like a hub rather than like a controller, and you can invoke
hub methods from the browser, which closes the loop a static page leaves open.

The part I did not anticipate mattering as much as it does is **live client logging**.
Because it understands `Hub<T>`, it shows the messages the server pushes to clients as they
happen. When you are debugging real-time behaviour, "what did the server actually send"
is usually the question, and it is the one a request/response view structurally cannot
answer. As far as I know nothing else does this.

It also emits a `hubdocs.json` document with Swagger-style `info` metadata — title,
version, description, contact, licence — and can scan external assemblies for hubs that
live outside the startup project.

**Trade-offs.** It is a second UI, separate from your Swagger page — if you want one
surface for everything, that is the wrong shape. It is not OpenAPI, so nothing in the
existing OpenAPI toolchain will read it; `hubdocs.json` is its own format.

It does not read your XML comments, so unlike Option 2, the doc comments you wrote in
Option 1 do not carry over — you get method signatures, not prose.

And documentation is opt-in: only hubs marked `[HubDocs]` appear. That is deliberate, since
not every internal hub should be publicly documented, but it means coverage depends on the
attribute the same way SignalRSwaggerGen depends on `[SignalRHub]`. Neither tool
documents a hub nobody remembered to mark.

It is also a much smaller project than Swashbuckle, with correspondingly fewer eyes on it.

**Pick this if** you care about seeing server-to-client traffic while debugging, or want to
invoke hub methods without writing a client.

## Choosing

| | XML comments | SignalRSwaggerGen | HubDocs |
|---|---|---|---|
| Cost to adopt | None | Package + attributes | Package + 1 line + attributes |
| Coverage model | Whoever remembers | Opt-in per hub | Opt-in per hub |
| Visible to non-.NET consumers | No | Yes | Yes |
| Reuses your XML comments | — | **Yes** | No |
| Produces an OpenAPI spec | No | **Yes** | No — its own `hubdocs.json` |
| Invoke methods from browser | No | No | **Yes** |
| Shows server→client messages | No | No | **Yes** |
| Single unified API surface | — | **Yes** | No |

These are not mutually exclusive, and a combination is usually right. Write the XML comments
regardless — they are the only option that helps whoever opens the hub class next.

Beyond that it is a genuine fork. **If your consumers live outside .NET and expect one
spec — or you want the prose from your XML comments to reach them — SignalRSwaggerGen.**
It is the better fit for documentation as a published contract. **If your pain is debugging
real-time behaviour, HubDocs**, because seeing what the server actually pushed is a
different job that OpenAPI cannot express.

If you take one thing from this: **a hub is a public API.** The reason it feels acceptable
to leave it undocumented is that the tooling never made it easy, not that it matters less
than your controllers. It matters exactly as much, and it breaks in ways that are harder
to see.

## Related

- [HubDocs](/projects/hubdocs) — Swagger-like UI for SignalR hubs
- [NotifyHub](/projects/notifyhub) — group- and role-targeted real-time notifications
