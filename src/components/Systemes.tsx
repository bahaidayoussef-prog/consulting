import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const systems = [
  {
    num: '01',
    name: 'WMS',
    fullName: "Gestion d'entrepôt",
    tagline: "Pilotage des flux physiques et des stocks en temps réel.",
    tiers: [
      { name: 'WMS Mini', price: '80 000 – 130 000 MAD HT', duration: '6 à 10 semaines', desc: '1 entrepôt · 5 utilisateurs · SaaS clé en main' },
      { name: 'WMS Pilote', price: '180 000 – 320 000 MAD HT', duration: '3 à 5 mois', desc: '1-2 entrepôts · AMOA + RFP + change management', featured: true },
      { name: 'WMS Pro', price: 'À partir de 450 000 MAD HT', duration: '6 à 10 mois', desc: 'ETI multi-sites · Audit + RFP + AMOA + intégration ERP' },
    ],
    results: ['Écarts d\'inventaire réduits de 80–95%', 'Productivité préparation +25–40%', 'Erreurs d\'expédition −70–90%'],
  },
  {
    num: '02',
    name: 'TMS',
    fullName: 'Gestion du transport',
    tagline: "Optimisation des flux transport et réduction des coûts.",
    tiers: [
      { name: 'TMS Mini', price: '70 000 – 120 000 MAD HT', duration: '6 à 10 semaines', desc: 'Moins de 10 véhicules · SaaS léger + paramétrage' },
      { name: 'TMS Pilote', price: '160 000 – 280 000 MAD HT', duration: '3 à 5 mois', desc: 'Flotte mixte · multi-clients · AMOA complet', featured: true },
      { name: 'TMS Pro', price: 'À partir de 400 000 MAD HT', duration: '5 à 9 mois', desc: 'ETI · flotte importante · multi-modes + intégrations' },
    ],
    results: ['Coûts transport réduits 8–15%', 'Productivité dispatch +30–50%', 'Facturation transport ÷3 à 5'],
  },
  {
    num: '03',
    name: 'APS / S&OP',
    fullName: 'Demand Planning & S&OP',
    tagline: "Prévisions fiables. Stocks maîtrisés. S&OP opérationnel.",
    tiers: [
      { name: 'Planning Mini', price: '60 000 – 100 000 MAD HT', duration: '6 à 8 semaines', desc: 'PME mono-produit · moins de 500 SKU' },
      { name: 'Planning Pilote', price: '150 000 – 260 000 MAD HT', duration: '3 à 5 mois', desc: 'PME multi-canal · 500–3 000 SKU · S&OP complet', featured: true },
      { name: 'Planning Pro (DDMRP)', price: 'À partir de 380 000 MAD HT', duration: '6 à 9 mois', desc: 'ETI multi-sites · IBP + AMOA + COPIL S&OP' },
    ],
    results: ['Ruptures réduites de 40–60%', 'Surstocks réduits de 20–30%', 'BFR libéré 15–30% du stock'],
  },
  {
    num: '04',
    name: 'e-Procurement',
    fullName: 'Source-to-Pay',
    tagline: "Visibilité 100% spend. Cycle achat ÷2 à 4.",
    tiers: [
      { name: 'Achats Mini', price: '55 000 – 95 000 MAD HT', duration: '6 à 8 semaines', desc: 'TPE/PME · moins de 50 fournisseurs actifs' },
      { name: 'Achats Pilote', price: '140 000 – 240 000 MAD HT', duration: '3 à 5 mois', desc: 'PME · e-RFx + gestion contrats + reporting', featured: true },
      { name: 'Achats Pro (S2P)', price: 'À partir de 350 000 MAD HT', duration: '5 à 9 mois', desc: 'ETI · multi-entités · S2P complet + ERP' },
    ],
    results: ['Visibilité 100% spend', 'Cycle achat ÷2 à 4', 'Économies 3–8% sur le spend traité'],
  },
  {
    num: '05',
    name: 'Control Tower',
    fullName: 'BI Supply Chain',
    tagline: "Décisions Comex basées sur données. Plus de reportings manuels.",
    tiers: [
      { name: 'Control Tower Mini', price: '45 000 – 75 000 MAD HT', duration: '4 à 6 semaines', desc: '3–5 dashboards Power BI clés · OTIF, stocks, cash' },
      { name: 'Control Tower Pilote', price: '110 000 – 180 000 MAD HT', duration: '2 à 3 mois', desc: '8–12 dashboards + alertes + rituel COPIL', featured: true },
      { name: 'Control Tower Pro', price: 'À partir de 280 000 MAD HT', duration: '4 à 6 mois', desc: 'ETI · multi-sites · AI/ML · portail mobile dirigeant' },
    ],
    results: ['Détection anomalies ÷5 à 10', 'Économies 2–5% marge SC', 'Zéro reporting manuel'],
  },
]

function SystemRow({ s, index }: { s: typeof systems[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid rgba(27,53,84,0.1)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '2.5rem 0',
          display: 'grid',
          gridTemplateColumns: '64px auto 1fr auto',
          gap: '2.5rem',
          alignItems: 'center',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07 }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            color: 'rgba(47,111,181,0.45)',
            textTransform: 'uppercase',
          }}
        >
          {s.num}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--blue-bright)',
            whiteSpace: 'nowrap',
          }}
        >
          {s.name}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 + 0.05 }}
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.3rem, 2.2vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--navy)',
          }}
        >
          {s.fullName}
        </motion.div>

        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '1.1rem',
          color: open ? 'var(--blue-bright)' : 'rgba(27,53,84,0.3)',
          transition: 'color 0.2s, transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'none',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          +
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '3.5rem', paddingLeft: 64 + 40 }}>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--dark-muted)',
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: '2.5rem',
              }}>
                {s.tagline}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '2.5rem' }}>
                {s.tiers.map((tier) => (
                  <div key={tier.name} style={{
                    background: tier.featured ? 'rgba(47,111,181,0.08)' : 'rgba(27,53,84,0.03)',
                    border: `1px solid ${tier.featured ? 'rgba(47,111,181,0.4)' : 'rgba(27,53,84,0.1)'}`,
                    padding: '2.5rem',
                    position: 'relative',
                  }}>
                    {tier.featured && (
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: 3,
                        background: 'var(--blue-bright)',
                      }} />
                    )}

                    {/* Tier name */}
                    <div style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: tier.featured ? 'rgba(47,111,181,0.8)' : 'rgba(27,53,84,0.5)',
                      marginBottom: '0.75rem',
                    }}>
                      {tier.name}
                    </div>

                    {/* Price — focal point */}
                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      color: tier.featured ? 'var(--blue-bright)' : 'var(--navy)',
                      marginBottom: '0.6rem',
                    }}>
                      {tier.price}
                    </div>

                    {/* Duration */}
                    <div style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(27,53,84,0.5)',
                      marginBottom: '1.25rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(27,53,84,0.08)',
                    }}>
                      {tier.duration}
                    </div>

                    {/* Description */}
                    <div style={{
                      fontSize: '0.88rem',
                      color: 'rgba(27,53,84,0.7)',
                      lineHeight: 1.65,
                      fontWeight: 300,
                    }}>
                      {tier.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {s.results.map((r) => (
                  <div key={r} style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(47,111,181,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--blue-bright)' }}>→</span> {r}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Systemes() {
  return (
    <section id="systemes" style={{ background: 'var(--dark)', padding: 'var(--sp)' }}>
      <div className="section-inner">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'end',
          marginBottom: '6rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(47,111,181,0.45)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              05 / Systèmes & Digital
            </div>
            <h2 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2.8rem, 5vw, 6.5rem)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              color: 'var(--navy)',
              margin: 0,
            }}>
              Déploiement de solutions SCM.
            </h2>
          </div>
          <p style={{
            fontSize: '1rem',
            color: 'var(--dark-muted)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 440,
          }}>
            Sélection indépendante et déploiement AMOA des meilleures solutions — adaptées à votre taille
            et secteur. Aucune commission éditeur. Jamais.
          </p>
        </div>

        <div>
          <div style={{ borderTop: '1px solid rgba(27,53,84,0.1)' }} />
          {systems.map((s, i) => (
            <SystemRow key={s.num} s={s} index={i} />
          ))}
        </div>

        <div style={{ marginTop: '4rem' }}>
          <a href="/contact" className="btn-primary">Discuter de votre projet →</a>
        </div>
      </div>
    </section>
  )
}
