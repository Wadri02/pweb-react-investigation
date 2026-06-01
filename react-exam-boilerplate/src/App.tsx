import { useState } from 'react'

const cards = [
  { titulo: 'Componentes', descripcion: 'Bloques reutilizables de UI con props y estado local.' },
  { titulo: 'Hooks', descripcion: 'useState, useEffect, useRef y más para manejar estado y efectos.' },
  { titulo: 'Context', descripcion: 'Compartí datos globalmente sin prop-drilling.' },
  { titulo: 'Router', descripcion: 'Navegación declarativa con React Router.' },
  { titulo: 'Zustand', descripcion: 'Estado global simple y liviano sin boilerplate.' },
  { titulo: 'TanStack Query', descripcion: 'Fetching, caching y sincronización de datos del servidor.' },
]

function App() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nombre && email) setEnviado(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <span className="text-xl font-bold text-gray-800">React Boilerplate</span>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Empezar
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Docs
          </button>
          <button className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            GitHub
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Tailwind CSS — Estilos utilitarios
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Ejemplo de diseño responsivo con clases utilitarias de Tailwind.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map(card => (
            <div
              key={card.titulo}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{card.titulo}</h2>
              <p className="text-gray-500 text-sm">{card.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Formulario */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Formulario de ejemplo</h2>
          {enviado ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
              ¡Enviado con éxito! Hola, <strong>{nombre}</strong>.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
