# React Testing Library

## What is it?
React Testing Library (RTL) is a testing library for React components, created by Kent C. Dodds and released in 2018. Its core philosophy is: "The more your tests resemble the way your software is used, the more confidence they can give you."

RTL does not test implementation: it doesn't access the component's internal state, doesn't search by CSS class names, doesn't call component methods directly. Instead, it tests behavior: what the user sees, what they can do, what happens when they do it.

It replaced Enzyme (the previous React testing library) which allowed shallow rendering and inspecting internal state. RTL is opinionated: if you can't test something with RTL, the component is probably poorly designed from the user's perspective.

## What is it used for?
Testing React components from the user's perspective: render the component, interact with it (clicks, typing, form submissions), and verify that the DOM shows the correct output.

In the real world: testing that an "Add to Cart" button adds the item and updates the counter, regardless of whether it internally uses `useState` or Zustand.

## Philosophy: test behavior not implementation

```tsx
// ❌ Testing implementation (fragile, breaks on refactors)
const wrapper = shallow(<Button />)
expect(wrapper.state('isClicked')).toBe(true)
expect(wrapper.find('.btn-class')).toHaveLength(1)

// ✅ Testing behavior (robust, reflects what the user sees)
render(<Button />)
userEvent.click(screen.getByRole('button', { name: /add/i }))
expect(screen.getByText('1 item in cart')).toBeInTheDocument()
```

If you refactor `useState` to Zustand, the behavior test keeps passing.

## Queries in order of preference

RTL offers multiple queries. Using them in this order ensures your tests are accessible:

| Priority | Query | Use when... |
|----------|-------|------------|
| 1 (most preferred) | `getByRole` | Element has an ARIA role (button, link, heading, etc.) |
| 2 | `getByLabelText` | Input associated with a label (forms) |
| 3 | `getByPlaceholderText` | Input without label but with placeholder |
| 4 | `getByText` | Element with visible text |
| 5 | `getByDisplayValue` | Input with current value |
| 6 | `getByAltText` | Image with alt text |
| 7 | `getByTitle` | Element with title attribute |
| 8 (least preferred) | `getByTestId` | Only when nothing else works |

## Key Concepts

**get / query / find** — Variants of each query:
- `getBy...` — Returns the element or throws an error if not found. Use it when the element must be present.
- `queryBy...` — Returns the element or `null`. Use it to verify something is NOT there: `expect(queryByText('Error')).not.toBeInTheDocument()`.
- `findBy...` — Returns a promise. Use it for elements that appear asynchronously.

**userEvent vs fireEvent** — `userEvent` (from `@testing-library/user-event`) simulates real user interactions: typing fires keydown + keypress + input + keyup. `fireEvent` is low-level and only fires a single event. Always prefer `userEvent`.

**render** — Renders the component in a virtual DOM (jsdom). Returns queries and the `container`.

**screen** — RTL's global object that contains all queries on the rendered DOM. Preferred over destructuring from `render`.

**waitFor** — Waits for an assertion to pass, useful for async side effects.

## When to use it?
- For all React component tests (alongside Jest or Vitest as the runner).
- When you want tests to be robust against internal refactors.
- For implicitly testing accessibility (`getByRole` forces you to have correct roles).

## When NOT to use it?
- For unit tests of pure functions or hooks without UI: Jest/Vitest alone is sufficient.
- For E2E: Cypress or Playwright are more appropriate.

## Is it worth learning?
Absolutely. RTL is the standard for React component testing. The learning curve is medium: understanding the mental model (test behavior, not implementation) and async queries requires practice. Once the paradigm is internalized, tests are written quickly and are very robust. High job market demand in companies with a testing culture.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **React Testing Library** (this) | Standard for unit/integration of React components |
| **Enzyme** | Legacy projects on React < 17, shallow rendering |
| **Cypress Component Testing** | Component tests with a real browser |
| **Playwright** | Component testing closer to E2E |

## What does the example in this branch do?
`src/App.tsx` contains components with interactions (buttons, forms, lists). The tests demonstrate `render`, queries with `screen.getByRole` and `screen.getByText`, interactions with `userEvent`, assertions with `toBeInTheDocument()`, and the `findBy` pattern for elements that appear after an async action.

## How to run
```bash
git checkout feat/rtl
cd pweb-react-investigation
npm install
npm test
```

## Official Resources
- [React Testing Library — official documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Queries — priority guide](https://testing-library.com/docs/queries/about#priority)
- [user-event v14](https://testing-library.com/docs/user-event/intro)
