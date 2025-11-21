import Link from "next/link"
import { Check, Star, Heart, Clock, Shield, Sparkles } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff9e6] via-[#d4eef9] to-[#ffe4f2]">
      {/* Header */}
      <header className="border-b-2 border-[#a8d8ea]/20 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#a8d8ea] to-[#ffc9e3] bg-clip-text text-transparent">
              ✨ Pequeno Prato
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-[#a8d8ea] font-medium px-4 py-2 rounded-full transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all font-semibold"
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#b5ead7]/30 text-[#2d5f4c] px-6 py-3 rounded-full text-sm font-semibold mb-8 border-2 border-[#b5ead7]">
            <Sparkles className="w-4 h-4" />
            Mais de 50 receitas saudáveis
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-800 leading-tight text-balance">
            Introdução alimentar saudável,{" "}
            <span className="bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] bg-clip-text text-transparent">
              sem açúcar
            </span>{" "}
            e cheia de amor
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Receitas nutricionalmente balanceadas para bebês e crianças. Criadas por nutricionistas, aprovadas por pais,
            e amadas pelos pequenos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/sign-up"
              className="bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Começar Gratuitamente
            </Link>
            <Link
              href="#planos"
              className="bg-white border-2 border-[#ffc9e3] text-[#e67eb5] px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#ffc9e3]/10 hover:scale-105 transition-all"
            >
              Ver Planos
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">💳 Sem cartão de crédito. Cancele quando quiser.</p>
        </div>

        {/* Hero Image */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-br from-[#d4eef9] to-[#ffe4f2] rounded-[2.5rem] p-10 max-w-5xl mx-auto shadow-2xl shadow-[#a8d8ea]/20">
            <Image
              src="/crian-a-comendo-papinha-feliz.jpg"
              alt="Criança feliz comendo comida saudável"
              width={1000}
              height={600}
              className="rounded-[2rem] w-full"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-white/80 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-[#d4eef9] to-white hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#a8d8ea] to-[#7ac5de] bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">Receitas Saudáveis</div>
            </div>
            <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-[#d9f4eb] to-white hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#b5ead7] to-[#9be0c8] bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-600 font-medium">Sem Açúcar</div>
            </div>
            <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-[#ffe4f2] to-white hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#ffc9e3] to-[#ffb3db] bg-clip-text text-transparent mb-2">
                5k+
              </div>
              <div className="text-gray-600 font-medium">Famílias Satisfeitas</div>
            </div>
            <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-[#fff4cc] to-white hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#ffd700] to-[#ffb347] bg-clip-text text-transparent mb-2">
                4.9★
              </div>
              <div className="text-gray-600 font-medium">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-24 bg-gradient-to-b from-white/50 to-[#d4eef9]/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Por que os pais escolhem Pequeno Prato?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              A introdução alimentar não precisa ser complicada ou cheia de açúcar escondido
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-10 rounded-[2rem] shadow-lg shadow-[#a8d8ea]/10 hover:shadow-2xl hover:shadow-[#a8d8ea]/20 hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-[#d4eef9] to-[#a8d8ea] w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">100% Sem Açúcar</h3>
              <p className="text-gray-600 leading-relaxed">
                Todas as receitas são naturalmente doces, usando apenas frutas e ingredientes naturais. Nada de açúcar
                escondido para bebês menores de 2 anos.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-lg shadow-[#ffc9e3]/10 hover:shadow-2xl hover:shadow-[#ffc9e3]/20 hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-[#ffe4f2] to-[#ffc9e3] w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Nutricionalmente Balanceadas</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada receita foi desenvolvida pensando no desenvolvimento saudável do seu bebê, com informações
                nutricionais completas.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-lg shadow-[#fff4cc]/10 hover:shadow-2xl hover:shadow-[#fff4cc]/20 hover:-translate-y-2 transition-all">
              <div className="bg-gradient-to-br from-[#fff4cc] to-[#ffd700] w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Rápidas e Práticas</h3>
              <p className="text-gray-600 leading-relaxed">
                Receitas detalhadas passo a passo, com tempo de preparo estimado. Perfeitas para o dia a dia corrido dos
                pais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 bg-white/80">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Tudo que você precisa em um só lugar</h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Receitas por Faixa Etária</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Filtre receitas específicas para a idade do seu bebê: 6-12 meses, 12-24 meses, ou 2+ anos. Cada
                  receita adaptada para o desenvolvimento da criança.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Texturas apropriadas para cada fase</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Alertas de alergênicos em todas as receitas</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Dicas de segurança alimentar</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#d9f4eb] to-[#ffe4f2] rounded-[2rem] p-8 shadow-xl">
                <Image
                  src="/images/receitas-por-idade.jpg"
                  alt="Receitas por idade"
                  width={600}
                  height={400}
                  className="rounded-[1.5rem] w-full"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-[#ffe4f2] to-[#fff4cc] rounded-[2rem] p-8 shadow-xl">
                <Image
                  src="/banana-pancakes.jpg"
                  alt="Gamificação"
                  width={600}
                  height={400}
                  className="rounded-[1.5rem] w-full"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Sistema de Gamificação</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Ganhe pontos a cada receita preparada, desbloqueie badges especiais e acompanhe seu progresso na
                  jornada de alimentação saudável.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-[#ffd700] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">10 pontos por receita completada</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-[#ffd700] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Badges exclusivos: Chef Iniciante, Mestre Culinário, e mais</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-[#ffd700] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Acompanhe todas as receitas que você já preparou</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Comunidade de Pais</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Compartilhe fotos das suas criações, inspire-se com outros pais e faça parte de uma comunidade que
                  valoriza alimentação saudável.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-[#ffc9e3] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Compartilhe suas refeições</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-[#ffc9e3] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Curta posts de outros pais</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-[#ffc9e3] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Inspire-se com criações da comunidade</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#e6d5f7] to-[#ffc9e3] rounded-[2rem] p-8 shadow-xl">
                <Image
                  src="/baby-eating-healthy.jpg"
                  alt="Comunidade"
                  width={600}
                  height={400}
                  className="rounded-[1.5rem] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-[#d4eef9]/30 to-white/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">O que os pais estão dizendo</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                "Finalmente encontrei receitas realmente sem açúcar! Meu bebê de 8 meses adora o purê de abóbora com
                canela. Obrigada Pequeno Prato!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ffc9e3] to-[#e6d5f7] rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800">Maria Silva</div>
                  <div className="text-sm text-gray-500">Mãe do Lucas, 8 meses</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                "As receitas são super práticas e meu filho de 2 anos come tudo! O sistema de pontos me motiva a
                experimentar novas receitas toda semana."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#a8d8ea] to-[#b5ead7] rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800">Ana Costa</div>
                  <div className="text-sm text-gray-500">Mãe do Pedro, 2 anos</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                "Incrível! Informações nutricionais completas, alertas de alergênicos, e receitas deliciosas. Vale cada
                centavo do plano Premium."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ffd4b8] to-[#ffc299] rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800">João Santos</div>
                  <div className="text-sm text-gray-500">Pai da Sofia, 1 ano</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="py-24 bg-white/80">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Escolha o plano perfeito para sua família
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Comece gratuitamente e faça upgrade quando quiser</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-[#e8e3dd] p-10 rounded-[2rem] hover:shadow-xl transition-all">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Gratuito</h3>
                <div className="text-5xl font-bold mb-3 text-gray-800">R$ 0</div>
                <p className="text-gray-500">Para experimentar</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">10 receitas essenciais</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Filtros por idade</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Sistema de pontos</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#b5ead7] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Comunidade</span>
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="block w-full bg-[#e8e3dd] text-gray-700 py-4 rounded-full text-center font-semibold hover:bg-[#b8b3ad] hover:text-white transition-all"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Essential Plan */}
            <div className="bg-white border-4 border-[#a8d8ea] p-10 rounded-[2rem] relative shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Mais Popular
              </div>
              <div className="text-center mb-10 mt-4">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Essencial</h3>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] bg-clip-text text-transparent">
                  R$ 9,90
                </div>
                <p className="text-gray-500">por mês</p>
                <p className="text-sm text-gray-400 mt-2">ou R$ 99,00/ano (economize 17%)</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#a8d8ea] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Todas as 50+ receitas</strong>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#a8d8ea] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Filtros avançados</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#a8d8ea] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Sistema completo de badges</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#a8d8ea] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Acesso à comunidade</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#a8d8ea] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Informações nutricionais completas</span>
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="block w-full bg-gradient-to-r from-[#a8d8ea] to-[#b5ead7] text-white py-4 rounded-full text-center font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Começar Agora
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-[#e6d5f7] to-[#ffc9e3] text-gray-800 p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-3">Premium</h3>
                <div className="text-5xl font-bold mb-3">R$ 19,90</div>
                <p className="text-gray-700">por mês</p>
                <p className="text-sm text-gray-600 mt-2">ou R$ 199,00/ano (economize 17%)</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span>
                    <strong>Tudo do Essencial +</strong>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span>Receitas exclusivas mensais</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span>Guias nutricionais de especialistas</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span>Planejador de refeições semanal</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span>Prioridade no suporte</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <span>Acesso antecipado a novos recursos</span>
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="block w-full bg-white text-[#d4b8f0] py-4 rounded-full text-center font-semibold hover:bg-gray-50 hover:scale-105 transition-all"
              >
                Começar Premium
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-10">
            Todos os planos incluem cancelamento a qualquer momento. Sem taxas escondidas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Perguntas Frequentes</h2>

            <div className="space-y-6">
              <details className="bg-white p-6 rounded-xl shadow-sm">
                <summary className="font-semibold text-lg cursor-pointer">
                  As receitas são realmente sem açúcar?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim! Todas as receitas para bebês de 6-24 meses são 100% livres de açúcar adicionado. Para crianças
                  acima de 2 anos, usamos apenas adoçantes naturais como tâmaras, banana e mel (após 1 ano), sempre em
                  quantidades mínimas.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl shadow-sm">
                <summary className="font-semibold text-lg cursor-pointer">Posso cancelar a qualquer momento?</summary>
                <p className="mt-4 text-gray-600">
                  Sim! Não há contratos ou compromissos. Você pode cancelar sua assinatura a qualquer momento
                  diretamente no app, e continuará tendo acesso até o final do período pago.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl shadow-sm">
                <summary className="font-semibold text-lg cursor-pointer">
                  As receitas têm informação sobre alergênicos?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim! Cada receita tem alertas claros sobre todos os alergênicos comuns (leite, ovos, glúten,
                  oleaginosas, frutos do mar, soja). Você sempre saberá exatamente o que está oferecendo ao seu bebê.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl shadow-sm">
                <summary className="font-semibold text-lg cursor-pointer">Qual a diferença entre os planos?</summary>
                <p className="mt-4 text-gray-600">
                  O plano Gratuito oferece 10 receitas essenciais. O Essencial dá acesso a todas as 50+ receitas atuais.
                  O Premium inclui tudo do Essencial mais receitas exclusivas mensais, guias de nutricionistas, e
                  recursos avançados.
                </p>
              </details>

              <details className="bg-white p-6 rounded-xl shadow-sm">
                <summary className="font-semibold text-lg cursor-pointer">Posso usar o app offline?</summary>
                <p className="mt-4 text-gray-600">
                  O app funciona melhor com conexão à internet, mas você pode visualizar receitas que já acessou
                  anteriormente. Estamos trabalhando em um modo offline completo para assinantes Premium.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-[#a8d8ea] to-[#b5ead7] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
            Comece hoje a jornada de alimentação saudável
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-95">
            Junte-se a milhares de pais que já transformaram a alimentação dos seus filhos. Sem açúcar, sem complicação,
            apenas receitas saudáveis e deliciosas.
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-block bg-white text-[#a8d8ea] px-12 py-5 rounded-full text-lg font-bold hover:scale-105 hover:shadow-2xl transition-all"
          >
            Começar Gratuitamente Agora
          </Link>
          <p className="mt-6 text-white/90 text-sm">💳 Sem cartão de crédito necessário</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Pequeno Prato</div>
              <p className="text-sm">Receitas saudáveis e sem açúcar para a introdução alimentar do seu bebê.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#planos" className="hover:text-white">
                    Planos
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Receitas
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Comunidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Termos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Pequeno Prato. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
