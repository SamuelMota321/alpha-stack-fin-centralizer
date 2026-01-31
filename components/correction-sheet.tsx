'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { Transaction } from '@/lib/mock-data'
import { categories, formatCurrency, formatDate } from '@/lib/mock-data'
import { toast } from 'sonner'

interface CorrectionSheetProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CorrectionSheet({
  transaction,
  open,
  onOpenChange,
}: CorrectionSheetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    transaction?.category || ''
  )
  const [teachAI, setTeachAI] = useState(true)

  if (!transaction) return null

  const handleSave = () => {
    toast.success('Transação atualizada', {
      description: teachAI
        ? 'A IA aprenderá com esta correção para futuras transações.'
        : 'Categoria atualizada apenas para esta transação.',
    })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl border-zinc-800 bg-zinc-900">
        <SheetHeader className="text-left">
          <SheetTitle className="text-zinc-100">Editar Transação</SheetTitle>
          <SheetDescription className="text-zinc-500">
            Corrija a categoria e ajude a IA a aprender.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Read-only fields */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
              <span className="text-sm text-zinc-400">Estabelecimento</span>
              <span className="font-medium text-zinc-100">{transaction.merchant}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
              <span className="text-sm text-zinc-400">Data</span>
              <span className="font-medium text-zinc-100">
                {formatDate(transaction.date)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
              <span className="text-sm text-zinc-400">Valor</span>
              <span
                className={`font-mono font-medium ${
                  transaction.amount > 0 ? 'text-emerald-400' : 'text-zinc-100'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          </div>

          {/* Category selector */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm text-zinc-400">
              Categoria
            </Label>
            <Select
              value={selectedCategory || transaction.category}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger
                id="category"
                className="h-12 border-zinc-700 bg-zinc-800 text-zinc-100 focus:ring-emerald-400/20"
              >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* AI Learning Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10">
                <Sparkles className="size-5 text-purple-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  Ensinar a IA?
                </p>
                <p className="text-xs text-zinc-500">
                  Aplicar em transações futuras deste estabelecimento
                </p>
              </div>
            </div>
            <Switch
              checked={teachAI}
              onCheckedChange={setTeachAI}
              className="data-[state=checked]:bg-purple-500"
            />
          </div>
        </div>

        <SheetFooter className="mt-6">
          <Button
            onClick={handleSave}
            className="w-full bg-emerald-500 text-zinc-900 hover:bg-emerald-400"
          >
            Salvar Alterações
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
