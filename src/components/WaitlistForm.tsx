import { FormEvent, useState } from 'react'
import { submitWaitlist } from '../lib/airtable'
import { isWhatsAppConfigured } from '../config'
import { openConciergeWhatsApp, templates } from '../lib/whatsapp'
import { saveMember } from '../lib/member'

type Props = {
  id?: string
  variant?: 'light' | 'dark'
  ctaLabel?: string
}

export function WaitlistForm({
  id = 'waitlist',
  variant = 'light',
  ctaLabel = 'Join the Waitlist',
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !city.trim()) return

    setStatus('loading')
    try {
      const destination = await submitWaitlist({
        Name: name.trim(),
        Email: email.trim(),
        City: city.trim(),
        Phone: phone.trim() || undefined,
      })

      saveMember({
        name: name.trim(),
        email: email.trim(),
        city: city.trim(),
        phone: phone.trim() || undefined,
      })

      if (isWhatsAppConfigured()) {
        openConciergeWhatsApp(templates.waitlist(name.trim(), city.trim()))
      }

      setStatus('done')
      setMessage(
        destination === 'airtable'
          ? "You're on the list. We'll arrange your HBOT anywhere — expect early access soon."
          : "You're on the list. We'll arrange your HBOT anywhere — our team will follow up shortly.",
      )
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try WhatsApp or email us.')
    }
  }

  const muted = variant === 'dark' ? 'text-white/70' : 'text-[var(--ink-soft)]/80'

  return (
    <form id={id} onSubmit={onSubmit} className="w-full max-w-xl space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input-field"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input-field"
          placeholder="Home city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          autoComplete="address-level2"
        />
        <input
          className="input-field"
          placeholder="Phone / WhatsApp (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'loading'}>
        {status === 'loading' ? 'Joining…' : ctaLabel}
      </button>
      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-700' : muted}`}>{message}</p>
      )}
    </form>
  )
}
