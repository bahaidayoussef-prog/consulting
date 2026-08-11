import { useState } from 'react'
import {
  ROUTES,
  FLEET,
  PENDING_ORDERS,
  routeDistanceKm,
  nearestNeighborOrder,
  matchFleetStatus,
  matchRouteId,
  TMS_TEMPLATE_HEADERS,
  TMS_TEMPLATE_ROWS,
  type DeliveryRoute,
  type FleetVehicle,
  type FleetStatus,
  type PendingOrder,
} from '../../data/demoTmsData'
import { useDemoInteractions } from '../../hooks/useDemoInteractions'
import DemoUpsellBanner from './DemoUpsellBanner'
import DemoTabs from './DemoTabs'
import DataImportPanel from './DataImportPanel'
import PlanificationModule from './tms/PlanificationModule'
import FlotteModule from './tms/FlotteModule'
import CoutsModule from './tms/CoutsModule'

const TABS = [
  { id: 'planification', label: 'Planification' },
  { id: 'flotte', label: 'Suivi de flotte' },
  { id: 'couts', label: 'Coûts' },
]

function importFleet(objects: Record<string, string>[]): { rows: FleetVehicle[]; skipped: number } {
  const rows: FleetVehicle[] = []
  let skipped = 0
  objects.forEach((o, i) => {
    const vehicule = o['vehicule'] || o['véhicule'] || ''
    const chauffeur = o['chauffeur'] || ''
    if (!vehicule || !chauffeur) {
      skipped++
      return
    }
    rows.push({
      id: `V-IMP-${i}`,
      vehicule,
      chauffeur,
      statut: matchFleetStatus(o['statut'] || ''),
      prochaineLivraison: o['prochaine_livraison'] || o['prochaine livraison'] || '—',
      routeId: matchRouteId(o['tournee'] || o['tournée'] || ''),
    })
  })
  return { rows, skipped }
}

export default function DemoTms() {
  const [routes, setRoutes] = useState<DeliveryRoute[]>(ROUTES)
  const [pending, setPending] = useState<PendingOrder[]>(PENDING_ORDERS)
  const [fleet, setFleet] = useState<FleetVehicle[]>(FLEET)
  const [optimizedGains, setOptimizedGains] = useState<Record<string, number>>({})

  const [activeTab, setActiveTab] = useState('planification')
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<FleetStatus | 'Tous'>('Tous')

  const { track, show, dismiss } = useDemoInteractions(3)

  function handleOptimize(routeId: string) {
    const route = routes.find((r) => r.id === routeId)
    if (!route) return
    track('optimize')
    const before = routeDistanceKm(route.stops)
    const optimizedStops = nearestNeighborOrder(route.stops)
    const after = routeDistanceKm(optimizedStops)
    const gain = before > 0 ? Math.max(0, Math.round(((before - after) / before) * 100)) : 0
    setRoutes((prev) => prev.map((r) => (r.id === routeId ? { ...r, stops: optimizedStops } : r)))
    setOptimizedGains((prev) => ({ ...prev, [routeId]: gain }))
  }

  function handleAssign(orderId: string, routeId: string) {
    const order = pending.find((o) => o.id === orderId)
    if (!order) return
    setRoutes((prev) => prev.map((r) => (r.id === routeId ? { ...r, stops: [...r.stops, { x: order.x, y: order.y, label: order.label }] } : r)))
    setPending((prev) => prev.filter((o) => o.id !== orderId))
  }

  function handleImport(objects: Record<string, string>[]) {
    const { rows, skipped } = importFleet(objects)
    if (rows.length === 0) {
      return { ok: false, message: 'Aucune ligne valide trouvée. Colonnes attendues au minimum : vehicule, chauffeur.' }
    }
    setFleet(rows)
    setSelectedRoute(null)
    setStatusFilter('Tous')
    track('import')
    return {
      ok: true,
      message: `${rows.length} véhicule(s) importé(s)${skipped ? `, ${skipped} ligne(s) ignorée(s) (colonnes manquantes)` : ''}. Le suivi de flotte et les coûts ont été recalculés.`,
    }
  }

  function handleReset() {
    setFleet(FLEET)
    setRoutes(ROUTES)
    setPending(PENDING_ORDERS)
    setOptimizedGains({})
    setSelectedRoute(null)
    setStatusFilter('Tous')
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
            label="TMS"
            templateHeaders={TMS_TEMPLATE_HEADERS}
            templateRows={TMS_TEMPLATE_ROWS}
            templateFilename="modele-flotte-tms.csv"
            onImport={handleImport}
            onReset={handleReset}
          />

          <DemoTabs tabs={TABS} active={activeTab} onChange={(id) => { track(`tab-${id}`); setActiveTab(id) }} />

          {activeTab === 'planification' && (
            <PlanificationModule
              routes={routes}
              pending={pending}
              selectedRoute={selectedRoute}
              onSelectRoute={setSelectedRoute}
              onOptimize={handleOptimize}
              onAssign={handleAssign}
              optimizedGains={optimizedGains}
              track={track}
            />
          )}
          {activeTab === 'flotte' && (
            <FlotteModule fleet={fleet} selectedRoute={selectedRoute} statusFilter={statusFilter} onStatusFilter={setStatusFilter} track={track} />
          )}
          {activeTab === 'couts' && <CoutsModule routes={routes} fleet={fleet} track={track} />}
        </div>
      </section>

      <DemoUpsellBanner show={show} onDismiss={dismiss} />
    </>
  )
}
