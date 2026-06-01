import { useNavigate } from '@tanstack/react-router'

export function PaginaInicio() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 32 }}>
      <h1>Página de Inicio</h1>
      <p style={{ color: '#6b7280', marginBottom: 24 }}>
        TanStack Router — routing 100% type-safe en React.
      </p>
      <button
        onClick={() => navigate({ to: '/usuarios' })}
        style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
      >
        Ver usuarios
      </button>
    </div>
  )
}
