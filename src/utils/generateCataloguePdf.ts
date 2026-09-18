import { METIERS_CATALOGUE, METIERS_EMERGENTS } from '../data/catalogueMetiers'

const NAVY: [number, number, number] = [27, 53, 84]
const GOLD: [number, number, number] = [192, 154, 47]
const MID: [number, number, number] = [95, 102, 114]
const BLUE_BRIGHT: [number, number, number] = [47, 111, 181]
const PAPER: [number, number, number] = [245, 243, 238]

function loadImageAsDataUrl(src: string): Promise<{ dataUrl: string; ratio: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('canvas context unavailable'))
        return
      }
      ctx.drawImage(img, 0, 0)
      resolve({ dataUrl: canvas.toDataURL('image/png'), ratio: img.naturalHeight / img.naturalWidth })
    }
    img.onerror = () => reject(new Error('logo load failed'))
    img.src = src
  })
}

export async function generateCataloguePdf(): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginX = 18
  const contentWidth = pageWidth - marginX * 2
  const topMargin = 24
  const bottomLimit = pageHeight - 24

  let logo: { dataUrl: string; ratio: number } | null = null
  try {
    logo = await loadImageAsDataUrl('/logo-lockup.png')
  } catch {
    logo = null
  }

  let y = topMargin
  let pageCount = 1

  const runningHeader = () => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...NAVY)
    doc.text('CATALOGUE DE FORMATION — NEXTINOTECH', marginX, 14)
    doc.setDrawColor(220, 220, 220)
    doc.line(marginX, 17, pageWidth - marginX, 17)
  }

  const newPage = () => {
    doc.addPage()
    pageCount += 1
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    runningHeader()
    y = topMargin
  }

  const ensureSpace = (needed: number) => {
    if (y + needed > bottomLimit) newPage()
  }

  // ── COVER ──
  doc.setFillColor(...PAPER)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  if (logo) {
    const logoWidthMm = 50
    doc.addImage(logo.dataUrl, 'PNG', marginX, 26, logoWidthMm, logoWidthMm * logo.ratio)
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(27)
  doc.setTextColor(...NAVY)
  doc.text('Catalogue de Formation', marginX, 76)

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(15)
  doc.setTextColor(...GOLD)
  doc.text('Ingénierie de Formation — tous vos métiers.', marginX, 86)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(...MID)
  const introLines = doc.splitTextToSize(
    "Diagnostic des besoins et plan de formation couvrant l'ensemble des métiers de votre entreprise : " +
      'formations livrées directement par nos consultants et besoins sourcés auprès de notre réseau de ' +
      'partenaires formateurs, sans commission éditeur.',
    contentWidth * 0.78,
  )
  doc.text(introLines, marginX, 98)

  const todayStr = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.setFontSize(8.5)
  doc.setTextColor(150, 150, 150)
  doc.text(`Édition du ${todayStr}`, marginX, 98 + introLines.length * 5.2 + 6)

  doc.setDrawColor(...NAVY)
  doc.setLineWidth(0.4)
  doc.line(marginX, pageHeight - 46, pageWidth - marginX, pageHeight - 46)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...NAVY)
  doc.text('Nextinotech — Cabinet indépendant de conseil et d’AMOA en Supply Chain', marginX, pageHeight - 38)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MID)
  doc.text('contact@nextinotech.com', marginX, pageHeight - 31)
  doc.text('+212 06 63 44 92 00', marginX, pageHeight - 25)
  doc.text('Casablanca, Maroc · nextinotech.com', marginX, pageHeight - 19)

  // ── DOMAINES ──
  newPage()
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...NAVY)
  doc.text('Domaines couverts, métier par métier', marginX, y)
  y += 8

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.3)
  doc.setTextColor(...MID)
  const legend = doc.splitTextToSize(
    "« NEXTINOTECH » : formations livrées directement par nos consultants. « PARTENAIRES » : besoin sourcé via notre réseau de partenaires formateurs, sans commission éditeur.",
    contentWidth,
  )
  doc.text(legend, marginX, y)
  y += legend.length * 3.6 + 6

  METIERS_CATALOGUE.forEach((m) => {
    ensureSpace(16)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11.5)
    doc.setTextColor(...NAVY)
    doc.text(m.nom, marginX, y)

    const badgeText = m.source === 'nextinotech' ? 'NEXTINOTECH' : 'PARTENAIRES'
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...(m.source === 'nextinotech' ? BLUE_BRIGHT : MID))
    doc.text(badgeText, pageWidth - marginX, y, { align: 'right' })
    y += 5.5

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.6)
    doc.setTextColor(...MID)
    const descLines = doc.splitTextToSize(m.description, contentWidth)
    ensureSpace(descLines.length * 3.7 + 2)
    doc.text(descLines, marginX, y)
    y += descLines.length * 3.7 + 3

    m.themes.forEach((t) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.6)
      const bulletText = `•  ${t.titre}${t.tendance ? '   —   IA · Tendance' : ''}`
      const lines = doc.splitTextToSize(bulletText, contentWidth - 4)
      ensureSpace(lines.length * 3.9)
      doc.setTextColor(...(t.tendance ? GOLD : NAVY))
      doc.text(lines, marginX + 3, y)
      y += lines.length * 3.9
    })
    y += 6
  })

  // ── MÉTIERS ÉMERGENTS ──
  ensureSpace(20)
  y += 2
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...NAVY)
  doc.text('Nouveaux métiers émergents — IA & tendances', marginX, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.3)
  doc.setTextColor(...MID)
  const emergentsIntro = doc.splitTextToSize(
    'Rôles apparus ou devenus majeurs ces dernières années, synthétisés à partir de référentiels publics et de rapports institutionnels (World Economic Forum, LinkedIn, O*NET / BLS).',
    contentWidth,
  )
  doc.text(emergentsIntro, marginX, y)
  y += emergentsIntro.length * 3.6 + 6

  METIERS_EMERGENTS.forEach((role) => {
    ensureSpace(14)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...NAVY)
    doc.text(role.titre, marginX, y)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.setTextColor(...GOLD)
    doc.text('IA · TENDANCE', pageWidth - marginX, y, { align: 'right' })
    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MID)
    const lines = doc.splitTextToSize(role.description, contentWidth)
    ensureSpace(lines.length * 3.7)
    doc.text(lines, marginX, y)
    y += lines.length * 3.7 + 5
  })

  // ── CTA / CONTACT (dernière page) ──
  ensureSpace(50)
  y += 4
  doc.setDrawColor(...NAVY)
  doc.setLineWidth(0.3)
  doc.line(marginX, y, pageWidth - marginX, y)
  y += 10
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...NAVY)
  doc.text('Un diagnostic de vos besoins de formation, tous métiers.', marginX, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MID)
  const ctaLines = doc.splitTextToSize(
    'Nextinotech construit avec vous un plan de formation adapté à chaque métier de votre entreprise, en toute indépendance vis-à-vis des organismes formateurs.',
    contentWidth,
  )
  doc.text(ctaLines, marginX, y)
  y += ctaLines.length * 4.2 + 8

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(...NAVY)
  doc.text('contact@nextinotech.com', marginX, y)
  y += 6
  doc.text('+212 06 63 44 92 00', marginX, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...MID)
  doc.text('Casablanca, Maroc · nextinotech.com/ingenierie-formation', marginX, y)

  // ── FOOTER (toutes pages) ──
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i)
    doc.setDrawColor(220, 220, 220)
    doc.line(marginX, pageHeight - 14, pageWidth - marginX, pageHeight - 14)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...MID)
    doc.text('Nextinotech · contact@nextinotech.com · +212 06 63 44 92 00 · Casablanca, Maroc', marginX, pageHeight - 9)
    doc.text(`${i} / ${pageCount}`, pageWidth - marginX, pageHeight - 9, { align: 'right' })
  }

  doc.save('Nextinotech-Catalogue-Formation-Ingenierie.pdf')
}
