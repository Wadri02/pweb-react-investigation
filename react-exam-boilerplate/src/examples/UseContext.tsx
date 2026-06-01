import { createContext, useContext, useState, type ReactNode } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', toggle: () => {} })

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      {children}
    </ThemeContext.Provider>
  )
}

function Header() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`theme-box ${theme}`}>
      <strong>Header</strong> — lee el tema: <code>{theme}</code>
      <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 8 }}>(sin recibir props)</span>
    </div>
  )
}

function Sidebar() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`theme-box ${theme}`}>
      <strong>Sidebar</strong> — lee el tema: <code>{theme}</code>
      <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 8 }}>(sin recibir props)</span>
    </div>
  )
}

function ToggleButton() {
  const { toggle, theme } = useContext(ThemeContext)
  return (
    <button className="btn btn--primary" onClick={toggle}>
      {theme === 'light' ? '🌙 Cambiar a oscuro' : '☀️ Cambiar a claro'}
    </button>
  )
}

export default function UseContextExample() {
  return (
    <ExampleWrapper
      hook="useContext"
      description="Lee valores de un Context sin necesidad de prop drilling — cualquier componente en el árbol puede acceder al valor."
      when="Cuando múltiples componentes en distintos niveles necesitan el mismo valor (tema, usuario autenticado, idioma, carrito)."
    >
      <ThemeProvider>
        <div className="context-demo">
          <ToggleButton />
          <Header />
          <Sidebar />
        </div>
      </ThemeProvider>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`// 1. Crear el context
const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

// 2. Proveer el valor
<ThemeContext.Provider value={{ theme, toggle }}>
  <App />
</ThemeContext.Provider>

// 3. Consumir en cualquier componente hijo
const { theme } = useContext(ThemeContext)`}</code>
      </div>
    </ExampleWrapper>
  )
}
