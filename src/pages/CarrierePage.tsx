import PageHero from '../components/PageHero'
import Carriere from '../components/Carriere'

export default function CarrierePage() {
  return (
    <>
      <PageHero
        num="11"
        title="Rejoindre"
        titleItalic="l'équipe."
        subtitle="Un cabinet indépendant, une équipe resserrée, une exigence de terrain. Découvrez pourquoi nous rejoindre et le poste actuellement ouvert."
        tag="CARRIÈRE · RECRUTEMENT"
        bg="var(--paper)"
      />
      <Carriere />
    </>
  )
}
