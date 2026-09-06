import { useParams, Navigate } from 'react-router-dom'
import PageMeta from '../components/PageMeta'
import PageHero from '../components/PageHero'
import FormationProgramme from '../components/FormationProgramme'
import { PROGRAMMES } from '../data/formations'

function metaDescription(subtitle: string, price: string, unit: string): string {
  const base = `${subtitle} ${price} ${unit}. Financement CSF / GIAC possible.`
  return base.length > 158 ? base.slice(0, 155).trimEnd() + '…' : base
}

export default function FormationProgrammePage() {
  const { programme: id } = useParams<{ programme: string }>()

  if (id === 'rl') return <Navigate to="/formation-rl" replace />

  const p = PROGRAMMES.find((x) => x.id === id)
  if (!p) return <Navigate to="/formation" replace />

  return (
    <>
      <PageMeta
        title={`Formation ${p.title} au Maroc | Nextinotech`}
        description={metaDescription(p.subtitle, p.price, p.unit)}
        canonical={`https://nextinotech.com/formation/${p.id}`}
      />
      <PageHero
        num={p.num}
        title={p.title}
        subtitle={`${p.duration} · ${p.group} · ${p.lieu}`}
        tag={`FORMATION · ${p.badge.toUpperCase()}`}
        bg="var(--paper)"
        breadcrumb={{ label: 'Toutes les formations', to: '/formation' }}
      />
      <FormationProgramme p={p} />
    </>
  )
}
