import { createContext, useContext, useState, type ReactNode } from 'react'

interface MobileMenuState {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  toolsOpen: boolean
  setToolsOpen: (open: boolean) => void
}

const MobileMenuContext = createContext<MobileMenuState | null>(null)

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <MobileMenuContext.Provider value={{ menuOpen, setMenuOpen, toolsOpen, setToolsOpen }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext)
  if (!ctx) throw new Error('useMobileMenu must be used within MobileMenuProvider')
  return ctx
}
