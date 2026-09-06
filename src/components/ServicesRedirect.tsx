import { Navigate } from 'react-router-dom'

// /services a été scindée en /conseil et /prestations. Cette redirection couvre
// les anciens liens externes/marque-pages : /services, /services#conseil,
// /services#systemes, /services#pourquoi -> /conseil (le contenu Conseil &
// Expertise reste sur /conseil). Les ancres Prestations connues (aucune en usage
// interne actuellement, gardé pour compatibilité de liens externes éventuels)
// -> /prestations.
const PRESTATIONS_ANCHORS = ['#prestations', '#valeur-ajoutee', '#pack-inventaire', '#leibinger']

function resolveServicesRedirect(): string {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  if (PRESTATIONS_ANCHORS.includes(hash)) return '/prestations'
  return '/conseil'
}

export default function ServicesRedirect() {
  return <Navigate to={resolveServicesRedirect()} replace />
}
