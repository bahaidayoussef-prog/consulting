import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PageMeta from '../components/PageMeta'

export default function NotFoundPage() {
  return <>
    <PageMeta title="Page introuvable | Nextinotech" description="Cette page n’existe pas ou a été déplacée." canonical="https://nextinotech.com/404" robots="noindex,follow" />
    <PageHero num="404" title="Cette page" titleItalic="n’existe pas." subtitle="Le lien est peut-être ancien ou incorrect." tag="PAGE INTROUVABLE" breadcrumb={{ label: 'Accueil', to: '/' }} />
    <section style={{ padding: 'var(--sp)', background: 'var(--paper)' }}>
      <div className="section-inner"><p><Link className="btn-primary" to="/">Revenir à l’accueil →</Link></p></div>
    </section>
  </>
}
