import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
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
      {/* <Header user={session?.user} /> */} {/*Integração do header tbm no futuro*/}
      <main>
        {children}
      </main>
    </>
  );
}