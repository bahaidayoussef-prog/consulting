import { Statement } from '../components/Layout'
import Profil from '../components/Profil'
import Engagement from '../components/Engagement'

export default function AProposPage() {
  return (
    <>
      <Statement
        text="Indépendant. Pas parce que c'est tendance. Parce que c'est juste."
        bg="var(--paper)"
      />
      <Profil />
      <Engagement />
    </>
  )
}
