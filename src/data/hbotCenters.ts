export type HbotCenter = {
  id: string
  name: string
  city: string
  country: string
  address: string
  phone: string
  /** E.164 digits only, no +. Empty if unknown. */
  whatsapp: string
  email?: string
  website?: string
  notes?: string
  services: string[]
}

/**
 * Concierge ops directory — clinics Longitude can call/WhatsApp to book HBOT.
 * Numbers verified from public clinic pages; re-confirm before first outreach.
 */
export const hbotCenters: HbotCenter[] = [
  // —— London ——
  {
    id: 'london-numa',
    name: 'NUMA Oxygen',
    city: 'London',
    country: 'UK',
    address: '6 York Street, Marylebone, London W1U 6QD',
    phone: '+44 7738 472203',
    whatsapp: '447738472203',
    website: 'https://numaoxygen.com',
    notes: 'WhatsApp business line listed on contact page. Longevity / recovery focused.',
    services: ['HBOT'],
  },
  {
    id: 'london-oxygen-centre',
    name: 'London Oxygen Centre',
    city: 'London',
    country: 'UK',
    address: 'Cleveland Road, Ealing, London W13 0EJ',
    phone: '+44 7565 295133',
    whatsapp: '447565295133',
    email: 'londonoxygencentre@gmail.com',
    website: 'https://www.londonoxygencentre.com',
    notes: 'Appointment only. Public WhatsApp booking link available.',
    services: ['HBOT'],
  },
  {
    id: 'london-wellness-lab',
    name: 'The Wellness Lab',
    city: 'London',
    country: 'UK',
    address: '21 Knightsbridge, London SW1X 7LY',
    phone: '+44 203 687 0536',
    whatsapp: '447724601630',
    website: 'https://www.thewellnesslab.com',
    notes: 'Secondary mobile +44 7724 601630 — use for WhatsApp outreach.',
    services: ['HBOT', 'Recovery'],
  },
  {
    id: 'london-oxyzen',
    name: 'Oxyzen London',
    city: 'London',
    country: 'UK',
    address: 'Liverpool Street / Bishopsgate, London',
    phone: '+44 7700 150900',
    whatsapp: '447700150900',
    email: 'booking@oxyzenlondon.co.uk',
    website: 'https://oxyzenlondon.co.uk',
    notes: 'Confirm WhatsApp availability on first contact; phone is primary.',
    services: ['HBOT'],
  },

  // —— Dubai ——
  {
    id: 'dubai-aeon',
    name: 'AEON Clinic',
    city: 'Dubai',
    country: 'UAE',
    address: 'Level P, Sunrise Tower, Atlantis The Royal, Dubai',
    phone: '+971 4 518 5777',
    whatsapp: '97145185777',
    website: 'https://theaeonclinic.com',
    notes: 'Same number on WhatsApp. Longevity / regenerative clinic with HBOT.',
    services: ['HBOT', 'Longevity Consultations'],
  },
  // —— Singapore ——
  {
    id: 'singapore-hms',
    name: 'Hyperbaric Medical Services',
    city: 'Singapore',
    country: 'Singapore',
    address: 'Blk 1, #01-330 Thomson Road, Singapore 300001',
    phone: '+65 6355 9021',
    whatsapp: '6580406236',
    email: 'hyperbaricsg@gmail.com',
    website: 'https://hyperbaric-singapore.com',
    notes: 'Mobile +65 8040 6236 is the best WhatsApp line. Medical HBOT provider.',
    services: ['HBOT'],
  },

  // —— Miami ——
  {
    id: 'miami-trufamed',
    name: 'TrufaMED',
    city: 'Miami',
    country: 'USA',
    address: '9445 Harding Ave, Surfside, FL 33154',
    phone: '+1 305 537 6396',
    whatsapp: '13058429801',
    email: 'info@trufamed.com',
    website: 'https://trufamed.com',
    notes: 'Physician-led hard chamber. WhatsApp +1 305 842 9801.',
    services: ['HBOT'],
  },
  {
    id: 'miami-hypervida',
    name: 'Hypervida',
    city: 'Miami',
    country: 'USA',
    address: '1627 Jefferson Ave, Miami Beach, FL 33139',
    phone: '+1 305 906 0137',
    whatsapp: '13059060137',
    email: 'info@hypervida.com',
    website: 'https://hypervida.com',
    notes: 'Hyperbaric wellness club. Confirm WhatsApp on first outreach; phone is reliable.',
    services: ['HBOT', 'Red Light Therapy', 'IV Therapy'],
  },

  // —— Tokyo ——
  {
    id: 'tokyo-artisan',
    name: 'Artisan Clinic Hibiya',
    city: 'Tokyo',
    country: 'Japan',
    address: '1 Chome-2-15 Yurakucho, Chiyoda City, Tokyo 100-0006',
    phone: '+81 3 6205 8472',
    whatsapp: '6580829889',
    website: 'https://www.artisanclinichibiya.jp',
    notes: 'Public WhatsApp listed as +65 8082 9889. English-friendly wellness HBOT.',
    services: ['HBOT'],
  },
  {
    id: 'tokyo-science-univ',
    name: 'Institute of Science Tokyo Hospital — Hyperbaric Dept',
    city: 'Tokyo',
    country: 'Japan',
    address: 'Tokyo (medical hospital HBOT unit)',
    phone: '+81 3 5803 4517',
    whatsapp: '',
    website: 'https://www.tmd.ac.jp/medhospital/medical/central/koukiatsu.html',
    notes: 'Medical indication / referral often required. Not a walk-up wellness clinic.',
    services: ['HBOT'],
  },
]

export const cities = ['London', 'Dubai', 'Singapore', 'Miami', 'Tokyo'] as const

export function centersByCity(city: string): HbotCenter[] {
  return hbotCenters.filter((c) => c.city.toLowerCase() === city.toLowerCase())
}

export function waLink(whatsapp: string, text?: string): string {
  const digits = whatsapp.replace(/\D/g, '')
  if (!digits) return ''
  const q = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${digits}${q}`
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
