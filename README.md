# React Hooks

## What is it?
Hooks are special React functions that allow you to use state, effects, and other React features in functional components. They were introduced in React 16.8 (February 2019) by the Facebook/Meta team as a response to the problems with class components: hard-to-reuse logic, bloated components, and confusing classes for beginners.

Before Hooks, if a functional component needed state or side effects, you had to convert it to a class. Hooks eliminated that need and are today the canonical way to write React.

React 19 introduced new Hooks focused on actions and transitions, consolidating the async data model into the framework.

## What is it used for?
Hooks allow you to encapsulate and reuse stateful logic between components without needing HOCs or render props. Each Hook has a specific purpose: `useState` for local state, `useEffect` for syncing with external systems, `useContext` for consuming context, `useMemo`/`useCallback` for performance optimization.

In the real world: a custom `useAuth()` Hook can encapsulate all session logic (token, refresh, logout) and be reused in any component that needs it.

## Key Concepts

**Rules of Hooks** — Only called at the top level of a functional component or inside another Hook. Never inside conditionals, loops, or nested functions.

**useState** — Stores a value and forces a re-render when it changes. Returns the current value and a setter. The setter can receive the new value or an updater function `prev => next`.

**useEffect** — Runs a side effect after render. The dependency array controls when it re-runs: `[]` only on mount, `[dep]` when `dep` changes, no array on every render. Returns an optional cleanup function.

**Custom Hooks** — Functions starting with `use` that can call other Hooks. They are the unit of reusable stateful logic in React.

**useRef** — Holds a mutable value that doesn't trigger re-renders. Used for DOM references and values that persist between renders without causing updates.

## All Hooks Table

| Category | Hook | Purpose |
|----------|------|---------|
| **State** | `useState` | Simple local state |
| **State** | `useReducer` | Complex state with actions |
| **Context** | `useContext` | Consume a React context |
| **Ref** | `useRef` | Mutable reference / DOM access |
| **Ref** | `useImperativeHandle` | Expose child methods to parent |
| **Effect** | `useEffect` | Sync with external systems |
| **Effect** | `useLayoutEffect` | Synchronous effect before paint |
| **Effect** | `useInsertionEffect` | Inject styles (for CSS-in-JS libraries) |
| **Performance** | `useMemo` | Memoize a computed value |
| **Performance** | `useCallback` | Memoize a function reference |
| **Transition** | `useTransition` | Mark a state update as non-urgent |
| **Transition** | `useDeferredValue` | Defer updating a value |
| **Other** | `useId` | Generate a stable unique ID (SSR-safe) |
| **Other** | `useDebugValue` | Label custom Hooks in DevTools |
| **Other** | `useSyncExternalStore` | Subscribe to external stores |
| **React 19** | `useActionState` | State + async action (replaces useFormState) |
| **React 19** | `useFormStatus` | Parent form state (pending, etc.) |
| **React 19** | `useOptimistic` | Optimistic update before confirmation |
| **React 19** | `use` | Read promises and contexts in render |

## useState vs useReducer

| Criteria | useState | useReducer |
|----------|----------|------------|
| State complexity | Simple (string, number, boolean) | Object with multiple sub-values |
| Update logic | Direct | With complex conditional logic |
| Next states | Independent of each other | Depend on previous state |
| Testing | Hard to test the logic | Reducer is a pure function, easy to test |
| Readability | Simpler | More explicit with named actions |

**Practical rule:** If you find yourself writing multiple related `setState` calls in the same event, consider `useReducer`.

## When to use it?
- Always: Hooks are the standard way to write modern React components.
- To extract reusable logic, create Custom Hooks instead of duplicating `useState`/`useEffect`.
- When you need to encapsulate complex behavior (forms, fetch, timers, subscriptions).

## When NOT to use it?
- There are no cases where you wouldn't use Hooks in modern React. Class components are still valid but no longer recommended.
- Don't create Custom Hooks prematurely for logic that's only used in one place.

## Is it worth learning?
Learning Hooks is mandatory for working with React. The learning curve for `useState` and `useEffect` is low; understanding `useEffect` dependencies and avoiding infinite loops has a medium curve. Performance Hooks (`useMemo`, `useCallback`) are learned when real performance issues arise. Job market demand is very high: any junior or senior React position requires mastering them.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| Class components | Legacy projects that aren't migrating |
| Svelte stores | If you switch frameworks |
| Vue Composition API | If you use Vue 3 |

## What does the example in this branch do?
`src/App.tsx` demonstrates the most important Hooks in interactive examples: `useState` with a counter, `useEffect` with a timer or fetch, `useRef` with a DOM reference, `useMemo` and `useCallback` with memoization examples, and `useReducer` with more complex state. Each example is isolated to show the Hook without distractions.

## How to run
```bash
git checkout feat/hooks
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [Hooks Reference — react.dev](https://react.dev/reference/react/hooks)
- [Learn about Hooks — react.dev](https://react.dev/learn/state-a-components-memory)
