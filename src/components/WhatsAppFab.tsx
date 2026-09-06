import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useMobileMenu } from '../contexts/MobileMenuContext'

const WA_FAB_LINK = `https://wa.me/212663449200?text=${encodeURIComponent(
  'Bonjour Nextinotech, je souhaite des informations.',
)}`

/* Bouton flottant WhatsApp — présent sur tout le site. Vert WhatsApp pour la
   reconnaissance immédiate, carré pour respecter la charte (border-radius 0). */
export default function WhatsAppFab() {
  const { menuOpen } = useMobileMenu()
  if (menuOpen) return null

  return (
    <a
      href={WA_FAB_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="wa-fab"
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
    >
      <IconBrandWhatsapp size={30} color="#ffffff" stroke={2} />
      <span className="wa-fab-label">WhatsApp</span>
      <style>{`
        .wa-fab {
          position: fixed;
          right: 1.25rem;
          bottom: 1.5rem;
          z-index: 95;
          width: 54px;
          height: 54px;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .wa-fab-label {
          position: absolute;
          right: calc(100% + 0.6rem);
          background: var(--navy, #1b3554);
          color: #fff;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 0.7rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transform: translateX(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .wa-fab:hover .wa-fab-label { opacity: 1; transform: translateX(0); }
        @media (max-width: 767px) {
          .wa-fab { left: 1rem; right: auto; bottom: calc(64px + 0.9rem); width: 50px; height: 50px; }
          .wa-fab-label { display: none; }
        }
      `}</style>
    </a>
  )
}
