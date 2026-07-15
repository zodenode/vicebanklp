/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_STRIPE_PAYMENT_LINK?: string
  readonly VITE_AIRTABLE_API_KEY?: string
  readonly VITE_AIRTABLE_BASE_ID?: string
  readonly VITE_AIRTABLE_WAITLIST_TABLE?: string
  readonly VITE_AIRTABLE_BOOKINGS_TABLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
