import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SchemaScript } from './SchemaHelper'
import { generateFAQSchema } from '../utils/seoData'

const ease = [0.16, 1, 0.3, 1] as const

const FAQ = [
  {
    q: 'Comment se déroule le processus de recrutement chez Nextinotech ?',
    a: "Vous postulez par email avec votre CV, ou via notre formulaire de contact. Nous restons une équipe volontairement resserrée : chaque candidature est étudiée individuellement, sans parcours d'entretiens standardisé sur plusieurs semaines. Un profil retenu démarre directement sur le terrain, en binôme avec un consultant senior qui sert de référent sur les premières missions.",
  },
  {
    q: 'Acceptez-vous les candidatures spontanées si aucune offre ne correspond à mon profil ?',
    a: "Oui. En dehors du poste de Consultant(e) Supply Chain Junior actuellement ouvert, aucune autre offre n'est publiée pour le moment pour les profils consultants seniors ou équipe administrative — mais nous étudions chaque candidature spontanée. Envoyez-nous votre parcours par email, nous vous recontactons si une opportunité correspond.",
  },
]

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1.75rem 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--navy)' }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '1.4rem', color: 'var(--blue-bright)', flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '0.95rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, paddingBottom: '1.75rem', maxWidth: 760 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const STATS = [
  { value: '5', label: 'Consultants dans l’équipe' },
  { value: '20+', label: 'Ans de terrain cumulés' },
  { value: '110+', label: 'Missions réalisées' },
  { value: '0', label: 'Commission éditeurs' },
]

const OFFRE = [
  {
    title: 'Accompagnement individuel',
    desc: 'Un onboarding structuré et un référent senior sur vos premières missions — vous ne découvrez pas le terrain seul.',
  },
  {
    title: 'Montée en compétence continue',
    desc: 'Formation interne DDMRP, accès à nos supports de méthode, préparation aux certifications pour les profils qui s’investissent.',
  },
  {
    title: 'Missions variées',
    desc: 'PME et ETI marocaines, tous secteurs — distribution, industrie, agroalimentaire, santé, BTP. Jamais deux missions identiques.',
  },
  {
    title: 'Aux côtés de seniors certifiés DDMRP',
    desc: 'Chaque mission junior se fait en binôme avec un consultant senior — la transmission se fait sur le terrain, pas en salle de formation.',
  },
]

const PROFILS = [
  {
    num: '01',
    title: 'Consultants seniors',
    desc: 'Certifié DDMRP ou 8+ ans de terrain Supply Chain, vous savez piloter une transformation complexe en autonomie et représenter le cabinet face à un comité de direction. Nous recrutons en continu — parlez-nous de votre parcours.',
  },
  {
    num: '02',
    title: 'Consultants juniors',
    desc: 'Jeune diplômé(e) avec une vraie appétence terrain, vous voulez apprendre vite et bien. Formation interne, binôme senior systématique, montée en compétence progressive sur des missions réelles.',
  },
  {
    num: '03',
    title: 'Équipe administrative',
    desc: 'Rigueur et sens du service pour garantir la fluidité de chaque mission, du devis au bilan. Un poste de coordination essentiel, rarement visible mais toujours déterminant.',
  },
]

const MISSIONS = [
  'Participer aux diagnostics supply chain en binôme avec un consultant senior — cartographie de l’existant, identification des causes racines, chiffrage des écarts',
  'Contribuer au déploiement de projets DDMRP — paramétrage des buffers de découplage, formation des équipes clientes',
  'Appuyer les déploiements de systèmes WMS / TMS / APS — cahier des charges, tests de recette, accompagnement au démarrage',
  'Produire les livrables de mission — rapports, tableaux de bord, supports de restitution en comité de direction',
]

const PROFIL_RECHERCHE = [
  'Jeune diplômé(e) ingénieur (génie industriel, logistique) ou école de commerce avec spécialisation supply chain',
  'Appétence terrain forte — à l’aise aussi bien en entrepôt ou en atelier que derrière un tableau de bord',
  'Rigueur analytique, à l’aise avec Excel avancé (Power BI est un plus)',
  'Français courant, anglais professionnel',
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </motion.div>
  )
}

export default function Carriere() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const [jobOpen, setJobOpen] = useState(false)

  return (
    <>
      {/* ── STATS BANDE — carte givrée, même pattern que Profil.tsx ── */}
      <div ref={statsRef} style={{ background: 'var(--paper)', paddingTop: '2rem' }}>
        <div className="section-inner" style={{ padding: '0 var(--sp-x)' }}>
          <div
            className="formation-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              border: '1px solid var(--border)',
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                style={{ padding: '1.4rem 1.8rem', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}
              >
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '0.3rem' }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── POURQUOI NOUS REJOINDRE ── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="carriere-intro-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <FadeUp>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                01 / Pourquoi nous rejoindre
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
                Construire une expertise qui ne s&apos;achète pas.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p style={{ fontSize: '1rem', color: 'var(--mid)', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
                Chez Nextinotech, on ne vend pas de licences ni de commissions cachées — on vend une
                expertise terrain, indépendante, mesurable. Rejoindre l&apos;équipe, c&apos;est apprendre à
                diagnostiquer avant de recommander, à choisir la technologie qui sert le client plutôt que
                celle qui rapporte le plus, et à être jugé sur des résultats plutôt que sur des rapports
                d&apos;étape.
                <br /><br />
                Nous restons une équipe volontairement resserrée. Chaque recrutement compte, et chaque
                nouvelle personne a un impact réel et visible sur les missions dès ses premières semaines.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CE QU'ON OFFRE ── */}
      <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              02 / Ce qu&apos;on offre
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', marginBottom: '4rem' }}>
              Ce que vous trouverez ici.
            </h2>
          </FadeUp>

          <div className="engagement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {OFFRE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(47,111,181,0.12)' }}
                style={{ padding: '2.5rem 2rem', border: '1px solid var(--border)', background: '#fff', position: 'relative', transition: 'box-shadow 0.3s' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: 40, height: 2, background: 'var(--blue-bright)' }} />
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--mid)', lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILS RECHERCHÉS ── */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="section-inner" style={{ padding: 'var(--sp)' }}>
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--blue-bright)', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ display: 'block', width: 24, height: 1, background: 'var(--blue-bright)', opacity: 0.5 }} />
              03 / Profils recherchés
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '4rem', maxWidth: 720 }}>
              Trois profils, une même exigence de terrain.
            </h2>
          </FadeUp>

          <div className="team-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {PROFILS.map((c, i) => (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                style={{ background: '#fff', border: '1px solid var(--border)', borderTop: '2px solid var(--blue-bright)', padding: '2.5rem 2rem' }}
              >
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--blue-bright)', marginBottom: '1.5rem' }}>
                  {c.num}
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.85rem', lineHeight: 1.2 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFRE OUVERTE ── */}
      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              04 / Offre ouverte
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--navy)', marginBottom: '3rem' }}>
              Le poste à pourvoir maintenant.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ borderTop: '2px solid var(--blue-bright)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: '#ffffff' }}>
              {/* Header — toujours visible */}
              <div className="pc-header" style={{ padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'var(--blue-bright)', opacity: 0.7 }}>01</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', border: '1px solid rgba(47,111,181,0.3)', color: 'var(--blue-bright)' }}>
                      Poste ouvert
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: '0.6rem' }}>
                    Consultant(e) Supply Chain Junior
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, maxWidth: 540, marginBottom: '1.5rem' }}>
                    Vous appuyez nos consultants seniors sur des missions de diagnostic, de déploiement
                    DDMRP et de systèmes WMS/TMS/APS, en binôme, sur le terrain.
                  </p>

                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Lieu', val: 'Casablanca' },
                      { label: 'Contrat', val: 'CDI' },
                      { label: 'Démarrage', val: 'Dès que possible' },
                    ].map((m) => (
                      <div key={m.label}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', opacity: 0.7, marginBottom: '0.2rem' }}>
                          {m.label}
                        </div>
                        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--navy)' }}>
                          {m.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pc-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem', minWidth: 200 }}>
                  <a
                    href="mailto:contact@nextinotech.com?subject=Candidature%20-%20Consultant%20Supply%20Chain%20Junior"
                    className="btn-primary"
                    style={{ whiteSpace: 'normal', textAlign: 'center' }}
                  >
                    Postuler par email →
                  </a>
                  <button
                    onClick={() => setJobOpen((o) => !o)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--mid)')}
                  >
                    {jobOpen ? 'Réduire' : 'Voir la fiche complète'}
                    <motion.span animate={{ rotate: jobOpen ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}>+</motion.span>
                  </button>
                </div>
              </div>

              {/* Détail — dépliable */}
              <AnimatePresence initial={false}>
                {jobOpen && (
                  <motion.div
                    key="job-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pc-detail-grid" style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                      <div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.25rem' }}>
                          Missions type
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {MISSIONS.map((m, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'var(--blue-bright)', minWidth: 20, paddingTop: '0.25rem', opacity: 0.7 }}>
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', lineHeight: 1.5 }}>{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.25rem' }}>
                          Profil recherché
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                          {PROFIL_RECHERCHE.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                              <span style={{ color: 'var(--blue-bright)', fontSize: '0.4rem', marginTop: '0.5rem' }}>◆</span>
                              <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', lineHeight: 1.5 }}>{p}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          to="/contact"
                          style={{
                            fontFamily: 'DM Mono, monospace',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--blue-bright)',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(47,111,181,0.3)',
                            paddingBottom: '2px',
                          }}
                        >
                          Ou candidatez via notre formulaire de contact →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CANDIDATURES SPONTANÉES ── */}
      <section style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <FadeUp>
            <div
              className="cta-final-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '3rem',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid var(--border)',
                padding: '3rem',
              }}
            >
              <div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                  Aucune autre offre ouverte actuellement.
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0, maxWidth: 560 }}>
                  Pour les profils consultants seniors ou équipe administrative, aucun poste n&apos;est
                  ouvert pour le moment — mais nous étudions chaque candidature spontanée. Envoyez-nous
                  votre parcours, nous vous recontactons si une opportunité correspond.
                </p>
              </div>
              <a
                href="mailto:contact@nextinotech.com?subject=Candidature%20spontan%C3%A9e"
                className="btn-outline"
                style={{ whiteSpace: 'nowrap' }}
              >
                Candidature spontanée →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <SchemaScript schema={generateFAQSchema(FAQ)} />
        <div className="section-inner">
          <FadeUp>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              05 / Questions fréquentes
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 4rem' }}>
              Vos questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>nos réponses.</span>
            </h2>
          </FadeUp>
          <div style={{ maxWidth: 900 }}>
            {FAQ.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
