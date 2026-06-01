import { createContext, Suspense, use, useState } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

// ─── Ejemplo 1: use() con Context ──────────────────────────────────────────
interface User { nombre: string; rol: string }
const UserContext = createContext<User | null>(null)

function UserCard({ mostrar }: { mostrar: boolean }) {
  // ✅ use() puede llamarse condicionalmente (a diferencia de useContext)
  if (!mostrar) {
    return <div style={{ color: '#94a3b8', fontSize: 13, padding: '10px 0' }}>Componente oculto — use() no se llamó</div>
  }
  const user = use(UserContext)
  return (
    <div className={user ? 'user-card' : ''} style={{ fontSize: 14 }}>
      {user
        ? <><strong>{user.nombre}</strong> — {user.rol}</>
        : <span style={{ color: '#94a3b8' }}>Sin usuario en el context</span>
      }
    </div>
  )
}

// ─── Ejemplo 2: use() con Promise ──────────────────────────────────────────
function PromiseReader({ promise }: { promise: Promise<string> }) {
  // use() suspende el componente hasta que la promise resuelve
  const data = use(promise)
  return <div className="success-box">✓ {data}</div>
}

function createTimedPromise(ms: number) {
  return new Promise<string>(resolve =>
    setTimeout(() => resolve(`Datos cargados después de ${ms}ms`), ms)
  )
}

export default function UseExample() {
  const [user, setUser] = useState<User | null>(null)
  const [mostrarCard, setMostrarCard] = useState(true)
  const [promise, setPromise] = useState<Promise<string> | null>(null)
  const [suspenseKey, setSuspenseKey] = useState(0)

  function handleNewPromise() {
    const delay = 1500
    setSuspenseKey(k => k + 1)
    setPromise(createTimedPromise(delay))
  }

  return (
    <ExampleWrapper
      hook="use"
      description="Lee el valor de una Promise o Context. Es el único hook que puede llamarse condicionalmente o dentro de loops."
      when="En React 19 para leer promesas directamente en el render tree (dentro de Suspense), o como alternativa condicional a useContext."
      badge="React 19"
    >
      <div className="two-col">
        {/* ── Columna 1: Context ── */}
        <div>
          <p className="section-title">use() con Context</p>

          <UserContext.Provider value={user}>
            <div style={{ marginBottom: 12 }}>
              <UserCard mostrar={mostrarCard} />
            </div>

            <div className="btn-row">
              <button
                className="btn btn--sm btn--primary"
                onClick={() => setUser({ nombre: 'Ana García', rol: 'Admin' })}
              >
                Login
              </button>
              <button
                className="btn btn--sm btn--ghost"
                onClick={() => setUser(null)}
              >
                Logout
              </button>
              <button
                className="btn btn--sm"
                onClick={() => setMostrarCard(v => !v)}
              >
                {mostrarCard ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </UserContext.Provider>

          <p className="hint" style={{ marginTop: 10 }}>
            "Ocultar" demuestra que <code>use()</code> se puede llamar después de un{' '}
            <code>if</code> — algo imposible con los hooks normales.
          </p>
        </div>

        {/* ── Columna 2: Promise ── */}
        <div>
          <p className="section-title">use() con Promise</p>

          <button className="btn btn--primary btn--sm" onClick={handleNewPromise}>
            Crear Promise (1.5s)
          </button>

          {promise && (
            <Suspense
              key={suspenseKey}
              fallback={
                <div className="pending-indicator" style={{ marginTop: 10 }}>
                  ⏳ Leyendo promise con use()...
                </div>
              }
            >
              <PromiseReader promise={promise} />
            </Suspense>
          )}

          <p className="hint" style={{ marginTop: 10 }}>
            <code>use(promise)</code> suspende el componente.
            El <code>&lt;Suspense&gt;</code> muestra el fallback hasta que resuelve.
          </p>
        </div>
      </div>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`// Con Context — puede llamarse condicionalmente ✅
function Componente({ mostrar }) {
  if (!mostrar) return null          // early return — ok!
  const user = use(UserContext)      // válido después del if
  return <div>{user?.nombre}</div>
}

// Con Promise — suspende hasta que resuelve
function Datos({ promise }) {
  const data = use(promise)  // suspende el render
  return <div>{data}</div>   // solo llega aquí cuando resolvió
}

// Requiere Suspense boundary
<Suspense fallback={<Spinner />}>
  <Datos promise={fetchDatos()} />
</Suspense>`}</code>
      </div>
    </ExampleWrapper>
  )
}
