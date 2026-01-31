'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { balanceEvolutionData, formatCurrency } from '@/lib/mock-data'

export function BalanceChart() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-zinc-400">Evolução Patrimonial</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-2xl font-semibold text-zinc-100">
            {formatCurrency(67800)}
          </span>
          <span className="font-mono text-sm text-emerald-400">+8.5%</span>
        </div>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={balanceEvolutionData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#71717a" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#71717a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              dy={8}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 shadow-lg">
                      <p className="mb-1 text-xs text-zinc-400">{label}</p>
                      <p className="font-mono text-sm text-emerald-400">
                        Saldo: {formatCurrency(payload[0].value as number)}
                      </p>
                      <p className="font-mono text-sm text-zinc-400">
                        Investido: {formatCurrency(payload[1].value as number)}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#balanceGradient)"
            />
            <Area
              type="monotone"
              dataKey="invested"
              stroke="#52525b"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#investedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-emerald-400" />
          <span className="text-xs text-zinc-400">Saldo Total</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full border-2 border-dashed border-zinc-500 bg-transparent" />
          <span className="text-xs text-zinc-400">Total Investido</span>
        </div>
      </div>
    </div>
  )
}
