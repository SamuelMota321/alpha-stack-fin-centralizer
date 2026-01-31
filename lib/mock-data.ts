// Mock data for the Smart Financial Centralizer

export interface Transaction {
  id: string
  merchant: string
  category: string
  categoryIcon: string
  amount: number
  date: string
  isAICategorized: boolean
  aiConfidence: 'high' | 'medium' | 'low'
  type: 'income' | 'expense'
}

export const categories = [
  { id: 'food', name: 'Alimentação', icon: 'UtensilsCrossed' },
  { id: 'transport', name: 'Transporte', icon: 'Car' },
  { id: 'health', name: 'Saúde', icon: 'Heart' },
  { id: 'entertainment', name: 'Entretenimento', icon: 'Gamepad2' },
  { id: 'shopping', name: 'Compras', icon: 'ShoppingBag' },
  { id: 'bills', name: 'Contas', icon: 'Receipt' },
  { id: 'salary', name: 'Salário', icon: 'Briefcase' },
  { id: 'investments', name: 'Investimentos', icon: 'TrendingUp' },
  { id: 'freelance', name: 'Freelance', icon: 'Laptop' },
  { id: 'dividends', name: 'Dividendos', icon: 'PiggyBank' },
]

export const transactions: Transaction[] = [
  {
    id: '1',
    merchant: 'iFood',
    category: 'food',
    categoryIcon: 'UtensilsCrossed',
    amount: -45.90,
    date: '2024-01-28',
    isAICategorized: true,
    aiConfidence: 'high',
    type: 'expense',
  },
  {
    id: '2',
    merchant: 'Uber',
    category: 'transport',
    categoryIcon: 'Car',
    amount: -32.50,
    date: '2024-01-28',
    isAICategorized: true,
    aiConfidence: 'high',
    type: 'expense',
  },
  {
    id: '3',
    merchant: 'Empresa XYZ - Salário',
    category: 'salary',
    categoryIcon: 'Briefcase',
    amount: 8500.00,
    date: '2024-01-25',
    isAICategorized: false,
    aiConfidence: 'high',
    type: 'income',
  },
  {
    id: '4',
    merchant: 'Netflix',
    category: 'entertainment',
    categoryIcon: 'Gamepad2',
    amount: -55.90,
    date: '2024-01-24',
    isAICategorized: true,
    aiConfidence: 'high',
    type: 'expense',
  },
  {
    id: '5',
    merchant: 'Drogaria São Paulo',
    category: 'health',
    categoryIcon: 'Heart',
    amount: -89.90,
    date: '2024-01-23',
    isAICategorized: true,
    aiConfidence: 'medium',
    type: 'expense',
  },
  {
    id: '6',
    merchant: 'Dividendos PETR4',
    category: 'dividends',
    categoryIcon: 'PiggyBank',
    amount: 245.80,
    date: '2024-01-22',
    isAICategorized: true,
    aiConfidence: 'high',
    type: 'income',
  },
  {
    id: '7',
    merchant: 'Amazon',
    category: 'shopping',
    categoryIcon: 'ShoppingBag',
    amount: -299.00,
    date: '2024-01-21',
    isAICategorized: true,
    aiConfidence: 'low',
    type: 'expense',
  },
  {
    id: '8',
    merchant: 'Conta de Luz - ENEL',
    category: 'bills',
    categoryIcon: 'Receipt',
    amount: -187.50,
    date: '2024-01-20',
    isAICategorized: true,
    aiConfidence: 'high',
    type: 'expense',
  },
  {
    id: '9',
    merchant: 'Freelance - Projeto Web',
    category: 'freelance',
    categoryIcon: 'Laptop',
    amount: 2500.00,
    date: '2024-01-18',
    isAICategorized: false,
    aiConfidence: 'high',
    type: 'income',
  },
  {
    id: '10',
    merchant: 'Mercado Livre',
    category: 'shopping',
    categoryIcon: 'ShoppingBag',
    amount: -156.00,
    date: '2024-01-17',
    isAICategorized: true,
    aiConfidence: 'medium',
    type: 'expense',
  },
]

export const balanceEvolutionData = [
  { month: 'Jul', balance: 45000, invested: 38000 },
  { month: 'Ago', balance: 48500, invested: 40000 },
  { month: 'Set', balance: 52000, invested: 42500 },
  { month: 'Out', balance: 55800, invested: 45000 },
  { month: 'Nov', balance: 58200, invested: 47500 },
  { month: 'Dez', balance: 62500, invested: 50000 },
  { month: 'Jan', balance: 67800, invested: 52500 },
]

export const incomeSourcesData = [
  { month: 'Set', active: 8500, passive: 450 },
  { month: 'Out', active: 8500, passive: 520 },
  { month: 'Nov', active: 8500, passive: 680 },
  { month: 'Dez', active: 11000, passive: 890 },
  { month: 'Jan', active: 8500, passive: 745 },
]

export const benchmarkData = [
  { name: 'Minha Carteira', value: 18.5 },
  { name: 'CDI', value: 12.2 },
  { name: 'IBOV', value: 8.7 },
]

export const spendingBreakdownData = [
  { name: 'Alimentação', value: 1250, fill: '#34d399' },
  { name: 'Transporte', value: 680, fill: '#3b82f6' },
  { name: 'Entretenimento', value: 450, fill: '#a855f7' },
  { name: 'Compras', value: 890, fill: '#f59e0b' },
  { name: 'Contas', value: 1100, fill: '#ef4444' },
]

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}
