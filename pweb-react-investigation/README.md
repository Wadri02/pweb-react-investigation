# React Router v6

## What is it?
React Router is the most popular routing library for React, maintained by Remix Software (now part of Shopify). Version 6 was released in November 2021 and introduced significant changes from v5: nested routes as components, `<Outlet>` for shared layouts, improved hooks, and a smarter matching system.

React Router handles navigation in Single Page Applications (SPAs): it allows the URL to change without reloading the page, rendering different components based on the active route and maintaining the illusion of multiple pages in a single application.

Version 6.4 added loaders and actions inspired by Remix, bringing integrated data fetching into the router. This brought React Router closer to what Next.js offered for data.

## What is it used for?
Implementing multi-page navigation in a React SPA. Mapping URLs to components, handling dynamic routes, protecting routes with authentication, and sharing layouts between pages.

In the real world: an app with `/`, `/products`, `/products/:id`, `/cart`, `/admin` where each route renders a different component but shares the same navbar and footer.

## Changes from v5 to v6

| Feature | v5 | v6 |
|---------|----|----|
| Route definition | `<Switch><Route path exact>` | `<Routes><Route>` |
| Matching | First to win | Best match automatically |
| Nested layouts | With react-router-config | Native with `<Outlet>` |
| Redirect | `<Redirect to>` | `<Navigate to>` |
| useHistory | `useHistory()` | `useNavigate()` |
| Parameters | `useParams()` | `useParams()` (same) |
| Relative routes | Manual | Automatic |

## Key Concepts

**BrowserRouter** — Provider that enables URL-based routing using the browser's History API. Wraps the entire app.

**Routes** — Route container in v6. Replaces `<Switch>`. Automatically selects the route that best matches the current URL.

**Route** — Defines the relationship between a path and a component (`element`). Supports dynamic parameters (`/user/:id`) and index routes.

**Outlet** — Placeholder where child routes are rendered. Enables nested layouts: the parent component defines the visual structure and `<Outlet>` inserts the active child.

**Navigate** — Component for declarative redirection. `useNavigate()` is the equivalent Hook for programmatic navigation.

## When to use it?
- Any React SPA with more than one "page".
- When you need URLs that reflect the app's state (bookmarkable, shareable).
- Apps with complex layouts and nested routes.
- Projects already using the React Router/Remix ecosystem.

## When NOT to use it?
- Single-view apps with no navigation.
- If you use Next.js or Remix (they have their own routing).
- If you need strict type-safety for routes with TypeScript: TanStack Router is a better option.

## Is it worth learning?
Yes, React Router remains the de facto standard for SPAs with React. The learning curve for basic routes is low; understanding `<Outlet>` and nested routes for layouts takes a bit more practice. Migrating from v5 to v6 requires rewriting the route configuration. Widely demanded in the job market for any React position.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **React Router v6** (this) | Standard for SPAs, mature ecosystem, existing projects |
| **TanStack Router** | TypeScript-first, type-safe params and search params, new projects |
| **Wouter** | Minimalist routing, very small bundle, no extras |
| **Next.js Router** | Apps with SSR/SSG, automatic file-based routing |

## React Router or TanStack Router?
For new projects with TypeScript, TanStack Router offers complete type-safety: route params, search params, and loader state are typed end-to-end without manual configuration. React Router remains valid and has a larger ecosystem. For projects already using React Router v6, there's no reason to migrate unless type-safety is a real pain point.

## What does the example in this branch do?
`src/App.tsx` configures `BrowserRouter` with multiple nested routes using `<Outlet>`. It demonstrates a shared layout (navbar), routes with dynamic parameters (`:id`), index routes, and programmatic navigation with `useNavigate`.

## How to run
```bash
git checkout feat/react-router
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [React Router v6 — official documentation](https://reactrouter.com/)
- [Official tutorial](https://reactrouter.com/en/main/start/tutorial)
