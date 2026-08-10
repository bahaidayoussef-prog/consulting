import PageHero from '../components/PageHero'
import CoutGlobalSimulator from '../components/CoutGlobalSimulator'

export default function CoutGlobalEntrepotPage() {
  return (
    <>
      <PageHero
        num="09"
        title="Estimez votre"
        titleItalic="coût global."
        subtitle="Bâtiment, main d'œuvre, équipements : estimez en 2 minutes le coût mensuel total de votre entrepôt et sa répartition. Gratuit, sans engagement."
        tag="SIMULATEUR GRATUIT"
        bg="var(--paper)"
        breadcrumb={{ label: 'Services', to: '/services' }}
      />
      <CoutGlobalSimulator />
    </>
  )
}
