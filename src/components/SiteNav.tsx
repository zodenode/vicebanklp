import { Link, useLocation } from 'react-router-dom'
import { HomeWaitlistLink, ScrollLink } from './ScrollLink'

export function SiteNav() {
  const { pathname } = useLocation()
  const onLanding = pathname === '/'

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="font-display text-2xl tracking-tight text-white md:text-[1.75rem]">
          Longitude
        </Link>
        <nav className="flex items-center gap-3 text-sm text-white/85 md:gap-5">
          {onLanding && (
            <>
              <ScrollLink toId="protocol" className="hidden hover:text-white md:inline">
                Protocol
              </ScrollLink>
              <ScrollLink toId="included" className="hidden hover:text-white md:inline">
                Included
              </ScrollLink>
              <ScrollLink toId="clinics" className="hidden hover:text-white md:inline">
                Clinics
              </ScrollLink>
            </>
          )}
          <Link to="/portal" className="hover:text-white">
            Member
          </Link>
          {onLanding ? (
            <ScrollLink toId="waitlist" className="btn-brass !px-4 !py-2">
              Join Waitlist
            </ScrollLink>
          ) : (
            <HomeWaitlistLink className="btn-brass !px-4 !py-2">Join Waitlist</HomeWaitlistLink>
          )}
        </nav>
      </div>
    </header>
  )
}
