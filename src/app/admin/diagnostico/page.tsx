import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DiagnosticoPage() {
  const supabase = await createClient()
  
  // Verificar se está autenticado
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Buscar dados de assinatura do usuário logado
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Buscar todos os usuários (apenas admins deveriam ver)
  const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Diagnóstico de Usuários</h1>
        
        {/* Dados do usuário atual */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Seu Usuário</h2>
          <div className="space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Criado em:</strong> {new Date(user.created_at).toLocaleString('pt-BR')}</p>
            <p><strong>Último login:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('pt-BR') : 'Nunca'}</p>
          </div>
        </div>

        {/* Dados da assinatura */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Sua Assinatura</h2>
          {subscription ? (
            <div className="space-y-2">
              <p><strong>Plano:</strong> {subscription.plan_type}</p>
              <p><strong>Status:</strong> {subscription.status}</p>
              <p><strong>Iniciado em:</strong> {new Date(subscription.created_at).toLocaleString('pt-BR')}</p>
              {subscription.expires_at && (
                <p><strong>Expira em:</strong> {new Date(subscription.expires_at).toLocaleString('pt-BR')}</p>
              )}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 font-semibold">PROBLEMA CRÍTICO: Você não tem uma assinatura cadastrada!</p>
              <p className="text-red-600 text-sm mt-2">Isso indica que o trigger do Supabase não está funcionando.</p>
            </div>
          )}
        </div>

        {/* Lista de todos os usuários (apenas para debug) */}
        {usersError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-yellow-800">Não foi possível listar todos os usuários. Isso é normal se você não for admin do Supabase.</p>
          </div>
        )}
      </div>
    </div>
  )
}
