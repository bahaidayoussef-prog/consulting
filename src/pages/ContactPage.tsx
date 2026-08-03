import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <>
      <PageHero
        num="06"
        title="Prendre"
        titleItalic="contact."
        subtitle="Un échange de 30 minutes suffit pour cadrer votre problématique. Gratuit, sans engagement."
        tag="CONTACT · CASABLANCA"
      />
      <Contact />
    </>
  )
}
