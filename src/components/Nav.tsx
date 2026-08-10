import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import LogoSVG from './LogoSVG'

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Références', href: '/references' },
  { label: 'Formation', href: '/formation' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
]

export default function Nav() {
  const { pathname } = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 40)
    const docH = document.documentElement.scrollHeight - window.innerHeight
    setProgress(docH > 0 ? (y / docH) * 100 : 0)
  }, [])

  useEffect(() => {
    setProgress(0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const textCol = 'var(--mid)'
  const textHover = 'var(--ink)'

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem var(--sp-x)',
          background: scrolled ? 'rgba(245,243,238,0.96)' : 'rgba(245,243,238,0.92)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
          transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            zIndex: 110,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          <LogoSVG inkColor="#1b3554" subColor="#6b6560" height={32} />
        </Link>

        {/* Desktop nav */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href
            return (
              <li key={href} style={{ position: 'relative' }}>
                <Link
                  to={href}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--blue-bright)' : textCol,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    paddingBottom: '4px',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = active ? 'var(--blue-bright)' : textHover)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = active ? 'var(--blue-bright)' : textCol)}
                >
                  {label}
                </Link>
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--blue-bright)',
                      borderRadius: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
          <li>
            <Link
              to="/contact"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--paper)',
                background: 'var(--ink)',
                textDecoration: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '2px',
                transition: 'background 0.5s, color 0.5s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--blue-bright)'
                el.style.color = '#0e1f30'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--ink)'
                el.style.color = 'var(--paper)'
              }}
            >
              Prendre RDV
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          style={{ color: 'var(--ink)' }}
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0,
              background: 'var(--paper)',
              zIndex: 95,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '2rem 3rem',
            }}
          >
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, var(--blue-bright), transparent)',
              }}
            />
            <nav style={{ marginBottom: '3rem' }}>
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    to={href}
                    className="mobile-nav-item"
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', textDecoration: 'none' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + NAV_LINKS.length * 0.07 }}
              >
                <Link
                  to="/contact"
                  className="mobile-nav-item"
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', textDecoration: 'none', color: 'var(--blue-bright)' }}
                >
                  Prendre RDV →
                </Link>
              </motion.div>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(47,111,181,0.4)',
                display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
              }}
            >
              <span>Essor Consulting</span>
              <span>◆</span>
              <span>Casablanca, Maroc</span>
              <span>◆</span>
              <span>DDMRP Certifié</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
