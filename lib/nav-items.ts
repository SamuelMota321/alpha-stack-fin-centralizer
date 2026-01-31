import { ArrowLeftRight, HelpCircle, LayoutDashboard, PieChart, Settings } from "lucide-react"

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'transactions', label: 'Transações', icon: ArrowLeftRight, href: '/transactions' },
  { id: 'analytics', label: 'Análises', icon: PieChart, href: '/analytics' },
]

export const bottomItems = [
  { id: 'settings', label: 'Configurações', icon: Settings, href: '/settings' },
  { id: 'help', label: 'Ajuda', icon: HelpCircle, href: '/help' },
]