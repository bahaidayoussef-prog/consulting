import { motion } from 'framer-motion'


const ARTICLES = [
  {
    category: 'Planification',
    readTime: '8 min',
    date: 'Mai 2026',
    title: 'DDMRP : pourquoi les PME marocaines résistent encore à la disruption de la planification',
    excerpt:
      "La méthode DDMRP réduit le BFR de 20 à 40% en moyenne. Pourtant, moins de 3% des entreprises marocaines l'ont adoptée. Analyse des freins et de la marche à suivre.",
    tag: '— DDMRP · S&OP',
    image: '/images/analytics.jpg',
  },
  {
    category: 'AMOA SI',
    readTime: '11 min',
    date: 'Avril 2026',
    title: "Appel d'offres ERP : les 7 erreurs qui coûtent cher aux PME et ETI",
    excerpt:
      "Un projet ERP raté coûte en moyenne 2 à 4× son budget initial. Sept décisions critiques que la plupart des directions achètent trop tard — et comment les éviter.",
    tag: '— ERP · Sélection',
    image: '/images/charts.jpg',
  },
  {
    category: 'Logistique',
    readTime: '7 min',
    date: 'Mars 2026',
    title: 'Outsourcing logistique au Maroc : les critères de décision que les consultants ne vous diront pas',
    excerpt:
      'Make or buy logistique — la vraie analyse dépasse le simple coût à la palette. Grille de décision terrain testée sur 12 configurations réelles.',
    tag: '— 3PL · Make vs Buy',
    image: '/images/transport.jpg',
  },
]

function ArticleCard({ article, index }: { article: (typeof ARTICLES)[0]; index: number }) {
  return (
    <motion.a
      href="#contact"
      className="insight-card"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
      }}
    >

      {/* Top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, var(--gold), transparent)',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
        className="insight-top-line"
      />

      {/* Cover image */}
      <div style={{
        width: '100%',
        height: 200,
        overflow: 'hidden',
        marginBottom: '1.5rem',
        position: 'relative',
      }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(25%) contrast(1.05)',
            transition: 'transform 0.6s ease',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(10,20,32,0.6) 100%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '1.5rem 2rem 2rem' }}>
        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ width: 6, height: 6, background: 'var(--gold)', display: 'inline-block' }} />
            {article.category}
          </div>
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              color: 'rgba(27,53,84,0.4)',
              textTransform: 'uppercase',
            }}
          >
            {article.date} · {article.readTime}
          </div>
        </div>

        {/* Author byline */}
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(192,154,47,0.65)',
            marginBottom: '1rem',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          Par <strong>Essor Consulting</strong> · Expert Supply Chain
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'Bodoni Moda, serif',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
            fontWeight: 700,
            color: 'var(--dark-text)',
            lineHeight: 1.3,
            marginBottom: '1rem',
          }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: '0.86rem',
            color: 'rgba(27,53,84,0.6)',
            lineHeight: 1.75,
            marginBottom: '2rem',
          }}
        >
          {article.excerpt}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(27,53,84,0.08)',
            paddingTop: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(184,146,42,0.45)',
            }}
          >
            {article.tag}
          </span>
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--gold)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Lire →
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function Insights() {

  return (
    <section
      id="insights"
      style={{
        background: 'var(--dark-2)',
        padding: 'var(--sp-y-md) var(--sp-x)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(27,53,84,0.08)',
      }}
    >
      {/* Background texture */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.02, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="i-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#i-dots)" />
      </svg>

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(192,154,47,0.45)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              08 / Insights
            </div>
            <h2
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: 'clamp(2.8rem, 5vw, 6rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: 'var(--dark-text)',
              }}
            >
              Pensées sur la{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>
                supply chain.
              </span>
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(184,146,42,0.7)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(184,146,42,0.7)')}
          >
            Discuter de vos besoins
            <span style={{ fontSize: '1rem' }}>→</span>
          </motion.a>
        </div>

        {/* Featured YouTube video */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(192,154,47,0.55)',
            }}>
              Vidéo · Logistique Amazon
            </span>
            <span style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              background: '#ff0000',
              borderRadius: '50%',
            }} />
            <span style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(27,53,84,0.45)',
            }}>
              YouTube
            </span>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            border: '1px solid rgba(27,53,84,0.1)',
            overflow: 'hidden',
            background: '#000',
          }}>
            <iframe
              src="https://www.youtube.com/embed/c924YrJYTho?rel=0&modestbranding=1&color=white"
              title="Logistique Amazon — Supply Chain"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </div>
        </motion.div>

        {/* Articles grid */}
        <div
          className="insights-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {ARTICLES.map((a, i) => (
            <ArticleCard key={a.title} article={a} index={i} />
          ))}
        </div>

        {/* Newsletter signup teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: '4rem',
            padding: '2.5rem 3rem',
            border: '1px solid rgba(184,146,42,0.15)',
            background: 'rgba(184,146,42,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--dark-text)',
                marginBottom: '0.35rem',
              }}
            >
              La supply chain marocaine expliquée, chaque mois.
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--dark-muted)' }}>
              Pas de spam. Un article de fond. Des cas concrets. Désinscription en un clic.
            </div>
          </div>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.8rem',
              background: 'transparent',
              border: '1px solid rgba(184,146,42,0.4)',
              color: 'var(--gold)',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--gold)'
              el.style.color = '#0e1f30'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.color = 'var(--gold)'
            }}
          >
            S'abonner →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
