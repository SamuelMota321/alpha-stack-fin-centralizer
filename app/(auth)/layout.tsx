import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <main className="h-screen w-full bg-zinc-950">
      {children}
    </main>
  );
}