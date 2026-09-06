import { Statement } from '../components/Layout'
import PageHero from '../components/PageHero'
import Profil from '../components/Profil'
import Team from '../components/Team'
import Engagement from '../components/Engagement'

export default function AProposPage() {
  return (
    <>
      <PageHero
        num="04"
        title="À"
        titleItalic="propos."
        subtitle="Plus de 20 ans de missions terrain en ingénierie Supply Chain. Un cabinet indépendant, sans allégeance à aucun éditeur."
        tag="FONDATEUR · CABINET"
        bg="var(--paper)"
        textColor="var(--ink)"
      />
      <Statement
        text="Indépendant. Pas parce que c'est tendance. Parce que c'est juste."
        bg="var(--dark)"
        accent="var(--blue-bright)"
      />
      <Profil />
      <Team />
      <Engagement />
    </>
  )
}
