import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: 6,
  fontSize: 14,
  width: '100%',
  boxSizing: 'border-box',
}

const errorStyle: React.CSSProperties = {
  color: 'crimson',
  fontSize: 12,
  margin: '4px 0 0',
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 12,
  padding: 24,
  background: '#fff',
}

// ── Ejemplo 1: useFormik hook ──────────────────────────────────────────────

const loginSchema = Yup.object({
  email: Yup.string().email('Ingresá un email válido').required('El email es requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es requerida'),
})

function EjemploUseFormik() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (_values, { resetForm }) => {
      await new Promise(r => setTimeout(r, 1000))
      resetForm()
      alert('¡Login exitoso! Formulario reseteado.')
    },
  })

  return (
    <div style={cardStyle}>
      {/* useFormik hook: el estado y handlers viven en el componente padre */}
      <h2 style={{ marginTop: 0 }}>Ejemplo 1 — useFormik hook</h2>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>
        Binding manual con <code>formik.getFieldProps()</code>. Control total sobre el render.
      </p>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500 }}>Email</label>
          <input
            type="email"
            style={inputStyle}
            {...formik.getFieldProps('email')}
            placeholder="usuario@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p style={errorStyle}>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500 }}>Contraseña</label>
          <input
            type="password"
            style={inputStyle}
            {...formik.getFieldProps('password')}
            placeholder="Mínimo 6 caracteres"
          />
          {formik.touched.password && formik.errors.password && (
            <p style={errorStyle}>{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{
            padding: '10px 0',
            background: formik.isSubmitting ? '#93c5fd' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: formik.isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          {formik.isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

// ── Ejemplo 2: componente <Formik> con <Field> y <ErrorMessage> ────────────

const registroSchema = Yup.object({
  nombre: Yup.string().min(2, 'Mínimo 2 caracteres').required('El nombre es requerido'),
  email: Yup.string().email('Ingresá un email válido').required('El email es requerido'),
})

function EjemploFormikComponent() {
  return (
    <div style={cardStyle}>
      {/* <Formik> component: context-based, <Field> y <ErrorMessage> son conscientes del contexto */}
      <h2 style={{ marginTop: 0 }}>Ejemplo 2 — Componente &lt;Formik&gt;</h2>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>
        <code>&lt;Field&gt;</code> y <code>&lt;ErrorMessage&gt;</code> conectan al contexto automáticamente — sin binding manual.
      </p>
      <Formik
        initialValues={{ nombre: '', email: '' }}
        validationSchema={registroSchema}
        onSubmit={async (values, { resetForm }) => {
          await new Promise(r => setTimeout(r, 800))
          alert(`Registrado: ${values.nombre} (${values.email})`)
          resetForm()
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Nombre</label>
              <Field name="nombre" style={inputStyle} placeholder="Tu nombre" />
              <ErrorMessage name="nombre" component="p" className="error" />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Email</label>
              <Field name="email" type="email" style={inputStyle} placeholder="tu@email.com" />
              <ErrorMessage name="email" component="p" className="error" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 0',
                background: isSubmitting ? '#86efac' : '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontWeight: 600,
              }}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

function App() {
  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Formik + Yup</h1>
      <p style={{ color: '#6b7280', marginBottom: 28, fontSize: 14 }}>
        Dos enfoques para manejar formularios con Formik.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <EjemploUseFormik />
        <EjemploFormikComponent />
      </div>
      <style>{`.error { color: crimson; font-size: 12px; margin: 4px 0 0; }`}</style>
    </div>
  )
}

export default App
