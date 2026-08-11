import { useMemo, useState } from 'react'
import {
  DEFAULT_HISTORY,
  computeForecastFromHistory,
  SCENARIOS,
  APS_TEMPLATE_HEADERS,
  APS_TEMPLATE_ROWS,
  type WeekPoint,
  type Scenario,
} from '../../data/demoApsData'
import { useDemoInteractions } from '../../hooks/useDemoInteractions'
import DemoUpsellBanner from './DemoUpsellBanner'
import DemoTabs from './DemoTabs'
import DataImportPanel from './DataImportPanel'
import PrevisionModule from './aps/PrevisionModule'
import ApprovisionnementModule from './aps/ApprovisionnementModule'
import SopModule from './aps/SopModule'

const TABS = [
  { id: 'prevision', label: 'Prévision' },
  { id: 'approvisionnement', label: 'Approvisionnement' },
  { id: 'sop', label: 'S&OP' },
]

function importHistory(objects: Record<string, string>[]): { rows: WeekPoint[]; skipped: number } {
  const rows: WeekPoint[] = []
  let skipped = 0
  objects.forEach((o, i) => {
    const label = o['semaine'] || o['week'] || `S-${objects.length - i}`
    const raw = o['demande_reelle'] || o['demande'] || ''
    const value = parseInt(raw.replace(/[^\d-]/g, ''), 10)
    if (!Number.isFinite(value)) {
      skipped++
      return
    }
    rows.push({ label, value })
  })
  return { rows, skipped }
}

export default function DemoAps() {
  const [history, setHistory] = useState<WeekPoint[]>(DEFAULT_HISTORY)
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0])
  const [demandVariation, setDemandVariation] = useState(scenario.demandVariation)
  const [supplierDelay, setSupplierDelay] = useState(scenario.supplierDelay)
  const [activeTab, setActiveTab] = useState('prevision')

  const { track, show, dismiss } = useDemoInteractions(3)

  const forecastBase = useMemo(() => computeForecastFromHistory(history), [history])
  const forecastAdjusted = useMemo(
    () => forecastBase.map((f) => ({ ...f, value: Math.round(f.value * (1 + demandVariation / 100)) })),
    [forecastBase, demandVariation]
  )
  const avgWeeklyDemand = useMemo(
    () => forecastAdjusted.reduce((s, f) => s + f.value, 0) / Math.max(1, forecastAdjusted.length),
    [forecastAdjusted]
  )

  function applyScenario(s: Scenario) {
    setScenario(s)
    setDemandVariation(s.demandVariation)
    setSupplierDelay(s.supplierDelay)
  }

  function handleImport(objects: Record<string, string>[]) {
    const { rows, skipped } = importHistory(objects)
    if (rows.length < 2) {
      return { ok: false, message: 'Au moins 2 semaines de données sont nécessaires pour calculer une tendance. Colonnes attendues : semaine, demande_reelle.' }
    }
    setHistory(rows)
    track('import')
    return {
      ok: true,
      message: `${rows.length} semaine(s) importée(s)${skipped ? `, ${skipped} ligne(s) ignorée(s)` : ''}. La prévision, le plan d'approvisionnement et la vue S&OP ont été recalculés.`,
    }
  }

  function handleReset() {
    setHistory(DEFAULT_HISTORY)
    applyScenario(SCENARIOS[0])
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
            label="APS"
            templateHeaders={APS_TEMPLATE_HEADERS}
            templateRows={APS_TEMPLATE_ROWS}
            templateFilename="modele-demande-aps.csv"
            onImport={handleImport}
            onReset={handleReset}
          />

          <DemoTabs tabs={TABS} active={activeTab} onChange={(id) => { track(`tab-${id}`); setActiveTab(id) }} />

          {activeTab === 'prevision' && (
            <PrevisionModule
              history={history}
              forecastAdjusted={forecastAdjusted}
              demandVariation={demandVariation}
              supplierDelay={supplierDelay}
              scenario={scenario}
              onScenario={applyScenario}
              onDemandChange={setDemandVariation}
              onDelayChange={setSupplierDelay}
              track={track}
            />
          )}
          {activeTab === 'approvisionnement' && (
            <ApprovisionnementModule avgWeeklyDemand={avgWeeklyDemand} supplierDelay={supplierDelay} track={track} />
          )}
          {activeTab === 'sop' && <SopModule forecastAdjusted={forecastAdjusted} track={track} />}
        </div>
      </section>

      <DemoUpsellBanner show={show} onDismiss={dismiss} />
    </>
  )
}
