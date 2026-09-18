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

export interface MetierEmergent {
  titre: string
  description: string
}

// Rôles apparus ou devenus majeurs au cours des 5 dernières années, synthétisés à
// partir de référentiels publics et de rapports institutionnels (World Economic
// Forum — Future of Jobs Report, LinkedIn Jobs on the Rise / Workplace Learning
// Report, U.S. Bureau of Labor Statistics / O*NET). Aucun contenu de cabinet de
// formation privé n'est repris.
export const METIERS_EMERGENTS: MetierEmergent[] = [
  { titre: 'Ingénieur IA (AI Engineer)', description: "Conçoit, entraîne et déploie des modèles d'intelligence artificielle intégrés aux produits et processus métier." },
  { titre: 'Spécialiste en ingénierie de prompts', description: "Conçoit et optimise les instructions données aux outils d'IA générative pour en tirer des résultats fiables et exploitables." },
  { titre: 'Data Analyst / Data Scientist', description: "Exploite de grands volumes de données pour éclairer les décisions de l'entreprise — l'une des fonctions dont la croissance est la plus rapide au niveau mondial." },
  { titre: "Responsable de la gouvernance de l'IA", description: "Définit les règles internes d'usage sûr, éthique et conforme de l'intelligence artificielle dans l'entreprise." },
  { titre: 'Spécialiste en annotation et qualité des données', description: "Prépare et structure les données utilisées pour entraîner des modèles d'IA fiables." },
  { titre: 'Responsable RSE / ESG', description: 'Pilote la stratégie de durabilité et produit le reporting environnemental, social et de gouvernance désormais exigé par les grands donneurs d’ordre.' },
  { titre: 'Analyste / Consultant en cybersécurité', description: "Protège les systèmes d'information de l'entreprise contre les cybermenaces, une fonction en croissance continue." },
  { titre: 'Growth Marketer', description: 'Combine marketing digital, données et expérimentation rapide pour accélérer l’acquisition et la fidélisation de clients.' },
  { titre: 'Développeur No-code / Low-code', description: 'Construit des applications métier sans développement classique, via des plateformes visuelles.' },
  { titre: 'Spécialiste en transition énergétique', description: "Accompagne les projets d'énergies renouvelables et de mobilité électrique, un axe de croissance identifié au Maroc comme à l'international." },
]

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
  {
    id: 'direction-strategie',
    nom: 'Direction Générale & Stratégie',
    icon: '🎯',
    source: 'partenaires',
    description: "Pilotage stratégique, transformation d'entreprise et prise de décision au sommet.",
    themes: [
      { titre: 'Pilotage stratégique par la donnée' },
      { titre: "Conduite de la transformation d'entreprise" },
      { titre: "Gouvernance et prise de décision en contexte d'incertitude" },
      { titre: "IA générative pour le pilotage stratégique et l'aide à la décision", tendance: true },
    ],
  },
  {
    id: 'data-ia-analytics',
    nom: 'Data, Intelligence Artificielle & Analytics',
    icon: '🧠',
    source: 'partenaires',
    description: 'Exploiter la donnée et l’IA pour éclairer les décisions, au-delà de la Supply Chain.',
    themes: [
      { titre: 'Data science et analyse de données pour non-spécialistes' },
      { titre: 'Gouvernance et qualité de la donnée' },
      { titre: "Construire un cas d'usage IA en entreprise" },
      { titre: 'IA générative appliquée métier : cadrage et déploiement', tendance: true },
    ],
  },
  {
    id: 'cybersecurite',
    nom: 'Cybersécurité & Risques Numériques',
    icon: '🔐',
    source: 'partenaires',
    description: "Protéger l'entreprise face à des menaces numériques en croissance continue.",
    themes: [
      { titre: 'Sensibilisation à la cybersécurité pour tous les collaborateurs' },
      { titre: "Gestion de crise cyber et continuité d'activité" },
      { titre: 'Conformité et protection des données personnelles' },
      { titre: "Sécurisation des usages de l'IA générative en entreprise", tendance: true },
    ],
  },
  {
    id: 'btp-immobilier',
    nom: 'Bâtiment, Travaux Publics & Immobilier',
    icon: '🏗️',
    source: 'partenaires',
    description: 'Gestion de chantier, réglementation et digitalisation de la construction.',
    themes: [
      { titre: 'Gestion de chantier et coordination sécurité' },
      { titre: 'Réglementation de la construction au Maroc' },
      { titre: 'Maquette numérique du bâtiment (BIM) et construction durable', tendance: true },
    ],
  },
  {
    id: 'tourisme-hotellerie',
    nom: 'Tourisme, Hôtellerie & Restauration',
    icon: '🏨',
    source: 'partenaires',
    description: "Excellence de service et gestion opérationnelle des métiers de l'accueil.",
    themes: [
      { titre: "Excellence de l'accueil et de l'expérience client" },
      { titre: 'Gestion opérationnelle d’un établissement touristique' },
      { titre: 'Tourisme durable et gestion de la réputation en ligne', tendance: true },
    ],
  },
  {
    id: 'agroalimentaire',
    nom: 'Agroalimentaire & Industries Agricoles',
    icon: '🌾',
    source: 'partenaires',
    description: 'Sécurité sanitaire, qualité et export des produits agroalimentaires.',
    themes: [
      { titre: 'Sécurité sanitaire des aliments et traçabilité' },
      { titre: 'Normes qualité et export agroalimentaire' },
      { titre: 'Agriculture de précision et traçabilité digitale', tendance: true },
    ],
  },
  {
    id: 'textile-artisanat',
    nom: 'Textile, Cuir & Artisanat',
    icon: '🧵',
    source: 'partenaires',
    description: 'Production, qualité et export des métiers du textile et de l’artisanat.',
    themes: [
      { titre: 'Techniques de production et contrôle qualité textile' },
      { titre: "Normes et exigences des marchés export" },
      { titre: 'Mode durable et digitalisation de la production artisanale', tendance: true },
    ],
  },
  {
    id: 'commerce-distribution',
    nom: 'Commerce, Distribution & Retail',
    icon: '🛒',
    source: 'partenaires',
    description: 'Performance du point de vente, e-commerce et expérience client.',
    themes: [
      { titre: 'Techniques de vente en point de vente et merchandising' },
      { titre: 'Gestion des stocks et approvisionnement retail' },
      { titre: 'E-commerce, omnicanal et expérience client augmentée', tendance: true },
    ],
  },
  {
    id: 'services-personne-social',
    nom: 'Services à la Personne, Santé & Social',
    icon: '❤️',
    source: 'partenaires',
    description: "Accompagnement social et médico-social, un secteur en forte demande.",
    themes: [
      { titre: 'Accompagnement et aide à domicile' },
      { titre: 'Gestion d’un établissement médico-social' },
      { titre: "Digitalisation de l'accompagnement social et sanitaire", tendance: true },
    ],
  },
  {
    id: 'pedagogie-formation',
    nom: 'Pédagogie & Ingénierie de Formation',
    icon: '🎓',
    source: 'partenaires',
    description: 'Concevoir, animer et évaluer des dispositifs de formation efficaces.',
    themes: [
      { titre: 'Concevoir un dispositif de formation efficace' },
      { titre: 'Formation de formateurs internes' },
      { titre: 'Digital learning et IA appliquée à la pédagogie', tendance: true },
    ],
  },
]
