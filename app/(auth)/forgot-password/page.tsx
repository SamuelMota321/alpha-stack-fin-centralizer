"use client"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase-client" // Seu arquivo client
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string

    try {
      await sendPasswordResetEmail(auth, email)
      
      setIsEmailSent(true)
    } catch (error: any) {
      console.error(error)
      let errorMessage = "Erro ao enviar e-mail."
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "Não encontramos nenhuma conta com este e-mail."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "O e-mail digitado é inválido."
      }

      toast({
        variant: "destructive",
        title: "Erro",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Recuperar senha
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Digite seu e-mail e enviaremos um link para você definir uma nova senha.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isEmailSent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-500">
                <CheckCircle2 className="size-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">Verifique seu e-mail</h3>
                <p className="text-sm text-zinc-400">
                  Enviamos um link de recuperação. Se você usa Login com Google, esse link permitirá criar uma senha para sua conta.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="mt-2 w-full border-zinc-700 hover:bg-zinc-800 hover:text-white"
                onClick={() => setIsEmailSent(false)}
              >
                Tentar outro e-mail
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">E-mail cadastrado</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-zinc-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-9 border-zinc-700 bg-zinc-950/50 text-zinc-100 focus-visible:ring-emerald-400/50"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-medium"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Enviar link de recuperação
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t border-zinc-800 pt-6">
          <Link 
            href="/login" 
            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}