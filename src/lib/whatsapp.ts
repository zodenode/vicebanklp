import { config, isWhatsAppConfigured } from '../config'

export function buildWhatsAppUrl(message: string, number = config.whatsappNumber): string {
  const digits = number.replace(/\D/g, '')
  if (!digits) return ''
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function openConciergeWhatsApp(message: string): boolean {
  if (!isWhatsAppConfigured()) return false
  const url = buildWhatsAppUrl(message)
  window.open(url, '_blank', 'noopener,noreferrer')
  return true
}

export const templates = {
  waitlist: (name: string, city: string) =>
    `Hi Longitude — I'd like to join the waitlist.\nName: ${name}\nCity: ${city}`,

  join: (name: string, city: string) =>
    `Hi Longitude — I want to become a member.\nWe'll arrange your HBOT anywhere.\nName: ${name}\nCity: ${city}`,

  bookHbot: (payload: {
    name: string
    city: string
    preferredDates: string
    notes: string
  }) =>
    `Hi Longitude — please arrange HBOT for me.\nName: ${payload.name}\nCity: ${payload.city}\nPreferred dates: ${payload.preferredDates}\nNotes: ${payload.notes || '—'}`,
}
