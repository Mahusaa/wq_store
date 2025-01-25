"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"
import Image from "next/image"
import { ScrollArea } from "~/components/ui/scroll-area"
import { toast } from "sonner"
import type { CartItem } from "~/lib/cart"
import { getCart, removeFromCart, updateCartItemQuantity, getCartTotal } from "~/lib/cart"

export default function CartSheet() {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const updateCart = () => {
      setItems(getCart())
      setTotal(getCartTotal())
    }

    updateCart()
    window.addEventListener("storage", updateCart)

    return () => {
      window.removeEventListener("storage", updateCart)
    }
  }, [])

  const handleRemoveItem = (variantId: string) => {
    removeFromCart(variantId)
    setItems(getCart())
    setTotal(getCartTotal())
    toast.success("Item removed from cart")
  }

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    updateCartItemQuantity(variantId, quantity)
    setItems(getCart())
    setTotal(getCartTotal())
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5  bg-primary text-xs font-mono flex items-center justify-center text-primary-foreground">
              {items.length}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-mono">Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 py-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-secondary">
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-mono text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.color}, {item.size}
                    </p>
                    <p className="text-sm font-mono">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.variantId, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="font-mono w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.variantId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleRemoveItem(item.variantId)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-mono">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <Button className="w-full font-mono" onClick={() => toast.success("Order placed successfully!")}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}


