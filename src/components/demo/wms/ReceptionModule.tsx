import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUPPLIERS, type ReceptionLogEntry, type StockRow } from '../../../data/demoWmsData'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  border: '1px solid rgba(27,53,84,0.16)',
  padding: '0.8rem 1rem',
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.88rem',
  color: 'var(--ink)',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(27,53,84,0.6)',
  marginBottom: '0.5rem',
}

export default function ReceptionModule({
  onReceive,
  track,
}: {
  onReceive: (row: StockRow) => void
  track: (id: string) => void
}) {
  const [reference, setReference] = useState('')
  const [quantite, setQuantite] = useState('')
  const [emplacement, setEmplacement] = useState('')
  const [fournisseur, setFournisseur] = useState(SUPPLIERS[0])
  const [controle, setControle] = useState<'Conforme' | 'Non conforme'>('Conforme')
  const [log, setLog] = useState<ReceptionLogEntry[]>([])

  function submit() {
    if (!reference.trim() || !emplacement.trim() || !quantite.trim()) return
    track('reception')

    const qty = Math.max(1, parseInt(quantite, 10) || 0)
    onReceive({
      reference: reference.trim().toUpperCase(),
      designation: 'Article réceptionné',
      quantite: qty,
      emplacement: emplacement.trim().toUpperCase(),
      derniereRotation: "aujourd'hui",
      rotationJours: 0,
      categorie: 'Fast mover',
    })

    setLog((prev) => [
      {
        id: `RCP-${Date.now()}`,
        heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        reference: reference.trim().toUpperCase(),
        quantite: qty,
        fournisseur,
        controle,
      },
      ...prev,
    ])

    setReference('')
    setQuantite('')
    setEmplacement('')
    setControle('Conforme')
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 2rem' }}>
        Enregistrer une réception.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem' }} className="wms-plan-layout">
        <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Référence</label>
              <input style={inputStyle} value={reference} onChange={(e) => setReference(e.target.value)} placeholder="ex: REF-10234" />
            </div>
            <div>
              <label style={labelStyle}>Quantité reçue</label>
              <input style={inputStyle} type="number" min={1} value={quantite} onChange={(e) => setQuantite(e.target.value)} placeholder="ex: 240" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Emplacement de rangement</label>
              <input style={inputStyle} value={emplacement} onChange={(e) => setEmplacement(e.target.value)} placeholder="ex: A-02-03" />
            </div>
            <div>
              <label style={labelStyle}>Fournisseur</label>
              <select style={inputStyle} value={fournisseur} onChange={(e) => setFournisseur(e.target.value)}>
                {SUPPLIERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Contrôle qualité</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {(['Conforme', 'Non conforme'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setControle(c)}
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.85rem',
                    padding: '0.7rem 1.3rem',
                    background: controle === c ? (c === 'Conforme' ? 'var(--sage)' : 'rgb(190,60,50)') : '#fff',
                    color: controle === c ? '#fff' : 'var(--navy)',
                    border: `1px solid ${controle === c ? 'transparent' : 'rgba(27,53,84,0.2)'}`,
                    cursor: 'none',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={submit}
            disabled={!reference.trim() || !emplacement.trim() || !quantite.trim()}
            className="btn-primary"
            style={{ padding: '0.9rem 2rem', fontSize: '0.8rem', opacity: reference.trim() && emplacement.trim() && quantite.trim() ? 1 : 0.4 }}
          >
            Valider la réception →
          </button>
          <p style={{ fontSize: '0.78rem', color: 'var(--dark-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
            Format d'emplacement attendu : ZONE-ALLÉE-NIVEAU (ex. A-02-03) pour apparaître sur le plan d'entrepôt. Les autres formats sont enregistrés mais non localisés visuellement.
          </p>
        </div>

        <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.08)', padding: '1.75rem', maxHeight: 420, overflowY: 'auto' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(27,53,84,0.5)', marginBottom: '1rem' }}>
            Historique de la session ({log.length})
          </div>
          {log.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', fontWeight: 300, lineHeight: 1.7 }}>Aucune réception enregistrée pour l'instant.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {log.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.08)', padding: '0.85rem 1rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 600 }}>{entry.reference}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'rgba(27,53,84,0.45)' }}>{entry.heure}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--dark-muted)' }}>
                    {entry.quantite} unités · {entry.fournisseur}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: entry.controle === 'Conforme' ? 'var(--sage)' : 'rgb(190,60,50)', marginTop: '0.35rem' }}>
                    ● {entry.controle}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
