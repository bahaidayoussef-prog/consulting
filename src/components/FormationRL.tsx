import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const PHONE = '+212663449200'
const WA_MSG = encodeURIComponent('Bonjour, je souhaite m\'inscrire à la formation "Devenir Responsable Logistique". Pouvez-vous me communiquer les prochaines dates ?')
const WA_LINK = `https://wa.me/${PHONE}?text=${WA_MSG}`
const EMAIL = 'essor.consulting.maroc@gmail.com'

const CIBLES = [
  {
    icon: '📦',
    titre: 'Coordinateur logistique',
    desc: 'Vous gérez des flux au quotidien et voulez structurer vos méthodes pour évoluer vers un rôle de responsable.',
  },
  {
    icon: '🏭',
    titre: 'Responsable de site / entrepôt',
    desc: 'Vous pilotez des opérations mais manquez d\'outils et d\'indicateurs pour prendre les bonnes décisions.',
  },
  {
    icon: '🚛',
    titre: 'Chef d\'équipe transport',
    desc: 'Vous supervisez les livraisons et souhaitez maîtriser la gestion globale de la chaîne logistique.',
  },
  {
    icon: '💼',
    titre: 'DG / DAF de PME',
    desc: 'Vous gérez directement la logistique de votre entreprise sans formation spécifique et voulez combler ce manque.',
  },
]

const PROGRAMME = [
  { heure: '08 h 30', label: 'Accueil', desc: 'Petit-déjeuner & tour de table', type: 'break' },
  { heure: '09 h 00', label: 'Module 1', desc: 'Fondamentaux logistiques — flux, organisation, rôle et missions du Responsable Logistique', type: 'module' },
  { heure: '10 h 30', label: 'Pause café', desc: 'Networking & questions', type: 'break' },
  { heure: '10 h 45', label: 'Module 2', desc: 'Gestion des stocks & approvisionnements — méthodes, calcul de couverture, éviter les ruptures', type: 'module' },
  { heure: '12 h 00', label: 'Module 3', desc: 'Transport & schéma logistique — 3PL, incoterms, optimisation des coûts de transport', type: 'module' },
  { heure: '13 h 00', label: 'Déjeuner', desc: 'Repas inclus — Restaurant de l\'hôtel', type: 'break' },
  { heure: '14 h 00', label: 'Module 4', desc: 'Pilotage de la performance — KPIs essentiels, tableau de bord opérationnel, reporting direction', type: 'module' },
  { heure: '15 h 30', label: 'Pause café', desc: '', type: 'break' },
  { heure: '15 h 45', label: 'Module 5', desc: 'Systèmes & outils — WMS, TMS, ERP : comment les choisir, les paramétrer, en tirer la valeur', type: 'module' },
  { heure: '16 h 45', label: 'Atelier', desc: 'Cas pratique terrain + construction de votre plan d\'action personnel', type: 'module' },
  { heure: '17 h 30', label: 'Clôture', desc: 'Remise des attestations de participation', type: 'break' },
]

const COMPETENCES = [
  'Concevoir un schéma logistique adapté à votre contexte',
  'Calculer et piloter les stocks avec les bons paramètres',
  'Négocier et évaluer vos prestataires transport (3PL)',
  'Construire un tableau de bord logistique opérationnel',
  'Choisir et paramétrer un WMS ou TMS',
  'Manager et animer une équipe logistique au quotidien',
]

const INCLUS = [
  { icon: '🏨', label: 'Venue 5 étoiles', desc: 'Salle de formation haut de gamme, équipements professionnels' },
  { icon: '☕', label: 'Pauses café & viennoiseries', desc: 'Deux pauses incluses dans la journée' },
  { icon: '🍽️', label: 'Déjeuner gastronomique', desc: 'Restaurant de l\'hôtel, déjeuner complet inclus' },
  { icon: '📋', label: 'Support de formation', desc: 'Guide complet de 60+ pages à emporter' },
  { icon: '🎓', label: 'Attestation officielle', desc: 'Attestation de participation Essor Consulting' },
  { icon: '💬', label: 'Suivi post-formation', desc: '30 jours de support WhatsApp pour vos questions terrain' },
]

const FAQS = [
  {
    q: 'Dois-je avoir une expérience logistique préalable ?',
    a: 'Non. La formation est accessible dès lors que vous gérez ou allez gérer des flux (stock, transport, entrepôt). Elle est conçue pour un niveau opérationnel à managérial, sans prérequis technique.',
  },
  {
    q: 'La formation est-elle éligible à la formation professionnelle (OFPPT) ?',
    a: 'Nous sommes en cours d\'habilitation. En attendant, une convention de formation vous est remise pour toute prise en charge par votre entreprise ou votre OPCA.',
  },
  {
    q: 'Y a-t-il une formation intra-entreprise pour plusieurs collaborateurs ?',
    a: 'Oui. Pour 5 participants ou plus, nous organisons la formation dans vos locaux ou à l\'hôtel de votre choix. Contactez-nous pour un devis personnalisé.',
  },
  {
    q: 'Quelles sont les prochaines dates ?',
    a: 'Les sessions sont organisées à la demande selon les inscriptions. Envoyez-nous votre demande via WhatsApp ou email — nous vous communiquons la prochaine date disponible sous 48h.',
  },
]

function CTAButton({ children, href, primary = true }: { children: ReactNode; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 2.5rem',
        background: primary ? 'var(--gold)' : 'transparent',
        border: `1px solid ${primary ? 'var(--gold)' : 'rgba(192,154,47,0.4)'}`,
        color: primary ? 'var(--dark)' : 'var(--gold)',
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.9rem',
        fontWeight: 600,
        textDecoration: 'none',
        letterSpacing: '0.04em',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        if (primary) { el.style.background = '#a8841f'; el.style.borderColor = '#a8841f' }
        else { el.style.background = 'var(--gold)'; el.style.color = 'var(--dark)' }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        if (primary) { el.style.background = 'var(--gold)'; el.style.borderColor = 'var(--gold)' }
        else { el.style.background = 'transparent'; el.style.color = 'var(--gold)' }
      }}
    >
      {children}
    </a>
  )
}

export default function FormationRL() {
  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh', color: 'var(--dark-text)' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem var(--sp-x)',
        background: 'rgba(10,20,32,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <span style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-text)', letterSpacing: '-0.01em' }}>
            Essor Consulting
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', color: 'var(--gold)', textTransform: 'uppercase' }}>
            Formation
          </span>
        </a>
        <CTAButton href={WA_LINK}>Réserver ma place →</CTAButton>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: 'var(--sp-y) var(--sp-x) var(--sp-y-sm)', position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/hero-warehouse.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.12, filter: 'grayscale(100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--dark) 50%, rgba(10,20,32,0.7) 100%)',
        }} />

        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '2rem',
              padding: '0.35rem 0.8rem', border: '1px solid rgba(192,154,47,0.3)',
            }}
          >
            <span style={{ width: 6, height: 6, background: 'var(--gold)', display: 'inline-block' }} />
            Formation · 1 journée · Casablanca
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Bodoni Moda, serif',
              fontSize: 'clamp(3rem, 7vw, 8rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: 'var(--dark-text)',
              margin: '0 0 2rem',
              maxWidth: 900,
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
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: 'rgba(235,232,225,0.65)',
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: 580,
              marginBottom: '3rem',
            }}
          >
            Une journée intensive pour maîtriser les méthodes, les outils et les réflexes du pilotage logistique. Dispensée par un expert avec 20+ ans de terrain au Maroc et en Europe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <CTAButton href={WA_LINK}>Réserver via WhatsApp →</CTAButton>
            <CTAButton href={`mailto:${EMAIL}?subject=Inscription formation Responsable Logistique`} primary={false}>
              Par email
            </CTAButton>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{
              display: 'flex', gap: '3rem', marginTop: '5rem',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '2.5rem',
            }}
          >
            {[
              { value: '1 500', unit: 'MAD', label: 'TTC par participant' },
              { value: '1', unit: 'journée', label: '8h30 → 17h30' },
              { value: 'Hôtel', unit: '5★', label: 'Casablanca' },
              { value: '100%', unit: 'terrain', label: 'Cas réels Maroc' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: 'var(--dark-text)',
                }}>
                  {s.value}<span style={{ color: 'var(--gold)', marginLeft: '0.2rem', fontSize: '0.6em' }}>{s.unit}</span>
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(192,154,47,0.5)', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <div style={{
        background: 'var(--ink)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1.5rem var(--sp-x)',
      }}>
        <div className="section-inner" style={{
          display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
        }}>
          {['20+ ans de terrain', '110+ missions réalisées', 'DDMRP Certified', 'Enseignant TBS · ISCAE · ENCG · EMI', 'Task Force Vaccination COVID-19'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>◆</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(227,226,226,0.45)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── POUR QUI ── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)', color: 'var(--dark)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '1.5rem' }}>
              01 / Pour qui
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--dark)', margin: 0 }}>
              Cette formation<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>est faite pour vous</span>
              <br />si vous gérez des flux.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {CIBLES.map((c, i) => (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#fff',
                  padding: '2.5rem',
                  borderLeft: '3px solid var(--gold)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                  {c.titre}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(10,20,32,0.6)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section style={{ background: 'var(--dark)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
              02 / Programme de la journée
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--dark-text)', margin: 0 }}>
              8 h 30 – 17 h 30.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Dense. Concret.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            {PROGRAMME.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.75rem 2rem',
                  background: item.type === 'module' ? 'var(--dark-2)' : 'rgba(192,154,47,0.05)',
                  borderLeft: item.type === 'module' ? '2px solid var(--gold)' : '2px solid rgba(192,154,47,0.2)',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--gold)', minWidth: 56, paddingTop: '0.15rem', opacity: 0.8 }}>
                  {item.heure}
                </div>
                <div>
                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: item.type === 'module' ? 'var(--dark-text)' : 'rgba(227,226,226,0.45)', marginBottom: item.desc ? '0.3rem' : 0, letterSpacing: '0.02em' }}>
                    {item.label}
                  </div>
                  {item.desc && (
                    <div style={{ fontSize: '0.82rem', color: 'rgba(227,226,226,0.45)', lineHeight: 1.6, fontWeight: 300 }}>
                      {item.desc}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS MAÎTRISEREZ ── */}
      <section style={{ background: 'var(--dark-3)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
                03 / Compétences acquises
              </div>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.2rem, 4vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--dark-text)', margin: '0 0 2rem' }}>
                Ce que vous<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>maîtriserez</span><br />
                à la sortie.
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                Pas de théorie abstraite. Des compétences directement applicables le lendemain matin dans votre entreprise.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {COMPETENCES.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    background: 'var(--dark-2)',
                    borderLeft: '2px solid var(--gold)',
                  }}
                >
                  <span style={{ color: 'var(--gold)', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', minWidth: 24, marginTop: '0.1rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--dark-text)', lineHeight: 1.5, fontWeight: 400 }}>
                    {c}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATEUR ── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)', color: 'var(--dark)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '3rem' }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.65)', marginBottom: '1.5rem' }}>
              04 / Votre formateur
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div style={{ width: '100%', paddingBottom: '120%', background: 'var(--dark)', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/images/conseil.jpg"
                  alt="Formateur Essor Consulting"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,32,0.4) 0%, transparent 60%)' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
                background: 'var(--gold)', padding: '1.5rem 2rem',
              }}>
                <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dark)', opacity: 0.7, marginTop: '0.3rem' }}>ans terrain</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2rem, 3.5vw, 4rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--dark)', margin: '0 0 0.5rem' }}>
                Youssef<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>— Fondateur, Essor Consulting</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(10,20,32,0.6)', lineHeight: 1.8, fontWeight: 300, margin: '1.5rem 0 2.5rem', maxWidth: 540 }}>
                Expert Supply Chain & Logistique avec plus de 20 ans de missions terrain au Maroc et en Europe. DDMRP Certified Practitioner. Expert national COVID-19 (Task Force Vaccination). Intervenant dans les plus grandes écoles du Maroc.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'DDMRP Certified Practitioner — Demande Driven Institute',
                  'Intervenant : TBS · ISCAE · HEM · ENCG · EMI',
                  'Formation : ENSA Agadir · KEDGE Business School · UM6P',
                  'Références : Renault-Nissan · L\'Oréal · Nestlé · OCP · DHL · Addoha',
                  '110+ missions de conseil Supply Chain au Maroc et en Europe',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--gold)', marginTop: '0.35rem', fontSize: '0.5rem' }}>◆</span>
                    <span style={{ fontSize: '0.875rem', color: 'rgba(10,20,32,0.7)', fontWeight: 400, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOGISTIQUE ── */}
      <section style={{ background: 'var(--dark)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
              05 / Ce qui est inclus
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--dark-text)', margin: 0 }}>
              1 500 MAD.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Tout inclus.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '5rem' }}>
            {INCLUS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ padding: '2.5rem 2rem', background: 'var(--dark-2)', borderTop: '2px solid var(--gold)' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '0.5rem' }}>{item.label}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--dark-muted)', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Lieu */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem',
              padding: '3rem 4rem', background: 'var(--dark-2)',
              borderLeft: '4px solid var(--gold)',
            }}
          >
            {[
              { label: 'Lieu', value: 'Hôtel 5 étoiles', detail: 'Casablanca — précisé à l\'inscription' },
              { label: 'Durée', value: '1 journée', detail: '8 h 30 → 17 h 30' },
              { label: 'Groupe', value: '8 à 16', detail: 'Participants maximum' },
              { label: 'Langue', value: 'Français', detail: 'Cas pratiques en contexte marocain' },
            ].map(d => (
              <div key={d.label}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.5)', marginBottom: '0.5rem' }}>{d.label}</div>
                <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--dark-text)', lineHeight: 1 }}>{d.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--dark-muted)', marginTop: '0.35rem' }}>{d.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA PRINCIPAL ── */}
      <section style={{ background: 'var(--gold)', padding: 'var(--sp-y) var(--sp-x)' }}>
        <div className="section-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.2rem, 4vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--dark)', margin: '0 0 1rem' }}>
              Votre prochaine<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>session vous attend.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(10,20,32,0.65)', fontWeight: 300, margin: 0 }}>
              Places limitées à 16 participants. Répondez maintenant pour sécuriser votre place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '1.1rem 2.5rem',
                background: 'var(--dark)', color: '#fff',
                fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                textDecoration: 'none', letterSpacing: '0.03em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#1b3554'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--dark)'}
            >
              Réserver via WhatsApp →
            </a>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,20,32,0.5)' }}>
              Réponse sous 24h · Aucun engagement avant confirmation
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--dark-2)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(192,154,47,0.45)', marginBottom: '1.5rem' }}>
              06 / Questions fréquentes
            </div>
            <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--dark-text)', margin: 0 }}>
              Vos questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>nos réponses.</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: '2.5rem', background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h3 style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem var(--sp-x)' }}>
        <div className="section-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-text)' }}>Essor Consulting</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dark-muted)', marginTop: '0.3rem' }}>
              Casablanca, Maroc · essor.consulting.maroc@gmail.com
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dark-muted)', textDecoration: 'none' }}>
              ← Retour au site
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
              WhatsApp →
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
