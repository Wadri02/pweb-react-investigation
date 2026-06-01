# MobX

## What is it?
MobX is a reactive state management library for JavaScript and TypeScript, created by Michel Weststrate in 2015. It is one of the most mature state libraries in the React ecosystem and is widely used in enterprise applications. Its philosophy is based on reactive programming: instead of describing how to update state, you describe relationships between data and MobX automatically propagates changes.

MobX works with the observable/observer pattern: state objects are observable, and components that read them are observers. When an observable changes, all its observers update automatically. This is achieved through JavaScript proxies that track which properties are read and when they change.

Unlike Zustand (which is functional), MobX adopts an imperative object-oriented model: you can mutate state directly and MobX tracks it.

## What is it used for?
Managing complex state with relationships between data, where multiple derived values depend on a single source of truth. Ideal when the problem domain naturally fits an object model.

In the real world: a task management application where the total completed tasks, the progress percentage, and filtered tasks are automatically derived from the main array. With MobX `computed`, these values recalculate only when the array changes.

## Key Concepts

**observable** — Marks a value (object, array, Map, primitive) as observable. Any change in it notifies observers. With the modern API, you use `makeAutoObservable` in the class.

**observer** — HOC or MobX-React function that wraps a React component. The component re-renders only when the observables it read during the last render change.

**action** — Function that modifies observables. MobX groups all mutations in an action as an atomic transaction, avoiding intermediate renders.

**computed** — Value derived from observables. Recalculates automatically and only when its dependencies change. Works like a memoized getter.

**reaction / autorun** — Side effects that run automatically when their observables change. `autorun` runs immediately; `reaction` runs when a specific value changes.

## Imperative State (MobX) vs Functional (Zustand)

| Aspect | MobX (imperative) | Zustand (functional) |
|--------|-------------------|---------------------|
| Mutation | Direct: `store.count++` | With setter: `set(s => ({count: s.count + 1}))` |
| Derivations | Automatic `computed` | Manual with selectors |
| Dependency tracking | Automatic via proxies | Manual (dev decides what to watch) |
| Boilerplate | Low with `makeAutoObservable` | Very low |
| Debugging | More complex (proxy magic) | More predictable |
| Paradigm | OOP / reactive | Functional / explicit |

## When to use it?
- Complex domains with many data relationships (finance, simulations, spreadsheets).
- Teams with OOP background who prefer the class model.
- When you have many derived values (`computed`) that depend on each other.
- Enterprise apps with rich domain models.

## When NOT to use it?
- Simple or medium projects where Zustand is sufficient.
- Teams that prefer the functional paradigm.
- When proxy "magic" makes debugging harder for the team.
- Apps with a lot of server state: combining it with TanStack Query is better than using it for everything.

## Is it worth learning?
MobX has a medium learning curve: the observable/computed/action concepts are simple, but understanding when React re-renders and how to avoid reactivity issues requires experience. It's still highly demanded in enterprise projects that adopted it before Zustand became popular. For new projects, the market trend has favored Zustand.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **MobX** (this) | OOP, many derived values, complex domain, enterprise project |
| **Zustand** | Simple functional API, better default performance, less "magic" |
| **Redux Toolkit** | Large teams, full DevTools, middlewares |
| **Context API** | No dependencies, static state |

## MobX or Zustand?
For new projects, Zustand is the default recommendation: simpler, more predictable, better aligned with modern React's functional paradigm. MobX is the right choice when the domain model is complex and object-oriented, or when the team has prior experience with the reactive pattern (RxJS, Angular, Vue 2). There is no universal answer: if the domain naturally fits the observable model, MobX can be more natural than forcing everything into pure functions.

## What does the example in this branch do?
`src/App.tsx` defines a MobX store with `makeAutoObservable`, exposing observables and actions. Components are wrapped with `observer` from `mobx-react-lite` to automatically subscribe to changes. The example shows the difference between direct mutation and optimized render updates.

## How to run
```bash
git checkout feat/mobx
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [MobX — official documentation](https://mobx.js.org/)
- [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite)
