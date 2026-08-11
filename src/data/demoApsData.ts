export interface WeekPoint {
  label: string
  value: number
}

// 8 semaines d'historique réel + tendance de base pour les 8 semaines projetées
export const HISTORY: WeekPoint[] = [
  { label: 'S-8', value: 940 },
  { label: 'S-7', value: 1010 },
  { label: 'S-6', value: 890 },
  { label: 'S-5', value: 1080 },
  { label: 'S-4', value: 1150 },
  { label: 'S-3', value: 1020 },
  { label: 'S-2', value: 1190 },
  { label: 'S-1', value: 1240 },
]

export const BASE_FORECAST: WeekPoint[] = [
  { label: 'S+1', value: 1260 },
  { label: 'S+2', value: 1300 },
  { label: 'S+3', value: 1280 },
  { label: 'S+4', value: 1340 },
  { label: 'S+5', value: 1390 },
  { label: 'S+6', value: 1360 },
  { label: 'S+7', value: 1420 },
  { label: 'S+8', value: 1460 },
]

export interface Scenario {
  id: string
  label: string
  demandVariation: number
  supplierDelay: number
}

export const SCENARIOS: Scenario[] = [
  { id: 'normal', label: 'Scénario normal', demandVariation: 0, supplierDelay: 14 },
  { id: 'pic', label: 'Pic saisonnier (+20%)', demandVariation: 20, supplierDelay: 14 },
  { id: 'rupture', label: 'Rupture fournisseur', demandVariation: 0, supplierDelay: 35 },
]
