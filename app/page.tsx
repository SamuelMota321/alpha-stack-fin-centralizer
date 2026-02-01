import Link from "next/link"
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  PieChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30 overflow-x-hidden">
      <Header/>
      <main className="flex-1 pt-20">

        <section className="relative flex flex-col items-center justify-center py-16 md:py-32 px-4 text-center">

          <div className="absolute top-1/2 left-1/2 -z-10 h-50 w-50 md:h-125 md:w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[60px] md:blur-[100px]" />

          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs md:text-sm text-emerald-400 backdrop-blur-sm shadow-sm">
            <span className="flex size-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            MVP Alpha Release
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl mb-6 leading-[1.1]">
            Automação gera <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">
              Clareza Financeira
            </span>
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-zinc-400 mb-10 leading-relaxed">
            Elimine a cegueira dos dados fragmentados. Centralize bancos e investimentos em uma visão unificada sem planilhas manuais.
          </p>

          <div className="flex flex-col w-full xs:w-auto sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20">
                Acessar Plataforma
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white">
                Entenda o Conceito
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="container mx-auto py-16 md:py-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            <div className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-xl transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div>
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-emerald-400 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors duration-300">
                  <Zap className="size-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-100">Zero Input Manual</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  Conexão direta com Open Finance e B3. Importação automática de cada transação sem esforço.
                </p>
              </div>
            </div>

            <div className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-xl transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div>
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-emerald-400 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors duration-300">
                  <PieChart className="size-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-100">Visão Unificada</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  Fluxo de caixa bancário e carteira de investimentos em uma única tela de saúde financeira.
                </p>
              </div>
            </div>

            <div className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-xl transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div>
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-emerald-400 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors duration-300">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-100">Dados Seguros</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  Criptografia rigorosa em trânsito e repouso. Isolamento total dos seus dados financeiros.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800 bg-zinc-900/30 py-20 px-4 text-center">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
              Retome o controle hoje.
            </h2>
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-base bg-emerald-500 text-zinc-950 hover:bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all">
                Acessar Plataforma
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950 py-8 text-center text-sm text-zinc-500 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Alpha Stack Fin.</p>
          <p className="text-zinc-600">Desenvolvido para alta fidelidade.</p>
        </div>
      </footer>
    </div>
  )
}