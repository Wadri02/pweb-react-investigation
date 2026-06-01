import { useState } from 'react'
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from '@mui/material'

interface Errors {
  email?: string
  password?: string
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)

  const validar = (): Errors => {
    const e: Errors = {}
    if (!email.includes('@')) e.email = 'El email debe incluir @'
    if (password.length < 6) e.password = 'La contraseña debe tener mínimo 6 caracteres'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setExito(true)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 400,
          bgcolor: 'white',
          borderRadius: 3,
          p: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Iniciar sesión
        </Typography>

        {exito && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Login exitoso! Bienvenido.
          </Alert>
        )}

        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email ?? ' '}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password ?? ' '}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
