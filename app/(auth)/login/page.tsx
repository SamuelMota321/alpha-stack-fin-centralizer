import { signIn } from "@/lib/auth"
import { Metadata } from "next"
import Link from "next/link"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Login | Alpha Fin",
  description: "Acesse sua conta para gerenciar suas finanças.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          {/* Logo Centralizado */}
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
            <Sparkles className="size-6 text-emerald-400" strokeWidth={1.5} />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Entre com sua conta para acessar o dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/dashboard" })
            }}
          >
            <Button
              variant="outline"
              className="w-full gap-2 border-zinc-400 bg-zinc-800/50 py-5 hover:bg-zinc-800 hover:text-white cursor-pointer"
              type="submit"
            >
              {/* Ícone do Google (SVG Inline) */}
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Entrar com Google
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-zinc-800" />
            <span className="text-xs text-zinc-500 uppercase">Ou continue com</span>
            <Separator className="flex-1 bg-zinc-800" />
          </div>

          {/* Formulário de Email (Visual - Funcionalidade Futura) */}
          <form
            className="space-y-4"
            action={async (formData) => {
              "use server"
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/dashboard",
              })
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seunome@exemplo.com"
                className="border-zinc-700 bg-zinc-950/50 text-zinc-100 focus-visible:ring-emerald-400/50"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  Senha
                </Label>
                <Link
                  href="#" // Futuramente: /forgot-password
                  className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                className="border-zinc-700 bg-zinc-950/50 text-zinc-100 focus-visible:ring-emerald-400/50"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 cursor-pointer font-medium"
            >
              Entrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-zinc-800 pt-6">
          <p className="text-center text-xs text-zinc-500">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}