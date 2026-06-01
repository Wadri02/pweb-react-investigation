import { z } from 'zod'

export const ContactoSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  telefono: z.string().regex(/^\d{10}$/, 'Debe tener exactamente 10 dígitos').optional().or(z.literal('')),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  categoria: z.enum(['consulta', 'soporte', 'ventas'], {
    errorMap: () => ({ message: 'Seleccioná una categoría' }),
  }),
})

export type ContactoData = z.infer<typeof ContactoSchema>
