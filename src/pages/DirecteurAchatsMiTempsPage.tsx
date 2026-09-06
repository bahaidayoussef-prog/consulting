import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import DirecteurAchatsMiTemps from '../components/DirecteurAchatsMiTemps'

export default function DirecteurAchatsMiTempsPage() {
  return (
    <>
      <PageMeta
        title="Directeur Achats à Temps Partagé au Maroc | Nextinotech"
        description="Sourcing, négociation fournisseurs et réduction des coûts d'achat à temps partagé. 11% d'économies chez Addoha. Mandat 180k-550k MAD, PME & ETI Maroc."
        canonical="https://nextinotech.com/directeur-achats-mi-temps"
      />
      <PageHero
        num="13"
        title="Directeur Achats"
        titleItalic="à temps partagé."
        subtitle="Sourcing, négociation fournisseurs, réduction des coûts d'achat — un pilotage opérationnel sans les délais ni le coût fixe d'un recrutement CDI."
        tag="ACHATS · MANDAT OPÉRATIONNEL"
        bg="var(--paper)"
      />
      <DirecteurAchatsMiTemps />
    </>
  )
}
