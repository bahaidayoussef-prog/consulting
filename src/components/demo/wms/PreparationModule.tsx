import { useState } from 'react'
import { motion } from 'framer-motion'
import type { StockRow } from '../../../data/demoWmsData'

interface PickLine {
  id: string
  reference: string
  designation: string
  emplacement: string
  quantite: number
  done: boolean
}

export default function PreparationModule({ stockRows, track }: { stockRows: StockRow[]; track: (id: string) => void }) {
  const [wave, setWave] = useState<PickLine[] | null>(null)

  function generateWave() {
    track('picking-wave')
    if (stockRows.length === 0) {
      setWave([])
      return
    }
    const pool = [...stockRows]
    const count = Math.min(8, pool.length)
    const picked: StockRow[] = []
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length)
      picked.push(pool.splice(idx, 1)[0])
    }
    picked.sort((a, b) => a.emplacement.localeCompare(b.emplacement))

    setWave(
      picked.map((row, i) => ({
        id: `${row.reference}-${i}`,
        reference: row.reference,
        designation: row.designation,
        emplacement: row.emplacement,
        quantite: Math.min(row.quantite, 1 + Math.floor(Math.random() * 40)),
        done: false,
      }))
    )
  }

  function toggleLine(id: string) {
    track('picking-check')
    setWave((prev) => prev?.map((l) => (l.id === id ? { ...l, done: !l.done } : l)) ?? null)
  }

  const doneCount = wave?.filter((l) => l.done).length ?? 0
  const total = wave?.length ?? 0
  const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: 0 }}>
          Préparation de commandes.
        </h2>
        <button onClick={generateWave} className="btn-primary" style={{ padding: '0.85rem 1.6rem', fontSize: '0.78rem' }}>
          {wave ? 'Générer une nouvelle vague →' : 'Générer une vague de picking →'}
        </button>
      </div>

      {!wave ? (
        <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--dark-muted)', fontWeight: 300 }}>
            Aucune vague en cours. Générez une vague pour simuler une liste de picking optimisée par emplacement, à partir du stock courant.
          </p>
        </div>
      ) : wave.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--dark-muted)' }}>Aucune référence en stock pour générer une vague. Importez ou réinitialisez des données dans l'onglet Stock.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)' }}>
              <span>Progression de la vague</span>
              <span>{doneCount}/{total} lignes prélevées</span>
            </div>
            <div style={{ height: 8, background: 'rgba(27,53,84,0.08)', overflow: 'hidden' }}>
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} style={{ height: '100%', background: 'var(--blue-bright)' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--navy)' }}>
                  <th style={thStyle}>✓</th>
                  <th style={thStyle}>Ordre</th>
                  <th style={thStyle}>Référence</th>
                  <th style={thStyle}>Désignation</th>
                  <th style={thStyle}>Emplacement</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Qté à prélever</th>
                </tr>
              </thead>
              <tbody>
                {wave.map((line, i) => (
                  <tr key={line.id} style={{ borderBottom: '1px solid rgba(27,53,84,0.08)', opacity: line.done ? 0.5 : 1 }}>
                    <td style={tdStyle}>
                      <input type="checkbox" checked={line.done} onChange={() => toggleLine(line.id)} style={{ width: 16, height: 16, cursor: 'none' }} />
                    </td>
                    <td style={{ ...tdStyle, fontFamily: 'DM Mono, monospace', color: 'rgba(27,53,84,0.5)' }}>{i + 1}</td>
                    <td style={{ ...tdStyle, fontFamily: 'DM Mono, monospace', color: 'var(--navy)' }}>{line.reference}</td>
                    <td style={{ ...tdStyle, color: 'var(--dark-muted)', textDecoration: line.done ? 'line-through' : 'none' }}>{line.designation}</td>
                    <td style={{ ...tdStyle, fontFamily: 'DM Mono, monospace', color: 'rgba(27,53,84,0.65)' }}>{line.emplacement}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, color: 'var(--navy)' }}>{line.quantite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(74,103,65,0.1)', border: '1px solid rgba(74,103,65,0.4)', color: 'var(--sage)', fontSize: '0.85rem' }}
            >
              ✓ Vague terminée — toutes les lignes ont été prélevées. Prête pour l'expédition.
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.9rem 0.75rem',
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '0.9rem 0.75rem',
  fontSize: '0.85rem',
}
