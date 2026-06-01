# TanStack Query

## ¿Qué es?
TanStack Query (antes React Query) es una librería para gestionar el estado del servidor en aplicaciones React. Fue creada por Tanner Linsley y lanzada en 2019. En 2022 fue renombrada a TanStack Query v4 y se volvió agnóstica al framework (soporta Vue, Svelte, Angular además de React).

El problema que resuelve: la mayoría de los desarrolladores usan `useState` + `useEffect` para hacer fetch de datos, pero esto requiere manejar manualmente loading, error, caché, revalidación, deduplicación de requests y sincronización. TanStack Query resuelve todo esto con una API declarativa.

La distinción fundamental que introduce es la diferencia entre **estado del cliente** (lo que el usuario ve/interactúa: formularios, UI state) y **estado del servidor** (datos que viven en una base de datos remota). Son categorías diferentes con necesidades distintas: el estado del servidor necesita sincronización, caché y actualizaciones periódicas.

## ¿Para qué sirve?
Fetching, caché, sincronización y actualización de datos del servidor. Elimina el patrón manual de `useEffect` + `useState` para fetch.

En el mundo real: una lista de productos que se carga al montar, se refresca cuando el usuario vuelve a la pestaña, muestra un spinner mientras carga, muestra el error si falla, y se actualiza automáticamente después de agregar un producto nuevo.

## Por qué NO usar useEffect para fetch

```tsx
// ❌ El patrón manual tiene problemas
useEffect(() => {
  setLoading(true)
  fetch('/api/users')
    .then(r => r.json())
    .then(data => setUsers(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false))
}, []) // Sin caché, sin deduplicación, sin revalidación, race conditions posibles
```

```tsx
// ✅ Con TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
})
// Caché automático, deduplicación, revalidación al foco, retry automático
```

## Conceptos clave

**queryKey** — Array único que identifica la query en el caché. Cuando cambia, se refetch automáticamente. Ejemplo: `['users', userId]` para un usuario específico.

**queryFn** — Función async que retorna los datos. Puede ser cualquier promesa: fetch, axios, GraphQL, etc.

**staleTime** — Tiempo en ms que los datos se consideran frescos. Durante ese tiempo no se hace refetch aunque el componente se monte de nuevo. Default: 0 (siempre stale).

**invalidateQueries** — Marca queries como stale y dispara un refetch. Se usa después de mutaciones para actualizar los datos del servidor en el caché.

**useMutation** — Hook para operaciones que modifican datos (POST, PUT, DELETE). Tiene callbacks `onSuccess`, `onError`, `onSettled` para reaccionar al resultado.

## Estado del servidor vs estado del cliente

| Aspecto | Estado del servidor | Estado del cliente |
|---------|--------------------|--------------------|
| Origen | Base de datos remota | Interacción del usuario |
| Sincronización | Necesaria (puede estar desactualizado) | No necesaria |
| Herramienta | TanStack Query | useState, Zustand |
| Ejemplos | Lista de usuarios, productos, posts | Filtro activo, modal abierto, form inputs |

## ¿Cuándo usarlo?
- Siempre que hagas fetch de datos en una app React.
- Apps con operaciones CRUD donde necesitás que la UI se sincronice con el servidor.
- Cuando necesitás caché, paginación, infinite scroll o prefetching.

## ¿Cuándo NO usarlo?
- Apps sin backend (solo estado local).
- Si tu fetch es extremadamente simple y no necesitás caché ni sincronización.
- Para estado del cliente puro (formularios, UI): usá `useState` o Zustand.

## ¿Vale la pena aprenderlo?
Sí, es una de las librerías más impactantes para la DX en React. La curva de aprendizaje de `useQuery` es baja. `useMutation` con invalidación requiere entender el modelo de caché, lo que toma algo más de tiempo. Es muy demandada en el mercado laboral, especialmente en combinación con Next.js o React con un backend REST/GraphQL.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **TanStack Query** (esta) | Caché, sincronización, refetch automático, REST/cualquier API |
| **SWR** | API más simple, solo necesitás básicos, menor bundle |
| **RTK Query** | Ya usás Redux Toolkit, querés todo integrado |
| **Apollo Client** | API es GraphQL específicamente |
| **useEffect manual** | Script único, sin caché, sin equipo |

## Qué hace el ejemplo de esta rama
`src/App.tsx` configura `QueryClientProvider` y usa `useQuery` para obtener datos de una API pública (como JSONPlaceholder) mostrando estados de loading y error. También puede incluir `useMutation` para agregar o eliminar un item con invalidación automática del caché.

## Cómo ejecutar
```bash
git checkout feat/tanstack-query
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [TanStack Query — documentación oficial](https://tanstack.com/query/latest)
- [Por qué TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
