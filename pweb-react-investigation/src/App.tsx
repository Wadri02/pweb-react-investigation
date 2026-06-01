import { observer } from 'mobx-react-lite'
import { store } from './store/CounterStore'

// Componente secundario: solo lee `doubled`. Solo re-renderiza cuando doubled cambia.
const DoubledDisplay = observer(function DoubledDisplay() {
  return (
    <div style={{ border: '1px solid #fde68a', borderRadius: 12, padding: 24, background: '#fffbeb' }}>
      <h2 style={{ marginTop: 0, color: '#92400e' }}>Componente secundario — solo "doubled"</h2>
      <p style={{ fontSize: 28, fontWeight: 'bold', margin: '0 0 8px', color: '#b45309' }}>
        doubled = {store.doubled}
      </p>
      <p style={{ color: '#78350f', margin: 0, fontSize: 14 }}>
        Este observer solo re-renderiza cuando <code>doubled</code> cambia.
      </p>
    </div>
  )
})

// Componente principal: lee count, doubled e isPositive. Muestra los botones de control.
const App = observer(function App() {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 32, fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: 24 }}>MobX — Estado observable</h1>

      <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24, marginBottom: 20, background: '#fff' }}>
        <h2 style={{ marginTop: 0 }}>Componente principal</h2>

        <p style={{ fontSize: 40, fontWeight: 'bold', margin: '0 0 8px' }}>
          count = {store.count}
        </p>
        <p style={{ margin: '0 0 4px', fontSize: 18 }}>
          doubled = <strong>{store.doubled}</strong>
        </p>
        <p style={{ margin: '0 0 20px', fontSize: 18 }}>
          isPositive ={' '}
          <strong style={{ color: store.isPositive ? '#16a34a' : '#dc2626' }}>
            {String(store.isPositive)}
          </strong>
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => store.inc()}
            style={{ padding: '8px 20px', fontSize: 18, cursor: 'pointer', borderRadius: 6 }}
          >
            +
          </button>
          <button
            onClick={() => store.dec()}
            style={{ padding: '8px 20px', fontSize: 18, cursor: 'pointer', borderRadius: 6 }}
          >
            −
          </button>
          <button
            onClick={() => store.reset()}
            style={{ padding: '8px 20px', fontSize: 14, cursor: 'pointer', borderRadius: 6 }}
          >
            Reset
          </button>
        </div>
      </div>

      <DoubledDisplay />
    </div>
  )
})

export default App
