import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
ViceBank – Framer-Style Dynamic Landing Page (MVP)
Routing (Invest/Give/Repay/Insure) = COMING SOON
Theme: Dark (#0A0A0A) + Purple (#A855F7 → #6D28D9) */
export default function ViceBankLanding(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#A855F7] selection:text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeatureGrid />
      <ParallaxBreak />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Navbar(): JSX.Element {
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] grid place-items-center font-black">VB</div>
          <span className="font-black tracking-tight text-lg">Vice<span className="text-[#A855F7]">Bank</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#install" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm">Install</a>
          <a href="#waitlist" className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] hover:opacity-90 text-sm font-semibold">Join Waitlist</a>
        </div>
      </div>
    </div>
  );
}

function Hero(): JSX.Element {
  return (
    <section id="install" className="relative overflow-hidden">
      <AnimatedBackground />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-28 md:py-32 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight"
        >
          Every minute you waste on <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#A855F7] to-[#6D28D9]">porn or gambling</span> costs you.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 max-w-2xl text-white/70"
        >
          ViceBank tracks your usage, gives you a 0–3 minute daily grace, then charges per minute after. <strong>Routing is coming soon.</strong>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a href="#" className="px-6 py-3 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] font-semibold">Install Free Chrome Extension</a>
          <a href="#waitlist" className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10">Join Mobile Waitlist</a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { k: "3 min", v: "Daily grace" },
            { k: "$0.05–$1.00", v: "Per-minute after grace" },
            { k: "Privacy-first", v: "Domains only, never page content" },
          ].map((i) => (
            <StatCard key={i.k} k={i.k} v={i.v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedBackground(): JSX.Element {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute -inset-[40%] bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(109,40,217,0.25),transparent_50%)]" />
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 50%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: "linear-gradient(135deg, rgba(168,85,247,0.10), rgba(109,40,217,0.10))" }}
      />
    </div>
  );
}

type StatCardProps = { k: string; v: string };

function StatCard({ k, v }: StatCardProps): JSX.Element {
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-2xl font-extrabold text-white">{k}</div>
      <div className="text-white/70 text-sm mt-1">{v}</div>
    </motion.div>
  );
}

function HowItWorks(): JSX.Element {
  const steps: Array<{ title: string; desc: string }> = [
    { title: "Install & Select Categories", desc: "Choose Porn, Gambling, or both. Uses domain-only detection." },
    { title: "Set Grace & Rates", desc: "Pick 0–3 minutes/day. After grace, set per-minute rates per category." },
    { title: "Get Alerts & Intercepts", desc: "80% grace warning, then an overlay asks if you want to continue paid time." },
    { title: "Coming Soon: Routing", desc: "Invest, Give, Repay Debt, and Insure — not in MVP." },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeader eyebrow="How it works" title="Financial accountability, not just blocking." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] grid place-items-center font-black mb-4">{i + 1}</div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-white/70 mt-2">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid(): JSX.Element {
  const feats: Array<{ t: string; d: string }> = [
    { t: "Domain-only tracking", d: "We never read page content. Just domain + minutes." },
    { t: "Per-category rates", d: "Porn: $0.05+ /min, Gambling: $0.25+ /min." },
    { t: "3-min daily grace", d: "Configurable 0–3. Warns at 80%." },
    { t: "Intercept overlays", d: "Ask to Continue Paid or Stop when grace ends." },
    { t: "Routing", d: "Invest, Give, Repay Debt — coming soon." },
    { t: "Privacy-first", d: "Local logging, exportable history, transparent invoices." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeader eyebrow="Features" title="Built like a fintech. Works like a coach." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {feats.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h4 className="font-semibold">{f.t}</h4>
            <p className="text-sm text-white/70 mt-2">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ParallaxBreak(): JSX.Element {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -120]);
  return (
    <div className="relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(168,85,247,0.25),transparent_40%),radial-gradient(circle_at_70%_110%,rgba(37,99,235,0.15),transparent_40%)]"
      />
      <div className="mx-auto max-w-7xl px-4 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center"
        >
          <div className="text-white/80">“Discipline is choosing what you want most over what you want now.”</div>
          <div className="mt-3 text-sm text-white/50">— ViceBank</div>
        </motion.div>
      </div>
    </div>
  );
}

function Pricing(): JSX.Element {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeader eyebrow="Pricing" title="Free burns. More power coming soon." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <PriceCard
          name="Free – Burn Mode"
          price="$0"
          tagline="Penalties burn. No routing."
          features={[
            "Track porn + gambling",
            "0–3 min daily grace",
            "80% warning + intercept",
            "Weekly invoice (charged to burn)",
          ]}
          cta="Install Free Extension"
        />
        <PriceCard
          name="Basic"
          price="$9/mo"
          tagline="Core accountability, enhanced metrics."
          features={[
            "Everything in Free",
            "Streak badges",
            "Usage insights",
            "Priority support",
          ]}
          highlight
          cta="Start Basic"
        />
        <PriceCard
          name="Premium"
          price="$19–25/mo"
          tagline="Advanced accountability & early access."
          features={[
            "Everything in Basic",
            "Accountability partners",
            "Challenges & pools",
            "Early access: Routing & Insure (coming soon)",
          ]}
          cta="Go Premium"
        />
      </div>
    </section>
  );
}

type PriceCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

function PriceCard({ name, price, tagline, features, cta, highlight }: PriceCardProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className={`rounded-2xl border bg-white/5 p-6 ${highlight ? "border-[#A855F7] shadow-[0_0_0_1px_rgba(168,85,247,0.4)]" : "border-white/10"}`}
    >
      <div className="text-sm uppercase tracking-wider text-white/60">{name}</div>
      <div className="mt-2 text-3xl font-extrabold">{price}</div>
      <div className="text-white/70 text-sm mt-1">{tagline}</div>
      <ul className="mt-6 space-y-2 text-sm text-white/80">
        {features.map((f: string) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#A855F7] to-[#6D28D9]" />
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#"
        className={`mt-6 inline-flex px-5 py-3 rounded-xl font-semibold ${highlight ? "bg-gradient-to-br from-[#A855F7] to-[#6D28D9]" : "border border-white/15 hover:bg-white/10"}`}
      >
        {cta}
      </a>
    </motion.div>
  );
}

function Testimonials(): JSX.Element {
  const items: Array<{ q: string; a: string }> = [
    { q: "I would’ve wasted $126 last week. Now it fuels my savings.", a: "— Beta user" },
    { q: "Seeing $/min after grace made me stop opening the tab.", a: "— Early adopter" },
    { q: "I pay down my card automatically when I slip up.", a: "— Premium member" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeader eyebrow="Social proof" title="Early users, real results." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-white/80">“{t.q}”</p>
            <footer className="text-white/50 text-sm mt-3">{t.a}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}

function FAQ(): JSX.Element {
  const faqs: Array<{ q: string; a: string }> = [
    { q: "Do you read what I watch or bet on?", a: "No. ViceBank tracks domains and minutes only—never page content, keywords, or messages." },
    { q: "Why 0–3 minute grace?", a: "A small friction window reduces impulsive starts while preserving freedom of choice." },
    { q: "Can I route penalties?", a: "Not in MVP. Routing (Invest, Give, Repay Debt, Insure) is coming soon." },
    { q: "What happens if I uninstall?", a: "Accountability ends. We’ll remind you that partners or challenges rely on your commitment." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-24">
      <SectionHeader eyebrow="FAQ" title="Questions, answered." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h4 className="font-semibold">{f.q}</h4>
            <p className="text-sm text-white/70 mt-2">{f.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA(): JSX.Element {
  return (
    <section id="waitlist" className="mx-auto max-w-7xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 text-center"
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to turn slips into savings?</h3>
        <p className="text-white/70 mt-3">Install the Chrome extension today. Join the beta for early access to upcoming features.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <a href="#" className="px-6 py-3 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] font-semibold">Install Extension</a>
          <a href="#" className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10">Join Mobile Beta</a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] grid place-items-center font-black">VB</div>
          <span className="text-sm text-white/70">©️ {new Date().getFullYear()} ViceBank</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}

type SectionHeaderProps = { eyebrow: string; title: string };

function SectionHeader({ eyebrow, title }: SectionHeaderProps): JSX.Element {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/50">{eyebrow}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">{title}</h2>
    </div>
  );
}

