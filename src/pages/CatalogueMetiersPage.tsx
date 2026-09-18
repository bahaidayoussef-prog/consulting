import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import CatalogueMetiers from '../components/CatalogueMetiers'

export default function CatalogueMetiersPage() {
  return (
    <>
      <PageMeta
        title="Catalogue de Formation par Métier — Ingénierie de Formation | Nextinotech"
        description="Le catalogue complet des thèmes de formation par métier : Supply Chain, Management, Finance, RH, Marketing, Production, Qualité, IA et tendances. Livré par Nextinotech ou par notre réseau de partenaires formateurs, sans commission éditeur."
        canonical="https://nextinotech.com/ingenierie-formation/catalogue"
      />
      <PageHero
        num="29+"
        title="Catalogue"
        titleItalic="par Métier."
        subtitle="Tous les métiers de votre entreprise, un seul point d'entrée : nos formations et notre réseau de partenaires formateurs, sans commission éditeur."
        tag="INGÉNIERIE DE FORMATION · CATALOGUE"
        bg="var(--paper)"
      />
      <CatalogueMetiers />
    </>
  )
}
