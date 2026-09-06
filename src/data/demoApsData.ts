export interface WeekPoint {
  label: string
  value: number
}

// 8 semaines d'historique réel — la prévision est calculée à partir de cette
// série (tendance moyenne extrapolée), pas codée en dur, pour que l'import
// de données réelles recalcule une prévision cohérente.
export const DEFAULT_HISTORY: WeekPoint[] = [
  { label: 'S-8', value: 940 },
  { label: 'S-7', value: 1010 },
  { label: 'S-6', value: 890 },
  { label: 'S-5', value: 1080 },
  { label: 'S-4', value: 1150 },
  { label: 'S-3', value: 1020 },
  { label: 'S-2', value: 1190 },
  { label: 'S-1', value: 1240 },
]

/** Tendance moyenne extrapolée sur 8 semaines — méthode générique (moyenne des variations
 * hebdomadaires), pas un algorithme propriétaire. */
export function computeForecastFromHistory(history: WeekPoint[]): WeekPoint[] {
  if (history.length < 2) return []
  const deltas: number[] = []
  for (let i = 1; i < history.length; i++) deltas.push(history[i].value - history[i - 1].value)
  const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length
  const last = history[history.length - 1].value
  return Array.from({ length: 8 }, (_, i) => ({
    label: `S+${i + 1}`,
    value: Math.max(0, Math.round(last + avgDelta * (i + 1))),
  }))
}

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

export const APS_TEMPLATE_HEADERS = ['semaine', 'demande_reelle']

export const APS_TEMPLATE_ROWS: Array<Record<string, string | number>> = DEFAULT_HISTORY.map((h) => ({
  semaine: h.label,
  demande_reelle: h.value,
}))

export interface ProductFamily {
  id: string
  nom: string
  stockActuel: number
  part: number // part de la demande globale portée par cette famille (somme = 1)
}

export const FAMILIES: ProductFamily[] = [
  { id: 'F1', nom: 'Boissons non-alcoolisées', stockActuel: 2800, part: 0.35 },
  { id: 'F2', nom: "Produits d'hygiène", stockActuel: 950, part: 0.2 },
  { id: 'F3', nom: 'Épicerie sèche', stockActuel: 2450, part: 0.3 },
  { id: 'F4', nom: 'Produits frais', stockActuel: 480, part: 0.15 },
]
