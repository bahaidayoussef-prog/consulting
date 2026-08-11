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
