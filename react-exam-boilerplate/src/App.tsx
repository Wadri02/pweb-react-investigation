import { useState } from 'react'
import './App.css'

import UseStateExample from './examples/UseState'
import UseReducerExample from './examples/UseReducer'
import UseContextExample from './examples/UseContext'
import UseRefExample from './examples/UseRef'
import UseImperativeHandleExample from './examples/UseImperativeHandle'
import UseEffectExample from './examples/UseEffect'
import UseLayoutEffectExample from './examples/UseLayoutEffect'
import UseInsertionEffectExample from './examples/UseInsertionEffect'
import UseMemoExample from './examples/UseMemo'
import UseCallbackExample from './examples/UseCallback'
import UseTransitionExample from './examples/UseTransition'
import UseDeferredValueExample from './examples/UseDeferredValue'
import UseIdExample from './examples/UseId'
import UseDebugValueExample from './examples/UseDebugValue'
import UseSyncExternalStoreExample from './examples/UseSyncExternalStore'
import UseOptimisticExample from './examples/UseOptimistic'
import UseActionStateExample from './examples/UseActionState'
import UseFormStatusExample from './examples/UseFormStatus'
import UseExample from './examples/Use'

type HookId =
  | 'useState' | 'useReducer'
  | 'useContext'
  | 'useRef' | 'useImperativeHandle'
  | 'useEffect' | 'useLayoutEffect' | 'useInsertionEffect'
  | 'useMemo' | 'useCallback'
  | 'useTransition' | 'useDeferredValue'
  | 'useId' | 'useDebugValue' | 'useSyncExternalStore'
  | 'useOptimistic' | 'useActionState' | 'useFormStatus' | 'use'

interface HookEntry {
  id: HookId
  Component: React.ComponentType
  react19?: boolean
}

interface Category {
  name: string
  hooks: HookEntry[]
}

const CATEGORIES: Category[] = [
  {
    name: 'State (Estado)',
    hooks: [
      { id: 'useState', Component: UseStateExample },
      { id: 'useReducer', Component: UseReducerExample },
    ],
  },
  {
    name: 'Context (Contexto)',
    hooks: [
      { id: 'useContext', Component: UseContextExample },
    ],
  },
  {
    name: 'Ref (Referencias)',
    hooks: [
      { id: 'useRef', Component: UseRefExample },
      { id: 'useImperativeHandle', Component: UseImperativeHandleExample },
    ],
  },
  {
    name: 'Effect (Efectos)',
    hooks: [
      { id: 'useEffect', Component: UseEffectExample },
      { id: 'useLayoutEffect', Component: UseLayoutEffectExample },
      { id: 'useInsertionEffect', Component: UseInsertionEffectExample },
    ],
  },
  {
    name: 'Performance (Rendimiento)',
    hooks: [
      { id: 'useMemo', Component: UseMemoExample },
      { id: 'useCallback', Component: UseCallbackExample },
    ],
  },
  {
    name: 'Transition (Transiciones)',
    hooks: [
      { id: 'useTransition', Component: UseTransitionExample },
      { id: 'useDeferredValue', Component: UseDeferredValueExample },
    ],
  },
  {
    name: 'Other (Otros)',
    hooks: [
      { id: 'useId', Component: UseIdExample },
      { id: 'useDebugValue', Component: UseDebugValueExample },
      { id: 'useSyncExternalStore', Component: UseSyncExternalStoreExample },
    ],
  },
  {
    name: 'React 19',
    hooks: [
      { id: 'useOptimistic', Component: UseOptimisticExample, react19: true },
      { id: 'useActionState', Component: UseActionStateExample, react19: true },
      { id: 'useFormStatus', Component: UseFormStatusExample, react19: true },
      { id: 'use', Component: UseExample, react19: true },
    ],
  },
]

function findComponent(id: HookId): React.ComponentType | null {
  for (const cat of CATEGORIES) {
    for (const hook of cat.hooks) {
      if (hook.id === id) return hook.Component
    }
  }
  return null
}

export default function App() {
  const [selected, setSelected] = useState<HookId>('useState')

  const CurrentComponent = findComponent(selected)

  return (
    <div className="app-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>React Hooks</h1>
          <span>19 hooks · ejemplos interactivos</span>
        </div>

        {CATEGORIES.map(cat => (
          <div key={cat.name} className="category">
            <div className="category-title">{cat.name}</div>
            {cat.hooks.map(hook => (
              <button
                key={hook.id}
                className={`hook-btn ${selected === hook.id ? 'active' : ''}`}
                onClick={() => setSelected(hook.id)}
              >
                {hook.id}
                {hook.react19 && (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 9,
                      fontFamily: 'system-ui, sans-serif',
                      background: '#4f46e5',
                      color: 'white',
                      padding: '1px 5px',
                      borderRadius: 10,
                      fontWeight: 700,
                      letterSpacing: 0.3,
                      verticalAlign: 'middle',
                    }}
                  >
                    19
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* ── Content panel ── */}
      <main className="content">
        {CurrentComponent && <CurrentComponent key={selected} />}
      </main>
    </div>
  )
}
