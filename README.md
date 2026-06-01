# Formik

## What is it?
Formik is a library for handling forms in React, created by Jared Palmer and released in 2017. It was the first popular solution that unified state management, validation, and form submission in React, solving the problem of writing the same `useState` + `onChange` + validation boilerplate for every form.

Formik adopts the controlled inputs model: all form values live in React state (in `formik.values`), and each field change triggers a state update. This model is intuitive and predictable, but has a performance cost in large forms.

Although React Hook Form surpassed it in adoption and performance, Formik is still widely used in existing projects and continues to be maintained. For new projects, the community tends to recommend RHF.

## What is it used for?
Unifying state management, validation, and form submission. Eliminates the per-field `useState` + `onChange` boilerplate, provides access to typed errors and the "touched" state of each field.

In the real world: registration forms, login, profile settings, or any data form with validation across multiple fields.

## Key Concepts

**values** — Object with the current values of all fields. Lives in Formik's internal state and updates on every change. Accessed as `formik.values.email`.

**errors** — Object with error messages for each field. Only populated after the field has been touched (or on submit). Accessed as `formik.errors.email`.

**touched** — Object that records which fields the user has already visited (on blur). Used to show errors only on fields the user has interacted with, avoiding showing all errors on load.

**handleChange / handleBlur** — Formik handlers that update `values` and `touched` respectively. Passed to the input: `onChange={formik.handleChange}`.

**handleSubmit** — Submit wrapper that validates the entire form before calling `onSubmit`. If there are errors, it doesn't call the callback.

## useFormik vs Formik component

| Aspect | `useFormik()` | `<Formik>` (component) |
|--------|---------------|------------------------|
| API | Hook, everything explicit | Render props / children as function |
| Field integration | Manual | `<Field>` and `<ErrorMessage>` available |
| Boilerplate | Medium | Low with `<Field>` |
| Readability | Clear | More declarative |
| Internal context | Doesn't expose Context | Exposes context for child components |

`useFormik` is simpler for forms in a single component. The `<Formik>` component with `<Field>` and `<ErrorMessage>` is more comfortable for forms split across multiple sub-components.

## When to use it?
- Projects already using Formik that are working well.
- When the team knows Formik and prefers the controlled inputs model.
- For developers coming from Angular who are used to reactive forms.
- Simple to medium forms where performance isn't a concern.

## When NOT to use it?
- New projects: prefer React Hook Form.
- Forms with many fields where a re-render on every keystroke is a problem (mobile, 20+ field forms).
- When you need Zod validation integrated cleanly (RHF + zodResolver is more direct).

## Is it worth learning?
For new projects, it's not the first choice. However, Formik is in many existing projects and knowing how to read and modify Formik code has practical value. The learning curve is low: the `values/errors/touched` model is intuitive. If you learn React Hook Form first, Formik will be easy to understand when you encounter it in a legacy project.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **React Hook Form** | New projects, better performance, better TypeScript |
| **Formik** (this) | Existing projects, familiar team, intuitive model |
| **Manual useState** | 1-2 field forms without complex validation |

## Formik or React Hook Form?
Honestly: React Hook Form has better performance (uncontrolled inputs, no re-renders per keystroke), smaller bundle size (~9kb vs ~13kb), and better TypeScript and Zod integration. Formik is more intuitive for beginners because the controlled inputs model is closer to how React teaches state management.

For a new project, choose React Hook Form. If you're working on a project with Formik, there's no reason to migrate it if it works well. If performance is a concrete problem (heavy forms, mobile), then consider migrating to RHF.

## What does the example in this branch do?
`src/App.tsx` implements a form with `useFormik` or the `<Formik>` component, with text fields, Yup validation, `touched` handling to show errors, and the complete submit flow. It shows the difference between `formik.errors` and `formik.touched` for correct UX.

## How to run
```bash
git checkout feat/formik
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [Formik — official documentation](https://formik.org/)
- [Formik + Yup tutorial](https://formik.org/docs/guides/validation#yup)
