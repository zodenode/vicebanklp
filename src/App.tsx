import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Concierge } from './pages/Concierge'
import { Landing } from './pages/Landing'
import { Portal } from './pages/Portal'

function ScrollHomeWaitlist() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname === '/' && hash === '#waitlist') {
      const el = document.getElementById('waitlist')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollHomeWaitlist />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/concierge" element={<Concierge />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
