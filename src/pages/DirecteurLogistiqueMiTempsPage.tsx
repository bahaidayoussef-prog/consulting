import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import DirecteurLogistiqueMiTemps from '../components/DirecteurLogistiqueMiTemps'

export default function DirecteurLogistiqueMiTempsPage() {
  return (
    <>
      <PageMeta
        title="Directeur Logistique à Temps Partagé au Maroc | Nextinotech"
        description="Direction opérationnelle de vos entrepôts, transport et flux physiques à temps partagé. Mandat 180k-550k MAD, opérationnel en 2 semaines. PME & ETI Maroc."
        canonical="https://nextinotech.com/directeur-logistique-mi-temps"
      />
      <PageHero
        num="12"
        title="Directeur Logistique"
        titleItalic="à temps partagé."
        subtitle="Entrepôts, transport, flux physiques — un pilotage opérationnel sans les délais ni le coût fixe d'un recrutement CDI."
        tag="LOGISTIQUE · MANDAT OPÉRATIONNEL"
        bg="var(--paper)"
      />
      <DirecteurLogistiqueMiTemps />
    </>
  )
}
