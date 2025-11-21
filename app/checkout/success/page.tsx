import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pagamento Confirmado!
        </h1>

        <p className="text-gray-600 mb-8">
          Sua assinatura foi ativada com sucesso. Agora você tem acesso completo a todas as receitas e recursos do Pequeno Prato.
        </p>

        <div className="space-y-3">
          <Link
            href="/receitas"
            className="block w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Começar a Explorar Receitas
          </Link>

          <Link
            href="/"
            className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  )
}
