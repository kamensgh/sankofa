import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function SankofaLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="#C8922A" strokeWidth="1.5" opacity="0.4"/>
        <path d="M16 8 C10 8 7 12 7 16 C7 20 10 22 13 22 C16 22 18 20 18 18 C18 16 17 15 16 15 C15 15 14 16 15 17"
          stroke="#C8922A" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M16 8 C22 8 25 12 25 16 C25 20 22 22 19 22"
          stroke="#C8922A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
        <circle cx="16" cy="8" r="2.5" fill="#C8922A"/>
      </svg>
      <span className="font-display text-lg font-black text-[#F5E6C8] tracking-tight">SANKOFA</span>
    </Link>
  )
}

const LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/search',    label: 'Browse' },
  { to: '/watchlist', label: 'Watchlist' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) => to === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(to)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0E0A07]/95 backdrop-blur-md border-b border-[#1F160D] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="kente-border h-0.5 w-full"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6">
        <SankofaLogo />

        <nav className="hidden sm:flex items-center gap-1">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-full font-ui text-sm font-medium transition-all ${
                isActive(l.to)
                  ? 'bg-[#C8922A]/15 text-[#C8922A]'
                  : 'text-[#C4B49A] hover:text-[#F5E6C8] hover:bg-white/5'
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#2A1E12] bg-[#161009] hover:bg-[#1F160D] px-4 py-1.5 font-ui text-xs text-[#C4B49A] transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Search films…
          </Link>
          <button
            className="sm:hidden p-2 text-[#C4B49A] hover:text-[#F5E6C8]"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-[#0E0A07]/98 backdrop-blur-md border-t border-[#1F160D]">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center px-6 py-4 font-ui text-sm font-medium border-b border-[#1F160D] last:border-0 transition-colors ${
                isActive(l.to) ? 'text-[#C8922A] bg-[#C8922A]/5' : 'text-[#C4B49A] hover:text-[#F5E6C8] hover:bg-white/5'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
