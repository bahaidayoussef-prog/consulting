export interface SectionMetadata {
  id: string
  title: string
  description: string
  keywords: string[]
  schema?: Record<string, unknown>
}

export const SECTIONS: SectionMetadata[] = [
  {
    id: 'hero',
    title: 'Accueil — Essor Consulting',
    description: 'Cabinet de conseil Supply Chain indépendant au Maroc. 110+ missions, 15 ans expérience terrain.',
    keywords: ['supply chain', 'conseil logistique', 'maroc'],
  },
  {
    id: 'pourquoi',
    title: 'Pourquoi Essor Consulting',
    description: 'Pourquoi choisir un cabinet indépendant de Supply Chain au Maroc.',
    keywords: ['conseil independent', 'supply chain maroc'],
  },
  {
    id: 'impact',
    title: 'Impact & Résultats — Essor Consulting',
    description: 'Résultats mesurés de nos missions de conseil Supply Chain.',
    keywords: ['resultats supply chain', 'cas clients', 'impact'],
  },
  {
    id: 'conseil',
    title: 'Nos Offres de Conseil',
    description: 'Services de conseil Supply Chain: diagnostic, optimisation stocks, DDMRP, performance achats, logistique, SI, formation.',
    keywords: ['services supply chain', 'diagnostic', 'ddmrp', 'optimisation stocks', 'formation'],
  },
  {
    id: 'systemes',
    title: 'Systèmes & Déploiement',
    description: 'Déploiement WMS, TMS, APS et accompagnement SI Supply Chain.',
    keywords: ['wms', 'tms', 'aps', 'erp', 'logiciel supply chain'],
  },
  {
    id: 'references',
    title: 'Nos Références — Clients Supply Chain',
    description: 'Clients accompagnés: Renault-Nissan, L\'Oréal, Nestlé, P&G, DHL, Huawei, J&J, Addoha, OCP.',
    keywords: ['references clients', 'cas clients maroc', 'renault nissan', 'loreal'],
  },
  {
    id: 'methode',
    title: 'Notre Méthode de Conseil',
    description: 'Approche, méthodologie et processus de conseil Supply Chain d\'Essor Consulting.',
    keywords: ['methode conseil', 'approche supply chain'],
  },
  {
    id: 'formation',
    title: 'Formation Supply Chain',
    description: 'Programmes de formation en Supply Chain Management, DDMRP, logistique et achats.',
    keywords: ['formation supply chain', 'ddmrp', 'training'],
  },
  {
    id: 'dsc',
    title: 'Direction Supply Chain à Temps Partagé',
    description: 'Service de Direction Supply Chain externalisée - DSC temps partagé pour PME/ETI.',
    keywords: ['dsc', 'direction supply chain', 'temps partage'],
  },
  {
    id: 'profil',
    title: 'Profil & Expérience — Essor Consulting',
    description: 'Fondateur Essor Consulting. 15 ans expérience Supply Chain terrain. DDMRP Certified. Casablanca, Maroc.',
    keywords: ['consultant supply chain', 'expert supply chain maroc', 'profil expert'],
  },
  {
    id: 'engagement',
    title: 'Nos Engagements',
    description: 'Principes et engagements d\'Essor Consulting envers ses clients.',
    keywords: ['engagement', 'valeurs'],
  },
  {
    id: 'insights',
    title: 'Insights & Actualités Supply Chain',
    description: 'Actualités, articles et insights sur le Supply Chain Management au Maroc.',
    keywords: ['insights', 'articles supply chain', 'actualites'],
  },
  {
    id: 'contact',
    title: 'Nous Contacter — Essor Consulting',
    description: 'Contactez Essor Consulting. Échange gratuit 45 min. Casablanca, Maroc.',
    keywords: ['contact', 'email', 'telephone'],
  },
]

export function generateSitemapXML(): string {
  const baseURL = 'https://essor-consulting.vercel.app'
  const now = new Date().toISOString().split('T')[0]

  const urls = [
    {
      loc: baseURL,
      lastmod: now,
      priority: '1.0',
      changefreq: 'monthly',
    },
    ...SECTIONS.map(s => ({
      loc: `${baseURL}/#${s.id}`,
      lastmod: now,
      priority: s.id === 'conseil' ? '0.9' : s.id === 'contact' ? '0.9' : '0.7',
      changefreq: 'monthly',
    })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

export function generateBreadcrumbSchema(sectionId: string): Record<string, unknown> {
  const baseURL = 'https://essor-consulting.vercel.app'
  const items = [
    { name: 'Accueil', url: baseURL },
  ]

  const sectionIndex = SECTIONS.findIndex(s => s.id === sectionId)
  if (sectionIndex > 0) {
    for (let i = 1; i <= sectionIndex; i++) {
      items.push({
        name: SECTIONS[i].title.split(' — ')[0],
        url: `${baseURL}/#${SECTIONS[i].id}`,
      })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateSectionWebPageSchema(
  sectionId: string,
  headline: string,
  description: string,
  imageUrl?: string
): Record<string, unknown> {
  const baseURL = 'https://essor-consulting.vercel.app'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseURL}/#${sectionId}`,
    url: `${baseURL}/#${sectionId}`,
    name: headline,
    description,
    isPartOf: { '@id': baseURL },
    inLanguage: 'fr-MA',
    ...(imageUrl && { image: { '@type': 'ImageObject', url: imageUrl } }),
  }
}

export function generateFAQSchema(faqs: Array<{ q: string; a: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}
