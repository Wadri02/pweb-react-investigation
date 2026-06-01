# Context API and useContext

## What is it?
Context API is React's built-in global state system, available since React 16.3. It was created by the Meta team to solve the prop drilling problem: passing data through multiple levels of components that don't need it directly, just to get it to a deeply nested component.

The `useContext` Hook (React 16.8) simplified context consumption, eliminating the need for the verbose `Consumer` render props pattern.

Unlike external libraries like Zustand or Redux, Context API is not a state manager: it's a dependency injection mechanism. It does not automatically optimize re-renders.

## What is it used for?
Sharing data that is "global" to a component tree without passing it manually prop by prop. Ideal use cases: visual theme (dark/light), language/i18n, authenticated user, configuration preferences.

In the real world: an app with dozens of components that need to know if the user is logged in. Without Context, you'd pass `user` as a prop through 5 levels. With Context, any component can consume it directly with `useContext(AuthContext)`.

## The problem it solves: prop drilling

```
App (has user)
  └── Layout (receives user, just to pass it down)
        └── Sidebar (receives user, just to pass it down)
              └── UserMenu (needs user ← where it's actually used)
```

With Context, `UserMenu` calls `useContext(AuthContext)` and accesses `user` without `Layout` or `Sidebar` knowing it exists.

## Key Concepts

**createContext** — Creates the context object. Accepts a default value used when there is no parent Provider.

**Provider** — Component that wraps the tree and provides the value. Any change in the value re-renders all consumers.

**useContext** — Hook that consumes the nearest context of the indicated type. If the value changes, the component re-renders.

**Context composition** — It's normal to have several independent contexts (`ThemeContext`, `AuthContext`, `LanguageContext`). Separating them avoids unnecessary re-renders.

**Value memoization** — If the Provider's value is an object created on render, memoizing it with `useMemo` prevents cascading re-renders from new references.

## When to use it?
- Data that changes rarely but is read in many places: theme, language, user.
- To avoid prop drilling across more than 2-3 levels.
- When you don't want to add an external dependency for something simple.
- Dependency injection in tests (mocking the Provider).

## When NOT to use it?
- State that changes frequently (real-time counters, filtered lists): every change re-renders all consumers.
- Complex business logic with many actions: Zustand or Redux scale better.
- If the app grows and you start seeing performance issues from re-renders, that's a sign to migrate to Zustand.

## Is it worth learning?
Yes, and it's mandatory for understanding React in depth. Context API is included in React, adds no bundle weight, and is sufficient for small to medium projects. The learning curve is low. However, for apps with complex state or frequent updates, Zustand surpasses it in ergonomics and performance with minimal added complexity.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **Context API** (this) | Static/semi-static data, no external dependencies, simple projects |
| **Zustand** | Frequently changing state, multiple actions, better performance, simpler API |
| **Redux Toolkit** | Enterprise apps, large teams, need for devtools and middlewares |
| **Jotai/Recoil** | Atomic state with fine-grained update granularity |

## Context API or Zustand?
For rarely changing data (theme, logged-in user), Context API is sufficient and adds no dependencies. For UI state that changes frequently or involves business logic, Zustand is better: its selectors avoid unnecessary re-renders, the API is cleaner, and the extra bundle is minimal (~1kb gzip).

## What does the example in this branch do?
`src/App.tsx` demonstrates Context API with a real use case: a `ThemeContext` or `AuthContext` that shares data between sibling components without prop drilling. It shows context creation, the Provider wrapping the tree, and multiple consumer components using `useContext`.

## How to run
```bash
git checkout feat/context
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [createContext — react.dev](https://react.dev/reference/react/createContext)
- [useContext — react.dev](https://react.dev/reference/react/useContext)
- [Passing Data Deeply with Context — react.dev](https://react.dev/learn/passing-data-deeply-with-context)
