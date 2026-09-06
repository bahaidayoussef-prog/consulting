import { useCallback, useState } from 'react'

export function useDemoInteractions(threshold = 3) {
  const [seen, setSeen] = useState<Set<string>>(new Set())
  const [dismissed, setDismissed] = useState(false)

  const track = useCallback((id: string) => {
    setSeen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  return {
    track,
    show: seen.size >= threshold && !dismissed,
    dismiss: () => setDismissed(true),
  }
}
