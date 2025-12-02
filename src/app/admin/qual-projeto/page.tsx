export default function QualProjetoSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL || 'NÃO CONFIGURADO'
  
  // Extrai o ID do projeto da URL
  const projectId = supabaseUrl.includes('supabase.co') 
    ? supabaseUrl.split('//')[1]?.split('.')[0] 
    : 'ID não encontrado'

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Encontre Seu Projeto Supabase</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📍 Projeto Configurado</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">URL do Supabase:</p>
              <code className="block bg-gray-100 p-3 rounded text-sm break-all">
                {supabaseUrl}
              </code>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">ID do Projeto:</p>
              <code className="block bg-yellow-100 p-3 rounded text-lg font-bold">
                {projectId}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Acesse o Dashboard Correto</h2>
          <p className="mb-4 text-gray-700">Clique no botão abaixo para abrir o projeto CORRETO no Supabase:</p>
          
          <a 
            href={`https://supabase.com/dashboard/project/${projectId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            🚀 Abrir Projeto {projectId} no Supabase
          </a>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
          <h3 className="font-semibold mb-3">📋 Como verificar os usuários:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Clique no botão verde acima</li>
            <li>No menu lateral esquerdo, clique em <strong>Authentication</strong></li>
            <li>Clique em <strong>Users</strong></li>
            <li>Procure pelo ID: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{projectId === 'lqhohqdgcjosyzimszlq' ? 'b3ee46fe-11c3-4071-9777-25fb6f0a7c7a' : 'veja a lista de usuários'}</code></li>
          </ol>
        </div>

        <div className="mt-6 bg-red-50 border border-red-300 rounded-lg p-6">
          <h3 className="font-semibold mb-2 text-red-800">⚠️ Se ainda não ver os usuários:</h3>
          <p className="text-gray-700">
            Significa que você estava olhando um projeto DIFERENTE no dashboard. 
            O link acima vai te levar para o projeto CORRETO onde os usuários estão sendo criados.
          </p>
        </div>
      </div>
    </div>
  )
}
