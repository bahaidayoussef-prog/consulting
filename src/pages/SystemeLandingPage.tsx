import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PageMeta from '../components/PageMeta'
import { SYSTEME_PAGES } from '../data/systemePages'

export default function SystemeLandingPage({ solution }: { solution: keyof typeof SYSTEME_PAGES }) {
  const page = SYSTEME_PAGES[solution]
  const canonical = `https://nextinotech.com${page.path}`

  return (
    <>
      <PageMeta title={page.seoTitle} description={page.description} canonical={canonical} />
      <PageHero
        num={page.number}
        title={page.title}
        titleItalic={page.titleItalic}
        subtitle={page.subtitle}
        tag={page.tag}
        breadcrumb={{ label: 'Conseil Supply Chain', to: '/conseil' }}
      />

      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="systeme-page-intro">
            <div>
              <div className="section-tag"><span>LE BESOIN</span></div>
              <h2 className="systeme-page-heading">{page.introTitle}</h2>
            </div>
            <p className="systeme-page-copy">{page.intro}</p>
          </div>

          <div className="systeme-page-cards">
            {page.useCases.map((item, index) => (
              <article className="systeme-page-card" key={item}>
                <div className="systeme-page-card-number">0{index + 1}</div>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.offerTiers && (
        <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
          <div className="section-inner">
            <div className="section-tag"><span>UNE OFFRE PAR ÉTAPES</span></div>
            <h2 className="systeme-page-heading">Commencer avec un périmètre utile.</h2>
            <div className="systeme-page-cards">
              {page.offerTiers.map((tier) => (
                <article className="systeme-page-card systeme-page-offer" key={tier.name}>
                  <h3>{tier.name}</h3>
                  <p className="systeme-page-price">{tier.price}</p>
                  <p className="systeme-page-duration">{tier.duration}</p>
                  <p>{tier.scope}</p>
                </article>
              ))}
            </div>
            <p className="systeme-page-note">Le périmètre et le budget définitifs sont confirmés après cadrage des données, des interfaces et des sites concernés.</p>
          </div>
        </section>
      )}

      <section style={{ background: 'var(--dark)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="section-tag"><span>NOTRE INTERVENTION</span></div>
          <h2 className="systeme-page-heading systeme-page-heading-light">Du cadrage à l’adoption terrain.</h2>
          <div className="systeme-page-cards">
            {page.missionSteps.map((step, index) => (
              <article className="systeme-page-card systeme-page-card-dark" key={step.title}>
                <div className="systeme-page-card-number">0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <ul className="systeme-page-outcomes">
            {page.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
          </ul>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: 'var(--sp)' }}>
        <div className="section-inner systeme-page-faq-wrap">
          <div className="section-tag"><span>QUESTIONS FRÉQUENTES</span></div>
          <h2 className="systeme-page-heading">Vos questions, nos réponses.</h2>
          <div className="systeme-page-faq">
            {page.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
        <div className="section-inner">
          <div className="section-tag"><span>POUR ALLER PLUS LOIN</span></div>
          <div className="systeme-page-links">
            {page.links.map((link) => (
              <Link to={link.href} key={link.href}>{link.label}<span aria-hidden="true"> →</span></Link>
            ))}
          </div>
          <div className="systeme-page-cta">
            <p>Un échange de cadrage permet de vérifier si ce chantier correspond à votre situation.</p>
            <Link className="btn-primary" to="/contact">Parler de votre projet →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
