# Essor Consulting — Design System Brief

## Stack
React 19 + TypeScript + Vite · Framer Motion · GSAP + ScrollTrigger · Lenis smooth scroll

## Design reference
hugeinc.com — editorial, massive typography, clean dark/light alternation

## Active skills
- `essor-hugeinc` — full design DNA in `.claude/skills/essor-hugeinc/SKILL.md`
- `blog-write` — write a complete SEO/GEO article with images, stats, callouts
- `blog-seo` — SEO audit + keyword optimization for existing articles
- `blog-enrich` — add images/callouts/stats/tables to existing articles
- `blog-plan` — content calendar, keyword gap analysis, article planning

## Custom commands

### Design commands
- `/section [name + purpose]` — create a new section component in hugeinc style
- `/redesign [ComponentName]` — rewrite an existing component to hugeinc standards
- `/statement [message?]` — add an inter-section editorial statement line
- `/audit` — full site audit vs hugeinc design standards

### Blog commands
- `/blog-write [topic or keyword]` — write a complete optimized blog article
- `/blog-seo [article filename or number]` — audit + fix SEO of an existing article
- `/blog-enrich [article filename or number]` — add images, stats, callouts to an article
- `/blog-plan [N articles or cluster name]` — plan next articles, keyword gap analysis

## Brand tokens (non-negotiable)
```
Navy:  #1b3554  |  Gold: #c09a2f  |  Dark: #0a1420  |  Paper: #f5f3ee
Font display: Bodoni Moda, serif  |  Body: Jost, sans-serif  |  Mono: DM Mono
Border-radius: 0px everywhere
Section inner max-width: 1300px
```

## Real company data
- Founder: Youssef BAHAIDA
- Email: b.youssef@essor.ma
- Phone: +212 06 63 44 92 00
- Location: Casablanca, Maroc
- Stats: 110+ missions · 20+ ans · 0 commission · ~5 consultants
- Key clients: Renault-Nissan, L'Oréal Maroc, Nestlé, P&G, DHL, Huawei, J&J, Addoha, OCP

## Section order (App.tsx)
Nav → Hero → Marquee → Pourquoi → Impact → Conseil → Systemes → Methode → Formation → DSC → Profil → Engagement → Insights → Contact → Footer

## Section background alternation (hugeinc rule — never break)
Hero(dark) → Marquee(ink) → Pourquoi(paper) → Impact(dark) → Conseil(paper) → Systemes(dark) → Methode(cream) → Formation(dark) → DSC(paper) → Profil(paper) → Engagement(dark) → Insights(dark-3) → Contact(dark)

## Always
- `clamp(2.5rem, 4vw, 5rem)` minimum for any section heading
- `lineHeight: 0.92` on display text
- `letterSpacing: '-0.02em'` on display text
- `padding: '8rem 4rem'` on sections
- `once: true` on all scroll animations
- Periods at end of section headings
