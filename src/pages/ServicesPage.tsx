import { Statement } from '../components/Layout'
import PageHero from '../components/PageHero'
import Pourquoi from '../components/Pourquoi'
import Conseil from '../components/Conseil'
import Systemes from '../components/Systemes'
import Methode from '../components/Methode'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        num="01"
        title="Nos"
        titleItalic="Services."
        subtitle="Conseil opérationnel, intégration systèmes et transformation Supply Chain — sans allégeance à aucun éditeur."
        tag="EXPERTISE · TERRAIN"
      />
      <Pourquoi />
      <Statement text="Le bon logiciel ne vaut rien sans la bonne méthode." bg="var(--paper)" />
      <Conseil />
      <Systemes />
      <Methode />
    </>
  )
}
