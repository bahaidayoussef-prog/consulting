import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA, trackPageView } from '../utils/analytics'

// Composant sans rendu — initialise GA4 une fois, puis envoie un page_view
// à chaque changement de route (nécessaire dans une SPA : pas de rechargement
// HTML entre les pages, donc pas de page_view automatique).
export default function Analytics() {
  const location = useLocation()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location.pathname, location.search])

  return null
}
