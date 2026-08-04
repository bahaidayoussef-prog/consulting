import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/* ─── Constants ─────────────────────────────────────────── */
const PHONE = '212663449200'
const WA_MSG = encodeURIComponent(
  'Bonjour Essor Consulting, je souhaite réserver ma place pour la formation "Devenir Responsable Logistique". Pouvez-vous me communiquer les prochaines dates disponibles ?'
)
const WA_LINK = `https://wa.me/${PHONE}?text=${WA_MSG}`
const EMAIL_LINK = `mailto:essor.consulting.maroc@gmail.com?subject=Inscription%20formation%20Responsable%20Logistique`
const PLACES = 5

/* ─── Data ───────────────────────────────────────────────── */
const CIBLES = [
  { icon: '📦', titre: 'Coordinateur logistique', desc: 'Vous gérez des flux au quotidien et voulez structurer vos méthodes pour évoluer vers un rôle de responsable.' },
  { icon: '🏭', titre: 'Responsable de site / entrepôt', desc: 'Vous pilotez des opérations mais manquez d\'outils et d\'indicateurs pour prendre les bonnes décisions.' },
  { icon: '🚛', titre: "Chef d'équipe transport", desc: 'Vous supervisez les livraisons et souhaitez maîtriser la gestion globale de la chaîne logistique.' },
  { icon: '💼', titre: 'DG / DAF de PME', desc: 'Vous gérez directement la logistique de votre entreprise sans formation spécifique et voulez combler ce manque.' },
]

const PROGRAMME = [
  { heure: '08 h 30', label: 'Accueil & petit-déjeuner', desc: 'Tour de table, objectifs de la journée, diagnostic de départ', type: 'break' },
  { heure: '09 h 00', label: 'Module 1 — Fondamentaux logistiques', desc: 'Flux physiques et informationnels. Organisation et organigramme type. Rôle, responsabilités et KPIs du Responsable Logistique.', type: 'module', num: '01' },
  { heure: '10 h 30', label: 'Pause café', desc: '', type: 'break' },
  { heure: '10 h 45', label: 'Module 2 — Gestion des stocks & approvisionnements', desc: 'Politiques de stock. Calcul de couverture et point de commande. DDMRP : principes et mise en oeuvre. Éviter les ruptures et surstock.', type: 'module', num: '02' },
  { heure: '12 h 00', label: 'Module 3 — Transport & schéma logistique', desc: 'Organisation transport : compte propre vs 3PL. Incoterms essentiels. Optimisation des coûts de transport. Appel d\'offre transport.', type: 'module', num: '03' },
  { heure: '13 h 00', label: 'Déjeuner — Restaurant de l\'hôtel', desc: 'Déjeuner gastronomique inclus', type: 'break' },
  { heure: '14 h 00', label: 'Module 4 — Pilotage de la performance', desc: 'Les 12 KPIs indispensables du RL. Construction d\'un tableau de bord opérationnel. Reporting direction : fréquence, format, contenu.', type: 'module', num: '04' },
  { heure: '15 h 30', label: 'Pause café', desc: '', type: 'break' },
  { heure: '15 h 45', label: 'Module 5 — Systèmes & outils (WMS · TMS · ERP)', desc: 'Cartographie des solutions marché. Comment choisir, paramétrer, réussir l\'AMOA. Les pièges des projets SI logistique.', type: 'module', num: '05' },
  { heure: '16 h 45', label: 'Atelier — Cas pratique terrain', desc: 'Cas réel d\'une PME marocaine (anonymisé). Construction de votre plan d\'action personnel à 90 jours.', type: 'module', num: '06' },
  { heure: '17 h 30', label: 'Clôture & attestations', desc: 'Questions libres. Remise des attestations de participation.', type: 'break' },
]

const COMPETENCES = [
  'Concevoir un schéma logistique adapté à votre contexte',
  'Calculer et piloter les stocks avec les bons paramètres',
  'Négocier et évaluer vos prestataires transport (3PL)',
  'Construire un tableau de bord logistique opérationnel',
  'Choisir et paramétrer un WMS, TMS ou ERP logistique',
  'Manager et animer une équipe logistique au quotidien',
]

const INCLUS = [
  { icon: '🏨', label: 'Venue 5 étoiles', desc: 'Salle de formation équipée dans un hôtel 5★ Casablanca' },
  { icon: '☕', label: 'Pauses & viennoiseries', desc: 'Deux pauses café avec collations' },
  { icon: '🍽️', label: 'Déjeuner gastronomique', desc: 'Repas complet au restaurant de l\'hôtel' },
  { icon: '📋', label: 'Support de formation', desc: 'Guide terrain de 60+ pages à emporter' },
  { icon: '🎓', label: 'Attestation officielle', desc: 'Attestation de participation Essor Consulting' },
  { icon: '💬', label: 'Suivi 30 jours', desc: 'Support WhatsApp pour vos questions terrain post-formation' },
]

const FAQS = [
  {
    q: 'Dois-je avoir une expérience logistique préalable ?',
    a: 'Non. La formation est accessible dès lors que vous gérez ou allez gérer des flux (stock, transport, entrepôt). Elle est conçue pour un niveau opérationnel à managérial, sans prérequis technique. Le cas pratique final s\'adapte au contexte de chaque participant.',
  },
  {
    q: 'La formation est-elle éligible à la formation professionnelle (OFPPT / GIAC) ?',
    a: 'Une convention de formation vous est remise à l\'inscription pour toute prise en charge par votre entreprise ou votre OPCA. Nous accompagnons les DRH dans le montage du dossier de remboursement.',
  },
  {
    q: 'Y a-t-il une formation intra-entreprise pour plusieurs collaborateurs ?',
    a: 'Oui. Pour 5 participants ou plus de la même entreprise, nous organisons la formation dans vos locaux ou à l\'hôtel de votre choix, avec une adaptation du cas pratique à votre secteur. Contactez-nous pour un devis.',
  },
  {
    q: 'Quelles sont les prochaines dates disponibles ?',
    a: 'Les sessions sont planifiées selon les inscriptions reçues. Envoyez-nous votre demande via WhatsApp ou email — nous vous confirmons la prochaine date sous 24h et vous réservons une place si des places sont disponibles.',
  },
  {
    q: 'Quelle est votre politique d\'annulation ?',
    a: 'Annulation gratuite jusqu\'à 7 jours avant la session. Après ce délai, possibilité de reporter sur la session suivante sans frais. En cas d\'annulation de notre part (session insuffisamment remplie), remboursement intégral immédiat.',
  },
]

/* ─── Hooks ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, target, duration])
  return count
}

/* ─── Sub-components ─────────────────────────────────────── */
function CTAButton({ children, href, primary = true, large = false }: {
  children: ReactNode; href: string; primary?: boolean; large?: boolean
}) {
  const pad = large ? '1.25rem 3rem' : '1rem 2.5rem'
  const fs = large ? '1rem' : '0.9rem'
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: pad,
        background: primary ? 'var(--gold)' : 'transparent',
        border: `1px solid ${primary ? 'var(--gold)' : 'rgba(192,154,47,0.4)'}`,
        color: primary ? '#0a1420' : 'var(--gold)',
        fontFamily: 'Jost, sans-serif', fontSize: fs, fontWeight: 600,
        textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        primary ? (el.style.background = '#a8841f', el.style.borderColor = '#a8841f')
                : (el.style.background = 'var(--gold)', el.style.color = '#0a1420')
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        primary ? (el.style.background = 'var(--gold)', el.style.borderColor = 'var(--gold)')
                : (el.style.background = 'transparent', el.style.color = 'var(--gold)')
      }}
    >
      {children}
    </a>
  )
}

function StatCounter({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) {
  const count = useCountUp(value, 1600, trigger)
  return (
    <div>
      <div style={{
        fontFamily: 'Bodoni Moda, serif',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em',
        color: '#f0ede8',
      }}>
        {count.toLocaleString('fr-FR')}<span style={{ color: 'var(--gold)', fontSize: '0.55em', marginLeft: '0.15em' }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(192,154,47,0.5)', textTransform: 'uppercase', marginTop: '0.4rem' }}>
        {label}
      </div>
    </div>
  )
}

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        transition: 'background 0.2s',
        background: open ? 'rgba(192,154,47,0.04)' : 'transparent',
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.75rem 2rem', gap: '1.5rem',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#f0ede8', lineHeight: 1.4, flex: 1 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 300, flexShrink: 0, display: 'inline-block', lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="frl-faq-body"
          >
            <p style={{ padding: '0 2rem 1.75rem 2rem', fontSize: '0.875rem', color: 'rgba(240,237,232,0.48)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────── */
export default function FormationRL() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showSticky, setShowSticky] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  /* Meta update */
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Formation Responsable Logistique — 1 jour · 1 500 MAD · Hôtel 5★ Casablanca | Essor Consulting'
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', 'Formation intensive 1 journée pour devenir Responsable Logistique. Hôtel 5 étoiles Casablanca. 1 500 MAD tout inclus. Formateur 20+ ans terrain. Places limitées à 8 participants.')
    return () => {
      document.title = prevTitle
      meta?.setAttribute('content', prevDesc)
    }
  }, [])

  /* Sticky CTA on scroll */
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Urgency badge ── */
  const UrgencyBadge = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: 'rgba(192,154,47,0.12)', border: '1px solid rgba(192,154,47,0.4)',
        padding: '0.4rem 1rem', marginBottom: '1.5rem',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c09a2f', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>
        {PLACES} places disponibles — Prochaine session
      </span>
    </motion.div>
  )

  return (
    <div className="grain" style={{ background: '#0a1420', minHeight: '100vh', color: '#f0ede8' }}>

      {/* ── STICKY CTA ─────────────────────────────────────── */}
      <div className={`frl-sticky${showSticky ? ' visible' : ''}`}>
        <div>
          <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1rem', fontWeight: 700, color: '#f0ede8' }}>
            Devenir Responsable Logistique
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.6)', marginTop: '0.15rem' }}>
            1 500 MAD · 1 journée · Hôtel 5★ · {PLACES} places restantes
          </div>
        </div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 2rem', background: 'var(--gold)', color: '#0a1420',
            fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 700,
            textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#a8841f'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--gold)'}
        >
          Réserver ma place →
        </a>
      </div>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem var(--sp-x)',
        background: 'rgba(10,20,32,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.05rem', fontWeight: 800, color: '#f0ede8', letterSpacing: '-0.01em' }}>
            Essor Consulting
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '0.1rem' }}>
            ← Retour au site
          </div>
        </a>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <CTAButton href={EMAIL_LINK} primary={false}>Par email</CTAButton>
          <CTAButton href={WA_LINK}>WhatsApp →</CTAButton>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--sp-y) var(--sp-x) var(--sp-y-sm)', position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/hero-warehouse.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.1, filter: 'grayscale(100%)',
        }} />
        {/* Gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a1420 55%, rgba(10,20,32,0.6) 100%)' }} />
        {/* Gold orb */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,154,47,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          {/* Tag */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <UrgencyBadge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.5)', marginBottom: '2rem' }}
          >
            Formation terrain · 1 journée · Casablanca · Hôtel 5★
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Bodoni Moda, serif',
              fontSize: 'clamp(3.5rem, 8vw, 9rem)',
              fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.025em',
              color: '#f0ede8', margin: '0 0 2.5rem', maxWidth: 920,
            }}
          >
            Devenir<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>
              Responsable
            </span><br />
            Logistique.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(235,232,225,0.65)', lineHeight: 1.8, fontWeight: 300, maxWidth: 560, marginBottom: '3rem' }}
          >
            Une journée intensive pour maîtriser les méthodes, les outils et les réflexes du pilotage logistique. Animée par un expert avec 20+ ans de terrain au Maroc et en Europe. Tout inclus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <CTAButton href={WA_LINK} large>Réserver via WhatsApp →</CTAButton>
            <CTAButton href={EMAIL_LINK} primary={false} large>Par email</CTAButton>
          </motion.div>

          {/* ── STATS COUNTER ── */}
          <div ref={statsRef} className="frl-hero-stats">
            <StatCounter value={1500} suffix=" MAD" label="TTC par participant" trigger={statsInView} />
            <StatCounter value={1} suffix=" jour" label="8h30 → 17h30" trigger={statsInView} />
            <StatCounter value={20} suffix="+" label="Ans de terrain" trigger={statsInView} />
            <StatCounter value={110} suffix="+" label="Missions réalisées" trigger={statsInView} />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <div style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem var(--sp-x)', overflow: 'hidden' }}>
        <div className="section-inner" style={{ display: 'flex', gap: '2rem 3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {['20+ ans de terrain', '110+ missions réalisées', 'DDMRP Certified', 'TBS · ISCAE · ENCG · EMI', 'Task Force COVID-19', 'Hôtel 5★ inclus'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.45rem' }}>◆</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(227,226,226,0.4)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── POUR QUI ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)', color: '#0a1420' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '1.5rem' }}>
              01 / Pour qui
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#0a1420', margin: 0 }}>
              Cette formation<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>est faite pour vous</span><br />
              si vous gérez des flux.
            </h2>
          </motion.div>
          <div className="frl-cibles">
            {CIBLES.map((c, i) => (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: '#fff', padding: '2.5rem', borderLeft: '3px solid var(--gold)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.2rem', fontWeight: 700, color: '#0a1420', marginBottom: '0.75rem', lineHeight: 1.2 }}>{c.titre}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(10,20,32,0.58)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME — timeline verticale ───────────────────── */}
      <section style={{ background: '#0a1420', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
              02 / Programme de la journée
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#f0ede8', margin: 0 }}>
              8 h 30 — 17 h 30.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Dense. Concret. Terrain.</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--gold), rgba(192,154,47,0.1))' }} />

            {PROGRAMME.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
                style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  padding: item.type === 'module' ? '1.5rem 2rem' : '0.9rem 2rem',
                  marginBottom: '2px',
                  background: item.type === 'module' ? '#0d1e30' : 'transparent',
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-2.35rem', top: item.type === 'module' ? '1.75rem' : '1rem',
                  width: 10, height: 10, borderRadius: '50%',
                  background: item.type === 'module' ? 'var(--gold)' : 'rgba(192,154,47,0.3)',
                  border: '2px solid #0a1420', flexShrink: 0,
                }} />

                {/* Time */}
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: item.type === 'module' ? 'rgba(192,154,47,0.8)' : 'rgba(192,154,47,0.35)', minWidth: 56, paddingTop: '0.2rem', flexShrink: 0 }}>
                  {item.heure}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: item.desc ? '0.4rem' : 0 }}>
                    {item.num && (
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--gold)', background: 'rgba(192,154,47,0.1)', padding: '0.15rem 0.5rem', flexShrink: 0 }}>
                        {item.num}
                      </span>
                    )}
                    <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: item.type === 'module' ? 600 : 400, color: item.type === 'module' ? '#f0ede8' : 'rgba(227,226,226,0.4)', lineHeight: 1.3 }}>
                      {item.label}
                    </div>
                  </div>
                  {item.desc && item.type === 'module' && (
                    <p style={{ fontSize: '0.82rem', color: 'rgba(227,226,226,0.45)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                      {item.desc}
                    </p>
                  )}
                  {item.desc && item.type === 'break' && item.desc && (
                    <p style={{ fontSize: '0.75rem', color: 'rgba(227,226,226,0.25)', lineHeight: 1.5, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPÉTENCES ──────────────────────────────────────── */}
      <section style={{ background: '#060e18', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="frl-comp">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
                03 / Compétences acquises
              </div>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.2rem, 4vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: '#f0ede8', margin: '0 0 2rem' }}>
                Ce que vous<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>maîtriserez</span><br />
                à la sortie.
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'rgba(240,237,232,0.48)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                Pas de théorie abstraite. Des compétences directement applicables le lendemain matin, dans votre propre contexte.
              </p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {COMPETENCES.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1.5rem', background: '#0d1e30', borderLeft: '2px solid var(--gold)' }}
                >
                  <span style={{ color: 'var(--gold)', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', minWidth: 24, marginTop: '0.1rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#f0ede8', lineHeight: 1.5 }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATEUR ────────────────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)', color: '#0a1420' }}>
        <div className="section-inner">
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '3rem' }}>
            04 / Votre formateur
          </div>
          <div className="frl-prof">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: 'relative' }}>
              <div style={{ width: '100%', paddingBottom: '120%', background: '#0a1420', overflow: 'hidden', position: 'relative' }}>
                <img src="/images/conseil.jpg" alt="Formateur Essor Consulting" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,32,0.35) 0%, transparent 60%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', background: 'var(--gold)', padding: '1.5rem 2rem' }}>
                <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '2.2rem', fontWeight: 800, color: '#0a1420', lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.65)', marginTop: '0.25rem' }}>ans terrain</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2rem, 3.5vw, 4rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: '#0a1420', margin: '0 0 0.5rem' }}>
                Youssef<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>— Fondateur, Essor Consulting</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(10,20,32,0.6)', lineHeight: 1.8, fontWeight: 300, margin: '1.5rem 0 2.5rem', maxWidth: 540 }}>
                Expert Supply Chain & Logistique avec plus de 20 ans de missions terrain au Maroc et en Europe. DDMRP Certified Practitioner. Expert national COVID-19. Intervenant dans les grandes écoles marocaines.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'DDMRP Certified Practitioner — Demand Driven Institute',
                  'Intervenant : TBS · ISCAE · HEM · ENCG · EMI',
                  'Références : Renault-Nissan · L\'Oréal · Nestlé · OCP · DHL · Addoha',
                  '110+ missions de conseil Supply Chain — Maroc & Europe',
                  'Expert national Supply Chain — Task Force Vaccination COVID-19',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--gold)', marginTop: '0.35rem', fontSize: '0.45rem', flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(10,20,32,0.65)', fontWeight: 400, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CE QUI EST INCLUS ─────────────────────────────────── */}
      <section style={{ background: '#0a1420', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
              05 / Ce qui est inclus
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#f0ede8', margin: 0 }}>
              1 500 MAD.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Tout inclus.</span>
            </h2>
          </motion.div>

          <div className="frl-inclus" style={{ marginBottom: '4rem' }}>
            {INCLUS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                style={{ padding: '2.5rem 2rem', background: '#0d1e30', borderTop: '2px solid var(--gold)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#f0ede8', marginBottom: '0.5rem' }}>{item.label}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(240,237,232,0.48)', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Logistics grid */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="frl-logistics">
            {[
              { label: 'Lieu', value: 'Hôtel 5 étoiles', detail: 'Casablanca — précisé à l\'inscription' },
              { label: 'Durée', value: '1 journée', detail: '8 h 30 → 17 h 30' },
              { label: 'Groupe', value: '8 à 16', detail: 'Participants maximum' },
              { label: 'Langue', value: 'Français', detail: 'Cas en contexte marocain' },
            ].map(d => (
              <div key={d.label}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '0.5rem' }}>{d.label}</div>
                <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.6rem', fontWeight: 700, color: '#f0ede8', lineHeight: 1 }}>{d.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(240,237,232,0.48)', marginTop: '0.35rem' }}>{d.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────────── */}
      <div style={{ background: '#0d1e30', padding: '2.5rem var(--sp-x)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-inner" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <div>
            <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.1rem', fontWeight: 700, color: '#f0ede8', marginBottom: '0.35rem' }}>
              Annulation sans frais jusqu'à 7 jours avant
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(240,237,232,0.48)', fontWeight: 300 }}>
              Report possible à la session suivante. Si la session est annulée de notre côté — remboursement intégral immédiat, sans question.
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA DORÉ ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--gold)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.5)', marginBottom: '1rem' }}>
              {PLACES} places disponibles
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#0a1420', margin: '0 0 1rem' }}>
              Votre prochaine<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>session vous attend.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(10,20,32,0.6)', fontWeight: 300, margin: 0, maxWidth: 440 }}>
              Places limitées à 16 participants pour garantir la qualité. Répondez maintenant pour sécuriser la vôtre.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '1.25rem 3rem', background: '#0a1420', color: '#fff',
                fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#1b3554'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0a1420'}
            >
              Réserver via WhatsApp →
            </a>
            <a href={EMAIL_LINK} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.5)', textDecoration: 'none' }}>
              Ou par email → essor.consulting.maroc@gmail.com
            </a>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.4)', marginTop: '0.5rem' }}>
              Réponse sous 24h · Aucun engagement avant confirmation écrite
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section style={{ background: '#0d1e30', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
              06 / Questions fréquentes
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#f0ede8', margin: 0 }}>
              Vos questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>nos réponses.</span>
            </h2>
          </motion.div>

          <div style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: '#060e18', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem var(--sp-x)' }}>
        <div className="section-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.1rem', fontWeight: 800, color: '#f0ede8' }}>Essor Consulting</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.48)', marginTop: '0.3rem' }}>
              Casablanca, Maroc · essor.consulting.maroc@gmail.com · +212 06 63 44 92 00
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.48)', textDecoration: 'none' }}>← Retour au site principal</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>WhatsApp →</a>
          </div>
        </div>
      </footer>

      {/* ── Pulse animation ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  )
}
