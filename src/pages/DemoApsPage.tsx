import PageHero from '../components/PageHero'
import DemoAps from '../components/demo/DemoAps'

export default function DemoApsPage() {
  return (
    <>
      <PageHero
        num="D3"
        title="Démo"
        titleItalic="APS."
        subtitle="Aperçu interactif d'un outil de planification avancée : prévision de la demande, simulation en temps réel selon vos leviers. Données fictives."
        tag="DÉMONSTRATION INTERACTIVE"
        bg="var(--paper)"
        breadcrumb={{ label: 'Services', to: '/services' }}
      />
      <DemoAps />
    </>
  )
}
