// Source unique des méta-données par route, consommée par le plugin de prérendu
// (vite.config.ts) pour injecter <title>, meta description, canonical, OG et
// JSON-LD dans un fichier HTML statique par page. Module pur (aucun React).

import { VILLES, buildVilleSchema } from './villesFormation'
import { PROGRAMMES, buildProgrammeSchema, programmesSchema, rlCourseSchema, catalogueMeta } from './formations'

export interface PrerenderRoute {
  path: string
  title: string
  description: string
  jsonLd?: unknown[]
}

const SUFFIX = ' | Nextinotech'

const STATIC: PrerenderRoute[] = [
  {
    path: '/',
    title: 'Nextinotech — Conseil & Formation Supply Chain, Logistique et Achats au Maroc',
    description:
      "Cabinet indépendant de conseil et de formation en Supply Chain, Logistique et Achats au Maroc. Diagnostic, optimisation des stocks (DDMRP), schéma logistique, AMOA WMS/TMS, 27 formations. 20+ ans de terrain, zéro commission éditeur.",
  },
  {
    path: '/conseil',
    title: 'Conseil Supply Chain au Maroc — Diagnostic, Stocks, Achats, Schéma Logistique' + SUFFIX,
    description:
      "Conseil Supply Chain et Logistique pour PME et ETI marocaines : diagnostic, optimisation des stocks et DDMRP, performance achats, schéma logistique, cahiers des charges, IA & automatisation, AMOA. Zéro commission éditeur.",
  },
  {
    path: '/prestations',
    title: 'Prestations Logistiques Opérationnelles au Maroc' + SUFFIX,
    description:
      "Pack Inventaire, services logistiques à valeur ajoutée (co-packing, fardelage, étiquetage, kitting, contrôle qualité, palettisation) et imprimantes industrielles Leibinger. Prestations opérationnelles pour entrepôts au Maroc.",
  },
  {
    path: '/references',
    title: 'Références & Missions — Renault, L’Oréal, Nestlé, OCP, DHL' + SUFFIX,
    description:
      "Plus de 110 missions de conseil et de formation Supply Chain au Maroc : Renault-Nissan, L’Oréal, Nestlé, Groupe Addoha, OCP, DHL, Huawei, J&J, P&G.",
  },
  {
    path: '/a-propos',
    title: 'À propos — Cabinet Supply Chain Indépendant au Maroc' + SUFFIX,
    description:
      "Nextinotech, cabinet indépendant de conseil et d’AMOA en Supply Chain dédié aux PME et ETI marocaines. 20+ ans d’expérience terrain, équipe certifiée DDMRP, zéro commission éditeur.",
  },
  {
    path: '/blog',
    title: 'Blog Supply Chain, Logistique & Achats au Maroc' + SUFFIX,
    description:
      "Plus de 300 articles sur la Supply Chain, la Logistique et les Achats au Maroc : formation, métiers et salaires, méthodes (DDMRP, S&OP, Lean), douane, IA, e-commerce, secteurs.",
  },
  {
    path: '/contact',
    title: 'Contact — Cabinet Conseil & Formation Supply Chain, Casablanca' + SUFFIX,
    description:
      "Contactez Nextinotech pour un diagnostic Supply Chain, une mission de conseil ou une formation. Échange sous 24h. Casablanca, Maroc — contact@nextinotech.com.",
  },
  {
    path: '/carriere',
    title: 'Carrière en Supply Chain au Maroc — Métiers, Compétences, Évolution' + SUFFIX,
    description:
      "Construire sa carrière en Supply Chain, Logistique et Achats au Maroc : cartographie des métiers, compétences recherchées, salaires, plan de développement et formations.",
  },
  {
    path: '/faq',
    title: 'FAQ — Conseil & Formation Supply Chain au Maroc' + SUFFIX,
    description:
      "Réponses aux questions fréquentes sur le conseil Supply Chain, les formations, les tarifs, le financement (CSF / GIAC), les délais et les résultats attendus.",
  },
  {
    path: '/confidentialite',
    title: 'Politique de Confidentialité' + SUFFIX,
    description:
      "Données collectées par le site Nextinotech, finalités, cookies, sous-traitants et vos droits au titre de la loi 09-08.",
  },
  {
    path: '/formation',
    title: catalogueMeta.title,
    description: catalogueMeta.description,
    jsonLd: [programmesSchema],
  },
  {
    path: '/formation-rl',
    title: 'Formation Responsable Logistique — 1 jour · 1 500 MAD · Hôtel 5★ Casablanca' + SUFFIX,
    description:
      "Formation Responsable Logistique de référence au Maroc : 1 journée intensive à Casablanca, 1 500 MAD tout inclus. Fondamentaux, stocks, transport, KPI, WMS/TMS. Financement CSF / GIAC.",
    jsonLd: [rlCourseSchema],
  },
  {
    path: '/directeur-logistique-mi-temps',
    title: 'Directeur Logistique à Temps Partagé au Maroc' + SUFFIX,
    description:
      "Direction opérationnelle de vos entrepôts, transport et flux physiques à temps partagé. Mandat 180k-550k MAD, opérationnel en 2 semaines. PME & ETI Maroc.",
  },
  {
    path: '/directeur-achats-mi-temps',
    title: 'Directeur Achats à Temps Partagé au Maroc' + SUFFIX,
    description:
      "Sourcing, négociation fournisseurs et réduction des coûts d'achat à temps partagé. 11% d'économies chez Addoha. Mandat 180k-550k MAD, PME & ETI Maroc.",
  },
  {
    path: '/direction-supply-chain-temps-partage',
    title: 'Direction Supply Chain à Temps Partagé au Maroc' + SUFFIX,
    description:
      "Direction supply chain à temps partagé pour PME et ETI marocaines. Mandat en 3 phases, 180k-550k MAD, opérationnel en 2 semaines — sans recrutement CDI.",
  },
  {
    path: '/dsc-vs-recrutement-cdi',
    title: 'DSC en CDI ou Mandat à Temps Partagé ? Le Comparatif Complet' + SUFFIX,
    description:
      "Coût réel, délai de démarrage, engagement, résultat en sortie : le comparatif chiffré entre recruter un Directeur Supply Chain en CDI et un mandat à temps partagé.",
  },
  {
    path: '/outils/dimensionnement-entrepot',
    title: 'Simulateur de Dimensionnement d’Entrepôt' + SUFFIX,
    description:
      "Estimez la surface, le nombre d’emplacements et les allées de votre futur entrepôt à partir de vos volumes. Outil gratuit Nextinotech.",
  },
  {
    path: '/outils/productivite-engins-main-doeuvre',
    title: 'Simulateur de Productivité — Engins & Main-d’œuvre Entrepôt' + SUFFIX,
    description:
      "Calculez le nombre d’engins de manutention et de préparateurs nécessaires selon votre activité entrepôt. Outil gratuit Nextinotech.",
  },
  {
    path: '/outils/cout-global-entrepot',
    title: 'Simulateur de Coût Global d’Entrepôt' + SUFFIX,
    description:
      "Estimez le coût complet d’exploitation d’un entrepôt : loyer, main-d’œuvre, engins, énergie, système. Outil gratuit Nextinotech.",
  },
  {
    path: '/demo/wms',
    title: 'Démo WMS — Gestion d’Entrepôt' + SUFFIX,
    description: "Démonstration interactive d’un WMS : réception, mise en stock, préparation, expédition, inventaire.",
  },
  {
    path: '/demo/tms',
    title: 'Démo TMS — Gestion du Transport' + SUFFIX,
    description: "Démonstration interactive d’un TMS : planification des tournées, affrètement, suivi et coûts de transport.",
  },
  {
    path: '/demo/aps',
    title: 'Démo APS — Planification de la Demande' + SUFFIX,
    description: "Démonstration interactive d’un APS : prévision de la demande, plan industriel et commercial, S&OP.",
  },
]

function programmeDescription(subtitle: string, price: string, unit: string): string {
  const base = `${subtitle} ${price} ${unit}. Financement CSF / GIAC possible.`
  return base.length > 158 ? base.slice(0, 155).trimEnd() + '…' : base
}

export function getPrerenderRoutes(): PrerenderRoute[] {
  const villes: PrerenderRoute[] = VILLES.map((v) => ({
    path: `/formation-logistique-${v.slug}`,
    title: v.metaTitle,
    description: v.metaDescription,
    jsonLd: [buildVilleSchema(v)],
  }))

  const programmes: PrerenderRoute[] = PROGRAMMES.filter((p) => p.id !== 'rl').map((p) => ({
    path: `/formation/${p.id}`,
    title: `Formation ${p.title} au Maroc${SUFFIX}`,
    description: programmeDescription(p.subtitle, p.price, p.unit),
    jsonLd: [buildProgrammeSchema(p)],
  }))

  return [...STATIC, ...villes, ...programmes]
}
