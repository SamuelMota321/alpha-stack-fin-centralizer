'use client'

import { Menu, Bell, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-1.5">
        <div className="flex size-7 items-center justify-center rounded-md bg-emerald-400/10">
          <Sparkles className="size-4 text-emerald-400" strokeWidth={1.5} />
        </div>
        <span className="text-lg font-semibold text-zinc-100"></span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:text-zinc-100"
          aria-label="Notificações"
        >
          <Bell className="size-5" strokeWidth={1.5} />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-400" />
        </Button>
        <Avatar className="size-8 border border-zinc-700">
          <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
          <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
