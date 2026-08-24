import PageHero from '../components/PageHero'
import DemoTms from '../components/demo/DemoTms'

export default function DemoTmsPage() {
  return (
    <>
      <PageHero
        num="D2"
        title="Démo"
        titleItalic="TMS."
        subtitle="Aperçu interactif d'un système de gestion du transport : tournées de livraison, statut de flotte en direct. Données fictives."
        tag="DÉMONSTRATION INTERACTIVE"
        bg="var(--paper)"
        breadcrumb={{ label: 'Conseil', to: '/conseil' }}
      />
      <DemoTms />
    </>
  )
}
