import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const BESOINS = [
  'Diagnostic Supply Chain',
  'Optimisation des stocks',
  'Sélection WMS / TMS / APS',
  'AMOA & pilotage projet',
  'Formation terrain',
  'DSC à temps partagé',
  'Autre',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ nom: '', email: '', tel: '', besoin: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim()) e.nom = 'Obligatoire'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.besoin) e.besoin = 'Choisissez un besoin'
    if (form.message.trim().length < 20) e.message = 'Au moins 20 caractères'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/mqpzpqwj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nom: form.nom,
          email: form.email,
          téléphone: form.tel || 'Non renseigné',
          besoin: form.besoin,
          message: form.message,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(220,60,60,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 0,
    padding: '0.85rem 1rem',
    color: '#f0ede8',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  })

  return (
    <section id="contact" style={{ background: 'var(--navy)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,146,42,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: 1200, margin: '0 auto', padding: 'var(--sp)',
          display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '6rem', alignItems: 'start',
        }}
      >
        {/* Left — editorial */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag" style={{ color: 'rgba(212,168,67,0.9)' }}>Prenons contact</div>
          <h2 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 'clamp(2.2rem, 4vw, 4rem)',
            fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem',
            color: 'var(--navy)',
          }}>
            Prêt à transformer votre Supply Chain en avantage compétitif&nbsp;?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--dark-muted)', lineHeight: 1.8, maxWidth: 460 }}>
            Le premier échange est gratuit, dure 45 minutes, et n&apos;engage à rien.
            Nous venons préparés. Vous repartez avec des actions concrètes.
          </p>

          <div style={{
            marginTop: '3rem', paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {[
              { tag: 'Email', label: 'essor.consulting.maroc@gmail.com', href: 'mailto:essor.consulting.maroc@gmail.com' },
              { tag: 'Tél',  label: '+212 06 63 44 92 00',                href: 'tel:+212663449200' },
              { tag: 'WA',   label: 'WhatsApp',                            href: 'https://wa.me/212663449200' },
              { tag: 'Lieu', label: 'Casablanca, Maroc',                   href: undefined },
            ].map(({ tag, label, href }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.55rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(192,154,47,0.5)', flexShrink: 0, width: 28,
                }}>{tag}</span>
                {href
                  ? <a href={href} style={{ fontSize: '0.9rem', color: 'rgba(227,226,226,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--gold)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(227,226,226,0.6)')}>{label}</a>
                  : <span style={{ fontSize: '0.9rem', color: 'rgba(227,226,226,0.6)' }}>{label}</span>
                }
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Gold top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            }} />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>
                    Message envoyé.
                  </h3>
                  <p style={{ color: 'rgba(227,226,226,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    Nous revenons vers vous sous 24h ouvrées pour fixer l&apos;échange découverte.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ nom: '', email: '', tel: '', besoin: '', message: '' }) }}
                    style={{ marginTop: '2rem', background: 'none', border: '1px solid rgba(192,154,47,0.4)', color: 'var(--gold)', padding: '0.6rem 1.4rem', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    Nouveau message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                    Réservez votre échange gratuit
                  </div>

                  {/* Nom + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FieldWrap label="Nom *" error={errors.nom}>
                      <input
                        type="text" placeholder="Youssef" value={form.nom}
                        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = 'rgba(192,154,47,0.6)')}
                        onBlur={e => (e.target.style.borderColor = errors.nom ? 'rgba(220,60,60,0.6)' : 'rgba(255,255,255,0.1)')}
                        style={inputStyle('nom')}
                      />
                    </FieldWrap>
                    <FieldWrap label="Email *" error={errors.email}>
                      <input
                        type="email" placeholder="vous@entreprise.ma" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = 'rgba(192,154,47,0.6)')}
                        onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(220,60,60,0.6)' : 'rgba(255,255,255,0.1)')}
                        style={inputStyle('email')}
                      />
                    </FieldWrap>
                  </div>

                  {/* Téléphone + Besoin */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FieldWrap label="Téléphone">
                      <input
                        type="tel" placeholder="+212 6XX XXX XXX" value={form.tel}
                        onChange={e => setForm(f => ({ ...f, tel: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = 'rgba(192,154,47,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        style={inputStyle('tel')}
                      />
                    </FieldWrap>
                    <FieldWrap label="Besoin *" error={errors.besoin}>
                      <select
                        value={form.besoin}
                        onChange={e => setForm(f => ({ ...f, besoin: e.target.value }))}
                        style={{ ...inputStyle('besoin'), appearance: 'none', cursor: 'pointer', color: form.besoin ? '#f0ede8' : 'rgba(240,237,232,0.35)' }}
                      >
                        <option value="" disabled>Choisir...</option>
                        {BESOINS.map(b => <option key={b} value={b} style={{ background: '#1b3554', color: '#f0ede8' }}>{b}</option>)}
                      </select>
                    </FieldWrap>
                  </div>

                  {/* Message */}
                  <FieldWrap label="Message *" error={errors.message}>
                    <textarea
                      rows={4} placeholder="Décrivez brièvement votre situation..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={e => (e.target.style.borderColor = 'rgba(192,154,47,0.6)')}
                      onBlur={e => (e.target.style.borderColor = errors.message ? 'rgba(220,60,60,0.6)' : 'rgba(255,255,255,0.1)')}
                      style={{ ...inputStyle('message'), resize: 'none' }}
                    />
                  </FieldWrap>

                  {status === 'error' && (
                    <p style={{ color: 'rgba(220,80,80,0.85)', fontSize: '0.82rem', fontFamily: 'DM Mono, monospace' }}>
                      Erreur d&apos;envoi. Écrivez-nous directement à essor.consulting.maroc@gmail.com
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status !== 'sending' ? { scale: 1.01, boxShadow: '0 12px 40px rgba(184,146,42,0.3)' } : {}}
                    style={{
                      background: 'var(--gold)',
                      color: '#0e1f30',
                      border: 'none',
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      letterSpacing: '0.04em',
                      fontFamily: 'Jost, sans-serif',
                      opacity: status === 'sending' ? 0.75 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande →'}
                  </motion.button>

                  <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(227,226,226,0.3)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em' }}>
                    GRATUIT · SANS ENGAGEMENT · RÉPONSE SOUS 24H
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FieldWrap({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.58rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: error ? 'rgba(220,80,80,0.8)' : 'rgba(192,154,47,0.6)',
      }}>
        {label}
        {error && <span style={{ marginLeft: '0.5rem', fontSize: '0.55rem' }}>{error}</span>}
      </label>
      {children}
    </div>
  )
}
