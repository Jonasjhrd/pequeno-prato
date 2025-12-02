"use server"

import { redirect } from "next/navigation"
import { stripe, isStripeConfigured } from "@/lib/stripe"
import { SUBSCRIPTION_PLANS } from "@/lib/products"
import { createClient } from "@/lib/supabase/server"

export async function createCheckoutSession(planId: string, billingPeriod: "monthly" | "yearly", origin: string) {
  if (!isStripeConfigured()) {
    throw new Error("Stripe não está configurado. Verifique a variável STRIPE_SECRET_KEY.")
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)

  if (!plan || plan.type === "free") {
    throw new Error("Plano inválido")
  }

  const priceInCents = billingPeriod === "yearly" ? plan.priceYearly : plan.priceMonthly

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: user.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `Pequeno Prato - ${plan.name}`,
              description: plan.description,
            },
            unit_amount: priceInCents,
            recurring: {
              interval: billingPeriod === "yearly" ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/planos`,
      metadata: {
        user_id: user.id,
        plan_type: plan.type,
        billing_period: billingPeriod,
      },
    })

    return session.url!
  } catch (error) {
    console.error("Stripe error:", error)
    throw error
  }
}

export async function createPortalSession() {
  if (!isStripeConfigured()) {
    throw new Error("Stripe não está configurado.")
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!subscription?.stripe_customer_id) {
    throw new Error("Assinatura não encontrada")
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${siteUrl}/receitas`,
  })

  return portalSession.url
}
