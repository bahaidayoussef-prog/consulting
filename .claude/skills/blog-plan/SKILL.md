---
name: blog-plan
description: Plan a complete blog content strategy for Essor Consulting. Use when asked to plan new articles, identify keyword gaps, build a content calendar, or decide what to write next. Produces a prioritized list of article topics with keywords, intent, and expected impact.
metadata:
  type: strategy
---

# Blog Content Planning Skill — Essor Consulting

## Context
Essor Consulting has 197 published articles (see the `blogFiles` array in `src/components/Blog.tsx`) targeting supply chain/logistics in Morocco and francophone Africa — covering formation, géo, case studies, secteurs, carrière, entretien d'embauche, jeunes diplômés, and tendances 2026. A researched 100-article expansion plan (new clusters: Achats & Procurement avancé, IA & Digital Supply Chain, RSE & Durabilité, Douane & Commerce International, E-commerce & Last-Mile, RH & Attractivité Employeur, Femmes en Logistique, ERP & Outils, Gestion de Projet, Secteurs verticaux approfondis, Transport & Fret, Afrique francophone approfondie, Risk Management) lives in `blog/_content-plan-100.md` — check it first before proposing new topics. The next articles should:
1. Fill keyword gaps (topics not yet covered)
2. Target high-volume searches with low competition
3. Build topical authority in the main clusters

---

## Topical Cluster Map

Essor Consulting owns these 5 main topic clusters. New articles should fit one of them:

### Cluster 1: Formation Logistique Maroc (PRIORITY)
Core: "formation logistique maroc", "formation supply chain"
Already covered: Responsable Logistique, SCM, DDMRP, Lean, WMS/TMS, Gestion Stocks, Acheteur, Reconversion
**Gaps to fill:**
- Formation douane / commerce international
- Formation prévisions de la demande
- Formation transport routier Maroc
- Formation logistique e-commerce Maroc
- Formation chef d'entrepôt Maroc
- Formation planificateur supply chain

### Cluster 2: Carrière & Salaires (HIGH TRAFFIC)
Core: "salaire logistique maroc", "carrière supply chain"
Already covered: Salaires RL, Devenir RL, Reconversion
**Gaps to fill:**
- Salaire acheteur professionnel maroc
- Salaire directeur supply chain maroc
- Offres emploi logistique maroc 2026
- CV responsable logistique maroc
- Entretien embauche supply chain

### Cluster 3: Outils & Méthodes (AUTHORITY)
Core: "DDMRP", "WMS", "TMS", "Lean", "S&OP"
Already covered: DDMRP, WMS/TMS, Lean, Gestion stocks
**Gaps to fill:**
- Formation S&OP Maroc
- Qu'est-ce que le CPIM APICS maroc
- Formation forecasting prévisions maroc
- Supply chain risk management maroc
- Formation ABC-XYZ stocks maroc

### Cluster 4: Géographies Maroc (GEO)
Already covered: Casablanca, Rabat, Tanger/Kénitra, Marrakech, Agadir, Fès/Meknès
**Gaps to fill:**
- Formation logistique Oujda
- Supply chain Laâyoune (pêche export)
- Logistique zone franche TFZ Tanger
- Logistique aéroport Mohamed V Casablanca

### Cluster 5: Secteurs (AUTHORITY)
Already covered: Pharma, Agro export, Textile, BTP, Automobile, Grande distribution
**Gaps to fill:**
- Supply chain cosmétiques Maroc (L'Oréal, Unilever)
- Logistique e-commerce Maroc (Jumia, Glovo)
- Supply chain pêche et produits de la mer
- Logistique hôtellerie tourisme Maroc
- Supply chain OCP et industrie minière

---

## Content Priority Matrix

When planning, score each article idea on:

| Criterion | Weight | Score 1-5 |
|-----------|--------|-----------|
| Monthly search volume (est.) | 30% | |
| Competition level (low=5, high=1) | 25% | |
| Fit with Essor expertise | 25% | |
| Revenue/conversion potential | 20% | |

**Priority threshold: score ≥ 3.5/5 → write now**

---

## Keyword Research Process

### Step 1: Identify the primary keyword
Use the pattern: `[action/topic] [qualifier] [location/sector]`
- "formation [topic] maroc"
- "salaire [role] maroc"
- "comment [action] supply chain maroc"
- "[tool/method] maroc"

### Step 2: Find related keywords (LSI)
For each primary keyword, generate:
- 3-4 synonyms/variants
- 2-3 question-form keywords
- 1-2 long-tail GEO variants

### Step 3: Check existing coverage
Before writing, check if the topic is already covered in one of the 72 existing articles. If partially covered, prefer enriching existing articles.

---

## Article Ideas Generator

When asked to plan N articles, use this framework:

**For each article idea, provide:**
```
## Article [N]: [Title]
- **File:** [suggested filename]
- **Primary keyword:** [keyword]
- **Monthly searches (est.):** [number]
- **Competition:** Low/Medium/High
- **Cluster:** [which of the 5 clusters]
- **Angle:** [what's unique/different about this article]
- **Target reader:** [specific persona]
- **Key sections:** [3-4 H2 topics]
- **::stat:: hooks:** [2-3 numbers to feature]
- **Image:** [which /images/xxx.jpg to use]
- **Priority:** High/Medium/Low
```

---

## Content Calendar Template

For a monthly calendar, distribute:
- 2 articles from Cluster 1 (Formation) — highest volume
- 1 article from Cluster 2 (Carrière)
- 1 article from Cluster 3 or 5 (Méthodes/Secteurs)
- 1 article from Cluster 4 (Géographie)

Monthly total: 5 articles (one per week minus one)

---

## Competitor Gap Analysis

When identifying what to write next, look for topics that:
1. Have high search intent (informational + transactional)
2. Are not covered by moroccan.jobs, OFPPT site, or generic training directories
3. Can be answered with Essor Consulting's specific 20+ year expertise
4. Include numbers, case studies, or tools that generalist sites can't match

---

## Interlinking Strategy

Every new article should link to:
- At least 2 existing articles (by topic relevance)
- The `/formation` page
- The `/contact` page or `b.youssef@essor.ma`

Track interlinking in a mental map:
- "Formation" articles → link to each other + /formation page
- "Carrière" articles → link to formation articles + salary articles
- "Secteur" articles → link to formation + consulting articles
- "Géographie" articles → link to geo-adjacent articles + /formation
