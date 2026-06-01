# TanStack Router

## What is it?
TanStack Router is a type-safe routing library for React, created by Tanner Linsley (the same author as TanStack Query). It was published in stable version in 2023 as a response to the lack of type-safety in React Router: in React Router, route params are always `string | undefined` and search params are `Record<string, string>`, with no type inference.

TanStack Router is designed from the ground up for TypeScript: every route, parameter, search param, and loader has automatically inferred types. The IDE knows exactly what params `/users/$userId` has and what their types are.

It also includes native integration with TanStack Query, handling of search params as typed state (replacing `useState` for filters in the URL), and SSR support.

## What is it used for?
Type-safe routing in React/TypeScript applications where correctness of types in navigation is critical. Especially useful when search params are complex (filters, pagination, sorting) and you want them in the URL to be bookmarkable.

In the real world: a product table with category filters, price range, and sorting. With TanStack Router, these filters live in search params with types `{ category: string, minPrice: number, sort: 'asc' | 'desc' }` — inferred, validated, and automatically synced with the URL.

## What does type-safe routing mean?

With React Router (without types):
```tsx
// ❌ Params are string | undefined, no validation
const { userId } = useParams() // userId: string | undefined
navigate('/users/123') // No check that /users/:userId exists
```

With TanStack Router:
```tsx
// ✅ Types inferred from the route definition
const { userId } = Route.useParams() // userId: string (guaranteed)
navigate({ to: '/users/$userId', params: { userId: '123' } }) // TypeScript error if route doesn't exist
```

If you rename a parameter, TypeScript warns you in every place that uses it.

## Key Concepts

**Route Tree** — The route structure is defined as a tree of `createRoute` objects. There is a `rootRoute` and child routes are chained with `createRoute({ getParentRoute })`.

**createRouter** — Combines the route tree into a typed router object. This type is registered globally with `declare module` so the entire app shares the same types.

**Route.useParams** — Hook on the `Route` object itself (not the generic router) that returns the typed parameters for that specific route.

**Route.useSearch** — Similar to `useParams` but for search params. Types are defined with a `validateSearch` that can use Zod for validation.

**Loaders** — Each route can have a `loader` that fetches data before rendering. Integrates with TanStack Query for prefetch and caching.

## When to use it?
- TypeScript projects where type-safety in navigation matters.
- Apps with complex search params that you need typed and in the URL.
- When starting a new project and you want the best TypeScript DX.
- Teams already using TanStack Query who want native integration.

## When NOT to use it?
- JavaScript projects without TypeScript (loses its main advantage).
- Apps with already established React Router v6 without type pain points.
- If the team isn't familiar with the initial configuration (more verbose than React Router).

## Is it worth learning?
For new TypeScript projects, yes. The initial setup is more complex than React Router, but the resulting DX is superior. Job market demand is still lower than React Router, but growing fast. In 2024-2025 it became the community recommendation for TypeScript-first projects.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **TanStack Router** (this) | TypeScript-first, typed search params, new project |
| **React Router v6** | Mature ecosystem, existing project, no need for strict types |
| **Next.js Router** | SSR/SSG, file-based routing, full meta-framework |
| **Wouter** | Minimalist, no advanced TypeScript, very small bundle |

## TanStack Router or React Router?
If the project uses TypeScript and you're starting from scratch, TanStack Router offers an unmatched type experience. Route errors are caught at compile time, refactors are safe, and typed search params replace the manual `useState` + `URLSearchParams` pattern. React Router remains valid for existing projects and teams that value familiarity. The key decision is: how much TypeScript strictness do you want in your navigation?

## What does the example in this branch do?
`src/App.tsx` defines a route tree with `createRootRoute` and nested routes, registers the router with global types, and demonstrates typed navigation with `useNavigate` and `Link`. It shows how dynamic parameters and search params are inferred by TypeScript.

## How to run
```bash
git checkout feat/tanstack-router
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [TanStack Router — official documentation](https://tanstack.com/router/latest)
- [Quick start guide](https://tanstack.com/router/latest/docs/framework/react/quick-start)
