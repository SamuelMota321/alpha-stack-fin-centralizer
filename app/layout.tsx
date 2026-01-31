import type { Metadata, Viewport } from 'next'
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { Header } from "@/components/header"
import { SidebarNav } from '@/components/sidebar-nav'

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: '--font-noto-sans',
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: '--font-noto-sans-mono',
});

export const metadata: Metadata = {
  title: 'Alpha Fin - Smart Financial Centralizer',
  description: 'AI-powered financial dashboard for intelligent money management',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {



  return (
    <html lang="pt-BR">
      <body className={`${notoSans.variable} ${notoSansMono.variable} font-sans antialiased bg-zinc-950 text-zinc-100`}>
        <Header />
        {children}
        <Toaster />
        <Analytics />
        <SidebarNav />
      </body>
    </html>
  )
}
