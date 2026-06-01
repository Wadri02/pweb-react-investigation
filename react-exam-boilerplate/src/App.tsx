import { Routes, Route, NavLink } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Usuarios from './pages/Usuarios'
import UsuarioDetalle from './pages/UsuarioDetalle'
import RutaProtegida from './components/RutaProtegida'

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  padding: '12px 24px',
  background: '#1e293b',
  alignItems: 'center',
}

const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  color: isActive ? '#60a5fa' : '#cbd5e1',
  textDecoration: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: isActive ? '2px solid #60a5fa' : '2px solid transparent',
  paddingBottom: 2,
})

function PaginaPrivada() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Página privada</h1>
      <p>Solo visible con token en localStorage.</p>
      <button onClick={() => { localStorage.removeItem('token'); window.location.reload() }}>
        Cerrar sesión
      </button>
    </div>
  )
}

function NotFound() {
  return <div style={{ padding: 32 }}><h1>404 — Página no encontrada</h1></div>
}

function App() {
  const tieneToken = !!localStorage.getItem('token')

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
      <nav style={navStyle}>
        <NavLink to="/" style={linkStyle} end>Inicio</NavLink>
        <NavLink to="/usuarios" style={linkStyle}>Usuarios</NavLink>
        <NavLink to="/privado" style={linkStyle}>Privado</NavLink>
        {!tieneToken && (
          <button
            onClick={() => { localStorage.setItem('token', 'demo-token'); window.location.reload() }}
            style={{ marginLeft: 'auto', padding: '4px 12px', cursor: 'pointer' }}
          >
            Simular login
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/:id" element={<UsuarioDetalle />} />
        <Route path="/privado" element={<RutaProtegida><PaginaPrivada /></RutaProtegida>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
