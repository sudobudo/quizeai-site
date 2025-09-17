"use client"

import { signIn } from 'next-auth/react'
import Header from '../../components/Header'

export default function SignInPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container section max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Sign in to QuizeAI</h1>
        <p className="text-white/70 mb-6 text-sm">Use your Google account to continue.</p>
        <button
          onClick={() => signIn('google')}
          className="btn btn-primary w-full"
        >
          Continue with Google
        </button>
      </div>
    </main>
  )
}
