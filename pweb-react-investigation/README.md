# React Router v6

## ¿Qué es?
React Router es la librería de routing más popular para React, mantenida por Remix Software (ahora parte de Shopify). La versión 6 fue lanzada en noviembre 2021 e introdujo cambios significativos respecto a v5: rutas anidadas como componentes, `<Outlet>` para layouts compartidos, hooks mejorados y un sistema de matching más inteligente.

React Router maneja la navegación en Single Page Applications (SPAs): permite que la URL cambie sin recargar la página, mostrando distintos componentes según la ruta activa, manteniendo la ilusión de múltiples páginas en una sola aplicación.

La versión 6.4 agregó loaders y actions inspirados en Remix, trayendo fetching de datos integrado al router. Esto acercó React Router a lo que Next.js ofrecía para datos.

## ¿Para qué sirve?
Implementar navegación multi-página en una SPA de React. Mapear URLs a componentes, manejar rutas dinámicas, proteger rutas con autenticación, y compartir layouts entre páginas.

En el mundo real: una app con `/`, `/productos`, `/productos/:id`, `/carrito`, `/admin` donde cada ruta muestra un componente diferente pero comparte el mismo navbar y footer.

## Cambios de v5 a v6

| Característica | v5 | v6 |
|----------------|----|----|
| Definición de rutas | `<Switch><Route path exact>` | `<Routes><Route>` |
| Matching | Primero en ganar | Mejor match automático |
| Layouts anidados | Con react-router-config | Nativo con `<Outlet>` |
| Redirect | `<Redirect to>` | `<Navigate to>` |
| useHistory | `useHistory()` | `useNavigate()` |
| Parámetros | `useParams()` | `useParams()` (igual) |
| Rutas relativas | Manual | Automático |

## Conceptos clave

**BrowserRouter** — Provider que habilita el routing basado en la URL del navegador. Usa la History API del browser. Envuelve toda la app.

**Routes** — Contenedor de rutas en v6. Reemplaza `<Switch>`. Selecciona automáticamente la ruta que mejor matchea la URL actual.

**Route** — Define la relación entre un path y un componente (`element`). Soporta parámetros dinámicos (`/user/:id`) y rutas índice.

**Outlet** — Placeholder donde se renderizan las rutas hijas. Permite layouts anidados: el componente padre define la estructura visual y `<Outlet>` inserta el hijo activo.

**Navigate** — Componente para redirección declarativa. `useNavigate()` es el Hook equivalente para navegación programática.

## ¿Cuándo usarlo?
- Cualquier SPA React con más de una "página".
- Cuando necesitás URLs que reflejen el estado de la app (bookmarkable, compartible).
- Apps con layouts complejos y rutas anidadas.
- Proyectos que ya usan el ecosistema React Router/Remix.

## ¿Cuándo NO usarlo?
- Apps de una sola vista sin navegación.
- Si usás Next.js o Remix (tienen routing propio).
- Si necesitás type-safety estricto en rutas con TypeScript: TanStack Router es mejor opción.

## ¿Vale la pena aprenderlo?
Sí, React Router sigue siendo el estándar de facto para SPAs con React. La curva de aprendizaje de las rutas básicas es baja; entender `<Outlet>` y rutas anidadas para layouts lleva algo más de práctica. La migración de v5 a v6 requiere reescribir la configuración de rutas. Es ampliamente demandado en el mercado laboral para cualquier posición React.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **React Router v6** (esta) | Estándar para SPAs, ecosistema maduro, proyectos existentes |
| **TanStack Router** | TypeScript-first, type-safe params y search params, proyectos nuevos |
| **Wouter** | Routing minimalista, bundle muy pequeño, sin extras |
| **Next.js Router** | Apps con SSR/SSG, file-based routing automático |

## ¿React Router o TanStack Router?
Para proyectos nuevos con TypeScript, TanStack Router ofrece type-safety completa: los params de ruta, search params y estado del loader son tipados end-to-end sin configuración manual. React Router sigue siendo válido y tiene un ecosistema más grande. Para proyectos que ya usan React Router v6, no hay razón para migrar a menos que la type-safety sea un pain point real.

## Qué hace el ejemplo de esta rama
`src/App.tsx` configura `BrowserRouter` con múltiples rutas anidadas usando `<Outlet>`. Demuestra un layout compartido (navbar), rutas con parámetros dinámicos (`:id`), rutas índice, y navegación programática con `useNavigate`.

## Cómo ejecutar
```bash
git checkout feat/react-router
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [React Router v6 — documentación oficial](https://reactrouter.com/)
- [Tutorial oficial](https://reactrouter.com/en/main/start/tutorial)
