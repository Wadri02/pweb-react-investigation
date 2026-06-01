import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

interface InputHandle {
  focus(): void
  clear(): void
  getValue(): string
}

const InputPersonalizado = forwardRef<InputHandle, { placeholder?: string }>(
  function InputPersonalizado({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = ''
          inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
        }
      },
      getValue: () => inputRef.current?.value ?? '',
    }))

    return (
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="input input--full"
        style={{ border: '2px solid #6366f1' }}
      />
    )
  }
)

export default function UseImperativeHandleExample() {
  const ref = useRef<InputHandle>(null)
  const [resultado, setResultado] = useState<string | null>(null)

  return (
    <ExampleWrapper
      hook="useImperativeHandle"
      description="Permite que un componente hijo exponga una API personalizada al padre vía ref, en lugar de exponer el nodo DOM directamente."
      when="Cuando querés encapsular la lógica interna de un componente hijo y exponer solo los métodos necesarios. Siempre usarlo junto con forwardRef."
    >
      <div className="demo-section">
        <p className="section-title">InputPersonalizado (con forwardRef)</p>
        <InputPersonalizado ref={ref} placeholder="Controlado desde el padre..." />
      </div>

      <div className="demo-section">
        <p className="section-title">Métodos expuestos por el hijo</p>
        <div className="btn-row">
          <button
            className="btn btn--primary"
            onClick={() => ref.current?.focus()}
          >
            ref.focus()
          </button>
          <button
            className="btn"
            onClick={() => ref.current?.clear()}
          >
            ref.clear()
          </button>
          <button
            className="btn"
            onClick={() => setResultado(ref.current?.getValue() ?? '(vacío)')}
          >
            ref.getValue()
          </button>
        </div>

        {resultado !== null && (
          <div
            style={{
              marginTop: 12,
              padding: '10px 14px',
              background: '#f0fdf4',
              borderRadius: 8,
              border: '1px solid #86efac',
              fontSize: 14,
            }}
          >
            getValue() retornó: <strong>"{resultado}"</strong>
          </div>
        )}
      </div>

      <p className="explanation">
        El padre llama <code>ref.current.focus()</code> — nunca accede al{' '}
        <code>&lt;input&gt;</code> nativo directamente. El hijo decide qué expone y qué oculta.
        Esto evita que el padre rompa invariantes internos del componente hijo.
      </p>

      <div className="code-block">
        <code>{`useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  clear: () => { inputRef.current.value = '' },
  getValue: () => inputRef.current?.value ?? '',
}))

// Padre:
ref.current?.focus()    // ✅ API controlada
ref.current?.clear()    // ✅ API controlada
// ref.current.style    // ❌ no expuesto`}</code>
      </div>
    </ExampleWrapper>
  )
}
