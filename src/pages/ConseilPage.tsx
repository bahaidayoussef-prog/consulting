import { Statement } from '../components/Layout'
import PageHero from '../components/PageHero'
import Pourquoi from '../components/Pourquoi'
import Conseil from '../components/Conseil'
import DimensionnementCTA from '../components/DimensionnementCTA'
import Systemes from '../components/Systemes'
import DSCTeaser from '../components/DSCTeaser'
import Methode from '../components/Methode'

export default function ConseilPage() {
  return (
    <>
      <PageHero
        num="01"
        title="Conseil &"
        titleItalic="Expertise."
        subtitle="Diagnostic, DDMRP, sélection et déploiement de systèmes, direction supply chain à temps partagé — sans allégeance à aucun éditeur."
        tag="EXPERTISE · TERRAIN"
      />
      <Pourquoi />
      <Statement text="Le bon logiciel ne vaut rien sans la bonne méthode." bg="var(--paper)" />
      <Conseil />
      <DimensionnementCTA />
      <Systemes />
      <DSCTeaser />
      <Methode />
    </>
  )
}
