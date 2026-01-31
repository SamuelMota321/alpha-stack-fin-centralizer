'use client'

import React from "react"

import {
  UtensilsCrossed,
  Car,
  Heart,
  Gamepad2,
  ShoppingBag,
  Receipt,
  Briefcase,
  TrendingUp,
  Laptop,
  PiggyBank,
  Sparkles,
  AlertTriangle,
} from 'lucide-react'
import type { Transaction } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/mock-data'

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  UtensilsCrossed,
  Car,
  Heart,
  Gamepad2,
  ShoppingBag,
  Receipt,
  Briefcase,
  TrendingUp,
  Laptop,
  PiggyBank,
}

interface TransactionItemProps {
  transaction: Transaction
  onClick: () => void
}

export function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const IconComponent = iconMap[transaction.categoryIcon] || Receipt
  const isIncome = transaction.amount > 0
  const showWarning = transaction.isAICategorized && transaction.aiConfidence === 'low'

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg border border-transparent bg-zinc-900 px-3 py-3 text-left transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/70 active:scale-[0.99]"
    >
      {/* Category Icon */}
      <div
        className={`relative flex size-10 shrink-0 items-center justify-center rounded-lg ${
          isIncome ? 'bg-emerald-400/10' : 'bg-zinc-800'
        }`}
      >
        <IconComponent
          className={`size-5 ${isIncome ? 'text-emerald-400' : 'text-zinc-400'}`}
          strokeWidth={1.5}
        />
        {showWarning && (
          <div className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-yellow-500">
            <AlertTriangle className="size-2.5 text-zinc-900" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Transaction Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium text-zinc-100">
            {transaction.merchant}
          </p>
          {transaction.isAICategorized && transaction.aiConfidence !== 'low' && (
            <Sparkles
              className="size-3.5 shrink-0 text-purple-400"
              strokeWidth={1.5}
            />
          )}
        </div>
        <p className="text-xs text-zinc-500">{formatDate(transaction.date)}</p>
      </div>

      {/* Amount */}
      <span
        className={`shrink-0 font-mono text-sm font-medium ${
          isIncome ? 'text-emerald-400' : 'text-zinc-300'
        }`}
      >
        {isIncome ? '+' : ''}
        {formatCurrency(transaction.amount)}
      </span>
    </button>
  )
}
