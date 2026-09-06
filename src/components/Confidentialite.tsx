import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay }}>
      {children}
    </motion.div>
  )
}

interface Section {
  titre: string
  corps: React.ReactNode
}

const SECTIONS: Section[] = [
  {
    titre: 'Responsable du traitement',
    corps: (
      <p>
        Nextinotech, cabinet de conseil en Supply Chain et Logistique, établi à Casablanca (Maroc).
        Pour toute question relative à vos données&nbsp;: <a href="mailto:contact@nextinotech.com">contact@nextinotech.com</a>.
      </p>
    ),
  },
  {
    titre: 'Données collectées',
    corps: (
      <ul>
        <li>
          <strong>Formulaires de contact</strong>&nbsp;: nom, adresse e-mail, message et, le cas échéant,
          numéro de téléphone que vous renseignez volontairement.
        </li>
        <li>
          <strong>Mesure d&apos;audience</strong> (Google Analytics 4)&nbsp;: pages consultées, type d&apos;appareil,
          navigateur, pays, source de trafic — de manière agrégée et pseudonymisée. Aucune donnée directement
          identifiante n&apos;est utilisée à cette fin.
        </li>
      </ul>
    ),
  },
  {
    titre: 'Finalités',
    corps: (
      <ul>
        <li>Répondre à vos demandes de contact, de devis ou d&apos;inscription à une formation.</li>
        <li>Mesurer la fréquentation du site et en améliorer le contenu et l&apos;ergonomie.</li>
      </ul>
    ),
  },
  {
    titre: 'Cookies et stockage local',
    corps: (
      <ul>
        <li>
          <code>_ga</code>, <code>_ga_&lt;id&gt;</code> — cookies de Google Analytics, destinés à distinguer les
          visiteurs et à mesurer l&apos;audience. Durée de vie&nbsp;: jusqu&apos;à 13 mois.
        </li>
        <li>
          Un indicateur de stockage local (non transmis à un tiers) mémorise la fermeture de nos bandeaux
          d&apos;information afin de ne pas les réafficher à chaque visite. Ce n&apos;est pas un cookie de suivi.
        </li>
      </ul>
    ),
  },
  {
    titre: 'Base légale (loi 09-08)',
    corps: (
      <p>
        Le traitement des demandes de contact repose sur votre consentement et sur l&apos;exécution de mesures
        précontractuelles. La mesure d&apos;audience repose sur l&apos;intérêt légitime de Nextinotech à comprendre
        et améliorer l&apos;usage de son site. Les traitements sont réalisés conformément à la loi n° 09-08 relative
        à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel.
      </p>
    ),
  },
  {
    titre: 'Destinataires et sous-traitants',
    corps: (
      <ul>
        <li><strong>Google</strong> (Google Analytics) — mesure d&apos;audience.</li>
        <li><strong>Vercel</strong> — hébergement technique du site.</li>
        <li><strong>Formspree</strong> — acheminement des messages envoyés via les formulaires.</li>
        <li>Vos données ne sont ni vendues, ni louées, ni cédées à des fins commerciales.</li>
      </ul>
    ),
  },
  {
    titre: 'Durée de conservation',
    corps: (
      <ul>
        <li>Demandes de contact&nbsp;: jusqu&apos;à 3 ans après le dernier échange.</li>
        <li>Données de mesure d&apos;audience&nbsp;: jusqu&apos;à 14 mois.</li>
      </ul>
    ),
  },
  {
    titre: 'Vos droits',
    corps: (
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur vos
        données. Pour l&apos;exercer, écrivez à <a href="mailto:contact@nextinotech.com">contact@nextinotech.com</a>.
        Vous pouvez également saisir la Commission Nationale de contrôle de la protection des Données à caractère
        Personnel (CNDP) — <a href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer">cndp.ma</a>.
      </p>
    ),
  },
  {
    titre: 'Modifications',
    corps: (
      <p>
        La présente politique peut être mise à jour pour refléter des évolutions légales ou techniques.
        Dernière mise à jour&nbsp;: 2 septembre 2026.
      </p>
    ),
  },
]

export default function Confidentialite() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'var(--sp-y) var(--sp-x)' }}>
      <div className="section-inner" style={{ maxWidth: 780 }}>
        <FadeUp>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300, margin: '0 0 3rem' }}>
            Cette page décrit quelles données Nextinotech collecte via ce site, pourquoi, avec qui elles sont
            partagées, et comment exercer vos droits.
          </p>
        </FadeUp>

        {SECTIONS.map((s, i) => (
          <FadeUp key={s.titre} delay={i * 0.03}>
            <div style={{ borderTop: '1px solid var(--border)', padding: '2rem 0' }}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 1rem' }}>
                {s.titre}
              </h2>
              <div className="legal-body" style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.98rem', lineHeight: 1.8, color: 'var(--ink)', fontWeight: 300 }}>
                {s.corps}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <style>{`
        .legal-body a { color: var(--blue-bright); }
        .legal-body ul { margin: 0; padding-left: 1.2rem; }
        .legal-body li { margin-bottom: 0.5rem; }
        .legal-body code { font-family: 'DM Mono', monospace; font-size: 0.85em; background: rgba(27,53,84,0.06); padding: 0.1em 0.3em; }
        .legal-body p { margin: 0 0 0.75rem; }
      `}</style>
    </section>
  )
}
