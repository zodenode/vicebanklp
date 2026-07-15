import { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  toId: string
  className?: string
  children: ReactNode
}

/** In-page scroll that does not fight HashRouter's URL hash. */
export function ScrollLink({ toId, className, children }: Props) {
  function onClick(e: MouseEvent) {
    e.preventDefault()
    const el = document.getElementById(toId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a href={`#${toId}`} onClick={onClick} className={className}>
      {children}
    </a>
  )
}

export function HomeWaitlistLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Link to="/" className={className} onClick={() => {
      setTimeout(() => {
        document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }}>
      {children}
    </Link>
  )
}
