import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { buildWarehouseGrid, buildStockRows, type WarehouseCell, type StockRow } from '../../data/demoWmsData'
import { useDemoInteractions } from '../../hooks/useDemoInteractions'
import DemoUpsellBanner from './DemoUpsellBanner'

const ease = [0.16, 1, 0.3, 1] as const

const STATUS_LABEL: Record<WarehouseCell['status'], string> = {
  occupied: 'Occupé',
  free: 'Libre',
  reserved: 'Réservé',
}

function cellColor(cell: WarehouseCell, mode: 'status' | 'heat') {
  if (mode === 'heat') {
    const a = 0.06 + (cell.activity / 100) * 0.85
    return `rgba(47,111,181,${a.toFixed(2)})`
  }
  if (cell.status === 'occupied') return 'var(--blue-bright)'
  if (cell.status === 'reserved') return 'rgba(27,53,84,0.28)'
  return '#ffffff'
}

function WarehouseGrid({
  grid,
  mode,
  selected,
  onSelect,
}: {
  grid: WarehouseCell[]
  mode: 'status' | 'heat'
  selected: WarehouseCell | null
  onSelect: (c: WarehouseCell) => void
}) {
  const zones: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C']

  return (
    <div className="wms-zones" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {zones.map((zone) => {
        const cells = grid.filter((c) => c.zone === zone)
        return (
          <div key={zone} style={{ flex: '1 1 260px', minWidth: 240 }}>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(27,53,84,0.5)',
                marginBottom: '0.75rem',
              }}
            >
              Zone {zone}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 4,
              }}
            >
              {[...cells].reverse().map((cell) => {
                const isSelected = selected?.id === cell.id
                return (
                  <button
                    key={cell.id}
                    onClick={() => onSelect(cell)}
                    title={`${cell.id} — ${STATUS_LABEL[cell.status]}`}
                    style={{
                      aspectRatio: '1',
                      background: cellColor(cell, mode),
                      border: isSelected
                        ? '2px solid var(--navy)'
                        : cell.status === 'free' && mode === 'status'
                          ? '1px solid rgba(27,53,84,0.18)'
                          : '1px solid rgba(27,53,84,0.06)',
                      cursor: 'none',
                      padding: 0,
                      transition: 'transform 0.15s',
                    }}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type SortField = 'reference' | 'quantite' | 'emplacement' | 'rotationJours'

export default function DemoWms() {
  const grid = useMemo(() => buildWarehouseGrid(), [])
  const stockRows = useMemo(() => buildStockRows(grid), [grid])

  const [gridMode, setGridMode] = useState<'status' | 'heat'>('status')
  const [selectedCell, setSelectedCell] = useState<WarehouseCell | null>(null)
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<SortField>('reference')
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const { track, show, dismiss } = useDemoInteractions(3)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const rows = q
      ? stockRows.filter(
          (r) =>
            r.reference.toLowerCase().includes(q) ||
            r.designation.toLowerCase().includes(q) ||
            r.emplacement.toLowerCase().includes(q)
        )
      : stockRows

    return [...rows].sort((a, b) => {
      const av = a[sortField]
      const bv = b[sortField]
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * sortDir
      return String(av).localeCompare(String(bv)) * sortDir
    })
  }, [stockRows, search, sortField, sortDir])

  function toggleSort(field: SortField) {
    track('sort')
    if (field === sortField) setSortDir((d) => (d === 1 ? -1 : 1))
    else {
      setSortField(field)
      setSortDir(1)
    }
  }

  const counts = useMemo(() => {
    const c = { occupied: 0, free: 0, reserved: 0 }
    grid.forEach((cell) => c[cell.status]++)
    return c
  }, [grid])

  return (
    <>
      <section style={{ background: 'var(--paper)', padding: '2rem var(--sp-x) 5rem' }}>
        <div className="section-inner">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(200,140,20,0.9)',
              border: '1px solid rgba(200,140,20,0.35)',
              background: 'rgba(200,140,20,0.06)',
              padding: '0.5rem 0.9rem',
              marginBottom: '3rem',
            }}
          >
            Données fictives — démonstration à but illustratif
          </div>

          {/* --- Plan d'entrepôt --- */}
          <div style={{ marginBottom: '5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                Plan d'entrepôt.
              </h2>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['status', 'heat'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      track('grid-mode')
                      setGridMode(m)
                    }}
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.65rem 1.1rem',
                      background: gridMode === m ? 'var(--navy)' : 'transparent',
                      color: gridMode === m ? '#fff' : 'var(--navy)',
                      border: '1px solid var(--navy)',
                      cursor: 'none',
                    }}
                  >
                    {m === 'status' ? 'Occupation' : 'Carte de chaleur'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '2.5rem' }} className="wms-plan-layout">
              <div style={{ background: '#fff', border: '1px solid rgba(27,53,84,0.1)', padding: '2rem' }}>
                <WarehouseGrid grid={grid} mode={gridMode} selected={selectedCell} onSelect={(c) => { track('grid-cell'); setSelectedCell(c) }} />

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  {gridMode === 'status' ? (
                    <>
                      <LegendItem color="var(--blue-bright)" label={`Occupé (${counts.occupied})`} />
                      <LegendItem color="#ffffff" border label={`Libre (${counts.free})`} />
                      <LegendItem color="rgba(27,53,84,0.28)" label={`Réservé (${counts.reserved})`} />
                    </>
                  ) : (
                    <>
                      <LegendItem color="rgba(47,111,181,0.1)" label="Activité faible" />
                      <LegendItem color="rgba(47,111,181,0.5)" label="Activité moyenne" />
                      <LegendItem color="rgba(47,111,181,0.95)" label="Activité élevée" />
                    </>
                  )}
                </div>
              </div>

              <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(27,53,84,0.08)', padding: '1.75rem' }}>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(27,53,84,0.5)',
                    marginBottom: '1rem',
                  }}
                >
                  Détail emplacement
                </div>
                {selectedCell ? (
                  <motion.div key={selectedCell.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>
                      {selectedCell.id}
                    </div>
                    <DetailRow label="Zone" value={selectedCell.zone} />
                    <DetailRow label="Allée" value={String(selectedCell.allee)} />
                    <DetailRow label="Niveau" value={String(selectedCell.niveau)} />
                    <DetailRow label="Statut" value={STATUS_LABEL[selectedCell.status]} />
                    <DetailRow label="Activité" value={`${selectedCell.activity}/100`} />
                  </motion.div>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', fontWeight: 300, lineHeight: 1.7 }}>
                    Cliquez sur un emplacement dans le plan pour voir son détail.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* --- Tableau de stock --- */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                Stock en temps réel.
              </h2>
              <input
                value={search}
                onChange={(e) => {
                  if (e.target.value.length === 1) track('search')
                  setSearch(e.target.value)
                }}
                placeholder="Rechercher une référence, un emplacement…"
                style={{
                  width: 320,
                  maxWidth: '100%',
                  background: '#fff',
                  border: '1px solid rgba(27,53,84,0.16)',
                  padding: '0.85rem 1rem',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.9rem',
                  color: 'var(--ink)',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--navy)' }}>
                    <SortableTh label="Référence" field="reference" sortField={sortField} sortDir={sortDir} onClick={toggleSort} />
                    <th style={thStyle}>Désignation</th>
                    <SortableTh label="Quantité" field="quantite" sortField={sortField} sortDir={sortDir} onClick={toggleSort} align="right" />
                    <SortableTh label="Emplacement" field="emplacement" sortField={sortField} sortDir={sortDir} onClick={toggleSort} />
                    <SortableTh label="Dernière rotation" field="rotationJours" sortField={sortField} sortDir={sortDir} onClick={toggleSort} />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <StockTr key={row.reference} row={row} />
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--dark-muted)', fontSize: '0.85rem' }}>
                        Aucun résultat pour « {search} ».
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'rgba(27,53,84,0.45)', marginTop: '1rem' }}>
              {filtered.length} référence{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''} sur {stockRows.length}
            </div>
          </div>
        </div>
      </section>

      <DemoUpsellBanner show={show} onDismiss={dismiss} />
    </>
  )
}

function LegendItem({ color, label, border }: { color: string; label: string; border?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--dark-muted)' }}>
      <span style={{ width: 14, height: 14, background: color, border: border ? '1px solid rgba(27,53,84,0.25)' : 'none', display: 'inline-block' }} />
      {label}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid rgba(27,53,84,0.08)', fontSize: '0.85rem' }}>
      <span style={{ color: 'var(--dark-muted)' }}>{label}</span>
      <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{value}</span>
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

function SortableTh({
  label,
  field,
  sortField,
  sortDir,
  onClick,
  align = 'left',
}: {
  label: string
  field: SortField
  sortField: SortField
  sortDir: 1 | -1
  onClick: (f: SortField) => void
  align?: 'left' | 'right'
}) {
  const active = field === sortField
  return (
    <th style={{ ...thStyle, textAlign: align, cursor: 'none' }} onClick={() => onClick(field)}>
      <span style={{ color: active ? 'var(--blue-bright)' : 'var(--navy)' }}>
        {label} {active ? (sortDir === 1 ? '↑' : '↓') : ''}
      </span>
    </th>
  )
}

function StockTr({ row }: { row: StockRow }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(27,53,84,0.08)' }}>
      <td style={tdStyle}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--navy)' }}>{row.reference}</span>
      </td>
      <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{row.designation}</td>
      <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, color: 'var(--navy)' }}>{row.quantite.toLocaleString('fr-FR')}</td>
      <td style={tdStyle}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'rgba(27,53,84,0.65)' }}>{row.emplacement}</span>
      </td>
      <td style={{ ...tdStyle, color: 'var(--dark-muted)' }}>{row.derniereRotation}</td>
    </tr>
  )
}

const tdStyle: React.CSSProperties = {
  padding: '0.9rem 0.75rem',
  fontSize: '0.85rem',
}
