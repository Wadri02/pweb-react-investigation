import { useState, useTransition } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

const ALL_ITEMS = Array.from({ length: 5_000 }, (_, i) => `Item ${String(i + 1).padStart(4, '0')}`)

export default function UseTransitionExample() {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // ✅ urgente: actualiza el input INMEDIATAMENTE
    setQuery(value)
    // ✅ no urgente: el filtrado puede esperar
    startTransition(() => {
      setFiltered(
        value
          ? ALL_ITEMS.filter(item => item.toLowerCase().includes(value.toLowerCase()))
          : []
      )
    })
  }

  return (
    <ExampleWrapper
      hook="useTransition"
      description="Marca actualizaciones de estado como no urgentes para que la UI principal siga siendo responsiva."
      when="Cuando una actualización de estado es costosa (filtrar listas grandes, cambios de ruta, renderizado pesado) y puede diferirse sin degradar la experiencia del usuario."
    >
      <div className="demo-section">
        <div style={{ position: 'relative' }}>
          <input
            className="input input--full"
            value={query}
            onChange={handleChange}
            placeholder="Filtrar 5,000 items... (escribí rápido para ver la diferencia)"
          />
        </div>

        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12, minHeight: 28 }}>
          {isPending ? (
            <span className="pending-indicator">⏳ Actualizando lista...</span>
          ) : (
            <span style={{ fontSize: 12, color: '#94a3b8' }}>
              {query
                ? `${filtered.length.toLocaleString()} resultados`
                : '5,000 items disponibles'}
            </span>
          )}
        </div>
      </div>

      <div
        className="list-preview"
        style={{ opacity: isPending ? 0.5 : 1, transition: 'opacity 0.2s' }}
      >
        {!query ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            Escribí algo para filtrar...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            Sin resultados
          </div>
        ) : (
          filtered.slice(0, 30).map(item => (
            <div key={item} className="list-item">{item}</div>
          ))
        )}
      </div>

      <div className="code-block" style={{ marginTop: 16 }}>
        <code>{`const [isPending, startTransition] = useTransition()

const handleChange = (e) => {
  setQuery(e.target.value)  // urgente → input responsivo

  startTransition(() => {
    setFiltered(filtrarLista(e.target.value))  // no urgente
  })
}

// isPending: true mientras la transición está pendiente
{isPending && <Spinner />}`}</code>
      </div>
    </ExampleWrapper>
  )
}
