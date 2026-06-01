import { memo, useCallback, useRef, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

// ─── Sin memo: re-renderiza SIEMPRE que el padre re-renderiza ─────────────
const ChildSinMemo = ({ onClick }: { onClick: () => void }) => {
  const renders = useRef(0)
  renders.current++
  return (
    <div className="child-box">
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444' }}>Sin useCallback</div>
        <div style={{ fontSize: 13, marginTop: 2 }}>
          Renders: <strong style={{ color: '#ef4444', fontSize: 16 }}>{renders.current}</strong>
        </div>
      </div>
      <button className="btn btn--sm btn--danger" onClick={onClick}>Acción</button>
    </div>
  )
}

// ─── Con memo + useCallback: re-renderiza solo cuando cambia onClick ──────
const ChildConMemo = memo(({ onClick }: { onClick: () => void }) => {
  const renders = useRef(0)
  renders.current++
  return (
    <div className="child-box child-box--green">
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>Con React.memo + useCallback</div>
        <div style={{ fontSize: 13, marginTop: 2 }}>
          Renders: <strong style={{ color: '#16a34a', fontSize: 16 }}>{renders.current}</strong>
        </div>
      </div>
      <button className="btn btn--sm" style={{ borderColor: '#86efac', color: '#16a34a' }} onClick={onClick}>
        Acción
      </button>
    </div>
  )
})

export default function UseCallbackExample() {
  const [parentRenders, setParentRenders] = useState(0)
  const [clicks, setClicks] = useState(0)

  // ❌ Nueva referencia en cada render → ChildSinMemo siempre re-renderiza
  const handleSinCallback = () => setClicks(c => c + 1)

  // ✅ Misma referencia → ChildConMemo NO re-renderiza al re-render del padre
  const handleConCallback = useCallback(() => setClicks(c => c + 1), [])

  return (
    <ExampleWrapper
      hook="useCallback"
      description="Memoriza una función para que no se recree en cada render, manteniendo estable su referencia."
      when="Cuando pasás funciones como props a componentes envueltos en React.memo, o cuando una función es dependencia de useEffect/useMemo. Sin memo en el hijo, useCallback no sirve."
    >
      <div className="demo-section">
        <div className="row">
          <button
            className="btn btn--primary"
            onClick={() => setParentRenders(r => r + 1)}
          >
            Re-render padre #{parentRenders + 1}
          </button>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            Clicks totales en hijos: <strong>{clicks}</strong>
          </span>
        </div>
        <p className="hint">
          Presioná "Re-render padre" — el hijo rojo re-renderiza siempre, el verde no.
        </p>
      </div>

      <div className="demo-section">
        <ChildSinMemo onClick={handleSinCallback} />
        <ChildConMemo onClick={handleConCallback} />
      </div>

      <div className="code-block">
        <code>{`// ❌ Nueva función en cada render
const handleSinCallback = () => setClicks(c => c + 1)

// ✅ Misma referencia — sin deps porque no captura variables
const handleConCallback = useCallback(
  () => setClicks(c => c + 1),
  []
)

// El hijo debe estar memoizado para que funcione
const Child = React.memo(({ onClick }) => { ... })`}</code>
      </div>
    </ExampleWrapper>
  )
}
