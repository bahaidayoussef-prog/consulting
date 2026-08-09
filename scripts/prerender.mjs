// Prerenders key routes to static HTML after `vite build`, so crawlers that
// don't execute JavaScript (most AI bots) see real content instead of an
// empty SPA shell. Vercel serves these files preferentially thanks to the
// `{ "handle": "filesystem" }` rule in vercel.json — same mechanism already
// used by the hand-authored public/formation-rl/index.html.
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const ROUTES = ['/', '/services', '/references', '/formation', '/a-propos', '/blog', '/contact', '/outils/dimensionnement-entrepot']
const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`
const DIST = path.resolve('dist')

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) return resolve()
      } catch {
        // server not up yet
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Preview server did not respond within ${timeoutMs}ms`))
      }
      setTimeout(tick, 300)
    }
    tick()
  })
}

async function main() {
  console.log('[prerender] starting vite preview...')
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'inherit',
    shell: true,
  })

  const cleanup = () => {
    if (!preview.killed) preview.kill()
  }
  process.on('exit', cleanup)

  try {
    await waitForServer(BASE_URL)

    const browser = await chromium.launch()
    const page = await browser.newPage()

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`
      console.log(`[prerender] rendering ${route}`)
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      // small settle time for React/framer-motion to finish mounting after networkidle
      await page.waitForTimeout(400)
      const html = await page.content()

      const outDir = route === '/' ? DIST : path.join(DIST, route.replace(/^\//, ''))
      await mkdir(outDir, { recursive: true })
      const outFile = path.join(outDir, 'index.html')
      await writeFile(outFile, html, 'utf-8')
      console.log(`[prerender] wrote ${path.relative(DIST, outFile)}`)
    }

    await browser.close()
    console.log('[prerender] done.')
  } finally {
    cleanup()
  }
}

main().catch(err => {
  console.error('[prerender] failed:', err)
  process.exit(1)
})
