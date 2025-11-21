import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PequenoPratoClient from '@/components/pequeno-prato-client'

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
