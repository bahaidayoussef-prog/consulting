import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  IconHome,
  IconBriefcase,
  IconTools,
  IconSchool,
  IconMenu2,
  IconX,
  IconRuler2,
  IconCalculator,
  IconGauge,
  IconBuildingWarehouse,
  IconTruck,
  IconChartLine,
} from '@tabler/icons-react'
import { useMobileMenu } from '../contexts/MobileMenuContext'

const TOOLS_ITEMS = [
  { label: 'Dimensionnement entrepôt', href: '/outils/dimensionnement-entrepot', icon: IconRuler2 },
  { label: 'Coût global entrepôt', href: '/outils/cout-global-entrepot', icon: IconCalculator },
  { label: "Productivité engins & main d'œuvre", href: '/outils/productivite-engins-main-doeuvre', icon: IconGauge },
  { label: 'Démo WMS', href: '/demo/wms', icon: IconBuildingWarehouse },
  { label: 'Démo TMS', href: '/demo/tms', icon: IconTruck },
  { label: 'Démo APS', href: '/demo/aps', icon: IconChartLine },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function MobileTabBar() {
  const { pathname } = useLocation()
  const { menuOpen, setMenuOpen, toolsOpen, setToolsOpen } = useMobileMenu()

  const tabs = [
    { label: 'Accueil', href: '/', icon: IconHome, match: (p: string) => p === '/' },
    { label: 'Services', href: '/services', icon: IconBriefcase, match: (p: string) => p === '/services' },
    { label: 'Outils', icon: IconTools, action: () => setToolsOpen(!toolsOpen), match: (p: string) => p.startsWith('/outils') || p.startsWith('/demo') },
    { label: 'Formation', href: '/formation', icon: IconSchool, match: (p: string) => p === '/formation' },
    { label: 'Menu', icon: menuOpen ? IconX : IconMenu2, action: () => setMenuOpen(!menuOpen), match: () => false },
  ]

  return (
    <>
      <nav
        className="mobile-tab-bar"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 150,
          display: 'none',
          background: 'rgba(245,243,238,0.97)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          borderTop: '1px solid var(--border)',
        }}
      >
        {tabs.map((tab) => {
          const active = tab.match(pathname)
          const Icon = tab.icon
          const content = (
            <>
              <Icon size={22} stroke={1.6} color={active ? 'var(--blue-bright)' : 'var(--mid)'} />
              <span style={{ fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em', color: active ? 'var(--blue-bright)' : 'var(--mid)' }}>
                {tab.label}
              </span>
            </>
          )
          const itemStyle: React.CSSProperties = {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.65rem 0 0.55rem',
            background: 'none',
            border: 'none',
            textDecoration: 'none',
            cursor: 'pointer',
          }
          return tab.href ? (
            <Link key={tab.label} to={tab.href} style={itemStyle} onClick={() => { setMenuOpen(false); setToolsOpen(false) }}>
              {content}
            </Link>
          ) : (
            <button key={tab.label} style={itemStyle} onClick={tab.action} aria-label={tab.label}>
              {content}
            </button>
          )
        })}
      </nav>

      {/* Panneau "Outils" — bottom sheet */}
      <AnimatePresence>
        {toolsOpen && (
          <>
            <motion.div
              key="tools-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToolsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,32,0.4)', zIndex: 160 }}
              className="mobile-tools-backdrop"
            />
            <motion.div
              key="tools-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease }}
              className="mobile-tools-sheet"
              style={{
                position: 'fixed',
                left: 0, right: 0, bottom: 0,
                zIndex: 161,
                background: 'var(--paper)',
                borderTop: '1px solid var(--border)',
                padding: '1.5rem 1.25rem calc(1.5rem + 64px)',
                maxHeight: '75vh',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.6)' }}>
                  Outils gratuits
                </span>
                <button onClick={() => setToolsOpen(false)} aria-label="Fermer" style={{ background: 'none', border: 'none', padding: 0 }}>
                  <IconX size={20} color="var(--mid)" />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {TOOLS_ITEMS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => setToolsOpen(false)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      padding: '1rem',
                      textDecoration: 'none',
                      background: '#fff',
                      border: '1px solid rgba(27,53,84,0.08)',
                    }}
                  >
                    <Icon size={20} stroke={1.6} color="var(--blue-bright)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--navy)', lineHeight: 1.3 }}>{label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
