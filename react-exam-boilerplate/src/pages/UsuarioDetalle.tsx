import { useParams, useNavigate } from 'react-router-dom'
import { usuarios } from './Usuarios'

export default function UsuarioDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const usuario = usuarios.find(u => u.id === Number(id))

  if (!usuario) {
    return (
      <div style={{ padding: 32 }}>
        <p>Usuario no encontrado.</p>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>{usuario.nombre}</h1>
      <p><strong>ID:</strong> {usuario.id}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  )
}
