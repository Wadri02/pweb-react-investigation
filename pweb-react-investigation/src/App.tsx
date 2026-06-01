import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistroSchema, type RegistroData } from './schemas/RegistroSchema'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: 6,
  fontSize: 14,
  boxSizing: 'border-box',
}

const errorStyle: React.CSSProperties = {
  color: 'crimson',
  fontSize: 12,
  marginTop: 4,
}

function App() {
  const [enviado, setEnviado] = useState<RegistroData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistroData>({
    resolver: zodResolver(RegistroSchema),
    defaultValues: { nombre: '', email: '', password: '', confirmar: '' },
  })

  const onSubmit = async (data: RegistroData) => {
    await new Promise(r => setTimeout(r, 800))
    setEnviado(data)
  }

  if (enviado) {
    return (
      <div style={{ maxWidth: 480, margin: '60px auto', padding: 32, fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: 12 }}>
        <h2 style={{ marginTop: 0, color: 'green' }}>Registro exitoso</h2>
        <p><strong>Nombre:</strong> {enviado.nombre}</p>
        <p><strong>Email:</strong> {enviado.email}</p>
        <p><strong>Password:</strong> {'*'.repeat(enviado.password.length)}</p>
        <button onClick={() => { setEnviado(null); reset() }} style={{ marginTop: 16, padding: '8px 16px' }}>
          Resetear
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: 32, fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: 12 }}>
      <h1 style={{ marginTop: 0, fontSize: 24 }}>Registro — RHF + Zod</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Nombre</label>
          <input {...register('nombre')} style={inputStyle} placeholder="Tu nombre" />
          {errors.nombre && <p style={errorStyle}>{errors.nombre.message}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Email</label>
          <input {...register('email')} style={inputStyle} placeholder="tu@email.com" />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Contraseña</label>
          <input {...register('password')} type="password" style={inputStyle} placeholder="Mínimo 8 caracteres" />
          {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500 }}>Confirmar contraseña</label>
          <input {...register('confirmar')} type="password" style={inputStyle} placeholder="Repetí la contraseña" />
          {errors.confirmar && <p style={errorStyle}>{errors.confirmar.message}</p>}
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
          {isSubmitting ? 'Enviando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}

export default App
