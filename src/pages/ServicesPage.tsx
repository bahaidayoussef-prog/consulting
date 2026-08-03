import { Statement } from '../components/Layout'
import Pourquoi from '../components/Pourquoi'
import Conseil from '../components/Conseil'
import Systemes from '../components/Systemes'
import Methode from '../components/Methode'

export default function ServicesPage() {
  return (
    <>
      <Pourquoi />
      <Statement text="Le bon logiciel ne vaut rien sans la bonne méthode." bg="var(--paper)" />
      <Conseil />
      <Systemes />
      <Methode />
    </>
  )
}
