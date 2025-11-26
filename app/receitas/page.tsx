import { redirect } from 'next/navigation'

// ✅ CORREÇÃO 1: De '@/lib/supabase/server' para '../../lib/supabase/server'
import { createClient } from '../../lib/supabase/server'

// ✅ CORREÇÃO 2: De '@/components/pequeno-prato-client' para '../../components/pequeno-prato-client'
import PequenoPratoClient from '../../components/pequeno-prato-client'

export default async function ReceitasPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Buscar dados da assinatura do usuário
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan_type')
    .eq('user_id', user.id)
    .single()

  const userPlan = subscription?.plan_type || 'free'

  return <PequenoPratoClient initialUser={user} initialPlan={userPlan} />
}
