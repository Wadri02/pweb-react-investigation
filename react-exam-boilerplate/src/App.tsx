import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactoSchema, type ContactoData } from './schemas/ContactoSchema'

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}

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
  margin: 0,
}

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: '#374151',
}

const DATOS_EJEMPLO: ContactoData = {
  nombre: 'María García',
  email: 'maria@ejemplo.com',
  telefono: '1122334455',
  mensaje: 'Hola, me gustaría obtener más información sobre sus servicios.',
  categoria: 'consulta',
}

function App() {
  const [enviado, setEnviado] = useState<ContactoData | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactoData>({
    resolver: zodResolver(ContactoSchema),
  })

  const mensajeLen = watch('mensaje')?.length ?? 0

  const onSubmit = async (data: ContactoData) => {
    await new Promise(r => setTimeout(r, 800))
    setEnviado(data)
  }

  const autocompletar = () => {
    setValue('nombre', DATOS_EJEMPLO.nombre)
    setValue('email', DATOS_EJEMPLO.email)
    setValue('telefono', DATOS_EJEMPLO.telefono)
    setValue('mensaje', DATOS_EJEMPLO.mensaje)
    setValue('categoria', DATOS_EJEMPLO.categoria)
  }

  if (enviado) {
    return (
      <div style={{ maxWidth: 520, margin: '60px auto', padding: 32, fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: 12 }}>
        <h2 style={{ marginTop: 0, color: '#16a34a' }}>¡Mensaje enviado!</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <p><strong>Nombre:</strong> {enviado.nombre}</p>
          <p><strong>Email:</strong> {enviado.email}</p>
          {enviado.telefono && <p><strong>Teléfono:</strong> {enviado.telefono}</p>}
          <p><strong>Categoría:</strong> {enviado.categoria}</p>
          <p><strong>Mensaje:</strong> {enviado.mensaje}</p>
        </div>
        <button onClick={() => { setEnviado(null); reset() }} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Nuevo mensaje
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 32, fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Formulario de contacto</h1>
        <button onClick={autocompletar} style={{ padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
          Autocompletar
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre</label>
          <input {...register('nombre')} style={inputStyle} placeholder="Tu nombre completo" />
          {errors.nombre && <p style={errorStyle}>{errors.nombre.message}</p>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input {...register('email')} type="email" style={inputStyle} placeholder="tu@email.com" />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Teléfono <span style={{ color: '#9ca3af', fontWeight: 400 }}>(opcional)</span>
          </label>
          <input {...register('telefono')} style={inputStyle} placeholder="10 dígitos" />
          {errors.telefono && <p style={errorStyle}>{errors.telefono.message}</p>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select {...register('categoria')} style={{ ...inputStyle, background: '#fff' }}>
            <option value="">Seleccioná una opción</option>
            <option value="consulta">Consulta general</option>
            <option value="soporte">Soporte técnico</option>
            <option value="ventas">Ventas</option>
          </select>
          {errors.categoria && <p style={errorStyle}>{errors.categoria.message}</p>}
        </div>

        <div style={fieldStyle}>
          <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
            <span>Mensaje</span>
            <span style={{ color: mensajeLen < 10 ? 'crimson' : '#6b7280', fontWeight: 400, fontSize: 12 }}>
              {mensajeLen} caracteres
            </span>
          </label>
          <textarea
            {...register('mensaje')}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
            placeholder="Mínimo 10 caracteres..."
          />
          {errors.mensaje && <p style={errorStyle}>{errors.mensaje.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 0',
            background: isSubmitting ? '#93c5fd' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  )
}

export default App
