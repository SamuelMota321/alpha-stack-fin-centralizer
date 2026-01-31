'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  incomeSourcesData,
  benchmarkData,
  formatCurrency,
} from '@/lib/mock-data'

function IncomeSourcesCard() {
  return (
    <div className="min-w-[280px] snap-start rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h4 className="mb-1 text-sm font-medium text-zinc-400">Fontes de Renda</h4>
      <p className="mb-3 font-mono text-lg font-semibold text-zinc-100">
        {formatCurrency(9245)}
        <span className="ml-2 text-sm font-normal text-zinc-500">este mês</span>
      </p>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={incomeSourcesData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 shadow-lg">
                      <p className="mb-1 text-xs text-zinc-400">{label}</p>
                      <p className="font-mono text-xs text-blue-400">
                        Ativa: {formatCurrency(payload[0].value as number)}
                      </p>
                      <p className="font-mono text-xs text-emerald-400">
                        Passiva: {formatCurrency(payload[1].value as number)}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="active" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="passive" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-blue-500" />
          <span className="text-xs text-zinc-500">Ativa</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-emerald-400" />
          <span className="text-xs text-zinc-500">Passiva</span>
        </div>
      </div>
    </div>
  )
}

function BenchmarkCard() {
  const colors = ['#34d399', '#3b82f6', '#f59e0b']

  return (
    <div className="min-w-[280px] snap-start rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h4 className="mb-1 text-sm font-medium text-zinc-400">Benchmarks</h4>
      <p className="mb-3 font-mono text-lg font-semibold text-emerald-400">
        +18.5%
        <span className="ml-2 text-sm font-normal text-zinc-500">12 meses</span>
      </p>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={benchmarkData}
            layout="vertical"
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 10 }}
              width={90}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 shadow-lg">
                      <p className="font-mono text-sm text-zinc-100">
                        {payload[0].payload.name}: +{payload[0].value}%
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {benchmarkData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-emerald-400" />
          <span className="text-xs text-zinc-500">Carteira</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-blue-500" />
          <span className="text-xs text-zinc-500">CDI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-sm bg-amber-500" />
          <span className="text-xs text-zinc-500">IBOV</span>
        </div>
      </div>
    </div>
  )
}

export function MetricsCarousel() {
  return (
    <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
      <IncomeSourcesCard />
      <BenchmarkCard />
    </div>
  )
}
