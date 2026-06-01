import LoginForm from './components/LoginForm'
import TaskList from './components/TaskList'

const tareasDemo = [
  { id: 1, texto: 'Aprender React Testing Library' },
  { id: 2, texto: 'Escribir tests descriptivos' },
  { id: 3, texto: 'Usar userEvent para interacciones' },
]

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, fontFamily: 'sans-serif' }}>
      <h1>React Testing Library</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Ejecutá <code>npm test</code> para ver los tests de <code>LoginForm</code> y <code>TaskList</code>.
      </p>

      <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ marginTop: 0 }}>LoginForm — testeado</h2>
        <LoginForm />
      </section>

      <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>TaskList — testeada</h2>
        <TaskList tareas={tareasDemo} />
      </section>
    </div>
  )
}

export default App
