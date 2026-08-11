import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { parseTable, rowsToObjects, buildCSV, downloadCSV } from '../../utils/csv'

const ease = [0.16, 1, 0.3, 1] as const

interface DataImportPanelProps {
  label: string
  templateHeaders: string[]
  templateRows: Array<Record<string, string | number>>
  templateFilename: string
  onImport: (objects: Record<string, string>[]) => { ok: boolean; message: string }
  onReset: () => void
}

export default function DataImportPanel({
  label,
  templateHeaders,
  templateRows,
  templateFilename,
  onImport,
  onReset,
}: DataImportPanelProps) {
  const [open, setOpen] = useState(false)
  const [rawText, setRawText] = useState('')
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      setRawText(String(reader.result ?? ''))
      setResult(null)
    }
    reader.readAsText(file, 'utf-8')
  }

  function apply() {
    const rows = parseTable(rawText)
    const objects = rowsToObjects(rows)
    if (objects.length === 0) {
      setResult({ ok: false, message: 'Aucune ligne exploitable détectée. Vérifiez que la première ligne contient les en-têtes de colonnes.' })
      return
    }
    setResult(onImport(objects))
  }

  function reset() {
    onReset()
    setRawText('')
    setResult({ ok: true, message: 'Données de démonstration restaurées.' })
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0.7rem 1.2rem',
          background: open ? 'var(--navy)' : '#fff',
          color: open ? '#fff' : 'var(--navy)',
          border: '1px solid var(--navy)',
          cursor: 'none',
        }}
      >
        {open ? '× Fermer' : '⇪ Importer mes données'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.1)', padding: '2rem', marginTop: '1rem' }}>
              <div
                style={{
                  background: 'rgba(47,111,181,0.08)',
                  border: '1px solid rgba(47,111,181,0.3)',
                  padding: '1rem 1.25rem',
                  fontSize: '0.85rem',
                  color: 'var(--navy)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                🔒 Vos données restent dans votre navigateur, elles ne sont ni envoyées ni conservées par Essor Consulting.
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    padding: '0.75rem 1.4rem',
                    background: '#fff',
                    border: '1px solid rgba(27,53,84,0.25)',
                    color: 'var(--navy)',
                    cursor: 'none',
                  }}
                >
                  Choisir un fichier CSV…
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleFile(f)
                    e.target.value = ''
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--dark-muted)' }}>ou collez un tableau ci-dessous —</span>
                <button
                  onClick={() => downloadCSV(templateFilename, buildCSV(templateHeaders, templateRows))}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--blue-bright)',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    padding: 0,
                  }}
                >
                  ↓ Télécharger le modèle CSV ({label})
                </button>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value)
                  setResult(null)
                }}
                placeholder={`Collez ici un tableau (copié depuis Excel/Google Sheets) ou le contenu d'un fichier CSV.\nPremière ligne = en-têtes : ${templateHeaders.join(', ')}`}
                rows={6}
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '1px solid rgba(27,53,84,0.16)',
                  padding: '0.85rem 1rem',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.78rem',
                  color: 'var(--ink)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={apply}
                  disabled={!rawText.trim()}
                  className="btn-primary"
                  style={{ padding: '0.8rem 1.6rem', fontSize: '0.78rem', opacity: rawText.trim() ? 1 : 0.4 }}
                >
                  Appliquer ces données →
                </button>
                <button
                  onClick={reset}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--dark-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    padding: 0,
                  }}
                >
                  Réinitialiser aux données de démonstration
                </button>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.85rem 1.1rem',
                    fontSize: '0.82rem',
                    background: result.ok ? 'rgba(74,103,65,0.1)' : 'rgba(190,60,50,0.08)',
                    border: `1px solid ${result.ok ? 'rgba(74,103,65,0.4)' : 'rgba(190,60,50,0.35)'}`,
                    color: result.ok ? 'var(--sage)' : 'rgb(190,60,50)',
                  }}
                >
                  {result.ok ? '✓ ' : '✗ '}
                  {result.message}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
