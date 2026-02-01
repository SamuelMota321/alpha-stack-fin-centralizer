import { Header } from "@/components/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-h-screen w-full bg-zinc-950">
      {children}
    </main>
  );
}