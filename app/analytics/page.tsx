'use client'

import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { formatCurrency } from '@/lib/mock-data'

const statsCards = [
  {
    label: 'Receitas',
    value: 11245.8,
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'emerald',
  },
  {
    label: 'Despesas',
    value: 4370.2,
    change: '-8.3%',
    trend: 'down',
    icon: TrendingDown,
    color: 'red',
  },
  {
    label: 'Patrimônio',
    value: 67800,
    change: '+8.5%',
    trend: 'up',
    icon: Wallet,
    color: 'blue',
  },
  {
    label: 'Investido',
    value: 52500,
    change: '+5.2%',
    trend: 'up',
    icon: PiggyBank,
    color: 'purple',
  },
]

const colorClasses: Record<string, { bg: string; text: string; icon: string }> = {
  emerald: {
    bg: 'bg-emerald-400/10',
    text: 'text-emerald-400',
    icon: 'text-emerald-400',
  },
  red: {
    bg: 'bg-red-400/10',
    text: 'text-red-400',
    icon: 'text-red-400',
  },
  blue: {
    bg: 'bg-blue-400/10',
    text: 'text-blue-400',
    icon: 'text-blue-400',
  },
  purple: {
    bg: 'bg-purple-400/10',
    text: 'text-purple-400',
    icon: 'text-purple-400',
  },
}

export default function AnalyticsView() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-100">Análises</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statsCards.map((stat) => {
          const colors = colorClasses[stat.color]
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-zinc-500">{stat.label}</span>
                <div className={`flex size-8 items-center justify-center rounded-lg ${colors.bg}`}>
                  <stat.icon className={`size-4 ${colors.icon}`} strokeWidth={1.5} />
                </div>
              </div>
              <p className="font-mono text-lg font-semibold text-zinc-100">
                {formatCurrency(stat.value)}
              </p>
              <p className={`mt-1 font-mono text-xs ${colors.text}`}>
                {stat.change} vs mês anterior
              </p>
            </div>
          )
        })}
      </div>

      {/* Monthly Summary */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <h3 className="mb-4 text-sm font-medium text-zinc-400">Resumo Mensal</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Saldo Inicial</span>
            <span className="font-mono text-sm text-zinc-100">
              {formatCurrency(58200)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Total Receitas</span>
            <span className="font-mono text-sm text-emerald-400">
              +{formatCurrency(11245.8)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Total Despesas</span>
            <span className="font-mono text-sm text-red-400">
              -{formatCurrency(4370.2)}
            </span>
          </div>
          <div className="h-px bg-zinc-800" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-100">Saldo Final</span>
            <span className="font-mono text-sm font-semibold text-emerald-400">
              {formatCurrency(67800)}
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-purple-400">
          <span className="flex size-6 items-center justify-center rounded-md bg-purple-500/10">
            ✨
          </span>
          Insights da IA
        </h3>
        <ul className="space-y-2 text-sm text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-400" />
            Seus gastos com alimentação aumentaram 15% este mês.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-400" />
            Sua renda passiva cresceu consistentemente nos últimos 4 meses.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-400" />
            Você está superando o CDI em 6.3 pontos percentuais.
          </li>
        </ul>
      </div>
    </div>
  )
}
