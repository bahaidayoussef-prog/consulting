import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import IngenierieFormation from '../components/IngenierieFormation'

export default function IngenierieFormationPage() {
  return (
    <>
      <PageMeta
        title="Ingénierie de Formation au Maroc — Diagnostic & Plan de Formation | Nextinotech"
        description="Diagnostic des besoins en compétences, plan de formation chiffré et dossier de financement GIAC/OFPPT. Une mission de conseil en ingénierie de formation pour les entreprises de la Supply Chain, du transport et de la logistique."
        canonical="https://nextinotech.com/ingenierie-formation"
      />
      <PageHero
        num="29"
        title="Ingénierie"
        titleItalic="de Formation."
        subtitle="Un diagnostic terrain pour transformer votre budget de formation en plan d'action chiffré, financé et mesurable."
        tag="CONSEIL RH · PLAN DE FORMATION"
        bg="var(--paper)"
      />
      <IngenierieFormation />
    </>
  )
}
