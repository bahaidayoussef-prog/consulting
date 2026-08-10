import PageHero from '../components/PageHero'
import ProductiviteSimulator from '../components/ProductiviteSimulator'

export default function ProductiviteEnginsPage() {
  return (
    <>
      <PageHero
        num="08"
        title="Estimez votre"
        titleItalic="productivité."
        subtitle="Engins, main d'œuvre : estimez en 2 minutes votre productivité et l'effectif nécessaire pour votre volume. Gratuit, sans engagement."
        tag="SIMULATEUR GRATUIT"
        bg="var(--paper)"
        breadcrumb={{ label: 'Services', to: '/services' }}
      />
      <ProductiviteSimulator />
    </>
  )
}
