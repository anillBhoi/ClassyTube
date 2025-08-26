
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import "./env" // Import environment variables
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "ClassyTube",
  description: "Learn from YouTube playlists like a structured course",
    generator: 'anurag'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" />
        </head>
        
        <body className={inter.className}>
        
          
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    
  )
}
