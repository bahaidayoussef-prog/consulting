import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─── Brand constants ─────────────────────────────────────── */
const WA = `https://wa.me/212663449200?text=${encodeURIComponent('Bonjour Essor Consulting, je souhaite des informations sur vos formations. Pouvez-vous me recontacter ?')}`
const EMAIL = 'mailto:essor.consulting.maroc@gmail.com?subject=Catalogue%20Formations%20Essor%20Consulting'

/* ─── Data — Programmes ────────────────────────────────────── */
const PROGRAMMES = [
  {
    id: 'rl',
    num: '01',
    format: 'inter',
    badge: 'Programme phare',
    title: 'Devenir Responsable Logistique',
    subtitle: '1 journée pour structurer votre pilotage logistique.',
    duration: '1 jour',
    hours: '8h30 — 17h30',
    group: '8 à 16 participants',
    price: '1 500',
    unit: 'MAD TTC / participant',
    lieu: 'Hôtel 5★ Casablanca',
    public: ['Coordinateur logistique', 'Responsable de site', "Chef d'équipe transport", 'DG / DAF de PME'],
    modules: [
      'Fondamentaux logistiques & rôle du Responsable',
      'Gestion des stocks, approvisionnements & DDMRP',
      'Transport & schéma logistique (compte propre vs 3PL)',
      'Pilotage : les 12 KPIs indispensables & tableau de bord',
      'WMS · TMS · ERP — choisir et déployer',
      "Cas pratique terrain : plan d'action à 90 jours",
    ],
    inclus: ['Hôtel 5★', 'Déjeuner gastronomique', 'Pauses café', 'Support 60+ pages', 'Attestation', 'Suivi WhatsApp 30j'],
    cta: '/formation-rl/',
    color: 'var(--gold)',
  },
  {
    id: 'fondamentaux',
    num: '02',
    format: 'intra',
    badge: 'Intra-entreprise',
    title: 'Supply Chain Fondamentaux',
    subtitle: 'Les bases de la supply chain pour vos équipes non spécialistes.',
    duration: '1 à 2 jours',
    hours: 'En présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Équipes opérationnelles', 'Managers non spécialistes SC', 'Acheteurs juniors', 'Assistants logistique'],
    modules: [
      'Flux physiques et informationnels — comprendre la chaîne',
      'Gestion des stocks : ABC, couverture, point de commande',
      'Transport & incoterms essentiels',
      "Achats : processus, appel d'offre, évaluation fournisseur",
      'KPIs supply chain — lire et utiliser ses indicateurs',
      'Cas pratiques tirés de votre secteur',
    ],
    inclus: ['Adaptation secteur', 'Cas pratiques sur mesure', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'sop',
    num: '03',
    format: 'intra',
    badge: 'Intra-entreprise',
    title: 'S&OP & Planification Avancée',
    subtitle: 'Maîtriser le Sales & Operations Planning et la planification demand-driven.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '28 000 – 42 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Équipes planification', 'Demand planners', 'Supply chain managers', 'Directeurs commerce & opérations'],
    modules: [
      'Processus S&OP : les 5 étapes clés',
      'Prévisions de la demande : méthodes et précision (MAPE)',
      'Plan industriel & commercial — construction et animation',
      'Gestion de la capacité et des contraintes',
      'Introduction au DDMRP et à la planification demand-driven',
      'Cas pratique S&OP sur données réelles de votre entreprise',
    ],
    inclus: ['Adaptation à vos données', 'Template S&OP livré', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'ddmrp',
    num: '04',
    format: 'inter',
    badge: 'Certification',
    title: 'DDMRP — Certification Practitioner',
    subtitle: 'Devenir praticien DDMRP certifié. La méthode de planification du futur.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: '6 à 12 participants',
    price: '4 500',
    unit: 'MAD TTC / participant',
    lieu: 'Casablanca',
    public: ['Planificateurs SC', 'Responsables stocks', 'DSC & responsables logistique', 'Consultants SC'],
    modules: [
      'Limites du MRP traditionnel — pourquoi le DDMRP',
      'Les 5 composantes DDMRP : Position, Protection, Pull, Visibilité, Collaboration',
      'Calcul des buffers : rouge, jaune, vert',
      'Paramétrage et ajustement dynamique',
      'Implémentation dans SAP, Oracle ou ERP générique',
      'Examen blanc + préparation à la certification officielle DDI',
    ],
    inclus: ['Support officiel DDMRP', 'Simulateur Excel inclus', 'Préparation examen DDI', 'Attestation Essor Consulting'],
    cta: WA,
    color: 'var(--gold)',
  },
  {
    id: 'decideurs',
    num: '05',
    format: 'intra',
    badge: 'Atelier dirigeants',
    title: 'Supply Chain pour Décideurs',
    subtitle: 'Comprendre et arbitrer les enjeux SC sans maîtriser le technique.',
    duration: '1 jour',
    hours: 'Atelier CODIR',
    group: '6 à 12 dirigeants',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Directeurs Généraux', 'Directeurs Administratifs & Financiers', 'CODIR', 'Investisseurs & actionnaires'],
    modules: [
      'Lire un diagnostic SC : ce que les KPIs vous disent vraiment',
      'Arbitrer un projet WMS/TMS/APS : critères, pièges, ROI',
      'Comprendre un business case SC : hypothèses et risques',
      'Stocks, service client, cash : le triangle de décision',
      'Les 5 questions à poser à votre DSC',
      "Cas d'arbitrage réels — discussion ouverte",
    ],
    inclus: ['Animation par le fondateur', 'Format discussion/débat', 'Synthèse écrite post-atelier', 'Suivi 30j'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'wms',
    num: '06',
    format: 'intra',
    badge: 'Outils & SI',
    title: 'WMS · TMS · ERP — Maîtriser les Outils',
    subtitle: "Choisir, paramétrer et piloter les systèmes d'information supply chain.",
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '32 000 – 48 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux',
    public: ['Responsables entrepôt', 'Chefs de projet SI', 'Responsables logistique', 'DSI & équipes IT'],
    modules: [
      'Cartographie des solutions WMS/TMS/ERP du marché',
      'Définir son cahier des charges fonctionnel',
      "Conduire un appel d'offre SI logistique",
      'Méthode AMOA : recettage, paramétrage, conduite du changement',
      'Pilotage post-déploiement : KPIs système et adoption utilisateur',
      "Retours d'expérience : ce qui fait réussir ou échouer un projet SI",
    ],
    inclus: ["Grille d'évaluation WMS/TMS fournie", 'Template cahier des charges', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'coaching',
    num: '07',
    format: 'coaching',
    badge: 'Coaching individuel',
    title: 'Coaching DSC — Montée en Compétence',
    subtitle: 'Sessions mensuelles individualisées pour Directeurs et Responsables SC.',
    duration: 'Sessions mensuelles',
    hours: '3h / session',
    group: '1 participant',
    price: '8 000',
    unit: 'MAD HT / session',
    lieu: 'Présentiel ou visio',
    public: ['Directeurs Supply Chain', 'Responsables Logistique', 'DSC nouvellement nommés', 'SC Managers en transition'],
    modules: [
      'Revue de vos KPIs et indicateurs terrain du mois',
      'Structuration de votre organisation et de vos processus',
      'Déblocage de dossiers complexes (fournisseur, SI, équipe)',
      'Préparation de présentations CODIR',
      'Plan de montée en compétence personnalisé',
      'Réseau et mise en relation avec des pairs du secteur',
    ],
    inclus: ['Accès WhatsApp entre sessions', 'Revue mensuelle documentée', 'Ressources personnalisées', 'Suivi sur 6 à 12 mois'],
    cta: WA,
    color: 'var(--gold)',
  },
]

/* ─── Data — Calendrier 2026 ───────────────────────────────── */
const SESSIONS = [
  { mois: 'Septembre', sessions: [
    { date: '18 Sep', titre: 'Responsable Logistique', format: 'inter', places: 5, id: 'rl' },
    { date: '25–26 Sep', titre: 'DDMRP Practitioner', format: 'inter', places: 8, id: 'ddmrp' },
  ]},
  { mois: 'Octobre', sessions: [
    { date: '9 Oct', titre: 'Supply Chain Décideurs', format: 'intra', places: null, id: 'decideurs' },
    { date: '16–17 Oct', titre: 'S&OP & Planification Avancée', format: 'intra', places: null, id: 'sop' },
    { date: '23 Oct', titre: 'Responsable Logistique', format: 'inter', places: 6, id: 'rl' },
  ]},
  { mois: 'Novembre', sessions: [
    { date: '6–7 Nov', titre: 'Supply Chain Fondamentaux', format: 'intra', places: null, id: 'fondamentaux' },
    { date: '13 Nov', titre: 'Responsable Logistique', format: 'inter', places: 8, id: 'rl' },
    { date: '20–21 Nov', titre: 'DDMRP Practitioner', format: 'inter', places: 10, id: 'ddmrp' },
  ]},
  { mois: 'Décembre', sessions: [
    { date: '4 Déc', titre: 'Supply Chain Décideurs', format: 'intra', places: null, id: 'decideurs' },
    { date: '11 Déc', titre: 'Responsable Logistique', format: 'inter', places: 4, id: 'rl' },
  ]},
]

/* ─── Helpers ─────────────────────────────────────────────── */
function Tag({ label, format }: { label: string; format: string }) {
  const bg = format === 'inter'
    ? 'rgba(192,154,47,0.12)' : format === 'coaching'
    ? 'rgba(192,154,47,0.08)' : 'rgba(27,53,84,0.12)'
  const color = format === 'inter' || format === 'coaching' ? 'var(--gold)' : '#1b3554'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.2rem 0.65rem',
      background: bg,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.52rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color,
    }}>
      {label}
    </span>
  )
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── Programme Card ──────────────────────────────────────── */
function ProgramCard({ p, dark }: { p: typeof PROGRAMMES[0]; dark: boolean }) {
  const [open, setOpen] = useState(false)
  const isExternal = p.cta.startsWith('http') || p.cta.startsWith('mailto')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: `2px solid ${p.color}`,
        background: dark ? 'rgba(255,255,255,0.03)' : '#fff',
        marginBottom: 2,
        transition: 'background 0.2s',
      }}
    >
      {/* Card header — always visible */}
      <div style={{ padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', color: p.color, opacity: 0.7 }}>{p.num}</span>
            <Tag label={p.badge} format={p.format} />
          </div>

          <h3 style={{
            fontFamily: 'Bodoni Moda, serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: dark ? '#f0ede8' : '#0a1420',
            marginBottom: '0.6rem',
          }}>
            {p.title}
          </h3>

          <p style={{ fontSize: '0.9rem', color: dark ? 'rgba(240,237,232,0.5)' : 'rgba(10,20,32,0.55)', lineHeight: 1.6, fontWeight: 300, maxWidth: 540, marginBottom: '1.5rem' }}>
            {p.subtitle}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Durée', val: p.duration },
              { label: 'Groupe', val: p.group },
              { label: 'Lieu', val: p.lieu },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: p.color, opacity: 0.65, marginBottom: '0.2rem' }}>{m.label}</div>
                <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: dark ? 'rgba(240,237,232,0.8)' : 'rgba(10,20,32,0.75)' }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — price + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem', minWidth: 180 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: p.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {p.price}
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(240,237,232,0.35)' : 'rgba(10,20,32,0.35)', marginTop: '0.25rem' }}>
              {p.unit}
            </div>
          </div>

          <a
            href={p.cta}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              background: p.color === 'var(--gold)' ? 'var(--gold)' : 'transparent',
              border: `1px solid ${p.color === 'var(--gold)' ? 'var(--gold)' : 'rgba(27,53,84,0.3)'}`,
              color: p.color === 'var(--gold)' ? '#0a1420' : (dark ? '#f0ede8' : '#0a1420'),
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              if (p.color === 'var(--gold)') {
                el.style.background = '#a8841f'; el.style.borderColor = '#a8841f'
              } else {
                el.style.borderColor = 'rgba(27,53,84,0.6)'; el.style.color = 'var(--gold)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              if (p.color === 'var(--gold)') {
                el.style.background = 'var(--gold)'; el.style.borderColor = 'var(--gold)'
              } else {
                el.style.borderColor = 'rgba(27,53,84,0.3)'; el.style.color = dark ? '#f0ede8' : '#0a1420'
              }
            }}
          >
            {p.format === 'inter' ? 'Réserver →' : p.format === 'coaching' ? 'Planifier →' : 'Demander un devis →'}
          </a>

          <button
            onClick={() => setOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(240,237,232,0.3)' : 'rgba(10,20,32,0.35)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = dark ? 'rgba(240,237,232,0.3)' : 'rgba(10,20,32,0.35)'}
          >
            {open ? 'Réduire' : 'Voir le programme'}
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}>+</motion.span>
          </button>
        </div>
      </div>

      {/* Expandable programme details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(10,20,32,0.08)'}`, padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {/* Modules */}
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Programme</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {p.modules.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'var(--gold)', minWidth: 20, paddingTop: '0.25rem', opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '0.85rem', color: dark ? 'rgba(240,237,232,0.7)' : 'rgba(10,20,32,0.7)', lineHeight: 1.5 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Public + Inclus */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Pour qui</div>
                  {p.public.map((pub, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.4rem' }}>◆</span>
                      <span style={{ fontSize: '0.85rem', color: dark ? 'rgba(240,237,232,0.65)' : 'rgba(10,20,32,0.65)' }}>{pub}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Inclus</div>
                  {p.inclus.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.55rem' }}>✓</span>
                      <span style={{ fontSize: '0.85rem', color: dark ? 'rgba(240,237,232,0.65)' : 'rgba(10,20,32,0.65)' }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main Component ──────────────────────────────────────── */
export default function FormationCatalogue() {
  const [activeTab, setActiveTab] = useState<'all' | 'inter' | 'intra' | 'coaching'>('all')

  const filtered = activeTab === 'all' ? PROGRAMMES : PROGRAMMES.filter(p => p.format === activeTab)

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'all', label: 'Tous les programmes' },
    { id: 'inter', label: 'Inter-entreprises' },
    { id: 'intra', label: 'Intra-entreprise' },
    { id: 'coaching', label: 'Coaching individuel' },
  ]

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--dark)', padding: '8rem 4rem 0', overflow: 'hidden' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.5)', marginBottom: '2.5rem' }}>
              01 / Académie · Terrain · Résultats
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 style={{
              fontFamily: 'Bodoni Moda, serif',
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              color: 'var(--dark-text)',
              margin: '0 0 4rem',
            }}>
              Former.<br />
              Certifier.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Transformer.</span>
            </h1>
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={0.12}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '3rem', marginBottom: '0', paddingBottom: '5rem' }}>
              {[
                { val: '7', label: 'programmes disponibles' },
                { val: '20+', label: 'ans de terrain formateur' },
                { val: '110+', label: 'missions de référence' },
                { val: '0', label: 'commission éditeur' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingLeft: i > 0 ? '3rem' : '0' }}>
                  <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 800, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginTop: '0.5rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ STATEMENT LINE ════════════════════════════════════ */}
      <div style={{ background: 'var(--ink)', padding: '5rem 4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-inner">
          <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2rem, 5vw, 6.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', fontStyle: 'italic', color: 'var(--gold)' }}>
            "Le bon formateur ne vous apprend pas le métier.<br />Il vous fait voir ce que vous faites déjà — autrement."
          </div>
        </div>
      </div>

      {/* ══ PROGRAMME PHARE — Responsable Logistique ══════════ */}
      <section style={{ background: 'var(--paper)', padding: '8rem 4rem', color: '#0a1420' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '1.5rem' }}>
              02 / Programme phare
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            {/* Left */}
            <Reveal delay={0.05}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--gold)', padding: '0.3rem 0.9rem', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0a1420', fontWeight: 700 }}>★ Programme phare</span>
              </div>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#0a1420', margin: '0 0 1.5rem' }}>
                Devenir<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Responsable<br />Logistique.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(10,20,32,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: 480, marginBottom: '2.5rem' }}>
                Une journée intensive pour structurer votre pilotage logistique. Formateur expert 20+ ans terrain. Hôtel 5★ Casablanca. Tout inclus — déjeuner, support 60 pages, attestation, suivi WhatsApp 30 jours.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <a href="/formation-rl/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 2.5rem', background: '#0a1420', color: '#f0ede8', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#1b3554'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0a1420'}
                >
                  Voir le programme complet →
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 2.5rem', background: 'transparent', border: '1px solid rgba(10,20,32,0.2)', color: '#0a1420', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,20,32,0.2)'; (e.currentTarget as HTMLElement).style.color = '#0a1420' }}
                >
                  Réserver via WhatsApp
                </a>
              </div>
              {/* Key facts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { l: 'Tarif', v: '1 500 MAD TTC' },
                  { l: 'Format', v: 'Inter-entreprises' },
                  { l: 'Durée', v: '1 journée (8h30–17h30)' },
                  { l: 'Lieu', v: 'Hôtel 5★ Casablanca' },
                  { l: 'Places', v: '8 à 16 participants' },
                  { l: 'Suivi', v: 'WhatsApp 30 jours inclus' },
                ].map((f, i) => (
                  <div key={i} style={{ borderTop: '1px solid rgba(10,20,32,0.1)', paddingTop: '0.75rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.7)', marginBottom: '0.2rem' }}>{f.l}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#0a1420' }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — upcoming dates */}
            <Reveal delay={0.12}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '1.5rem' }}>
                Prochaines sessions 2026
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { date: '18 Septembre 2026', places: 5, status: 'Ouvert' },
                  { date: '23 Octobre 2026', places: 6, status: 'Ouvert' },
                  { date: '13 Novembre 2026', places: 8, status: 'Ouvert' },
                  { date: '11 Décembre 2026', places: 4, status: 'Dernières places' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: i % 2 === 0 ? '#fff' : '#f5f3ee', borderLeft: `2px solid ${s.places <= 4 ? 'var(--gold)' : 'rgba(10,20,32,0.1)'}` }}>
                    <div>
                      <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#0a1420' }}>{s.date}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'rgba(10,20,32,0.4)', marginTop: '0.2rem', textTransform: 'uppercase' }}>{s.places} places disponibles</div>
                    </div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: s.places <= 4 ? 'var(--gold)' : 'rgba(10,20,32,0.4)', fontWeight: s.places <= 4 ? 700 : 400 }}>
                      {s.status}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(192,154,47,0.08)', borderLeft: '2px solid var(--gold)' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.8)', marginBottom: '0.5rem' }}>Session intra disponible</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(10,20,32,0.65)', lineHeight: 1.6, fontWeight: 300 }}>
                  Vous avez 5+ collaborateurs ? Nous organisons cette formation dans vos locaux, adaptée à votre secteur. Contactez-nous pour un devis.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CATALOGUE COMPLET ════════════════════════════════ */}
      <section style={{ background: 'var(--dark)', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.5)', marginBottom: '1.5rem' }}>
                  03 / Catalogue complet
                </div>
                <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--dark-text)', margin: 0 }}>
                  7 programmes.<br />
                  <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Toutes les situations.</span>
                </h2>
              </div>

              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.04)', padding: '4px' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: activeTab === tab.id ? 'var(--gold)' : 'transparent',
                      border: 'none',
                      padding: '0.6rem 1.25rem',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.58rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: activeTab === tab.id ? '#0a1420' : 'rgba(240,237,232,0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.map(p => (
                <ProgramCard key={p.id} p={p} dark />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ CALENDRIER 2026 ══════════════════════════════════ */}
      <section style={{ background: 'var(--cream)', padding: '8rem 4rem', color: '#0a1420' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '1.5rem' }}>
              04 / Planning formations 2026
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#0a1420', margin: '0 0 5rem' }}>
              Calendrier<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Septembre — Décembre 2026.</span>
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
            {SESSIONS.map((month, mi) => (
              <Reveal key={month.mois} delay={mi * 0.08}>
                <div style={{ background: '#fff', padding: '2.5rem', minHeight: 300 }}>
                  {/* Month header */}
                  <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 800, color: '#0a1420', lineHeight: 1, marginBottom: '2rem', borderBottom: '2px solid var(--gold)', paddingBottom: '1rem' }}>
                    {month.mois}
                    <span style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.35)', fontWeight: 400, marginTop: '0.4rem', fontStyle: 'normal' }}>
                      {month.sessions.length} session{month.sessions.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {/* Sessions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {month.sessions.map((s, si) => (
                      <div key={si} style={{ borderLeft: `2px solid ${s.format === 'inter' ? 'var(--gold)' : 'rgba(27,53,84,0.2)'}`, paddingLeft: '0.9rem' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: s.format === 'inter' ? 'rgba(192,154,47,0.8)' : 'rgba(10,20,32,0.4)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                          {s.date} · {s.format === 'inter' ? 'Inter' : 'Intra'}
                        </div>
                        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#0a1420', lineHeight: 1.3, marginBottom: '0.3rem' }}>
                          {s.titre}
                        </div>
                        {s.places !== null && (
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.08em', color: s.places <= 4 ? 'var(--gold)' : 'rgba(10,20,32,0.35)', textTransform: 'uppercase' }}>
                            {s.places} place{s.places > 1 ? 's' : ''} disponible{s.places > 1 ? 's' : ''}
                          </div>
                        )}
                        {s.places === null && (
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.08em', color: 'rgba(10,20,32,0.3)', textTransform: 'uppercase' }}>
                            Sur demande
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Legend + note */}
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--gold)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.5)' }}>Inter-entreprises</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: 'rgba(27,53,84,0.2)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.5)' }}>Intra-entreprise (sur devis)</span>
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(10,20,32,0.4)', textTransform: 'uppercase' }}>
                Planning 2027 disponible sur demande
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FORMATEUR ════════════════════════════════════════ */}
      <section style={{ background: 'var(--paper)', padding: '8rem 4rem', color: '#0a1420' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '4rem' }}>
              05 / Votre formateur
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '8rem', alignItems: 'start' }}>
            <Reveal delay={0.05} style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', background: '#0a1420' }}>
                <img src="/images/conseil.jpg" alt="Youssef BAHAIDA — Essor Consulting" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,32,0.4) 0%, transparent 60%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', background: 'var(--gold)', padding: '1.75rem 2.25rem' }}>
                <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '2.5rem', fontWeight: 800, color: '#0a1420', lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.65)', marginTop: '0.3rem' }}>ans terrain</div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2rem, 4vw, 4.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: '#0a1420', margin: '0 0 0.5rem' }}>
                Youssef BAHAIDA
              </h2>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>
                Fondateur, Essor Consulting
              </div>
              <p style={{ fontSize: '1rem', color: 'rgba(10,20,32,0.6)', lineHeight: 1.85, fontWeight: 300, maxWidth: 560, marginBottom: '3rem' }}>
                Plus de 20 ans de missions terrain en Supply Chain, Logistique et Achats au Maroc et en Europe. DDMRP Certified Practitioner. Expert national COVID-19. Intervenant dans les principales grandes écoles marocaines.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 3rem' }}>
                {[
                  { label: 'Certification', val: 'DDMRP Certified Practitioner — DDI' },
                  { label: 'Missions', val: '110+ missions de conseil réalisées' },
                  { label: 'Enseignement', val: 'TBS · ISCAE · HEM · ENCG · EMI · EHTP' },
                  { label: 'Références', val: 'Renault · L\'Oréal · Nestlé · OCP · DHL · Addoha' },
                  { label: 'Formation', val: 'ENSA Agadir · KEDGE Business School · UM6P' },
                  { label: 'Mission spéciale', val: 'Expert SC — Task Force Vaccination COVID-19' },
                ].map((item, i) => (
                  <div key={i} style={{ borderTop: '1px solid rgba(10,20,32,0.1)', paddingTop: '0.75rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.7)', marginBottom: '0.3rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(10,20,32,0.7)', lineHeight: 1.4, fontWeight: 400 }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════ */}
      <section style={{ background: 'var(--dark)', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6rem', alignItems: 'center' }}>
            <Reveal>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.5)', marginBottom: '1.5rem' }}>
                06 / Inscription & contact
              </div>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--dark-text)', margin: '0 0 1.5rem' }}>
                Réserver votre<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>prochaine session.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(235,232,225,0.5)', lineHeight: 1.8, fontWeight: 300, maxWidth: 520, margin: 0 }}>
                Réponse sous 24h. Aucun engagement avant confirmation écrite. Annulation gratuite jusqu'à 7 jours avant la session.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 3rem', background: 'var(--gold)', color: '#0a1420', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#a8841f'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--gold)'}
                >
                  Réserver via WhatsApp →
                </a>
                <a href={EMAIL}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(235,232,225,0.65)', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 400, textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(235,232,225,0.65)' }}
                >
                  Écrire par email
                </a>
                <Link to="/contact"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(235,232,225,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(235,232,225,0.3)'}
                >
                  Ou via le formulaire de contact →
                </Link>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(235,232,225,0.2)', marginTop: '0.5rem' }}>
                  +212 06 63 44 92 00 · essor.consulting.maroc@gmail.com
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
