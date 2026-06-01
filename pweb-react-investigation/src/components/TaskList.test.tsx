import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskList from './TaskList'

const tareas = [
  { id: 1, texto: 'Comprar leche' },
  { id: 2, texto: 'Hacer ejercicio' },
  { id: 3, texto: 'Estudiar React' },
]

describe('TaskList', () => {
  it('renderiza todas las tareas', () => {
    render(<TaskList tareas={tareas} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    expect(screen.getByText('Comprar leche')).toBeInTheDocument()
    expect(screen.getByText('Hacer ejercicio')).toBeInTheDocument()
    expect(screen.getByText('Estudiar React')).toBeInTheDocument()
  })

  it('marca tarea como completada al hacer click en el checkbox', async () => {
    const user = userEvent.setup()
    render(<TaskList tareas={tareas} />)
    const checkbox = screen.getByLabelText(/Completar: Comprar leche/i)
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
