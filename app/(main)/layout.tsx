import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <Header user={session?.user} />
      <div className="flex h-full w-full">
        <AppSidebar user={session?.user} />
        <main className="flex-1 w-full p-5 overflow-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </>
  );
}