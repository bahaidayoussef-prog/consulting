import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SchemaScript from './SchemaHelper'
import PageMeta from './PageMeta'

/* ─── Brand constants ─────────────────────────────────────── */
const WA = `https://wa.me/212663449200?text=${encodeURIComponent('Bonjour Essor Consulting, je souhaite des informations sur vos formations. Pouvez-vous me recontacter ?')}`
const EMAIL = 'mailto:essor.consulting.maroc@gmail.com?subject=Catalogue%20Formations%20Essor%20Consulting'

/* ─── Data — Programmes ────────────────────────────────────── */
const PROGRAMMES = [
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
    cta: '/formation-rl/',
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
    inclus: ['Support officiel DDMRP', 'Simulateur Excel inclus', 'Préparation examen DDI', 'Attestation Essor Consulting'],
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
    inclus: ['Support officiel DMAIC', 'Simulateur Minitab initiation', 'Préparation Green Belt', 'Attestation Essor Consulting'],
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
    subtitle: "Conduite en sécurité des chariots de manutention, sur les référentiels R489. Le Maroc ne dispose pas d'organisme testeur agréé équivalent à la France : attestation de formation interne Essor Consulting, pas de certification CACES® officielle française.",
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
      'Attestation de formation interne Essor Consulting (non équivalente au certificat CACES® officiel français)',
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
    subtitle: 'La méthode de diagnostic Essor Consulting, transmise à vos équipes pour auto-évaluer et faire progresser votre supply chain.',
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
    q: 'Comment choisir le bon programme parmi les 26 ?',
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
]

const programmesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      '@id': 'https://nextinotech.com/formation#programmes',
      name: 'Catalogue de formations Essor Consulting',
      numberOfItems: PROGRAMMES.length,
      itemListElement: PROGRAMMES.map((p, i) => {
        const nums = p.price.replace(/\s/g, '').split('–').map(s => parseInt(s.replace(/\D/g, ''), 10)).filter(n => !isNaN(n))
        const offer: Record<string, unknown> = {
          '@type': 'Offer',
          priceCurrency: 'MAD',
          url: 'https://nextinotech.com/formation',
          availability: 'https://schema.org/InStock',
        }
        if (nums.length === 2) {
          offer.priceSpecification = { '@type': 'PriceSpecification', minPrice: nums[0], maxPrice: nums[1], priceCurrency: 'MAD' }
        } else if (nums.length === 1) {
          offer.price = nums[0]
        }
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Course',
            name: p.title,
            description: p.subtitle,
            provider: { '@type': 'Organization', name: 'Essor Consulting', sameAs: 'https://nextinotech.com/' },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: p.format === 'coaching' ? 'Online' : 'Onsite',
              name: p.duration,
            },
            offers: offer,
          },
        }
      }),
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

/* ─── Data — Calendrier 2026 ───────────────────────────────── */
const SESSIONS = [
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
  ]},
]

/* ─── Hero carousel — decorative only, images as CSS backgrounds ── */
const CAROUSEL_IMAGES = [
  '/images/formation-carousel/formation-1.webp',
  '/images/formation-carousel/formation-2.webp',
  '/images/formation-carousel/formation-3.webp',
  '/images/formation-carousel/formation-4.webp',
  '/images/formation-carousel/formation-5.webp',
  '/images/formation-carousel/formation-6.webp',
  '/images/formation-carousel/formation-7.webp',
  '/images/formation-carousel/formation-8.webp',
]

function HeroCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CAROUSEL_IMAGES.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.38 }}>
        {CAROUSEL_IMAGES.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2.5px)',
              opacity: i === active ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
        ))}
      </div>
      {/* Brand-colored veil — blue/white, not a flat black scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(125deg, rgba(27,53,84,0.72) 0%, rgba(255,255,255,0.55) 45%, rgba(47,111,181,0.28) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, #ffffff 100%)',
      }} />
    </div>
  )
}

/* ─── Helpers ─────────────────────────────────────────────── */
function Tag({ label, format }: { label: string; format: string }) {
  const bg = format === 'inter'
    ? 'rgba(47,111,181,0.1)' : format === 'coaching'
    ? 'rgba(47,111,181,0.07)' : 'rgba(27,53,84,0.08)'
  const color = format === 'inter' || format === 'coaching' ? 'var(--blue-bright)' : 'var(--navy)'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.2rem 0.65rem',
      background: bg,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.52rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color,
    }}>
      {label}
    </span>
  )
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── FAQ Item ────────────────────────────────────────────── */
function FAQItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

/* ─── Programme Card ──────────────────────────────────────── */
function ProgramCard({ p }: { p: typeof PROGRAMMES[0] }) {
  const [open, setOpen] = useState(false)
  const isExternal = p.cta.startsWith('http') || p.cta.startsWith('mailto')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isRemote = p.lieu.toLowerCase().includes('visio')
  const accent = p.domaine === 'lean' ? '#2a6b45' : 'var(--navy)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: `2px solid ${accent}`,
        borderLeft: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        background: '#ffffff',
        marginBottom: 2,
      }}
    >
      {/* Card header — always visible */}
      <div className="pc-header" style={{ padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', color: accent, opacity: 0.7 }}>{p.num}</span>
            <Tag label={p.badge} format={p.format} />
            {isRemote && <Tag label="Visio possible" format="inter" />}
          </div>

          <h3 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--navy)',
            marginBottom: '0.6rem',
          }}>
            {p.title}
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.6, fontWeight: 300, maxWidth: 540, marginBottom: '1.5rem' }}>
            {p.subtitle}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Durée', val: p.duration },
              { label: 'Groupe', val: p.group },
              { label: 'Lieu', val: p.lieu },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, opacity: 0.7, marginBottom: '0.2rem' }}>{m.label}</div>
                <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--navy)' }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — price + CTA */}
        <div className="pc-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem', minWidth: 180 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {p.price}
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.25rem' }}>
              {p.unit}
            </div>
          </div>

          <a
            href={p.cta}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              background: p.format === 'inter' || p.format === 'coaching' ? 'var(--blue-bright)' : 'transparent',
              border: `1px solid ${p.format === 'inter' || p.format === 'coaching' ? 'var(--blue-bright)' : 'var(--border)'}`,
              color: p.format === 'inter' || p.format === 'coaching' ? '#ffffff' : 'var(--navy)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              if (p.format === 'inter' || p.format === 'coaching') {
                el.style.background = 'var(--navy)'
              } else {
                el.style.borderColor = 'var(--blue-bright)'; el.style.color = 'var(--blue-bright)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              if (p.format === 'inter' || p.format === 'coaching') {
                el.style.background = 'var(--blue-bright)'
              } else {
                el.style.borderColor = 'var(--border)'; el.style.color = 'var(--navy)'
              }
            }}
          >
            {p.format === 'inter' ? 'Réserver →' : p.format === 'coaching' ? 'Planifier →' : 'Demander un devis →'}
          </a>

          <button
            onClick={() => setOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--mid)'}
          >
            {open ? 'Réduire' : 'Voir le programme'}
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}>+</motion.span>
          </button>
        </div>
      </div>

      {/* Expandable programme details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pc-detail-grid" style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              {/* Modules */}
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1.25rem' }}>Programme</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {p.modules.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'var(--blue-bright)', minWidth: 20, paddingTop: '0.25rem', opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', lineHeight: 1.5 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Public + Inclus */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1rem' }}>Pour qui</div>
                  {p.public.map((pub, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--blue-bright)', fontSize: '0.4rem' }}>◆</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)' }}>{pub}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '1rem' }}>Inclus</div>
                  {p.inclus.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--blue-bright)', fontSize: '0.55rem' }}>✓</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--dark-muted)' }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main Component ──────────────────────────────────────── */
export default function FormationCatalogue() {
  const [activeTab, setActiveTab] = useState<'all' | 'sc' | 'lean' | 'management' | 'finance' | 'projet' | 'carriere' | 'operationnel'>('all')

  const filtered = activeTab === 'all' ? PROGRAMMES : PROGRAMMES.filter(p => p.domaine === activeTab)

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'all', label: `Tous (${PROGRAMMES.length})` },
    { id: 'sc', label: 'Supply Chain' },
    { id: 'operationnel', label: 'Opérationnel' },
    { id: 'lean', label: 'Lean & Amélioration' },
    { id: 'management', label: 'Management' },
    { id: 'finance', label: 'Finance Ops' },
    { id: 'projet', label: 'Gestion de Projet' },
    { id: 'carriere', label: 'Carrière & Bien-être' },
  ]

  return (
    <>
      <PageMeta
        title="Formations Supply Chain, Lean, Management, Finance, Projet & Carrière — Essor Consulting"
        description="26 programmes de formation sur 7 domaines : Supply Chain, Opérationnel, Lean, Management, Finance, Gestion de Projet, Carrière & Bien-être. Inter et intra-entreprise. Catalogue et calendrier 2026."
        canonical="https://nextinotech.com/formation"
      />
      <SchemaScript schema={programmesSchema} />

      {/* ══ SECTION 1 — HERO AVEC CARROUSEL DISCRET ═══════════ */}
      <section style={{ position: 'relative', background: '#ffffff', padding: '8rem 4rem 0', overflow: 'hidden' }}>
        <HeroCarousel />
        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '2.5rem' }}>
              01 / Académie · Terrain · Résultats
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(3.5rem, 9vw, 11rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              color: 'var(--navy)',
              margin: '0 0 4rem',
            }}>
              Former.<br />
              Certifier.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Transformer.</span>
            </h1>
          </Reveal>

        </div>

        {/* Stats strip — floating blurred glass card, same pattern as the Hero stats bar */}
        <Reveal delay={0.12}>
          <div
            className="formation-stats-grid"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              borderTop: '1px solid var(--border)',
              marginTop: '4rem',
            }}
          >
            {[
              { val: '26', label: 'programmes disponibles' },
              { val: '7', label: 'domaines de formation' },
              { val: '20+', label: 'ans de terrain formateur' },
              { val: '0', label: 'commission éditeur' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.4rem 1.8rem', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ STATEMENT LINE ════════════════════════════════════ */}
      <div style={{ background: 'var(--dark-2)', padding: '5rem 4rem', borderTop: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 5vw, 6.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', fontStyle: 'italic', color: 'var(--navy)' }}>
            "Le bon formateur ne vous apprend pas le métier.<br />Il vous fait voir ce que vous faites déjà — autrement."
          </div>
        </div>
      </div>

      {/* ══ SECTION 2 — CATALOGUE + CALENDRIER ════════════════ */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                  02 / Catalogue & calendrier
                </div>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: 0 }}>
                  26 programmes.<br />
                  <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>7 domaines d'expertise.</span>
                </h2>
              </div>

              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: '2px', background: 'var(--dark-2)', padding: '4px', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      background: activeTab === tab.id ? 'var(--blue-bright)' : 'transparent',
                      border: 'none',
                      padding: '0.6rem 1.25rem',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.58rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: activeTab === tab.id ? '#ffffff' : 'var(--mid)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.map(p => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Calendrier 2026 (fait partie de la Section 2) ── */}
      <section style={{ background: 'var(--dark-2)', padding: '6rem 4rem 8rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              Prochaines sessions programmées
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 5rem' }}>
              Calendrier<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Septembre — Décembre 2026.</span>
            </h2>
          </Reveal>

          <div className="formation-calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
            {SESSIONS.map((month, mi) => (
              <Reveal key={month.mois} delay={mi * 0.08}>
                <div style={{ background: '#fff', padding: '2.5rem', minHeight: 300 }}>
                  {/* Month header */}
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1, marginBottom: '2rem', borderBottom: '2px solid var(--blue-bright)', paddingBottom: '1rem' }}>
                    {month.mois}
                    <span style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 400, marginTop: '0.4rem', fontStyle: 'normal' }}>
                      {month.sessions.length} session{month.sessions.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {/* Sessions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {month.sessions.map((s, si) => (
                      <div key={si} style={{ borderLeft: `2px solid ${s.format === 'inter' ? 'var(--blue-bright)' : 'var(--border)'}`, paddingLeft: '0.9rem' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: s.format === 'inter' ? 'var(--blue-bright)' : 'var(--mid)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                          {s.date} · {s.format === 'inter' ? 'Inter' : 'Intra'}
                        </div>
                        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '0.3rem' }}>
                          {s.titre}
                        </div>
                        {s.places !== null && (
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.08em', color: s.places <= 4 ? 'var(--blue-bright)' : 'var(--mid)', textTransform: 'uppercase' }}>
                            {s.places} place{s.places > 1 ? 's' : ''} disponible{s.places > 1 ? 's' : ''}
                          </div>
                        )}
                        {s.places === null && (
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.08em', color: 'var(--mid)', textTransform: 'uppercase' }}>
                            Sur demande
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Legend + note */}
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--blue-bright)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)' }}>Inter-entreprises</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: 'var(--border)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)' }}>Intra-entreprise (sur devis)</span>
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--mid)', textTransform: 'uppercase' }}>
                Planning 2027 disponible sur demande
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SECTION 3 — DÉTAIL : PROGRAMME PHARE ══════════════ */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              03 / Détail — programme phare
            </div>
          </Reveal>

          <div className="phare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            {/* Left */}
            <Reveal delay={0.05}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--blue-bright)', padding: '0.3rem 0.9rem', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>★ Programme phare</span>
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1.5rem' }}>
                Devenir<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>Responsable<br />Logistique.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, maxWidth: 480, marginBottom: '2.5rem' }}>
                Une journée intensive pour structurer votre pilotage logistique. Formateur expert 20+ ans terrain. Hôtel 5★ Casablanca. Tout inclus — déjeuner, support 60 pages, attestation, suivi WhatsApp 30 jours.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <a href="/formation-rl/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 2.5rem', background: 'var(--navy)', color: '#ffffff', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--blue-bright)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
                >
                  Voir le programme complet →
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 2.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--navy)', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-bright)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--navy)' }}
                >
                  Réserver via WhatsApp
                </a>
              </div>
              {/* Key facts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { l: 'Tarif', v: '1 500 MAD TTC' },
                  { l: 'Format', v: 'Inter-entreprises' },
                  { l: 'Durée', v: '1 journée (8h30–17h30)' },
                  { l: 'Lieu', v: 'Hôtel 5★ Casablanca' },
                  { l: 'Places', v: '8 à 16 participants' },
                  { l: 'Suivi', v: 'WhatsApp 30 jours inclus' },
                ].map((f, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.2rem' }}>{f.l}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--navy)' }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — upcoming dates */}
            <Reveal delay={0.12}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                Prochaines sessions 2026
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { date: '18 Septembre 2026', places: 5, status: 'Ouvert' },
                  { date: '23 Octobre 2026', places: 6, status: 'Ouvert' },
                  { date: '13 Novembre 2026', places: 8, status: 'Ouvert' },
                  { date: '11 Décembre 2026', places: 4, status: 'Dernières places' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: i % 2 === 0 ? '#fff' : 'var(--dark-2)', borderLeft: `2px solid ${s.places <= 4 ? 'var(--blue-bright)' : 'var(--border)'}` }}>
                    <div>
                      <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)' }}>{s.date}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--mid)', marginTop: '0.2rem', textTransform: 'uppercase' }}>{s.places} places disponibles</div>
                    </div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: s.places <= 4 ? 'var(--blue-bright)' : 'var(--mid)', fontWeight: s.places <= 4 ? 700 : 400 }}>
                      {s.status}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(47,111,181,0.06)', borderLeft: '2px solid var(--blue-bright)' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.5rem' }}>Session intra disponible</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--dark-muted)', lineHeight: 1.6, fontWeight: 300 }}>
                  Vous avez 5+ collaborateurs ? Nous organisons cette formation dans vos locaux, adaptée à votre secteur. Contactez-nous pour un devis.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FORMATEUR ════════════════════════════════════════ */}
      <section style={{ background: 'var(--dark-2)', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '4rem' }}>
              04 / Votre formateur
            </div>
          </Reveal>
          <div className="formateur-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '8rem', alignItems: 'start' }}>
            <Reveal delay={0.05} style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', background: 'var(--dark-2)' }}>
                <img src="/images/conseil.jpg" alt="Youssef — Essor Consulting" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,53,84,0.25) 0%, transparent 60%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', background: 'var(--blue-bright)', padding: '1.75rem 2.25rem' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: '0.3rem' }}>ans terrain</div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 4vw, 4.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 0.5rem' }}>
                Youssef
              </h2>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '2rem' }}>
                Fondateur, Essor Consulting
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', lineHeight: 1.85, fontWeight: 300, maxWidth: 560, marginBottom: '3rem' }}>
                Plus de 20 ans de missions terrain en Supply Chain, Logistique et Achats au Maroc et en Europe. DDMRP Certified Practitioner. Expert national COVID-19. Intervenant dans les principales grandes écoles marocaines.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 3rem' }}>
                {[
                  { label: 'Certification', val: 'DDMRP Certified Practitioner — DDI' },
                  { label: 'Missions', val: '110+ missions de conseil réalisées' },
                  { label: 'Enseignement', val: 'TBS · ISCAE · HEM · ENCG · EMI · EHTP' },
                  { label: 'Références', val: 'Renault · L\'Oréal · Nestlé · OCP · DHL · Addoha' },
                  { label: 'Formation', val: 'ENSA Agadir · KEDGE Business School · UM6P' },
                  { label: 'Mission spéciale', val: 'Expert SC — Task Force Vaccination COVID-19' },
                ].map((item, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-bright)', marginBottom: '0.3rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', lineHeight: 1.4, fontWeight: 400 }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '8rem 4rem', color: 'var(--navy)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
              05 / Questions fréquentes
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 4rem' }}>
              Vos questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>nos réponses.</span>
            </h2>
          </Reveal>

          <div style={{ maxWidth: 900 }}>
            {FAQ.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════ */}
      <section style={{ background: 'var(--dark-2)', padding: '8rem 4rem' }}>
        <div className="section-inner">
          <div className="cta-final-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '6rem', alignItems: 'center' }}>
            <Reveal>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1.5rem' }}>
                06 / Inscription & contact
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.025em', color: 'var(--navy)', margin: '0 0 1.5rem' }}>
                Réserver votre<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-bright)' }}>prochaine session.</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', lineHeight: 1.8, fontWeight: 300, maxWidth: 520, margin: 0 }}>
                Réponse sous 24h. Aucun engagement avant confirmation écrite. Annulation gratuite jusqu'à 7 jours avant la session.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 3rem', background: 'var(--blue-bright)', color: '#ffffff', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--navy)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--blue-bright)'}
                >
                  Réserver via WhatsApp →
                </a>
                <a href={EMAIL}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 3rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--dark-muted)', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 400, textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-bright)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)' }}
                >
                  Écrire par email
                </a>
                <Link to="/contact"
                  style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue-bright)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--mid)'}
                >
                  Ou via le formulaire de contact →
                </Link>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.5rem' }}>
                  +212 06 63 44 92 00 · essor.consulting.maroc@gmail.com
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
