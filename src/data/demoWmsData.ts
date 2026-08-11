// Générateur pseudo-aléatoire déterministe (mulberry32) — les données mockées
// doivent rester stables entre les rendus (tri/filtre) sans dépendre de Math.random.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type LocationStatus = 'occupied' | 'free' | 'reserved'

export interface WarehouseCell {
  id: string
  zone: 'A' | 'B' | 'C'
  allee: number
  niveau: number
  status: LocationStatus
  activity: number // 0-100, utilisé pour la heatmap
}

export interface StockRow {
  reference: string
  designation: string
  quantite: number
  emplacement: string
  derniereRotation: string // DD/MM/YYYY
  rotationJours: number // ancienneté en jours, pour le tri
  categorie: string
}

const ZONES: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C']
const COLS_PER_ZONE = 4
const ROWS = 6

export function buildWarehouseGrid(): WarehouseCell[] {
  const rand = mulberry32(42)
  const cells: WarehouseCell[] = []

  for (const zone of ZONES) {
    for (let allee = 1; allee <= COLS_PER_ZONE; allee++) {
      for (let niveau = 1; niveau <= ROWS; niveau++) {
        const r = rand()
        let status: LocationStatus
        if (r < 0.56) status = 'occupied'
        else if (r < 0.85) status = 'free'
        else status = 'reserved'

        // Les niveaux bas et la zone A (fast movers) ont une activité plus forte
        const baseActivity = zone === 'A' ? 55 : zone === 'B' ? 32 : 14
        const levelBoost = (ROWS - niveau) * 6
        const activity = status === 'free'
          ? Math.round(rand() * 8)
          : Math.min(100, Math.round(baseActivity + levelBoost + rand() * 25))

        cells.push({
          id: `${zone}-${String(allee).padStart(2, '0')}-${String(niveau).padStart(2, '0')}`,
          zone,
          allee,
          niveau,
          status,
          activity,
        })
      }
    }
  }
  return cells
}

const DESIGNATIONS = [
  'Palette Europe 80x120 — produits finis',
  'Carton emballage standard 40x30',
  'Bidon détergent industriel 5L',
  'Fût plastique 200L',
  'Caisse plastique gerbable 60x40',
  'Rouleau film étirable palettisation',
  'Sac ciment 50kg',
  'Carton range 6 bouteilles 1L',
  'Box carton double cannelure',
  'Bac plastique picking 30L',
  'Palette bois perdue 100x120',
  'Housse plastique protection palette',
  'Carton export renforcé',
  'Container plastique pliable 600L',
  'Colis e-commerce format M',
]

const CATEGORIES = ['Fast mover', 'Rotation moyenne', 'Slow mover', 'Overstock']

export function buildStockRows(grid: WarehouseCell[]): StockRow[] {
  const rand = mulberry32(1337)
  const occupiedCells = grid.filter((c) => c.status !== 'free')
  const rows: StockRow[] = []

  const count = Math.min(42, occupiedCells.length)
  for (let i = 0; i < count; i++) {
    const cell = occupiedCells[Math.floor(rand() * occupiedCells.length)]
    const designation = DESIGNATIONS[Math.floor(rand() * DESIGNATIONS.length)]
    const categorie = cell.zone === 'A'
      ? 'Fast mover'
      : cell.zone === 'B'
        ? CATEGORIES[Math.floor(rand() * 2)]
        : CATEGORIES[2 + Math.floor(rand() * 2)]

    const rotationJours = Math.floor(rand() * 45)
    const d = new Date(2026, 7, 11) // référence : aujourd'hui
    d.setDate(d.getDate() - rotationJours)
    const derniereRotation = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })

    rows.push({
      reference: `REF-${10000 + Math.floor(rand() * 89999)}`,
      designation,
      quantite: 20 + Math.floor(rand() * 1480),
      emplacement: cell.id,
      derniereRotation,
      rotationJours,
      categorie,
    })
  }

  return rows.sort((a, b) => a.reference.localeCompare(b.reference))
}

/**
 * Recalcule l'occupation et l'activité du plan d'entrepôt à partir du stock
 * courant (démo ou importé) : une cellule référencée par au moins une ligne
 * de stock devient "occupied" ; une cellule "occupied" de base qui n'est
 * plus référencée redevient "free". Les cellules "reserved" ne portent
 * jamais de stock et restent inchangées.
 */
export function deriveGridFromStock(baseGrid: WarehouseCell[], stockRows: StockRow[]): WarehouseCell[] {
  const byLocation = new Map<string, StockRow[]>()
  for (const row of stockRows) {
    const key = row.emplacement.toUpperCase()
    const arr = byLocation.get(key) ?? []
    arr.push(row)
    byLocation.set(key, arr)
  }

  return baseGrid.map((cell) => {
    const rows = byLocation.get(cell.id)
    if (rows && rows.length > 0) {
      const minRotation = Math.min(...rows.map((r) => r.rotationJours))
      return { ...cell, status: 'occupied', activity: Math.max(6, Math.min(100, 100 - minRotation * 2)) }
    }
    if (cell.status === 'occupied') {
      return { ...cell, status: 'free', activity: 2 }
    }
    return cell
  })
}

/** "DD/MM/YYYY" → nombre de jours écoulés depuis (référence : aujourd'hui). null si format non reconnu. */
export function daysSinceFrDate(frDate: string): number | null {
  const m = frDate.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return null
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
  const ref = new Date(2026, 7, 11)
  const diff = Math.round((ref.getTime() - d.getTime()) / 86400000)
  return Number.isFinite(diff) ? Math.max(0, diff) : null
}

export const WMS_TEMPLATE_HEADERS = ['reference', 'designation', 'quantite', 'emplacement', 'derniere_rotation', 'categorie']

export const WMS_TEMPLATE_ROWS: Array<Record<string, string | number>> = [
  { reference: 'REF-10234', designation: 'Palette Europe 80x120 — produits finis', quantite: 480, emplacement: 'A-01-01', derniere_rotation: '05/08/2026', categorie: 'Fast mover' },
  { reference: 'REF-10567', designation: 'Carton emballage standard 40x30', quantite: 310, emplacement: 'B-02-03', derniere_rotation: '28/07/2026', categorie: 'Rotation moyenne' },
  { reference: 'REF-11890', designation: 'Bidon détergent industriel 5L', quantite: 95, emplacement: 'C-03-02', derniere_rotation: '10/07/2026', categorie: 'Slow mover' },
]

export const SUPPLIERS = ['Atlas Distribution', 'Maroc Emballage SA', 'Nord Logistique', 'Sud Fournitures', 'Trans-Maghreb Négoce']

export interface ReceptionLogEntry {
  id: string
  heure: string
  reference: string
  quantite: number
  fournisseur: string
  controle: 'Conforme' | 'Non conforme'
}

export interface ReadyOrder {
  id: string
  client: string
  nbColis: number
  poidsKg: number
  transporteur: string
}

export const READY_ORDERS: ReadyOrder[] = [
  { id: 'CMD-4471', client: 'Grossiste Nord SARL', nbColis: 12, poidsKg: 340, transporteur: 'Trans Atlas Express' },
  { id: 'CMD-4472', client: 'Distributeur Sud SA', nbColis: 4, poidsKg: 85, transporteur: 'CTM Fret' },
  { id: 'CMD-4473', client: 'Grande Surface Centrale', nbColis: 28, poidsKg: 910, transporteur: 'Trans Atlas Express' },
  { id: 'CMD-4474', client: 'Boutique Almaz', nbColis: 2, poidsKg: 18, transporteur: 'Livraison locale' },
  { id: 'CMD-4475', client: 'Coopérative Régionale', nbColis: 9, poidsKg: 260, transporteur: 'CTM Fret' },
]
