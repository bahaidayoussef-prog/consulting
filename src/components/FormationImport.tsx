import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from './PageMeta'
import SchemaScript from './SchemaHelper'

/* ─── Constants ─────────────────────────────────────────── */
const PHONE = '212663449200'
const WA_MSG = encodeURIComponent(
  'Bonjour Nextinotech, je souhaite réserver ma place pour la formation "Réussir sa Première Importation". Pouvez-vous me communiquer les prochaines dates disponibles ?'
)
const WA_LINK = `https://wa.me/${PHONE}?text=${WA_MSG}`
const EMAIL_LINK = `mailto:contact@nextinotech.com?subject=Inscription%20formation%20Premi%C3%A8re%20Importation`
const PLACES = 5

/* ─── Data ───────────────────────────────────────────────── */
const CIBLES = [
  { icon: '🛍️', titre: 'Porteur de projet e-commerce', desc: 'Vous voulez vendre des produits en ligne et devez sécuriser votre approvisionnement à l’international.' },
  { icon: '🏪', titre: 'Commerçant en diversification', desc: 'Vous avez déjà un point de vente et voulez importer directement plutôt que de passer par un grossiste.' },
  { icon: '📦', titre: 'Futur importateur indépendant', desc: "Vous avez identifié une opportunité produit mais ne savez pas par où commencer pour importer légalement." },
  { icon: '💼', titre: 'Entrepreneur en phase de lancement', desc: 'Vous montez votre business plan et devez chiffrer précisément votre prix de revient import avant de vous lancer.' },
]

const PROGRAMME = [
  { heure: '08 h 30', label: 'Accueil & petit-déjeuner', desc: 'Tour de table, présentation des projets de chacun, objectifs de la journée', type: 'break' },
  { heure: '09 h 00', label: 'Module 1 — Identifier son besoin et cadrer son projet', desc: "Définir son produit, son marché cible et son budget. Business model import : revente, marketplace, boutique physique.", type: 'module', num: '01' },
  { heure: '10 h 15', label: 'Pause café', desc: '', type: 'break' },
  { heure: '10 h 30', label: 'Module 2 — Calculer son prix de revient réel', desc: 'Méthode complète : coût produit + fret + assurance + douane + frais annexes + marge cible. Simulateur Excel fourni.', type: 'module', num: '02' },
  { heure: '12 h 00', label: 'Module 3 — Trouver et sécuriser ses fournisseurs', desc: "Sourcing (plateformes B2B, salons, réseau), vérifier le sérieux d'un fournisseur, négocier, sécuriser son paiement.", type: 'module', num: '03' },
  { heure: '13 h 00', label: "Déjeuner — Restaurant de l'hôtel", desc: 'Déjeuner gastronomique inclus', type: 'break' },
  { heure: '14 h 00', label: 'Module 4 — Transport, transitaires & assurance', desc: 'Maritime vs routier selon le produit. Incoterms essentiels. Rôle du transitaire. Assurance marchandise.', type: 'module', num: '04' },
  { heure: '15 h 15', label: 'Pause café', desc: '', type: 'break' },
  { heure: '15 h 30', label: 'Module 5 — Douane : nomenclature et optimisation', desc: 'Système Harmonisé, calcul des droits et taxes, régimes suspensifs, exonérations légales, pièges fréquents.', type: 'module', num: '05' },
  { heure: '16 h 30', label: 'Module 6 — Réception, stockage & plan d’action', desc: "Contrôle qualité à réception, documentation à conserver, organiser son stockage. Atelier : chiffrer votre propre projet.", type: 'module', num: '06' },
  { heure: '17 h 15', label: 'Clôture & attestations', desc: 'Questions libres. Remise des attestations de participation.', type: 'break' },
]

const COMPETENCES = [
  "Cadrer un projet d'importation réaliste, du besoin au budget",
  'Calculer un prix de revient import fiable, sans mauvaise surprise',
  'Trouver et évaluer des fournisseurs internationaux sérieux',
  'Choisir son transport et son transitaire selon son produit',
  "Calculer ses droits de douane et connaître ses leviers d'optimisation légale",
  'Réceptionner et stocker sa première marchandise sans erreur',
]

const INCLUS = [
  { icon: '🏨', label: 'Venue 5 étoiles', desc: 'Salle de formation équipée dans un hôtel 5★ Casablanca' },
  { icon: '☕', label: 'Pauses & viennoiseries', desc: 'Deux pauses café avec collations' },
  { icon: '🍽️', label: 'Déjeuner gastronomique', desc: 'Repas complet au restaurant de l’hôtel' },
  { icon: '📊', label: 'Simulateur prix de revient', desc: 'Fichier Excel réutilisable pour vos futurs imports' },
  { icon: '🎓', label: 'Attestation officielle', desc: 'Attestation de participation Nextinotech' },
  { icon: '💬', label: 'Suivi 30 jours', desc: 'Support WhatsApp pour vos questions terrain post-formation' },
]

/* ─── FAQ + Schema.org — source partagée ── */
import { IMPORT_FAQ as FAQS, importCourseSchema as courseSchema } from '../data/formations'

/* ─── Hooks ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let rafId: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [trigger, target, duration])
  return count
}

/* ─── Variants pour listes animées — un seul IntersectionObserver par
   section (whileInView + staggerChildren) plutôt qu'un par élément. ── */
const listContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const listItemVariantsY = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}
const listContainerVariantsFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
}
const listItemVariantsX = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
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

/* Cadre photo — même traitement que /formation-rl (fond blanc, bordure, image
   contenue). Réutilise des photos existantes du site : aucune photo de session
   n'existe encore pour ce programme jamais donné, donc pas de galerie "aperçu
   terrain" ici — voir note en fin de fichier. */
function FramedPhoto({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div style={{ background: '#ffffff', border: '1px solid var(--border)', padding: '1.25rem' }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}

/* Formulaire de téléchargement du programme — Formspree, même schéma que
   /formation-rl et /contact. */
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
          formulaire: 'Téléchargement programme — Réussir sa Première Importation',
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

/* ─── Section Inscription — Formspree + fetch, mêmes principes que
   /formation-rl (pas d'iframe, pas de pièce jointe). ── */
const smallBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', padding: '0.7rem 1.4rem',
  fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em',
  textTransform: 'uppercase', textDecoration: 'none',
}

function InscriptionSection() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', entreprise: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim()) e.nom = 'Obligatoire'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.tel.trim()) e.tel = 'Obligatoire'
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
          formulaire: 'Inscription formation — Réussir sa Première Importation',
          formation: 'Réussir sa Première Importation — 1 jour, Casablanca, 1 500 MAD TTC',
          nom: form.nom,
          email: form.email,
          téléphone: form.tel,
          entreprise: form.entreprise || 'Non renseignée',
          message: form.message || 'Aucun',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', background: '#ffffff',
    border: `1px solid ${errors[field] ? 'rgba(200,60,60,0.55)' : 'var(--border)'}`,
    padding: '0.85rem 1rem', color: 'var(--navy)', fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  })

  return (
    <section id="inscription" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <div className="section-inner" style={{ maxWidth: 640 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1rem' }}>
          Inscription
        </div>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1rem' }}>
          S&apos;inscrire à la formation.
        </h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300, margin: '0 0 2.5rem' }}>
          1 500 MAD TTC par participant. Remplissez le formulaire ci-dessous.
          Nous vous confirmons votre place par email sous 24h.
        </p>

        {status === 'success' ? (
          <div style={{ background: '#ffffff', border: '1px solid var(--blue-bright)', padding: '2.5rem' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>✅</div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 0.6rem' }}>
              Demande d&apos;inscription envoyée.
            </h3>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, margin: 0 }}>
              Nous vous confirmons votre place par email sous 24h. Merci de nous transmettre votre preuve de
              paiement à contact@nextinotech.com ou via WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {status === 'error' && (
              <div style={{ background: 'rgba(200,60,60,0.06)', border: '1px solid rgba(200,60,60,0.4)', padding: '0.9rem 1.1rem', fontSize: '0.82rem', color: '#c83c3c', lineHeight: 1.6 }}>
                L&apos;envoi n&apos;a pas abouti. Réessayez, ou écrivez-nous directement à contact@nextinotech.com
                (WhatsApp possible).
              </div>
            )}

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
                placeholder="Email *"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle('email')}
              />
              {errors.email && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.email}</div>}
            </div>
            <div className="frl-2col" style={{ gap: '1.1rem' }}>
              <div>
                <input
                  type="tel"
                  placeholder="Téléphone *"
                  value={form.tel}
                  onChange={e => setForm({ ...form, tel: e.target.value })}
                  style={inputStyle('tel')}
                />
                {errors.tel && <div style={{ fontSize: '0.72rem', color: '#c83c3c', marginTop: '0.3rem' }}>{errors.tel}</div>}
              </div>
              <input
                type="text"
                placeholder="Entreprise (optionnel)"
                value={form.entreprise}
                onChange={e => setForm({ ...form, entreprise: e.target.value })}
                style={inputStyle('entreprise')}
              />
            </div>

            <textarea
              placeholder="Message (optionnel)"
              rows={3}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle('message'), resize: 'vertical' }}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 2rem', background: 'var(--blue-bright)', color: '#ffffff', border: 'none', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.03em', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon inscription →'}
            </button>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.06em', color: 'var(--mid)', lineHeight: 1.6 }}>
              Envoi vers contact@nextinotech.com. Vos données servent uniquement au traitement de votre inscription.
            </div>
          </form>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)' }}>Ou directement :</span>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ ...smallBtn, background: 'var(--blue-bright)', color: '#ffffff', border: '1px solid var(--blue-bright)' }}>WhatsApp</a>
          <a href={EMAIL_LINK} style={{ ...smallBtn, background: 'transparent', color: 'var(--navy)', border: '1px solid var(--border)' }}>Par email</a>
        </div>
      </div>
    </section>
  )
}

/* ── Urgency badge — hors du composant principal pour garder une identité
   stable entre les re-renders (voir /formation-rl pour l'explication). ── */
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

/* ─── Main component ─────────────────────────────────────── */
export default function FormationImport() {
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

  return (
    <div className="grain" style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--navy)' }}>
      <PageMeta
        title="Formation Réussir sa Première Importation | Nextinotech"
        description="Formation import 1 jour à Casablanca pour porteurs de projet : prix de revient, fournisseurs, transport, douane, nomenclature, stockage. 1 500 MAD tout inclus."
        canonical="https://nextinotech.com/formation-import"
      />
      <SchemaScript schema={courseSchema} />

      {/* ── STICKY CTA ─────────────────────────────────────── */}
      <div className={`frl-sticky${showSticky ? ' visible' : ''}`}>
        <div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>
            Réussir sa Première Importation
          </div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.15rem' }}>
            1 500 MAD · 1 journée · Hôtel 5★ · {PLACES} places restantes
          </div>
        </div>
        <a
          href="#inscription"
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

      {/* ── HERO — deux colonnes ──────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp-y) var(--sp-x) var(--sp-y-sm)', position: 'relative', overflow: 'hidden' }}>
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
                fontSize: 'clamp(2.6rem, 5.8vw, 5.8rem)',
                fontWeight: 800, lineHeight: 0.94, letterSpacing: '-0.025em',
                color: 'var(--navy)', margin: '0 0 2.5rem',
              }}
            >
              Réussir<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>
                votre Première
              </span><br />
              Importation.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, maxWidth: 520, marginBottom: '3rem' }}
            >
              La formation de référence pour importer au Maroc en toute confiance : une journée intensive pour maîtriser le processus complet, du calcul de votre prix de revient à la réception de votre marchandise. Animée par un expert avec 20+ ans de terrain au Maroc et en Europe. Session à Casablanca. Tout inclus.
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

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden', background: 'var(--paper)' }}>
              <img
                src="/images/hero-warehouse.webp"
                alt="Entrepôt de réception et stockage de marchandises importées"
                width={1920}
                height={1280}
                loading="eager"
                fetchPriority="high"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: 'var(--blue-bright)', padding: '1.25rem 1.75rem' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '0.3rem' }}>★ Nouveau programme</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>1 500 MAD TTC</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ────────────────────────────── */}
      <div style={{ background: 'var(--ink)', padding: '1.5rem var(--sp-x)', overflow: 'hidden' }}>
        <div className="section-inner" style={{ display: 'flex', gap: '2rem 3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {['20+ ans de terrain', '110+ missions réalisées', 'Douane · Transport · Fournisseurs', 'Import légal & optimisé', 'Simulateur Excel inclus', 'Hôtel 5★ inclus'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--blue-bright)', fontSize: '0.45rem' }}>◆</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,243,238,0.55)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <InscriptionSection />

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
                si vous voulez importer.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: 0.1 }}>
              <FramedPhoto src="/images/business.webp" alt="Entrepreneur préparant son projet d'importation" width={900} height={598} />
            </motion.div>
          </div>
          <motion.div
            className="frl-cibles"
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {CIBLES.map((c) => (
              <motion.div
                key={c.titre}
                variants={listItemVariantsY}
                style={{ background: '#fff', padding: '2.5rem', borderLeft: '3px solid var(--blue-bright)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.2 }}>{c.titre}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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

          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--blue-bright), rgba(47,111,181,0.1))' }} />

            <motion.div
              variants={listContainerVariantsFast}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
            >
            {PROGRAMME.map((item, i) => (
              <motion.div
                key={i}
                variants={listItemVariantsX}
                style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  padding: item.type === 'module' ? '1.5rem 2rem' : '0.9rem 2rem',
                  marginBottom: '2px',
                  background: item.type === 'module' ? 'var(--paper)' : 'transparent',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', left: '-2.35rem', top: item.type === 'module' ? '1.75rem' : '1rem',
                  width: 10, height: 10, borderRadius: '50%',
                  background: item.type === 'module' ? 'var(--blue-bright)' : 'rgba(47,111,181,0.3)',
                  border: '2px solid #ffffff', flexShrink: 0,
                }} />

                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: item.type === 'module' ? 'var(--blue-bright)' : 'rgba(47,111,181,0.5)', minWidth: 56, paddingTop: '0.2rem', flexShrink: 0 }}>
                  {item.heure}
                </div>

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
                  {item.desc && item.type === 'break' && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--mid)', lineHeight: 1.5, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            </motion.div>
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
                Pas de théorie abstraite. Une méthode et des outils directement applicables à votre propre projet d'importation.
              </p>
            </motion.div>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              variants={listContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {COMPETENCES.map((c, i) => (
                <motion.div
                  key={i}
                  variants={listItemVariantsY}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1.5rem', background: '#ffffff', borderLeft: '2px solid var(--blue-bright)' }}
                >
                  <span style={{ color: 'var(--blue-bright)', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', minWidth: 24, marginTop: '0.1rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--navy)', lineHeight: 1.5 }}>{c}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ET APRÈS ─────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)', color: 'var(--navy)' }}>
        <div className="section-inner">
          <div className="frl-comp">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <FramedPhoto src="/images/charts.webp" alt="Suivi et pilotage d'une activité d'import" width={800} height={570} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
                04 / Et après ?
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1.5rem' }}>
                Un premier pas,<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>pas un aboutissement.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.25rem', maxWidth: 520 }}>
                Cette journée vous donne la méthode pour réussir votre première importation en toute autonomie, sans dépendre d'un intermédiaire pour chaque étape.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, margin: '0 0 2.5rem', maxWidth: 520 }}>
                Si votre activité grandit et que vous avez besoin d'un accompagnement plus poussé — sourcing récurrent, structuration des achats, pilotage supply chain — Nextinotech propose deux prolongements naturels : le conseil supply chain pour PME, et l'accompagnement Direction Achats à Temps Partagé.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'flex-start' }}>
                <Link
                  to="/conseil"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none' }}
                >
                  Découvrir le conseil Supply Chain →
                </Link>
                <Link
                  to="/directeur-achats-mi-temps"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none' }}
                >
                  Directeur Achats à Temps Partagé →
                </Link>
                <Link
                  to="/accompagnement-oea"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)', textDecoration: 'none' }}
                >
                  Accompagnement Statut OEA →
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

          <motion.div
            className="frl-inclus"
            style={{ marginBottom: '4rem' }}
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {INCLUS.map((item, i) => (
              <motion.div
                key={i}
                variants={listItemVariantsY}
                style={{ padding: '2.5rem 2rem', background: '#ffffff', borderTop: '2px solid var(--blue-bright)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.label}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--mid)', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

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
              Votre première<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>importation vous attend.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', fontWeight: 300, margin: 0, maxWidth: 440 }}>
              Places limitées à 16 participants pour garantir la qualité. Répondez maintenant pour sécuriser la vôtre.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <a
              href="#inscription"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '1.25rem 3rem', background: 'var(--navy)', color: '#fff',
                fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#12283f'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
            >
              S&apos;inscrire — formulaire →
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Ou via WhatsApp / email → contact@nextinotech.com
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
              06 / Questions fréquentes
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
              07 / Programme complet
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
