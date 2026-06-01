# TanStack Query

## What is it?
TanStack Query (formerly React Query) is a library for managing server state in React applications. It was created by Tanner Linsley and released in 2019. In 2022 it was renamed TanStack Query v4 and became framework-agnostic (supporting Vue, Svelte, Angular in addition to React).

The problem it solves: most developers use `useState` + `useEffect` to fetch data, but this requires manually handling loading, error, cache, revalidation, request deduplication, and synchronization. TanStack Query resolves all of this with a declarative API.

The fundamental distinction it introduces is the difference between **client state** (what the user sees/interacts with: forms, UI state) and **server state** (data that lives in a remote database). These are different categories with different needs: server state requires synchronization, caching, and periodic updates.

## What is it used for?
Fetching, caching, synchronizing, and updating server data. Eliminates the manual `useEffect` + `useState` pattern for data fetching.

In the real world: a product list that loads on mount, refreshes when the user returns to the tab, shows a spinner while loading, displays errors on failure, and automatically updates after adding a new product.

## Why NOT to use useEffect for fetching

```tsx
// ❌ The manual pattern has problems
useEffect(() => {
  setLoading(true)
  fetch('/api/users')
    .then(r => r.json())
    .then(data => setUsers(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false))
}, []) // No cache, no deduplication, no revalidation, possible race conditions
```

```tsx
// ✅ With TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
})
// Automatic cache, deduplication, focus revalidation, automatic retry
```

## Key Concepts

**queryKey** — Unique array that identifies the query in the cache. When it changes, an automatic refetch is triggered. Example: `['users', userId]` for a specific user.

**queryFn** — Async function that returns data. Can be any promise: fetch, axios, GraphQL, etc.

**staleTime** — Time in ms that data is considered fresh. During that time no refetch occurs even if the component mounts again. Default: 0 (always stale).

**invalidateQueries** — Marks queries as stale and triggers a refetch. Used after mutations to update server data in the cache.

**useMutation** — Hook for data-modifying operations (POST, PUT, DELETE). Has `onSuccess`, `onError`, `onSettled` callbacks to react to the result.

## Server State vs Client State

| Aspect | Server State | Client State |
|--------|-------------|-------------|
| Origin | Remote database | User interaction |
| Synchronization | Needed (may be stale) | Not needed |
| Tool | TanStack Query | useState, Zustand |
| Examples | User list, products, posts | Active filter, open modal, form inputs |

## When to use it?
- Whenever you fetch data in a React app.
- Apps with CRUD operations where the UI needs to sync with the server.
- When you need caching, pagination, infinite scroll, or prefetching.

## When NOT to use it?
- Apps without a backend (client-only state).
- If your fetch is extremely simple and you don't need caching or synchronization.
- For pure client state (forms, UI): use `useState` or Zustand.

## Is it worth learning?
Yes, it's one of the most impactful libraries for DX in React. The learning curve for `useQuery` is low. `useMutation` with invalidation requires understanding the cache model, which takes a bit more time. Highly demanded in the job market, especially in combination with Next.js or React with a REST/GraphQL backend.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **TanStack Query** (this) | Cache, sync, auto-refetch, REST/any API |
| **SWR** | Simpler API, only need basics, smaller bundle |
| **RTK Query** | Already using Redux Toolkit, want everything integrated |
| **Apollo Client** | API is specifically GraphQL |
| **Manual useEffect** | One-off script, no cache, no team |

## What does the example in this branch do?
`src/App.tsx` configures `QueryClientProvider` and uses `useQuery` to fetch data from a public API (like JSONPlaceholder) showing loading and error states. It may also include `useMutation` to add or delete an item with automatic cache invalidation.

## How to run
```bash
git checkout feat/tanstack-query
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [TanStack Query — official documentation](https://tanstack.com/query/latest)
- [Why TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
