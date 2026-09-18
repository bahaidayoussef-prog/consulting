#!/usr/bin/env node
/**
 * Client Google Search Console — nextinotech.com
 *
 * Deux commandes réellement supportées par l'API Search Console publique
 * (Google n'expose PAS d'API pour cliquer "Demander l'indexation" sur du
 * contenu classique — cette action reste réservée à l'interface, plafonnée
 * par Google lui-même, quel que soit qui clique) :
 *
 *   node scripts/gsc.mjs submit-sitemap
 *     Resoumet https://nextinotech.com/sitemap.xml (équivalent du bouton
 *     "Envoyer" dans Search Console → Sitemaps).
 *
 *   node scripts/gsc.mjs coverage-report
 *     Interroge le statut d'indexation réel (Google Index) de chaque URL du
 *     sitemap via l'API d'inspection d'URL, et écrit un rapport dans
 *     gsc-coverage-report.json (gitignoré) — un substitut automatisé à
 *     l'export manuel "Couverture" de Search Console. Respecte un délai
 *     entre appels pour rester sous le quota de l'API.
 *
 * Authentification : compte de service Google Cloud, ajouté comme
 * utilisateur "Propriétaire" (Owner) de la propriété nextinotech.com dans
 * Search Console. Voir PLAN_INDEXATION_HUMANISATION.md, section
 * "Connexion Search Console", pour la procédure complète.
 *
 * Variable d'environnement requise : GSC_SERVICE_ACCOUNT_KEY_PATH — chemin
 * vers le fichier JSON de clé du compte de service (jamais commité, voir
 * .env.example et .gitignore).
 */
import { google } from 'googleapis'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://nextinotech.com/'
const SITEMAP_URL = 'https://nextinotech.com/sitemap.xml'
const ROOT = resolve(import.meta.dirname, '..')

function loadCredentials() {
  const keyPath = process.env.GSC_SERVICE_ACCOUNT_KEY_PATH
  if (!keyPath) {
    console.error(
      '[gsc] Variable GSC_SERVICE_ACCOUNT_KEY_PATH absente.\n' +
      '      Ajoutez-la dans .env.local (chemin vers le fichier JSON de la clé du compte de service).\n' +
      '      Voir PLAN_INDEXATION_HUMANISATION.md pour la procédure de création.'
    )
    process.exit(1)
  }
  if (!existsSync(keyPath)) {
    console.error(`[gsc] Fichier introuvable : ${keyPath}`)
    process.exit(1)
  }
  return keyPath
}

async function getClient() {
  const keyFile = loadCredentials()
  const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  })
  return google.searchconsole({ version: 'v1', auth })
}

function extractSitemapUrls() {
  const xml = readFileSync(resolve(ROOT, 'public/sitemap.xml'), 'utf8')
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  return matches.map((m) => m[1]).filter((u) => u.endsWith('.html') === false && !u.endsWith('.txt'))
}

async function submitSitemap() {
  const searchconsole = await getClient()
  await searchconsole.sitemaps.submit({ siteUrl: SITE_URL, feedpath: SITEMAP_URL })
  console.log(`[gsc] Sitemap resoumis : ${SITEMAP_URL}`)
  const { data } = await searchconsole.sitemaps.get({ siteUrl: SITE_URL, feedpath: SITEMAP_URL })
  console.log('[gsc] État renvoyé par Google :', JSON.stringify(data, null, 2))
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function coverageReport() {
  const searchconsole = await getClient()
  const urls = extractSitemapUrls()
  console.log(`[gsc] ${urls.length} URLs à inspecter (≈${Math.ceil(urls.length * 1.1 / 60)} min, 1 req/1.1s pour rester sous le quota).`)

  const results = []
  let indexed = 0
  let notIndexed = 0
  let errors = 0

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    try {
      const { data } = await searchconsole.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl: SITE_URL },
      })
      const verdict = data.inspectionResult?.indexStatusResult?.verdict ?? 'UNKNOWN'
      const coverageState = data.inspectionResult?.indexStatusResult?.coverageState ?? 'unknown'
      const lastCrawlTime = data.inspectionResult?.indexStatusResult?.lastCrawlTime ?? null
      results.push({ url, verdict, coverageState, lastCrawlTime })
      if (verdict === 'PASS') indexed++
      else notIndexed++
      process.stdout.write(`\r[gsc] ${i + 1}/${urls.length} — ${verdict.padEnd(12)} indexées: ${indexed}  non indexées: ${notIndexed}`)
    } catch (err) {
      errors++
      results.push({ url, error: err.message })
    }
    await sleep(1100)
  }
  console.log('')

  const report = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    totalUrls: urls.length,
    indexed,
    notIndexed,
    errors,
    results,
  }
  const outPath = resolve(ROOT, 'gsc-coverage-report.json')
  writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8')
  console.log(`[gsc] Rapport écrit : ${outPath}`)
  console.log(`[gsc] Indexées: ${indexed}/${urls.length} — Non indexées: ${notIndexed}/${urls.length} — Erreurs: ${errors}`)
}

async function main() {
  const cmd = process.argv[2]
  if (cmd === 'submit-sitemap') return submitSitemap()
  if (cmd === 'coverage-report') return coverageReport()
  console.log('Usage: node scripts/gsc.mjs <submit-sitemap|coverage-report>')
  process.exit(1)
}

main().catch((err) => {
  console.error('[gsc] Erreur :', err.message)
  if (err.response?.data) console.error(JSON.stringify(err.response.data, null, 2))
  process.exit(1)
})
