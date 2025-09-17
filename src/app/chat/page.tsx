"use client"

import { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import Turnstile from '../../components/Turnstile'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [token, setToken] = useState('')
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    if (turnstileEnabled && !token) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Please complete the bot check before sending.' }])
      return
    }
    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages((m) => [...m, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], token: turnstileEnabled ? token : undefined }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      const assistant: Message = { role: 'assistant', content: data.reply }
      setMessages((m) => [...m, assistant])
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!loading && input.trim().length > 0) {
        // Create a synthetic event for form submit
        sendMessage({ preventDefault: () => {} } as unknown as React.FormEvent)
      }
    }
  }

  function clearChat() {
    setMessages([])
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container section">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Chat with QuizeAI</h1>
          <button onClick={clearChat} className="btn btn-ghost text-sm" disabled={loading || messages.length === 0}>
            Clear chat
          </button>
        </div>
        {turnstileEnabled && (
          <div className="mb-4 flex justify-center">
            <Turnstile onVerify={(t) => setToken(t)} />
          </div>
        )}
        <div className="card p-4 h-[60vh] overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={`inline-block rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-blue-600' : 'bg-white/10'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {messages.length === 0 && !loading && (
            <div className="text-center text-white/50 text-sm">Ask anything to get started.</div>
          )}
          {loading && (
            <div className="text-left">
              <div className="inline-block rounded-lg px-3 py-2 text-sm bg-white/10">
                QuizeAI is typing…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <textarea
            className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-blue-500 min-h-[44px] max-h-40"
            placeholder="Type your message... (Shift+Enter for new line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
          />
          <button className="btn btn-primary" disabled={loading || input.trim().length === 0 || (turnstileEnabled && !token)}>
            {loading ? 'Thinking…' : 'Send'}
          </button>
        </form>
      </div>
    </main>
  )
}
