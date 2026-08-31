// Google Analytics 4 — activé uniquement si VITE_GA_MEASUREMENT_ID est défini
// (build Vite : variable injectée à la compilation, voir vercel.json "env").
// Sans identifiant réel, ce module ne fait rien — pas de tag cassé, pas d'ID inventé.
//
// Convention UTM pour tout lien partagé hors du site (LinkedIn, WhatsApp, email) :
//   utm_source=<canal>        ex. linkedin, whatsapp, email, newsletter
//   utm_medium=<type>         ex. social, message, email
//   utm_campaign=<nom-court>  ex. rl-session-oct2026, rl-relance-j7
//
// Exemple pour l'annonce de la session du 23 octobre sur LinkedIn :
//   https://nextinotech.com/formation-rl/?utm_source=linkedin&utm_medium=social&utm_campaign=rl-session-oct2026

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let initialized = false

export function initGA() {
  if (!GA_ID || initialized) return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // send_page_view: false — on envoie nous-mêmes les page_view à chaque
  // changement de route, cette app étant une SPA (pas de rechargement HTML).
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path: string) {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
