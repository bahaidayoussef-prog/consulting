import PageHero from '../components/PageHero'
import DemoWms from '../components/demo/DemoWms'

export default function DemoWmsPage() {
  return (
    <>
      <PageHero
        num="D1"
        title="Démo"
        titleItalic="WMS."
        subtitle="Aperçu interactif d'un système de gestion d'entrepôt : plan des emplacements, stock en temps réel, carte de chaleur d'activité. Données fictives."
        tag="DÉMONSTRATION INTERACTIVE"
        bg="var(--paper)"
        breadcrumb={{ label: 'Conseil', to: '/conseil' }}
      />
      <DemoWms />
    </>
  )
}
