#!/usr/bin/env node
/**
 * Garde-fou SEO post-build — vérifie exactement la classe de bug qui a causé
 * l'incident /formation-rl (octobre 2026) : une URL du sitemap qui ne
 * correspond pas telle quelle à la balise canonique de la page prérendue
 * correspondante, ce qui déclenche une redirection Vercel contradictoire.
 *
 * Vérifie pour chaque <loc> du sitemap :
 *   1. La page prérendue correspondante existe dans dist/ (pas d'URL fantôme).
 *   2. Sa balise <link rel="canonical"> est identique, au caractère près, à
 *      l'URL du sitemap (donc pas de mismatch de slash final ou autre).
 *   3. Le slash final est cohérent avec la convention du site (aucun, sauf
 *      la racine "/").
 *   4. Aucune balise noindex n'est présente.
 *
 * Usage : node scripts/check-seo-consistency.mjs   (après `npm run build`)
 * Code de sortie : 1 si une incohérence est trouvée, 0 sinon.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const SITE = 'https://nextinotech.com'
const ROOT = resolve(import.meta.dirname, '..')
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml')
const DIST_DIR = join(ROOT, 'dist')

function fail(msg) {
  problems.push(msg)
}

function distPathFor(urlPath) {
  // urlPath: chemin sans domaine, ex "/formation-rl", "/blog/xxx", "/"
  if (urlPath === '/' || urlPath === '') return join(DIST_DIR, 'index.html')
  const rel = urlPath.replace(/^\//, '').replace(/\/$/, '')
  return join(DIST_DIR, rel, 'index.html')
}

function extractCanonical(html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)"/i)
  return m ? m[1] : null
}

function extractRobotsMeta(html) {
  const m = html.match(/<meta name="robots" content="([^"]*)"/i)
  return m ? m[1] : null
}

const problems = []

if (!existsSync(SITEMAP_PATH)) {
  console.error(`sitemap introuvable: ${SITEMAP_PATH}`)
  process.exit(1)
}
if (!existsSync(DIST_DIR)) {
  console.error(`dist/ introuvable — lance "npm run build" avant ce script.`)
  process.exit(1)
}

const sitemapXml = readFileSync(SITEMAP_PATH, 'utf-8')
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())

if (locs.length === 0) {
  console.error('Aucune <loc> trouvée dans le sitemap — vérifie le fichier.')
  process.exit(1)
}

let checked = 0

for (const loc of locs) {
  if (!loc.startsWith(SITE)) {
    fail(`URL hors domaine dans le sitemap : ${loc}`)
    continue
  }
  const urlPath = loc.slice(SITE.length) || '/'

  // Les ressources non-HTML (llms.txt etc.) ne sont pas prérendues, on les ignore.
  if (/\.(txt|xml|pdf|json)$/i.test(urlPath)) continue

  // Règle 3 : pas de slash final sauf racine.
  if (urlPath !== '/' && urlPath.endsWith('/')) {
    fail(`Slash final incohérent dans le sitemap : ${loc} (convention du site = pas de slash sauf "/")`)
  }

  const distFile = distPathFor(urlPath)
  if (!existsSync(distFile)) {
    fail(`URL du sitemap sans page prérendue correspondante : ${loc} (attendu ${distFile})`)
    continue
  }

  checked++
  const html = readFileSync(distFile, 'utf-8')

  // Règle 2 : canonical == URL exacte du sitemap.
  const canonical = extractCanonical(html)
  if (!canonical) {
    fail(`Aucune balise canonical trouvée pour ${loc}`)
  } else if (canonical !== loc) {
    fail(`Mismatch canonical/sitemap pour ${loc} → canonical déclaré = ${canonical}`)
  }

  // Règle 4 : pas de noindex.
  const robots = extractRobotsMeta(html)
  if (robots && /noindex/i.test(robots)) {
    fail(`Balise noindex trouvée sur une page listée dans le sitemap : ${loc}`)
  }
}

console.log(`\n[check-seo-consistency] ${checked}/${locs.length} URL du sitemap vérifiées.\n`)

if (problems.length > 0) {
  console.error(`❌ ${problems.length} incohérence(s) détectée(s) :\n`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error('\nCorrige ces points avant de déployer — ce sont exactement les symptômes')
  console.error('qui provoquent des rapports "Page avec redirection" ou "non indexée" dans')
  console.error('Google Search Console.\n')
  process.exit(1)
} else {
  console.log('✅ Aucune incohérence sitemap/canonical/noindex détectée.\n')
  process.exit(0)
}
