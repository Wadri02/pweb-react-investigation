# TanStack Router

## ¿Qué es?
TanStack Router es una librería de routing type-safe para React, creada por Tanner Linsley (el mismo autor de TanStack Query). Fue publicada en versión estable en 2023 como respuesta a la falta de type-safety en React Router: en React Router, los parámetros de ruta son siempre `string | undefined` y los search params son `Record<string, string>`, sin inferencia de tipos.

TanStack Router está diseñado desde cero para TypeScript: cada ruta, parámetro, search param y loader tiene tipos inferidos automáticamente. El IDE conoce exactamente qué params tiene `/users/$userId` y cuál es su tipo.

También incluye integración nativa con TanStack Query, manejo de search params como estado tipado (reemplazando `useState` para filtros en URL), y soporte para SSR.

## ¿Para qué sirve?
Routing type-safe en aplicaciones React/TypeScript donde la corrección de tipos en la navegación es crítica. Especialmente útil cuando los search params son complejos (filtros, paginación, ordenamiento) y querés que estén en la URL para que sean bookmarkable.

En el mundo real: una tabla de productos con filtros de categoría, rango de precio y ordenamiento. Con TanStack Router, estos filtros viven en los search params con tipos `{ category: string, minPrice: number, sort: 'asc' | 'desc' }` — inferidos, validados, y sincronizan con la URL automáticamente.

## ¿Qué significa type-safe routing?

Con React Router (sin tipos):
```tsx
// ❌ Los params son string | undefined, sin validación
const { userId } = useParams() // userId: string | undefined
navigate('/users/123') // Sin verificar que /users/:userId exista
```

Con TanStack Router:
```tsx
// ✅ Tipos inferidos de la definición de rutas
const { userId } = Route.useParams() // userId: string (garantizado)
navigate({ to: '/users/$userId', params: { userId: '123' } }) // Error TypeScript si la ruta no existe
```

Si renombrás un parámetro, TypeScript te avisa en todos los lugares que lo usan.

## Conceptos clave

**Route Tree** — La estructura de rutas se define como un árbol de objetos `createRoute`. Hay un `rootRoute` y las rutas hijas se encadenan con `createRoute({ getParentRoute })`.

**createRouter** — Combina el árbol de rutas en un objeto router tipado. Este tipo se registra globalmente con `declare module` para que toda la app tenga los mismos tipos.

**Route.useParams** — Hook del propio objeto `Route` (no del router genérico) que retorna los parámetros tipados de esa ruta específica.

**Route.useSearch** — Similar a `useParams` pero para los search params. Los tipos se definen con un `validateSearch` que puede usar Zod para validación.

**Loaders** — Cada ruta puede tener un `loader` que carga datos antes de renderizar. Se integra con TanStack Query para prefetch y caché.

## ¿Cuándo usarlo?
- Proyectos TypeScript donde la type-safety de la navegación importa.
- Apps con search params complejos que necesitás tipados y en la URL.
- Cuando empezás un proyecto nuevo y querés el mejor DX con TypeScript.
- Equipos que ya usan TanStack Query y quieren integración nativa.

## ¿Cuándo NO usarlo?
- Proyectos JavaScript sin TypeScript (pierde su principal ventaja).
- Apps con React Router v6 ya establecido sin pain points de tipos.
- Si el equipo no está familiarizado con la configuración inicial (más verbose que React Router).

## ¿Vale la pena aprenderlo?
Para proyectos TypeScript nuevos, sí. La configuración inicial es más compleja que React Router, pero el DX resultante es superior. La demanda laboral todavía es menor que React Router, pero crece rápido. En 2024-2025 se convirtió en la recomendación de la comunidad para proyectos TypeScript-first.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **TanStack Router** (esta) | TypeScript-first, search params tipados, proyecto nuevo |
| **React Router v6** | Ecosistema maduro, proyecto existente, sin necesidad de tipos estrictos |
| **Next.js Router** | SSR/SSG, file-based routing, meta-framework completo |
| **Wouter** | Minimalista, sin TypeScript avanzado, bundle muy pequeño |

## ¿TanStack Router o React Router?
Si el proyecto usa TypeScript y estás empezando desde cero, TanStack Router ofrece una experiencia de tipos inigualable. Los errores de ruta se detectan en compilación, los refactors son seguros, y los search params tipados reemplazan el patrón manual de `useState` + `URLSearchParams`. React Router sigue siendo válido para proyectos existentes y equipos que valoran la familiaridad. La decisión clave es: ¿cuánto TypeScript strictness querés en tu navegación?

## Qué hace el ejemplo de esta rama
`src/App.tsx` define un árbol de rutas con `createRootRoute` y rutas anidadas, registra el router con tipos globales, y demuestra navegación tipada con `useNavigate` y `Link`. Muestra cómo los parámetros dinámicos y search params son inferidos por TypeScript.

## Cómo ejecutar
```bash
git checkout feat/tanstack-router
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [TanStack Router — documentación oficial](https://tanstack.com/router/latest)
- [Guía de inicio rápido](https://tanstack.com/router/latest/docs/framework/react/quick-start)
