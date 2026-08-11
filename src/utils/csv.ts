function splitLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (c === delimiter && !inQuotes) {
      result.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  result.push(cur.trim())
  return result
}

/** Accepte CSV (virgule) ou tableau collé depuis un tableur (tabulation). */
export function parseTable(text: string): string[][] {
  const trimmed = text.trim()
  if (!trimmed) return []
  const delimiter = trimmed.split('\n')[0].includes('\t') ? '\t' : ','
  return trimmed
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0)
    .map((l) => splitLine(l, delimiter))
}

export function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length < 2) return []
  const [header, ...data] = rows
  const keys = header.map((h) => h.trim().toLowerCase())
  return data.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])))
}

function escapeCell(v: string | number | undefined): string {
  const s = String(v ?? '')
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function buildCSV(headers: string[], rows: Array<Record<string, string | number>>): string {
  const lines = [headers.join(','), ...rows.map((r) => headers.map((h) => escapeCell(r[h])).join(','))]
  return lines.join('\n')
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
