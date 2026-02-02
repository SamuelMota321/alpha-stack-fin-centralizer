"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithRedirect, updateProfile } from "firebase/auth"
import { auth, db } from "@/lib/firebase-client"

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
import { useToast } from "@/hooks/use-toast"
import { doc, setDoc, getDocs, query, collection, where } from "firebase/firestore"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        throw { code: 'custom/email-in-use-firestore' }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, { displayName: name })

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        image: null,
        emailVerified: null,
        openFinance: {
          customerId: null,
          connectedAccounts: [],
          status: "inactive"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, { merge: true })

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error("Conta criada, mas houve erro ao iniciar a sessão.")
      }

      toast({
        title: "Bem-vindo(a)!",
        description: "Sua conta foi criada com sucesso.",
        className: "bg-emerald-500 border-emerald-600 text-white"

      })

      router.push("/dashboard")
      router.refresh()

    } catch (error: any) {
      console.error(error)
      let errorMessage = "Ocorreu um erro ao criar sua conta."

      // Tratamento de erros
      if (error.code === 'auth/email-already-in-use' || error.code === 'custom/email-in-use-firestore') {
        errorMessage = "Este e-mail já está cadastrado. Tente fazer login com Google ou Senha."
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "A senha deve ter pelo menos 6 caracteres."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "O e-mail digitado é inválido."
      }

      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: errorMessage,
      })

    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
            <Sparkles className="size-6 text-emerald-400" strokeWidth={1.5} />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Crie sua conta
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Comece a gerenciar suas finanças hoje mesmo
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full gap-2 border-zinc-700 bg-zinc-800/50 py-5 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            type="button"
          >
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
            {isLoading ? "Aguarde..." : "Cadastrar com Google"}
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-zinc-800" />
            <span className="text-xs text-zinc-500 uppercase">Ou use seu email</span>
            <Separator className="flex-1 bg-zinc-800" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Nome completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="Samuel Mota"
                required
                className="border-zinc-700 bg-zinc-950/50 text-zinc-100 focus-visible:ring-emerald-400/50"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seunome@exemplo.com"
                required
                className="border-zinc-700 bg-zinc-950/50 text-zinc-100 focus-visible:ring-emerald-400/50"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
                minLength={6}
                className="border-zinc-700 bg-zinc-950/50 text-zinc-100 focus-visible:ring-emerald-400/50"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-medium transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-zinc-800 pt-6">
          <p className="text-center text-xs text-zinc-500">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-emerald-400 hover:underline">
              Fazer login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}