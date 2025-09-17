"use client"

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-blue-500" />
          <span className="text-sm font-semibold tracking-wide">QuizeAI</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/chat" className="btn btn-ghost text-sm">Chat</Link>
          <a href="#features" className="btn btn-ghost text-sm">Features</a>
          <a href="#faq" className="btn btn-ghost text-sm">FAQ</a>
          {status === 'authenticated' ? (
            <button onClick={() => signOut()} className="btn btn-ghost text-sm">Sign out</button>
          ) : (
            <button onClick={() => signIn('google')} className="btn btn-primary text-sm">Sign in</button>
          )}
        </nav>
      </div>
    </header>
  )
}
