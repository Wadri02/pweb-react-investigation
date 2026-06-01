import { useSyncExternalStore } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

// Las tres funciones que requiere useSyncExternalStore:

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

function getSnapshot() {
  return window.innerWidth
}

function getServerSnapshot() {
  return 0  // fallback para SSR (no disponible en servidor)
}

const BREAKPOINTS = [
  { max: 640, label: 'xs', desc: 'Mobile' },
  { max: 768, label: 'sm', desc: 'Mobile grande' },
  { max: 1024, label: 'md', desc: 'Tablet' },
  { max: 1280, label: 'lg', desc: 'Desktop' },
  { max: Infinity, label: 'xl', desc: 'Desktop grande' },
]

export default function UseSyncExternalStoreExample() {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const bp = BREAKPOINTS.find(b => width < b.max) ?? BREAKPOINTS[BREAKPOINTS.length - 1]

  return (
    <ExampleWrapper
      hook="useSyncExternalStore"
      description="Suscribe a un store externo (browser APIs, Redux, Zustand) de forma segura para React Concurrent Mode."
      when="Para leer estado de fuentes externas a React: window.innerWidth, localStorage, stores de terceros. Redux Toolkit y Zustand lo usan internamente."
    >
      <div className="store-demo">
        <div className="width-display">
          <span className="width-number">{width}</span>
          <span className="width-unit">px</span>
        </div>

        <div className="breakpoint-badge">
          <strong>{bp.label}</strong> — {bp.desc}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {BREAKPOINTS.map(b => (
            <span
              key={b.label}
              style={{
                fontSize: 11,
                padding: '3px 10px',
                borderRadius: 20,
                fontWeight: 700,
                background: b.label === bp.label ? '#6366f1' : '#f1f5f9',
                color: b.label === bp.label ? 'white' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              {b.label}
            </span>
          ))}
        </div>

        <p className="hint" style={{ marginTop: 12 }}>
          Redimensioná la ventana del navegador para ver la actualización en tiempo real
        </p>
      </div>

      <div className="code-block">
        <code>{`// 1. subscribe: registra el listener
function subscribe(callback) {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

// 2. getSnapshot: retorna el valor actual (debe ser puro y estable)
function getSnapshot() {
  return window.innerWidth
}

// 3. getServerSnapshot: valor para SSR
function getServerSnapshot() {
  return 0
}

// Uso:
const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`}</code>
      </div>

      <p className="explanation">
        Comparado con <code>useEffect</code> + <code>useState</code>, <code>useSyncExternalStore</code>
        garantiza consistencia en <strong>Concurrent Mode</strong>: no puede haber un frame donde
        React vea valores diferentes del store en distintas partes del árbol (tearing).
        Redux y Zustand lo usan internamente desde React 18.
      </p>
    </ExampleWrapper>
  )
}
