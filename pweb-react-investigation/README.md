# Formik

## ¿Qué es?
Formik es una librería para manejar formularios en React, creada por Jared Palmer y lanzada en 2017. Fue la primera solución popular que unificó el manejo de state, validación y envío de formularios en React, resolviendo el problema de escribir el mismo boilerplate de `useState` + `onChange` + validaciones para cada formulario.

Formik adopta el modelo de controlled inputs: todos los valores del formulario viven en el estado de React (en `formik.values`), y cada cambio en un campo dispara una actualización de estado. Este modelo es intuitivo y predecible, pero tiene un costo de performance en formularios grandes.

Aunque React Hook Form lo superó en adopción y rendimiento, Formik sigue siendo ampliamente utilizado en proyectos existentes y sigue siendo mantenido. Para proyectos nuevos, la comunidad tiende a recomendar RHF.

## ¿Para qué sirve?
Unificar el manejo de estado, validación y envío de formularios. Elimina el boilerplate de `useState` + `onChange` por campo, provee acceso a errores tipados y al estado de "tocado" de cada campo.

En el mundo real: formularios de registro, login, configuración de perfil, o cualquier formulario de datos con validación en múltiples campos.

## Conceptos clave

**values** — Objeto con los valores actuales de todos los campos. Viven en el estado interno de Formik y se actualizan con cada cambio. Accedido como `formik.values.email`.

**errors** — Objeto con los mensajes de error de cada campo. Solo se populan después de que el campo fue tocado (o en el submit). Accedido como `formik.errors.email`.

**touched** — Objeto que registra qué campos el usuario ya visitó (on blur). Se usa para mostrar errores solo en campos que el usuario ya interactuó, evitando mostrar todos los errores al cargar.

**handleChange / handleBlur** — Handlers de Formik que actualizan `values` y `touched` respectivamente. Se pasan al input: `onChange={formik.handleChange}`.

**handleSubmit** — Wrapper del submit que valida el formulario completo antes de llamar a `onSubmit`. Si hay errores, no llama al callback.

## useFormik vs componente Formik

| Aspecto | `useFormik()` | `<Formik>` (componente) |
|---------|---------------|------------------------|
| API | Hook, todo explícito | Render props / children as function |
| Integración con Field | Manual | `<Field>` y `<ErrorMessage>` disponibles |
| Boilerplate | Medio | Bajo con `<Field>` |
| Legibilidad | Clara | Más declarativa |
| Context interno | No expone Context | Expone context para componentes hijos |

`useFormik` es más simple para formularios en un solo componente. El componente `<Formik>` con `<Field>` y `<ErrorMessage>` es más cómodo para formularios divididos en múltiples sub-componentes.

## ¿Cuándo usarlo?
- Proyectos que ya usan Formik y están funcionando bien.
- Cuando el equipo conoce Formik y prefiere el modelo de controlled inputs.
- Para desarrolladores que vienen de Angular y están acostumbrados a reactive forms.
- Formularios simples a medianos donde el rendimiento no es un problema.

## ¿Cuándo NO usarlo?
- Proyectos nuevos: preferí React Hook Form.
- Formularios con muchos campos donde cada keystroke genera un re-render es un problema (mobile, formularios de 20+ campos).
- Cuando necesitás validación con Zod integrada limpiamente (RHF + zodResolver es más directo).

## ¿Vale la pena aprenderlo?
Para proyectos nuevos, no es la primera opción. Sin embargo, Formik está en muchísimos proyectos existentes y saber leerlo y modificar código Formik tiene valor práctico. La curva de aprendizaje es baja: el modelo de `values/errors/touched` es intuitivo. Si aprendés React Hook Form primero, Formik será fácil de entender cuando lo encontrés en un proyecto legacy.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **React Hook Form** | Proyectos nuevos, mejor rendimiento, mejor TypeScript |
| **Formik** (esta) | Proyectos existentes, equipo familiarizado, modelo intuitivo |
| **useState manual** | Formularios de 1-2 campos sin validación compleja |

## ¿Formik o React Hook Form?
Honestamente: React Hook Form tiene mejor rendimiento (uncontrolled inputs, sin re-renders por keystroke), menor bundle size (~9kb vs ~13kb), y mejor integración con TypeScript y Zod. Formik es más intuitivo para principiantes porque el modelo de controlled inputs es más cercano a cómo React enseña el manejo de estado.

Para un proyecto nuevo, elegí React Hook Form. Si llegás a un proyecto con Formik, no hay razón para migrarlo si funciona bien. Si el rendimiento es un problema concreto (formularios pesados, mobile), sí considera migrar a RHF.

## Qué hace el ejemplo de esta rama
`src/App.tsx` implementa un formulario con `useFormik` o el componente `<Formik>`, con campos de texto, validación con Yup, manejo de `touched` para mostrar errores, y el flujo completo de submit. Muestra la diferencia entre `formik.errors` y `formik.touched` para una UX correcta.

## Cómo ejecutar
```bash
git checkout feat/formik
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [Formik — documentación oficial](https://formik.org/)
- [Formik + Yup tutorial](https://formik.org/docs/guides/validation#yup)
