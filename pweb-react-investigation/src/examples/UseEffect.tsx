import { useEffect, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

export default function UseEffectExample() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)  // cleanup: evita memory leak
  }, [running])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const rem = s % 60
    return m > 0 ? `${m}m ${rem}s` : `${s}s`
  }

  return (
    <ExampleWrapper
      hook="useEffect"
      description="Ejecuta efectos secundarios después del render: fetch, timers, subscripciones a eventos."
      when="Para sincronizar con sistemas externos (APIs, timers, event listeners). Siempre retorná una función de cleanup para evitar memory leaks."
    >
      <div className="timer-display">{fmt(seconds)}</div>

      <div className="btn-row">
        <button
          className="btn btn--primary"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          ▶ Iniciar
        </button>
        <button
          className="btn"
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          ⏸ Detener
        </button>
        <button
          className="btn btn--ghost"
          onClick={() => { setRunning(false); setSeconds(0) }}
        >
          ↺ Reset
        </button>
      </div>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`useEffect(() => {
  if (!running) return

  const id = setInterval(() => setSeconds(s => s + 1), 1000)

  // ✅ cleanup: se llama antes del próximo efecto o al desmontar
  return () => clearInterval(id)

}, [running])  // ← re-ejecuta cuando "running" cambia`}</code>
      </div>

      <p className="explanation">
        El array de dependencias <code>[running]</code> le dice a React cuándo re-ejecutar el efecto.
        El <strong>cleanup</strong> (el return) previene que múltiples intervalos corran en paralelo
        al cambiar <code>running</code> de <code>false</code> a <code>true</code>.
      </p>
    </ExampleWrapper>
  )
}
