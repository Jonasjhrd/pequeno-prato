export default async function SupabaseInfoPage() {
  const supabaseUrl = process.env.SUPABASE_URL || 'Não configurado'
  const hasAnonKey = !!process.env.SUPABASE_ANON_KEY
  const nextPublicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não configurado'
  const hasNextPublicKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Configuração do Supabase</h1>
        
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Variáveis de Ambiente</h2>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium">SUPABASE_URL:</p>
              <p className="mt-1 rounded bg-muted p-2 font-mono text-sm break-all">
                {supabaseUrl}
              </p>
              {supabaseUrl.includes('.supabase.co') && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Projeto ID: <span className="font-mono font-semibold">{supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || 'N/A'}</span>
                </p>
              )}
            </div>
            
            <div>
              <p className="font-medium">SUPABASE_ANON_KEY:</p>
              <p className="mt-1 rounded bg-muted p-2 font-mono text-sm">
                {hasAnonKey ? '✓ Configurada (oculta por segurança)' : '✗ Não configurada'}
              </p>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</p>
              <p className="mt-1 rounded bg-muted p-2 font-mono text-sm">
                {nextPublicUrl}
              </p>
            </div>
            
            <div>
              <p className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</p>
              <p className="mt-1 rounded bg-muted p-2 font-mono text-sm">
                {hasNextPublicKey ? '✓ Configurada (oculta por segurança)' : '✗ Não configurada'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            Problema Identificado
          </h2>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            As variáveis <code className="font-mono">NEXT_PUBLIC_*</code> estão faltando. 
            Isso pode causar problemas no signup porque o cliente Supabase no navegador não consegue se conectar.
          </p>
        </div>

        <div className="rounded-lg border border-blue-500 bg-blue-50 p-6 dark:bg-blue-950">
          <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            Como Verificar no Dashboard
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-blue-800 dark:text-blue-200">
            <li>Acesse: <a href="https://supabase.com/dashboard" target="_blank" className="underline">supabase.com/dashboard</a></li>
            <li>Selecione o projeto que corresponde à URL acima</li>
            <li>Vá em Settings → API</li>
            <li>Compare a Project URL e anon key com as configuradas aqui</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
