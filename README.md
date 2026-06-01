# React Hook Form + Zod

## What is it?
The combination of React Hook Form (RHF) with Zod is the current standard for forms in React with TypeScript. RHF handles form state and submission; Zod defines the validation schema with automatically inferred TypeScript types; and `@hookform/resolvers` connects the two via `zodResolver`.

This combination solves the "double definition" problem: without Zod, you define TypeScript form types on one side and validation rules on the other. With Zod, the schema is the single source of truth: types AND validations are both inferred from it, in one place.

Zod was created by Colin McDonnell and released in 2020. It is a TypeScript-first schema validation library where the schema not only validates at runtime but also infers static TypeScript types.

## What is it used for?
Forms with robust, end-to-end typed validation, where the same schema validates on the client and can be reused on the server. Eliminates duplication between TypeScript types and validation logic.

In the real world: a registration form where `email` must be a valid email, `password` must have at least 8 characters and at least one number, and `confirmPassword` must match `password`. With Zod this is expressed in a schema and you get types and validations in a single declaration.

## The complete flow

```tsx
// 1. Define the schema with Zod
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  age: z.number().min(18, 'Must be at least 18'),
})

// 2. Infer the TypeScript type from the schema (no duplication)
type FormData = z.infer<typeof schema>
// = { email: string; password: string; age: number }

// 3. Connect to useForm via zodResolver
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
})

// 4. Register fields with inferred types
<input {...register('email')} />
{errors.email && <span>{errors.email.message}</span>}

// 5. Submit receives typed and validated data
const onSubmit = (data: FormData) => {
  // data.email: string (guaranteed, validated)
  // data.age: number (Zod transforms string → number automatically)
}
```

## Key Concepts

**zodResolver** — Function from `@hookform/resolvers/zod` that adapts a Zod schema for RHF to use as a validation engine. Passed as `resolver` in `useForm`.

**z.infer** — TypeScript utility that extracts the type from the Zod schema. The standard practice is `type FormData = z.infer<typeof schema>` and passing that type to `useForm<FormData>`.

**Transformations** — Zod can transform values before they reach the handler: `z.string().transform(Number)` converts the input string to a number. RHF sends the transformed value.

**Refinements** — Cross-field validations: `.refine((data) => data.password === data.confirmPassword, { message: "Don't match", path: ['confirmPassword'] })`.

**Typed error messages** — `errors.email.message` is always `string | undefined` thanks to the inferred type. Without Zod, the type would be more generic.

## When to use it?
- Any form in a React + TypeScript project (it's the standard).
- When form validation should be reused on the server (same Zod schema for frontend and backend/API).
- Complex forms with cross-field validations.

## When NOT to use it?
- JavaScript projects without TypeScript (Zod loses its main advantage of inference).
- Simple 1-2 field forms where `useState` with manual validation is enough.

## Is it worth learning?
Yes, it's the most recommended combination in the React/TypeScript community in 2024-2025. Learning RHF and Zod separately has independent value; together they are more than the sum of their parts. The learning curve is medium: basic RHF is simple, advanced Zod (discriminated unions, transforms, refinements) requires practice. Very high job market demand.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **RHF + Zod** (this) | Modern TypeScript standard, typed validation, reusable |
| **RHF + Yup** | Team familiar with Yup, existing projects |
| **Formik + Yup** | Legacy, team with prior experience |
| **TanStack Form + Zod** | Future, fully type-safe, still maturing |

## What does the example in this branch do?
`src/App.tsx` defines a Zod schema with at least 3 fields and validations (email, password with confirmation, numeric field), infers the type with `z.infer`, connects to `useForm` via `zodResolver`, and displays error messages validated by Zod. It demonstrates the complete flow: schema → type → useForm → register → typed submit.

## How to run
```bash
git checkout feat/rhf-zod
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [React Hook Form — resolvers](https://react-hook-form.com/docs/useform#resolver)
- [Zod — official documentation](https://zod.dev/)
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
