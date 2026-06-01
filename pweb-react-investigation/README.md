# Formik + Yup

## ¿Qué es?
La combinación de Formik con Yup es la forma clásica de hacer formularios con validación en React. Yup es una librería de validación de schemas para JavaScript, creada por Jason Quense en 2016. Es el equivalente pre-TypeScript de Zod: define un schema que valida valores en runtime.

Formik tiene soporte nativo para Yup mediante la prop `validationSchema`: cuando Formik detecta que recibe un schema de Yup, corre la validación automáticamente y mapea los errores a `formik.errors`.

Aunque esta combinación fue el estándar durante años, la comunidad migró hacia React Hook Form + Zod para proyectos TypeScript por su mejor inferencia de tipos. Formik + Yup sigue siendo válido para proyectos JavaScript o proyectos con esta base ya establecida.

## ¿Para qué sirve?
Manejar formularios con validación declarativa basada en schemas. El schema de Yup describe las reglas de validación de cada campo de forma legible, separando la lógica de validación del componente.

## Conceptos clave

**validationSchema** — Prop de Formik que acepta un schema de Yup. Formik corre la validación en onChange, onBlur y onSubmit automáticamente.

**Yup.object()** — Punto de entrada para un schema de objeto. Cada clave corresponde a un campo del formulario.

**Yup chains** — Los validators se encadenan: `yup.string().required('Requerido').email('Email inválido').min(5, 'Muy corto')`.

**Yup types** — `yup.string()`, `yup.number()`, `yup.boolean()`, `yup.array()`, `yup.object()`. Cada tipo tiene métodos de validación específicos.

**ref para validaciones cruzadas** — `yup.ref('password')` permite referenciar otro campo: `yup.string().oneOf([yup.ref('password')], 'No coinciden')`.

## Diferencia con Zod

| Aspecto | Yup | Zod |
|---------|-----|-----|
| Año | 2016 | 2020 |
| TypeScript | Soporte parcial, tipos genéricos | TypeScript-first, inferencia perfecta |
| `infer` | Limitado | `z.infer<typeof schema>` exacto |
| Transformaciones | Sí | Sí, más potentes |
| Async validation | Sí | Sí |
| Bundle | ~15kb | ~12kb |

## ¿Cuándo usarlo?
- Proyectos existentes con Formik + Yup que funcionan bien.
- Proyectos JavaScript sin TypeScript donde la inferencia no es prioridad.

## ¿Cuándo NO usarlo?
- Proyectos nuevos con TypeScript: usá React Hook Form + Zod.
- Si querés tipos perfectamente inferidos del schema.

## ¿Vale la pena aprenderlo?
Yup tiene valor práctico para mantener proyectos existentes. Si aprendés Zod (que deberías para proyectos nuevos), Yup será trivial de entender: la diferencia es principalmente en la sintaxis y el soporte de TypeScript. No es una prioridad para proyectos nuevos, pero encontrarás Yup en muchos codebases existentes.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **RHF + Zod** | Proyectos nuevos TypeScript, inferencia perfecta |
| **Formik + Yup** (esta) | Proyectos existentes, JavaScript sin TypeScript |
| **Formik + Zod** | Combinar Formik con mejor inferencia vía `@hookform/resolvers` |

## Qué hace el ejemplo de esta rama
`src/App.tsx` implementa un formulario con Formik y un `validationSchema` de Yup que valida múltiples campos. Muestra el patrón de `touched && errors` para mostrar errores solo después de que el usuario interactuó con el campo, y validaciones cruzadas entre campos.

## Cómo ejecutar
```bash
git checkout feat/formik-yup
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [Formik + Yup — guía oficial](https://formik.org/docs/guides/validation#yup)
- [Yup — documentación oficial](https://github.com/jquense/yup)
