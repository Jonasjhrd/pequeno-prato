"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, UtensilsCrossed } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #fff9c4 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-8 w-8 text-pink-500" />
              <h1 className="text-3xl font-bold text-pink-600">Pequeno Prato</h1>
            </div>
          </div>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Conta Criada com Sucesso!</CardTitle>
              <CardDescription>
                Verifique seu email para confirmar sua conta e começar a explorar receitas saudáveis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/login">
                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  Ir para Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
