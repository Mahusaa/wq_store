import Image from "next/image"
import type { CartItem } from "~/lib/cart"

interface CartSummaryProps {
  items: CartItem[]
  total: number
}

export function CartSummary({ items, total }: CartSummaryProps) {
  return (
    <aside className="bg-secondary lg:sticky lg:top-8 self-start">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-start space-x-4">
            <div className="relative w-20 h-20">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-xs text-muted-foreground">
                {item.color}, {item.size}
              </p>
            </div>
            <div className="font-medium">${item.price}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span>Taxes/VAT</span>
          <span>-</span>
        </div>
        <div className="flex justify-between text-lg font-medium">
          <span>Total</span>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Rupiah</div>
            <div>${total}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}


