'use client'

import {
  Sparkles,
  LogOut,
} from 'lucide-react'


import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { bottomItems, navItems } from '@/lib/nav-items'


export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-900 hidden md:flex left-0 top-0">
      <div className="border-b border-zinc-800 px-4 py-4">
        <div className="flex items-center gap-2 text-zinc-100">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-400/10">
            <Sparkles className="size-5 text-emerald-400" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-semibold">Alpha Fin</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.id} href={item.href} className='block'>
                <Button
                  key={item.id}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3 ${isActive
                    ? 'bg-zinc-800 text-emerald-400'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                    }`}

                >
                  <item.icon className="size-5" strokeWidth={1.5} />
                  {item.label}
                </Button>
              </Link>
            )
          })}


        </div>



        <div className="mt-auto pt-4">
          <Separator className="mb-4 bg-zinc-800" />
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link key={item.id} href={item.href} className='block'>
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                >
                  <item.icon className="size-5" strokeWidth={1.5} />
                  {item.label}
                </Button>
              </Link>

            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="size-5" strokeWidth={1.5} />
            Sair
          </Button>
        </div>
      </nav>
    </aside>
  )
}
