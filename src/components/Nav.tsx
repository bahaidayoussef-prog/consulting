import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  IconRuler2,
  IconCalculator,
  IconGauge,
  IconBuildingWarehouse,
  IconTruck,
  IconChartLine,
  IconChevronDown,
} from '@tabler/icons-react'
import { useMobileMenu } from '../contexts/MobileMenuContext'

interface SimpleItem {
  label: string
  href: string
  disabled?: boolean
}

const CONSEIL_ITEMS: SimpleItem[] = [
  { label: 'Diagnostic & Conseil', href: '/conseil' },
  { label: 'DDMRP', href: '/conseil' },
  { label: 'Systèmes SI & IA', href: '/conseil' },
  { label: 'Direction SC à Temps Partagé', href: '/direction-supply-chain-temps-partage' },
  { label: 'FAQ', href: '/faq' },
]

const PRESTATIONS_ITEMS: SimpleItem[] = [
  { label: 'Pack Inventaire', href: '/prestations' },
  { label: 'Services Logistiques à Valeur Ajoutée', href: '/prestations' },
  { label: 'Imprimantes Leibinger', href: '/prestations' },
]

const TOOLS_ITEMS = [
  { label: 'Dimensionnement entrepôt', href: '/outils/dimensionnement-entrepot', icon: IconRuler2 },
  { label: 'Coût global entrepôt', href: '/outils/cout-global-entrepot', icon: IconCalculator },
  { label: "Productivité engins & main d'œuvre", href: '/outils/productivite-engins-main-doeuvre', icon: IconGauge },
  { label: 'Démo WMS', href: '/demo/wms', icon: IconBuildingWarehouse },
  { label: 'Démo TMS', href: '/demo/tms', icon: IconTruck },
  { label: 'Démo APS', href: '/demo/aps', icon: IconChartLine },
]

const CABINET_ITEMS: SimpleItem[] = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Références', href: '/references' },
]

type GroupId = 'cabinet' | 'conseil' | 'prestations' | 'outils'

// Ordre voulu : Formation en tête, puis Cabinet, Conseil, Prestations, Outils
// gratuits, Carrière et Ressources en liens directs (chacun n'a plus qu'une
// seule destination, un menu déroulant serait superflu).
type NavEntry =
  | { kind: 'dropdown'; id: GroupId; label: string }
  | { kind: 'link'; id: 'formation' | 'carriere' | 'ressources'; label: string; href: string }

const NAV_ENTRIES: NavEntry[] = [
  { kind: 'link', id: 'formation', label: 'Formation', href: '/formation' },
  { kind: 'dropdown', id: 'cabinet', label: 'Cabinet' },
  { kind: 'dropdown', id: 'conseil', label: 'Conseil' },
  { kind: 'dropdown', id: 'prestations', label: 'Prestations' },
  { kind: 'dropdown', id: 'outils', label: 'Outils gratuits' },
  { kind: 'link', id: 'carriere', label: 'Carrière', href: '/carriere' },
  { kind: 'link', id: 'ressources', label: 'Ressources', href: '/blog' },
]

function SimpleList({ items, onNavigate }: { items: SimpleItem[]; onNavigate: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 220 }}>
      {items.map((item) =>
        item.disabled ? (
          <span
            key={item.label}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.85rem',
              color: 'rgba(27,53,84,0.32)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            {item.label}
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.28)' }}>
              Bientôt
            </span>
          </span>
        ) : (
          <Link
            key={item.label}
            to={item.href}
            onClick={onNavigate}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.85rem',
              color: 'var(--navy)',
              textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(47,111,181,0.06)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--navy)' }}
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  )
}

function ToolsGrid({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', minWidth: 480, padding: '0.5rem' }}>
      {TOOLS_ITEMS.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          to={href}
          onClick={onNavigate}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1.25rem 1rem',
            textDecoration: 'none',
            border: '1px solid rgba(27,53,84,0.08)',
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(47,111,181,0.06)'
            el.style.borderColor = 'rgba(47,111,181,0.3)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.borderColor = 'rgba(27,53,84,0.08)'
          }}
        >
          <Icon size={22} stroke={1.6} color="var(--blue-bright)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--navy)', lineHeight: 1.35 }}>{label}</span>
        </Link>
      ))}
    </div>
  )
}

function NavGroup({ id, label, active, openId, setOpenId }: { id: GroupId; label: string; active: boolean; openId: GroupId | null; setOpenId: (id: GroupId | null) => void }) {
  const isOpen = openId === id
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenId(null), 160)
  }

  return (
    <li
      style={{ position: 'relative' }}
      onMouseEnter={() => { cancelClose(); setOpenId(id) }}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => setOpenId(isOpen ? null : id)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: active || isOpen ? 'var(--blue-bright)' : 'var(--mid)',
          background: 'none',
          border: 'none',
          padding: '4px 0',
          cursor: 'pointer',
          transition: 'color 0.2s',
        }}
      >
        {label}
        <IconChevronDown size={14} stroke={2} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 1.25rem)',
              left: 0,
              background: '#ffffff',
              border: '1px solid rgba(27,53,84,0.1)',
              boxShadow: '0 20px 50px rgba(10,20,32,0.14)',
              zIndex: 120,
            }}
          >
            {id === 'outils' ? (
              <ToolsGrid onNavigate={() => setOpenId(null)} />
            ) : (
              <SimpleList
                items={
                  id === 'conseil' ? CONSEIL_ITEMS
                    : id === 'prestations' ? PRESTATIONS_ITEMS
                    : CABINET_ITEMS
                }
                onNavigate={() => setOpenId(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function NavLinkItem({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <li>
      <Link
        to={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: active ? 'var(--blue-bright)' : 'var(--mid)',
          textDecoration: 'none',
          padding: '4px 0',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </Link>
    </li>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const { menuOpen, setMenuOpen } = useMobileMenu()

  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [openGroup, setOpenGroup] = useState<GroupId | null>(null)
  const navRef = useRef<HTMLElement>(null)

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

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const groupActive = (id: GroupId) => {
    if (id === 'conseil') return pathname === '/conseil' || pathname === '/services' || pathname === '/faq' || pathname === '/direction-supply-chain-temps-partage' || pathname === '/directeur-logistique-mi-temps' || pathname === '/directeur-achats-mi-temps' || pathname === '/dsc-vs-recrutement-cdi'
    if (id === 'prestations') return pathname === '/prestations'
    if (id === 'outils') return pathname.startsWith('/outils') || pathname.startsWith('/demo')
    if (id === 'cabinet') return pathname === '/a-propos' || pathname === '/references'
    return false
  }

  const linkActive = (id: 'formation' | 'carriere' | 'ressources') => {
    if (id === 'formation') return pathname === '/formation'
    if (id === 'carriere') return pathname === '/carriere'
    if (id === 'ressources') return pathname === '/blog'
    return false
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <motion.nav
        ref={navRef}
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
          <img
            src="/logo-lockup.png"
            alt="Nextinotech"
            width={484}
            height={160}
            style={{ height: 34, width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Desktop nav — groupes déroulants */}
        <ul className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem', listStyle: 'none' }}>
          {NAV_ENTRIES.map((entry) =>
            entry.kind === 'dropdown' ? (
              <NavGroup key={entry.id} id={entry.id} label={entry.label} active={groupActive(entry.id)} openId={openGroup} setOpenId={setOpenGroup} />
            ) : (
              <NavLinkItem key={entry.id} label={entry.label} href={entry.href} active={linkActive(entry.id)} />
            )
          )}
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
              Contact
            </Link>
          </li>
        </ul>
      </motion.nav>

      {/* Mobile overlay — groupe Cabinet + liens directs Carrière / Prestations /
          Ressources / FAQ / Contact (Formation, Conseil et Outils ont leur propre
          accès direct depuis la barre de navigation mobile) */}
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
              zIndex: 190,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '2rem 3rem',
              overflowY: 'auto',
            }}
          >
            <nav style={{ marginBottom: '2.5rem' }}>
              <Link
                to="/contact"
                className="mobile-nav-item"
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', textDecoration: 'none', color: 'var(--blue-bright)', marginBottom: '2.5rem' }}
              >
                Contact →
              </Link>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.4)', marginBottom: '0.75rem' }}>
                  Cabinet
                </div>
                {CABINET_ITEMS.map(({ label, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  >
                    <Link to={href} className="mobile-nav-item" onClick={() => setMenuOpen(false)} style={{ display: 'block', textDecoration: 'none' }}>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Carrière, Prestations, Ressources et FAQ : liens directs, plus de
                  destination propre pour justifier un sous-groupe (Prestations est
                  ajouté ici pour rester atteignable depuis le menu mobile, comme
                  Conseil ; auparavant seul Conseil l'était). */}
              {[
                { label: 'Carrière', href: '/carriere' },
                { label: 'Prestations', href: '/prestations' },
                { label: 'Ressources', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
              ].map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + (CABINET_ITEMS.length + i) * 0.06 }}
                >
                  <Link to={href} className="mobile-nav-item" onClick={() => setMenuOpen(false)} style={{ display: 'block', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </motion.div>
              ))}
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
                color: 'rgba(27,53,84,0.35)',
                display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
              }}
            >
              <span>Nextinotech</span>
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
