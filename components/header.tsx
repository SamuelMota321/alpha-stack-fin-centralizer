'use client'

import { Bell, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { User } from 'next-auth'

interface HeaderProps {
  user?: User | null
}

export function Header({ user }: HeaderProps) {


  return (
    <>
      {!user ?
        <header id="header" className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl supports-backdrop-filter:bg-zinc-950/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

            {/* Logo */}
            <Link href={'#header'}>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20">
                  <Sparkles className="size-4 text-emerald-400" strokeWidth={1.5} />
                </div>
                <span className="text-lg font-bold tracking-tight hidden xs:block">Alpha Fin</span>
              </div>
            </Link>

            {/* Nav Actions - Ajustado para caber os 2 botões no mobile */}
            <nav className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-zinc-100 h-9 px-3 text-xs md:text-sm md:h-10 md:px-4"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-medium h-9 px-3 text-xs md:text-sm md:h-10 md:px-4"
                >
                  Começar
                </Button>
              </Link>
            </nav>
          </div>
        </header>
        :
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
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ""} className='rounded-2xl' />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
      }
    </>


  )
}
