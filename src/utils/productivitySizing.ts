// Dimensionnement directionnel de productivité entrepôt — méthode simplifiée
// basée sur des ratios standards du secteur (chariot/transpalette : palettes
// traitées ; préparateur/manuel : lignes de commande). Fourchettes, pas un
// chiffre unique.

export type EngineType = 'chariot' | 'transpalette' | 'preparateur' | 'manuel'
export type TaskType = 'reception' | 'preparation' | 'expedition'

export interface ProductivityInputs {
  engineType: EngineType
  operatorCount: number
  shiftHours: number
  taskType: TaskType
  dailyVolume: number
}

export interface ProductivityResult {
  unit: 'palettes' | 'lignes'
  hourlyRatePerOperator: [number, number]
  recommendedHeadcount: [number, number]
  efficiencyPct: [number, number]
}

// Unités/heure/opérateur en régime "wrench time" pur (hors pauses, trajets,
// instructions) — ratios directionnels standards du secteur logistique.
const ENGINE_RATE: Record<EngineType, { unit: 'palettes' | 'lignes'; range: [number, number] }> = {
  chariot: { unit: 'palettes', range: [15, 25] },
  transpalette: { unit: 'palettes', range: [12, 20] },
  preparateur: { unit: 'lignes', range: [60, 100] },
  manuel: { unit: 'lignes', range: [35, 65] },
}

// Modulateur selon la tâche dominante : la réception (mouvements groupés,
// palette complète) est plus rapide au débit ; l'expédition ajoute un temps
// de contrôle/consolidation qui la ralentit légèrement.
const TASK_MULTIPLIER: Record<TaskType, [number, number]> = {
  reception: [1.05, 1.2],
  preparation: [0.9, 1.0],
  expedition: [0.85, 1.0],
}

// Efficacité opérationnelle réelle sur un poste (pauses, trajets, temps
// d'instructions/attente) — ce n'est jamais 100% de "wrench time".
const EFFICIENCY_RANGE: [number, number] = [0.75, 0.85]

export function computeProductivity(inputs: ProductivityInputs): ProductivityResult {
  const { engineType, taskType, shiftHours, dailyVolume } = inputs
  const engine = ENGINE_RATE[engineType]
  const [taskLow, taskHigh] = TASK_MULTIPLIER[taskType]
  const [effLow, effHigh] = EFFICIENCY_RANGE

  const hourlyRateLow = Math.round(engine.range[0] * taskLow)
  const hourlyRateHigh = Math.round(engine.range[1] * taskHigh)

  // Capacité journalière/opérateur = débit horaire × durée de poste × efficacité réelle.
  const dailyCapacityLow = hourlyRateLow * shiftHours * effLow
  const dailyCapacityHigh = hourlyRateHigh * shiftHours * effHigh

  const headcountLow = Math.max(1, Math.ceil(dailyVolume / dailyCapacityHigh))
  const headcountHigh = Math.max(headcountLow, Math.ceil(dailyVolume / dailyCapacityLow))

  return {
    unit: engine.unit,
    hourlyRatePerOperator: [hourlyRateLow, hourlyRateHigh],
    recommendedHeadcount: [headcountLow, headcountHigh],
    efficiencyPct: [Math.round(effLow * 100), Math.round(effHigh * 100)],
  }
}

export const ENGINE_LABELS: Record<EngineType, string> = {
  chariot: 'Chariot élévateur',
  transpalette: 'Transpalette électrique',
  preparateur: 'Préparateur de commandes',
  manuel: 'Manuel',
}

export const TASK_LABELS: Record<TaskType, string> = {
  reception: 'Réception',
  preparation: 'Préparation',
  expedition: 'Expédition',
}
