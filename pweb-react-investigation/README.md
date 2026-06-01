# Jest

## ¿Qué es?
Jest es un framework de testing para JavaScript creado por Facebook/Meta, lanzado en 2014. Es el test runner más popular del ecosistema JavaScript: incluye runner, assertions, mocking, coverage y watch mode en un solo paquete sin configuración.

Jest es famoso por su "zero config" approach: funciona sin configuración en la mayoría de proyectos JavaScript y TypeScript. Usa `jsdom` como entorno de DOM simulado, lo que permite testear código del browser sin un browser real.

**Nota importante para este proyecto:** Este proyecto usa Vite como bundler, y la comunidad Vite recomienda Vitest en lugar de Jest. Vitest tiene la misma API de Jest (describe, it, expect, vi en lugar de jest), está integrado con Vite, y es significativamente más rápido en proyectos Vite. Lo que aprendés en Jest aplica directamente a Vitest.

## ¿Para qué sirve?
Ejecutar tests unitarios e integration tests de forma rápida con feedback inmediato. Mockear módulos, timers y APIs externas para aislar el código bajo prueba.

En el mundo real: testear que una función de utilidad retorna el resultado correcto, que un componente React renderiza el estado esperado, o que una llamada a API se hace con los parámetros correctos.

## Tipos de tests

| Tipo | Qué testea | Herramienta |
|------|-----------|-------------|
| **Unit test** | Una función o módulo aislado | Jest/Vitest solo |
| **Integration test** | Múltiples módulos trabajando juntos | Jest/Vitest + RTL |
| **E2E test** | Flujo completo del usuario en el browser | Cypress / Playwright |

## Conceptos clave

**describe** — Agrupa tests relacionados. Puede anidarse. Es para organización: `describe('UserService', () => { ... })`.

**it / test** — Define un test individual. `it('debería retornar el usuario por ID', () => { ... })`. `it` y `test` son sinónimos.

**expect + matchers** — `expect(valor).toBe(esperado)` es la forma básica. Matchers comunes: `toBe` (igualdad estricta), `toEqual` (igualdad profunda), `toBeTruthy`, `toContain`, `toThrow`, `toHaveBeenCalledWith`.

**jest.fn()** — Crea un mock de función que registra sus llamadas. Útil para verificar que un callback fue llamado con los argumentos correctos.

**jest.mock()** — Reemplaza un módulo completo con una versión mockeada. `jest.mock('./api')` reemplaza todas las exportaciones de `./api` con funciones mock.

**beforeEach / afterEach** — Setup y teardown por test. `beforeAll` / `afterAll` corren una vez por bloque `describe`.

## Matchers más usados

```ts
expect(2 + 2).toBe(4)                    // Igualdad estricta (===)
expect({ a: 1 }).toEqual({ a: 1 })       // Igualdad profunda
expect([1, 2, 3]).toContain(2)            // El array contiene el elemento
expect(fn).toHaveBeenCalled()            // La función fue llamada
expect(fn).toHaveBeenCalledWith('arg')   // Fue llamada con ese argumento
expect(fn).toHaveBeenCalledTimes(3)      // Fue llamada N veces
expect(() => fn()).toThrow('error')      // La función lanza un error
```

## ¿Cuándo usarlo?
- Tests unitarios de funciones puras, hooks y utilities.
- Integration tests de componentes React con RTL.
- En proyectos que no usan Vite (CRA, Next.js fuera de Turbopack).

## ¿Cuándo NO usarlo?
- En proyectos Vite: usá Vitest (misma API, mejor integración, más rápido).
- Para E2E: usá Cypress o Playwright.

## ¿Vale la pena aprenderlo?
Sí, aunque en proyectos Vite usarás Vitest, la API es idéntica. Aprender Jest = aprender Vitest. La curva de aprendizaje es baja para tests básicos y media para mocking avanzado. Testing es una habilidad muy valorada en el mercado laboral, especialmente en empresas con prácticas de desarrollo maduras.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Vitest** | Proyectos Vite (este proyecto), misma API, mucho más rápido |
| **Jest** (esta) | CRA, Next.js, proyectos no-Vite, el más maduro |
| **Mocha + Chai** | Proyectos Node.js que prefieren modularidad |
| **Jasmine** | Proyectos Angular (incluido por defecto) |

## Qué hace el ejemplo de esta rama
`src/App.tsx` tiene componentes con lógica que puede testearse. Los archivos de test (`.test.ts` o `.test.tsx`) demuestran `describe`, `it`, `expect` con distintos matchers, `jest.fn()` para mockear callbacks, y `jest.mock()` para aislar módulos. Incluye ejemplos de unit test (función pura) e integration test básico (componente con RTL).

## Cómo ejecutar
```bash
git checkout feat/jest-rtl
cd pweb-react-investigation
npm install
npm test        # o npm run test
```

## Recursos oficiales
- [Jest — documentación oficial](https://jestjs.io/docs/getting-started)
- [Vitest — para proyectos Vite](https://vitest.dev/)
- [Diferencias Jest vs Vitest](https://vitest.dev/guide/migration.html)
