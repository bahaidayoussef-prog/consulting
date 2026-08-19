export interface BlogPost {
  slug: string
  title: string
  date: string
  author?: string
  description?: string
  keywords?: string
  htmlContent: string
  rawContent: string
  image?: string
  quickAnswer?: string
  schema?: 'FAQPage' | 'Article'
}

interface FrontMatter {
  title?: string
  date?: string
  author?: string
  description?: string
  keywords?: string
  image?: string
  quickAnswer?: string
  schema?: string
}

export function parseMarkdown(content: string): BlogPost {
  const lines = content.split('\n')
  let frontMatterEnd = -1
  const frontMatter: FrontMatter = {}

  if (lines[0]?.trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i]?.trim() === '---') {
        frontMatterEnd = i
        break
      }
      const line = lines[i] || ''
      const colonIdx = line.indexOf(':')
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim()
        const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
        if (key === 'title' || key === 'date' || key === 'author' || key === 'description' || key === 'keywords' || key === 'image' || key === 'quickAnswer' || key === 'schema') {
          frontMatter[key as keyof FrontMatter] = value
        }
      }
    }
  }

  const mdContent = lines.slice(frontMatterEnd + 1).join('\n').trim()

  const slug = (frontMatter.title || 'untitled')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60)

  const htmlContent = markdownToHtml(mdContent)

  return {
    slug,
    title: frontMatter.title || 'Untitled',
    date: frontMatter.date || new Date().toISOString().split('T')[0],
    author: frontMatter.author,
    description: frontMatter.description,
    keywords: frontMatter.keywords,
    image: frontMatter.image,
    quickAnswer: frontMatter.quickAnswer,
    schema: frontMatter.schema === 'FAQPage' ? 'FAQPage' : frontMatter.schema === 'Article' ? 'Article' : undefined,
    htmlContent,
    rawContent: mdContent,
  }
}

// ── Inline formatting ─────────────────────────────────────────────────────────

function applyInline(text: string): string {
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="blog-code">$1</code>')
  // Bold + italic ***
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
  // Bold **
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="blog-strong">$1</strong>')
  // Italic *
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  // Bold __ italic _
  text = text.replace(/__([^_]+)__/g, '<strong class="blog-strong">$1</strong>')
  text = text.replace(/_([^_\n]+)_/g, '<em>$1</em>')
  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="blog-link" href="$2">$1</a>')
  // Images ![alt](url) → inline (will be caught by block parser first if on own line)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img class="blog-img" src="$2" alt="$1" loading="lazy" />')
  return text
}

// ── Table parser ──────────────────────────────────────────────────────────────

function parseTable(rows: string[]): string {
  const cells = (row: string) =>
    row.split('|').map(c => c.trim()).filter((_, i, a) => i > 0 && i < a.length - 1)

  const headerCells = cells(rows[0])
  // rows[1] is the separator (---|---), rows[2+] are data
  const dataRows = rows.slice(2)

  const thead = `<thead><tr>${headerCells.map(c =>
    `<th class="blog-th">${applyInline(c)}</th>`).join('')}</tr></thead>`

  const tbody = `<tbody>${dataRows.map(row =>
    `<tr>${cells(row).map(c =>
      `<td class="blog-td">${applyInline(c)}</td>`).join('')}</tr>`
  ).join('')}</tbody>`

  return `<div class="blog-table-wrap"><table class="blog-table">${thead}${tbody}</table></div>`
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith('|') && line.trim().endsWith('|')
}

function isSeparatorRow(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim())
}

// ── Block-level parser ────────────────────────────────────────────────────────

function markdownToHtml(markdown: string): string {
  const rawLines = markdown.split('\n')
  const output: string[] = []
  let i = 0
  let inList = false
  let listTag = 'ul'

  const flushList = () => {
    if (inList) {
      output.push(`</${listTag}>`)
      inList = false
    }
  }

  while (i < rawLines.length) {
    const line = rawLines[i]
    const trimmed = line.trim()

    // ── Fenced code block
    if (trimmed.startsWith('```')) {
      flushList()
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < rawLines.length && !rawLines[i].trim().startsWith('```')) {
        codeLines.push(rawLines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;'))
        i++
      }
      output.push(`<pre class="blog-pre"><code class="blog-code-block${lang ? ` lang-${lang}` : ''}">${codeLines.join('\n')}</code></pre>`)
      i++ // skip closing ```
      continue
    }

    // ── Table (detect by first pipe row followed by separator row)
    if (isTableRow(trimmed) && i + 1 < rawLines.length && isSeparatorRow(rawLines[i + 1].trim())) {
      flushList()
      const tableRows = [trimmed]
      tableRows.push(rawLines[i + 1].trim())
      i += 2
      while (i < rawLines.length && isTableRow(rawLines[i].trim())) {
        tableRows.push(rawLines[i].trim())
        i++
      }
      output.push(parseTable(tableRows))
      continue
    }

    // ── Horizontal rule
    if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
      flushList()
      output.push('<hr class="blog-hr" />')
      i++
      continue
    }

    // ── Headings
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)/)
    if (headingMatch) {
      flushList()
      const level = headingMatch[1].length
      const text = applyInline(headingMatch[2])
      const tag = `h${Math.min(level, 4)}`
      const cls = `blog-h${Math.min(level, 4)}`
      output.push(`<${tag} class="${cls}">${text}</${tag}>`)
      i++
      continue
    }

    // ── Image on its own line
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      flushList()
      const [, alt, src] = imgMatch
      output.push(
        `<figure class="blog-figure">` +
        `<img class="blog-img" src="${src}" alt="${alt}" loading="lazy" />` +
        (alt ? `<figcaption class="blog-caption">${alt}</figcaption>` : '') +
        `</figure>`
      )
      i++
      continue
    }

    // ── Blockquote / callout
    if (trimmed.startsWith('> ')) {
      flushList()
      const quoteLines: string[] = []
      while (i < rawLines.length && rawLines[i].trim().startsWith('> ')) {
        quoteLines.push(rawLines[i].trim().slice(2))
        i++
      }
      const inner = quoteLines.map(l => applyInline(l)).join('<br/>')
      output.push(`<blockquote class="blog-callout">${inner}</blockquote>`)
      continue
    }

    // ── Callout stat block ::stat:: value — Title
    const statMatch = trimmed.match(/^::stat::\s*(.+?)\s*—\s*(.+)$/)
    if (statMatch) {
      flushList()
      output.push(
        `<div class="blog-stat-block">` +
        `<div class="blog-stat-value">${statMatch[1]}</div>` +
        `<div class="blog-stat-label">${statMatch[2]}</div>` +
        `</div>`
      )
      i++
      continue
    }

    // ── Unordered list
    if (/^[-*+] /.test(trimmed)) {
      if (!inList || listTag !== 'ul') {
        flushList()
        output.push('<ul class="blog-ul">')
        inList = true
        listTag = 'ul'
      }
      output.push(`<li class="blog-li">${applyInline(trimmed.slice(2))}</li>`)
      i++
      continue
    }

    // ── Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listTag !== 'ol') {
        flushList()
        output.push('<ol class="blog-ol">')
        inList = true
        listTag = 'ol'
      }
      output.push(`<li class="blog-li">${applyInline(trimmed.replace(/^\d+\.\s/, ''))}</li>`)
      i++
      continue
    }

    // ── Empty line
    if (!trimmed) {
      flushList()
      i++
      continue
    }

    // ── Raw HTML passthrough
    if (trimmed.startsWith('<') && !trimmed.startsWith('<strong') && !trimmed.startsWith('<em')) {
      flushList()
      const htmlLines = [line]
      // Collect multi-line HTML block
      while (i + 1 < rawLines.length && rawLines[i + 1].trim() && !rawLines[i + 1].trim().match(/^#{1,4} /)) {
        const next = rawLines[i + 1].trim()
        if (next.startsWith('<') || htmlLines[htmlLines.length - 1].includes('</') === false) {
          htmlLines.push(rawLines[i + 1])
          i++
        } else {
          break
        }
      }
      output.push(htmlLines.join('\n'))
      i++
      continue
    }

    // ── Paragraph
    flushList()
    const paraLines = [trimmed]
    i++
    while (i < rawLines.length && rawLines[i].trim() && !rawLines[i].trim().match(/^#{1,4} /) && !rawLines[i].trim().startsWith('- ') && !rawLines[i].trim().startsWith('* ') && !/^\d+\.\s/.test(rawLines[i].trim()) && !rawLines[i].trim().startsWith('>') && !rawLines[i].trim().startsWith('|') && !rawLines[i].trim().startsWith('```') && !rawLines[i].trim().startsWith('!')) {
      paraLines.push(rawLines[i].trim())
      i++
    }
    output.push(`<p class="blog-p">${applyInline(paraLines.join(' '))}</p>`)
  }

  flushList()
  return output.join('\n')
}
