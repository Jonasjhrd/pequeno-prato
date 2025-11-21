import "server-only"

import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// This ensures the app builds even if env vars are missing, but will throw at runtime if used
export const stripe = new Stripe(stripeSecretKey || "dummy_key_for_build", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

export const isStripeConfigured = () => !!stripeSecretKey
