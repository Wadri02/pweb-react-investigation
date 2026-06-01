import Counter from './components/Counter'

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, fontFamily: 'sans-serif' }}>
      <h1>Vitest + Testing Library</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Ejecutá <code>npm test</code> para correr los tests de <code>Counter</code> y <code>calculos</code>.
      </p>
      <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Componente Counter (testeado)</h2>
        <Counter />
      </div>
    </div>
  )
}

export default App
