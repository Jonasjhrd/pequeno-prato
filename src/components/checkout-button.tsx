"use client"

import type React from "react"

import { useState } from "react"
import { createCheckoutSession } from "@/lib/actions/stripe"

interface CheckoutButtonProps {
  planId: string
  billingPeriod: "monthly" | "yearly"
  children: React.ReactNode
  className?: string
}

export function CheckoutButton({ planId, billingPeriod, children, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const origin = window.location.origin

      const checkoutUrl = await createCheckoutSession(planId, billingPeriod, origin)

      const stripeWindow = window.open(checkoutUrl, "_blank")

      if (!stripeWindow) {
        alert("Por favor, permita pop-ups para continuar com o pagamento.")
      }

      setIsLoading(false)
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      alert("Erro ao processar pagamento. Tente novamente.")
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleCheckout} disabled={isLoading} className={className}>
      {isLoading ? "Processando..." : children}
    </button>
  )
}
