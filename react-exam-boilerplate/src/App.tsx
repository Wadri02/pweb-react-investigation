import { useState } from 'react'
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  Badge,
  Button,
  Input,
  Field,
} from '@chakra-ui/react'

interface Errors {
  email?: string
  password?: string
}

interface Usuario {
  email: string
  password: string
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const validar = (): Errors => {
    const e: Errors = {}
    if (!email.includes('@')) e.email = 'El email debe incluir @'
    if (password.length < 6) e.password = 'Mínimo 6 caracteres'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const errs = validar()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setUsuario({ email, password })
  }

  return (
    <Stack gap={6} p={8} maxW="480px" mx="auto" fontFamily="sans-serif">
      <Heading size="xl">Chakra UI — Dashboard</Heading>

      {/* Demostración de tokens de texto */}
      <VStack align="start" gap={1}>
        <Text fontSize="sm" color="gray.500">Sistema de tokens de color y tipografía</Text>
        <HStack gap={2}>
          <Text fontSize="xs" color="blue.500">blue.500</Text>
          <Text fontSize="xs" color="green.500">green.500</Text>
          <Text fontSize="xs" color="red.500">red.500</Text>
          <Text fontSize="xs" color="purple.500">purple.500</Text>
        </HStack>
      </VStack>

      {!usuario ? (
        /* Formulario de login */
        <Stack as="form" onSubmit={handleSubmit} gap={4}>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="usuario@email.com"
            />
            {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Contraseña</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <Field.ErrorText>{errors.password}</Field.ErrorText>}
          </Field.Root>

          <Button
            type="submit"
            colorPalette="blue"
            width="full"
            loading={loading}
            loadingText="Ingresando..."
          >
            Ingresar
          </Button>
        </Stack>
      ) : (
        /* Usuario logueado */
        <Stack gap={4} p={4} borderWidth="1px" borderRadius="lg" bg="green.50">
          <HStack justify="space-between">
            <Heading size="md">Usuario logueado</Heading>
            <Badge colorPalette="green">Activo</Badge>
          </HStack>

          <VStack align="start" gap={2}>
            <HStack gap={2}>
              <Text fontWeight="bold" fontSize="sm">Email:</Text>
              <Text fontSize="sm" color="gray.600">{usuario.email}</Text>
              <Badge colorPalette="blue" size="sm">Verificado</Badge>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight="bold" fontSize="sm">Rol:</Text>
              <Badge colorPalette="purple">Admin</Badge>
            </HStack>
          </VStack>

          <Button
            colorPalette="red"
            variant="outline"
            size="sm"
            onClick={() => { setUsuario(null); setEmail(''); setPassword('') }}
          >
            Cerrar sesión
          </Button>
        </Stack>
      )}

      {/* Demostración VStack / HStack */}
      <Stack gap={2}>
        <Text fontWeight="bold" fontSize="sm" color="gray.600">Layouts con HStack y VStack:</Text>
        <HStack gap={3} p={3} bg="gray.50" borderRadius="md">
          {['Inicio', 'Usuarios', 'Reportes', 'Config'].map(item => (
            <Badge key={item} colorPalette="gray" variant="outline" cursor="pointer">
              {item}
            </Badge>
          ))}
        </HStack>
        <VStack align="start" gap={1} p={3} bg="blue.50" borderRadius="md">
          <Text fontSize="xs" color="blue.700" fontWeight="semibold">VStack — items alineados al inicio</Text>
          <Text fontSize="xs" color="blue.600">Item 1</Text>
          <Text fontSize="xs" color="blue.600">Item 2</Text>
          <Text fontSize="xs" color="blue.600">Item 3</Text>
        </VStack>
      </Stack>
    </Stack>
  )
}

export default App
