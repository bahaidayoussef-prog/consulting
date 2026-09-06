import PageHero from '../components/PageHero'
import Faq from '../components/Faq'

export default function FaqPage() {
  return (
    <>
      <PageHero
        num="10"
        title="Questions"
        titleItalic="fréquentes."
        subtitle="Les réponses aux questions les plus posées sur nos missions de conseil et nos programmes de formation."
        tag="AIDE · SUPPORT"
        bg="var(--paper)"
      />
      <Faq />
    </>
  )
}
