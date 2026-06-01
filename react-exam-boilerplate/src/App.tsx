import { observer } from 'mobx-react-lite'
import { counterStore } from './store/CounterStore'

const DoubledDisplay = observer(() => (
  <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24, background: '#fffbeb' }}>
    <h2 style={{ marginTop: 0, color: '#92400e' }}>Solo "doubled"</h2>
    <p style={{ fontSize: 28, fontWeight: 'bold', margin: 0, color: '#b45309' }}>
      doubled = {counterStore.doubled}
    </p>
    <p style={{ color: '#78350f', marginBottom: 0 }}>
      Este componente solo re-renderiza cuando <code>doubled</code> cambia.
    </p>
  </div>
))

const App = observer(() => {
  const { count, doubled, isPositive, inc, dec, reset } = counterStore

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32, fontFamily: 'sans-serif' }}>
      <h1>MobX — Estado observable</h1>

      <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24, marginBottom: 24, background: '#fff' }}>
        <h2 style={{ marginTop: 0 }}>Componente principal</h2>

        <p style={{ fontSize: 32, fontWeight: 'bold', margin: '0 0 4px' }}>count = {count}</p>
        <p style={{ margin: '0 0 4px' }}>doubled = <strong>{doubled}</strong></p>
        <p style={{ margin: '0 0 16px' }}>
          isPositive = <strong style={{ color: isPositive ? 'green' : 'crimson' }}>
            {String(isPositive)}
          </strong>
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => inc()}>+</button>
          <button onClick={() => dec()}>-</button>
          <button onClick={() => reset()}>Reset</button>
        </div>
      </div>

      <DoubledDisplay />
    </div>
  )
})

export default App
