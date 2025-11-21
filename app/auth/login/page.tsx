"use client"

import { signIn } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { UtensilsCrossed, AlertCircle, Sparkles, ArrowLeft } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 text-white font-semibold rounded-2xl h-12 shadow-md hover:shadow-lg transition-all duration-300"
      disabled={pending}
    >
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, null)
  const router = useRouter()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState<string | null>(null)

  useEffect(() => {
    if (state?.success) {
      console.log("[v0] Login successful, redirecting to /receitas")
      router.push("/receitas")
    }
  }, [state, router])

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setGoogleError(null)

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Configuração do Supabase ausente. Verifique as variáveis de ambiente.")
      }

      const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setGoogleError(`Erro: ${error.message}`)
      }
    } catch (error) {
      setGoogleError(`Erro ao conectar com Google: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors w-fit group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Voltar para página inicial
          </Link>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full blur-lg opacity-50"></div>
              <UtensilsCrossed className="h-12 w-12 text-pink-400 relative z-10" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent relative z-10">
                Pequeno Prato
              </h1>
              <Sparkles className="h-6 w-6 text-yellow-400 relative z-10" />
            </div>
            <p className="text-base text-gray-600 font-medium">Receitas saudáveis para seu bebê</p>
          </div>

          <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Login
              </CardTitle>
              <CardDescription className="text-center text-base">
                Entre com seu email e senha ou use o Google
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(state?.error || googleError) && (
                <Alert variant="destructive" className="mb-4 rounded-2xl border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{state?.error || googleError}</AlertDescription>
                </Alert>
              )}

              <Button
                type="button"
                variant="outline"
                className="w-full mb-6 h-12 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 bg-transparent"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  "Conectando..."
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continuar com Google
                  </>
                )}
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-white px-3 text-gray-500 font-medium">Ou continue com email</span>
                </div>
              </div>

              <form action={formAction}>
                <div className="flex flex-col gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="h-11 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="h-11 rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <SubmitButton />
                </div>
                <div className="mt-6 text-center text-sm">
                  Não tem uma conta?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="text-purple-500 font-semibold hover:text-purple-600 underline underline-offset-4"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
