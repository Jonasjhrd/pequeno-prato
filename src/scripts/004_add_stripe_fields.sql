-- Adicionar campos do Stripe à tabela subscriptions
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ;

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer 
ON subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription 
ON subscriptions(stripe_subscription_id);
