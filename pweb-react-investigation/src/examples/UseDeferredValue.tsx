import { useDeferredValue, useMemo, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

const ALL_ITEMS = Array.from({ length: 5_000 }, (_, i) => `Elemento ${String(i + 1).padStart(4, '0')}`)

function FilteredList({ query }: { query: string }) {
  const filtered = useMemo(
    () => (query ? ALL_ITEMS.filter(i => i.toLowerCase().includes(query.toLowerCase())) : []),
    [query]
  )

  return (
    <div className="list-preview">
      {!query ? (
        <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          Escribí para buscar...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          Sin resultados
        </div>
      ) : (
        <>
          {filtered.slice(0, 30).map(item => (
            <div key={item} className="list-item">{item}</div>
          ))}
          {filtered.length > 30 && (
            <div style={{ padding: '8px 14px', fontSize: 12, color: '#94a3b8' }}>
              ...y {filtered.length - 30} más
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function UseDeferredValueExample() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const isStale = query !== deferredQuery

  return (
    <ExampleWrapper
      hook="useDeferredValue"
      description="Difiere la actualización de un valor para que renders no urgentes no bloqueen la UI."
      when="Similar a useTransition pero cuando no controlás el setter del estado (el valor viene de props o de un store externo). Ideal para sincronizar valores derivados costosos."
    >
      <div className="demo-section">
        <input
          className="input input--full"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar en 5,000 elementos..."
        />

        <div style={{ marginTop: 10, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13 }}>
            Valor inmediato:{' '}
            <code className="value-badge value-badge--green">{query || '(vacío)'}</code>
          </span>
          <span style={{ fontSize: 13 }}>
            Valor diferido:{' '}
            <code className="value-badge value-badge--orange">{deferredQuery || '(vacío)'}</code>
          </span>
          {isStale && <span className="pending-indicator">Actualizando...</span>}
        </div>
      </div>

      <div style={{ opacity: isStale ? 0.4 : 1, transition: 'opacity 0.3s' }}>
        <FilteredList query={deferredQuery} />
      </div>

      <div className="code-block" style={{ marginTop: 16 }}>
        <code>{`const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query)

const isStale = query !== deferredQuery  // detecta cuando está desactualizado

// La lista usa deferredQuery — no el valor inmediato
<FilteredList query={deferredQuery} />

// Feedback visual mientras está "stale"
<div style={{ opacity: isStale ? 0.4 : 1 }}>
  <FilteredList query={deferredQuery} />
</div>`}</code>
      </div>

      <p className="explanation">
        <strong>Diferencia con useTransition:</strong> useTransition envuelve el <em>setter</em> del estado.
        useDeferredValue envuelve el <em>valor resultante</em>. Usá useDeferredValue cuando recibís
        el valor como prop o no tenés control sobre quién lo actualiza.
      </p>
    </ExampleWrapper>
  )
}
