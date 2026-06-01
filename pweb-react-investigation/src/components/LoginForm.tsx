import { useState } from 'react'

type Resultado = 'idle' | 'exito' | 'error'

const esEmailValido = (email: string) => email.includes('@') && email.includes('.')

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resultado, setResultado] = useState<Resultado>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const valido = esEmailValido(email) && password.length > 5
    setResultado(valido ? 'exito' : 'error')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: 4, padding: '6px 10px' }}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: 4, padding: '6px 10px' }}
        />
      </div>
      <button type="submit">Ingresar</button>
      {resultado === 'exito' && <p>Bienvenido</p>}
      {resultado === 'error' && <p>Credenciales inválidas</p>}
    </form>
  )
}
