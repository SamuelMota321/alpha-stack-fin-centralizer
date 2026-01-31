'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
// Importe a lista que criamos acima ou defina-a aqui dentro se preferir não separar
import { navItems } from "@/lib/nav-items" 

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm md:hidden safe-area-bottom">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2 transition-colors duration-200 ${
                isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <item.icon className="size-5" strokeWidth={1.5} />
              <span className="text-xs font-medium">{item.label}</span>
              
              {/* Indicador de ativo (bolinha ou traço) */}
              {isActive && (
                <span className="absolute bottom-1 size-1 rounded-full bg-emerald-400" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}