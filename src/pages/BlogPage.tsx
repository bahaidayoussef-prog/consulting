import PageHero from '../components/PageHero'
import Blog from '../components/Blog'
import Insights from '../components/Insights'

export default function BlogPage() {
  return (
    <>
      <PageHero
        num="05"
        title="Supply Chain"
        titleItalic="Insights."
        subtitle="Articles, études de cas et ressources pratiques pour les professionnels de la Supply Chain au Maroc et en Afrique."
        tag="RESSOURCES · BLOG"
      />
      <Blog />
      <Insights />
    </>
  )
}
