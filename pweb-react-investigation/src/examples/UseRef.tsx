import { useRef, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

export default function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(0)
  const [value, setValue] = useState('')
  const [, forceRender] = useState(0)

  renderCount.current++

  return (
    <ExampleWrapper
      hook="useRef"
      description="Persiste un valor mutable entre renders sin causar re-renders. También da acceso directo a nodos del DOM."
      when="Para acceder al DOM (focus, scroll, medidas) o guardar valores que no deben triggear re-renders: timers, contadores internos, valores de renders anteriores."
    >
      <div className="demo-section">
        <p className="section-title">Acceso al DOM</p>
        <div className="row">
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Escribe algo..."
            className="input"
            style={{ flex: 1 }}
          />
          <button
            className="btn btn--primary"
            onClick={() => inputRef.current?.focus()}
          >
            Focus
          </button>
        </div>
        <p className="hint">inputRef.current apunta al elemento &lt;input&gt; del DOM</p>
      </div>

      <div className="demo-section">
        <p className="section-title">Sin re-render</p>
        <div
          style={{
            padding: '14px 16px',
            background: '#f8fafc',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            fontSize: 14,
          }}
        >
          <code>renderCount.current</code> ={' '}
          <strong style={{ color: '#6366f1', fontSize: 18 }}>{renderCount.current}</strong>
          <span className="hint" style={{ marginTop: 0, marginLeft: 8 }}>
            se incrementa con cada render pero NO causa un nuevo render
          </span>
        </div>
        <button
          className="btn"
          style={{ marginTop: 10 }}
          onClick={() => forceRender(n => n + 1)}
        >
          Forzar re-render (ver cómo sube el contador)
        </button>
      </div>

      <div className="code-block">
        <code>{`const inputRef = useRef<HTMLInputElement>(null)
const renderCount = useRef(0)

// Acceso al DOM:
inputRef.current?.focus()

// Mutar sin re-render:
renderCount.current++  // ← no dispara re-render`}</code>
      </div>
    </ExampleWrapper>
  )
}
