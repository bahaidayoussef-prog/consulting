# Audit d'indexation Google — diagnostic réel (2026-09-07)

Ce document remplace le diagnostic de `CORRECTION_INDEXATION_URGENTE.md` et
`PLAN_ACTION_IMMEDIAT.md`. Ces deux fichiers, ainsi que `DIAGNOSTIC_RAPIDE.sh`,
supposent un serveur Apache/Nginx avec accès SSH (`.htaccess`, `nginx.conf`,
`sudo systemctl restart apache2`...). **Ce site n'a rien de tout ça** : c'est
une SPA React 19 + Vite, déployée sur **Vercel** (`vercel.json`,
`outputDirectory: dist`, prérendu statique par route). Aucun de ces scripts ne
s'applique — les exécuter n'aurait aucun effet (pas de serveur à SSH, pas de
`.htaccess` lu par Vercel).

Voici ce que l'audit du code et du build a réellement trouvé.

## Ce qui est déjà correct (aucune action requise)

- **robots.txt** (`public/robots.txt`) : `Allow: /` partout, `Sitemap:` déclaré,
  crawlers IA explicitement autorisés. Pas de `Disallow: /`.
- **Balises noindex** : recherche exhaustive dans `src/` et `dist/` — aucune
  occurrence. Aucune page n'est bloquée côté code.
- **Canonical par page** : le plugin de prérendu (`vite.config.ts`,
  `prerenderHeads`) génère 361 pages HTML statiques, chacune avec son propre
  `<title>`, sa propre meta description, son propre `<link rel="canonical">`
  auto-référencé, ses hreflang et son JSON-LD. Ce n'est pas une balise
  canonique unique copiée partout — chaque route a la sienne, correctement
  posée. Vérifié sur l'accueil, `/formation`, `/conseil`, `/blog`, `/contact`,
  `/dsc-vs-recrutement-cdi` et les articles de blog.
- **Sitemap vs pages réellement construites** : 359 URLs HTML dans
  `sitemap.xml` (+ 2 fichiers `llms.txt`) = 359 fichiers `index.html`
  prérendus dans `dist/`. Correspondance exacte, aucune URL fantôme.
- **Le point GSC « Autre page avec balise canonique correcte » (1 page)** :
  ce n'est pas une erreur. C'est la catégorie neutre de Google pour « page
  dupliquée mais canonique bien déclarée » — Google a juste choisi d'indexer
  l'autre version. Rien à corriger.

## Le vrai bug trouvé et corrigé

`/formation-rl/` était la **seule** URL de tout le site déclarée avec un
slash final — dans `routeMeta.ts`, le sitemap, le JSON-LD (`formations.ts`),
la prop `canonical` de `FormationRL.tsx` et une demi-douzaine de liens
internes. Toutes les 358 autres routes n'en ont pas.

Or Vercel applique par défaut `trailingSlash: false` : toute URL avec slash
final reçoit une redirection 308 vers la version sans slash. Résultat concret :

1. Google visite `https://nextinotech.com/formation-rl/` (l'URL du sitemap) →
   redirigé 308 vers `/formation-rl`.
2. Il atterrit sur `/formation-rl`, qui répond 200 — mais dont la balise
   canonique affirmait `.../formation-rl/`, c'est-à-dire l'URL qui vient de le
   rediriger. Boucle canonique/redirection auto-contradictoire.

C'est très probablement l'une des « 2 pages avec redirection » du rapport
Search Console.

**Correctif appliqué** : uniformisation sur `/formation-rl` (sans slash), la
forme que Vercel sert réellement sans redirection — cohérent avec les 358
autres routes. Fichiers modifiés : `routeMeta.ts`, `sitemap.xml`,
`formations.ts` (JSON-LD), `FormationRL.tsx`, `FormationCatalogue.tsx`,
`FormationProgramme.tsx`, `FormationProgrammePage.tsx`,
`FormationStickyBar.tsx`, `FormationVille.tsx`, `analytics.ts`. Build relancé
et vérifié : la page prérendue affiche maintenant
`<link rel="canonical" href="https://nextinotech.com/formation-rl">`, qui
correspond à l'URL réellement servie sans redirection.

Les anciens liens externes (campagne LinkedIn avec `?utm_source=...`)
continueront de fonctionner : Vercel les redirigera automatiquement en 308
vers la bonne URL — ce qui est le comportement correct, pas un défaut.

## La seconde « page avec redirection » probable

`/services` : route React (`ServicesRedirect.tsx`) qui redirige côté client
vers `/conseil` ou `/prestations` selon l'ancre. C'est un **routage de
migration volontaire** : l'offre `/services` a été scindée en août 2026.
Cette URL n'est pas dans le sitemap et n'est plus liée nulle part en interne,
mais Google l'a probablement gardée en mémoire d'avant la restructuration
(backlink externe ou ancien sitemap). Comportement voulu — rien à corriger.

## Le vrai sujet : les 360 pages « détectée, actuellement non indexée »

Ce n'est pas un problème de configuration. L'historique Git le montre
clairement :

| Date | Événement |
|---|---|
| 14 mai 2026 | Lancement du site (quelques pages) |
| 5 août 2026 | Sitemap étendu à 208 articles |
| 7 août 2026 | +87 articles blog ajoutés au sitemap |
| 31 août – 1er sept. 2026 | +12 articles cluster IA, 6 pages villes, sitemap remanié à 361 URLs |
| 4 sept. 2026 | Snapshot Search Console : 1 page indexée, 360 non indexées |

Le site est passé d'une poignée de pages à 361 URLs presque entièrement dans
la semaine précédant la capture Search Console. « Détectée, actuellement non
indexée » sur un nom de domaine jeune, après une explosion soudaine du nombre
de pages, est le comportement standard de Google : découverte puis mise en
file d'indexation progressive selon le budget de crawl — pas un signe de
robots.txt cassé, de noindex ou d'erreur serveur (les trois causes classiques
ont été vérifiées et exclues ci-dessus). Ce délai se compte en semaines, pas
en heures.

## Actions restantes recommandées (Search Console, pas de code)

1. Soumettre `sitemap.xml` mis à jour dans Search Console (Sitemaps → re-tester).
2. Utiliser l'inspection d'URL pour demander l'indexation manuelle des pages à
   plus forte valeur (accueil déjà indexée, puis `/conseil`, `/formation`,
   `/prestations`, `/formation-rl`) plutôt que les 360 d'un coup — l'outil est
   plafonné en usage quotidien.
3. Repasser sur le rapport Couverture dans 2 à 4 semaines : l'indexation
   progressive du gros volume publié fin août est le facteur dominant, pas un
   bug à corriger dans le dépôt.
