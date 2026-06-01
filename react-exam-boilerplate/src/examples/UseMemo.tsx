import { useMemo, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

const NUMBERS = Array.from({ length: 10_000 }, (_, i) => i + 1)

export default function UseMemoExample() {
  const [filter, setFilter] = useState('')
  const [tick, setTick] = useState(0)

  // Solo se recalcula UNA vez — NUMBERS no cambia nunca
  const evenCount = useMemo(() => {
    console.log('[useMemo] Recalculando pares...')
    return NUMBERS.filter(n => n % 2 === 0).length
  }, [])

  // Se recalcula solo cuando "filter" cambia — NO cuando cambia "tick"
  const filtered = useMemo(() => {
    console.log('[useMemo] Recalculando filtro...')
    if (!filter) return []
    return NUMBERS.filter(n => n.toString().includes(filter))
  }, [filter])

  return (
    <ExampleWrapper
      hook="useMemo"
      description="Memoriza el resultado de un cálculo caro y lo recalcula solo cuando cambian sus dependencias."
      when="Cuando un cálculo es costoso (filtros grandes, transformaciones, derivaciones complejas) y sus inputs no cambian en cada render. No lo uses para cálculos simples — tiene overhead."
    >
      <div className="demo-section">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#f8fafc',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
          }}
        >
          <span style={{ fontSize: 14 }}>
            Números del 1 al 10,000 — Pares:{' '}
            <strong style={{ color: '#6366f1' }}>{evenCount.toLocaleString()}</strong>
          </span>
          <span
            style={{
              fontSize: 11,
              background: '#dcfce7',
              color: '#16a34a',
              padding: '3px 8px',
              borderRadius: 20,
              fontWeight: 700,
            }}
          >
            calculado 1 sola vez
          </span>
        </div>
      </div>

      <div className="demo-section">
        <div className="row">
          <input
            className="input"
            style={{ flex: 1 }}
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filtrar números (ej: 42, 100, 7)..."
          />
          <button
            className="btn"
            onClick={() => setTick(t => t + 1)}
            title="Este re-render NO recalcula los pares ni el filtro si filter no cambió"
          >
            Re-render #{tick + 1}
          </button>
        </div>

        <p className="hint">
          Presioná "Re-render" — no recalcula nada (ver consola). Solo recalcula cuando cambia el input.
        </p>

        {filtered.length > 0 && (
          <>
            <p style={{ fontSize: 13, marginTop: 12, color: '#64748b' }}>
              {filtered.length.toLocaleString()} resultados — mostrando primeros 24:
            </p>
            <div className="chips">
              {filtered.slice(0, 24).map(n => (
                <span key={n} className="chip">{n}</span>
              ))}
              {filtered.length > 24 && (
                <span className="chip chip--more">+{filtered.length - 24} más</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="code-block">
        <code>{`// Calculado UNA sola vez (dep array vacío)
const evenCount = useMemo(() => {
  return NUMBERS.filter(n => n % 2 === 0).length
}, [])  // ← sin dependencias

// Recalcula solo cuando cambia "filter"
const filtered = useMemo(() => {
  return NUMBERS.filter(n => n.toString().includes(filter))
}, [filter])  // ← dep: filter`}</code>
      </div>
    </ExampleWrapper>
  )
}
