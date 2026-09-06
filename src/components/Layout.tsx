import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLenis } from '../hooks/useLenis'
import CustomCursor from './CustomCursor'
import Analytics from './Analytics'
import Nav from './Nav'
import Footer from './Footer'
import BackToTop from './BackToTop'
import MobileTabBar from './MobileTabBar'
import CookieBanner from './CookieBanner'
import FormationStickyBar from './FormationStickyBar'
import WhatsAppFab from './WhatsAppFab'
import { MobileMenuProvider } from '../contexts/MobileMenuContext'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function Statement({ text, bg = 'var(--ink)', accent = 'var(--navy)' }: { text: string; bg?: string; accent?: string }) {
  return (
    <div style={{ background: bg, padding: 'var(--sp-y-sm) var(--sp-x)', overflow: 'hidden' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 6.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            color: accent,
          }}
        >
          {text}
        </motion.div>
      </div>
    </div>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  useLenis()
  return (
    <MobileMenuProvider>
      <div className="grain">
        <ScrollToTop />
        <Analytics />
        <CustomCursor />
        <Nav />
        {children}
        <Footer />
        <BackToTop />
        <MobileTabBar />
        <FormationStickyBar />
        <CookieBanner />
        <WhatsAppFab />
      </div>
    </MobileMenuProvider>
  )
}
