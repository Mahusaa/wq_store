"use client"

import { useState, useEffect } from "react"
import { getCart, getCartTotal } from "~/lib/cart"
import type { CartItem } from "~/lib/cart"
import { CartSummary } from "~/components/cart-summary"
import { CheckoutForm } from "~/components/checkout-form"
import { ProgressSteps } from "~/components/progress-step"
export default function Page() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    { label: "Information", isActive: currentStep === 0, isCompleted: currentStep > 0 },
    { label: "Shipping", isActive: currentStep === 1, isCompleted: currentStep > 1 },
    { label: "Payment", isActive: currentStep === 2, isCompleted: false },
  ]

  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

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

  return (
    <div className="min-h-screen bg-background">
      <div className="grid md:grid-cols-2 mx-4">
        {/* Scrollable Checkout Form */}
        <div className="h-screen pr-4">
          <CheckoutForm />
        </div>

        {/* Fixed Cart Summary */}
        <CartSummary items={items} total={total} />
      </div>
    </div>
  )
}
