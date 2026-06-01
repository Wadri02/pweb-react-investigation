# Zustand

## ¿Qué es?
Zustand es una librería minimalista de gestión de estado para React, creada por Daishi Kato y el equipo de Poimandres (los mismos que Jotai y Valtio). El nombre significa "estado" en alemán. Fue publicada en 2019 como respuesta a la complejidad de Redux y las limitaciones de Context API para estado frecuentemente actualizado.

La filosofía de Zustand es "bear necessities" (lo mínimo necesario): una API pequeña, sin boilerplate, sin providers obligatorios, y con actualizaciones selectivas para evitar re-renders innecesarios. Su tamaño minificado y comprimido es de aproximadamente 1kb.

Internamente, Zustand usa `useSyncExternalStore` de React para suscribirse a los cambios del store, lo que garantiza compatibilidad con el modo concurrente de React 18+.

## ¿Para qué sirve?
Gestionar estado global compartido entre componentes que no tienen una relación padre-hijo directa, con mejor rendimiento que Context API para datos que cambian frecuentemente.

En el mundo real: un carrito de compras con productos, cantidad y total que múltiples componentes (header, sidebar, modal) necesitan leer y modificar. Con Zustand, cada componente se suscribe solo a la parte del estado que usa.

## Conceptos clave

**create** — Función principal. Recibe un callback que retorna el estado inicial y las acciones. Retorna un Hook personalizado.

**Selector** — Función pasada al Hook del store que elige qué parte del estado usar. El componente solo re-renderiza cuando esa parte cambia: `const count = useStore(s => s.count)`.

**set** — Función inyectada en el store para actualizar estado. Hace un merge shallow automático, no necesitás spread el estado anterior.

**get** — Función inyectada para leer el estado actual dentro de acciones. Útil para lógica que depende del estado previo.

**Middleware** — Zustand tiene middleware oficial para persistencia (`persist`), integración con DevTools (`devtools`), e Immer para mutaciones inmutables (`immer`).

## ¿Cuándo usarlo?
- Estado global que cambia frecuentemente (UI interactiva, filtros, carrito).
- Múltiples componentes desconectados que comparten datos.
- Cuando Context API genera re-renders excesivos.
- Como reemplazo de Redux en proyectos que no necesitan toda su infraestructura.

## ¿Cuándo NO usarlo?
- Estado local de un componente: usá `useState`.
- Datos del servidor (fetching, caché): usá TanStack Query.
- Proyectos muy simples donde Context API alcanza.
- Si el equipo ya está estandarizado en Redux con casos de uso complejos de middleware.

## ¿Vale la pena aprenderlo?
Absolutamente. Zustand es hoy la librería de estado más popular en el ecosistema React moderno, superando a Redux en nuevos proyectos según las encuestas de la comunidad. La curva de aprendizaje es muy baja: podés tener un store funcional en 10 líneas. La demanda laboral es alta y creciente.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Zustand** (esta) | API simple, rendimiento, proyectos modernos, equipo pequeño/mediano |
| **Context API** | Sin dependencias, datos estáticos, proyecto muy simple |
| **MobX** | Preferís estado reactivo/observable, vínculo directo con OOP |
| **Redux Toolkit** | Apps enterprise, equipo grande, middlewares complejos, DevTools |
| **Jotai** | Estado atómico fino, sin store centralizado |

## ¿Zustand, MobX o useContext?

**Zustand vs Context API:** Zustand gana en rendimiento (selectores evitan re-renders), ergonomía (no necesita Provider), y escalabilidad. Context API gana en cero dependencias.

**Zustand vs MobX:** Zustand es funcional y explícito: sabés exactamente cuándo cambia el estado. MobX es reactivo y mágico: las mutaciones se rastrean automáticamente. Zustand es más predecible y más fácil de debuggear; MobX tiene menos boilerplate para estados muy complejos con relaciones entre datos.

**Recomendación:** Para proyectos nuevos, Zustand es la elección predeterminada. MobX solo si el equipo tiene experiencia previa o si el dominio encaja naturalmente con el modelo reactivo (ej: apps de simulación, spreadsheets).

## Qué hace el ejemplo de esta rama
`src/App.tsx` define un store con Zustand que contiene estado y acciones (por ejemplo, un contador con incrementar/decrementar/resetear, o un carrito básico). Muestra cómo múltiples componentes consumen el mismo store con selectores independientes y cómo las acciones modifican el estado global.

## Cómo ejecutar
```bash
git checkout feat/zustand
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Documentación oficial](https://zustand.docs.pmnd.rs/)
