import { useOptimistic, useState, useTransition } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

interface Message {
  id: number
  text: string
  status: 'sent' | 'sending' | 'error'
}

async function simulateServerSend(): Promise<void> {
  await new Promise<void>((resolve, reject) =>
    setTimeout(() => {
      // 25% de chance de falla para demostrar el revert
      if (Math.random() < 0.25) reject(new Error('Error de red simulado'))
      else resolve()
    }, 1200)
  )
}

export default function UseOptimisticExample() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [lastError, setLastError] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state: Message[], newMsg: Message) => [...state, newMsg]
  )

  async function handleSend() {
    const text = input.trim()
    if (!text) return

    const optimisticMsg: Message = { id: Date.now(), text, status: 'sending' }
    setInput('')
    setLastError(null)

    startTransition(async () => {
      addOptimistic(optimisticMsg)
      try {
        await simulateServerSend()
        // Éxito: agrega el mensaje confirmado al estado real
        setMessages(prev => [...prev, { ...optimisticMsg, status: 'sent' }])
      } catch {
        // Falla: el estado optimista se revierte automáticamente
        setLastError(`"${text}" — no se pudo enviar. El estado se revirtió.`)
      }
    })
  }

  return (
    <ExampleWrapper
      hook="useOptimistic"
      description="Muestra un estado temporal 'optimista' inmediatamente mientras se espera la respuesta del servidor."
      when="En chats, likes, listas donde querés respuesta visual instantánea antes de confirmar con el servidor. El estado se revierte automáticamente si la acción falla."
      badge="React 19"
    >
      <div className="chat-demo">
        <div className="messages-list">
          {optimisticMessages.length === 0 && (
            <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', margin: 'auto' }}>
              Sin mensajes. ¡Enviá el primero!
            </p>
          )}
          {optimisticMessages.map(msg => (
            <div
              key={msg.id}
              className={`message ${msg.status === 'sending' ? 'message--pending' : ''}`}
            >
              <span>{msg.text}</span>
              <span className="message-status">
                {msg.status === 'sending' ? '⏳ enviando...' : '✓ enviado'}
              </span>
            </div>
          ))}
        </div>

        {lastError && (
          <div style={{
            padding: '8px 12px',
            background: '#fee2e2',
            borderRadius: 8,
            border: '1px solid #fca5a5',
            fontSize: 12,
            color: '#dc2626',
          }}>
            ✕ {lastError}
          </div>
        )}

        <div className="chat-input">
          <input
            className="input"
            style={{ flex: 1 }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Escribí un mensaje... (Enter para enviar)"
          />
          <button className="btn btn--primary" onClick={handleSend} disabled={!input.trim()}>
            Enviar
          </button>
        </div>

        <p className="hint">25% de chance de falla — si falla, el mensaje desaparece (estado revertido automáticamente)</p>
      </div>

      <div className="code-block">
        <code>{`const [optimisticMsgs, addOptimistic] = useOptimistic(
  messages,
  (state, newMsg) => [...state, newMsg]  // función de actualización
)

startTransition(async () => {
  addOptimistic(optimisticMsg)    // ← UI actualiza inmediatamente
  try {
    await enviarAlServidor()
    setMessages(prev => [...prev, msgConfirmado])  // confirmar
  } catch {
    // No llamar setMessages → estado revierte automáticamente
  }
})`}</code>
      </div>
    </ExampleWrapper>
  )
}
