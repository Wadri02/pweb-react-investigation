import { createContext, useContext, useState } from 'react'

type Tema = 'claro' | 'oscuro'

interface TemaContextType {
  tema: Tema
  toggleTema: () => void
}

const TemaContext = createContext<TemaContextType | null>(null)

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>('claro')

  const toggleTema = () => {
    setTema(prev => prev === 'claro' ? 'oscuro' : 'claro')
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}

export function useTema() {
  const ctx = useContext(TemaContext)
  if (!ctx) throw new Error('useTema debe usarse dentro de TemaProvider')
  return ctx
}
