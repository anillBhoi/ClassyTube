// app/dashboard/layout.tsx
import { Header } from "@/components/header"
import { ThemeToggle } from "@/components/ThemeToggle"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
 

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-2 md:hidden flex justify-end">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
