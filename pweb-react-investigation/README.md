# Chakra UI v3

## ¿Qué es?
Chakra UI es una librería de componentes React accesibles, creada por Seun Adebayo y lanzada en 2019. Su filosofía es proveer componentes que sean accesibles por defecto (WAI-ARIA), composables, y altamente personalizables mediante un sistema de tokens y props de estilo.

La versión 3 (2024) fue una reescritura importante. El cambio más visible: `ChakraProvider` fue reemplazado por `Provider` de `@chakra-ui/react`, y el sistema de temas migró completamente a CSS custom properties (variables CSS). Internamente, Chakra v3 abandonó Emotion como motor CSS-in-JS y adoptó Panda CSS para mejor performance y compatibilidad con Server Components.

Chakra v3 también introdujo el concepto de `colorPalette` como prop estándar en todos los componentes, simplificando la aplicación de colores temáticos, y el sistema de recetas (`defineRecipe`) para variantes de componentes.

## ¿Para qué sirve?
Construir interfaces de usuario accesibles y consistentes sin escribir CSS, con componentes listos para producción que incluyen manejo de keyboard, focus management, y roles ARIA correctos.

En el mundo real: formularios, modales, tooltips, drawers y tablas con accesibilidad correcta sin tener que implementarla manualmente.

## Diferencias entre v2 y v3

| Característica | Chakra UI v2 | Chakra UI v3 |
|----------------|-------------|-------------|
| Provider principal | `ChakraProvider` | `Provider` (de `@chakra-ui/react`) |
| Motor CSS | Emotion | Panda CSS |
| Variables CSS | Generadas por JS | CSS custom properties nativas |
| Theming | `extendTheme()` | `createSystem()` + tokens |
| Colores | `colorScheme` prop | `colorPalette` prop |
| Server Components | Incompatible | Compatible |

## Conceptos clave

**Sistema de tokens** — Chakra define escala de espaciado, tipografía, colores y sombras como tokens. Se referencian con strings: `p="4"` (padding del token 4), `color="blue.500"`.

**colorPalette** — Prop en v3 que aplica una paleta de color semántica a un componente. Reemplaza `colorScheme` de v2. Ejemplo: `<Button colorPalette="blue">`.

**sx prop** — Prop de escape para CSS arbitrario. Acepta cualquier propiedad CSS más tokens de Chakra.

**Composición con `as`** — Muchos componentes aceptan `as` para cambiar el elemento HTML subyacente manteniendo los estilos.

**Recetas (defineRecipe)** — Sistema de v3 para definir variantes de componentes con una API tipada, similar a Tailwind CVA.

## ¿Cuándo usarlo?
- Cuando la accesibilidad es una prioridad y no querés implementarla manualmente.
- Proyectos que necesitan un design system consistente con theming flexible.
- Equipos que prefieren la API de props de estilo a las clases de Tailwind.
- Dashboards, apps internas, paneles de administración.

## ¿Cuándo NO usarlo?
- Cuando necesitás control total sobre el CSS (Tailwind o CSS Modules).
- Si el diseño es muy personalizado y los componentes de Chakra son un punto de partida difícil.
- Proyectos con bundle muy restrictivo (Chakra agrega peso).
- Cuando el diseño sigue Material Design específicamente (usar MUI).

## ¿Vale la pena aprenderlo?
Chakra UI tiene buena demanda en el mercado, especialmente en startups y empresas medianas. La curva de aprendizaje es baja: la API de props es intuitiva y la documentación es excelente. La migración de v2 a v3 tiene fricción considerable, por lo que proyectos existentes en v2 pueden quedarse ahí. Para proyectos nuevos, v3 es la versión correcta.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Chakra UI v3** (esta) | Accesibilidad, theming, composabilidad, API de props |
| **Material UI (MUI)** | Material Design, más componentes, más enterprise |
| **Tailwind CSS** | Control total de diseño, sin componentes prediseñados |
| **shadcn/ui** | Componentes copiados al proyecto, Tailwind, máximo control |
| **Radix UI** | Primitivos accesibles sin estilos, construís encima |

## ¿Chakra UI o MUI?
Chakra es más flexible y fácil de personalizar fuera del design system de Material. MUI tiene más componentes (DatePicker, DataGrid) y es más madura en enterprise. Si el diseño debe seguir Material Design, MUI. Si querés accesibilidad con libertad visual, Chakra. Para dashboards internos donde la apariencia es secundaria, MUI tiene más componentes listos. Para productos consumer con diseño propio, Chakra es más fácil de adaptar.

## Qué hace el ejemplo de esta rama
`src/App.tsx` configura el `Provider` de Chakra v3 y usa componentes como `Button`, `Box`, `Stack`, `Input`, `Text` con el sistema de tokens y `colorPalette`. Demuestra el theming y cómo los estilos se aplican con props directamente en los componentes.

## Cómo ejecutar
```bash
git checkout feat/chakra-ui
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [Chakra UI v3 — documentación oficial](https://www.chakra-ui.com/)
- [Guía de migración v2 → v3](https://www.chakra-ui.com/docs/get-started/migration)
