-- Script para verificar e corrigir o trigger de assinatura automática

-- 1. Verificar se o trigger existe
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 2. Verificar se a função existe
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines
WHERE routine_name = 'handle_new_user';

-- 3. Listar usuários sem assinatura
SELECT 
    au.id,
    au.email,
    au.created_at,
    CASE WHEN s.user_id IS NULL THEN 'SEM ASSINATURA' ELSE 'COM ASSINATURA' END as status
FROM auth.users au
LEFT JOIN public.subscriptions s ON au.id = s.user_id
ORDER BY au.created_at DESC;

-- 4. Criar assinaturas faltantes para usuários existentes
INSERT INTO public.subscriptions (user_id, plan_type, status, current_period_start, current_period_end)
SELECT 
    au.id,
    'free',
    'active',
    NOW(),
    NOW() + INTERVAL '100 years'
FROM auth.users au
LEFT JOIN public.subscriptions s ON au.id = s.user_id
WHERE s.user_id IS NULL;

-- 5. Recriar o trigger (caso não esteja funcionando)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 6. Verificar resultado final
SELECT 
    COUNT(*) as total_usuarios,
    COUNT(s.user_id) as usuarios_com_assinatura,
    COUNT(*) - COUNT(s.user_id) as usuarios_sem_assinatura
FROM auth.users au
LEFT JOIN public.subscriptions s ON au.id = s.user_id;
