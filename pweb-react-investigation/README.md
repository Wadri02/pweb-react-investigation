# Cypress

## ¿Qué es?
Cypress es una herramienta de testing end-to-end (E2E) para aplicaciones web, creada por Brian Mann y lanzada en 2017. A diferencia de herramientas anteriores como Selenium, Cypress corre directamente dentro del browser, lo que le permite tener acceso completo al DOM, al network, al storage y a los eventos del browser de forma nativa.

Su arquitectura permite videos automáticos de los tests, screenshots en fallos, time-travel debugging (ver el estado del DOM en cada step del test), y una interfaz visual que muestra qué hace el test en tiempo real.

Cypress también ofrece Component Testing para testear componentes React aislados con un browser real, pero su uso principal es E2E: simular un usuario real navegando por la app completa.

## ¿Para qué sirve?
Testear flujos completos del usuario tal como ocurren en el browser: abrir la app, navegar, hacer click, llenar formularios, verificar que el contenido cambia. Detecta bugs que los tests unitarios y de integración no pueden: problemas de layout, errores de red, comportamiento del browser.

En el mundo real: testear que un usuario puede registrarse, iniciar sesión, agregar un producto al carrito, ir al checkout, completar el pago y ver la confirmación — todo en el browser real.

## Diferencia entre tipos de tests

| Tipo | Nivel | Velocidad | Confianza | Herramienta |
|------|-------|-----------|-----------|-------------|
| **Unit test** | Función/módulo aislado | ⚡⚡⚡ Muy rápido | Media | Jest/Vitest |
| **Integration test** | Varios módulos juntos | ⚡⚡ Rápido | Alta | RTL + Vitest |
| **E2E test** | App completa en browser | ⚡ Lento | Muy alta | Cypress/Playwright |

La pirámide de tests recomienda muchos unit tests, algunos integration tests, y pocos E2E tests bien elegidos.

## Por qué usar data-cy para selectores

```tsx
// ❌ Frágil: se rompe si cambias el CSS o el texto
cy.get('.btn-primary')               // Depende de la clase CSS
cy.contains('Agregar al carrito')   // Depende del texto (cambia con i18n)

// ✅ Robusto: el atributo existe solo para tests
cy.get('[data-cy="add-to-cart-btn"]')  // No cambia con refactors de UI
```

`data-cy` (o `data-testid`) es un atributo HTML sin significado para el browser ni para CSS. Comunica a los devs que ese elemento es usado en tests y no debe eliminarse sin actualizar los tests.

## Conceptos clave

**cy.visit** — Navega a una URL. El punto de entrada de la mayoría de tests: `cy.visit('/')`.

**cy.get** — Selecciona elementos del DOM. Acepta cualquier selector CSS o `[data-cy="nombre"]`.

**cy.contains** — Busca un elemento que contenga el texto dado. Útil para verificar contenido visible.

**.should()** — Assertion encadenada. Cypress reintenta automáticamente hasta que pase o haga timeout: `cy.get('[data-cy="title"]').should('have.text', 'Bienvenido')`.

**.type()** — Simula escritura en un input: `cy.get('input[name="email"]').type('user@test.com')`.

**.click()** — Simula un click: `cy.get('[data-cy="submit"]').click()`.

**intercept** — Intercepta requests de red para mockear respuestas: `cy.intercept('GET', '/api/users', { fixture: 'users.json' })`.

## ¿Cuándo usarlo?
- Flujos críticos que deben funcionar siempre: login, registro, checkout, envío de formularios.
- Cuando querés confianza de que la app funciona en el browser real, no solo en jsdom.
- Regresión en features importantes antes de deployar.

## ¿Cuándo NO usarlo?
- Para testear lógica de funciones: demasiado lento, usá Jest/Vitest.
- Para cubrir todos los edge cases de un componente: demasiado costoso, usá RTL.
- No reemplaces tests unitarios con E2E: los E2E son para los happy paths y flujos críticos.

## ¿Vale la pena aprenderlo?
Sí, Cypress es el estándar de E2E más popular y su DX es excelente. La curva de aprendizaje de los comandos básicos es baja; `intercept` para mockear APIs y el manejo de timing asincrónico tiene curva media. Altamente valorado en equipos con prácticas de QA maduras.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Cypress** (esta) | DX excelente, debugging visual, muy popular |
| **Playwright** | Multi-browser (Cypress era solo Chromium-first), más rápido en CI, Microsoft |
| **Selenium** | Proyectos legacy, soporte multi-browser legacy |
| **Puppeteer** | Control de bajo nivel sobre Chrome, no es un framework de testing |

## Qué hace el ejemplo de esta rama
Los archivos de test en `cypress/e2e/` demuestran `cy.visit`, `cy.get` con selectores `data-cy`, `.type()`, `.click()`, `.should()` para assertions, y el flujo completo de al menos una feature de la app. El código en `src/App.tsx` incluye atributos `data-cy` en los elementos que los tests usan.

## Cómo ejecutar
```bash
git checkout feat/cypress
cd pweb-react-investigation
npm install
npm run dev          # En una terminal (Cypress necesita la app corriendo)
npx cypress open     # En otra terminal (abre la interfaz visual)
# o para headless:
npx cypress run
```

## Recursos oficiales
- [Cypress — documentación oficial](https://docs.cypress.io/)
- [Best practices de Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Playwright (alternativa)](https://playwright.dev/)
