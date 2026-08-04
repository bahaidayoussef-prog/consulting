Invoke the `blog-plan` skill.

Plan new blog articles — identify keyword gaps, score topic ideas, and produce a content calendar.

**Input:** $ARGUMENTS (e.g., "5 articles", "cluster formation", "competitor gap", "monthly calendar")

**Steps:**
1. Load the blog-plan skill for cluster map, keyword data, and priority matrix
2. Identify what type of planning is requested:
   - Specific number → list N prioritized article ideas with full brief
   - Cluster focus → deep-dive one cluster, fill all gaps
   - Competitor gap → identify topics competitors rank for that Essor doesn't cover
   - Calendar → produce a 4-week content calendar
3. For each article idea, provide the full brief (filename, keyword, sections, stats, image, priority)
4. Rank by priority score (volume × competition × fit × conversion)

**Output:**
- Numbered list of article ideas, ranked by priority
- For each: title, filename, primary keyword, estimated monthly searches, competition level, key sections, suggested ::stat:: values
- Interlinking suggestions between new and existing articles

**Offer at end:** "Voulez-vous que je rédige l'un de ces articles maintenant avec /blog-write ?"
