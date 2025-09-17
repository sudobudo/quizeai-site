import Header from '../components/Header'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <Header />
      {/* Hero */}
      <section className="section relative">
        <div className="absolute inset-0 bg-glow pointer-events-none" />
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Study smarter with <span className="text-blue-500">QuizeAI</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            AI that helps you understand, practice, and crush your quizzes. Chat with your notes, generate questions, and learn faster.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/chat" className="btn btn-primary">Start chatting</Link>
            <a href="#features" className="btn btn-ghost">See features</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-6 -mt-10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: '95%', v: 'report faster studying' },
            { k: '10k+', v: 'questions generated' },
            { k: '24/7', v: 'study assistant' },
            { k: 'A+ vibes', v: 'friendly explanations' },
          ].map((s) => (
            <div key={s.k} className="card p-4 text-center">
              <div className="text-xl font-semibold">{s.k}</div>
              <div className="text-white/60 text-sm">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { title: 'Chat with AI', desc: 'Ask questions and get clear, helpful answers fast.' },
            { title: 'Make quizzes', desc: 'Generate practice questions from topics or notes.' },
            { title: 'Study mode', desc: 'Summaries, flashcards, and spaced repetition.' },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Ask anything', desc: 'Type a question or paste your notes.' },
            { step: '2', title: 'AI answers', desc: 'Get a clear explanation or a generated quiz.' },
            { step: '3', title: 'Practice', desc: 'Review flashcards or take the quiz to lock it in.' },
          ].map((s) => (
            <div key={s.step} className="card p-6">
              <div className="text-blue-400 text-sm font-semibold mb-1">Step {s.step}</div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { name: 'Ava, HS Student', quote: 'QuizeAI explained calc better than my textbook. Instant w.' },
            { name: 'Noah, College', quote: 'I generate quizzes from lecture notes and drill them fast.' },
            { name: 'Mia, AP Prep', quote: 'The clarity + speed is crazy. My scores went up.' },
          ].map((t) => (
            <div key={t.name} className="card p-6">
              <p className="text-white/80">“{t.quote}”</p>
              <div className="mt-4 text-sm text-white/60">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container max-w-3xl space-y-4">
          {[
            { q: 'Is QuizeAI free?', a: 'The basic chat is free; advanced features may require a plan later.' },
            { q: 'Do I need an account?', a: 'No account needed for chat. Accounts will unlock more features soon.' },
            { q: 'Is my data private?', a: 'We only process what you send to the chat. No tracking beyond what’s needed.' },
          ].map((f) => (
            <details key={f.q} className="card p-4">
              <summary className="cursor-pointer select-none text-sm font-medium">{f.q}</summary>
              <p className="mt-2 text-white/70 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="section pt-0">
        <div className="container text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to study smarter?</h2>
          <p className="text-white/70 max-w-xl mx-auto">Open the chat and ask anything. Turn notes into quizzes. Get clear answers fast.</p>
          <Link href="/chat" className="btn btn-primary">Start free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-white/60 text-sm">
        <div className="container">© {new Date().getFullYear()} QuizeAI. All rights reserved.</div>
      </footer>
    </main>
  )
}
