import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import DscVsRecrutementCdi from '../components/DscVsRecrutementCdi'

export default function DscVsRecrutementCdiPage() {
  return (
    <>
      <PageMeta
        title="DSC en CDI ou Mandat Essor ? Le Comparatif Complet | Essor Consulting"
        description="Coût réel, délai de démarrage, engagement, résultat en sortie : le comparatif chiffré entre recruter un Directeur Supply Chain en CDI et un mandat à temps partagé."
        canonical="https://nextinotech.com/dsc-vs-recrutement-cdi"
      />
      <PageHero
        num="14"
        title="DSC en CDI"
        titleItalic="ou Mandat Essor ?"
        subtitle="Coût réel, délai de démarrage, engagement, résultat en sortie — le comparatif chiffré, critère par critère."
        tag="COMPARATIF · CDI VS MANDAT"
        bg="var(--paper)"
      />
      <DscVsRecrutementCdi />
    </>
  )
}
