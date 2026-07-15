import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScrollLink } from '../components/ScrollLink'
import { SiteNav } from '../components/SiteNav'
import { WaitlistForm } from '../components/WaitlistForm'
import { isStripeConfigured, isWhatsAppConfigured } from '../config'
import { startMembershipCheckout } from '../lib/stripe'
import { openConciergeWhatsApp, templates } from '../lib/whatsapp'

const therapies = [
  'Hyperbaric Oxygen Therapy',
  'Red Light Therapy',
  'Cryotherapy',
  'Recovery',
  'Diagnostics',
]

const included = [
  'Hyperbaric Oxygen Therapy (HBOT)',
  'Red Light Therapy (RLT)',
  'Infrared Sauna',
  'Cryotherapy',
  'Cold Plunge',
  'Sports Recovery',
  'Compression Therapy',
  'Performance Testing',
  'DEXA Body Composition',
  'VO₂ Max Testing',
  'Blood Biomarkers',
  'Longevity Consultations',
]

const standards = [
  'Qualified clinical staff',
  'Professional equipment',
  'Transparent pricing',
  'High service standards',
  'Consistent member experience',
]

const audiences = ['Digital nomads', 'Founders', 'Executives', 'Professional athletes', 'Frequent flyers']

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80'

export function Landing() {
  function handleBecomeMember() {
    const stripe = startMembershipCheckout()
    if (stripe.ok) return
    if (isWhatsAppConfigured()) {
      openConciergeWhatsApp(templates.join('Member', 'Travelling'))
      return
    }
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO — one composition: brand, headline, support, CTA, dominant image */}
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <img
          src={HERO_IMAGE}
          alt="City skyline at dusk — health that travels with you"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,18,24,0.88)] via-[rgba(6,18,24,0.62)] to-[rgba(6,18,24,0.28)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,18,24,0.75)] via-transparent to-[rgba(6,18,24,0.35)]" />
        <div className="meridian-grid absolute inset-0 opacity-30 mix-blend-soft-light" />

        <SiteNav />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Longitude
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-xl font-display text-2xl font-medium leading-snug text-white/95 sm:text-3xl md:text-[2.15rem]"
          >
            One Membership. Thousands of Miles. One Standard of Care.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base"
          >
            The world&apos;s first membership designed for people who take longevity seriously.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#waitlist" className="btn-brass">
              Join the Waitlist
            </a>
            <button type="button" onClick={handleBecomeMember} className="btn-secondary !border-white/25 !bg-white/10 !text-white hover:!bg-white/20">
              {isStripeConfigured() ? 'Become a Member' : 'Talk to Concierge'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Promise strip */}
      <section className="border-b border-[var(--line)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl"
          >
            Whether you&apos;re in London, Dubai, Singapore, Miami, or Tokyo, Longitude gives you
            access to a growing network of trusted longevity and recovery clinics through a single
            membership.
          </motion.p>
          <div className="mt-8 grid gap-2 text-sm text-[var(--ink)]/70 sm:grid-cols-3">
            <p>No searching.</p>
            <p>No negotiating.</p>
            <p>No starting over every time you travel.</p>
          </div>
          <p className="mt-8 font-display text-2xl text-[var(--meridian-deep)] md:text-3xl">
            Just open the app, book, and continue your protocol.
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-[var(--brass)]">
            Your health shouldn&apos;t stop at the border.
          </p>
        </div>
      </section>

      {/* Consistency */}
      <section id="protocol" className="section-pad atmosphere meridian-grid">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--meridian)]">
            The problem
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Longevity Isn&apos;t One Treatment.
            <span className="block text-[var(--meridian-deep)]">It&apos;s Consistency.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]/85">
            The most effective longevity therapies aren&apos;t one-off experiences. The evidence for
            many of these interventions is generally based on repeated treatment protocols over weeks
            or months, not occasional sessions.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-[var(--line)] py-6 text-sm md:text-base">
            {therapies.map((t) => (
              <li key={t} className="font-medium">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-[var(--ink-soft)]/85">But today&apos;s system makes consistency difficult.</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]/75">
                <li>You move cities.</li>
                <li>You travel for work.</li>
                <li>You go on holiday.</li>
                <li>Your protocol stops.</li>
              </ul>
            </div>
            <p className="font-display text-3xl leading-snug text-[var(--ink)] md:pt-2">
              Longitude was built to solve that problem.
            </p>
          </div>
        </div>
      </section>

      {/* Continue anywhere */}
      <section className="section-pad bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl font-display text-4xl leading-tight md:text-5xl">
            Continue Your Protocol Anywhere
          </h2>
          <p className="mt-5 max-w-lg text-white/70">
            Imagine arriving in a new city. Open Longitude. See verified clinics nearby. Book your
            next session in seconds.
          </p>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { n: '01', t: 'Arrive', d: 'No phone calls. No paperwork.' },
              { n: '02', t: 'Open Longitude', d: 'See verified clinics nearby.' },
              { n: '03', t: 'Book in seconds', d: 'Your membership follows you.' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-xs tracking-[0.2em] text-[var(--brass-soft)]">{step.n}</p>
                <p className="mt-3 font-display text-2xl">{step.t}</p>
                <p className="mt-2 text-sm text-white/65">{step.d}</p>
              </motion.div>
            ))}
          </ol>
          <p className="mt-12 text-sm text-white/55">
            No wondering whether the clinic is reputable.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section id="included" className="section-pad">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl">What&apos;s Included</h2>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]/85">
            Your Longitude membership provides access to participating clinics offering services such
            as:
          </p>
          <ul className="mt-10 columns-1 gap-x-12 sm:columns-2 md:columns-3">
            {included.map((item) => (
              <li
                key={item}
                className="mb-3 break-inside-avoid border-b border-[var(--line)] pb-3 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[var(--meridian)]">
            The network continues to expand city by city.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="section-pad atmosphere">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Why Longitude Exists
            </h2>
            <p className="mt-6 text-lg text-[var(--ink-soft)]">
              Most healthcare systems are local.
              <br />
              Longevity is global.
            </p>
            <p className="mt-4 max-w-md text-[var(--ink-soft)]/80">
              Modern professionals travel more than ever. Yet every move interrupts their health
              routines. Longitude keeps those routines intact.
            </p>
          </div>
          <ul className="space-y-3 border-l border-[var(--line)] pl-6">
            {audiences.map((a) => (
              <li key={a} className="font-display text-xl md:text-2xl">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Better way */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl font-display text-4xl md:text-5xl">
            A Better Way to Access Longevity
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              'Instead of paying every clinic separately…',
              'Instead of filling in your details again and again…',
              'Instead of researching providers every time you travel…',
            ].map((line) => (
              <p key={line} className="text-[var(--ink-soft)]/80">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-10 font-display text-3xl text-[var(--meridian-deep)]">
            You simply become a Longitude member.
          </p>
          <p className="mt-4 text-sm tracking-wide text-[var(--ink)]/60">
            One account. One membership. One trusted network.
          </p>
        </div>
      </section>

      {/* Built around consistency */}
      <section className="section-pad bg-[var(--mist)]">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl">Built Around Consistency</h2>
          <p className="mt-5 max-w-xl text-[var(--ink-soft)]/85">
            Many wellness memberships reward occasional use. Longitude is designed for structured
            protocols.
          </p>
          <ul className="mt-10 space-y-4 font-display text-2xl md:text-3xl">
            <li>Continue your HBOT schedule.</li>
            <li>Keep your Red Light Therapy routine.</li>
            <li>Maintain your recovery programme.</li>
            <li className="text-[var(--meridian-deep)]">Stay on track wherever life takes you.</li>
          </ul>
        </div>
      </section>

      {/* Verified clinics */}
      <section id="clinics" className="section-pad">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl md:text-5xl">Verified Partner Clinics</h2>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]/85">
            Every clinic in the Longitude network is reviewed against standards including:
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((s) => (
              <li key={s} className="border-t border-[var(--line)] pt-3 text-sm font-medium">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-10 font-display text-2xl text-[var(--ink)]">
            Because longevity deserves trust—not guesswork.
          </p>
        </div>
      </section>

      {/* For clinics */}
      <section className="section-pad bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-6xl md:flex md:items-end md:justify-between md:gap-12">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl">For Clinics</h2>
            <ul className="mt-8 space-y-3 text-white/75">
              <li>Fill unused appointment capacity.</li>
              <li>Reach affluent international members.</li>
              <li>Receive bookings from qualified customers.</li>
              <li>Manage everything through one platform.</li>
            </ul>
          </div>
          <a
            href={
              isWhatsAppConfigured()
                ? undefined
                : 'mailto:partners@longitude.health?subject=Join%20the%20Longitude%20Network'
            }
            onClick={(e) => {
              if (!isWhatsAppConfigured()) return
              e.preventDefault()
              openConciergeWhatsApp(
                "Hi Longitude — we're a clinic interested in joining the Longitude Network.",
              )
            }}
            className="btn-brass mt-10 md:mt-0"
          >
            Join the Longitude Network
          </a>
        </div>
      </section>

      {/* Future */}
      <section className="section-pad atmosphere meridian-grid">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            The Future of Global Longevity
          </h2>
          <div className="mt-8 space-y-3 text-[var(--ink-soft)]/85">
            <p>Today, your credit card works almost everywhere.</p>
            <p>Your airline status follows you around the world.</p>
            <p>Your hotel membership travels with you.</p>
            <p className="font-display text-2xl text-[var(--ink)] md:text-3xl">
              Your longevity programme should too.
            </p>
          </div>
          <p className="mt-10 font-display text-3xl">Welcome to Longitude.</p>
        </div>
      </section>

      {/* Concierge pitch + waitlist */}
      <section className="section-pad bg-white" id="waitlist-section">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--meridian)]">
              Concierge membership
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Join the Waitlist</h2>
            <p className="mt-5 text-[var(--ink-soft)]/85">
              Become one of the first members and receive early access when Longitude launches in
              your city.
            </p>
            <p className="mt-6 border-l-2 border-[var(--brass)] pl-4 font-display text-xl text-[var(--ink)]">
              We&apos;ll arrange your HBOT anywhere.
            </p>
            <p className="mt-4 text-sm text-[var(--ink)]/65">
              Behind the scenes, our concierge calls the clinic and books it for you — so you can
              validate consistency before a complex app exists.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={handleBecomeMember} className="btn-primary">
                {isStripeConfigured() ? 'Pay with Stripe' : 'Message Concierge on WhatsApp'}
              </button>
              <Link to="/portal" className="btn-secondary">
                Member portal
              </Link>
            </div>
          </div>
          <div className="rounded-none border border-[var(--line)] bg-[var(--mist)]/60 p-6 md:p-8">
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-12 text-white md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl">Longitude</p>
            <p className="mt-2 text-sm text-white/60">Health Without Borders.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/55">
            <Link to="/portal" className="hover:text-white">
              Member portal
            </Link>
            <Link to="/concierge" className="hover:text-white">
              Concierge ops
            </Link>
            <a href="#waitlist" className="hover:text-white">
              Waitlist
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
