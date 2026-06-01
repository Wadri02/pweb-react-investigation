import { useNavigate } from '@tanstack/react-router'

export const usuarios = [
  { id: '1', nombre: 'Ana García', email: 'ana@ejemplo.com' },
  { id: '2', nombre: 'Carlos López', email: 'carlos@ejemplo.com' },
  { id: '3', nombre: 'María Rodríguez', email: 'maria@ejemplo.com' },
]

export function PaginaUsuarios() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 32 }}>
      <h1>Usuarios</h1>
      <p style={{ color: '#16a34a', fontWeight: 500, marginBottom: 20, background: '#dcfce7', padding: '8px 12px', borderRadius: 6 }}>
        Routing 100% type-safe — los params están tipados
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {usuarios.map(u => (
          <li
            key={u.id}
            onClick={() => navigate({ to: '/usuarios/$userId', params: { userId: u.id } })}
            style={{ padding: '14px 18px', border: '1px solid #e5e7eb', borderRadius: 10, cursor: 'pointer', background: '#fff' }}
          >
            <strong>{u.nombre}</strong>
            <span style={{ color: '#9ca3af', marginLeft: 8, fontSize: 14 }}>{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
