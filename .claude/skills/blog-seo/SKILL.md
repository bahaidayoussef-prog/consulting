---
name: blog-seo
description: SEO and GEO audit + optimization of an existing Essor Consulting blog article. Use when asked to optimize, improve SEO, or boost ranking of an existing article. Checks title, meta, keyword density, structure, internal linking, and GEO signals.
metadata:
  type: seo
---

# Blog SEO/GEO Audit Skill — Essor Consulting

## What This Skill Does
Audits an existing article and produces:
1. An SEO score (0-100) with breakdown
2. A list of specific fixes
3. The improved article content (frontmatter + body)

---

## SEO Audit Checklist

### Title (weight: 20pts)
- [ ] Contains primary keyword (exactly or close variant)
- [ ] Under 65 characters
- [ ] Has a hook element (year "2026", "Guide", "Complet", number)
- [ ] In French

### Meta Description (weight: 10pts)
- [ ] 150-160 characters
- [ ] Contains primary keyword
- [ ] Includes a benefit/value proposition
- [ ] No keyword stuffing

### URL Slug / Filename (weight: 5pts)
- [ ] Primary keyword in slug
- [ ] Lowercase, hyphens, no special characters
- [ ] Under 60 characters

### Content Structure (weight: 25pts)
- [ ] H1 = article title (should match)
- [ ] At least 3 H2 headings containing keywords
- [ ] H3 subheadings used for sub-topics
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword appears 3-5× in body
- [ ] Secondary keywords in headings
- [ ] Article length ≥ 800 words (pillar articles: 1500+)

### Content Quality (weight: 20pts)
- [ ] Specific numbers and data points (%, MAD, timeframes)
- [ ] Moroccan context (companies, cities, sectors)
- [ ] Expert voice (first-person Youssef perspective)
- [ ] No fluff paragraphs ("Il est important de noter que...")
- [ ] Clear value proposition for reader

### Visual Elements (weight: 10pts)
- [ ] `image:` in frontmatter (cover image)
- [ ] At least 1 `![alt text](/images/xxx.jpg)` in body
- [ ] Alt text in French, descriptive
- [ ] At least 1 `::stat::` block with real number
- [ ] At least 1 `> callout` block

### Internal Linking (weight: 10pts)
- [ ] Links to 2-3 other articles or pages
- [ ] Uses [anchor text](relative-or-absolute-url) markdown syntax
- [ ] Links to `/formation` or `/contact` page

---

## GEO (Geographic) Signals Checklist

### Morocco-specific signals
- [ ] At least one city mentioned (Casablanca, Rabat, Tanger, Marrakech, Agadir, Kénitra, Fès)
- [ ] Moroccan companies referenced (Renault Maroc, L'Oréal Maroc, OCP, Centrale Danone, Marjane, etc.)
- [ ] MAD (Moroccan Dirham) for any monetary values — NOT euros or dollars
- [ ] "au Maroc" appears in title or first h2
- [ ] Moroccan regulatory context when relevant (Bank Al-Maghrib, OFPPT, ANAPEC)

### Francophone Africa signals (for relevant articles)
- [ ] Mentions of Côte d'Ivoire, Sénégal, Cameroun, Congo, Mali when targeting Afrique
- [ ] Port Dakar, Port Abidjan, Douala references when relevant
- [ ] "en Afrique francophone" or "Afrique subsaharienne" in content

---

## Keyword Research for Essor Consulting

### Top-priority keywords (highest Moroccan search volume)
```
formation logistique maroc          → 1,200/mo
supply chain maroc                  → 890/mo
formation responsable logistique    → 720/mo
gestion des stocks maroc            → 650/mo
formation supply chain casablanca   → 480/mo
salaire logistique maroc            → 420/mo
consultant supply chain maroc       → 380/mo
```

### Long-tail GEO keywords
```
formation logistique casablanca
formation supply chain manager maroc
certification ddmrp maroc
formation wms tms maroc
responsable logistique marrakech
supply chain agadir
logistique tanger med
```

### Question-based (featured snippet targets)
```
comment devenir responsable logistique au maroc
quel est le salaire d'un responsable logistique au maroc
qu'est-ce que le ddmrp
combien coute une formation supply chain maroc
comment calculer le stock de securite
```

---

## Common Issues Found in Moroccan B2B Blog Articles

### Issue 1: Generic hooks
**Bad:** "La supply chain est un domaine important dans le monde des affaires moderne."
**Fix:** Replace with a specific Moroccan stat or paradox in the first sentence.

### Issue 2: No numbers in body
**Bad:** "Les entreprises marocaines ont beaucoup à gagner."
**Fix:** "Les PME marocaines perdent entre 15% et 40% d'efficacité opérationnelle." (with source/context)

### Issue 3: Missing city names
**Bad:** "Les professionnels logistiques marocains..."
**Fix:** "Les professionnels logistiques de Casablanca, Rabat et Tanger..."

### Issue 4: Missing call to action
**Bad:** Article ends with a conclusion paragraph and nothing else.
**Fix:** Add a `## Notre Programme` section and a direct CTA before the conclusion.

### Issue 5: All H2 headings generic
**Bad:** `## Introduction`, `## Conclusion`, `## Notre offre`
**Fix:** Make headings keyword-rich and descriptive: `## Formation Gestion des Stocks à Casablanca`, `## Comment Calculer votre ROI Formation`

---

## Audit Output Format

When running this audit, produce:

```
## SEO Audit: [Article Title]

### Score: XX/100

| Category | Score | Max |
|----------|-------|-----|
| Title | X | 20 |
| Meta description | X | 10 |
| Content structure | X | 25 |
| Content quality | X | 20 |
| Visual elements | X | 10 |
| Internal linking | X | 5 |
| GEO signals | X | 10 |

### Critical fixes (do these first)
1. ...
2. ...

### Improvements (do after critical fixes)
1. ...

### Optimized frontmatter
[show improved frontmatter block]
```

Then provide the full optimized article if requested.
