# Material UI (MUI)

## What is it?
Material UI (MUI) is the most popular React component library in the ecosystem, with over 90,000 GitHub stars. It implements Material Design, the design system created by Google in 2014 with principles based on digital paper and ink. MUI was created by Olivier Tassinari and the community in 2014.

MUI offers a complete ecosystem: `@mui/material` with the base components, `@mui/x-data-grid` for advanced tables, `@mui/x-date-pickers` for date selectors, and `@mui/lab` for experimental components. This broad coverage makes it especially popular in enterprise applications and admin dashboards.

Version 5 (2021) migrated from JSS to Emotion as its CSS-in-JS engine and introduced the `sx` prop system for inline styles with token support. Version 6 (2024) improved compatibility with CSS variables and Server Components.

## What is it used for?
Building interfaces with Material Design: elevation, ripple animations, Roboto typography, semantic color palette. Especially useful for internal dashboards, B2B tools, and management applications where visual consistency and component availability are priorities.

In the real world: a management system with paginated tables (`DataGrid`), forms with validation, modal dialogs, navigation drawer, and notification snackbars — all with the same Material Design visual language.

## Material Design Principles

**Surface and elevation** — Elements have a visual "height." Shadows (`elevation`) indicate hierarchy. Tooltips float above content.

**Motion with meaning** — Animations communicate relationships between elements. The ripple effect on buttons confirms interaction.

**Clarity and readability** — Clear typography with well-defined hierarchy (h1-h6, body1, body2, caption).

**Semantic color** — primary, secondary, error, warning, info, success as color roles independent of the hex value.

## Key Concepts

**ThemeProvider** — Provider that injects the theme into all MUI components. Allows customizing palette, typography, breakpoints, and component variants.

**sx prop** — Inline style prop that accepts CSS properties and theme tokens. Alternative to `makeStyles` for component-specific styles: `sx={{ mt: 2, color: 'primary.main' }}`.

**Variants** — Each component has predefined variants. `Button` has `variant="contained"`, `"outlined"`, `"text"`. `Typography` has `variant="h1"` through `"caption"`.

**Theme breakpoints** — `xs` (0px), `sm` (600px), `md` (900px), `lg` (1200px), `xl` (1536px). Usable in `sx`: `sx={{ width: { xs: '100%', md: '50%' } }}`.

**Grid system** — 12-column responsive grid: `<Grid container>` + `<Grid item xs={12} md={6}>`.

## When to use it?
- Enterprise applications, B2B dashboards, or internal tools.
- When you need complex components like DataGrid, DatePicker, or TreeView.
- Teams familiar with Material Design who want immediate consistency.
- Projects where development speed outweighs the need for custom design.

## When NOT to use it?
- Consumer products with a custom visual identity that clashes with Material Design.
- Apps where bundle size is critical (MUI adds considerable weight).
- When the team wants full CSS control without fighting MUI's built-in styles.

## Is it worth learning?
Yes. MUI has the highest job market demand of all React component libraries. Although its look can feel "generic," customization with `ThemeProvider` is powerful. The learning curve for the theme system is medium-high, but basic components are immediately accessible. Especially valuable for frontend roles at medium and large companies.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **Material UI (MUI)** (this) | Material Design, many components, enterprise, DataGrid |
| **Chakra UI** | Custom design, better API for flexible theming |
| **Tailwind CSS** | Full control, no pre-built components, speed |
| **shadcn/ui** | Components copied into the project, Tailwind, maximum code control |
| **Ant Design** | Similar ecosystem to MUI but with Ant Financial aesthetics |

## MUI or Chakra UI?
MUI has more components (especially for data: DataGrid, DatePicker) and is more mature for enterprise. Chakra is easier to customize outside Material's look and has a cleaner props API. If the project requires an advanced DataGrid or DatePicker, MUI wins decisively. If the design is custom and non-Material-like, Chakra has less friction.

## What does the example in this branch do?
`src/App.tsx` configures `ThemeProvider` with a custom theme and uses components like `Button`, `TextField`, `Card`, `AppBar`, `Typography` with the `sx` prop system. It demonstrates variants and the responsive breakpoint system.

## How to run
```bash
git checkout feat/material-ui
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [MUI — official documentation](https://mui.com/)
- [Material Design 3](https://m3.material.io/)
- [MUI X — advanced components](https://mui.com/x/)
