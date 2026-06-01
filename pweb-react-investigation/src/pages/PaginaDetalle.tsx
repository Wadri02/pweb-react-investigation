import { useParams, useNavigate } from '@tanstack/react-router'
import { usuarios } from './PaginaUsuarios'

export function PaginaDetalle() {
  // useParams está tipado: { userId: string } — TypeScript conoce los params en compile time
  const { userId } = useParams({ strict: false }) as { userId: string }
  const navigate = useNavigate()
  const usuario = usuarios.find(u => u.id === userId)

  if (!usuario) {
    return (
      <div style={{ padding: 32 }}>
        <p style={{ color: 'crimson' }}>Usuario no encontrado.</p>
        <button onClick={() => navigate({ to: '/usuarios' })}>Volver</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>{usuario.nombre}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
      </div>
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 12, marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#0369a1' }}>
          <strong>Type safety demo:</strong> <code>userId</code> es de tipo <strong>string</strong>.
          TypeScript valida los params en compile time — no hay strings mágicos.
        </p>
      </div>
      <button
        onClick={() => navigate({ to: '/usuarios' })}
        style={{ padding: '8px 18px', background: '#f3f4f6', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer' }}
      >
        ← Volver
      </button>
    </div>
  )
}
