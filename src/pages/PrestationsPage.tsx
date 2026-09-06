import PageHero from '../components/PageHero'
import Prestations from '../components/Prestations'

export default function PrestationsPage() {
  return (
    <>
      <PageHero
        num="15"
        title="Nos"
        titleItalic="Prestations."
        subtitle="Pack Inventaire, services logistiques à valeur ajoutée, imprimantes industrielles Leibinger — exécutés par nos propres équipes."
        tag="EXÉCUTION · OPÉRATIONS"
      />
      <Prestations />
    </>
  )
}
