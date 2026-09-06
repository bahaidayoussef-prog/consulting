interface DemoTab {
  id: string
  label: string
}

interface DemoTabsProps {
  tabs: DemoTab[]
  active: string
  onChange: (id: string) => void
}

export default function DemoTabs({ tabs, active, onChange }: DemoTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.25rem',
        borderBottom: '1px solid rgba(27,53,84,0.12)',
        marginBottom: '2.5rem',
        overflowX: 'auto',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '1rem 1.4rem',
              background: 'none',
              border: 'none',
              borderBottom: isActive ? '2px solid var(--blue-bright)' : '2px solid transparent',
              color: isActive ? 'var(--navy)' : 'rgba(27,53,84,0.45)',
              fontWeight: isActive ? 700 : 400,
              cursor: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              marginBottom: '-1px',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
