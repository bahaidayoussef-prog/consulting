import { FAMILIES } from '../../../data/demoApsData'

function statusFor(stockActuel: number, pointCommande: number, seuilUrgent: number) {
  if (stockActuel < seuilUrgent) return { label: 'Commander maintenant', color: 'rgb(190,60,50)', bg: 'rgba(190,60,50,0.08)' }
  if (stockActuel < pointCommande) return { label: 'À commander bientôt', color: 'rgb(200,140,20)', bg: 'rgba(200,140,20,0.08)' }
  return { label: 'OK', color: 'var(--sage)', bg: 'rgba(74,103,65,0.08)' }
}

export default function ApprovisionnementModule({ avgWeeklyDemand, supplierDelay }: { avgWeeklyDemand: number; supplierDelay: number; track: (id: string) => void }) {
  const delaiSemaines = supplierDelay / 7

  const rows = FAMILIES.map((f) => {
    const demandeHebdo = Math.round(avgWeeklyDemand * f.part)
    const stockSecurite = Math.round(demandeHebdo * 1)
    const pointCommande = Math.round(demandeHebdo * delaiSemaines + stockSecurite)
    const seuilUrgent = Math.round(demandeHebdo * delaiSemaines * 0.5)
    const quantiteACommander = f.stockActuel < pointCommande ? Math.round(pointCommande - f.stockActuel + demandeHebdo) : 0
    return { ...f, demandeHebdo, stockSecurite, pointCommande, quantiteACommander, status: statusFor(f.stockActuel, pointCommande, seuilUrgent) }
  })

  return (
    <div>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--navy)', margin: '0 0 1rem' }}>
        Plan d'approvisionnement.
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', marginBottom: '2rem', maxWidth: 640, lineHeight: 1.7 }}>
        Point de commande = demande hebdomadaire × délai fournisseur (en semaines) + stock de sécurité. Recalculé en direct depuis les leviers de l'onglet Prévision.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--navy)' }}>
              <th style={thStyle}>Famille produit</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Stock actuel</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Demande / semaine</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Point de commande</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Qté à commander</th>
              <th style={thStyle}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
                <td style={{ ...tdStyle, color: 'var(--navy)', fontWeight: 600 }}>{r.nom}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{r.stockActuel.toLocaleString('fr-FR')}</td>
                <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--dark-muted)' }}>{r.demandeHebdo.toLocaleString('fr-FR')}</td>
                <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--dark-muted)' }}>{r.pointCommande.toLocaleString('fr-FR')}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: r.quantiteACommander > 0 ? 'var(--blue-bright)' : 'var(--dark-muted)' }}>
                  {r.quantiteACommander > 0 ? r.quantiteACommander.toLocaleString('fr-FR') : '—'}
                </td>
                <td style={tdStyle}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: r.status.color, background: r.status.bg, padding: '0.3rem 0.6rem' }}>
                    {r.status.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.9rem 0.75rem',
  fontFamily: 'DM Mono, monospace',
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--navy)',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '0.9rem 0.75rem',
  fontSize: '0.85rem',
}
