import { useParams, Navigate } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import FormationVille from '../components/FormationVille'
import { findVille } from '../data/villesFormation'

export default function FormationVillePage() {
  const { ville: slug } = useParams<{ ville: string }>()
  const ville = findVille(slug)

  if (!ville) return <Navigate to="/formation" replace />

  return (
    <>
      <PageMeta
        title={ville.metaTitle}
        description={ville.metaDescription}
        canonical={`https://nextinotech.com/formation-logistique-${ville.slug}`}
      />
      <PageHero
        num={ville.nom.slice(0, 2).toUpperCase()}
        title={ville.heroTitre}
        titleItalic={ville.heroItalic}
        subtitle={ville.heroSubtitle}
        tag={`FORMATION · ${ville.nom.toUpperCase()}`}
        bg="var(--paper)"
        breadcrumb={{ label: 'Formations', to: '/formation' }}
      />
      <FormationVille ville={ville} />
    </>
  )
}
