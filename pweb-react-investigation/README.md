# Tailwind CSS

## What is it?
Tailwind CSS is a utility-first CSS framework created by Adam Wathan and released in 2017. Instead of providing pre-built components like Bootstrap, Tailwind provides low-level classes (utilities) that each apply a single CSS property. You build styles by composing these classes directly in HTML/JSX.

Version 3 (2021) introduced the JIT (Just-In-Time) engine that generates only the CSS you actually use, drastically reducing the development bundle size and enabling arbitrary values like `w-[37px]`. Version 4 (2025) removed the default configuration file and uses native CSS custom properties.

The utility-first approach solves classic CSS problems: naming (no names to invent), specificity (all utilities have the same specificity), and the tendency for CSS to grow indefinitely (Tailwind's CSS doesn't grow with the app — only what you use is included).

## What is it used for?
Styling interfaces quickly without writing custom CSS, maintaining visual consistency through a predefined design system (spacing scale, color palette, typography), and co-locating styles with markup to facilitate maintenance.

In the real world: teams that can build complete UIs without leaving the JSX file, with consistency guaranteed by Tailwind's token system.

## Utility-first vs Component-based CSS

| Aspect | Utility-first (Tailwind) | Component-based (CSS Modules, Styled) |
|--------|--------------------------|---------------------------------------|
| Where styles live | In markup as classes | In CSS files or template literals |
| Naming | No need to invent names | Must name every class |
| Reuse | React component as the unit | CSS class as the unit |
| Initial learning | High (memorize classes) | Low (standard CSS) |
| Maintenance | Co-located, easy to see | Can spread across files |
| CSS bundle | Only what you use (JIT) | Everything you declare |

## Tailwind Breakpoints

| Prefix | Min width | Typical device |
|--------|-----------|---------------|
| (no prefix) | 0px | Mobile (mobile-first) |
| `sm:` | 640px | Small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |
| `2xl:` | 1536px | Very large screen |

## Spacing Scale
Tailwind uses a scale where each unit = 4px: `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-8` = 32px, `p-16` = 64px. Applied to padding, margin, width, height, gap, etc.

## Key Concepts

**Utility classes** — Single-purpose classes: `flex`, `text-center`, `bg-blue-500`, `rounded-lg`, `shadow-md`. Combined in JSX to build the layout.

**Responsive design** — Mobile-first with breakpoint prefixes: `class="w-full md:w-1/2 lg:w-1/3"` (full on mobile, half on tablet, third on desktop).

**Dark mode** — Enabled with the `dark:` prefix: `class="bg-white dark:bg-gray-900"`.

**State variants** — Prefixes for states: `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:`.

**@apply** — CSS directive to extract repeated utilities into a custom class. Useful for highly reusable components.

## When to use it?
- Projects where you want development speed without a component library.
- When you need custom design (not the Bootstrap or MUI look).
- Teams that want visual consistency without their own design system.
- With React + Vite for optimal DX.

## When NOT to use it?
- When the team prefers standard CSS and finds long classnames unreadable.
- Applications that need a pre-existing corporate design system (use MUI or Chakra).
- If HTML/JSX becomes unreadable due to long classnames (signal to extract components).

## Is it worth learning?
Yes, it's a highly in-demand skill. Tailwind dominated the market in 2022-2025 and is the standard in many modern teams. The learning curve is medium: the first few days memorizing classes are frustrating, but after a week productivity surpasses manual CSS. With the VS Code extension (Tailwind IntelliSense), autocomplete makes the experience very smooth.

## Alternatives

| Technology | When to choose it |
|------------|------------------|
| **Tailwind CSS** (this) | Custom design, speed, no pre-built components |
| **CSS Modules** | Standard CSS, no dependencies, automatic scoping |
| **Styled Components / Emotion** | CSS-in-JS, dynamic styles with props, theming |
| **Chakra UI** | Accessible components + integrated design system |
| **Material UI (MUI)** | Complete Material design system, many components |
| **shadcn/ui** | Radix + Tailwind components, copied into the project |

## What does the example in this branch do?
`src/App.tsx` builds an interface using only Tailwind classes: layout with flexbox/grid, typography, colors, spacing, and responsive design. It demonstrates how utilities are composed to build components without writing a single line of custom CSS.

## How to run
```bash
git checkout feat/tailwind
cd pweb-react-investigation
npm install
npm run dev
```

## Official Resources
- [Tailwind CSS — official documentation](https://tailwindcss.com/docs)
- [Tailwind UI (paid components)](https://tailwindui.com/)
- [Tailwind IntelliSense for VS Code](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
