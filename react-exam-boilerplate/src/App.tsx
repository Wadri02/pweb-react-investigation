import { useTema } from './context/TemaContext'

function TarjetaA() {
  const { tema } = useTema()
  const esOscuro = tema === 'oscuro'
  return (
    <div style={{
      padding: 24,
      borderRadius: 12,
      background: esOscuro ? '#1e293b' : '#f0f9ff',
      color: esOscuro ? '#e2e8f0' : '#1e40af',
      border: `2px solid ${esOscuro ? '#334155' : '#bfdbfe'}`,
    }}>
      <h3 style={{ margin: '0 0 8px' }}>Tarjeta A</h3>
      <p style={{ margin: 0 }}>Lee el tema con useTema() — sin recibir props.<br />Tema actual: <strong>{tema}</strong></p>
    </div>
  )
}

function TarjetaB() {
  const { tema } = useTema()
  const esOscuro = tema === 'oscuro'
  return (
    <div style={{
      padding: 24,
      borderRadius: 12,
      background: esOscuro ? '#2d1b69' : '#fdf4ff',
      color: esOscuro ? '#e9d5ff' : '#7e22ce',
      border: `2px solid ${esOscuro ? '#4c1d95' : '#e9d5ff'}`,
    }}>
      <h3 style={{ margin: '0 0 8px' }}>Tarjeta B</h3>
      <p style={{ margin: 0 }}>También lee el tema con useTema() — sin recibir props.<br />Tema actual: <strong>{tema}</strong></p>
    </div>
  )
}

function App() {
  const { tema, toggleTema } = useTema()
  const esOscuro = tema === 'oscuro'

  return (
    <div style={{
      minHeight: '100vh',
      background: esOscuro ? '#0f172a' : '#f8fafc',
      color: esOscuro ? '#f1f5f9' : '#0f172a',
      padding: 32,
      fontFamily: 'sans-serif',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: 0 }}>Context API — Tema</h1>
          <button
            onClick={toggleTema}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              background: esOscuro ? '#f1f5f9' : '#0f172a',
              color: esOscuro ? '#0f172a' : '#f1f5f9',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {esOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro'}
          </button>
        </div>

        <p style={{ marginBottom: 24, opacity: 0.7 }}>
          Los componentes hijos acceden al tema directamente con <code>useTema()</code> sin recibir ninguna prop.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TarjetaA />
          <TarjetaB />
        </div>
      </div>
    </div>
  )
}

export default App
