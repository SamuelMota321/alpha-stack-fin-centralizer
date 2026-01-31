'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { spendingBreakdownData, formatCurrency } from '@/lib/mock-data'

export function SpendingDonut() {
  const total = spendingBreakdownData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-1 text-sm font-medium text-zinc-400">Gastos por Categoria</h3>
      <p className="mb-4 font-mono text-lg font-semibold text-zinc-100">
        {formatCurrency(total)}
        <span className="ml-2 text-sm font-normal text-zinc-500">este mês</span>
      </p>

      <div className="flex items-center gap-4">
        <div className="relative size-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 shadow-lg">
                        <p className="text-xs text-zinc-400">{data.name}</p>
                        <p className="font-mono text-sm text-zinc-100">
                          {formatCurrency(data.value)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Pie
                data={spendingBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {spendingBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {spendingBreakdownData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-xs text-zinc-400">{item.name}</span>
              </div>
              <span className="font-mono text-xs text-zinc-300">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
