// Données et schémas des formations — module pur (aucun import React).
// Extrait de FormationCatalogue.tsx pour être réutilisable par le prérendu (routeMeta) et les pages.

/* ─── Brand constants ─────────────────────────────────────── */
export const WA = `https://wa.me/212663449200?text=${encodeURIComponent('Bonjour Nextinotech, je souhaite des informations sur vos formations. Pouvez-vous me recontacter ?')}`
export const EMAIL = 'mailto:contact@nextinotech.com?subject=Catalogue%20Formations%20Nextinotech'

export const PROGRAMMES = [
  {
    id: 'rl',
    num: '01',
    domaine: 'sc',
    format: 'inter',
    badge: 'Programme phare',
    title: 'Devenir Responsable Logistique',
    subtitle: '1 journée pour structurer votre pilotage logistique.',
    duration: '1 jour',
    hours: '8h30 — 17h30',
    group: '8 à 16 participants',
    price: '1 500',
    unit: 'MAD TTC / participant',
    lieu: 'Hôtel 5★ Casablanca',
    public: ['Coordinateur logistique', 'Responsable de site', "Chef d'équipe transport", 'DG / DAF de PME'],
    modules: [
      'Fondamentaux logistiques & rôle du Responsable',
      'Gestion des stocks, approvisionnements & DDMRP',
      'Transport & schéma logistique (compte propre vs 3PL)',
      'Pilotage : les 12 KPIs indispensables & tableau de bord',
      'WMS · TMS · ERP — choisir et déployer',
      "Cas pratique terrain : plan d'action à 90 jours",
    ],
    inclus: ['Hôtel 5★', 'Déjeuner gastronomique', 'Pauses café', 'Support 60+ pages', 'Attestation', 'Suivi WhatsApp 30j'],
    cta: '/formation-rl',
    color: 'var(--blue-bright)',
  },
  {
    id: 'fondamentaux',
    num: '02',
    domaine: 'sc',
    format: 'intra',
    badge: 'Intra-entreprise',
    title: 'Supply Chain Fondamentaux',
    subtitle: 'Les bases de la supply chain pour vos équipes non spécialistes.',
    duration: '1 à 2 jours',
    hours: 'En présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Équipes opérationnelles', 'Managers non spécialistes SC', 'Acheteurs juniors', 'Assistants logistique'],
    modules: [
      'Flux physiques et informationnels — comprendre la chaîne',
      'Gestion des stocks : ABC, couverture, point de commande',
      'Transport & incoterms essentiels',
      "Achats : processus, appel d'offre, évaluation fournisseur",
      'KPIs supply chain — lire et utiliser ses indicateurs',
      'Cas pratiques tirés de votre secteur',
    ],
    inclus: ['Adaptation secteur', 'Cas pratiques sur mesure', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'sop',
    num: '03',
    domaine: 'sc',
    format: 'intra',
    badge: 'Intra-entreprise',
    title: 'S&OP & Planification Avancée',
    subtitle: 'Maîtriser le Sales & Operations Planning et la planification demand-driven.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '28 000 – 42 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Équipes planification', 'Demand planners', 'Supply chain managers', 'Directeurs commerce & opérations'],
    modules: [
      'Processus S&OP : les 5 étapes clés',
      'Prévisions de la demande : méthodes et précision (MAPE)',
      'Plan industriel & commercial — construction et animation',
      'Gestion de la capacité et des contraintes',
      'Introduction au DDMRP et à la planification demand-driven',
      'Cas pratique S&OP sur données réelles de votre entreprise',
    ],
    inclus: ['Adaptation à vos données', 'Template S&OP livré', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'ddmrp',
    num: '04',
    domaine: 'sc',
    format: 'inter',
    badge: 'Certification',
    title: 'DDMRP — Certification Practitioner',
    subtitle: 'Devenir praticien DDMRP certifié. La méthode de planification du futur.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: '6 à 12 participants',
    price: '5 500',
    unit: 'MAD TTC / participant · hors examen DDI',
    lieu: 'Casablanca',
    public: ['Planificateurs SC', 'Responsables stocks', 'DSC & responsables logistique', 'Consultants SC'],
    modules: [
      'Limites du MRP traditionnel — pourquoi le DDMRP',
      'Les 5 composantes DDMRP : Position, Protection, Pull, Visibilité, Collaboration',
      'Calcul des buffers : rouge, jaune, vert',
      'Paramétrage et ajustement dynamique',
      'Implémentation dans SAP, Oracle ou ERP générique',
      'Examen blanc + préparation à la certification officielle DDI',
    ],
    inclus: ['Support officiel DDMRP', 'Simulateur Excel inclus', 'Préparation examen DDI', 'Attestation Nextinotech'],
    cta: WA,
    color: 'var(--blue-bright)',
  },
  {
    id: 'decideurs',
    num: '05',
    domaine: 'sc',
    format: 'intra',
    badge: 'Atelier dirigeants',
    title: 'Supply Chain pour Décideurs',
    subtitle: 'Comprendre et arbitrer les enjeux SC sans maîtriser le technique.',
    duration: '1 jour',
    hours: 'Atelier CODIR',
    group: '6 à 12 dirigeants',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Directeurs Généraux', 'Directeurs Administratifs & Financiers', 'CODIR', 'Investisseurs & actionnaires'],
    modules: [
      'Lire un diagnostic SC : ce que les KPIs vous disent vraiment',
      'Arbitrer un projet WMS/TMS/APS : critères, pièges, ROI',
      'Comprendre un business case SC : hypothèses et risques',
      'Stocks, service client, cash : le triangle de décision',
      'Les 5 questions à poser à votre DSC',
      "Cas d'arbitrage réels — discussion ouverte",
    ],
    inclus: ['Animation par le fondateur', 'Format discussion/débat', 'Synthèse écrite post-atelier', 'Suivi 30j'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'wms',
    num: '06',
    domaine: 'sc',
    format: 'intra',
    badge: 'Outils & SI',
    title: 'WMS · TMS · ERP — Maîtriser les Outils',
    subtitle: "Choisir, paramétrer et piloter les systèmes d'information supply chain.",
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '32 000 – 48 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux',
    public: ['Responsables entrepôt', 'Chefs de projet SI', 'Responsables logistique', 'DSI & équipes IT'],
    modules: [
      'Cartographie des solutions WMS/TMS/ERP du marché',
      'Définir son cahier des charges fonctionnel',
      "Conduire un appel d'offre SI logistique",
      'Méthode AMOA : recettage, paramétrage, conduite du changement',
      'Pilotage post-déploiement : KPIs système et adoption utilisateur',
      "Retours d'expérience : ce qui fait réussir ou échouer un projet SI",
    ],
    inclus: ["Grille d'évaluation WMS/TMS fournie", 'Template cahier des charges', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'coaching',
    num: '07',
    domaine: 'sc',
    format: 'coaching',
    badge: 'Coaching individuel',
    title: 'Coaching DSC — Montée en Compétence',
    subtitle: 'Sessions mensuelles individualisées pour Directeurs et Responsables SC.',
    duration: 'Sessions mensuelles',
    hours: '3h / session',
    group: '1 participant',
    price: '8 000',
    unit: 'MAD HT / session',
    lieu: 'Présentiel ou visio',
    public: ['Directeurs Supply Chain', 'Responsables Logistique', 'DSC nouvellement nommés', 'SC Managers en transition'],
    modules: [
      'Revue de vos KPIs et indicateurs terrain du mois',
      'Structuration de votre organisation et de vos processus',
      'Déblocage de dossiers complexes (fournisseur, SI, équipe)',
      'Préparation de présentations CODIR',
      'Plan de montée en compétence personnalisé',
      'Réseau et mise en relation avec des pairs du secteur',
    ],
    inclus: ['Accès WhatsApp entre sessions', 'Revue mensuelle documentée', 'Ressources personnalisées', 'Suivi sur 6 à 12 mois'],
    cta: WA,
    color: 'var(--blue-bright)',
  },
  {
    id: 'ia-supply-chain',
    num: '27',
    domaine: 'sc',
    format: 'inter',
    badge: 'Nouveau · IA & Digital',
    title: 'IA Générative pour les Métiers Supply Chain & Achats',
    subtitle: "Exploiter ChatGPT, Claude et Copilot au quotidien — cas d'usage concrets, prompts métier et garde-fous.",
    duration: '1 jour',
    hours: '8h30 — 17h30',
    group: '8 à 14 participants',
    price: '2 900',
    unit: 'MAD TTC / participant',
    lieu: 'Casablanca',
    public: ['Responsables & managers Supply Chain', 'Acheteurs et responsables achats', 'Planificateurs & demand planners', 'Responsables logistique et ADV'],
    modules: [
      'Panorama : IA générative, IA prédictive et RPA — quel outil pour quel problème',
      "25 cas d'usage concrets en approvisionnement, achats, entrepôt, transport et ADV",
      "Prompt engineering métier : la méthode et une bibliothèque de prompts prêts à l'emploi",
      'Automatisation documentaire : factures fournisseurs, documents de douane, comptes rendus S&OP',
      'Gouvernance et conformité : loi 09-08 / CNDP, données à ne jamais exposer, relecture humaine',
      "Atelier : construire son premier cas d'usage IA et son plan à 90 jours",
    ],
    inclus: ['Bibliothèque de 30+ prompts métier', "Modèle de charte d'usage IA", 'Support de formation', 'Attestation', 'Suivi WhatsApp 30j'],
    cta: WA,
    color: 'var(--blue-bright)',
  },

  /* ── Lean & Amélioration Continue ──────────────────────── */
  {
    id: 'lean-5s',
    num: '08',
    domaine: 'lean',
    format: 'intra',
    badge: 'Lean & Amélioration Continue',
    title: 'Lean Management & 5S',
    subtitle: 'Éliminer les gaspillages, structurer les espaces, libérer la performance.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou atelier',
    public: ['Responsables production', 'Chefs de ligne', 'Managers opérationnels', 'Équipes terrain SC / Ops'],
    modules: [
      'Introduction au Lean : philosophie, origines Toyota, principes clés',
      '5S : Trier, Ranger, Nettoyer, Standardiser, Pérenniser',
      'Management visuel et tableau de bord terrain',
      'VSM — Cartographie de la chaîne de valeur',
      'Identification et élimination des 8 gaspillages (MUDA)',
      'Atelier Kaizen : construire son premier chantier terrain',
    ],
    inclus: ['Kit 5S fourni', 'Template VSM Excel', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#2a5c3f',
  },
  {
    id: 'six-sigma',
    num: '09',
    domaine: 'lean',
    format: 'inter',
    badge: 'Certification Green Belt',
    title: 'Lean Six Sigma Green Belt',
    subtitle: 'Maîtriser la démarche DMAIC et conduire des projets de réduction de variabilité.',
    duration: '5 jours',
    hours: '5 × 8h en présentiel',
    group: '6 à 12 participants',
    price: '9 500',
    unit: 'MAD TTC / participant',
    lieu: 'Casablanca',
    public: ['Ingénieurs méthodes', 'Responsables qualité', 'Chefs de projet Ops', 'Managers SC & production'],
    modules: [
      'DMAIC : Define, Measure, Analyze, Improve, Control',
      'Les 7 outils qualité : histogramme, Pareto, Ishikawa, QQOQCP...',
      'Cartographie des processus : VSM, SIPOC, logigramme',
      'Statistiques appliquées : moyenne, écart-type, capabilité Cp/Cpk',
      'Maîtrise Statistique des Procédés (MSP / SPC)',
      'Examen blanc + projet Green Belt encadré',
    ],
    inclus: ['Support officiel DMAIC', 'Simulateur Minitab initiation', 'Préparation Green Belt', 'Attestation Nextinotech'],
    cta: WA,
    color: 'var(--blue-bright)',
  },
  {
    id: 'amelioration-continue',
    num: '10',
    domaine: 'lean',
    format: 'intra',
    badge: 'Lean & Amélioration Continue',
    title: 'Amélioration Continue & PDCA',
    subtitle: 'Ancrer une culture terrain de résolution de problèmes et de progrès permanent.',
    duration: '1 jour',
    hours: '1 × 8h en présentiel',
    group: 'Sur mesure',
    price: '12 000 – 18 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux',
    public: ['Managers de proximité', 'Chefs de ligne', 'Équipes opérationnelles', 'Responsables qualité terrain'],
    modules: [
      'PDCA et DMAIC : les deux piliers de la démarche qualité',
      'Les 5 Pourquoi et la méthode 8D',
      "Animer un QRQC (Quick Response Quality Control)",
      'Quick Wins vs transformations de fond : choisir ses batailles',
      "Construire un plan d'action mensuel et en assurer le suivi",
      "Créer une culture d'amélioration dans son équipe",
    ],
    inclus: ['Fiche PDCA terrain', 'Template 5 Pourquoi / 8D', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#2a5c3f',
  },

  /* ── Management & Leadership ───────────────────────────── */
  {
    id: 'management-equipes',
    num: '11',
    domaine: 'management',
    format: 'intra',
    badge: 'Management & Leadership',
    title: 'Manager ses Équipes Opérationnelles',
    subtitle: 'Développer sa posture de manager et piloter la performance collective.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Managers nouvellement nommés', 'Chefs de service', 'Responsables opérationnels', 'Team leaders SC / Prod'],
    modules: [
      'Les 4 styles de management : directif, persuasif, participatif, délégatif',
      'Fixer des objectifs SMART et suivre la performance individuelle',
      'Déléguer avec efficacité sans perdre le contrôle',
      'Gérer les conflits et les personnalités difficiles',
      'Donner du feedback constructif (méthode DESC)',
      'Animer des réunions efficaces en 30 minutes chrono',
    ],
    inclus: ['Autodiagnostic style de management', 'Cas pratiques sur mesure', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'conduite-changement',
    num: '12',
    domaine: 'management',
    format: 'intra',
    badge: 'Management & Leadership',
    title: 'Conduite du Changement',
    subtitle: 'Piloter les transformations organisationnelles et vaincre les résistances.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '22 000 – 32 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Directeurs de transformation', 'Chefs de projet SI/Ops', 'DRH & managers RH', 'DSC & responsables Ops'],
    modules: [
      'Psychologie du changement : courbe de Kübler-Ross et freins humains',
      'Cartographie des parties prenantes et analyse des enjeux',
      'Construire un plan de communication du changement',
      'Mobiliser les alliés et gérer les résistants',
      'Piloter l\'adoption : indicateurs et ajustements',
      'Cas terrain : transformation SI, fusion d\'équipes, réorganisation',
    ],
    inclus: ['Matrice parties prenantes', 'Template plan de communication', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'leadership',
    num: '13',
    domaine: 'management',
    format: 'intra',
    badge: 'Atelier leadership',
    title: 'Leadership pour Cadres Opérationnels',
    subtitle: 'Passer du management quotidien au leadership stratégique.',
    duration: '1 jour',
    hours: 'Atelier intensif',
    group: '6 à 15 cadres',
    price: '12 000 – 18 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Cadres en montée de responsabilités', 'Directeurs fonctionnels', 'Responsables de département', 'Futurs membres de CODIR'],
    modules: [
      'Intelligence émotionnelle et leadership situationnel',
      'Prendre des décisions sous pression et incertitude',
      'Développer son influence sans l\'autorité hiérarchique',
      'Construire une vision mobilisatrice pour son équipe',
      'Gérer son énergie, éviter le burnout du cadre',
      'Passer du "faire" au "faire faire" : le saut managérial clé',
    ],
    inclus: ['Profil de leadership personnalisé', 'Plan de développement individuel', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },

  /* ── Finance pour Opérationnels ────────────────────────── */
  {
    id: 'finance-chiffres',
    num: '14',
    domaine: 'finance',
    format: 'intra',
    badge: 'Finance pour Opérationnels',
    title: 'Lire et Analyser les Chiffres Clés',
    subtitle: 'Comprendre les états financiers et prendre de meilleures décisions opérationnelles.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Managers non financiers', 'Responsables opérationnels', 'Chefs de projet', 'DSC & responsables Ops'],
    modules: [
      'Bilan, compte de résultat, flux de trésorerie : les 3 états clés',
      'Lire et interpréter un bilan sans être financier',
      'Marges, EBITDA, résultat net : comprendre la rentabilité',
      'Cash vs profit : la différence qui change tout pour les Ops',
      'Les KPIs financiers à suivre absolument en tant que manager',
      'Décrypter un budget et défendre ses ressources',
    ],
    inclus: ['Glossaire financier SC', 'Modèle de lecture de bilan', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'business-case',
    num: '15',
    domaine: 'finance',
    format: 'inter',
    badge: 'Finance pour Opérationnels',
    title: 'Construire un Business Case & ROI',
    subtitle: 'Chiffrer un projet, calculer le retour sur investissement et convaincre le CODIR.',
    duration: '1 jour',
    hours: '8h en présentiel',
    group: '6 à 16 participants',
    price: '2 500',
    unit: 'MAD TTC / participant',
    lieu: 'Casablanca',
    public: ['Chefs de projet', 'Managers Ops demandant des investissements', 'DSC & responsables logistique', 'Consultants internes'],
    modules: [
      'Structure d\'un business case convaincant pour un CODIR',
      'Modéliser les coûts, les gains et les flux de trésorerie',
      'Calculer ROI, TRI, VAN et Payback Period',
      'Identifier, quantifier et présenter les risques',
      'Techniques de présentation : convaincre sans noyer de chiffres',
      'Cas pratique : construire un business case complet sur votre projet',
    ],
    inclus: ['Template business case Excel', 'Modèle de présentation CODIR', 'Support de formation', 'Attestation'],
    cta: WA,
    color: 'var(--blue-bright)',
  },
  {
    id: 'controle-gestion',
    num: '16',
    domaine: 'finance',
    format: 'intra',
    badge: 'Finance pour Opérationnels',
    title: 'Contrôle de Gestion pour Non-Financiers',
    subtitle: 'Piloter ses coûts, défendre son budget et parler le langage des financiers.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Managers de département', 'Responsables SC & logistique', 'Chefs de projet', 'Directeurs opérationnels'],
    modules: [
      'Rôle du contrôle de gestion : allié stratégique, pas juste comptable',
      'Coûts fixes, variables, directs, indirects : les maîtriser',
      'Construire et défendre son budget de département',
      'Analyser les écarts budgétaires et en rendre compte',
      'Tableaux de bord opérationnels et KPIs financiers utiles',
      'Négocier des ressources et arbitrer des investissements face aux finances',
    ],
    inclus: ['Template budget département', 'Tableau de bord financier Ops', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },

  /* ── Gestion de Projet ─────────────────────────────────── */
  {
    id: 'chef-projet',
    num: '17',
    domaine: 'projet',
    format: 'inter',
    badge: 'Gestion de Projet',
    title: 'Chef de Projet Opérationnel',
    subtitle: 'Piloter un projet de bout en bout : cadrage, planning, risques, équipe.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: '6 à 16 participants',
    price: '3 500',
    unit: 'MAD TTC / participant',
    lieu: 'Casablanca',
    public: ['Chefs de projet débutants', 'Managers menant des projets transversaux', 'Responsables SC en transformation', 'Ingénieurs projets'],
    modules: [
      'Cycle de vie du projet : phases, jalons, livrables, go/no-go',
      'Cadrage : scope, objectifs SMART, contraintes, parties prenantes',
      'Construire un planning Gantt et identifier le chemin critique',
      'Gérer les risques : matrice probabilité/impact et plans d\'action',
      'Animer une équipe projet pluridisciplinaire sans lien hiérarchique',
      'Reporting : communiquer le bon message au bon moment',
    ],
    inclus: ['Template Gantt Excel', 'Matrice des risques', 'Support de formation', 'Attestation'],
    cta: WA,
    color: 'var(--blue-bright)',
  },
  {
    id: 'agile-scrum',
    num: '18',
    domaine: 'projet',
    format: 'intra',
    badge: 'Gestion de Projet',
    title: 'Gestion de Projet Agile — Scrum & Kanban',
    subtitle: 'Appliquer les méthodes Agile à vos projets SC, SI et organisationnels.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux',
    public: ['Chefs de projet', 'Product Owners', 'Managers de transformation', 'Équipes SI & DSC'],
    modules: [
      'Manifeste Agile et 12 principes : pourquoi ça change tout',
      'Scrum : rôles (PO, SM, équipe), cérémonies, artefacts',
      'Kanban : visualisation des flux et limitation du WIP',
      'Priorisation du backlog et gestion des sprints',
      'Indicateurs Agile : velocity, burndown, lead time, cycle time',
      'Adapter l\'Agile aux projets SC, logistique et transformation SI',
    ],
    inclus: ['Board Kanban physique livré', 'Template backlog', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'amoa-si',
    num: '19',
    domaine: 'projet',
    format: 'intra',
    badge: 'Gestion de Projet',
    title: 'AMOA — Conduire un Projet SI',
    subtitle: "Maîtriser la maîtrise d'ouvrage pour piloter ERP, WMS, TMS sans être informaticien.",
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '22 000 – 32 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Responsables MOA', 'DSC & responsables logistique', 'Chefs de projet SI', 'Managers Ops impliqués dans un déploiement'],
    modules: [
      'Rôle et missions de la MOA vs MOE : qui fait quoi',
      'Rédiger un cahier des charges fonctionnel béton',
      "Conduire un appel d'offre SI : grille de sélection, démonstrations",
      'Méthodes de recettage : tests fonctionnels, UAT, PV de recette',
      'Pilotage du déploiement et conduite du changement SI',
      'Bilan post-projet et capitalisation des enseignements',
    ],
    inclus: ['Template cahier des charges fonctionnel', 'Grille de sélection WMS/ERP/TMS', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },

  /* ── Carrière & Bien-être ──────────────────────────────── */
  {
    id: 'developpement-carriere',
    num: '20',
    domaine: 'carriere',
    format: 'inter',
    badge: 'Carrière & Bien-être',
    title: 'Développement de Carrière en Supply Chain',
    subtitle: 'Construire une trajectoire professionnelle claire en logistique, achats et supply chain.',
    duration: '1 jour',
    hours: '8h en présentiel',
    group: '8 à 16 participants',
    price: '2 500',
    unit: 'MAD TTC / participant',
    lieu: 'Casablanca',
    public: ['Techniciens en évolution', 'Jeunes cadres SC / Achats / Logistique', 'Managers en transition', 'Professionnels en reconversion'],
    modules: [
      'Cartographie des métiers et trajectoires en Supply Chain, Achats et Logistique',
      'Auto-diagnostic de compétences et identification des écarts',
      'Construire son plan de développement à 3 et 5 ans',
      'Certifications qui font la différence (DDMRP, APICS, Lean...)',
      'Valoriser son parcours : CV, LinkedIn, entretien interne',
      'Atelier individuel : formaliser son propre plan de carrière',
    ],
    inclus: ["Grille d'auto-diagnostic", 'Plan de carrière personnalisé', 'Support de formation', 'Attestation'],
    cta: WA,
    color: 'var(--blue-bright)',
  },
  {
    id: 'negociation-achats',
    num: '21',
    domaine: 'carriere',
    format: 'intra',
    badge: 'Carrière & Bien-être',
    title: 'Techniques de Négociation Achats & Supply Chain',
    subtitle: 'Préparer, mener et conclure une négociation fournisseur en position de force.',
    duration: '2 jours',
    hours: '2 × 8h en présentiel',
    group: 'Sur mesure',
    price: '18 000 – 28 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Acheteurs', 'Responsables achats', 'Supply chain managers', 'Chefs de produit négociant avec fournisseurs'],
    modules: [
      'Préparer une négociation : rapport de force, BATNA, objectifs',
      'Les leviers au-delà du prix (délais, qualité, exclusivité)',
      'Techniques de négociation : ancrage, concessions, silence stratégique',
      'Négocier avec un fournisseur en position dominante',
      'Gérer les tactiques déloyales et sortir des blocages',
      'Mises en situation filmées et débriefées sur cas réels',
    ],
    inclus: ['Grille de préparation de négociation', 'Mises en situation filmées', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'prevenir-burnout',
    num: '22',
    domaine: 'carriere',
    format: 'intra',
    badge: 'Carrière & Bien-être',
    title: 'Prévenir le Burnout & Gérer son Énergie',
    subtitle: "Reconnaître les signaux d'épuisement et installer des pratiques durables sous pression opérationnelle.",
    duration: '1 jour',
    hours: '8h en présentiel',
    group: 'Sur mesure',
    price: '12 000 – 18 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux ou hôtel',
    public: ['Managers et cadres opérationnels', 'Responsables SC, logistique, achats', 'Équipes sous forte pression (pics, astreintes)', 'RH accompagnant des équipes à risque'],
    modules: [
      'Comprendre le burnout : signaux faibles, phases, facteurs de risque',
      "Le stress en environnement opérationnel : astreintes, pics d'activité, flux tendus",
      "Auto-diagnostic : où en est-on sur la charge et l'énergie ?",
      "Techniques de gestion de l'énergie et de récupération active",
      'Poser des limites et déléguer sans culpabilité',
      "Construire un plan d'action individuel et un relais managérial",
    ],
    inclus: ['Auto-diagnostic individuel', "Plan d'action personnalisé", 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },

  /* ── Opérationnel ─────────────────────────────────────── */
  {
    id: 'caces-cariste',
    num: '23',
    domaine: 'operationnel',
    format: 'intra',
    badge: 'Terrain · Opérationnel',
    title: 'Formation préparatoire aux référentiels CACES R489',
    subtitle: "Conduite en sécurité des chariots de manutention, sur les référentiels R489. Le Maroc ne dispose pas d'organisme testeur agréé équivalent à la France : attestation de formation interne Nextinotech, pas de certification CACES® officielle française.",
    duration: '3 à 5 jours',
    hours: 'Théorie + pratique sur chariot',
    group: "Jusqu'à 6 participants / session",
    price: '2 500',
    unit: 'MAD HT / participant',
    lieu: 'Vos locaux (chariot du site) ou centre partenaire',
    public: ['Caristes débutants ou en poste', 'Magasiniers amenés à conduire un chariot', "Nouveaux embauchés entrepôt", 'Intérimaires et saisonniers logistique'],
    modules: [
      'Réglementation et responsabilités du conducteur de chariot',
      'Technologie du chariot et vérifications avant prise de poste',
      'Catégories R489 courantes en entrepôt : 1A/1B (préparateurs), 3 (chariots frontaux ≤6t), 5 (mât rétractable)',
      'Règles de circulation, stabilité et gestes de conduite en sécurité',
      'Prise, transport et gerbage de charges',
      'Mise en situation pratique et évaluation individuelle',
    ],
    inclus: [
      'Support théorique remis',
      'Évaluation pratique individuelle',
      'Attestation de formation interne Nextinotech (non équivalente au certificat CACES® officiel français)',
      'Grille de suivi post-formation',
    ],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'preparateur-commandes',
    num: '24',
    domaine: 'operationnel',
    format: 'intra',
    badge: 'Terrain · Opérationnel',
    title: 'Formation Préparateur de Commandes',
    subtitle: 'Techniques de préparation, organisation entrepôt et sécurité — une équipe opérationnelle immédiatement performante.',
    duration: '2 jours',
    hours: 'En présentiel',
    group: 'Sur mesure',
    price: '20 000 – 30 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux',
    public: ['Préparateurs de commandes', 'Magasiniers', 'Nouveaux embauchés entrepôt', "Chefs d'équipe préparation"],
    modules: [
      "Organisation d'un entrepôt : adressage, zones, méthode 5S",
      'Techniques de préparation et de picking : productivité et fiabilité',
      'Manutention sécurisée des charges — gestes et postures',
      'Détection des anomalies et contrôle qualité avant expédition',
      "Initiation à l'usage d'un WMS et d'un terminal de scan",
      'Cas pratique : préparer une commande de bout en bout sur votre site',
    ],
    inclus: ['Grille de productivité type', 'Cas pratique sur site', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: 'var(--blue-bright)',
  },
  {
    id: 'hse-entrepot',
    num: '25',
    domaine: 'operationnel',
    format: 'intra',
    badge: 'Terrain · Opérationnel',
    title: 'Formation HSE Entrepôt & Logistique',
    subtitle: 'Hygiène, sécurité et environnement appliqués aux réalités du terrain entrepôt et transport.',
    duration: '1 jour',
    hours: 'En présentiel',
    group: 'Sur mesure',
    price: '18 000 – 26 000',
    unit: 'MAD HT / groupe',
    lieu: 'Vos locaux',
    public: ['Responsables HSE / QHSE', "Chefs d'équipe entrepôt", 'Caristes et agents de manutention', 'Responsables logistique'],
    modules: [
      "Cartographie des risques spécifiques à l'entrepôt et au transport",
      'Manutention, chariots et stockage : prévenir les accidents les plus fréquents',
      "Analyse d'accidents et de presque-accidents",
      'Ergonomie et prévention des troubles musculo-squelettiques (TMS)',
      'Conformité réglementaire et plan de prévention',
      'Cas pratique : audit HSE flash de votre site',
    ],
    inclus: ["Grille d'audit HSE fournie", 'Cas pratique sur site', 'Support de formation', 'Attestation'],
    cta: EMAIL,
    color: '#1b3554',
  },
  {
    id: 'maturite-logistique',
    num: '26',
    domaine: 'operationnel',
    format: 'inter',
    badge: 'Programme de synthèse',
    title: 'Formation Maturité Logistique — Diagnostiquer et Progresser',
    subtitle: 'La méthode de diagnostic Nextinotech, transmise à vos équipes pour auto-évaluer et faire progresser votre supply chain.',
    duration: '1 jour',
    hours: '8h30 — 17h30',
    group: '8 à 16 participants',
    price: '1 800',
    unit: 'MAD TTC / participant',
    lieu: 'Hôtel 5★ Casablanca',
    public: ['Responsables Supply Chain & logistique', 'Chefs de projet amélioration continue', 'Consultants internes / relais méthode', 'Dirigeants PME/ETI'],
    modules: [
      'La grille de maturité logistique : du pilotage à vue au pilotage prédictif',
      "Cartographier l'existant et identifier les causes racines — méthode terrain",
      "Mesurer l'écart entre potentiel et réalité, avec des leviers chiffrés",
      'Prioriser : quick wins vs transformation de fond',
      "Construire un plan de progression réaliste sur 90 jours",
      'Cas pratique : auto-diagnostic de votre propre organisation',
    ],
    inclus: ['Grille de maturité logistique fournie', 'Auto-diagnostic individuel', 'Support de formation', 'Attestation', 'Suivi WhatsApp 30j'],
    cta: EMAIL,
    color: 'var(--blue-bright)',
  },
]

/* ─── Data — FAQ ────────────────────────────────────────────── */
export const FAQ = [
  {
    q: 'Comment choisir le bon programme parmi les 27 ?',
    a: "Selon votre objectif : une compétence terrain immédiate (formations inter, 1 à 2 jours, ex. Responsable Logistique, DDMRP), une montée en compétence d'équipe sur mesure (intra-entreprise adapté à votre secteur), ou un accompagnement individuel dans la durée (coaching DSC). Contactez-nous, nous orientons gratuitement selon votre contexte.",
  },
  {
    q: 'Quelle est la différence entre inter-entreprise et intra-entreprise ?',
    a: "L'inter-entreprise réunit des participants de plusieurs sociétés sur une date fixe (tarif par participant, ex. 1 500 MAD pour Responsable Logistique). L'intra-entreprise forme uniquement vos équipes, dans vos locaux ou à l'hôtel, avec un contenu adapté à votre secteur (tarif forfaitaire par groupe).",
  },
  {
    q: 'Les formations sont-elles éligibles au financement (OFPPT / GIAC / OPCA) ?',
    a: 'Une convention de formation est remise à l\'inscription pour toute prise en charge par votre entreprise ou votre organisme de financement. Nous accompagnons les DRH dans le montage du dossier.',
  },
  {
    q: 'Peut-on adapter un programme intra-entreprise à notre secteur ?',
    a: 'Oui, systématiquement. Chaque session intra intègre des cas pratiques tirés de votre activité (agroalimentaire, automobile, pharma, retail...) plutôt que des exemples génériques.',
  },
  {
    q: 'Y a-t-il un suivi après la formation ?',
    a: "Les programmes phares incluent un suivi WhatsApp de 30 jours pour répondre à vos questions d'application terrain. Pour un accompagnement plus long, le coaching DSC propose un suivi mensuel sur 6 à 12 mois.",
  },
  {
    q: 'Quel est le délai entre l\'inscription et la première session ?',
    a: "Pour les formations inter-entreprises, consultez le calendrier ci-dessus — les prochaines sessions sont ouvertes jusqu'à 3 mois à l'avance. Pour l'intra-entreprise, comptez 2 à 3 semaines entre la demande de devis et la session, selon vos disponibilités.",
  },
  {
    q: 'La formation CACES délivre-t-elle une certification officielle ou une attestation interne ?',
    a: "Une attestation de formation interne Nextinotech, pas une certification CACES® officielle française. Le Maroc ne dispose pas d'organisme testeur agréé équivalent à celui utilisé en France pour délivrer le certificat CACES® officiel — notre formation prépare aux référentiels R489 mais reste, par nature, une attestation interne.",
  },
  {
    q: 'Proposez-vous un suivi après une formation HSE ou Maturité Logistique ?',
    a: "Ça dépend du programme. La formation Maturité Logistique inclut un suivi WhatsApp de 30 jours, comme les autres programmes phares. La formation HSE Entrepôt & Logistique n'inclut pas ce suivi dans sa formule actuelle — elle comprend la grille d'audit HSE fournie, le cas pratique sur site, le support de formation et l'attestation.",
  },
]

/* ─── Data — Calendrier 2026 ───────────────────────────────── */
export const SESSIONS = [
  { mois: 'Septembre', sessions: [
    { date: '18 Sep', titre: 'Responsable Logistique', format: 'inter', places: 5, id: 'rl' },
    { date: '25–26 Sep', titre: 'DDMRP Practitioner', format: 'inter', places: 8, id: 'ddmrp' },
    { date: '30 Sep', titre: 'Chef de Projet Opérationnel', format: 'inter', places: 10, id: 'chef-projet' },
  ]},
  { mois: 'Octobre', sessions: [
    { date: '7–8 Oct', titre: 'Lean Management & 5S', format: 'intra', places: null, id: 'lean-5s' },
    { date: '9 Oct', titre: 'Supply Chain Décideurs', format: 'intra', places: null, id: 'decideurs' },
    { date: '16–17 Oct', titre: 'S&OP & Planification Avancée', format: 'intra', places: null, id: 'sop' },
    { date: '22 Oct', titre: 'Business Case & ROI', format: 'inter', places: 8, id: 'business-case' },
    { date: '23 Oct', titre: 'Responsable Logistique', format: 'inter', places: 6, id: 'rl' },
    { date: '29 Oct', titre: 'Développement de Carrière SC', format: 'inter', places: 10, id: 'developpement-carriere' },
    { date: '30 Oct', titre: 'IA Générative Supply Chain & Achats', format: 'inter', places: 14, id: 'ia-supply-chain' },
  ]},
  { mois: 'Novembre', sessions: [
    { date: '6–7 Nov', titre: 'Supply Chain Fondamentaux', format: 'intra', places: null, id: 'fondamentaux' },
    { date: '10–14 Nov', titre: 'Lean Six Sigma Green Belt', format: 'inter', places: 6, id: 'six-sigma' },
    { date: '13 Nov', titre: 'Responsable Logistique', format: 'inter', places: 8, id: 'rl' },
    { date: '19–20 Nov', titre: 'Manager ses Équipes', format: 'intra', places: null, id: 'management-equipes' },
    { date: '20–21 Nov', titre: 'DDMRP Practitioner', format: 'inter', places: 10, id: 'ddmrp' },
    { date: '25–26 Nov', titre: 'Négociation Achats & SC', format: 'intra', places: null, id: 'negociation-achats' },
  ]},
  { mois: 'Décembre', sessions: [
    { date: '3–4 Déc', titre: 'Lire et Analyser les Chiffres', format: 'intra', places: null, id: 'finance-chiffres' },
    { date: '4 Déc', titre: 'Supply Chain Décideurs', format: 'intra', places: null, id: 'decideurs' },
    { date: '9–10 Déc', titre: 'Chef de Projet Opérationnel', format: 'inter', places: 12, id: 'chef-projet' },
    { date: '11 Déc', titre: 'Responsable Logistique', format: 'inter', places: 4, id: 'rl' },
    { date: '15 Déc', titre: 'Prévenir le Burnout', format: 'intra', places: null, id: 'prevenir-burnout' },
    { date: '18 Déc', titre: 'IA Générative Supply Chain & Achats', format: 'inter', places: 14, id: 'ia-supply-chain' },
  ]},
]

/* ─── Schema.org — construit à partir des données ci-dessus ── */
export const ORG_ID = 'https://nextinotech.com/#organization'
const MONTHS_2026: Record<string, string> = { Sep: '09', Oct: '10', Nov: '11', 'Déc': '12' }

function sessionToDates(date: string): { startDate: string; endDate: string } | null {
  const parts = date.trim().split(' ')
  const mo = MONTHS_2026[parts[parts.length - 1]]
  if (!mo) return null
  const [d1, d2] = parts[0].replace(/[–]/g, '-').split('-')
  const pad = (d: string) => d.padStart(2, '0')
  const startDate = `2026-${mo}-${pad(d1)}`
  return { startDate, endDate: d2 ? `2026-${mo}-${pad(d2)}` : startDate }
}

export const instancesByProgram: Record<string, { startDate: string; endDate: string; format: string }[]> = {}
for (const block of SESSIONS) {
  for (const s of block.sessions) {
    const dt = sessionToDates(s.date)
    if (!dt) continue
    if (!instancesByProgram[s.id]) instancesByProgram[s.id] = []
    instancesByProgram[s.id].push({ ...dt, format: s.format })
  }
}

export function workload(duration: string): string {
  if (/5\s*jours/i.test(duration)) return 'P5D'
  if (/(2\s*jours|1\s*à\s*2)/i.test(duration)) return 'P2D'
  return 'P1D'
}

export const programmesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      '@id': 'https://nextinotech.com/formation#programmes',
      name: 'Catalogue de formations Nextinotech',
      numberOfItems: PROGRAMMES.length,
      itemListElement: PROGRAMMES.map((p, i) => {
        const nums = p.price.replace(/\s/g, '').split('–').map(s => parseInt(s.replace(/\D/g, ''), 10)).filter(n => !isNaN(n))
        const offer: Record<string, unknown> = {
          '@type': 'Offer',
          priceCurrency: 'MAD',
          category: 'Formation professionnelle',
          url: 'https://nextinotech.com/formation',
          availability: 'https://schema.org/InStock',
        }
        if (nums.length === 2) {
          offer.priceSpecification = { '@type': 'PriceSpecification', minPrice: nums[0], maxPrice: nums[1], priceCurrency: 'MAD' }
        } else if (nums.length === 1) {
          offer.price = nums[0]
        }
        const dated = instancesByProgram[p.id] || []
        const hasCourseInstance = dated.length
          ? dated.map(d => ({
              '@type': 'CourseInstance',
              courseMode: 'Onsite',
              startDate: d.startDate,
              endDate: d.endDate,
              location: {
                '@type': 'Place',
                name: d.format === 'inter' ? 'Hôtel 5 étoiles, Casablanca' : "Locaux de l'entreprise cliente",
                address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
              },
              offers: { ...offer },
            }))
          : [{
              '@type': 'CourseInstance',
              courseMode: p.format === 'coaching' ? 'Online' : 'Onsite',
              courseWorkload: workload(p.duration),
              location: {
                '@type': 'Place',
                name: p.lieu || 'Casablanca',
                address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
              },
              offers: { ...offer },
            }]
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Course',
            name: p.title,
            description: p.subtitle,
            provider: { '@id': ORG_ID },
            inLanguage: 'fr',
            educationalCredentialAwarded: 'Attestation de formation Nextinotech',
            courseWorkload: workload(p.duration),
            hasCourseInstance,
            offers: offer,
          },
        }
      }),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://nextinotech.com/formation#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://nextinotech.com/' },
        { '@type': 'ListItem', position: 2, name: 'Formations', item: 'https://nextinotech.com/formation' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://nextinotech.com/formation#faq',
      mainEntity: FAQ.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

/* ─── Types & builders réutilisables (composants + prérendu) ── */

export type Programme = (typeof PROGRAMMES)[number]

function fmtLabel(f: string): string {
  if (f === 'inter') return 'inter-entreprise'
  if (f === 'intra') return 'intra-entreprise'
  if (f === 'coaching') return 'accompagnement individuel'
  return f
}

export function programmeFaq(p: Programme): { q: string; a: string }[] {
  return [
    {
      q: `Quel est le prix de la formation « ${p.title} » ?`,
      a: `${p.price} ${p.unit}. ${
        p.format === 'inter'
          ? "Le tarif inter-entreprise inclut le support de formation, l’attestation et, pour les programmes phares, un suivi WhatsApp de 30 jours."
          : p.format === 'coaching'
            ? 'Facturation par session, avec accès entre les séances.'
            : 'Tarif forfaitaire par groupe pour une session dans vos locaux, contenu adapté à votre secteur.'
      }`,
    },
    {
      q: 'La formation est-elle éligible à un financement (CSF / GIAC / OFPPT) ?',
      a: "Oui. Une convention de formation est remise à l’inscription pour toute prise en charge par votre entreprise, un Contrat Spécial de Formation (CSF) OFPPT ou un dossier GIAC. Nous accompagnons les DRH dans le montage du dossier.",
    },
    {
      q: p.format === 'inter' ? 'Peut-on organiser cette formation en intra-entreprise ?' : 'Où se déroule la formation ?',
      a:
        p.format === 'inter'
          ? `Oui. Pour 5 participants ou plus d’une même entreprise, la formation est organisée dans vos locaux ou à l’hôtel de votre choix, avec un cas pratique adapté à votre activité. Les sessions inter-entreprise ont lieu à ${p.lieu}.`
          : `${p.lieu}. Le contenu et les cas pratiques sont bâtis sur votre contexte réel (secteur, données, contraintes).`,
    },
  ]
}

export function programmeIntro(p: Programme): string {
  return `${p.subtitle} Formation ${fmtLabel(p.format)} de ${p.duration.toLowerCase()}, ${p.lieu.toLowerCase()}, animée par un praticien avec 20+ ans de terrain en Supply Chain, Logistique et Achats au Maroc.`
}

export function buildProgrammeSchema(p: Programme) {
  const priceNums = p.price.replace(/\s/g, '').split('–').map((s) => parseInt(s.replace(/\D/g, ''), 10)).filter((n) => !isNaN(n))
  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    priceCurrency: 'MAD',
    category: 'Formation professionnelle',
    url: `https://nextinotech.com/formation/${p.id}`,
    availability: 'https://schema.org/InStock',
  }
  if (priceNums.length === 2) offer.priceSpecification = { '@type': 'PriceSpecification', minPrice: priceNums[0], maxPrice: priceNums[1], priceCurrency: 'MAD' }
  else if (priceNums.length === 1) offer.price = priceNums[0]

  const dated = instancesByProgram[p.id] || []
  const hasCourseInstance = dated.length
    ? dated.map((d) => ({
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        startDate: d.startDate,
        endDate: d.endDate,
        location: { '@type': 'Place', name: `${p.lieu}`, address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' } },
        offers: { ...offer },
      }))
    : [{
        '@type': 'CourseInstance',
        courseMode: p.format === 'coaching' ? 'Online' : 'Onsite',
        courseWorkload: workload(p.duration),
        location: { '@type': 'Place', name: p.lieu, address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' } },
        offers: { ...offer },
      }]

  const faq = programmeFaq(p)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `https://nextinotech.com/formation/${p.id}#course`,
        name: p.title,
        description: p.subtitle,
        provider: { '@id': ORG_ID },
        inLanguage: 'fr',
        educationalCredentialAwarded: 'Attestation de formation Nextinotech',
        courseWorkload: workload(p.duration),
        teaches: p.modules,
        offers: offer,
        hasCourseInstance,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://nextinotech.com/formation/${p.id}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://nextinotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Formations', item: 'https://nextinotech.com/formation' },
          { '@type': 'ListItem', position: 3, name: p.title, item: `https://nextinotech.com/formation/${p.id}` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://nextinotech.com/formation/${p.id}#faq`,
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }
}

/* ── Programme phare : Responsable Logistique ── */

export const RL_FAQ: { q: string; a: string }[] = [
  { q: 'Dois-je avoir une expérience logistique préalable ?', a: "Non. La formation est accessible dès lors que vous gérez ou allez gérer des flux (stock, transport, entrepôt). Elle est conçue pour un niveau opérationnel à managérial, sans prérequis technique. Le cas pratique final s’adapte au contexte de chaque participant." },
  { q: 'La formation est-elle éligible à la formation professionnelle (OFPPT / GIAC) ?', a: "Une convention de formation vous est remise à l’inscription pour toute prise en charge par votre entreprise, un Contrat Spécial de Formation (CSF) OFPPT ou un dossier GIAC. Nous accompagnons les DRH dans le montage du dossier de remboursement." },
  { q: 'Combien coûte la formation Responsable Logistique ?', a: "1 500 MAD TTC par participant, tout inclus : salle en hôtel 5 étoiles à Casablanca, déjeuner, support de 60+ pages, attestation et suivi WhatsApp de 30 jours. Aucun frais caché. Tarif dégressif en intra-entreprise à partir de 5 participants." },
  { q: 'La formation est-elle certifiante ?', a: "Elle délivre une attestation de formation Nextinotech, reconnue par les employeurs et valorisable sur un CV ou LinkedIn. Ce n’est pas un diplôme d’État : pour une certification internationale, voir notre programme DDMRP Practitioner (Demand Driven Institute)." },
  { q: 'La formation existe-t-elle à distance ou en e-learning ?', a: "Non, uniquement en présentiel. Le format repose sur des cas pratiques, des échanges entre pairs et un travail sur le contexte réel de chaque participant — difficilement transposables en ligne. Un accompagnement individuel à distance existe en complément." },
  { q: 'Une seule journée suffit-elle pour ce sujet ?', a: "La journée est intensive (8h30-17h30) et cible les 20 % de méthodes qui produisent 80 % des résultats : structurer son pilotage, ses stocks, son transport et ses KPI. Le plan d’action à 90 jours et le suivi WhatsApp de 30 jours prolongent l’apprentissage sur le terrain. Pour aller plus loin, le catalogue propose des formats de 2 à 5 jours." },
  { q: 'Y a-t-il une formation intra-entreprise pour plusieurs collaborateurs ?', a: "Oui. Pour 5 participants ou plus de la même entreprise, nous organisons la formation dans vos locaux ou à l’hôtel de votre choix, avec une adaptation du cas pratique à votre secteur. Contactez-nous pour un devis." },
  { q: 'Quelles sont les prochaines dates disponibles ?', a: "Les sessions sont planifiées selon les inscriptions reçues. Envoyez-nous votre demande via WhatsApp ou email — nous vous confirmons la prochaine date sous 24h et vous réservons une place si des places sont disponibles." },
  { q: "Quelle est votre politique d’annulation ?", a: "Annulation gratuite jusqu’à 7 jours avant la session. Après ce délai, possibilité de reporter sur la session suivante sans frais. En cas d’annulation de notre part (session insuffisamment remplie), remboursement intégral immédiat." },
]

const RL_SESSIONS_2026 = ['2026-09-18', '2026-10-23', '2026-11-13', '2026-12-11']
const rlOffer = { '@type': 'Offer', price: 1500, priceCurrency: 'MAD', category: 'Formation professionnelle', availability: 'https://schema.org/InStock', url: 'https://nextinotech.com/formation-rl' }

export const rlCourseSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': 'https://nextinotech.com/formation-rl#course',
      name: 'Devenir Responsable Logistique',
      description: "Formation intensive d’une journée pour maîtriser les méthodes, les outils et les réflexes du pilotage logistique : fondamentaux, gestion des stocks, transport, pilotage de la performance, systèmes WMS/TMS/ERP.",
      provider: { '@id': ORG_ID },
      inLanguage: 'fr',
      educationalCredentialAwarded: 'Attestation de formation Nextinotech',
      courseWorkload: 'P1D',
      about: ['Logistique', 'Supply chain', 'Gestion des stocks', 'Transport', 'WMS', 'TMS', 'Pilotage de la performance'],
      offers: rlOffer,
      hasCourseInstance: RL_SESSIONS_2026.map((d) => ({
        '@type': 'CourseInstance', courseMode: 'Onsite', courseWorkload: 'P1D', startDate: d, endDate: d,
        location: { '@type': 'Place', name: 'Hôtel 5 étoiles, Casablanca', address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' } },
        offers: rlOffer,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://nextinotech.com/formation-rl#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://nextinotech.com/' },
        { '@type': 'ListItem', position: 2, name: 'Formations', item: 'https://nextinotech.com/formation' },
        { '@type': 'ListItem', position: 3, name: 'Devenir Responsable Logistique', item: 'https://nextinotech.com/formation-rl' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://nextinotech.com/formation-rl#faq',
      mainEntity: RL_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

export const catalogueMeta = {
  title: 'Formations Supply Chain, Lean, Management, Finance, Projet & Carrière — Nextinotech',
  description: "27 programmes de formation sur 7 domaines : Supply Chain, Opérationnel, Lean, Management, Finance, Gestion de Projet, Carrière & Bien-être. Inter et intra-entreprise. Catalogue et calendrier 2026.",
}
