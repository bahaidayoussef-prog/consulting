import { useEffect } from 'react'

interface PageMetaProps {
  title: string
  description: string
  canonical: string
}

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let tag = document.querySelector(selector) as HTMLElement | null
  const prevValue = tag?.getAttribute(attr) ?? null
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  tag.setAttribute(attr, value)
  return { tag, prevValue }
}

export default function PageMeta({ title, description, canonical }: PageMetaProps) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const desc = setMeta('meta[name="description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('name', 'description')
      return el
    }, 'content', description)

    const canonicalTag = setMeta('link[rel="canonical"]', () => {
      const el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      return el
    }, 'href', canonical)

    const ogTitle = setMeta('meta[property="og:title"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:title')
      return el
    }, 'content', title)

    const ogDesc = setMeta('meta[property="og:description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:description')
      return el
    }, 'content', description)

    const ogUrl = setMeta('meta[property="og:url"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:url')
      return el
    }, 'content', canonical)

    const twTitle = setMeta('meta[name="twitter:title"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('name', 'twitter:title')
      return el
    }, 'content', title)

    const twDesc = setMeta('meta[name="twitter:description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('name', 'twitter:description')
      return el
    }, 'content', description)

    return () => {
      document.title = prevTitle
      if (desc.prevValue !== null) desc.tag.setAttribute('content', desc.prevValue)
      if (canonicalTag.prevValue !== null) canonicalTag.tag.setAttribute('href', canonicalTag.prevValue)
      if (ogTitle.prevValue !== null) ogTitle.tag.setAttribute('content', ogTitle.prevValue)
      if (ogDesc.prevValue !== null) ogDesc.tag.setAttribute('content', ogDesc.prevValue)
      if (ogUrl.prevValue !== null) ogUrl.tag.setAttribute('content', ogUrl.prevValue)
      if (twTitle.prevValue !== null) twTitle.tag.setAttribute('content', twTitle.prevValue)
      if (twDesc.prevValue !== null) twDesc.tag.setAttribute('content', twDesc.prevValue)
    }
  }, [title, description, canonical])

  return null
}
