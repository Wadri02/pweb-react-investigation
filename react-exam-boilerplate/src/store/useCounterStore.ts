import { create } from 'zustand'

interface CounterStore {
  count: number
  items: string[]
  inc: () => void
  dec: () => void
  reset: () => void
  addItem: (texto: string) => void
}

export const useCounterStore = create<CounterStore>(set => ({
  count: 0,
  items: [],
  inc: () => set(state => ({ count: state.count + 1 })),
  dec: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0, items: [] }),
  addItem: (texto: string) => set(state => ({ items: [...state.items, texto] })),
}))
