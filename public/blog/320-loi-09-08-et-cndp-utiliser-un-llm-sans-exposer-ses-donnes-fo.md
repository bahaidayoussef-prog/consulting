---
title: "Loi 09-08 et CNDP : Utiliser un LLM sans Exposer ses Données Fournisseurs"
date: "2026-09-12"
author: "Nextinotech"
schema: "Article"
image: "/images/office.jpg"
keywords: "loi 09-08 ia maroc, cndp llm données personnelles, confidentialité chatgpt entreprise maroc, protection données ia supply chain, rgpd maroc ia achats"
description: "Ce qu'on peut — et ne peut pas — coller dans un LLM au regard de la loi 09-08 et des règles CNDP : données interdites, anonymisation, hébergement, clauses fournisseurs."
---

# Loi 09-08 et CNDP : Utiliser un LLM sans Exposer ses Données Fournisseurs

![Bureau, documents contractuels et conformité](/images/office.jpg)

**Une entreprise marocaine qui utilise l'IA générative manipule, souvent sans s'en rendre compte, des données protégées : coordonnées de contacts, données RH, prix négociés, clauses contractuelles, volumes clients. La loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, sous le contrôle de la CNDP, encadre ces traitements — et coller un fichier dans un outil hébergé hors du Maroc constitue un transfert de données. Le sujet n'est pas théorique : c'est la première chose à border avant de déployer un LLM à l'échelle d'une équipe.** Voici les règles pratiques.

## Ce qu'on ne colle jamais dans un LLM grand public

- **Données personnelles** : noms, e-mails, téléphones de contacts fournisseurs ou clients, données des salariés, CV, éléments de paie.
- **Données commerciales sensibles** : prix négociés, remises, conditions particulières, volumes par client.
- **Contrats et clauses** identifiables (noms des parties, montants).
- **Secrets industriels** : nomenclatures, procédés, plans, paramètres machines.
- **Identifiants** : ICE, IF, RC rattachés à une personne ou une PME identifiable.

::stat:: 1 transfert de données — c'est ce que constitue, juridiquement, l'envoi d'un fichier client vers un outil IA hébergé à l'étranger

## Ce qu'on peut faire — proprement

| Besoin | Pratique conforme |
|--------|-------------------|
| Analyser un contrat | Retirer noms et montants, ou utiliser un outil avec engagement de non-réutilisation et hébergement maîtrisé |
| Travailler sur des données clients | Anonymiser / pseudonymiser avant envoi (codes au lieu de noms) |
| Traiter des documents en masse | Solution avec contrat de sous-traitance (DPA), données non utilisées pour l'entraînement, journalisation |
| Cas très sensibles (pharma, défense, OCP) | Modèle hébergé au Maroc ou en instance privée — voir arbitrage ci-dessous |

## Les trois questions à poser à tout outil IA

1. **Où sont hébergées et traitées les données ?** (Maroc, UE, États-Unis, autre.)
2. **Sont-elles utilisées pour entraîner le modèle ?** Il faut un « non » contractuel.
3. **Y a-t-il un contrat de sous-traitance conforme** (finalités, durée de conservation, sécurité, sort des données en fin de contrat) ?

Sans réponse claire aux trois, l'outil reste cantonné aux données non sensibles.

> **La conformité n'est pas un frein à l'IA, c'est ce qui la rend déployable au-delà de trois utilisateurs.** Une charte claire sur les données interdites (voir notre article [gouvernance de l'IA](/blog/gouvernance-de-lia-en-supply-chain-la-charte-avant-les-outil)) permet à toute l'équipe d'utiliser l'IA en confiance, au lieu d'un usage clandestin et risqué.

## À intégrer dans les contrats fournisseurs et clients

Quand vous confiez des traitements à un prestataire qui utilise de l'IA, ou quand un client vous confie ses données : clause sur l'usage d'outils IA, localisation des traitements, interdiction de réutilisation, information mutuelle en cas d'incident. C'est le prolongement naturel du travail sur les [cahiers des charges](/blog/rdiger-un-cahier-des-charges-avec-lia-mthode-et-garde-fous) et la [cybersécurité fournisseurs](/blog/cyberscurit-de-la-supply-chain-le-maillon-faible-que-les-ent).

## Ce qu'il faut retenir

Sous la loi 09-08 et le contrôle de la CNDP, l'envoi de données personnelles ou sensibles vers un LLM hébergé à l'étranger est un traitement encadré. On n'y met jamais de données nominatives, de prix négociés ni de secrets industriels sans anonymisation ou cadre contractuel. Posez les trois questions — hébergement, entraînement, DPA — à chaque outil, et inscrivez le sujet dans votre charte et vos contrats.

Vous voulez sécuriser l'usage de l'IA dans vos processus supply chain et achats ? [Découvrez nos services de conseil](/conseil) ou notre [Étude de Faisabilité SI](/conseil). [Contactez-nous](/contact) ou formez vos équipes via notre [catalogue de formations](/formation).

**Contact :** contact@nextinotech.com | +212 06 63 44 92 00

---

*20+ ans d'expertise terrain. 110+ missions. 0 commission.*

**Pour aller plus loin :** [CNDP — Commission Nationale de contrôle de la protection des Données à caractère Personnel](https://www.cndp.ma)
