import { useDebugValue, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

interface PasswordResult {
  valor: string
  esSegura: boolean
  nivel: 'débil' | 'media' | 'fuerte'
  puntos: number
  setValor: (v: string) => void
}

function calcularNivel(password: string): Omit<PasswordResult, 'setValor'> {
  let puntos = 0
  if (password.length >= 8) puntos++
  if (/[A-Z]/.test(password)) puntos++
  if (/[0-9]/.test(password)) puntos++
  if (/[^A-Za-z0-9]/.test(password)) puntos++

  const nivel = puntos <= 1 ? 'débil' : puntos <= 2 ? 'media' : 'fuerte'
  return { valor: password, esSegura: puntos >= 3, nivel, puntos }
}

// Custom hook con useDebugValue
function useContrasena(inicial = ''): PasswordResult {
  const [valor, setValor] = useState(inicial)
  const estado = calcularNivel(valor)

  // Visible en React DevTools al inspeccionar el componente
  useDebugValue(estado, e => `${e.nivel.toUpperCase()} (${e.puntos}/4 pts)`)

  return { ...estado, setValor }
}

const COLORES: Record<string, string> = {
  débil: '#ef4444',
  media: '#f59e0b',
  fuerte: '#22c55e',
}

const HINTS = [
  { test: (p: string) => p.length >= 8, label: '8+ caracteres' },
  { test: (p: string) => /[A-Z]/.test(p), label: 'Mayúscula' },
  { test: (p: string) => /[0-9]/.test(p), label: 'Número' },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: 'Símbolo (!@#...)' },
]

export default function UseDebugValueExample() {
  const { valor, nivel, esSegura, puntos, setValor } = useContrasena()

  const color = valor ? COLORES[nivel] : '#e2e8f0'

  return (
    <ExampleWrapper
      hook="useDebugValue"
      description="Agrega una etiqueta legible a un custom hook para que aparezca en React DevTools."
      when="En custom hooks complejos que son difíciles de debuggear. Solo tiene efecto en React DevTools — no afecta el render ni la UI."
    >
      <div className="demo-section">
        <input
          className="input input--full"
          type="password"
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="Escribí una contraseña..."
          style={{ fontSize: 16, letterSpacing: valor ? 2 : 0 }}
        />

        <div className="password-meter" style={{ marginTop: 14 }}>
          <div className="meter-bar">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="meter-segment"
                style={{ background: i <= puntos ? color : '#e2e8f0' }}
              />
            ))}
          </div>
          <span style={{ color, fontWeight: 700, fontSize: 14 }}>
            {valor ? nivel.charAt(0).toUpperCase() + nivel.slice(1) : 'sin contraseña'}
          </span>
          {esSegura && <span className="badge badge--green">✓ Segura</span>}
        </div>

        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {HINTS.map(h => (
            <span
              key={h.label}
              style={{
                fontSize: 11,
                padding: '3px 9px',
                borderRadius: 20,
                fontWeight: 600,
                background: h.test(valor) ? '#dcfce7' : '#f1f5f9',
                color: h.test(valor) ? '#16a34a' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              {h.test(valor) ? '✓' : '○'} {h.label}
            </span>
          ))}
        </div>
      </div>

      <div className="code-block">
        <code>{`function useContrasena(inicial = '') {
  const [valor, setValor] = useState(inicial)
  const estado = calcularNivel(valor)

  // ← visible en React DevTools
  useDebugValue(estado, e => \`\${e.nivel} (\${e.puntos}/4 pts)\`)

  return { ...estado, setValor }
}

// En DevTools aparece:
// useContrasena: "FUERTE (4/4 pts)"`}</code>
      </div>

      <div
        style={{
          marginTop: 14,
          padding: '10px 14px',
          background: '#f0f4ff',
          borderRadius: 8,
          fontSize: 12,
          color: '#4f46e5',
          border: '1px solid #c7d2fe',
        }}
      >
        🔍 <strong>Visible en React DevTools</strong> al inspeccionar el componente bajo "Hooks".
        El segundo argumento es una función de formato — solo se llama si DevTools está abierto (sin overhead en prod).
      </div>
    </ExampleWrapper>
  )
}
