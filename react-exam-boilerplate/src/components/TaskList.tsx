import { useState } from 'react'

interface Tarea {
  id: number
  texto: string
}

interface Props {
  tareas: Tarea[]
}

export default function TaskList({ tareas }: Props) {
  const [completadas, setCompletadas] = useState<Set<number>>(new Set())

  const toggle = (id: number) => {
    setCompletadas(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tareas.map(tarea => (
        <li
          key={tarea.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 0',
            textDecoration: completadas.has(tarea.id) ? 'line-through' : 'none',
            color: completadas.has(tarea.id) ? '#999' : 'inherit',
          }}
          className={completadas.has(tarea.id) ? 'completada' : ''}
        >
          <input
            type="checkbox"
            aria-label={`Completar: ${tarea.texto}`}
            checked={completadas.has(tarea.id)}
            onChange={() => toggle(tarea.id)}
          />
          {tarea.texto}
        </li>
      ))}
    </ul>
  )
}
