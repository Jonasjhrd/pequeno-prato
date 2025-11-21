"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserPlan() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return "free"

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan_type")
    .eq("user_id", user.id)
    .maybeSingle() // Changed from single() to maybeSingle() to prevent errors

  return subscription?.plan_type || "free"
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/landing")
}

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("[Auth] Login error:", error.message)
    if (error.message.includes("Email not confirmed")) {
      return {
        error: "Email não confirmado. Por favor, verifique sua caixa de entrada ou contate o suporte.",
      }
    }
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const repeatPassword = formData.get("repeatPassword") as string

  if (password !== repeatPassword) {
    return { error: "As senhas não coincidem" }
  }

  if (password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres" }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    console.error("[Auth] Signup error:", error.message)
    return { error: `Erro ao criar conta: ${error.message}` }
  }

  if (!data.user) {
    console.error("[Auth] Critical: No user returned from signUp")
    return { error: "Erro crítico: Usuário não foi criado" }
  }

  if (data.user && !data.session) {
    return {
      success: true,
      message: "Conta criada! Verifique seu email para confirmar.",
    }
  }

  if (data.session) {
    revalidatePath("/", "layout")
    redirect("/receitas")
  }

  redirect("/auth/success")
}
