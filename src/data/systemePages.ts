export interface SystemePageData {
  path: string
  number: string
  tag: string
  title: string
  titleItalic: string
  seoTitle: string
  description: string
  subtitle: string
  introTitle: string
  intro: string
  useCases: string[]
  missionSteps: { title: string; description: string }[]
  outcomes: string[]
  faq: { question: string; answer: string }[]
  links: { label: string; href: string }[]
  offerTiers?: { name: string; price: string; duration: string; scope: string }[]
}

export const SYSTEME_PAGES: Record<string, SystemePageData> = {
  wms: {
    path: '/conseil-wms',
    number: '01',
    tag: 'CONSEIL · WMS · MAROC',
    title: 'Conseil WMS au Maroc',
    titleItalic: 'du choix au terrain.',
    seoTitle: 'Conseil WMS au Maroc — Choix, AMOA et Déploiement | Nextinotech',
    description: 'Conseil indépendant WMS au Maroc : cadrage des besoins, cahier des charges, sélection éditeur, AMOA, recette et accompagnement des équipes.',
    subtitle: "Choisir et déployer un système de gestion d'entrepôt adapté à vos flux, à vos équipes et à votre ERP.",
    introTitle: 'Un WMS doit suivre vos opérations réelles.',
    intro: "Nous vous aidons à clarifier les processus avant de choisir le logiciel, puis à piloter le projet jusqu'à son adoption par les équipes. Nextinotech intervient en AMOA, sans commission d'éditeur.",
    useCases: [
      'Les stocks affichés dans l’ERP ne correspondent pas aux quantités en entrepôt.',
      'Les réceptions, le rangement et la préparation reposent sur des fichiers ou la mémoire des équipes.',
      'Vous préparez un appel d’offres WMS ou devez reprendre un projet de déploiement.',
    ],
    missionSteps: [
      { title: 'Cadrer', description: 'Cartographier les flux, les volumes, les contraintes et les besoins des utilisateurs.' },
      { title: 'Choisir', description: 'Établir les exigences, comparer les solutions et préparer la décision avec un business case.' },
      { title: 'Déployer', description: 'Piloter l’intégrateur, les interfaces ERP, la recette, la bascule et la conduite du changement.' },
    ],
    outcomes: [
      'Une cible fonctionnelle qui décrit les processus attendus.',
      'Un cahier des charges et une grille de sélection réutilisables.',
      'Un pilotage projet centré sur les risques, les tests et l’adoption terrain.',
    ],
    faq: [
      { question: 'Faut-il choisir le WMS avant de revoir les processus ?', answer: 'Non. Nous documentons d’abord les flux et les règles métier. Le choix du logiciel vient ensuite, pour éviter d’automatiser des dysfonctionnements existants.' },
      { question: 'Pouvez-vous accompagner un projet WMS déjà lancé ?', answer: 'Oui. Nous pouvons intervenir sur le cadrage, la gouvernance, les interfaces, les tests de recette, la préparation au démarrage ou la stabilisation.' },
      { question: 'Nextinotech revend-elle des licences WMS ?', answer: 'Non. Le conseil est indépendant des éditeurs et intégrateurs ; les recommandations sont établies selon le besoin du client.' },
    ],
    links: [
      { label: 'Essayer la démonstration WMS', href: '/demo/wms' },
      { label: 'Découvrir l’accompagnement TMS', href: '/conseil-tms' },
      { label: 'Demander un diagnostic', href: '/contact' },
    ],
  },
  tms: {
    path: '/conseil-tms',
    number: '02',
    tag: 'CONSEIL · TMS · MAROC',
    title: 'Conseil TMS au Maroc',
    titleItalic: 'transport maîtrisé.',
    seoTitle: 'Conseil TMS au Maroc — Choix et Déploiement | Nextinotech',
    description: 'Conseil indépendant TMS au Maroc : optimisation des processus transport, cahier des charges, sélection, AMOA, recette et adoption par les équipes.',
    subtitle: 'Structurer la planification et le suivi du transport avant de sélectionner ou déployer un TMS.',
    introTitle: 'Le TMS doit refléter votre modèle transport.',
    intro: "Nous analysons les flux, les transporteurs, les contraintes de livraison et les données disponibles pour définir un besoin réaliste. Nous pouvons ensuite vous accompagner dans la sélection et le déploiement, sans commission d'éditeur.",
    useCases: [
      'Les tournées sont planifiées manuellement et les coûts de transport sont difficiles à expliquer.',
      'Le suivi des livraisons et la preuve de livraison sont dispersés entre plusieurs outils.',
      'Vous devez comparer des offres TMS, structurer un appel d’offres ou sécuriser un déploiement.',
    ],
    missionSteps: [
      { title: 'Cartographier', description: 'Qualifier les flux, les modes, les transporteurs, les règles tarifaires et les exceptions.' },
      { title: 'Spécifier', description: 'Définir les besoins de planification, d’exécution, de suivi et de rapprochement des coûts.' },
      { title: 'Piloter', description: 'Accompagner la sélection, les interfaces, les tests, la mise en service et l’appropriation.' },
    ],
    outcomes: [
      'Un processus transport documenté, avec ses règles et ses responsabilités.',
      'Des exigences TMS hiérarchisées et comparables entre solutions.',
      'Une trajectoire de déploiement liée aux données, aux transporteurs et aux équipes.',
    ],
    faq: [
      { question: 'Un TMS convient-il à une PME avec peu de véhicules ?', answer: 'Cela dépend des flux, des transporteurs et de la complexité des livraisons. Le cadrage permet de déterminer si un TMS, un module ERP ou un outil plus léger répond au besoin.' },
      { question: 'Un TMS peut-il gérer des transporteurs externes ?', answer: 'Oui, selon la solution et son périmètre : planification, affectation, suivi, documents, coûts et échanges avec les partenaires doivent être évalués pendant le cadrage.' },
      { question: 'Intervenez-vous après le choix du logiciel ?', answer: 'Oui. L’accompagnement peut couvrir l’AMOA, les interfaces, les tests, la conduite du changement et la stabilisation après le démarrage.' },
    ],
    links: [
      { label: 'Essayer la démonstration TMS', href: '/demo/tms' },
      { label: 'Découvrir l’accompagnement WMS', href: '/conseil-wms' },
      { label: 'Demander un diagnostic', href: '/contact' },
    ],
  },
  ims: {
    path: '/gestion-inventaires-ims',
    number: '03',
    tag: 'GESTION DES INVENTAIRES · IMS',
    title: 'Gestion des inventaires',
    titleItalic: 'un IMS adapté.',
    seoTitle: 'IMS au Maroc — Gestion et Fiabilisation des Inventaires | Nextinotech',
    description: 'Conseil IMS au Maroc : cadrage des inventaires, mobilité de comptage, traçabilité, rapprochement des écarts et intégration aux systèmes existants.',
    subtitle: 'Fiabiliser le comptage physique et le rapprochement des stocks avec un processus et un outil adaptés.',
    introTitle: 'L’inventaire est un processus de gestion.',
    intro: 'Un IMS organise les campagnes de comptage, les mouvements, les contrôles et la remontée des écarts. Nous cadrons le besoin et les interfaces pour que les résultats soient exploitables par les équipes et les systèmes existants.',
    useCases: [
      'Les inventaires prennent trop de temps ou interrompent fortement l’activité.',
      'Les comptages mobiles, les contrôles et les validations ne laissent pas de piste fiable.',
      'Les écarts entre le stock physique et l’ERP sont détectés tardivement ou mal expliqués.',
    ],
    missionSteps: [
      { title: 'Définir', description: 'Préciser les sites, les articles, les règles de comptage, les rôles et les contrôles.' },
      { title: 'Équiper', description: 'Évaluer le besoin de mobilité, codes-barres ou RFID, et les échanges avec ERP ou WMS.' },
      { title: 'Fiabiliser', description: 'Organiser les rapprochements, les validations, les écarts et le suivi des actions correctives.' },
    ],
    outcomes: [
      'Un processus de comptage reproductible et traçable.',
      'Des exigences fonctionnelles pour comparer les outils IMS.',
      'Une méthode de rapprochement reliée aux responsabilités métier.',
    ],
    faq: [
      { question: 'Un IMS remplace-t-il un WMS ?', answer: 'Pas nécessairement. Un IMS se concentre sur les campagnes et la fiabilisation des inventaires ; un WMS pilote les opérations quotidiennes de l’entrepôt. Le périmètre doit être défini selon les processus et les outils déjà en place.' },
      { question: 'Peut-on démarrer un projet IMS sans RFID ?', answer: 'Oui. Le besoin peut être couvert par des terminaux mobiles et des codes-barres. La RFID se justifie selon les objets à suivre, les volumes et le niveau d’automatisation recherché.' },
      { question: 'Nextinotech réalise-t-elle aussi les inventaires physiques ?', answer: 'Oui. L’offre Pack Inventaire mobilise des équipes et du matériel de comptage ; elle est distincte du conseil pour sélectionner ou intégrer un logiciel IMS.' },
    ],
    links: [
      { label: 'Voir le Pack Inventaire', href: '/prestations' },
      { label: 'Découvrir l’accompagnement WMS', href: '/conseil-wms' },
      { label: 'Demander un diagnostic', href: '/contact' },
    ],
  },
  controlTower: {
    path: '/control-tower',
    number: '04',
    tag: 'NEXTINOTECH DIGITAL · PILOTAGE',
    title: 'Tour de contrôle Supply Chain',
    titleItalic: 'voir, décider, agir.',
    seoTitle: 'Tour de Contrôle Supply Chain au Maroc — Control Tower | Nextinotech',
    description: 'Concevoir une tour de contrôle supply chain au Maroc : données WMS, TMS, IMS, ERP et IoT, indicateurs, alertes et gouvernance des décisions.',
    subtitle: 'Consolider les signaux utiles de vos systèmes pour repérer les écarts et décider plus vite.',
    introTitle: 'Une tour de contrôle relie les données à l’action.',
    intro: 'La Control Tower consolide des indicateurs issus de systèmes existants — WMS, TMS, IMS, ERP ou capteurs — puis organise les alertes, les priorités et les rituels de décision. Elle complète ces outils au lieu de les remplacer.',
    useCases: [
      'Les équipes rapprochent manuellement plusieurs reportings avant chaque revue de performance.',
      'Les retards, ruptures ou écarts de stocks sont repérés trop tard pour agir.',
      'La direction manque d’une vue cohérente entre transport, entrepôt, stocks et service client.',
    ],
    missionSteps: [
      { title: 'Prioriser', description: 'Choisir les décisions à accélérer et les indicateurs qui déclenchent une action.' },
      { title: 'Connecter', description: 'Cartographier les sources, la qualité des données, les interfaces et les responsabilités.' },
      { title: 'Piloter', description: 'Définir les alertes, les seuils, les rôles et les rituels de résolution des exceptions.' },
    ],
    outcomes: [
      'Des tableaux de bord limités aux décisions à prendre.',
      'Des alertes définies avec des responsables et des délais de traitement.',
      'Une trajectoire progressive, à partir des données déjà disponibles.',
    ],
    faq: [
      { question: 'Une Control Tower remplace-t-elle un WMS ou un TMS ?', answer: 'Non. Elle consolide les signaux utiles de plusieurs systèmes et aide à gérer les exceptions ; chaque logiciel opérationnel reste responsable de son périmètre.' },
      { question: 'Faut-il utiliser l’intelligence artificielle ?', answer: 'Non. Un premier périmètre peut fonctionner avec des indicateurs, des seuils et des alertes définis par les équipes. L’IA peut être étudiée lorsque les données et la gouvernance sont suffisamment stables.' },
      { question: 'Peut-on démarrer sans WMS ni TMS ?', answer: 'Oui, avec un périmètre plus limité fondé sur les données disponibles, par exemple l’ERP ou des fichiers contrôlés. Le cadrage établit les prérequis et les limites.' },
    ],
    links: [
      { label: 'Essayer la démonstration WMS', href: '/demo/wms' },
      { label: 'Essayer la démonstration TMS', href: '/demo/tms' },
      { label: 'Parler de votre projet', href: '/contact' },
    ],
    offerTiers: [
      { name: 'Control Tower Mini', price: 'À partir de 135 000 MAD HT', duration: '4 à 6 semaines', scope: '3 à 5 tableaux de bord clés : service, stocks et trésorerie.' },
      { name: 'Control Tower Pilote', price: 'À partir de 330 000 MAD HT', duration: '2 à 3 mois', scope: '8 à 12 tableaux de bord, alertes et rituel de pilotage.' },
      { name: 'Control Tower Pro', price: 'À partir de 840 000 MAD HT', duration: '4 à 6 mois', scope: 'Périmètre multi-sites, analytique avancée et portail mobile dirigeant.' },
    ],
  },
}

export function buildSystemeSchemas(page: SystemePageData): unknown[] {
  const url = `https://nextinotech.com${page.path}`
  const orgId = 'https://nextinotech.com/#organization'
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.seoTitle,
      description: page.description,
      serviceType: page.tag,
      url,
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'Maroc' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://nextinotech.com/' },
        { '@type': 'ListItem', position: 2, name: 'Conseil', item: 'https://nextinotech.com/conseil' },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
    },
  ]
}
