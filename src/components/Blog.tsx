import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { parseMarkdown, type BlogPost } from '../utils/markdownParser'
import SchemaScript from './SchemaHelper'

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams<{ slug?: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // List of all blog files in the /blog folder
        const blogFiles = [
          // Articles long-form
          '01-audit-supply-chain-2026',
          '02-formation-supply-chain-roi',
          '03-digitalisation-supply-chain-pme',
          '04-supply-chain-par-secteur',
          '05-cout-mission-consulting',
          '06-duree-transformation-supply-chain',
          '07-formation-vs-consulting',
          // Géo-ciblés
          '08-consulting-supply-chain-casablanca',
          '09-formation-logistique-rabat',
          '10-consulting-tanger-med',
          '11-supply-chain-fes-meknes',
          '12-supply-chain-marrakech-agadir',
          '13-supply-chain-afrique-francophone',
          '14-webinaire-transformation-90j',
          '15-webinaire-formation-vs-consulting',
          // Mini FAQ
          '40-faq-combien-economiser-achats',
          '41-mini-wms-oui-ou-non-pour-ma-pme',
          '42-mini-formation-ou-consulting---quelle-approche',
          '43-mini-quel-est-votre-taux-de-succès-reel',
          '44-mini-combien-de-temps-transformation-supply-chain',
          '45-mini-travaillez-vous-avec-petites-entreprises',
          '46-mini-pouvez-vous-garantir-roi',
          '47-mini-comment-debuter-première-Étape',
          '48-mini-consultants-independants-ou-Équipe',
          '49-mini-alternatives-moins-chères-où-chercher',
          '50-mini-supply-chain-e-commerce---challenges',
          '51-mini-logistique-pharma---compliance-first',
          '52-mini-manufacturing-auto---jit-complexity',
          '53-mini-retail-distribution---sku-management',
          '54-mini-agro-export---spoilage-management',
          '55-mini-conseil-senegal---port-dakar-hub',
          "56-mini-formation-côte-d'ivoire---boom-logistique",
          '57-mini-supply-chain-congo-rdc---mining',
          '58-mini-consulting-cameroun-douala',
          '59-mini-optimisation-mali---sahel-challenge',
          // Mots clés SEO Formation & GEO
          '60-comment-devenir-responsable-logistique-maroc',
          '61-salaire-responsable-logistique-maroc-2026',
          '62-formation-gestion-stocks-maroc',
          '63-certification-ddmrp-maroc',
          '64-reconversion-logistique-maroc',
          '65-formation-wms-tms-maroc',
          '66-formation-logistique-marrakech',
          '67-formation-logistique-agadir',
          '68-formation-acheteur-professionnel-maroc',
          '69-formation-logistique-tanger-kenitra',
          '70-roi-formation-logistique-maroc',
          '71-formation-supply-chain-manager-maroc',
          '72-formation-lean-supply-chain-maroc',
          // Conseil · Audit · Entrepôt · WMS · Ingénierie
          '73-audit-diagnostic-supply-chain-maroc',
          '74-diagnostic-logistique-pme-maroc',
          '75-benchmark-couts-logistiques-maroc',
          '76-externalisation-logistique-3pl-maroc',
          '77-kpis-supply-chain-tableau-de-bord-maroc',
          '78-conseil-logistique-pme-eti-maroc',
          '79-schema-directeur-logistique-maroc',
          '80-schema-directeur-pme-maroc',
          '81-schema-directeur-distribution-multi-regions-maroc',
          '82-schema-directeur-logistique-agroalimentaire-maroc',
          '83-implantation-nouvel-entrepot-maroc',
          '84-layout-entrepot-conception-efficace',
          '85-entrepot-frigorifique-maroc',
          '86-automatisation-entrepot-maroc',
          '87-entrepot-ecommerce-maroc',
          '88-entrepot-multi-clients-maroc',
          '89-deploiement-wms-maroc',
          '90-optimisation-tms-transport-maroc',
          '91-optimisation-reseau-logistique-maroc',
          '92-logistique-industrielle-maroc',
          '93-digitalisation-supply-chain-maroc',
          '94-ingenierie-logistique-maroc',
          '95-formation-chef-entrepot-maroc',
          '96-lean-logistique-maroc',
          '97-programme-formation-supply-chain-cadres-maroc',
          '99-formation-acheteur-supply-chain-maroc',
          '100-formation-transport-douanes-maroc',
          // Tendances 2026
          '101-nearshoring-maroc-supply-chain-europe',
          '102-intelligence-artificielle-supply-chain-maroc',
          '103-supply-chain-durable-rse-maroc',
          '104-logistique-inverse-retours-maroc',
          '105-sop-sales-operations-planning-maroc',
          '106-supply-chain-ecommerce-maroc-2026',
          '107-srm-gestion-fournisseurs-maroc',
          '108-last-mile-livraison-dernier-kilometre-maroc',
          // Formations (109-130)
          '109-comment-choisir-sa-formation-supply-chain-maroc',
          '111-formation-responsable-logistique-maroc',
          '113-formation-gestionnaire-entrepot-maroc',
          '114-formation-planificateur-supply-chain-maroc',
          '115-financement-formation-logistique-maroc',
          '116-certification-apics-cpim-maroc',
          '117-formation-lean-logistique-entrepot-maroc',
          '119-formation-negociation-achats-maroc',
          '121-formation-wms-deploiement-maroc',
          '123-formation-elearning-supply-chain-maroc',
          '125-formation-directeur-supply-chain-maroc',
          '127-formation-supply-chain-intra-entreprise-maroc',
          '128-formation-supply-chain-afrique-francophone',
          '129-mba-supply-chain-maroc',
          '130-programme-essor-consulting-formations',
          // Chercheurs d'emploi (131-155)
          '131-cv-supply-chain-parfait-maroc',
          '132-linkedin-logisticien-maroc-profil',
          '133-salaires-supply-chain-maroc-2026',
          '134-competences-supply-chain-recherchees-maroc',
          '135-secteurs-recrutent-logistique-maroc-2026',
          '136-lettre-motivation-supply-chain-maroc',
          '137-emploi-logistique-casablanca-2026',
          '138-emploi-supply-chain-tanger-kenitra',
          '139-consultant-freelance-supply-chain-maroc',
          '140-evolution-carriere-supply-chain-maroc',
          '141-negocier-salaire-supply-chain-maroc',
          '142-passer-technicien-manager-supply-chain',
          '143-metiers-supply-chain-avenir-2030-maroc',
          '144-reseaux-professionnels-logistique-maroc',
          '145-trouver-emploi-supply-chain-90-jours',
          '146-emploi-supply-chain-golfe-depuis-maroc',
          '147-agences-recrutement-logistique-maroc',
          '148-competences-digitales-logisticien-2026',
          '149-travailler-supply-chain-international',
          '150-emploi-supply-chain-france-expatriation',
          '151-portfolio-professionnel-logisticien-maroc',
          '152-reconversion-temoignages-supply-chain-maroc',
          '153-emploi-supply-chain-agadir-marrakech',
          '154-emploi-supply-chain-rabat-region',
          '155-strategies-trouver-emploi-supply-chain-maroc',
          // Jeunes diplômés (156-175)
          '156-jeune-diplome-supply-chain-premier-emploi',
          '157-stages-supply-chain-maroc-trouver',
          '158-formations-supply-chain-maroc-apres-bac',
          '159-competences-jeune-diplome-supply-chain-maroc',
          '160-alternance-supply-chain-maroc',
          '161-linkedin-jeune-diplome-supply-chain',
          '162-erreurs-jeune-diplome-supply-chain-maroc',
          '163-salaire-jeune-diplome-supply-chain-maroc',
          '164-pfe-supply-chain-maroc-guide',
          '165-certifications-supply-chain-jeunes-maroc',
          '166-mentor-supply-chain-maroc-importance',
          '167-jeune-diplome-grande-entreprise-ou-startup',
          '168-plan-carriere-5-ans-supply-chain-maroc',
          '169-entrepreneuriat-supply-chain-maroc-jeunes',
          '170-anglais-supply-chain-maroc-importance',
          '171-reseauter-etudiant-supply-chain-maroc',
          '172-soft-skills-supply-chain-maroc',
          '173-secteurs-porteurs-jeune-diplome-supply-chain',
          '174-premier-mois-emploi-supply-chain-maroc',
          '175-double-competence-supply-chain-maroc',
          // Entretien d'embauche (176-208)
          '176-preparer-entretien-supply-chain-maroc',
          '177-questions-entretien-supply-chain-reponses',
          '178-methode-star-entretien-supply-chain',
          '179-presentation-2-minutes-entretien-supply-chain',
          '180-questions-poser-entretien-supply-chain',
          '181-entretien-technique-supply-chain-maroc',
          '182-entretien-video-supply-chain-maroc',
          '183-gestion-stress-entretien-supply-chain',
          '184-entretien-competences-supply-chain-maroc',
          '185-entretien-supply-chain-manager-maroc',
          '186-entretien-acheteur-professionnel-maroc',
          '187-entretien-responsable-entrepot-maroc',
          '188-erreurs-entretien-supply-chain-a-eviter',
          '189-entretien-directeur-supply-chain-maroc',
          '190-entretien-planificateur-supply-chain-maroc',
          '191-simuler-entretien-supply-chain-maroc',
          '192-apres-entretien-supply-chain-maroc',
          '193-entretien-deuxieme-tour-supply-chain',
          '194-tenue-vestimentaire-entretien-supply-chain-maroc',
          '195-negocier-offre-emploi-supply-chain-maroc',
          '196-faiblesses-entretien-supply-chain-maroc',
          '197-lettre-remerciement-entretien-supply-chain',
          '198-entretien-rh-vs-operationnel-supply-chain',
          '199-entretien-supply-chain-automobile-maroc',
          '200-entretien-supply-chain-pharma-maroc',
          '201-entretien-supply-chain-fmcg-maroc',
          '202-cas-pratique-entretien-supply-chain-maroc',
          '203-psychologie-entretien-supply-chain-maroc',
          '204-entretien-anglais-supply-chain-maroc',
          '205-references-professionnelles-supply-chain-maroc',
          '206-reconversion-sectorielle-entretien-supply-chain-maroc',
          '207-gerer-entretien-difficile-supply-chain-maroc',
          '208-guide-ultime-entretien-supply-chain-maroc',
          // Carrière & Bien-être
          '209-burnout-supply-chain-logistique-maroc',
          '210-developpement-carriere-supply-chain-achats-logistique-maroc',
          // Actualité réglementaire
          '211-nouvelle-loi-livraison-colis-maroc-2026',
          '212-hausse-carburant-transporteurs-maroc-2026',
          '213-guide-portnet-badr-maroc',
          '214-grille-salariale-logistique-maroc-2026-employeur',
          '215-sap-odoo-dynamics-365-erp-supply-chain-maroc',
          '216-ia-agentique-supply-chain-feuille-de-route-pme-maroc',
          '217-achats-durables-rse-fournisseurs-audit-maroc',
          '218-supply-chain-aeronautique-maroc-ecosysteme-safran',
          '219-supply-chain-cosmetique-maroc-enjeux-logistiques',
          '220-hydrogene-vert-ammoniac-ocp-chaine-logistique',
          '221-marque-employeur-logistique-maroc-attractivite',
          '222-recruter-generation-z-logistique-maroc',
          '223-zones-franches-marocaines-comparees',
          '224-corridor-maroc-afrique-ouest-sahel-export',
          '225-3pl-4pl-afrique-francophone-panorama',
          '226-cartographier-risques-supply-chain-methode',
          '227-achats-publics-maroc-seuils-2026',
          '228-femmes-supply-chain-marocaine-chiffres-realite',
          '229-cout-reel-projet-erp-logistique-maroc',
          '230-ia-predictive-prevision-demande-stock-securite',
          '231-audit-qhse-entrepot-maroc-grille-methode',
          '232-formation-hse-entrepot-logistique-maroc',
          '233-iso-9001-pme-logistique-maroc-par-ou-commencer',
          '234-regimes-douaniers-suspensifs-stock-theorique-vs-reel',
          '235-incoterms-guide-pratique-maroc-importateurs-exportateurs',
          '236-statut-oea-maroc-accelerer-dedouanement',
          '237-accords-libre-echange-maroc-reduire-droits-douane',
          '238-litiges-douaniers-contentieux-import-export-maroc',
          '239-commerce-triangulaire-maroc-afrique-europe-zones-franches',
          '240-category-management-achats-structurer-categories',
          '241-cbam-taxe-carbone-ue-exportateurs-marocains',
          '242-sourcing-multi-fournisseurs-vs-fournisseur-unique',
          '243-e-sourcing-plateformes-digitalisation-achats-maroc',
          '244-tco-cout-total-possession-methode-achats',
          '245-achats-indirects-gisement-economies-pme-maroc',
          '246-robots-automatisation-entrepot-maroc-etat-des-lieux',
          '247-digital-twin-jumeau-numerique-supply-chain-usage',
          '248-blockchain-tracabilite-agroalimentaire-export-maroc',
          '249-control-tower-logistique-piloter-temps-reel',
          '250-cybersecurite-supply-chain-fournisseurs-maroc',
          '251-iot-capteurs-connectes-entrepot-maroc',
          '252-automatisation-achats-ia-p2p-maroc',
          '253-tableau-de-bord-ia-supply-chain-sans-data-scientist',
          '254-logistique-verte-maroc-transition-freinee',
          '255-bilan-carbone-transport-scope-3-methode',
          '256-vehicules-verts-flotte-logistique-maroc',
          '257-economie-circulaire-supply-chain-dechets-industriels-maroc',
          '258-reporting-esg-fournisseurs-maroc-csrd',
          '259-emballages-durables-reduction-couts-logistiques',
          '260-entrepots-eco-responsables-certification-energie',
          '261-maroc-leader-africain-logistique-durable',
          '262-buffer-stock-ecommerce-maroc-stockage-local',
          '263-paiement-livraison-cod-maroc-logistique',
          '264-dark-store-micro-fulfillment-maroc',
          '265-livraison-zones-rurales-enclavees-maroc',
          '266-retours-ecommerce-cout-cache-maroc',
          '267-marketplace-vs-vente-directe-logistique-maroc',
          '268-turnover-entrepot-maroc-causes-solutions',
          '269-cabinet-recrutement-vs-direct-poste-critique-maroc',
          '270-onboarding-caristes-magasiniers-maroc',
          '271-management-proximite-entrepot-feedback-continu',
          '272-penurie-chauffeurs-routiers-maroc',
          '273-formation-interne-vs-recrutement-externe-maroc',
          '274-plan-succession-postes-cles-supply-chain-maroc',
          '275-femmes-postes-executifs-supply-chain-freins',
          '276-feminiser-metiers-entrepot-transport-maroc',
          '277-reseaux-mentorat-femmes-logistique-maroc',
          '278-diversite-supply-chain-argument-concurrentiel',
          '279-sap-mm-module-achats-maroc',
          '280-migration-sap-s4hana-pme-industrielle-maroc',
          '281-wms-vs-erp-integre-entrepot-maroc',
          '282-interoperabilite-erp-wms-tms-connecter-systemes',
          '283-choisir-logiciel-prevision-demande-pme-maroc',
          '284-certification-pmp-maroc-supply-chain',
          '285-methode-transformation-supply-chain-5-phases',
          '286-agile-supply-chain-maroc-scrum-kanban',
          '287-gouvernance-projet-logistique-multi-sites',
          '288-change-management-projet-erp-wms-maroc',
          '289-logistique-miniere-maroc-hors-ocp',
          '290-supply-chain-btp-penurie-materiel-maroc',
          '291-supply-chain-hotellerie-tourisme-maroc',
          '292-dispositifs-medicaux-chaine-approvisionnement-maroc',
          '293-supply-chain-huile-argan-export-maroc',
          '294-logistique-peche-agadir-dakhla-export',
          '295-supply-chain-textile-technique-denim-maroc',
          '296-transport-multimodal-maroc-reduire-couts',
          '297-autoroute-mer-tanger-europe-alternative',
          '298-affretement-sous-traitance-transport-maroc',
          '299-geolocalisation-flotte-transport-maroc',
          '300-transport-frigorifique-routier-maroc-normes',
          '301-port-ndayane-senegal-futur-mega-port',
          '302-transit-douanier-afrique-ouest-corridors',
          '303-digitalisation-logistique-afrique-ouest-erp',
          '304-zones-logistiques-industrielles-afrique-francophone',
          '305-pca-logistique-maroc-continuite-activite',
          '306-multi-sourcing-resilience-post-covid-encore-valable',
          '307-negociation-fournisseurs-inflation-leviers',
          '308-srm-equipementiers-tier-1-automobile-maroc',
          // Cluster IA générative / LLM / automatisation — SC, logistique, achats
          '309-ia-gnrative-en-supply-chain-25-cas-dusage-concrets-au-maroc',
          '310-ia-supply-chain-llm-ia-prdictive-ou-rpa-quel-outil-pour-quel',
          '311-rdiger-un-cahier-des-charges-avec-lia-mthode-et-garde-fous',
          '312-cot-dun-projet-ia-supply-chain-pour-une-pme-marocaine',
          '313-automatiser-les-documents-de-douane-par-lia-dum-bl-packing-l',
          '314-automatiser-le-traitement-des-factures-fournisseurs-avec-lia',
          '315-ia-et-supply-chain-automobile-au-maroc-prvision-edi-et-jit',
          '316-copilot-de-demand-planning-lia-gnrative-au-service-du-prvisi',
          '317-ia-et-agro-industrie-au-maroc-prvision-de-rcolte-et-chane-du',
          '318-gouvernance-de-lia-en-supply-chain-la-charte-avant-les-outil',
          '319-chatbot-de-suivi-de-commande-par-ia-dsengorger-le-service-cl',
          '320-loi-09-08-et-cndp-utiliser-un-llm-sans-exposer-ses-donnes-fo',
        ]

        const fetched = await Promise.all(
          blogFiles.map(async (file) => {
            try {
              const response = await fetch(`/blog/${file}.md`)
              if (!response.ok) return null
              const content = await response.text()
              return parseMarkdown(content)
            } catch (err) {
              console.error(`Error loading ${file}:`, err)
              return null
            }
          })
        )
        const loadedPosts = fetched.filter((p): p is BlogPost => p !== null)

        // Sort by date descending
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(loadedPosts)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Deep-link : /blog/<slug> (canonique) ou /blog?post=<slug> (rétro-compat) ouvre l'article visé
  useEffect(() => {
    const slug = params.slug || searchParams.get('post')
    if (!slug || posts.length === 0) return
    const match = posts.find((p) => p.slug === slug)
    if (match) setSelectedPost(match)
  }, [posts, params.slug, searchParams])

  return (
    <>
      <section style={{ background: 'var(--dark)', padding: 'var(--sp)', overflow: 'hidden' }}>
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag" style={{ color: 'var(--blue-bright)' }}>
              <span>INSIGHTS</span>
            </div>

            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(2.5rem, 4vw, 5rem)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: 'var(--navy)',
                marginBottom: '3rem',
              }}
            >
              Supply Chain Insights.
            </h2>
          </motion.div>

          {loading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '1rem',
                color: 'var(--dark-muted)',
              }}
            >
              Chargement des articles...
            </motion.p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
            }}>
              {posts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (idx % 3) * 0.12,
                  }}
                  whileHover="hover"
                  onClick={() => setSelectedPost(post)}
                  style={{
                    border: '1px solid var(--dark-border)',
                    cursor: 'pointer',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,111,181,0.5)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(47,111,181,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--dark-border)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {/* Gold bottom line reveal on hover */}
                  <motion.div
                    variants={{
                      hover: { scaleX: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    initial={{ scaleX: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--blue-bright)',
                      transformOrigin: 'left',
                      zIndex: 2,
                    }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {post.image && (
                      <div
                        style={{
                          width: '100%',
                          height: '180px',
                          overflow: 'hidden',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          variants={{
                            hover: { scale: 1.07, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
                      <h3
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: 'clamp(1rem, 1.5vw, 1.375rem)',
                          fontWeight: 400,
                          lineHeight: 1.25,
                          color: 'var(--navy)',
                        }}
                      >
                        {post.title}
                      </h3>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'DM Mono, monospace',
                          color: 'var(--blue-bright)',
                          opacity: 0.75,
                        }}
                      >
                        {new Date(post.date).toLocaleDateString('fr-FR')}
                        {post.author && <span style={{ marginLeft: '1rem' }}>{post.author}</span>}
                      </div>

                      <p
                        style={{
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: 'var(--dark-muted)',
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                        }}
                      >
                        {post.description}
                      </p>

                      <motion.span
                        variants={{
                          hover: { x: 6, color: '#2f6fb5', transition: { duration: 0.25, ease: 'easeOut' } },
                        }}
                        style={{
                          fontFamily: 'Jost, sans-serif',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--blue-bright)',
                          marginTop: 'auto',
                          display: 'inline-block',
                        }}
                      >
                        Lire l'article →
                      </motion.span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPost && (
        <BlogDetail
          post={selectedPost}
          onClose={() => {
            setSelectedPost(null)
            if (params.slug) navigate('/blog', { replace: true })
            else if (searchParams.get('post')) setSearchParams({}, { replace: true })
          }}
        />
      )}
    </>
  )
}

interface BlogDetailProps {
  post: BlogPost
  onClose: () => void
}

function buildArticleSchema(post: BlogPost) {
  if (post.schema === 'FAQPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: post.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: post.quickAnswer || post.description || post.title,
          },
        },
      ],
    }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.quickAnswer,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author || 'Nextinotech' },
    publisher: { '@type': 'Organization', name: 'Nextinotech' },
  }
}

function BlogDetail({ post, onClose }: BlogDetailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [post])

  // IntersectionObserver for .blog-figure, .blog-callout, .blog-stat-block animations
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.blog-figure, .blog-callout, .blog-stat-block'
    )
    if (!targets.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    targets.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [post])

  useEffect(() => {
    const prevTitle = document.title
    const sel = <T extends HTMLMetaElement>(attr: string, val: string) =>
      document.querySelector<T>(`meta[${attr}="${val}"]`)

    const descMeta   = sel('name', 'description')
    const ogTitle    = sel('property', 'og:title')
    const ogDesc     = sel('property', 'og:description')
    const twTitle    = sel('name', 'twitter:title')
    const twDesc     = sel('name', 'twitter:description')

    const prevDesc   = descMeta?.content
    const prevOgT    = ogTitle?.content
    const prevOgD    = ogDesc?.content
    const prevTwT    = twTitle?.content
    const prevTwD    = twDesc?.content

    const articleTitle = `${post.title} | Nextinotech`
    document.title = articleTitle
    if (descMeta && post.description)  descMeta.content = post.description
    if (ogTitle)                        ogTitle.content  = articleTitle
    if (ogDesc  && post.description)   ogDesc.content   = post.description
    if (twTitle)                        twTitle.content  = articleTitle
    if (twDesc  && post.description)   twDesc.content   = post.description

    document.body.style.overflow = 'hidden'

    return () => {
      document.title = prevTitle
      if (descMeta && prevDesc)  descMeta.content = prevDesc
      if (ogTitle  && prevOgT)   ogTitle.content  = prevOgT
      if (ogDesc   && prevOgD)   ogDesc.content   = prevOgD
      if (twTitle  && prevTwT)   twTitle.content  = prevTwT
      if (twDesc   && prevTwD)   twDesc.content   = prevTwD
      document.body.style.overflow = 'auto'
    }
  }, [post])

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 20, 32, 0.95)',
        zIndex: 1000,
        overflowY: 'auto',
        backdropFilter: 'blur(4px)',
      }}
    >
      <SchemaScript schema={buildArticleSchema(post)} />

      {/* Reading progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.07)', zIndex: 1001 }}>
        <div style={{ height: '100%', background: 'var(--blue-bright)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
      </div>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'var(--sp-y-sm) var(--sp-x)',
          background: 'var(--dark)',
          color: 'var(--navy)',
          minHeight: '100vh',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            width: '40px',
            height: '40px',
            background: 'transparent',
            border: '1px solid var(--dark-border)',
            color: 'var(--navy)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--blue-bright)'
            e.currentTarget.style.color = 'var(--blue-bright)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--dark-border)'
            e.currentTarget.style.color = 'var(--navy)'
          }}
          aria-label="Fermer"
        >
          ×
        </button>

        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.8rem',
              fontFamily: 'DM Mono, monospace',
              color: 'rgba(47,111,181,0.7)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
            {post.author && <><span style={{ opacity: 0.4 }}>·</span><span>{post.author}</span></>}
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {readingTime(post.rawContent)} min de lecture
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            {post.title}
          </h1>

          {post.keywords && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'DM Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--blue-bright)',
                opacity: 0.7,
              }}
            >
              {post.keywords.split(', ').map((kw) => (
                <span key={kw}>#{kw.trim()}</span>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="blog-cover"
          />
        )}

        <div
          className="blog-content"
          style={{
            fontFamily: 'Jost, sans-serif',
            lineHeight: 1.8,
            fontSize: '1.0625rem',
            color: 'var(--navy)',
          }}
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </motion.article>
    </motion.div>
  )
}
