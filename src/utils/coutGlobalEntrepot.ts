// Estimation directionnelle du coût global mensuel d'exploitation d'un
// entrepôt — catégories universelles du secteur (bâtiment, main d'œuvre,
// équipements), ratios génériques, pas d'outil propriétaire tiers.

export type CityTier = 'casablanca' | 'rabat_kenitra' | 'villes_secondaires' | 'autres_regions'
export type EquipmentMode = 'achat' | 'location'

export interface CostInputs {
  surfaceM2: number
  cityTier: CityTier
  operatorCount: number
  hourlyRate: number
  equipmentCount: number
  equipmentMode: EquipmentMode
  monthlyVolume: number
}

export interface CostResult {
  buildingCost: [number, number]
  laborCost: number
  equipmentCost: [number, number]
  total: [number, number]
  breakdownPct: { building: number; labor: number; equipment: number }
  costPerUnit: [number, number]
}

// MAD/m²/mois — loyer entrepôt/logistique, par palier de ville/région.
// Directionnel : zones logistiques premium (Casablanca) vs secondaires.
const CITY_RATE: Record<CityTier, [number, number]> = {
  casablanca: [35, 55],
  rabat_kenitra: [28, 45],
  villes_secondaires: [20, 35],
  autres_regions: [15, 25],
}

// MAD/mois/engin — coût mensualisé (achat : amortissement + maintenance
// lissés ; location : loyer tout compris). Générique, tous types d'engins
// de manutention confondus.
const EQUIPMENT_RATE: Record<EquipmentMode, [number, number]> = {
  achat: [5000, 9000],
  location: [8000, 14000],
}

// Heures mensuelles standard (35h/sem × 52/12 ≈ 151h ; on retient 176h,
// base mensuelle usuelle incluant marge/heures complémentaires au Maroc).
const MONTHLY_HOURS = 176

export function computeGlobalCost(inputs: CostInputs): CostResult {
  const { surfaceM2, cityTier, operatorCount, hourlyRate, equipmentCount, equipmentMode, monthlyVolume } = inputs

  const [cityLow, cityHigh] = CITY_RATE[cityTier]
  const buildingCost: [number, number] = [Math.round(surfaceM2 * cityLow), Math.round(surfaceM2 * cityHigh)]

  const laborCost = Math.round(operatorCount * hourlyRate * MONTHLY_HOURS)

  const [eqLow, eqHigh] = EQUIPMENT_RATE[equipmentMode]
  const equipmentCost: [number, number] = [Math.round(equipmentCount * eqLow), Math.round(equipmentCount * eqHigh)]

  const total: [number, number] = [
    buildingCost[0] + laborCost + equipmentCost[0],
    buildingCost[1] + laborCost + equipmentCost[1],
  ]

  // Répartition indicative sur le point médian de chaque fourchette.
  const buildingMid = (buildingCost[0] + buildingCost[1]) / 2
  const equipmentMid = (equipmentCost[0] + equipmentCost[1]) / 2
  const totalMid = buildingMid + laborCost + equipmentMid
  const breakdownPct = {
    building: Math.round((buildingMid / totalMid) * 100),
    labor: Math.round((laborCost / totalMid) * 100),
    equipment: Math.round((equipmentMid / totalMid) * 100),
  }

  const costPerUnit: [number, number] = [
    Math.round((total[0] / monthlyVolume) * 100) / 100,
    Math.round((total[1] / monthlyVolume) * 100) / 100,
  ]

  return { buildingCost, laborCost, equipmentCost, total, breakdownPct, costPerUnit }
}

export const CITY_LABELS: Record<CityTier, string> = {
  casablanca: 'Casablanca',
  rabat_kenitra: 'Rabat / Kénitra / Mohammedia',
  villes_secondaires: 'Marrakech / Agadir / Fès / Meknès / Tanger',
  autres_regions: 'Autres régions',
}

export const EQUIPMENT_MODE_LABELS: Record<EquipmentMode, string> = {
  achat: 'Achat',
  location: 'Location',
}
