# Jest

## What is it?
Jest is a JavaScript testing framework created by Facebook/Meta, released in 2014. It is the most popular test runner in the JavaScript ecosystem: it includes runner, assertions, mocking, coverage, and watch mode in a single package with no configuration needed.

Jest is famous for its "zero config" approach: it works without configuration in most JavaScript and TypeScript projects. It uses `jsdom` as a simulated DOM environment, which allows testing browser code without a real browser.

**Important note for this project:** This project uses Vite as a bundler, and the Vite community recommends Vitest instead of Jest. Vitest has the same API as Jest (describe, it, expect, `vi` instead of `jest`), is integrated with Vite, and is significantly faster in Vite projects. What you learn in Jest applies directly to Vitest.

## What is it used for?
Running unit and integration tests quickly with immediate feedback. Mocking modules, timers, and external APIs to isolate the code under test.

In the real world: testing that a utility function returns the correct result, that a React component renders the expected state, or that an API call is made with the correct parameters.

## Types of Tests

| Type | Tests | Speed | Tool |
|------|-------|-------|------|
| **Unit test** | Isolated function or module | ⚡⚡⚡ Very fast | Jest/Vitest only |
| **Integration test** | Multiple modules working together | ⚡⚡ Fast | Jest/Vitest + RTL |
| **E2E test** | Complete user flow in the browser | ⚡ Slow | Cypress / Playwright |

## Key Concepts

**describe** — Groups related tests. Can be nested. For organization: `describe('UserService', () => { ... })`.

**it / test** — Defines an individual test. `it('should return the user by ID', () => { ... })`. `it` and `test` are synonyms.

**expect + matchers** — `expect(value).toBe(expected)` is the basic form. Common matchers: `toBe` (strict equality), `toEqual` (deep equality), `toBeTruthy`, `toContain`, `toThrow`, `toHaveBeenCalledWith`.

**jest.fn()** — Creates a mock function that records its calls. Useful for verifying that a callback was called with the correct arguments.

**jest.mock()** — Replaces an entire module with a mocked version. `jest.mock('./api')` replaces all exports from `./api` with mock functions.

**beforeEach / afterEach** — Setup and teardown per test. `beforeAll` / `afterAll` run once per `describe` block.

## Most Common Matchers

```ts
expect(2 + 2).toBe(4)                    // Strict equality (===)
expect({ a: 1 }).toEqual({ a: 1 })       // Deep equality
expect([1, 2, 3]).toContain(2)            // Array contains the element
expect(fn).toHaveBeenCalled()            // Function was called
expect(fn).toHaveBeenCalledWith('arg')   // Called with that argument
expect(fn).toHaveBeenCalledTimes(3)      // Called N times
expect(() => fn()).toThrow('error')      // Function throws an error
```

## When to use it?
- Unit tests for pure functions, hooks, and utilities.
- Integration tests for React components with RTL.
- In projects not using Vite (CRA, Next.js outside Turbopack).

## When NOT to use it?
- In Vite projects: use Vitest (same API, better integration, faster).
- For E2E: use Cypress or Playwright.

## Is it worth learning?
Yes, even though in Vite projects you'll use Vitest, the API is identical. Learning Jest = learning Vitest. The learning curve is low for basic tests and medium for advanced mocking. Testing is a highly valued skill in the job market, especially in companies with mature development practices.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **Vitest** | Vite projects (this project), same API, much faster |
| **Jest** (this) | CRA, Next.js, non-Vite projects, most mature |
| **Mocha + Chai** | Node.js projects that prefer modularity |
| **Jasmine** | Angular projects (included by default) |

## What does the example in this branch do?
`src/App.tsx` has components with logic that can be tested. The test files (`.test.ts` or `.test.tsx`) demonstrate `describe`, `it`, `expect` with different matchers, `jest.fn()` for mocking callbacks, and `jest.mock()` for isolating modules. Includes examples of unit tests (pure function) and basic integration tests (component with RTL).

## How to run
```bash
git checkout feat/jest-rtl
cd pweb-react-investigation
npm install
npm test        # or npm run test
```

## Official Resources
- [Jest — official documentation](https://jestjs.io/docs/getting-started)
- [Vitest — for Vite projects](https://vitest.dev/)
- [Jest vs Vitest differences](https://vitest.dev/guide/migration.html)
