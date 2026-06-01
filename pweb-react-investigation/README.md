# MobX

## ¿Qué es?
MobX es una librería de gestión de estado reactivo para JavaScript y TypeScript, creada por Michel Weststrate en 2015. Es una de las librerías de estado más maduras del ecosistema React y se usa ampliamente en aplicaciones enterprise. Su filosofía se basa en la programación reactiva: en lugar de describir cómo actualizar el estado, describís relaciones entre datos y MobX se encarga de propagarlas automáticamente.

MobX funciona con el patrón observable/observer: los objetos de estado son observables, y los componentes que los leen son observers. Cuando un observable cambia, todos sus observers se actualizan automáticamente. Esto se logra mediante proxies de JavaScript que rastrean qué propiedades se leen y cuándo cambian.

A diferencia de Zustand (que es funcional), MobX adopta un modelo imperativo orientado a objetos: podés mutar el estado directamente y MobX lo rastrea.

## ¿Para qué sirve?
Gestionar estado complejo con relaciones entre datos, donde múltiples valores derivados dependen de una fuente de verdad. Ideal cuando el dominio del problema encaja naturalmente con un modelo de objetos.

En el mundo real: una aplicación de gestión de tareas donde el total de tareas completadas, el porcentaje de progreso y las tareas filtradas se derivan automáticamente del array principal. Con MobX `computed`, estos valores se recalculan solo cuando el array cambia.

## Conceptos clave

**observable** — Marca un valor (objeto, array, Map, primitivo) como observable. Cualquier cambio en él notifica a los observers. Con la API moderna, usás `makeAutoObservable` en la clase.

**observer** — HOC o función de MobX-React que envuelve un componente de React. El componente re-renderiza solo cuando los observables que leyó durante el último render cambian.

**action** — Función que modifica observables. MobX agrupa todas las mutaciones en una acción como una transacción atómica, evitando renders intermedios.

**computed** — Valor derivado de observables. Se recalcula automáticamente y solo cuando sus dependencias cambian. Funciona como un getter memoizado.

**reaction / autorun** — Efectos secundarios que corren automáticamente cuando sus observables cambian. `autorun` corre inmediatamente; `reaction` corre cuando un valor específico cambia.

## Estado imperativo (MobX) vs funcional (Zustand)

| Aspecto | MobX (imperativo) | Zustand (funcional) |
|---------|-------------------|---------------------|
| Mutación | Directa: `store.count++` | Con setter: `set(s => ({count: s.count + 1}))` |
| Derivaciones | `computed` automático | Manual con selectores |
| Rastreo de dependencias | Automático por proxies | Manual (el dev decide qué ver) |
| Boilerplate | Bajo con `makeAutoObservable` | Muy bajo |
| Debugging | Más complejo (magia de proxies) | Más predecible |
| Paradigma | OOP / reactivo | Funcional / explícito |

## ¿Cuándo usarlo?
- Dominios complejos con muchas relaciones entre datos (finanzas, simulaciones, spreadsheets).
- Equipos con background en OOP que prefieren el modelo de clases.
- Cuando tenés muchos valores derivados (`computed`) que dependen unos de otros.
- Apps enterprise con modelos de dominio ricos.

## ¿Cuándo NO usarlo?
- Proyectos simples o medianos donde Zustand es suficiente.
- Equipos que prefieren el paradigma funcional.
- Cuando la "magia" de los proxies dificulta el debugging para el equipo.
- Apps con mucho estado del servidor: combinarlo con TanStack Query es mejor que usarlo para todo.

## ¿Vale la pena aprenderlo?
MobX tiene una curva de aprendizaje media: los conceptos de observable/computed/action son simples, pero entender cuándo React re-renderiza y cómo evitar problemas de reactividad requiere experiencia. Sigue siendo muy demandado en proyectos enterprise que lo adoptaron antes de que Zustand se popularizara. Para proyectos nuevos, la tendencia del mercado favoreció Zustand.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **MobX** (esta) | OOP, muchos derivados, dominio complejo, proyecto enterprise |
| **Zustand** | API funcional simple, mejor rendimiento por defecto, menos "magia" |
| **Redux Toolkit** | Equipos grandes, DevTools completos, middlewares |
| **Context API** | Sin dependencias, estado estático |

## ¿MobX o Zustand?
Para proyectos nuevos, Zustand es la recomendación predeterminada: más simple, más predecible, mejor alineado con el paradigma funcional de React moderno. MobX es la elección correcta cuando el modelo de dominio es complejo y orientado a objetos, o cuando el equipo tiene experiencia previa con el patrón reactivo (RxJS, Angular, Vue 2). No hay respuesta universal: si el dominio encaja con el modelo observable, MobX puede ser más natural que forzar todo en funciones puras.

## Qué hace el ejemplo de esta rama
`src/App.tsx` define un store de MobX con `makeAutoObservable`, exponiendo observables y actions. Los componentes están envueltos con `observer` de `mobx-react-lite` para suscribirse automáticamente a los cambios. El ejemplo muestra la diferencia entre mutación directa y las actualizaciones optimizadas de renders.

## Cómo ejecutar
```bash
git checkout feat/mobx
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [MobX — documentación oficial](https://mobx.js.org/)
- [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite)
