import { useActionState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

type FormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fields?: { nombre?: string; email?: string }
}

async function contactAction(_prev: FormState, formData: FormData): Promise<FormState> {
  // Simula latencia de red
  await new Promise(r => setTimeout(r, 1500))

  const nombre = formData.get('nombre') as string
  const email = formData.get('email') as string
  const mensaje = formData.get('mensaje') as string

  if (!nombre || !email || !mensaje) {
    return { status: 'error', message: 'Todos los campos son requeridos.' }
  }
  if (!email.includes('@') || !email.includes('.')) {
    return { status: 'error', message: 'El email no es válido.' }
  }

  return {
    status: 'success',
    message: `¡Gracias ${nombre}! Tu mensaje fue enviado a ${email}.`,
  }
}

export default function UseActionStateExample() {
  const [state, dispatch, isPending] = useActionState<FormState, FormData>(
    contactAction,
    { status: 'idle', message: '' }
  )

  return (
    <ExampleWrapper
      hook="useActionState"
      description="Maneja el estado completo de un formulario con una acción asíncrona: pendiente, resultado y dispatch incluidos."
      when="Para formularios con acciones asíncronas (submit a servidor). Reemplaza el patrón manual de useState + loading + error + fetch."
      badge="React 19"
    >
      <form action={dispatch} className="contact-form">
        <div className="two-col" style={{ gap: 12 }}>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label htmlFor="act-nombre" className="form-label">Nombre</label>
            <input
              id="act-nombre"
              name="nombre"
              className="input input--full"
              placeholder="Tu nombre"
              disabled={isPending}
            />
          </div>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label htmlFor="act-email" className="form-label">Email</label>
            <input
              id="act-email"
              name="email"
              type="email"
              className="input input--full"
              placeholder="tu@email.com"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="form-field" style={{ marginBottom: 0 }}>
          <label htmlFor="act-mensaje" className="form-label">Mensaje</label>
          <textarea
            id="act-mensaje"
            name="mensaje"
            className="input input--full"
            rows={3}
            placeholder="Tu mensaje..."
            disabled={isPending}
            style={{ resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>

        <button type="submit" className="btn btn--primary" disabled={isPending}>
          {isPending ? '⏳ Enviando...' : '✉️ Enviar mensaje'}
        </button>

        {state.status !== 'idle' && (
          <div className={`form-feedback form-feedback--${state.status}`}>
            {state.status === 'success' ? '✓ ' : '✕ '}{state.message}
          </div>
        )}
      </form>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`const [state, dispatch, isPending] = useActionState(
  async (prevState, formData) => {
    await fetch('/api/contact', { method: 'POST', body: formData })
    return { status: 'success', message: '¡Enviado!' }
  },
  { status: 'idle', message: '' }
)

// El form usa dispatch como action
<form action={dispatch}>
  <button disabled={isPending}>Enviar</button>
</form>`}</code>
      </div>
    </ExampleWrapper>
  )
}
