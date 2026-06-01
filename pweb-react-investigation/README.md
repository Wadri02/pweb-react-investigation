# Cypress

## What is it?
Cypress is an end-to-end (E2E) testing tool for web applications, created by Brian Mann and released in 2017. Unlike previous tools like Selenium, Cypress runs directly inside the browser, giving it native access to the DOM, network, storage, and browser events.

Its architecture enables automatic test videos, screenshots on failures, time-travel debugging (viewing the DOM state at each test step), and a visual interface that shows what the test is doing in real time.

Cypress also offers Component Testing for testing isolated React components with a real browser, but its primary use is E2E: simulating a real user navigating the complete app.

## What is it used for?
Testing complete user flows as they happen in the browser: opening the app, navigating, clicking, filling forms, verifying that content changes. Catches bugs that unit and integration tests can't: layout issues, network errors, browser-specific behavior.

In the real world: testing that a user can register, log in, add a product to the cart, go to checkout, complete payment, and see the confirmation — all in the real browser.

## Difference between test types

| Type | Level | Speed | Confidence | Tool |
|------|-------|-------|------------|------|
| **Unit test** | Isolated function/module | ⚡⚡⚡ Very fast | Medium | Jest/Vitest |
| **Integration test** | Multiple modules together | ⚡⚡ Fast | High | RTL + Vitest |
| **E2E test** | Complete app in browser | ⚡ Slow | Very high | Cypress/Playwright |

The test pyramid recommends many unit tests, some integration tests, and few well-chosen E2E tests.

## Why use data-cy for selectors

```tsx
// ❌ Fragile: breaks if you change CSS or text
cy.get('.btn-primary')               // Depends on CSS class
cy.contains('Add to Cart')          // Depends on text (changes with i18n)

// ✅ Robust: attribute exists only for tests
cy.get('[data-cy="add-to-cart-btn"]')  // Doesn't change with UI refactors
```

`data-cy` (or `data-testid`) is an HTML attribute with no meaning to the browser or CSS. It communicates to devs that the element is used in tests and shouldn't be removed without updating the tests.

## Key Concepts

**cy.visit** — Navigates to a URL. The entry point for most tests: `cy.visit('/')`.

**cy.get** — Selects DOM elements. Accepts any CSS selector or `[data-cy="name"]`.

**cy.contains** — Finds an element containing the given text. Useful for verifying visible content.

**.should()** — Chained assertion. Cypress automatically retries until it passes or times out: `cy.get('[data-cy="title"]').should('have.text', 'Welcome')`.

**.type()** — Simulates typing in an input: `cy.get('input[name="email"]').type('user@test.com')`.

**.click()** — Simulates a click: `cy.get('[data-cy="submit"]').click()`.

**intercept** — Intercepts network requests to mock responses: `cy.intercept('GET', '/api/users', { fixture: 'users.json' })`.

## When to use it?
- Critical flows that must always work: login, registration, checkout, form submissions.
- When you want confidence that the app works in the real browser, not just in jsdom.
- Regression testing on important features before deploying.

## When NOT to use it?
- For testing function logic: too slow, use Jest/Vitest.
- For covering all edge cases of a component: too costly, use RTL.
- Don't replace unit tests with E2E: E2E tests are for happy paths and critical flows.

## Is it worth learning?
Yes, Cypress is the most popular E2E standard and its DX is excellent. The learning curve for basic commands is low; `intercept` for mocking APIs and handling async timing has a medium curve. Highly valued in teams with mature QA practices.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **Cypress** (this) | Excellent DX, visual debugging, very popular |
| **Playwright** | Multi-browser (Cypress was Chromium-first), faster in CI, Microsoft |
| **Selenium** | Legacy projects, legacy multi-browser support |
| **Puppeteer** | Low-level Chrome control, not a testing framework |

## What does the example in this branch do?
The test files in `cypress/e2e/` demonstrate `cy.visit`, `cy.get` with `data-cy` selectors, `.type()`, `.click()`, `.should()` for assertions, and the complete flow of at least one app feature. The code in `src/App.tsx` includes `data-cy` attributes on the elements used by the tests.

## How to run
```bash
git checkout feat/cypress
cd pweb-react-investigation
npm install
npm run dev          # In one terminal (Cypress needs the app running)
npx cypress open     # In another terminal (opens the visual interface)
# or headless:
npx cypress run
```

## Official Resources
- [Cypress — official documentation](https://docs.cypress.io/)
- [Cypress best practices](https://docs.cypress.io/guides/references/best-practices)
- [Playwright (alternative)](https://playwright.dev/)
