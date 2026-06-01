# Zustand

## What is it?
Zustand is a minimalist state management library for React, created by Daishi Kato and the Poimandres team (the same authors behind Jotai and Valtio). The name means "state" in German. It was published in 2019 as a response to Redux's complexity and Context API's limitations for frequently updated state.

Zustand's philosophy is "bear necessities": a small API, no boilerplate, no mandatory providers, and selective updates to avoid unnecessary re-renders. Its minified and compressed size is approximately 1kb.

Internally, Zustand uses React's `useSyncExternalStore` to subscribe to store changes, which guarantees compatibility with React 18+'s concurrent mode.

## What is it used for?
Managing shared global state between components that don't have a direct parent-child relationship, with better performance than Context API for frequently changing data.

In the real world: a shopping cart with products, quantity, and total that multiple components (header, sidebar, modal) need to read and modify. With Zustand, each component subscribes only to the part of the state it uses.

## Key Concepts

**create** — The main function. Takes a callback that returns the initial state and actions. Returns a custom Hook.

**Selector** — Function passed to the store Hook that picks which part of the state to use. The component only re-renders when that part changes: `const count = useStore(s => s.count)`.

**set** — Function injected into the store to update state. Performs an automatic shallow merge, no need to spread previous state.

**get** — Function injected to read the current state inside actions. Useful for logic that depends on previous state.

**Middleware** — Zustand has official middleware for persistence (`persist`), DevTools integration (`devtools`), and Immer for immutable mutations (`immer`).

## When to use it?
- Global state that changes frequently (interactive UI, filters, cart).
- Multiple disconnected components sharing data.
- When Context API generates excessive re-renders.
- As a Redux replacement in projects that don't need its full infrastructure.

## When NOT to use it?
- Local component state: use `useState`.
- Server data (fetching, caching): use TanStack Query.
- Very simple projects where Context API is enough.
- If the team is already standardized on Redux with complex middleware use cases.

## Is it worth learning?
Absolutely. Zustand is today the most popular state library in the modern React ecosystem, surpassing Redux in new projects according to community surveys. The learning curve is very low: you can have a working store in 10 lines. Job market demand is high and growing.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **Zustand** (this) | Simple API, performance, modern projects, small/medium team |
| **Context API** | No dependencies, static data, very simple project |
| **MobX** | Prefer reactive/observable state, natural fit for OOP |
| **Redux Toolkit** | Enterprise apps, large team, complex middlewares, DevTools |
| **Jotai** | Fine-grained atomic state, no centralized store |

## Zustand, MobX, or useContext?

**Zustand vs Context API:** Zustand wins on performance (selectors avoid re-renders), ergonomics (no Provider needed), and scalability. Context API wins on zero dependencies.

**Zustand vs MobX:** Zustand is functional and explicit — you know exactly when state changes. MobX is reactive and magical — mutations are tracked automatically. Zustand is more predictable and easier to debug; MobX has less boilerplate for very complex states with relationships between data.

**Recommendation:** For new projects, Zustand is the default choice. MobX only if the team has prior experience or if the domain naturally fits the reactive model (e.g., simulation apps, spreadsheets).

## What does the example in this branch do?
`src/App.tsx` defines a Zustand store with state and actions (for example, a counter with increment/decrement/reset, or a basic cart). It shows how multiple components consume the same store with independent selectors and how actions modify the global state.

## How to run
```bash
git checkout feat/zustand
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Official Documentation](https://zustand.docs.pmnd.rs/)
