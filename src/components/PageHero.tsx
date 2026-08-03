import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface PageHeroProps {
  num: string
  title: string
  titleItalic?: string
  subtitle?: string
  tag?: string
  bg?: string
  textColor?: string
  breadcrumb?: { label: string; to: string }
}

const ease = [0.16, 1, 0.3, 1] as const

export default function PageHero({
  num,
  title,
  titleItalic,
  subtitle,
  tag = 'ESSOR CONSULTING',
  bg = 'var(--dark)',
  textColor = 'var(--dark-text)',
  breadcrumb,
}: PageHeroProps) {
  const words = title.split(' ')

  return (
    <section
      style={{
        background: bg,
        paddingTop: 'calc(88px + 5rem)',
        paddingBottom: '6rem',
        paddingLeft: 'var(--sp-x)',
        paddingRight: 'var(--sp-x)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Large faded number */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease }}
        style={{
          position: 'absolute',
          right: '3rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Bodoni Moda, serif',
          fontSize: 'clamp(10rem, 25vw, 28rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: bg === 'var(--paper)' ? 'rgba(27,53,84,0.04)' : 'rgba(255,255,255,0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        {num}
      </motion.div>

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ marginBottom: '1.5rem' }}
          >
            <Link
              to={breadcrumb.to}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(192,154,47,0.5)',
                textDecoration: 'none',
              }}
            >
              ← {breadcrumb.label}
            </Link>
          </motion.div>
        )}

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)', opacity: 0.5 }} />
          {tag}
        </motion.div>

        {/* Title — word by word reveal */}
        <h1 style={{ margin: 0, marginBottom: subtitle ? '2.5rem' : 0 }}>
          <div style={{ overflow: 'hidden' }}>
            {words.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.07 }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'Bodoni Moda, serif',
                    fontSize: 'clamp(3rem, 7vw, 9rem)',
                    fontWeight: 800,
                    lineHeight: 0.92,
                    letterSpacing: '-0.03em',
                    color: textColor,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {titleItalic && (
            <div style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease, delay: 0.2 + words.length * 0.07 }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: 'clamp(3rem, 7vw, 9rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  color: 'var(--gold)',
                }}
              >
                {titleItalic}
              </motion.span>
            </div>
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              color: textColor === 'var(--dark-text)' ? 'rgba(235,232,225,0.45)' : 'rgba(27,53,84,0.5)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: 560,
              margin: 0,
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Separator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.6 }}
          style={{
            height: 1,
            background: textColor === 'var(--dark-text)'
              ? 'rgba(255,255,255,0.07)'
              : 'rgba(27,53,84,0.1)',
            marginTop: '4rem',
            transformOrigin: 'left',
          }}
        />
      </div>
    </section>
  )
}
