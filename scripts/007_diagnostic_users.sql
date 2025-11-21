-- Diagnóstico completo de usuários e assinaturas
-- Execute este script no Supabase SQL Editor

-- 1. Ver todos os usuários do auth.users
SELECT 
  id,
  email,
  created_at,
  confirmed_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- 2. Ver todas as assinaturas
SELECT 
  id,
  user_id,
  plan_type,
  status,
  created_at,
  expires_at
FROM public.subscriptions
ORDER BY created_at DESC;

-- 3. Verificar usuários SEM assinatura (PROBLEMA CRÍTICO)
SELECT 
  u.id as user_id,
  u.email,
  u.created_at as user_created_at,
  s.id as subscription_id
FROM auth.users u
LEFT JOIN public.subscriptions s ON u.id = s.user_id
WHERE s.id IS NULL;

-- 4. Se encontrou usuários sem assinatura, corrigir:
-- Descomente as linhas abaixo para criar assinaturas gratuitas
/*
INSERT INTO public.subscriptions (user_id, plan_type, status, started_at)
SELECT 
  id,
  'free',
  'active',
  NOW()
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.subscriptions);
*/
