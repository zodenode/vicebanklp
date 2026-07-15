import { config, isAirtableConfigured } from '../config'

type Fields = Record<string, string | number | boolean>

async function createRecord(table: string, fields: Fields): Promise<boolean> {
  if (!isAirtableConfigured()) return false

  const url = `https://api.airtable.com/v0/${config.airtable.baseId}/${encodeURIComponent(table)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.airtable.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('Airtable error', res.status, body)
    return false
  }
  return true
}

export async function submitWaitlist(fields: {
  Name: string
  Email: string
  City: string
  Phone?: string
}): Promise<'airtable' | 'local'> {
  const ok = await createRecord(config.airtable.waitlistTable, {
    ...fields,
    Source: 'longitude-landing',
    CreatedAt: new Date().toISOString(),
  })
  if (ok) return 'airtable'

  const key = 'longitude_waitlist'
  const prev = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
  prev.push({ ...fields, createdAt: new Date().toISOString() })
  localStorage.setItem(key, JSON.stringify(prev))
  return 'local'
}

export async function submitBookingRequest(fields: {
  Name: string
  Email: string
  City: string
  PreferredDates: string
  Notes: string
  Phone?: string
}): Promise<'airtable' | 'local'> {
  const ok = await createRecord(config.airtable.bookingsTable, {
    ...fields,
    Status: 'New',
    Service: 'HBOT',
    CreatedAt: new Date().toISOString(),
  })
  if (ok) return 'airtable'

  const key = 'longitude_bookings'
  const prev = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
  prev.push({ ...fields, createdAt: new Date().toISOString() })
  localStorage.setItem(key, JSON.stringify(prev))
  return 'local'
}
