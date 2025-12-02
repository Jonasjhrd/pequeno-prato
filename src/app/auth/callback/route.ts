import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/receitas"

  if (code) {
    const supabase = await createClient()
    try {
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      console.error("[Auth Callback] Error exchanging code for session:", error)
      // Redirect to login with error if exchange fails
      return NextResponse.redirect(new URL("/auth/login?error=auth_code_error", request.url))
    }
  }

  return NextResponse.redirect(new URL(next, request.url))
}
