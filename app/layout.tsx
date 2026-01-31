import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/app-sidebar"; // Importe a Sidebar
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alpha Stack Fin",
  description: "Gerenciador financeiro centralizado",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex h-screen w-full">
            <AppSidebar user={session?.user} />
            <main className="flex-1 w-full p-5">
              {children}
            </main>
            <BottomNav />
          </div>

          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}