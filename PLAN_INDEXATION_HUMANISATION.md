# Plan d'action — Indexation Google & humanisation du contenu IA

**Date :** 18 septembre 2026
**Déclencheur :** rapport Search Console "Coverage" du 18/09 — 1 page indexée sur 364 connues, 361 "détectée, actuellement non indexée".
**Référence technique :** [`AUDIT_INDEXATION_REEL.md`](AUDIT_INDEXATION_REEL.md) et [`RAPPORT_AUDIT_SEO_COMPLET.md`](RAPPORT_AUDIT_SEO_COMPLET.md) — le site est techniquement propre (robots.txt, canonicals, sitemap, garde-fou postbuild). Ce plan traite les deux causes qui restent : le signal de contenu généré en masse, et le délai normal d'indexation d'un nom de domaine jeune.

Ce document est le journal de suivi. Chaque action est cochée au fur et à mesure et datée.

---

## Ce qui est déjà fait (18/09, cette session)

- [x] **Auteur réel au lieu d'une marque** — les 411 articles déclaraient `author: "Nextinotech"` (une entreprise, pas une personne), et le JSON-LD schema.org le typait `Organization`. Corrigé sur les 411 fichiers vers `Youssef Bahaida` (le vrai fondateur), et le schéma passé en `Person` avec `jobTitle: Fondateur` et `worksFor` l'organisation, dans les 3 générateurs JSON-LD du site (prérendu, composant Blog, page DSC vs CDI).
- [x] **250 footers identiques dé-dupliqués** — un paragraphe de clôture strictement identique au caractère près sur 235 articles, plus un titre inventé ("Directeur des Achats" signé "Nextinotech", jamais utilisé ailleurs sur le site) sur 15 autres. Remplacés par 5 variantes qui gardent exactement les mêmes faits (20+ ans, 110+ missions, 0 commission, contact réel) avec une formulation différente.
- [x] **46 liens internes cassés vers `/formation-rl/`** (slash final oublié dans le corps des articles) — même classe de bug redirection déjà corrigée dans le code fin de mois dernier, mais oubliée dans 46 articles. Corrigé.
- [x] Script réutilisable `scripts/humanize-authorship.mjs` ajouté au dépôt pour les prochains lots.
- [x] Build vérifié (467 pages prérendues) et garde-fou `scripts/check-seo-consistency.mjs` passé sans erreur.
- [x] Pull request ouverte : **https://github.com/stephanedebelenet-byte/consulting/pull/3** — preview Vercel au vert, en attente d'un merge (voir "Bloqué" ci-dessous).
- [x] Premier lot de 20 articles du cluster "100 articles IA" (`327-*` à `346-*`) humanisé en profondeur — **PR #4 mergée dans `main` le 17/09 23:34.**
- [x] Deuxième lot (`347-*` à `366-*`, 20 fichiers) humanisé selon la même méthode — build vérifié (467 pages, garde-fou 0 incohérence), pull request ouverte : **https://github.com/stephanedebelenet-byte/consulting/pull/6** (non mergée). Note : cette PR contient aussi un commit de mise à jour de ce journal, arrivé là par un mix-up de branche pendant la session — contenu correct, juste mal placé dans l'historique.

## Bloqué — nécessite une action humaine (pas un manque d'outillage, une garde de sécurité volontaire)

- [ ] **Merger la PR #3** (bylines/footers/liens, 411 fichiers) — **toujours ouverte**, pas encore mergée malgré les lots suivants. Le garde-fou de la session refuse le merge automatique ("Merge Without Review") — un merge de code vers `main` sans relecture humaine n'est délibérément pas quelque chose qu'un agent peut faire seul, même avec autorisation explicite d'exécuter le reste du plan. Une fois mergée, Vercel redéploie automatiquement en production (quelques minutes). Tant qu'elle reste ouverte, tous les articles hors des lots déjà humanisés (327-366) gardent l'ancien auteur "Nextinotech" et les footers dupliqués.
  → Action : ouvrir https://github.com/stephanedebelenet-byte/consulting/pull/3, relire le diff (surtout 2-3 articles au hasard), cliquer "Squash and merge".
- [x] ~~Merger la PR #4~~ — fait, mergée le 17/09 23:34.
- [ ] **Merger la PR #6** (lot 2 d'humanisation, articles `347-366`) : https://github.com/stephanedebelenet-byte/consulting/pull/6

## Nécessite votre accès Google Search Console (aucune API/service account configurée dans ce projet — impossible à automatiser sans que vous créiez et partagiez des identifiants Google Cloud, ce qui n'est pas fait ici)

1. **Resoumettre le sitemap.** Search Console → Sitemaps → coller `https://nextinotech.com/sitemap.xml` → Envoyer (même s'il est déjà déclaré, ça force un re-crawl prioritaire après le déploiement de la PR #3).
2. **Demander l'indexation manuelle**, une par une, dans cet ordre de priorité (outil "Inspection de l'URL", plafonné à un usage quotidien limité — ne pas essayer de tout soumettre le même jour) :
   1. `https://nextinotech.com/` (déjà indexée, à sauter si déjà verte)
   2. `https://nextinotech.com/conseil`
   3. `https://nextinotech.com/formation`
   4. `https://nextinotech.com/prestations`
   5. `https://nextinotech.com/formation-rl`
   6. Les 5-10 articles de blog à plus fort potentiel commercial (ROI IA, plateforme IA comparatif, audit supply chain 2026)
3. **Revenir sur le rapport Couverture dans 2 semaines** (2 octobre) puis **4 semaines** (16 octobre) pour mesurer la progression du nombre de pages indexées.

## Calendrier complet

| Semaine | Action | Qui |
|---|---|---|
| **S0 — 18/09 (aujourd'hui)** | Correctifs auteur/footer/liens + 1er lot de 20 articles humanisés — fait | Agent |
| **S0** | Merge PR #3 + PR lot 1 → déploiement production | **Vous** (1 clic chacune) |
| **S0** | Resoumission sitemap + inspection d'URL sur les 5-10 pages prioritaires | **Vous** (~15 min, GSC) |
| **S0** | Lot 2 : articles 347-366 humanisés, PR #6 ouverte — fait | Agent |
| **S1 (semaine du 22/09)** | Lot 3 : 20 articles suivants (367-386) | Agent, sur demande |
| **S2 (semaine du 29/09)** | Lots 4-5 : fin du cluster IA (387-426), soit les 40 derniers | Agent, sur demande |
| **S2** | Vérifier dans GSC : nombre de pages passées en "Indexée" | **Vous** |
| **S3 (semaine du 06/10)** | Étendre l'humanisation aux 235 articles plus anciens (hors cluster IA) si le cluster IA montre une amélioration mesurable | Agent, sur demande |
| **S3** | Ajouter des signaux humains supplémentaires qui ne peuvent pas être générés artificiellement : vraies photos de missions, témoignages clients réels (avec accord), vidéos courtes, section commentaires — voir "Signaux humains réels" ci-dessous | **Vous** |
| **S4 (16/10)** | Nouveau rapport Coverage GSC → comparer au rapport du 18/09, ajuster le plan | **Vous + Agent** |

## Signaux humains réels — ce qu'un agent ne peut pas fabriquer à votre place

Réécrire le texte aide, mais Google et les lecteurs distinguent aussi des signaux qui ne se simulent pas honnêtement. Ce qui reste de votre ressort, quand vous aurez le temps :

- **Vraie photo de Youssef Bahaida** sur la page profil et en avatar d'auteur (actuellement le site utilise des visuels stock génériques comme image d'article).
- **Témoignages clients vérifiables** (nom, entreprise, citation réelle, avec accord écrit) plutôt que des chiffres agrégés seuls.
- **Mise à jour périodique visible** : republier/retoucher un article existant avec une date `dateModified` change change réellement (pas juste cosmétique) tous les 3-4 mois signale un contenu vivant.
- **Lien LinkedIn réel de Youssef Bahaida** dans le schema.org `Person` (`sameAs`) — à fournir pour que l'agent l'ajoute au code.
- **Backlinks externes réels** (annuaires professionnels marocains, presse spécialisée, partenaires cités dans `BACKLINK-STRATEGY.md`) — accélèrent la confiance de Google sur un nom de domaine jeune bien plus que n'importe quelle action interne.

## Ce qui n'a délibérément pas été touché

- Les 235 + 15 articles déjà corrigés au niveau footer/auteur n'ont pas encore reçu la passe d'humanisation rédactionnelle profonde (structure/rythme/ton) — seul le 1er lot de 20 est en cours. C'est un travail volontairement étalé sur plusieurs lots pour rester relisable avant chaque merge, pas une limite technique.
- Aucune tentative de "pinger" artificiellement Google/Bing via un script automatisé n'a été faite au-delà de la resoumission normale du sitemap dans Search Console — les 360 pages restent d'abord une question de délai de crawl sur un domaine jeune (cf. `AUDIT_INDEXATION_REEL.md`), pas un problème que la vitesse de notification résout.
