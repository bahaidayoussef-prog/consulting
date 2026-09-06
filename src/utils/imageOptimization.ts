// Image Optimization Guide for Nextinotech

export const IMAGE_OPTIMIZATION_GUIDE = {
  overview: 'Optimize images for web performance while maintaining design quality',

  rules: {
    formats: {
      primary: 'WebP with JPEG fallback',
      animated: 'WebP or MP4 (avoid animated GIF)',
      icons: 'SVG (scalable, lightweight)',
    },
    sizes: {
      heroImage: {
        mobile: '375px width',
        tablet: '768px width',
        desktop: '1920px width',
        recommendation: 'Use srcset with multiple breakpoints',
      },
      sectionImage: {
        recommendation: '1200-1400px width, 800KB max',
      },
      thumbnail: {
        recommendation: '300-500px width, 50-100KB',
      },
    },
    compression: {
      jpg: 'Use TinyJPG or ImageOptim. Target: 60-80% quality',
      png: 'Use TinyPNG. Avoid for photos.',
      webp: 'Use Squoosh. 25-30% smaller than JPEG',
    },
    lazy_loading: {
      recommendation: 'Use native loading="lazy" attribute',
      fallback: 'Intersection Observer for older browsers',
    },
    alt_text: {
      decorative: 'alt="" with aria-hidden="true"',
      functional: 'Descriptive (40-125 chars, include context)',
      example: 'Supply chain network visualization showing Morocco logistics routes',
    },
  },

  implementation: {
    current: 'Using Unsplash images (free, high-quality)',
    improvement: 'Consider self-hosted optimized versions for critical hero images',
    priority: 'Hero section (largest visual impact) → Section backgrounds → Thumbnails',
  },

  tools: {
    compression: ['TinyJPG.com', 'Squoosh.app', 'ImageOptim (Mac)', 'PunyPNG'],
    testing: ['Lighthouse (Chrome DevTools)', 'PageSpeed Insights', 'WebPageTest'],
    generation: ['Sharp (Node.js)', 'ImageMagick', 'ffmpeg (video)'],
  },

  coreWebVitals: {
    LCP: 'Largest Contentful Paint — optimize hero image load',
    FID: 'First Input Delay — related to JavaScript, not images',
    CLS: 'Cumulative Layout Shift — reserve space for images',
  },

  checklist: [
    '✓ All images use descriptive alt text or are marked decorative',
    '✓ Images have width/height attributes to prevent layout shift',
    '✓ Hero images lazy-loaded appropriately (or critical)',
    '✓ Images compressed: JPG 60-80%, WebP 25-30% smaller',
    '✓ Srcset used for responsive breakpoints',
    '✓ Unsplash images point to high-res versions (w=1920&q=85)',
    '✓ No images >1MB (except background videos)',
  ],
}

export function generateImageOptimizationReport() {
  const images = document.querySelectorAll('img')
  const report = {
    total: images.length,
    withAlt: 0,
    decorative: 0,
    missingAlt: 0,
    bySize: { under100k: 0, under500k: 0, over500k: 0 },
    images: [] as Array<{
      src: string
      alt: string
      size?: string
      isDecorative: boolean
    }>,
  }

  images.forEach(img => {
    const alt = img.getAttribute('alt') || ''
    const isDecorative = img.getAttribute('aria-hidden') === 'true'

    if (alt) report.withAlt++
    if (isDecorative) report.decorative++
    if (!alt && !isDecorative) report.missingAlt++

    report.images.push({
      src: img.src,
      alt,
      isDecorative,
    })
  })

  return report
}

export const UNSPLASH_OPTIMIZATION = {
  baseQuery: 'w=1920&q=85&auto=format&fit=crop',
  variants: {
    hero: 'w=1920&q=85&auto=format&fit=crop', // Full quality for hero
    section: 'w=1200&q=75&auto=format&fit=crop', // Balanced
    thumbnail: 'w=400&q=70&auto=format&fit=crop', // Small
  },
  notes: [
    'Unsplash auto parameter allows format negotiation (WebP for supported browsers)',
    'q=85 balances quality and file size',
    'w parameter ensures responsive sizing',
    'Combine with Cloudinary or similar CDN for advanced transforms',
  ],
}
