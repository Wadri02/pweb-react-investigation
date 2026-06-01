import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
      <button onClick={() => setCount(c => Math.max(0, c - 1))}>Decrementar</button>
      <button onClick={() => setCount(0)}>Resetear</button>
    </div>
  )
}
