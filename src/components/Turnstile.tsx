"use client"

import { useEffect, useRef } from 'react'

/**
 * Lightweight Cloudflare Turnstile widget wrapper.
 * Requires NEXT_PUBLIC_TURNSTILE_SITE_KEY to be set.
 */
export default function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!containerRef.current || !siteKey) return

    function render() {
      // @ts-ignore
      if (window.turnstile && containerRef.current) {
        // @ts-ignore
        window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token: string) => onVerify(token),
          'expired-callback': () => onVerify(''),
          'error-callback': () => onVerify(''),
        })
      }
    }

    // Load script if not present
    // @ts-ignore
    if (!window.turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = render
      document.head.appendChild(script)
      return () => {
        // leave script in place
      }
    } else {
      render()
    }
  }, [siteKey, onVerify])

  if (!siteKey) {
    return (
      <div className="text-xs text-red-400">
        Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY in env.
      </div>
    )
  }

  return <div ref={containerRef} className="flex justify-center" />
}
