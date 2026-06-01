# Tailwind CSS

## ¿Qué es?
Tailwind CSS es un framework CSS utility-first creado por Adam Wathan y lanzado en 2017. En lugar de proveer componentes prediseñados como Bootstrap, Tailwind provee clases de bajo nivel (utilidades) que aplican una sola propiedad CSS cada una. Construís estilos componiendo estas clases directamente en el HTML/JSX.

La versión 3 (2021) introdujo el motor JIT (Just-In-Time) que genera solo el CSS que realmente usás, lo que redujo drásticamente el tamaño del bundle de desarrollo y habilitó valores arbitrarios como `w-[37px]`. La versión 4 (2025) eliminó el archivo de configuración por defecto y usa variables CSS nativas.

El enfoque utility-first resuelve los problemas clásicos de CSS: naming (no hay nombres que inventar), especificidad (todas las utilidades tienen la misma especificidad), y la tendencia del CSS a crecer indefinidamente (el CSS de Tailwind no crece con la app, solo lo que usás se incluye).

## ¿Para qué sirve?
Estilizar interfaces rápidamente sin escribir CSS personalizado, mantener consistencia visual a través de un sistema de diseño predefinido (escala de espaciado, paleta de colores, tipografía), y co-ubicar estilos con el markup para facilitar el mantenimiento.

En el mundo real: equipos que pueden construir UIs completas sin salir del archivo JSX, con consistencia garantizada por el sistema de tokens de Tailwind.

## Utility-first vs component-based CSS

| Aspecto | Utility-first (Tailwind) | Component-based (CSS Modules, Styled) |
|---------|--------------------------|---------------------------------------|
| Dónde vive el estilo | En el markup, como clases | En archivos CSS o template literals |
| Naming | No necesitás inventar nombres | Necesitás nombrar cada clase |
| Reutilización | Componente React como unidad | Clase CSS como unidad |
| Aprendizaje inicial | Alta (memorizar clases) | Baja (CSS estándar) |
| Mantenimiento | Co-ubicado, fácil de ver | Puede dispersarse en archivos |
| Bundle CSS | Solo lo que usás (JIT) | Todo lo que declarás |

## Breakpoints de Tailwind

| Prefijo | Tamaño mínimo | Dispositivo típico |
|---------|---------------|-------------------|
| (sin prefijo) | 0px | Mobile (mobile-first) |
| `sm:` | 640px | Tablet pequeña |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |
| `2xl:` | 1536px | Pantalla muy grande |

## Escala de espaciado (spacing scale)
Tailwind usa una escala donde cada unidad = 4px: `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-8` = 32px, `p-16` = 64px. Se aplica a padding, margin, width, height, gap, etc.

## Conceptos clave

**Utility classes** — Clases de un solo propósito: `flex`, `text-center`, `bg-blue-500`, `rounded-lg`, `shadow-md`. Se combinan en el JSX para construir el diseño.

**Responsive design** — Mobile-first con prefijos de breakpoint: `class="w-full md:w-1/2 lg:w-1/3"` (full en mobile, mitad en tablet, tercio en desktop).

**Dark mode** — Activado con el prefijo `dark:`: `class="bg-white dark:bg-gray-900"`.

**State variants** — Prefijos para estados: `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:`.

**@apply** — Directiva CSS para extraer utilidades repetidas a una clase personalizada. Útil para componentes muy reutilizados.

## ¿Cuándo usarlo?
- Proyectos donde querés velocidad de desarrollo sin una librería de componentes.
- Cuando necesitás diseño personalizado (no el look de Bootstrap o MUI).
- Equipos que quieren consistencia visual sin un design system propio.
- Con React + Vite para DX óptima.

## ¿Cuándo NO usarlo?
- Cuando el equipo prefiere CSS estándar y encuentra ilegibles los classnames largos.
- Aplicaciones que necesitan un design system corporativo preexistente (usar MUI o Chakra).
- Si el HTML/JSX se vuelve ilegible por el largo de los classnames (señal de extraer componentes).

## ¿Vale la pena aprenderlo?
Sí, es una habilidad muy demandada. Tailwind dominó el mercado en 2022-2025 y es el estándar en muchos equipos modernos. La curva de aprendizaje es media: los primeros días memorizando clases son frustrantes, pero después de una semana la productividad supera a CSS manual. Con la extensión de VS Code (Tailwind IntelliSense) el autocompletado hace la experiencia muy fluida.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Tailwind CSS** (esta) | Diseño personalizado, velocidad, sin componentes prediseñados |
| **CSS Modules** | CSS estándar, sin dependencias, scoping automático |
| **Styled Components / Emotion** | CSS-in-JS, estilos dinámicos con props, theming |
| **Chakra UI** | Componentes accesibles + sistema de diseño integrado |
| **Material UI (MUI)** | Design system Material completo, muchos componentes |
| **shadcn/ui** | Componentes Radix + Tailwind, copiados al proyecto |

## Qué hace el ejemplo de esta rama
`src/App.tsx` construye una interfaz usando solo clases de Tailwind: layout con flexbox/grid, tipografía, colores, espaciado, y responsive design. Demuestra cómo se componen las utilidades para construir componentes sin escribir una línea de CSS personalizado.

## Cómo ejecutar
```bash
git checkout feat/tailwind
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [Tailwind CSS — documentación oficial](https://tailwindcss.com/docs)
- [Tailwind UI (componentes de pago)](https://tailwindui.com/)
- [Tailwind IntelliSense para VS Code](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
