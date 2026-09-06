// Données des pages « Formation Logistique & Supply Chain à <Ville> ».
// Une entrée = une page à /formation-logistique-<slug>.
// Le contenu est volontairement différencié par ville (contexte économique,
// secteurs, programmes recommandés) pour éviter les pages « doorway ».

export interface ProgrammeReco {
  titre: string
  pourquoi: string
}

export interface VilleFormation {
  slug: string
  nom: string
  region: string
  heroTitre: string
  heroItalic: string
  heroSubtitle: string
  metaTitle: string
  metaDescription: string
  intro: string
  secteurs: string[]
  programmes: ProgrammeReco[]
  formats: string
  blog: { label: string; post: string }
  faq: { q: string; a: string }[]
}

export const VILLES: VilleFormation[] = [
  {
    slug: 'casablanca',
    nom: 'Casablanca',
    region: 'Casablanca-Settat',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Casablanca.',
    heroSubtitle:
      "Premier pôle économique du Maroc, Casablanca concentre le port, les grandes zones industrielles et les sièges de la distribution et de l'industrie. Nos sessions inter-entreprise s'y tiennent en présentiel, en hôtel 5★.",
    metaTitle: 'Formation Logistique & Supply Chain à Casablanca | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Casablanca : responsable logistique, WMS/TMS, achats, DDMRP. Sessions présentiel hôtel 5★ + intra-entreprise. Financement CSF/GIAC.",
    intro:
      "Casablanca est le premier bassin d'emploi supply chain du pays : port de Casablanca, zones industrielles d'Aïn Sebaâ, Sidi Bernoussi et Bouskoura, plateformes des grands distributeurs et des industriels FMCG. La demande porte sur des profils capables de piloter un entrepôt, structurer une politique de stocks et professionnaliser les achats. C'est à Casablanca que nous organisons l'essentiel de nos sessions inter-entreprise en présentiel.",
    secteurs: [
      'Grande distribution & FMCG',
      'Industrie & agroalimentaire',
      'Import-export & transit portuaire',
      'Prestataires logistiques (3PL)',
    ],
    programmes: [
      { titre: 'Devenir Responsable Logistique', pourquoi: 'Le programme phare, en présentiel à Casablanca — structurer son pilotage en une journée.' },
      { titre: 'WMS · TMS · ERP — Maîtriser les Outils', pourquoi: 'Pour les entrepôts et plateformes de distribution qui déploient ou exploitent un système.' },
      { titre: 'Techniques de Négociation Achats & Supply Chain', pourquoi: 'Pour les fonctions achats des industriels et distributeurs de la région.' },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca (hôtel 5★, 8 à 16 participants). Format intra-entreprise dans vos locaux pour 5 participants ou plus, avec cas pratique adapté à votre activité.",
    blog: { label: 'Conseil & supply chain à Casablanca', post: 'conseil-supply-chain-casablanca-expert-logistique-maroc' },
    faq: [
      {
        q: 'Où se déroulent les formations à Casablanca ?',
        a: "Les sessions inter-entreprise se tiennent dans une salle équipée d'un hôtel 5 étoiles à Casablanca, précisé à l'inscription. Déjeuner et pauses inclus.",
      },
      {
        q: 'Proposez-vous des formations intra-entreprise à Casablanca ?',
        a: "Oui. Pour 5 participants ou plus d'une même entreprise, nous intervenons dans vos locaux à Casablanca, avec un contenu adapté à votre secteur (distribution, industrie, 3PL).",
      },
    ],
  },
  {
    slug: 'rabat',
    nom: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Rabat & Kénitra.',
    heroSubtitle:
      "Capitale administrative, la région Rabat-Salé-Kénitra abrite aussi l'Atlantic Free Zone de Kénitra et la plaine agro-industrielle du Gharb — deux moteurs de demande en planification et en achats.",
    metaTitle: 'Formation Logistique & Supply Chain à Rabat-Kénitra | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Rabat et Kénitra : responsable logistique, S&OP, DDMRP, achats. Présentiel Casablanca + intra-entreprise sur site. Financement CSF/GIAC.",
    intro:
      "La région Rabat-Salé-Kénitra combine une forte fonction publique et administrative avec un tissu industriel en croissance rapide : l'Atlantic Free Zone de Kénitra concentre Stellantis et ses équipementiers automobiles, tandis que la plaine du Gharb structure une filière agro-industrielle exportatrice. Les besoins de formation portent sur la planification cadencée, la gestion des flux fournisseurs et la structuration des achats.",
    secteurs: [
      'Automobile (Atlantic Free Zone, Kénitra)',
      'Agro-industrie & export (Gharb)',
      'Administration & institutionnels',
      'Distribution régionale',
    ],
    programmes: [
      { titre: 'DDMRP — Certification Practitioner', pourquoi: "Pour les équipementiers automobiles de Kénitra qui pilotent en flux tendu." },
      { titre: 'S&OP & Planification Avancée', pourquoi: "Pour aligner ventes, production et approvisionnements dans l'agro-industrie du Gharb." },
      { titre: 'Devenir Responsable Logistique', pourquoi: "Le socle de pilotage, en présentiel à Casablanca ou en intra sur site." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca (1h en train de Rabat). Format intra-entreprise dans vos locaux à Rabat, Salé ou Kénitra pour 5 participants ou plus.",
    blog: { label: 'Formation supply chain à Rabat', post: 'formation-supply-chain-rabat-expert-logistique-maroc' },
    faq: [
      {
        q: 'Les formations ont-elles lieu à Rabat ?',
        a: "Les sessions inter-entreprise se tiennent à Casablanca, à environ 1h de Rabat en train. Pour un groupe de 5 personnes ou plus, nous organisons la formation en intra-entreprise directement à Rabat, Salé ou Kénitra.",
      },
      {
        q: 'Avez-vous une offre pour les équipementiers automobiles de Kénitra ?',
        a: "Oui. Les programmes DDMRP et S&OP sont adaptés au pilotage cadencé et aux exigences des donneurs d'ordre. Le contenu intra est ajusté à votre plan de production et à vos flux EDI.",
      },
    ],
  },
  {
    slug: 'tanger',
    nom: 'Tanger',
    region: 'Tanger-Tétouan-Al Hoceïma',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Tanger.',
    heroSubtitle:
      "Tanger Med, premier port à conteneurs d'Afrique, et les zones franches (TFZ, Tanger Automotive City) font de Tanger l'un des écosystèmes logistiques et industriels les plus denses du continent.",
    metaTitle: 'Formation Logistique & Supply Chain à Tanger | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Tanger : responsable logistique, DDMRP, WMS/TMS, Lean. Écosystème Tanger Med et automobile. Présentiel + intra. Financement CSF/GIAC.",
    intro:
      "Tanger est un hub logistique de rang mondial : Tanger Med traite plusieurs millions de conteneurs par an, les zones franches accueillent Renault et un large tissu d'équipementiers, et le textile y reste très présent. Les entreprises recherchent des profils capables de tenir des standards automobiles (qualité, cadence, traçabilité) et d'exploiter des plateformes logistiques de grande taille.",
    secteurs: [
      'Automobile (Renault, TAC, équipementiers)',
      'Logistique portuaire & transit (Tanger Med)',
      'Zones franches & industrie exportatrice',
      'Textile & habillement',
    ],
    programmes: [
      { titre: 'DDMRP — Certification Practitioner', pourquoi: "Standard de planification dans l'écosystème automobile de la région." },
      { titre: 'WMS · TMS · ERP — Maîtriser les Outils', pourquoi: "Pour les plateformes logistiques et 3PL adossés à Tanger Med." },
      { titre: 'Lean Management & 5S', pourquoi: "Pour les usines et entrepôts qui visent les standards de performance automobile." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Tanger, en zone franche ou à Tétouan pour 5 participants ou plus.",
    blog: { label: 'Formation logistique Tanger & Kénitra', post: 'formation-logistique-tanger-et-knitra-hub-automobile-et-port' },
    faq: [
      {
        q: 'Organisez-vous des formations en zone franche à Tanger ?',
        a: "Oui, en format intra-entreprise. Nous intervenons dans vos locaux en TFZ, Tanger Automotive City ou sur la zone de Tanger Med, avec un cas pratique bâti sur vos flux réels.",
      },
      {
        q: 'Le contenu est-il adapté aux exigences automobiles ?',
        a: "Oui. Les modules DDMRP, Lean et pilotage de la performance intègrent les standards de qualité et de cadence attendus par les constructeurs et leurs donneurs d'ordre.",
      },
    ],
  },
  {
    slug: 'marrakech',
    nom: 'Marrakech',
    region: 'Marrakech-Safi',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Marrakech.',
    heroSubtitle:
      "Tourisme, hôtellerie, agroalimentaire et distribution régionale : Marrakech a des besoins logistiques marqués par la saisonnalité et l'approvisionnement de haute saison.",
    metaTitle: 'Formation Logistique & Supply Chain à Marrakech | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Marrakech : responsable logistique, fondamentaux, préparation de commandes. Présentiel + intra-entreprise. Financement CSF/GIAC.",
    intro:
      "L'économie de Marrakech est portée par le tourisme et l'hôtellerie, avec un enjeu fort d'approvisionnement sans rupture en haute saison, une agro-industrie active dans la région et une distribution régionale à structurer. Les besoins de formation vont des fondamentaux supply chain pour des équipes non spécialistes jusqu'au pilotage d'entrepôt et à la préparation de commandes.",
    secteurs: [
      'Tourisme & hôtellerie (approvisionnement haute saison)',
      'Agroalimentaire & terroir',
      'Distribution régionale',
      'Événementiel & logistique de service',
    ],
    programmes: [
      { titre: 'Devenir Responsable Logistique', pourquoi: "Pour structurer le pilotage d'un site ou d'un groupe hôtelier." },
      { titre: 'Supply Chain Fondamentaux', pourquoi: "Pour donner des bases communes à des équipes non spécialistes (achats, F&B, exploitation)." },
      { titre: 'Formation Préparateur de Commandes', pourquoi: "Pour fiabiliser la préparation et la manutention dans les entrepôts de la région." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Marrakech pour 5 participants ou plus, avec cas pratique adapté (hôtellerie, distribution, agro).",
    blog: { label: 'Formation logistique à Marrakech', post: 'formation-logistique-marrakech-opportunits-et-programme-2026' },
    faq: [
      {
        q: 'Formez-vous les équipes hôtelières à Marrakech ?',
        a: "Oui, en intra-entreprise. Les fondamentaux supply chain et la gestion des stocks sont adaptés au contexte hôtelier : achats F&B, économat, saisonnalité, pilotage des ruptures en haute saison.",
      },
      {
        q: 'Faut-il se déplacer à Casablanca ?',
        a: "Pour les sessions inter-entreprise, oui. Pour un groupe de 5 personnes ou plus, nous venons animer la formation directement à Marrakech.",
      },
    ],
  },
  {
    slug: 'agadir',
    nom: 'Agadir',
    region: 'Souss-Massa',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Agadir.',
    heroSubtitle:
      "Premier port de pêche du Maroc, capitale des primeurs et des agrumes d'export : la région Souss-Massa vit au rythme de la chaîne du froid et des fenêtres d'export européennes.",
    metaTitle: 'Formation Logistique & Supply Chain à Agadir | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Agadir : responsable logistique, S&OP, DDMRP, chaîne du froid. Souss-Massa, export et pêche. Présentiel + intra. Financement CSF/GIAC.",
    intro:
      "La région Souss-Massa est un pôle d'export agricole majeur : agrumes, primeurs et produits de la mer transitent par le port et l'aéroport d'Agadir vers l'Europe, sous forte contrainte de chaîne du froid et de calendrier. Les entreprises cherchent des profils capables de planifier une offre incertaine (récolte, météo) face à une demande à fenêtres étroites, et de sécuriser la qualité tout au long du flux.",
    secteurs: [
      'Agrumes & primeurs à l’export (Souss-Massa)',
      'Pêche & produits de la mer',
      'Chaîne du froid & conditionnement',
      'Transport frigorifique & transit',
    ],
    programmes: [
      { titre: 'S&OP & Planification Avancée', pourquoi: "Pour arbitrer entre disponibilité récolte et programmes clients européens." },
      { titre: 'DDMRP — Certification Practitioner', pourquoi: "Pour dimensionner les stocks tampons sous forte volatilité." },
      { titre: 'Devenir Responsable Logistique', pourquoi: "Le socle de pilotage pour les stations de conditionnement et exportateurs." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Agadir ou dans la zone d'Aït Melloul pour 5 participants ou plus.",
    blog: { label: 'Formation logistique à Agadir', post: 'formation-logistique-agadir-supply-chain-export-et-rgion-sou' },
    faq: [
      {
        q: 'Le contenu couvre-t-il la chaîne du froid et l’export ?',
        a: "Oui. Les modules planification et gestion des stocks sont adaptés aux filières d'export du Souss-Massa : saisonnalité, fenêtres d'expédition, exigences des distributeurs européens, transport frigorifique.",
      },
      {
        q: 'Venez-vous former à Agadir ?',
        a: "En intra-entreprise, oui — dans vos locaux à Agadir ou à Aït Melloul. Les sessions inter-entreprise restent à Casablanca.",
      },
    ],
  },
  {
    slug: 'fes',
    nom: 'Fès',
    region: 'Fès-Meknès',
    heroTitre: 'Formation Logistique',
    heroItalic: 'à Fès & Meknès.',
    heroSubtitle:
      "Pôle agro-industriel autour de Meknès, industrie et artisanat à Fès, position de carrefour au centre du pays : la région Fès-Meknès a des besoins logistiques concrets et sous-outillés.",
    metaTitle: 'Formation Logistique & Supply Chain à Fès-Meknès | Nextinotech',
    metaDescription:
      "Formations logistique et supply chain à Fès et Meknès : responsable logistique, Lean, fondamentaux. Agro-industrie et industrie. Présentiel + intra. Financement CSF/GIAC.",
    intro:
      "La région Fès-Meknès associe un pôle agro-industriel structuré autour de Meknès (Agropolis), une industrie et un artisanat encore largement pilotés à la main à Fès, et une position de carrefour logistique au centre du Maroc. Les besoins de formation sont d'abord ceux des fondamentaux : structurer un entrepôt, fiabiliser les stocks, éliminer les gaspillages.",
    secteurs: [
      'Agro-industrie (Agropolis Meknès)',
      'Industrie & sous-traitance',
      'Artisanat & terroir',
      'Distribution & plateformes centre-Maroc',
    ],
    programmes: [
      { titre: 'Devenir Responsable Logistique', pourquoi: "Pour structurer le pilotage d'un site agro-industriel ou d'une PME industrielle." },
      { titre: 'Lean Management & 5S', pourquoi: "Pour éliminer les gaspillages dans des ateliers et entrepôts peu structurés." },
      { titre: 'Supply Chain Fondamentaux', pourquoi: "Pour aligner des équipes non spécialistes sur un langage commun." },
    ],
    formats:
      "Sessions inter-entreprise en présentiel à Casablanca. Format intra-entreprise dans vos locaux à Fès ou Meknès pour 5 participants ou plus.",
    blog: { label: 'Conseil & supply chain à Fès-Meknès', post: 'conseil-supply-chain-fsmekns-expert-logistique-centre-maroc' },
    faq: [
      {
        q: 'Intervenez-vous à Fès et à Meknès ?',
        a: "Oui, en intra-entreprise, dans vos locaux à Fès, Meknès ou sur la zone d'Agropolis. Les sessions inter-entreprise ont lieu à Casablanca.",
      },
      {
        q: 'Par quel programme commencer pour un site peu structuré ?',
        a: "« Devenir Responsable Logistique » pour le pilotage d'ensemble, puis « Lean Management & 5S » pour l'organisation du terrain. Les deux se complètent bien sur un site en cours de structuration.",
      },
    ],
  },
]

export function findVille(slug: string | undefined): VilleFormation | undefined {
  return VILLES.find((v) => v.slug === slug)
}

export function buildVilleSchema(v: VilleFormation) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://nextinotech.com/formation-logistique-${v.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://nextinotech.com/' },
          { '@type': 'ListItem', position: 2, name: 'Formations', item: 'https://nextinotech.com/formation' },
          { '@type': 'ListItem', position: 3, name: `Formation logistique à ${v.nom}`, item: `https://nextinotech.com/formation-logistique-${v.slug}` },
        ],
      },
      {
        '@type': 'Course',
        '@id': `https://nextinotech.com/formation-logistique-${v.slug}#course`,
        name: `Formation Logistique & Supply Chain à ${v.nom}`,
        description: v.metaDescription,
        provider: { '@id': 'https://nextinotech.com/#organization' },
        inLanguage: 'fr',
        educationalCredentialAwarded: 'Attestation de formation Nextinotech',
        areaServed: { '@type': 'City', name: v.nom },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Onsite',
          location: {
            '@type': 'Place',
            name: `${v.nom}, Maroc`,
            address: { '@type': 'PostalAddress', addressLocality: v.nom, addressRegion: v.region, addressCountry: 'MA' },
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://nextinotech.com/formation-logistique-${v.slug}#faq`,
        mainEntity: v.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }
}
