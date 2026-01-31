'use client'
import React, { useState } from "react"
import { DashboardView } from "@/components/views/dashboard-view"
import { TransactionsView } from "@/components/views/transactions-view"
import { AnalyticsView } from "@/app/analytics/analytics-view"
import { SidebarNav } from "@/components/sidebar-nav"
import { BottomNav } from "@/components/bottom-nav"
export default function Home() {

  const [activeView, setActiveView] = useState('dashboard')

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />
      case 'transactions':
        return <TransactionsView />
      case 'analytics':
        return <AnalyticsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className=" min-h-screen bg-zinc-950">

      <main className="px-4 pt-4 pb-20 md:pb-8">
        {renderView()}
      </main>

      <BottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  )
}
