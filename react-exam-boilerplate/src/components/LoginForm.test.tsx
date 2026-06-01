import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('muestra el formulario al renderizar', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('muestra Bienvenido con credenciales válidas', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.type(screen.getByLabelText(/email/i), 'test@test.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'password123')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(await screen.findByText(/bienvenido/i)).toBeInTheDocument()
  })

  it('muestra error con email inválido', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.type(screen.getByLabelText(/email/i), 'noesemail')
    await user.type(screen.getByLabelText(/contraseña/i), 'password123')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(await screen.findByText(/inválidas/i)).toBeInTheDocument()
  })

  it('muestra error con password corto', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.type(screen.getByLabelText(/email/i), 'test@test.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'abc')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(await screen.findByText(/inválidas/i)).toBeInTheDocument()
  })
})
