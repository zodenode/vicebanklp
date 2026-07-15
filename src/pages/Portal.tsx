import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cities } from '../data/hbotCenters'
import { submitBookingRequest } from '../lib/airtable'
import { getMember, saveMember, type MemberProfile } from '../lib/member'
import { isStripeConfigured, isWhatsAppConfigured } from '../config'
import { startMembershipCheckout } from '../lib/stripe'
import { openConciergeWhatsApp, templates } from '../lib/whatsapp'

export function Portal() {
  const [member, setMember] = useState<MemberProfile | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('London')
  const [phone, setPhone] = useState('')
  const [preferredDates, setPreferredDates] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const existing = getMember()
    if (existing) {
      setMember(existing)
      setName(existing.name)
      setEmail(existing.email)
      setCity(existing.city)
      setPhone(existing.phone || '')
    }
  }, [])

  function activateMember(e: FormEvent) {
    e.preventDefault()
    const saved = saveMember({ name, email, city, phone: phone || undefined })
    setMember(saved)
  }

  async function requestHbot(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const destination = await submitBookingRequest({
        Name: name,
        Email: email,
        City: city,
        PreferredDates: preferredDates,
        Notes: notes,
        Phone: phone || undefined,
      })

      saveMember({ name, email, city, phone: phone || undefined })

      if (isWhatsAppConfigured()) {
        openConciergeWhatsApp(
          templates.bookHbot({ name, city, preferredDates, notes }),
        )
      }

      setStatus('done')
      setMessage(
        destination === 'airtable'
          ? "Request received. We'll arrange your HBOT and confirm by WhatsApp/email."
          : "Request saved. We'll arrange your HBOT — message sent to concierge when WhatsApp is configured.",
      )
    } catch {
      setStatus('error')
      setMessage('Could not submit request. Try WhatsApp concierge instead.')
    }
  }

  return (
    <div className="min-h-screen atmosphere meridian-grid">
      <header className="border-b border-[var(--line)] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Longitude
          </Link>
          <Link to="/" className="text-sm text-[var(--ink)]/60 hover:text-[var(--ink)]">
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--meridian)]">
          Member portal
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">We&apos;ll arrange your HBOT anywhere.</h1>
        <p className="mt-4 max-w-xl text-[var(--ink-soft)]/85">
          Tell us where you&apos;ll be. Our concierge calls a verified clinic and books your session —
          no app complexity, just continuity.
        </p>

        {!member ? (
          <form onSubmit={activateMember} className="mt-10 space-y-3 border border-[var(--line)] bg-white/80 p-6">
            <p className="text-sm font-medium">Activate your member profile</p>
            <input className="input-field" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <select className="input-field" value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            <input className="input-field" placeholder="Phone / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn-primary">
                Continue
              </button>
              {isStripeConfigured() && (
                <button type="button" className="btn-secondary" onClick={() => startMembershipCheckout()}>
                  Checkout with Stripe
                </button>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={requestHbot} className="mt-10 space-y-3 border border-[var(--line)] bg-white/80 p-6">
            <p className="text-sm text-[var(--ink)]/65">
              Signed in as <span className="font-medium text-[var(--ink)]">{member.name}</span>
            </p>
            <label className="block text-sm">
              <span className="mb-1 block text-[var(--ink)]/70">City for next session</span>
              <select className="input-field" value={city} onChange={(e) => setCity(e.target.value)} required>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-[var(--ink)]/70">Preferred dates / times</span>
              <input
                className="input-field"
                placeholder="e.g. Thu–Fri next week, mornings"
                value={preferredDates}
                onChange={(e) => setPreferredDates(e.target.value)}
                required
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-[var(--ink)]/70">Notes for concierge</span>
              <textarea
                className="input-field min-h-[100px] resize-y"
                placeholder="Protocol details, pressure preference, first visit, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Request HBOT booking'}
            </button>
            {message && (
              <p className={`text-sm ${status === 'error' ? 'text-red-700' : 'text-[var(--ink-soft)]'}`}>
                {message}
              </p>
            )}
          </form>
        )}

        <p className="mt-8 text-sm text-[var(--ink)]/55">
          Ops team: open the{' '}
          <Link to="/concierge" className="text-[var(--meridian)] underline-offset-2 hover:underline">
            concierge clinic directory
          </Link>{' '}
          to call or WhatsApp HBOT centres immediately.
        </p>
      </main>
    </div>
  )
}
