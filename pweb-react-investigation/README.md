# Material UI (MUI)

## ¿Qué es?
Material UI (MUI) es la librería de componentes React más popular del ecosistema, con más de 90.000 estrellas en GitHub. Implementa Material Design, el sistema de diseño creado por Google en 2014 con principios basados en papel y tinta digital. MUI fue creado por Olivier Tassinari y la comunidad en 2014.

MUI ofrece un ecosistema completo: `@mui/material` con los componentes base, `@mui/x-data-grid` para tablas avanzadas, `@mui/x-date-pickers` para selectores de fecha, y `@mui/lab` para componentes experimentales. Esta cobertura amplia lo hace especialmente popular en aplicaciones enterprise y paneles de administración.

La versión 5 (2021) migró de JSS a Emotion como motor CSS-in-JS e introdujo el sistema `sx` prop para estilos inline con soporte de tokens. La versión 6 (2024) mejoró la compatibilidad con CSS variables y Server Components.

## ¿Para qué sirve?
Construir interfaces con el design system de Material Design: elevación, animaciones de ripple, tipografía Roboto, paleta de colores semántica. Especialmente útil para dashboards internos, herramientas B2B y aplicaciones de gestión donde la consistencia visual y la cantidad de componentes disponibles son prioritarias.

En el mundo real: un sistema de gestión con tablas paginadas (`DataGrid`), formularios con validación, diálogos modales, drawer de navegación y snackbars de notificación — todo con el mismo lenguaje visual de Material Design.

## Principios de Material Design

**Superficie y elevación** — Los elementos tienen una "altura" visual. Las sombras (`elevation`) indican jerarquía. Los tooltips flotan sobre el contenido.

**Movimiento con significado** — Las animaciones comunican relaciones entre elementos. El ripple effect en botones confirma la interacción.

**Claridad y legibilidad** — Tipografía clara con jerarquía bien definida (h1-h6, body1, body2, caption).

**Color semántico** — primary, secondary, error, warning, info, success como roles de color independientes del valor hexadecimal.

## Conceptos clave

**ThemeProvider** — Provider que inyecta el tema en todos los componentes MUI. Permite personalizar paleta, tipografía, breakpoints y variantes de componentes.

**sx prop** — Prop de estilos inline que acepta propiedades CSS y tokens del tema. Alternativa a `makeStyles` para estilos específicos de un componente: `sx={{ mt: 2, color: 'primary.main' }}`.

**Variantes** — Cada componente tiene variantes predefinidas. `Button` tiene `variant="contained"`, `"outlined"`, `"text"`. `Typography` tiene `variant="h1"` a `"caption"`.

**Breakpoints del tema** — `xs` (0px), `sm` (600px), `md` (900px), `lg` (1200px), `xl` (1536px). Usables en `sx`: `sx={{ width: { xs: '100%', md: '50%' } }}`.

**Grid system** — Grid de 12 columnas responsive: `<Grid container>` + `<Grid item xs={12} md={6}>`.

## ¿Cuándo usarlo?
- Aplicaciones enterprise, dashboards B2B o herramientas internas.
- Cuando necesitás componentes complejos como DataGrid, DatePicker o TreeView.
- Equipos que conocen Material Design y quieren consistencia inmediata.
- Proyectos donde la velocidad de desarrollo supera la necesidad de diseño personalizado.

## ¿Cuándo NO usarlo?
- Productos consumer con identidad visual propia que choca con Material Design.
- Apps donde el bundle size es crítico (MUI agrega peso considerable).
- Cuando el equipo quiere control total sobre los estilos sin pelear con los estilos de MUI.

## ¿Vale la pena aprenderlo?
Sí. MUI tiene la mayor demanda laboral de todas las librerías de componentes React. Aunque su look puede sentirse "genérico", la personalización con `ThemeProvider` es potente. La curva de aprendizaje del sistema de temas es media-alta, pero los componentes básicos son inmediatos. Es especialmente valioso para roles de frontend en empresas medianas y grandes.

## Alternativas

| Tecnología | Cuándo elegirla |
|------------|-----------------|
| **Material UI (MUI)** (esta) | Material Design, muchos componentes, enterprise, DataGrid |
| **Chakra UI** | Diseño personalizado, mejor API para theming flexible |
| **Tailwind CSS** | Control total, sin componentes prediseñados, velocidad |
| **shadcn/ui** | Componentes copiados, Tailwind, máximo control del código |
| **Ant Design** | Ecosistema similar a MUI pero con estética de Ant Financial |

## ¿MUI o Chakra UI?
MUI tiene más componentes (especialmente para datos: DataGrid, DatePicker) y es más maduro para enterprise. Chakra es más fácil de personalizar fuera del look de Material y tiene una API de props más limpia. Si el proyecto requiere un DataGrid o DatePicker avanzado, MUI gana por goleada. Si el diseño es personalizado y no Material-like, Chakra tiene menos fricción.

## Qué hace el ejemplo de esta rama
`src/App.tsx` configura `ThemeProvider` con un tema personalizado y usa componentes como `Button`, `TextField`, `Card`, `AppBar`, `Typography` con el sistema de `sx` prop. Demuestra las variantes y el sistema de breakpoints responsive.

## Cómo ejecutar
```bash
git checkout feat/material-ui
cd pweb-react-investigation
npm install
npm run dev
```

## Recursos oficiales
- [MUI — documentación oficial](https://mui.com/)
- [Material Design 3](https://m3.material.io/)
- [MUI X — componentes avanzados](https://mui.com/x/)
