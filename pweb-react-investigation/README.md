# React Hook Form

## What is it?
React Hook Form (RHF) is a library for handling forms in React, created by Beier (Bill) Luo and released in 2019. Its core design is the use of uncontrolled inputs: instead of managing each field with `useState` and `onChange`, RHF registers inputs directly with the DOM using `ref`, and only reads their values when the form is submitted or when explicitly requested.

This has an enormous consequence: re-renders are minimal. In a 20-field form with Formik or `useState`, every keystroke triggers a re-render of the entire form. With RHF, typing in a field re-renders nothing, unless you use `watch`.

At ~9kb gzip, RHF is significantly lighter than Formik. Version 7 (2021) requires React 16.8+ and fully leverages the Hooks model.

## What is it used for?
Managing form state, validation, and submission with minimal boilerplate and maximum performance. Ideal for complex forms with many fields, conditional validations, or where performance matters.

In the real world: a checkout form with 15 fields, complex validations, and a submit button that should only be enabled when everything is valid.

## Why it minimizes re-renders (uncontrolled inputs)

```tsx
// ❌ Controlled: re-render on EVERY keystroke
const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />

// ✅ RHF: no re-render while typing
const { register } = useForm()
<input {...register('name')} /> // DOM manages the value, RHF reads it via ref
```

## Key Concepts

**useForm** — Main Hook. Returns `register`, `handleSubmit`, `watch`, `setValue`, `getValues`, `formState`, `reset`, and more. Accepts `defaultValues` and `resolver` for validation.

**register** — Connects an input to RHF. Returns `ref`, `name`, `onChange`, `onBlur`. Used as `{...register('fieldName', { required: true, minLength: 3 })}`.

**handleSubmit** — Submit wrapper that validates before calling the handler. Only calls the callback if all fields are valid.

**watch** — Observes the value of one or more fields and re-renders when they change. Use it only when you need reactivity in the UI (conditionally showing/hiding fields).

**setValue / getValues** — Modify and read values programmatically without re-render (getValues) or with controlled re-render (setValue with `shouldDirty`).

**formState** — Object with `errors`, `isSubmitting`, `isDirty`, `isValid`, `dirtyFields`, `touchedFields`.

## When to use it?
- Forms of any complexity in React.
- When form performance matters (many fields, mobile with limited CPU).
- Combined with Zod for validation with TypeScript (see branch `feat/rhf-zod`).
- When you want the best DX for forms in modern React.

## When NOT to use it?
- Simple 1-2 field forms where `useState` is enough.
- If the team is already standardized on Formik and performance isn't a problem.

## Is it worth learning?
Absolutely. RHF is the current standard for forms in React. The learning curve is low for the basics and medium for conditional validation, field arrays (`useFieldArray`), and advanced patterns. The RHF + Zod combination is today the community recommendation for forms with TypeScript. Highly demanded in the job market.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **React Hook Form** (this) | Performance, TypeScript, modern standard |
| **Formik** | Team already knows it, more intuitive for beginners, more verbose |
| **Manual useState** | 1-2 simple fields, no complex validation |
| **TanStack Form** | Alpha/beta, same team as TanStack Query, type-safe |

## React Hook Form or Formik?
React Hook Form has better performance due to uncontrolled inputs (no re-renders per keystroke). Formik is more intuitive for developers coming from Angular or who prefer the controlled model (values in React state). For new projects, RHF is the recommendation for performance, smaller bundle, and better TypeScript integration. Formik is still valid if the team knows it well.

## What does the example in this branch do?
`src/App.tsx` implements a form with `useForm`, several fields registered with `register`, native validation (required, minLength, pattern), error handling with `formState.errors`, and submit with `handleSubmit`. May include `watch` to display the value in real time.

## How to run
```bash
git checkout feat/rhf
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [React Hook Form — official documentation](https://react-hook-form.com/)
- [API reference](https://react-hook-form.com/docs)
