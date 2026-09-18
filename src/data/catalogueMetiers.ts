// Catalogue par métier de l'offre Ingénierie de Formation.
// `source: 'nextinotech'` = programme livré directement par Nextinotech (lié à un id de src/data/formations.ts).
// `source: 'partenaires'` = besoin sourcé via le réseau de partenaires formateurs de Nextinotech, sans commission éditeur.

export interface ThemeFormation {
  titre: string
  tendance?: boolean
  programId?: string
}

export interface MetierCatalogue {
  id: string
  nom: string
  icon: string
  source: 'nextinotech' | 'partenaires'
  description: string
  themes: ThemeFormation[]
}

export const METIERS_CATALOGUE: MetierCatalogue[] = [
  {
    id: 'supply-chain-achats',
    nom: 'Supply Chain & Achats',
    icon: '📦',
    source: 'nextinotech',
    description: "Le cœur de métier de Nextinotech : conçues et animées par nos consultants terrain.",
    themes: [
      { titre: 'Fondamentaux Supply Chain', programId: 'fondamentaux' },
      { titre: 'Responsable Logistique', programId: 'rl' },
      { titre: 'S&OP et planification de la demande', programId: 'sop' },
      { titre: 'DDMRP — certification Practitioner', programId: 'ddmrp' },
      { titre: 'Négociation achats & fournisseurs', programId: 'negociation-achats' },
      { titre: 'IA générative pour la Supply Chain & les Achats', tendance: true, programId: 'ia-supply-chain' },
    ],
  },
  {
    id: 'operations-entrepot',
    nom: 'Opérations Entrepôt & Transport',
    icon: '🚛',
    source: 'nextinotech',
    description: "Les compétences terrain de vos équipes d'exécution logistique.",
    themes: [
      { titre: 'Préparateur de commandes', programId: 'preparateur-commandes' },
      { titre: 'Conduite en sécurité des chariots (référentiel R489)', programId: 'caces-cariste' },
      { titre: 'HSE entrepôt et logistique', programId: 'hse-entrepot' },
      { titre: 'Diagnostiquer sa maturité logistique', programId: 'maturite-logistique' },
      { titre: 'Digitalisation et capteurs IoT pour le suivi des flux entrepôt', tendance: true },
    ],
  },
  {
    id: 'commerce-international',
    nom: 'Commerce International & Douane',
    icon: '🌍',
    source: 'nextinotech',
    description: 'Sécuriser les flux transfrontaliers, de la déclaration douanière à la conformité réglementaire.',
    themes: [
      { titre: 'Douane et logistique internationale', programId: 'douane-import-export' },
      { titre: 'Incoterms et gestion des risques à l’international' },
      { titre: 'Traçabilité et digitalisation douanière (e-douane, blockchain)', tendance: true },
    ],
  },
  {
    id: 'lean-amelioration',
    nom: 'Lean Management & Amélioration Continue',
    icon: '🔄',
    source: 'nextinotech',
    description: 'Éliminer les gaspillages et ancrer une culture de progrès permanent sur le terrain.',
    themes: [
      { titre: 'Lean Management & 5S', programId: 'lean-5s' },
      { titre: 'Lean Six Sigma Green Belt', programId: 'six-sigma' },
      { titre: 'Amélioration continue & PDCA', programId: 'amelioration-continue' },
      { titre: 'Capteurs IoT et suivi temps réel de la performance terrain', tendance: true },
    ],
  },
  {
    id: 'management-leadership',
    nom: 'Management & Leadership',
    icon: '🧭',
    source: 'nextinotech',
    description: 'Développer la posture managériale de vos encadrants opérationnels.',
    themes: [
      { titre: 'Manager ses équipes opérationnelles', programId: 'management-equipes' },
      { titre: 'Conduite du changement', programId: 'conduite-changement' },
      { titre: 'Leadership pour cadres opérationnels', programId: 'leadership' },
      { titre: 'IA générative pour managers : reporting et aide à la décision', tendance: true },
    ],
  },
  {
    id: 'gestion-projet-si',
    nom: 'Gestion de Projet & Systèmes d’Information',
    icon: '🗂️',
    source: 'nextinotech',
    description: 'Piloter vos projets de transformation et vos déploiements SI (ERP, WMS, TMS).',
    themes: [
      { titre: 'Chef de projet opérationnel', programId: 'chef-projet' },
      { titre: 'Gestion de projet Agile — Scrum & Kanban', programId: 'agile-scrum' },
      { titre: 'AMOA — conduire un projet SI', programId: 'amoa-si' },
      { titre: 'WMS, TMS, ERP — maîtriser les outils', programId: 'wms' },
      { titre: 'Automatisation et IA générative dans la conduite de projet', tendance: true },
    ],
  },
  {
    id: 'finance-controle-gestion',
    nom: 'Finance & Contrôle de Gestion',
    icon: '📊',
    source: 'nextinotech',
    description: 'La finance appliquée aux décisions opérationnelles — pour non-financiers.',
    themes: [
      { titre: 'Lire et analyser les chiffres clés', programId: 'finance-chiffres' },
      { titre: 'Construire un business case & ROI', programId: 'business-case' },
      { titre: 'Contrôle de gestion pour non-financiers', programId: 'controle-gestion' },
      { titre: 'IA appliquée au contrôle de gestion et à la prévision budgétaire', tendance: true },
    ],
  },
  {
    id: 'carriere-developpement-personnel',
    nom: 'Carrière & Développement Personnel',
    icon: '🌱',
    source: 'nextinotech',
    description: 'Construire sa trajectoire professionnelle et préserver son énergie sous pression opérationnelle.',
    themes: [
      { titre: 'Développement de carrière en Supply Chain', programId: 'developpement-carriere' },
      { titre: 'Prévenir le burnout & gérer son énergie', programId: 'prevenir-burnout' },
      { titre: 'IA générative pour construire son plan de développement de compétences', tendance: true },
    ],
  },
  {
    id: 'ressources-humaines',
    nom: 'Ressources Humaines',
    icon: '🤝',
    source: 'partenaires',
    description: 'Recrutement, gestion des talents et politique RH — sourcées auprès de notre réseau de partenaires formateurs, sans commission éditeur.',
    themes: [
      { titre: 'Recrutement et intégration des nouveaux collaborateurs' },
      { titre: 'Gestion prévisionnelle des emplois et des compétences (GPEC)' },
      { titre: 'Système de rémunération et politique RH' },
      { titre: 'IA générative pour le recrutement et la gestion des talents', tendance: true },
    ],
  },
  {
    id: 'administratif-social',
    nom: 'Gestion Administrative & Sociale',
    icon: '📁',
    source: 'partenaires',
    description: 'Paie, droit social et gestion administrative du personnel.',
    themes: [
      { titre: 'Gestion de la paie et des déclarations sociales (CNSS, AMO)' },
      { titre: 'Droit du travail marocain appliqué' },
      { titre: 'Dématérialisation des processus administratifs RH', tendance: true },
    ],
  },
  {
    id: 'juridique',
    nom: 'Juridique & Conformité',
    icon: '⚖️',
    source: 'partenaires',
    description: 'Droit des affaires, contrats et conformité réglementaire.',
    themes: [
      { titre: 'Droit des contrats commerciaux' },
      { titre: 'Conformité et gestion des risques juridiques' },
      { titre: 'Protection des données personnelles (loi 09-08) à l’ère de l’IA', tendance: true },
    ],
  },
  {
    id: 'commercial-vente',
    nom: 'Commercial & Vente',
    icon: '💼',
    source: 'partenaires',
    description: 'Techniques de vente, négociation client et pilotage de la performance commerciale.',
    themes: [
      { titre: 'Techniques de vente et prospection' },
      { titre: 'Négociation commerciale avancée' },
      { titre: 'Pilotage de la performance commerciale par la donnée' },
      { titre: 'IA générative pour la prospection et la relation client', tendance: true },
    ],
  },
  {
    id: 'marketing-digital',
    nom: 'Marketing & Digital',
    icon: '📱',
    source: 'partenaires',
    description: 'Stratégie digitale, marketing de contenu et pilotage de la donnée marketing.',
    themes: [
      { titre: 'Stratégie et marketing digital' },
      { titre: 'Community management et réseaux sociaux' },
      { titre: 'IA générative pour la création de contenu et le marketing automation', tendance: true },
    ],
  },
  {
    id: 'communication',
    nom: 'Communication',
    icon: '🗣️',
    source: 'partenaires',
    description: 'Communication interne, prise de parole et relation avec les parties prenantes.',
    themes: [
      { titre: 'Prise de parole en public' },
      { titre: 'Communication interne et conduite du changement' },
      { titre: 'Rédaction professionnelle assistée par IA', tendance: true },
    ],
  },
  {
    id: 'qse',
    nom: 'Qualité, Sécurité & Environnement',
    icon: '🛡️',
    source: 'partenaires',
    description: 'Systèmes de management qualité, sécurité au travail et enjeux environnementaux.',
    themes: [
      { titre: 'Mise en place d’un système de management qualité (ISO 9001)' },
      { titre: 'Sécurité au travail et prévention des risques professionnels' },
      { titre: 'Digitalisation QSE et capteurs IoT pour le suivi des indicateurs', tendance: true },
    ],
  },
  {
    id: 'production-industrie',
    nom: 'Production & Industrie',
    icon: '🏭',
    source: 'partenaires',
    description: 'Pilotage de production, ordonnancement et performance industrielle.',
    themes: [
      { titre: 'Ordonnancement et pilotage de production (GPAO)' },
      { titre: 'Performance industrielle et TRS' },
      { titre: 'Jumeau numérique et IoT industriel', tendance: true },
    ],
  },
  {
    id: 'maintenance-industrielle',
    nom: 'Maintenance Industrielle',
    icon: '🔧',
    source: 'partenaires',
    description: 'Maintenance préventive, GMAO et fiabilisation des équipements.',
    themes: [
      { titre: 'Maintenance préventive et gestion des pièces de rechange' },
      { titre: 'Mise en place d’une GMAO' },
      { titre: 'Maintenance prédictive par capteurs et IA', tendance: true },
    ],
  },
  {
    id: 'marches-publics',
    nom: 'Marchés Publics',
    icon: '🏛️',
    source: 'partenaires',
    description: 'Réponse aux appels d’offres publics et réglementation des marchés publics marocains.',
    themes: [
      { titre: 'Réglementation des marchés publics au Maroc' },
      { titre: 'Réponse aux appels d’offres et soumission électronique' },
      { titre: 'Dématérialisation et portail des marchés publics', tendance: true },
    ],
  },
  {
    id: 'bureautique-digital',
    nom: 'Bureautique & Outils Digitaux',
    icon: '💻',
    source: 'partenaires',
    description: 'Maîtrise des outils bureautiques et des nouveaux outils numériques du quotidien.',
    themes: [
      { titre: 'Excel avancé et tableaux de bord' },
      { titre: 'Suite collaborative (Microsoft 365 / Google Workspace)' },
      { titre: 'IA générative bureautique (Copilot, assistants no-code)', tendance: true },
    ],
  },
]
