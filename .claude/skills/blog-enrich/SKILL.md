---
name: blog-enrich
description: Enrich an existing Essor Consulting blog article with images, ::stat:: blocks, > callouts, tables, and improved prose. Use when asked to add visuals, animations, or improve an existing article. Does NOT change the fundamental structure — adds visual richness and engagement elements.
metadata:
  type: writing
---

# Blog Enrichment Skill — Essor Consulting

## What This Skill Does
Takes an existing article and:
1. Adds cover image to frontmatter
2. Inserts 1-2 inline images at natural breakpoints
3. Adds `::stat::` blocks for key numbers
4. Converts key paragraphs to `> callout` blocks
5. Converts tabular data to markdown tables
6. Improves section headings for SEO
7. Strengthens hook and CTA

---

## Image Assignment Rules

### Match image to topic

| Topic | Use image |
|-------|-----------|
| Entrepôt, Lean, 5S, opérations | `/images/hero-warehouse.jpg` |
| Supply chain globale, SCM, réseau | `/images/hero-supply-chain.jpg` |
| Données, KPIs, analytics, ROI | `/images/analytics.jpg` |
| DDMRP, planification, buffers | `/images/charts.jpg` |
| Consulting, audit, conseil | `/images/conseil.jpg` |
| Carrière, salaires, achats | `/images/business.jpg` |
| Reconversion, formation, RH | `/images/office.jpg` |
| Transport, port, distribution | `/images/transport.jpg` |
| Pharma, santé, GDP | `/images/pharma.jpg` |
| Agro, export, fraîcheur | `/images/agro.jpg` |
| BTP, construction | `/images/construction.jpg` |
| Santé, médical | `/images/healthcare.jpg` |

### Image markdown syntax
```markdown
![Alt text in French describing the image in context of the article](/images/xxx.jpg)
```

### Placement rules
- First image: immediately after hook paragraph (2nd or 3rd paragraph)
- Second image (optional): before the CTA section or between two major sections
- Never two images within 400 words of each other
- Never at the very end of the article

---

## ::stat:: Block Rules

### Syntax
```
::stat:: [value] — [label max 8 words]
```

### When to use
- Replace a paragraph that announces a key number
- Add before a section that explains a phenomenon
- Use after a case study result

### Examples from Essor Consulting context
```
::stat:: 110+ — missions supply chain en Afrique et Europe
::stat:: 20+ — années d'expérience terrain Essor Consulting
::stat:: −30% — réduction moyenne des stocks avec DDMRP
::stat:: +25% — gain productivité entrepôt après déploiement WMS
::stat:: 29 000% — ROI calculé formation logistique (PME agroalimentaire)
::stat:: 710M MAD — d'achats pilotés dans les missions Essor Consulting
::stat:: 600 000 — véhicules produits/an région Tanger-Kénitra
::stat:: 78% — des offres RL au Maroc exigent 3 ans d'expérience minimum
::stat:: 1 500 MAD — coût formation Responsable Logistique 1 journée
```

### Do NOT use ::stat:: for
- Approximate or unverifiable numbers
- Percentages without context
- More than 3 per article

---

## > Callout Rules

### Syntax
```
> **Bold opening claim.** Supporting sentence with one specific detail.
```

### Best use cases
1. **Counter-intuitive insight**: something surprising that deserves emphasis
2. **Expert position**: Youssef's personal take
3. **Essor differentiator**: what makes Essor unique vs competitors
4. **Reader warning**: a common mistake to avoid

### Examples
```
> **Un responsable logistique non formé coûte plus cher qu'une formation.** Surstocks, ruptures et erreurs de préparation représentent souvent 5 à 15% du CA — bien plus que le coût de n'importe quelle formation.

> **Le DDMRP n'est pas une mise à jour du MRP — c'est une rupture paradigmatique.** Là où le MRP tire la demande depuis des prévisions, le DDMRP positionne des buffers physiques qui absorbent la variabilité sans surstock.

> **Essor Consulting est l'un des rares cabinets certifiés DDMRP en Afrique francophone.** Nos formateurs ont des missions de déploiement actives — ils forment sur ce qu'ils font, pas sur ce qu'ils ont lu.
```

### Placement
- Maximum 2 callouts per article
- Never two consecutive callouts
- At least 200 words between callouts
- Never at the very start or very end

---

## Table Conversion Rules

When you see data presented as prose or unformatted text, convert to a table:

**Before:**
"Le responsable logistique junior gagne 10 000 à 18 000 MAD. Le senior gagne 18 000 à 30 000 MAD. Le directeur supply chain peut atteindre 35 000 à 70 000 MAD."

**After:**
```
| Niveau | Expérience | Salaire brut/mois |
|--------|-----------|------------------|
| Junior | 0-3 ans | 10 000 – 18 000 MAD |
| Confirmé | 3-7 ans | 18 000 – 30 000 MAD |
| Directeur | 15+ ans | 35 000 – 70 000 MAD |
```

---

## Hook Improvement Rules

A weak hook is: generic, passive, tells rather than shows.
A strong hook is: specific, active, raises a question or flags a problem.

**Weak:**
"La gestion des stocks est un enjeu important pour les entreprises marocaines."

**Strong:**
"68% des PME marocaines immobilisent entre 20 et 45% de capital excédentaire en stocks. Et la majorité d'entre elles ne le sait pas — faute de suivi des indicateurs adaptés."

**Rule:** The hook must contain at least ONE of:
- A specific percentage or number
- A named Moroccan company, city, or sector
- A paradox or counter-intuitive statement
- Youssef's direct voice ("Après 20 ans de missions...")

---

## CTA Improvement Rules

Every article must end with a clear call-to-action section.

### Standard CTA template
```markdown
## Formation / Accompagnement Essor Consulting

[2-3 sentences describing the specific program relevant to this article topic]

**[Program name] — [Duration] — [Price if applicable]**

> **[Essor differentiator in one sentence.]**

**Contactez Essor Consulting pour [specific action related to article topic].**
```

### Contact details (always include)
- Email: b.youssef@essor.ma
- Phone: +212 06 63 44 92 00
- Formation: `/formation` page

---

## Output Format

When enriching an article, show:
1. What changes were made (bullet list)
2. The complete updated article markdown

If only adding specific elements (e.g., "just add images"), make the targeted edits and explain placement choices.
