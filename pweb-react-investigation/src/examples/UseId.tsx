import { useId } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

function FormularioRegistro() {
  const nombreId = useId()
  const emailId = useId()
  const passId = useId()
  const fechaId = useId()

  return (
    <div className="form-instance">
      <div className="form-field">
        <label htmlFor={nombreId} className="form-label">
          Nombre
          <code className="id-badge">{nombreId}</code>
        </label>
        <input id={nombreId} type="text" className="input input--full" placeholder="Tu nombre" />
      </div>
      <div className="form-field">
        <label htmlFor={emailId} className="form-label">
          Email
          <code className="id-badge">{emailId}</code>
        </label>
        <input id={emailId} type="email" className="input input--full" placeholder="tu@email.com" />
      </div>
      <div className="form-field">
        <label htmlFor={passId} className="form-label">
          Contraseña
          <code className="id-badge">{passId}</code>
        </label>
        <input id={passId} type="password" className="input input--full" placeholder="••••••••" />
      </div>
      <div className="form-field" style={{ marginBottom: 0 }}>
        <label htmlFor={fechaId} className="form-label">
          Fecha nacimiento
          <code className="id-badge">{fechaId}</code>
        </label>
        <input id={fechaId} type="date" className="input input--full" />
      </div>
    </div>
  )
}

export default function UseIdExample() {
  return (
    <ExampleWrapper
      hook="useId"
      description="Genera IDs únicos y estables entre servidor y cliente, sin colisiones aunque el componente se use múltiples veces."
      when="Para asociar <label> con <input> en formularios reutilizables, o para aria- attributes. Especialmente importante cuando el mismo componente aparece varias veces en la página."
    >
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
        El mismo componente <code>FormularioRegistro</code> renderizado <strong>dos veces</strong> —
        los IDs son distintos y únicos en cada instancia:
      </p>

      <div className="two-forms">
        <div>
          <p className="section-title">Instancia 1</p>
          <FormularioRegistro />
        </div>
        <div>
          <p className="section-title">Instancia 2</p>
          <FormularioRegistro />
        </div>
      </div>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`function Campo({ label }) {
  const id = useId()  // ej: ":r0:", ":r3:"

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}

// Dos instancias → IDs distintos automáticamente
<Campo label="Email" />  // id=":r0:"
<Campo label="Email" />  // id=":r3:"  (diferente!)`}</code>
      </div>

      <p className="explanation">
        <strong>¿Por qué no usar Math.random() o un contador global?</strong> Los IDs deben ser
        <em> estables</em> entre el render del servidor (SSR) y el hydration del cliente.
        <code>useId()</code> garantiza que ambos generan el mismo ID, evitando errores de hidratación.
      </p>
    </ExampleWrapper>
  )
}
