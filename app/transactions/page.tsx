'use client'

import { useState } from 'react'
import { Search, Filter, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TransactionItem } from '@/components/transaction-item'
import { CorrectionSheet } from '@/components/correction-sheet'
import { transactions, type Transaction } from '@/lib/mock-data'

export function TransactionsView() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setSheetOpen(true)
  }

  const filteredTransactions = transactions.filter((t) =>
    t.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const aiCategorizedCount = transactions.filter((t) => t.isAICategorized).length

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-100">Transações</h1>
        <div className="flex items-center gap-1.5 text-xs text-purple-400">
          <Sparkles className="size-3.5" strokeWidth={1.5} />
          <span>{aiCategorizedCount} categorizadas por IA</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" strokeWidth={1.5} />
          <Input
            placeholder="Buscar transação..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 border-zinc-700 bg-zinc-800/50 pl-9 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-400/20"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-10 shrink-0 border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <Filter className="size-4" strokeWidth={1.5} />
        </Button>
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-zinc-500">Nenhuma transação encontrada</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onClick={() => handleTransactionClick(transaction)}
            />
          ))
        )}
      </div>

      {/* Correction Sheet */}
      <CorrectionSheet
        transaction={selectedTransaction}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
