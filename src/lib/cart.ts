import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "~/types/cart"

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.variantId === newItem.variantId)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.variantId === newItem.variantId ? { ...item, quantity: item.quantity + newItem.quantity } : item,
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },
      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }))
      },
      updateQuantity: (variantId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => (item.variantId === variantId ? { ...item, quantity } : item)),
        }))
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)


