import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  computeSizing,
  ROTATION_LABELS,
  STORAGE_TYPE_LABELS,
  type Rotation,
  type StorageType,
  type SizingResult,
} from '../utils/warehouseSizing'

// Web3Forms abandonné (CORS bloqué en prod malgré 3 corrections de config
// distinctes — cause probable : fetch/AJAX cross-origin non supporté hors
// plan payant). Formspree utilisé à la place, formulaire dédié (distinct
// de celui de Contact.tsx pour trier les leads simulateur séparément).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzeperyn'

type Step = 'form' | 'gate' | 'result'
type GateStatus = 'idle' | 'sending' | 'error'

interface SizingForm {
  skuCount: string
  palletVolume: string
  rotation: Rotation | ''
  storageType: StorageType | ''
  orderLinesPerDay: string
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

export default function DimensionnementSimulator() {
  const [step, setStep] = useState<Step>('form')
  const [sizing, setSizing] = useState<SizingForm>({
    skuCount: '', palletVolume: '', rotation: '', storageType: '', orderLinesPerDay: '',
  })
  const [sizingErrors, setSizingErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<SizingResult | null>(null)

  const [lead, setLead] = useState<LeadForm>({ nom: '', email: '', entreprise: '' })
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({})
  const [gateStatus, setGateStatus] = useState<GateStatus>('idle')
  const [honeypot, setHoneypot] = useState('')

  const validateSizing = () => {
    const e: Record<string, string> = {}
    const sku = Number(sizing.skuCount)
    const vol = Number(sizing.palletVolume)
    const lines = Number(sizing.orderLinesPerDay)
    if (!sizing.skuCount || sku <= 0) e.skuCount = 'Obligatoire'
    if (!sizing.palletVolume || vol <= 0) e.palletVolume = 'Obligatoire'
    if (!sizing.rotation) e.rotation = 'Choisissez une valeur'
    if (!sizing.storageType) e.storageType = 'Choisissez une valeur'
    if (!sizing.orderLinesPerDay || lines <= 0) e.orderLinesPerDay = 'Obligatoire'
    return e
  }

  const handleSizingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateSizing()
    if (Object.keys(errs).length) { setSizingErrors(errs); return }
    setSizingErrors({})

    const computed = computeSizing({
      skuCount: Number(sizing.skuCount),
      palletVolume: Number(sizing.palletVolume),
      rotation: sizing.rotation as Rotation,
      storageType: sizing.storageType as StorageType,
      orderLinesPerDay: Number(sizing.orderLinesPerDay),
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
    if (honeypot) return // piège à bots — silencieux
    const errs = validateLead()
    if (Object.keys(errs).length) { setLeadErrors(errs); return }
    setLeadErrors({})
    setGateStatus('sending')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Nouveau lead — Simulateur Dimensionnement Entrepôt',
          nom: lead.nom,
          email: lead.email,
          entreprise: lead.entreprise,
          'Nombre de références (SKU)': sizing.skuCount,
          'Volume de stock (palettes)': sizing.palletVolume,
          'Taux de rotation': ROTATION_LABELS[sizing.rotation as Rotation],
          'Type de stockage': STORAGE_TYPE_LABELS[sizing.storageType as StorageType],
          'Lignes de commande / jour': sizing.orderLinesPerDay,
          'Surface estimée (m²)': result ? `${result.areaM2[0].toLocaleString('fr-FR')} - ${result.areaM2[1].toLocaleString('fr-FR')}` : '',
          'Baies estimées': result?.bays ? `${result.bays[0]} - ${result.bays[1]}` : 'N/A (stockage de masse)',
          'Quais recommandés': result ? `${result.docks[0]} - ${result.docks[1]}` : '',
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
    setSizing({ skuCount: '', palletVolume: '', rotation: '', storageType: '', orderLinesPerDay: '' })
    setLead({ nom: '', email: '', entreprise: '' })
    setResult(null)
    setGateStatus('idle')
  }

  return (
    <section style={{ background: 'var(--paper)', padding: 'var(--sp)' }}>
      <div className="section-inner" style={{ maxWidth: 880, margin: '0 auto' }}>
        <AnimatePresence mode="wait">

          {/* ── Étape 1 : formulaire de dimensionnement ── */}
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
                  5 questions, 2 minutes. Une estimation directionnelle s'affiche ensuite — à affiner avec un diagnostic si vous voulez du chiffré pour de vrai.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <Field label="Nombre de références (SKU)" error={sizingErrors.skuCount}>
                    <input
                      type="number" min={1} placeholder="ex. 1200" value={sizing.skuCount}
                      onChange={ev => setSizing(f => ({ ...f, skuCount: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.skuCount)}
                    />
                  </Field>
                  <Field label="Volume de stock moyen (palettes)" error={sizingErrors.palletVolume}>
                    <input
                      type="number" min={1} placeholder="ex. 800" value={sizing.palletVolume}
                      onChange={ev => setSizing(f => ({ ...f, palletVolume: ev.target.value }))}
                      style={inputStyle(!!sizingErrors.palletVolume)}
                    />
                  </Field>
                  <Field label="Taux de rotation" error={sizingErrors.rotation}>
                    <select
                      value={sizing.rotation}
                      onChange={ev => setSizing(f => ({ ...f, rotation: ev.target.value as Rotation }))}
                      style={{ ...inputStyle(!!sizingErrors.rotation), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Choisir...</option>
                      <option value="rapide">Rapide</option>
                      <option value="moyen">Moyen</option>
                      <option value="lent">Lent</option>
                    </select>
                  </Field>
                  <Field label="Type de stockage" error={sizingErrors.storageType}>
                    <select
                      value={sizing.storageType}
                      onChange={ev => setSizing(f => ({ ...f, storageType: ev.target.value as StorageType }))}
                      style={{ ...inputStyle(!!sizingErrors.storageType), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Choisir...</option>
                      <option value="simple">Rack simple profondeur</option>
                      <option value="double">Rack double profondeur</option>
                      <option value="masse">Stockage de masse (bloc)</option>
                    </select>
                  </Field>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label="Lignes de commande / jour (pour les quais)" error={sizingErrors.orderLinesPerDay}>
                      <input
                        type="number" min={1} placeholder="ex. 350" value={sizing.orderLinesPerDay}
                        onChange={ev => setSizing(f => ({ ...f, orderLinesPerDay: ev.target.value }))}
                        style={inputStyle(!!sizingErrors.orderLinesPerDay)}
                      />
                    </Field>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center', border: 'none' }}>
                  Calculer mon dimensionnement →
                </button>
              </div>
            </motion.form>
          )}

          {/* ── Étape 2 : capture email (résultat flouté en aperçu) ── */}
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
                  <ResultCard label="Surface de stockage" value="XX XXX" unit="m²" note="—" />
                  <ResultCard label="Baies de rayonnage" value="XXX" unit="baies" note="—" />
                  <ResultCard label="Quais recommandés" value="X — X" unit="quais" note="—" />
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

                {/* Honeypot anti-spam — invisible pour un humain */}
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

          {/* ── Étape 3 : résultat ── */}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <ResultCard
                  label="Surface de stockage"
                  value={`${result.areaM2[0].toLocaleString('fr-FR')} – ${result.areaM2[1].toLocaleString('fr-FR')}`}
                  unit="m²"
                  note={`Basé sur un taux d'utilisation de ${result.utilizationPct[0]}–${result.utilizationPct[1]}%`}
                />
                <ResultCard
                  label="Baies de rayonnage"
                  value={result.bays ? `${result.bays[0]} – ${result.bays[1]}` : 'N/A'}
                  unit={result.bays ? 'baies' : ''}
                  note={result.bays ? 'Baies standard ~2,7 m' : 'Stockage de masse — pas de rayonnage'}
                />
                <ResultCard
                  label="Quais recommandés"
                  value={`${result.docks[0]} – ${result.docks[1]}`}
                  unit="quais"
                  note="Réception + expédition confondues"
                />
              </div>

              <div style={{
                background: 'var(--blue-dim)', border: '1px solid rgba(47,111,181,0.25)',
                padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '2rem',
              }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                  <strong>Estimation directionnelle</strong> — un diagnostic Essor Consulting affine ce calcul selon votre contexte réel (flux, saisonnalité, contraintes bâtiment).
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
                    Surface = (volume palettes × ratio m²/palette selon le type de stockage) ÷ taux d'utilisation du bâtiment (75-85%, le reste étant quais, tri, circulation, bureaux). Ratios utilisés : rack simple profondeur 2,0-2,6 m²/palette, double profondeur 1,5-1,9, stockage de masse 0,9-1,3.
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    Quais = lignes de commande/jour ÷ 150 à 250 lignes traitées par quai et par jour (minimum 2 quais). Baies = volume palettes ÷ capacité d'une baie standard (6-10 emplacements en simple profondeur, 14-18 en double profondeur).
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
