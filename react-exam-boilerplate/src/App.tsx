import { useState, useEffect, useRef } from 'react'

interface Tarea {
  id: number
  texto: string
  completada: boolean
}

function App() {
  // useState: lista de tareas
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [inputTarea, setInputTarea] = useState('')

  const agregarTarea = () => {
    if (!inputTarea.trim()) return
    setTareas(prev => [...prev, { id: Date.now(), texto: inputTarea.trim(), completada: false }])
    setInputTarea('')
  }

  const toggleTarea = (id: number) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, completada: !t.completada } : t))
  }

  const eliminarTarea = (id: number) => {
    setTareas(prev => prev.filter(t => t.id !== id))
  }

  // useEffect: timer
  const [segundos, setSegundos] = useState(0)
  const [corriendo, setCorriendo] = useState(false)

  useEffect(() => {
    if (!corriendo) return
    const intervalo = setInterval(() => {
      setSegundos(prev => prev + 1)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [corriendo])

  // useRef: focus e historial
  const inputRef = useRef<HTMLInputElement>(null)
  const prevValueRef = useRef('')
  const [valorInput, setValorInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    prevValueRef.current = valorInput
    setValorInput(e.target.value)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Hooks en React</h1>

      {/* Sección useState */}
      <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <h2>useState — Lista de tareas</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            value={inputTarea}
            onChange={e => setInputTarea(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && agregarTarea()}
            placeholder="Nueva tarea..."
            style={{ flex: 1, padding: '6px 10px' }}
          />
          <button onClick={agregarTarea}>Agregar</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tareas.map(tarea => (
            <li key={tarea.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => toggleTarea(tarea.id)}
              />
              <span style={{ flex: 1, textDecoration: tarea.completada ? 'line-through' : 'none', color: tarea.completada ? '#999' : 'inherit' }}>
                {tarea.texto}
              </span>
              <button onClick={() => eliminarTarea(tarea.id)} style={{ color: 'red' }}>Eliminar</button>
            </li>
          ))}
        </ul>
        {tareas.length === 0 && <p style={{ color: '#999' }}>Sin tareas. ¡Agrega una!</p>}
      </section>

      {/* Sección useEffect */}
      <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <h2>useEffect — Timer</h2>
        <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0' }}>{segundos}s</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setCorriendo(true)} disabled={corriendo}>Iniciar</button>
          <button onClick={() => setCorriendo(false)} disabled={!corriendo}>Detener</button>
          <button onClick={() => { setCorriendo(false); setSegundos(0) }}>Reset</button>
        </div>
      </section>

      {/* Sección useRef */}
      <section style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
        <h2>useRef — Focus y valor anterior</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            ref={inputRef}
            value={valorInput}
            onChange={handleInputChange}
            placeholder="Escribe algo..."
            style={{ flex: 1, padding: '6px 10px' }}
          />
          <button onClick={() => inputRef.current?.focus()}>Focus</button>
        </div>
        <p>Valor actual: <strong>{valorInput || '(vacío)'}</strong></p>
        <p>Valor anterior: <strong>{prevValueRef.current || '(ninguno)'}</strong></p>
      </section>
    </div>
  )
}

export default App
