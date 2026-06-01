import { useNavigate } from 'react-router-dom'

export const usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana@ejemplo.com' },
  { id: 2, nombre: 'Carlos López', email: 'carlos@ejemplo.com' },
  { id: 3, nombre: 'María Rodríguez', email: 'maria@ejemplo.com' },
]

export default function Usuarios() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 32 }}>
      <h1>Usuarios</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {usuarios.map(u => (
          <li
            key={u.id}
            onClick={() => navigate(`/usuarios/${u.id}`)}
            style={{
              padding: '12px 16px',
              marginBottom: 8,
              border: '1px solid #ddd',
              borderRadius: 8,
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            <strong>{u.nombre}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
