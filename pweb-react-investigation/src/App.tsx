import { useState } from 'react'

type Estado = 'idle' | 'exito' | 'error'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState<Estado>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailValido = email.includes('@')
    const passwordValida = password.length > 5
    setEstado(emailValido && passwordValida ? 'exito' : 'error')
  }

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 32, fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: 12 }}>
      <h1 style={{ marginTop: 0, fontSize: 22 }}>Login — Cypress E2E</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            type="email"
            data-cy="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box' }}
            placeholder="usuario@email.com"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4 }}>Contraseña</label>
          <input
            type="password"
            data-cy="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box' }}
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <button
          type="submit"
          data-cy="submit"
          style={{ padding: '10px 0', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
        >
          Ingresar
        </button>
      </form>

      {estado === 'exito' && (
        <div data-cy="mensaje-exito" style={{ marginTop: 16, padding: 12, background: '#dcfce7', color: '#166534', borderRadius: 6 }}>
          Bienvenido
        </div>
      )}
      {estado === 'error' && (
        <div data-cy="mensaje-error" style={{ marginTop: 16, padding: 12, background: '#fee2e2', color: '#991b1b', borderRadius: 6 }}>
          Credenciales inválidas
        </div>
      )}
    </div>
  )
}

export default App
