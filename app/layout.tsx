import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ChatbotProvider from "@/components/chatbot/chatbot-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "QuantumDiagnose | Multi-Disease Screening Platform",
  description:
    "Advanced AI-powered platform for screening heart disease, kidney disease, liver disease, and diabetes with high accuracy.",
  keywords: [
    "disease screening",
    "AI healthcare",
    "heart disease",
    "kidney disease",
    "liver disease",
    "diabetes",
    "medical AI",
  ],
  authors: [{ name: "QuantumDiagnose Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "QuantumDiagnose | Multi-Disease Screening Platform",
    description:
      "Advanced AI-powered platform for screening heart disease, kidney disease, liver disease, and diabetes with high accuracy.",
    siteName: "QuantumDiagnose",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantumDiagnose | Multi-Disease Screening Platform",
    description:
      "Advanced AI-powered platform for screening heart disease, kidney disease, liver disease, and diabetes with high accuracy.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} font-sans antialiased bg-background`}>
          <ChatbotProvider>
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ChatbotProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}



import './globals.css'