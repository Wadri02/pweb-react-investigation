import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { ExampleWrapper } from '../components/ExampleWrapper'

// ─── SubmitButton: lee el estado del form padre sin recibir props ──────────
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn--primary" disabled={pending}>
      {pending ? '⏳ Subscribiendo...' : '✉️ Subscribirse'}
    </button>
  )
}

// ─── StatusBar: otro componente hijo que también lee useFormStatus ─────────
function StatusBar() {
  const { pending, data } = useFormStatus()
  if (!pending) return null
  return (
    <div className="status-indicator">
      ⏳ Procesando subscripción para{' '}
      <strong>{(data?.get('email') as string) ?? '...'}</strong>
    </div>
  )
}

// ─── Acción simulada ────────────────────────────────────────────────────────
async function subscribeAction(_prev: string, formData: FormData): Promise<string> {
  await new Promise(r => setTimeout(r, 2000))
  const email = formData.get('email') as string
  return email ? `¡Subscripto: ${email}!` : 'Email requerido'
}

export default function UseFormStatusExample() {
  const [result, dispatch] = useActionState(subscribeAction, '')

  return (
    <ExampleWrapper
      hook="useFormStatus"
      description="Lee el estado del formulario padre (pending, data, method) desde cualquier componente hijo, sin pasar props."
      when="Para crear componentes de UI reutilizables (botones, spinners, indicadores) que se comportan diferente cuando el form está pendiente, sin acoplarlos mediante props."
      badge="React 19"
    >
      <form action={dispatch} className="contact-form">
        <div className="form-field">
          <label htmlFor="fs-email" className="form-label">Email</label>
          <input
            id="fs-email"
            name="email"
            type="email"
            className="input input--full"
            placeholder="tu@email.com"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="fs-nombre" className="form-label">Nombre (opcional)</label>
          <input
            id="fs-nombre"
            name="nombre"
            className="input input--full"
            placeholder="Tu nombre"
          />
        </div>

        {/* Estos componentes leen useFormStatus — DENTRO del <form> */}
        <SubmitButton />
        <StatusBar />

        {result && (
          <div className="form-feedback form-feedback--success">✓ {result}</div>
        )}
      </form>

      <div className="warning-box">
        <strong>⚠️ Regla importante:</strong> <code>useFormStatus()</code> DEBE estar en un
        componente que sea <em>hijo</em> del <code>&lt;form&gt;</code>.
        Si lo llamás en el mismo componente que contiene el form, siempre retorna{' '}
        <code>pending: false</code>.
      </div>

      <div className="code-block" style={{ marginTop: 16 }}>
        <code>{`// ✅ DENTRO del form — funciona
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()
  return <button disabled={pending}>Enviar</button>
}

// ❌ FUERA del form (mismo componente) — NO funciona
function Form() {
  const { pending } = useFormStatus()  // siempre false
  return (
    <form>
      <SubmitButton />  {/* ← usar aquí ✅ */}
    </form>
  )
}`}</code>
      </div>
    </ExampleWrapper>
  )
}
