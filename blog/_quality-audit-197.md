# Essor Consulting — Audit qualité des 197 articles de blog

> Diagnostic uniquement — aucun fichier modifié. Analyse portant sur `public/blog/` (197 fichiers), le dossier réellement servi par le site (Vite sert `public/` à la racine ; `Blog.tsx` fait `fetch('/blog/${file}.md')`). Le dossier `blog/` à la racine du repo (46 fichiers) n'est **jamais servi** — voir constat 3.6.
> Réalisé le 2026-08-09. Méthodologie : balayage quantitatif complet sur les 197 fichiers (longueur, frontmatter, contacts, stats) + lecture qualitative approfondie d'un échantillon représentatif par cluster suspect.

---

## Résumé exécutif — à traiter en premier

| # | Problème | Sévérité | Ampleur |
|---|---|---|---|
| 1 | Le nom du fondateur apparaît publiquement comme auteur sur 177/197 articles, alors qu'un commit dédié (9f9da6a) avait explicitement supprimé cette info — mais uniquement dans le dossier mort `blog/`, jamais dans `public/blog/` (le dossier servi) | 🔴 Urgent | 177 fichiers |
| 2 | 19 mini-articles "FAQ pays" sont des templates jamais remplis (placeholder littéral affiché aux visiteurs) | 🔴 Urgent | 19 fichiers |
| 3 | 3 adresses email différentes utilisées comme contact selon les articles, aucune ne correspond exactement à celle documentée comme officielle | 🔴 Urgent | 63+ fichiers concernés |
| 4 | Paires quasi-dupliquées dans le cluster Formation (deux vagues de contenu qui couvrent les mêmes sujets) | 🟠 Urgent/à surveiller | ~8 paires (16 fichiers) |
| 5 | Stat "18 ans d'expertise" obsolète (le token de marque actuel est "20+ ans") | 🟡 À surveiller | 33 fichiers |

---

## 1. Thin content programmatique

### 1.1 — Mini-articles FAQ pays (41-59) — 🔴 URGENT — Réécrire ou supprimer

**19 fichiers**, 74 à 122 mots chacun (moyenne 78 mots hors #40). Les 19 fichiers contiennent **mot pour mot** le même texte non substitué :

> *"Cas anonymisé avec ROI, timeline, et méthodologie applicable à votre situation."*
> *"Situation typique PME/ME"*

C'est un template qui n'a jamais été rempli avec le contenu spécifique promis par le titre — l'article "Conseil Sénégal — Port Dakar Hub" (#55) ne mentionne ni le Sénégal ni le port de Dakar dans son corps de texte au-delà du titre. Idem pour les 5 pays (Sénégal #55, Côte d'Ivoire #56, RDC #57, Cameroun #58, Mali #59) et les 14 mini-FAQ sectorielles/génériques (#41-54).

**Risque concret :** contenu quasi-identique dupliqué 19 fois avec simple changement de titre = signal classique de "programmatic/doorway content" pour Google. Sur un site qui vise l'autorité E-E-A-T (expertise, expérience), ces pages nuisent plus qu'elles n'aident — elles sont indexées, trouvables, et montrent au visiteur une coquille vide.

**Recommandation :** pour les 5 articles pays (Afrique francophone — trafic réel, alignés avec le cluster L du plan des 100 articles) → **réécrire entièrement** avec du contenu réel par pays. Pour les 14 mini-FAQ génériques → **fusionner** leur contenu (une fois réécrit) dans les articles longs correspondants déjà existants (ex. fusionner #50 "e-commerce challenges" dans le cluster e-commerce), ou **supprimer** et rediriger vers l'article pilier le plus proche si le trafic organique actuel est nul (à vérifier dans Search Console avant suppression).

### 1.2 — Case studies dégradées (24-30) — 🟠 À surveiller — Réécrire

Les études de cas #20-23 sont substantielles (527-673 mots, prose complète). Les études de cas **#24 à #30 chutent à 92-188 mots** et changent de registre : notes télégraphiques bilingues plutôt que prose française éditoriale.

Exemple (#27, texte intégral du corps) :
> *Client: Autoroutes du Maroc — Scope: Péage & Assistance externalisation (1.2 MMAD annual flow) — Duration: 11 months — Objective: SLA/KPI contractual framework*
> *## Baseline — Contrats "classiques" (pas de SLA clair) — Coûts: +8% drift vs forecast*

Mots anglais ("Scope", "Duration", "Objective", "Baseline") mélangés à du français dans un site dont l'identité éditoriale (Bodoni Moda, ton narratif) est explicitement soignée ailleurs. Lecture comme des notes internes non retravaillées, pas comme du contenu publié.

**Recommandation :** réécrire #24-30 au même niveau de développement narratif que #20-23 (cas réel, contexte, mécanisme de résolution, résultat chiffré en prose).

---

## 2. Cannibalisation de mots-clés

### 2.1 — Cluster Formation : deux vagues quasi-dupliquées (60-99 vs 109-130) — 🔴 Urgent — Fusionner

Le cluster Formation a été écrit en deux vagues qui **retraitent presque les mêmes sujets** avec des titres à peine différenciés :

| Vague 1 (60-99) | Vague 2 (109-130) | Même mot-clé cible |
|---|---|---|
| #71 Formation Supply Chain Manager au Maroc | #110 Formation Supply Chain Manager au Maroc : Programme, Contenu et Débouchés | formation supply chain manager maroc |
| #68 Formation Acheteur Professionnel au Maroc : Compétences, Salaires et Débouchés | #112 Formation Acheteur Professionnel au Maroc : Cursus, Compétences et Salaires | formation acheteur professionnel maroc |
| #63 Certification DDMRP au Maroc | #122 Formation DDMRP au Maroc : Certification Practitioner et Résultats Terrain | certification ddmrp maroc |
| #97 Programme de Formation Supply Chain Management pour Cadres | #120 Formation Continue Supply Chain pour Cadres au Maroc | formation cadres supply chain maroc |
| #64 Reconversion Professionnelle en Logistique au Maroc | #118 Reconversion vers la Supply Chain au Maroc : Guide Complet | reconversion supply chain maroc |
| #70 ROI d'une Formation Logistique au Maroc | #124 ROI d'une Formation Supply Chain : Comment le Calculer et le Justifier | roi formation supply chain maroc |
| #90 TMS au Maroc : Optimiser le Transport | #126 Formation TMS au Maroc : Optimiser le Transport avec un Logiciel | tms maroc |
| #62 Formation Gestion des Stocks au Maroc | #98 Formation Gestionnaire de Stocks au Maroc | formation gestion stocks maroc |
| #65 Formation WMS et TMS au Maroc / #89 Déploiement WMS au Maroc | #121 Formation WMS au Maroc | wms maroc (3 articles) |

**Impact :** Google ne peut faire ranker qu'un seul article par requête — ces paires se font concurrence entre elles (canibalisation) au lieu de consolider l'autorité sur un seul URL. C'est aussi une mauvaise expérience pour l'utilisateur qui atterrit sur l'un ou l'autre sans savoir lequel est "le bon".

**Recommandation :** pour chaque paire, garder l'article le plus complet/récent comme pilier, **fusionner** le contenu utile de l'autre dedans, et rediriger (301) l'URL faible vers le pilier. Ne pas simplement supprimer sans redirection (perte du lien/trafic déjà indexé).

### 2.2 — Cluster Entretien d'embauche (176-208, 33 articles) — 🟡 À surveiller — Restructurer le maillage

Contenu individuellement bien écrit (700-1200+ mots, prose complète, pas de thin content). Le problème est structurel :

- **#208 "Guide Ultime de l'Entretien Supply Chain au Maroc"** couvre potentiellement le même terrain que les 32 autres articles du cluster — risque de cannibaliser sa propre requête pilier (`entretien supply chain maroc`) contre #176 "Préparer un Entretien Supply Chain au Maroc".
- **Trio sectoriel** : #199 (automobile), #200 (pharma), #201 (FMCG) — segmentation légitime si le contenu est vraiment différencié par secteur, à vérifier.
- **Quintette par poste** : #185 (manager), #186 (acheteur), #187 (responsable entrepôt), #189 (directeur), #190 (planificateur) — légitime si vraiment spécifique au poste.

**Recommandation :** ce n'est pas du contenu à supprimer (il est bon), mais à **restructurer en hub-and-spoke explicite** : faire de #208 la page pilière qui lie et résume les 32 autres, avec un maillage interne clair, plutôt que 33 pages qui se disputent la même intention de recherche sans hiérarchie visible.

### 2.3 — Cluster Carrière : chevauchements ponctuels — 🟡 À surveiller

- #140 "Évolution de Carrière en Supply Chain : Plan sur 10 Ans" vs #168 "Plan de Carrière sur 5 Ans en Supply Chain" — même intention de recherche (plan de carrière), granularité différente. À différencier plus nettement dans les titres/méta ou fusionner.
- #145 "Trouver un Emploi en 90 Jours" vs #155 "15 Stratégies pour Trouver un Emploi" — chevauchement partiel sur "trouver emploi supply chain maroc". Probablement acceptable si l'angle (plan séquentiel vs liste de tactiques) reste distinct dans le contenu réel — à vérifier.
- #133 "Salaires Supply Chain — Guide Complet par Poste et Secteur" vs #163 "Salaires des Jeunes Diplômés" vs #61 "Salaire Responsable Logistique" — trio globalement bien segmenté par persona, faible risque.

### 2.4 — Cluster Schéma Directeur (79-82) — 🟢 Mineur — Vérifier le maillage

#79 (général), #80 (PME), #81 (multi-régions), #82 (agroalimentaire) : structure pilier + déclinaisons légitime **si** #79 lie clairement vers 80/81/82 comme sous-cas. Non vérifié dans cet audit (nécessiterait de lire le corps complet des 4 articles) — à contrôler.

---

## 3. Cohérence de positionnement

### 3.1 — 🔴 URGENT : le nom du fondateur reste exposé publiquement sur 177 articles

Le commit `9f9da6a` ("remove: nom Bahaida et postes occupes supprimes partout", 3 août 2026) avait pour objectif explicite de retirer le nom du fondateur de la surface publique du site. Il a modifié 46 fichiers dans le dossier `blog/` à la racine — **mais ce dossier n'est jamais servi par le site** (voir 3.6). Le dossier réellement servi, `public/blog/`, n'a pas été touché par ce commit :

- **175 articles** ont `author: "Youssef"` dans leur frontmatter — affiché publiquement dans la liste du blog et sur chaque article (`Blog.tsx:403` et `:616`).
- **2 articles** (#209, #210 — les plus récents, du 6 août) ont carrément `author: "Youssef BAHAIDA"`, nom complet.
- Seuls 20 articles (un sous-ensemble de 14-59) ont été corrigés en `"Essor Consulting"`, probablement via une copie manuelle partielle jamais généralisée.

**C'est l'inverse de l'intention documentée** : une décision de confidentialité explicite existe, mais n'a jamais atteint le contenu réellement en ligne.

**Recommandation :** appliquer le remplacement `author: "Youssef..."` → `author: "Essor Consulting"` sur les 177 fichiers de `public/blog/` (correction mécanique, find-replace sur le frontmatter). Prioritaire avant toute autre action éditoriale.

### 3.2 — 🔴 URGENT : trois adresses email différentes selon les articles

| Adresse | Nb d'articles | Statut |
|---|---|---|
| `essor.consulting.maroc@gmail.com` | 110 | Correspond à `Contact.tsx` et `Footer.tsx` (email réellement actif sur le site) |
| `bahaidayoussef@gmail.com` | 35 | Email personnel nominatif — incohérent avec 3.1, contredit l'intention de confidentialité |
| `b.youssef@essor.ma` | 28 | Ne correspond à aucun composant actif du site actuel |

Trois adresses différentes selon l'article sur lequel on tombe = confusion pour le prospect, risque de message perdu (boîte non relevée), et incohérence de marque. Le plan des 100 articles et `CLAUDE.md` documentent `b.youssef@essor.ma` comme email officiel — **qui n'est ni celui utilisé majoritairement dans le blog, ni celui branché sur le formulaire de contact réel du site.** Il y a une décision à trancher côté produit avant correction (quelle adresse est la bonne aujourd'hui ?), puis à harmoniser partout : blog, `CLAUDE.md`, composants React.

*(Note : "choupimoncoeur@gmail.com" trouvé dans #131 est un exemple pédagogique volontaire — "évitez une adresse email non professionnelle sur votre CV" — pas une fuite. Vérifié, aucune action requise.)*

### 3.3 — 🟡 À surveiller : stat "18 ans d'expertise" obsolète

33 articles (essentiellement les 15-20 premiers publiés + quelques-uns jusqu'à #101) affichent **"18 ans"**. Le token de marque actuel (`CLAUDE.md`) est **"20+ ans"**, cohérent avec 31 articles plus récents. Incohérence factuelle visible pour tout lecteur qui compare deux articles.

**Recommandation :** find-replace "18 ans" → "20+ ans" sur les 33 fichiers concernés (liste dans l'annexe du fichier de travail).

### 3.4 — 🟡 À surveiller : CTA "audit gratuit 2-3 jours" non corroboré ailleurs sur le site

20 articles poussent l'offre "Audit gratuit 2-3 jours" comme prochaine étape. Cette offre n'apparaît dans aucun composant actif (`Contact.tsx`, `Footer.tsx`) du site actuel. Soit c'est une offre toujours valide mais non répercutée sur les pages de conversion (à corriger côté site), soit elle est caduque (à retirer des 20 articles). **Décision business à trancher, pas une correction de contenu en soi.**

### 3.5 — 🟢 Mineur : format téléphone incohérent

142 articles utilisent `+212 663 449 200`, 30 utilisent `+212 06 63 44 92 00` (format `CLAUDE.md`/site officiel). Même numéro, formatage différent — cosmétique, faible priorité.

### 3.6 — Note technique (hors périmètre contenu) : dossier `blog/` mort dans le repo

Le dossier `blog/` à la racine (46 fichiers, suivi par git) n'est **jamais chargé par le site** — `Blog.tsx` fetch exclusivement `/blog/*.md`, qui résout vers `public/blog/` sous Vite. C'est très probablement la cause racine du problème 3.1 : le commit de nettoyage a été appliqué au mauvais dossier. Recommandation : soit supprimer `blog/` (source de confusion), soit en faire la véritable source de vérité et régénérer `public/blog/` à partir de lui en pré-build — mais c'est une décision d'architecture, pas de contenu.

---

## Priorisation d'exécution suggérée

1. **Fix mécanique immédiat** (quelques minutes, aucune réécriture) : author frontmatter (3.1) + stat "18 ans" (3.3). Corrections find-replace pures.
2. **Décision business puis fix mécanique** : email de contact unique (3.2) + validité de l'offre audit gratuit (3.4).
3. **Réécriture ciblée** : les 5 mini-articles pays (1.1, prioritaires car alignés avec le cluster L du plan des 100) puis les 14 mini-FAQ génériques restantes.
4. **Réécriture** : case studies #24-30 (1.2).
5. **Consolidation SEO** : fusions du cluster Formation (2.1) — impact direct sur le ranking de pages à forte valeur commerciale.
6. **Restructuration de maillage** (pas de réécriture) : hub #208 dans le cluster Entretien (2.2), vérification du pilier #79 (2.4).

Aucun fichier n'a été modifié dans le cadre de ce diagnostic.
