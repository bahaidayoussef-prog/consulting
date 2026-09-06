import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { getPrerenderRoutes, type PrerenderRoute } from './src/data/routeMeta'

const SITE = 'https://nextinotech.com'

/* ── Articles de blog : scan des .md + génération d'un HTML statique par article ── */

function blogSlug(title: string): string {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').substring(0, 60)
}

function parseFrontmatter(md: string): Record<string, string> {
  const fm: Record<string, string> = {}
  const src = md.replace(/^﻿/, '')
  if (!src.startsWith('---')) return fm
  const end = src.indexOf('\n---', 3)
  if (end < 0) return fm
  for (const line of src.slice(3, end).split('\n')) {
    const i = line.indexOf(':')
    if (i < 0) continue
    const k = line.slice(0, i).trim()
    const v = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (k) fm[k] = v
  }
  return fm
}

export function getBlogRoutes(): PrerenderRoute[] {
  const dir = resolve('public/blog')
  const out: PrerenderRoute[] = []
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue
    const fm = parseFrontmatter(readFileSync(join(dir, file), 'utf-8'))
    if (!fm.title) continue
    const slug = blogSlug(fm.title)
    const url = `${SITE}/blog/${slug}`
    const image = fm.image ? (fm.image.startsWith('http') ? fm.image : SITE + fm.image) : `${SITE}/logo-full.png`
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${url}#article`,
          headline: fm.title,
          description: fm.description || '',
          datePublished: fm.date || undefined,
          dateModified: fm.date || undefined,
          author: { '@type': 'Organization', name: fm.author || 'Nextinotech', '@id': `${SITE}/#organization` },
          publisher: { '@id': `${SITE}/#organization` },
          image,
          inLanguage: 'fr',
          mainEntityOfPage: url,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
            { '@type': 'ListItem', position: 3, name: fm.title, item: url },
          ],
        },
      ],
    }
    out.push({
      path: `/blog/${slug}`,
      title: fm.title.length <= 52 ? `${fm.title} | Nextinotech` : fm.title,
      description: fm.description || fm.title,
      jsonLd: [jsonLd],
    })
  }
  return out
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function canonicalFor(path: string): string {
  return SITE + (path === '/' ? '/' : path)
}

function setMetaTag(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const esc = escapeHtml(content)
  const re = new RegExp(`<meta ${attr}="${key}"[^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${esc}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n</head>`)
}

function setLinkTag(html: string, rel: string, href: string): string {
  const re = new RegExp(`<link rel="${rel}"[^>]*>`, 'i')
  const tag = `<link rel="${rel}" href="${href}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n</head>`)
}

function setHreflang(html: string, lang: string, href: string): string {
  const re = new RegExp(`<link rel="alternate" hreflang="${lang}"[^>]*>`, 'i')
  const tag = `<link rel="alternate" hreflang="${lang}" href="${href}" />`
  return re.test(html) ? html.replace(re, tag) : html
}

function renderRoute(shell: string, route: PrerenderRoute): string {
  let html = shell
  const url = canonicalFor(route.path)
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  html = setMetaTag(html, 'name', 'description', route.description)
  html = setLinkTag(html, 'canonical', url)
  html = setHreflang(html, 'fr-MA', url)
  html = setHreflang(html, 'fr', url)
  html = setHreflang(html, 'x-default', url)
  html = setMetaTag(html, 'property', 'og:title', route.title)
  html = setMetaTag(html, 'property', 'og:description', route.description)
  html = setMetaTag(html, 'property', 'og:url', url)
  html = setMetaTag(html, 'name', 'twitter:title', route.title)
  html = setMetaTag(html, 'name', 'twitter:description', route.description)
  if (route.jsonLd && route.jsonLd.length) {
    const blocks = route.jsonLd
      .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
      .join('\n')
    html = html.replace('</head>', `${blocks}\n</head>`)
  }
  return html
}

function prerenderHeads(): Plugin {
  return {
    name: 'nxt-prerender-heads',
    apply: 'build',
    closeBundle() {
      const dist = resolve('dist')
      let shell: string
      try {
        shell = readFileSync(join(dist, 'index.html'), 'utf-8')
      } catch {
        this.warn('prerender-heads: dist/index.html introuvable, prérendu ignoré')
        return
      }
      let count = 0
      const routes = [...getPrerenderRoutes(), ...getBlogRoutes()]
      for (const route of routes) {
        try {
          const html = renderRoute(shell, route)
          const rel = route.path.replace(/^\//, '').replace(/\/$/, '')
          const outDir = rel === '' ? dist : join(dist, rel)
          mkdirSync(outDir, { recursive: true })
          writeFileSync(join(outDir, 'index.html'), html, 'utf-8')
          count++
        } catch (e) {
          this.warn(`prerender-heads: échec sur ${route.path} — ${(e as Error).message}`)
        }
      }
      this.info?.(`prerender-heads: ${count} pages générées`)
      // eslint-disable-next-line no-console
      console.log(`\n[prerender-heads] ${count} pages HTML générées avec <head> statique`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderHeads()],
})
