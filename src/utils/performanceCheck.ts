// Performance & SEO Health Check Utility

export interface PerformanceMetrics {
  title: string
  issues: string[]
  warnings: string[]
  successes: string[]
  metrics: {
    [key: string]: string | number
  }
}

export function runFullSEOHealthCheck(): PerformanceMetrics {
  const report: PerformanceMetrics = {
    title: 'Nextinotech — Full SEO Health Check',
    issues: [],
    warnings: [],
    successes: [],
    metrics: {},
  }

  // ─── META TAGS ───
  const title = document.querySelector('title')?.textContent
  const desc = document.querySelector('meta[name="description"]')?.getAttribute('content')
  const canonical = document.querySelector('link[rel="canonical"]')

  if (!title) report.issues.push('Missing title tag')
  else if (title.length < 30 || title.length > 60) {
    report.warnings.push(`Title length ${title.length}ch (target 30-60)`)
  } else {
    report.successes.push('✓ Title tag optimized')
  }

  if (!desc) report.issues.push('Missing meta description')
  else if (desc.length < 120 || desc.length > 160) {
    report.warnings.push(`Description length ${desc.length}ch (target 120-160)`)
  } else {
    report.successes.push('✓ Meta description optimized')
  }

  if (canonical) {
    report.successes.push('✓ Canonical tag present')
  } else {
    report.warnings.push('Missing canonical tag')
  }

  // ─── HEADINGS ───
  const h1s = document.querySelectorAll('h1')
  const h2s = document.querySelectorAll('h2')

  if (h1s.length === 0) {
    report.issues.push('No h1 tag found')
  } else if (h1s.length === 1) {
    report.successes.push(`✓ Single h1 tag (${h1s[0].textContent?.substring(0, 30)}...)`)
  } else {
    report.issues.push(`${h1s.length} h1 tags found (should be only 1)`)
  }

  report.metrics['H2 tags'] = h2s.length
  report.metrics['H1 tags'] = h1s.length

  // ─── SCHEMAS ───
  const schemas = document.querySelectorAll('script[type="application/ld+json"]')
  const schemaTypes: string[] = []

  schemas.forEach(s => {
    try {
      const data = JSON.parse(s.textContent || '{}')
      const type = data['@type']
      if (Array.isArray(data['@graph'])) {
        data['@graph'].forEach((item: any) => {
          if (item['@type']) schemaTypes.push(item['@type'])
        })
      } else if (type) {
        schemaTypes.push(type)
      }
    } catch (e) {
      report.issues.push(`Invalid JSON-LD: ${(e as Error).message}`)
    }
  })

  if (schemaTypes.length > 0) {
    report.successes.push(
      `✓ ${schemaTypes.length} structured data schemas: ${[...new Set(schemaTypes)].join(', ')}`
    )
    report.metrics['Schema types'] = [...new Set(schemaTypes)].join(', ')
  } else {
    report.warnings.push('No structured data schemas found')
  }

  // ─── IMAGES ───
  const images = document.querySelectorAll('img')
  let altOk = 0
  let altMissing = 0

  images.forEach(img => {
    const alt = img.getAttribute('alt')
    const isDecorative = img.getAttribute('aria-hidden') === 'true'
    if (alt || isDecorative) altOk++
    else altMissing++
  })

  report.metrics['Images total'] = images.length
  report.metrics['Images with alt/decorative'] = altOk
  if (altMissing > 0) {
    report.warnings.push(`${altMissing} images missing alt text`)
  } else {
    report.successes.push('✓ All images have alt text or marked decorative')
  }

  // ─── LINKS ───
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  const externalLinks = document.querySelectorAll('a[href^="http"]')

  report.metrics['Internal links'] = internalLinks.length
  report.metrics['External links'] = externalLinks.length

  // ─── MOBILE/RESPONSIVENESS ───
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport) {
    report.successes.push('✓ Viewport meta tag present')
  } else {
    report.issues.push('Missing viewport meta tag')
  }

  // ─── OPEN GRAPH ───
  const ogTags = document.querySelectorAll('meta[property^="og:"]')
  if (ogTags.length > 0) {
    report.successes.push(`✓ ${ogTags.length} Open Graph tags`)
    report.metrics['OG tags'] = ogTags.length
  } else {
    report.warnings.push('No Open Graph tags found')
  }

  // ─── ROBOTS & SITEMAP ───
  const robots = document.querySelector('meta[name="robots"]')
  if (robots?.getAttribute('content')?.includes('index')) {
    report.successes.push('✓ Robots meta allows indexing')
  } else {
    report.warnings.push('Robots meta may prevent indexing')
  }

  // ─── LANGUAGE ───
  const htmlLang = document.documentElement.getAttribute('lang')
  if (htmlLang) {
    report.successes.push(`✓ Language attribute: ${htmlLang}`)
    report.metrics['Language'] = htmlLang
  } else {
    report.warnings.push('Missing html lang attribute')
  }

  return report
}

export function logFullReport(report: PerformanceMetrics) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🔍 ${report.title}`)
  console.log(`${'='.repeat(60)}\n`)

  if (report.issues.length > 0) {
    console.group('❌ ISSUES (Fix immediately)')
    report.issues.forEach(issue => console.log(`  • ${issue}`))
    console.groupEnd()
  }

  if (report.warnings.length > 0) {
    console.group('⚠️  WARNINGS (Recommended)')
    report.warnings.forEach(warning => console.log(`  • ${warning}`))
    console.groupEnd()
  }

  if (report.successes.length > 0) {
    console.group('✅ SUCCESSES')
    report.successes.forEach(success => console.log(`  ${success}`))
    console.groupEnd()
  }

  if (Object.keys(report.metrics).length > 0) {
    console.group('📊 METRICS')
    Object.entries(report.metrics).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`)
    })
    console.groupEnd()
  }

  console.log(`\n${'='.repeat(60)}\n`)
}

// Expose to window for console access
if (typeof window !== 'undefined') {
  (window as any).runSEOCheck = () => {
    const report = runFullSEOHealthCheck()
    logFullReport(report)
    return report
  }
}
