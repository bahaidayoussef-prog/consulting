import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import SchemaScript from './SchemaHelper'

const faqEase = [0.16, 1, 0.3, 1] as const

const services = [
  {
    num: '01',
    title: 'Diagnostic Express',
    tagline: "Un regard extérieur en 2 à 6 semaines.",
    desc: "Cartographier l'existant, identifier les vraies causes racines, mesurer l'écart entre le potentiel et la réalité terrain. Rapport synthèse + leviers chiffrés + session restitution dirigeant.",
    tiers: [
      { name: 'Diagnostic Flash', price: '35 000 – 55 000 MAD HT', duration: '2 semaines' },
      { name: 'Diagnostic Stratégique', price: '80 000 – 130 000 MAD HT', duration: '4 à 6 semaines', featured: true },
      { name: 'Diagnostic Multi-sites', price: 'Sur devis', duration: '6 à 12 semaines' },
    ],
  },
  {
    num: '02',
    title: 'Optimisation Stocks',
    tagline: "Libérer du cash. Éliminer les ruptures.",
    desc: "Analyse ABC/XYZ, stock dormant identifié, paramétrage ERP, politique de stocks structurée. De l'audit rapide au déploiement DDMRP certifié sur les cas complexes.",
    tiers: [
      { name: 'Stock Quick Win', price: '45 000 – 75 000 MAD HT', duration: '4 à 6 semaines' },
      { name: 'Refonte Politique Stocks', price: '100 000 – 180 000 MAD HT', duration: '3 à 4 mois', featured: true },
      { name: 'DDMRP / IBP', price: 'Sur devis', duration: '5 à 9 mois' },
    ],
  },
  {
    num: '03',
    title: 'Performance Achats',
    tagline: "3 à 11% d'économies réalisées. Chiffré, pas promis.",
    desc: "Analyse spend, matrice Kraljic, contrats cadres, panel fournisseurs, KPIs achats. Référence : 710M MAD d'achats pilotés, 11% d'économies réalisées — Groupe Addoha.",
    tiers: [
      { name: 'Achats Quick Wins', price: '50 000 – 80 000 MAD HT', duration: '4 à 6 semaines' },
      { name: 'Structuration Achats', price: '120 000 – 200 000 MAD HT', duration: '3 à 5 mois', featured: true },
      { name: 'Performance Achats ETI', price: 'Sur devis', duration: '6 à 12 mois' },
    ],
  },
  {
    num: '04',
    title: 'Schéma Logistique',
    tagline: "Référence greenfield Renault-Nissan Tanger.",
    desc: "Cartographie flux physiques et informationnels, modélisation réseau, simulations make/buy, business case chiffré, pilotage transition. Du simple audit au projet greenfield complet.",
    tiers: [
      { name: 'Audit Logistique', price: '60 000 – 90 000 MAD HT', duration: '4 à 6 semaines' },
      { name: 'Redéfinition Schéma', price: '150 000 – 250 000 MAD HT', duration: '3 à 5 mois', featured: true },
      { name: 'Greenfield / Expansion', price: 'Sur devis', duration: '6 à 12 mois' },
    ],
  },
  {
    num: '05',
    title: 'Cahiers des Charges',
    tagline: 'Formaliser le besoin, avant de consulter le marché.',
    desc: "Rédaction de cahiers des charges techniques pour toute consultation Supply Chain & Logistique : systèmes (WMS, TMS, APS, Control Tower, intégration IA au pilotage logistique, transport et supply chain), externalisation (entreposage en open book ou closed book, transport), opérations spéciales (co-packing, fardelage, gestion d'inventaire RFID, vidéosurveillance) et équipements (rayonnage conventionnel ou à accumulation, engins de manutention thermiques et électriques — dimensionnement inclus). Document formalisé et chiffré, prêt à diffuser aux prestataires. Zéro commission fournisseur ou intégrateur — notre seule allégeance est votre business case. Complémentaire à l'Étude de Faisabilité SI ci-dessous pour qui veut aussi le scoring et la sélection des prestataires.",
    tiers: [
      { name: 'Cahier des Charges Simple', price: '25 000 – 40 000 MAD HT', duration: '2 à 3 semaines' },
      { name: 'Cahier des Charges Multi-lots', price: '45 000 – 80 000 MAD HT', duration: '4 à 6 semaines', featured: true },
      { name: 'Cahier des Charges Multi-sites', price: 'Sur devis', duration: '6 à 10 semaines' },
    ],
  },
  {
    num: '06',
    title: 'Étude de Faisabilité SI',
    tagline: "Avant d'acheter un logiciel, comprendre ce dont vous avez besoin.",
    desc: "Expression de besoins, cartographie SI existant, RFP formalisé, scoring éditeurs, business case ROI sur 5 ans. Zéro commission. Notre seule allégeance est à votre business case.",
    tiers: [
      { name: 'Cadrage SI', price: '40 000 – 65 000 MAD HT', duration: '3 à 5 semaines' },
      { name: 'Étude de Faisabilité', price: '90 000 – 160 000 MAD HT', duration: '5 à 8 semaines', featured: true },
      { name: 'Due Diligence SI', price: 'Sur devis', duration: '8 à 16 semaines' },
    ],
  },
  {
    num: '07',
    title: 'AMOA & Pilotage Projet',
    tagline: "Nous représentons vos intérêts face à l'intégrateur.",
    desc: "Pilotage intégrateur en votre nom, gestion avenants, comité de pilotage, change management équipes, stabilisation post go-live. De l'accompagnement léger au programme management multi-projets.",
    tiers: [
      { name: 'AMOA Légère', price: '70 000 – 120 000 MAD HT', duration: '2 à 4 mois' },
      { name: 'AMOA Complète', price: '180 000 – 350 000 MAD HT', duration: '3 à 8 mois', featured: true },
      { name: 'AMOA Multi-projets', price: 'Sur devis', duration: '6 à 18 mois' },
    ],
  },
  {
    num: '08',
    title: 'IA & Automatisation Supply Chain',
    tagline: "Des cas d'usage à ROI mesuré — sans hype, sans dépendance éditeur.",
    desc: "Identifier les cas d'usage IA et automatisation à retour rapide sur vos processus Supply Chain, Logistique et Achats : prévision augmentée, automatisation documentaire (factures fournisseurs, documents de douane), copilotes de planification et de S&OP, assistants de connaissance (procédures, SOP), chatbots de suivi de commande. Cadrage et priorisation des cas d'usage, préparation des données (data readiness), charte de gouvernance conforme loi 09-08 / CNDP, puis POC mesuré avec décision go/no-go chiffrée avant industrialisation. Zéro commission éditeur ou intégrateur — notre seule allégeance est votre business case.",
    tiers: [
      { name: "Cadrage & Cas d'Usage IA", price: '35 000 – 55 000 MAD HT', duration: '3 à 4 semaines' },
      { name: 'POC Automatisation Ciblée', price: '90 000 – 160 000 MAD HT', duration: '2 à 4 mois', featured: true },
      { name: 'Déploiement & Industrialisation', price: 'Sur devis', duration: '4 à 9 mois' },
    ],
  },
]

interface SingleOffer {
  tag: string
  name: string
  specs: { label: string; value: string }[]
  includes: string[]
}

const COACHING: { eyebrow: string; title: string; desc: string; offer: SingleOffer; ctaLabel: string } = {
  eyebrow: 'Accompagnement individuel',
  title: 'Coaching Premium Dirigeants & Directeurs',
  desc: "Distinct de la formation (compétence collective, transférée à une équipe) et du mandat DSC à temps partagé (implication opérationnelle) : un accompagnement individuel pour le dirigeant lui-même — prise de recul stratégique, aide à la décision sur des enjeux complexes, structuration de la vision Supply Chain ou Achats à l'échelle de l'entreprise.",
  offer: {
    tag: '1 dirigeant · Achats, Logistique, Supply Chain & fonctions support',
    name: 'Coaching Individuel',
    specs: [
      { label: 'Prix', value: 'Sur devis' },
      { label: 'Durée', value: '6 à 12 mois' },
      { label: 'Rythme', value: 'Bimensuel ou mensuel' },
    ],
    includes: [
      'Séances individuelles avec un consultant senior certifié DDMRP',
      'Prise de recul stratégique sur vos enjeux Supply Chain / Achats',
      'Aide à la décision sur des sujets complexes',
      "Structuration de la vision à l'échelle de l'entreprise",
    ],
  },
  ctaLabel: 'Demander un premier échange',
}

const DOUANE: { eyebrow: string; title: string; desc: string; offer: SingleOffer; ctaLabel: string } = {
  eyebrow: 'Conformité douanière',
  title: 'Accompagnement Régimes Douaniers Suspensifs',
  desc: "Le stock vu par la douane n'est pas toujours le stock vu par la logistique. Pour les entreprises sous Admission Temporaire, Entrepôt Industriel Franc ou régime suspensif similaire — notamment en automobile et aéronautique — cet écart devient un risque de redressement s'il n'est pas traité en amont. Un angle mort spécifique, en lien direct avec notre expertise DDMRP et gestion de stock.",
  offer: {
    tag: 'Admission Temporaire · Entrepôt Industriel Franc',
    name: 'Audit & Régularisation AT',
    specs: [
      { label: 'Prix', value: 'Sur devis' },
      { label: 'Durée', value: 'À définir selon périmètre' },
    ],
    includes: [
      'Audit et réconciliation stock théorique (douane) vs stock réel',
      'Identification et traitement des écarts avant redressement',
      'Accompagnement à la régularisation des comptes AT (apurement)',
      'Diagnostic préventif avant contrôle douanier',
      'Mise en place d’un suivi continu pour éviter la récurrence des écarts',
    ],
  },
  ctaLabel: 'Discuter de votre situation',
}

function SingleOfferSection({ eyebrow, title, desc, offer, ctaLabel }: { eyebrow: string; title: string; desc: string; offer: SingleOffer; ctaLabel: string }) {
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
          {eyebrow}
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
          {title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
          {desc}
        </p>
      </div>

      <div
        style={{
          maxWidth: 480,
          background: '#fff',
          border: '1px solid rgba(27,53,84,0.1)',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.6)', marginBottom: '0.6rem' }}>
          {offer.tag}
        </div>

        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.5rem' }}>
          {offer.name}
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', margin: '0 0 1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
          {offer.specs.map((spec) => (
            <div key={spec.label}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.45)', marginBottom: '0.35rem' }}>
                {spec.label}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: spec.label === 'Prix' ? 700 : 500, color: 'var(--ink)' }}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(95,102,114,0.5)', marginBottom: '0.75rem' }}>
          Inclus
        </div>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          {offer.includes.map((item) => (
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
          {ctaLabel} →
        </a>
      </div>
    </div>
  )
}

function ServiceRow({ s, index }: { s: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '2.5rem 0',
          display: 'grid',
          gridTemplateColumns: '64px 1fr auto',
          gap: '2.5rem',
          alignItems: 'center',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'opacity 0.2s',
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
            color: 'rgba(47,111,181,0.5)',
            textTransform: 'uppercase',
          }}
        >
          {s.num}
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
          >
            <div style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(1.5rem, 2.8vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '0.25rem',
            }}>
              {s.title}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--mid)',
              fontWeight: 300,
            }}>
              {s.tagline}
            </div>
          </motion.div>
        </div>

        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '1.1rem',
          color: open ? 'var(--blue-bright)' : 'var(--mid)',
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
                fontSize: '1rem',
                color: 'var(--mid)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: 600,
                marginBottom: '2.5rem',
              }}>
                {s.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {s.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    style={{
                      background: tier.featured ? 'var(--ink)' : '#fff',
                      border: `1px solid ${tier.featured ? 'rgba(47,111,181,0.35)' : 'rgba(27,53,84,0.12)'}`,
                      padding: '2.5rem',
                      position: 'relative',
                      boxShadow: tier.featured ? '0 8px 40px rgba(10,20,32,0.18)' : '0 2px 12px rgba(0,0,0,0.04)',
                    }}
                  >
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
                      color: tier.featured ? 'rgba(47,111,181,0.7)' : 'rgba(95,102,114,0.6)',
                      marginBottom: '0.75rem',
                    }}>
                      {tier.name}
                    </div>

                    {/* Price — focal point */}
                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      color: tier.featured ? 'var(--blue-bright)' : 'var(--ink)',
                      marginBottom: '0.6rem',
                    }}>
                      {tier.price}
                    </div>

                    {/* Duration */}
                    <div style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: tier.featured ? 'rgba(235,232,225,0.45)' : 'rgba(95,102,114,0.65)',
                      marginBottom: '2rem',
                      paddingBottom: '1.5rem',
                      borderBottom: `1px solid ${tier.featured ? 'rgba(255,255,255,0.06)' : 'rgba(27,53,84,0.08)'}`,
                    }}>
                      {tier.duration}
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
                        color: tier.featured ? 'var(--blue-bright)' : 'var(--ink)',
                        fontFamily: 'DM Mono, monospace',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    >
                      Réserver un échange →
                    </a>
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

export const servicesFAQ = [
  {
    q: 'Combien coûte un diagnostic Supply Chain?',
    a: 'Entre 35 000 et 130 000 MAD HT selon la complexité. Diagnostic Flash (35k–55k, 2 sem) pour audit rapide. Diagnostic Stratégique (80k–130k, 4–6 sem) pour analyse complète. Livrable: rapport synthèse + leviers chiffrés + session restitution.',
  },
  {
    q: 'Qu\'est-ce que DDMRP et pourquoi l\'implémenter?',
    a: 'Demand Driven Material Requirements Planning. Méthode moderne de gestion des stocks basée sur la demande réelle vs prévisions. Réduit les ruptures de 40–60%, surstocks de 20–30%, libère 15–30% du BFR. Certification requise pour bon déploiement.',
  },
  {
    q: 'Combien de temps pour déployer un WMS?',
    a: 'WMS Mini (SaaS): 6–10 semaines (80k–130k). WMS Pilote: 3–5 mois avec AMOA (180k–320k). WMS Pro (ETI): 6–10 mois (450k+). Durée = scope + nombre sites + intégrations ERP.',
  },
  {
    q: 'Avez-vous des références clients?',
    a: 'Oui. 110+ missions réalisées. Clients majeurs: Renault-Nissan, L\'Oréal Maroc, Nestlé, P&G, DHL, Huawei, J&J, Addoha, OCP. Résultats: réductions coûts 3–11%, erreurs −70–90%, productivité +25–50%.',
  },
  {
    q: 'Facturez-vous des commissions sur les logiciels?',
    a: 'Non. Zéro commission éditeur. Notre seule allégeance est au business case client. Recommandations Tier 1/2 (Odoo, SAP, etc) basées uniquement sur vos besoins, pas notre intérêt.',
  },
  {
    q: 'Combien de temps dure un accompagnement Systèmes SI & IA ?',
    a: "De 4 semaines à 10 mois selon le système et le palier. Control Tower Mini : 4 à 6 semaines. APS/S&OP et e-Procurement : 6 à 8 semaines (Mini) à 9 mois (Pro). TMS : 6 à 10 semaines (Mini) à 9 mois (Pro). WMS : voir la question dédiée ci-dessus (6 semaines à 10 mois). La durée dépend du scope, du nombre de sites et des intégrations ERP nécessaires.",
  },
  {
    q: 'Rédigez-vous des cahiers des charges pour autre chose que les systèmes SI (WMS/TMS/APS) ?',
    a: "Oui. Au-delà des systèmes (WMS, TMS, APS, Control Tower, intégration IA au pilotage), nous rédigeons des cahiers des charges pour l'externalisation (entreposage en open book ou closed book, transport), les opérations spéciales (co-packing, fardelage, gestion d'inventaire RFID, vidéosurveillance) et les équipements (rayonnage conventionnel ou à accumulation, engins de manutention thermiques et électriques avec dimensionnement). De 25 000 à 80 000 MAD HT selon le nombre de lots couverts, ou sur devis pour un périmètre multi-sites.",
  },
  {
    q: 'Proposez-vous un accompagnement après le déploiement WMS/TMS/APS ?',
    a: "Oui, via notre offre AMOA & Pilotage Projet — nous représentons vos intérêts face à l'intégrateur, avec gestion des avenants, comité de pilotage, change management des équipes et stabilisation post go-live. De l'accompagnement léger (2 à 4 mois) au programme management multi-projets (sur devis, 6 à 18 mois).",
  },
  {
    q: "Qu'est-ce qui différencie l'Accompagnement Régimes Douaniers Suspensifs d'un cabinet de transit classique ?",
    a: "Notre angle est la réconciliation stock théorique (vu par la douane) vs stock réel (vu par la logistique), en lien direct avec notre expertise DDMRP et gestion de stock — pas seulement la formalité déclarative qu'un cabinet de transit classique traite. Particulièrement pertinent en automobile et aéronautique, où cet écart devient vite un risque de redressement s'il n'est pas traité en amont.",
  },
]

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: servicesFAQ.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: faqEase }}
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
            transition={{ duration: 0.35, ease: faqEase }}
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

export default function Conseil() {
  return (
    <>
      <SchemaScript schema={servicesSchema} />
      <section id="conseil" style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
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
              04 / Conseil & AMOA
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
              Nos offres Conseil.
            </h2>
          </div>
          <p style={{
            fontSize: '1rem',
            color: 'var(--mid)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 440,
          }}>
            Chaque mission est cadrée en livrables fermes, délai engagé et résultat cible chiffré.
            Pas de régie sans fin. Pas de jargon qui rassure plus le consultant que le client.
          </p>
        </div>

        <div>
          <div style={{ borderTop: '1px solid var(--border)' }} />
          {services.map((s, i) => (
            <ServiceRow key={s.num} s={s} index={i} />
          ))}
        </div>

        <SingleOfferSection eyebrow={COACHING.eyebrow} title={COACHING.title} desc={COACHING.desc} offer={COACHING.offer} ctaLabel={COACHING.ctaLabel} />

        <SingleOfferSection eyebrow={DOUANE.eyebrow} title={DOUANE.title} desc={DOUANE.desc} offer={DOUANE.offer} ctaLabel={DOUANE.ctaLabel} />

        <div style={{ marginTop: '6rem' }}>
          <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(47,111,181,0.55)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Questions fréquentes
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>
              Vos questions, nos réponses.
            </h3>
          </div>
          <div style={{ maxWidth: 900 }}>
            {servicesFAQ.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          <a href="/contact" className="btn-primary">Réserver un échange gratuit →</a>
          <a href="/a-propos" className="btn-outline">Notre approche</a>
        </div>
        </div>
      </section>
    </>
  )
}
