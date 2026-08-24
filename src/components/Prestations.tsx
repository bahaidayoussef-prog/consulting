import { IconPackage, IconStack2, IconTags, IconPuzzle, IconBoxSeam, IconEyeCheck, IconLayersIntersect } from '@tabler/icons-react'

const VALEUR_AJOUTEE = [
  { icon: IconPackage, name: 'Co-packing', desc: 'Assemblage et conditionnement de packs promotionnels ou multi-produits, à la demande.' },
  { icon: IconStack2, name: 'Fardelage', desc: 'Regroupement et filmage de plusieurs unités en un seul colis prêt à expédier.' },
  { icon: IconTags, name: 'Étiquetage / Marquage', desc: 'Pose d’étiquettes, codes-barres ou marquages réglementaires sur vos produits.' },
  { icon: IconPuzzle, name: 'Kitting', desc: 'Assemblage de kits multi-composants prêts à la vente ou à l’installation.' },
  { icon: IconBoxSeam, name: 'Mise en carton / Reconditionnement', desc: 'Reconditionnement de produits dans un nouvel emballage, adapté à votre marché ou client.' },
  { icon: IconEyeCheck, name: 'Contrôle Qualité Visuel', desc: 'Vérification visuelle avant expédition — conformité, état, complétude.' },
  { icon: IconLayersIntersect, name: 'Palettisation sur Mesure', desc: 'Constitution de palettes selon vos contraintes clients, transporteur ou stockage.' },
]

function ServicesValeurAjoutee() {
  return (
    <div>
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Opéré en interne · Équipe & matériel propres
        </div>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 0.75rem',
          }}
        >
          Services Logistiques à Valeur Ajoutée
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          Sept prestations opérées directement par nos équipes, avec notre propre matériel — pas sous-traitées à un tiers.
        </p>
      </div>

      <div className="valeur-ajoutee-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'var(--border)', maxWidth: 1100 }}>
        {VALEUR_AJOUTEE.map((s) => (
          <div key={s.name} style={{ background: '#fff', padding: '2rem 1.75rem' }}>
            <s.icon size={22} stroke={1.6} color="var(--blue-bright)" style={{ marginBottom: '1rem' }} />
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.98rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
              {s.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.55, fontWeight: 300 }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <div>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)' }}>
            Prix ·&nbsp;
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>Sur devis</span>
        </div>
        <a
          href="/contact"
          className="btn-primary"
        >
          Discuter de votre besoin →
        </a>
      </div>
    </div>
  )
}

const PACK_INVENTAIRE = {
  title: 'Pack Inventaire',
  tagline: 'Comptage physique + ressources incluses.',
  desc: "Le dimensionnement réel — nombre de personnes, jours, matériel — dépend de la complexité du site, pas seulement du nombre d'emplacements. Chaque palier ci-dessous est un point de départ, affiné avec vous avant devis.",
  tiers: [
    {
      name: 'Palier 1 — Petit site',
      tag: "Jusqu'à 500 emplacements",
      price: 'Sur devis',
      duration: 'À définir',
      includes: ['Équipe de comptage (effectif à définir)', 'Matériel de scan / saisie', "Rapport d'écarts"],
    },
    {
      name: 'Palier 2 — Site moyen',
      tag: '500 à 2 000 emplacements',
      price: 'Sur devis',
      duration: 'À définir',
      featured: true,
      includes: [
        'Équipe de comptage renforcée',
        'Matériel de scan / saisie',
        'Coordination multi-zones',
        "Rapport détaillé avec analyse des causes d'écart",
      ],
    },
    {
      name: 'Palier 3 — Grand site',
      tag: '2 000+ emplacements',
      price: 'Sur devis',
      duration: 'À définir',
      includes: [
        'Équipe dimensionnée sur devis',
        'Matériel complet',
        'Méthodologie multi-équipes en parallèle',
        "Rapport + plan d'action correctif",
      ],
    },
  ],
}

function PackInventaire() {
  return (
    <div style={{ marginTop: '6rem' }}>
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Comptage physique
        </div>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 0.75rem',
          }}
        >
          {PACK_INVENTAIRE.title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          {PACK_INVENTAIRE.desc}
        </p>
      </div>

      <div className="pack-inventaire-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {PACK_INVENTAIRE.tiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              background: tier.featured ? 'var(--ink)' : '#fff',
              border: `1px solid ${tier.featured ? 'rgba(47,111,181,0.35)' : 'rgba(27,53,84,0.1)'}`,
              padding: '2.5rem',
              position: 'relative',
              boxShadow: tier.featured ? '0 24px 60px rgba(10,20,32,0.2)' : '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            {tier.featured && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue-bright)' }} />
            )}

            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tier.featured ? 'rgba(47,111,181,0.75)' : 'rgba(95,102,114,0.6)',
                marginBottom: '0.6rem',
              }}
            >
              {tier.tag}
            </div>

            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: tier.featured ? '#ffffff' : 'var(--ink)',
                marginBottom: '1.5rem',
              }}
            >
              {tier.name}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '2rem',
                margin: '0 0 1.75rem',
                paddingBottom: '1.5rem',
                borderBottom: `1px solid ${tier.featured ? 'rgba(255,255,255,0.07)' : 'rgba(27,53,84,0.08)'}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: tier.featured ? 'rgba(227,226,226,0.28)' : 'rgba(95,102,114,0.45)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Prix
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: tier.featured ? '#ffffff' : 'var(--ink)' }}>
                  {tier.price}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: tier.featured ? 'rgba(227,226,226,0.28)' : 'rgba(95,102,114,0.45)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Durée
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 500, color: tier.featured ? 'rgba(235,232,225,0.8)' : 'var(--ink)' }}>
                  {tier.duration}
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: tier.featured ? 'rgba(227,226,226,0.35)' : 'rgba(95,102,114,0.5)',
                marginBottom: '0.75rem',
              }}
            >
              Inclus
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {tier.includes.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.5rem 0',
                    borderBottom: `1px solid ${tier.featured ? 'rgba(255,255,255,0.05)' : 'rgba(27,53,84,0.06)'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    color: tier.featured ? 'rgba(235,232,225,0.65)' : 'var(--mid)',
                    lineHeight: 1.5,
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: tier.featured ? 'var(--blue-bright)' : 'var(--ink)',
                fontFamily: 'DM Mono, monospace',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Demander un devis Pack Inventaire →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

const LEIBINGER = {
  positioning: "Conseil et fourniture d'imprimantes industrielles de marquage et codage Leibinger — solutions professionnelles pour l'agroalimentaire, la pharmacie et l'industrie.",
  features: [
    "Imprimantes à jet d'encre continu, de l'entrée de gamme aux modèles haute vitesse",
    'Technologie Sealtronic : démarrage rapide, moins d\'arrêts de production pour nettoyage',
    'Modèles avec protection IP65 disponibles, adaptés aux exigences d\'hygiène strictes de l\'agroalimentaire et de la pharmaceutique',
    'Applications : dates de péremption, numéros de lot, codes-barres, marquage réglementaire et traçabilité',
  ],
  includes: [
    'Conseil sur le choix du modèle adapté à votre secteur, votre cadence de production et vos contraintes d\'hygiène/environnement',
    'Fourniture et installation',
  ],
}

function LeibingerOffer() {
  return (
    <div style={{ marginTop: '6rem' }}>
      <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(47,111,181,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Partenaire officiel · Produit & conseil technique
        </div>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 0.75rem',
          }}
        >
          Imprimantes Industrielles Leibinger
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          Essor Consulting est distributeur/partenaire officiel Leibinger — fabricant allemand reconnu à l&apos;international dans le marquage et le codage industriel — au Maroc.
        </p>
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(27,53,84,0.1)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: 960,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'var(--blue-bright)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <img src="/images/logos/leibinger.svg" alt="Leibinger" style={{ height: 32, width: 'auto' }} />
        </div>

        <p style={{ fontSize: '1.02rem', color: 'var(--ink)', lineHeight: 1.75, fontWeight: 300, marginBottom: '2.25rem', maxWidth: 720 }}>
          {LEIBINGER.positioning}
        </p>

        <div className="leibinger-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '3rem' }}>
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)', marginBottom: '0.9rem' }}>
              Caractéristiques
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {LEIBINGER.features.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(27,53,84,0.06)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--mid)',
                    lineHeight: 1.5,
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)', marginBottom: '0.9rem' }}>
              Ce qui est inclus
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem' }}>
              {LEIBINGER.includes.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(27,53,84,0.06)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    color: 'var(--mid)',
                    lineHeight: 1.5,
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: 'var(--blue-bright)', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>
              Prix
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1.75rem' }}>
              Sur devis — dépend du modèle et du volume
            </div>

            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: 'var(--ink)',
                fontFamily: 'DM Mono, monospace',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Demander une démonstration →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Prestations() {
  return (
    <section id="prestations" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
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
              color: 'rgba(47,111,181,0.55)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              01 / Prestations Opérationnelles
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.8rem, 5vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                margin: 0,
                color: 'var(--ink)',
              }}
            >
              Ce qu'on exécute pour vous.
            </h2>
          </div>
          <p style={{
            fontSize: '1rem',
            color: 'var(--mid)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 440,
          }}>
            Pas du conseil — de l'exécution. Nos propres équipes, notre propre matériel, sur devis,
            sans sous-traitance cachée.
          </p>
        </div>

        <ServicesValeurAjoutee />

        <PackInventaire />

        <LeibingerOffer />

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          <a href="/contact" className="btn-primary">Discuter de votre besoin →</a>
          <a href="/conseil" className="btn-outline">Voir nos offres Conseil</a>
        </div>
      </div>
    </section>
  )
}
