# Context API y useContext

## ¿Qué es?
Context API es el sistema de estado global nativo de React, disponible desde React 16.3. Fue creado por el equipo de Meta para resolver el problema del prop drilling: pasar datos a través de múltiples niveles de componentes que no los necesitan directamente, solo para hacerlos llegar a un componente profundo en el árbol.

El Hook `useContext` (React 16.8) simplificó el consumo de contextos, eliminando la necesidad del patrón `Consumer` con render props que era verbose y difícil de leer.

A diferencia de librerías externas como Zustand o Redux, Context API no es un gestor de estado: es un mecanismo de inyección de dependencias. No optimiza re-renders automáticamente.

## ¿Para qué sirve?
Compartir datos que son "globales" para un árbol de componentes sin pasarlos manualmente prop a prop. Casos de uso ideales: tema visual (dark/light), idioma/i18n, usuario autenticado, preferencias de configuración.

En el mundo real: una app con decenas de componentes que necesitan saber si el usuario está logueado. Sin Context, pasarías `user` como prop por 5 niveles. Con Context, cualquier componente lo consume directamente con `useContext(AuthContext)`.

## El problema que resuelve: prop drilling

```
App (tiene user)
  └── Layout (recibe user, solo para pasarlo)
        └── Sidebar (recibe user, solo para pasarlo)
              └── UserMenu (necesita user ← aquí es donde se usa)
```

Con Context, `UserMenu` llama `useContext(AuthContext)` y accede a `user` sin que `Layout` ni `Sidebar` sepan que existe.

## Conceptos clave

**createContext** — Crea el objeto de contexto. Acepta un valor por defecto usado cuando no hay Provider padre.

**Provider** — Componente que envuelve el árbol y provee el valor. Cualquier cambio en el valor re-renderiza todos los consumidores.

**useContext** — Hook que consume el contexto más cercano del tipo indicado. Si el valor cambia, el componente re-renderiza.

**Composición de contextos** — Es normal tener varios contextos independientes (`ThemeContext`, `AuthContext`, `LanguageContext`). Separarlos evita re-renders innecesarios.

**Value memoización** — Si el valor del Provider es un objeto creado en render, memorizarlo con `useMemo` evita re-renders en cascada por referencias nuevas.

## ¿Cuándo usarlo?
- Datos que cambian raramente pero se leen en muchos lugares: tema, idioma, usuario.
- Para evitar prop drilling en más de 2-3 niveles.
- Cuando no querés agregar una dependencia externa para algo simple.
- Inyección de dependencias en tests (mockear el Provider).

## ¿Cuándo NO usarlo?
- Estado que cambia frecuentemente (contadores en tiempo real, listas que se filtran): cada cambio re-renderiza todos los consumidores.
- Lógica de negocio compleja con muchas acciones: Zustand o Redux escalan mejor.
- Si la app crece y empezás a tener performance issues por re-renders, es señal de migrar a Zustand.

## ¿Vale la pena aprenderlo?
Sí, y es obligatorio para entender React en profundidad. Context API viene incluido en React, no agrega peso al bundle, y es suficiente para proyectos pequeños y medianos. La curva de aprendizaje es baja. Sin embargo, para apps con estado complejo o frecuentes actualizaciones, Zustand lo supera en ergonomía y rendimiento con poca complejidad adicional.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Context API** (esta) | Datos estáticos/semi-estáticos, sin dependencias externas, proyectos simples |
| **Zustand** | Estado que cambia seguido, múltiples acciones, mejor rendimiento, API más simple |
| **Redux Toolkit** | Apps enterprise, equipos grandes, necesidad de devtools y middlewares |
| **Jotai/Recoil** | Estado atómico con granularidad fina en actualizaciones |

## ¿Context API o Zustand?
Para datos que cambian raramente (tema, usuario logueado), Context API es suficiente y no agrega dependencias. Para estado de UI que cambia frecuentemente o con lógica de negocio, Zustand es mejor: sus selectores evitan re-renders innecesarios, la API es más limpia y el bundle extra es mínimo (~1kb gzip).

## Qué hace el ejemplo de esta rama
`src/App.tsx` demuestra Context API con un caso de uso real: un `ThemeContext` o `AuthContext` que comparte datos entre componentes hermanos sin prop drilling. Muestra la creación del contexto, el Provider envolviendo el árbol, y múltiples componentes consumidores usando `useContext`.

## Cómo ejecutar
```bash
git checkout feat/context
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [createContext — react.dev](https://react.dev/reference/react/createContext)
- [useContext — react.dev](https://react.dev/reference/react/useContext)
- [Pasar datos en profundidad con Context — react.dev](https://react.dev/learn/passing-data-deeply-with-context)
