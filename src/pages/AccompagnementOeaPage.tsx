import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import AccompagnementOEA from '../components/AccompagnementOEA'

export default function AccompagnementOeaPage() {
  return (
    <>
      <PageMeta
        title="Accompagnement Statut OEA (Opérateur Économique Agréé) au Maroc | Nextinotech"
        description="Cabinet d'accompagnement pour l'obtention du statut OEA — Simplifications Douanières — auprès de l'ADII. Diagnostic, mise en conformité, dossier de candidature, audit à blanc, coaching le jour de l'audit."
        canonical="https://nextinotech.com/accompagnement-oea"
      />
      <PageHero
        num="16"
        title="Accompagnement"
        titleItalic="Statut OEA."
        subtitle="Obtenir la notification d'agrément Opérateur Économique Agréé de l'ADII — Simplifications Douanières, catégorie A ou B. Un mandat de résultat, pas une formalité déclarative."
        tag="CONFORMITÉ DOUANIÈRE · ADII"
        bg="var(--paper)"
      />
      <AccompagnementOEA />
    </>
  )
}
