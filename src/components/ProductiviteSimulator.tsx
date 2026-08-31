import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  computeProductivity,
  ENGINE_LABELS,
  TASK_LABELS,
  type EngineType,
  type TaskType,
  type ProductivityResult,
} from '../utils/productivitySizing'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzeperyn'

type Step = 'form' | 'gate' | 'result'
type GateStatus = 'idle' | 'sending' | 'error'

interface SizingForm {
  engineType: EngineType | ''
  operatorCount: string
  shiftHours: string
  taskType: TaskType | ''
  dailyVolume: string
}

interface LeadForm {
  nom: string
  email: string
  entreprise: string
}

const ease = [0.16, 1, 0.3, 1] as const

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  background: '#ffffff',
  border: `1px solid ${hasError ? 'rgba(200,60,60,0.55)' : 'rgba(27,53,84,0.16)'}`,
  padding: '0.85rem 1rem',
  color: 'var(--ink)',
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.92rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
})

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: error ? 'rgba(200,60,60,0.8)' : 'rgba(47,111,181,0.75)',
      }}>
        {label}
        {error && <span style={{ marginLeft: '0.5rem', fontSize: '0.6rem' }}>— {error}</span>}
      </label>
      {children}
    </div>
  )
}

function ResultCard({ label, value, unit, note }: { label: string; value: string; unit: string; note: string }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(27,53,84,0.12)',
      padding: '2.25rem 2rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--mid)', marginBottom: '1rem',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)',
        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em',
        color: 'var(--navy)', marginBottom: '0.35rem',
      }}>
        {value} <span style={{ fontSize: '0.55em', fontWeight: 600, color: 'var(--blue-bright)' }}>{unit}</span>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--mid)', lineHeight: 1.6 }}>{note}</div>
    </div>
  )
}

export default function ProductiviteSimulator() {
  const [step, setStep] = useState<Step>('form')
  const [sizing, setSizing] = useState<SizingForm>({
    engineType: '', operatorCount: '', shiftHours: '', taskType: '', dailyVolume: '',
  })
  const [sizingErrors, setSizingErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ProductivityResult | null>(null)

  const [lead, setLead] = useState<LeadForm>({ nom: '', email: '', entreprise: '' })
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({})
  const [gateStatus, setGateStatus] = useState<GateStatus>('idle')
  const [honeypot, setHoneypot] = useState('')

  const validateSizing = () => {
    const e: Record<string, string> = {}
    const operators = Number(sizing.operatorCount)
    const hours = Number(sizing.shiftHours)
    const volume = Number(sizing.dailyVolume)
    if (!sizing.engineType) e.engineType = 'Choisissez une valeur'
    if (!sizing.operatorCount || operators <= 0) e.operatorCount = 'Obligatoire'
    if (!sizing.shiftHours || hours <= 0 || hours > 24) e.shiftHours = 'Obligatoire'
    if (!sizing.taskType) e.taskType = 'Choisissez une valeur'
    if (!sizing.dailyVolume || volume <= 0) e.dailyVolume = 'Obligatoire'
    return e
  }

  const handleSizingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateSizing()
    if (Object.keys(errs).length) { setSizingErrors(errs); return }
    setSizingErrors({})

    const computed = computeProductivity({
      engineType: sizing.engineType as EngineType,
      operatorCount: Number(sizing.operatorCount),
      shiftHours: Number(sizing.shiftHours),
      taskType: sizing.taskType as TaskType,
      dailyVolume: Number(sizing.dailyVolume),
    })
    setResult(computed)
    setStep('gate')
  }

  const validateLead = () => {
    const e: Record<string, string> = {}
    if (!lead.nom.trim()) e.nom = 'Obligatoire'
    if (!lead.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!lead.entreprise.trim()) e.entreprise = 'Obligatoire'
    return e
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    const errs = validateLead()
    if (Object.keys(errs).length) { setLeadErrors(errs); return }
    setLeadErrors({})
    setGateStatus('sending')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Nouveau lead — Simulateur Productivité Engins & Main d’œuvre',
          nom: lead.nom,
          email: lead.email,
          entreprise: lead.entreprise,
          "Type d'engin": ENGINE_LABELS[sizing.engineType as EngineType],
          "Nombre d'opérateurs": sizing.operatorCount,
          'Durée de poste (h/jour)': sizing.shiftHours,
          'Tâche dominante': TASK_LABELS[sizing.taskType as TaskType],
          'Volume quotidien à traiter': sizing.dailyVolume,
          'Productivité estimée': result ? `${result.hourlyRatePerOperator[0]} - ${result.hourlyRatePerOperator[1]} ${result.unit}/h/opérateur` : '',
          'Effectif recommandé': result ? `${result.recommendedHeadcount[0]} - ${result.recommendedHeadcount[1]}` : '',
        }),
      })
      if (res.ok) {
        setGateStatus('idle')
        setStep('result')
      } else {
        setGateStatus('error')
      }
    } catch {
      setGateStatus('error')
    }
  }

  const reset = () => {
    setStep('form')
    setSizing({ engineType: '', operatorCount: '', shiftHours: '', taskType: '', dailyVolume: '' })
    setLead({ nom: '', email: '', entreprise: '' })
    setResult(null)
    setGateStatus('idle')
  }

  return (
    <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <div className="section-inner" style={{ maxWidth: 880, margin: '0 auto' }}>
        <AnimatePresence mode="wait">

          {step === 'form' && (
            <motion.form
              key="form"
              onSubmit={handleSizingSubmit}
              noValidate
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{
                background: '#ffffff', border: '1px solid rgba(27,53,84,0.12)',
                padding: 'clamp(1.75rem, 3vw, 2.75rem)',
              }}>
                <div style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: '1.3rem', fontWeight: 800,
                  color: 'var(--navy)', marginBottom: '0.5rem',
                }}>
                  Vos paramètres opérationnels
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '2rem', lineHeight: 1.7 }}>
                  5 questions, 2 minutes. Une estimation directionnelle de productivité et d'effectif s'affiche ensuite.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <Field label="Type d'engin" error={sizingErrors.engineType}>
                    <select
                      value={sizing.engineType}
                      onChange={ev => setSizing(f => ({ ...f, engineType: ev.target.value as EngineType }))}
                      style={{ ...inputStyle(!!sizingErrors.engineType), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Choisir...</option>
                      <option value="chariot">Chariot élévateur</option>
                      <option value="transpalette">Transpalette électrique</option>
                      <option value="preparateur">Préparateur de commandes</option>
                      <option value="manuel">Manuel</option>
                    </select>
                  </Field>
                  <Field label="Nombre d'opérateurs" error={sizingErrors.operatorCount}>
                    <input
                      type="number" min={1} placeholder="ex. 6" value={sizing.operatorCount}
                      onChange={ev => setSizing(f => ({ ...f, operatorCount: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.operatorCount)}
                    />
                  </Field>
                  <Field label="Durée de poste (heures/jour)" error={sizingErrors.shiftHours}>
                    <input
                      type="number" min={1} max={24} placeholder="ex. 8" value={sizing.shiftHours}
                      onChange={ev => setSizing(f => ({ ...f, shiftHours: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.shiftHours)}
                    />
                  </Field>
                  <Field label="Tâche dominante" error={sizingErrors.taskType}>
                    <select
                      value={sizing.taskType}
                      onChange={ev => setSizing(f => ({ ...f, taskType: ev.target.value as TaskType }))}
                      style={{ ...inputStyle(!!sizingErrors.taskType), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Choisir...</option>
                      <option value="reception">Réception</option>
                      <option value="preparation">Préparation</option>
                      <option value="expedition">Expédition</option>
                    </select>
                  </Field>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Volume quotidien à traiter (lignes de commande ou palettes/jour)" error={sizingErrors.dailyVolume}>
                      <input
                        type="number" min={1} placeholder="ex. 900" value={sizing.dailyVolume}
                        onChange={ev => setSizing(f => ({ ...f, dailyVolume: ev.target.value }))}
                        style={inputStyle(!!sizingErrors.dailyVolume)}
                      />
                    </Field>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center', border: 'none' }}>
                  Calculer ma productivité →
                </button>
              </div>
            </motion.form>
          )}

          {step === 'gate' && result && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
            >
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem',
                  filter: 'blur(7px)', opacity: 0.6, pointerEvents: 'none', userSelect: 'none',
                }}>
                  <ResultCard label="Productivité estimée" value="XX — XX" unit={`${result.unit}/h`} note="—" />
                  <ResultCard label="Effectif recommandé" value="X — X" unit="opérateurs" note="—" />
                </div>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '0.5rem',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '1.2rem',
                  }}>🔒</div>
                  <div style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--paper)',
                    padding: '0.3rem 0.8rem',
                  }}>
                    Résultats prêts
                  </div>
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} noValidate style={{
                background: '#ffffff', border: '1px solid rgba(27,53,84,0.12)',
                padding: 'clamp(1.75rem, 3vw, 2.75rem)', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--blue-bright)' }} />

                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  Recevez votre estimation
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
                  Vos coordonnées nous permettent de vous recontacter si vous voulez aller plus loin. Zéro spam, zéro revente.
                </p>

                <input
                  type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)}
                  name="botcheck" tabIndex={-1} autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  aria-hidden="true"
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <Field label="Nom *" error={leadErrors.nom}>
                    <input
                      type="text" placeholder="Votre nom" value={lead.nom}
                      onChange={ev => setLead(f => ({ ...f, nom: ev.target.value }))}
                      style={inputStyle(!!leadErrors.nom)}
                    />
                  </Field>
                  <Field label="Entreprise *" error={leadErrors.entreprise}>
                    <input
                      type="text" placeholder="Votre entreprise" value={lead.entreprise}
                      onChange={ev => setLead(f => ({ ...f, entreprise: ev.target.value }))}
                      style={inputStyle(!!leadErrors.entreprise)}
                    />
                  </Field>
                </div>
                <div style={{ marginBottom: '1.75rem' }}>
                  <Field label="Email professionnel *" error={leadErrors.email}>
                    <input
                      type="email" placeholder="vous@entreprise.ma" value={lead.email}
                      onChange={ev => setLead(f => ({ ...f, email: ev.target.value }))}
                      style={inputStyle(!!leadErrors.email)}
                    />
                  </Field>
                </div>

                {gateStatus === 'error' && (
                  <p style={{ color: 'rgba(200,60,60,0.85)', fontSize: '0.8rem', fontFamily: 'DM Mono, monospace', marginBottom: '1rem' }}>
                    Erreur d'envoi. Réessayez, ou écrivez-nous directement à contact@nextinotech.com
                  </p>
                )}

                <button
                  type="submit" className="btn-primary" disabled={gateStatus === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', border: 'none', opacity: gateStatus === 'sending' ? 0.7 : 1, cursor: gateStatus === 'sending' ? 'wait' : 'pointer' }}
                >
                  {gateStatus === 'sending' ? 'Envoi en cours...' : 'Recevoir mes résultats →'}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div style={{
                fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 800,
                color: 'var(--navy)', marginBottom: '1.75rem',
              }}>
                Votre estimation directionnelle
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <ResultCard
                  label="Productivité estimée"
                  value={`${result.hourlyRatePerOperator[0]} – ${result.hourlyRatePerOperator[1]}`}
                  unit={`${result.unit}/h/opérateur`}
                  note={`Sur la tâche et l'engin sélectionnés, efficacité opérationnelle ${result.efficiencyPct[0]}–${result.efficiencyPct[1]}%`}
                />
                <ResultCard
                  label="Effectif recommandé"
                  value={`${result.recommendedHeadcount[0]} – ${result.recommendedHeadcount[1]}`}
                  unit="opérateurs"
                  note="Pour couvrir le volume quotidien indiqué sur la durée de poste saisie"
                />
              </div>

              <div style={{
                background: 'var(--blue-dim)', border: '1px solid rgba(47,111,181,0.25)',
                padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '2rem',
              }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                  <strong>Estimation directionnelle</strong> — un diagnostic Nextinotech affine ce calcul selon votre contexte réel (saisonnalité, mix produits, disposition de l'entrepôt).
                </p>
                <a href="/contact" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Demander un diagnostic →</a>
              </div>

              <details style={{ marginBottom: '2rem' }}>
                <summary style={{
                  cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)',
                }}>
                  Comment ce calcul est fait
                </summary>
                <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.8, marginTop: '1rem', maxWidth: 640 }}>
                  <p style={{ marginBottom: '0.75rem' }}>
                    Productivité horaire = ratio standard par type d'engin (chariot 15-25 palettes/h, transpalette 12-20 palettes/h, préparateur 60-100 lignes/h, manuel 35-65 lignes/h) × un modulateur selon la tâche dominante (réception plus rapide, expédition plus lente en raison des contrôles).
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    Effectif recommandé = volume quotidien ÷ (productivité horaire × durée de poste × efficacité opérationnelle réelle 75-85%, qui tient compte des pauses, trajets et temps d'attente — jamais 100% du poste n'est du temps productif direct).
                  </p>
                </div>
              </details>

              <button
                onClick={reset}
                style={{
                  background: 'none', border: '1px solid rgba(27,53,84,0.2)', color: 'var(--navy)',
                  padding: '0.7rem 1.4rem', cursor: 'pointer', fontFamily: 'DM Mono, monospace',
                  fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}
              >
                Recommencer une simulation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
