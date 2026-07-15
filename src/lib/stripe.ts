import { config, isStripeConfigured } from '../config'

export function startMembershipCheckout(): { ok: boolean; reason?: string } {
  if (!isStripeConfigured()) {
    return { ok: false, reason: 'Stripe Payment Link not configured yet.' }
  }
  window.location.href = config.stripePaymentLink
  return { ok: true }
}
