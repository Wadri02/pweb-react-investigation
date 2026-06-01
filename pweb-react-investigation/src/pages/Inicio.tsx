import { useNavigate } from 'react-router-dom'

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 32 }}>
      <h1>Bienvenido a la app</h1>
      <p>Esta es la página de inicio. Navegá a la lista de usuarios.</p>
      <button onClick={() => navigate('/usuarios')}>Ver usuarios</button>
    </div>
  )
}
