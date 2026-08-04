Invoke the `blog-seo` skill.

Audit and optimize an existing blog article for SEO and GEO (Morocco/francophone Africa).

**Input:** $ARGUMENTS (filename, article number, or topic of article to audit)

**Steps:**
1. Load the blog-seo skill for audit checklist and keyword data
2. Read the specified article from public/blog/
3. Run the full audit checklist (title, meta, structure, content, visuals, GEO signals)
4. Produce the score breakdown table
5. List critical fixes first, then improvements
6. Provide the optimized frontmatter
7. If asked to apply fixes: edit the file directly and confirm changes

**Output format:**
```
## SEO Audit: [Title]
Score: XX/100
[table breakdown]
Critical fixes: [numbered list]
Improvements: [numbered list]
Optimized frontmatter: [code block]
```

Ask: "Voulez-vous que j'applique ces corrections directement dans le fichier ?"
