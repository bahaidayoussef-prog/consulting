export interface RouteStop {
  x: number
  y: number
  label: string
}

export interface DeliveryRoute {
  id: string
  name: string
  color: string
  stops: RouteStop[]
}

export type FleetStatus = 'En livraison' | 'En chargement' | 'Retour dépôt' | 'Disponible'

export interface FleetVehicle {
  id: string
  vehicule: string
  chauffeur: string
  statut: FleetStatus
  prochaineLivraison: string
  routeId: string | null
}

export const DEPOT = { x: 400, y: 270, label: 'Dépôt central — Casablanca' }

export const ROUTES: DeliveryRoute[] = [
  {
    id: 'R1',
    name: 'Casablanca Centre',
    color: 'var(--blue-bright)',
    // Ordre de saisie volontairement sous-optimal (pas géographique) — sert
    // de base réelle et mesurable à la fonctionnalité "Optimiser".
    stops: [
      { x: 200, y: 205, label: 'Client — Gauthier' },
      { x: 305, y: 320, label: 'Client — Centre-ville' },
      { x: 255, y: 150, label: 'Client — Racine' },
      { x: 330, y: 190, label: 'Client — Maarif' },
      { x: 235, y: 280, label: 'Client — Bourgogne' },
    ],
  },
  {
    id: 'R2',
    name: 'Ain Sebaa – Sidi Bernoussi',
    color: 'var(--navy)',
    stops: [
      { x: 620, y: 180, label: 'Client — Zone industrielle' },
      { x: 480, y: 155, label: 'Client — Ain Sebaa' },
      { x: 575, y: 240, label: 'Client — Hay Mohammadi' },
      { x: 560, y: 120, label: 'Client — Sidi Bernoussi' },
    ],
  },
  {
    id: 'R3',
    name: 'Sud – Nouaceur / Bouskoura',
    color: 'var(--sage)',
    stops: [
      { x: 300, y: 400, label: 'Client — Lissasfa' },
      { x: 480, y: 430, label: 'Client — Zone franche' },
      { x: 420, y: 380, label: 'Client — Nouaceur' },
      { x: 360, y: 440, label: 'Client — Bouskoura' },
    ],
  },
  {
    id: 'R4',
    name: 'Ouest – Ain Diab / Californie',
    color: 'var(--mid)',
    stops: [
      { x: 140, y: 385, label: 'Client — Sidi Maarouf' },
      { x: 150, y: 320, label: 'Client — Californie' },
      { x: 215, y: 420, label: 'Client — Oasis' },
      { x: 95, y: 260, label: 'Client — Ain Diab' },
    ],
  },
]

export const FLEET: FleetVehicle[] = [
  {
    id: 'V-01',
    vehicule: 'Fourgon 20m³ — FL-1042',
    chauffeur: 'Rachid Amrani',
    statut: 'En livraison',
    prochaineLivraison: 'Client Gauthier — 14:20',
    routeId: 'R1',
  },
  {
    id: 'V-02',
    vehicule: 'Poids lourd 12T — FL-0876',
    chauffeur: 'Hicham Belkadi',
    statut: 'En livraison',
    prochaineLivraison: 'Zone industrielle — 15:05',
    routeId: 'R2',
  },
  {
    id: 'V-03',
    vehicule: 'Fourgon 12m³ — FL-1188',
    chauffeur: 'Fatima-Zahra Idrissi',
    statut: 'En livraison',
    prochaineLivraison: 'Zone franche Nouaceur — 13:50',
    routeId: 'R3',
  },
  {
    id: 'V-04',
    vehicule: 'Camionnette 6m³ — FL-1305',
    chauffeur: 'Nabil Ouazzani',
    statut: 'Retour dépôt',
    prochaineLivraison: 'Oasis — 16:30 (tournée suivante)',
    routeId: 'R4',
  },
  {
    id: 'V-05',
    vehicule: 'Fourgon 20m³ — FL-0954',
    chauffeur: 'Omar Zahidi',
    statut: 'En chargement',
    prochaineLivraison: 'Tournée en préparation — 15:00',
    routeId: null,
  },
  {
    id: 'V-06',
    vehicule: 'Camionnette 6m³ — FL-1421',
    chauffeur: 'Said Bouziane',
    statut: 'Disponible',
    prochaineLivraison: '—',
    routeId: null,
  },
]

export interface PendingOrder {
  id: string
  label: string
  x: number
  y: number
}

export const PENDING_ORDERS: PendingOrder[] = [
  { id: 'CMD-P1', label: 'Client — Val Fleuri', x: 265, y: 235 },
  { id: 'CMD-P2', label: 'Client — Sidi Moumen', x: 610, y: 100 },
  { id: 'CMD-P3', label: 'Client — Dar Bouazza', x: 90, y: 440 },
]

/** ~0.14 km par unité de coordonnée SVG — donne des distances plausibles à l'échelle de Casablanca. */
const SVG_UNIT_TO_KM = 0.14

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/** Distance totale dépôt → arrêts dans l'ordre donné → retour dépôt, en km estimés. */
export function routeDistanceKm(stops: RouteStop[]): number {
  const points = [DEPOT, ...stops, DEPOT]
  let total = 0
  for (let i = 0; i < points.length - 1; i++) total += dist(points[i], points[i + 1])
  return Math.round(total * SVG_UNIT_TO_KM * 10) / 10
}

/** Tri "plus proche voisin" à partir du dépôt — optimisation simplifiée mais réelle (pas un chiffre fictif). */
export function nearestNeighborOrder(stops: RouteStop[]): RouteStop[] {
  const remaining = [...stops]
  const ordered: RouteStop[] = []
  let current: { x: number; y: number } = DEPOT
  while (remaining.length > 0) {
    let bestIdx = 0
    let bestDist = Infinity
    remaining.forEach((s, i) => {
      const d = dist(current, s)
      if (d < bestDist) {
        bestDist = d
        bestIdx = i
      }
    })
    current = remaining[bestIdx]
    ordered.push(remaining.splice(bestIdx, 1)[0])
  }
  return ordered
}

function vehicleProfile(vehicule: string): { consoL100: number; capaciteColis: number } {
  if (/poids lourd/i.test(vehicule)) return { consoL100: 32, capaciteColis: 220 }
  if (/20m/i.test(vehicule)) return { consoL100: 24, capaciteColis: 140 }
  if (/12m/i.test(vehicule)) return { consoL100: 19, capaciteColis: 90 }
  return { consoL100: 13, capaciteColis: 45 }
}

export interface RouteCostEstimate {
  routeId: string
  distanceKm: number
  dureeH: number
  coutCarburant: number
  coutChauffeur: number
  coutTotal: number
  coutParLivraison: number
}

const HOURLY_DRIVER_RATE = 45 // MAD/heure
const AVG_SPEED_KMH = 32
const STOP_TIME_H = 10 / 60

export function estimateRouteCost(route: DeliveryRoute, vehicule: string | undefined, fuelPriceMadL: number): RouteCostEstimate {
  const distanceKm = routeDistanceKm(route.stops)
  const dureeH = distanceKm / AVG_SPEED_KMH + route.stops.length * STOP_TIME_H
  const { consoL100 } = vehicleProfile(vehicule ?? '')
  const coutCarburant = Math.round((distanceKm / 100) * consoL100 * fuelPriceMadL)
  const coutChauffeur = Math.round(dureeH * HOURLY_DRIVER_RATE)
  const coutTotal = coutCarburant + coutChauffeur
  return {
    routeId: route.id,
    distanceKm,
    dureeH: Math.round(dureeH * 10) / 10,
    coutCarburant,
    coutChauffeur,
    coutTotal,
    coutParLivraison: Math.round(coutTotal / Math.max(1, route.stops.length)),
  }
}

export const TMS_TEMPLATE_HEADERS = ['vehicule', 'chauffeur', 'statut', 'tournee', 'prochaine_livraison']

export const TMS_TEMPLATE_ROWS: Array<Record<string, string | number>> = [
  { vehicule: 'Fourgon 20m³ — FL-2001', chauffeur: 'Karim Tazi', statut: 'En livraison', tournee: 'Casablanca Centre', prochaine_livraison: 'Client Maarif — 11:30' },
  { vehicule: 'Camionnette 6m³ — FL-2002', chauffeur: 'Amine Skalli', statut: 'Disponible', tournee: '', prochaine_livraison: '—' },
]

const FLEET_STATUSES: FleetStatus[] = ['En livraison', 'En chargement', 'Retour dépôt', 'Disponible']

export function matchFleetStatus(input: string): FleetStatus {
  const found = FLEET_STATUSES.find((s) => s.toLowerCase() === input.trim().toLowerCase())
  return found ?? 'Disponible'
}

export function matchRouteId(tourneeName: string): string | null {
  const q = tourneeName.trim().toLowerCase()
  if (!q) return null
  const found = ROUTES.find((r) => r.name.toLowerCase().includes(q) || q.includes(r.name.toLowerCase()) || r.id.toLowerCase() === q)
  return found?.id ?? null
}
