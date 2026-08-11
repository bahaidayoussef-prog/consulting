export interface RouteStop {
  x: number
  y: number
  label: string
}

export interface DeliveryRoute {
  id: string
  name: string
  color: string
  stops: RouteStop[]
}

export type FleetStatus = 'En livraison' | 'En chargement' | 'Retour dépôt' | 'Disponible'

export interface FleetVehicle {
  id: string
  vehicule: string
  chauffeur: string
  statut: FleetStatus
  prochaineLivraison: string
  routeId: string | null
}

export const DEPOT = { x: 400, y: 270, label: 'Dépôt central — Casablanca' }

export const ROUTES: DeliveryRoute[] = [
  {
    id: 'R1',
    name: 'Casablanca Centre',
    color: 'var(--blue-bright)',
    stops: [
      { x: 330, y: 190, label: 'Client — Maarif' },
      { x: 255, y: 150, label: 'Client — Racine' },
      { x: 200, y: 205, label: 'Client — Gauthier' },
      { x: 235, y: 280, label: 'Client — Bourgogne' },
      { x: 305, y: 320, label: 'Client — Centre-ville' },
    ],
  },
  {
    id: 'R2',
    name: 'Ain Sebaa – Sidi Bernoussi',
    color: 'var(--navy)',
    stops: [
      { x: 480, y: 155, label: 'Client — Ain Sebaa' },
      { x: 560, y: 120, label: 'Client — Sidi Bernoussi' },
      { x: 620, y: 180, label: 'Client — Zone industrielle' },
      { x: 575, y: 240, label: 'Client — Hay Mohammadi' },
    ],
  },
  {
    id: 'R3',
    name: 'Sud – Nouaceur / Bouskoura',
    color: 'var(--sage)',
    stops: [
      { x: 420, y: 380, label: 'Client — Nouaceur' },
      { x: 480, y: 430, label: 'Client — Zone franche' },
      { x: 360, y: 440, label: 'Client — Bouskoura' },
      { x: 300, y: 400, label: 'Client — Lissasfa' },
    ],
  },
  {
    id: 'R4',
    name: 'Ouest – Ain Diab / Californie',
    color: 'var(--mid)',
    stops: [
      { x: 150, y: 320, label: 'Client — Californie' },
      { x: 95, y: 260, label: 'Client — Ain Diab' },
      { x: 140, y: 385, label: 'Client — Sidi Maarouf' },
      { x: 215, y: 420, label: 'Client — Oasis' },
    ],
  },
]

export const FLEET: FleetVehicle[] = [
  {
    id: 'V-01',
    vehicule: 'Fourgon 20m³ — FL-1042',
    chauffeur: 'Rachid Amrani',
    statut: 'En livraison',
    prochaineLivraison: 'Client Gauthier — 14:20',
    routeId: 'R1',
  },
  {
    id: 'V-02',
    vehicule: 'Poids lourd 12T — FL-0876',
    chauffeur: 'Hicham Belkadi',
    statut: 'En livraison',
    prochaineLivraison: 'Zone industrielle — 15:05',
    routeId: 'R2',
  },
  {
    id: 'V-03',
    vehicule: 'Fourgon 12m³ — FL-1188',
    chauffeur: 'Fatima-Zahra Idrissi',
    statut: 'En livraison',
    prochaineLivraison: 'Zone franche Nouaceur — 13:50',
    routeId: 'R3',
  },
  {
    id: 'V-04',
    vehicule: 'Camionnette 6m³ — FL-1305',
    chauffeur: 'Nabil Ouazzani',
    statut: 'Retour dépôt',
    prochaineLivraison: 'Oasis — 16:30 (tournée suivante)',
    routeId: 'R4',
  },
  {
    id: 'V-05',
    vehicule: 'Fourgon 20m³ — FL-0954',
    chauffeur: 'Omar Zahidi',
    statut: 'En chargement',
    prochaineLivraison: 'Tournée en préparation — 15:00',
    routeId: null,
  },
  {
    id: 'V-06',
    vehicule: 'Camionnette 6m³ — FL-1421',
    chauffeur: 'Said Bouziane',
    statut: 'Disponible',
    prochaineLivraison: '—',
    routeId: null,
  },
]
