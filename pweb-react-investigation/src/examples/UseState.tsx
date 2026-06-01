import { useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

export default function UseStateExample() {
  const [count, setCount] = useState(0)

  return (
    <ExampleWrapper
      hook="useState"
      description="Agrega estado local reactivo a un componente funcional. Cada cambio de estado dispara un re-render."
      when="Cuando necesitás guardar un valor que cambia y debe actualizar la UI. Es el hook más básico y común de React."
    >
      <div className="counter-demo">
        <button className="btn btn--lg" onClick={() => setCount(prev => prev - 1)}>−</button>
        <span className="count-display">{count}</span>
        <button className="btn btn--lg" onClick={() => setCount(prev => prev + 1)}>+</button>
      </div>

      <button className="btn btn--ghost" onClick={() => setCount(0)}>
        Reset a 0
      </button>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`const [count, setCount] = useState(0)

// ✅ Actualización funcional — usa el valor más reciente
setCount(prev => prev + 1)

// ⚠️  Puede tener stale closure en handlers async
setCount(count + 1)`}</code>
      </div>

      <p className="explanation">
        La <strong>actualización funcional</strong> <code>prev =&gt; prev + 1</code> garantiza que
        siempre usás el último valor del estado, evitando bugs con closures stale en efectos o
        callbacks asíncronos. Preferila siempre que el nuevo valor depende del anterior.
      </p>
    </ExampleWrapper>
  )
}
