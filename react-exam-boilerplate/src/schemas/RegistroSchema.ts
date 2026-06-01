import { z } from 'zod'

export const RegistroSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmar: z.string().min(1, 'Requerido'),
}).refine(data => data.password === data.confirmar, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmar'],
})

export type RegistroData = z.infer<typeof RegistroSchema>
