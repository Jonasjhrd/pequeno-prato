-- Verificar usuários do auth.users que não têm assinatura
SELECT 
  au.id,
  au.email,
  au.created_at,
  s.plan_type
FROM auth.users au
LEFT JOIN public.subscriptions s ON au.id = s.user_id
WHERE s.user_id IS NULL;

-- Criar assinatura gratuita para todos os usuários que não têm
INSERT INTO public.subscriptions (user_id, plan_type, status, started_at)
SELECT 
  au.id,
  'free',
  'active',
  NOW()
FROM auth.users au
LEFT JOIN public.subscriptions s ON au.id = s.user_id
WHERE s.user_id IS NULL
ON CONFLICT DO NOTHING;

-- Verificar se o trigger existe
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
