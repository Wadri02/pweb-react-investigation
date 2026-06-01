import { useReducer } from 'react'
import { ExampleWrapper } from '../components/ExampleWrapper'

interface Product { id: number; name: string; price: number }
interface CartItem { product: Product; qty: number }
interface CartState { items: CartItem[] }

type Action =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }

const PRODUCTS: Product[] = [
  { id: 1, name: 'Notebook Pro', price: 1200 },
  { id: 2, name: 'Mouse Inalámbrico', price: 35 },
  { id: 3, name: 'Teclado Mecánico', price: 85 },
  { id: 4, name: 'Monitor 4K', price: 450 },
]

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.product.id === action.payload.id)
      if (exists) {
        return {
          items: state.items.map(i =>
            i.product.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { product: action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.product.id !== action.payload) }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const total = state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <ExampleWrapper
      hook="useReducer"
      description="Maneja estado complejo con un reducer puro: (state, action) => newState."
      when="Cuando el estado tiene lógica compleja o múltiples sub-valores relacionados. Preferilo sobre useState cuando tenés 3+ setters que siempre se actualizan juntos."
    >
      <div className="two-col">
        <div>
          <p className="section-title">Catálogo</p>
          {PRODUCTS.map(p => (
            <div key={p.id} className="product-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>${p.price}</div>
              </div>
              <button
                className="btn btn--sm btn--primary"
                onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
              >
                + Agregar
              </button>
            </div>
          ))}
        </div>

        <div>
          <p className="section-title">
            Carrito {itemCount > 0 && <span style={{ color: '#6366f1' }}>({itemCount} items)</span>}
          </p>

          {state.items.length === 0 ? (
            <p className="empty-msg">Carrito vacío</p>
          ) : (
            <>
              {state.items.map(i => (
                <div key={i.product.id} className="cart-row">
                  <span style={{ flex: 1, fontSize: 12 }}>{i.product.name}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>x{i.qty}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>${i.product.price * i.qty}</span>
                  <button
                    className="btn btn--sm btn--danger"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: i.product.id })}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="cart-total">Total: <strong>${total}</strong></div>
              <button
                className="btn btn--ghost btn--sm"
                style={{ marginTop: 8 }}
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Limpiar carrito
              </button>
            </>
          )}
        </div>
      </div>

      <div className="code-block" style={{ marginTop: 20 }}>
        <code>{`dispatch({ type: 'ADD_ITEM', payload: producto })
dispatch({ type: 'REMOVE_ITEM', payload: id })
dispatch({ type: 'CLEAR_CART' })`}</code>
      </div>
    </ExampleWrapper>
  )
}
