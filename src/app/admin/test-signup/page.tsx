import { createClient } from '@/lib/supabase/server'

export default async function TestSignupPage() {
  let diagnostics: any = {
    step1_env_check: {},
    step2_client_creation: {},
    step3_signup_attempt: {},
    step4_user_check: {}
  }

  try {
    // Step 1: Check environment variables
    diagnostics.step1_env_check = {
      SUPABASE_URL: process.env.SUPABASE_URL ? 'SET ✓' : 'MISSING ✗',
      SUPABASE_URL_value: process.env.SUPABASE_URL?.substring(0, 30) + '...',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET ✓' : 'MISSING ✗',
      SUPABASE_ANON_KEY_preview: process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...',
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error('Variáveis de ambiente SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas')
    }

    // Step 2: Create Supabase client
    const supabase = await createClient()
    
    if (!supabase || !supabase.auth) {
      throw new Error('Cliente Supabase não foi criado corretamente')
    }
    
    diagnostics.step2_client_creation = {
      status: 'Client created successfully ✓',
      has_auth: !!supabase.auth
    }

    // Step 3: Attempt to create a test user
    const testEmail = `teste.pequenoprato.${Date.now()}@gmail.com`
    const testPassword = 'TestPassword123!'
    
    console.log('[v0] Attempting to create test user:', testEmail)
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    })

    diagnostics.step3_signup_attempt = {
      email: testEmail,
      success: !signUpError,
      error: signUpError ? {
        message: signUpError.message,
        status: signUpError.status,
        name: signUpError.name
      } : null,
      user_created: signUpData?.user ? 'YES ✓' : 'NO ✗',
      user_id: signUpData?.user?.id || 'N/A',
      user_email: signUpData?.user?.email || 'N/A',
      user_confirmed: signUpData?.user?.confirmed_at ? 'YES ✓' : 'NO ✗',
      session_created: signUpData?.session ? 'YES ✓' : 'NO ✗'
    }

    // Step 4: Try to fetch the user we just created
    if (signUpData?.user?.id) {
      diagnostics.step4_user_check = {
        user_id: signUpData.user.id,
        user_email: signUpData.user.email,
        note: 'Usuário criado com sucesso (verificação admin requer SERVICE_ROLE_KEY)'
      }
    }

    // Check subscriptions table
    if (signUpData?.user?.id) {
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', signUpData.user.id)
        .maybeSingle()

      diagnostics.subscription_check = {
        subscription_exists: subData ? 'YES ✓' : 'NO ✗ - TRIGGER NÃO FUNCIONOU!',
        subscription_data: subData,
        error: subError?.message || null,
        problem: !subData ? '⚠️ O trigger automático que cria assinatura gratuita NÃO está funcionando!' : null
      }
    }

  } catch (error: any) {
    diagnostics.critical_error = {
      message: error.message,
      stack: error.stack
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          🔍 Teste de Cadastro de Usuário - Diagnóstico Completo
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📋 Passo 1: Verificação de Variáveis de Ambiente
          </h2>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(diagnostics.step1_env_check, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🔧 Passo 2: Criação do Cliente Supabase
          </h2>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(diagnostics.step2_client_creation, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            👤 Passo 3: Tentativa de Criar Usuário
          </h2>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(diagnostics.step3_signup_attempt, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🔍 Passo 4: Verificação do Usuário Criado
          </h2>
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(diagnostics.step4_user_check, null, 2)}
          </pre>
        </div>

        {diagnostics.subscription_check && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              💳 Verificação de Assinatura
            </h2>
            <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(diagnostics.subscription_check, null, 2)}
            </pre>
          </div>
        )}

        {diagnostics.critical_error && (
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-red-800">
              ⚠️ Erro Crítico
            </h2>
            <pre className="bg-white p-4 rounded text-sm overflow-x-auto text-red-700">
              {JSON.stringify(diagnostics.critical_error, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Instruções</h3>
          <p className="text-blue-800">
            Esta página cria automaticamente um usuário de teste e mostra todos os detalhes do processo.
            Recarregue a página (F5) para fazer um novo teste com um email diferente.
          </p>
        </div>
      </div>
    </div>
  )
}
