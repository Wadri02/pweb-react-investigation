import { useState } from 'react'
import { useCounterStore } from './store/useCounterStore'

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 12,
  padding: 24,
  background: '#fff',
  flex: 1,
}

function ComponenteA() {
  const { count, inc, dec, reset, addItem } = useCounterStore()
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    addItem(input.trim())
    setInput('')
  }

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Componente A</h2>
      <p style={{ fontSize: 24, fontWeight: 'bold' }}>Count: {count}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Nuevo item..."
          style={{ flex: 1, padding: '6px 10px' }}
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>
    </div>
  )
}

function ComponenteB() {
  const { count, items } = useCounterStore()

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>Componente B</h2>
      <p style={{ fontSize: 24, fontWeight: 'bold' }}>Count: {count}</p>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {items.length === 0
          ? <li style={{ color: '#999' }}>Sin items aún</li>
          : items.map((item, i) => <li key={i}>{item}</li>)
        }
      </ul>
    </div>
  )
}

function App() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32, fontFamily: 'sans-serif' }}>
      <h1>Zustand — Estado compartido</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Estos dos componentes comparten el mismo store sin props
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        <ComponenteA />
        <ComponenteB />
      </div>
    </div>
  )
}

export default App
