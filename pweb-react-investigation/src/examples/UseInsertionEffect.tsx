import { useInsertionEffect, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

function StyledBox({ color }: { color: string }) {
  useInsertionEffect(() => {
    // Inserta el <style> ANTES de que React mute el DOM
    const style = document.createElement('style')
    style.textContent = `
      .insertion-demo-box {
        background: ${color};
        padding: 20px 24px;
        border-radius: 10px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        margin-top: 16px;
        transition: background 0.15s;
      }
    `
    document.head.appendChild(style)
    // Cleanup: elimina el <style> cuando el componente se desmonta o el color cambia
    return () => style.remove()
  }, [color])

  return <div className="insertion-demo-box">background: {color}</div>
}

export default function UseInsertionEffectExample() {
  const [color, setColor] = useState('#6366f1')

  const presets = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9']

  return (
    <ExampleWrapper
      hook="useInsertionEffect"
      description="Inyecta estilos CSS en el DOM antes de cualquier mutación del DOM — el hook de más baja prioridad en el ciclo de vida."
      when="Raramente en apps normales. Es para autores de librerías CSS-in-JS (styled-components, Emotion) que necesitan insertar <style> tags antes del paint para evitar FOUC."
      note="Nota: en aplicaciones normales raramente se usa. Es para autores de librerías de estilos dinámicos."
    >
      <div className="demo-section">
        <p className="section-title">Seleccioná un color</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {presets.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: c,
                border: color === c ? '3px solid #0f172a' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'border 0.15s',
              }}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            style={{ width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', padding: 0 }}
            title="Color personalizado"
          />
        </div>

        <StyledBox color={color} />
      </div>

      <div className="code-block">
        <code>{`useInsertionEffect(() => {
  const style = document.createElement('style')
  style.textContent = \`.box { background: \${color}; }\`
  document.head.appendChild(style)

  return () => style.remove()  // cleanup

}, [color])

// Orden de ejecución:
// 1. useInsertionEffect  ← antes de mutations
// 2. useLayoutEffect     ← después de mutations, antes del paint
// 3. useEffect           ← después del paint`}</code>
      </div>
    </ExampleWrapper>
  )
}
