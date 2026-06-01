# React Hook Form + Zod

## ¿Qué es?
La combinación de React Hook Form (RHF) con Zod es el estándar actual para formularios en React con TypeScript. RHF maneja el estado y envío del formulario; Zod define el schema de validación con tipos de TypeScript inferidos automáticamente; y `@hookform/resolvers` conecta los dos mediante `zodResolver`.

Esta combinación resuelve el problema de "doble definición": sin Zod, definís los tipos TypeScript del formulario por un lado y las reglas de validación por otro. Con Zod, el schema es la única fuente de verdad: de él se infieren los tipos Y las validaciones, en un solo lugar.

Zod fue creado por Colin McDonnell y lanzado en 2020. Es una librería de validación de schemas TypeScript-first, donde el schema no solo valida en runtime sino que también infiere los tipos estáticos de TypeScript.

## ¿Para qué sirve?
Formularios con validación robusta, tipada end-to-end, donde el mismo schema valida en el cliente y puede reutilizarse en el servidor. Elimina la duplicación entre tipos TypeScript y lógica de validación.

En el mundo real: un formulario de registro donde `email` debe ser un email válido, `password` debe tener mínimo 8 caracteres y al menos un número, y `confirmPassword` debe coincidir con `password`. Con Zod esto se expresa en un schema y se obtienen tipos y validaciones en una sola declaración.

## El flujo completo

```tsx
// 1. Definir el schema con Zod
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  age: z.number().min(18, 'Debes ser mayor de edad'),
})

// 2. Inferir el tipo TypeScript del schema (sin duplicación)
type FormData = z.infer<typeof schema>
// = { email: string; password: string; age: number }

// 3. Conectar con useForm mediante zodResolver
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
})

// 4. Registrar campos con tipos inferidos
<input {...register('email')} />
{errors.email && <span>{errors.email.message}</span>}

// 5. El submit recibe datos tipados y validados
const onSubmit = (data: FormData) => {
  // data.email: string (garantizado, validado)
  // data.age: number (Zod transforma string → number automáticamente)
}
```

## Conceptos clave

**zodResolver** — Función de `@hookform/resolvers/zod` que adapta un schema Zod para que RHF lo use como motor de validación. Se pasa como `resolver` en `useForm`.

**z.infer** — Utilidad de TypeScript que extrae el tipo del schema Zod. La práctica estándar es `type FormData = z.infer<typeof schema>` y pasar ese tipo a `useForm<FormData>`.

**Transformaciones** — Zod puede transformar valores antes de que lleguen al handler: `z.string().transform(Number)` convierte el string del input a number. RHF envía el valor transformado.

**Refinements** — Validaciones cruzadas entre campos: `.refine((data) => data.password === data.confirmPassword, { message: 'No coinciden', path: ['confirmPassword'] })`.

**Mensajes de error tipados** — `errors.email.message` es siempre `string | undefined` gracias al tipo inferido. Sin Zod, el tipo sería más genérico.

## ¿Cuándo usarlo?
- Cualquier formulario en un proyecto React + TypeScript (es el estándar).
- Cuando la validación del formulario debe reutilizarse en el servidor (mismo schema Zod para frontend y backend/API).
- Formularios complejos con validaciones cruzadas entre campos.

## ¿Cuándo NO usarlo?
- Proyectos JavaScript sin TypeScript (Zod pierde su ventaja principal de inferencia).
- Formularios de 1-2 campos simples donde `useState` con validación manual es suficiente.

## ¿Vale la pena aprenderlo?
Sí, es la combinación más recomendada en la comunidad React/TypeScript en 2024-2025. Aprender RHF y Zod por separado tiene valor independiente; juntos son más que la suma de sus partes. La curva de aprendizaje es media: RHF básico es simple, Zod avanzado (discriminated unions, transforms, refinements) requiere práctica. Altísima demanda en el mercado laboral.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **RHF + Zod** (esta) | Estándar moderno TypeScript, validación tipada, reutilizable |
| **RHF + Yup** | Equipo familiarizado con Yup, proyectos existentes |
| **Formik + Yup** | Legado, equipo con experiencia previa |
| **TanStack Form + Zod** | Futuro, type-safe completo, aún en maduración |

## Qué hace el ejemplo de esta rama
`src/App.tsx` define un schema Zod con al menos 3 campos y validaciones (email, password con confirmación, campo numérico), infiere el tipo con `z.infer`, conecta con `useForm` mediante `zodResolver`, y muestra los mensajes de error validados por Zod. Demuestra el flujo completo: schema → tipo → useForm → register → submit tipado.

## Cómo ejecutar
```bash
git checkout feat/rhf-zod
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [React Hook Form — resolvers](https://react-hook-form.com/docs/useform#resolver)
- [Zod — documentación oficial](https://zod.dev/)
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
