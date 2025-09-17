import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '../components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizeAI — AI-Powered Study Assistant',
  description: 'QuizeAI helps you study smarter with AI. Chat, generate practice questions, and learn faster.',
  openGraph: {
    title: 'QuizeAI',
    description: 'AI-Powered Study Assistant',
    url: 'https://quizeai-site.vercel.app',
    siteName: 'QuizeAI',
    type: 'website',
  },
  themeColor: '#0B0B0F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-dark text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
