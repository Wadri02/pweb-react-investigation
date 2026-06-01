# React Testing Library

## ¿Qué es?
React Testing Library (RTL) es una librería de testing para componentes React, creada por Kent C. Dodds y lanzada en 2018. Su filosofía central es: "Cuanto más se parecen tus tests a como los usuarios usan el software, más confianza te dan."

RTL no testea implementación: no accede al estado interno del componente, no busca por nombre de clase CSS, no llama métodos del componente directamente. En cambio, testea comportamiento: qué ve el usuario, qué puede hacer, qué pasa cuando lo hace.

Reemplazó a Enzyme (la librería anterior de testing de React) que permitía hacer shallow rendering e inspeccionar el estado interno. RTL es opinionada: si no puedes testear algo con RTL, probablemente el componente está mal diseñado para el usuario.

## ¿Para qué sirve?
Testear componentes React desde la perspectiva del usuario: renderizar el componente, interactuar con él (clicks, typing, form submissions), y verificar que el DOM muestra lo correcto.

En el mundo real: testear que un botón de "Agregar al carrito" agrega el item y actualiza el contador, sin importar si internamente usa `useState` o Zustand.

## Filosofía: testear comportamiento no implementación

```tsx
// ❌ Testear implementación (frágil, se rompe en refactors)
const wrapper = shallow(<Button />)
expect(wrapper.state('isClicked')).toBe(true)
expect(wrapper.find('.btn-class')).toHaveLength(1)

// ✅ Testear comportamiento (robusto, refleja lo que el usuario ve)
render(<Button />)
userEvent.click(screen.getByRole('button', { name: /agregar/i }))
expect(screen.getByText('1 item en el carrito')).toBeInTheDocument()
```

Si refactorizás `useState` por Zustand, el test de comportamiento sigue pasando.

## Queries en orden de preferencia

RTL ofrece múltiples queries. Usarlas en este orden garantiza que tus tests son accesibles:

| Prioridad | Query | Úsala cuando... |
|-----------|-------|-----------------|
| 1 (más preferida) | `getByRole` | El elemento tiene un rol ARIA (button, link, heading, etc.) |
| 2 | `getByLabelText` | Input asociado a un label (formularios) |
| 3 | `getByPlaceholderText` | Input sin label pero con placeholder |
| 4 | `getByText` | Elemento con texto visible |
| 5 | `getByDisplayValue` | Input con valor actual |
| 6 | `getByAltText` | Imagen con alt text |
| 7 | `getByTitle` | Elemento con atributo title |
| 8 (menos preferida) | `getByTestId` | Solo cuando nada más funciona |

## Conceptos clave

**get / query / find** — Variantes de cada query:
- `getBy...` — Retorna el elemento o lanza error si no existe. Úsala cuando el elemento debe estar presente.
- `queryBy...` — Retorna el elemento o `null`. Úsala para verificar que algo NO está: `expect(queryByText('Error')).not.toBeInTheDocument()`.
- `findBy...` — Retorna una promesa. Úsala para elementos que aparecen asincrónicamente.

**userEvent vs fireEvent** — `userEvent` (del paquete `@testing-library/user-event`) simula interacciones reales del usuario: typing dispara keydown + keypress + input + keyup. `fireEvent` es de bajo nivel y solo dispara un evento. Preferí siempre `userEvent`.

**render** — Renderiza el componente en un DOM virtual (jsdom). Retorna queries y el `container`.

**screen** — Objeto global de RTL que contiene todas las queries sobre el DOM renderizado. Preferible a destructurar de `render`.

**waitFor** — Espera a que una assertion pase, útil para efectos asincrónicos.

## ¿Cuándo usarlo?
- Para todo test de componentes React (junto con Jest o Vitest como runner).
- Cuando querés que los tests sean robustos ante refactors internos.
- Para testear accesibilidad implícitamente (usar `getByRole` te obliga a tener roles correctos).

## ¿Cuándo NO usarlo?
- Para tests unitarios de funciones puras o hooks sin UI: Jest/Vitest es suficiente.
- Para E2E: Cypress o Playwright son más adecuados.

## ¿Vale la pena aprenderlo?
Absolutamente. RTL es el estándar para testing de componentes React. La curva de aprendizaje es media: entender el modelo mental (testear comportamiento, no implementación) y las queries asincrónicas requiere práctica. Una vez internalizado el paradigma, los tests se escriben rápido y son muy robustos. Alta demanda laboral en empresas con cultura de testing.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **React Testing Library** (esta) | Estándar para unit/integration de componentes React |
| **Enzyme** | Proyectos legacy en React < 17, shallow rendering |
| **Cypress Component Testing** | Tests de componentes con un browser real |
| **Playwright** | Testing de componentes más cercano al E2E |

## Qué hace el ejemplo de esta rama
`src/App.tsx` contiene componentes con interacciones (botones, formularios, listas). Los tests demuestran `render`, queries con `screen.getByRole` y `screen.getByText`, interacciones con `userEvent`, assertions con `toBeInTheDocument()`, y el patrón `findBy` para elementos que aparecen después de una acción asincrónica.

## Cómo ejecutar
```bash
git checkout feat/rtl
cd pweb-react-investigation
npm install
npm test
```

## Recursos oficiales
- [React Testing Library — documentación oficial](https://testing-library.com/docs/react-testing-library/intro/)
- [Queries — guía de prioridad](https://testing-library.com/docs/queries/about#priority)
- [user-event v14](https://testing-library.com/docs/user-event/intro)
