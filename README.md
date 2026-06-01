# pweb-react-investigation

## About

Practical research project covering the React ecosystem. 16 branches, each with a working example and documentation of a different technology. Created for the Web Programming course at Universidad Central del Ecuador (UCE).

Each branch is self-contained: it has its own `package.json`, a working `src/App.tsx` demo, and a `README.md` explaining the technology in depth.

## Tech Stack

### State Management
| Technology | Description |
|------------|-------------|
| React Hooks | Built-in React hooks: useState, useEffect, useRef, useMemo, useCallback, and all 19 hooks |
| Context API | React's built-in dependency injection mechanism for sharing data without prop drilling |
| Zustand | Minimal state management library (~1kb) using selectors to avoid unnecessary re-renders |
| MobX | Reactive state management based on the observable/observer pattern |

### Data Fetching
| Technology | Description |
|------------|-------------|
| TanStack Query | Server state management: caching, synchronization, and background updates |

### Routing
| Technology | Description |
|------------|-------------|
| React Router v6 | Standard SPA routing library with nested routes and Outlet layouts |
| TanStack Router | Type-safe routing with full TypeScript inference for params and search params |

### Styling & UI
| Technology | Description |
|------------|-------------|
| Tailwind CSS | Utility-first CSS framework for building custom designs without leaving JSX |
| Chakra UI v3 | Accessible component library with a flexible design token system |
| Material UI (MUI) | React implementation of Google's Material Design with a large component catalog |

### Forms & Validation
| Technology | Description |
|------------|-------------|
| React Hook Form | Performant form library using uncontrolled inputs to minimize re-renders |
| RHF + Zod | The modern standard: React Hook Form with Zod schema validation and TypeScript inference |
| Formik | Classic controlled-input form library, widely used in existing projects |

### Testing
| Technology | Description |
|------------|-------------|
| Jest / Vitest | Test runner with assertions, mocking, and coverage (Vitest for Vite projects) |
| React Testing Library | Component testing focused on user behavior rather than implementation details |
| Cypress | End-to-end testing that runs in a real browser with visual time-travel debugging |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Clone the repository
```bash
git clone https://github.com/Wadri02/pweb-react-investigation.git
cd pweb-react-investigation/pweb-react-investigation
npm install
```

### Run an example
```bash
# Switch to any branch
git checkout feat/hooks
cd pweb-react-investigation
npm install
npm run dev
# Open http://localhost:5173
```

## Branches Index

| Branch | Technology | How to run |
|--------|-----------|------------|
| `feat/hooks` | React Hooks | `npm run dev` |
| `feat/context` | Context API | `npm run dev` |
| `feat/zustand` | Zustand | `npm run dev` |
| `feat/mobx` | MobX | `npm run dev` |
| `feat/tanstack-query` | TanStack Query | `npm run dev` |
| `feat/react-router` | React Router v6 | `npm run dev` |
| `feat/tanstack-router` | TanStack Router | `npm run dev` |
| `feat/tailwind` | Tailwind CSS | `npm run dev` |
| `feat/chakra-ui` | Chakra UI v3 | `npm run dev` |
| `feat/material-ui` | Material UI | `npm run dev` |
| `feat/rhf` | React Hook Form | `npm run dev` |
| `feat/rhf-zod` | RHF + Zod | `npm run dev` |
| `feat/formik` | Formik | `npm run dev` |
| `feat/jest-rtl` | Jest / Vitest | `npm test` |
| `feat/rtl` | React Testing Library | `npm test` |
| `feat/cypress` | Cypress | `npm run dev` (terminal 1) + `npx cypress open` (terminal 2) |

## Branch Switching Guide

1. Stop the current dev server with `Ctrl+C`
2. Switch to the desired branch:
   ```bash
   git checkout feat/<branch-name>
   ```
3. Install dependencies (only needed if the branch adds new packages):
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173)

> **Tip:** Each branch has its own `README.md` inside `pweb-react-investigation/` with a full explanation of the technology, key concepts, when to use it, and how it compares to alternatives.

## Project Structure

```
pweb-react-investigation/          ← git repository root
├── README.md                      ← this file (project index)
└── pweb-react-investigation/      ← Vite + React app
    ├── src/
    │   ├── App.tsx                ← main component (changes per branch)
    │   ├── main.tsx               ← entry point
    │   └── ...                    ← additional files per branch
    ├── README.md                  ← branch-specific technology docs
    └── package.json
```

## Author

**Wadri** — Systems Engineering Student, Universidad Central del Ecuador (UCE)

- GitHub: [@Wadri02](https://github.com/Wadri02)
