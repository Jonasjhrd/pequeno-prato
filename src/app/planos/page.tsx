import Link from "next/link"
import { redirect } from "next/navigation"
import { Check } from "lucide-react"

// ✅ CORREÇÃO 1: De '@/lib/supabase/server' para '../../lib/supabase/server'
import { createClient } from "@/lib/supabase/server"

// ✅ CORREÇÃO 2: De '@/lib/products' para '../../lib/products'
import { SUBSCRIPTION_PLANS } from "@/lib/products"

// ✅ CORREÇÃO 3: De '@/components/checkout-button' para '../../components/checkout-button'
import { CheckoutButton } from "@/components/checkout-button"

export default async function PlanosPage() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    let currentPlan = "free"

    try {
      const { data: subscription, error } = await supabase
        .from("subscriptions")
        .select("plan_type, status")
        .eq("user_id", user.id)
        .maybeSingle()

      if (error) {
        console.error("[v0] Error fetching subscription:", error)
      } else if (subscription && subscription.status === "active") {
        currentPlan = subscription.plan_type
      }
    } catch (subError) {
      console.error("[v0] Exception fetching subscription:", subError)
      // Continue with free plan as default
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Escolha Seu Plano</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Acesse receitas saudáveis e nutritivas para seu bebê. Sem açúcar, sem complicação.
            </p>
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isCurrent = currentPlan === plan.type
              const isPremium = plan.type === "premium"

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                    isPremium ? "ring-4 ring-green-500 scale-105" : ""
                  }`}
                >
                  {isPremium && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-4 right-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Plano Atual
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                    {plan.type === "free" ? (
                      <div className="text-4xl font-bold text-gray-900">Grátis</div>
                    ) : (
                      <div>
                        <div className="text-4xl font-bold text-gray-900">
                          R$ {(plan.priceMonthly / 100).toFixed(2)}
                          <span className="text-lg font-normal text-gray-600">/mês</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          ou R$ {(plan.priceYearly / 100).toFixed(2)}/ano
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {plan.type === "free" ? (
                    isCurrent ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Plano Atual
                      </button>
                    ) : (
                      <Link
                        href="/receitas"
                        className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg font-semibold hover:bg-gray-800 transition"
                      >
                        Começar Grátis
                      </Link>
                    )
                  ) : isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Plano Atual
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <CheckoutButton
                        planId={plan.id}
                        billingPeriod="monthly"
                        className={`w-full py-3 ${
                          isPremium ? "bg-green-500 hover:bg-green-600" : "bg-gray-900 hover:bg-gray-800"
                        } text-white rounded-lg font-semibold transition`}
                      >
                        Assinar Mensal
                      </CheckoutButton>
                      <CheckoutButton
                        planId={plan.id}
                        billingPeriod="yearly"
                        className={`w-full py-3 ${
                          isPremium ? "bg-green-600 hover:bg-green-700" : "bg-gray-800 hover:bg-gray-700"
                        } text-white rounded-lg font-semibold transition`}
                      >
                        Assinar Anual (Economize)
                      </CheckoutButton>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm">
              Todos os planos incluem acesso à comunidade e suporte por email.
              <br />
              Cancele a qualquer momento, sem multas.
            </p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("[v0] Critical error in planos page:", error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar planos</h1>
          <p className="text-gray-600 mb-6">{error instanceof Error ? error.message : "Erro desconhecido"}</p>
          <Link
            href="/receitas"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Voltar para Receitas
          </Link>
        </div>
      </div>
    )
  }
}
