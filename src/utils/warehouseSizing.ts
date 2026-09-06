// Dimensionnement directionnel d'entrepôt — méthode simplifiée de sizing logistique.
// Objectif : donner un ordre de grandeur exploitable en 2 minutes, pas une étude
// d'ingénierie. Toutes les valeurs sont volontairement données en fourchette.

export type Rotation = 'lent' | 'moyen' | 'rapide'
export type StorageType = 'simple' | 'double' | 'masse'

export interface SizingInputs {
  skuCount: number
  palletVolume: number
  rotation: Rotation
  storageType: StorageType
  orderLinesPerDay: number
}

export interface SizingResult {
  areaM2: [number, number]
  bays: [number, number] | null // null pour le stockage de masse (pas de rayonnage)
  docks: [number, number]
  utilizationPct: [number, number]
}

// m² nets (structure + allées de service du système) par emplacement palette,
// selon le type de stockage. Bornes basses = configuration dense/optimisée,
// bornes hautes = configuration prudente (dégagements plus larges).
const STORAGE_RATIOS: Record<StorageType, [number, number]> = {
  simple: [2.0, 2.6], // rack sélectif simple profondeur, allée chariot frontal ~3,2-3,5 m
  double: [1.5, 1.9], // double profondeur, chariot reach/navette, allée réduite
  masse: [0.9, 1.3], // empilage au sol / bloc, allées minimales
}

// Emplacements palettes par baie standard (≈2,7 m de large), rayonnage uniquement.
const BAY_CAPACITY: Record<'simple' | 'double', [number, number]> = {
  simple: [6, 10], // 3-5 niveaux × 2 palettes/niveau
  double: [14, 18], // 3-5 niveaux × 2 profondeur × ~2 largeur
}

// Facteur d'utilisation : part du bâtiment occupée par le stockage proprement dit
// (le reste = quais, zones de tri/consolidation, circulation principale, bureaux).
// Une rotation rapide mobilise davantage de surface de préparation/consolidation,
// donc un facteur d'utilisation plus faible.
const UTILIZATION_BY_ROTATION: Record<Rotation, [number, number]> = {
  lent: [0.78, 0.85],
  moyen: [0.75, 0.83],
  rapide: [0.72, 0.8],
}

// Au-delà de ce nombre de références, la diversité de SKU impose davantage
// d'espace de tri/consolidation — on rogne légèrement le facteur d'utilisation.
const HIGH_SKU_THRESHOLD = 5000
const HIGH_SKU_PENALTY = 0.02

// Ordre de grandeur : lignes de commande traitables par quai et par jour.
// Borne basse = quais très sollicités (opération dense), borne haute = quais
// peu sollicités (dimensionnement prudent) → docksLow utilise le plafond haut.
const LINES_PER_DOCK_OPTIMISTIC = 250
const LINES_PER_DOCK_CONSERVATIVE = 150
const MIN_DOCKS = 2

export function computeSizing(inputs: SizingInputs): SizingResult {
  const { skuCount, palletVolume, rotation, storageType, orderLinesPerDay } = inputs

  const [ratioLow, ratioHigh] = STORAGE_RATIOS[storageType]
  let [utilLow, utilHigh] = UTILIZATION_BY_ROTATION[rotation]

  if (skuCount > HIGH_SKU_THRESHOLD) {
    utilLow -= HIGH_SKU_PENALTY
    utilHigh -= HIGH_SKU_PENALTY
  }

  const netAreaLow = palletVolume * ratioLow
  const netAreaHigh = palletVolume * ratioHigh

  // Meilleur cas : le moins de surface nette / le meilleur taux d'utilisation.
  const areaLow = Math.round(netAreaLow / utilHigh)
  // Cas prudent : le plus de surface nette / le taux d'utilisation le plus faible.
  const areaHigh = Math.round(netAreaHigh / utilLow)

  let bays: [number, number] | null = null
  if (storageType !== 'masse') {
    const [capLow, capHigh] = BAY_CAPACITY[storageType]
    bays = [Math.ceil(palletVolume / capHigh), Math.ceil(palletVolume / capLow)]
  }

  const docksLow = Math.max(MIN_DOCKS, Math.ceil(orderLinesPerDay / LINES_PER_DOCK_OPTIMISTIC))
  const docksHigh = Math.max(MIN_DOCKS, Math.ceil(orderLinesPerDay / LINES_PER_DOCK_CONSERVATIVE))

  return {
    areaM2: [areaLow, areaHigh],
    bays,
    docks: [docksLow, docksHigh],
    utilizationPct: [Math.round(utilLow * 100), Math.round(utilHigh * 100)],
  }
}

export const ROTATION_LABELS: Record<Rotation, string> = {
  lent: 'Lent',
  moyen: 'Moyen',
  rapide: 'Rapide',
}

export const STORAGE_TYPE_LABELS: Record<StorageType, string> = {
  simple: 'Rack simple profondeur',
  double: 'Rack double profondeur',
  masse: 'Stockage de masse (bloc)',
}
