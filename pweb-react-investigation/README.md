# React Hook Form

## ¿Qué es?
React Hook Form (RHF) es una librería para manejar formularios en React, creada por Beier (Bill) Luo y lanzada en 2019. Su diseño central es el uso de inputs no controlados (uncontrolled inputs): en lugar de manejar cada campo con `useState` y `onChange`, RHF registra los inputs directamente con el DOM usando `ref`, y solo lee sus valores cuando el formulario se envía o cuando se solicita explícitamente.

Esto tiene una consecuencia enorme: los re-renders son mínimos. En un formulario de 20 campos con Formik o con `useState`, cada pulsación de tecla dispara un re-render de todo el formulario. Con RHF, escribir en un campo no re-renderiza nada, a menos que uses `watch`.

Con ~9kb gzip, RHF es significativamente más liviana que Formik. La versión 7 (2021) requiere React 16.8+ y aprovecha completamente el modelo de Hooks.

## ¿Para qué sirve?
Manejar el estado, validación y envío de formularios con mínimo boilerplate y máxima performance. Ideal para formularios complejos con muchos campos, validaciones condicionales, o donde el rendimiento importa.

En el mundo real: un formulario de checkout con 15 campos, validaciones complejas y un botón de envío que debe estar habilitado solo cuando todo es válido.

## Por qué minimiza re-renders (uncontrolled inputs)

```tsx
// ❌ Controlado: re-render en CADA tecla
const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />

// ✅ RHF: sin re-render al escribir
const { register } = useForm()
<input {...register('name')} /> // El DOM maneja el valor, RHF lo lee con ref
```

## Conceptos clave

**useForm** — Hook principal. Retorna `register`, `handleSubmit`, `watch`, `setValue`, `getValues`, `formState`, `reset` y más. Acepta `defaultValues` y `resolver` para validación.

**register** — Conecta un input a RHF. Retorna `ref`, `name`, `onChange`, `onBlur`. Se usa como `{...register('fieldName', { required: true, minLength: 3 })}`.

**handleSubmit** — Wrapper del submit que valida antes de llamar al handler. Solo llama al callback si todos los campos son válidos.

**watch** — Observa el valor de uno o más campos y re-renderiza cuando cambian. Úsalo solo cuando necesitás reactividad en el UI (mostrar/ocultar campos condicionalmente).

**setValue / getValues** — Modificar y leer valores programáticamente sin re-render (getValues) o con re-render controlado (setValue con `shouldDirty`).

**formState** — Objeto con `errors`, `isSubmitting`, `isDirty`, `isValid`, `dirtyFields`, `touchedFields`.

## ¿Cuándo usarlo?
- Formularios de cualquier complejidad en React.
- Cuando el rendimiento del formulario importa (muchos campos, mobile con CPU limitado).
- En combinación con Zod para validación con TypeScript (ver rama `feat/rhf-zod`).
- Cuando querés la mejor DX para formularios en React moderno.

## ¿Cuándo NO usarlo?
- Formularios de 1-2 campos simples donde `useState` es suficiente.
- Si el equipo ya está estandarizado en Formik y el rendimiento no es un problema.

## ¿Vale la pena aprenderlo?
Absolutamente. RHF es el estándar actual para formularios en React. La curva de aprendizaje es baja para lo básico y media para validación condicional, arrays de campos (`useFieldArray`) y patterns avanzados. La combinación RHF + Zod es hoy la recomendación de la comunidad para formularios con TypeScript. Altamente demandado en el mercado laboral.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **React Hook Form** (esta) | Rendimiento, TypeScript, estándar moderno |
| **Formik** | Equipo que lo conoce, más intuitivo para principiantes, más verbose |
| **useState manual** | 1-2 campos simples, sin validación compleja |
| **TanStack Form** | Alpha/beta, del mismo equipo que TanStack Query, type-safe |

## ¿RHF o Formik?
React Hook Form tiene mejor rendimiento por el modelo de uncontrolled inputs. Formik es más intuitivo para desarrolladores que vienen de Angular o que prefieren el modelo controlado (valores en el estado de React). Para proyectos nuevos, RHF es la recomendación por rendimiento, menor bundle y mejor integración con TypeScript. Formik sigue siendo válido si el equipo lo conoce bien.

## Qué hace el ejemplo de esta rama
`src/App.tsx` implementa un formulario con `useForm`, varios campos registrados con `register`, validación nativa (required, minLength, pattern), manejo de errores con `formState.errors`, y submit con `handleSubmit`. Puede incluir `watch` para mostrar el valor en tiempo real.

## Cómo ejecutar
```bash
git checkout feat/rhf
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [React Hook Form — documentación oficial](https://react-hook-form.com/)
- [API reference](https://react-hook-form.com/docs)
