import PageHero from '../components/PageHero'
import DimensionnementSimulator from '../components/DimensionnementSimulator'

export default function DimensionnementEntrepotPage() {
  return (
    <>
      <PageHero
        num="07"
        title="Dimensionnez"
        titleItalic="l'Entrepôt."
        subtitle="Estimez en 2 minutes la surface, le nombre de baies et de quais nécessaires à votre entrepôt. Gratuit, sans engagement."
        tag="SIMULATEUR GRATUIT"
        bg="var(--paper)"
        breadcrumb={{ label: 'Services', to: '/services' }}
      />
      <DimensionnementSimulator />
    </>
  )
}
