import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  computeGlobalCost,
  CITY_LABELS,
  EQUIPMENT_MODE_LABELS,
  type CityTier,
  type EquipmentMode,
  type CostResult,
} from '../utils/coutGlobalEntrepot'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzeperyn'

type Step = 'form' | 'gate' | 'result'
type GateStatus = 'idle' | 'sending' | 'error'

interface SizingForm {
  surfaceM2: string
  cityTier: CityTier | ''
  operatorCount: string
  hourlyRate: string
  equipmentCount: string
  equipmentMode: EquipmentMode | ''
  monthlyVolume: string
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

function fmt(n: number): string {
  return Math.round(n).toLocaleString('fr-FR')
}

function ResultCard({ label, value, unit, note }: { label: string; value: string; unit: string; note: string }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(27,53,84,0.12)',
      padding: '2rem 1.75rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--mid)', marginBottom: '0.9rem',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)',
        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em',
        color: 'var(--navy)', marginBottom: '0.3rem',
      }}>
        {value} <span style={{ fontSize: '0.5em', fontWeight: 600, color: 'var(--blue-bright)' }}>{unit}</span>
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--mid)', lineHeight: 1.6 }}>{note}</div>
    </div>
  )
}

export default function CoutGlobalSimulator() {
  const [step, setStep] = useState<Step>('form')
  const [sizing, setSizing] = useState<SizingForm>({
    surfaceM2: '', cityTier: '', operatorCount: '', hourlyRate: '', equipmentCount: '', equipmentMode: '', monthlyVolume: '',
  })
  const [sizingErrors, setSizingErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<CostResult | null>(null)

  const [lead, setLead] = useState<LeadForm>({ nom: '', email: '', entreprise: '' })
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({})
  const [gateStatus, setGateStatus] = useState<GateStatus>('idle')
  const [honeypot, setHoneypot] = useState('')

  const validateSizing = () => {
    const e: Record<string, string> = {}
    if (!sizing.surfaceM2 || Number(sizing.surfaceM2) <= 0) e.surfaceM2 = 'Obligatoire'
    if (!sizing.cityTier) e.cityTier = 'Choisissez une valeur'
    if (!sizing.operatorCount || Number(sizing.operatorCount) <= 0) e.operatorCount = 'Obligatoire'
    if (!sizing.hourlyRate || Number(sizing.hourlyRate) <= 0) e.hourlyRate = 'Obligatoire'
    if (!sizing.equipmentCount || Number(sizing.equipmentCount) < 0) e.equipmentCount = 'Obligatoire'
    if (!sizing.equipmentMode) e.equipmentMode = 'Choisissez une valeur'
    if (!sizing.monthlyVolume || Number(sizing.monthlyVolume) <= 0) e.monthlyVolume = 'Obligatoire'
    return e
  }

  const handleSizingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateSizing()
    if (Object.keys(errs).length) { setSizingErrors(errs); return }
    setSizingErrors({})

    const computed = computeGlobalCost({
      surfaceM2: Number(sizing.surfaceM2),
      cityTier: sizing.cityTier as CityTier,
      operatorCount: Number(sizing.operatorCount),
      hourlyRate: Number(sizing.hourlyRate),
      equipmentCount: Number(sizing.equipmentCount),
      equipmentMode: sizing.equipmentMode as EquipmentMode,
      monthlyVolume: Number(sizing.monthlyVolume),
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
          _subject: 'Nouveau lead — Simulateur Coût Global Entrepôt',
          nom: lead.nom,
          email: lead.email,
          entreprise: lead.entreprise,
          'Surface (m²)': sizing.surfaceM2,
          'Ville / région': CITY_LABELS[sizing.cityTier as CityTier],
          "Nombre d'opérateurs": sizing.operatorCount,
          'Coût horaire chargé (MAD)': sizing.hourlyRate,
          "Nombre d'engins": sizing.equipmentCount,
          'Mode équipements': EQUIPMENT_MODE_LABELS[sizing.equipmentMode as EquipmentMode],
          'Volume mensuel': sizing.monthlyVolume,
          'Coût bâtiment/mois estimé': result ? `${fmt(result.buildingCost[0])} - ${fmt(result.buildingCost[1])} MAD` : '',
          'Coût main d’œuvre/mois': result ? `${fmt(result.laborCost)} MAD` : '',
          'Coût équipements/mois estimé': result ? `${fmt(result.equipmentCost[0])} - ${fmt(result.equipmentCost[1])} MAD` : '',
          'Total mensuel estimé': result ? `${fmt(result.total[0])} - ${fmt(result.total[1])} MAD` : '',
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
    setSizing({ surfaceM2: '', cityTier: '', operatorCount: '', hourlyRate: '', equipmentCount: '', equipmentMode: '', monthlyVolume: '' })
    setLead({ nom: '', email: '', entreprise: '' })
    setResult(null)
    setGateStatus('idle')
  }

  return (
    <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <div className="section-inner" style={{ maxWidth: 920, margin: '0 auto' }}>
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
                  Vos paramètres entrepôt
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--mid)', marginBottom: '2rem', lineHeight: 1.7 }}>
                  7 questions, 2 minutes. Une estimation directionnelle du coût mensuel total et sa répartition s'affiche ensuite.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <Field label="Surface entrepôt (m²)" error={sizingErrors.surfaceM2}>
                    <input
                      type="number" min={1} placeholder="ex. 3000" value={sizing.surfaceM2}
                      onChange={ev => setSizing(f => ({ ...f, surfaceM2: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.surfaceM2)}
                    />
                  </Field>
                  <Field label="Ville / région" error={sizingErrors.cityTier}>
                    <select
                      value={sizing.cityTier}
                      onChange={ev => setSizing(f => ({ ...f, cityTier: ev.target.value as CityTier }))}
                      style={{ ...inputStyle(!!sizingErrors.cityTier), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Choisir...</option>
                      <option value="casablanca">Casablanca</option>
                      <option value="rabat_kenitra">Rabat / Kénitra / Mohammedia</option>
                      <option value="villes_secondaires">Marrakech / Agadir / Fès / Meknès / Tanger</option>
                      <option value="autres_regions">Autres régions</option>
                    </select>
                  </Field>
                  <Field label="Nombre d'opérateurs" error={sizingErrors.operatorCount}>
                    <input
                      type="number" min={1} placeholder="ex. 12" value={sizing.operatorCount}
                      onChange={ev => setSizing(f => ({ ...f, operatorCount: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.operatorCount)}
                    />
                  </Field>
                  <Field label="Coût horaire chargé moyen (MAD)" error={sizingErrors.hourlyRate}>
                    <input
                      type="number" min={1} step="0.5" placeholder="ex. 35" value={sizing.hourlyRate}
                      onChange={ev => setSizing(f => ({ ...f, hourlyRate: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.hourlyRate)}
                    />
                  </Field>
                  <Field label="Nombre d'engins de manutention" error={sizingErrors.equipmentCount}>
                    <input
                      type="number" min={0} placeholder="ex. 3" value={sizing.equipmentCount}
                      onChange={ev => setSizing(f => ({ ...f, equipmentCount: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.equipmentCount)}
                    />
                  </Field>
                  <Field label="Mode équipements" error={sizingErrors.equipmentMode}>
                    <select
                      value={sizing.equipmentMode}
                      onChange={ev => setSizing(f => ({ ...f, equipmentMode: ev.target.value as EquipmentMode }))}
                      style={{ ...inputStyle(!!sizingErrors.equipmentMode), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Choisir...</option>
                      <option value="achat">Achat</option>
                      <option value="location">Location</option>
                    </select>
                  </Field>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Volume d'activité mensuel (lignes ou palettes traitées/mois)" error={sizingErrors.monthlyVolume}>
                      <input
                        type="number" min={1} placeholder="ex. 20000" value={sizing.monthlyVolume}
                        onChange={ev => setSizing(f => ({ ...f, monthlyVolume: ev.target.value }))}
                        style={inputStyle(!!sizingErrors.monthlyVolume)}
                      />
                    </Field>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center', border: 'none' }}>
                  Calculer mon coût global →
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
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem',
                  filter: 'blur(7px)', opacity: 0.6, pointerEvents: 'none', userSelect: 'none',
                }}>
                  <ResultCard label="Bâtiment/mois" value="XX XXX" unit="MAD" note="—" />
                  <ResultCard label="Main d'œuvre/mois" value="XX XXX" unit="MAD" note="—" />
                  <ResultCard label="Équipements/mois" value="XX XXX" unit="MAD" note="—" />
                  <ResultCard label="Total/mois" value="XXX XXX" unit="MAD" note="—" />
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
                    Erreur d'envoi. Réessayez, ou écrivez-nous directement à essor.consulting.maroc@gmail.com
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <ResultCard
                  label="Bâtiment/mois"
                  value={`${fmt(result.buildingCost[0])} – ${fmt(result.buildingCost[1])}`}
                  unit="MAD"
                  note={`${result.breakdownPct.building}% du total`}
                />
                <ResultCard
                  label="Main d'œuvre/mois"
                  value={fmt(result.laborCost)}
                  unit="MAD"
                  note={`${result.breakdownPct.labor}% du total — 176h/mois`}
                />
                <ResultCard
                  label="Équipements/mois"
                  value={`${fmt(result.equipmentCost[0])} – ${fmt(result.equipmentCost[1])}`}
                  unit="MAD"
                  note={`${result.breakdownPct.equipment}% du total`}
                />
                <ResultCard
                  label="Total/mois"
                  value={`${fmt(result.total[0])} – ${fmt(result.total[1])}`}
                  unit="MAD"
                  note={`Soit ${result.costPerUnit[0]} – ${result.costPerUnit[1]} MAD/unité de volume`}
                />
              </div>

              <div style={{
                background: 'var(--blue-dim)', border: '1px solid rgba(47,111,181,0.25)',
                padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '2rem',
              }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                  <strong>Estimation directionnelle</strong> — un diagnostic Essor Consulting affine ce calcul selon votre contexte réel (bail négocié, âge des équipements, saisonnalité).
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
                <div style={{ fontSize: '0.85rem', color: 'var(--mid)', lineHeight: 1.8, marginTop: '1rem', maxWidth: 680 }}>
                  <p style={{ marginBottom: '0.75rem' }}>
                    Bâtiment = surface × ratio MAD/m²/mois selon la ville (Casablanca 35-55, Rabat/Kénitra 28-45, villes secondaires 20-35, autres régions 15-25 — loyers logistiques génériques, pas un bail réel).
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>
                    Main d'œuvre = nombre d'opérateurs × coût horaire chargé × 176h/mois.
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    Équipements = nombre d'engins × coût mensualisé générique par engin (achat, amortissement + maintenance lissés : 5 000-9 000 MAD/mois ; location tout compris : 8 000-14 000 MAD/mois). Catégories universelles du secteur — aucun outil ou grille propriétaire tiers.
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
