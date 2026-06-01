# React Hooks

## ¿Qué es?
Los Hooks son funciones especiales de React que permiten usar estado, efectos y otras características de React en componentes funcionales. Fueron introducidos en React 16.8 (febrero 2019) por el equipo de Facebook/Meta como respuesta a los problemas de los componentes de clase: lógica difícil de reutilizar, componentes gigantes y clases confusas para principiantes.

Antes de los Hooks, si un componente funcional necesitaba estado o efectos secundarios, debías convertirlo a clase. Los Hooks eliminaron esa necesidad y hoy son la forma canónica de escribir React.

React 19 introdujo nuevos Hooks orientados a actions y transitions, consolidando el modelo de datos async en el framework.

## ¿Para qué sirve?
Los Hooks permiten encapsular y reutilizar lógica de estado entre componentes sin necesidad de HOCs ni render props. Cada Hook tiene un propósito específico: `useState` para estado local, `useEffect` para sincronizar con sistemas externos, `useContext` para consumir contexto, `useMemo`/`useCallback` para optimizar rendimiento.

En el mundo real: un custom Hook `useAuth()` puede encapsular toda la lógica de sesión (token, refresh, logout) y ser reutilizado en cualquier componente que lo necesite.

## Conceptos clave

**Reglas de los Hooks** — Solo se llaman en el nivel superior de un componente funcional o dentro de otro Hook. Nunca dentro de condicionales, loops o funciones anidadas.

**useState** — Almacena un valor y fuerza un re-render cuando cambia. Retorna el valor actual y un setter. El setter puede recibir el nuevo valor o una función actualizadora `prev => next`.

**useEffect** — Ejecuta un efecto después del render. El array de dependencias controla cuándo se re-ejecuta: `[]` solo al montar, `[dep]` cuando cambia `dep`, sin array en cada render. Retorna una función de limpieza opcional.

**Custom Hooks** — Funciones que empiezan con `use` y pueden llamar otros Hooks. Son la unidad de reutilización de lógica stateful en React.

**useRef** — Mantiene un valor mutable que no dispara re-renders. Usado para referencias al DOM y para valores que persisten entre renders sin causar actualizaciones.

## Tabla de todos los Hooks

| Categoría | Hook | Propósito |
|-----------|------|-----------|
| **State** | `useState` | Estado local simple |
| **State** | `useReducer` | Estado complejo con acciones |
| **Context** | `useContext` | Consumir un contexto React |
| **Ref** | `useRef` | Referencia mutable / acceso al DOM |
| **Ref** | `useImperativeHandle` | Exponer métodos del hijo al padre |
| **Effect** | `useEffect` | Sincronizar con sistemas externos |
| **Effect** | `useLayoutEffect` | Efecto síncrono antes de pintar |
| **Effect** | `useInsertionEffect` | Inyectar estilos (para librerías CSS-in-JS) |
| **Performance** | `useMemo` | Memoizar valor calculado |
| **Performance** | `useCallback` | Memoizar referencia de función |
| **Transition** | `useTransition` | Marcar actualización de estado como no urgente |
| **Transition** | `useDeferredValue` | Diferir actualización de un valor |
| **Other** | `useId` | Generar ID único estable (SSR-safe) |
| **Other** | `useDebugValue` | Etiquetar custom Hooks en DevTools |
| **Other** | `useSyncExternalStore` | Suscribirse a stores externos |
| **React 19** | `useActionState` | Estado + acción async (reemplaza useFormState) |
| **React 19** | `useFormStatus` | Estado del formulario padre (pending, etc.) |
| **React 19** | `useOptimistic` | Actualización optimista antes de confirmar |
| **React 19** | `use` | Leer promesas y contextos en render |

## useState vs useReducer

| Criterio | useState | useReducer |
|----------|----------|------------|
| Complejidad del estado | Simple (string, number, boolean) | Objeto con múltiples sub-valores |
| Lógica de actualización | Directa | Con lógica condicional compleja |
| Próximos estados | Independientes entre sí | Dependen del estado anterior |
| Testing | Difícil de testear la lógica | El reducer es una función pura, fácil de testear |
| Legibilidad | Más simple | Más explícito con acciones nombradas |

**Regla práctica:** Si te encontrás escribiendo múltiples `setState` relacionados en el mismo evento, considerá `useReducer`.

## ¿Cuándo usarlo?
- Siempre: los Hooks son la forma estándar de escribir componentes React modernos.
- Para extraer lógica reutilizable, creá Custom Hooks en lugar de duplicar `useState`/`useEffect`.
- Cuando necesitás encapsular comportamiento complejo (formularios, fetch, timers, suscripciones).

## ¿Cuándo NO usarlo?
- No hay casos donde no usar Hooks en React moderno. Los componentes de clase siguen siendo válidos pero ya no son recomendados.
- No crees Custom Hooks prematuramente para lógica que solo se usa en un lugar.

## ¿Vale la pena aprenderlo?
Aprender los Hooks es obligatorio para trabajar con React. La curva de aprendizaje de `useState` y `useEffect` es baja; entender las dependencias de `useEffect` y evitar loops infinitos tiene una curva media. Los Hooks de performance (`useMemo`, `useCallback`) se aprenden cuando aparecen problemas reales de rendimiento. La demanda laboral es altísima: cualquier posición de React junior o senior requiere dominarlos.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| Componentes de clase | Proyectos legacy que no migran |
| Svelte stores | Si cambiás de framework |
| Vue Composition API | Si usás Vue 3 |

## Qué hace el ejemplo de esta rama
`src/App.tsx` demuestra los Hooks más importantes en ejemplos interactivos: `useState` con contador, `useEffect` con un timer o fetch, `useRef` con referencia al DOM, `useMemo` y `useCallback` con ejemplos de memoización, y `useReducer` con un estado más complejo. Cada ejemplo está aislado para mostrar el Hook sin distracciones.

## Cómo ejecutar
```bash
git checkout feat/hooks
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [Referencia de Hooks — react.dev](https://react.dev/reference/react/hooks)
- [Aprende sobre Hooks — react.dev](https://react.dev/learn/state-a-components-memory)
