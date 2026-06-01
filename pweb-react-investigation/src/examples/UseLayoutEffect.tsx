import { useLayoutEffect, useRef, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

export default function UseLayoutEffectExample() {
  const [text, setText] = useState('Medí este elemento con useLayoutEffect')
  const [show, setShow] = useState(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const boxRef = useRef<HTMLDivElement>(null)

  // useLayoutEffect corre ANTES de que el navegador pinte — sin flash visual
  useLayoutEffect(() => {
    if (!boxRef.current) return
    const { width, height } = boxRef.current.getBoundingClientRect()
    setDimensions({ width: Math.round(width), height: Math.round(height) })
  }, [text, show])

  return (
    <ExampleWrapper
      hook="useLayoutEffect"
      description="Igual a useEffect pero corre sincrónicamente ANTES de que el navegador pinte la pantalla."
      when="Cuando necesitás medir el DOM (getBoundingClientRect, offsetWidth) y ajustar posiciones/estilos antes del paint para evitar flashes visuales (layout thrashing)."
    >
      <div className="demo-section">
        <label style={{ fontSize: 13, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 8 }}>
          Editá el texto para ver cómo cambian las dimensiones:
        </label>
        <input
          className="input input--full"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <div className="demo-section">
        <button className="btn btn--sm" onClick={() => setShow(s => !s)}>
          {show ? 'Ocultar' : 'Mostrar'} elemento
        </button>

        {show && (
          <div
            ref={boxRef}
            style={{
              marginTop: 12,
              padding: '12px 18px',
              background: '#eef2ff',
              borderRadius: 8,
              display: 'inline-block',
              fontSize: 15,
              color: '#4f46e5',
              maxWidth: '100%',
              wordBreak: 'break-word',
            }}
          >
            {text || '(vacío)'}
          </div>
        )}

        {show && (
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              gap: 16,
              fontSize: 14,
            }}
          >
            <span>
              Ancho: <strong style={{ color: '#6366f1' }}>{dimensions.width}px</strong>
            </span>
            <span>
              Alto: <strong style={{ color: '#6366f1' }}>{dimensions.height}px</strong>
            </span>
          </div>
        )}
      </div>

      <p className="explanation">
        <strong>useLayoutEffect</strong> mide el elemento <em>antes</em> del paint.
        Con <strong>useEffect</strong>, las dimensiones empezarían en 0 y habría un frame
        visible con el valor incorrecto (flash visual). Esto importa para tooltips,
        dropdowns y cualquier cosa que se posicione relativa a otro elemento.
      </p>

      <div className="code-block">
        <code>{`// useLayoutEffect: corre SINCRÓNICAMENTE antes del paint
useLayoutEffect(() => {
  const { width, height } = ref.current.getBoundingClientRect()
  setDimensions({ width, height })  // ← sin flash visual
}, [text])

// useEffect: corre DESPUÉS del paint
useEffect(() => {
  // width/height empiezan en 0 → flash de 1 frame
}, [text])`}</code>
      </div>
    </ExampleWrapper>
  )
}
