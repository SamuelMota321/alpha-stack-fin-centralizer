'use client'

import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BalanceChart } from '@/components/charts/balance-chart'
import { MetricsCarousel } from '@/components/charts/metrics-carousel'
import { SpendingDonut } from '@/components/charts/spending-donut'

export default function Dashboard() {
  return (
    <div className='flex flex-col gap-5'>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-100">Visão Geral</h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <Calendar className="size-4" strokeWidth={1.5} />
          <span>Janeiro 2024</span>
        </Button>
      </div>

      <BalanceChart />

      <section>
        <h2 className="mb-3 text-sm font-medium text-zinc-400">Indicadores</h2>
        <MetricsCarousel />
      </section>

      <section>
        <SpendingDonut />
      </section>
    </div>
  )
}
