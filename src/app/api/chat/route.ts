import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = (body?.messages || []) as Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
    const token = body?.token as string | undefined

    // Optional Cloudflare Turnstile verification
    const secretKey = process.env.TURNSTILE_SECRET_KEY
    if (secretKey && token) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      })
      const verifyJson = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] }
      if (!verifyJson.success) {
        return NextResponse.json({ error: 'Bot verification failed', details: verifyJson['error-codes'] || [] }, { status: 400 })
      }
    }

    const systemPrompt = {
      role: 'system' as const,
      content: 'You are QuizeAI, a concise, friendly study assistant. Explain clearly, suggest quizzes or flashcards when helpful, and keep answers tight unless asked for detail.'
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
    })

    const reply = completion.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a reply.'
    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error('Chat API error', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
