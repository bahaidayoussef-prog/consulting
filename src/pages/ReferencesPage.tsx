import PageHero from '../components/PageHero'
import Impact from '../components/Impact'
import References from '../components/References'
import DSCTeaser from '../components/DSCTeaser'

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        num="02"
        title="Nos"
        titleItalic="Références."
        subtitle="110+ missions au Maroc et en Europe. Des résultats mesurables chez Renault, DHL, OCP, L'Oréal et bien d'autres."
        tag="ÉTUDES DE CAS · RÉSULTATS"
      />
      <Impact />
      <References />
      <DSCTeaser />
    </>
  )
}
