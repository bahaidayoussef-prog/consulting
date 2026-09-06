import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import Confidentialite from '../components/Confidentialite'

export default function ConfidentialitePage() {
  return (
    <>
      <PageMeta
        title="Politique de Confidentialité | Nextinotech"
        description="Données collectées par le site Nextinotech, finalités, cookies, sous-traitants et vos droits au titre de la loi 09-08."
        canonical="https://nextinotech.com/confidentialite"
      />
      <PageHero
        num="•"
        title="Politique de"
        titleItalic="confidentialité."
        subtitle="Données, cookies et vos droits."
        tag="MENTIONS · LOI 09-08"
        bg="var(--paper)"
        breadcrumb={{ label: 'Accueil', to: '/' }}
      />
      <Confidentialite />
    </>
  )
}
