import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cities, hbotCenters, telLink, waLink, type HbotCenter } from '../data/hbotCenters'

function CenterRow({ center }: { center: HbotCenter }) {
  const wa = waLink(
    center.whatsapp,
    `Hi ${center.name} — this is Longitude concierge. We'd like to book an HBOT session for a member. Do you have availability this week?`,
  )

  return (
    <article className="border border-[var(--line)] bg-white/90 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl">{center.name}</h2>
          <p className="mt-1 text-sm text-[var(--ink)]/60">
            {center.city}, {center.country}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={telLink(center.phone)} className="btn-primary !px-3 !py-2 text-xs">
            Call {center.phone}
          </a>
          {wa ? (
            <a href={wa} target="_blank" rel="noreferrer" className="btn-brass !px-3 !py-2 text-xs">
              WhatsApp
            </a>
          ) : (
            <span className="btn-secondary !cursor-default !px-3 !py-2 text-xs opacity-60">
              No WhatsApp listed
            </span>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-[var(--ink-soft)]">{center.address}</p>
      {center.email && (
        <a href={`mailto:${center.email}`} className="mt-2 inline-block text-sm text-[var(--meridian)]">
          {center.email}
        </a>
      )}
      {center.website && (
        <a
          href={center.website}
          target="_blank"
          rel="noreferrer"
          className="mt-1 block text-sm text-[var(--ink)]/50 hover:text-[var(--ink)]"
        >
          {center.website.replace(/^https?:\/\//, '')}
        </a>
      )}
      {center.notes && <p className="mt-3 text-xs leading-relaxed text-[var(--ink)]/55">{center.notes}</p>}
      <p className="mt-3 text-xs uppercase tracking-wide text-[var(--brass)]">
        {center.services.join(' · ')}
      </p>
    </article>
  )
}

export function Concierge() {
  const [city, setCity] = useState<string>('All')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return hbotCenters.filter((c) => {
      const cityOk = city === 'All' || c.city === city
      const hay = `${c.name} ${c.city} ${c.address} ${c.phone} ${c.notes || ''}`.toLowerCase()
      const qOk = !q.trim() || hay.includes(q.trim().toLowerCase())
      return cityOk && qOk
    })
  }, [city, q])

  const withWhatsApp = hbotCenters.filter((c) => c.whatsapp).length

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <header className="border-b border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
          <div>
            <Link to="/" className="font-display text-2xl">
              Longitude
            </Link>
            <p className="text-xs text-white/55">Concierge ops · HBOT centre directory</p>
          </div>
          <Link to="/portal" className="text-sm text-white/70 hover:text-white">
            Member portal
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <h1 className="font-display text-3xl md:text-4xl">HBOT centres — call or WhatsApp now</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--ink-soft)]/85">
          When a member requests a session, filter by city, open WhatsApp or dial, and book on their
          behalf. {hbotCenters.length} centres · {withWhatsApp} with WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <select className="input-field max-w-[200px]" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="All">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            className="input-field max-w-md"
            placeholder="Search name, address, notes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="mt-8 space-y-4">
          {filtered.map((center) => (
            <CenterRow key={center.id} center={center} />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-[var(--ink)]/55">No centres match that filter.</p>
          )}
        </div>
      </main>
    </div>
  )
}
