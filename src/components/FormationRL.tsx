import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from './PageMeta'
import SchemaScript from './SchemaHelper'

/* ─── Constants ─────────────────────────────────────────── */
const PHONE = '212663449200'
const WA_MSG = encodeURIComponent(
  'Bonjour Nextinotech, je souhaite réserver ma place pour la formation "Devenir Responsable Logistique". Pouvez-vous me communiquer les prochaines dates disponibles ?'
)
const WA_LINK = `https://wa.me/${PHONE}?text=${WA_MSG}`
const EMAIL_LINK = `mailto:contact@nextinotech.com?subject=Inscription%20formation%20Responsable%20Logistique`
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
  { icon: '🎓', label: 'Attestation officielle', desc: 'Attestation de participation Nextinotech' },
  { icon: '💬', label: 'Suivi 30 jours', desc: 'Support WhatsApp pour vos questions terrain post-formation' },
]

// Mêmes photos réelles que le carrousel hero de /formation (sessions passées,
// Casablanca) — réutilisées ici comme preuve terrain plutôt que dupliquées
// ou remplacées par des visuels génériques.
const PHOTOS_TERRAIN = [
  '/images/formation-carousel/formation-1.webp',
  '/images/formation-carousel/formation-2.webp',
  '/images/formation-carousel/formation-3.webp',
  '/images/formation-carousel/formation-4.webp',
  '/images/formation-carousel/formation-5.webp',
  '/images/formation-carousel/formation-6.webp',
  '/images/formation-carousel/formation-7.webp',
  '/images/formation-carousel/formation-8.webp',
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

/* ─── Schema.org ─────────────────────────────────────────── */
const courseSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': 'https://nextinotech.com/formation-rl/#course',
      name: 'Devenir Responsable Logistique',
      description: 'Formation intensive d\'une journée pour maîtriser les méthodes, les outils et les réflexes du pilotage logistique : fondamentaux, gestion des stocks, transport, pilotage de la performance, systèmes WMS/TMS/ERP.',
      provider: { '@type': 'Organization', name: 'Nextinotech', sameAs: 'https://nextinotech.com/' },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        courseWorkload: 'P1D',
        location: { '@type': 'Place', name: 'Hôtel 5 étoiles', address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' } },
      },
      offers: {
        '@type': 'Offer',
        price: 1500,
        priceCurrency: 'MAD',
        availability: 'https://schema.org/InStock',
        url: 'https://nextinotech.com/formation-rl/',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://nextinotech.com/formation-rl/#faq',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

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
        background: primary ? 'var(--blue-bright)' : 'transparent',
        border: `1px solid ${primary ? 'var(--blue-bright)' : 'rgba(47,111,181,0.4)'}`,
        color: primary ? '#ffffff' : 'var(--blue-bright)',
        fontFamily: 'Jost, sans-serif', fontSize: fs, fontWeight: 600,
        textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        primary ? (el.style.background = 'var(--navy)', el.style.borderColor = 'var(--navy)')
                : (el.style.background = 'var(--blue-bright)', el.style.color = '#ffffff')
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        primary ? (el.style.background = 'var(--blue-bright)', el.style.borderColor = 'var(--blue-bright)')
                : (el.style.background = 'transparent', el.style.color = 'var(--blue-bright)')
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
        fontFamily: 'Manrope, sans-serif',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em',
        color: 'var(--navy)',
      }}>
        {count.toLocaleString('fr-FR')}<span style={{ color: 'var(--blue-bright)', fontSize: '0.55em', marginLeft: '0.15em' }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--mid)', textTransform: 'uppercase', marginTop: '0.4rem' }}>
        {label}
      </div>
    </div>
  )
}

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'background 0.2s',
        background: open ? 'rgba(47,111,181,0.04)' : 'transparent',
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
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4, flex: 1 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: 'var(--blue-bright)', fontSize: '1.4rem', fontWeight: 300, flexShrink: 0, display: 'inline-block', lineHeight: 1 }}
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
            <p style={{ padding: '0 2rem 1.75rem 2rem', fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Cadre "infographie" — l'image garde son cadrage d'origine (objectFit: contain)
   pour ne jamais rogner les libellés qu'elle contient. */
function InfographicFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ background: '#ffffff', border: '1px solid var(--border)', padding: '1.25rem' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

/* Formulaire de téléchargement du programme — même service (Formspree) et
   même schéma de statut que le formulaire de /contact. Aucun fichier n'est
   généré ni promis instantanément : la confirmation annonce un envoi par
   email sous 24h, cohérent avec ce qui est réellement livrable aujourd'hui. */
type DownloadFormState = 'idle' | 'sending' | 'success' | 'error'

function DownloadForm() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', entreprise: '' })
  const [status, setStatus] = useState<DownloadFormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim()) e.nom = 'Obligatoire'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mqpzpqwj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          formulaire: 'Téléchargement programme — Devenir Responsable Logistique',
          nom: form.nom,
          email: form.email,
          téléphone: form.tel || 'Non renseigné',
          entreprise: form.entreprise || 'Non renseignée',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: '#ffffff',
    border: `1px solid ${errors[field] ? 'rgba(200,60,60,0.55)' : 'var(--border)'}`,
    padding: '0.85rem 1rem',
    color: 'var(--navy)',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  })

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: '#ffffff', border: '1px solid var(--border)', padding: '2.5rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
          Demande reçue.
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.7, margin: 0 }}>
          Nous vous envoyons le programme complet par email sous 24h.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div>
        <input
          type="text"
          placeholder="Nom complet *"
          value={form.nom}
          onChange={e => setForm({ ...form, nom: e.target.value })}
          style={inputStyle('nom')}
        />
        {errors.nom && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.nom}</div>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email professionnel *"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle('email')}
        />
        {errors.email && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.email}</div>}
      </div>
      <div className="frl-2col" style={{ gap: '1.1rem' }}>
        <input
          type="tel"
          placeholder="Téléphone (optionnel)"
          value={form.tel}
          onChange={e => setForm({ ...form, tel: e.target.value })}
          style={inputStyle('tel')}
        />
        <input
          type="text"
          placeholder="Entreprise (optionnel)"
          value={form.entreprise}
          onChange={e => setForm({ ...form, entreprise: e.target.value })}
          style={inputStyle('entreprise')}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '1rem 2rem', background: 'var(--blue-bright)', color: '#ffffff', border: 'none',
          fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700,
          letterSpacing: '0.03em', cursor: status === 'sending' ? 'default' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1, transition: 'background 0.2s, opacity 0.2s',
          marginTop: '0.25rem',
        }}
      >
        {status === 'sending' ? 'Envoi en cours…' : 'Recevoir le programme complet →'}
      </button>
      {status === 'error' && (
        <div style={{ fontSize: '0.8rem', color: '#c83c3c' }}>
          Une erreur est survenue. Réessayez, ou écrivez-nous directement à contact@nextinotech.com.
        </div>
      )}
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.06em', color: 'var(--mid)' }}>
        Vos coordonnées servent uniquement à vous envoyer le programme et à répondre à votre demande.
      </div>
    </form>
  )
}

/* ─── Main component ─────────────────────────────────────── */
export default function FormationRL() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showSticky, setShowSticky] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

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
        background: 'rgba(47,111,181,0.08)', border: '1px solid rgba(47,111,181,0.3)',
        padding: '0.4rem 1rem', marginBottom: '1.5rem',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2f6fb5', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)' }}>
        {PLACES} places disponibles — Prochaine session
      </span>
    </motion.div>
  )

  return (
    <div className="grain" style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--navy)' }}>
      <PageMeta
        title="Formation Responsable Logistique — 1 jour · 1 500 MAD · Hôtel 5★ Casablanca | Nextinotech"
        description="Formation intensive 1 journée pour devenir Responsable Logistique. Hôtel 5 étoiles Casablanca. 1 500 MAD tout inclus. Formateur 20+ ans terrain. Places limitées à 8 participants."
        canonical="https://nextinotech.com/formation-rl/"
      />
      <SchemaScript schema={courseSchema} />

      {/* ── STICKY CTA ─────────────────────────────────────── */}
      <div className={`frl-sticky${showSticky ? ' visible' : ''}`}>
        <div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>
            Devenir Responsable Logistique
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.15rem' }}>
            1 500 MAD · 1 journée · Hôtel 5★ · {PLACES} places restantes
          </div>
        </div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 2rem', background: 'var(--blue-bright)', color: '#ffffff',
            fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 700,
            textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--blue-bright)'}
        >
          Réserver ma place →
        </a>
      </div>

      {/* ── HERO — deux colonnes, photo pleinement visible ──── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp-y) var(--sp-x) var(--sp-y-sm)', position: 'relative', overflow: 'hidden' }}>
        {/* Halo d'ambiance — décoratif, ne recouvre jamais la photo */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,111,181,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="section-inner frl-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <UrgencyBadge />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '2rem' }}
            >
              Formation terrain · 1 journée · Casablanca · Hôtel 5★
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em',
                color: 'var(--navy)', margin: '0 0 2.5rem',
              }}
            >
              Devenir<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>
                Responsable
              </span><br />
              Logistique.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, maxWidth: 520, marginBottom: '3rem' }}
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

          {/* Photo — pleinement visible, aucun voile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: 'var(--paper)' }}>
              <img
                src="/images/formation-rl/hero.jpg"
                alt="Équipe Nextinotech animant une session de formation autour d'une visualisation supply chain"
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '38% 50%' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: 'var(--blue-bright)', padding: '1.25rem 1.75rem' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '0.3rem' }}>★ Programme phare</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>1 500 MAD TTC</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP — seule bande sombre de la page (même
          traitement "ink" que le Marquee de la page d'accueil) ──── */}
      <div style={{ background: 'var(--ink)', padding: '1.5rem var(--sp-x)', overflow: 'hidden' }}>
        <div className="section-inner" style={{ display: 'flex', gap: '2rem 3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {['20+ ans de terrain', '110+ missions réalisées', 'DDMRP Certified', 'TBS · ISCAE · ENCG · EMI', 'Task Force COVID-19', 'Hôtel 5★ inclus'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--blue-bright)', fontSize: '0.45rem' }}>◆</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.55)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── POUR QUI ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)', color: 'var(--navy)' }}>
        <div className="section-inner">
          <div className="frl-comp" style={{ marginBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
                01 / Pour qui
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
                Cette formation<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>est faite pour vous</span><br />
                si vous gérez des flux.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: 0.1 }}>
              <InfographicFrame src="/images/formation-rl/parcours-profils.jpg" alt="Trois profils progressant vers la Direction Supply Chain : technique, opérationnel, management stratégique" />
            </motion.div>
          </div>
          <div className="frl-cibles">
            {CIBLES.map((c, i) => (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: '#fff', padding: '2.5rem', borderLeft: '3px solid var(--blue-bright)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{c.titre}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME — timeline verticale ───────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
              02 / Programme de la journée
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
              8 h 30 — 17 h 30.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Dense. Concret. Terrain.</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--blue-bright), rgba(47,111,181,0.1))' }} />

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
                  background: item.type === 'module' ? 'var(--paper)' : 'transparent',
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-2.35rem', top: item.type === 'module' ? '1.75rem' : '1rem',
                  width: 10, height: 10, borderRadius: '50%',
                  background: item.type === 'module' ? 'var(--blue-bright)' : 'rgba(47,111,181,0.3)',
                  border: '2px solid #ffffff', flexShrink: 0,
                }} />

                {/* Time */}
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: item.type === 'module' ? 'var(--blue-bright)' : 'rgba(47,111,181,0.5)', minWidth: 56, paddingTop: '0.2rem', flexShrink: 0 }}>
                  {item.heure}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: item.desc ? '0.4rem' : 0 }}>
                    {item.num && (
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--blue-bright)', background: 'rgba(47,111,181,0.1)', padding: '0.15rem 0.5rem', flexShrink: 0 }}>
                        {item.num}
                      </span>
                    )}
                    <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: item.type === 'module' ? 600 : 400, color: item.type === 'module' ? 'var(--navy)' : 'var(--mid)', lineHeight: 1.3 }}>
                      {item.label}
                    </div>
                  </div>
                  {item.desc && item.type === 'module' && (
                    <p style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                      {item.desc}
                    </p>
                  )}
                  {item.desc && item.type === 'break' && item.desc && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--mid)', lineHeight: 1.5, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
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
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="frl-comp">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
                03 / Compétences acquises
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 2rem' }}>
                Ce que vous<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>maîtriserez</span><br />
                à la sortie.
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
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
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1.5rem', background: '#ffffff', borderLeft: '2px solid var(--blue-bright)' }}
                >
                  <span style={{ color: 'var(--blue-bright)', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', minWidth: 24, marginTop: '0.1rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--navy)', lineHeight: 1.5 }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DÉBOUCHÉS & CARRIÈRE ─────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)', color: 'var(--navy)' }}>
        <div className="section-inner">
          <div className="frl-comp">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <InfographicFrame src="/images/formation-rl/parcours-carriere.jpg" alt="Trajectoire de carrière en logistique : opérateur, planificateur, chef d'équipe, jusqu'à responsable logistique certifié" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
                04 / Débouchés & carrière
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1.5rem' }}>
                Un tremplin,<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>pas un aboutissement.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.25rem', maxWidth: 520 }}>
                Cette journée structure les compétences déjà acquises sur le terrain — coordination, gestion d'entrepôt, encadrement d'équipe transport — pour vous positionner sur un poste de Responsable Logistique.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, margin: '0 0 2.5rem', maxWidth: 520 }}>
                Pour poursuivre votre progression vers la Direction Supply Chain, Nextinotech propose deux prolongements naturels : le catalogue complet de formations, et l'accompagnement Direction Supply Chain à Temps Partagé pour les organisations déjà pilotées.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'flex-start' }}>
                <Link
                  to="/formation"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none' }}
                >
                  Voir le catalogue complet des formations →
                </Link>
                <Link
                  to="/direction-supply-chain-temps-partage"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none' }}
                >
                  Direction Supply Chain à Temps Partagé →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CE QUI EST INCLUS ─────────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
              05 / Ce qui est inclus
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
              1 500 MAD.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Tout inclus.</span>
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
                style={{ padding: '2.5rem 2rem', background: '#ffffff', borderTop: '2px solid var(--blue-bright)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.label}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{item.desc}</p>
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
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.5rem' }}>{d.label}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{d.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--mid)', marginTop: '0.35rem' }}>{d.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── APERÇU TERRAIN — mêmes photos réelles que le carrousel de /formation ── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
              06 / Aperçu terrain
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
              Nos sessions.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Telles qu'elles sont.</span>
            </h2>
          </motion.div>

          <div className="frl-photos">
            {PHOTOS_TERRAIN.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{ position: 'relative', paddingBottom: '75%', overflow: 'hidden', background: 'var(--paper)' }}
              >
                <img
                  src={src}
                  alt={`Session de formation Nextinotech — Casablanca (${i + 1}/${PHOTOS_TERRAIN.length})`}
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────────── */}
      <div style={{ background: 'rgba(47,111,181,0.05)', padding: '2.5rem var(--sp-x)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>
              Annulation sans frais jusqu'à 7 jours avant
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--mid)', fontWeight: 300 }}>
              Report possible à la session suivante. Si la session est annulée de notre côté — remboursement intégral immédiat, sans question.
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section style={{ background: 'var(--blue-bright)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
              {PLACES} places disponibles
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#ffffff', margin: '0 0 1rem' }}>
              Votre prochaine<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>session vous attend.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', fontWeight: 300, margin: 0, maxWidth: 440 }}>
              Places limitées à 16 participants pour garantir la qualité. Répondez maintenant pour sécuriser la vôtre.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '1.25rem 3rem', background: 'var(--navy)', color: '#fff',
                fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#12283f'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
            >
              Réserver via WhatsApp →
            </a>
            <a href={EMAIL_LINK} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Ou par email → contact@nextinotech.com
            </a>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: '0.5rem' }}>
              Réponse sous 24h · Aucun engagement avant confirmation écrite
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
              07 / Questions fréquentes
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
              Vos questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>nos réponses.</span>
            </h2>
          </motion.div>

          <div style={{ border: '1px solid var(--border)' }}>
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* ── TÉLÉCHARGER LE PROGRAMME ──────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner" style={{ maxWidth: 620 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
              08 / Programme complet
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1rem' }}>
              Recevez le programme<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>détaillé par email.</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
              Renseignez vos coordonnées, nous vous envoyons le déroulé complet de la journée (modules, horaires, tarifs) sous 24h.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
            <DownloadForm />
          </motion.div>
        </div>
      </section>

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
