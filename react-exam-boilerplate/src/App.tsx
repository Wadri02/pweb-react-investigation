import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Post {
  id: number
  title: string
  body: string
}

function App() {
  const queryClient = useQueryClient()
  const [titulo, setTitulo] = useState('')

  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r => r.json()),
  })

  const mutation = useMutation({
    mutationFn: (nuevoPost: { title: string; body: string }) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPost),
      }).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitulo('')
    },
  })

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32, fontFamily: 'sans-serif' }}>
      <h1>TanStack Query</h1>

      <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h2 style={{ marginTop: 0 }}>useQuery — Posts</h2>
        {isLoading && <p style={{ color: '#666' }}>⏳ Cargando posts...</p>}
        {isError && <p style={{ color: 'crimson' }}>Error al cargar los posts.</p>}
        {posts && (
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {posts.map(post => (
              <li key={post.id} style={{ marginBottom: 8 }}>
                <strong>{post.title}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>useMutation — Publicar post</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Título del nuevo post..."
            style={{ flex: 1, padding: '6px 10px' }}
          />
          <button
            onClick={() => mutation.mutate({ title: titulo, body: 'Contenido del post' })}
            disabled={mutation.isPending || !titulo.trim()}
          >
            {mutation.isPending ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
        {mutation.isSuccess && (
          <p style={{ color: 'green', marginTop: 8 }}>
            Post publicado con id: {(mutation.data as Post).id}
          </p>
        )}
      </section>
    </div>
  )
}

export default App
