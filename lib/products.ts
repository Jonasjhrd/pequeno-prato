export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  priceMonthly: number // em centavos (R$)
  priceYearly: number // em centavos (R$)
  features: string[]
  type: 'free' | 'essential' | 'premium'
  recipesLimit: number | null // null = ilimitado
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free-plan',
    name: 'Gratuito',
    description: 'Perfeito para começar',
    priceMonthly: 0,
    priceYearly: 0,
    type: 'free',
    recipesLimit: 10,
    features: [
      '10 receitas essenciais',
      'Filtros por idade',
      'Informações nutricionais básicas',
      'Acesso à comunidade'
    ]
  },
  {
    id: 'essential-plan',
    name: 'Essencial',
    description: 'Acesso completo às receitas atuais',
    priceMonthly: 990, // R$ 9,90
    priceYearly: 9900, // R$ 99,00
    type: 'essential',
    recipesLimit: 50,
    features: [
      'Todas as 50+ receitas atuais',
      'Filtros avançados por categoria',
      'Sistema de gamificação completo',
      'Badges e conquistas',
      'Compartilhar na comunidade',
      'Suporte por email'
    ]
  },
  {
    id: 'premium-plan',
    name: 'Premium',
    description: 'Tudo ilimitado + conteúdo exclusivo',
    priceMonthly: 1990, // R$ 19,90
    priceYearly: 19900, // R$ 199,00
    type: 'premium',
    recipesLimit: null,
    features: [
      'TUDO do plano Essencial',
      'Todas as receitas futuras (atualizações mensais)',
      'Conteúdo exclusivo de nutricionistas',
      'Guias de introdução alimentar',
      'Planos de refeições semanais',
      'Suporte prioritário via WhatsApp',
      'Acesso vitalício a novos recursos'
    ]
  }
]
