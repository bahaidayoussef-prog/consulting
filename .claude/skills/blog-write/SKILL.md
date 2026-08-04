---
name: blog-write
description: Write a complete, SEO/GEO-optimized blog article for the Essor Consulting site. Use when asked to write a new article from a topic, keyword, or brief. Produces a ready-to-publish markdown file with frontmatter, strong hook, sections, images, ::stat:: blocks, > callouts, and a CTA.
metadata:
  type: writing
---

# Blog Article Writing Skill — Essor Consulting

## Context
You are writing for **Youssef BAHAIDA**, founder of Essor Consulting — 20+ years of supply chain consulting in Morocco and francophone Africa. Voice: expert, direct, terrain-focused. Never generic. Always grounded in real numbers and real experience.

Target reader: Moroccan logistics/supply chain professionals — Responsable Logistique, Supply Chain Manager, PME owner, procurement professional.

## Article Frontmatter Template

```
---
title: "[Keyword-rich title in French, under 65 chars]"
date: "YYYY-MM-DD"
author: "Youssef BAHAIDA"
image: "[best matching image from /images/ — see list below]"
keywords: "[5-7 comma-separated keywords, primary keyword first]"
description: "[150-160 chars meta description — benefit-first, include primary keyword]"
---
```

## Available Images in `/images/`
Match image to article topic:
- `/images/hero-warehouse.jpg` → entrepôt, opérations, Lean, 5S, WMS
- `/images/hero-supply-chain.jpg` → supply chain globale, SCM, planification
- `/images/analytics.jpg` → données, KPIs, WMS/TMS, digitalisation, ROI, stocks
- `/images/charts.jpg` → DDMRP, planification, buffers, S&OP, prévisions
- `/images/conseil.jpg` → consulting, audit, diagnostic, conseil
- `/images/business.jpg` → carrière, salaires, achats, management, négociation
- `/images/office.jpg` → reconversion, formation, RH, bureau
- `/images/transport.jpg` → transport, TMS, distribution, tournées, port
- `/images/pharma.jpg` → pharmaceutique, santé, BPD, chaîne du froid
- `/images/agro.jpg` → agroalimentaire, export, agri, fraîcheur
- `/images/construction.jpg` → BTP, construction, industrie lourde
- `/images/healthcare.jpg` → santé, hôpital, médical

## Article Structure

### 1. Hook (first 2-3 sentences)
- Start with a provocative fact, a myth to debunk, or a paradox
- Make it specific to Morocco/Africa — no generic "in today's world..."
- Examples of good hooks:
  - "68% des PME marocaines immobilisent 30% de trop en stocks. Et aucune ne le sait."
  - "Un responsable logistique non formé coûte 500 000 MAD par an à son employeur. Personne ne calcule ça."
  - "La Région Souss-Massa exporte 1,2 million de tonnes par an. Sa supply chain est pilotée à 80% par Excel."

### 2. Lead image (immediately after hook)
```
![Descriptive alt text in French](/images/xxx.jpg)
```

### 3. Body sections (3-6 sections with ## headings)
- Each section: 150-300 words
- Mix of:
  - Practical explanations
  - Numbered or bulleted lists
  - Real Moroccan examples (companies: Renault, L'Oréal, Nestlé, OCP, DHL, Addoha, Diana Group, Centrale Danone)
  - Specific numbers (%, MAD, days, references)

### 4. ::stat:: blocks (use 1-3 per article)
```
::stat:: [number/percentage] — [what it means in 5-8 words]
```
Examples:
```
::stat:: −30% — réduction moyenne des stocks avec DDMRP
::stat:: 29 000% — ROI formation logistique sur 6 mois (PME agroalimentaire Casablanca)
::stat:: 600 000 — véhicules/an produits dans la région Tanger-Kénitra
```

### 5. > Callout blocks (use 1-2 per article)
```
> **Bold claim or key insight.** Supporting sentence with specifics.
```
Use for:
- Youssef's expert position statements
- Counter-intuitive findings
- Essor Consulting differentiators

### 6. Tables (when comparing options/costs/salaries)
```
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |
```

### 7. CTA section (last section before conclusion)
Title: `## Notre Formation / Notre Programme / Pourquoi Choisir Essor Consulting`
- 3-4 sentences max
- Specific offer: "Formation Responsable Logistique — 1 journée — 1 500 MAD"
- Direct CTA: "Contactez Essor Consulting pour..."

### 8. Conclusion (3-5 sentences)
- Restate the key insight
- Give the reader one actionable next step
- End with the company contact CTA

## SEO Rules

### Keyword placement
- Primary keyword in: title, first 100 words, at least 2 h2 headings, meta description
- Secondary keywords in h3 headings and body text
- Never stuff — max 1 keyword per 150 words

### GEO targeting (Moroccan/French-speaking Africa focus)
- Include city names when relevant: Casablanca, Rabat, Tanger, Kénitra, Marrakech, Agadir, Fès
- Reference Moroccan context: Bank Al-Maghrib, Marjane, OCP, Port Tanger Med, Zone Industrielle
- French language always (not Moroccan Arabic transliterations unless for place names)

### Content depth
- Minimum 800 words
- Target 1200-1800 words for pillar articles
- Always include at least one table, one ::stat:: block, one > callout

## File Naming Convention
`[number]-[primary-keyword-slug].md`

Examples:
- `73-formation-approvisionnement-maroc.md`
- `74-supply-chain-pharma-maroc.md`
- `75-audit-logistique-pme-casablanca.md`

## Voice & Tone Rules
- First person from Youssef's perspective: "J'ai observé...", "Après 20 ans de missions...", "Nous constatons..."
- Direct and confident — no hedging ("il semblerait que", "peut-être", "on pourrait dire")
- Specific over generic — "18% de réduction des coûts en 3 mois" not "des gains significatifs"
- Moroccan professional French — formal but accessible, no anglicisms unless in their technical context (WMS, TMS, SKU, OTIF)

## Output
Write the complete markdown file content, ready to save as `public/blog/[filename].md`.
Also state: "Save as `public/blog/[filename].md` and add `'[filename-without-.md]'` to the blogFiles array in `src/components/Blog.tsx`."
