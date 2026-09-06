import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import DSC from '../components/DSC'
import SchemaScript from '../components/SchemaHelper'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Direction Supply Chain à Temps Partagé',
  serviceType: 'Direction supply chain externalisée',
  provider: { '@type': 'ProfessionalService', name: 'Nextinotech' },
  areaServed: [{ '@type': 'Country', name: 'Maroc' }, { '@type': 'Country', name: 'France' }],
  description: "Direction supply chain à temps partagé pour PME et ETI — mandat en 3 phases, de l'audit à la passation, sans recrutement CDI.",
}

export default function DirectionSCTempsPartagePage() {
  return (
    <>
      <PageMeta
        title="Direction Supply Chain à Temps Partagé au Maroc | Nextinotech"
        description="Direction supply chain à temps partagé pour PME et ETI marocaines. Mandat en 3 phases, 180k-550k MAD, opérationnel en 2 semaines — sans recrutement CDI."
        canonical="https://nextinotech.com/direction-supply-chain-temps-partage"
      />
      <SchemaScript schema={schema} />
      <PageHero
        num="08"
        title="Direction Supply Chain"
        titleItalic="à temps partagé."
        subtitle="Un mandat, pas un recrutement. Direction opérationnelle de votre supply chain — stocks, achats, systèmes, logistique — en 3 phases, avec un exit propre."
        tag="SUPPLY CHAIN · MANDAT OPÉRATIONNEL"
        bg="var(--paper)"
      />
      <DSC />

      {/* ── DÉCLINAISONS PAR MÉTIER ── */}
      <div style={{ background: 'var(--dark-2)', padding: 'var(--sp-y-sm) var(--sp-x)' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(47,111,181,0.7)', marginBottom: '2rem' }}>
              Selon votre priorité
            </div>
            <div className="dsc-declinaisons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'var(--border)' }}>
              {[
                { title: 'Direction Logistique', desc: 'Entrepôts, transport, flux physiques.', href: '/directeur-logistique-mi-temps' },
                { title: 'Direction Achats', desc: 'Sourcing, négociation, réduction des coûts.', href: '/directeur-achats-mi-temps' },
                { title: 'CDI ou Mandat ?', desc: 'Le comparatif complet, chiffré.', href: '/dsc-vs-recrutement-cdi' },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{ display: 'block', background: '#ffffff', padding: '2.5rem 2rem', textDecoration: 'none' }}
                >
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.6rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, marginBottom: '1.25rem' }}>
                    {item.desc}
                  </div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-bright)' }}>
                    Découvrir →
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
