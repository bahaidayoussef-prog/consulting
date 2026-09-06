// Petites préférences par visiteur (bandeau cookies, barre formation).
// Tout est encapsulé try/catch : navigation privée, stockage bloqué, etc.

export function getFlag(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function setFlag(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* stockage indisponible — on ignore */
  }
}

/** true si le flag a été posé il y a moins de `days` jours. */
export function isRecent(key: string, days: number): boolean {
  const raw = getFlag(key)
  if (!raw) return false
  const ts = Number(raw)
  if (!Number.isFinite(ts)) return true // valeur non datée => considérée comme active
  return Date.now() - ts < days * 24 * 60 * 60 * 1000
}
