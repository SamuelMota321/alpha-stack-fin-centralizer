'use client'

import { LayoutDashboard, ArrowLeftRight, PieChart } from 'lucide-react'

interface BottomNavProps {
  activeView: string
  onViewChange: (view: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transações', icon: ArrowLeftRight },
  { id: 'analytics', label: 'Análises', icon: PieChart },
]

export function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id)}
              className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors duration-200 ${
                isActive ? 'text-emerald-400' : 'text-zinc-500'
              }`}
            >
              <item.icon className="size-5" strokeWidth={1.5} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-2 size-1 rounded-full bg-emerald-400" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
