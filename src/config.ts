const env = import.meta.env

export const config = {
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, '') || '',
  stripePaymentLink: (env.VITE_STRIPE_PAYMENT_LINK as string | undefined) || '',
  airtable: {
    apiKey: (env.VITE_AIRTABLE_API_KEY as string | undefined) || '',
    baseId: (env.VITE_AIRTABLE_BASE_ID as string | undefined) || '',
    waitlistTable: (env.VITE_AIRTABLE_WAITLIST_TABLE as string | undefined) || 'Waitlist',
    bookingsTable: (env.VITE_AIRTABLE_BOOKINGS_TABLE as string | undefined) || 'Bookings',
  },
}

export function isAirtableConfigured(): boolean {
  return Boolean(config.airtable.apiKey && config.airtable.baseId)
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(config.whatsappNumber)
}

export function isStripeConfigured(): boolean {
  return Boolean(config.stripePaymentLink)
}
