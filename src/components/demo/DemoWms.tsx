import { useMemo, useState } from 'react'
import {
  buildWarehouseGrid,
  buildStockRows,
  deriveGridFromStock,
  daysSinceFrDate,
  WMS_TEMPLATE_HEADERS,
  WMS_TEMPLATE_ROWS,
  type StockRow,
} from '../../data/demoWmsData'
import { useDemoInteractions } from '../../hooks/useDemoInteractions'
import DemoUpsellBanner from './DemoUpsellBanner'
import DemoTabs from './DemoTabs'
import DataImportPanel from './DataImportPanel'
import ReceptionModule from './wms/ReceptionModule'
import StockModule from './wms/StockModule'
import PreparationModule from './wms/PreparationModule'
import ExpeditionModule from './wms/ExpeditionModule'

const TABS = [
  { id: 'reception', label: 'Réception' },
  { id: 'stock', label: 'Stock' },
  { id: 'preparation', label: 'Préparation' },
  { id: 'expedition', label: 'Expédition' },
]

function importStock(objects: Record<string, string>[]): { rows: StockRow[]; skipped: number } {
  const rows: StockRow[] = []
  let skipped = 0
  for (const o of objects) {
    const reference = o['reference'] || o['référence'] || ''
    const emplacement = o['emplacement'] || ''
    const quantite = parseInt((o['quantite'] || o['quantité'] || '').replace(/[^\d-]/g, ''), 10)
    if (!reference || !emplacement || !Number.isFinite(quantite)) {
      skipped++
      continue
    }
    const derniereRotationRaw = o['derniere_rotation'] || o['dernière_rotation'] || ''
    const rotationJours = daysSinceFrDate(derniereRotationRaw) ?? 0
    rows.push({
      reference: reference.toUpperCase(),
      designation: o['designation'] || o['désignation'] || 'Article importé',
      quantite,
      emplacement: emplacement.toUpperCase(),
      derniereRotation: derniereRotationRaw || '—',
      rotationJours,
      categorie: o['categorie'] || o['catégorie'] || 'Non classé',
    })
  }
  return { rows, skipped }
}

export default function DemoWms() {
  const baseGrid = useMemo(() => buildWarehouseGrid(), [])
  const defaultStockRows = useMemo(() => buildStockRows(baseGrid), [baseGrid])

  const [stockRows, setStockRows] = useState<StockRow[]>(defaultStockRows)
  const [activeTab, setActiveTab] = useState('reception')
  const { track, show, dismiss } = useDemoInteractions(3)

  const grid = useMemo(() => deriveGridFromStock(baseGrid, stockRows), [baseGrid, stockRows])

  function handleImport(objects: Record<string, string>[]) {
    const { rows, skipped } = importStock(objects)
    if (rows.length === 0) {
      return {
        ok: false,
        message: 'Aucune ligne valide trouvée. Colonnes attendues au minimum : reference, quantite, emplacement.',
      }
    }
    setStockRows(rows)
    track('import')
    return {
      ok: true,
      message: `${rows.length} référence(s) importée(s)${skipped ? `, ${skipped} ligne(s) ignorée(s) (colonnes manquantes)` : ''}. Le plan d'entrepôt et la carte de chaleur ont été recalculés.`,
    }
  }

  function handleReceive(row: StockRow) {
    setStockRows((prev) => {
      const idx = prev.findIndex((r) => r.reference === row.reference)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], quantite: updated[idx].quantite + row.quantite, derniereRotation: row.derniereRotation, rotationJours: 0 }
        return updated
      }
      return [...prev, row]
    })
  }

  return (
    <>
      <section style={{ background: 'var(--paper)', padding: '2rem var(--sp-x) 5rem' }}>
        <div className="section-inner">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(200,140,20,0.9)',
              border: '1px solid rgba(200,140,20,0.35)',
              background: 'rgba(200,140,20,0.06)',
              padding: '0.5rem 0.9rem',
              marginBottom: '2rem',
            }}
          >
            Données fictives — démonstration à but illustratif
          </div>

          <DataImportPanel
            label="WMS"
            templateHeaders={WMS_TEMPLATE_HEADERS}
            templateRows={WMS_TEMPLATE_ROWS}
            templateFilename="modele-stock-wms.csv"
            onImport={handleImport}
            onReset={() => setStockRows(defaultStockRows)}
          />

          <DemoTabs tabs={TABS} active={activeTab} onChange={(id) => { track(`tab-${id}`); setActiveTab(id) }} />

          {activeTab === 'reception' && <ReceptionModule onReceive={handleReceive} track={track} />}
          {activeTab === 'stock' && <StockModule grid={grid} stockRows={stockRows} track={track} />}
          {activeTab === 'preparation' && <PreparationModule stockRows={stockRows} track={track} />}
          {activeTab === 'expedition' && <ExpeditionModule track={track} />}
        </div>
      </section>

      <DemoUpsellBanner show={show} onDismiss={dismiss} />
    </>
  )
}
