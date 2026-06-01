import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter', () => {
  it('muestra valor inicial 0', () => {
    render(<Counter />)
    expect(screen.getByText('Contador: 0')).toBeInTheDocument()
  })

  it('incrementa el valor al hacer click', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    await user.click(screen.getByText('Incrementar'))
    expect(screen.getByText('Contador: 1')).toBeInTheDocument()
  })

  it('resetea el valor a 0', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    await user.click(screen.getByText('Incrementar'))
    await user.click(screen.getByText('Incrementar'))
    await user.click(screen.getByText('Resetear'))
    expect(screen.getByText('Contador: 0')).toBeInTheDocument()
  })

  it('no baja de 0 al decrementar', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    await user.click(screen.getByText('Decrementar'))
    expect(screen.getByText('Contador: 0')).toBeInTheDocument()
  })
})
